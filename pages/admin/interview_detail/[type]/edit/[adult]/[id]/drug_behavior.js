import { deleteCookie } from "cookies-next";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import InterviewProgress from "../../../../../../../components/progress-bar";
import EditButtonSelect from "../../../../../../../utils/edit-button-select";
import EditDropDownSelect from "../../../../../../../utils/edit-drop-down-select";
import EditMultipleSelect from "../../../../../../../utils/edit-multiple-select";
import EditNumberInput from "../../../../../../../utils/edit-number-input";
import { connectToDatabase } from "../../../../../../../utils/mongodb";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, query, res }) {
  const { db } = await connectToDatabase();
  const logged_in = getCookie("logged_in", { req, res });
  const user_id = getCookie("user_id", { req, res });
  const interview_type = query.type;
  const client_adult = query.adult;
  const interview_id = query.id;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  const drug_behavior_questions = await db
    .collection("questions")
    .find({ section: "drug_behavior" })
    .toArray();
  const all_answers = await db.collection("answers").find({}).toArray();
  const drug_behavior_question_and_answers = drug_behavior_questions.map(
    (question) => ({
      ...question,
      answer_choices: all_answers?.find(({ _id }) =>
        _id.equals(question.answers)
      )?.choices,
    })
  );
  if (!user_editor) {
    return {
      props: {
        user_editor,
        interview_record: {},
        adult: false,
        logged_in,
        drug_behavior_question_and_answers: [],
      },
    };
  }
  const interview_record = await db
    .collection(interview_type)
    .findOne({ _id: new ObjectId(interview_id) }, { "behaviors.drug": 1 });
  return {
    props: {
      user_editor,
      interview_record: JSON.parse(JSON.stringify(interview_record)),
      adult: JSON.parse(JSON.stringify(client_adult)),
      interview_type,
      interview_date: interview_record.date,
      interview_id,
      logged_in,
      drug_behavior_question_and_answers: JSON.parse(
        JSON.stringify(drug_behavior_question_and_answers)
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
  interview_date,
  logged_in,
  drug_behavior_question_and_answers,
}) {
  const router = useRouter();
  const { behaviors } = interview_record;
  const { drug } = behaviors;
  const pageSubmit = async (e) => {
    e.preventDefault();
    let section = "drug_behavior";
    const state = drug_behavior_question_and_answers.map((question) =>
      question.number_input
        ? [question.state, 0]
        : question.multiple
        ? [question.state, []]
        : [question.state, ""]
    );
    let section_info = Object.fromEntries(state);
    drug_behavior_question_and_answers.map((question) => {
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
      <h1 className="title">Edit Drug Behavior</h1>
      <InterviewProgress
        section={4}
        edit={true}
        interview_date={interview_date}
        interview_type={interview_type}
        client_PID={client_PID}
      />
      <h3>Over the past 30 days how many days, if any did you ...</h3>
      <form className="section_questions" onSubmit={pageSubmit}>
        {drug_behavior_question_and_answers?.map((question, i) => {
          const { multiple, number_input, drop_down, _id, state } = question;
          if (multiple) {
            return (
              <EditMultipleSelect
                question={question}
                id={`question_${i}`}
                key={_id}
                defaultValue={drug[state]}
              />
            );
          } else if (number_input) {
            return (
              <EditNumberInput
                question={question}
                id={`question_${i}`}
                key={_id}
                defaultValue={drug[state]}
              />
            );
          } else if (drop_down) {
            return (
              <EditDropDownSelect
                question={question}
                id={`question_${i}`}
                key={_id}
                defaultValue={drug[state]}
              />
            );
          } else {
            return (
              <EditButtonSelect
                question={question}
                id={`question_${i}`}
                key={_id}
                defaultValue={drug[state]}
              />
            );
          }
        })}
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
