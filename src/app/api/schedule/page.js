// import { getServerSession } from "next-auth";
import * as db from "../../../lib/db.mjs";

export default async function handler(req, res) {
    // const session = await getServerSession(req, res);
    
    console.log('req',req);
    console.log('req_method',req.method);
    // if (!session) {
    //     return res.status(401).json("Unauthorized");
    // }
    if (req.method === 'GET') {
        const programs = await db.getPrograms();
        console.log('programs_api',programs);
        return res.status(200).json(programs);
        // res.status(200).json({ user: session.user });
    }
    // else if (req.method === 'POST') {
    //     const data = req.body;
    //     if (!data.id){
    //         return res.status(400).json({message: "Name field is missing"});
    //     }
    //     await db.createClassCode({id: data.id, owner: session.user.name});
    //     const classCode = await db.getClassCodes(session.user.name);
    //     return res.status(201).json(classCode[0]);
    // }
    // else {
    //     res.status(405).json({message: "Method not allowed"});
    // }
}