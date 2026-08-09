import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import useDarkMode from './hooks/useDarkMode.js';

export default function App() {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <Dashboard />
    </>
  );
}
