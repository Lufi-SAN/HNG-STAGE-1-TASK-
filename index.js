const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const stringRouter = require('./routes/strings')

app.use(express.json());

app.use('/strings', stringRouter ); 

app.use((err, req, res, next) => {
    res.status(500)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

