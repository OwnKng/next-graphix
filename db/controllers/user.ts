import { User } from '../models/user'

export const getUser = async (userName: string) => await User.find({ name: userName }, { _id: 1 })
