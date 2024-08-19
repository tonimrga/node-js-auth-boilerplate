import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import { JWT_TOKEN_MAX_AGE } from "../consts/consts.js";

export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        console.log('Error hashing password.', e);
    }
}

export async function comparePasswords(password, userPassword) {
    try {
        const result = await bcrypt.compare(password, userPassword);
        return result;
    } catch (e) {
        console.log('Error comparing password.', e);
    }
}

export function createJWTToken(user) {
    const jwtSecret = process.env.JWT_SECRET;
    const { _id: id, username, role } = user;

    const token = jwt.sign(
        { id, username, role },
        jwtSecret,
        {
            expiresIn: JWT_TOKEN_MAX_AGE,
        }
    );

    return token;
}
