const jwt = require("jsonwebtoken");
const refreshToken = (req, res) => {

    try {
        const token = req.header("refresh-token");
        if (!token) {
            return res.status(401).json({
                status: "NO_REFRESH_TOKEN"
            });
        }
        const payload = jwt.verify(
            token,
            process.env.SECRET_TOKEN_REFRESH
        );
        const accessToken = generateToken(
            payload, false
        );
        return res.status(200).json({
            accessToken
        });

    } catch (error) {
        return res.status(401).json({
            status: "REFRESH_EXPIRED"
        });
    }
};

module.exports = refreshToken