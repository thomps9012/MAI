import titleCase from "../../../utils/titleCase";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import { AnswerChoice, QuestionChoice } from "../../../utils/types";
export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const { db } = await connectToDatabase();
  const user_id = req.cookies.user_id;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  const answers = await db.collect("answers").find().toArray();
  const questions = await db.collect("questions").find().toArray();
  return {
    props: {
      user_editor,
      answers: JSON.parse(JSON.stringify(answers)),
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
}
export default function BasePage({
  user_editor,
  answers,
  questions,
}: {
  questions: QuestionChoice[];
  answers: AnswerChoice[];
  user_editor: boolean;
}) {
  const router = useRouter();
  const [selected_answer, setAnswer] = useState({
    _id: new ObjectId(""),
    type: "",
    choices: [""],
  });
  const [multiple, setMultiple] = useState(false);
  const [number_input, setNumberInput] = useState(false);
  const [answers_available, setAnswersAvailable] = useState(false);
  const [question_details, setQuestionDetails] = useState("");
  const handleAnswerChange = (e: any) => {
    const answer_id = e.target.value;
    setAnswer(
      answers?.filter((answer: AnswerChoice) => answer?._id === answer_id)[0]
    );
  };
  const saveEdits = async () => {
    let question_data;
    answers_available && multiple && question_details != ""
      ? (question_data = {
          adult: JSON.parse(
            (document.getElementById("adult") as HTMLSelectElement)?.value
          ),
          answers: (document.getElementById("answers") as HTMLInputElement)
            ?.value,
          multiple: true,
          detail: (document.getElementById("detail") as HTMLInputElement)
            ?.value,
          state: (document.getElementById("state") as HTMLInputElement)?.value,
          section: (document.getElementById("section") as HTMLInputElement)
            ?.value,
        })
      : answers_available && multiple
      ? (question_data = {
          adult: JSON.parse(
            (document.getElementById("adult") as HTMLSelectElement)?.value
          ),
          answers: (document.getElementById("answers") as HTMLInputElement)
            ?.value,
          multiple: true,
          state: (document.getElementById("state") as HTMLInputElement)?.value,
          section: (document.getElementById("section") as HTMLInputElement)
            ?.value,
        })
      : answers_available && question_details
      ? (question_data = {
          adult: JSON.parse(
            (document.getElementById("adult") as HTMLSelectElement)?.value
          ),
          answers: (document.getElementById("answers") as HTMLInputElement)
            ?.value,
          state: (document.getElementById("state") as HTMLInputElement)?.value,
          section: (document.getElementById("section") as HTMLInputElement)
            ?.value,
        })
      : number_input &&
        (question_data = {
          adult: JSON.parse(
            (document.getElementById("adult") as HTMLSelectElement)?.value
          ),
          state: (document.getElementById("state") as HTMLInputElement)?.value,
          section: (document.getElementById("section") as HTMLInputElement)
            ?.value,
          number_input: true,
        });
    const response = await fetch("/api/questions/add", {
      method: "POST",
      body: JSON.stringify(question_data),
    }).then((res) => res.json());
    response.acknowledged && router.push("/admin/questions");
  };
  const question_sections: Array<string> = Array.from(
    new Set(questions?.map((question: QuestionChoice) => question.section))
  );
  if (!user_editor) {
    return (
      <main className="landing">
        <h1>You are Unauthorized to View this Page</h1>
        <br />
        or
        <br /> <h1>Not Signed in</h1>
        <hr />
        <Link href="/sign_in">Login</Link>
        <br />
        <Link href="/sign_up">Sign Up</Link>
      </main>
    );
  }
  return (
    <main className="container">
      <h2>Question Language</h2>
      <input name="question" id="question" />
      <h2>Question Section</h2>
      <select name="section" id="section">
        {question_sections?.map((section: string) => (
          <option key={section} value={section}>
            {titleCase(section.split("_").join(" "))}
          </option>
        ))}
      </select>
      <h2>Question Identifier</h2>
      <span>
        Think of it as a shorthand expression used to represent it in data
      </span>
      <input name="state" id="state" />
      <h2>Availble to Adult or Youth</h2>
      <select name="adult" id="adult">
        <option value="true">Adult</option>
        <option value="false">Youth</option>
        <option value="null">Both</option>
      </select>
      <h2>Add Question Details ?</h2>
      <input
        name="detail"
        id="detail"
        onChange={(e: any) => setQuestionDetails(e.target.value)}
      />
      {answers_available ? (
        <>
          <h2>Answer Set</h2>
          <select onChange={handleAnswerChange} id="answers">
            <option value="">Select...</option>
            {answers.map((answer_choice: AnswerChoice) => (
              <option
                key={JSON.stringify(answer_choice._id)}
                value={JSON.stringify(answer_choice._id)}
              >
                {titleCase(answer_choice.type.split("_").join(" "))}
              </option>
            ))}
          </select>
          <h3>Answer Choices</h3>
          {selected_answer.choices.map((choice: string) => (
            <p key={choice}>{choice}</p>
          ))}
        </>
      ) : (
        <>
          <h2>Preselected Answer Options</h2>
          <a className="button" onClick={() => setAnswersAvailable(true)}>
            Yes
          </a>
        </>
      )}
      {multiple ? (
        <>
          <h2>Multiple Answers Allowed</h2>
          <a className="button" onClick={() => setMultiple(false)}>
            Change
          </a>
        </>
      ) : (
        <>
          <h2>Multiple Answers Not Allowed</h2>
          <span>*** Changing this will disable number input ***</span>
          <a
            className="button"
            onClick={() => {
              setMultiple(true);
              setNumberInput(false);
              setAnswersAvailable(true);
            }}
          >
            Change
          </a>
        </>
      )}
      {number_input ? (
        <>
          <h2>Number Input</h2>
          <a
            className="button"
            onClick={() => {
              setNumberInput(false);
              setAnswersAvailable(true);
            }}
          >
            Change
          </a>
        </>
      ) : (
        <>
          <h2>Number Input Not Allowed</h2>
          <span>*** Changing this will disable answer choices ***</span>
          <a
            className="button"
            onClick={() => {
              setNumberInput(true);
              setAnswersAvailable(false);
              setMultiple(false);
            }}
          >
            Change
          </a>
        </>
      )}
      <a className="button" onClick={saveEdits}>
        Add Question
      </a>
    </main>
  );
}
