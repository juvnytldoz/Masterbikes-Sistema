// admin.js - Funcionalidad del administrador
import { supabase } from './supabase.js';

// Verificar autenticación
async function checkAuth() {
    const user = supabase.auth.user();
    if (!user) {
        window.location.href = 'login.html'; // Redirigir si no está autenticado
    }
}

// Cerrar sesión
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}

// Mostrar productos en stock
async function fetchProductos() {
    const { data, error } = await supabase
        .from('productos') // Asegúrate que la tabla 'productos' esté creada en Supabase
        .select('*');
    if (error) {
        console.error('Error al obtener productos:', error);
        return;
    }
    const productosDiv = document.getElementById('productos-lista');
    productosDiv.innerHTML = data.map(producto => `
        <div class="producto">
            <p>${producto.nombre} - ${producto.precio} USD</p>
            <p>Stock disponible: ${producto.stock}</p>
        </div>
    `).join('');
}

// Agregar un nuevo producto
async function agregarProducto() {
    const nombre = prompt("Nombre del nuevo producto:");
    const precio = prompt("Precio del nuevo producto:");
    const stock = prompt("Cantidad en stock:");

    const { data, error } = await supabase
        .from('productos')
        .insert([
            { nombre, precio, stock }
        ]);

    if (error) {
        console.error('Error al agregar producto:', error);
        return;
    }

    alert("Producto agregado con éxito!");
    fetchProductos(); // Actualizar lista de productos
}

// Mostrar proveedores
async function fetchProveedores() {
    const { data, error } = await supabase
        .from('proveedores') // Asegúrate de que la tabla 'proveedores' esté creada
        .select('*');
    if (error) {
        console.error('Error al obtener proveedores:', error);
        return;
    }
    const proveedoresDiv = document.getElementById('proveedores-lista');
    proveedoresDiv.innerHTML = data.map(proveedor => `
        <div class="proveedor">
            <p>Proveedor: ${proveedor.nombre}</p>
            <p>Contacto: ${proveedor.contacto}</p>
        </div>
    `).join('');
}

// Eventos
document.getElementById('verProductosBtn').addEventListener('click', fetchProductos);
document.getElementById('agregarProductoBtn').addEventListener('click', agregarProducto);
document.getElementById('verProveedoresBtn').addEventListener('click', fetchProveedores);

// Verificación de autenticación al cargar la página
checkAuth();

// Cerrar sesión
document.getElementById('logout').addEventListener('click', logout);
