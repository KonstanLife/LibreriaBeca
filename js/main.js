// --- MENÚ POPUP ---
// Seleccionar el botón de menú y el menú popup
const menuButton = document.querySelector(".menu__button");
const popupMenu = document.querySelector(".popup__menu");

// Evento para mostrar el menú popup al hacer clic en el botón
menuButton.addEventListener("click", () => {
  popupMenu.style.display = "flex";
});

// Cerrar el menú popup al hacer clic fuera del menú o en un enlace
popupMenu.addEventListener("click", (e) => {
  if (e.target === popupMenu || e.target.tagName === "A") {
    popupMenu.style.display = "none";
  }
});
// --- MODAL DE IMAGEN ---
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");

if (modal && modalImg) {
  document.querySelectorAll(".promo__img").forEach((img) => {
    img.addEventListener("click", function (event) {
      event.stopPropagation();
      modal.style.display = "block";
      modalImg.src = this.dataset.large;
    });
  });

  const closeBtn = document.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.style.display = "none";
  });
}

// --- ANIMACIONES EN SCROLL ---
document.addEventListener("DOMContentLoaded", function () {
  const animateEls = document.querySelectorAll(".animate-on-scroll");
  if (animateEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    animateEls.forEach((el) => observer.observe(el));
  }
});

// --- CANVAS ANIMADO ---
const canvas = document.getElementById("editorialCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Circle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = 10 + Math.random() * 20;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.alpha = 0.1 + Math.random() * 0.3;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 123, 255, ${this.alpha})`;
      ctx.fill();
      ctx.closePath();
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < -this.radius) this.x = canvas.width + this.radius;
      if (this.x > canvas.width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = canvas.height + this.radius;
      if (this.y > canvas.height + this.radius) this.y = -this.radius;
    }
  }

  const circles = [];
  const NUM_CIRCLES = 15;
  for (let i = 0; i < NUM_CIRCLES; i++) {
    circles.push(new Circle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((c) => {
      c.update();
      c.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const foundedItems = document.querySelector(".founded__items");
const foundedItems2 = document.querySelector(".promo__grid");
const foundedItems3 = document.querySelector(".promo__grid_carrucel");

if (foundedItems2) {
  foundedItems2.addEventListener("click", function () {
    window.location.href = "ficha_libro.html";
  });
}
if (foundedItems) {
  foundedItems.addEventListener("click", function () {
    window.location.href = "ficha_libro.html";
  });
}
if (foundedItems3) {
  foundedItems3.addEventListener("click", function () {
    window.location.href = "ficha_libro.html";
  });
}

const searchInput = document.querySelector(".search__bar");

if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = "ficha_libro.html";
      }
    }
  });
}

// CARRUCEL
const track = document.querySelector(".carousel__track");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let position = 0;
const itemWidth = 140; // ancho del item + margen (ajusta según diseño)
const visibleItems = 3; // cambia si quieres mostrar más o menos

