import { connectToDatabase } from "../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    const collections = ['baseline', 'testing_only']
    let AIDS_TASK_FORCE_RECORDS = 101025;
    let NORA_RECORDS = 100;
    let CARE_ALLIANCE_RECORDS = 1501;

    for (const item in collections) {
        const taskForceCount = await db.collection(collections[item]).countDocuments({ "agency": "AIDS Task Force" });
        const noraCount = await db.collection(collections[item]).countDocuments({ "agency": "NORA" });
        const caCount = await db.collection(collections[item]).countDocuments({ "agency": "Care Alliance" });
        AIDS_TASK_FORCE_RECORDS += taskForceCount;
        NORA_RECORDS += noraCount;
        CARE_ALLIANCE_RECORDS += caCount;
    }
    res.json({ AIDS_TASK_FORCE_RECORDS, NORA_RECORDS, CARE_ALLIANCE_RECORDS });
}