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

export const createChart = async (userId: string, selections: selectionsType) => Graphics.create({
  ...selections,
  createdBy: userId,
}).then((response) => response._id)

export const getUserCharts = async (userId: string) => Graphics.find({ createdBy: userId }, { createdAt: 0, updatedAt: 0 })

export const getChart = async (chartId: string) => Graphics.findById(chartId, { createdAt: 0, updatedAt: 0 })

export const getCharts = async (geometry: string | undefined, cursor: string) => {
  const limit = 10

  let hasNextPage = false
  let cursorQuery = {}

  if (cursor) {
    cursorQuery = { _id: { $lte: cursor } }
  }

  let graphics = await Graphics.find(cursorQuery).sort({ createdAt: -1 }).limit(limit + 1)

  if (graphics.length > limit) {
    hasNextPage = true
    graphics = graphics.slice(0, -1)
  }

  const newCursor = graphics[graphics.length - 1]._id

  return {
    graphics,
    cursor: newCursor,
  }
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

/*

const limit = 10

  const hasNextPage = false
  let cursorQuery = {}

  if (cursor) {
    cursorQuery = { _id: { $lte: cursor } }
  }

  if (graphics.length < limit) {
    hasNextPage = true
    graphics = graphics.slice(0, -1)
  }

  const newCursor = graphics[graphics.length - 1]._id

  return {
    graphics,
    cursor: newCursor,
    hasNextPage,
  }
*/
