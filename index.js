require("dotenv").config()
const http = require("http")
const url = require("url")
const db = require("./db")


let port = process.env.PORT || 8080

http.createServer((request, response) => {
    let body = []
    let parsed = url.parse(request.url, true)
    let query = parsed.query
    let path = parsed.pathname

    request.on("error", (err) => {
        console.error(err)
        response.statusCode = 400;
        response.end()

    }).on("data", (chunk) => {
        body.push(chunk)
    
    }).on("end", () => {
        body = Buffer.concat(body).toString()

        // Resolve invalid JSON on POST method
        if (request.method === "POST") {
            try {
                body = JSON.parse(body)
            } catch(err) {
                response.writeHead(400, {"Content-Type": "text/html"})
                response.write(body)
                response.write("Invalid JSON Data")
                return response.end()
            }
        }
        
        // Routes
        switch (path) {
            case "/":
            case "/show":
                db.showStudent(response)
                break

            case "/create":
                if (request.method === "POST") {
                    db.addStudent(response, body)
                } else {
                    response.write("Create student")
                    response.end()
                }
                break
    
            case "/delete":
                if (request.method === "POST") {
                    db.deleteStudent(response, body)
                } else {
                    response.write("Delete student")
                    response.end()
                }
                break
    
            case "/update":
                if (request.method === "POST") {
                    db.updateStudent(response, body)
                } else {
                    response.write("Update student")
                    response.end()
                }
                break
    
            default:
                response.writeHead(404, {"Content-Type": "text/html"})
                response.write(`Page ${path} not found :(`)
                response.end()
                break
        }

    })


    // res.writeHead(200, {"Content-Type": "text/html"})
    // res.write("Hello World!")
    // res.write("<br> Your method is: " + req.method)
    // res.write("<br> Your path is: " + parsed.path)
    // res.write("<br> Your url is: " + req.url)
    // res.write("<br> Your name is: " + query.name)
    
    // res.end()

}).listen(port)

// go to localhost:8080 to access the server