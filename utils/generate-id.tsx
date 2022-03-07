const GenerateID = (testing_agency: String, interviewCounts: any) => {
    console.log(testing_agency)
    const { caRecords, noraRecords, taskForceRecords } = interviewCounts.interviewCounts
    switch (testing_agency) {
        case 'AIDS Task Force':
            return `ATF${taskForceRecords + 1}`;
        case 'NORA':
            return `NORA${noraRecords + 1}`
        case 'Care Alliance':
            return `CA${caRecords + 1}`
    }
}

export default GenerateID;