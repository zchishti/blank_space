import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';

const createEvent = asyncHandler(async (req, res) => {
    const {name, owner_name, owner_email, date } = req.body

    const event = await Event.create({
        name: name,
        owner_name: owner_name,
        owner_email: owner_email,
        date : date
    })

    if(event){
        res.status(201).json({
            event: event
        })
    }else{
        res.status(400);
        throw new Error('Invalid event data');
    }
});

export {
    createEvent
}