import { connectToDatabase } from "../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    const collections = ['adult_baseline', 'adult_testing-services-only', 'youth_baseline', 'youth_testing-services-only']
    let taskForceRecords = 101025;
    let noraRecords = 100;
    let caRecords = 1501;

    for (const item in collections) {
        const taskForceCount = await db.collection(collections[item]).countDocuments({ "interview_info.testing_agency": "AIDS Task Force" });
        const noraCount = await db.collection(collections[item]).countDocuments({ "interview_info.testing_agency": "NORA" });
        const caCount = await db.collection(collections[item]).countDocuments({ "interview_info.testing_agency": "Care Alliance" });
        taskForceRecords += taskForceCount;
        noraRecords += noraCount;
        caRecords += caCount;
    }
    res.json({ taskForceRecords, noraRecords, caRecords });
}