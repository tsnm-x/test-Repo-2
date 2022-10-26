const mongoose = require("mongoose")


const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required: true,
        minLength: 5,
        maxLength: 20
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "to-do",
        enum: ["to-do","in progress", "done"]
    },
    tags: [{
        type: String,
        maxLength: 10

    }]
}, {timestamps: true});


const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;