const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// In-memory robust database store for Chorcha Platform
let db = {
    users: [
        { id: 1, name: "Mahtab", email: "mahtab@example.com", phone: "+8801700000000", goal: "BCS", streak: 12, totalExams: 48, avgScore: "84%" }
    ],
    categories: [
        { id: "bcs", name: "BCS Preliminary & Written", icon: "🏛️", count: 12500, description: "Comprehensive BCS preparation with model tests and past papers." },
        { id: "admission", name: "University Admission (BUET, DU, Med)", icon: "🎓", count: 10400, description: "Engineering, Medical, and Dhaka University admission question banks." },
        { id: "bank", name: "Bank Job Exams", icon: "💰", count: 6800, description: "Senior Officer, Cash Officer, and Specialized Bank recruitment tests." },
        { id: "hsc", name: "HSC (Science, Arts, Commerce)", icon: "📚", count: 9100, description: "HSC model tests across Physics, Chemistry, Math, Biology, ICT." },
        { id: "ssc", name: "SSC (Class 9-10)", icon: "📖", count: 5300, description: "SSC board exam prep and scholarship model tests." },
        { id: "primary", name: "Primary Teacher Recruitment", icon: "📝", count: 4200, description: "Primary assistant teacher exam question bank." }
    ],
    questions: {
        "bcs": [
            { id: 1, q: "When was the historic Six-Point demand presented?", options: ["1966", "1969", "1970", "1952"], answer: 0, explanation: "Bangabandhu Sheikh Mujibur Rahman presented the Six-Point demand in February 1966 at Lahore.", subject: "Bangladesh Affairs", difficulty: "Medium" },
            { id: 2, q: "What is the chemical formula of heavy water?", options: ["H2O", "D2O", "T2O", "H2O2"], answer: 1, explanation: "Deuterium oxide (D2O) is known as heavy water.", subject: "General Science", difficulty: "Easy" },
            { id: 3, q: "Who wrote the novel 'Gitanjali'?", options: ["Kazi Nazrul Islam", "Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Jasim Uddin"], answer: 1, explanation: "Rabindranath Tagore won the Nobel Prize in Literature in 1913 for Gitanjali.", subject: "Bangla Literature", difficulty: "Easy" },
            { id: 4, q: "The headquarters of Transparency International is located in:", options: ["Geneva", "Berlin", "New York", "Vienna"], answer: 1, explanation: "Transparency International's secretariat is in Berlin, Germany.", subject: "International Affairs", difficulty: "Hard" }
        ],
        "admission": [
            { id: 101, q: "If matrices A and B are invertible, then (AB)^-1 = ?", options: ["A^-1 B^-1", "B^-1 A^-1", "AB", "A^T B^T"], answer: 1, explanation: "The inverse of a product of invertible matrices is the product of their inverses in reverse order: (AB)^-1 = B^-1 A^-1.", subject: "Higher Math", difficulty: "Medium" },
            { id: 102, q: "What is the escape velocity from Earth's surface approximately?", options: ["9.8 km/s", "11.2 km/s", "7.9 km/s", "30 km/s"], answer: 1, explanation: "Escape velocity from Earth is approximately 11.2 kilometers per second.", subject: "Physics", difficulty: "Easy" }
        ]
    },
    leaderboard: [
        { rank: 1, name: "Mahtab (You)", category: "BCS", score: "96%", correct: 48, incorrect: 2, time: "18m 30s", badge: "🥇 BCS Grandmaster" },
        { rank: 2, name: "Tanvir Ahmed", category: "Admission", score: "94%", correct: 47, incorrect: 3, time: "19m 10s", badge: "🥈 DU Topper" },
        { rank: 3, name: "Sadia Sultana", category: "Bank Jobs", score: "92%", correct: 46, incorrect: 4, time: "20m 00s", badge: "🥉 Bank Pro" },
        { rank: 4, name: "Rakibul Hasan", category: "HSC", score: "90%", correct: 45, incorrect: 5, time: "21m 15s", badge: "⭐ Scholar" }
    ],
    analytics: {
        strongSubjects: ["Bangla Literature", "General Science", "ICT"],
        weakSubjects: ["International Affairs", "Higher Math"],
        accuracyTrend: [75, 80, 82, 88, 92, 96],
        streakHistory: [1, 3, 5, 8, 10, 12]
    }
};

// API Endpoints
app.get('/api/profile', (req, res) => {
    res.json(db.users[0]);
});

app.put('/api/profile', (req, res) => {
    const { name, goal, phone } = req.body;
    if (name) db.users[0].name = name;
    if (goal) db.users[0].goal = goal;
    if (phone) db.users[0].phone = phone;
    res.json({ success: true, user: db.users[0] });
});

app.get('/api/categories', (req, res) => {
    res.json(db.categories);
});

app.get('/api/questions/:category', (req, res) => {
    const cat = req.params.category;
    res.json(db.questions[cat] || db.questions['bcs']);
});

// Custom Exam Builder Generator
app.post('/api/exams/custom', (req, res) => {
    const { category, numQuestions, duration, negativeMarking } = req.body;
    const catQuestions = db.questions[category] || db.questions['bcs'];
    // Generate pool
    let generated = [];
    for (let i = 0; i < (numQuestions || 10); i++) {
        const baseQ = catQuestions[i % catQuestions.length];
        generated.push({
            id: i + 1,
            q: `${baseQ.q} (Custom Q${i+1})`,
            options: baseQ.options,
            answer: baseQ.answer,
            explanation: baseQ.explanation,
            subject: baseQ.subject
        });
    }
    res.json({
        examId: Date.now(),
        category,
        duration: duration || 15,
        negativeMarking: negativeMarking || 0.25,
        totalQuestions: generated.length,
        questions: generated
    });
});

app.get('/api/leaderboard', (req, res) => {
    res.json(db.leaderboard);
});

app.get('/api/analytics', (req, res) => {
    res.json(db.analytics);
});

app.post('/api/exams/submit', (req, res) => {
    const { category, score, total, correct, incorrect, timeTaken } = req.body;
    const percentage = Math.round((correct / total) * 100);
    
    db.users[0].totalExams += 1;
    db.users[0].streak += 1;
    
    // Add to leaderboard
    db.leaderboard.unshift({
        rank: 1,
        name: db.users[0].name + " (You)",
        category: category.toUpperCase(),
        score: `${percentage}%`,
        correct,
        incorrect,
        time: timeTaken || "15m",
        badge: percentage >= 90 ? "🥇 Grandmaster" : "⭐ Achiever"
    });
    
    res.json({ success: true, percentage, correct, incorrect, rank: 1 });
});

// Admin CMS Endpoints
app.post('/api/admin/questions', (req, res) => {
    const { category, q, options, answer, explanation, subject, difficulty } = req.body;
    if (!db.questions[category]) db.questions[category] = [];
    const newQ = {
        id: Date.now(),
        q,
        options,
        answer: parseInt(answer),
        explanation,
        subject: subject || "General",
        difficulty: difficulty || "Medium"
    };
    db.questions[category].push(newQ);
    res.json({ success: true, question: newQ });
});

app.get('/api/admin/stats', (req, res) => {
    let totalQ = Object.values(db.questions).reduce((acc, curr) => acc + curr.length, 0);
    res.json({
        totalUsers: 14250,
        totalQuestions: totalQ + 22500,
        activeExamsToday: 1240,
        serverStatus: "100% Free & Unlimited"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Chorcha Full-Stack Backend running seamlessly on http://localhost:${PORT}`);
});
