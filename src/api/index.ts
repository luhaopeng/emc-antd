import axios, { AxiosRequestConfig } from 'axios'
import { urlPrefix } from '../utils/constants'

const DefaultAxiosSetting: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'get',
  timeout: 30000
}

class Request {
  private url: string
  private base: string

  constructor(url: string, base: string = '') {
    this.url = url
    this.base = base
  }

  public query(data: object = {}, option: AxiosRequestConfig = {}) {
    const params = new URLSearchParams()
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params.append(key, data[key])
      }
    }
    const setting = Object.assign(
      {},
      DefaultAxiosSetting,
      {
        baseURL: this.base || urlPrefix,
        data: params,
        url: this.url
      },
      option
    )
    console.log(setting)
    return axios(setting)
  }
}

const Data = {
  Meter: {
    ItemTree: new Request('/data/meter/item-tree.json', '/mock'),
    PointData: new Request('/data/meter/point-data.json', '/mock')
  }
}

export { Data }
