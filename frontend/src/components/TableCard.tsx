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
    <div
      style={{
        background: 'linear-gradient(145deg, #1a1a20 0%, #15151a 100%)',
        borderRadius: '20px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="table-card"
    >
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.4rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ color: 'var(--gold-primary)' }}>#</span>{table.id}
        </h3>
        <span
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            ...statusStyle
          }}
        >
          {getStatusText()}
        </span>
      </div>

      <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.8rem',
            paddingBottom: '0.8rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Kapasite</span>
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
            <span style={{ color: table.participants.length >= table.capacity ? '#ff4757' : 'inherit' }}>
              {table.participants.length}
            </span>
            <span style={{ color: 'var(--text-secondary)', margin: '0 4px' }}>/</span>
            {table.capacity}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
        <div
          style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(0, 184, 148, 0.1) 0%, rgba(0, 184, 148, 0.05) 100%)',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(0, 184, 148, 0.3)',
            textAlign: 'center',
          }}
        >
          <div style={{ color: '#00b894', fontWeight: 'bold', marginBottom: '0.3rem' }}>
            🎉 Kazanan!
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {table.winner.name || table.winner.address}
          </div>
        </div>
      )}

      <button
        className={canJoin ? "primary" : "secondary"}
        onClick={() => joinTable(table.id)}
        disabled={!canJoin}
        style={{
          width: '100%',
          padding: '1rem',
          marginTop: 'auto',
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


