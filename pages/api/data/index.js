import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  try {
    //connect to DB
    await connectDB();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "error in connecting data in database",
    });
    return;
  }

  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || name.length < 3) {
      res.status(422).json({ status: "failed", message: "invalid data" });
    }

    try {
      // const user = new User({ name });
      // await user.save();
      const user = await User.create({
        name: "mohammad",
        age: 27,
        phone: "0912000000",
        email: "mohammad@gmail.com",
        address: { city: "ardakan", street: "hafez" },
        courses: ["next"],
      });
      res
        .status(201)
        .json({ status: "success", message: "created data", data: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "error in storing data in database",
      });
    }
  } else if (req.method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json({ status: "success", data: users });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "error in retreving data in database",
      });
    }
  }
}
