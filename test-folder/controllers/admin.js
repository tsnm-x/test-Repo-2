const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const TodoModel = require("../models/todos");
const todoControllers = require("../controllers/todos");
const { request } = require("express");

const { SECRET } = process.env;

const create = async function(userData){
    userData.ROLE = "admin";
    const newAdmin = await userModel.create(userData);
    request.user = newAdmin;
    const {username, _id, ROLE} = newAdmin;
    return jwt.sign({username, id: _id, ROLE }, SECRET, {expiresIn: "1h"});

}

const login = async function(username, password){
    const admin = await userModel.findOne({ username });
    const valid = await admin.comparePassword(password);
    if(valid){
        request.user = admin;
        return jwt.sign({username, userID: admin.id}, SECRET, {expiresIn: "1h"});
    } else {
        throw "Unauthrized... "
    }
}

const findUser = function(id){
    return userModel.findOne({_id: id})
}

const listUsers = function(){
    return userModel.find();
}

const findUserTodos = function(id){
    return todoControllers.findUserTodos(id);
}

const patchUser = function(id, editedData){
    const options = {runValidators: true, new: true};
    return userModel.findOneAndUpdate({_id:id}, editedData, options).exec();
    
}

const deleteUser = function(id){
    return userModel.findByIdAndDelete(id);
}

const listTodos = function(){
    return TodoModel.find();
}

const getTodo = function(id){
    return TodoModel.findOne(id);
}


const patchTodo = function(id, editedData){
    const options = {runValidators: true, new: true};
    return TodoModel.findOneAndUpdate({_id:id}, editedData, options).exec();
    
}

const deleteTodoItem = function(id){
    return TodoModel.findOneAndDelete({_id:id});
}

module.exports = {
    create, 
    login, 
    findUser, 
    listUsers, 
    findUserTodos, 
    patchUser, 
    deleteUser, 
    listTodos,
    getTodo,
    patchTodo,
    deleteTodoItem
    
};