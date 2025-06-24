// js/cliente.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('¡cliente.js cargado!');

  // — SESIÓN / USUARIO —
  const userInfoDiv = document.getElementById('user-info');
  const sesionJSON  = localStorage.getItem('sesion');
  if (sesionJSON) {
    const { email, rol } = JSON.parse(sesionJSON);
    if (rol === 'cliente') {
      userInfoDiv.innerHTML = `Bienvenido, <strong>${email}</strong> <a href="#" id="logout">Cerrar sesión</a>`;
      document.getElementById('logout').addEventListener('click', e => {
        e.preventDefault();
        localStorage.removeItem('sesion');
        window.location.reload();
      });
    } else {
      userInfoDiv.innerHTML = `<a href="login.html">Iniciar sesión</a>`;
    }
  } else {
    userInfoDiv.innerHTML = `<a href="login.html">Iniciar sesión</a>`;
  }

  // — PRODUCTOS SIMULADOS —
  const productos = Array.from({ length: 20 }, (_, i) => ({
    id:      i + 1,
    nombre:  ['Monta Pro','Urbana','Ruta','Eléctrica','Plegable','Infantil','BMX','Carga','Vintage','Carbono',
              'Casco','Guantes','Luces','Candado','Timbre','Bolso','Botella','Espejo','Inflador','Parrilla'][i],
    precio:  [189990,159990,209990,329990,179990,99990,144990,389990,199990,499990,
              24990,12990,18990,15990,4990,8990,6990,10990,14990,22990][i],
    imagen:  'https://img.icons8.com/ios-filled/100/bicycle.png'
  }));
  let carrito = [];

  // — RENDER PRODUCTOS —
  const grid = document.getElementById('productos-grid');
  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString()}</p>
      <button>Agregar al carrito</button>
    `;
    // abrir modal al clicar tarjeta (no el botón)
    card.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') mostrarModal(p);
    });
    // botón “Agregar al carrito”
    card.querySelector('button').addEventListener('click', () => agregarAlCarrito(p));
    grid.appendChild(card);
  });

  // — MODAL PRODUCTO —
  const modalP  = document.getElementById('modal-producto');
  const imgP    = document.getElementById('modal-img');
  const nameP   = document.getElementById('modal-nombre');
  const priceP  = document.getElementById('modal-precio');
  const addP    = document.getElementById('modal-agregar');
  const closeP  = document.getElementById('modal-cerrar');
  function mostrarModal(p) {
    imgP.src           = p.imagen;
    nameP.textContent  = p.nombre;
    priceP.textContent = `$${p.precio.toLocaleString()}`;
    addP.onclick       = () => agregarAlCarrito(p);
    modalP.classList.remove('oculto');
  }
  closeP.addEventListener('click', () => modalP.classList.add('oculto'));

  // — SIDEBAR CARRITO —
  const btnCar    = document.getElementById('carrito-btn');
  const sbCar     = document.getElementById('carrito-sidebar');
  const closeCar  = document.getElementById('cerrar-sidebar');
  const lista     = document.getElementById('lista-carrito');
  const tot       = document.getElementById('carrito-total');
  const vaciarBtn = document.getElementById('vaciar-carrito');

  btnCar.addEventListener('click',  () => sbCar.classList.remove('oculto'));
  closeCar.addEventListener('click',() => sbCar.classList.add('oculto'));
  vaciarBtn.addEventListener('click',() => { carrito = []; actualizarCarrito(); });

  function agregarAlCarrito(p) {
    const ex = carrito.find(x => x.id === p.id);
    if (ex) ex.cantidad++;
    else carrito.push({ ...p, cantidad: 1 });
    actualizarCarrito();
  }
  function actualizarCarrito() {
    lista.innerHTML = '';
    let suma = 0;
    carrito.forEach(x => {
      const li = document.createElement('li');
      li.textContent = `${x.nombre} x${x.cantidad} - $${(x.precio*x.cantidad).toLocaleString()}`;
      suma += x.precio * x.cantidad;
      lista.appendChild(li);
    });
    tot.textContent = `Total: $${suma.toLocaleString()}`;
  }

  // — CHECKOUT —
  const btnChk      = document.getElementById('checkout-btn');
  const modalCk     = document.getElementById('modal-checkout');
  const closeCk     = document.getElementById('checkout-cerrar');
  const formCk      = document.getElementById('checkout-form');
  const steps       = document.querySelectorAll('#checkout-form .checkout-step');
  const msg         = document.getElementById('checkout-message');
  let step = 1;

  console.log('Listener checkout-btn:', btnChk);
  btnChk.addEventListener('click', () => {
    console.log('checkout-btn clickeado');
    if (!carrito.length) {
      alert('Tu carrito está vacío.');
      return;
    }
    step = 1;
    showStep();
    modalCk.classList.remove('oculto');
  });

  closeCk.addEventListener('click', () => modalCk.classList.add('oculto'));

  document.getElementById('next-to-address').addEventListener('click', () => {
    if (!validarContacto()) return;
    step = 2; showStep();
  });
  document.getElementById('back-to-contact').addEventListener('click', () => {
    step = 1; showStep();
  });
  document.getElementById('next-to-payment').addEventListener('click', () => {
    if (!validarDireccion()) return;
    step = 3; showStep();
  });
  document.getElementById('back-to-address').addEventListener('click', () => {
    step = 2; showStep();
  });

  function showStep() {
    steps.forEach(el => {
      el.classList.toggle('oculto', Number(el.dataset.step) !== step);
    });
    msg.classList.add('oculto');
  }

  function validarContacto() {
    const n = document.getElementById('contact-name').value.trim();
    const t = document.getElementById('contact-phone').value.trim();
    const e = document.getElementById('contact-email').value.trim();
    if (!n||!t||!e) { alert('Completa datos de contacto.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { alert('Email inválido.'); return false; }
    return true;
  }

  function validarDireccion() {
    const s = document.getElementById('ship-street').value.trim();
    const c = document.getElementById('ship-city').value.trim();
    const z = document.getElementById('ship-zip').value.trim();
    if (!s||!c||!z) { alert('Completa la dirección.'); return false; }
    return true;
  }

  formCk.addEventListener('submit', e => {
    e.preventDefault();
    const cn = document.getElementById('card-number').value.replace(/\s+/g,'');
    const ex = document.getElementById('card-expiry').value.trim();
    const cv = document.getElementById('card-cvv').value.trim();
    if (!/^\d{13,19}$/.test(cn)) { alert('Tarjeta inválida'); return; }
    if (!/^\d{2}\/\d{2}$/.test(ex)) { alert('Expiración MM/YY'); return; }
    if (!/^\d{3}$/.test(cv)) { alert('CVV inválido'); return; }
    msg.textContent = 'Procesando…';
    msg.className = '';
    msg.classList.remove('oculto');
    setTimeout(() => {
      msg.textContent = '¡Compra exitosa!';
      msg.className = 'success';
      carrito = [];
      actualizarCarrito();
      setTimeout(() => modalCk.classList.add('oculto'), 1500);
    }, 1500);
  });
});
