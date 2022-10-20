let uuid = require("uuid")

class Student {
    constructor(name, class_name, major) {
        this.id = uuid.v4()
        this.name = name
        this.class_name = class_name
        this.major = major
    }
}

module.exports = Student