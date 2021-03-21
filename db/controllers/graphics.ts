/* eslint-disable import/prefer-default-export */
import { Graphics } from '../models/graphics'

type selectionsType = {
  data: string,
  x: string,
  y: string
  geometry: string,
  color: string,
  reordered: boolean,
  title: string,
  subtitle: string,
  theme: string,
  styles: object,
  palette: string
}

export const createChart = async (userId: string, selections: selectionsType) => {
  const count = await Graphics.find({ createdBy: userId }).countDocuments()

  if (count < 8) {
    return await Graphics.create({
      ...selections,
      createdBy: userId,
    }).then((response) => response._id)
  }
  return false
}

export const getUserCharts = async (userId: string) => Graphics.find({ createdBy: userId }, { createdAt: 0, updatedAt: 0 })

export const getChart = async (chartId: string) => Graphics.findById(chartId, { createdAt: 0, updatedAt: 0 })

export const getCharts = async (offset: string) => {
  const limit = 8

  let hasNextPage = false

  let graphics = await Graphics
    .find({}, { createdAt: 0, updatedAt: 0 })
    .skip(parseInt(offset))
    .sort({ likes: -1 })
    .limit(limit + 1)

  if (graphics.length > limit) {
    hasNextPage = true
    graphics = graphics.slice(0, -1)
  }

  return graphics
}

export const likeChart = async (userId: string, chartId: string) => {
  const chart = await Graphics.findById(chartId)
  const hasUser = chart.likedBy.indexOf(userId)

  if (hasUser >= 0) {
    return Graphics.findByIdAndUpdate(
      chartId,
      {
        $pull: {
          likedBy: userId,
        },
        $inc: {
          likes: -1,
        },
      },
      {
        new: true,
      },
    )
  }
  return Graphics.findByIdAndUpdate(
    chartId,
    {
      $push: {
        likedBy: userId,
      },
      $inc: {
        likes: 1,
      },
    },
    {
      new: true,
    },
  )
}

export const likedCharts = async (userId: string) => await Graphics.find({ likedBy: userId }, { createdAt: 0, updatedAt: 0 })

export const deleteChart = async (userId: string, chartId: string) => Graphics.deleteOne({ createdBy: userId, _id: chartId })
