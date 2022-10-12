import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import InterviewOverview from "../../components/interviewOverview";
import fetcher from "../../utils/fetcher";
import { connectToDatabase } from "../../utils/mongodb";
import Cookies from "cookies";
import GraphDisplay from "../../components/graphDisplay";
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
  const [selected_type, setSelectedType] = useState("all");
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
  const getPIDInput = () => {
    const PID_input = (document.getElementById("pid") as HTMLInputElement)
      ?.value;
    return PID_input;
  };
  const getAgencyInput = () => {
    const selected_agency = (
      document.getElementById("agency") as HTMLSelectElement
    )?.value;
    return selected_agency;
  };
  const filter_by_PID = async (PID: string) => {
    setBaselines(
      baseline_records.filter((record: any) => record.PID.includes(PID))
    );
    setTestingOnly(
      testing_only_records.filter((record: any) => record.PID.includes(PID))
    );
    setFollowUps(
      follow_up_records.filter((record: any) => record.PID.includes(PID))
    );
    setExits(exit_records.filter((record: any) => record.PID.includes(PID)));
  };
  const filter_by_agency = async (agency: string, PID_input: string) => {
    setBaselines(
      baseline_records.filter(
        (record: any) =>
          record.agency === agency && record.PID.includes(PID_input)
      )
    );
    setTestingOnly(
      testing_only_records.filter(
        (record: any) =>
          record.agency === agency && record.PID.includes(PID_input)
      )
    );
    setFollowUps(
      follow_up_records.filter(
        (record: any) =>
          record.agency === agency && record.PID.includes(PID_input)
      )
    );
    setExits(
      exit_records.filter(
        (record: any) =>
          record.agency === agency && record.PID.includes(PID_input)
      )
    );
  };
  const display_all = (elements: any) => {
    for (let i = 0; i < elements.length; i++) {
      const element_id = elements[i].id;
      document
        .getElementById(element_id)
        ?.setAttribute("class", "interview_overviews");
    }
  };
  const display_one = (elements: any, selected: string) => {
    for (let i = 0; i < elements.length; i++) {
      const element_id = elements[i].id;
      if (element_id === selected) {
        document
          .getElementById(element_id)
          ?.setAttribute("class", "interview_overviews");
      } else {
        document.getElementById(element_id)?.setAttribute("class", "hidden");
      }
    }
  };
  const get_elements = () => {
    const elements = document.getElementsByClassName(
      "interview_overviews"
    ) as unknown as Array<HTMLElement>;
    const hidden_elements = document.getElementsByClassName(
      "hidden"
    ) as unknown as Array<HTMLElement>;
    const all_interview_elements = [...elements, ...hidden_elements];
    return all_interview_elements;
  };
  const filter_by_type = (selected_type: string) => {
    const elements = get_elements();
    filter_records();
    if (selected_type === "all") {
      display_all(elements);
    } else {
      display_one(elements, selected_type);
    }
    setSelectedType(selected_type);
  };
  const filter_records = async () => {
    const PID = getPIDInput();
    const agency = getAgencyInput();
    agency === "" ? await filter_by_PID(PID) : await filter_by_agency(agency, PID);
  };
  const reset_filters = () => {
    const elements = get_elements();
    (document.getElementById("pid") as HTMLInputElement).setAttribute(
      "value",
      ""
    );
    (document.getElementById("agency") as HTMLInputElement).setAttribute(
      "value",
      ""
    );
    display_all(elements);
    setBaselines(baseline_records);
    setTestingOnly(testing_only_records);
    setFollowUps(follow_up_records);
    setExits(exit_records);
    setSelectedType("all");
  };
  return (
    <main className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <h2>Filters</h2>
        <a
          className="button"
          style={{ width: "fit-content" }}
          onClick={reset_filters}
        >
          Clear Filters
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flexDirection: "column", display: "flex" }}>
          <h3>Interview Type</h3>
          <a
            className="button"
            style={{ width: "auto" }}
            id="all_results"
            onClick={() => filter_by_type("all")}
          >
            All Interviews
          </a>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <a
              className="button"
              onClick={() => filter_by_type("baseline")}
              id="baseline_results"
              style={{ width: "auto" }}
            >
              Baseline
            </a>
            <a
              className="button"
              onClick={() => filter_by_type("testing-only")}
              id="testing-only_results"
              style={{ width: "auto" }}
            >
              Testing Only
            </a>
            <a
              className="button"
              onClick={() => filter_by_type("follow-up")}
              id="follow-up_results"
              style={{ width: "auto" }}
            >
              Follow Up
            </a>
            <a
              className="button"
              onClick={() => filter_by_type("exit")}
              id="exit_results"
              style={{ width: "auto" }}
            >
              Exit
            </a>
          </div>
        </div>
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
      </div>
      <GraphDisplay
        baselines={baselines}
        testing_only={testing_only}
        follow_ups={follow_ups}
        exits={exits}
        type={selected_type}
      />
      <section className="interview_overviews" id="baseline">
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
      <section className="interview_overviews" id="testing-only">
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
      <section className="interview_overviews" id="follow-up">
        <h1 id="follow-up">Follow Up Interviews</h1>
        <hr />
        {follow_ups.map((record: any) => (
          <InterviewOverview
            key={record._id}
            record={record}
            type={"follow_up"}
          />
        ))}
      </section>
      <section className="interview_overviews" id="exit">
        <h1 id="exit">Exit Interviews</h1>
        <hr />
        {exits.map((record: any) => (
          <InterviewOverview key={record._id} record={record} type={"exit"} />
        ))}
      </section>
    </main>
  );
}

export async function getServerSideProps({ req, res }: any) {
  const cookies = new Cookies(req, res);
  const admin_status = cookies.get("user_admin");
  if (!admin_status) {
    return {
      props: {
        baseline_records: [],
        testing_only_records: [],
        follow_up_records: [],
        exit_records: [],
      },
    };
  }
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
