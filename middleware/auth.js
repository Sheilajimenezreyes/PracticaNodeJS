const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Acceso denegado");
    try {
        const payload = jwt.verify(token, process.env.SECRET_TOKEN);
        req.payload = payload;
        next();
    } catch (error) {
      res.status(403).json({ status: "EXPIRED" });
    }
}

const verifyAdmin = async (req, res, next) =>{
     const token = req.header('auth-token');
    if(!token) return res.status(401).send("Acceso denegado");
    try {
        const payload = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log(payload)
        if(!payload || payload.role === "User") return res.status(401).send("No tienes permisos");
        req.payload = payload;
        next();
    } catch (error) {
       res.status(403).json({ status: "EXPIRED" });
    }
}



module.exports = {verifyToken, verifyAdmin}