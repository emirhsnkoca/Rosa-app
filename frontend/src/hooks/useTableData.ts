import { useSuiClient } from '@mysten/dapp-kit';
import type { Table, TableCreatedEvent, WinnerSelectedEvent } from '../types';
import { useQuery } from '@tanstack/react-query';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
const MODULE_NAME = import.meta.env.VITE_MODULE_NAME;

// 1. Eventlerden Masa ID'lerini bulur
export function useTableEvents() {
  const client = useSuiClient();

  return useQuery({
    queryKey: ['table-events'],
    queryFn: async () => {
      const events = await client.queryEvents({
        query: {
          MoveModule: {
            package: PACKAGE_ID,
            module: MODULE_NAME,
          },
        },
        limit: 50,
        order: 'descending',
      });

      // TableCreated eventlerini filtrele
      const createdTables = events.data
        .filter((e) => e.type.includes('::TableCreated'))
        .map((e) => e.parsedJson as unknown as TableCreatedEvent);

      return createdTables;
    },
    refetchInterval: 2000, // 2 saniyede bir yeni event var mı kontrol et
  });
}

// 2. Masa ID'lerini ve Kazananları Çeker
export function useTables() {
  const client = useSuiClient();
  const { data: tableEvents } = useTableEvents();

  return useQuery({
    queryKey: ['tables', tableEvents?.length],
    queryFn: async () => {
      if (!tableEvents || tableEvents.length === 0) return [];

      const tableIds = tableEvents.map((t) => t.table_id);

      // 1. Masaların güncel durumunu çek
      const objectsPromise = client.multiGetObjects({
        ids: tableIds,
        options: { showContent: true },
      });

      // 2. Kazanan eventlerini çek (Sadece bitmiş masalar için gerekli ama hepsini çekip filtrelemek daha kolay)
      const winnerEventsPromise = client.queryEvents({
        query: {
          MoveModule: {
            package: PACKAGE_ID,
            module: MODULE_NAME,
          },
        },
        limit: 50, 
        order: 'descending',
      });

      const [objects, winnerEventsResult] = await Promise.all([objectsPromise, winnerEventsPromise]);

      // Winner eventlerini map'le: TableID -> WinnerAddress
      const winnersMap = new Map<string, string>();
      winnerEventsResult.data.forEach((e) => {
        if (e.type.includes('::WinnerSelected')) {
          const payload = e.parsedJson as unknown as WinnerSelectedEvent;
          winnersMap.set(payload.table_id, payload.winner);
        }
      });

      // Masaları oluştur ve winner bilgisini ekle
      const tables: Table[] = objects
        .map((obj) => {
          const content = obj.data?.content as any;
          if (!content || content.dataType !== 'moveObject') return null;

          const fields = content.fields;
          const tableId = fields.id.id;
          const winnerAddress = winnersMap.get(tableId);

          return {
            id: tableId,
            capacity: Number(fields.capacity),
            entryPrice: Number(fields.entry_price),
            participants: fields.participants || [],
            status: fields.status, 
            balance: fields.balance,
            winner: winnerAddress ? { address: winnerAddress, name: `${winnerAddress.slice(0,6)}...${winnerAddress.slice(-4)}` } : undefined
          };
        })
        .filter((t): t is Table => t !== null);

      return tables;
    },
    enabled: !!tableEvents && tableEvents.length > 0,
    refetchInterval: 2000, // 2 saniyede bir masa durumlarını (doluluk, kazanan) güncelle
  });
}

