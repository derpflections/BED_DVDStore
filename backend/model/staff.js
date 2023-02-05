//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05

var db = require("./databaseConfig.js")


var staffDB = {
     //endpoint 10 -> updating staff into database
     postNewStaff: (details, address, callback) => {
        console.log(details)
        console.log(address)
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
                                        var sql = `UPDATE staff SET first_name = ? , last_name = ?, address_id = ?, email = ?, store_id = ?, active = 1, password = ?, store_id = ? WHERE staff_id = ?` //this next query adds the staff details to the table.
                                        conn.query(sql, [details.first_name, details.last_name, newAddressId, details.email, details.store_id, details.password, details.store_id, details.staff_id], (err, res) => {
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
                            var sql = `UPDATE staff SET first_name = ? , last_name = ?, address_id = ?, email = ?, store_id = ?, active = 1, password = ?, store_id = ? WHERE staff_id = ?` // this next query addsd the staff details into the database.
                            var addressId = res[0].address_id
                            conn.query(sql, [details.first_name, details.last_name, addressId, details.email, details.store_id, details.password, details.store_id, details.staff_id], (err, res) => {
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

    //endpoint 23 -> getting staff details from database
    getAllStaff: (id, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err){
                console.log(err)
                return callback(err, null)
            } else {
                sql = `SELECT staff_id, first_name, last_name, email, store_id, username, a.address_id, address, address2, ct.city_id, ct.city, c.country_id, c.country, a.district, a.postal_code, a.phone FROM staff s, address a, city ct, country c WHERE s.address_id = a.address_id AND ct.city_id = a.city_id AND c.country_id = ct.country_id AND s.staff_id = ?`
                conn.query(sql, id, (err, res) => {
                    conn.end()
                    if(err){
                        console.log(err)
                        return callback (err, null)
                    } else {
                        return callback (null, res)
                    }
                })
            }
        })
    },
}

module.exports = staffDB