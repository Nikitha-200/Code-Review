const generateContent = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
    const { code, language } = req.body

    if (!code) return res.status(400).send("Code is required")
    if (!language) return res.status(400).send("Language is required")

    const prompt = `Please review the following ${language} code and suggest improvements:\n\n${code}`
    const response = await generateContent(prompt)
    res.send(response)
}
