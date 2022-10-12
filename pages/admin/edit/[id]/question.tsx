import Link from "next/link";
import { connectToDatabase } from "../../../../utils/mongodb";
import useSWR from "swr";
import fetcher from "../../../../utils/fetcher";
import titleCase from "../../../../utils/titleCase";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Cookies from "cookies";
export default function BasePage({
  question_id,
  question_choice,
}: {
  question_choice: any;
  question_id: string;
}) {
  const user_data = useSelector((state: any) => state.user);

  const router = useRouter();
  const [selected_answer, setAnswer] = useState({
    _id: "",
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
  const handleAnswerChange = (e: any) => {
    const answer_id = e.target.value;
    setAnswer(answer_data.filter((answer: any) => answer._id === answer_id));
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

    const response = await fetch("/api/questions/edit", {
      headers: { question_id: question_id, editor: user_data.user.editor },
      method: "POST",
      body: JSON.stringify(question_data),
    }).then((res) => res.json());
    const question_cache = await caches.open("questions");
    question_cache.put("/all", await fetch("/api/questions/all"));
    question_cache.put("/adult/all", await fetch("/api/questions/adult/all"));
    question_cache.put("/youth/all", await fetch("/api/questions/youth/all"));
    response.acknowledged && router.push("/admin/questions");
  };
  const { data: answer_data, error: answer_err } = useSWR(
    "/api/answers/all",
    fetcher
  );
  const { data: section_data, error: section_err } = useSWR(
    "/api/questions/all",
    fetcher
  );
  const question_sections: Array<string> = Array.from(
    new Set(section_data?.map((question: any) => question.section))
  );
  if (section_err || answer_err)
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
    );
  if (!user_data.user?.editor) {
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
        {question_sections.map((section: string) => (
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
      <select name="adult" defaultValue={question_choice.adult} id="adult">
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
            onChange={(e: any) => setQuestionDetails(e.target.value)}
          />
        </>
      ) : (
        <>
          <h2>Add Question Details</h2>
          <input
            name="detail"
            id="detail"
            onChange={(e: any) => setQuestionDetails(e.target.value)}
          />
        </>
      )}
      {answers_available && (
        <>
          <h2>Answer Set</h2>
          <select
            defaultValue={question_choice.answers}
            onChange={handleAnswerChange}
            id="answers"
          >
            <option value="">Select...</option>
            {answer_data.map((answer_choice: any) => (
              <option key={answer_choice._id} value={answer_choice._id}>
                {titleCase(answer_choice.type.split("_").join(" "))}
              </option>
            ))}
          </select>
          <h3>Answer Choices</h3>
          {selected_answer.choices.map((choice: string) => (
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

export async function getServerSideProps({ req, res, ctx }: any) {
  const { db } = await connectToDatabase();
  const cookies = new Cookies(req, res);
  const user_editor = cookies.get("user_editor");
  if (!user_editor) {
    return {
      props: {
        question_choice: "",
        question_id: "",
      },
    };
  }
  const question_choice = await db
    .collection("questions")
    .findOne({ _id: ctx.params.id });
  return {
    props: {
      question_choice: question_choice
        ? JSON.parse(JSON.stringify(question_choice))
        : {},
      question_id: ctx.params.id ? ctx.params.id : "",
    },
  };
}
