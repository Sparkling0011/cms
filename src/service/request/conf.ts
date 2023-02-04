let BASE_URL = ''
let TIME_OUT = 2000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000'
  TIME_OUT = 1000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'httpbin.org/ '
}

export { BASE_URL, TIME_OUT }
