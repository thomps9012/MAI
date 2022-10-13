import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function BarChart({
  data_set,
  title,
  id,
}: {
  id: string;
  title: string;
  data_set: any;
}) {
  const generate_random_color = () => {
    const hex_color = "#" + Math.random().toString(16).slice(-3);
    return hex_color;
  };
  const get_labels = data_set.map((data: any) => data.label);
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        display: false
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data_set_array = data_set.map((record: any) => record.count);
  const color = generate_random_color();
  const data = {
    labels: get_labels,
    datasets: [{
      // for all interviews this could be interview type breakdown
      label: title,
      backgroundColor: color,
      borderColor: color,
      data: data_set_array
    }],
  };
  console.log(data);
  return (
    <section className="bar-chart" id={id}>
      <Bar id={id} options={options} data={data} />
    </section>
  );
}
