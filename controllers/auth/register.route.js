import { JWT_TOKEN_MAX_AGE } from '../../consts/consts.js';
import User from '../../models/user.model.js';
import { createJWTToken } from '../../utils/utils.js';

export async function register(req, res) {
    const { username, password } = req.body;

    if (password.length < 4) {
        return res.status(400).send("Password less than 4 characters.");
    }

    try {
        const hash = await hashPassword(password);
        const user = await User.create({
            username,
            password: hash,
        });
        const token = createJWTToken(user);

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: JWT_TOKEN_MAX_AGE * 1000, // 3hrs in ms
        });
        res.status(200).send(user);
    } catch (err) {
        res.status(401).send("Error creating a user.");
    }
}