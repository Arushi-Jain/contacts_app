var express = require('express')
var router = express.Router()
var getcontact = require("./service/contact.service")


router.get("/status",(req,res)=>res.send("Welcome to contacts server"))

// define the contact route
router.post('/contacts',function (req, res) {
  getcontact(req,res)
})

module.exports = router