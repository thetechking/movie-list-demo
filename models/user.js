import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    trim : true,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  password:{
    type : String,
    trim: true
  },
});

const User = models.User || model("User", UserSchema);

export default User;