// cliente.js

// 🧪 DATOS SIMULADOS - SOLO PARA PROTOTIPO
// ✳️ Esto es solo un ejemplo local y debe ser reemplazado por datos reales desde Supabase más adelante.
const productos = [
  {
    id: 1,
    nombre: "Bicicleta Montaña Pro",
    precio: 189990,
    tipo: "bicicleta",
    categoria: "montaña",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png" // ✳️ Aquí debes poner la URL real de la imagen del producto
  },
  {
    id: 2,
    nombre: "Casco de Seguridad",
    precio: 24990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 3,
    nombre: "Bicicleta Urbana",
    precio: 159990,
    tipo: "bicicleta",
    categoria: "urbana",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 4,
    nombre: "Guantes Antideslizantes",
    precio: 12990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  }
  // ✳️ Puedes seguir agregando más productos simulados aquí
];

let carrito = [];

// Renderizar productos
const contenedor = document.getElementById("productos-grid");

productos.forEach(producto => {
  const card = document.createElement("div");
  card.classList.add("producto-card");
  card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio.toLocaleString()}</p>
    <button data-id="${producto.id}">Agregar al carrito</button>
  `;
  card.addEventListener("click", (e) => {
    if (e.target.tagName !== 'BUTTON') {
      mostrarModal(producto);
    }
  });
  card.querySelector("button").addEventListener("click", () => agregarAlCarrito(producto));
  contenedor.appendChild(card);
});

// Modal
const modal = document.getElementById("modal-producto");
const modalImg = document.getElementById("modal-img");
const modalNombre = document.getElementById("modal-nombre");
const modalPrecio = document.getElementById("modal-precio");
const modalAgregar = document.getElementById("modal-agregar");
const modalCerrar = document.getElementById("modal-cerrar");

function mostrarModal(producto) {
  modalImg.src = producto.imagen;
  modalNombre.textContent = producto.nombre;
  modalPrecio.textContent = `$${producto.precio.toLocaleString()}`;
  modalAgregar.onclick = () => agregarAlCarrito(producto);
  modal.classList.remove("oculto");
}

modalCerrar.onclick = () => {
  modal.classList.add("oculto");
};

// Sidebar carrito
const carritoBtn = document.getElementById("carrito-btn");
const carritoSidebar = document.getElementById("carrito-sidebar");
const listaCarrito = document.getElementById("lista-carrito");
const carritoTotal = document.getElementById("carrito-total");
const vaciarBtn = document.getElementById("vaciar-carrito");

carritoBtn.onclick = () => {
  carritoSidebar.classList.toggle("oculto");
};

vaciarBtn.onclick = () => {
  carrito = [];
  actualizarCarrito();
};

function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(prod => {
    const li = document.createElement("li");
    li.textContent = `${prod.nombre} x${prod.cantidad} - $${(prod.precio * prod.cantidad).toLocaleString()}`;
    total += prod.precio * prod.cantidad;
    listaCarrito.appendChild(li);
  });
  carritoTotal.textContent = `Total: $${total.toLocaleString()}`;
}
