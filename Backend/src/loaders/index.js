import loadMongoose from './mongoose'
import loadExpress from './express'

const loadApp = async (expressApp) => {
    loadExpress(expressApp)
    console.log("EXPRESS LOADED.")
    await loadMongoose()
    console.log("DATABASE LOADED.")
}

export default loadApp