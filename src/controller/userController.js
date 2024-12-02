const db = require("../config/database.js");

const ResisterUser = async (req, res) => {
  console.log("req.body ===", req.body);
  console.log("/ResisterUser API is started ....!!");
  // const { Password } = req.body;

  // try {
  //   const hashPassword = await bcrypt.hash(Password, 10);
  //   const CreateUser = await UserModel.create({
  //     ...req.body,
  //     Password: hashPassword,
  //   });
  //   if (!CreateUser) {
  //     res.send({ status: 401, message: "User Not Created Succesfully.." });
  //   }
  //   res.send({
  //     status: 200,
  //     message: "User  Created Succesfully..",
  //     data: CreateUser,
  //   });
  // } catch (error) {
  //   res.send({
  //     status: 401,
  //     message: "User Not Created Succesfully.." + error,
  //   });
  // }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sql = "INSERT INTO userdata (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res
      .status(201)
      .json({
        message: "User registered successfully!",
        userId: result.insertId,
      });
  });
};

// app.post('/register', (req, res) => {

//     console.log("api call");

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required!' });
//     }

//     const sql = 'INSERT INTO userdata (name, email, password) VALUES (?, ?, ?)';
//     db.query(sql, [name, email, password], (err, result) => {
//       if (err) {
//         console.error('Error inserting data:', err);
//         return res.status(500).json({ error: 'Database error' });
//       }
//       res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
//     });
//   });

module.exports = { ResisterUser };
