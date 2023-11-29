import User from "../model/userSchema.js";
import ResMsg from "../utils/ResMsg.js";

const signIn = async (req,res,next)=>{

try{
    new ResMsg(200,"successFully Login ").send(res);

}
catch(error){
    console.error("Error in SignUp:", error);
    new ResMsg(500, "Internal Server Error").send(res);
}    
}

export default signIn;