// Datos de ejemplo (estos vendrían de tu base de datos)
        let ordersData = [
            {
                id: 'ORD-001',
                customer: 'María González',
                products: 'Bicicleta Montaña Pro, Casco',
                total: 450.00,
                date: '2024-06-20',
                status: 'pending'
            },
            {
                id: 'ORD-002',
                customer: 'Carlos López',
                products: 'Kit de Reparación, Luces LED',
                total: 85.50,
                date: '2024-06-19',
                status: 'approved'
            },
            {
                id: 'ORD-003',
                customer: 'Ana Martínez',
                products: 'Bicicleta Urbana Classic',
                total: 320.00,
                date: '2024-06-18',
                status: 'pending'
            }
        ];

        let repairsData = [
            {
                id: 'REP-001',
                customer: 'Pedro Sánchez',
                bike: 'Trek Mountain 2021',
                issue: 'Cambios no funcionan correctamente',
                priority: 'high',
                date: '2024-06-20',
                status: 'pending'
            },
            {
                id: 'REP-002',
                customer: 'Laura Rivera',
                bike: 'Giant Road Bike',
                issue: 'Frenos chirriantes',
                priority: 'medium',
                date: '2024-06-19',
                status: 'in-progress'
            }
        ];

        let inventoryData = [
            { id: 'PROD-001', name: 'Bicicleta Montaña Pro', stock: 15, minStock: 5, price: 399.99 },
            { id: 'PROD-002', name: 'Casco Deportivo', stock: 3, minStock: 10, price: 45.99 },
            { id: 'PROD-003', name: 'Kit Reparación Básico', stock: 25, minStock: 15, price: 29.99 },
            { id: 'PROD-004', name: 'Luces LED Set', stock: 8, minStock: 12, price: 35.50 },
            { id: 'PROD-005', name: 'Candado de Seguridad', stock: 20, minStock: 8, price: 25.99 }
        ];

        let notificationsHistory = [];

        // Funciones principales
        function showTab(tabName) {
            // Ocultar todos los paneles
            document.querySelectorAll('.content-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Remover clase active de todos los botones
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Mostrar panel seleccionado
            document.getElementById(tabName + '-panel').classList.add('active');
            
            // Activar botón correspondiente
            event.target.classList.add('active');
            
            // Cargar contenido según la pestaña
            switch(tabName) {
                case 'orders':
                    loadOrders();
                    break;
                case 'repairs':
                    loadRepairs();
                    break;
                case 'notifications':
                    loadNotifications();
                    break;
                case 'inventory':
                    loadInventory();
                    break;
            }
        }

        function loadOrders() {
            const container = document.getElementById('orders-container');
            container.innerHTML = '';
            
            ordersData.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'card';
                orderCard.innerHTML = `
                    <div class="card-header">
                        <div>
                            <h4>${order.id} - ${order.customer}</h4>
                            <p><strong>Productos:</strong> ${order.products}</p>
                            <p><strong>Total:</strong> $${order.total}</p>
                            <p><strong>Fecha:</strong> ${order.date}</p>
                        </div>
                        <span class="status-badge status-${order.status}">
                            ${getStatusText(order.status)}
                        </span>
                    </div>
                    <div style="text-align: right;">
                        ${order.status === 'pending' ? `
                            <button class="btn btn-success" onclick="updateOrderStatus('${order.id}', 'approved')">
                                ✓ Aprobar
                            </button>
                            <button class="btn btn-danger" onclick="updateOrderStatus('${order.id}', 'rejected')">
                                ✗ Rechazar
                            </button>
                        ` : ''}
                        <button class="btn btn-primary" onclick="viewOrderDetails('${order.id}')">
                            Ver Detalles
                        </button>
                    </div>
                `;
                container.appendChild(orderCard);
            });
        }

        function loadRepairs() {
            const container = document.getElementById('repairs-container');
            container.innerHTML = '';
            
            repairsData.forEach(repair => {
                const repairCard = document.createElement('div');
                repairCard.className = 'card';
                repairCard.innerHTML = `
                    <div class="card-header">
                        <div>
                            <h4>${repair.id} - ${repair.customer}</h4>
                            <p><strong>Bicicleta:</strong> ${repair.bike}</p>
                            <p><strong>Problema:</strong> ${repair.issue}</p>
                            <p><strong>Fecha:</strong> ${repair.date}</p>
                            <span class="status-badge status-${repair.priority === 'high' ? 'rejected' : 'pending'}">
                                Prioridad: ${repair.priority}
                            </span>
                        </div>
                        <span class="status-badge status-${repair.status}">
                            ${getStatusText(repair.status)}
                        </span>
                    </div>
                    <div style="text-align: right;">
                        ${repair.status === 'pending' ? `
                            <button class="btn btn-success" onclick="updateRepairStatus('${repair.id}', 'approved')">
                                ✓ Aceptar
                            </button>
                            <button class="btn btn-danger" onclick="updateRepairStatus('${repair.id}', 'rejected')">
                                ✗ Rechazar
                            </button>
                        ` : ''}
                        <button class="btn btn-primary" onclick="viewRepairDetails('${repair.id}')">
                            Ver Detalles
                        </button>
                    </div>
                `;
                container.appendChild(repairCard);
            });
        }

        function loadNotifications() {
            // Cargar clientes en el select
            const clientSelect = document.getElementById('client-select');
            clientSelect.innerHTML = '<option value="">Seleccionar cliente...</option>';
            
            // Obtener clientes únicos de reparaciones
            const clients = [...new Set(repairsData.map(repair => repair.customer))];
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client;
                option.textContent = client;
                clientSelect.appendChild(option);
            });

            // Cargar historial
            const historyContainer = document.getElementById('notifications-history');
            historyContainer.innerHTML = '';
            
            notificationsHistory.forEach(notification => {
                const notificationCard = document.createElement('div');
                notificationCard.className = 'card';
                notificationCard.innerHTML = `
                    <h5>${notification.client}</h5>
                    <p><strong>Estado:</strong> ${notification.status}</p>
                    <p><strong>Mensaje:</strong> ${notification.message}</p>
                    <small>Enviado: ${notification.date}</small>
                `;
                historyContainer.appendChild(notificationCard);
            });
        }

        function loadInventory() {
            const container = document.getElementById('inventory-grid');
            container.innerHTML = '';
            
            inventoryData.forEach(product => {
                const stockClass = product.stock <= product.minStock ? 'stock-low' : 
                                 product.stock <= product.minStock * 2 ? 'stock-medium' : 'stock-high';
                
                const productCard = document.createElement('div');
                productCard.className = `product-card ${stockClass}`;
                productCard.innerHTML = `
                    <h4>${product.name}</h4>
                    <p><strong>Código:</strong> ${product.id}</p>
                    <p><strong>Stock:</strong> ${product.stock} unidades</p>
                    <p><strong>Stock Mínimo:</strong> ${product.minStock}</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                    ${product.stock <= product.minStock ? 
                        '<p style="color: red; font-weight: bold;">⚠️ Stock Bajo</p>' : ''}
                    <button class="btn btn-primary" onclick="viewProductDetails('${product.id}')">
                        Ver Detalles
                    </button>
                `;
                container.appendChild(productCard);
            });
        }

        // Funciones de utilidad
        function getStatusText(status) {
            const statusMap = {
                'pending': 'Pendiente',
                'approved': 'Aprobado',
                'rejected': 'Rechazado',
                'in-progress': 'En Proceso',
                'completed': 'Completado'
            };
            return statusMap[status] || status;
        }

        function updateOrderStatus(orderId, newStatus) {
            const order = ordersData.find(o => o.id === orderId);
            if (order) {
                order.status = newStatus;
                loadOrders();
                alert(`Pedido ${orderId} ${newStatus === 'approved' ? 'aprobado' : 'rechazado'} exitosamente`);
                
                // Aquí harías la llamada a tu base de datos
                // updateOrderInDatabase(orderId, newStatus);
            }
        }

        function updateRepairStatus(repairId, newStatus) {
            const repair = repairsData.find(r => r.id === repairId);
            if (repair) {
                repair.status = newStatus;
                loadRepairs();
                alert(`Solicitud de reparación ${repairId} ${newStatus === 'approved' ? 'aceptada' : 'rechazada'} exitosamente`);
                
                // Aquí harías la llamada a tu base de datos
                // updateRepairInDatabase(repairId, newStatus);
            }
        }

        function sendNotification() {
            const client = document.getElementById('client-select').value;
            const status = document.getElementById('status-select').value;
            const message = document.getElementById('message').value;
            
            if (!client) {
                alert('Por favor selecciona un cliente');
                return;
            }
            
            const notification = {
                client: client,
                status: getStatusText(status),
                message: message || 'Sin mensaje adicional',
                date: new Date().toLocaleString()
            };
            
            notificationsHistory.unshift(notification);
            
            // Limpiar formulario
            document.getElementById('client-select').value = '';
            document.getElementById('status-select').value = 'received';
            document.getElementById('message').value = '';
            
            loadNotifications();
            alert('Notificación enviada exitosamente');
            
            // Aquí harías la llamada a tu base de datos y servicio de notificaciones
            // sendNotificationToDatabase(notification);
        }

        // Funciones de filtrado
        function filterOrders(searchTerm) {
            const container = document.getElementById('orders-container');
            const cards = container.querySelectorAll('.card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function filterRepairs(searchTerm) {
            const container = document.getElementById('repairs-container');
            const cards = container.querySelectorAll('.card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function filterInventory(searchTerm) {
            const container = document.getElementById('inventory-grid');
            const cards = container.querySelectorAll('.product-card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Funciones del modal
        function viewOrderDetails(orderId) {
            const order = ordersData.find(o => o.id === orderId);
            if (order) {
                document.getElementById('modal-body').innerHTML = `
                    <h3>Detalles del Pedido ${order.id}</h3>
                    <p><strong>Cliente:</strong> ${order.customer}</p>
                    <p><strong>Productos:</strong> ${order.products}</p>
                    <p><strong>Total:</strong> $${order.total}</p>
                    <p><strong>Fecha:</strong> ${order.date}</p>
                    <p><strong>Estado:</strong> ${getStatusText(order.status)}</p>
                `;
                document.getElementById('detailModal').style.display = 'block';
            }
        }

        function viewRepairDetails(repairId) {
            const repair = repairsData.find(r => r.id === repairId);
            if (repair) {
                document.getElementById('modal-body').innerHTML = `
                    <h3>Detalles de Reparación ${repair.id}</h3>
                    <p><strong>Cliente:</strong> ${repair.customer}</p>
                    <p><strong>Bicicleta:</strong> ${repair.bike}</p>
                    <p><strong>Problema:</strong> ${repair.issue}</p>
                    <p><strong>Prioridad:</strong> ${repair.priority}</p>
                    <p><strong>Fecha:</strong> ${repair.date}</p>
                    <p><strong>Estado:</strong> ${getStatusText(repair.status)}</p>
                `;
                document.getElementById('detailModal').style.display = 'block';
            }
        }

        function viewProductDetails(productId) {
            const product = inventoryData.find(p => p.id === productId);
            if (product) {
                document.getElementById('modal-body').innerHTML = `
                    <h3>Detalles del Producto</h3>
                    <p><strong>Código:</strong> ${product.id}</p>
                    <p><strong>Nombre:</strong> ${product.name}</p>
                    <p><strong>Stock Actual:</strong> ${product.stock} unidades</p>
                    <p><strong>Stock Mínimo:</strong> ${product.minStock} unidades</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                    <p><strong>Estado:</strong> ${product.stock <= product.minStock ? 
                        '<span style="color: red;">Stock Bajo ⚠️</span>' : 
                        '<span style="color: green;">Stock Normal ✅</span>'}</p>
                `;
                document.getElementById('detailModal').style.display = 'block';
            }
        }

        function closeModal() {
            document.getElementById('detailModal').style.display = 'none';
        }

        function logout() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                // Aquí rediriges a tu página de login
                window.location.href = 'login.html';
            }
        }

        // Actualizar select de reparaciones cuando cambia el cliente
        document.getElementById('client-select').addEventListener('change', function() {
            const selectedClient = this.value;
            const repairSelect = document.getElementById('repair-select');
            
            repairSelect.innerHTML = '<option value="">Seleccionar reparación...</option>';
            
            if (selectedClient) {
                const clientRepairs = repairsData.filter(repair => repair.customer === selectedClient);
                clientRepairs.forEach(repair => {
                    const option = document.createElement('option');
                    option.value = repair.id;
                    option.textContent = `${repair.id} - ${repair.bike}`;
                    repairSelect.appendChild(option);
                });
            }
        });

        // Cerrar modal al hacer clic fuera
        window.onclick = function(event) {
            const modal = document.getElementById('detailModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Cargar datos iniciales
        document.addEventListener('DOMContentLoaded', function() {
            loadOrders();
            updateStats();
        });

        function updateStats() {
            const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
            const approvedOrders = ordersData.filter(order => order.status === 'approved').length;
            const completedOrders = ordersData.filter(order => order.status === 'completed').length;
            
            document.getElementById('pending-orders').textContent = pendingOrders;
            document.getElementById('approved-orders').textContent = approvedOrders;
            document.getElementById('completed-orders').textContent = completedOrders;
        }

        /* 
        FUNCIONES PARA CONECTAR CON BASE DE DATOS
        Estas son las funciones que deberás implementar para conectar con tu backend:
        
        async function updateOrderInDatabase(orderId, status) {
            try {
                const response = await fetch('/api/orders/update-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        orderId: orderId,
                        status: status
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Error al actualizar el pedido');
                }
                
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al actualizar el pedido');
            }
        }

        async function updateRepairInDatabase(repairId, status) {
            try {
                const response = await fetch('/api/repairs/update-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        repairId: repairId,
                        status: status
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Error al actualizar la reparación');
                }
                
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al actualizar la reparación');
            }
        }

        async function sendNotificationToDatabase(notification) {
            try {
                const response = await fetch('/api/notifications/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(notification)
                });
                
                if (!response.ok) {
                    throw new Error('Error al enviar la notificación');
                }
                
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar la notificación');
            }
        }

        async function loadOrdersFromDatabase() {
            try {
                const response = await fetch('/api/orders', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Error al cargar los pedidos');
                }
                
                ordersData = await response.json();
                loadOrders();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al cargar los pedidos');
            }
        }

        async function loadRepairsFromDatabase() {
            try {
                const response = await fetch('/api/repairs', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Error al cargar las reparaciones');
                }
                
                repairsData = await response.json();
                loadRepairs();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al cargar las reparaciones');
            }
        }

        async function loadInventoryFromDatabase() {
            try {
                const response = await fetch('/api/inventory', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Error al cargar el inventario');
                }
                
                inventoryData = await response.json();
                loadInventory();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al cargar el inventario');
            }
        }
        */
