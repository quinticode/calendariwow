const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");

const database = require("./database/database");
const Usuario = require("./models/Usuario");
const Historia = require("./models/Historia");

database.sync();

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "segredo_jwt";

// CONFIGURAÇÕES DO MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

function fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null,true);
    } else {
        cb(new Error("Formato de imagem inválido."), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 mb
});

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ erro: "Token ausente." });

    const token = authHeader.split(" ")[1];
    try {
        req.usuario = jwt.verify(token, SECRET);
        next();
    } catch {
        res.status(401).json({ erro: "Token inválido "})
    }
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// TODAS AS ROTAS

app.post("/upload", authMiddleware, upload.single("imagem"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ erro: "Nenhum arquivo recebido." });
    }
    const url = `http://localhost:3001/uploads/${req.file.filename}`;
    res.json({ url });
});

app.post("/registrar", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const usuarioExiste = await Usuario.findOne({ where: { email } });

        if (usuarioExiste) {
            return res.status(400).json({ erro: "Este e-mail já está cadastrado." })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        await Usuario.create({nome, email, senha: senhaCriptografada });
        res.json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar no banco de dados." });
    }
});

app.post("/login", async (req, res) => {
    const {email,senha} = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        return res.status(401).json({ erro: "Usuário ou senha inválidos." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        return res.status(401).json({ erro: "Usuário ou senha inválidos." });
    }

    const token = jwt.sign({email: usuario.email }, SECRET, { expiresIn: "1h" })
    res.json({ token })
});

// Rotas de Histórias
app.post("/historias", async (req, res) => {
    try {
        const novaHistoria = await Historia.create(req.body);
        res.json({ sucesso: true, historia: novaHistoria });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar a história." });
    }
});

app.get("/historias", async (req, res) => {
    try {
        const historias = await Historia.findAll();
        res.json(historias);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao carregar histórias." });
    }
});

app.get("/historias/:id", async (req, res) => {
    try {
        const historia = await Historia.findByPk(req.params.id);
        if (!historia) {
            return res.status(404).json({ erro: "História não encontrada." });
        }
        res.json(historia);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar a história." });
    }
});


app.use((err, req, res, _next) => {
    if (err instanceof multer.MulterError || err.message) {
        return res.status(400).json({ erro: err.message });
    }
    res.status(500).json({ erro: "Erro interno." });
})

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});