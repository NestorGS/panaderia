document.getElementById('form-producto').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const cantidad = document.getElementById('cantidad').value;
  const imagen = document.getElementById('imagen').files[0]; // Captura la imagen

  if (!nombre || !precio || !cantidad || !imagen) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const producto = {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      imagen: e.target.result // Guarda la imagen como base64
    };

    // Guardar el producto en localStorage
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
    
    // Actualizar la vista
    renderizarProductos();
    alert('Producto agregado exitosamente.');
    document.getElementById('form-producto').reset(); // Resetea el formulario
  }
  
  reader.readAsDataURL(imagen); // Lee la imagen como base64
});

// Función para renderizar productos desde localStorage
function renderizarProductos() {
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const row = document.querySelector('.row'); // Asegúrate de tener esta clase en la sección de productos
  row.innerHTML = ''; // Limpia la sección

  // Añadir productos por defecto
  const productosPorDefecto = [
    {
      nombre: "Pan de Día de Muertos",
      precio: "50",
      cantidad: "10",
      imagen: "descarga.jpg"
    },
    {
      nombre: "Pan de Halloween",
      precio: "45",
      cantidad: "15",
      imagen: "pn.jpg"
    }
  ];
  
  // Renderizar productos por defecto
  productosPorDefecto.forEach(producto => {
    row.innerHTML += `
      <div class="col-md-4">
        <div class="card">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>
          </div>
        </div>
      </div>
    `;
  });

  // Renderizar productos agregados
  productos.forEach(producto => {
    row.innerHTML += `
      <div class="col-md-4">
        <div class="card">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// Función para borrar productos agregados
function borrarProductosAgregados() {
  localStorage.removeItem('productos');
  renderizarProductos();
}

// Evento para cargar productos al cargar la página
window.onload = function() {
  renderizarProductos();
};

// Añadir evento para el botón de borrar productos agregados
document.getElementById('borrar-productos').addEventListener('click', borrarProductosAgregados);
