//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

var check = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer") || authHeader === "") {
        console.log(`Not Authorized!`)
        res.status(401).send();
        return;
    } else {
        const token = authHeader.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
            if (error) {
                console.log(error)
                res.status(401).send();
                return;
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    }
};
module.exports = check;
