//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05

var db = require("./databaseConfig.js")


var filmDB = {
    //endpoint 6
    getCategory: (category_id, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => { //established connection with database.
            if (err) {
                console.log(err)
                return callback(err, null) //returns null if error is present.
            } else {
                console.log(`Connected to database!`)
                var sql = `SELECT f.film_id, f.title, cat.name, f.rating, f.release_year, f.rental_rate, f.length as duration FROM film f, film_category fc, category cat WHERE f.film_id = fc.film_id AND fc.category_id = cat.category_id AND cat.category_id = ? ORDER BY film_id `
                conn.query(sql, category_id, (err, res) => {
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
    },
    
   //endpoint 15 -> checks for category of films
   filmCatList: (callback) => {
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err)
            return callback(err, null)
        } else {
            var sql = `SELECT category_id, name FROM category`
            conn.query(sql, (err, res) => {
                conn.end()
                if (err) {
                    console.log(err)
                    return callback(err, null)
                } else {
                    return callback(null, res)
                }
            })
        }
    })
    },

    //endpoint 16 -> gets distinct list of ratings
    filmRatingList: (callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                var sql = `SELECT DISTINCT rating FROM film ORDER BY rating;`
                conn.query(sql, (err, res) => {
                    conn.end()
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        return callback(null, res)
                    }
                })
            }
        })
    },

    //endpoint 17 -> gets films based on criteria
    filmSearch: (category, rating, title, price, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                var sql = `SELECT f.film_id, f.title, cat.name, f.rating, f.release_year, f.rental_rate, f.length as duration FROM film f, film_category fc, category cat WHERE f.film_id = fc.film_id AND fc.category_id = cat.category_id `
                sqlArray = []
                if (category != "empty") {
                    sql += `AND cat.category_id = ? `
                    sqlArray.push(category)
                }
                if (rating != "empty") {
                    sql += `AND f.rating = ? `
                    sqlArray.push(rating)
                }
                if (title != "") {
                    searchTerm = "\'%"
                    searchTerm += `${title}`
                    sql += `AND f.title LIKE ${searchTerm}%\'`
                }
                if (price != "") {
                    sql += `AND f.rental_rate <= ? `
                    sqlArray.push(price)
                }
                sql += `ORDER BY f.film_id`
                conn.query(sql, sqlArray, (err, res) => {
                    conn.end()
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else if (res.length == 0) {
                        return callback(err, 204)
                    } else {
                        return callback(null, res)
                    }
                })
            }
        })
    },

    //endpoint 18 -> get all film details based on id 
    getFilmDetails: (id, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback (err, null)
            } else {
                sql = `SELECT f.film_id, f.title, f.description, f.release_year, f.rental_rate, f.length, f.rating, f.special_features, l.name as language, c.name as category FROM film f, language l, film_category fc, category c WHERE f.language_id =  l.language_id AND f.film_id = fc.film_id AND c.category_id = fc.category_id AND f.film_id = ?;SELECT a.actor_id, a.first_name, a.last_name FROM film_actor fa, actor a WHERE fa.actor_id = a.actor_id AND fa.film_id = ?;SELECT i.inventory_id, i.film_id, i.store_id, f.rental_rate, a.address FROM inventory i, film f, store s, address a WHERE i.film_id = f.film_id AND i.store_id = s.store_id AND s.address_id = a.address_id AND f.film_id = ?`
                conn.query(sql, [id, id, id], (err, res) => {
                    conn.end()
                    if (err) {
                        console.log(err)
                        return callback (err, null)
                    } else {
                        return callback (null, res)
                    }
                })
            }
        })
    },

    //endpoint 19 -> gets films that actor has acted in 
    getActorFilms: (id, callback) => {
        var conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err)
                return callback (err, null)
            } else {
                sql = `SELECT f.film_id, f.title, f.length, f.rating, f.rental_rate, a.first_name, a.last_name FROM film f, film_actor fa, actor a WHERE f.film_id = fa.film_id AND fa.actor_id = a.actor_id AND fa.actor_id = ?;SELECT * FROM actor WHERE actor_id = ?`
                conn.query(sql, [id, id] ,(err, res) => {
                    conn.end()
                    if (err) {
                        console.log(err)
                        return callback (err, null)
                    } else {
                        return callback(null, res)
                    }
                })
            }
        })
    },
}


module.exports = filmDB