const mongoose = require('mongoose')

const dataSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const Data = mongoose.model('Data', dataSchema)
module.exports = Data
