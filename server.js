const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/admin",  (request, response) => {
    let db = new sqlite3.Database("db/JobScheduler.db");
    const selcetQuery = "SELECT tr.Role  FROM TBL_RolesAccount tra INNER JOIN TBL_Role tr WHERE tra.UserName = ? AND tra.Password = ? AND tra.UserId  = tr.Id ";
    const values = [
        request.body.UserName, request.body.Password
    ]

    db.all(selcetQuery, values, (err, rows) => {
        if(err) {
            response.json({
                message: err.message
            });
        } else {
            console.log(rows);
            console.log("Role: " +JSON.stringify( rows));
        const userRole = rows.map((singleRole) => {
          return {
            Role: singleRole.Role
          }
        })
        response.json(userRole);
        }
    })
    db.close();
})

app.listen(9892, () => {
    console.log("Start Listening, use 9892");
  });