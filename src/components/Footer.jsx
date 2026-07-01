import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">silvano<span>.</span></span>
        <span className="footer__copy">© {new Date().getFullYear()} Silvano Langa · Maputo, MZ</span>
        <div className="footer__links">
          {[
            { href: 'https://github.com',                                                icon: 'fab fa-github',      label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/silvano-de-joaquim-langa-12928b396/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
            { href: 'https://www.instagram.com/silvano.jlanga',                        icon: 'fab fa-instagram',   label: 'Instagram' },
            { href: 'https://behance.net',                                              icon: 'fab fa-behance',     label: 'Behance' },
            { href: 'https://wa.me/message/UJZ7LIIHHUXPI1',                            icon: 'fab fa-whatsapp',    label: 'WhatsApp' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener" aria-label={l.label}>
              <i className={l.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
