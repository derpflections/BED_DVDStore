//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05
var db = require("./databaseConfig.js")

function bodyChecker(var1, var2) { //used in endpoint 3 to check for missing data
    return (var1 == undefined || var1 == "" || var2 == undefined || var2 == "")
}


var storeDB = {
    //endpoint 1
    getActor: (first_name, last_name, callback) => {
        var conn = db.getConnection();
        conn.connect((err) => { //establishes connection with database
            if (err) {
                console.log(err);
                return callback(err, null) //returns null response if error is present
            } else {
                console.log("Connected to database!")
                var sql = `SELECT * FROM actor WHERE first_name LIKE "%${first_name}%" AND last_name LIKE "%${last_name}%"` //retreives actor_id, first_name and last_name from the table for specific actor
                conn.query(sql, (err, res) => {
                    conn.end(); //ends connection
                    if (err) {
                        console.log(err);
                        return callback(err, null); // returns null response if error is present
                    } else if (res.length == 0) {
                        return callback(null, 204) //sends error code 204 back to app.js
                    } else {
                        return callback(null, res) //removes the square brackets from the response
                    }
                })
            }
        })
    },

    //endpoint 2
    getActorOrder: (limit, offset, callback) => {
        if (limit == "" || limit == undefined) {
            limit = 20 //sets limit to default (20) if value is empty or not provided
        }

        if (offset == "" || offset == undefined) {
            offset = 0 //sets offset to default (0) if value is empty or not provided
        }

        var conn = db.getConnection()
        conn.connect((err) => { //establishes connection with database
            if (err) {
                console.log(err)
                return callback(err, null) //returns null if error is present
            } else {
                console.log(`Connected to database!`)
                var sql = `SELECT actor_id, first_name, last_name FROM actor ORDER BY first_name LIMIT ? OFFSET ?`; //retreives actor_id, first_name and last_name with a the limit and offset set by the request.
                conn.query(sql, [parseInt(limit), parseInt(offset)], (err, res) => {
                    if (err) {
                        console.log(err)
                        return callback(err, null) // returns null response if error is present
                    } else {
                        for (i = 0; i < res.length; i++) {
                            res[i].actor_id = res[i].actor_id.toString() //converts the actor_id of all actors returned into a string
                        }
                        return callback(null, res) // sends response back to the front end
                    }
                })
            }
        })
    },

    //endpoint 3
    addActor: (actor_details, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {  //establishes connection with database
            if (err) {
                console.log(err)
                return callback(err, null) //returns null if error is present.
            } else {
                console.log(`Connected to database!`)
                var sql = `INSERT INTO actor (first_name , last_name) VALUES (?, ?)`
                if (bodyChecker(actor_details.first_name, actor_details.last_name)) {
                    return callback(null, 400) //sends error code 400 back to app.js if data is missing.
                } else {
                    conn.query(sql, [actor_details.first_name.toUpperCase(), actor_details.last_name.toUpperCase()], (err, res) => { //standard email SQL query
                        conn.end()
                        if (err) {
                            console.log(err)
                            return callback(err, null) // returns null response if error is present
                        } else {
                            return callback(null, res) // sends response back to the front end
                        }
                    })
                }
            }
        })
    },


    //endpoint 4
    updateActor: (actor_id, actor_details, callback) => { //UPDATE actor SET first_name = ? , last_name = ? WHERE actor_id = ?
        var conn = db.getConnection()
        conn.connect((err) => { //established connection with database.
            if (err) {
                console.log(err)
                return callback(err, null) //returns null if error is present.
            } else if (actor_details.first_name == "" || actor_details.last_name == "") {
                console.log(`Missing data!`)
                return callback(null, 400) //if data is missing, query is not made, and response is sent directly to the front end.
            } else {
                console.log(`Connected to database!`)

                var sql = `UPDATE actor SET ` //constructs SQL statement and variables to parse based on the body request
                if (actor_details.last_name == undefined) { // if the last name is not parsed in, only the first_name is added to the statement.
                    sql += `first_name = ?`
                    varToUse = [actor_details.first_name, actor_id] //consturcts the array of variables to parse.
                } else if (actor_details.first_name == undefined) { //  if the first name if not parsed, only the last_name is added to the statement.
                    sql += `last_name = ?`
                    varToUse = [actor_details.last_name, actor_id]
                } else {
                    sql += `first_name = ?, last_name = ?` // if both first_name and last_name are present, add both to the sql statement.
                    varToUse = [actor_details.first_name, actor_details.last_name, actor_id]
                }
                sql += ` WHERE actor_id = ?`
                console.log(sql)

                conn.query(sql, varToUse, (err, res) => { //standard SQL query
                    conn.end()
                    if (err) {
                        console.log(err)
                        return callback(err, null) //returns null if error is present.
                    } else if (res.affectedRows == 0) {
                        return callback(err, 204)
                    } else {
                        return callback(null, res) // sends response back to the front end
                    }
                })
            }
        })
    },

    //endpoint 5
    deleteActor: (actor_id, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => { //established connection with database.
            if (err) {
                console.log(err)
                return callback(err, null) //returns null if error is present.
            } else {
                console.log(`Connected to database!`)
                var sql = `DELETE FROM film_actor WHERE actor_id = ? ; DELETE FROM actor WHERE actor_id = ?`
                conn.query(sql, [actor_id, actor_id], (err, res) => { //standard sql query
                    if (err) {
                        console.log(err)
                        return callback(err, null) //returns null if error is present.
                    } else if (res[1].affectedRows == 0) {
                        return callback(err, 204) //sends error code 204 back to app.js if actor_id cannot be found.
                    } else {
                        return callback(null, res) //sends response back to the front end.
                    }
                })
            }
        })
    },

    //endpoint 9 -> posting new country/city
    postNewLocation: (country, city, callback) => {
        if (country == "" || country == undefined || city == "" || country == undefined) { // this if clause checks if there is missing data.
            console.log(`Missing data!`)
            return callback(null, 400)
        } else {
            var conn = db.getConnection()
            conn.connect((err) => { //established connection with database.
                if (err) {
                    console.log(err)
                    return callback(err, null) //returns null if error is present.
                } else {
                    var sql = `SELECT country_id, country FROM country WHERE country = ?; SELECT co.country, ci.city FROM country co, city ci WHERE co.country_id = ci.country_id AND country = ? AND city = ?`
                    conn.query(sql, [country, country, city], (err, res) => { // this query checks if the geographic location is already present in the system.
                        if (res[1].length != 0) {
                            console.log(`Location already present in system!`)
                            return callback(null, 409)  //sends error code 409 to app.js.
                        } else {
                            if (err) {
                                console.log(err)
                                return callback(err, null) //returns null if error is present.
                            } else {
                                console.log(res[0].length)
                                if (res[0].length == 0) { //this statement checks if the country was already present in the system, by taking the index 0 response frm the above multiline query.
                                    sql = `INSERT INTO country (country) VALUES (?)` //this statement inserts a new country if not present.
                                    conn.query(sql, country, (err, res) => {
                                        countryId = res[0].insertId
                                        if (err) {
                                            console.log(err)
                                            return callback(err, null) //returns null if error is present.
                                        } else {
                                            sql = `INSERT INTO city (city, country_id) VALUES (?, ?)` //this statement inserts the city into the database w/ assoc. country_id
                                            conn.query(sql, [city, countryId], (err, res) => {
                                                conn.end()
                                                cityId = res.insertId
                                                if (err) {
                                                    console.log(err)
                                                    return callback(err, null) //returns null if error is present.
                                                } else {
                                                    return callback(null, [res, cityId, countryId]) // sends response back to the front end
                                                }
                                            })
                                        }
                                    })
                                } else { //this statement executes if the country is not present into the db.
                                    countryId = res[0][0].country_id
                                    sql = `INSERT INTO city (city, country_id) VALUES (?, ?)` //this statement inserts the city into the db w/ assoc. country id
                                    conn.query(sql, [city, countryId], (err, res) => {
                                        conn.end()
                                        cityId = res.insertId
                                        if (err) {
                                            console.log(err)
                                            return callback(err, null) //returns null if error is present.
                                        } else {
                                            return callback(null, [res, cityId, countryId]) // sends response back to the front end
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }
    },

    //endpoint 20 => getting list of all stores
    getAllStores: (callback)=> {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err){
                console.log(err)
                return callback (err, null)
            } else {
                sql =`SELECT s.store_id, a.address FROM store s, address a WHERE s.address_id = a.address_id`
                conn.query(sql, (err, res) => {
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

    //endpoint 21 => getting list of all cities
    getAllCity: (id, callback) =>{
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback (err, null)
            } else {
                sql = `SELECT city_id, city, country FROM country c, city ct WHERE c.country_id = ct.country_id AND ct.country_id = ?`
                conn.query(sql, [id], (err, res) => {
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

    //endpoint 22 ->  getting list of all countries
    getAllCountry: (callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err){
                console.log(err)
                return callback (err, null)
            } else {
                sql = `SELECT country_id, country FROM country`
                conn.query(sql, (err, res) => {
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
}


module.exports = storeDB