import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import InterviewOverview from "../../components/interviewOverview";
import fetcher from "../../utils/fetcher";
import { connectToDatabase } from "../../utils/mongodb";

export default function InterviewRecordsPage({
  baseline_records,
  testing_only_records,
  follow_up_records,
  exit_records,
}: any) {
  const user_data = useSelector((state: any) => state.user);
  const [baselines, setBaselines] = useState(baseline_records);
  const [testing_only, setTestingOnly] = useState(testing_only_records);
  const [follow_ups, setFollowUps] = useState(follow_up_records);
  const [exits, setExits] = useState(exit_records);
  const [searchPID, setPID] = useState("");
  const [search, setAgency] = useState("");
  const [searchTypes, setInterviewTypes] = useState("");
  const { data: agency_data, error: agency_err } = useSWR(
    "/api/answers/testing_agencies",
    fetcher
  );
  if (agency_err)
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
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
  const filter_by_agency = (agency: string) => {
    setBaselines(
      baseline_records.filter((record: any) => record.agency === agency)
    );
    setTestingOnly(
      testing_only_records.filter((record: any) => record.agency === agency)
    );
    setFollowUps(
      follow_up_records.filter((record: any) => record.agency === agency)
    );
    setExits(exit_records.filter((record: any) => record.agency === agency));
  };
  const filter_by_PID = (PID: string) => {
    setBaselines(baselines.filter((record: any) => record.PID.includes(PID)));
    setTestingOnly(
      testing_only.filter((record: any) => record.PID.includes(PID))
    );
    setFollowUps(follow_ups.filter((record: any) => record.PID.includes(PID)));
    setExits(exits.filter((record: any) => record.PID.includes(PID)));
  };
  const filter_by_type = (selected_types: string[]) => {
    console.log(selected_types);
    !selected_types.includes("baseline") && setBaselines([]);
    !selected_types.includes("testing_only") && setTestingOnly([]);
    !selected_types.includes("follow_up") && setFollowUps([]);
    !selected_types.includes("exit") && setExits([]);
  };
  const reset_filters = () => {
    setBaselines(baseline_records);
    setTestingOnly(testing_only_records);
    setFollowUps(follow_up_records);
    setExits(exit_records);
    (document.getElementById("agency") as HTMLSelectElement).setAttribute(
      "selected",
      ""
    );
    (document.getElementById("pid") as HTMLInputElement).setAttribute(
      "value",
      ""
    );
    (
      document.getElementById("interview_type") as HTMLSelectElement
    ).setAttribute("value", "all");
  };
  const filter_records = async (e: any) => {
    setBaselines(baseline_records);
    setTestingOnly(testing_only_records);
    setFollowUps(follow_up_records);
    setExits(exit_records);
    const selected_agency = (
      document.getElementById("agency") as HTMLSelectElement
    )?.value;
    selected_agency != "" && filter_by_agency(selected_agency);
    const PID_input = (document.getElementById("pid") as HTMLInputElement)
      ?.value;
    PID_input != "" && filter_by_PID(PID_input);
    const selected = document.getElementsByClassName("interview_type");
    let selected_types: string[] = [];
    for (const item in selected) {
      const inputEl = selected[item] as HTMLOptionElement;
      if (inputEl.selected && inputEl.value === "all") {
        selected_types = ["baseline", "testing_only", "follow_up", "exit"];
      }
      if (inputEl.selected) selected_types.push(inputEl.value);
    }
    selected_types.length != 0 && filter_by_type(selected_types);
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
            onChange={filter_records}
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
          <input name="pid" id="pid" type="number" onChange={filter_records} />
        </div>
        <div style={{ flexDirection: "column" }}>
          <h3>Type</h3>
          <select
            aria-label="interview_type"
            title="interview_type"
            className="type_select"
            multiple
            name="interview_type"
            id="interview_type"
            onChange={filter_records}
            defaultValue="all"
          >
            <option value="all" className="interview_type">
              All
            </option>
            <option value="baseline" className="interview_type">
              Baseline
            </option>
            <option value="testing_only" className="interview_type">
              Testing Only
            </option>
            <option value="follow_up" className="interview_type">
              Follow Up
            </option>
            <option value="exit" className="interview_type">
              Exit
            </option>
          </select>
        </div>
        <a className="button" onClick={reset_filters}>
          Reset Filters
        </a>
      </div>
      {baselines?.length > 0 && (
        <section className="interview_overviews">
          <h1 id="baseline">Baseline Interviews</h1>
          <hr />
          {baselines.map((record: any) => (
            <InterviewOverview
              key={record._id}
              record={record}
              type={"baseline"}
            />
          ))}
        </section>
      )}
      {testing_only?.length > 0 && (
        <section className="interview_overviews">
          <h1 id="testing_only">Testing Only Interviews</h1>
          <hr />
          {testing_only.map((record: any) => (
            <InterviewOverview
              key={record._id}
              record={record}
              type={"testing_only"}
            />
          ))}
        </section>
      )}
      {follow_ups?.length > 0 && (
        <section className="interview_overviews">
          <h1 id="follow_up">Follow Up Interviews</h1>
          <hr />
          {follow_ups.map((record: any) => (
            <InterviewOverview
              key={record._id}
              record={record}
              type={"follow_up"}
            />
          ))}
        </section>
      )}
      {exits?.length > 0 && (
        <section className="interview_overviews">
          <h1 id="exit">Exit Interviews</h1>
          <hr />
          {exits.map((record: any) => (
            <InterviewOverview key={record._id} record={record} type={"exit"} />
          ))}
        </section>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const baseline_records = await db
    .collection("baseline")
    .find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 })
    .toArray();
  const testing_only_records = await db
    .collection("testing_only")
    .find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 })
    .toArray();
  const follow_up_records = await db
    .collection("follow_up")
    .find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 })
    .toArray();
  const exit_records = await db
    .collection("exit")
    .find({}, { _id: 1, PID: 1, date: 1, agency: 1, client_name: 1, adult: 1 })
    .toArray();
  return {
    props: {
      baseline_records: baseline_records
        ? JSON.parse(JSON.stringify(baseline_records))
        : [],
      testing_only_records: testing_only_records
        ? JSON.parse(JSON.stringify(testing_only_records))
        : [],
      follow_up_records: follow_up_records
        ? JSON.parse(JSON.stringify(follow_up_records))
        : [],
      exit_records: exit_records
        ? JSON.parse(JSON.stringify(exit_records))
        : [],
    },
  };
}
