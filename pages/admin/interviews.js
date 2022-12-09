import Link from "next/link";
import { useState } from "react";
import { connectToDatabase } from "../../utils/mongodb";
import GraphDisplay from "../../components/graphDisplay";
import InterviewOverviews from "../../components/interviewOverview";
import { ObjectId } from "mongodb";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1 });
  const admin_status = user.admin;
  if (!admin_status) {
    return {
      props: {
        user_admin: false,
        testing_agencies: {},
        baseline_records: [],
        testing_only_records: [],
        follow_up_records: [],
        exit_records: [],
      },
    };
  }
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
  const testing_agencies = await db
    .collection("answers")
    .findOne({ type: "TESTING_AGENCIES" });
  return {
    props: {
      user_admin: admin_status,
      testing_agencies: JSON.parse(JSON.stringify(testing_agencies)),
      baseline_records: JSON.parse(JSON.stringify(baseline_records)),
      testing_only_records: JSON.parse(JSON.stringify(testing_only_records)),
      follow_up_records: JSON.parse(JSON.stringify(follow_up_records)),
      exit_records: JSON.parse(JSON.stringify(exit_records)),
    },
  };
}

export default function InterviewRecordsPage({
  baseline_records,
  testing_only_records,
  follow_up_records,
  exit_records,
  user_admin,
  testing_agencies,
}) {
  const [baselines, setBaselines] = useState(baseline_records);
  const [testing_only, setTestingOnly] = useState(testing_only_records);
  const [follow_ups, setFollowUps] = useState(follow_up_records);
  const [exits, setExits] = useState(exit_records);
  const [selected_type, setSelectedType] = useState("all");
  if (!user_admin) {
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
    const PID_input = document.getElementById("pid")?.value;
    return PID_input;
  };
  const getAgencyInput = () => {
    const selected_agency = document.getElementById("agency")?.value;
    return selected_agency;
  };
  const filter_by_PID = async (PID) => {
    setBaselines(baseline_records.filter((record) => record.PID.includes(PID)));
    setTestingOnly(
      testing_only_records.filter((record) => record.PID.includes(PID))
    );
    setFollowUps(
      follow_up_records.filter((record) => record.PID.includes(PID))
    );
    setExits(exit_records.filter((record) => record.PID.includes(PID)));
  };
  const filter_by_agency = async (agency, PID_input) => {
    setBaselines(
      baseline_records.filter(
        (record) => record.agency === agency && record.PID.includes(PID_input)
      )
    );
    setTestingOnly(
      testing_only_records.filter(
        (record) => record.agency === agency && record.PID.includes(PID_input)
      )
    );
    setFollowUps(
      follow_up_records.filter(
        (record) => record.agency === agency && record.PID.includes(PID_input)
      )
    );
    setExits(
      exit_records.filter(
        (record) => record.agency === agency && record.PID.includes(PID_input)
      )
    );
  };
  const display_all = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      const element_id = elements[i].id;
      document
        .getElementById(element_id)
        ?.setAttribute("class", "interview_overviews");
    }
  };
  const display_one = (elements, selected) => {
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
    const elements = document.getElementsByClassName("interview_overviews");
    const hidden_elements = document.getElementsByClassName("hidden");
    const all_interview_elements = [...elements, ...hidden_elements];
    return all_interview_elements;
  };
  const filter_by_type = (selected_type) => {
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
    agency === ""
      ? await filter_by_PID(PID)
      : await filter_by_agency(agency, PID);
  };
  const reset_filters = () => {
    const elements = get_elements();
    document.getElementById("pid").setAttribute("value", "");
    document.getElementById("agency").setAttribute("value", "");
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
          Clear
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
            {testing_agencies?.choices.map((agency, i) => (
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
        <h1 id="baseline">Baseline Records</h1>
        <hr />
        <InterviewOverviews data={baselines} type={"baseline"} />
      </section>
      <section className="interview_overviews" id="testing-only">
        <h1 id="testing_only">Testing Only Records</h1>
        <hr />
        <InterviewOverviews data={testing_only} type={"testing_only"} />
      </section>
      <section className="interview_overviews" id="follow-up">
        <h1 id="follow-up">Follow Up Records</h1>
        <hr />
        <InterviewOverviews data={follow_ups} type={"follow_up"} />
      </section>
      <section className="interview_overviews" id="exit">
        <h1 id="exit">Exit Records</h1>
        <hr />
        <InterviewOverviews data={exits} type={"exit"} />
      </section>
    </main>
  );
}
