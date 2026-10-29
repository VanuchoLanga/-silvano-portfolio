import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { publishedProjects, experiences, stack, socials } from '../data'
import './Home.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── HERO ──────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-photo" />
      <div className="hero__bg-gradient" />

      {/* Left content — vertically centred */}
      <div className="container hero__content">

        <h1 className="hero__name fade-up">
          Silvano<span className="hero__name-dot">.</span>
        </h1>

        <p className="hero__tagline fade-up" style={{ animationDelay: '0.08s' }}>
          Full Stack Developer&nbsp;&nbsp;·&nbsp;&nbsp;Social Media
        </p>

        <div className="hero__row fade-up" style={{ animationDelay: '0.14s' }}>
          <a href="#projects" className="hero__cta">ver projectos ↓</a>
          <a href="/silvano-langa-cv.pdf" download className="hero__cv-link">
            <i className="fas fa-download" /> cv
          </a>
        </div>

        <div className="hero__row fade-up" style={{ animationDelay: '0.2s', marginTop: '1.25rem' }}>
          <div className="hero__social">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="hero__social-icon" aria-label={s.label}>
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Mouse scroll — centred at bottom */}
      <div className="hero__mouse fade-up">
        <div className="hero__mouse-icon">
          <div className="hero__mouse-wheel" />
        </div>
        <span>scroll</span>
      </div>

    </section>
  )
}

/* ── PROJECTS ──────────────────────────── */
function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="projects__header reveal">
          <p className="sec-label" style={{marginBottom:0}}>projectos seleccionados</p>
        </div>
        <div className="projects__cards">
          {publishedProjects.slice(0, 3).map((p, i) => (
            <Link
              key={p.id}
              to={`/project/${p.id}`}
              className="pcard reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="pcard__img-wrap">
                <img src={p.cover} alt={p.title} className="pcard__img" loading="lazy" />
              </div>
              <div className="pcard__body">
                <span className="pcard__cat-text">{p.category}</span>
                <div className="pcard__top">
                  <h3 className="pcard__title">{p.title}</h3>
                  <span className="pcard__year t-mono">{p.year}</span>
                </div>
                <p className="pcard__tagline">{p.tagline}</p>
                <span className="pcard__cta">ver case study →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="projects__more reveal">
          <Link to="/projects" className="btn">
            ver portfólio completo →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── ABOUT ─────────────────────────────── */
function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <p className="sec-label reveal">sobre</p>

        <div className="about__grid-layout">
          {/* TEXT SIDE */}
          <div className="about__text-col">
            <div className="about__body reveal">
                <p className="about__text">
                  Tenho 24 anos. Cresci em Maputo e vivi três anos em Manjacaze. Sair da capital ensinou-me a adaptar-me a pessoas e ritmos diferentes, e é isso que levo para cada projecto.
                </p>
                <p className="about__text">
                  Escrevo código, desenho e comunico. Sou curioso e um pouco teimoso: quando não sei algo, estudo até entender, e não largo um problema antes de o resolver.
                </p>
                <p className="about__text">
                  Fora do ecrã, ouço podcasts, leio sobre mindset, faço parte de uma comunidade nerd e sou cristão. Gosto de receber críticas, a sério e não por protocolo: é assim que melhoro.
                </p>
            </div>

            <div className="about__stack reveal" style={{ transitionDelay: '0.1s' }}>
              <p className="sec-label" style={{ marginBottom: '1.25rem' }}>stack</p>
              <div className="stack__grid">
                {stack.map(s => (
                  <div key={s.label} className="stack__item" title={s.label}>
                    <i className={s.icon} />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__actions reveal" style={{ transitionDelay: '0.15s' }}>
              <a href="#contact" className="btn btn-solid">Falar comigo</a>
            </div>
          </div>

          {/* PHOTO SIDE */}
          <div className="about__photo reveal" style={{ transitionDelay: '0.05s' }}>
            <img
              src="/assets/sobre-silvano.webp"
              alt="Silvano Langa"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── EXPERIENCE ────────────────────────── */
function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="exp__section-header reveal">
          <p className="sec-label" style={{marginBottom:0}}>experiência</p>
        </div>
        <div className="exp__cards">
          {experiences.map((e, i) => (
            <div key={i} className="ecard reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="ecard__header">
                <div className="ecard__header-left">
                  <span className="ecard__type t-mono">{e.type}</span>
                  <p className="ecard__role">{e.role}</p>
                  <p className="ecard__company t-mono">{e.company}</p>
                </div>
                <span className="ecard__period t-mono">{e.period}</span>
              </div>
              <p className="ecard__desc">{e.desc}</p>
              <div className="ecard__skills">
                {e.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT ───────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async e => {
      e.preventDefault()
      setStatus('sending')
      try {
        const res = await fetch('https://formspree.io/f/xzdljknq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(form)
        })
        if (res.ok) {
          setStatus('ok')
          setForm({ name: '', email: '', message: '' })
        } else {
          setStatus('err')
        }
      } catch {
        setStatus('err')
      }
    }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <p className="sec-label reveal">contacto</p>

        <div className="contact__header reveal" style={{ transitionDelay: '0.05s' }}>
          <h2 className="t-large">Vamos trabalhar juntos.</h2>
          <p className="t-base" style={{ marginTop: '0.5rem' }}>
            Tens um projecto? Uma ideia? Manda uma mensagem.
          </p>
        </div>

        <div className="contact__grid reveal" style={{ transitionDelay: '0.1s' }}>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">nome</label>
              <input id="name" name="name" type="text" placeholder="O teu nome" value={form.name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="email">email</label>
              <input id="email" name="email" type="email" placeholder="teu@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="message">mensagem</label>
              <textarea id="message" name="message" rows="5" placeholder="Fala-me do teu projecto..." value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
              {status === 'sending'
                ? <><i className="fas fa-spinner fa-spin" /> a enviar...</>
                : <>enviar mensagem</>}
            </button>
            {status === 'ok'  && <p className="contact__feedback contact__feedback--ok"><i className="fas fa-check" /> Mensagem enviada!</p>}
            {status === 'err' && <p className="contact__feedback contact__feedback--err"><i className="fas fa-times" /> Erro ao enviar. Tenta via WhatsApp.</p>}
          </form>

          <div className="contact__links">
            {['WhatsApp', 'Telefone', 'Email', 'LinkedIn', 'Instagram'].map(l => socials.find(s => s.label === l)).map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener" className="contact__link">
                <i className={c.icon} />
                <div>
                  <strong>{c.label}</strong>
                  <span>{c.sub}</span>
                </div>
                <span className="contact__link-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── HOME ──────────────────────────────── */
export default function Home() {
  useReveal()
  return (
    <>
      <Hero />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Contact />
    </>
  )
}
