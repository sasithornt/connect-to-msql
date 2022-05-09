const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('express');
const sql = require('mssql');
var bodyParser = require("body-parser");

// Body Parser Middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());


// config for your database
// const config = {
//     user: 'sa',
//     password: '*Adm@gset',
//     server: 'GSET_044\\GSET_044',
//     database: 'ExpressDemo',
//     synchronize: true,
//     trustServerCertificate: true,
// };

const config = {
    user: 'sa',
    password: '*Adm@gset',
    server: 'GSET_119',
    database: 'TEST',
    synchronize: true,
    trustServerCertificate: true,
    options: {
        instancename: 'SQLEXPRESS',
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    }
};

// ดึงข้อมูลมาแสดง selctAll data
app.get('/person', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) throw err;
        console.log('Connected');
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records

        //ดึงแบบตารางเดียว
        request.query(`select * from person`, function (err, recordset) {
            // ดึงแบบสองตาราง
            // request.query(`select person.*, UserList.email From person left join UserList on person.userid = UserList.userid`, function (err, recordset) {
            if (err) throw err;
            console.log(recordset)
            // send records as a response
            res.send(recordset);
        });
    });
});


// เพิ่มข้อมูล insert data
app.post('/create', (req, res) => {
    sql.connect(config, function (err) {
        const id = req.body.id;
        const intid = parseInt(id);
        const name = req.body.name;
        const age = req.body.age;
        const country = req.body.country;
        const dept = req.body.dept;
        const tel = req.body.tel;

        if (err) throw err;
        console.log('Connected');

        // create Request object
        var request = new sql.Request();

        // query to the database and insert the records
        //request.query(`INSERT INTO person (id) VALUES (32) `,
        //request.query(`INSERT INTO person (id,name) VALUES (38,'RR') `,
        //request.query(`INSERT INTO person (id,name) VALUES (40,'name') `,
        //request.query(`INSERT INTO person (id,name,age,country,position,tel) VALUES ('${intid}','${name}','${age}','${country}','${position}','${tel}') `,
        request.query(`INSERT INTO person (userid,name,age,country,dept,tel) VALUES ('${intid}','${name}','${age}','${country}','${dept}','${tel}') `,
            function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
        // console.log(request);
    });
})

//เพิ่มข้อมูลสองตาราง insert 2 table 
// app.post('/create', (req, res) => {
//     sql.connect(config, function (err) {
//         const id = req.body.id;
//         const intid = parseInt(id);
//         const name = req.body.name;
//         const age = req.body.age;
//         const country = req.body.country;
//         const dept = req.body.dept;
//         const email = req.body.email;
//         const tel = req.body.tel;

//        if (err) throw err;
//        console.log('Connected');

//         // create Request object
//         var request = new sql.Request();

//         // query to the database and insert the records
//         //request.query(`INSERT INTO person (id) VALUES (32) `,
//         //request.query(`INSERT INTO person (id,name) VALUES (38,'RR') `,
//         //request.query(`INSERT INTO person (id,name) VALUES (40,'name') `,
//         //request.query(`INSERT INTO person (id,name,age,country,position,tel) VALUES ('${intid}','${name}','${age}','${country}','${position}','${tel}') `,
//         request.query(`INSERT INTO person (userid,name,age,country,dept,tel) VALUES ('${intid}','${name}','${age}','${country}','${dept}','${tel}') `,
//             function (err, res) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(res);
//                 }
//             });

//         request.query(`INSERT INTO UserList (userid,username,email) VALUES ('${intid}','${name}','${email}')`,
//             function (err, res) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(res);
//                 }
//             });
//     });
// })


//อัพเดทข้อมูล Update
app.put('/update', (req, res) => {
    const id = req.body.id;
    const tel = req.body.tel;

    var request = new sql.Request();
    // request.query(`UPDATE person SET tel = '${tel}' WHERE id = ${id} `,[tel,id], function (err, res) {
    request.query(`UPDATE person SET tel = '${tel}' WHERE id = ${id} `, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
})


//ลบข้อมูล delete 
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    var request = new sql.Request();
    request.query(`DELETE FROM person WHERE id=${id}`, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
})

var server = app.listen(5000, function () {
    console.log('Server is running on port 5000');
});
