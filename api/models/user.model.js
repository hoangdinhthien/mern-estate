import mongoose from 'mongoose';

// ----- SCHEMA -----
const userSchema = new mongoose.Schema(
  // ----- USER SCHEMA -----
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
  },
  { timestamps: true } // => record two important extra information
);

// ----- MODEL -----
const User = mongoose.model('User', userSchema);

export default User;
