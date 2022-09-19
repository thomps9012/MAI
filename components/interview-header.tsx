import InterviewProgress from "./progress-bar";

export default function InterviewHeader({ section }: { section: number }) {
    return <>
        <InterviewProgress section={section} />
    </>
}