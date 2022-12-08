import Link from "next/link";
import { connectToDatabase } from "../../../../utils/mongodb";
import titleCase from "../../../../utils/titleCase";
import { useState } from "react";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import { getCookie } from "cookies-next";
export default function BasePage({
  question_id,
  question_choice,
  user_editor,
  answers,
  section_data,
}) {
  const router = useRouter();
  const [selected_answer, setAnswer] = useState({
    _id: new ObjectId(""),
    type: "",
    choices: [""],
  });
  const [multiple, setMultiple] = useState(
    question_choice.multiple ? question_choice.multiple : false
  );
  const [number_input, setNumberInput] = useState(
    question_choice.number_input ? question_choice.number_input : false
  );
  const [answers_available, setAnswersAvailable] = useState(
    question_choice.answers ? true : false
  );
  const [question_details, setQuestionDetails] = useState(
    question_choice.detail ? question_choice.detail : ""
  );
  const handleAnswerChange = (e) => {
    const answer_id = e.target.value;
    setAnswer(
      answers.filter((answer) => JSON.stringify(answer._id) === answer_id)[0]
    );
  };
  const saveEdits = async () => {
    let question_data;
    answers_available && multiple && question_details != ""
      ? (question_data = {
          adult: JSON.parse(document.getElementById("adult")?.value),
          answers: document.getElementById("answers")?.value,
          multiple: true,
          detail: document.getElementById("detail")?.value,
          state: document.getElementById("state")?.value,
          section: document.getElementById("section")?.value,
        })
      : answers_available && multiple
      ? (question_data = {
          adult: JSON.parse(document.getElementById("adult")?.value),
          answers: document.getElementById("answers")?.value,
          multiple: true,
          state: document.getElementById("state")?.value,
          section: document.getElementById("section")?.value,
        })
      : answers_available && question_details
      ? (question_data = {
          adult: JSON.parse(document.getElementById("adult")?.value),
          answers: document.getElementById("answers")?.value,
          state: document.getElementById("state")?.value,
          section: document.getElementById("section")?.value,
        })
      : number_input &&
        (question_data = {
          adult: JSON.parse(document.getElementById("adult")?.value),
          state: document.getElementById("state")?.value,
          section: document.getElementById("section")?.value,
          number_input: true,
        });

    const response = await fetch("/api/questions/edit", {
      headers: {
        question_id: question_id,
        editor: JSON.stringify(user_editor),
      },
      method: "POST",
      body: JSON.stringify(question_data),
    }).then((res) => res.json());
    response.acknowledged && router.push("/admin/questions");
  };
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
      <h2>Current Question Language</h2>
      <input
        defaultValue={question_choice.question}
        name="question"
        id="question"
      />
      <h2>Current Question Section</h2>
      <select
        defaultValue={question_choice.section}
        name="section"
        id="section"
      >
        {section_data.map((section) => (
          <option key={section} value={section}>
            {titleCase(section.split("_").join(" "))}
          </option>
        ))}
      </select>
      <h2>Current Question Identifier</h2>
      <span>
        Think of it as a shorthand expression used to represent it in data
      </span>
      <input defaultValue={question_choice.state} name="state" id="state" />
      <h2>Availble to Adult or Youth</h2>
      <select
        name="adult"
        defaultValue={JSON.stringify(question_choice.adult)}
        id="adult"
      >
        <option value="true">Adult</option>
        <option value="false">Youth</option>
        <option value="null">Both</option>
      </select>
      {question_details != null ? (
        <>
          <h2>Current Question Detail</h2>
          <input
            name="detail"
            defaultValue={question_choice.detail}
            id="detail"
            onChange={(e) => setQuestionDetails(e.target.value)}
          />
        </>
      ) : (
        <>
          <h2>Add Question Details</h2>
          <input
            name="detail"
            id="detail"
            onChange={(e) => setQuestionDetails(e.target.value)}
          />
        </>
      )}
      {answers_available && (
        <>
          <h2>Answer Set</h2>
          <select
            defaultValue={JSON.stringify(question_choice.answers)}
            onChange={handleAnswerChange}
            id="answers"
          >
            <option value="">Select...</option>
            {answers.map((answer_choice) => (
              <option key={answer_choice._id} value={answer_choice._id}>
                {titleCase(answer_choice.type.split("_").join(" "))}
              </option>
            ))}
          </select>
          <h3>Answer Choices</h3>
          {selected_answer.choices.map((choice) => (
            <p key={choice}>{choice}</p>
          ))}
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
        Save Changes
      </a>
      <Link href="/admin/add/interview_question">Add New Question</Link>
    </main>
  );
}

export async function getServerSideProps({ req, query, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        question_choice: "",
        question_id: "",
        answers: [],
        section_data: [],
      },
    };
  }
  const answers = await db.collection("answers").find().toArray();
  const question_choice = await db
    .collection("questions")
    .findOne({ _id: query.id });
  const questions = await db.collection("questions").find().toArray();
  const section_data = Array.from(
    new Set(questions?.map((question) => question.section))
  );
  return {
    props: {
      user_editor,
      question_choice,
      question_id: query.id,
      section_data: JSON.parse(JSON.stringify(section_data)),
      answers: JSON.parse(JSON.stringify(answers)),
    },
  };
}
