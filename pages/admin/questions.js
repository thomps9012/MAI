import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";
import titleCase from "../../utils/titleCase";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, res }) {
  const user_id = getCookie("user_id", { req, res });
  const logged_in = getCookie("logged_in", { req, res });
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1, admin: 1 });
  const adult_questions = await db
    .collection("questions")
    .find({ adult: true })
    .toArray();
  const youth_questions = await db
    .collection("questions")
    .find({ adult: false })
    .toArray();
  const agnostic_questions = await db
    .collection("questions")
    .find({ adult: null })
    .toArray();
  const question_sections = await db
    .collection("questions")
    .aggregate([
      {
        $group: {
          _id: "$section",
        },
      },
    ])
    .toArray();
  return {
    props: {
      logged_in,
      user_admin: user.admin,
      user_editor: user.editor,
      adult_questions: JSON.parse(JSON.stringify(adult_questions)),
      youth_questions: JSON.parse(JSON.stringify(youth_questions)),
      agnostic_questions: JSON.parse(JSON.stringify(agnostic_questions)),
      question_sections: JSON.parse(JSON.stringify(question_sections)),
    },
  };
}
export default function QuestionsPage({
  user_admin,
  user_editor,
  logged_in,
  adult_questions,
  youth_questions,
  agnostic_questions,
  question_sections,
}) {
  if (!user_admin || !logged_in) {
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
  if (!user_editor) {
    return (
      <main className="container">
        <h1>View Questions</h1>
        <section className="interview_question_section">
          <h1>Sections</h1>
          {question_sections?.map(({ _id }) => (
            <div className="interview_section_detail" key={_id}>
              <p>{titleCase(_id.split("_").join(" "))}</p>
            </div>
          ))}
        </section>
        <hr />
        <section className="interview_question_section">
          <h1>Adult Questions</h1>
          {adult_questions?.map((question, i) => (
            <div className="interview_question_detail" key={question?._id}>
              <p>{titleCase(question.section.split("_").join(" "))} - </p>

              <p>{question.question} </p>
              {question.detail && <p>{question.detail}</p>}
              {i > 0 &&
                adult_questions[i].section !=
                  adult_questions[i - 1].section && <hr />}
            </div>
          ))}
        </section>
        <section className="interview_question_section">
          <h1>Youth Questions</h1>
          {youth_questions?.map((question, i) => (
            <div className="interview_question_detail" key={question._id}>
              <p>{titleCase(question.section.split("_").join(" "))} - </p>
              <p>{question.question} </p>
              {question.detail && <p>{question.detail}</p>}
              {i > 0 &&
                youth_questions[i].section !=
                  youth_questions[i - 1].section && <hr />}
            </div>
          ))}
        </section>
        <section className="interview_question_section">
          <h1>Agnostic Questions </h1>
          {agnostic_questions?.map((question, i) => (
            <div className="interview_question_detail" key={question._id}>
              <p>{titleCase(question.section.split("_").join(" "))} - </p>

              <p>{question.question} </p>
              {question.detail && <p>{question.detail}</p>}
              {i > 0 &&
                agnostic_questions[i].section !=
                  agnostic_questions[i - 1].section && <hr />}
            </div>
          ))}
        </section>
      </main>
    );
  }
  return (
    <main className="container">
      <h1>Edit Questions</h1>
      <section className="interview_question_section">
        <h1>Sections</h1>
        <h1>
          <Link href="/admin/add/interview_section">
            <a>Add New Section</a>
          </Link>
        </h1>
        {question_sections?.map(({ _id }) => (
          <div className="interview_section_detail" key={_id}>
            <p>{titleCase(_id.split("_").join(" "))}</p>
            <Link href={`/admin/edit/${_id}/interview_section`}>
              Edit Section
            </Link>
          </div>
        ))}
      </section>
      <hr />
      <h1>Questions</h1>
      <h1>
        <Link href="/admin/add/interview_question">
          <a>Add New Question</a>
        </Link>
      </h1>
      <section className="interview_question_section">
        <h1>Adult Questions</h1>
        {adult_questions?.map((question, i) => (
          <div className="interview_question_detail" key={question?._id}>
            <p>
              {titleCase(question.section.split("_").join(" "))} -{" "}
              <Link href={`/admin/edit/${question._id}/question`}>
                Edit Question
              </Link>
            </p>

            <p>{question.question} </p>
            {question.detail && <p>{question.detail}</p>}
            {i > 0 &&
              adult_questions[i].section != adult_questions[i - 1].section && (
                <hr />
              )}
          </div>
        ))}
      </section>
      <section className="interview_question_section">
        <h1>Youth Questions</h1>
        <h1></h1>
        {youth_questions?.map((question, i) => (
          <div className="interview_question_detail" key={question._id}>
            <p>
              {titleCase(question.section.split("_").join(" "))} -{" "}
              <Link href={`/admin/edit/${question._id}/question`}>
                Edit Question
              </Link>
            </p>
            <p>{question.question} </p>
            {question.detail && <p>{question.detail}</p>}
            {i > 0 &&
              youth_questions[i].section != youth_questions[i - 1].section && (
                <hr />
              )}
          </div>
        ))}
      </section>
      <section className="interview_question_section">
        <h1>Agnostic Questions </h1>
        <h1></h1>
        {agnostic_questions?.map((question, i) => (
          <div className="interview_question_detail" key={question._id}>
            <p>
              {titleCase(question.section.split("_").join(" "))} -{" "}
              <Link href={`/admin/edit/${question._id}/question`}>
                Edit Question
              </Link>
            </p>
            <p>{question.question} </p>
            {question.detail && <p>{question.detail}</p>}
            {i > 0 &&
              agnostic_questions[i].section !=
                agnostic_questions[i - 1].section && <hr />}
          </div>
        ))}
      </section>
    </main>
  );
}
