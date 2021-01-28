const Queue = require("./queue");

class BottomQueue extends Queue {
    constructor(size) {
        super(size)
        this.init()
    }

    init() {
        const bottomBalls = new Array(this.size)
        const mapFillBottomQueue = (_, index) => index + 1
        this.balls = Array.from(bottomBalls, mapFillBottomQueue)
        this.receiveDroppedBalls = ball => this.balls.push(ball)
    }

    isOrdered() {
        if (this.balls.length !== this.size) {
            return false
        }
        return this.balls.every((ball, ballIndex) => ball == ballIndex + 1)
    }


    print() {
        console.log(`name: BottomQueue, balls [${this.balls}]`)
    }

}

module.exports = BottomQueue