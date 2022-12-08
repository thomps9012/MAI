import Link from "next/link";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../../../../utils/mongodb";
import useSWR from "swr";
import fetcher from "../../../../utils/fetcher";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";

export default function ClientEditPage({
  baseline_record,
  testing_only_record,
  client_PID,
  user_editor,
}: any) {
  const router = useRouter();
  const { data: testing_agencies, error: testing_agency_err } = useSWR(
    "/api/answers/testing_agencies",
    fetcher
  );
  const { data: gender_options, error: gender_option_err } = useSWR(
    "/api/questions/gender_options",
    fetcher
  );
  const [client_info, setClientInfo] = useState({
    interview_id: "",
    client_name: "",
    date_of_birth: "",
    phone_number: "",
    adult: false,
    type: "",
    PID: client_PID,
    gender: "",
    agency: "",
  });
  useEffect(() => {
    baseline_record._id != null
      ? setClientInfo({
          interview_id: baseline_record._id,
          client_name: baseline_record.client_name,
          date_of_birth: baseline_record.demographics.date_of_birth,
          phone_number: baseline_record.phone_number,
          adult: baseline_record.adult,
          type: baseline_record.type,
          PID: client_PID,
          gender: baseline_record.demographics.gender,
          agency: baseline_record.agency,
        })
      : setClientInfo({
          interview_id: testing_only_record._id,
          client_name: testing_only_record.client_name,
          date_of_birth: testing_only_record.demographics.date_of_birth,
          phone_number: testing_only_record.phone_number,
          adult: testing_only_record.adult,
          type: testing_only_record.type,
          PID: client_PID,
          gender: testing_only_record.demographics.gender,
          agency: testing_only_record.agency,
        });
  }, [baseline_record, testing_only_record, client_PID]);
  const {
    interview_id,
    client_name,
    date_of_birth,
    agency,
    adult,
    phone_number,
    type,
    PID,
    gender,
  } = client_info;
  const updatePID = async (e: any) => {
    const new_PID = e.target.value;
    const duplicate_PID = await fetch(`/api/client/PID_exists?PID=${new_PID}`);
    duplicate_PID && alert(`PID: ${new_PID} \n Already Exists in the Database`);
    if (!duplicate_PID) {
      const new_state = { ...client_info, PID: new_PID };
      setClientInfo(new_state);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const new_state = { ...client_info, [name]: value };
    setClientInfo(new_state);
  };
  const validPhoneNumber = () => {
    if (
      phone_number.match(
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g
      )
    ) {
      alert("Must enter a valid phone number");
      return true;
    }
    return false;
  };

  const submitEdit = async () => {
    const duplicate_PID = await fetch(`/api/client/PID_exists?PID=${PID}`);
    if (duplicate_PID) return;
    if (!validPhoneNumber) return;
    // replace with headers
    const response = await fetch(
      `/api/client/edit_demographics?record_id=${interview_id}&interview_type=${type}?editor=${user_editor}`,
      {
        body: JSON.stringify({
          date_of_birth: date_of_birth,
          client_name: client_name,
          PID: PID,
          phone_number: phone_number,
          gender: gender,
          agency: agency,
          adult: adult,
        }),
      }
    ).then((res) => res.json());
    const client_cache = await caches.open("clients");
    client_cache.put(
      `interview/${interview_id}/PID/${PID}/type/${type}`,
      await fetch(
        `/api/interviews/find?record_id=${interview_id}&interview_type=${type}`
      )
    );
    response.acknowledged && router.push(`/admin/client_detail/${PID}`);
  };
  if (!user_editor) {
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
  if (gender_option_err || testing_agency_err) {
    return (
      <main className="landing">
        <h1>
          Trouble Connecting to the Database... <br /> Check Your Internet or
          Cellular Connection
        </h1>
      </main>
    );
  }
  return (
    <main className="container">
      <h1>{PID} Demographic Information</h1>
      <h2>Name</h2>
      <input name="client_name" value={client_name} onChange={handleChange} />
      <h2>Phone Number</h2>
      <input
        name="phone_number"
        value={phone_number}
        onBlur={validPhoneNumber}
        onChange={handleChange}
      />
      <h2>Adult</h2>
      <select
        name="adult"
        value={adult ? "Adult" : "Youth"}
        onChange={handleChange}
      ></select>
      <h2>Testing Agency {"&"} PID</h2>
      <div className="pid_select">
        <select name="agency" value={agency} onChange={handleChange}>
          {testing_agencies?.choices.map((agency: string) => (
            <option key={agency}>{agency}</option>
          ))}
        </select>
        <input name="PID" onChange={() => updatePID} />
      </div>
      <h2>Date of Birth</h2>
      <input
        name="date_of_birth"
        value={date_of_birth}
        type="date"
        onChange={handleChange}
      />
      <h2>Gender</h2>
      <select value={gender} name="gender" onChange={handleChange}>
        {gender_options?.choices.map((gender: string) => (
          <option key={gender}>{gender}</option>
        ))}
      </select>
      <Link href={`/interview_detail/edit/${interview_id}`}>
        <a>
          More Editable Options
          <br />
          <span>*** Warning, Will NOT Save Current Changes ***</span>
        </a>
      </Link>
      <a className="button" onClick={submitEdit}>
        Submit Edits
      </a>
    </main>
  );
}

export async function getServerSideProps({
  req,
  query,
}: {
  req: NextApiRequest;
  query: NextApiRequestQuery;
}) {
  const { db } = await connectToDatabase();
  const user_id = req.cookies.user_id;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { editor: 1 });
  const user_editor = user.editor;
  if (!user_editor) {
    return {
      props: {
        user_editor,
        baseline_record: {},
        testing_only_record: {},
        client_PID: "",
      },
    };
  }
  const baseline_record = await db.collection("baseline").findOne(
    { PID: query.id },
    {
      _id: 1,
      type: 1,
      agency: 1,
      "demographics.date_of_birth": 1,
      "demographics.gender": 1,
      client_name: 1,
      phone_number: 1,
      adult: 1,
    }
  );
  const testing_only_record = await db.collection("testing_only").findOne(
    { PID: query.id },
    {
      _id: 1,
      type: 1,
      agency: 1,
      "demographics.date_of_birth": 1,
      "demographics.gender": 1,
      client_name: 1,
      phone_number: 1,
      adult: 1,
    }
  );
  return {
    props: {
      user_editor,
      baseline_record: JSON.parse(JSON.stringify(baseline_record)),
      testing_only_record: JSON.parse(JSON.stringify(testing_only_record)),
      client_PID: query.id,
    },
  };
}
