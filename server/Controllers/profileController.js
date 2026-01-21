import { User } from "../Model/User.js";

export const getProfile = async (req, res) => {
  try {
    let user = await User.findByPk(1);
    if (!user) {
     
      user = await User.create({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
    }
    res.json(user.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(1);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profileImage = req.file ? `/uploads/${req.file.filename}` : user.profileImage;

    await user.update({
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      dob: req.body.dob || user.dob,
      gender: req.body.gender || user.gender,
      phone: req.body.phone || user.phone,
      profileImage,
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByPk(1);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
