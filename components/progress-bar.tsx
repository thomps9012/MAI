export default function InterviewProgress({ section }: { section: number }) {
    let percentage = 0;
    switch (section) {
        case 1:
            percentage = 0;
            break;
        case 2:
            percentage = 20;
            break;
        case 3:
            percentage = 40;
            break;
        case 4:
            percentage = 60;
            break;
        case 5:
            percentage = 90;
            break;
        default:
            percentage = 100;
            break;
    }
    return <></>
}