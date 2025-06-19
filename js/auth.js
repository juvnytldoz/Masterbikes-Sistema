// auth.js
import { supabase } from './supabase.js';

const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('login-error');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    errorMsg.textContent = "Credenciales incorrectas. Inténtalo de nuevo.";
    return;
  }

  // Obtenemos el rol del usuario desde una tabla adicional
  const { user } = data;
  const { data: userData, error: roleError } = await supabase
    .from('usuarios') // ← nombre de tabla en Supabase
    .select('rol')
    .eq('id', user.id)
    .single();

  if (roleError || !userData) {
    errorMsg.textContent = "Error al obtener rol del usuario.";
    return;
  }

  // Redirige según el rol
  const rol = userData.rol;

  if (rol === 'cliente') {
    window.location.href = 'cliente.html';
  } else if (rol === 'empleado') {
    window.location.href = 'empleado.html';
  } else if (rol === 'admin') {
    window.location.href = 'admin.html';
  } else {
    errorMsg.textContent = "Rol desconocido. Contacta con soporte.";
  }
});

/*
Notas:
- Aquí debes modificar el nombre de la tabla ('usuarios') según tu estructura real en Supabase.
- La columna que contiene el rol debe llamarse 'rol' (o modificar aquí según cómo se llame).
- Se espera que la tabla de usuarios tenga una columna 'id' que coincida con user.id del auth de Supabase.
*/
