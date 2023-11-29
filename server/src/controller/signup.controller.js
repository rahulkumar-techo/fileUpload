import User from "../model/userSchema.js";
import ResMsg from "../utils/ResMsg.js";

const SignUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      new ResMsg(400, "Please provide username, email, and password").send(res);
      return;
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return new ResMsg(401, "userAlready Exist").send(res);


      const userdoc =  new User({
        username,email,password
      })

    const isSave= await userdoc.save();
    if(!isSave){
        new ResMsg(501,"not able to save documents").send(res)
    }
    else{
        new ResMsg(200,"Document has been saved ").send(res)
    }


  } catch (error) {
    // Handle any other errors
    console.error("Error in SignUp:", error);
    new ResMsg(500, "Internal Server Error").send(res);
  }
};

export default SignUp;
