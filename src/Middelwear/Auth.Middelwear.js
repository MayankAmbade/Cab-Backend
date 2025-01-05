// here creating auth midddelwear to verfiy jwt Token 

const VerfiyUser = async (req , res , next ) =>{
    try {
        const token =
          req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
          res.send({ status: 401, message: "unauthorized requset" });
        }
        const verfiyJwtToken = jwt.verify(token, process.env.JWTKEY);
    
        const verfiyUser = await userModel
          .findById(verfiyJwtToken?._id)
          .select("-Password -refreshToken");
       
      
    
        if (!verfiyUser) {
          res.send({ status: 401, message: "Invalid Token" });
        }
    
        req.verfiyUser = verfiyUser;
    
        next();
      } catch (error) {
        res.send({ status: 401, message: "Invalid Token" });
      }
}