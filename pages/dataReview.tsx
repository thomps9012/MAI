import Link from "next/link";
import { useEffect } from "react";

export default function DataReview() {
    useEffect(() => {

        const demographicData = sessionStorage.getItem('demographic_info') as string;
        const behaviorData = sessionStorage.getItem('behavior_info') as string;
        const attitudeData = sessionStorage.getItem('risk_attitudes') as string;
        console.log(JSON.parse(demographicData))
        console.log(JSON.parse(behaviorData))
        console.log(JSON.parse(attitudeData))
    })
    return (
        <div>
            <Link href='/demographics' passHref>
                Edit Demographic Data
            </Link>
            <Link href='/behavior' passHref>
                Edit Behavioral Data
            </Link>
            <Link href='/attitudes' passHref>
                Edit Risk Attitudes
            </Link>
        </div>
    )
}