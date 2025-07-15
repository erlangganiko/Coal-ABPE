document.addEventListener("DOMContentLoaded", function () {
  // =========== Navbar Interactivity ===========
  const navbar = document.querySelector(".navbar");
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".nav-menu");

  // Solid background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hamburger menu toggle
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // =========== Hero Section WhatsApp Button Logic ===========
  const chatWhatsappBtn = document.getElementById("chat-whatsapp-btn"); // Ambil tombol "Chat via WhatsApp"
  const heroWhatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp ABPE Coal untuk Hero Section

  if (chatWhatsappBtn) {
    chatWhatsappBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Mencegah perilaku default tautan

      const message = encodeURIComponent(
        `Hello ABPE Coal, I'm interested in your premium charcoal briquette products. Could I get more information or discuss placing an order? Thank you!` // ENGLISH MESSAGE
      );
      const whatsappUrl = `https://wa.me/${heroWhatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank'); // Buka di tab/jendela baru
    });
  }
  // =========== END Hero Section WhatsApp Button Logic ===========


  // =========== Product Slider Logic ===========
  const productData = [
    {
      id: 1,
      title: "Shisha Charcoal",
      description:
        "Hookah charcoal briquette is made of all-natural materials: coconut hell charcoal. Natural Coconut and a small portion of natural starch as binder. We carry out the process of mixing all these ingredients, we do heating until 48 hours to make quality hookah charcoal.",
      image: "images/shisha-cube.png",
    },
    {
      id: 2,
      title: "Pillow Briquette",
      description:
        "Ideal for barbecue and grilling, our pillow-shaped briquettes provide long-lasting, even heat. Made from premium coconut shell charcoal, they ensure your food is cooked perfectly with a natural, smoky flavor.",
      image: "images/pillow.png",
    },
    {
      id: 3,
      title: "Hexagonal Briquette",
      description:
        "Our hexagonal briquettes are designed for high-heat applications and extended burn times. The unique shape allows for better airflow, making them perfect for professional kitchens and serious grill masters.",
      image: "images/hexagonal.png",
    },
    {
      id: 4,
      title: "Cylinder Briquette",
      description:
        "These cylindrical briquettes are easy to light and provide consistent heat. They are a versatile option for both shisha and small grills, offering a clean and smoke-free burning experience.",
      image: "images/cylinder.png",
    },
    {
      id: 5,
      title: "Cube Briquette",
      description:
        "The classic cube shape is perfect for shisha and hookah enthusiasts. Our cubes are dense, burn for a long time with minimal ash, and do not interfere with the flavor of your shisha.",
      image: "images/cube-stack.png",
    },
  ];

  const sliderTrack = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  const activeProductImg = document.getElementById("active-product-img");
  const activeProductTitle = document.getElementById("active-product-title");
  const activeProductDesc = document.getElementById(
    "active-product-description"
  );
  const getQuoteBtn = document.getElementById("get-quote-now-btn"); // Mengambil tombol "Get a Quote Now!"

  let currentIndex = 0;

  // Nomor WhatsApp tujuan (ganti dengan nomor Anda untuk produk)
  const productWhatsappNumber = "6281234567890"; // Nomor WA yang sama atau berbeda untuk Product Section

  // Load products into slider
  function loadProducts() {
    productData.forEach((product) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.innerHTML = `<img src="${product.image}" alt="${product.title}">`;
      sliderTrack.appendChild(slide);
    });
  }

  // Update product display and slider active state
  function updateProductDisplay(index) {
    // Update main display content
    const product = productData[index];
    activeProductImg.src = product.image;
    activeProductTitle.textContent = product.title;
    activeProductDesc.textContent = product.description;

    // Center the active slide
    const trackWidth = sliderTrack.clientWidth;
    const slideWidth = sliderTrack.querySelector(".slide").clientWidth;
    const offset = trackWidth / 2 - slideWidth / 2 - index * slideWidth;
    sliderTrack.style.transform = `translateX(${offset}px)`;

    // Update active class on slides
    const allSlides = document.querySelectorAll(".slide");
    allSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Perbarui fungsi tombol 'Get a Quote Now!' sesuai produk yang aktif
    updateGetQuoteButton(product);
  }

  // Fungsi untuk memperbarui URL WhatsApp pada tombol "Get a Quote Now!"
  function updateGetQuoteButton(product) {
    const message = encodeURIComponent(
      `Hello ABPE Coal, I am interested in your *${product.title}* product. Could you please provide more information or a price quotation for this item? I look forward to your prompt reply! Thank you.` // ENGLISH MESSAGE
    );
    if (getQuoteBtn) {
        getQuoteBtn.href = `https://wa.me/${productWhatsappNumber}?text=${message}`;
        getQuoteBtn.setAttribute('target', '_blank');
        getQuoteBtn.setAttribute('rel', 'noopener noreferrer');
    }
  }

  // Event Listeners for slider arrows
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % productData.length;
    updateProductDisplay(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + productData.length) % productData.length;
    updateProductDisplay(currentIndex);
  });

  // Initialize slider
  loadProducts();
  updateProductDisplay(currentIndex); // Panggil ini sekali di awal untuk mengisi data produk pertama
  updateGetQuoteButton(productData[currentIndex]); // Inisialisasi tombol quote untuk produk pertama


  // =========== Contact Modal Logic (Updated for Email Form) ===========
  const contactModalOverlay = document.getElementById("contact-modal");
  const openContactModalButtons = document.querySelectorAll(".open-modal-btn");
  const closeContactModalButton = contactModalOverlay.querySelector(".modal-close-btn");
  const contactForm = document.getElementById("contact-form"); // Ambil form berdasarkan ID

  // Fungsi untuk membuka modal kontak
  const openContactModal = () => {
    contactModalOverlay.classList.add("show");
    // Hapus pesan status sebelumnya saat modal dibuka kembali
    const existingStatus = contactForm.parentNode.querySelector('.form-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    contactForm.reset(); // Pastikan form direset juga saat dibuka
  };

  // Fungsi untuk menutup modal kontak
  const closeContactModal = () => {
    contactModalOverlay.classList.remove("show");
    if (contactForm) {
      contactForm.reset(); // Reset form saat modal ditutup
    }
    // HAPUS pesan status saat modal ditutup
    const existingStatus = contactForm.parentNode.querySelector('.form-status');
    if (existingStatus) {
        existingStatus.remove();
    }
  };

  // Add event listener to all "Request Access" buttons in Legal section
  openContactModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Mencegah default link behavior
      openContactModal();
    });
  });

  // Add event listener to the close button for contact modal
  if (closeContactModalButton) {
    closeContactModalButton.addEventListener("click", closeContactModal);
  }

  // Add event listener to the overlay to close contact modal when clicking outside
  if (contactModalOverlay) {
    contactModalOverlay.addEventListener("click", (event) => {
      if (event.target === contactModalOverlay) {
        closeContactModal();
      }
    });
  }

  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      let formStatus = contactForm.parentNode.querySelector('.form-status');
      if (!formStatus) { // Buat elemen status jika belum ada
          formStatus = document.createElement('div');
          formStatus.style.marginTop = '1rem';
          formStatus.style.textAlign = 'center';
          formStatus.classList.add('form-status'); // Pastikan kelas ditambahkan
          contactForm.parentNode.appendChild(formStatus);
      }
      formStatus.textContent = ''; // Bersihkan teks status sebelumnya
      formStatus.style.color = ''; // Bersihkan warna status
      formStatus.className = 'form-status'; // Reset kelas status

      // === INTEGRASI EMAIL (GANTI DENGAN ENDPOINT FORMSPREE/WEB3FORMS ANDA) ===
      const formspreeEndpoint = "https://formspree.io/f/your_form_id"; // GANTI DENGAN ENDPOINT FORMSPREE ANDA

      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.style.color = 'green';
          formStatus.textContent = 'Your message has been sent successfully! We will contact you shortly.'; // ENGLISH MESSAGE
          setTimeout(closeContactModal, 3000); // Tutup modal setelah 3 detik
        } else {
          formStatus.className = 'form-status error';
          formStatus.style.color = 'red';
          formStatus.textContent = 'Failed to send message. Please try again.'; // ENGLISH MESSAGE
          console.error('Form submission failed:', await response.json());
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.style.color = 'red';
        formStatus.textContent = 'A network error occurred. Please try again.'; // ENGLISH MESSAGE
        console.error('Error submitting form:', error);
      }
    });
  }

  // =========== Analysis Modal Logic ===========
  const analysisModalOverlay = document.getElementById("analysis-modal");
  const openAnalysisModalBtn = document.getElementById("open-analysis-modal-btn");
  const closeAnalysisModalBtn = analysisModalOverlay.querySelector(".modal-close-btn");
  const analysisProductImg = document.getElementById("analysis-product-img");
  const analysisProductTitle = document.getElementById("analysis-product-title");

  const openAnalysisModal = () => {
    const currentProduct = productData[currentIndex];
    analysisProductImg.src = currentProduct.image;
    analysisProductTitle.textContent = currentProduct.title;
    analysisModalOverlay.classList.add("show");
  };

  const closeAnalysisModal = () => {
    analysisModalOverlay.classList.remove("show");
  };

  if (openAnalysisModalBtn) {
    openAnalysisModalBtn.addEventListener("click", openAnalysisModal);
  }

  if (closeAnalysisModalBtn) {
    closeAnalysisModalBtn.addEventListener("click", closeAnalysisModal);
  }

  if (analysisModalOverlay) {
    analysisModalOverlay.addEventListener("click", (event) => {
      if (event.target === analysisModalOverlay) {
        closeAnalysisModal();
      }
    });
  }

  // Optional: Close any modal with the 'Escape' key
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (contactModalOverlay.classList.contains("show")) {
        closeContactModal();
      }
      if (analysisModalOverlay.classList.contains("show")) {
        closeAnalysisModal();
      }
    }
  });
});
