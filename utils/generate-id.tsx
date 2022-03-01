const GenerateID = (testing_agency: String) => {
    if (testing_agency === 'Task Force') {
        const recordCount = 0;
        const PID = `ATF1010${recordCount}`
        return PID;
    } else {
        const recordCount = 0;
        const PID = JSON.stringify(Math.floor(Math.random() * 10) + recordCount);
        return PID;
    }
}

export default GenerateID;