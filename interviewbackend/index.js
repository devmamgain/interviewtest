const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/ask', async (req, res) => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/ask',
            {
                question: req.body.question,
            }
        );

        res.json(response.data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});