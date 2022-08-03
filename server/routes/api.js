const express = require('express')
const router = express.Router()
const apiController = require("../controllers/controller")

router.get("/test", apiController.test)
router.get("/list",apiController.details)
router.delete("/delete/:id",apiController.delete)
router.put("/update/:id",apiController.update)
router.post("/register", apiController.register)
router.post("/login", apiController.login)
router.get("/lead",apiController.getLeads)
router.post("/lead",apiController.postLeads)

module.exports = router