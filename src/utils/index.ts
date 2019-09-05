interface IColumnRange {
  max: number
  min: number
}

class Chart {
  public static calcRange = (arr: number[]): IColumnRange => {
    let max = Math.max.apply(null, arr)
    let min = Math.min.apply(null, arr)
    const maxR = Math.round(max)
    const minR = Math.round(min)
    if (max < 1 && maxR === minR) {
      // 暂不处理小于1的数字
      return { max, min }
    }
    const maxL = maxR.toString().length
    const minL = minR.toString().length
    if (maxL > 2) {
      max = Math.ceil(max / 100) * 100
    } else {
      const shift = Math.pow(10, maxL - 1)
      max = Math.ceil(max / shift) * shift
    }
    if (minL > 2) {
      min = Math.floor(min / 100) * 100
    } else {
      const shift = Math.pow(10, minL - 1)
      min = Math.floor(min / shift) * shift
    }

    return { max, min }
  }
}

const Utils = { Chart }

export default Utils
