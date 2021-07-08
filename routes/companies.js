const express = require('express');
const router = express.Router();
const Company = require('../models/company');

// Getting all companies
router.get('/', async (req, res) => {
    try {
       const companies = await Company.find(); 
       res.json(companies);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one company
router.get('/:id', getCompany, (req, res) => {
    res.json(res.company);
});

// Creating a company
router.post('/', async (req, res) => {
    const company = new Company({
        companyName: req.body.companyName,
        companyLocation: req.body.companyLocation,
        phoneNumber: req.body.phoneNumber,
        yearEstablished: req.body.yearEstablished

    });
    try {
        const newCompany = await company.save();
        res.status(201).json(newCompany);
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Updating a company
router.patch('/:id', getCompany, async (req, res) => {
    if(req.body.companyName != null) {
        res.company.companyName = req.body.companyName;
    }
    if(req.body.companyLocation != null) {
        res.company.companyLocation = req.body.companyLocation;
    }
    if(req.body.phoneNumber != null) {
        res.company.phoneNumber = req.body.phoneNumber;
    }
    if(req.body.yearEstablished != null) {
        res.company.yearEstablished = req.body.yearEstablished;
    }

    try {
        const updatedCompany = await res.company.save();
        res.json(updatedCompany);
    }catch (err) {
        res.status(400).json({ messages: err.message});
    }
});

// Deleting a company 
router.delete('/:id', getCompany, async (req, res) => {
    try {
        await res.company.remove();
        res.json({ messages: 'Company Record Successfully Deleted!'});
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});

async function getCompany(req, res, next){
    let company;
    try {
        company = await Company.findById(req.params.id);
        if(company == null){
            return res.status(404).json({ message: 'Company Not Found!'});
        }
    }catch (err) {
        return res.status(500).json({ message: err.message});
    }
    res.company = company;
    next();
}

module.exports = router;