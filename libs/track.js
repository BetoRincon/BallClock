const Queue = require("./queue");

class Track extends Queue {
    constructor(name, size) {
        super(size)
        this.name = name
    }

    drop(callback) {
        console.log(`Dropping ${this.name} balls`)
        for (let index = 0; index < this.size; index++) {
            callback(this.last())
        }
    }

    print() {
        console.log(`Track: ${this.name} balls [${this.balls}]`)
    }
}

module.exports = Track