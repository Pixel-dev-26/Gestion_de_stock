import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  Bell,
  ChevronDown,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Package,
} from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Accueil', href: '/' , active: true },
  { label: 'Produits', href: '/produits.html', active: false },
  { label: 'Stocks', href: '/stocks.html', active: false },
  { label: 'Fonctionnalités', href: '#', active: false },
  { label: 'Tarifs', href: '#', active: false },
  { label: 'Contact', href: '#', active: false },
];

export default function Navbar({ isDark, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setProfileOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header className="site-header fade-in-down">
      <div className="header-inner">
        <a href="/" className="logo">
          <span className="logo-badge">
            <Package size={18} strokeWidth={1.8} />
          </span>
          <span className="logo-word">InStock</span>
        </a>

        <nav className="main-nav" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={link.active ? 'active' : ''}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {/* Bascule clair / sombre */}
          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={onToggleTheme}
            aria-label="Changer de thème"
          >
            <span className={`theme-icon ${isDark ? 'is-hidden' : ''}`}>
              <Sun size={18} strokeWidth={1.8} />
            </span>
            <span className={`theme-icon theme-icon-moon ${isDark ? '' : 'is-hidden'}`}>
              <Moon size={18} strokeWidth={1.8} />
            </span>
          </button>

          {/* Notifications */}
          <button type="button" className="icon-btn notif-btn" aria-label="Notifications">
            <Bell size={18} strokeWidth={1.8} />
            <span className="notif-dot" aria-hidden="true" />
          </button>

          {/* Profil */}
          <div className="profile-wrap" ref={profileRef}>
            <button
              type="button"
              className={`profile-btn ${profileOpen ? 'open' : ''}`}
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              <span className="avatar">
                <User size={16} strokeWidth={2} />
              </span>
              <ChevronDown size={15} className="chevron" strokeWidth={2} />
            </button>

            <div className={`profile-menu ${profileOpen ? 'open' : ''}`} role="menu">
              <a href="#" className="profile-menu-item" role="menuitem">
                <User size={15} strokeWidth={1.8} />
                Mon profil
              </a>
              <a href="#" className="profile-menu-item" role="menuitem">
                <Settings size={15} strokeWidth={1.8} />
                Paramètres
              </a>
              <div className="profile-menu-divider" />
              <a href="#" className="profile-menu-item danger" role="menuitem">
                <LogOut size={15} strokeWidth={1.8} />
                Déconnexion
              </a>
            </div>
          </div>

          <a href="/connexion.html" className="btn btn-primary btn-sm header-cta">
            Se connecter
          </a>

          <button
            type="button"
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
          >
            <span className="hamburger-icon">
              {mobileOpen ? <X size={19} strokeWidth={2} /> : <Menu size={19} strokeWidth={2} />}
            </span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mm-actions">
            <a href="/connexion.html" className="btn btn-outline">
              Se connecter
            </a>
            <a href="/instock-dashboard/" className="btn btn-solid">
              Accéder au tableau de bord
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
