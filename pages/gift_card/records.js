import { ObjectId } from "mongodb";
import Link from "next/link";
import { useState } from "react";
import CardGraphs from "../../components/cardGraphDisplay";
import { connectToDatabase } from "../../utils/mongodb";
import { getCookie } from "cookies-next";
export async function getServerSideProps({ req, res }) {
  const { db } = await connectToDatabase();
  const user_id = getCookie("user_id", { req, res });
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(user_id) }, { admin: 1 });
  const user_admin = user.admin;
  if (!user_admin) {
    return {
      props: {
        user_admin,
        card_records: [],
        card_amounts: {},
        card_types: {},
        testing_agencies: {},
      },
    };
  }
  const card_records = await db
    .collection("cards")
    .find({}, { _id: 1, PID: 1, date: 1, received_date: 1 })
    .toArray();
  const card_types = await db
    .collection("answers")
    .findOne({ type: "CARD_TYPES" });
  const card_amounts = await db
    .collection("answers")
    .findOne({ type: "CARD_AMOUNTS" });
  const testing_agencies = await db
    .collection("answers")
    .findOne({ type: "TESTING_AGENCIES" });
  return {
    props: {
      user_admin,
      card_records: JSON.parse(JSON.stringify(card_records)),
      card_types: JSON.parse(JSON.stringify(card_types)),
      card_amounts: JSON.parse(JSON.stringify(card_amounts)),
      testing_agencies: JSON.parse(JSON.stringify(testing_agencies)),
    },
  };
}
export default function CardRecordsPage({
  card_records,
  card_amounts,
  card_types,
  user_admin,
  testing_agencies,
}) {
  const [gift_card_records, setGiftCards] = useState(card_records);
  const filter = () => {
    const selected_agency = document.getElementById("agency")?.value;
    const PID_input = document.getElementById("pid")?.value;
    const dispersed_filter = document.getElementById("dispersed")?.value;
    if (dispersed_filter === "") {
      selected_agency === ""
        ? setGiftCards(
            card_records.filter((record) => record.PID.includes(PID_input))
          )
        : setGiftCards(
            card_records.filter(
              (record) =>
                record.PID.includes(selected_agency) &&
                record.PID.split(selected_agency)[1].includes(PID_input)
            )
          );
    } else {
      selected_agency === ""
        ? setGiftCards(
            card_records
              .filter((record) =>
                JSON.parse(dispersed_filter)
                  ? record.received_date
                  : !record.received_date
              )
              .filter((record) => record.PID.includes(PID_input))
          )
        : setGiftCards(
            card_records
              .filter((record) =>
                JSON.parse(dispersed_filter)
                  ? record.received_date
                  : !record.received_date
              )
              .filter(
                (record) =>
                  record.PID.includes(selected_agency) &&
                  record.PID.split(selected_agency)[1].includes(PID_input)
              )
          );
    }
  };
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
  return (
    <main className="container">
      <h1>Gift Card Records</h1>
      <h3>Filters</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <h3>Agency</h3>
          <select name="agency" id="agency" onChange={filter} defaultValue="">
            <option value="">All Agencies</option>
            {testing_agencies?.choices.map((agency) => (
              <option
                key={agency}
                value={
                  agency === "AIDS Task Force"
                    ? "ATF"
                    : agency === "Care Alliance"
                    ? "CA"
                    : agency
                }
              >
                {agency}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flexDirection: "column" }}>
          <h3>PID</h3>
          <input name="pid" id="pid" type="number" onChange={filter} />
        </div>
        <div style={{ flexDirection: "column" }}>
          <h3>Dispersed</h3>
          <select onChange={filter} defaultValue="" id="dispersed">
            <option value="">All Records</option>
            <option value="true">Dispersed</option>
            <option value="false">Not Dispersed</option>
          </select>
        </div>
      </div>
      <CardGraphs
        gift_card_records={gift_card_records}
        card_amounts={card_amounts}
        card_types={card_types}
      />
      {gift_card_records.map((record) => {
        const { _id, PID, received_date, interview_type } = record;
        return (
          <div className="gift_card_card" key={JSON.stringify(_id)}>
            <h1>{PID}</h1>
            <h1>{interview_type}</h1>
            {received_date != null ? (
              <Link href={`/gift_card/${_id}/detail`}>
                <a>Card Detail</a>
              </Link>
            ) : (
              <Link href={`/gift_card/${_id}/disperse`}>
                <a>Disperse Card</a>
              </Link>
            )}
          </div>
        );
      })}
    </main>
  );
}
