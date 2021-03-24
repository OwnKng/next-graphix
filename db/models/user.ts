import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
