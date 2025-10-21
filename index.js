import express from 'express'
const app = express();
const port = process.env.PORT || 3000;
import stringRouter from './routes/strings.js'

app.use(express.json());

app.use('/strings', stringRouter ); 

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });   
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

