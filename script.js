/* =====================================================
   DIPSHA CAFE - JAVASCRIPT
   ===================================================== */


/* ================= LOADER ================= */

window.addEventListener("load", function () {

  const loader = document.querySelector(".loader");

  setTimeout(function () {
      loader.classList.add("hidden");
  }, 800);

});


/* ================= NAVBAR SCROLL ================= */

const header = document.querySelector("header");

window.addEventListener("scroll", function () {

  if (window.scrollY > 50) {
      header.classList.add("scrolled");
  } else {
      header.classList.remove("scrolled");
  }

});


/* ================= MOBILE NAVBAR ================= */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", function () {

  navLinks.classList.toggle("active");

});


/* CLOSE MOBILE MENU AFTER CLICKING A LINK */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

  item.addEventListener("click", function () {

      navLinks.classList.remove("active");

  });

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

  revealElements.forEach(function (element) {

      const windowHeight = window.innerHeight;

      const elementTop =
          element.getBoundingClientRect().top;

      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {

          element.classList.add("active");

      }

  });

}


window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ================= ANIMATED COUNTERS ================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;


function startCounters() {

  const statsSection =
      document.querySelector(".stats");

  const sectionPosition =
      statsSection.getBoundingClientRect().top;

  const screenPosition =
      window.innerHeight;


  if (
      sectionPosition < screenPosition - 100 &&
      !counterStarted
  ) {

      counterStarted = true;


      counters.forEach(function (counter) {

          const target =
              Number(counter.getAttribute("data-target"));

          let count = 0;

          const increment =
              Math.ceil(target / 100);


          const updateCounter =
              setInterval(function () {

                  count += increment;


                  if (count >= target) {

                      counter.textContent = target;

                      clearInterval(updateCounter);

                  } else {

                      counter.textContent = count;

                  }

              }, 20);

      });

  }

}


window.addEventListener("scroll", startCounters);

startCounters();


/* ================= MENU FILTER ================= */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const menuCards =
  document.querySelectorAll(".menu-card");


filterButtons.forEach(function (button) {

  button.addEventListener("click", function () {

      /* REMOVE ACTIVE CLASS */

      filterButtons.forEach(function (btn) {

          btn.classList.remove("active");

      });


      /* ADD ACTIVE CLASS */

      button.classList.add("active");


      const filter =
          button.getAttribute("data-filter");


      /* FILTER MENU ITEMS */

      menuCards.forEach(function (card) {

          const category =
              card.getAttribute("data-category");


          if (
              filter === "all" ||
              category === filter
          ) {

              card.style.display = "block";

              card.style.animation =
                  "fadeUp 0.5s ease forwards";

          } else {

              card.style.display = "none";

          }

      });

  });

});


/* ================= SHOPPING CART ================= */

let cart = [];


/* GET ALL ADD TO CART BUTTONS */

const addCartButtons =
  document.querySelectorAll(".add-cart");


const cartItemsContainer =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");


/* ADD ITEM TO CART */

addCartButtons.forEach(function (button) {

  button.addEventListener("click", function () {

      const name =
          button.getAttribute("data-name");

      const price =
          Number(
              button.getAttribute("data-price")
          );


      /* CHECK IF ITEM ALREADY EXISTS */

      const existingItem =
          cart.find(function (item) {

              return item.name === name;

          });


      if (existingItem) {

          existingItem.quantity++;

      } else {

          cart.push({

              name: name,
              price: price,
              quantity: 1

          });

      }


      updateCart();


      /* SMALL BUTTON ANIMATION */

      button.style.transform =
          "scale(1.2)";

      setTimeout(function () {

          button.style.transform = "";

      }, 200);

  });

});


/* ================= UPDATE CART ================= */

function updateCart() {

  cartItemsContainer.innerHTML = "";


  /* EMPTY CART */

  if (cart.length === 0) {

      cartItemsContainer.innerHTML = `

          <p class="empty-cart">
              Your cart is empty ☕
          </p>

      `;

  } else {


      /* DISPLAY CART ITEMS */

      cart.forEach(function (item, index) {

          const cartItem =
              document.createElement("div");

          cartItem.classList.add("cart-item");


          cartItem.innerHTML = `

              <div class="cart-item-info">

                  <h4>
                      ${item.name}
                  </h4>

                  <p>
                      ₹${item.price}
                  </p>


                  <div class="quantity-controls">

                      <button
                          class="decrease"
                          data-index="${index}">

                          −

                      </button>


                      <span>
                          ${item.quantity}
                      </span>


                      <button
                          class="increase"
                          data-index="${index}">

                          +

                      </button>

                  </div>

              </div>


              <button
                  class="remove-item"
                  data-index="${index}">

                  <i class="fa-solid fa-trash"></i>

              </button>

          `;


          cartItemsContainer.appendChild(cartItem);

      });

  }


  /* CALCULATE TOTAL ITEMS */

  const totalItems =
      cart.reduce(function (total, item) {

          return total + item.quantity;

      }, 0);


  /* CALCULATE TOTAL PRICE */

  const totalPrice =
      cart.reduce(function (total, item) {

          return total +
              item.price * item.quantity;

      }, 0);


  /* UPDATE CART UI */

  cartCount.textContent = totalItems;

  cartTotal.textContent = totalPrice;


  addCartFunctionality();

}


