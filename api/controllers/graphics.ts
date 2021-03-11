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
  palette: string
}

export const createChart = async (userId: string, selections: selectionsType) => Graphics.create({
  ...selections,
  createdBy: userId,
}).then((response) => response._id)

export const getUserCharts = async (userId: string) => Graphics.find({ createdBy: userId })

export const getChart = async (chartId: string) => Graphics.findById(chartId)

export const getCharts = async (geometry: string | undefined) => {
  if (!geometry) return Graphics.find()

  return Graphics.find({ geometry })
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

export const likedCharts = async (userId: string) => await Graphics.find({ likedBy: userId })

export const deleteChart = async (userId: string, chartId: string) => Graphics.deleteOne({ createdBy: userId, _id: chartId })
