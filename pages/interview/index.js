import { useEffect, useState } from "react";
import titleCase from "../../utils/titleCase";
import { useRouter } from "next/router";
import { deleteCookie, setCookie } from "cookies-next";
import { connectToDatabase } from "../../utils/mongodb";
const GenerateID = (
  testing_agency,
  AIDS_TASK_FORCE_RECORDS,
  NORA_RECORDS,
  CARE_ALLIANCE_RECORDS
) => {
  switch (testing_agency) {
    case "AIDS Task Force":
      return `ATF${AIDS_TASK_FORCE_RECORDS + 1}`;
    case "NORA":
      return `NORA${NORA_RECORDS + 1}`;
    case "Care Alliance":
      return `CA${CARE_ALLIANCE_RECORDS + 1}`;
  }
};
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const collections = ["baseline", "testing_only"];
  let AIDS_TASK_FORCE_RECORDS = 101025;
  let NORA_RECORDS = 100;
  let CARE_ALLIANCE_RECORDS = 1501;
  for (const item in collections) {
    const taskForceCount = await db
      .collection(collections[item])
      .countDocuments({ agency: "AIDS Task Force" });
    const noraCount = await db
      .collection(collections[item])
      .countDocuments({ agency: "NORA" });
    const caCount = await db
      .collection(collections[item])
      .countDocuments({ agency: "Care Alliance" });
    AIDS_TASK_FORCE_RECORDS += taskForceCount;
    NORA_RECORDS += noraCount;
    CARE_ALLIANCE_RECORDS += caCount;
  }
  const testing_agencies = await db
    .collection("answers")
    .findOne({ type: "TESTING_AGENCIES" });
  return {
    props: {
      testing_agencies: JSON.parse(JSON.stringify(testing_agencies)),
      AIDS_TASK_FORCE_RECORDS,
      NORA_RECORDS,
      CARE_ALLIANCE_RECORDS,
    },
  };
}

