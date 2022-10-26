const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const todoControllers = require("../controllers/todos");
const { request } = require("express");

const { SECRET } = process.env;

const create = async function(userData){
    userData.ROLE = "basic";
    const newUser = await userModel.create(userData);
    request.user = newUser;
    const {username, _id, ROLE} = newUser;
    return jwt.sign({username, id: _id, ROLE }, SECRET, {expiresIn: "1h"});

}

const login = async function(username, password){
    const user = await userModel.findOne({ username });
    const valid = await user.comparePassword(password);
    if(valid){
        request.user = user;
        return jwt.sign({username, userID: user.id}, SECRET, {expiresIn: "1h"});
    } else {
        throw "UN_AUTH";
    }
}

const findUser = function(id, userID){
    if(userID === id){
        return userModel.findOne({_id: id})
    }
    else{
        throw "UN_AUTH";
    }
}

const findTodos = function(id, userID){
    if(id === userID){
        return todoControllers.findUserTodos(id);
    } else{
        throw "UN_AUTH";
    }
}

const patch = function(userID, id, editedData){
    if(userID === id){
        const options = {runValidators: true, new: true};
        return userModel.findOneAndUpdate({_id:id, userId: userID}, editedData, options).exec();
    } else{
        throw "UN_AUTH";
    }
    
}

module.exports = {create, login, findUser, findTodos, patch};