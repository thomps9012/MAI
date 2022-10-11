import { useState } from "react";

const ButtonSelect = ({ question, id, setCurrentQuestion }: any) => {
  const { state, answer_choices } = question;
  const [question_state, setQuestionState] = useState("");
  const handleChange = (e: any) => {
    const answer = e.target.id.split("_")[2];
    setQuestionState(answer);
    const other_elements = document.getElementById(e.target.id)?.parentElement
      ?.childNodes;
    for (const item in other_elements) {
      const element_classname = (other_elements[parseInt(item)] as HTMLElement)
        ?.className;
      const element_id = (other_elements[parseInt(item)] as HTMLElement)?.id;
      if (e.target.id != element_id && element_classname != "other_element") {
        (other_elements[parseInt(item)] as HTMLElement)?.setAttribute(
          "class",
          "button"
        );
      } else {
        document
          .getElementById(e.target.id)
          ?.setAttribute("class", "button-selected");
      }
    }
    setCurrentQuestion(parseInt(id.split("_")[1]) + 1);
    document.getElementById(id)?.setAttribute("class", "finished-question");
  };
  return (
    <div id={id} className="section_question">
      <h2 className="other_element">{question.question}</h2>
      <input
        className="other_element"
        style={{ display: "none" }}
        name={state}
        id={state}
        defaultValue={question_state}
      />
      <span className="other_element">
        {question.detail && question.detail}
      </span>
      {answer_choices?.map((choice: string) => (
        <a
          className="button"
          key={choice}
          onClick={handleChange}
          id={id + "_" + choice}
        >
          {choice}
        </a>
      ))}
    </div>
  );
};

export default ButtonSelect;
