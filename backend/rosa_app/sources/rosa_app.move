module rosa_app::rosa_app {
    use sui::sui::SUI;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::random::{Self, Random};
    use sui::event;

    /// Hata Kodları
    const E_INSUFFICIENT_PAYMENT: u64 = 0;
    const E_TABLE_FULL: u64 = 1;
    const E_TABLE_ALREADY_COMPLETED: u64 = 2;

    /// Platform komisyon oranı (Binde 25 = %2.5)
    const FEE_BASIS_POINTS: u64 = 250; 

    /// Masa Yapısı
    /// Her bir masa birer "Shared Object" (Paylaşılan Nesne) olacak.
    public struct Table has key, store {
        id: UID,
        capacity: u64,           // Örn: 10
        entry_price: u64,        // Örn: 0.1 SUI (MIST cinsinden)
        participants: vector<address>,
        balance: Balance<SUI>,   // Toplanan paralar burada birikir
        status: u8,              // 0: Aktif, 1: Tamamlandı
    }

    /// Olaylar (Events) - Frontend'in dinlemesi için
    public struct TableCreated has copy, drop {
        table_id: ID,
        capacity: u64,
        entry_price: u64,
        creator: address,
    }

    public struct ParticipantJoined has copy, drop {
        table_id: ID,
        participant: address,
        current_count: u64,
    }

    public struct WinnerSelected has copy, drop {
        table_id: ID,
        winner: address,
        prize_amount: u64,
        fee_amount: u64,
    }

    /// Modül yüklendiğinde çalışır (Gerekirse admin objeleri eklenebilir)
    fun init(_ctx: &mut TxContext) {
        // Şimdilik özel bir başlatma gerekmiyor
    }

    // =========================================================================
    //                            FONKSİYONLAR
    // =========================================================================

    /// Yeni bir masa oluşturur
    /// `capacity`: Kaç kişi katılacak?
    /// `entry_price`: Giriş ücreti ne kadar? (MIST cinsinden, 1 SUI = 1_000_000_000 MIST)
    entry fun create_table(
        capacity: u64, 
        entry_price: u64, 
        ctx: &mut TxContext
    ) {
        let id = object::new(ctx);
        let table_id = object::uid_to_inner(&id);

        let table = Table {
            id,
            capacity,
            entry_price,
            participants: vector::empty(),
            balance: balance::zero(),
            status: 0, // 0: Aktif
        };

        // Masayı herkesin erişebileceği (Shared) bir obje olarak paylaşıyoruz
        transfer::share_object(table);

        // Event fırlat
        event::emit(TableCreated {
            table_id,
            capacity,
            entry_price,
            creator: tx_context::sender(ctx)
        });
    }

    /// Masaya katılma fonksiyonu
    /// Masa dolarsa otomatik olarak kazananı belirler.
    /// `r`: Sui Randomness nesnesi (0x8)
    entry fun join_table(
        table: &mut Table,
        payment: Coin<SUI>,
        r: &Random,
        ctx: &mut TxContext
    ) {
        // 1. Kontroller
        assert!(table.status == 0, E_TABLE_ALREADY_COMPLETED);
        assert!(vector::length(&table.participants) < table.capacity, E_TABLE_FULL);
        
        let payment_value = coin::value(&payment);
        assert!(payment_value == table.entry_price, E_INSUFFICIENT_PAYMENT);

        // 2. Parayı masanın kasasına koy
        let coin_balance = coin::into_balance(payment);
        balance::join(&mut table.balance, coin_balance);

        // 3. Katılımcıyı listeye ekle
        let sender = tx_context::sender(ctx);
        vector::push_back(&mut table.participants, sender);

        event::emit(ParticipantJoined {
            table_id: object::uid_to_inner(&table.id),
            participant: sender,
            current_count: vector::length(&table.participants),
        });

        // 4. Masa doldu mu? Dolduysa çekilişi yap!
        if (vector::length(&table.participants) == table.capacity) {
            pick_winner(table, r, ctx);
        }
    }

    /// Kazananı belirleyen iç fonksiyon (Private)
    /// Sadece `join_table` tarafından çağrılır.
    fun pick_winner(
        table: &mut Table,
        r: &Random,
        ctx: &mut TxContext
    ) {
        // Rastgele sayı üreteci oluştur
        let mut generator = random::new_generator(r, ctx);
        
        // 0 ile (kapasite - 1) arasında rastgele bir index seç
        let random_index = random::generate_u64_in_range(&mut generator, 0, table.capacity - 1);
        
        // Kazananı belirle
        let winner = *vector::borrow(&table.participants, random_index);

        // Ödül dağıtımı
        let total_balance = balance::value(&table.balance);
        
        // Komisyon hesapla (Örn: %2.5)
        let fee_amount = (total_balance * FEE_BASIS_POINTS) / 10000;
        let prize_amount = total_balance - fee_amount;

        // Ödülü kazananın hesabına gönder
        let prize_coin = coin::take(&mut table.balance, prize_amount, ctx);
        transfer::public_transfer(prize_coin, winner);

        // Komisyonu şimdilik masada bırakıyoruz veya admin adresine gönderebiliriz.
        // Basitlik için komisyonu masanın bakiyesinde bırakıyorum (daha sonra çekilebilir).
        // Veya yakabiliriz. Şimdilik "House" mantığı için masada kalsın.

        // Masayı tamamlandı olarak işaretle
        table.status = 1;

        event::emit(WinnerSelected {
            table_id: object::uid_to_inner(&table.id),
            winner,
            prize_amount,
            fee_amount
        });
    }
}
