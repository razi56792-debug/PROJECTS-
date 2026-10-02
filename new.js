// ===============================
// DATA KERANJANG
// ===============================

let keranjang = [];


// ===============================
// FORMAT RUPIAH
// ===============================

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}


// ===============================
// TAMBAH PRODUK
// ===============================

function tambahKeranjang(nama, harga) {

    keranjang.push({
        nama: nama,
        harga: harga
    });

    updateKeranjang();

    alert(nama + " berhasil ditambahkan ke keranjang!");
}


// ===============================
// UPDATE KERANJANG
// ===============================

function updateKeranjang() {

    const jumlah = document.getElementById("jumlahKeranjang");

    jumlah.textContent = keranjang.length;

    tampilkanKeranjang();
}


// ===============================
// TAMPILKAN KERANJANG
// ===============================

function tampilkanKeranjang() {

    const isi = document.getElementById("isiKeranjang");
    const totalHarga = document.getElementById("totalHarga");

    isi.innerHTML = "";

    let total = 0;

    if (keranjang.length === 0) {

        isi.innerHTML = `
            <p style="text-align:center; padding:30px;">
                Keranjang masih kosong 🛒
            </p>
        `;

        totalHarga.textContent = "Rp0";

        return;
    }

    keranjang.forEach((produk, index) => {

        total += produk.harga;

        isi.innerHTML += `
            <div class="item-keranjang">

                <div>
                    <strong>${produk.nama}</strong>
                    <br>
                    <small>${formatRupiah(produk.harga)}</small>
                </div>

                <button
                    class="hapus"
                    onclick="hapusProduk(${index})">
                    Hapus
                </button>

            </div>
        `;
    });

    totalHarga.textContent = formatRupiah(total);
}


// ===============================
// HAPUS PRODUK
// ===============================

function hapusProduk(index) {

    keranjang.splice(index, 1);

    updateKeranjang();
}


// ===============================
// BUKA KERANJANG
// ===============================

function bukaKeranjang() {

    document.getElementById("modalKeranjang").style.display = "flex";

    tampilkanKeranjang();
}


// ===============================
// TUTUP KERANJANG
// ===============================

function tutupKeranjang() {

    document.getElementById("modalKeranjang").style.display = "none";
}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (keranjang.length === 0) {

        alert("Keranjang kamu masih kosong!");

        return;
    }

    alert(
        "Terima kasih sudah berbelanja di RAZIFASHION! 🛍️"
    );

    keranjang = [];

    updateKeranjang();

    tutupKeranjang();
}


// ===============================
// FILTER PRODUK
// ===============================

function filterProduk(kategori) {

    const produk = document.querySelectorAll(".produk-card");

    produk.forEach(item => {

        const kategoriProduk = item.dataset.kategori;

        if (
            kategori === "semua" ||
            kategoriProduk === kategori
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });
}


// ===============================
// FORM KONTAK
// ===============================

function kirimPesan(event) {

    event.preventDefault();

    const nama = document.getElementById("nama").value;

    alert(
        "Terima kasih, " +
        nama +
        "! Pesan kamu berhasil dikirim."
    );

    document.querySelector("form").reset();
}


// ===============================
// KLIK DI LUAR MODAL
// ===============================

window.onclick = function(event) {

    const modal = document.getElementById("modalKeranjang");

    if (event.target === modal) {

        tutupKeranjang();

    }

};