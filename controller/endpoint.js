const { Logic } = require('./logic');
const model = require('../model/model');
class Endpoint {

    //set up model is constructor
    constructor() {
        this.ComCenterData = model.ComCenterData;
    }

    //add Information from view
    addFeedbackEndpoint = (req, res) => {
        this.ComCenterData.firstname = req.body.firstname;
        this.ComCenterData.lastname = req.body.lastname;
        this.ComCenterData.email = req.body.email;
        this.ComCenterData.comment = req.body.comment;
        new Logic().addFeedbackLogic(this.ComCenterData,res)
    }

    //for show all information to user
    showInfoEndpoint = (req, res) => {
        new Logic().showInfoLogic(res);
    }

    getCacheEndpoint = (req, res) => {
        new Logic().getCacheLogic(res);
    }

    //for show all information to admin
    getDataAdminEnpoint = (req, res) => {
        new Logic().getDataAdminLogic(res);
    }

    //admin edit information
    editStutusEndpoint = (req, res) => {
        this.ComCenterData.Ref_id = req.params.id;
        this.ComCenterData.status = req.body.status;
        new Logic().editStatusLogic(this.ComCenterData, res);
    }
    
}
module.exports = {
    Endpoint
}