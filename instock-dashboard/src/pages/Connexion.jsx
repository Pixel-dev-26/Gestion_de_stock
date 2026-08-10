import { useState } from 'react';
import { ArrowLeft, BarChart3, Box, Eye, EyeOff, LockKeyhole, Mail, Moon, ShieldCheck, Sun } from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode.js';
import './Connexion.css';

const benefits = [
  { icon: Box, text: 'Suivez vos stocks en temps réel, entrepôt par entrepôt.' },
  { icon: BarChart3, text: 'Analysez vos performances avec des indicateurs clairs.' },
  { icon: ShieldCheck, text: 'Protégez vos données avec des accès adaptés à chaque rôle.' },
];

function validateForm(values) {
  const nextErrors = {};
  const email = values.email.trim();

  if (!email) {
    nextErrors.email = "L'adresse e-mail est obligatoire.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nextErrors.email = "Saisissez une adresse e-mail valide.";
  }

  if (!values.password) {
    nextErrors.password = 'Le mot de passe est obligatoire.';
  }

  return nextErrors;
}

export default function Connexion() {
  const { isDark, toggleTheme } = useDarkMode();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (touched[name]) {
      setErrors(validateForm(nextValues));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const nextTouched = { ...touched, [name]: true };
    setTouched(nextTouched);
    setErrors(validateForm(values));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setTouched({ email: true, password: true });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-showcase" aria-label="Présentation d'InStock">
        <div className="showcase-grid" aria-hidden="true" />
        <a className="auth-brand" href="/" aria-label="Retour à l'accueil InStock">
          <span className="brand-mark"><Box size={21} strokeWidth={2.4} /></span>
          <span>InStock</span>
        </a>

        <div className="showcase-content">
          <span className="showcase-kicker">Votre stock, en mouvement</span>
          <h1>La gestion de stock, enfin simple et claire.</h1>
          <p>Retrouvez vos produits, vos mouvements et vos indicateurs clés sur une seule plateforme pensée pour vos entrepôts.</p>
          <ul className="benefit-list">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className="benefit-icon"><Icon size={17} strokeWidth={2} /></span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="showcase-footer">
          <span className="footer-pulse" />
          Une vision nette de votre activité
        </div>
      </section>

      <section className="auth-panel" aria-labelledby="login-title">
        <button
          type="button"
          className="auth-theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
          aria-pressed={isDark}
        >
          <span className={`auth-theme-icon ${isDark ? 'is-hidden' : ''}`} aria-hidden="true">
            <Sun size={18} strokeWidth={1.8} />
          </span>
          <span className={`auth-theme-icon auth-theme-icon-moon ${isDark ? '' : 'is-hidden'}`} aria-hidden="true">
            <Moon size={18} strokeWidth={1.8} />
          </span>
        </button>
        <a className="back-link" href="/" aria-label="Retour à l'accueil">
          <ArrowLeft size={16} /> Retour à l'accueil
        </a>
        <div className="auth-card">
          <div className="mobile-brand auth-brand">
            <span className="brand-mark"><Box size={19} strokeWidth={2.4} /></span>
            <span>InStock</span>
          </div>
          <div className="auth-heading">
            <span className="eyebrow">Espace sécurisé</span>
            <h2 id="login-title">Connexion</h2>
            <p>Accédez à votre espace de gestion de stock.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className={`field ${errors.email && touched.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Adresse e-mail</label>
              <div className="input-wrap">
                <Mail size={18} aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="vous@entreprise.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email && touched.email)}
                  aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && touched.email && <p className="field-error" id="email-error">{errors.email}</p>}
            </div>

            <div className={`field ${errors.password && touched.password ? 'has-error' : ''}`}>
              <label htmlFor="password">Mot de passe</label>
              <div className="input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Votre mot de passe"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password && touched.password)}
                  aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && touched.password && <p className="field-error" id="password-error">{errors.password}</p>}
            </div>

            <div className="form-options">
              <label className="remember-option">
                <input type="checkbox" name="remember" />
                <span className="checkbox-ui" aria-hidden="true" />
                <span>Se souvenir de moi</span>
              </label>
              <a href="mailto:support@instock.app?subject=Mot%20de%20passe%20oubli%C3%A9">Mot de passe oublié ?</a>
            </div>

            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><span className="button-spinner" aria-hidden="true" /> Connexion en cours...</> : 'Se connecter'}
            </button>
            <p className="form-note">L'authentification sera activée dès le branchement de l'API backend.</p>
          </form>
        </div>
      </section>
    </main>
  );
}
