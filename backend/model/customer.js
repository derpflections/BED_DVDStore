//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05

var db = require("./databaseConfig.js")


var customerDB = {
    //endpoint 7
    getPaymentDetails: (customer_id, start_date, end_date, callback) => {
        if (end_date < start_date){
            return callback(406, null)  
        } else {
        var conn = db.getConnection()
            conn.connect((err) => { //established connection with database.
                if (err) {
                    console.log(err)
                    return callback(err, null) //returns null if error is present.
                } else {
                    console.log(`Connected to database!`)
                    var sql = `SELECT f.title, f.rental_rate AS amount, r.rental_date AS payment_date FROM customer c, inventory i, rental r, film f WHERE i.film_id = f.film_id AND r.customer_id = c.customer_id AND r.inventory_id = i.inventory_id AND c.customer_id = ? AND rental_date > ? AND rental_date < ?`
                    conn.query(sql, [customer_id, start_date, end_date], (err, res) => {
                        conn.end()
                        if (err) {
                            // console.log(err)
                            return callback(err, null) //returns null if error is present.
                        } else {
                            return callback(null, res) // sends response back to the front end
                        }
                    })
                }
            })
        }
    },  

    //endpoint 8
    postNewCustomer: (details, address, callback) => {
        if (details.first_name == undefined || details.last_name == undefined || details.store_id == undefined || address.address_line1 == undefined || address.district == undefined || address.city_id == undefined || address.phone == undefined || details.first_name == "" || details.last_name == "" || details.store_id == "" || address.address_line1 == "" || address.district == "" || address.city_id == "" || address.phone == "") {
            console.log(`Missing data!`) //this clause checks if there is any missing data.
            return callback(null, 400)
        } else {
            var conn = db.getConnection()
            conn.connect((err) => { //established connection with database.
                if (err) {
                    console.log(err)
                    return callback(err, null) //returns null if error is present.
                } else {                    
                    var sql = `SELECT * FROM address WHERE address = ? AND address2 = ? AND district = ? AND city_id = ? AND postal_code = ? AND phone = ?` //this query checks if the address is already present in the database.
                    conn.query(sql, [address.address_line1, address.address_line2, address.district, address.city_id, address.postal_code, address.phone], (err, res) => {
                        if (err) {
                            console.log(err)
                            return callback(err, null) //returns null if error is present.
                        } else if (res.length == 0) { //this statement executes if the address is NOT present in the system.
                                sql = `INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?, ?, ?, ?, ?, ?)` //this query adds the address to the database.
                                conn.query(sql, [address.address_line1, address.address_line2, address.district, address.city_id, address.postal_code, address.phone], (err, res) => {
                                    newAddressId = res.insertId //stores the added address id.
                                    if (err) {
                                        console.log(err)
                                        return callback(err, null) //returns null if error is present.
                                    } else {
                                        var sql = `UPDATE customer SET store_id = ?, first_name = ?, last_name = ?, address_id = ?, password = ? WHERE customer_id = ?`
                                        conn.query(sql, [details.store_id, details.first_name, details.last_name, newAddressId, details.password, details.customer_id], (err, res) => {
                                            conn.end()
                                            if (err) {
                                                console.log(err)
                                                return callback(err, null) //returns null if error is present.
                                            } else {
                                                return callback(null, res) // sends response back to the front end
                                            }
                                        })
                                    }
                            }) 
                    } else { //this statement executs if the address is present in the system
                            var sql = `UPDATE customer SET store_id = ?, first_name = ?, last_name = ? , address_id = ?, password = ? WHERE customer_id = ?`
                            var addressId = res[0].address_id
                            conn.query(sql, [details.store_id, details.first_name, details.last_name, addressId, details.password, details.customer_id], (err, res) => {
                                conn.end()
                                if (err) {
                                    console.log(err)
                                    return callback(err, null) //returns null if error is present.
                                } else {
                                    return callback(null, res) // sends response back to the front end
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    //endpoint 24 -> getting customer details from database
    getAllCustomer: (id, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err){
                console.log(err)
                return callback (err, null)
            } else {
                sql = `SELECT customer_id, first_name, last_name, email, store_id, a.address_id, address, address2, ct.city_id, ct.city, c.country_id, c.country, a.district, a.postal_code, a.phone FROM customer cu, address a, city ct, country c WHERE cu.address_id = a.address_id AND ct.city_id = a.city_id AND c.country_id = ct.country_id AND cu.customer_id = ?`
                conn.query(sql, id , (err, res) => {
                    conn.end()
                    if(err){
                        console.log(err)
                        return callback(err, null)
                    } else {
                        return callback(null, res)
                    }
                })
            }
        })

    },

    //endpoint 25 => adding new customer to database
    addNewCustomer: (details, address, callback) => {
        if (details.store_id == "" || details.first_name == "" || details.last_name == "" || details.email == "" || address.address_line1 == "" || address.district == "" || address.city_id == "" || address.postal_code == "" || address.phone == "" || details.store_id == undefined || details.first_name == undefined || details.last_name == undefined || details.email == undefined || address.address_line1 == undefined || address.district == undefined || address.city_id == undefined || address.postal_code == undefined || address.phone == undefined || details.password == "" || details.password == undefined) {
            console.log(`Missing data!`)
            return callback(null, 400) //sends error code 400 back to app.js if data is missing.
        } else {
            var conn = db.getConnection()
            conn.connect((err) => { //established connection with database.
                if (err) {
                    console.log(err)
                    return callback(err, null) //returns null if error is present.
                } else {
                    console.log(`Connected to database!`)
                    var sql = `SELECT * FROM customer WHERE email = ? ; SELECT * FROM city WHERE city_id = ?`
                    conn.query(sql, [details.email, address.city_id], (err, res) => { // this query checks if the email is already present in the system.
                        if (err) {
                            console.log(err)
                            return callback(err, null) //returns null if error is present.
                        } else if (res[0].length != 0) { // this executes if the customer email is already present in the database.
                            console.log(`Duplicate email detected!`)
                            return callback(null, 1062)
                        } else if (res[1].length == 0) { // this executs if the city is not present in database.
                            console.log(`City ID does not exist in database!`)
                            return callback(null, 400)
                        } else {
                            var sql = `INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?,?,?,?,?,?)` // this query inserts address into the system
                            conn.query(sql, [address.address_line1, address.address_line2, address.district, address.city_id, address.postal_code, address.phone], (err, res) => {
                                if (err) {
                                    console.log(err)
                                    return callback(err, null) //returns null if error is present.
                                } else {
                                    newAddrId = res.insertId //takes address id for the next query
                                    var sql = `INSERT INTO customer (store_id, first_name, last_name, email, address_id, password) VALUES (?,?,?,?,?,?)` //this query inserts the customer details into the system.
                                    conn.query(sql, [details.store_id, details.first_name, details.last_name, details.email, newAddrId, details.password], (err, res) => {
                                        conn.end()
                                        if (err) {
                                            if (err.errno == 1062) { //this clause executes if the email is already present in the system. (second layer of detection)
                                                return callback(null, 1062) //returns error w/ code 1062.
                                            } else {
                                                return callback(err, null) //returns null if error is present.
                                            }
                                        } else {
                                            return callback(null, res) // sends response back to the front end
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    
}

module.exports = customerDB