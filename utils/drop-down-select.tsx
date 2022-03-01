const DropDownSelect = ({questionInfo, state_details, updateState}: any) => {
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
            <select name={state} onChange={handleChange}>
            {answerChoices.map((choice: string) => {
                return (
                    <option value={choice} key={choice}>
                        {choice}
                    </option>
                )
            })}
            </select>
        </div>
    )
}

export default DropDownSelect;