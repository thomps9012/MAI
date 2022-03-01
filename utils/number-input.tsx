const NumberInput = (({ questionInfo, state_details, updateState }: any) => {
    const { id, question, definition, state } = questionInfo;
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        state_details[name] = parseInt(value)
        updateState(state_details)
        console.log(state_details)
    }
    return (
        <div key={id}>
            <p>{question}</p>
            <span>{definition ?? ''}</span>
            <input
                type='number'
                name={state}
                onChange={handleChange}
            />
            <label>{"Don't know or can't say"}</label>
            <input
                type='radio'
                name={state}
                onClick={handleChange}
                value='0'
            />
        </div>
    )

})

export default NumberInput;