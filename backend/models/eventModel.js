import mongoose from "mongoose";

const SlotSchema = mongoose.Schema({
    startTime : {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
})

const TimeSlotSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    Slots: [SlotSchema]
})

const MatchSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    time_slots: [TimeSlotSchema]
})

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "untitled"
    },
    owner_name: {
        type: String,
        required: true
    },
    owner_email:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
    time_slots: [TimeSlotSchema],
    matches: [MatchSchema]
},{
    timestamps: true
});

const Event = mongoose.model('Event', EventSchema);
// const Match = mongoose.model('Match', MatchSchema);
// const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema) 

export default Event//, Match, TimeSlot} 

