var express = require("express");
var app = express();
const path = require('path')

const port = process.env.PORT || 5000
var routes = require('./routes')
const db = require("./models");
const cors = require('cors')
const bodyParser = require('body-parser')



app.use(cors())
app.use(express.static(path.join(__dirname, 'contacts_client/build')))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json()) // for parsing application/json
app.use("/", routes);


app.listen(port, () => {
    console.log("Server running on port 5000");
});

// sequelize
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/contacts_client/build/index.html'))
})
