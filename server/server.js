const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const PORT = 3000
const api = require('./routes/api')


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api', api)
//app.get('/', (req, res) => {
 // res.send('hello')
//})

app.listen(PORT, () => {
    console.log('server running on ' + PORT)
})