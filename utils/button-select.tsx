const ButtonSelect = ({ questionInfo, state_details, updateState }: any) => {
    const { id, question, detail, state, answerChoices } = questionInfo;
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        state_details[name] = value
        updateState(state_details)
        console.log(state_details)
    }
    return (
        <div key={id}>
            <h3>{question}</h3>
            <span>{detail ?? ''}</span>
                <div key={state} className={answerChoices.length === 2 ? 'multiButton' : 'twoButton'}>
                        {answerChoices.map((choice: string) => {
                            return (
                                <button name={state} key={`${choice}${state}`} value={choice} onClick={handleChange}>
                                    {choice}
                                </button>
                            )
                        })}
                    </div>
                </div>
                )
}

            export default ButtonSelect;