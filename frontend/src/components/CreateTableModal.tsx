import { useState } from 'react';
import type { TableCapacity } from '../types';
import { useApp } from '../context/AppContext';

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CAPACITY_OPTIONS: TableCapacity[] = [2, 5, 10, 25, 50];

export function CreateTableModal({ isOpen, onClose }: CreateTableModalProps) {
  const { createTable } = useApp();
  const [selectedCapacity, setSelectedCapacity] = useState<TableCapacity>(10);

  if (!isOpen) return null;

  const handleCreate = () => {
    createTable(selectedCapacity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '2rem',
          fontSize: '1.8rem',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          Yeni Masa Oluştur
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Masa Kapasitesi
          </label>
          <div className="capacity-grid">
            {CAPACITY_OPTIONS.map((capacity) => (
              <button
                key={capacity}
                onClick={() => setSelectedCapacity(capacity)}
                style={{
                  padding: '1rem 0.5rem',
                  borderRadius: '12px',
                  border:
                    selectedCapacity === capacity
                      ? '1px solid var(--gold-primary)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  background:
                    selectedCapacity === capacity 
                      ? 'rgba(212, 175, 55, 0.1)' 
                      : 'rgba(255, 255, 255, 0.02)',
                  color: selectedCapacity === capacity ? 'var(--gold-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: selectedCapacity === capacity ? 'bold' : 'normal',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedCapacity === capacity ? '0 0 15px rgba(212, 175, 55, 0.1)' : 'none',
                }}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>

        <div
          className="modal-actions"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            marginTop: '3rem',
          }}
        >
          <button
            className="secondary"
            onClick={onClose}
            style={{
              padding: '0.8rem 2rem',
            }}
          >
            İptal
          </button>
          <button
            className="primary"
            onClick={handleCreate}
            style={{
              padding: '0.8rem 2rem',
              minWidth: '120px',
            }}
          >
            Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}


