const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Authentication failed" });

    const decoded = jwt.verify(token, "jwtsecret");

    if (!decoded) return res.status(401).json({ message: "Authentication failed" });

   
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed 🔒🔒🔒🔒🔒🔒🔒🔒" });
  }
};


