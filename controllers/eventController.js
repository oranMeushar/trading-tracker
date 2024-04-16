const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Event = require('../models/Event');
const fs = require('fs');
const path = require('path');

const newEvent = catchAsync(async(req, res, next) =>{
    await Event.init();

    const image = req.files?.image;
    const {date, name, time, location, content, waze} = req.body;

    const isDirectoryExist = fs.existsSync(path.join(__dirname, '../public'));
    const pathToFile = path.join(__dirname, '../public', `${req.user.email}__${image.name}`);

    !isDirectoryExist && fs.mkdirSync(path.join(__dirname, '../public')); 

    image && image.mv(pathToFile, (error) =>{
        if (error) {
            console.log(error);
            return next(new AppError('Failed to upload file', 'Failed', 400));
        } 
    });

    const event = new Event({
        date, 
        name, 
        time, 
        location, 
        content, 
        waze, 
        image: image ? `${req.user.email}__${image.name}`: '',
        user:req.user._id
    })

    await event.save();
    res.status(201).json({ 
        status:'Success',
        data:{
            ...event.toJSON(),
            image:image ? (fs.readFileSync(path.join(__dirname, '../', 'public', `${req.user.email}__${image.name}`))).toString('base64') : null
        }
    })
});





const getAllEvents = catchAsync(async(req, res, next) =>{

    let events = await Event.find({user:req.user._id}) || [];

    events = events.map(event =>{
        const {image} = event;

   
        return{
            ...event.toJSON(),
            image:image ? (fs.readFileSync(path.join(__dirname, '../', 'public', image))).toString('base64') : null

        }
    })

    res.status(200).json({ 
        status:'Success',
        data:events
    })
});


const deleteEvent = catchAsync(async(req, res, next) =>{
    const {eventId} = req.params;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ 
        status:'Success',
    })
});


module.exports = {
    newEvent,
    getAllEvents,
    deleteEvent
};