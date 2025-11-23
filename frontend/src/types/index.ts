export interface User {
  address: string;
  name?: string;
}

export type TableCapacity = 2 | 5 | 10 | 25 | 50;

// Move'daki Table struct'ına karşılık gelen yapı
export interface Table {
  id: string;              // Table Object ID
  capacity: number;        // u64
  entryPrice: number;      // u64 (MIST)
  participants: string[];  // vector<address>
  status: number;          // u8 (0: Active, 1: Completed)
  balance?: number;        // Balance<SUI> (opsiyonel, onchain veriden gelir)
  winner?: User;           // Frontend tarafında event ile doldurulur
}

// Event Tipleri
export interface TableCreatedEvent {
  table_id: string;
  capacity: string;     // Blockchain'den gelen u64 string olarak döner
  entry_price: string;
  creator: string;
}

export interface ParticipantJoinedEvent {
  table_id: string;
  participant: string;
  current_count: string;
}

export interface WinnerSelectedEvent {
  table_id: string;
  winner: string;
  prize_amount: string;
  fee_amount: string;
}