if (track) {
  const totalItems = track.children.length;

  nextBtn.addEventListener("click", () => {
    event.stopPropagation();
    if (position > -(itemWidth * (totalItems - visibleItems))) {
      position -= itemWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  });

  prevBtn.addEventListener("click", () => {
    event.stopPropagation();
    if (position < 0) {
      position += itemWidth;
      track.style.transform = `translateX(${position}px)`;
    }
  });
}

// ATAJO PERSONALIZADO
document.addEventListener("keydown", function (event) {
  // Detectar si se presiona Alt + Flecha arriba
  if (event.altKey && event.key === "ArrowUp") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Tabs
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Accordion (only one open at a time)
document.querySelectorAll(".accordion").forEach((accordion) => {
  accordion.querySelectorAll(".accordion-title").forEach((title) => {
    title.addEventListener("click", () => {
      const currentItem = title.parentElement;
      accordion.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });
      currentItem.classList.add("active");
    });
  });
});

// Añadir al carrito
const btnCart = document.querySelector(".button_add_cart");

if (btnCart) {
  const icon = btnCart.querySelector("img");
  const bookTitle = document.querySelector(".book__title").textContent.trim();
  const bookAuthor = document.querySelector(".book__autor").textContent.trim();
  const bookPrice = document.querySelector(".book__price").textContent.trim();
  const bookImage = document.querySelector(".book__image").getAttribute("src");

  // Clave en localStorage
  const CART_KEY = "carrito";

  // Obtener el carrito actual del localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  }

  // Guardar el carrito en localStorage
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  // Verificar si el libro ya está en el carrito
  function isInCart(title) {
    const cart = getCart();
    return cart.some((item) => item.nombre === title);
  }

  // Actualizar el botón según el estado del libro
  function updateButton() {
    if (isInCart(bookTitle)) {
      btnCart.innerHTML = `<img src="/img/iconos/eleminar.svg" class="icono" alt="Eliminar del carrito"> Eliminar del carrito`;
    } else {
      btnCart.innerHTML = `<img src="/img/iconos/aniadir.svg" class="icono" alt="Añadir al carrito"> Añadir al carrito`;
    }
  }

  // Añadir o eliminar libro del carrito
  btnCart.addEventListener("click", () => {
    let cart = getCart();

    if (isInCart(bookTitle)) {
      cart = cart.filter((item) => item.nombre !== bookTitle);
    } else {
      const book = {
        nombre: bookTitle,
        autor: bookAuthor,
        precio: bookPrice,
        imagen: bookImage,
      };
      cart.push(book);
    }

    saveCart(cart);
    updateButton();
  });

  // Inicializar botón al cargar
  updateButton();
}

// PAGINA CARRITO

//Carga de productos desde localStorage
const cartData = JSON.parse(localStorage.getItem("carrito")) || [];

const cartSection = document.querySelector(".cart-section");
if (cartSection) {
  cartSection.innerHTML = ""; // Limpiamos el contenido existente

  if (cartData.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Tu carrito está vacío.";
    cartSection.appendChild(emptyMsg);
  } else {
    const header = document.createElement("div");
    header.className = "cart-header";
    header.innerHTML = `<span>Carrito</span><span>Precio</span>`;
    cartSection.appendChild(header);

    let subtotal = 0;

    cartData.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";

      itemDiv.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" />
        <div class="item-details">
          <div class="item-title">${item.nombre}</div>
          <div class="item-author">por ${item.autor}</div>
          <div class="stock">En stock</div>
          <div class="gift-option">
            <label><input type="checkbox" /> Es un regalo</label>
            <a href="#">Más información</a>
          </div>
          <div class="item-actions">
            <label>
              Cant.:
              <select class="cantidad-select" data-index="${index}">
                ${[1, 2, 3]
                  .map(
                    (n) =>
                      `<option value="${n}" ${
                        n === item.cantidad ? "selected" : ""
                      }>${n}</option>`
                  )
                  .join("")}
              </select>
            </label>
            <a href="#" class="eliminar" data-index="${index}">Eliminar</a>
            <a href="#">Guardar para más tarde</a>
            <a href="#">Compartir</a>
          </div>
        </div>
        <div class="price">${item.precio}€</div>
      `;
      cartSection.appendChild(itemDiv);
      subtotal += parseFloat(item.precio) * cartData.length;
    });

    const subtotalDiv = document.createElement("div");
    subtotalDiv.className = "subtotal-row";
    subtotalDiv.innerHTML = `
      <div class="subtotal-text">Subtotal (${cartData.length} producto${
      cartData.length > 1 ? "s" : ""
    }): 
        <span style="font-weight: bold">${subtotal.toFixed(2)} €</span></div>
      <button class="checkout-button">Tramitar pedido</button>
    `;
    cartSection.appendChild(subtotalDiv);
  }

  /* Ventana modal de confirmacion */

  const confirmModal = document.getElementById("confirmModal");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  let indexToDelete = null;

  cartSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      e.preventDefault();
      indexToDelete = parseInt(e.target.dataset.index);
      confirmModal.style.display = "flex"; // Mostrar modal
    }
  });

  confirmDeleteBtn.addEventListener("click", () => {
    if (indexToDelete !== null) {
      // Eliminar producto del array
      cartData.splice(indexToDelete, 1);
      // Actualizar localStorage
      localStorage.setItem("carrito", JSON.stringify(cartData));
      // Ocultar modal
      confirmModal.style.display = "none";
      indexToDelete = null;
      // Recargar o refrescar carrito
      location.reload();
    }
  });

  cancelDeleteBtn.addEventListener("click", () => {
    confirmModal.style.display = "none";
    indexToDelete = null;
  });
}

// Evita que se ejecute en la página carrito.html
if (!window.location.pathname.includes("carrito.html")) {
  const cartIcon = document.getElementById("cart-icon");
  const cartPreview = document.getElementById("cart-preview");
  const previewItems = document.getElementById("preview-items");
  const goToCartBtn = document.getElementById("go-to-cart");

  const cartData = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para renderizar vista previa
  function renderCartPreview() {
    previewItems.innerHTML = "";

    if (cartData.length === 0) {
      previewItems.textContent = "Tu carrito está vacío.";
      goToCartBtn.style.display = "none";
      return;
    }

    // Mostrar máximo 3 productos
    const itemsToShow = cartData.slice(0, 3);
    itemsToShow.forEach((item) => {
      const itemDiv = document.createElement("div");

      itemDiv.innerHTML = `
        <span>${item.nombre}</span>
        <span>${parseFloat(item.precio).toFixed(2)} €</span>
      `;

      previewItems.appendChild(itemDiv);
    });

    goToCartBtn.style.display = "block";
  }

  // Mostrar preview al posicionar el ratón
  cartIcon.addEventListener("mouseenter", () => {
    renderCartPreview();
    cartPreview.style.display = "block";
  });

  // Ocultar preview al salir
  cartIcon.addEventListener("mouseleave", () => {
    // Usamos timeout para permitir pasar el ratón al preview sin que desaparezca inmediatamente
    setTimeout(() => {
      if (!cartPreview.matches(":hover")) {
        cartPreview.style.display = "none";
      }
    }, 200);
  });

  cartPreview.addEventListener("mouseleave", () => {
    cartPreview.style.display = "none";
  });

  cartPreview.addEventListener("mouseenter", () => {
    cartPreview.style.display = "block";
  });

  // Botón ir al carrito
  goToCartBtn.addEventListener("click", () => {
    window.location.href = "carrito.html";
  });
}
