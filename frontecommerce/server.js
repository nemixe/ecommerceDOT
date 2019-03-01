const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const routes = require('./routes')
const handle = routes.getRequestHandler(app)


app.prepare().then(() => {
  createServer((req, res) => {
    const parsedURL = parse(req.url, true)
    const { pathname } = parsedURL

    if (pathname === '/service-worker.js') {
      const staticPath = join(__dirname, '.next', pathname)
      app.serveStatic(req, res, staticPath)
    } else {
      handle(req, res, parsedURL)
    }
  })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`Running on port ${port}`)
    })
})