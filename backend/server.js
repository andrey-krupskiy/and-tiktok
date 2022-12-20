const express = require('express')
const port = 3000;
const cors = require('cors')
const app = express();

app.use(cors())

app.get('/feed', (req, res) => {
    res.json({name: 'feed', data: [1,2,3,4]})
})

app.listen(port, () => {
    console.log(`AND SHE CAN app listening on port ${port}`)
})
