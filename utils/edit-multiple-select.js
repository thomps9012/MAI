import { useState } from "react";

const EditMultipleSelect = ({ question, id, defaultValue }) => {
  const { state, answer_choices } = question;
  const [question_state, setQuestionState] = useState(
    defaultValue === "" ? [] : defaultValue
  );
  const handleChange = () => {
    let selected = document.getElementsByName(state);
    let inputArr = [];
    try {
      for (const item in selected) {
        const inputEl = selected[item] as HTMLInputElement;
        if (inputEl.checked) inputArr.push(inputEl.value);
      }
    } finally {
      setQuestionState(inputArr);
      document.getElementById(id)?.setAttribute("class", "finished-question");
    }
  };
  return (
    <div className="edit_section_question" id={id}>
      <h2>{question.question}</h2>
      <span>{question.detail && question.detail}</span>
      <select
        onBlur={handleChange}
        multiple
        id={state}
        name={state}
        value={question_state}
        onChange={handleChange}
      >
        {answer_choices?.map((choice: string) => (
          <option value={choice} key={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditMultipleSelect;
