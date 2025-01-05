const db = require("../config/database.js");
const sendSMS = require("../utiles/ExotelSms.js");
const jwt = require("jsonwebtoken");

const GenerateOtp = async (req, res) => {
  console.log("GenerateOtp api call");
  const { phone_number, sms } = req.body;
  console.log("Phone:", phone_number);

  // Check if phone or sms is missing
  if (!phone_number || !sms) {
    return res.status(400).send({ message: "Phone number is required" });
  }

  try {
    // Query to check if the phone number already exists
    const query = "SELECT * FROM users WHERE phone_number = ?";
    db.query(query, [phone_number], (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Database error" });
      }
      // If phone number already exists, send an error response
      if (result?.length > 0) {
        return res
          .status(400)
          .send({ message: "Phone number already exists!" });
      }
    });

    // If the phone number does not exist, insert it

    if (phone_number) {
      const insertQuery = "INSERT INTO users (phone_number) VALUES (?)";
      db.query(insertQuery, [phone_number], (err, result) => {
        if (err) {
          return res
            .status(400)
            .send({ message: "Error inserting phone number" });
        }
        return res.status(200).send({
          message: "Phone number inserted successfully",
          data: result,
        });
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Failed to send SMS or process request" });
  }
};

const GetOtp = async (req, res) => {
  const { userotp } = req.body;
  if (!userotp) {
    res.send({ status: 404, message: "OTP is required" });
  }

  const findotpquery = "SELECT * FROM users WHERE userotp = ?";
  db.query(findotpquery, [userotp], (err, result) => {
    console.log("otpresult === ", result);

    if (err) {
      res.send({ status: 404, message: "Database error find to userotp" });
    } else {
      if (result.length === 0) {
        console.warn("No record found for the provided OTP."); // Log warning for empty result
        res.send({
          status: 404,
          message: "No user found with the provided OTP",
        });
      } else if (result[0].userotp === userotp) {
        const payload = {
          id: result[0].id,
        };
        const user_token = jwt.sign(payload, process.env.JWTKEY, {
          expiresIn: "1h",
        });
        console.log("UserToken === ", user_token);
        const updateTokenQuery = "UPDATE users SET user_token = ? WHERE id = ?";
        db.query(
          updateTokenQuery,
          [user_token, result[0].id],
          (updateErr, updateResult) => {
            console.log("updateResult ===> ", updateResult);

            if (updateErr) {
              console.error("Error saving token to database: ", updateErr);
              res.send({
                status: 400,
                message: "Failed to save token in database",
              });
            } else {
              res.send({
                status: 200,
                message: "OTP matched successfully, token generated and saved",
              });
            }
          }
        );
      } else {
        res.send({ status: 401, message: "OTP does not match" });
      }
    }
  });

  // if the otp is correct then genrate the jwt token
  // save to the genrate token in databse
};
module.exports = { GenerateOtp, GetOtp };
