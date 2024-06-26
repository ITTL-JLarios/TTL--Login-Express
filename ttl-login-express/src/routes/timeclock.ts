import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import { Users } from "../models/users.js";
import { Events } from "../models/events.js";

const timeRouter = Router()

// Response interfaces
interface Attend {
    timestamp: Date;
    ip: string;
    event_user: Object;
    type: string;
    time_total?: string; 
}

timeRouter.get('/', async (req: Request, res: Response) => {
    console.log({myRes: res.json})
    res.status(200).json({res:"foo"})
})

timeRouter.post('/', async (req: Request, res: Response) => {
    /* Get Current Time */
    const currentTime: any = new Date();
    console.log(currentTime.getDay())
    currentTime.setHours( currentTime.getHours() - 6 )

    const { userName, userIP, status } = req.body;
    if (!userName || !userIP || !status) {
        return res.status(400).send({err: "Check body becuase are missing required elements"})
    }

    console.log(userName, userIP, status)

    const userFromDB = await Users.findOne(
        {username: userName}
    ).populate({path: 'events', select: 'timestamp type'}).exec();
    const events = userFromDB?.events
    const last_login = events[events.length - 1]
    console.log(last_login)

    const userIDObj = userFromDB?._id || null
    if ( !userFromDB ) {
        return res.status(404).send({error: "User not Found!"})
    }
    
    try {
        const report: Attend = {
            timestamp: currentTime,
            event_user: userIDObj,
            ip: userIP,
            type: status,
        }

        if (status === 'logout' && last_login['type'] === 'login') {
            let delta = (currentTime - last_login['timestamp']) / 1000;
            
            let hours = Math.floor(delta / 3600);
            delta -= hours * 3600;
            
            let minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;

            let seconds = delta % 60;
    
            console.log(hours, minutes, seconds)
            report['time_total'] = `${hours}:${minutes}:${seconds}`
        }

        /* Craete new Event */
        const event = await new Events(report);
        event.save();

        const user = await Users.findOneAndUpdate(
            { username: userName },
            { $push: { events: event._id } }
        );
        console.log("[+] Response: ", report)
        return res.status(201).json(report);
    } catch {
        return res.status(402).send({err: "Report couldnt be created and added to user"});
    }
})

export default timeRouter;