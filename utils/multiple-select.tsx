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
            <label>{question}</label>
            <span>{detail ?? ''}</span>
            {answerChoices.map((choice: string) => {
                return (
                    <>
                        <input type='checkbox'
                            key={choice}
                            value={choice}
                            name={state}
                            onClick={handleChange}
                        />
                        <label>{choice}</label>
                    </>
                )
            })
            }
        </div>
    )
}

export default MultipleSelect;