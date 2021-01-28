
const BallClock = require("./libs/ballclock");

console.log("Starting clock simulation")
const clocks = [30, 45, 0]
const answers = new Array(clocks.length)
clocks.forEach((clockBalls, clockIndex) => {
    if (clockBalls != 0) {
        let ballClock = new BallClock(clockBalls)
        console.log(`=============== Simulation ${clockIndex++} start ===============`)
        ballClock.start()
        console.log(`=============== Simulation ${clockIndex++} finished ===============`)
        answers[clockIndex] = ballClock.getResult()
    } else {
        printResults()
    }
});

function printResults() {
    console.log('\x1b[32m', `=============================================`)
    console.log('\x1b[32m', `Simulations Completed`)
    console.log('\x1b[32m', `Output`)
    answers.forEach(answer => {
        console.log(`   * ${answer}`)
    });
}