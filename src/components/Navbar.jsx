import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 70
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // vindo de outra página com /#secção → espera o render da Home e faz scroll
  useEffect(() => {
    setOpen(false)
    if (location.hash) requestAnimationFrame(() => scrollToId(location.hash.slice(1)))
    else window.scrollTo(0, 0)
  }, [location])

  const handleLink = (e, id) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname === '/') scrollToId(id)
    else navigate('/#' + id)
  }

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo">silvano<span>.</span></Link>
        <div className={`nav__links ${open ? 'open' : ''}`}>
          <a href="#projects"   onClick={e => handleLink(e, 'projects')}>projectos</a>
          <a href="#about"      onClick={e => handleLink(e, 'about')}>sobre</a>
          <a href="#experience" onClick={e => handleLink(e, 'experience')}>experiência</a>
          <a href="#contact"    onClick={e => handleLink(e, 'contact')}>contacto</a>
          <a href="/silvano-langa-cv-v26.pdf" download className="nav__cv">
            cv <i className="fas fa-download" />
          </a>
        </div>
        <button
          className={`nav__burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
