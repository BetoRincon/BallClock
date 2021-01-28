class Queue {

    constructor(size) {
        this.size = size
        this.balls = []
    }

    push(ball) {
        if (this.isFull()) {
            return false
        }
        return !!this.balls.push(ball)
    }

    next() {
        return this.balls.shift()
    }

    last() {
        return this.balls.pop()
    }

    isFull() {
        return this.balls.length == this.size
    }
}

module.exports = Queue

