import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { connectToDatabase } from "../../utils/mongodb";

export default function AllClientsPage({ all_clients }: any) {
  const user_data = useSelector((state: any) => state.user);
  const [client_records, setClientRecords] = useState(all_clients);
  const { data: agency_data, error: agency_err } = useSWR(
    "/api/answers/testing_agencies",
    fetcher
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
  if (agency_err)
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
    );
  const filterByPID = () => {
    const selected_agency = (
      document.getElementById("agency") as HTMLInputElement
    )?.value;
    const PID_input = (document.getElementById("pid") as HTMLInputElement)
      ?.value;
    selected_agency === ""
      ? setClientRecords(
          all_clients.filter((record: any) => record.PID.includes(PID_input))
        )
      : setClientRecords(
          all_clients.filter(
            (record: any) =>
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
            {agency_data?.choices.map((agency: string, i: number) => (
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
      {client_records.map((client: any) => (
        <div className="client_card" key={client._id}>
          <Link href={`/admin/client_detail/${client.PID}`}>
            <a>
              <h2>{client.PID}</h2>
              <p> {client.client_name}</p>
              <p>{client.adult ? "Adult" : "Youth"}</p>
            </a>
          </Link>
          <hr />
        </div>
      ))}
    </main>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const baseline_clients = await db
    .collection("baseline")
    .find({}, { PID: 1, client_name: 1, adult: 1 })
    .toArray();
  const testing_only_clients = await db
    .collection("testing_only")
    .find({}, { PID: 1, client_name: 1, adult: 1 })
    .toArray();
  const all_clients = [...baseline_clients, ...testing_only_clients];
  return {
    props: {
      all_clients: JSON.parse(JSON.stringify(all_clients)),
    },
  };
}
