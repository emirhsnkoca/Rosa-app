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
      return 'Çekiliş Yapılıyor...';
    }
    return 'Katılabilir';
  };

  const getStatusColor = () => {
    if (table.status === 'completed') {
      return '#4caf50';
    }
    if (table.status === 'full') {
      return '#ff9800';
    }
    return '#646cff';
  };

  return (
    <div
      style={{
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '1.5rem',
        backgroundColor: '#1a1a1a',
        minWidth: '300px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h3 style={{ margin: 0 }}>Masa #{table.id}</h3>
        <span
          style={{
            padding: '0.3rem 0.8rem',
            borderRadius: '20px',
            backgroundColor: getStatusColor(),
            fontSize: '0.8rem',
            color: 'white',
          }}
        >
          {getStatusText()}
        </span>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{ color: '#888' }}>Kapasite:</span>
          <span>
            {table.participants.length} / {table.capacity}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{ color: '#888' }}>Ödül:</span>
          <span style={{ color: '#4caf50', fontWeight: 'bold' }}>
            {table.prize} Para
          </span>
        </div>
      </div>

      {table.status === 'completed' && table.winner && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#2a2a2a',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '2px solid #4caf50',
          }}
        >
          <div style={{ color: '#4caf50', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🎉 Kazanan!
          </div>
          <div style={{ fontSize: '0.9rem', color: '#888' }}>
            {table.winner.name || table.winner.address.slice(0, 10)}...
          </div>
          <div style={{ fontSize: '0.8rem', color: '#646cff', marginTop: '0.3rem' }}>
            {table.winner.address}
          </div>
        </div>
      )}

      {table.participants.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Katılımcılar:
          </div>
          <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
            {table.participants.map((p, idx) => (
              <div key={idx} style={{ marginBottom: '0.2rem' }}>
                {p.name || p.address}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => joinTable(table.id)}
        disabled={!canJoin}
        style={{
          width: '100%',
          padding: '0.8rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: canJoin ? '#646cff' : '#333',
          color: canJoin ? 'white' : '#666',
          cursor: canJoin ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
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


