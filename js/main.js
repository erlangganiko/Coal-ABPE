document.addEventListener("DOMContentLoaded", function () {
  // =========== Navbar Interactivity ===========
  const navbar = document.querySelector(".navbar");
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".nav-menu");

  // Elements for the analysis modal - Deklarasi di awal scope DOMContentLoaded
  const analysisModalOverlay = document.getElementById("analysis-modal");
  const openAnalysisModalBtn = document.getElementById("open-analysis-modal-btn");
  const analysisProductImg = document.getElementById("analysis-product-img");
  const analysisProductTitle = document.getElementById("analysis-modal-product-title");
  const closeAnalysisModalBtn = analysisModalOverlay.querySelector(".modal-close-btn");


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

  // =========== Hero Section WhatsApp Buttons Logic ===========
  const chatWhatsappBtn = document.getElementById("chat-whatsapp-btn");
  const getQuotationBtn = document.getElementById("get-quotation-btn");
  const heroWhatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp ABPE Coal untuk Hero Section

  if (chatWhatsappBtn) {
    chatWhatsappBtn.addEventListener('click', function (event) {
      event.preventDefault();

      const message = encodeURIComponent(
        `Hello ABPE Coal, I'm interested in your premium charcoal briquette products. Could I get more information or discuss placing an order? Thank you!`
      );
      const whatsappUrl = `https://wa.me/${heroWhatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  if (getQuotationBtn) {
    getQuotationBtn.addEventListener('click', function (event) {
      event.preventDefault();

      const message = encodeURIComponent(
        `Hello ABPE Coal, I would like to request a quotation for your premium coconut charcoal briquettes. Please let me know what information you need from me to provide an accurate quote. Looking forward to hearing from you soon!`
      );
      const whatsappUrl = `https://wa.me/${heroWhatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }
  // =========== END Hero Section WhatsApp Buttons Logic ===========


  // =========== Product Slider Logic ===========
  const productData = [
    {
      id: 1,
      title: "Shisha Charcoal",
      description:
        "Hookah charcoal briquette is made of all-natural materials: coconut hell charcoal. Natural Coconut and a small portion of natural starch as binder. We carry out the process of mixing all these ingredients, we do heating until 48 hours to make quality hookah charcoal.",
      image: "assets/produk/produk1.webp",
    },
    {
      id: 2,
      title: "Pillow Briquette",
      description:
        "Ideal for barbecue and grilling, our pillow-shaped briquettes provide long-lasting, even heat. Made from premium coconut shell charcoal, they ensure your food is cooked perfectly with a natural, smoky flavor.",
      image: "assets/produk/produk2.webp",
    },
    {
      id: 3,
      title: "Hexagonal Briquette",
      description:
        "Our hexagonal briquettes are designed for high-heat applications and extended burn times. The unique shape allows for better airflow, making them perfect for professional kitchens and serious grill masters.",
      image: "assets/produk/produk3.webp",
    },
    {
      id: 4,
      title: "Cylinder Briquette",
      description:
        "These cylindrical briquettes are easy to light and provide consistent heat. They are a versatile option for both shisha and small grills, offering a clean and smoke-free burning experience.",
      image: "assets/produk/produk4.webp",
    },
    {
      id: 5,
      title: "Cube Briquette",
      description:
        "The classic cube shape is perfect for shisha and hookah enthusiasts. Our cubes are dense, burn for a long time with minimal ash, and do not interfere with the flavor of your shisha.",
      image: "assets/produk/produk5.webp",
    },
  ];

  const sliderTrack = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  const activeProductImg = document.getElementById("active-product-img");
  const activeProductTitle = document.getElementById(
    "active-product-title"
  );
  const activeProductDesc = document.getElementById(
    "active-product-description"
  );
  const getQuoteBtn = document.getElementById("get-quote-now-btn");

  const productWhatsappNumber = "6281234567890"; // Nomor WA untuk Product Section

  // --- START MODIFIKASI LOOP SLIDER ---
  let realIndex = 0; // Indeks aktual untuk productData
  let slidesPerView; // Akan dihitung berdasarkan lebar layar
  let totalClonedSlides = 0; // Jumlah slide yang dikloning

  function getSlidesPerView() {
    const trackWidth = sliderTrack.clientWidth;
    const slide = sliderTrack.querySelector(".slide");
    if (slide) {
      const slideWidth = slide.clientWidth;
      return Math.round(trackWidth / slideWidth);
    }
    return 4; // Fallback
  }

  function loadProducts() {
    sliderTrack.innerHTML = ''; // Clear existing slides first

    slidesPerView = getSlidesPerView();
    const clonesCount = Math.max(slidesPerView, 1);
    const slidesToCloneStart = productData.slice(-clonesCount);
    const slidesToCloneEnd = productData.slice(0, clonesCount);

    const fullProductList = [...slidesToCloneStart, ...productData, ...slidesToCloneEnd];
    totalClonedSlides = slidesToCloneStart.length;

    fullProductList.forEach((product) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.innerHTML = `<img src="${product.image}" alt="${product.title}">`;
      sliderTrack.appendChild(slide);
    });

    setTimeout(() => {
        const slideElements = sliderTrack.querySelectorAll(".slide");
        const slideWidth = slideElements.length > 0 ? slideElements[0].offsetWidth : 0;
        
        const offsetForFirstRealSlide = (sliderTrack.clientWidth / 2) - (slideWidth / 2) - (totalClonedSlides * slideWidth);
        
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(${offsetForFirstRealSlide}px)`;
        
        realIndex = 0; // Set realIndex ke 0 (produk pertama asli)
        updateProductDisplay(realIndex); // Perbarui konten display
        
        setTimeout(() => {
            sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    }, 0);
  }

  // updateProductDisplay kini hanya menerima realIndex dan menanganinya
  function updateProductDisplay(index) { // 'index' di sini adalah realIndex
    const product = productData[index]; // Gunakan index yang diterima untuk mengakses productData

    activeProductImg.src = product.image;
    activeProductTitle.textContent = product.title;
    activeProductDesc.textContent = product.description;

    const allSlides = Array.from(document.querySelectorAll(".slide"));
    const slideWidth = allSlides[0] ? allSlides[0].clientWidth : 0;
    const centerIndex = index + totalClonedSlides; // Posisi produk asli di track yang diperluas

    const trackWidth = sliderTrack.clientWidth;
    const offset = (trackWidth / 2) - (slideWidth / 2) - (centerIndex * slideWidth);
    sliderTrack.style.transform = `translateX(${offset}px)`;

    allSlides.forEach((slide) => slide.classList.remove("active"));
    if (allSlides[centerIndex]) {
        allSlides[centerIndex].classList.add("active");
    }

    // Panggil updateGetQuoteButton dengan produk yang sedang aktif
    updateGetQuoteButton(product); // <--- PASTIKAN INI DIPANGGIL DENGAN 'product' YANG BENAR
  }

  // Fungsi untuk memperbarui URL WhatsApp pada tombol "Get a Quote Now!"
  function updateGetQuoteButton(product) {
    const message = encodeURIComponent(
      `Hello ABPE Coal, I'm highly impressed with your *${product.title}*! It seems to be exactly what I need for a superior experience. Could you please provide a detailed quotation, including minimum order quantity and shipping options? I'm ready to discuss placing an order. Thank you!` // Text message yang lebih menarik
    );
    if (getQuoteBtn) {
        getQuoteBtn.href = `https://wa.me/${productWhatsappNumber}?text=${message}`;
        getQuoteBtn.setAttribute('target', '_blank');
        getQuoteBtn.setAttribute('rel', 'noopener noreferrer');
    }
  }

  // Event Listeners for slider arrows
  nextBtn.addEventListener("click", () => {
    const slideWidth = sliderTrack.querySelector(".slide").clientWidth;
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(sliderTrack).transform).m41;
    sliderTrack.style.transform = `translateX(${currentTransform - slideWidth}px)`;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    
    realIndex++; // Tingkatkan realIndex
    if (realIndex >= productData.length) {
      realIndex = 0; // Kembali ke 0 jika melewati batas
      
      setTimeout(() => {
        const resetOffset = (sliderTrack.clientWidth / 2) - (slideWidth / 2) - (totalClonedSlides * slideWidth);
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(${resetOffset}px)`;
        updateProductDisplay(realIndex); // Perbarui konten display
        setTimeout(() => {
          sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
      }, 500);
    } else {
      updateProductDisplay(realIndex); // Perbarui konten display
    }
  });

  prevBtn.addEventListener("click", () => {
    const slideWidth = sliderTrack.querySelector(".slide").clientWidth;
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(sliderTrack).transform).m41;
    sliderTrack.style.transform = `translateX(${currentTransform + slideWidth}px)`;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';

    realIndex--; // Kurangi realIndex
    if (realIndex < 0) {
      realIndex = productData.length - 1; // Kembali ke indeks terakhir jika kurang dari 0
      
      setTimeout(() => {
        const resetOffset = (sliderTrack.clientWidth / 2) - (slideWidth / 2) - ((productData.length - 1 + totalClonedSlides) * slideWidth);
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(${resetOffset}px)`;
        updateProductDisplay(realIndex); // Perbarui konten display
        setTimeout(() => {
          sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
      }, 500);
    } else {
      updateProductDisplay(realIndex); // Perbarui konten display
    }
  });


  // Initialize slider
  loadProducts();
  // updateProductDisplay(realIndex) sudah dipanggil di loadProducts saat inisialisasi awal.
  // updateGetQuoteButton(productData[realIndex]) juga sudah dipanggil melalui updateProductDisplay.

  // Handle window resize to re-center slider
  window.addEventListener('resize', () => {
    loadProducts(); // Muat ulang produk dan atur posisi awal
    updateProductDisplay(realIndex); // Atur ulang posisi berdasarkan realIndex
  });

  // =========== Contact Modal Logic ===========
  const contactModalOverlay = document.getElementById("contact-modal");
  const openContactModalButtons = document.querySelectorAll(".open-modal-btn");
  const closeContactModalButton = contactModalOverlay.querySelector(".modal-close-btn");
  const contactForm = document.getElementById("contact-form");

  const openContactModal = () => {
    contactModalOverlay.classList.add("show");
    const existingStatus = contactForm.parentNode.querySelector('.form-status');
    if (existingStatus) {
      existingStatus.remove();
    }
    contactForm.reset();
  };

  const closeContactModal = () => {
    contactModalOverlay.classList.remove("show");
    if (contactForm) {
      contactForm.reset();
    }
    const existingStatus = contactForm.parentNode.querySelector('.form-status');
    if (existingStatus) {
      existingStatus.remove();
    }
  };

  openContactModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openContactModal();
    });
  });

  if (closeContactModalButton) {
    closeContactModalButton.addEventListener("click", closeContactModal);
  }

  if (contactModalOverlay) {
    contactModalOverlay.addEventListener("click", (event) => {
      if (event.target === contactModalOverlay) {
        closeContactModal();
      }
    });
  }

  // Handle form submission
  // Pastikan contactForm sudah ada di DOM sebelum menambahkan event listener
  if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const formStatus = document.createElement('div');
      formStatus.style.marginTop = '1rem';
      formStatus.style.textAlign = 'center';

      const existingStatus = contactForm.parentNode.querySelector('.form-status');
      if (existingStatus) {
        existingStatus.remove();
      }

      // GANTI DENGAN ENDPOINT DARI WEB3FORMS ANDA
      const web3formsEndpoint = "https://api.web3forms.com/submit"; // Ini endpoint umum Web3Forms
      const accessKey = "6931b2c5-0978-482b-8023-aab6018cfb56"; // Anda akan mendapatkan ini dari Web3Forms

      // Pastikan Anda menambahkan input tersembunyi untuk access key di form HTML
      // <input type="hidden" name="access_key" value="6931b2c5-0978-482b-8023-aab6018cfb56">
      // Atau tambahkan ke FormData di JS:
      const formData = new FormData(contactForm);
      formData.append("access_key", accessKey);


      try {
        const response = await fetch(web3formsEndpoint, {
          method: 'POST',
          body: formData, // Gunakan formData yang sudah ditambahi access_key
          headers: {
            'Accept': 'application/json'
          }
        });

        const result = await response.json(); // Biasanya Web3Forms mengembalikan JSON response

        if (response.ok) { // Atau check result.success jika ada
          formStatus.className = 'form-status success';
          formStatus.style.color = 'green';
          formStatus.textContent = 'Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.';
          contactForm.reset();
          setTimeout(closeContactModal, 10000);
        } else {
          formStatus.className = 'form-status error';
          formStatus.style.color = 'red';
          formStatus.textContent = result.message || 'Gagal mengirim pesan. Silakan coba lagi.';
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.style.color = 'red';
        formStatus.textContent = 'Terjadi kesalahan jaringan. Silakan coba lagi.';
        console.error('Error submitting form:', error);
      }

      contactForm.parentNode.appendChild(formStatus);
    });
  }
  // =========== Analysis Modal Logic ===========
  const openAnalysisModal = () => {
    const currentProduct = productData[realIndex]; // Menggunakan realIndex untuk mendapatkan produk yang benar
    if (analysisProductImg) {
      analysisProductImg.src = currentProduct.image;
    }
    if (analysisProductTitle) {
      analysisProductTitle.textContent = currentProduct.title;
    }
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
