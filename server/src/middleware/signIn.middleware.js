import User from "../model/userSchema.js";
import ResMsg from "../utils/ResMsg.js";

const signIn_middleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return new ResMsg(401, "Please fill in email and password").send(res);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new ResMsg(404, "User not found").send(res);
    }

    // Verification of password
    const isPasswordMatch = await user.comparePass(password);
    if (!isPasswordMatch) {
      return new ResMsg(401, `Incorrect password ${isPasswordMatch}`).send(res);
    }

    const token = await user.generateAccessToken();
    user.tokens.push({ token });
    await user.save();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

    new ResMsg(200, "Sign-in successful", { token }).send(res);
    next();
  } catch (error) {
    console.error("Error in SignIn middleware:", error);
    new ResMsg(500, "Internal Server Error").send(res);
    next(error);
  }
};

export default signIn_middleware;
