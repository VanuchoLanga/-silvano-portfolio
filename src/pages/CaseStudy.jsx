import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { projects } from '../data'
import './CaseStudy.css'

export default function CaseStudy() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  useEffect(() => { window.scrollTo(0, 0) }, [id])
  if (!project) return <Navigate to="/" replace />

  const idx  = projects.findIndex(p => p.id === id)
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return (
    <main className="cs" style={{ paddingTop: 'var(--nav-h)' }}>

      {/* HERO — image full to divider line */}
      <div className="cs-hero">
        <img src={project.hero} alt={project.title} className="cs-hero__img" />
        <div className="cs-hero__overlay" />

        {/* title content */}
        <div className="container cs-hero__content">
          <Link to="/#projects" className="cs-back">← todos os projectos</Link>
          <p className="cs-cat">{project.category} · {project.year}</p>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-tagline">{project.tagline}</p>
        </div>

        {/* meta overlaid at bottom of image */}
        <div className="cs-meta">
          <div className="container cs-meta__grid">
            {[
              { label: 'cliente',  value: project.client },
              { label: 'papel',    value: project.role },
              { label: 'duração',  value: project.duration },
            ].map(m => (
              <div key={m.label} className="cs-meta__item">
                <span className="cs-meta__label">{m.label}</span>
                <span className="cs-meta__value">{m.value}</span>
              </div>
            ))}
            <div className="cs-meta__item">
              <span className="cs-meta__label">ferramentas</span>
              <div className="cs-meta__tags">
                {project.tools.map(t => <span key={t} className="tag cs-tag">{t}</span>)}
              </div>
            </div>
            {project.liveUrl !== '#' && (
              <div className="cs-meta__item">
                <a href={project.liveUrl} target="_blank" rel="noopener" className="cs-meta__link">
                  ver site →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* divider line — right after hero */}
      <div className="divider" />

      {/* BODY CONTENT */}
      <div className="container cs-body">

        <div className="cs-block">
          <p className="cs-block__label">contexto</p>
          <p className="cs-block__text">{project.overview}</p>
        </div>

        <div className="cs-block">
          <p className="cs-block__label">problema</p>
          <p className="cs-block__text">{project.problem}</p>
        </div>

        <div className="cs-block">
          <p className="cs-block__label">processo</p>
          <div className="cs-steps">
            {project.process.map((s, i) => (
              <div key={i} className="cs-step">
                <span className="cs-step__num">{s.step}</span>
                <div>
                  <p className="cs-step__title">{s.title}</p>
                  <p className="cs-step__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {project.images.length > 0 && (
          <div className="cs-gallery">
            {project.images.map((img, i) => (
              <div key={i} className="cs-gallery__item">
                <img src={img} alt={`${project.title} ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="cs-results">
          <p className="cs-block__label">resultados</p>
          <div className="cs-results__grid">
            {project.results.map((r, i) => (
              <div key={i} className="cs-result">
                <strong>{r.metric}</strong>
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="divider" />

      {/* PROJECT NAV */}
      <div className="container cs-nav">
        <Link to={`/project/${prev.id}`} className="cs-nav__item">
          <span className="cs-nav__dir">← anterior</span>
          <span className="cs-nav__title">{prev.title}</span>
        </Link>
        <Link to={`/project/${next.id}`} className="cs-nav__item cs-nav__item--next">
          <span className="cs-nav__dir">próximo →</span>
          <span className="cs-nav__title">{next.title}</span>
        </Link>
      </div>

    </main>
  )
}
