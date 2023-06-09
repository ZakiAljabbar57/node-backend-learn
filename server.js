const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require('./app/models')
db.sequelize.sync()
    .then(() => {
        console.log("Synced DB");
    }).catch((err) => {
        console.log("Failed to sync DB: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});