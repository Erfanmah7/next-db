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

  try {
    const id = req.query.userId;
    const user = await User.findById(id);
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "error in retreving data in database",
    });
  }
}
