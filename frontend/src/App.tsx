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
          marginBottom: '3rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #333',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#646cff' }}>
          🎰 Rosa Lottery
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            border: '1px solid #646cff',
            backgroundColor: 'transparent',
            color: '#646cff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          + Yeni Masa
        </button>
      </header>

      <TableList />

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
