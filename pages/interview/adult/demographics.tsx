import { useEffect, useState } from "react";
import MultipleSelect from "../../../utils/multiple-select";
import ButtonSelect from "../../../utils/button-select";
import NumberInput from "../../../utils/number-input";
import InterviewHeader from "../../../components/interview-header";
import { useRouter } from "next/router";
import DropDownSelect from "../../../utils/drop-down-select";
import { deleteCookie, setCookie } from "cookies-next";
import { connectToDatabase } from "../../../utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { AnswerChoice, QuestionChoice } from "../../../utils/types";
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const { db } = await connectToDatabase();
  const adult_demographic_questions = await db
    .collection("questions")
    .find({ adult: true, section: "demographics" })
    .toArray();
  const all_answers = await db.collection("answers").find({}).toArray();
  const adult_demographic_question_and_answers =
    adult_demographic_questions.map(
      (question: QuestionChoice) =>
        (question.answer_choices = all_answers?.find(
          (answer: AnswerChoice) => answer._id === question.answers
        )?.choices)
    );
  const interview_id = req.cookies.interview_id;
  const interview_type = req.cookies.interview_type;
  return {
    props: {
      interview_id,
      interview_type,
      question_and_answers: JSON.parse(
        JSON.stringify(adult_demographic_question_and_answers)
      ),
    },
  };
}
export default function Demographics({
  interview_id,
  interview_type,
  question_and_answers,
}: {
  interview_id: string;
  interview_type: string;
  question_and_answers: QuestionChoice[];
}) {
  const router = useRouter();
  const [date_of_birth, setDOB] = useState(
    new Intl.DateTimeFormat("en", {
      dateStyle: "short",
    }).format(Date.now())
  );
  const [current_question, setCurrentQuestion] = useState(-1);
  useEffect(() => {
    document
      .getElementById(`question_${current_question}`)
      ?.setAttribute("style", "display: flex; flex-direction: column;");
    current_question > question_and_answers?.length - 1 &&
      document
        .querySelector("#page_submit")
        ?.setAttribute("style", "display: flex; flex-direction: column;");
  }, [current_question, question_and_answers]);
  const set_DOB = (e: any) => {
    setDOB(e.target.value);
    setCurrentQuestion(current_question + 1);
  };
  const pageSubmit = async (e: any) => {
    e.preventDefault();
    let section = "demographics";
    const state = question_and_answers.map((question: QuestionChoice) =>
      question.number_input
        ? [question.state, 0]
        : question.multiple
        ? [question.state, []]
        : [question.state, ""]
    );
    let section_info = Object.fromEntries(state);
    section_info = Object.assign(section_info, {
      date_of_birth: date_of_birth,
    });
    question_and_answers.map((question: QuestionChoice) => {
      if (question.multiple) {
        let options = document.getElementById(question.state)
          ?.children as HTMLCollection;
        let inputArr = [];
        for (let i = 0; i < options?.length; i++) {
          (options[i] as HTMLOptionElement).selected &&
            inputArr.push((options[i] as HTMLOptionElement).value);
        }
        section_info[question.state] = inputArr;
      } else if (question.number_input) {
        section_info[question.state] = parseInt(
          (document.getElementById(question.state) as HTMLInputElement).value
        );
      } else {
        section_info[question.state] = (
          document.getElementById(question.state) as HTMLInputElement
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
    if (res.acknowledged) {
      router.push("/interview/adult/risk_attitudes");
    }
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
      <InterviewHeader section={1} edit={false} />
      <h1 className="title">Demographic Information</h1>
      <h2>Date of Birth</h2>
      <input type="date" onChange={set_DOB} />
      <form className="section_questions" onSubmit={pageSubmit}>
        {question_and_answers?.map((question: QuestionChoice, i: number) => {
          if (question.multiple) {
            return (
              <MultipleSelect
                question={question}
                id={`question_${i}`}
                key={question._id}
                setCurrentQuestion={setCurrentQuestion}
              />
            );
          } else if (question.number_input) {
            return (
              <NumberInput
                question={question}
                id={`question_${i}`}
                key={question._id}
                setCurrentQuestion={setCurrentQuestion}
              />
            );
          } else if (question.drop_down) {
            return (
              <DropDownSelect
                question={question}
                id={`question_${i}`}
                key={question._id}
                setCurrentQuestion={setCurrentQuestion}
              />
            );
          } else {
            return (
              <ButtonSelect
                question={question}
                id={`question_${i}`}
                key={question._id}
                setCurrentQuestion={setCurrentQuestion}
              />
            );
          }
        })}
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
