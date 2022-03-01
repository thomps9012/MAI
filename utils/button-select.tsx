const ButtonSelect = ({questionInfo, state_details, updateState}: any) => {
    const { id, question, detail, state, answerChoices } = questionInfo;
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        state_details[name] = value
        updateState(state_details)
        console.log(state_details)
    }
    return (
        <div key={id}>
            <p>{question}</p>
            <span>{detail ?? ''}</span>
            {answerChoices.map((choice: string) => {
                return (
                    <button name={state} value={choice} key={choice} onClick={handleChange}>
                        {choice}
                    </button>
                )
            })}
        </div>
    )
}

export default ButtonSelect;