order

1.validasi input untuk order(car_id, start, end, id_driver) 2. mengambil data mobil sesuai car_id dan di cek apakah tersedia ? 3. kalau mobil tidak tersedia maka transaksi gagal 4. hitung total harga dari perhitungan (price x end_time_start) 5. generate invoice 6. ambil user_id dari req user 7. is_expired = false 8. status = pending 9. masukkan data order ke DB 10. update status cars is_available = false 11. kirim response ke user
