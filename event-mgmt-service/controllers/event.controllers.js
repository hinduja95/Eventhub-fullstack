const { Sequelize ,Op} = require('sequelize');
const eventDB = require('../config/db');
const events = require("../models/event.model") (eventDB)




exports.add = async(req, res) =>{
      console.log("req.body", req.body);
      const {
        eventName,
        eventDescription,
        eventDate,
        eventLocation,
        eventLink,
        eventVideoLink,
        eventImageLink,
        publishFrom,
        publishTo,
        status
      } = req.body;


      try{
        console.log(req.body)
        let result = await events.create({
            event_name : eventName,
            event_description : eventDescription,
            event_date : eventDate|| null ,
            event_location : eventLocation,
            event_link : eventLink,
            event_video_link : eventVideoLink,
            event_image_link : eventImageLink ,
            publish_from : publishFrom ,
            publish_to : publishTo,
            status:status??1
        })
        console.log("event creation",result);
        return res.send("Event Created successfully")
      }
      catch(err){
        console.log("err",err)
        return res.status(504).send("Error in event creation")
      }
}

// exports.list = async (req, res) => {
  
//     try {
//      const allEvents = await events.findAll({
//       order: [['id', 'ASC']] 
//     });

//     if (allEvents.length === 0) {
//       return res.status(404).send(  "No events found" );
//     }
// console.log(allEvents)
//     return res.status(200).send(allEvents
//     );

//   } catch (err) {
//     console.error("Error fetching events:", err);
//     return res.status(500).send(
//       "Failed to fetch events"
//     );
//   }
// };

exports.eventID = async (req,res) =>{
  try {
     const { id } = req.params; 

    const event = await events.findOne({
      where: { id }, 
      order: [['id', 'ASC']]
    });

    if (!event) {
      return res.status(404).send( "Event not found" );
    }

    return res.status(200).send({
       message:"Event fetched successfully",
      data: event
    });


  } catch (err) {
    console.error("Error fetching event:", err);
    return res.status(500).send(
       "Failed to fetch event"
    );
}
}

exports.update = async (req, res) => {
  try {
    const { id} = req.params; 
    const {
      eventName,
      eventDescription,
      eventDate,
      eventLocation,
      eventLink,
      eventVideoLink,
      eventImageLink,
      publishFrom,
      publishTo,
      status
    } = req.body;
   console.log(req.body)
   console.log("Updating event with ID:", req.params.eventId);

    const existingEvent = await events.findByPk(id);
    console.log(existingEvent)
    if (!existingEvent) {
      return res.status(404).send("Event not found");
    }

    await existingEvent.update({
      event_name: eventName || existingEvent.event_name,
      event_description: eventDescription || existingEvent.event_description,
      event_date: eventDate || existingEvent.event_date,
      event_location: eventLocation || existingEvent.event_location,
      event_link: eventLink || existingEvent.event_link,
      event_video_link: eventVideoLink || existingEvent.event_video_link,
      event_image_link: eventImageLink || existingEvent.event_image_link,
      publish_from: publishFrom || existingEvent.publish_from,
      publish_to: publishTo || existingEvent.publish_to,
      status: status ?? existingEvent.status
    });

    return res.status(200).send(
      "Event updated successfully"
    );

  } catch (err) {
    console.error("Error updating event:", err);
    return res.status(500).send(
      "Failed to update event"
    );
  }
};

exports.listAll = async(req,res) =>{
try{
  const result = await events.findAll({
    attributes:['id','event_name','event_description','event_date',
                'event_location', 'event_link', 'event_video_link', 'event_image_link',
                'publish_from', 'publish_to', 'status']
              });
      return res.status(200).json(result);
  }
  catch(err){
      return res.status(501).send("error in fetching event list",err)
  }
     
}

exports.list = async(req,res) =>{
console.log("getting events active list")
try{
    const now = new Date();
  const result = await events.findAll({
    attributes:['id','event_name','event_description','event_date',
                'event_location', 'event_link', 'event_video_link', 'event_image_link',
                'publish_from', 'publish_to', 'status'],
    where: {
            status: 1,
            publish_from: {[Op.lte]: now,},
             [Op.or]: [
                      { publish_to: { [Op.gte]: now } },
                      { publish_to: null } 
                        ]
            }
          },    
          );
      return res.status(200).json(result);
  }
  catch(err){
      return res.status(501).send("error in fetching event list",err)
  }
     
}

