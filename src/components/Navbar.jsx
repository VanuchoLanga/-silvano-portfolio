import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [location])

  const handleLink = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 70
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
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
