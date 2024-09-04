import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Creating the express app
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Determining directory and file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feedbackFilePath = path.join(__dirname, 'feedback.json');

// Helper functions
const loadFeedback = async () => {
    try {
        const data = await fs.readFile(feedbackFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

const saveFeedback = async (feedback) => {
    await fs.writeFile(feedbackFilePath, JSON.stringify(feedback, null, 2));
}

// POST /feedback - Add new feedback
app.post('/feedback', async (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ message: "Title and text are required in the body." });
    }
    
    try {
        const feedback = await loadFeedback();
        feedback.push({ title, text });
        await saveFeedback(feedback);
        res.status(201).json({ message: "Feedback successfully saved." });
    } catch (error) {
        res.status(500).json({ message: "Error saving feedback." });
    }
});

// GET /feedback - Get all feedback
app.get('/feedback', async (req, res) => {
    try {
        const feedback = await loadFeedback();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving feedback." });
    }
});

// DELETE /feedback/:title - Delete feedback by title
app.delete('/feedback/:title', async (req, res) => {
    const { title } = req.params;

    try {
        let feedback = await loadFeedback();
        const filteredFeedback = feedback.filter(fb => fb.title !== title);

        if (feedback.length === filteredFeedback.length) {
            return res.status(404).json({ message: "Feedback not found." });
        }

        await saveFeedback(filteredFeedback);
        res.status(200).json({ message: "Feedback successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting feedback." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
