const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const glossaryFilePath = path.join(__dirname, "glossary.json");

app.use(express.json());

const readGlossary = () => {
    if (!fs.existsSync(glossaryFilePath)) {
        fs.writeFileSync(glossaryFilePath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(glossaryFilePath, "utf-8"));
};

const writeGlossary = (data) => {
    fs.writeFileSync(glossaryFilePath, JSON.stringify(data, null, 2));
};

app.get("/terms", (req, res) => {
    const glossary = readGlossary();
    res.json(glossary);
});

app.get("/terms/:term", (req, res) => {
    const glossary = readGlossary();
    const term = glossary.find(
        (item) => item.term.toLowerCase() === req.params.term.toLowerCase()
    );
    if (term) {
        res.json(term);
    } else {
        res.status(404).json({ message: "Term not found" });
    }
});

app.post("/terms", (req, res) => {
    const glossary = readGlossary();
    const { term, definition, graphData } = req.body;

    if (!term || !definition || !graphData) {
        return res.status(400).json({
            message: "Fields 'term', 'definition', and 'graphData' are required."
        });
    }

    const exists = glossary.some(
        (item) => item.term.toLowerCase() === term.toLowerCase()
    );

    if (exists) {
        return res.status(409).json({ message: "Term already exists." });
    }

    glossary.push({ term, definition, graphData });
    writeGlossary(glossary);
    res.status(201).json({ message: "Term added successfully." });
});

app.put("/terms/:term", (req, res) => {
    const glossary = readGlossary();
    const { definition, graphData } = req.body;
    const termIndex = glossary.findIndex(
        (item) => item.term.toLowerCase() === req.params.term.toLowerCase()
    );

    if (termIndex === -1) {
        return res.status(404).json({ message: "Term not found." });
    }

    if (definition) glossary[termIndex].definition = definition;
    if (graphData) glossary[termIndex].graphData = graphData;

    writeGlossary(glossary);
    res.json({ message: "Term updated successfully." });
});

app.delete("/terms/:term", (req, res) => {
    const glossary = readGlossary();
    const updatedGlossary = glossary.filter(
        (item) => item.term.toLowerCase() !== req.params.term.toLowerCase()
    );

    if (updatedGlossary.length === glossary.length) {
        return res.status(404).json({ message: "Term not found." });
    }

    writeGlossary(updatedGlossary);
    res.json({ message: "Term deleted successfully." });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
