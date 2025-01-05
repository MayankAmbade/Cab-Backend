// Send SMS function
const axios = require("axios");
const qs = require("querystring");




const EXOTEL_SID = "mayank19";
const EXOTEL_API_KEY = "1d92e517d56eb73e6203c63ea2265d84d775bf28c6a7d604";
const EXOTEL_API_TOKEN = "6aca10c3dfea68ab28da47d5817693e9f4115ded6589c2d5";


async function sendSMS(to, message) {
    
    const url = `https://${EXOTEL_API_KEY}:${EXOTEL_API_TOKEN}@api.exotel.com/v1/Accounts/${EXOTEL_SID}/Sms/send`;
             
    const data = {
        From: "7744044435", // Exotel registered number
        To: to,
        Body: message
    };

    try {
        const response = await axios.post(url, qs.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        console.log("SMS sent successfully!", response.data);
    } catch (error) {
        console.error("Failed to send SMS:", error.response?.data || error.message);
    }
}


module.exports = sendSMS

