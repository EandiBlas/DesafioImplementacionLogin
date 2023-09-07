import mongoose from "mongoose";

const userCollection = 'User';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role:{
        default: 'user',
        type:['admin','user']
    }
})

const userModel = mongoose.model(userCollection,schema);

export default userModel