const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// =========================
// Career Advisor
// =========================
router.post("/career-advice", auth, async (req, res) => {
  try {
    const { message } = req.body;

    const user = await User.findById(req.user.id);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert career mentor for ${user.career}. Give practical placement-focused advice.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "AI Error",
    });
  }
});

router.post("/generate-quiz", auth, async (req, res) => {
  try {
    const { topic } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Generate exactly 5 MCQ questions on ${topic}.

Return ONLY valid JSON.

Example:

[
 {
   "question":"What is React?",
   "options":["Library","Database","OS","Compiler"],
   "answer":"Library"
 }
]
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const content =
      completion.choices[0].message.content;

    const questions = JSON.parse(content);

    res.json({
      questions,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      msg: "Quiz Generation Failed",
    });
  }
});

router.post("/resume-review", auth, async (req, res) => {
  try {
    const { resumeText } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Review this resume.

Give:
1. ATS Score out of 100
2. Strengths
3. Weaknesses
4. Suggestions for improvement

Resume:

${resumeText}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.json({
      review: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Resume Review Failed",
    });
  }
});

router.post("/interview-question", auth, async (req, res) => {
  try {
    const { domain } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate ONE technical interview question for ${domain}. Return only the question.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.json({
      question: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Question generation failed",
    });
  }
});

router.post("/evaluate-answer", auth, async (req, res) => {
  try {
    const { domain, question, answer } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
You are a senior technical interviewer.

Domain:
${domain}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return:

Score: X/10

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const feedback =
      completion.choices[0].message.content;

    const scoreMatch =
      feedback.match(/(\d+)\/10/);

    const score = scoreMatch
      ? parseInt(scoreMatch[1])
      : 7;

    res.json({
      score,
      feedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Evaluation failed",
    });
  }
});

module.exports = router;