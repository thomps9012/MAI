import Link from "next/link";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import titleCase from "../../utils/titleCase";
export default function Success() {
  const interview_data = useSelector((state: any) => state.interview);
  const user_data = useSelector((state: any) => state.user);
  const { data: card_data, error: card_err } = useSWR(
    `/api/cards/find?interview_id=${interview_data.id}`,
    fetcher
  );
  if (card_err)
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
    );
  const gift_card_id = card_data?._id;
  return (
    <main className="landing">
      <h1>
        Client {interview_data.PID} has successfully completed their{" "}
        {titleCase(interview_data.type.split("_").join(" "))} Interview
      </h1>
      <br />
      {!user_data.user?.admin && (
        <h1>
          Thank you for submitting your questionnaire, please show this screen
          to a testing administrator to receive your Gift Card.
        </h1>
      )}
      {user_data.user?.admin && (
        <>
          <a className="landing-link" onClick={() => sessionStorage.clear()}>
            <Link href={`/gift_card/${gift_card_id}/disperse`}>
              Disperse Gift Card
            </Link>
          </a>
          <a className="landing-link" onClick={() => sessionStorage.clear()}>
            <Link href="/interview">Enter New Interview</Link>
          </a>
          <a className="landing-link" onClick={() => sessionStorage.clear()}>
            <Link href={`/admin/client_detail/${interview_data.PID}`}>
              <>Review Client {interview_data.PID}</>
            </Link>
          </a>
          <a className="landing-link" onClick={() => sessionStorage.clear()}>
            <Link href="/admin/clients">Review All Clients</Link>
          </a>
          <a className="landing-link" onClick={() => sessionStorage.clear()}>
            <Link href={`/interview_detail/${interview_data.id}`}>
              <>
                Review Client {interview_data.PID}{" "}
                {titleCase(interview_data.type.split("_").join(" "))} Interview
              </>
            </Link>
          </a>
          <a className="landing-link" onClick={() => sessionStorage.clear()}>
            <Link href="/admin/interviews">Review All Interviews</Link>
          </a>
        </>
      )}
    </main>
  );
}
