export interface User {
  address: string;
  name?: string;
}

export type TableCapacity = 2 | 5 | 10 | 25 | 50;

export interface Table {
  id: string;
  capacity: TableCapacity;
  participants: User[];
  status: 'waiting' | 'full' | 'drawing' | 'completed';
  winner?: User;
  prize: number;
  createdAt: number;
}

