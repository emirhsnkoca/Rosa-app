import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TableList } from './components/TableList';
import { CreateTableModal } from './components/CreateTableModal';
import './App.css';

function AppContent() {
  const { state } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4rem',
          padding: '1.5rem 2rem',
          background: 'rgba(26, 26, 32, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 55, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🎰</span>
          <h1 style={{ 
            margin: 0, 
            fontSize: '2.5rem', 
            background: 'var(--gradient-gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
          }}>
            Rosa Lottery
          </h1>
        </div>
        
        <button
          className="secondary"
          onClick={() => setIsCreateModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            padding: '0.8rem 1.5rem'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>+</span> Yeni Masa
        </button>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <TableList />
      </div>

      <CreateTableModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