export default function InterviewSelect({
  testing_agencies,
  AIDS_TASK_FORCE_RECORDS,
  NORA_RECORDS,
  CARE_ALLIANCE_RECORDS,
}) {
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
  const router = useRouter();
  const handleNameInput = (e) => {
    const name = e.target.value;
    if(name != "") {
      setName(name)
      document
      .querySelector(".phone_input")
      ?.setAttribute("style", "display: flex; flex-direction: column;");
      return
    }
    document
    .querySelector(".phone_input")
    ?.setAttribute("style", "display: none;");
  }
  const updateStateShowSubmit = ({ PID, phone, name }) => {
    if (PID) {
      setPID(PID);
    }
    setName(name);
    setPhone(phone);
    document
      .querySelector(".client_name_display")
      .setAttribute("style", "display: flex; flex-direction: column;");
    document
      .querySelector(".phone_input")
      ?.setAttribute("style", "display: flex; flex-direction: column;");
    document
      .querySelector("#page_submit")
      ?.setAttribute("style", "display: flex; flex-direction: column;");
  };
  const retrieveClientName = async () => {
    const res = await fetch(`/api/client/find_name`, {
      method: "POST",
      body: JSON.stringify({
        Client_PID: PID,
      }),
    }).then((res) => res.json());
    if (res.length == 0) {
      document
        .getElementById("valid-pid-input")
        ?.setAttribute("class", "display-input-validation");
    }
    if (res.length > 1) {
      document
        .getElementById("valid-pid-input")
        ?.setAttribute("class", "input-validation");
      let clientOpts = document.querySelector(".client-options");
      clientOpts?.innerHTML(`<option value="">Name - PID</option>`);
      document
        .querySelector(".client_select")
        ?.setAttribute("style", "display: flex; flex-direction: column;");
      document
        .querySelector(".client_name_display")
        .setAttribute("style", "display: none");
      document
        .querySelector(".phone_input")
        ?.setAttribute("style", "display: none");
      document
        .querySelector("#page_submit")
        ?.setAttribute("style", "display: none");
      res.forEach(({ client_name, PID, phone_number }) => {
        const client_info = JSON.stringify({
          name: client_name,
          PID,
          phone: phone_number,
        });
        const option = document.createElement("option");
        option.setAttribute("value", client_info);
        option.append(client_name + " - " + phone_number);
        document.getElementById("client-options").appendChild(option);
      });
    } else {
      if (res[0]?.client_name && res[0]?.phone_number) {
        const { client_name, phone_number } = res[0];
        updateStateShowSubmit({ name: client_name, phone: phone_number });
      }
    }
  };

  const selectClient = (e) => {
    const { name, PID, phone } = JSON.parse(e.target.value);
    updateStateShowSubmit({ PID: PID, name: name, phone: phone });
  };
  const handleAdultSelect = (e) => {
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
  const handleCategorySelect = (e) => {
    const { id } = e.target;
    setInterview(id);
    let generatedID;
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
        generatedID = GenerateID(
          agency,
          AIDS_TASK_FORCE_RECORDS,
          NORA_RECORDS,
          CARE_ALLIANCE_RECORDS
        );
        setPID(generatedID);
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
        generatedID = GenerateID(
          agency,
          AIDS_TASK_FORCE_RECORDS,
          NORA_RECORDS,
          CARE_ALLIANCE_RECORDS
        );
        setPID(generatedID);
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
  const handleAgencySelect = (e) => {
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
  const validPhoneNumber = (e) => {
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
    type,
    date,
    agency,
    PID,
    phone_number,
    client_name,
    adult
  ) => {
    if (
      type === "" ||
      date === "" ||
      agency === "" ||
      PID === "" ||
      phone_number === "" ||
      client_name === ""
    ) {
      return;
    }
    const PID_exists = await fetch("/api/client/PID_exists", {
      method: "POST",
      body: JSON.stringify({
        Client_PID: PID,
      }),
    }).then((res) => res.json());
    if (
      (PID_exists && type === "testing_only") ||
      (type === "baseline" && PID_exists)
    ) {
      document.getElementById("duplicate-PID").setAttribute("class", "display-input-validation");
      return;
    } else {
      document.getElementById("duplicate-PID").setAttribute("class", "input-validation");
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
      sessionStorage.setItem("interview_type", type);
      sessionStorage.setItem("interview_date", date);
      sessionStorage.setItem("testing_agency", agency);
      sessionStorage.setItem("client_PID", PID);
      sessionStorage.setItem("client_phone_number", phone_number);
      sessionStorage.setItem("client_name", client_name);
      sessionStorage.setItem("client_adult", JSON.stringify(adult));
      sessionStorage.setItem("interview_id", res.insertedId);
      setCookie("interview_type", type);
      setCookie("interview_date", date);
      setCookie("testing_agency", agency);
      setCookie("client_PID", PID);
      setCookie("client_phone_number", phone_number);
      setCookie("client_name", client_name);
      setCookie("client_adult", JSON.stringify(adult));
      setCookie("interview_id", res.insertedId);
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
      } else {
        sessionStorage.clear();
        deleteCookie("interview_type");
        deleteCookie("interview_date");
        deleteCookie("testing_agency");
        deleteCookie("client_PID");
        deleteCookie("client_phone_number");
        deleteCookie("client_name");
        deleteCookie("client_adult");
        deleteCookie("interview_id");
        router.reload();
      }
    } else {
      if (
        confirm(
          "Your cellular or internet connection is unstable \n \n Please try starting again on the homepage \n - or - \n See a test administrator for help."
        )
      ) {
        sessionStorage.clear();
        deleteCookie("interview_type");
        deleteCookie("interview_date");
        deleteCookie("testing_agency");
        deleteCookie("client_PID");
        deleteCookie("client_phone_number");
        deleteCookie("client_name");
        deleteCookie("client_adult");
        deleteCookie("interview_id");
        router.push("/");
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
        {testing_agencies?.choices.map((agency) => (
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
          onChange={(e) => setPID(e.target.value)}
        />
        <label className="input-validation" id="valid-pid-input">
          No Client with that PID Found
        </label>
        <a className="button" onClick={retrieveClientName}>
          Find Client
        </a>
      </div>
      <div className="client_select">
        <h2>Select Client</h2>
        <label>Multiple Clients with Matching PID</label>
        <select onChange={selectClient} defaultValue="" id="client-options">
          <option value="">Name - PID</option>
        </select>
      </div>
      <div className="client_name_display">
        <h2>Client Name</h2>
        <input
          type="text"
          defaultValue={client_name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="name_input">
        <h2>Enter Your First Name</h2>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleNameInput}
        />
      </div>
      <div className="phone_input">
        <h2>Phone Number</h2>
        <input
          type="text"
          placeholder="555-555-5555"
          defaultValue={phone_number}
          onChange={(e) => setPhone(e.target.value)}
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
      <label className="input-validation" id="duplicate-PID">
        A client with this PID already exists
      </label>
    </main>
  );
}