/* ================= CART BUTTON FUNCTIONS ================= */

function addCartFunctionality() {


  /* INCREASE QUANTITY */

  const increaseButtons =
      document.querySelectorAll(".increase");


  increaseButtons.forEach(function (button) {

      button.addEventListener("click", function () {

          const index =
              button.getAttribute("data-index");

          cart[index].quantity++;

          updateCart();

      });

  });



  /* DECREASE QUANTITY */

  const decreaseButtons =
      document.querySelectorAll(".decrease");


  decreaseButtons.forEach(function (button) {

      button.addEventListener("click", function () {

          const index =
              button.getAttribute("data-index");


          if (cart[index].quantity > 1) {

              cart[index].quantity--;

          } else {

              cart.splice(index, 1);

          }


          updateCart();

      });

  });



  /* REMOVE ITEM */

  const removeButtons =
      document.querySelectorAll(".remove-item");


  removeButtons.forEach(function (button) {

      button.addEventListener("click", function () {

          const index =
              button.getAttribute("data-index");


          cart.splice(index, 1);


          updateCart();

      });

  });

}


/* ================= OPEN / CLOSE CART ================= */

const cartBtn =
  document.getElementById("cartBtn");

const cartSidebar =
  document.getElementById("cartSidebar");

const closeCart =
  document.getElementById("closeCart");

const cartOverlay =
  document.getElementById("cartOverlay");


cartBtn.addEventListener("click", function () {

  cartSidebar.classList.add("active");

  cartOverlay.classList.add("active");

});


closeCart.addEventListener("click", closeShoppingCart);


cartOverlay.addEventListener("click", closeShoppingCart);


function closeShoppingCart() {

  cartSidebar.classList.remove("active");

  cartOverlay.classList.remove("active");

}


/* ================= TESTIMONIAL SLIDER ================= */

const testimonials =
  document.querySelectorAll(".testimonial");

const dots =
  document.querySelectorAll(".dot");

let currentTestimonial = 0;


/* SHOW TESTIMONIAL */

function showTestimonial(index) {


  testimonials.forEach(function (testimonial) {

      testimonial.classList.remove("active");

  });


  dots.forEach(function (dot) {

      dot.classList.remove("active");

  });


  testimonials[index].classList.add("active");

  dots[index].classList.add("active");

}


/* DOT CLICK */

dots.forEach(function (dot, index) {

  dot.addEventListener("click", function () {

      currentTestimonial = index;

      showTestimonial(currentTestimonial);

  });

});


/* AUTO SLIDER */

setInterval(function () {

  currentTestimonial++;


  if (
      currentTestimonial >=
      testimonials.length
  ) {

      currentTestimonial = 0;

  }


  showTestimonial(currentTestimonial);

}, 5000);


/* ================= BACK TO TOP BUTTON ================= */

const backToTop =
  document.getElementById("backToTop");


window.addEventListener("scroll", function () {

  if (window.scrollY > 500) {

      backToTop.classList.add("show");

  } else {

      backToTop.classList.remove("show");

  }

});


backToTop.addEventListener("click", function () {

  window.scrollTo({

      top: 0,

      behavior: "smooth"

  });

});


/* ================= CONTACT FORM ================= */

const contactForm =
  document.querySelector(".contact-form");


contactForm.addEventListener("submit", function (event) {

  event.preventDefault();


  const submitButton =
      contactForm.querySelector("button");


  const originalText =
      submitButton.innerHTML;


  submitButton.innerHTML =
      `Message Sent <i class="fa-solid fa-check"></i>`;


  submitButton.style.pointerEvents =
      "none";


  setTimeout(function () {

      submitButton.innerHTML =
          originalText;


      submitButton.style.pointerEvents =
          "auto";


      contactForm.reset();

  }, 2500);

});


/* ================= CHECKOUT BUTTON ================= */

const checkoutButton =
  document.querySelector(".checkout-btn");


checkoutButton.addEventListener("click", function () {


  if (cart.length === 0) {

      alert("Your cart is empty! Add something delicious ☕");

      return;

  }


  alert(
      "Thank you for choosing DIPSHA Café! ☕\n\n" +
      "Your order has been placed successfully."
  );


  /* CLEAR CART */

  cart = [];


  updateCart();


  closeShoppingCart();

});


/* ================= SMOOTH ACTIVE NAV LINK ================= */

const sections =
  document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

  const scrollPosition =
      window.scrollY + 150;


  sections.forEach(function (section) {

      const sectionTop =
          section.offsetTop;

      const sectionHeight =
          section.offsetHeight;

      const sectionId =
          section.getAttribute("id");


      if (
          scrollPosition >= sectionTop &&
          scrollPosition <
          sectionTop + sectionHeight
      ) {

          navItems.forEach(function (link) {

              link.classList.remove("nav-active");

          });


          const activeLink =
              document.querySelector(
                  `.nav-links a[href="#${sectionId}"]`
              );


          if (activeLink) {

              activeLink.classList.add("nav-active");

          }

      }

  });

});