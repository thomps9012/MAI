import StateChecker from "./stateChecker";

const EditNumberInput = ({ question, id, defaultValue }: any) => {
  const { state } = question;
  const handleChange = (e: any) => {
    document.getElementById(id)?.setAttribute("class", "finished-question");
  };
  return (
    <div id={id} className="edit_section_question">
      <h2>{question.question}</h2>
      <span>{question.detail && question.detail}</span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          defaultValue={defaultValue}
          className="number-input"
          type="number"
          min={0}
          name={state}
          id={state}
          onChange={handleChange}
        />
        <div className="unknown-checkbox">
          <input
            id={state}
            className="checkbox"
            type="checkbox"
            name={state}
            onClick={handleChange}
            value="0"
          />
          <span> {"Don't know or can't say"}</span>
        </div>
      </div>
    </div>
  );
};

export default EditNumberInput;
