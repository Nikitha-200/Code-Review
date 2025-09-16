import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'
import ErrorBoundary from './ErrorBoundary'

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`)
  const [review, setReview] = useState(``)
  const [language, setLanguage] = useState("javascript")

  useEffect(() => {
    prism.highlightAll()
  }, [language, code])

  async function reviewCode() {
    try {
      // const response = await axios.post('http://localhost:3000/ai/get-review', { code, language })
      const response = await axios.post('https://aicode-review-t420.onrender.com/ai/get-review', { code, language });
      setReview(String(response.data)) // Ensure it's a string
    } catch (err) {
      console.error(err)
      setReview("Error fetching review. Please try again.")
    }
  }

  return (
    <ErrorBoundary>
      <main>
        <div className="left">
          <div className="language-select">
            <label>Select Language: </label>
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages[language], language)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>

        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
          >
            {review}
          </Markdown>
        </div>
      </main>
    </ErrorBoundary>
  )
}

export default App
