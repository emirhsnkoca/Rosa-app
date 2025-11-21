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
        }}
      >
        <h2 style={{ margin: 0 }}>Açık Masalar</h2>
        <span style={{ color: '#888' }}>
          {state.tables.length} masa mevcut
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {state.tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>

      {state.tables.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#888',
          }}
        >
          Henüz açık masa yok. İlk masayı oluşturun!
        </div>
      )}
    </div>
  );
}


