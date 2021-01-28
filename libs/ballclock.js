const BottomQueue = require("./bottomQueue");
const Queue = require("./queue");
const Track = require("./track");


class BallClock {

    constructor(ballsNumber) {
        this.setConstants(ballsNumber)
        this.initializeClock()
    }

    setConstants(ballsNumber) {
        this.MAX_SIZE = 127
        this.MIN_SIZE = 27
        this.MINUTE_TRACK_SIZE = 4
        this.FIVE_MINUTE_TRACK_SIZE = 11
        this.HOUR_TRACK_SIZE = 11
        this.MINUTE_TRACK_NAME = "minute"
        this.FIVE_MINUTES_TRACK_NAME = "five-minute"
        this.MINUTE_TRACK_NAME = "minute"
        this.HOUR_TRACK_NAME = "hour"
        this.ballsNumber = ballsNumber
    }

    initializeClock() {
        this.ballsNumber = this.checkSize(this.ballsNumber)
        this.bottomQueue = new BottomQueue(this.ballsNumber)
        this.minuteTrack = new Track(this.MINUTE_TRACK_NAME, this.MINUTE_TRACK_SIZE)
        this.fiveMinuteTrack = new Track(this.FIVE_MINUTES_TRACK_NAME, this.FIVE_MINUTE_TRACK_SIZE)
        this.hourTrack = new Track(this.HOUR_TRACK_NAME, this.HOUR_TRACK_SIZE)
        this.tracks = [this.minuteTrack, this.fiveMinuteTrack, this.hourTrack]
        this.minutes = 0
    }

    checkSize(ballsNumber) {
        if (ballsNumber >= this.MIN_SIZE && ballsNumber <= this.MAX_SIZE) {
            return ballsNumber
        }
        return -1
    }

    printStatus() {
        console.log(`*******************************`)
        console.log(`minutes elapsed ${this.minutes}`)
        this.tracks.forEach(track => track.print());
        this.bottomQueue.print()
        console.log(`*******************************`)
    }

    tick() {
        this.minutes += 1
        const currentBall = this.bottomQueue.next()
        console.log(`currentBall ${currentBall}`)
        this.pushCurrentBall(currentBall)
    }

    pushCurrentBall(currentBall) {
        if (!this.minuteTrack.push(currentBall)) {
            this.minuteTrack.drop(this.bottomQueue.receiveDroppedBalls)
            if (!this.fiveMinuteTrack.push(currentBall)) {
                this.fiveMinuteTrack.drop(this.bottomQueue.receiveDroppedBalls)
                if (!this.hourTrack.push(currentBall)) {
                    this.hourTrack.drop(this.bottomQueue.receiveDroppedBalls)
                    this.bottomQueue.push(currentBall)
                }
            }
        }
        this.printStatus()
    }



    start() {
        console.log("Starting Ball Clock")
        // for (let index = 0; index < 6; index++) {
        //     this.tick()

        // }
        do {
            this.tick()
        } while (!this.bottomQueue.isOrdered());
    }

    getResult() {
        return ` ${this.ballsNumber} balls cycle after ${this.minutes / (24 * 60)} days`
    }

}

module.exports = BallClock