const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
require('./config/db')

app.use(cors({
origin: 'http://localhost:4200',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization']
}))



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('serveur démarré')
})
const authRoutes = require('./routes/authRoutes')
app.use('/', authRoutes)

const registerRoutes = require('./routes/authRoutes')
app.use('/register', registerRoutes)


