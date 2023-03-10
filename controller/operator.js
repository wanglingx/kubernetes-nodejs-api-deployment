const { response } = require('express')
const connection = require('../database/connector')
class Operator {

    addFeedbackOperator = (ComCenterData, res) => {
        let sql = `INSERT INTO Comcenter_data 
        (
            Ref_id,
            firstname,
            lastname,
            email,
            comment,
            t_timestamp,
            status,
            day
        )
        VALUES
        (
            ?,?,?,?,?,?,?,?
        )`
        connection.query(
            sql, [
            ComCenterData.Ref_id,
            ComCenterData.firstname,
            ComCenterData.lastname,
            ComCenterData.email,
            ComCenterData.comment,
            ComCenterData.t_timestamp,
            ComCenterData.status,
            ComCenterData.day
        ],
            function (err) {
                if (err) {
                    console.log(err)
                    return res.status(201).redirect('/showInformation');
                }
                else {
                    return res.status(201).redirect('/showInformation');
                }
            }
        )
    }

    showInfoOperator = (res) => {
        let sql = `SELECT * FROM Comcenter_data
        ORDER BY status ASC`
        connection.query(sql,
            function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    return res.status(201).send(data)
                }
            }
        )
    }

    editStatusOperator = (ComCenterData, res) => {
        let sql =
       `UPDATE 
            Comcenter_data
        SET 
            t_timestamp = CURRENT_TIMESTAMP(),
            status = ?,
            day = ?
        WHERE 
            Ref_id = ?`

        connection.query(sql,
            [
                ComCenterData.status,
                ComCenterData.day,
                ComCenterData.Ref_id
            ],
            function (err) {
                if (err) {
                    console.log(err)
                }
                else {
                    return res.status(201).redirect("/getDataForAdmin");
                }
            })
    }

    getDataAdminOperator = (res) => {
        let sql = `SELECT * FROM Comcenter_data`
        connection.query(sql,
            function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    return res.status(201).render('../view/pages/admin',  {
                        response: data
                    });
                }
            }
        )
    }
}

module.exports = {
    Operator
}