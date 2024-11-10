import User from "../model/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: "customer" }).select("-password");
    return res.status(200).json({ users: allUsers, succes: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({ user, succes: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("status");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    user.status = user.status === "active" ? "hold" : "active";
    await user.save();
    return res.status(200).json({ user, succes: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
