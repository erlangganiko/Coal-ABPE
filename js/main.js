document.addEventListener("DOMContentLoaded", function () {
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

  // Hero Section WhatsApp Buttons Logic
  const chatWhatsappBtn = document.getElementById("chat-whatsapp-btn");
  const getQuotationBtn = document.getElementById("get-quotation-btn");
  const heroWhatsappNumber = "6281234567890";

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

  const sliderContainer = document.querySelector(".slider-container");
  const productSlider = document.querySelector(".product-slider"); // Elemen yang akan di-grab
  const sliderTrack = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  const activeProductImg = document.getElementById("active-product-img");
  const activeProductTitle = document.getElementById("active-product-title");
  const activeProductDesc = document.getElementById("active-product-description");
  const getQuoteBtn = document.getElementById("get-quote-now-btn");
  const productWhatsappNumber = "6281234567890"; // Nomor WA untuk Product Section

  // --- SLIDER GRAB/SWIPE LOGIC VARIABLES ---
  let isDragging = false;
  let startPos = 0; 
  let currentTranslate = 0; 
  let prevTranslate = 0; 
  let animationID;
  const THRESHOLD = 50; // Jarak geser minimal untuk ganti slide

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
        prevTranslate = offsetForFirstRealSlide; // Set prevTranslate for grabbing
        
        realIndex = 0; // Set realIndex ke 0 (produk pertama asli)
        updateProductDisplay(realIndex); // Perbarui konten display
        
        setTimeout(() => {
            sliderTrack.style.transition = 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out'; // Hidupkan transisi normal
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
    
    // Hanya terapkan transform jika tidak sedang menggenggam
    if (!isDragging) {
      sliderTrack.style.transform = `translateX(${offset}px)`;
      prevTranslate = offset; // Update prevTranslate for next grab
    }

    allSlides.forEach((slide) => slide.classList.remove("active"));
    if (allSlides[centerIndex]) {
        allSlides[centerIndex].classList.add("active");
    }

    updateGetQuoteButton(product);
  }

  // Fungsi untuk memperbarui URL WhatsApp pada tombol "Get a Quote Now!"
  function updateGetQuoteButton(product) {
    const message = encodeURIComponent(
      `Hello ABPE Coal, I'm highly impressed with your *${product.title}*! It seems to be exactly what I need for a superior experience. Could you please provide a detailed quotation, including minimum order quantity and shipping options? I'm ready to discuss placing an order. Thank you!`
    );
    if (getQuoteBtn) {
        getQuoteBtn.href = `https://wa.me/${productWhatsappNumber}?text=${message}`;
        getQuoteBtn.setAttribute('target', '_blank');
        getQuoteBtn.setAttribute('rel', 'noopener noreferrer');
    }
  }

  // moveSlider kini akan dipanggil oleh tombol dan grabEnd
  function moveSlider(direction) { // direction: 1 for next, -1 for previous
    const slideWidth = sliderTrack.querySelector(".slide").clientWidth;
    
    let newRealIndex = realIndex + direction;
    let targetCenterIndex; // Index slide target di track yang diperluas (termasuk klon)
    let finalRealIndex; // Index produk asli setelah potensi teleportasi

    if (newRealIndex >= productData.length) {
        targetCenterIndex = totalClonedSlides + productData.length; // Target klon pertama di akhir
        finalRealIndex = 0; // Setelah teleport, akan kembali ke produk asli pertama
    } else if (newRealIndex < 0) {
        targetCenterIndex = totalClonedSlides - 1; // Target klon terakhir di awal
        finalRealIndex = productData.length - 1; // Setelah teleport, akan kembali ke produk asli terakhir
    } else {
        targetCenterIndex = newRealIndex + totalClonedSlides; // Target slide asli
        finalRealIndex = newRealIndex; // Tanpa teleport
    }

    const targetOffset = (sliderTrack.clientWidth / 2) - (slideWidth / 2) - (targetCenterIndex * slideWidth);

    sliderTrack.style.transition = 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out';
    sliderTrack.style.transform = `translateX(${targetOffset}px)`;
    prevTranslate = targetOffset; // Update prevTranslate for grab berikutnya

    // Implementasi Fade-out, Teleport, Fade-in
    if (newRealIndex >= productData.length || newRealIndex < 0) { // Jika akan terjadi teleport
        sliderTrack.classList.add('fade-out'); // Memudar
        
        setTimeout(() => { // Setelah fade-out selesai
            sliderTrack.style.transition = 'none'; // Matikan transisi untuk lompatan instan
            const resetOffset = (sliderTrack.clientWidth / 2) - (slideWidth / 2) - (finalRealIndex + totalClonedSlides) * slideWidth;
            sliderTrack.style.transform = `translateX(${resetOffset}px)`;
            prevTranslate = resetOffset; // Update prevTranslate setelah lompatan

            realIndex = finalRealIndex; // Perbarui realIndex setelah teleport
            updateProductDisplay(realIndex); // Perbarui konten display utama

            sliderTrack.classList.remove('fade-out'); // Hapus fade-out
            sliderTrack.classList.add('fade-in'); // Memudar kembali
            
            setTimeout(() => { // Setelah fade-in selesai
                sliderTrack.classList.remove('fade-in');
                sliderTrack.style.transition = 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out'; // Kembali ke transisi normal
            }, 300); // Durasi fade-in
        }, 500); // Durasi transisi transform sebelum fade-out
    } else {
        // Jika tidak ada teleport, langsung perbarui realIndex dan display
        realIndex = newRealIndex;
        updateProductDisplay(realIndex);
    }
  }

  // Event Listeners for slider arrows (tetap ada untuk desktop)
  nextBtn.addEventListener("click", () => {
    moveSlider(1); // Panggil fungsi pembantu
  });

  prevBtn.addEventListener("click", () => {
    moveSlider(-1); // Panggil fungsi pembantu
  });


  // Initialize slider
  loadProducts();

  // Handle window resize to re-center slider
  window.addEventListener('resize', () => {
    loadProducts();
    updateProductDisplay(realIndex);
  });


  // --- GRAB/SWIPE LOGIC ---

  productSlider.addEventListener('mousedown', grabStart);
  productSlider.addEventListener('mouseup', grabEnd);
  productSlider.addEventListener('mouseleave', grabEnd); // Penting jika mouse keluar saat drag
  productSlider.addEventListener('mousemove', grabMove);
  productSlider.addEventListener('dragstart', (event) => event.preventDefault()); // Mencegah drag default pada elemen\
  
// Untuk perangkat sentuh
  productSlider.addEventListener('touchstart', grabStart);
  productSlider.addEventListener('touchend', grabEnd);
  productSlider.addEventListener('touchcancel', grabEnd);
  productSlider.addEventListener('touchmove', grabMove);

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function grabStart(event) {
    // Pastikan tombol panah tidak ikut digeser
    if (event.target.closest('.slider-arrow')) {
      return;
    }

    isDragging = true;
    productSlider.classList.add('grabbing');
    startPos = getPositionX(event);
    sliderTrack.style.transition = 'none'; // Matikan transisi saat mulai geser
    
    // Ambil posisi translateX saat ini sebelum memulai geser
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(sliderTrack).transform).m41;
    prevTranslate = currentTransform;

    animationID = requestAnimationFrame(animation);
  }

  function grabMove(event) {
    if (!isDragging) return;

    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    
    setSliderPosition();
  }

  function grabEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    productSlider.classList.remove('grabbing');
    
    const movedBy = currentTranslate - prevTranslate; // Seberapa jauh digeser dari posisi awal drag
    const slideWidth = sliderTrack.querySelector(".slide").clientWidth;

    // Tentukan arah geser
    let direction = 0; // 0 = tidak bergerak
    if (movedBy < -THRESHOLD) { // Geser ke kiri (Next slide)
      direction = 1;
    } else if (movedBy > THRESHOLD) { // Geser ke kanan (Previous slide)
      direction = -1;
    }

    if (direction !== 0) {
        moveSlider(direction); // Panggil moveSlider untuk menangani transisi dan looping
    } else {
        // Jika geseran tidak cukup, kembali ke posisi awal slide (snap back)
        const targetCenterIndex = realIndex + totalClonedSlides; 
        const targetOffset = (sliderTrack.clientWidth / 2) - (slideWidth / 2) - (targetCenterIndex * slideWidth); 
        sliderTrack.style.transition = 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out'; // Hidupkan transisi
        sliderTrack.style.transform = `translateX(${targetOffset}px)`; 
        prevTranslate = targetOffset;
    }
  }

  function animation() { 
    if (isDragging) { 
        requestAnimationFrame(animation);
    }
  }

  function setSliderPosition() { 
    sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
  }
  // --- END GRAB/SWIPE LOGIC ---


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

      const web3formsEndpoint = "https://api.web3forms.com/submit";
      const accessKey = "6931b2c5-0978-482b-8023-aab6018cfb56";

      const formData = new FormData(contactForm);
      formData.append("access_key", accessKey);


      try {
        const response = await fetch(web3formsEndpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok) {
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
    const currentProduct = productData[realIndex];
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

  // Floating WhatsApp Button Logic START
  const floatingWhatsappBtn = document.getElementById("floating-whatsapp-btn");
  const floatingWhatsappNumber = "6281234567890";
  const floatingWhatsappMessage = encodeURIComponent(
    `Hello ABPE Coal! I am interested in your premium coconut charcoal products. Could you please provide more information and assistance? Thank you!`
  );

  if (floatingWhatsappBtn) {
    floatingWhatsappBtn.addEventListener('click', function(event) {
      event.preventDefault();
      window.open(`https://wa.me/${floatingWhatsappNumber}?text=${floatingWhatsappMessage}`, '_blank');
    });
  }
});
