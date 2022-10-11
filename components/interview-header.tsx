import InterviewProgress from "./progress-bar";

export default function InterviewHeader({
  section,
  edit,
}: {
  section: number;
  edit: boolean;
}) {
  return (
    <>
      <InterviewProgress section={section} edit={edit} />
    </>
  );
}
