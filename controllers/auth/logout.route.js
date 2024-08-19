export function logout(req, res) {
    res.cookie("jwt", "", { maxAge: "1" });
}