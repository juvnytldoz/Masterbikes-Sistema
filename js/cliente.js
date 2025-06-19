// cliente.js

// 🧪 DATOS SIMULADOS - SOLO PARA PROTOTIPO
// ✳️ Esto es solo un ejemplo local y debe ser reemplazado por datos reales desde Supabase más adelante.
const productos = [
  // Bicicletas
  {
    id: 1,
    nombre: "Bicicleta Montaña Pro",
    precio: 189990,
    tipo: "bicicleta",
    categoria: "montaña",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 2,
    nombre: "Bicicleta Urbana",
    precio: 159990,
    tipo: "bicicleta",
    categoria: "urbana",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 3,
    nombre: "Bicicleta Ruta Rápida",
    precio: 209990,
    tipo: "bicicleta",
    categoria: "ruta",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 4,
    nombre: "Bicicleta Eléctrica Compacta",
    precio: 329990,
    tipo: "bicicleta",
    categoria: "eléctrica",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 5,
    nombre: "Bicicleta Plegable Urbana",
    precio: 179990,
    tipo: "bicicleta",
    categoria: "urbana",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 6,
    nombre: "Bicicleta Infantil Rosa",
    precio: 99990,
    tipo: "bicicleta",
    categoria: "infantil",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 7,
    nombre: "Bicicleta BMX Acrobática",
    precio: 144990,
    tipo: "bicicleta",
    categoria: "bmx",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 8,
    nombre: "Bicicleta de Carga Familiar",
    precio: 389990,
    tipo: "bicicleta",
    categoria: "cargo",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 9,
    nombre: "Bicicleta Vintage Clásica",
    precio: 199990,
    tipo: "bicicleta",
    categoria: "urbana",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 10,
    nombre: "Bicicleta Montaña Carbono X",
    precio: 499990,
    tipo: "bicicleta",
    categoria: "montaña",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },

  // Accesorios
  {
    id: 11,
    nombre: "Casco de Seguridad Negro",
    precio: 24990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 12,
    nombre: "Guantes Antideslizantes",
    precio: 12990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 13,
    nombre: "Luces LED Recargables",
    precio: 18990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 14,
    nombre: "Candado Acero Reforzado",
    precio: 15990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 15,
    nombre: "Timbre Clásico Cromado",
    precio: 4990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 16,
    nombre: "Bolso Porta Herramientas",
    precio: 8990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 17,
    nombre: "Botella Deportiva 600ml",
    precio: 6990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 18,
    nombre: "Espejo Retrovisor Manillar",
    precio: 10990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 19,
    nombre: "Inflador Manual Compacto",
    precio: 14990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  },
  {
    id: 20,
    nombre: "Parrilla Trasera Universal",
    precio: 22990,
    tipo: "accesorio",
    imagen: "https://img.icons8.com/ios-filled/100/bicycle.png"
  }
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
const cerrarSidebar = document.getElementById("cerrar-sidebar"); // ← Nuevo botón de cerrar

carritoBtn.onclick = () => {
  carritoSidebar.classList.remove("oculto");
};

cerrarSidebar.onclick = () => {
  carritoSidebar.classList.add("oculto");
};

const listaCarrito = document.getElementById("lista-carrito");
const carritoTotal = document.getElementById("carrito-total");
const vaciarBtn = document.getElementById("vaciar-carrito");

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
