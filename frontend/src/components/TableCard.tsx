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
      return 'Tamamlandı';
    }
    if (table.status === 'full') {
      return 'Çekiliş...';
    }
    return 'Katılabilir';
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
        <h3 className="card-title">
          <span style={{ color: 'var(--gold-primary)' }}>#</span>{table.id}
        </h3>
        <span
          className="status-badge"
          style={statusStyle}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="card-stats">
        <div className="stat-row">
          <span style={{ color: 'var(--text-secondary)' }}>Kapasite</span>
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
            <span style={{ color: table.participants.length >= table.capacity ? '#ff4757' : 'inherit' }}>
              {table.participants.length}
            </span>
            <span style={{ color: 'var(--text-secondary)', margin: '0 4px' }}>/</span>
            {table.capacity}
          </span>
        </div>
        <div className="stat-row">
          <span style={{ color: 'var(--text-secondary)' }}>Ödül Havuzu</span>
          <span style={{ 
            color: 'var(--gold-primary)', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
          }}>
            {table.prize} 💰
          </span>
        </div>
      </div>

      {table.status === 'completed' && table.winner && (
        <div className="winner-box">
          <div style={{ color: '#00b894', fontWeight: 'bold', marginBottom: '0.3rem' }}>
            🎉 Kazanan!
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {table.winner.name || table.winner.address}
          </div>
        </div>
      )}

      {table.participants.length > 0 && (
        <div className="participants-list">
           <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Katılımcılar
          </div>
          {table.participants.map((p, idx) => (
            <div key={idx} className="participant-item">
              {p.name || p.address}
            </div>
          ))}
        </div>
      )}

      <button
        className={`join-btn ${canJoin ? "primary" : "secondary"}`}
        onClick={() => joinTable(table.id)}
        disabled={!canJoin}
        style={{
          opacity: !canJoin && table.status !== 'waiting' ? 0.5 : 1,
        }}
      >
        {isFull
          ? 'Masa Dolu'
          : table.status === 'completed'
          ? 'Tamamlandı'
          : 'Masaya Katıl (1 Para)'}
      </button>
    </div>
  );
}


