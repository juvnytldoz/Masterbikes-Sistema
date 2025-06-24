// admin.js - Funcionalidad del administrador (Mock sin Supabase)

// Simular autenticación
function checkAuth() {
    console.log("Simulación de autenticación: usuario autenticado.");
}

// Simular cierre de sesión
function logout() {
    alert("Sesión cerrada.");
    // Redirige a la ruta absoluta de cliente.html en tu PC
    window.location.href = 'cliente.html';
}

// Formateador de moneda chilena
const formatoMonedaCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
});

// Mock de productos
const productosMock = [
    { nombre: "Mountain Bike XTR", precio: 1200000, stock: 8 },
    { nombre: "Bicicleta Urbana City 300", precio: 750000, stock: 15 },
    { nombre: "Bicicleta Infantil Mini Rider", precio: 450000, stock: 5 },
    { nombre: "Bicicleta de Ruta AeroSpeed", precio: 1800000, stock: 3 },
    { nombre: "Scooter Eléctrico UrbanE", precio: 920000, stock: 7 }
];

// Mostrar productos en stock (mock)
function fetchProductos() {
    const productosDiv = document.getElementById('productos-lista');
    productosDiv.innerHTML = productosMock.map((producto, index) => `
        <div class="producto">
            <p>${producto.nombre} - ${formatoMonedaCLP.format(producto.precio)}</p>
            <p>Stock disponible: ${producto.stock}</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        </div>
    `).join('');
}

// Agregar un nuevo producto (mock)
function agregarProducto() {
    const nombre = prompt("Nombre del nuevo producto:");
    const precioInput = prompt("Precio del nuevo producto (solo números, sin puntos ni símbolos):");
    const stockInput = prompt("Cantidad en stock:");

    const precio = parseInt(precioInput);
    const stock = parseInt(stockInput);

    if (nombre && !isNaN(precio) && !isNaN(stock)) {
        productosMock.push({ nombre, precio, stock });
        alert("Producto agregado con éxito (simulado)!");
        fetchProductos();
    } else {
        alert("Debes ingresar datos válidos en todos los campos.");
    }
}

// Eliminar producto por índice
function eliminarProducto(index) {
    const confirmado = confirm(`¿Estás seguro de eliminar "${productosMock[index].nombre}"?`);
    if (confirmado) {
        productosMock.splice(index, 1);
        alert("Producto eliminado.");
        fetchProductos();
    }
}

// Mock de proveedores
const proveedoresMock = [
    { nombre: "Distribuidora Pedal S.A.", contacto: "contacto@pedalsa.cl" },
    { nombre: "Proveedores Masterbike", contacto: "ventas@masterbike.cl" },
    { nombre: "SpeedCycle Ltda.", contacto: "info@speedcycle.cl" },
    { nombre: "EcoRider Group", contacto: "ecorider@proveedores.cl" }
];

// Mostrar proveedores (mock)
function fetchProveedores() {
    const proveedoresDiv = document.getElementById('proveedores-lista');
    proveedoresDiv.innerHTML = proveedoresMock.map((proveedor, index) => `
        <div class="proveedor">
            <p>Proveedor: ${proveedor.nombre}</p>
            <p>Contacto: ${proveedor.contacto}</p>
            <button onclick="eliminarProveedor(${index})">Eliminar</button>
        </div>
    `).join('');
}

// Agregar nuevo proveedor (mock)
function agregarProveedor() {
    const nombre = prompt("Nombre del nuevo proveedor:");
    const contacto = prompt("Correo de contacto del proveedor:");

    if (nombre && contacto) {
        proveedoresMock.push({ nombre, contacto });
        alert("Proveedor agregado con éxito (simulado)!");
        fetchProveedores();
    } else {
        alert("Debes ingresar ambos datos.");
    }
}

// Eliminar proveedor por índice
function eliminarProveedor(index) {
    const confirmado = confirm(`¿Estás seguro de eliminar a "${proveedoresMock[index].nombre}"?`);
    if (confirmado) {
        proveedoresMock.splice(index, 1);
        alert("Proveedor eliminado.");
        fetchProveedores();
    }
}

// Eventos
document.getElementById('verProductosBtn').addEventListener('click', fetchProductos);
document.getElementById('agregarProductoBtn').addEventListener('click', agregarProducto);
document.getElementById('verProveedoresBtn').addEventListener('click', fetchProveedores);

// Verificación de autenticación al cargar la página
checkAuth();

// Asignar el listener de cerrar sesión
document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    logout();
});

// Botón para agregar proveedor
const botonAgregarProveedor = document.createElement('button');
botonAgregarProveedor.textContent = "Agregar Nuevo Proveedor";
botonAgregarProveedor.style.marginLeft = "10px";
botonAgregarProveedor.addEventListener('click', agregarProveedor);
document.getElementById('verProveedoresBtn').after(botonAgregarProveedor);
