import { JWT_TOKEN_MAX_AGE } from '../../consts/consts.js';
import User from '../../models/user.model.js';
import { comparePasswords, createJWTToken } from '../../utils/utils.js';

export async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username or Password are not present.");
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send("Login not successful. User not found.");
        }

        const result = await comparePasswords(password, user.password);
        if (!result) {
            return res.status(401).send("Login not successful. Wrong password.");
        }

        const token = createJWTToken(user);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: JWT_TOKEN_MAX_AGE * 1000, // 3hrs in ms
        });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send("Error logging in the user.");
    }
}