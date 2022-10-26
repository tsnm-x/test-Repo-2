const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");
const {promisify} = require("util");
const verify = promisify(jwt.verify);

const { SECRET } = process.env;

const auth = async (req, res, next) => {
    if(req.user.ROLE === "basic"){
        const {authorization} = req.headers;
        const user = await verify(authorization, SECRET).catch(e=>res.status(401).json({error: "UN_AUTH"}));
        req.user = await UserModel.findById(user.id);
    }
    next();
    
}

module.exports = auth;