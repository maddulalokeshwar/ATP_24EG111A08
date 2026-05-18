// File: week-2/day-4/OTPCountdownSim.js | Description: OTPCountdown Sim
console.log('OTP Sent Successfully')
let seconds=10
let intervalId=setInterval(() => {
    seconds--;
    console.log(`Otp will resend in ${seconds} secs`)
    if(seconds==0){
        console.log("Resend OTP..")
        clearInterval(intervalId)
    }
}, 1000);