import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    // Verify token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!token_decode.admin) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized. Admin Access Only.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ success: false, message: "Token is invalid or expired." });
  }
};

export default adminAuth;
