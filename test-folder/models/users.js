const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 8
    },
    password:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    lastName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    dob: {
        type: Date,
    },
    ROLE: {
        type: String,
        required: true,
        enum: ["basic", "admin"]
    }
}, {timestamps: true});

userSchema.pre('save', function(){
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;