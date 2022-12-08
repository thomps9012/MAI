import InterviewProgress from "./progress-bar";

export default function InterviewHeader({ section, edit }) {
  return (
    <>
      <InterviewProgress section={section} edit={edit} />
    </>
  );
}
