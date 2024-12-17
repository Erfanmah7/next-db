export default function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || name.length <= 3) {
      res.status(422).json({ status: "failed", message: "invalid data" });
    }
    res
      .status(201)
      .json({ status: "success", message: "created data", data: { name } });
  }
}
