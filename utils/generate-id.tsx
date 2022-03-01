const GenerateID = (interviewer: String) => {
    if (interviewer === 'Task Force Alliance') {
        const recordCount = 0;
        const PID = `ATF1010${recordCount}`
        return PID;
    } else {
        const recordCount = 0;
        const PID = Math.floor(Math.random() * 10) + recordCount;
        return PID;
    }
}

export default GenerateID;