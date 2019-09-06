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
    return axios(setting)
  }
}

const Common = {
  UnitTree: new Request('/common/unit-tree.json', '/mock')
}

const Data = {
  History: {
    PointHis: new Request('/data/history/point-his.json', '/mock')
  },
  Meter: {
    DataSrc: new Request('/data/meter/data-src.json', '/mock'),
    ItemTree: new Request('/data/meter/item-tree.json', '/mock'),
    PointData: new Request('/data/meter/point-data.json', '/mock')
  },
  RealTime: {
    DataSrc: new Request('/data/realtime/data-src.json', '/mock'),
    ItemTree: new Request('/data/realtime/item-tree.json', '/mock'),
    PointData: new Request('/data/realtime/point-data.json', '/mock')
  },
  Usage: {
    DataSrc: new Request('/data/usage/data-src.json', '/mock'),
    PointData: new Request('/data/usage/point-data.json', '/mock')
  }
}

const Home = {
  ElecCost: new Request('/home/elec-cost.json', '/mock'),
  ElecUse: new Request('/home/elec-use.json', '/mock'),
  Events: new Request('/home/events.json', '/mock'),
  WaterCost: new Request('/home/water-cost.json', '/mock'),
  WaterUse: new Request('/home/water-use.json', '/mock')
}

const Analytics = {
  PowerFactor: {
    DataSrc: new Request('/analytics/power-factor/data-src.json', '/mock'),
    PointData: new Request('/analytics/power-factor/point-data.json', '/mock')
  }
}

export { Analytics, Common, Data, Home }
