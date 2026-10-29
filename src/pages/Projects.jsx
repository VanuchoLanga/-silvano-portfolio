import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'

// ── DATA ─────────────────────────────────────────────────────────────────────
// Substitui os src pelos teus ficheiros reais em /assets/
const CATEGORIES = [
  { id: 'all',        label: 'Todos' },
  { id: 'design',     label: 'Design Gráfico' },
  { id: 'fullstack',  label: 'Full Stack' },
  { id: 'social',     label: 'Social Media' },
  { id: 'logos',      label: 'Logótipos' },
]

const ITEMS = [
  // ── FULL STACK ──────────────────────────────────────────────────
  { id: 'f1', cat: 'fullstack', src: '/assets/legend-card.webp', label: 'Legend Segurança', client: 'Website Institucional' },
  { id: 'f2', cat: 'fullstack', src: '/assets/nexa-cover.webp',  label: 'NEXA E-commerce',  client: 'Plataforma de Saúde' },

  // ── SOCIAL MEDIA (agrupado por cliente na tab Social) ────────────
  { id: 'kdesperta1', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta1.webp', label: 'K-Desperta' },
  { id: 'kdesperta2', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta2.webp', label: 'K-Desperta' },
  { id: 'kdesperta3', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta3.webp', label: 'K-Desperta' },
  { id: 'kdesperta4', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta4.webp', label: 'K-Desperta' },
  { id: 'kdesperta5', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta5.webp', label: 'K-Desperta' },
  { id: 'kdesperta6', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta6.webp', label: 'K-Desperta' },
  { id: 'kdesperta7', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta7.webp', label: 'K-Desperta' },
  { id: 'kdesperta9', cat: 'social', subclient: 'K-Desperta', src: '/assets/social/kdesperta9.webp', label: 'K-Desperta' },
  { id: 'imobiliaria1', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria1.webp', label: 'Imobiliária' },
  { id: 'imobiliaria2', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria2.webp', label: 'Imobiliária' },
  { id: 'imobiliaria3', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria3.webp', label: 'Imobiliária' },
  { id: 'imobiliaria4', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria4.webp', label: 'Imobiliária' },
  { id: 'imobiliaria5', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria5.webp', label: 'Imobiliária' },
  { id: 'imobiliaria6', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria6.webp', label: 'Imobiliária' },
  { id: 'imobiliaria7', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria7.webp', label: 'Imobiliária' },
  { id: 'imobiliaria8', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria8.webp', label: 'Imobiliária' },
  { id: 'imobiliaria9', cat: 'social', subclient: 'Imobiliária', src: '/assets/social/imobiliaria9.webp', label: 'Imobiliária' },
  { id: 'serena1', cat: 'social', subclient: 'Serena Restauração', src: '/assets/social/serena1.webp', label: 'Serena Restauração' },
  { id: 'serena2', cat: 'social', subclient: 'Serena Restauração', src: '/assets/social/serena2.webp', label: 'Serena Restauração' },
  { id: 'legend1', cat: 'social', subclient: 'Legend Segurança', src: '/assets/social/legend-setembro.webp', label: 'Legend Segurança' },
  { id: 'psc1', cat: 'social', subclient: 'Psicóloga', src: '/assets/psc1.webp', label: 'Psicóloga' },
  { id: 'psc2', cat: 'social', subclient: 'Psicóloga', src: '/assets/psc2.webp', label: 'Psicóloga' },
  { id: 'psc3', cat: 'social', subclient: 'Psicóloga', src: '/assets/psc3.webp', label: 'Psicóloga' },
  { id: 'psc4', cat: 'social', subclient: 'Psicóloga', src: '/assets/psc4.webp', label: 'Psicóloga' },
  { id: 'psc5', cat: 'social', subclient: 'Psicóloga', src: '/assets/psc5.webp', label: 'Psicóloga' },
  { id: 'psc6', cat: 'social', subclient: 'Psicóloga', src: '/assets/psc6.webp', label: 'Psicóloga' },
  { id: 'agencia1', cat: 'social', subclient: 'Zula', src: '/assets/agencia1.webp', label: 'Zula' },
  { id: 'agencia2', cat: 'social', subclient: 'Zula', src: '/assets/agencia2.webp', label: 'Zula' },
  { id: 'agencia3', cat: 'social', subclient: 'Zula', src: '/assets/agencia3.webp', label: 'Zula' },

  // ── LOGÓTIPOS ───────────────────────────────────────────────────
  { id: 'l1', cat: 'logos', src: '/assets/zula.png',          label: 'Zula' },
  { id: 'l2', cat: 'logos', src: '/assets/ingles ciezia.png', label: 'English with Ciezia' },
  { id: 'l3', cat: 'logos', src: '/assets/Logo yocula.png',   label: 'Yoculula' },
  { id: 'l4', cat: 'logos', src: '/assets/Innerhive.png',     label: 'Innerhive' },
  { id: 'l5', cat: 'logos', src: '/assets/Nexus.png',         label: 'Nexus' },
  { id: 'l6', cat: 'logos', src: '/assets/Brandford.png',     label: 'Brandford' },
]

// só mostra tabs que têm conteúdo
const VISIBLE_CATEGORIES = CATEGORIES.filter(c => c.id === 'all' || ITEMS.some(i => i.cat === c.id))

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]

  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="fechar">✕</button>
      <button className="lightbox__prev" aria-label="anterior" onClick={e => { e.stopPropagation(); onPrev() }}>‹</button>
      <div className="lightbox__content" onClick={e => e.stopPropagation()}>
        <img src={item.src} alt={item.label} className="lightbox__img" />
        <div className="lightbox__info">
          <p className="lightbox__label">{item.label}</p>
          {item.client && <p className="lightbox__client t-mono">{item.client}</p>}
          {item.subclient && <p className="lightbox__client t-mono">{item.subclient}</p>}
          <p className="lightbox__counter t-mono">{index + 1} / {items.length}</p>
        </div>
      </div>
      <button className="lightbox__next" aria-label="seguinte" onClick={e => { e.stopPropagation(); onNext() }}>›</button>
    </div>
  )
}

// ── SOCIAL SUBGROUPS ─────────────────────────────────────────────────────────
function SocialGrid({ items, onOpen }) {
  const subclients = [...new Set(items.map(i => i.subclient))]

  return (
    <div className="social-groups">
      {subclients.map(sub => {
        const group = items.filter(i => i.subclient === sub)
        return (
          <div key={sub} className="social-group">
            <p className="social-group__label t-mono">{sub}</p>
            <div className="pg-grid pg-grid--3">
              {group.map((item, idx) => {
                const globalIdx = items.indexOf(item)
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="pg-item"
                    onClick={() => onOpen(globalIdx)}
                  >
                    <img src={item.src} alt={item.label} loading="lazy" />
                    <div className="pg-item__overlay">
                      <span>{item.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AllProjects() {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState(null) // { items, index }

  const filtered = active === 'all' ? ITEMS : ITEMS.filter(i => i.cat === active)

  const openLightbox = useCallback((items, index) => {
    setLightbox({ items, index })
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prevItem = useCallback(() => {
    setLightbox(lb => ({
      ...lb,
      index: (lb.index - 1 + lb.items.length) % lb.items.length
    }))
  }, [])

  const nextItem = useCallback(() => {
    setLightbox(lb => ({
      ...lb,
      index: (lb.index + 1) % lb.items.length
    }))
  }, [])

  const renderGrid = (items, cols = 3) => (
    <div className={`pg-grid pg-grid--${cols}`}>
      {items.map((item, idx) => (
        <button
          key={item.id}
          type="button"
          className="pg-item"
          onClick={() => openLightbox(items, idx)}
        >
          <img src={item.src} alt={item.label} loading="lazy" />
          <div className="pg-item__overlay">
            <span>{item.label}</span>
            {item.client && <span className="pg-item__client">{item.client}</span>}
          </div>
        </button>
      ))}
    </div>
  )

  return (
    <main className="all-projects" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container">

        {/* HEADER */}
        <div className="ap-header">
          <Link to="/" className="ap-back">← voltar</Link>
          <h1 className="ap-title">Portfólio</h1>
          <p className="ap-sub">
            Design gráfico, desenvolvimento, social media e identidades visuais, tudo num só lugar.
          </p>
        </div>

        {/* TABS */}
        <div className="ap-tabs">
          {VISIBLE_CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`ap-tab ${active === c.id ? 'active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
              <span className="ap-tab__count">
                {c.id === 'all' ? ITEMS.length : ITEMS.filter(i => i.cat === c.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="ap-content">

          {/* ALL */}
          {active === 'all' && renderGrid(filtered, 3)}

          {/* DESIGN */}
          {active === 'design' && renderGrid(filtered, 3)}

          {/* FULLSTACK */}
          {active === 'fullstack' && renderGrid(filtered, 2)}

          {/* SOCIAL — agrupado por cliente */}
          {active === 'social' && (
            <SocialGrid
              items={filtered}
              onOpen={(idx) => openLightbox(filtered, idx)}
            />
          )}

          {/* LOGOS — grelha mais apertada */}
          {active === 'logos' && renderGrid(filtered, 4)}

        </div>

      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </main>
  )
}
