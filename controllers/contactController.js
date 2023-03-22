const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const Contact = require("../models/contact_model")

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ uid: req.user.id });
    res.status(200).json(contacts)
})

//@desc Create Contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log("Request user id is : ", req.user.id)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        uid: req.user.id,
        name,
        email,
        phone,
    })
    res.status(201).json(contact)
})

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access public
const getContactById = asyncHandler(async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    if (contact.uid !== req.user.id) {
        res.status(403)
        throw new Error("Permission denied")
    }

    res.status(200).json(contact)
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    if (contact.uid !== req.user.id) {
        res.status(403)
        throw new Error("Permission denied")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedContact)
}

//@desc Delete contact
//@route PUT /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    if (contact.uid !== req.user.id) {
        res.status(403)
        throw new Error("Permission denied")
    }

    await Contact.findOneAndRemove(id)
    res.status(200).json(contact)
})

module.exports = { getContacts, createContact, getContactById, updateContact, deleteContact }