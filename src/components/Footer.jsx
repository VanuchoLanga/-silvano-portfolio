import { socials } from '../data'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">silvano<span>.</span></span>
        <span className="footer__copy">© {new Date().getFullYear()} Silvano Langa · Maputo, MZ</span>
        <div className="footer__links">
          {socials.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener" aria-label={l.label}>
              <i className={l.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
