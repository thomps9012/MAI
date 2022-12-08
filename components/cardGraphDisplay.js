import RadarChart from "./radarChart";

export default function CardGraphs({
  gift_card_records,
  card_amounts,
  card_types,
}) {
  const filter_by_type = (type) => {
    const records = gift_card_records.filter((record) => record.type === type);
    return records;
  };
  const count_amounts = (records) => {
    let five_count = 0;
    let ten_count = 0;
    let fifteen_count = 0;
    let twenty_count = 0;
    let twenty_five_count = 0;
    let thirty_count = 0;
    let unknown_count = 0;
    for (let i = 0; i < records.length; i++) {
      const record_amt = records[i].amount;
      switch (record_amt) {
        case 5:
          five_count++;
          break;
        case 10:
          ten_count++;
          break;
        case 15:
          fifteen_count++;
          break;
        case 20:
          twenty_count++;
          break;
        case 25:
          twenty_five_count++;
          break;
        case 30:
          thirty_count++;
          break;
        default:
          unknown_count++;
          break;
      }
    }
    return [
      five_count,
      ten_count,
      fifteen_count,
      twenty_count,
      twenty_five_count,
      thirty_count,
      unknown_count,
    ];
  };
  const generate_random_color = () => {
    const hex_color = "#" + Math.random().toString(16).slice(-3);
    return hex_color;
  };
  const format_data = () => {
    const labels = card_amounts.choices;
    const types = card_types.choices;
    let data_set = [];
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      const records = filter_by_type(type);
      const counts = count_amounts(records);
      const color = generate_random_color();
      data_set.push({
        label: type,
        data: counts,
        borderWidth: 1,
        backgroundColor: color,
      });
    }
    return {
      labels: [...labels, "Unknown"],
      datasets: data_set,
    };
  };
  const formated_data = format_data();
  const get_graphs = () => {
    const visible = document.getElementsByClassName("radar-chart");
    const hidden = document.getElementsByClassName("hidden-chart");
    return [...visible, ...hidden];
  };
  const hide_graphs = () => {
    const elements = get_graphs();
    for (let i = 0; i < elements.length; i++) {
      elements[i]?.setAttribute("class", "hidden-chart");
    }
  };
  const show_graphs = () => {
    const elements = get_graphs();
    for (let i = 0; i < elements.length; i++) {
      elements[i]?.setAttribute("class", "radar-chart");
    }
  };
  return (
    <section className="graph-display">
      <article style={{ textAlign: "center" }}>
        <h2>
          {gift_card_records.length}
          {" Total Cards"}
        </h2>
        <br />
        <a className="button" onClick={hide_graphs}>
          Hide
        </a>
        <a className="button" onClick={show_graphs}>
          Show
        </a>
      </article>
      <RadarChart data_sets={formated_data} />
    </section>
  );
}
