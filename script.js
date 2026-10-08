// ===============================
// CHEESEYMELO JAVASCRIPT
// ===============================

let cart = [];

// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {
  const nav = document.getElementById("navMenu");

  nav.classList.toggle("active");
}

// Tutup menu setelah memilih halaman
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active");
  });
});

// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price) {
  const existingProduct = cart.find((item) => item.name === name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateCart();

  showNotification(`${name} ditambahkan ke keranjang 🤎`);
}

// ===============================
// UPDATE CART
// ===============================

function updateCart() {
  const cartCount = document.getElementById("cartCount");

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = totalItems;

  const cartItems = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang masih kosong.
            </p>
        `;

    document.getElementById("cartTotal").textContent = "Rp0";

    return;
  }

  let html = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;

    totalPrice += subtotal;

    html += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <br>

                    <small>
                        ${item.quantity} × ${formatRupiah(item.price)}
                    </small>
                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    Hapus
                </button>

            </div>
        `;
  });

  cartItems.innerHTML = html;

  document.getElementById("cartTotal").textContent = formatRupiah(totalPrice);
}

// ===============================
// REMOVE ITEM
// ===============================

function removeFromCart(index) {
  cart.splice(index, 1);

  updateCart();
}

// ===============================
// FORMAT RUPIAH
// ===============================

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(number)
    .replace(/\u00a0/g, " ");
}

// ===============================
// OPEN CART
// ===============================

function openCart() {
  document.getElementById("cartModal").classList.add("active");
}

// ===============================
// CLOSE CART
// ===============================

function closeCart() {
  document.getElementById("cartModal").classList.remove("active");
}

// Klik luar modal untuk menutup
document
  .getElementById("cartModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeCart();
    }
  });

// ===============================
// CHECKOUT WHATSAPP
// ===============================

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  // Pesan ditulis dengan baris baru biasa (\n),
  // lalu di-encode sekali di akhir dengan encodeURIComponent
  let message = "Halo Cheeseymelo! Saya ingin memesan:\n\n";
  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    message += `- ${item.name} (${item.quantity}x) - ${formatRupiah(subtotal)}\n`;
  });

  message += `\nTotal: ${formatRupiah(total)}\n\nTerima kasih`;

  // GANTI NOMOR INI DENGAN NOMOR WHATSAPP CHEESEYMELO
  // Format: kode negara tanpa + atau 0 di depan (62 untuk Indonesia)
  const phoneNumber = "6285881266610";

  const whatsappURL =
    "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

  // Kalau popup diblokir browser, buka di tab yang sama
  const win = window.open(whatsappURL, "_blank");
  if (!win) {
    window.location.href = whatsappURL;
  }
}

// ===============================
// NOTIFICATION
// ===============================

function showNotification(message) {
  const notification = document.createElement("div");

  notification.textContent = message;

  notification.style.position = "fixed";
  notification.style.bottom = "25px";
  notification.style.right = "25px";
  notification.style.background = "#2b1b14";
  notification.style.color = "white";
  notification.style.padding = "14px 20px";
  notification.style.borderRadius = "5px";
  notification.style.fontSize = "13px";
  notification.style.zIndex = "1000";
  notification.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2500);
}
