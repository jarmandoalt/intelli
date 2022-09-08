require ('dotenv').config()
const app = require ('./app')
const { appConfig} = require ('./config')



async function initApp (appConfig){
    try {
        app.listen(appConfig.port, () => {
            console.log(`server on port ${appConfig.port}`);
        })
    } catch (error) {
        console.error(error)
        process.exit(0);
    }
}

initApp(appConfig)
