function StateChecker(pageState: any) {
    const unansweredArray = [];
    for (const item in pageState) {
        if (pageState[item] === '') {
            unansweredArray.push(item)
        }
    }
    if (unansweredArray.length != 0) {
        document.querySelector('button')?.setAttribute('disabled', 'true')
    } else {
        document.querySelector('button')?.removeAttribute('disabled')
    }

}

export default StateChecker;