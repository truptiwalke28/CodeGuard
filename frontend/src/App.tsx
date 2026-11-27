
import { useState } from 'react'
import Editor from '@monaco-editor/react'
import './App.css'

function App() {
  const [language, setLanguage] = useState('JavaScript')
  const [code, setCode] = useState(`function calculateTotal(price, quantity) {
  const total = price * quantity
  return total;
}

const result = calculateTotal(100, 5)
console.log(result)`)

  const [scanMessage, setScanMessage] = useState('')

  const handleAnalyze = () => {
    if (!code.trim()) {
      setScanMessage('Please enter some code before analyzing.')
      return
    }

    setScanMessage('Code received! The analysis engine will be connected in the next phase.')
  }

  return (
    <div className="app-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">C</div>
          <span>Code<span className="brand-highlight">Guard</span></span>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">WORKSPACE</p>

          <a className="nav-item active" href="#dashboard">
            <span>▦</span> Dashboard
          </a>

          <a className="nav-item" href="#analyzer">
            <span>⌘</span> Code Analyzer
          </a>

          <a className="nav-item" href="#history">
            <span>◷</span> Scan History
          </a>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">PREFERENCES</p>

          <a className="nav-item" href="#settings">
            <span>⚙</span> Settings
          </a>
        </div>

        <div className="sidebar-bottom">
          <div className="user-avatar">TW</div>
          <div>
            <p className="user-name">Developer</p>
            <p className="user-role">Personal Workspace</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h2>Code Analysis Dashboard</h2>
          </div>

          <div className="topbar-right">
            <span className="system-status">
              <span className="status-dot"></span>
              System Online
            </span>
            <div className="top-avatar">TW</div>
          </div>
        </header>

        <section className="dashboard-content">

          <div className="welcome-section">
            <div>
              <h1>Find bugs before they find you.</h1>
              <p>Analyze your code, understand issues and write better software.</p>
            </div>
            <div className="welcome-icon">⌘</div>
          </div>

          {/* Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <p>Total Scans</p>
              <h2>--</h2>
              <span>Analysis history</span>
            </div>

            <div className="stat-card">
              <p>Bugs Detected</p>
              <h2>--</h2>
              <span>Issues identified</span>
            </div>

            <div className="stat-card">
              <p>Critical Issues</p>
              <h2>--</h2>
              <span>High-priority bugs</span>
            </div>

            <div className="stat-card">
              <p>Code Quality</p>
              <h2>--</h2>
              <span>Quality score</span>
            </div>
          </div>

          {/* Code Analyzer */}
          <section className="analyzer-section" id="analyzer">

            <div className="section-heading">
              <div>
                <h2>Code Analyzer</h2>
                <p>Paste your code below to start analyzing.</p>
              </div>
              <span className="beta-badge">BETA</span>
            </div>

            <div className="editor-toolbar">
              <div className="editor-title">
                <span className="file-icon">JS</span>
                <span>untitled.{language === 'JavaScript' ? 'js' : language === 'TypeScript' ? 'ts' : 'php'}</span>
              </div>

              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                aria-label="Select programming language"
              >
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>PHP</option>
              </select>
            </div>

            <div className='monaco-container'>
              <Editor
              height="320px"
              language={
                language === 'JavaScript' ? 'javascript' :
                language === 'TypeScript' ? 'typescript' :
                'php'
              }
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value ?? '')}
              options={{
                minimap: {enabled: false },
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                automaticLayout: true,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                padding: {top : 15},
                tabSize: 2, 
              }}
              />
            </div>

            <div className="editor-footer">
              <span>{language} · {code.split('\n').length} lines</span>

              <button className="analyze-button" onClick={handleAnalyze}>
                ✦ Analyze Code
              </button>
            </div>

            {scanMessage && (
              <div className="scan-message" role="status">
                {scanMessage}
              </div>
            )}

          </section>

          {/* Results */}
          <section className="results-section">
            <div className="section-heading">
              <div>
                <h2>Analysis Results</h2>
                <p>Detected issues will appear here after analysis.</p>
              </div>
            </div>

            <div className="empty-state">
              <div className="empty-icon">⌕</div>
              <h3>Ready to inspect your code?</h3>
              <p>Run your first analysis to see bugs, warnings and suggested fixes.</p>
            </div>
          </section>

          <footer className="dashboard-footer">
            <span>CodeGuard © 2026</span>
            <span>Built for better code quality.</span>
          </footer>

        </section>
      </main>
    </div>
  )
}

export default App
