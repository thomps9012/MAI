import Link from "next/link";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import titleCase from "../../utils/titleCase";
export default function QuestionsPage() {
  const user_data = useSelector((state: any) => state.user);

  const { data, error } = useSWR("/api/questions/all", fetcher);
  if (error)
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
    );
  const adult_questions = data?.filter((question: any) => question.adult);
  const youth_questions = data?.filter(
    (question: any) => question.adult === false
  );
  const agnostic_questions = data?.filter(
    (question: any) => question.adult === null
  );
  const question_sections: Array<string> = Array.from(
    new Set(data?.map((question: any) => question.section))
  );
  if (!user_data.user?.admin) {
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
      <h1>Edit Questions</h1>
      <section className="interview_question_section">
        <h1>Sections</h1>
        {user_data.editor && (
          <h1>
            <Link href="/admin/add/interview_section">
              <a>Add New Section</a>
            </Link>
          </h1>
        )}
        {question_sections?.map((section: string) => (
          <div className="interview_section_detail" key={section}>
            <p>{titleCase(section.split("_").join(" "))}</p>
            {user_data.editor && (
              <Link href={`/admin/edit/${section}/interview_section`}>
                Edit Section
              </Link>
            )}
          </div>
        ))}
      </section>
      <hr />
      <section className="interview_question_section">
        <h1>Adult Questions</h1>
        {user_data.editor && (
          <h1>
            <Link href="/admin/add/interview_question">
              <a>Add New Question</a>
            </Link>
          </h1>
        )}
        {adult_questions?.map((question: any, i: number) => (
          <div className="interview_question_detail" key={question._id}>
            {user_data.editor && (
              <p>
                {titleCase(question.section.split("_").join(" "))} -{" "}
                <Link href={`/admin/edit/${question._id}/question`}>
                  Edit Question
                </Link>
              </p>
            )}
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
        {user_data.editor && (
          <h1>
            <Link href="/admin/add/interview_question">
              <a>Add New Question</a>
            </Link>
          </h1>
        )}
        {youth_questions?.map((question: any, i: number) => (
          <div className="interview_question_detail" key={question._id}>
            {user_data.editor && (
              <p>
                {titleCase(question.section.split("_").join(" "))} -{" "}
                <Link href={`/admin/edit/${question._id}/question`}>
                  Edit Question
                </Link>
              </p>
            )}
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
        {user_data.editor && (
          <h1>
            <Link href="/admin/add/interview_question">
              <a>Add New Question</a>
            </Link>
          </h1>
        )}
        {agnostic_questions?.map((question: any, i: number) => (
          <div className="interview_question_detail" key={question._id}>
            {user_data.editor && (
              <p>
                {titleCase(question.section.split("_").join(" "))} -{" "}
                <Link href={`/admin/edit/${question._id}/question`}>
                  Edit Question
                </Link>
              </p>
            )}
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
