require("dotenv").config()
const { MongoClient, ServerApiVersion } = require("mongodb-legacy")
const Student = require("./model")

// Setup mongo db client
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${username}:${password}@cluster0.0mxgk.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// Setup mongo db collections
const dbName = "ItsMyKart"
const collectionName = "student"
const db = client.db(dbName)
const collection = db.collection(collectionName)


function addStudent(res, {name, class_name, major}) {
    collection.insertOne(new Student(name, class_name, major))
        .then((result) => {
            res.writeHead(200, {"Content-Type": "text/html"})
            res.write("Student added")
            res.end()
        
        }).catch(error => {
            res.writeHead(500, {"Content-Type": "text/html"})
            res.write("Internal server error")
            res.end()
        })
}


function showStudent(res) {
    collection.find({}).toArray((err, result) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/html"})
            res.write("Internal server error")
            return res.end()
        }
        let content = JSON.stringify(result, null, 2)
        res.write(`<pre>${content}</pre>`)
        res.end()
    })
}

function deleteStudent(res, filter) {
    collection.deleteMany(filter)
        .then((result) => {
            res.write(`Deleted: ${result.deletedCount} rows`)
            res.end()
        
        }).catch((err) => {
            res.writeHead(500, {"Content-Type": "text/html"})
            res.write("Internal server error")
            res.end()
        })
}

function updateStudent(res, {filter, change}) {
    let update = {"$set": change}
    
    collection.updateOne(filter, update)
        .then(result => {
            res.write(`Modified: ${result.modifiedCount} rows`)
            res.end()

        }).catch((err) => {
            res.writeHead(500, {"Content-Type": "text/html"})
            res.write("Internal server error")
            res.end()
        })
}

module.exports = {
    addStudent: addStudent,
    showStudent: showStudent,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent,
}