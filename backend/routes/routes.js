import express from 'express'
import { createSchedule, getSchedule, deleteSchedule, addSession, getSession } from '../controllers/scheduleControllers.js'
import { createRegistration, getRegistration, deleteRegistration } from '../controllers/registrationControllers.js'

const routers=express.Router()

routers.post('/createSchedule',createSchedule)
routers.get('/getSchedule',getSchedule)
// routers.put('/update/:id',Updated)
routers.delete('/deleteSchedule/:id',deleteSchedule)

routers.post('/createRegistration',createRegistration)
routers.get('/getRegistration',getRegistration)
// routers.put('/update/:id',Updated)
routers.delete('/deleteRegistration/:id',deleteRegistration)

routers.get('/getSession',getSession)
routers.post('/addSession/:id', addSession);


export default routers