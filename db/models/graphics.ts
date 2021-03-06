import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const graphicsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    data: {
      type: String,
      required: true,
    },
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    geometry: {
      type: String,
      required: true,
    },
    reordered: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
    theme: {
      type: String,
      required: true,
    },
    palette: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    styles: {
      xAxis: {
        textDirection: {
          type: String,
          required: true,
          default: () => 'horizontal',
        },
      },
    },
    public: {
      type: Boolean,
      required: true,
      default: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'graphics',
  },
)

export const Graphics = mongoose.models.Graphics || mongoose.model('Graphics', graphicsSchema)
