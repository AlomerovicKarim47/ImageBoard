import express from 'express'
import config from './config'
import loadApp from './loaders'

const startApp = async () => {
    const app = express()
    await loadApp(app)
    app.listen(config.PORT)
    console.log(`BACKEND RUNNING ON PORT ${config.PORT}.`)
}
startApp()