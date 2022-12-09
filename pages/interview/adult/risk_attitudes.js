import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InterviewHeader from "../../../components/interview-header";
import { deleteCookie, getCookie } from "cookies-next";
import { connectToDatabase } from "../../../utils/mongodb";
import QuestionAndAnswers from "../../../components/questionAnswerSection";
export async function getServerSideProps({ req, res }) {
  const { db } = await connectToDatabase();
  const adult_risk_attitude_questions = await db
    .collection("questions")
    .find({ adult: true, section: "risk_attitudes" })
    .toArray();
  const all_answers = await db.collection("answers").find({}).toArray();
  const adult_risk_attitude_question_and_answers =
    adult_risk_attitude_questions.map(
      (question) =>
        (question.answer_choices = all_answers?.find(
          (answer) => answer._id === question.answers
        )?.choices)
    );
  const interview_id = getCookie("interview_id", { req, res });
  const interview_type = getCookie("interview_type", { req, res });
  return {
    props: {
      interview_id,
      interview_type,
      question_and_answers: JSON.parse(
        JSON.stringify(adult_risk_attitude_question_and_answers)
      ),
    },
  };
}
export default function Attitudes({
  interview_id,
  interview_type,
  question_and_answers,
}) {
  const [current_question, setCurrentQuestion] = useState(0);
  const router = useRouter();
  useEffect(() => {
    document
      .getElementById(`question_${current_question}`)
      ?.setAttribute("style", "display: flex; flex-direction: column;");
    current_question > question_and_answers?.length - 1 &&
      document
        .querySelector("#page_submit")
        ?.setAttribute("style", "display: flex; flex-direction: column;");
  }, [current_question, question_and_answers]);
  const pageSubmit = async (e) => {
    e.preventDefault();
    let section = "risk_attitudes";
    const state = question_and_answers.map((question) =>
      question.number_input
        ? [question.state, 0]
        : question.multiple
        ? [question.state, []]
        : [question.state, ""]
    );
    let section_info = Object.fromEntries(state);
    console.log(section_info);
    question_and_answers.map((question) => {
      if (question.multiple) {
        let options = document.getElementById(question.state)?.children;
        let inputArr = [];
        for (let i = 0; i < options?.length; i++) {
          options[i].selected && inputArr.push(options[i].value);
        }
        section_info[question.state] = inputArr;
      } else if (question.number_input) {
        section_info[question.state] = parseInt(
          document.getElementById(question.state).value
        );
      } else {
        section_info[question.state] = document.getElementById(
          question.state
        ).value;
      }
    });
    sessionStorage.setItem(section, JSON.stringify(section_info));
    const res = await fetch("/api/interviews/update", {
      method: "POST",
      headers: {
        interview_section: section,
        interview_type: interview_type,
        record_id: interview_id,
        editor: "true",
      },
      body: JSON.stringify(section_info),
    }).then((response) => response.json());
    if (res.acknowledged) router.push("/interview/adult/sexual_behavior");
    if (
      confirm(
        "Your cellular or internet connection is unstable \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help."
      )
    ) {
      sessionStorage.clear();
      deleteCookie("interview_type");
      deleteCookie("interview_date");
      deleteCookie("testing_agency");
      deleteCookie("client_PID");
      deleteCookie("client_phone_number");
      deleteCookie("client_name");
      deleteCookie("client_adult");
      deleteCookie("interview_id");
      router.push("/");
    }
  };
  return (
    <main className="container">
      <InterviewHeader section={2} edit={false} />
      <h1 className="title">Attitudes and Knowledge</h1>
      <h3>
        What level of risk do you think people have of harming themselves
        physically or in other ways when ...
      </h3>
      <form className="section_questions" onSubmit={pageSubmit}>
        <QuestionAndAnswers
          question_and_answers={question_and_answers}
          setCurrentQuestion={setCurrentQuestion}
        />
        <br />
        <hr />
        <br />
        <button type="submit" className="page_button" id="page_submit">
          Continue Interview
        </button>
      </form>
    </main>
  );
}
