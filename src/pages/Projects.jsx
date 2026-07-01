import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data'
import './Projects.css'

const FILTERS = ['Todos', 'UX/UI', 'Full Stack', 'Social Media', 'Branding', 'Desktop']

export default function AllProjects() {
  const [filter, setFilter] = useState('Todos')

  const filtered = filter === 'Todos'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()))

  return (
    <main className="all-projects" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container">

        {/* HEADER */}
        <div className="ap-header">
          <div className="ap-header__left">
            <Link to="/" className="ap-back">← voltar</Link>
            <p className="sec-label" style={{ marginBottom: 0 }}>todos os projectos</p>
            <h1 className="ap-title">Projectos</h1>
            <p className="ap-sub">
              Uma selecção do trabalho que desenvolvi — produtos digitais, interfaces, estratégias de conteúdo e identidades visuais.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="ap-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`ap-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
          <span className="ap-count t-mono">{filtered.length} projecto{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* GRID */}
        <div className="ap-grid">
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              to={`/project/${p.id}`}
              className="ap-card"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="ap-card__img-wrap">
                <img src={p.cover} alt={p.title} className="ap-card__img" loading="lazy" />
                <div className="ap-card__hover-overlay">
                  <span>ver case study →</span>
                </div>
              </div>
              <div className="ap-card__body">
                <span className="ap-card__cat t-mono">{p.category}</span>
                <div className="ap-card__row">
                  <h3 className="ap-card__title">{p.title}</h3>
                  <span className="ap-card__year t-mono">{p.year}</span>
                </div>
                <p className="ap-card__tagline">{p.tagline}</p>
                <div className="ap-card__tools">
                  {p.tools.slice(0, 4).map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {p.tools.length > 4 && (
                    <span className="tag">+{p.tools.length - 4}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="ap-empty">
            <p className="t-mono">nenhum projecto encontrado para "{filter}"</p>
          </div>
        )}

      </div>
    </main>
  )
}
