const mongoose = require ("mongoose");
mongoose.connect("mongodb+srv://sayimpuvinay:MongodbV%40123@cluster0.8sk6acv.mongodb.net/")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);
module.exports = {
    todo
}