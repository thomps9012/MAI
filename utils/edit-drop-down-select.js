const EditDropDownSelect = ({ question, id, defaultValue }) => {
  const { state, answer_choices } = question;
  const handleChange = (e) => {
    document.getElementById(id)?.setAttribute("class", "finished-question");
  };
  return (
    <div id={id} className="edit_section_question">
      <h2>{question.question}</h2>
      <span>{question.detail && question.detail}</span>
      <select
        name={state}
        id={state}
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        <option hidden disabled>
          Select...
        </option>
        {answer_choices?.map((choice) => {
          return (
            <option value={choice} key={choice}>
              {choice}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EditDropDownSelect;
