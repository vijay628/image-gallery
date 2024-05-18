const mongoose = require('mongoose');
require('dotenv').config();


const MONGODB_USER = encodeURIComponent(process.env.MONGODB_USER);
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD);
const CLUSTER_NAME = process.env.CLUSTER_NAME;

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${CLUSTER_NAME}/?retryWrites=true&w=majority&appName=VotingApp`;


mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("mongo DB connected to server succussfully !!");
});

db.on('error',(err)=>{
    console.error('Mongodb connection error:', err);
})
db.on('disconnected', ()=> {
console.log("Mongo DB disconnected !");
});

module.exports = db;