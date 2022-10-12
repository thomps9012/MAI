import { useEffect, useState } from "react";
import titleCase from "../utils/titleCase";

export default function GraphDisplay({
  baselines,
  follow_ups,
  testing_only,
  exits,
  type,
}: {
  baselines: any;
  follow_ups: any;
  testing_only: any;
  exits: any;
  type: string;
}) {
  const [data, setData] = useState([
    ...baselines,
    ...follow_ups,
    ...testing_only,
    ...exits,
  ]);
//   {
// 15-
// 15-18
// 20-25
// 25-30
// 30-35
// 35-40
// 40-50
// 50+
// }
  const [ages, setAges] = useState([]);
  const [genders, setGenders] = useState({
    male_count: 0,
    female_count: 0,
    other_count: 0,
  });
  const [latinx, setLatinX] = useState({
    yes_count: 0,
    no_count: 0,
  });
  const [healthcare_knowledge, setHealthCare] = useState({
    yes_count: 0,
    no_count: 0,
  });
  const [vh_informed, setVH] = useState({
    yes_count: 0,
    no_count: 0,
  });
  const [hiv_informed, setHIV] = useState({
    yes_count: 0,
    no_count: 0,
  });
  const format_data = (type: string) => {
    switch (type) {
      case "all":
        return [...baselines, ...testing_only, ...follow_ups, ...exits];
      case "baseline":
        return baselines;
      case "testing-only":
        return testing_only;
      case "follow-up":
        return follow_ups;
      case "testing-only":
        return testing_only;
      default:
        return [...baselines, ...testing_only, ...follow_ups, ...exits];
    }
  };
  const age_breakdown = (data: any) => {
    return data.map(
      (record: any) =>
        new Date().getFullYear() -
        record.demographics.date_of_birth?.slice(0, 4)
    );
  };
//   let under15 = 0;
//   let fifteen_18 = 0;
//   let eighteen_25 = 0;
//   let twentyfive_30 = 0;
//   let thirty_35 = 0;
//   let thirtyfive_40 = 0;
//   let forty_50 = 0;
//   let fifty_plus = 0;
//   const age = data.foreach(
//     (record: any) =>
//       new Date().getFullYear() -
//       record.demographics.date_of_birth?.slice(0, 4)
//   );
//   if (age != NaN) {
//     switch (age) {
//       case age < 15:
//         under15++;
//         break;
//       case 15 < age && age < 18:
//         fifteen_18++;
//         break;
//       case 18 < age && age < 25:
//         eighteen_25++;
//         break;
//       case 25 < age && age < 30:
//         twentyfive_30++;
//         break;
//       case 30 < age && age < 35:
//         thirty_35++;
//         break;
//       case 35 < age && age < 40:
//         thirtyfive_40++;
//         break;
//       case 40 < age && age < 50:
//         forty_50++;
//         break;
//       case 50 < age:
//         fifty_plus++;
//         break;
//     }
//   }
  const gender_breakdown = (data: any) => {
    const male_count = data.filter(
      (record: any) => record.demographics.gender === "Male"
    ).length;
    const female_count = data.filter(
      (record: any) => record.demographics.gender === "Female"
    ).length;
    const other_count = data.length - male_count - female_count;
    return {
      male_count: male_count,
      female_count: female_count,
      other_count: other_count,
    };
  };
  const latinX_breakdown = (data: any) => {
    const yes_count = data.filter(
      (record: any) => record.demographics.latinx === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return {
      yes_count: yes_count,
      no_count: no_count,
    };
  };
  const vh_breakdown = (data: any) => {
    const yes_count = data.filter(
      (record: any) => record.demographics.informed_of_VH_status === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return {
      yes_count: yes_count,
      no_count: no_count,
    };
  };
  const hiv_breakdown = (data: any) => {
    const yes_count = data.filter(
      (record: any) => record.demographics.informed_of_HIV_status === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return {
      yes_count: yes_count,
      no_count: no_count,
    };
  };
  const healthcare_breakdown = (data: any) => {
    const yes_count = data.filter(
      (record: any) =>
        record.demographics.knowledge_of_healthcare_facility === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return {
      yes_count: yes_count,
      no_count: no_count,
    };
  };
  useEffect(() => {
    setData(format_data(type));
  }, [type]);
  useEffect(() => {
    setAges(age_breakdown(data));
    setGenders(gender_breakdown(data));
    setHIV(hiv_breakdown(data));
    setVH(vh_breakdown(data));
    setLatinX(latinX_breakdown(data));
    setHealthCare(healthcare_breakdown(data));
  }, [data]);
  console.table(data);
  return (
    <section className="graph_display">
      {data.length}
      <br />
      {titleCase(type.split("-").join(" ")) + " Interviews"}
      <h1>Gender</h1>
      <p>Male: {genders.male_count}</p>
      <p>Female: {genders.female_count}</p>
      <p>Other: {genders.other_count}</p>
      <h1>Informed of HIV Status</h1>
      <p>Yes: {hiv_informed.yes_count}</p>
      <p>No: {hiv_informed.no_count}</p>
      <h1>Informed of VH Status</h1>
      <p>Yes: {vh_informed.yes_count}</p>
      <p>No: {vh_informed.no_count}</p>
      <h1>Knowledge of Healthcare Facility</h1>
      <p>Yes: {healthcare_knowledge.yes_count}</p>
      <p>No: {healthcare_knowledge.no_count}</p>
      <h1>Age Breakdown</h1>
      {ages.map((age: string, i: number) => (
        <p key={JSON.stringify(i)}>{age}</p>
      ))}
      <h1>LatinX</h1>
      <p>Yes: {latinx.yes_count}</p>
      <p>No: {latinx.no_count}</p>
    </section>
  );
}
