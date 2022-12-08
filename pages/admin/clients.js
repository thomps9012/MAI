import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { useState } from "react";
import { connectToDatabase } from "../../utils/mongodb";
import { ClientOverview, AnswerChoice } from "../../utils/types";
import { getCookie } from "cookies-next";
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const user_id = getCookie("user_id", { req, res }) as unknown as string;
  const logged_in = getCookie("logged_in", { req, res });
  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1, editor: 1 });
  const baseline_clients = await db
    .collection("baseline")
    .find({}, { PID: 1, client_name: 1, adult: 1, agency: 1 })
    .toArray();
  const testing_only_clients = await db
    .collection("testing_only")
    .find({}, { PID: 1, client_name: 1, adult: 1, agency: 1 })
    .toArray();
  const all_clients = baseline_clients.concat(testing_only_clients);
  const testing_agencies = await db
    .collection("answers")
    .findOne({ type: "TESTING_AGENCIES" });
  return {
    logged_in,
    testing_agencies,
    admin: user.admin,
    all_clients: JSON.parse(JSON.stringify(all_clients)),
  };
}

export default function AllClientsPage({
  all_clients,
  logged_in,
  admin,
  testing_agencies,
}: {
  all_clients: ClientOverview[];
  testing_agencies: AnswerChoice;
  logged_in;
  admin;
}) {
  const [client_records, setClientRecords] = useState(all_clients);
  if (!admin || !logged_in) {
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
  const filterByPID = () => {
    const selected_agency = (
      document.getElementById("agency") as HTMLInputElement
    )?.value;
    const PID_input = (document.getElementById("pid") as HTMLInputElement)
      ?.value;
    selected_agency === ""
      ? setClientRecords(
          all_clients.filter((record: ClientOverview) =>
            record.PID.includes(PID_input)
          )
        )
      : setClientRecords(
          all_clients.filter(
            (record: ClientOverview) =>
              record.agency === selected_agency &&
              record.PID.includes(PID_input)
          )
        );
  };
  return (
    <main className="container">
      <h3>Filters</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <h3>Agency</h3>
          <select
            name="agency"
            id="agency"
            onChange={filterByPID}
            defaultValue=""
          >
            <option value="">All Agencies</option>
            {testing_agencies?.choices.map((agency: string, i: number) => (
              <option key={i} value={agency}>
                {agency}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flexDirection: "column" }}>
          <h3>PID</h3>
          <input name="pid" id="pid" type="number" onChange={filterByPID} />
        </div>
      </div>
      {client_records.map((client: ClientOverview, i: number) => {
        const { PID, client_name, adult } = client;
        return (
          <div className="client_card" key={PID}>
            <Link href={`/admin/client_detail/${PID}_${i}`}>
              <a>
                <h2>{PID}</h2>
                <p> {client_name}</p>
                <p>{adult ? "Adult" : "Youth"}</p>
              </a>
            </Link>
            <hr />
          </div>
        );
      })}
    </main>
  );
}
