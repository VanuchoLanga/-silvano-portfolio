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
  // ── DESIGN GRÁFICO ──────────────────────────────────────────────
  { id: 'd1', cat: 'design', src: '/assets/design/arte1.jpg',  label: 'Flyer Evento',       client: 'Criativismo' },
  { id: 'd2', cat: 'design', src: '/assets/design/arte2.jpg',  label: 'Campanha Impressa',  client: 'Criativismo' },
  { id: 'd3', cat: 'design', src: '/assets/design/arte3.jpg',  label: 'Brochura',           client: 'EPTC' },
  { id: 'd4', cat: 'design', src: '/assets/design/arte4.jpg',  label: 'Cartaz',             client: 'Legend Segurança' },
  { id: 'd5', cat: 'design', src: '/assets/design/arte5.jpg',  label: 'Banner Digital',     client: 'Criativismo' },
  { id: 'd6', cat: 'design', src: '/assets/design/arte6.jpg',  label: 'Material POS',       client: 'Criativismo' },

  // ── FULL STACK ──────────────────────────────────────────────────
  { id: 'f1', cat: 'fullstack', src: '/assets/fullstack/legend.jpg',   label: 'Legend Segurança',      client: 'Website Institucional' },
  { id: 'f2', cat: 'fullstack', src: '/assets/fullstack/bazara.jpg',   label: 'Bazara E-Commerce',     client: 'Plataforma de Vendas' },
  { id: 'f3', cat: 'fullstack', src: '/assets/fullstack/nexa.jpg',     label: 'NEXA Health',           client: 'Plataforma de Saúde' },
  { id: 'f4', cat: 'fullstack', src: '/assets/fullstack/sigecap.jpg',  label: 'SiGeCat',               client: 'App Desktop' },

  // ── SOCIAL MEDIA — EPTC ─────────────────────────────────────────
  { id: 's1', cat: 'social', subclient: 'EPTC', src: '/assets/social/eptc/post1.jpg',  label: 'Post Institucional' },
  { id: 's2', cat: 'social', subclient: 'EPTC', src: '/assets/social/eptc/post2.jpg',  label: 'Reel de Formatura' },
  { id: 's3', cat: 'social', subclient: 'EPTC', src: '/assets/social/eptc/post3.jpg',  label: 'Campanha de Matrículas' },
  { id: 's4', cat: 'social', subclient: 'EPTC', src: '/assets/social/eptc/post4.jpg',  label: 'Dia do Professor' },
  { id: 's5', cat: 'social', subclient: 'EPTC', src: '/assets/social/eptc/post5.jpg',  label: 'Story Promocional' },
  { id: 's6', cat: 'social', subclient: 'EPTC', src: '/assets/social/eptc/post6.jpg',  label: 'Carrossel Cursos' },

  // ── SOCIAL MEDIA — CRIATIVISMO ──────────────────────────────────
  { id: 's7', cat: 'social', subclient: 'Criativismo', src: '/assets/social/criativismo/post1.jpg', label: 'Post Agência' },
  { id: 's8', cat: 'social', subclient: 'Criativismo', src: '/assets/social/criativismo/post2.jpg', label: 'Campanha Cliente' },
  { id: 's9', cat: 'social', subclient: 'Criativismo', src: '/assets/social/criativismo/post3.jpg', label: 'Arte Especial' },

  // ── SOCIAL MEDIA — OUTRAS ───────────────────────────────────────
  { id: 's10', cat: 'social', subclient: 'Outros',      src: '/assets/social/outros/post1.jpg',     label: 'Arte Única' },
  { id: 's11', cat: 'social', subclient: 'Outros',      src: '/assets/social/outros/post2.jpg',     label: 'Arte Única' },

  // ── LOGÓTIPOS ───────────────────────────────────────────────────
  { id: 'l1', cat: 'logos', src: '/assets/logos/logo1.png', label: 'Logo 1' },
  { id: 'l2', cat: 'logos', src: '/assets/logos/logo2.png', label: 'Logo 2' },
  { id: 'l3', cat: 'logos', src: '/assets/logos/logo3.png', label: 'Logo 3' },
  { id: 'l4', cat: 'logos', src: '/assets/logos/logo4.png', label: 'Logo 4' },
  { id: 'l5', cat: 'logos', src: '/assets/logos/logo5.png', label: 'Logo 5' },
  { id: 'l6', cat: 'logos', src: '/assets/logos/logo6.png', label: 'Logo 6' },
  { id: 'l7', cat: 'logos', src: '/assets/logos/logo7.png', label: 'Logo 7' },
  { id: 'l8', cat: 'logos', src: '/assets/logos/logo8.png', label: 'Logo 8' },
]

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
      <button className="lightbox__close" onClick={onClose}>✕</button>
      <button className="lightbox__prev" onClick={e => { e.stopPropagation(); onPrev() }}>‹</button>
      <div className="lightbox__content" onClick={e => e.stopPropagation()}>
        <img src={item.src} alt={item.label} className="lightbox__img" />
        <div className="lightbox__info">
          <p className="lightbox__label">{item.label}</p>
          {item.client && <p className="lightbox__client t-mono">{item.client}</p>}
          {item.subclient && <p className="lightbox__client t-mono">{item.subclient}</p>}
          <p className="lightbox__counter t-mono">{index + 1} / {items.length}</p>
        </div>
      </div>
      <button className="lightbox__next" onClick={e => { e.stopPropagation(); onNext() }}>›</button>
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
            <p className="social-group__label t-mono">— {sub}</p>
            <div className="pg-grid pg-grid--3">
              {group.map((item, idx) => {
                const globalIdx = items.indexOf(item)
                return (
                  <div
                    key={item.id}
                    className="pg-item"
                    onClick={() => onOpen(globalIdx)}
                  >
                    <img src={item.src} alt={item.label} loading="lazy" />
                    <div className="pg-item__overlay">
                      <span>{item.label}</span>
                    </div>
                  </div>
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
        <div
          key={item.id}
          className="pg-item"
          onClick={() => openLightbox(items, idx)}
        >
          <img src={item.src} alt={item.label} loading="lazy" />
          <div className="pg-item__overlay">
            <span>{item.label}</span>
            {item.client && <span className="pg-item__client">{item.client}</span>}
          </div>
        </div>
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
            Design gráfico, desenvolvimento, social media e identidades visuais — tudo num só lugar.
          </p>
        </div>

        {/* TABS */}
        <div className="ap-tabs">
          {CATEGORIES.map(c => (
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
