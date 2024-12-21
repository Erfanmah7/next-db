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
  const id = req.query.userId;
  if (req.method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json({ status: "success", data: user });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "error in retreving data in database",
      });
    }
  } else if (req.method === "PATCH") {
    try {
      const userData = await User.findById(id);
      userData.email = req.body.email;
      await userData.save();
      res.status(200).json({ status: "success", data: userData });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "error in updating data in database",
      });
    }
  } else if (req.method === "DELETE") {
    try {
      await User.findByIdAndDelete({ _id: id });
      res.status(200).json({ status: "success", message: "data deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "error in updating data in database",
      });
    }
  }
}
