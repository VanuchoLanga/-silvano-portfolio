import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, experiences, stack } from '../data'
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
      <div className="hero__bg" />
      <div className="hero__bg-overlay" />
      <div className="container">
        <div className="hero__photo fade-up">
          <img
            src="/assets/silva.png"
            alt="Silvano Langa"

          />
          <div className="hero__status">
            <span className="hero__status-dot" />
            disponível
          </div>
        </div>

        <h1 className="hero__name fade-up" style={{ animationDelay: '0.05s' }}>
          Silvano Langa
        </h1>

        <p className="hero__tagline fade-up" style={{ animationDelay: '0.1s' }}>
          Full Stack Developer, UX/UI Designer & Social Media.
          <br />
          <span className="hero__location">
            <i className="fas fa-map-marker-alt" /> Maputo, Moçambique
          </span>
        </p>

        <nav className="hero__links fade-up" style={{ animationDelay: '0.15s' }}>
          <a href="#about">sobre</a>
          <a href="#experience">experiência</a>
          <a href="#projects">projectos</a>
          <a href="#contact">contacto</a>
          <a href="/silvano-langa-cv-v26.pdf" download className="hero__link-cv">
            cv <i className="fas fa-download" />
          </a>
        </nav>

        <div className="hero__social fade-up" style={{ animationDelay: '0.2s' }}>
          <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/silvano-de-joaquim-langa-12928b396/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="https://www.instagram.com/silvano.jlanga" target="_blank" rel="noopener" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://wa.me/message/UJZ7LIIHHUXPI1" target="_blank" rel="noopener" aria-label="WhatsApp">
            <i className="fab fa-whatsapp" />
          </a>
          <a href="https://behance.net" target="_blank" rel="noopener" aria-label="Behance">
            <i className="fab fa-behance" />
          </a>
        </div>
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
          {projects.slice(0, 3).map((p, i) => (
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
                <div className="pcard__tools">
                  {p.tools.slice(0, 3).map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {p.tools.length > 3 && (
                    <span className="tag">+{p.tools.length - 3}</span>
                  )}
                </div>
                <span className="pcard__cta">ver case study →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="projects__more reveal">
          <Link to="/projects" className="btn">
            ver todos os projectos ({projects.length}) →
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
                Comecei a aprender a programar porque queria criar coisas bonitas. Aprendi design porque queria que o código tivesse impacto. Hoje faço as duas coisas — e é exactamente essa combinação que torna o meu trabalho diferente.
              </p>
              <p className="about__text">
                Não entrego apenas um site ou uma app. Entrego produtos que contam uma história, resolvem problemas reais e deixam uma marca positiva em quem os usa. Gosto de simplificar o complexo, tornar o bonito útil e entregar sempre com foco no utilizador e no objetivo do cliente.
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
              <a href="/silvano-langa-cv-v26.pdf" download className="btn btn-solid">
                <i className="fas fa-download" /> Download CV
              </a>
              <a href="#contact" className="btn">Falar comigo</a>
            </div>

            <div className="about__socials reveal" style={{ transitionDelay: '0.2s' }}>
              {[
                { href: 'https://github.com',                                                icon: 'fab fa-github' },
                { href: 'https://www.instagram.com/silvano.jlanga',                         icon: 'fab fa-instagram' },
                { href: 'https://www.linkedin.com/in/silvano-de-joaquim-langa-12928b396/', icon: 'fab fa-linkedin-in' },
                { href: 'https://behance.net',                                               icon: 'fab fa-behance' },
                { href: 'https://wa.me/message/UJZ7LIIHHUXPI1',                             icon: 'fab fa-whatsapp' },
              ].map(s => (
                <a key={s.icon} href={s.href} target="_blank" rel="noopener" className="about__social-link">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* PHOTO SIDE */}
          <div className="about__photo reveal" style={{ transitionDelay: '0.05s' }}>
            <img
              src="/assets/sobresilvano.png"
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
          <a href="/silvano-langa-cv-v26.pdf" download className="btn">
            <i className="fas fa-download" /> Download CV
          </a>
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
      await window.emailjs?.send('service_portfolio', 'template_portfolio', { ...form, to_name: 'Silvano' })
      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
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
            {status === 'err' && <p className="contact__feedback contact__feedback--err"><i className="fas fa-times" /> Erro — tenta via WhatsApp.</p>}
          </form>

          <div className="contact__links">
            {[
              { href: 'https://wa.me/message/UJZ7LIIHHUXPI1',                               icon: 'fab fa-whatsapp',    label: 'WhatsApp',  sub: 'Resposta rápida' },
              { href: 'https://www.linkedin.com/in/silvano-de-joaquim-langa-12928b396/',    icon: 'fab fa-linkedin-in', label: 'LinkedIn',   sub: 'Silvano Langa' },
              { href: 'https://www.instagram.com/silvano.jlanga',                           icon: 'fab fa-instagram',  label: 'Instagram',  sub: '@silvano.jlanga' },
              { href: 'https://behance.net',                                                 icon: 'fab fa-behance',    label: 'Behance',    sub: 'Ver trabalho' },
            ].map(c => (
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
      <About />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Contact />
    </>
  )
}
