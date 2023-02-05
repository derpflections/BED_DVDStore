//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05

var db = require("./databaseConfig.js")

var loginDB = {
    //endpoint 11 -> logs staff in 
    staffLogin: (username, password, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                var sql = `SELECT first_name, last_name, staff_id FROM staff WHERE email = ? and password = ?`
                conn.query(sql, [username, password], (err, res) => {
                    conn.end()
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else if (res.length == 0) {
                        console.log(`Login details are incorrect`)
                        return callback(null, 403)
                    } else {
                        return callback(null, res[0])
                    }
                })
            }
        })
    },

    //endpoint 12 -> checks if staff login in valid
    staffVerify: (staffid, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                var sql = `SELECT first_name, last_name, address_id, email, store_id, active, username FROM staff WHERE staff_id = ?`
                conn.query(sql, [staffid], (err, res) => {
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else if (res.length == 0) {
                        console.log(`Staff not found.`)
                        return callback(null, 403)
                    } else {
                        addrID = res[0].address_id
                        var sql = `SELECT * FROM address WHERE address_id = ?`
                        conn.query(sql, addrID, (err, res2) => {
                            conn.end()
                            if (err) {
                                console.log(err)
                                return callback(err, null)
                            } else {
                                return callback(null, [res, res2])
                            }
                        })
                        // return callback (null, res)
                    }
                })
            }
        })
    },

    //endpoint 13 -> logs customer in
    custLogin: (email, password, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                var sql = `SELECT customer_id, first_name, last_name FROM customer WHERE email = ? AND password = ?`
                conn.query(sql, [email, password], (err, res) => {
                    conn.end()
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else if (res.length == 0) {
                        console.log(`Login details are incorrect!`)
                        return callback(err, 403)
                    } else {
                        return callback(null, res[0])
                    }
                })
            }
        })
    },

    //endpoint 14 -> checks if customer login in valid 
    custVerify: (customerid, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                var sql = `SELECT customer_id, store_id, first_name, last_name, email, address_id, active FROM customer WHERE customer_id = ?`
                conn.query(sql, customerid, (err, res) => {
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else if (res.length == 0) {
                        console.log(`Customer not found / Invalid Token provided.`)
                        return callback(null, 403)
                    } else {
                        addrID = res[0].address_id
                        var sql = `SELECT * FROM address where address_id = ?`
                        conn.query(sql, addrID, (err, res2) => {
                            conn.end()
                            if (err) {
                                return callback(err, null)
                            } else {
                                return callback(err, [res, res2])
                            }
                        })
                    }
                })
            }
        })
    },
}

module.exports = loginDB