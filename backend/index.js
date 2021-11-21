const express = require('express')
const fileUpload = require('express-fileupload')
const uniquid = require('uniqid')
const cloudinary = require('cloudinary')
const uploadRouter = require('./routes/uploadRouter')
const PORT = 3000
const app = express()

app.use(fileUpload())

app.use('/upload', uploadRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
