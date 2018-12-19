const express = require('express')
    , app = express()
    , path = require('path')
    , bodyParser = require('body-parser');


// Require routes
const indexRoutes = require('./routes/index');

// Config Body Parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Config Port for Local and Heroku connections
const port = process.env.PORT || 5000;


// Config Public Files
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Config server to handle routes
app.use(indexRoutes)



// Run the Server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
