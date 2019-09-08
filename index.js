const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: "mysql"
});

const updateDatabase = (userId, homeStation, firstName, lastName) => {
    console.log("update database!");
    connection.connect((err) => {
        if (err) {
            console.log("failed to connect");
        } else {
            console.log("Connected to DB!");
            connection.query('INSERT INTO metro_schema.user_table(user_id, home_station, first_name, last_name) VALUES (' + "'" + userId 
            + "','" + homeStation + "','" + firstName + "','" + lastName + "')", (result) => {
                console.log(result);
            });
            connection.end();
        }
    })
}

exports.handler = (event, context, callback) => {
    updateDatabase(event['body']['userId'], homeStation['body']['homeStation'], firstName['body']['firstName'], lastName['body']['lastName']);
};