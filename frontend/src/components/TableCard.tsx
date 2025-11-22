import type { Table } from '../types';
import { useApp } from '../context/AppContext';

interface TableCardProps {
  table: Table;
}

export function TableCard({ table }: TableCardProps) {
  const { joinTable } = useApp();
  const isFull = table.participants.length >= table.capacity;
  const canJoin = !isFull && table.status === 'waiting';

  const getStatusText = () => {
    if (table.status === 'completed' && table.winner) {
      return 'Completed';
    }
    if (table.status === 'full') {
      return 'Drawing...';
    }
    return 'Open';
  };

  const getStatusStyle = () => {
    if (table.status === 'completed') {
      return { background: 'rgba(0, 184, 148, 0.2)', color: '#00b894', border: '1px solid #00b894' };
    }
    if (table.status === 'full') {
      return { background: 'rgba(255, 165, 2, 0.2)', color: '#ffa502', border: '1px solid #ffa502' };
    }
    return { background: 'rgba(212, 175, 55, 0.2)', color: '#d4af37', border: '1px solid #d4af37' };
  };

  const statusStyle = getStatusStyle();

  return (
    <div className="table-card">
      {/* Dekoratif Glow Efekti */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="card-header">
        <h3 className="card-title" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
          {table.capacity} Player Table
        </h3>
        <span
          className="status-badge"
          style={statusStyle}
        >
          {getStatusText()}
        </span>
      </div>

      <div style={{ 
        textAlign: 'center', 
        margin: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          color: 'var(--gold-primary)',
          textShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
          lineHeight: '1'
        }}>
          1 COIN
        </span>
      </div>

      {table.status === 'completed' && table.winner && (
        <div className="winner-box">
          <div style={{ color: '#00b894', fontWeight: 'bold', marginBottom: '0.3rem' }}>
            🎉 Winner!
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {table.winner.name || table.winner.address}
          </div>
        </div>
      )}

      {/* Progress Bar Section */}
      <div style={{ marginBottom: '1.5rem', marginTop: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <span>Progress</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
            {table.participants.length} / {table.capacity} Players
          </span>
        </div>
        
        <div style={{
          height: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '5px',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            height: '100%',
            width: `${(table.participants.length / table.capacity) * 100}%`,
            background: 'var(--gradient-gold)',
            borderRadius: '5px',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
          }} />
        </div>
      </div>

      <button
        className={`join-btn ${canJoin ? "primary" : "secondary"}`}
        onClick={() => joinTable(table.id)}
        disabled={!canJoin}
        style={{
          opacity: !canJoin && table.status !== 'waiting' ? 0.5 : 1,
        }}
      >
        {isFull
          ? 'Table Full'
          : table.status === 'completed'
          ? 'Completed'
          : 'Join Table (1 Coin)'}
      </button>
    </div>
  );
}


