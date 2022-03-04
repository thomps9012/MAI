function StateChecker(pageState: any) {
        for (const item in pageState) {
            if (pageState[item] === '') {
                document.querySelector('button')?.setAttribute('disabled', 'true')
            } else {
                document.querySelector('button')?.removeAttribute('disabled')
            }
        }
}

export default StateChecker;