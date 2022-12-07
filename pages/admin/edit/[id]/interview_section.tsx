import Link from "next/link";
import { useRouter } from "next/router";

export default function BasePage({
  section_name,
  user_editor,
}: {
  section_name: string;
  user_editor: boolean;
}) {
  const router = useRouter();
  const saveEdits = async () => {
    const response = await fetch("/api/questions/edit_section", {
      headers: {
        section_name: (
          document.getElementById("section_name") as HTMLInputElement
        )?.value,
        editor: JSON.stringify(user_editor),
      },
    }).then((res) => res.json());
    const question_cache = await caches.open("questions");
    question_cache.put("/all", await fetch("/api/questions/all"));
    question_cache.put("/adult/all", await fetch("/api/questions/adult/all"));
    question_cache.put("/youth/all", await fetch("/api/questions/youth/all"));
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
      <h1>Current Interview Section</h1>
      <input defaultValue={section_name} id="section_name" />
      <span>
        *** Warning this will update all questions within the section ***
      </span>
      <a className="button" onClick={saveEdits}>
        Save Changes
      </a>
      <p> -- or --</p>
      <Link href="/admin/add/interview_section">Add New Interview Section</Link>
    </main>
  );
}

export async function getServerSideProps({ req, res, ctx }: any) {
  const user_editor = req.cookies.user_editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        section_name: "",
      },
    };
  }
  return {
    props: {
      user_editor,
      section_name: ctx.params.id ? ctx.params.id : "",
    },
  };
}
