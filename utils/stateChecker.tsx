function StateChecker(pageState: any) {
    const unansweredArray = [];
    for (const item in pageState) {
        console.log(pageState[item])
        console.log(document.querySelector('button'))
        if (pageState[item] === '') {
            unansweredArray.push(pageState[item])
        }
        if (unansweredArray.length != 0) {
            document.querySelector('button')?.setAttribute('disabled', 'true')
        } else {
            document.querySelector('button')?.removeAttribute('disabled')
        }
    }
}

export default StateChecker;