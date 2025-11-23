import { Transaction } from '@mysten/sui/transactions';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { useQueryClient } from '@tanstack/react-query';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
const MODULE_NAME = import.meta.env.VITE_MODULE_NAME;
const SUI_RANDOM_ID = import.meta.env.VITE_SUI_RANDOM_ID;

export function useRosaContract() {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const queryClient = useQueryClient();

  // Yardımcı fonksiyon: Verileri yenile
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['table-events'] });
    queryClient.invalidateQueries({ queryKey: ['tables'] });
  };

  // Masa Oluşturma Fonksiyonu
  const createTable = (capacity: number, entryPriceMist: number, onSuccess?: () => void) => {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::create_table`,
      arguments: [
        tx.pure.u64(capacity),
        tx.pure.u64(entryPriceMist),
      ],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log('Table created:', result);
          invalidateQueries(); // Verileri yenile
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          console.error('Failed to create table:', error);
        },
      }
    );
  };

  // Masaya Katılma Fonksiyonu
  const joinTable = (tableId: string, entryPriceMist: number, onSuccess?: () => void) => {
    const tx = new Transaction();

    // 1. Ödeme için coin'i böl (Split Coin)
    const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(entryPriceMist)]);

    // 2. join_table fonksiyonunu çağır
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::join_table`,
      arguments: [
        tx.object(tableId),     // table: &mut Table
        paymentCoin,            // payment: Coin<SUI>
        tx.object(SUI_RANDOM_ID) // r: &Random (0x8)
      ],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log('Joined table:', result);
          invalidateQueries(); // Verileri yenile
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          console.error('Failed to join table:', error);
        },
      }
    );
  };

  return {
    createTable,
    joinTable,
  };
}

