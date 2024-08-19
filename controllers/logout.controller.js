export function logout(req, res) {
    res.cookie("jwt", "", { maxAge: "1" });
    res.send('User logged out.');
}