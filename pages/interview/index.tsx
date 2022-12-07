import { useEffect, useState } from "react";
import GenerateID from "../../utils/generate-id";
import titleCase from "../../utils/titleCase";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "../../utils/fetcher";
import { setCookie } from "cookies-next";

export default function InterviewSelect() {
  const [date] = useState(
    new Intl.DateTimeFormat("en", {
      dateStyle: "short",
    }).format(Date.now())
  );
  const [type, setInterview] = useState("");
  const [agency, setAgency] = useState("");
  const [PID, setPID] = useState("");
  const [phone_number, setPhone] = useState("");
  const [client_name, setName] = useState("");
  const [adult, setAdult] = useState(false);
  useEffect(() => {
    PID != "" &&
      document
        .querySelector(".phone_input")
        ?.setAttribute("style", "display: flex; flex-direction: column;");
  }, [PID]);
  const router = useRouter();
  const { data, error } = useSWR("/api/client/count_records", fetcher);
  const { data: testing_agencies, error: testing_agency_err } = useSWR(
    "/api/answers/testing_agencies",
    fetcher
  );
  if (error || testing_agency_err) {
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
    );
  }
  const retrieveClientName = async (PID: string) => {
    const res = await fetch(`/api/client/find_name?client_pid=${PID}`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      const { client_name } = data;
      setName(client_name);
    } else {
      setName("N/A");
    }
  };
  const handleAdultSelect = (e: any) => {
    const adult = e.target.id;
    if (adult === "adult") {
      document
        .getElementById("adult")
        ?.setAttribute("class", "button-selected");
      document.getElementById("youth")?.setAttribute("class", "button");
      setAdult(true);
    } else {
      document
        .getElementById("youth")
        ?.setAttribute("class", "button-selected");
      document.getElementById("adult")?.setAttribute("class", "button");
      setAdult(false);
    }
    document
      .querySelector(".agency_select")
      ?.setAttribute("style", "display: flex; flex-direction: column;");
  };
  const handleCategorySelect = (e: any) => {
    const { id } = e.target;
    setInterview(id);
    let generateId;
    switch (id) {
      case "baseline":
        document
          .getElementById("baseline")
          ?.setAttribute("class", "button-selected");
        document
          .getElementById("testing_only")
          ?.setAttribute("class", "button");
        document.getElementById("follow_up")?.setAttribute("class", "button");
        document.getElementById("exit")?.setAttribute("class", "button");
        document
          .querySelector(".pid_input")
          ?.setAttribute("style", "display: none");
        document
          .querySelector(".name_input")
          ?.setAttribute("style", "display: flex; flex-direction: column;");
        generateId = GenerateID(agency, data);
        setPID(generateId as string);
        break;
      case "testing_only":
        document.getElementById("baseline")?.setAttribute("class", "button");
        document
          .getElementById("testing_only")
          ?.setAttribute("class", "button-selected");
        document.getElementById("follow_up")?.setAttribute("class", "button");
        document.getElementById("exit")?.setAttribute("class", "button");
        document
          .querySelector(".pid_input")
          ?.setAttribute("style", "display: none");
        document
          .querySelector(".name_input")
          ?.setAttribute("style", "display: flex; flex-direction: column;");
        generateId = GenerateID(agency, data);
        setPID(generateId as string);
        break;
      case "follow_up":
        document.getElementById("baseline")?.setAttribute("class", "button");
        document
          .getElementById("testing_only")
          ?.setAttribute("class", "button");
        document
          .getElementById("follow_up")
          ?.setAttribute("class", "button-selected");
        document.getElementById("exit")?.setAttribute("class", "button");
        document
          .querySelector(".pid_input")
          ?.setAttribute("style", "display: flex; flex-direction: column;");
        document
          .querySelector(".name_input")
          ?.setAttribute("style", "display: none");
        break;
      case "exit":
        document.getElementById("baseline")?.setAttribute("class", "button");
        document
          .getElementById("testing_only")
          ?.setAttribute("class", "button");
        document.getElementById("follow_up")?.setAttribute("class", "button");
        document
          .getElementById("exit")
          ?.setAttribute("class", "button-selected");
        document
          .querySelector(".pid_input")
          ?.setAttribute("style", "display: flex; flex-direction: column;");
        document
          .querySelector(".name_input")
          ?.setAttribute("style", "display: none");
        break;
    }
  };
  const handleAgencySelect = (e: any) => {
    const { id } = e.target;
    document
      .querySelector(".interview_select")
      ?.setAttribute("style", "display: flex; flex-direction: column;");
    switch (id) {
      case "NORA":
        document
          .getElementById("NORA")
          ?.setAttribute("class", "button-selected");
        document
          .getElementById("Care Alliance")
          ?.setAttribute("class", "button");
        document
          .getElementById("AIDS Task Force")
          ?.setAttribute("class", "button");
        break;
      case "Care Alliance":
        document.getElementById("NORA")?.setAttribute("class", "button");
        document
          .getElementById("Care Alliance")
          ?.setAttribute("class", "button-selected");
        document
          .getElementById("AIDS Task Force")
          ?.setAttribute("class", "button");
        break;
      case "AIDS Task Force":
        document.getElementById("NORA")?.setAttribute("class", "button");
        document
          .getElementById("Care Alliance")
          ?.setAttribute("class", "button");
        document
          .getElementById("AIDS Task Force")
          ?.setAttribute("class", "button-selected");
        break;
    }
    setAgency(id);
  };
  const validPhoneNumber = (e: any) => {
    if (
      phone_number.match(
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g
      )
    ) {
      document
        .querySelector("#page_submit")
        ?.setAttribute("style", "display: flex; flex-direction: column;");
      document
        .getElementById("valid-phone-number")
        ?.setAttribute("class", "input-validation");
    } else {
      document
        .getElementById("valid-phone-number")
        ?.setAttribute("class", "display-input-validation");
    }
  };
  const Submit = async (
    type: string,
    date: string,
    agency: string,
    PID: string,
    phone_number: string,
    client_name: string,
    adult: boolean
  ) => {
    if (type === "") {
      return;
    }
    if (date === "") {
      return;
    }
    if (agency === "") {
      return;
    }
    if (PID === "") {
      return;
    }
    if (phone_number === "") {
      return;
    }
    if (client_name === "") {
      return;
    }
    sessionStorage.setItem("interview_type", type);
    sessionStorage.setItem("interview_date", date);
    sessionStorage.setItem("testing_agency", agency);
    sessionStorage.setItem("client_PID", PID);
    sessionStorage.setItem("client_phone_number", phone_number);
    sessionStorage.setItem("client_name", client_name);
    sessionStorage.setItem("client_adult", JSON.stringify(adult));
    const PID_exists = await fetch("/api/client/PID_exists").then((res) =>
      res.json()
    );
    console.log(PID_exists);
    if (
      (PID_exists && type === "testing_only") ||
      (type === "baseline" && PID_exists)
    ) {
      return;
    }
    const res = await fetch("/api/client/create", {
      method: "POST",
      body: JSON.stringify({
        type,
        date,
        agency,
        PID,
        phone_number,
        client_name,
        adult,
      }),
    }).then((response) => response.json());
    if (res.acknowledged) {
      const client_cache = await caches.open("clients");
      const interview_cache = await caches.open("interviews");
      client_cache.put(
        `interview/${res.insertedIds[0]}/PID/${PID}/type/${type}`,
        await fetch(
          `/api/interviews/find?record_id=${res.insertedIds[0]}&interview_type=${type}`
        )
      );
      interview_cache.put(
        `${res.insertedIds[0]}/type/${type}`,
        await fetch(
          `/api/interviews/find?record_id=${res.insertedIds[0]}&interview_type=${type}`
        )
      );
      sessionStorage.setItem("interview_id", res.insertedIds[0]);
      setCookie(
        "interview_data",
        JSON.stringify({
          _id: res.insertedIds[0],
          type,
          agency,
          date,
          PID,
          client_name,
        })
      );
      if (
        confirm(
          `This is a(n) \n\n ${titleCase(
            type
          )} Interview \n\n with ${agency} \n\n on ${date}`
        )
      ) {
        adult
          ? router.push("/interview/adult/demographics")
          : router.push("/interview/youth/demographics");
      }
    } else {
      if (
        confirm(
          "Your cellular or internet connection is unstable \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help."
        )
      ) {
        window.location.assign("/");
      }
    }
  };
  return (
    <main className="container">
      <h2>Select Interview Type</h2>
      <br />
      <a className="button" id="adult" onClick={handleAdultSelect}>
        Adult
      </a>
      <a className="button" id="youth" onClick={handleAdultSelect}>
        Youth
      </a>
      <div className="agency_select">
        <h2>Agency...</h2>
        <br />
        {testing_agencies?.choices.map((agency: string) => (
          <a
            className="button"
            onClick={handleAgencySelect}
            key={agency}
            id={agency}
          >
            {agency}
          </a>
        ))}
      </div>
      <div className="interview_select">
        <h2>Category...</h2>
        <br />
        <a className="button" onClick={handleCategorySelect} id="testing_only">
          Testing Only
        </a>
        <a className="button" onClick={handleCategorySelect} id="baseline">
          Baseline
        </a>
        <a className="button" onClick={handleCategorySelect} id="follow_up">
          Follow Up
        </a>
        <a className="button" onClick={handleCategorySelect} id="exit">
          Exit
        </a>
      </div>
      <div className="pid_input">
        <h2>Enter PID</h2>
        <input
          type="text"
          placeholder="NORA123"
          onChange={(e: any) => setPID(e.target.value)}
          onBlur={() => retrieveClientName(PID)}
        />
      </div>
      <div className="name_input">
        <h2>Enter Your First Name</h2>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e: any) => setName(e.target.value)}
        />
      </div>
      <div className="phone_input">
        <h2>Phone Number</h2>
        <input
          type="text"
          placeholder="555-555-5555"
          onChange={(e: any) => setPhone(e.target.value)}
          onBlur={validPhoneNumber}
        />
        <label className="input-validation" id="valid-phone-number">
          Valid phone number must be entered
        </label>
      </div>
      <a
        className="page_button"
        id="page_submit"
        onClick={() =>
          Submit(type, date, agency, PID, phone_number, client_name, adult)
        }
      >
        Begin Interview
      </a>
    </main>
  );
}
