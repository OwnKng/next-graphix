/* eslint-disable max-len */
export const createOne = async (model: any, userId: string, data: object) => model.create({
  ...data,
  createdBy: userId,
})

export const getOne = async (model: any, userId: string, id: string) => model.findOne({ $and: [{ _id: id }, { $or: [{ createdBy: userId }, { public: true }] }] })

export const getPublic = async (model: any, userId: string) => model.find({ $or: [{ createdBy: userId }, { public: true }] }, { _id: 1, name: 1 })

export const getMany = async (model: any, userId: string) => model.find({ createdBy: userId })

export const removeOne = async (model: any, userId: string) => model.find({ createdBy: userId, _id: id })
