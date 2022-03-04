import { useEffect } from "react"

function StateChecker(pageState: any) {
        for (const item in pageState) {
            console.log(item)
            console.log(pageState[item])
            if (pageState[item] === '') {
                document.querySelector('button')?.setAttribute('disabled', 'true')
            } else {
                document.querySelector('button')?.removeAttribute('disabled')
            }
        }
}

export default StateChecker;