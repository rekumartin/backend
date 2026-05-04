const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000; // Render používa 10000

app.use(cors());
app.use(express.json());

// Dáta priamo v kóde (ako záloha, keď nejde DB)
const studentsData = [
    { id: 1, name: "Adrian", surname: "Červenka", nickname: "chilli pepper", image: "https://picsum.photos/id/1011/300/200", bio: "Má fakt divné hlášky." },
    { id: 2, name: "Milan", surname: "Kokina", nickname: "tanečník", image: "https://api.sportnet.online/v1/ppo/futbalsfz.sk/users/5efee63f1b04f230d150c5ce/formal-photo/e18f5e4d-9a8d-4196-9e18-30ebf1b60dc4", bio: "Nechcelo sa mi toto vobec robiť." },
    { id: 3, name: "Martin", surname: "Jelínek", nickname: "král jelimán", image: "https://api.sportnet.online/v1/ppo/futbalsfz.sk/users/68c9112594d10f7e9dd591c4/formal-photo/94387b0f-c431-49e2-b562-6a357f415c2d", bio: "............" },
    { id: 4, name: "Daniel", surname: "Barta", nickname: "skeleton", image: "https://picsum.photos/id/1014/300/200", bio: "..........." },
    { id: 5, name: "Matej", surname: "Randziak", nickname: "tankista", image: "https://picsum.photos/id/1015/300/2000", bio: "..........." },
    { id: 6, name: "Matúš", surname: "Bucko", nickname: "xxxxxxxx", image: "https://picsum.photos/id/1016/300/200", bio: "Nechcelo sa mi toto vobec robiť." },
    { id: 7, name: "Janka", surname: "Vargová", nickname: "xxxxxxxxx", image: "https://picsum.photos/id/1018/300/200", bio: "Má fakt divné hlášky." },
    { id: 8, name: "Matúš", surname: "Holečka", nickname: "xxxxxxxxxx", image: "https://picsum.photos/id/1019/300/200", bio: "............" },
    { id: 9, name: "Marko", surname: "Mihalička", nickname: "xxxxxxxxxx", image: "https://picsum.photos/id/1020/300/200", bio: "............" },
    { id: 10, name: "Lukáš", surname: "Vindiš", nickname: "žirafa", image: "https://picsum.photos/id/1021/300/200", bio: "............" }
];

// Skúsime sa pripojiť k DB (iba ak máme údaje)
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_db'
});

db.connect((err) => {
    if (err) {
        console.log("⚠️ DB nedostupná (bežím v režime bez DB)");
    } else {
        console.log("✅ Pripojené k MariaDB");
    }
});

// Hlavná cesta pre študentov
app.get('/students', (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err || results.length === 0) {
            return res.json(studentsData); // Ak DB nejde, pošli fixné dáta
        }
        res.json(results);
    });
});

// Statické súbory - DÔLEŽITÉ pre Render, aby videl index.html
app.use(express.static('.'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server beží na porte ${PORT}`);
});