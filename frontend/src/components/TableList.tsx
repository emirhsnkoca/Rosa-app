import { useApp } from '../context/AppContext';
import { TableCard } from './TableCard';

export function TableList() {
  const { state } = useApp();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap', // Mobilde başlıklar sarabilir
          gap: '1rem'
        }}
      >
        <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Açık Masalar</h2>
        <span style={{ color: 'var(--text-secondary)' }}>
          {state.tables.length} masa mevcut
        </span>
      </div>

      <div className="table-grid">
        {state.tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>

      {state.tables.length === 0 && (
        <div className="empty-state">
          Henüz açık masa yok. İlk masayı oluşturun!
        </div>
      )}
    </div>
  );
}


