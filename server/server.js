require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors');
const volleyball = require('volleyball');
const PORT = process.env.PORT || 4000
const authRoutes = require('./auth/routes')
require('./db/connection')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(volleyball)
app.get('/', (req, res) => {
    res.send('Hello')
})
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/',authRoutes)


app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
})