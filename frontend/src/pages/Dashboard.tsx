import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TableList } from '../components/TableList';
import { CreateTableModal } from '../components/CreateTableModal';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { state } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="header-logo-group">
            <img 
              src="/rosa-logo.png" 
              alt="Rosa Logo" 
              style={{ 
                height: '60px', 
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))'
              }} 
            />
            <h1 className="header-title">
              Rosa Lottery
            </h1>
          </div>
        </Link>
        
        <button
          className="secondary new-table-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <span style={{ fontSize: '1.2rem' }}>+</span> New Table
        </button>
      </header>

      <div style={{ width: '100%' }}>
        <TableList />
      </div>

      <CreateTableModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
