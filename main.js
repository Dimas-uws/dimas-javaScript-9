// async maksudnya adalah menjalankan fungsi secara asynchronous
// karena defaultnya, javascript menjalankan fungsi secara synchrounous atau blocking, artinya, ketika banyak fungsi dijalankan, fungsi tersebut harus 'mengantri'. Jika salah satu fungsi tidak berjalan atau berjalan lambat, maka fungsi fungsi setelahnya, tidak akan jalan.

async function fetchData() {
    // fungsi yang akan dijalankan, masuk ke dalam try { }
    try {
        // CARA PERTAMA: Mengambil data dari API external
        // await adalah pasangan dari async. tanpa async, tidak akan bisa jalan
        const res = await fetch('https://fakestoreapi.com/products/');
        // res akan berisi informasi terkait url yang di-fetch, maka harus diolah lagi dengan .json()
        const data = await res.json();

        // CARA KEDUA: Menampilkan data ke dalam UI
        renderProducts(data)
        console.log(data)
    }
    // catch berfungsi untuk memberitahu dev/user ketika ada error
    catch (error) {
        console.log('GAGAL EUI!!!', error)
    }
}


const productContainer = document.querySelector('.products-list');

function renderProducts(products) {
    productContainer.innerHTML = ""
    products.forEach(product => {
        // 1. buatkan sebuah div dengan javascript
        const div = document.createElement('div');

        // 2. div nya dikasih class dengan javascript
        div.classList.add("card");

        const hargaRupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price * 17000)
        // 3. 
        div.innerHTML = `
            <img src=${product.image}>
            <h3>${product.title}</>
            <p>${hargaRupiah}</p>
            <p>${product.description}</p>

        `

        // 4. appendChild akan memasukkan proses 1 sampai 3 tanpa harus menghapus sebelumnya
        productContainer.appendChild(div)
    }

    )
}

fetchData()


const buttons = document.querySelectorAll(".btn-label");

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const categoryValue = btn.getAttribute('data-category')
        console.log(categoryValue)
        buttons.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        if (categoryValue === "all") {
            fetchData()
        } else {
            getByCategory(categoryValue)
        }
    })
})

async function getByCategory(category) {
    try {
        const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
        const response = await fetch(url);
        const data = await response.json()
        renderProducts(data)

    } catch (error) {
        console.error(`gagal loading kategori ${category}`, error)
    }
}
