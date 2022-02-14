const express = require("express");
const Company = require("../models/Company");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

router.get("/", async (req, res) => {
    try {
        const companies = await Company.find({});
        res.end(JSON.stringify(companies));
    } catch (error) {
        console.log(error);
        res.status(400).end("Error");
    }
});

router.get("/:id", async (req, res) => {
    const { id: companyId } = req.params;

    try {
        const targetCompany = await Company.findById(companyId);
        res.end(JSON.stringify(targetCompany));
    } catch (error) {
        console.log(error);
        res.status(400).end("Backend Error: " + error);
    }
});

router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const { id: companyId } = req.params;
    try {
        const targetCompany = await Company.findById(companyId);

        res.end(JSON.stringify(targetCompany));
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});

router.put("/:id/edit", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});

router.post("/create", isLoggedIn, async (req, res) => {
    console.log(req.body);
    try {
        const newCompany = new Company(req.body.company);
        await newCompany.save();

        res.end();
    } catch (error) {
        res.status(400).json("Backend Error: " + error);
    }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
        const { id: companyId } = req.params;

        await Company.findByIdAndDelete(companyId);
        res.end();
    } catch (error) {
        res.status(400).json("Backend Error: " + error);
    }
});

module.exports = router;
