import jwt from "jsonwebtoken";

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
            return res.status(401).send("Not authorized.");
        }

        next();
    });
}

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