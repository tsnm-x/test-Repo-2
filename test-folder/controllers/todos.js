const TodoModel = require("../models/todos");

const create = function(todoDetails, userID){
    const todo = todoDetails;
    todo.userId = userID;
    return TodoModel.create(todo);

}

const findUserTodos = function(userID){
    return TodoModel.find({userId: userID});
}

const patch = function(userID, id, editedData){
    const options = {runValidators: true, new: true};
    return TodoModel.findOneAndUpdate({userId: userID, _id:id}, editedData, options).exec();   
}

const deleteItem = function(id, userID){
    return TodoModel.findOneAndDelete({userId: userID, _id: id});
}

module.exports = {create, findUserTodos, patch, deleteItem};