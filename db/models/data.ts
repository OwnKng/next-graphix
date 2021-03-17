import { nanoid } from 'nanoid'
import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    createdBy: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: 'data',
  },
)

export const Data = mongoose.models.Data || mongoose.model('Data', dataSchema)
