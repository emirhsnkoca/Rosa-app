import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Table } from '../types';

export interface AppState {
  tables: Table[];
}

interface AppContextType {
  state: AppState;
  joinTable: (tableId: string) => void;
  createTable: (capacity: Table['capacity']) => void;
  drawWinner: (tableId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateMockUser = (): User => {
  const randomId = Math.random().toString(36).substring(2, 9);
  return {
    address: `user_${randomId}`,
    name: `User_${randomId}`,
  };
};

const initialTables: Table[] = [
  {
    id: '1',
    capacity: 10,
    participants: [],
    status: 'waiting',
    prize: 0,
    createdAt: Date.now(),
  },
  {
    id: '2',
    capacity: 5,
    participants: [],
    status: 'waiting',
    prize: 0,
    createdAt: Date.now(),
  },
  {
    id: '3',
    capacity: 25,
    participants: [],
    status: 'waiting',
    prize: 0,
    createdAt: Date.now(),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    tables: initialTables,
  });

  const drawWinner = (tableId: string) => {
    setState((prev) => {
      const updatedTables = prev.tables.map((table) => {
        if (table.id === tableId && table.status === 'full') {
          if (table.participants.length === 0) {
            return table;
          }

          // Rastgele kazanan seç
          const randomIndex = Math.floor(
            Math.random() * table.participants.length
          );
          const winner = table.participants[randomIndex];

          return {
            ...table,
            status: 'completed' as const,
            winner,
          };
        }
        return table;
      });

      return {
        ...prev,
        tables: updatedTables,
      };
    });
  };

  const joinTable = (tableId: string) => {
    setState((prev) => {
      let shouldDraw = false;
      const newUser = generateMockUser();
      
      const updatedTables = prev.tables.map((table) => {
        if (table.id === tableId) {
          // Masa dolu mu kontrol et
          if (table.participants.length >= table.capacity) {
            alert('This table is full!');
            return table;
          }

          // Masa tamamlanmış mı kontrol et
          if (table.status === 'completed') {
            alert('This table is already completed!');
            return table;
          }

          // Kullanıcıyı ekle ve ödülü artır
          const newParticipants = [...table.participants, newUser];
          const newPrize = newParticipants.length;
          const isFull = newParticipants.length >= table.capacity;
          
          if (isFull) {
            shouldDraw = true;
          }

          return {
            ...table,
            participants: newParticipants,
            prize: newPrize,
            status: (isFull ? 'full' : 'waiting') as 'full' | 'waiting',
          };
        }
        return table;
      });

      // Masa dolduysa otomatik çekiliş başlat
      if (shouldDraw) {
        setTimeout(() => {
          drawWinner(tableId);
        }, 1000);
      }

      return {
        ...prev,
        tables: updatedTables,
      };
    });
  };

  const createTable = (capacity: Table['capacity']) => {
    const newTable: Table = {
      id: Date.now().toString(),
      capacity,
      participants: [],
      status: 'waiting',
      prize: 0,
      createdAt: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      tables: [...prev.tables, newTable],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        joinTable,
        createTable,
        drawWinner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

