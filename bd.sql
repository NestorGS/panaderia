CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  cantidad INT NOT NULL,
  categoria_id INT,
  imagen VARCHAR(255),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(15)
);

CREATE TABLE facturas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  fecha DATETIME NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE detalles_factura (
  id INT AUTO_INCREMENT PRIMARY KEY,
  factura_id INT,
  producto_id INT,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (factura_id) REFERENCES facturas(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  fecha_pedido DATETIME NOT NULL,
  estado VARCHAR(50) NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
