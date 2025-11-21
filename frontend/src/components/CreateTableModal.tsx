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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(145deg, #1a1a20 0%, #15151a 100%)',
          padding: '2.5rem',
          borderRadius: '20px',
          border: '1px solid rgba(212, 175, 55, 0.1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          minWidth: '450px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.8rem',
            }}
          >
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


