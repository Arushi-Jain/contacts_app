const Users = require('../models/users.model')
const db = require("../models/index")
module.exports  = async function saveUser(userObj){
    try{
        console.log("user initiated: ")

        let user = await db.sequelize.models.Users.create(userObj)
        console.log("user: ",user.id)
    }catch(e){
        throw e
    }
}
