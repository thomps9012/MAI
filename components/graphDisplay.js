import { useEffect, useState } from "react";
import titleCase from "../utils/titleCase";
import BarChart from "./barChart";

export default function GraphDisplay({
  baselines,
  follow_ups,
  testing_only,
  exits,
  type,
}) {
  const [data, setData] = useState([
    ...baselines,
    ...follow_ups,
    ...testing_only,
    ...exits,
  ]);
  console.log("graph data", data);
  useEffect(() => {
    setData([...baselines, ...follow_ups, ...testing_only, ...exits]);
  }, [baselines, follow_ups, testing_only, exits]);
  const [ages, setAges] = useState([
    { label: "Under 18", count: 0 },
    { label: "18 - 25", count: 0 },
    { label: "25 -35", count: 0 },
    { label: "35 - 50", count: 0 },
    { label: "50 Plus", count: 0 },
  ]);
  const [genders, setGenders] = useState([
    { label: "Male", count: 0 },
    { label: "Female", count: 0 },
    { label: "Other", count: 0 },
  ]);
  const [latinx, setLatinX] = useState([
    {
      label: "Yes",
      count: 0,
    },
    {
      label: "No",
      count: 0,
    },
  ]);
  const [healthcare_knowledge, setHealthCare] = useState([
    {
      label: "Yes",
      count: 0,
    },
    {
      label: "No",
      count: 0,
    },
  ]);
  const [vh_informed, setVH] = useState([
    {
      label: "Yes",
      count: 0,
    },
    {
      label: "No",
      count: 0,
    },
  ]);
  const [hiv_informed, setHIV] = useState([
    {
      label: "Yes",
      count: 0,
    },
    {
      label: "No",
      count: 0,
    },
  ]);
  const format_data = (type) => {
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
  const age_breakdown = (data) => {
    let under_18 = 0;
    let eighteen_25 = 0;
    let twentyfive_35 = 0;
    let thirtyfive_50 = 0;
    let fifty_plus = 0;
    for (let i = 0; i < data.length; i++) {
      const age =
        new Date().getFullYear() -
        parseInt(data[i].demographics?.date_of_birth?.slice(0, 4));
      if (age < 18) {
        under_18++;
      } else if (18 < age && age < 25) {
        eighteen_25++;
      } else if (25 < age && age < 35) {
        twentyfive_35++;
      } else if (35 < age && age < 50) {
        thirtyfive_50++;
      } else if (50 < age) {
        fifty_plus++;
      }
    }
    return [
      { label: "Under 18", count: under_18 },
      { label: "18 - 25", count: eighteen_25 },
      { label: "25 -35", count: twentyfive_35 },
      { label: "35 - 50", count: thirtyfive_50 },
      { label: "50 Plus", count: fifty_plus },
    ];
  };
  const gender_breakdown = (data) => {
    const male_count = data.filter(
      (record) => record.demographics?.gender === "Male"
    ).length;
    const female_count = data.filter(
      (record) => record.demographics?.gender === "Female"
    ).length;
    const other_count = data.length - male_count - female_count;
    return [
      { label: "Male", count: male_count },
      { label: "Female", count: female_count },
      { label: "Other", count: other_count },
    ];
  };
  const latinX_breakdown = (data) => {
    const yes_count = data.filter(
      (record) => record.demographics?.latinx === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return [
      {
        label: "Yes",
        count: yes_count,
      },
      {
        label: "No",
        count: no_count,
      },
    ];
  };
  const vh_breakdown = (data) => {
    const yes_count = data.filter(
      (record) => record.demographics?.informed_of_VH_status === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return [
      {
        label: "Yes",
        count: yes_count,
      },
      {
        label: "No",
        count: no_count,
      },
    ];
  };
  const hiv_breakdown = (data) => {
    const yes_count = data.filter(
      (record) => record.demographics?.informed_of_HIV_status === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return [
      {
        label: "Yes",
        count: yes_count,
      },
      {
        label: "No",
        count: no_count,
      },
    ];
  };
  const healthcare_breakdown = (data) => {
    const yes_count = data.filter(
      (record) =>
        record.demographics?.knowledge_of_healthcare_facility === "Yes"
    ).length;
    const no_count = data.length - yes_count;
    return [
      {
        label: "Yes",
        count: yes_count,
      },
      {
        label: "No",
        count: no_count,
      },
    ];
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
  const get_graphs = () => {
    const visible = document.getElementsByClassName("bar-chart");
    const hidden = document.getElementsByClassName("hidden-chart");
    return [...visible, ...hidden];
  };
  const get_checkbox_parents = () => {
    const visible = document.getElementsByClassName("display-one-graph-option");
    const hidden = document.getElementsByClassName("hidden-display-option");
    return [...hidden, ...visible];
  };
  const get_check_boxes = () => {
    const visible = document.getElementsByClassName("bar-chart-checkbox");
    const hidden = document.getElementsByClassName("hidden-checkbox");
    return [...visible, ...hidden];
  };
  const hide_graphs = () => {
    const elements = get_graphs();
    for (let i = 0; i < elements.length; i++) {
      elements[i]?.setAttribute("class", "hidden-chart");
    }
    const check_box_parents = get_checkbox_parents();
    for (let i = 0; i < check_box_parents.length; i++) {
      check_box_parents[i].setAttribute("class", "hidden-display-option");
    }
  };
  const hide_enabled = () => {
    const check_boxes = get_check_boxes();
    for (let i = 0; i < check_boxes.length; i++) {
      const id_arr = check_boxes[i].id.split("-");
      const arr_len = id_arr.length;
      const last_element = id_arr[arr_len - 1];
      if (last_element === "show")
        check_boxes[i].setAttribute("class", "hidden-checkbox");
    }
  };
  useEffect(() => {
    hide_enabled();
  }, []);
  const show_graphs = () => {
    const elements = get_graphs();
    for (let i = 0; i < elements.length; i++) {
      elements[i]?.setAttribute("class", "bar-chart");
    }
    const check_box_parents = get_checkbox_parents();
    for (let i = 0; i < check_box_parents.length; i++) {
      check_box_parents[i].setAttribute("class", "display-one-graph-option");
    }
    hide_enabled();
  };
  const show_one_graph = (id) => {
    const elements = get_graphs();
    for (let i = 0; i < elements.length; i++) {
      const element_id = elements[i].id;
      if (element_id === id) {
        document.getElementById(element_id)?.setAttribute("class", "bar-chart");
      }
    }
    const check_boxes = get_check_boxes();
    for (let i = 0; i < check_boxes.length; i++) {
      const element_id = check_boxes[i].id;
      if (element_id === id + "-show") {
        document
          .getElementById(element_id)
          ?.setAttribute("class", "hidden-checkbox");
      }
      if (element_id === id + "-hide") {
        document
          .getElementById(element_id)
          ?.setAttribute("class", "bar-chart-checkbox");
      }
    }
  };
  const hide_one_graph = (id) => {
    const elements = get_graphs();
    for (let i = 0; i < elements.length; i++) {
      const element_id = elements[i].id;
      if (element_id === id) {
        document
          .getElementById(element_id)
          ?.setAttribute("class", "hidden-chart");
      }
    }
    const check_boxes = get_check_boxes();
    for (let i = 0; i < check_boxes.length; i++) {
      const element_id = check_boxes[i].id;
      if (element_id === id + "-show") {
        document
          .getElementById(element_id)
          ?.setAttribute("class", "bar-chart-checkbox");
      }
      if (element_id === id + "-hide") {
        document
          .getElementById(element_id)
          ?.setAttribute("class", "hidden-checkbox");
      }
    }
  };
  return (
    <section className="graph-display">
      <article style={{ textAlign: "center" }}>
        <h2>
          {data.length}{" "}
          {titleCase(
            type.split("-").join(" ") === "all"
              ? "Total"
              : type.split("-").join(" ")
          ) + " Interviews"}
        </h2>
        <h1>Graphs</h1>
        <br />
        <a className="button" onClick={hide_graphs}>
          Hide All
        </a>
        <a className="button" onClick={show_graphs}>
          Show All
        </a>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            margin: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <p className="display-one-graph-option">
            Age
            <a
              className="bar-chart-checkbox"
              id="age-breakdown-show"
              onClick={() => show_one_graph("age-breakdown")}
            >
              ✅
            </a>
            <a
              className="bar-chart-checkbox"
              id="age-breakdown-hide"
              onClick={() => hide_one_graph("age-breakdown")}
            >
              ❌
            </a>
          </p>
          <p className="display-one-graph-option">
            HIV Informed
            <a
              className="bar-chart-checkbox"
              id="hiv-informed-breakdown-show"
              onClick={() => show_one_graph("hiv-informed-breakdown")}
            >
              ✅
            </a>
            <a
              className="bar-chart-checkbox"
              id="hiv-informed-breakdown-hide"
              onClick={() => hide_one_graph("hiv-informed-breakdown")}
            >
              ❌
            </a>
          </p>
          <p className="display-one-graph-option">
            Viral Hep Informed
            <a
              className="bar-chart-checkbox"
              id="vh-informed-breakdown-show"
              onClick={() => show_one_graph("vh-informed-breakdown")}
            >
              ✅
            </a>
            <a
              className="bar-chart-checkbox"
              id="vh-informed-breakdown-hide"
              onClick={() => hide_one_graph("vh-informed-breakdown")}
            >
              ❌
            </a>
          </p>
          <p className="display-one-graph-option">
            Gender
            <a
              className="bar-chart-checkbox"
              id="gender-breakdown-show"
              onClick={() => show_one_graph("gender-breakdown")}
            >
              ✅
            </a>
            <a
              className="bar-chart-checkbox"
              id="gender-breakdown-hide"
              onClick={() => hide_one_graph("gender-breakdown")}
            >
              ❌
            </a>
          </p>
          <p className="display-one-graph-option">
            LatinX
            <a
              className="bar-chart-checkbox"
              id="latinx-breakdown-show"
              onClick={() => show_one_graph("latinx-breakdown")}
            >
              ✅
            </a>
            <a
              className="bar-chart-checkbox"
              id="latinx-breakdown-hide"
              onClick={() => hide_one_graph("latinx-breakdown")}
            >
              ❌
            </a>
          </p>
          <p className="display-one-graph-option">
            Nearby Healthcare
            <a
              className="bar-chart-checkbox"
              id="healthcare-knowledge-breakdown-show"
              onClick={() => show_one_graph("healthcare-knowledge-breakdown")}
            >
              ✅
            </a>
            <a
              className="bar-chart-checkbox"
              id="healthcare-knowledge-breakdown-hide"
              onClick={() => hide_one_graph("healthcare-knowledge-breakdown")}
            >
              ❌
            </a>
          </p>
        </div>
      </article>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          flexGrow: 3,
        }}
      >
        <BarChart data_set={ages} title="Age Breakdown" id="age-breakdown" />
        <BarChart
          data_set={hiv_informed}
          title="Informed of HIV Status"
          id="hiv-informed-breakdown"
        />
        <BarChart
          data_set={vh_informed}
          title="Informed of Viral Hepatitis Status"
          id="vh-informed-breakdown"
        />
        <BarChart
          data_set={genders}
          title="Gender Identification"
          id="gender-breakdown"
        />
        <BarChart
          data_set={latinx}
          title="Identifies as LatinX"
          id="latinx-breakdown"
        />
        <BarChart
          data_set={healthcare_knowledge}
          title="Knowledge of a Nearby Healthcare Center"
          id="healthcare-knowledge-breakdown"
        />
      </section>
    </section>
  );
}
