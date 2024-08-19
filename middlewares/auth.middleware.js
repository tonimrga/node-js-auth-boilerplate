import jwt from "jsonwebtoken";

// route middleware for checking if the user is of role="admin"
export function adminAuth(req, res, next) {
    const token = req.cookies.jwt;
    const jwtSecret = process.env.JWT_SECRET;

    if (!token) {
        return res.status(401).send("Not authorized, token not available.");
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).send("Not authorized.");
        }

        if (decodedToken.role !== "admin") {
            console.log(decodedToken.role)
            return res.status(401).send("Not authorized.");
        }

        next();
    });
}

// route middleware for checking if the user is of role="user"
export function userAuth(req, res, next) {
    const token = req.cookies.jwt
    const jwtSecret = process.env.JWT_SECRET;

    if (!token) {
        return res.status(401).send("Not authorized, token not available.");
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).send("Not authorized.");
        }

        if (decodedToken.role !== "user") {
            return res.status(401).send("Not authorized.");
        }

        next();
    });
}