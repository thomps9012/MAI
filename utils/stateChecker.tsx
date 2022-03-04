function StateChecker(pageState: any) {
    for (const item in pageState) {
        console.log(pageState[item])
        console.log(document.querySelector('button'))
        if (pageState[item] === '') {
            document.querySelector('button')?.setAttribute('disabled', 'true')
        } else {
            document.querySelector('button')?.removeAttribute('disabled')
        }
    }
}

export default StateChecker;