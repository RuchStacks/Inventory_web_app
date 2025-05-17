var mysql = require('mysql2/promise')

const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'Inventory_Management_System',
    password: 'Manke@1699',
})


// pool.connect()
pool.getConnection((err, result) => {

    if (err) {
        console.log(err);
    }
    else {
        console.log("Connection DB Successfully....")
    }

})


module.exports = pool;