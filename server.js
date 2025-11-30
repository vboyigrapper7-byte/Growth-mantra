import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// API Routes
app.post('/api/submit-lead', async (req, res) => {
    console.log('Email function called');

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log(`Processing email from: ${email}`);

        // Web3Forms API Endpoint
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                access_key: '42364638-c3d2-4e41-bee3-2388624dae19',
                name: name,
                email: email,
                message: message,
                subject: `New Lead: ${name}`,
                from_name: "GrowthMantra Contact Form"
            })
        });

        const text = await response.text();
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error('Web3Forms response was not JSON:', text);
            return res.status(500).json({ error: 'Failed to communicate with email service', details: text });
        }

        if (response.status === 200 && result.success) {
            console.log('Email sent successfully via Web3Forms');
            return res.status(200).json({ message: 'Email sent successfully' });
        } else {
            console.error('Web3Forms error:', result);
            return res.status(500).json({ error: result.message || 'Failed to send email via Web3Forms' });
        }

    } catch (error) {
        console.error('Email function error:', error);
        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message
        });
    }
});

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
