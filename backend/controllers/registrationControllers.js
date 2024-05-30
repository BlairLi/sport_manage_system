import registrationModel from "../models/Registration.js"

const createRegistration = async (req, res) => {
  try {
    const { bookingID, parentName, childName, childBirth, email, phone, program, amount, start, end, makeupClasses, notes } = req.body
    const newRegistration = new registrationModel({
      bookingID, parentName, childName, childBirth, email, phone, program, amount, start, end, makeupClasses, notes
    })
    await newRegistration.save()

    res.status(200).json({ success: true, message: "Registration Created Successfully.", newRegistration })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Interl server eror" })
  }
}

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



