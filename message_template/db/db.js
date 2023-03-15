const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(
          "mongodb+srv://drsimple:admin1234@sayswitch.lrno37f.mongodb.net/waka"
        );
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;