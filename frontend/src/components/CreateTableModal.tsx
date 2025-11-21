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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #333',
          minWidth: '400px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginTop: 0 }}>Yeni Masa Oluştur</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#888',
            }}
          >
            Masa Kapasitesi:
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
            }}
          >
            {CAPACITY_OPTIONS.map((capacity) => (
              <button
                key={capacity}
                onClick={() => setSelectedCapacity(capacity)}
                style={{
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border:
                    selectedCapacity === capacity
                      ? '2px solid #646cff'
                      : '1px solid #333',
                  backgroundColor:
                    selectedCapacity === capacity ? '#646cff' : '#1a1a1a',
                  color: selectedCapacity === capacity ? 'white' : '#aaa',
                  cursor: 'pointer',
                  fontWeight: selectedCapacity === capacity ? 'bold' : 'normal',
                }}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#1a1a1a',
              color: '#aaa',
              cursor: 'pointer',
            }}
          >
            İptal
          </button>
          <button
            onClick={handleCreate}
            style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#646cff',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}


