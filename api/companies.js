const express = require("express");
const Company = require("../models/Company");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

/*
NOTE: 注意非常重要：
这个下面的所有目录path都是server.js里导入时候设定的的路径的后缀，例如：
>> get("/"） 指的是path名称为： "http://localhost:4000/companies/"
>> get("/:id") 指的是path名称为： "http://localhost:4000/companies/:id"
*/
router.get("/", async (req, res) => {
    // console.log("Backend ALL");
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
    // console.log("backend :: " + companyId);
    try {
        // console.log("try", companyId);
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
        // console.log(targetCompany);
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
        // console.log(updatedCompany);
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
        // res.redirect("/"); // 这里不能调用后端express的redirect method，得用前端React的redirect方法useHistory();去跳转页面
        res.end();
    } catch (error) {
        res.status(400).json("Backend Error: " + error);
    }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
        const { id: companyId } = req.params;
        // console.log(companyId);
        await Company.findByIdAndDelete(companyId);
        res.end();
    } catch (error) {
        res.status(400).json("Backend Error: " + error);
    }
});

module.exports = router;
