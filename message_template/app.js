require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const sendMail = require("./mail/mail");
const app = express();
const pool = require("./db/config");
const bcrypt = require("bcrypt");
const { emailTemplate } = require("./utils/template");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { email, phone, first_name, password } = req.body;

  try {
    if (!(email && phone && first_name && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    // check if user already exist
    const user = await pool.query("SELECT * FROM students WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(400).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO students (email, phone, first_name,password) VALUES($1, $2, $3, $4) RETURNING *",
      [email, phone, first_name, hashedPassword]
    );

    //   await sendMail({
    //       email: newUser.rows[0].email,
    //       subject: "Welcome to WAKA",
    //       html: await emailTemplate(newUser.rows[0].first_name, newUser.rows[0].email, newUser.rows[0].phone),
    //   });

    const token = jwt.sign(
      { id: newUser.rows[0].id, email },
      process.env.TOKEN_KEY || "secret",
      {
        expiresIn: "3m",
      }
    );

    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const user = await pool.query("SELECT * FROM students WHERE email = $1", [
      email,
    ]);

    if (user.rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const refresh_token = jwt.sign(
      { id: user.rows[0].id, email },
      process.env.REFRESH_TOKEN || "refreshsecret",
      {
        expiresIn: "1d",
      }
    );

    const token = jwt.sign(
      { id: user.rows[0].id, email },
      process.env.JWT_TOKEN || "jwtsecret",
      {
        expiresIn: "1m",
      }
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      // path: "/refresh_token",
    });

    return res
      .status(200)
      .json({ message: "Login successful", access_token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

//user profile
app.get("/profile", isAuthenticated, async (req, res) => {
  const { id } = req.user;
  console.log(id);

  try {
    const user = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

    if (user.rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found", user: user.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// refresh token
app.post("/refresh", async (req, res) => {
  const { refresh_token } = req.cookies; // install cookie-parser

  try {
    if (!refresh_token)
      return res.status(401).json({ message: "Authentication failed" });

    // verify refresh token
    const user = await jwt.verify(refresh_token, "refreshsecret"); // true or false

    if (!user)
      return res.status(401).json({ message: "Authentication failed" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_TOKEN || "jwtsecret",
      {
        expiresIn: "1m",
      }
    );

    return res
      .status(200)
      .json({ message: "Token refreshed", access_token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

const port = process.env.PORT || 4567;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  //log pool connection options
  await pool.connect().then(() => {
    console.log("Connected to database");
  });
});
