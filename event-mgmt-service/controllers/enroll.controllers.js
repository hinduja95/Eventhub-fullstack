const { Sequelize } = require('sequelize');
const eventDB = require('../config/db');
const enrolls = require("../models/enrolls.model") (eventDB)


exports.enroll = async (req, res) => {
  const { eventId } = req.params;

  const {
    fullName,
    emailAddress,
    mobile,
    country,
    state,
    district,
    status,
    meta1,
    meta2,
    meta3,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt
  } = req.body;

  try {
    // CHECK if enrollment already exists for same eventId and email
    const existing = await enrolls.findOne({
      where: {
        event_id: eventId,
        email_address: emailAddress
      }
    });

    if (existing) {
      return res.status(409).json({
        message: "User is already enrolled for this event",
        data: {
          id: existing.id,
          fullName: existing.full_name,
          emailAddress: existing.email_address,
          eventId: existing.event_id,
          mobile: existing.mobile,
          country: existing.country,
          state: existing.state,
          district: existing.district,
          status: existing.status,
          meta1: existing.meta_1,
          meta2: existing.meta_2,
          meta3: existing.meta_3,
          createdBy: existing.created_by,
          createdAt: existing.created_at,
          updatedBy: existing.updated_by,
          updatedAt: existing.updated_at
        }
      });
    }

    // OTHERWISE, create new enrollment
    const result = await enrolls.create({
      event_id: eventId,
      full_name: fullName,
      email_address: emailAddress,
      mobile: mobile,
      country: country,
      state: state,
      district: district,
      status: status,
      meta_1: meta1,
      meta_2: meta2,
      meta_3: meta3,
      created_by: createdBy,
      created_at: createdAt,
      updated_by: updatedBy,
      updated_at: updatedAt
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("Enrollment failed:", error);
    return res.status(500).json({ message: "Failed to enroll" });
  }
};

// exports.enroll = async (req, res) => {
//   const { eventId } = req.params;

//   const {
//     fullName,
//     emailAddress,
//     mobile,
//     country,
//     state,
//     district,
//     status,
//     meta1,
//     meta2,
//     meta3,
//     createdBy,
//     createdAt,
//     updatedBy,
//     updatedAt
//   } = req.body;

//   try {
//     const result = await enrolls.create({
//       event_id: eventId, // use from URL
//       full_name: fullName,
//       email_address: emailAddress,
//       mobile: mobile,
//       country: country,
//       state: state,
//       district: district,
//       status: status,
//       meta_1: meta1,
//       meta_2: meta2,
//       meta_3: meta3,
//       created_by: createdBy,
//       created_at: createdAt,
//       updated_by: updatedBy,
//       updated_at: updatedAt
//     });

//     return res.status(201).json(result);
//   } catch (error) {
//     console.error("Enrollment failed:", error);
//     return res.status(500).json({ message: "Failed to enroll" });
//   }
// };

 exports.enrollList = async (req, res) => {
  try {
    const { eventId } = req.params; // get from URL

    const allEnrolls = await enrolls.findAll({
      where: { event_id: eventId }, // filter by event_id
      order: [["id", "ASC"]],
    });

    if (allEnrolls.length === 0) {
      return res.status(404).send("No enrolled events found for this event ID");
    }

    return res.status(200).send(allEnrolls);
  } catch (err) {
    console.error("Error fetching Enrolled events:", err);
    return res.status(500).send("Failed to fetch enrolled events");
  }
};


exports.getEnrollment = async (req, res) => {
  const { eventId, enrollId } = req.params;

  try {
    const result = await enrolls.findOne({
      attributes: [
        'id', 'event_id', 'full_name', 'email_address', 'mobile',
        'country', 'state', 'district', 'status',
        'meta_1', 'meta_2', 'meta_3',
        'created_by', 'created_at', 'updated_by', 'updated_at'
      ],
      where: {
        id: enrollId,
        event_id: eventId
      }
    });

    if (!result) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    const values = {
      id: result.id,
      eventId: result.event_id,
      fullName: result.full_name,
      emailAddress: result.email_address,
      mobile: result.mobile,
      country: result.country,
      state: result.state,
      district: result.district,
      status: result.status,
      meta1: result.meta_1,
      meta2: result.meta_2,
      meta3: result.meta_3,
      createdBy: result.created_by,
      createdAt: result.created_at,
      updatedBy: result.updated_by,
      updatedAt: result.updated_at
    };

    return res.status(200).json(values);
  } catch (err) {
    console.error("Error fetching enrollment:", err);
    return res.status(500).send("Server error");
  }
};


exports.updateEnrollment = async (req, res) => {
  const { eventId, enrollId } = req.params;

  try {
    
    const existing = await enrolls.findOne({
      where: { id: enrollId, event_id: eventId }
    });

    if (!existing) {
      return res.status(404).send("Enrollment not found");
    }

    
    const updatedData = {
      full_name: req.body.fullName || existing.full_name,
      email_address: req.body.emailAddress || existing.email_address,
      mobile: req.body.mobileNo || existing.mobile,
      country: req.body.country || existing.country,
      state: req.body.state || existing.state,
      district: req.body.district || existing.district,
      status: req.body.status ?? existing.status,
      meta_1: req.body.meta1 || existing.meta_1,
      meta_2: req.body.meta2 || existing.meta_2,
      meta_3: req.body.meta3 || existing.meta_3,
      updated_by: req.body.updatedBy || existing.updated_by,
      updated_at: req.body.updatedAt || new Date().toISOString()  // current time fallback
    };

  
    await enrolls.update(updatedData, {
      where: {
        id: enrollId,
        event_id: eventId
      }
    });

    return res.status(200).send("Enrollment updated successfully");
  } catch (err) {
    console.error("Error updating enrollment:", err);
    return res.status(500).send("Server error");
  }
};