// Datos de productos
const productos = [
    {
        id: 1,
        nombre: 'PC Oficina Asus',
        descripcion: 'AMD Athlon 3000G RAM 8GB SSD 240GB',
        precio: 241095,
        imagen: 'assets/img/PC-Armada-1.webp'
    },
    {
        id: 2,
        nombre: 'PC Hogar Asus AMD',
        descripcion: 'AMD Ryzen 5 5600G RAM 16GB SSD 480GB',
        precio: 342707,
        precioOriginal: 355148,
        imagen: 'assets/img/PC-Armada-2.webp'
    },
    {
        id: 3,
        nombre: 'PC Gamer Asus',
        descripcion: 'AMD Ryzen 7 7700 RAM 16GB SSD 1TB RTX 4060 TI',
        precio: 1680988,
        precioOriginal: 1980600,
        imagen: 'assets/img/PC-Armada-3.webp'
    }
];

// Carrito de compras
let carrito = [];

// Función para renderizar productos
function renderizarProductos() {
    const productList = document.getElementById('product-list');
    productos.forEach(producto => {
        const productCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            ${producto.precioOriginal ? `<span class="text-muted text-decoration-line-through">$${producto.precioOriginal}</span>` : ''}
                            <span class="text-success fw-bold">$${producto.precio}</span>
                            <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Función para agregar al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(prod => prod.id === productId);
    carrito.push(producto);
    actualizarCarrito();
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${producto.nombre} ha sido agregado al carrito.`,
        timer: 1500,
        showConfirmButton: false
    });
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = carrito.length;

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar elementos anteriores
    let total = 0;

    carrito.forEach(producto => {
        const item = `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                ${producto.nombre} - $${producto.precio}
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </div>
        `;
        cartItems.innerHTML += item;
        total += producto.precio;
    });

    document.getElementById('cart-total').innerText = `$${total}`;
}

// Función para eliminar del carrito
function eliminarDelCarrito(productId) {
    carrito = carrito.filter(prod => prod.id !== productId);
    actualizarCarrito();
}


// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
});
