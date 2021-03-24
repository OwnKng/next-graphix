import { User } from '../models/user'

export const getUser = async (id: string) => await User.findById({ _id: id }, { _id: 0, name: 1, image: 1 })
