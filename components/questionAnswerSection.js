import ButtonSelect from "../utils/button-select";
import DropDownSelect from "../utils/drop-down-select";
import MultipleSelect from "../utils/multiple-select";
import NumberInput from "../utils/number-input";

export default function QuestionAndAnswers({
  question_and_answers,
  setCurrentQuestion,
}) {
  return (
    <>
      {question_and_answers?.map((question, i) => {
        const { multiple, number_input, drop_down, _id } = question;
        if (multiple) {
          return (
            <MultipleSelect
              question={question}
              id={`question_${i}`}
              key={_id}
              setCurrentQuestion={setCurrentQuestion}
            />
          );
        } else if (number_input) {
          return (
            <NumberInput
              question={question}
              id={`question_${i}`}
              key={_id}
              setCurrentQuestion={setCurrentQuestion}
            />
          );
        } else if (drop_down) {
          return (
            <DropDownSelect
              question={question}
              id={`question_${i}`}
              key={_id}
              setCurrentQuestion={setCurrentQuestion}
            />
          );
        } else {
          return (
            <ButtonSelect
              question={question}
              id={`question_${i}`}
              key={_id}
              setCurrentQuestion={setCurrentQuestion}
            />
          );
        }
      })}
    </>
  );
}
