
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { create } = require("ipfs-http-client");

const app = express();
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const added = await ipfs.add(file.buffer);
        res.json({ hash: added.path, name: file.originalname });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
