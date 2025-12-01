import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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

        // Brevo (Sendinblue) Configuration
        const SibApiV3Sdk = require('sib-api-v3-sdk');
        const defaultClient = SibApiV3Sdk.ApiClient.instance;

        // Configure API key authorization: api-key
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = 'eyJhcGlfa2V5IjoieGtleXNpYi1mOTkxNGNmM2NkOTNkYzRhNTlmNzY4YjE1OWI2ODU4M2NlYmNmZWNhMWRjYTQ1OTg3Nzg4Y2RjN2Q5ODQ1ZDZjLUNyRDFtTGVPNE52cEhZeEkifQ';

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = `New Lead: ${name}`;
        sendSmtpEmail.htmlContent = `
            <html>
                <body>
                    <h1>New Lead Received</h1>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </body>
            </html>
        `;
        sendSmtpEmail.sender = { "name": "GrowthMantra Contact Form", "email": "growthmantrasolutions@gmail.com" };
        sendSmtpEmail.to = [{ "email": "growthmantrasolutions@gmail.com", "name": "GrowthMantra Team" }];
        sendSmtpEmail.replyTo = { "email": email, "name": name };

        console.log("Sending email via Brevo...");

        try {
            const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Email sent successfully via Brevo. Returned data: ' + JSON.stringify(data));
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Brevo API error:', error);
            return res.status(500).json({
                error: 'Failed to send email via Brevo',
                details: error.message
            });
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

