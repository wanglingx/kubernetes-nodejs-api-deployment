const { Operator } = require('./operator');
const NodeCache = require('node-cache');
const { default: axios } = require('axios');
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })
class Logic {

    addFeedbackLogic = (ComCenterData, res) => {

        //info validation if nothing is reject
        if (!(ComCenterData.firstName || ComCenterData.lastname || ComCenterData.email || ComCenterData.comment)){
            return res.status(400).redirect('/')
        }

        //Generate Ref_id by Random 
        let ref_id = '';
        var refId_length = 15;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var char_length = characters.length;
        for (var i = 0; i < refId_length; i++)
        {
            ref_id += characters.charAt(Math.floor(Math.random() * char_length));
        }
        ComCenterData.Ref_id = ref_id
        
        //setup timestamp
        let dateOb = new Date;
        //current date
        let date = ("0" + dateOb.getDate()).slice(-2);
        // current month
        let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
        // current year
        let year = dateOb.getFullYear();
        // current hours
        let hours = dateOb.getHours();
        // current minutes
        let minutes = dateOb.getMinutes();
        // current seconds
        let seconds = dateOb.getSeconds();
        ComCenterData.t_timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        //call function to insert database
        new Operator().addFeedbackOperator(ComCenterData, res);
    }

    showInfoLogic = async(res) => {
        if (myCache.has('uniqueKey')) {
            console.time();
            console.log('Retrieved value from cache !!')

            res.status(201).render('../view/pages/live-report', {
                response: myCache.get('uniqueKey')
            });

            console.timeEnd();
            
        } else {
            console.time();
            let response = await axios.get('http://localhost:3000/getInfoCache')
            myCache.set('uniqueKey', response.data)
            console.log('Value not present in cache,'
                + ' performing computation')
            
            res.status(201).render('../view/pages/live-report', {
                response: response.data
            });
            console.timeEnd();
        }
        
    }

    getCacheLogic = (res) => {
        new Operator().showInfoOperator(res)
    }

    getDataAdminLogic = (res) => {
        //call function to select database
        new Operator().getDataAdminOperator(res);
    }

    editStatusLogic = (ComCenterData, res) => {

        //status validation
        if (ComCenterData.status == 'Escalate')
        {
            //เลื่อนวันให้ไวขึ้น
            ComCenterData.day = 5;
        }
        if (ComCenterData.status == 'Close')
        {
            ComCenterData.day = 7;
        }
        if (ComCenterData.status == 'Open')
        {
            ComCenterData.day = 1;
        }
        //call function to select database
        new Operator().editStatusOperator(ComCenterData,res)
    }
}
module.exports = {
    Logic
}