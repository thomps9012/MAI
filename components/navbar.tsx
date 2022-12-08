import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";
import { NextApiRequest } from "next";
import { connectToDatabase } from "../utils/mongodb";
import { ObjectId } from "mongodb";
export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const user_id = req.cookies.user_id;
  const user_full_name = req.cookies.user_full_name;
  const logged_in = req.cookies.logged_in;
  const { db } = await connectToDatabase();
  const user = db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1, editor: 1 });
  return {
    user_full_name,
    logged_in,
    admin: user.admin,
    editor: user.editor,
    user_id,
  };
}
export default function NavBar({
  user_full_name,
  logged_in,
  admin,
  editor,
  user_id,
}: {
  user_full_name: string;
  logged_in: boolean;
  admin: boolean;
  editor: boolean;
  user_id: string;
}) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const [show, setShow] = useState(false);
  const setEditNav = (e: any) => {
    const link = e.target.value;
    link === "" && router.push("/");
    router.push(`/admin/${link}`);
    setActiveLink("");
  };
  const active_route = router.route;
  const logout = async () => {
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
    deleteCookie("user_id");
    deleteCookie("logged_in");
    deleteCookie("username");
    deleteCookie("user_full_name");
    router.reload();
  };
  useEffect(() => {
    const links = document.getElementsByClassName(
      "nav-link"
    ) as unknown as Array<HTMLElement>;
    const links2 = document.getElementsByClassName(
      "hidden-link"
    ) as unknown as Array<HTMLElement>;
    const all_links = [...links, ...links2];
    for (let i = 0; i < all_links.length; i++) {
      const link = all_links[i] as HTMLElement;
      link.id === active_route
        ? link.setAttribute("class", "hidden-link")
        : link.setAttribute("class", "nav-link");
    }
  }, [active_route]);
  return (
    <nav>
      <ul className="web-nav">
        <li className="nav-link" id="/">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="nav-link" id="/interview">
          <Link href="/interview">
            <a>Begin Interview</a>
          </Link>
        </li>
        {!logged_in && (
          <li className="nav-link" id="/sign_in">
            <Link href="/sign_in">
              <a>Admin Login</a>
            </Link>
          </li>
        )}
        {!logged_in && (
          <li className="nav-link" id="/sign_up">
            <Link href="/sign_up">
              <a>Admin Sign Up</a>
            </Link>
          </li>
        )}
        {admin && (
          <>
            <li className="nav-link" id="/admin/clients">
              <Link href="/admin/clients">
                <a>Review Clients</a>
              </Link>
            </li>
            <li className="nav-link" id="/gift_card/records">
              <Link href="/gift_card/records">
                <a>Gift Card Records</a>
              </Link>
            </li>
            <li className="nav-link" id="/admin/interviews">
              <Link href="/admin/interviews">
                <a>Interview Data</a>
              </Link>
            </li>
          </>
        )}
        {editor && (
          <>
            <li className="nav-link" id="users">
              <Link href="/admin/users/manage">
                <a>Manage Users</a>
              </Link>
            </li>
            <select
              value={activeLink}
              className="nav-select"
              onChange={setEditNav}
            >
              <option className="nav-link" value="" disabled hidden>
                Edit
              </option>
              <option
                className="nav-link"
                value="gift_cards"
                id="/admin/gift_cardss"
              >
                Gift Cards
              </option>
              <option
                className="nav-link"
                value="questions"
                id="/admin/questions"
              >
                Questions
              </option>
              <option
                className="nav-link"
                value="answer_choices"
                id="/admin/answers"
              >
                Answers
              </option>
            </select>
          </>
        )}
        {logged_in && (
          <li className="nav-link" id="/admin/users/[id]">
            <Link href={`/admin/users/${user_id}`}>
              <a>Profile</a>
            </Link>
          </li>
        )}
        {logged_in && (
          <li className="nav-link">
            <a onClick={logout}>Logout</a>
          </li>
        )}
      </ul>
      <div className="mobile-menu">
        <a onClick={() => setShow(!show)}>
          <p>Menu</p>
        </a>
        {logged_in && (
          <>
            <a onClick={() => router.push(`/admin/users/${user_id}`)}>
              <p>{user_full_name}</p>
            </a>
            <a onClick={logout}>
              <p>Logout</p>
            </a>
          </>
        )}
      </div>
      <ul
        className={`mobile-nav-${show ? "show" : "hide"}`}
        onMouseLeave={() => setShow(false)}
      >
        <li className="" onClick={() => setShow(false)} id="/">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="" onClick={() => setShow(false)} id="/interview">
          <Link href="/interview">
            <a>Begin Interview</a>
          </Link>
        </li>
        {!logged_in && (
          <li className="" onClick={() => setShow(false)} id="/sign_in">
            <Link href="/sign_in">
              <a>Admin Login</a>
            </Link>
          </li>
        )}
        {!logged_in && (
          <li className="" onClick={() => setShow(false)} id="/sign_up">
            <Link href="/sign_up">
              <a>Admin Sign Up</a>
            </Link>
          </li>
        )}
        {admin && (
          <>
            <li
              className="nav-link"
              onClick={() => setShow(false)}
              id="/admin/clients"
            >
              <Link href="/admin/clients">
                <a>Review Clients</a>
              </Link>
            </li>
            <li
              className="nav-link"
              onClick={() => setShow(false)}
              id="/gift_card/records"
            >
              <Link href="/gift_card/records">
                <a>Gift Card Records</a>
              </Link>
            </li>
            <li
              className="nav-link"
              onClick={() => setShow(false)}
              id="/admin/interviews"
            >
              <Link href="/admin/interviews">
                <a>Interview Data</a>
              </Link>
            </li>
          </>
        )}
        {editor && (
          <>
            <li
              className="nav-link"
              onClick={() => setShow(false)}
              id="/admin/users/manage"
            >
              <Link href="/admin/users/manage">
                <a>Manage Users</a>
              </Link>
            </li>
            <li
              className="nav-link"
              onClick={() => setShow(false)}
              id="/admin/gift_cards"
            >
              <Link href="/admin/gift_cards">
                <a>Edit Gift Card Options</a>
              </Link>
            </li>
            <li
              className="nav-link"
              onClick={() => setShow(false)}
              id="/admin/questions"
            >
              <Link href="/admin/questions">
                <a>Question Options</a>
              </Link>
            </li>
            <li
              className="nav-link"
              onClick={() => setShow(false)}
              id="/admin/answer_choices"
            >
              <Link href="/admin/answer_choices">
                <a>Answer Options</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
