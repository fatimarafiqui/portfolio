import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './ProjectPage.css'

interface ProjectPageLayoutProps {
  content: string
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {} as Record<string, any>, body: raw }

  const frontmatter: Record<string, any> = {}
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    let value: any = line.slice(idx + 1).trim()
    // Handle arrays like [tag1, tag2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s: string) => s.trim())
    } else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      // Remove surrounding quotes
      value = value.slice(1, -1)
    }
    frontmatter[key] = value
  })

  return { frontmatter, body: match[2] }
}

export default function ProjectPageLayout({ content }: ProjectPageLayoutProps) {
  const { frontmatter, body } = parseFrontmatter(content)

  return (
    <div className="project-page">
      <nav className="project-nav">
        <Link to="/#work" className="project-nav-back">&larr; Back</Link>
      </nav>
      <header className="project-hero">
        <span className="project-hero-category">{frontmatter.category}</span>
        <h1 className="project-hero-title">{frontmatter.title}</h1>
        <p className="project-hero-summary">{frontmatter.summary}</p>
        <div className="project-hero-meta">
          {frontmatter.timeline && <span>Timeline: {frontmatter.timeline}</span>}
          {frontmatter.date && <span>Date: {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>}
        </div>
        {frontmatter.tags && (
          <div className="project-hero-tags">
            {frontmatter.tags.map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </header>
      {frontmatter.heroImage && (
        <div className="project-hero-image">
          <img src={frontmatter.heroImage} alt={frontmatter.title} />
        </div>
      )}
      <section className="project-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node: _node, href, children, ...rest }) => {
              const external = /^https?:/.test(href ?? '')
              return (
                <a href={href} {...rest} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {children}
                </a>
              )
            },
          }}
        >
          {body}
        </ReactMarkdown>
      </section>
    </div>
  )
}
