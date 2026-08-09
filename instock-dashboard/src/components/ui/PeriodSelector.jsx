import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import './PeriodSelector.css';

const OPTIONS = ['7 derniers jours', '30 derniers jours', 'Ce trimestre', 'Cette année'];

export default function PeriodSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(OPTIONS[1]);

  return (
    <div className="period-selector">
      <button
        type="button"
        className={`period-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Calendar size={16} strokeWidth={1.8} />
        <span>{selected}</span>
        <ChevronDown size={15} className="period-chevron" strokeWidth={2} />
      </button>

      {open && (
        <div className="period-menu">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`period-option ${opt === selected ? 'active' : ''}`}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
