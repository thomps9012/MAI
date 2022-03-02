const MultipleSelect = ({ questionInfo, state_details, updateState }: any) => {
    const { id, question, detail, state, answerChoices } = questionInfo;
    const handleChange = (e: any) => {
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
            console.log(state_details)
        }
    }
    return (
        <div key={JSON.stringify(id)}>
            <h2>{question}</h2>
            <span>{detail ?? ''}</span>
            {answerChoices.map((choice: string) => {
                return (
                    <div key={choice} style={{fontSize: 'large', margin: 5, padding: 5}}>
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

export default MultipleSelect;