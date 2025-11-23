import { useTables } from '../hooks/useTableData';
import { TableCard } from './TableCard';

export function TableList() {
  const { data: tables, isLoading, error } = useTables();

  if (isLoading) {
    return <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>Loading tables from blockchain...</div>;
  }

  if (error) {
    return <div style={{ color: 'var(--error-color)', textAlign: 'center', padding: '2rem' }}>Error loading tables.</div>;
  }

  const activeTables = tables || [];

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
        <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Active Tables</h2>
        <span style={{ color: 'var(--text-secondary)' }}>
          {activeTables.length} tables available
        </span>
      </div>

      <div className="table-grid">
        {activeTables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>

      {activeTables.length === 0 && (
        <div className="empty-state">
          No active tables yet. Create the first one!
        </div>
      )}
    </div>
  );
}


