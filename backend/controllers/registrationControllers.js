import registrationModel from "../models/Registration.js"
import { scheduleModel } from "../models/Schedule.js"

const createRegistration = async (req, res) => {
  try {
    // const { bookingID, } = req.body;

    const { bookingID, parentName, email, phone, child1Name, child1Birth, child1Program, child1Amount, child1Start, child1End, child1Program2, child1Amount2, child1Start2, child1End2, child2Name, child2Birth, child2Program, child2Amount, child2Start, child2End, makeupClasses, notes } = req.body;


    // Check for capacity of the program
    const schedule = await scheduleModel.find({ programName: { $in: [program, secondProgram] } });
    for (const sched of schedule) {
      if (sched.confirmed >= sched.capacity) {
        return res.status(400).json({ success: false, message: `Capacity reached for program: ${sched.programName}` });
      }
    }

    // If capacity not reached, proceed to create new registration
    const newRegistration = new registrationModel({
      bookingID, parentName, email, phone, child1Name, child1Birth, child1Program, child1Amount, child1Start, child1End, child1Program2, child1Amount2, child1Start2, child1End2, child2Name, child2Birth, child2Program, child2Amount, child2Start, child2End, makeupClasses, notes
    });
    await newRegistration.save();

    res.status(200).json({ success: true, message: "Registration Created Successfully.", newRegistration });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRegistration = async (req, res) => {

  try {
    const registration = await registrationModel.find()
    if (!registration) {
      return res.status(404).json({ success: false })
    }

    res.status(200).json({ registration })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }

}

// TODO: finish update registration
const updateRegistration = async (req, res) => {
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

const deleteRegistration = async (req, res) => {
  try {
    const programID = req.params.id
    const deleteRegistration = await registrationModel.findByIdAndDelete(programID)
    if (!deleteRegistration) {
      return res.status(404).json({ success: false, message: 'Registration Not found' });
    }
    res.status(200).json({ success: true, message: 'Registration Deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export { createRegistration, getRegistration, updateRegistration, deleteRegistration }



