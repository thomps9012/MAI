import { getCookie } from "cookies-next";
import Link from "next/link";
export default function BasePage() {
  const user_admin = getCookie("user_admin");
  return (
    <main className="landing">
      <Link href="/interview">
        <a className="landing-link" onClick={() => sessionStorage.clear()}>
          Begin New Interview
        </a>
      </Link>
      {user_admin && (
        <>
          <Link href="/gift_card/records">
            <a className="landing-link">Disperse Gift Card</a>
          </Link>
          <Link href="/admin/interviews">
            <a className="landing-link">Review Interviews</a>
          </Link>
          <Link href="/admin/clients">
            <a className="landing-link">Review Clients</a>
          </Link>
        </>
      )}
    </main>
  );
}
