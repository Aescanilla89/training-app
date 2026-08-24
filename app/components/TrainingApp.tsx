'use client';

import { useState, useEffect } from 'react';

const PLAN_DATA = {
  START: new Date(2026, 7, 24),
  RACE: new Date(2027, 5, 20),
  WK0: new Date(2026, 7, 20),
};

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const PHASES = [
  { id: 1, name: 'Base', from: 1, to: 7 },
  { id: 2, name: 'Construcción', from: 8, to: 17 },
  { id: 3, name: 'Fuerza', from: 18, to: 27 },
  { id: 4, name: 'Transición', from: 28, to: 35 },
  { id: 5, name: 'Afilado', from: 36, to: 39 },
  { id: 6, name: 'Carrera', from: 40, to: 43 },
];

function dayStart(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function weekOf(d: Date): number {
  d = dayStart(d);
  if (d < PLAN_DATA.WK0) return -1;
  if (d < PLAN_DATA.START) return 0;
  return Math.min(43, Math.floor((d.getTime() - PLAN_DATA.START.getTime()) / 604800000) + 1);
}

function phaseOf(w: number) {
  for (let i = 0; i < PHASES.length; i++) {
    if (w >= PHASES[i].from && w <= PHASES[i].to) return PHASES[i];
  }
  return PHASES[5];
}

export default function TrainingApp({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(weekOf(new Date()));
  const [view, setView] = useState('hoy');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const { data: fetchedData } = await res.json();
        setData(fetchedData || { weeks: {}, notes: [] });
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
      setData({ weeks: {}, notes: [] });
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newData: any) => {
    setSaving(true);
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newData }),
      });
      setData(newData);
    } catch (error) {
      console.error('Error guardando datos:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateWeekSession = (week: number, day: string, field: string, value: any) => {
    const newData = { ...data };
    if (!newData.weeks[week]) {
      newData.weeks[week] = { sessions: {}, tanita: null };
    }
    if (!newData.weeks[week].sessions[day]) {
      newData.weeks[week].sessions[day] = {};
    }
    newData.weeks[week].sessions[day][field] = value;
    saveData(newData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando plan...</p>
        </div>
      </div>
    );
  }

  const today = dayStart(new Date());
  const daysToRace = Math.max(0, Math.round((PLAN_DATA.RACE.getTime() - today.getTime()) / 86400000));
  const phase = phaseOf(currentWeek);
  const weekDate = new Date(PLAN_DATA.START.getTime() + (currentWeek - 1) * 604800000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">Semana {currentWeek}</h1>
              <p className="text-sm text-slate-400">{phase.name}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{daysToRace}</div>
              <p className="text-xs text-slate-400">días para la carrera</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 text-xs">
            <span className="text-slate-400">
              {weekDate.getDate()} {MONTHS[weekDate.getMonth()]} -{' '}
              {new Date(weekDate.getTime() + 6 * 86400000).getDate()}{' '}
              {MONTHS[new Date(weekDate.getTime() + 6 * 86400000).getMonth()]}
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          {['hoy', 'semana', 'progreso', 'ajustes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
                view === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* View: Hoy */}
        {view === 'hoy' && (
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">
                {DAYS[today.getDay()]} {today.getDate()} de {MONTHS[today.getMonth()]}
              </h2>
              <p className="text-slate-300 mb-4">
                Semana {weekOf(today)} de tu plan. {currentWeek > 43 ? '¡Plan completado!' : `${43 - currentWeek} semanas restantes.`}
              </p>
              <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-4 text-sm text-slate-200">
                <p>📝 Aquí verás hoy la sesión de entrenamiento, registros de hábitos y progreso de la semana.</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4">Sesión de hoy</h3>
              <div className="text-slate-400">
                <p>Los entrenamientos se mostrarán según el día de la semana.</p>
              </div>
            </div>
          </div>
        )}

        {/* View: Semana */}
        {view === 'semana' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
              >
                ← Anterior
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold">Semana {currentWeek}</h2>
                <p className="text-sm text-slate-400">{phase.name}</p>
              </div>
              <button
                onClick={() => setCurrentWeek(Math.min(43, currentWeek + 1))}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition"
              >
                Siguiente →
              </button>
            </div>

            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-4 text-sm">
              <p>📋 Las sesiones de la semana se mostrarán aquí (Lunes, Martes, Viernes, Fin de semana)</p>
            </div>
          </div>
        )}

        {/* View: Progreso */}
        {view === 'progreso' && (
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Progreso general</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-700 rounded p-4">
                  <p className="text-xs text-slate-400 uppercase">Semana actual</p>
                  <p className="text-2xl font-bold text-blue-400">{currentWeek}/43</p>
                </div>
                <div className="bg-slate-700 rounded p-4">
                  <p className="text-xs text-slate-400 uppercase">Progreso</p>
                  <p className="text-2xl font-bold text-green-400">{Math.round((currentWeek / 43) * 100)}%</p>
                </div>
                <div className="bg-slate-700 rounded p-4">
                  <p className="text-xs text-slate-400 uppercase">Falta</p>
                  <p className="text-2xl font-bold text-orange-400">{43 - currentWeek}</p>
                </div>
                <div className="bg-slate-700 rounded p-4">
                  <p className="text-xs text-slate-400 uppercase">Fase</p>
                  <p className="text-lg font-bold">{phase.name}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-2">📊 Gráficos de seguimiento</h3>
              <p className="text-sm text-slate-400">Los gráficos de peso, composición corporal y cargas se mostrarán aquí cuando registres datos.</p>
            </div>
          </div>
        )}

        {/* View: Ajustes */}
        {view === 'ajustes' && (
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">⚙️ Ajustes y configuración</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">PIN actual</label>
                  <p className="text-xs text-slate-400">Configurable desde Vercel (variable de entorno PIN)</p>
                </div>
                <div className="bg-amber-900 bg-opacity-30 border border-amber-700 rounded p-3 text-sm">
                  💾 Los datos se guardan automáticamente y se sincronizan entre dispositivos
                </div>
              </div>
            </div>

            {saving && (
              <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-4 text-sm flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                Guardando cambios...
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom navigation indicator */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-700 px-4 py-3">
        <p className="text-xs text-center text-slate-500">
          {saving && 'Sincronizando datos...'}
          {!saving && 'Datos sincronizados'}
        </p>
      </div>
    </div>
  );
}
