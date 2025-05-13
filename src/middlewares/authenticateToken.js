const jwt = require("jsonwebtoken");

//Este middleware authenticateToken deve ser aplicado às rotas que exigem que o utilizador esteja logado.
function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']; //Tokens de autenticação são enviados para aqui 
    const token = authHeader && authHeader.split(' ')[1]; //Verifica se o cabeçalho Authorization existe, se existir, ele assume que o valor está no formato "Bearer <TOKEN>
    //authHeader.split(' ')[1] divide a string pelo espaço e pega a segunda parte, que é o token JWT em si, Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
    if (!token) {
        return res.send(401).json({ error: "Token not found"});
    }

    //verifica se o token é válido, usando a mesma SECRET_KEY com que o token foi gerado no login
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {  
        if (error) {
            return res.send(403).json({ error: "Unauthorized"});
        }
        req.user = user; //Adiciona o conteúdo do token no req.user (por ex: o id do utilizador)
        next()
    })
}

module.exports = authenticateToken;