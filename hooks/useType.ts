export const useType = (data) => {
  try {
    // get keys from the array
    const keys = Object.keys(data[0])

    // categorise types
    const types = keys.map((key) => {
      const isNumeric = data
        .map((d) => d[key])
        .filter((d) => d !== undefined && d !== null)
        .every((d) => typeof d === 'number')

      const isString = data
        .map((d) => d[key])
        .filter((d) => d !== undefined && d !== null)
        .every((d) => typeof d === 'string')

      let type

      if (isNumeric) {
        type = 'number'
      } else if (isString) {
        type = 'string'
      } else {
        type = 'other'
      }

      return {
        variable: key,
        type,
      }
    })
    return { types }
  } catch (err) {
    return { undefined }
  }
}
