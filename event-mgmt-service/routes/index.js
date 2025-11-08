const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controllers');
const Event=require('../controllers/event.controllers')
const Enroll=require('../controllers/enroll.controllers')

//Auth API
router.post('/register',Auth.register);
router.post('/login',Auth.login);
router.put('/update/:primaryId',Auth.updateUser)
router.put('/updatepassword',Auth.updatePassword)
router.get('/getuser/:primaryId',Auth.getUser)

router.post('/event/add',Event.add);
router.get('/event/listall',Event.listAll)
router.get('/event/list',Event.list)
router.get('/event/:id',Event.eventID)
router.put('/event/:id',Event.update)

router.post('/event/:eventId/enroll', Enroll.enroll);
router.get('/enrolllist/:eventId',Enroll.enrollList)
router.get('/event/:eventId/enroll/:enrollId',Enroll.getEnrollment)
router.put('/event/:eventId/enroll/:enrollId',Enroll.updateEnrollment)
module.exports = router;

