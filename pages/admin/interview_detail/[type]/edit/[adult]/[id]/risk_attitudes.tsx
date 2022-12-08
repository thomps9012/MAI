import { deleteCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import InterviewHeader from "../../../../../../../components/interview-header";
import EditButtonSelect from "../../../../../../../utils/edit-button-select";
import EditDropDownSelect from "../../../../../../../utils/edit-drop-down-select";
import EditMultipleSelect from "../../../../../../../utils/edit-multiple-select";
import EditNumberInput from "../../../../../../../utils/edit-number-input";
import { connectToDatabase } from "../../../../../../../utils/mongodb";
import {
  AnswerChoice,
  InterviewData,
  QuestionChoice,
} from "../../../../../../../utils/types";
export async function getServerSideProps({
  req,
  query,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
}) {
  const { db } = await connectToDatabase();
  const logged_in = req.cookies.logged_in;
  const user_id = req.cookies.user_id;
  const interview_type = query.type;
  const client_adult = query.adult;
  const interview_id = query.id;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  const risk_attitude_questions = await db
    .collection("questions")
    .find({ section: "risk_attitudes", adult: client_adult })
    .toArray();
  const all_answers = await db.collection("answers").find({}).toArray();
  const risk_attitude_question_and_answers = risk_attitude_questions.map(
    (question: QuestionChoice) =>
      (question.answer_choices = all_answers?.find(
        (answer: AnswerChoice) => answer._id === question.answers
      )?.choices)
  );
  if (!user_editor) {
    return {
      props: {
        user_editor,
        logged_in,
        interview_record: {},
        adult: false,
        risk_attitude_question_and_answers: [],
      },
    };
  }
  const interview_record = await db
    .collection(interview_type)
    .findOne(
      { _id: new ObjectId(interview_id as string) },
      { risk_attitudes: 1 }
    );
  return {
    props: {
      user_editor,
      logged_in,
      interview_record: JSON.parse(JSON.stringify(interview_record)),
      adult: JSON.parse(JSON.stringify(client_adult)),
      interview_type,
      interview_id,
      risk_attitude_question_and_answers: JSON.parse(
        JSON.stringify(risk_attitude_question_and_answers)
      ),
    },
  };
}
export default function EditInterviewPage({
  interview_record,
  interview_id,
  adult,
  user_editor,
  interview_type,
  risk_attitude_question_and_answers,
  logged_in,
}: {
  interview_type: string;
  interview_id: string;
  adult: boolean;
  logged_in: boolean;
  user_editor: boolean;
  interview_record: InterviewData;
  risk_attitude_question_and_answers: QuestionChoice[];
}) {
  const router = useRouter();
  const { risk_attitudes } = interview_record;
  const pageSubmit = async (e: any) => {
    e.preventDefault();
    let section = "risk_attitudes";
    const state = risk_attitude_question_and_answers.map(
      (question: QuestionChoice) =>
        question.number_input
          ? [question.state, 0]
          : question.multiple
          ? [question.state, []]
          : [question.state, ""]
    );
    let section_info = Object.fromEntries(state);
    risk_attitude_question_and_answers.map((question: QuestionChoice) => {
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
    const res = await fetch("/api/interviews/update", {
      method: "POST",
      headers: {
        interview_section: section,
        interview_type: interview_type,
        record_id: interview_id,
        editor: JSON.stringify(user_editor),
      },
      body: JSON.stringify(section_info),
    }).then((response) => response.json());
    if (res.acknowledged) {
      sessionStorage.clear();
      deleteCookie("client_phone_number");
      deleteCookie("client_name");
      router.push(
        `/admin/interview_detail/${interview_type}/edit/${adult}/${interview_id}/success`
      );
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
      deleteCookie("gift_card_id");
      router.push("/");
    }
  };
  if (!user_editor || !logged_in) {
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
      <h1 className="title">Edit Attitudes and Knowledge</h1>
      <InterviewHeader section={2} edit={true} />
      <h3>
        What level of risk do you think people have of harming themselves
        physically or in other ways when ...
      </h3>
      <form className="section_questions" onSubmit={pageSubmit}>
        {risk_attitude_question_and_answers?.map(
          (question: QuestionChoice, i: number) => {
            const { multiple, drop_down, number_input, _id, state } = question;
            if (multiple) {
              return (
                <EditMultipleSelect
                  question={question}
                  id={`question_${i}`}
                  key={_id}
                  defaultValue={
                    risk_attitudes[state as keyof typeof risk_attitudes]
                  }
                />
              );
            } else if (number_input) {
              return (
                <EditNumberInput
                  question={question}
                  id={`question_${i}`}
                  key={_id}
                  defaultValue={
                    risk_attitudes[state as keyof typeof risk_attitudes]
                  }
                />
              );
            } else if (drop_down) {
              return (
                <EditDropDownSelect
                  question={question}
                  id={`question_${i}`}
                  key={_id}
                  defaultValue={
                    risk_attitudes[state as keyof typeof risk_attitudes]
                  }
                />
              );
            } else {
              return (
                <EditButtonSelect
                  question={question}
                  id={`question_${i}`}
                  key={_id}
                  defaultValue={
                    risk_attitudes[state as keyof typeof risk_attitudes]
                  }
                />
              );
            }
          }
        )}
        <br />
        <hr />
        <br />
        <button type="submit" className="page_button">
          Save Changes
        </button>
      </form>
    </main>
  );
}
