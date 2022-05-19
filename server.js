// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

const fs = require('fs');
const path = require('path');

const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT

const app = express()

// swaggerRouter configuration
const swaggerOptions = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};
// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.load(spec);

//mongo connnection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// MIDDLEWARE
app.use(express.urlencoded({extended: true}))

//get langues controller
const languagesController = require('./controllers/languages_controller')
app.use("/languages", languagesController)
// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the Hello World! API')
})


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(swaggerOptions));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // LISTEN
  app.listen(PORT, () => {
    console.log('Greetings! From port: ', PORT);
    console.log(`http://localhost:${PORT}/docs`)
  })
})