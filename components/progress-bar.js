import titleCase from "../utils/titleCase";
export default function InterviewProgress({
  section,
  edit,
  interview_type,
  interview_date,
  client_PID,
}) {
  let percentage = 0;
  switch (section) {
    case 1:
      percentage = 20;
      break;
    case 2:
      percentage = 40;
      break;
    case 3:
      percentage = 60;
      break;
    case 4:
      percentage = 80;
      break;
    default:
      percentage = 100;
      break;
  }

  return (
    <div className="interview_header">
      <h2 style={{ textAlign: "center" }}>
        {titleCase(interview_type.split("_").join(" "))} Interview for{" "}
        {client_PID} on {interview_date}
      </h2>
      {!edit && (
        <div className="progress_bar">
          <div className="progress_outline">
            <div
              className="progress_filled"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
