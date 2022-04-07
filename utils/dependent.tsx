import StateChecker from "./stateChecker";
export default function Dependent({ questionInfo, state_details, updateState }: any) {
    const { id, question, detail, state, answerChoices } = questionInfo;
    const handleChange = () => {
        let selected = document.getElementsByName(state);
        let inputArr = [];
        try {
            for (const item in selected) {
                const inputEl = selected[item] as HTMLInputElement;
                if (inputEl.checked) inputArr.push(inputEl.value)
            }
        } finally {
            state_details[state] = inputArr
            updateState(state_details)
            StateChecker(state_details)
        }
    }
    return (
        <div id={id} key={id}>
            <h3>{question}</h3>
            <span>{detail ?? ''}</span>
            {answerChoices.map((choice: string) => {
                return (
                    <div key={choice} style={{ margin: 5, padding: 5 }}>
                        <input type='checkbox'
                            value={choice}
                            name={state}
                            onClick={handleChange}
                        />
                        <label>{choice}</label>
                    </div>
                )
            })
            }
        </div>
    )
}