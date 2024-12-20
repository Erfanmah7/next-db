import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, minLength: 3 },
  phone: String,
  age: { type: Number, min: 18, max: 70 },
  email: { type: String, required: true },
  address: { city: String, street: String, alley: String },
  courses: [String],
  createdAt: { type: Date, default: () => Date.now() },
});

const User = models.User || model("User", userSchema);

export default User;
