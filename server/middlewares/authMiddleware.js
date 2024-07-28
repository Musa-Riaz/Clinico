const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1]; //Bearer token

  try {
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ status: "fail", message: "Authorization Failed" });
      } else {
        req.body.userid = decode.id; //adding the user id to the request body
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: "authorization failed",
    });
  }
};
