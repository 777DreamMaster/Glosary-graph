const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const glossaryFilePath = path.join(__dirname, "glossary.json");

app.use(cors());

app.use(express.json());

const readGlossary = () => {
    if (!fs.existsSync(glossaryFilePath)) {
        fs.writeFileSync(glossaryFilePath, JSON.stringify({ nodes: [], edges: [] }));
    }
    return JSON.parse(fs.readFileSync(glossaryFilePath, "utf-8"));
};

const writeGlossary = (data) => {
    fs.writeFileSync(glossaryFilePath, JSON.stringify(data, null, 2));
};

// Получение всех терминов
app.get("/terms", (req, res) => {
    const glossary = readGlossary();
    res.json(glossary.nodes);
});

// Получение всех связей
app.get("/edges", (req, res) => {
    const glossary = readGlossary();
    res.json(glossary.edges);
});

// Добавление нового термина
app.post("/terms", (req, res) => {
    const glossary = readGlossary();
    const { term, definition, x, y } = req.body;

    if (!term || !definition || !x || !y) {
        return res.status(400).json({
            message: "Fields 'term', 'definition', and 'x, y' are required."
        });
    }

    const newId = glossary.nodes.length > 0 ? glossary.nodes[glossary.nodes.length - 1].id + 1 : 1;
    const newTerm = { id: newId, term, definition, x, y };

    glossary.nodes.push(newTerm);
    writeGlossary(glossary);
    res.status(201).json({ message: "Term added successfully.", term: newTerm });
});

// Добавление новой связи
app.post("/edges", (req, res) => {
    const glossary = readGlossary();
    const { term1, term2, relation } = req.body;

    if (!term1 || !term2 || !relation) {
        return res.status(400).json({
            message: "Fields 'term1', 'term2', and 'relation' are required."
        });
    }

    if (!glossary.nodes.find((node) => node.id === term1) || !glossary.nodes.find((node) => node.id === term2)) {
        return res.status(404).json({ message: "One or both terms not found." });
    }

    glossary.edges.push({ term1, term2, relation });
    writeGlossary(glossary);
    res.status(201).json({ message: "Edge added successfully.", edge: { term1, term2, relation } });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
