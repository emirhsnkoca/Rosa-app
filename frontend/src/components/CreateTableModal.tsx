import { useState } from 'react';
import type { TableCapacity } from '../types';
import { useRosaContract } from '../hooks/useRosaContract';

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CAPACITY_OPTIONS: TableCapacity[] = [2, 5, 10, 25, 50];
const PRICE_OPTIONS = [0.1, 0.5, 1, 2, 5]; // SUI

export function CreateTableModal({ isOpen, onClose }: CreateTableModalProps) {
  const { createTable } = useRosaContract();
  const [selectedCapacity, setSelectedCapacity] = useState<TableCapacity>(10);
  const [selectedPrice, setSelectedPrice] = useState<number>(0.1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCreate = () => {
    setIsSubmitting(true);
    // SUI -> MIST Dönüşümü (1 SUI = 1,000,000,000 MIST)
    const priceInMist = selectedPrice * 1_000_000_000;

    createTable(selectedCapacity, priceInMist, () => {
      setIsSubmitting(false);
      onClose();
    });
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
          Create New Table
        </h2>

        {/* Capacity Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Table Capacity (Players)</label>
          <div className="capacity-grid">
            {CAPACITY_OPTIONS.map((capacity) => (
              <SelectionButton
                key={capacity}
                selected={selectedCapacity === capacity}
                onClick={() => setSelectedCapacity(capacity)}
              >
                {capacity}
              </SelectionButton>
            ))}
          </div>
        </div>

        {/* Entry Price Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Entry Price (SUI)</label>
          <div className="capacity-grid">
            {PRICE_OPTIONS.map((price) => (
              <SelectionButton
                key={price}
                selected={selectedPrice === price}
                onClick={() => setSelectedPrice(price)}
              >
                {price} SUI
              </SelectionButton>
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
            disabled={isSubmitting}
            style={{ padding: '0.8rem 2rem' }}
          >
            Cancel
          </button>
          <button
            className="primary"
            onClick={handleCreate}
            disabled={isSubmitting}
            style={{
              padding: '0.8rem 2rem',
              minWidth: '120px',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Creating...' : 'Create Table'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components & Styles
const labelStyle = {
  display: 'block',
  marginBottom: '1rem',
  color: 'var(--text-secondary)',
  fontSize: '0.9rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

function SelectionButton({ children, selected, onClick }: { children: React.ReactNode, selected: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '1rem 0.5rem',
        borderRadius: '12px',
        border: selected
          ? '1px solid var(--gold-primary)'
          : '1px solid rgba(255, 255, 255, 0.1)',
        background: selected
          ? 'rgba(212, 175, 55, 0.1)'
          : 'rgba(255, 255, 255, 0.02)',
        color: selected ? 'var(--gold-primary)' : 'var(--text-secondary)',
        cursor: 'pointer',
        fontWeight: selected ? 'bold' : 'normal',
        transition: 'all 0.2s ease',
        boxShadow: selected ? '0 0 15px rgba(212, 175, 55, 0.1)' : 'none',
      }}
    >
      {children}
    </button>
  );
}
