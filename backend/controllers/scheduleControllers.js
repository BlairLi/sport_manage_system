import {scheduleModel, sessionModel} from "../models/Schedule.js"

const createSchedule = async (req, res) => {
  try {
    const { SrNo, location, programName, programID, startDay, date, nextSession, confirmed, capacity, notes } = req.body
    const newSchedule = new scheduleModel({
      SrNo, location, programName, programID, startDay, date, nextSession, confirmed, capacity, notes
    })
    await newSchedule.save()

    res.status(200).json({ success: true, message: "Schedule Created Successfully.", newSchedule })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Interl server eror" })
  }
}

const addSession = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const { sessionID ,startTime, endTime, location, lead, assistant1, assistant2 } = req.body;

    const schedule = await scheduleModel.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    const newSession = new sessionModel({
      sessionID,
      startTime,
      endTime,
      location,
      lead,
      assistant1,
      assistant2
    });

    schedule.session.push(newSession);
    await schedule.save();

    res.status(200).json({ success: true, message: 'Session added successfully', schedule });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getSession = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const schedule = await scheduleModel.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    res.status(200).json({ success: true, sessions: schedule.session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getSchedule = async (req, res) => { 

  try {
    const schedule = await scheduleModel.find()
    if (!schedule) {
      return res.status(404).json({ success: false })
    }

    res.status(200).json({ schedule })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }

}

const updateSchedule = async (req, res) => {
  try {
    const programID = req.params.id

    const updateuser = await usermodel.findByIdAndUpdate(userId, req.body, { new: true })
    if (!updateuser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const deleteSchedule = async (req, res) => {
  try {
    const programID = req.params.id
    const deleteSchedule = await scheduleModel.findByIdAndDelete(programID)
    if (!deleteSchedule) {
      return res.status(404).json({ success: false, message: 'Schedule Not found' });
    }
    res.status(200).json({ success: true, message: 'Schedule Deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export { createSchedule, addSession, getSession, getSchedule, updateSchedule, deleteSchedule }



