import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  //connect to DB
  await connectDB();

  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || name.length <= 3) {
      res.status(422).json({ status: "failed", message: "invalid data" });
    }

    // const user = new User({ name });
    // await user.save();

    const user = await User.create({ name });

    res
      .status(201)
      .json({ status: "success", message: "created data", data: { name } });
  }
}
