const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv/config');

app.use(cors())
app.use(express.json())
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection.on("connected", function () {
	console.log("Connected to Database "+"test");
});

const routes = require("./routes/api");
app.use("/", routes);

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Servidor ativo na porta ${PORT}`)
})
