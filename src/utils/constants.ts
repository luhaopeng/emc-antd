// env
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

// api url prefix
const devUrl = 'http://localhost:8080/emc'
const prodUrl = 'http://www.energyman.cn/emc'

// export
const urlPrefix = isDev ? devUrl : prodUrl

export { isDev, isProd, devUrl, prodUrl, urlPrefix }
