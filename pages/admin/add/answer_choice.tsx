import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BasePage() {
  const user_data = useSelector((state: any) => state.user);
  const router = useRouter();
  const [answer_type, setAnswerType] = useState("");
  const addNew = async () => {
    const answer_choices = document.getElementsByClassName("answer_choice");
    let choice_arr = [];
    for (let i = 0; i < answer_choices.length; i++) {
      const choice = (answer_choices[i] as HTMLInputElement).value;
      choice != "" && choice_arr.push(choice);
    }
    const response = await fetch("/api/answers/all/add", {
      headers: { editor: user_data.user.editor },
      body: JSON.stringify({
        type: answer_type.toUpperCase().split(" ").join("_"),
        choices: choice_arr,
      }),
    }).then((res) => res.json());
    const answer_cache = await caches.open("answers");
    answer_cache.put("/all", await fetch("/api/answers/all"));
    response.acknowledged && router.push("/admin/answer_choices");
  };
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
      <h1>Add New Answer</h1>
      <h2>Type</h2>
      <span>
        Use the Category for the Question it is Responsible for Answering i.e.
        risk
      </span>
      <input
        name="agency"
        value={answer_type}
        onChange={(e: any) => setAnswerType(e.target.value)}
      />
      <h2>Choices</h2>
      <span>Add up to five at one time</span>
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <input className="answer_choice" />
      <a className="button" onClick={addNew}>
        Add Answer
      </a>
    </main>
  );
}
