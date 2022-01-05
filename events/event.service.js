const path = require('path')
const Event = require(path.join(__dirname,'../events/event.model'))

module.exports = {
    getAllEvent,
    getEventById,
    AddEvent,
    updateEvent,
    delete: _deleteEvent
};

//get list of all events
async function getAllEvent() {
    return await Event.find();
}
//get a Event by id
async function getEventById(id) {
    return await Event.findById(id);
}

//add new Event to database
async function AddEvent(EventParam) {
    // validate
    if (await Event.findOne({ title: EventParam.title })) {
        throw 'title "' + EventParam.title + '" is already in use';
    }
    const event = new Event(EventParam);
    // save Event
    await event.save();
}

//update Event 
async function updateEvent(id, EventParam) {
    const Event = await Event.findById(id);

    // validate
    if (!Event) throw 'Event not found';
    if (Event.title !== EventParam.title && await Event.findOne({ title: EventParam.title })) {
        throw 'title "' + EventParam.title + '" is already in use';
    }
    // copy EventParam properties to Event
    Object.assign(Event, EventParam);

    await Event.save();
}
//add review to Event
// async function addReviewToEvent(id, ReviewParam) {
//     const Event = await Event.findById(id);

//     // validate
//     if (!Event) throw 'Event not found';
//     array1.forEach(element => console.log(element));

//     Event.reviews.forEach(function (review) {
//         if(await Event.findOne({ User: ReviewParam.User })){
//             throw 'User "' + ReviewParam.title + '"  already have review';
//         }
//     });
        
//     }
//     if (Event.title !== ReviewParam.title && await Event.findOne({ title: ReviewParam.title })) {
//         throw 'title "' + ReviewParam.title + '" is already in use';
//     }
//     // copy EventParam properties to Event
//     Object.assign(Event, EventParam);

//     await Event.save();
// }

//delete Event
async function _deleteEvent(id) {
    await Event.findByIdAndRemove(id);
}