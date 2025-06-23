// js/auth.js

// IMPORT DE SUPABASE (deshabilitado temporalmente para evitar errores de módulo)
// import { supabase } from './supabase.js';

const usuariosLocales = [
  { id: 1, email: 'cliente@demo.com',  password: 'cliente123',  rol: 'cliente'  },
  { id: 2, email: 'empleado@demo.com', password: 'empleado123', rol: 'empleado' },
  { id: 3, email: 'admin@demo.com',    password: 'admin123',    rol: 'admin'    }
];

// Si en el futuro quieres usar Supabase, ponlo a `true` y re-habilita el import
const useSupabase = false;

const loginForm = document.getElementById('login-form');
const errorMsg  = document.getElementById('login-error');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.textContent = '';

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let user = null;
  let rol  = null;

  if (useSupabase) {
    // === LÓGICA FUTURA CON SUPABASE ===
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) { errorMsg.textContent = error.message; return; }
    // const { data: usuario, error: rolError } = await supabase
    //   .from('usuarios').select('rol').eq('id', data.user.id).single();
    // if (rolError) { errorMsg.textContent = rolError.message; return; }
    // user = { id: data.user.id, email };
    // rol  = usuario.rol;
  } else {
    // AUTENTICACIÓN LOCAL
    const encontrado = usuariosLocales.find(
      u => u.email === email && u.password === password
    );
    if (!encontrado) {
      errorMsg.textContent = 'Credenciales incorrectas.';
      return;
    }
    user = { id: encontrado.id, email: encontrado.email };
    rol  = encontrado.rol;
  }

  // Guardar sesión en localStorage
  localStorage.setItem('sesion', JSON.stringify({
    id:    user.id,
    email: user.email,
    rol
  }));

  // Redirigir según rol
  switch (rol) {
    case 'cliente':
      window.location.href = 'cliente.html';
      break;
    case 'empleado':
      window.location.href = 'empleado.html';
      break;
    case 'admin':
      window.location.href = 'admin.html';
      break;
    default:
      errorMsg.textContent = 'Rol desconocido. Contacta con soporte.';
  }
});
