const express = require('express');
const router = express.Router()
const { Endpoint } = require('../controller/endpoint');

router.post("/addFeedback", new Endpoint().addFeedbackEndpoint);
router.get("/showInformation", new Endpoint().showInfoEndpoint);
router.get("/getDataForAdmin", new Endpoint().getDataAdminEnpoint);
router.post("/editstatus/:id", new Endpoint().editStutusEndpoint);
router.get("/getInfoCache", new Endpoint().getCacheEndpoint);

router.get('/', (req, res) => {
    return res.render('../view/pages/home.ejs')
})

module.exports = router;