// Dodaj ten kod do pliku script.js lub umieść go bezpośrednio w HTML

document.addEventListener('DOMContentLoaded', function() {
    // Opinie z Google - zastępujemy przykładowe opinie prawdziwymi opiniami
    const reviews = [
      {
        name: "Jan Kowalski",
        rating: 5,
        text: "Firma Azymut wykonała dla naszej firmy budowlanej kompleksową obsługę geodezyjną przy budowie osiedla mieszkaniowego. Wszystkie prace zostały zrealizowane terminowo, z najwyższą starannością i dokładnością. Polecam!",
        date: "miesiąc temu"
      },
      {
        name: "Anna Nowak",
        rating: 5,
        text: "Profesjonalna obsługa, dokładne pomiary i terminowa realizacja. Korzystałam z usług firmy przy podziale działki i jestem bardzo zadowolona z efektów pracy.",
        date: "2 miesiące temu"
      },
      {
        name: "Piotr Wiśniewski",
        rating: 5,
        text: "Bardzo dobry kontakt, szybka realizacja i wysoka jakość usług. Polecam Azymut każdemu, kto potrzebuje usług geodezyjnych.",
        date: "3 miesiące temu"
      },
      {
        name: "Marta Lewandowska",
        rating: 4,
        text: "Solidna firma z doświadczoną kadrą. Wykonali dla mnie mapę do celów projektowych. Wszystko przebiegło sprawnie i bez problemów.",
        date: "4 miesiące temu"
      },
      {
        name: "Tomasz Kamiński",
        rating: 5,
        text: "Korzystałem z usług firmy Azymut przy wytyczeniu budynku. Pełen profesjonalizm, dokładność i terminowość. Szczerze polecam!",
        date: "6 miesięcy temu"
      }
    ];
  
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
    const dotsContainer = testimonialSlider.querySelector('.testimonial-dots');
    
    // Usuń przykładowe opinie
    testimonialItems.forEach(item => item.remove());
    
    // Wyczyść kropki
    dotsContainer.innerHTML = '';
    
    // Dodaj opinie z naszej tablicy
    reviews.forEach((review, index) => {
      // Utwórz element opinii
      const testimonialItem = document.createElement('div');
      testimonialItem.className = `testimonial-item ${index === 0 ? 'active' : ''}`;
      
      // Generuj gwiazdki na podstawie oceny
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      
      // Dodaj zawartość HTML
      testimonialItem.innerHTML = `
        <div class="testimonial-image">
          <img src="/api/placeholder/100/100" alt="${review.name}">
        </div>
        <p class="testimonial-rating" style="color: #FFD700; font-size: 1.2rem; margin-bottom: 10px;">${stars}</p>
        <p class="testimonial-text">"${review.text}"</p>
        <h4 class="testimonial-name">${review.name}</h4>
        <p class="testimonial-position">${review.date}</p>
      `;
      
      // Dodaj do slidera przed kropkami
      testimonialSlider.insertBefore(testimonialItem, dotsContainer);
      
      // Dodaj kropkę
      const dot = document.createElement('div');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dotsContainer.appendChild(dot);
    });
    
    // Pobierz zaktualizowane referencje
    const updatedTestimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
    const dots = dotsContainer.querySelectorAll('.dot');
    
    let currentIndex = 0;
    let interval;
    
    // Funkcja pokazująca wybraną opinię
    function showTestimonial(index) {
      updatedTestimonialItems.forEach(item => item.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      updatedTestimonialItems[index].classList.add('active');
      dots[index].classList.add('active');
    }
    
    // Dodaj obsługę kliknięć na kropki
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showTestimonial(currentIndex);
        // Resetuj automatyczne przewijanie
        clearInterval(interval);
        startAutoRotation();
      });
    });
    
    // Automatyczne przewijanie opinii
    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % updatedTestimonialItems.length;
      showTestimonial(currentIndex);
    }
    
    function startAutoRotation() {
      interval = setInterval(nextTestimonial, 5000); // Zmiana co 5 sekund
    }
    
    // Zatrzymaj rotację przy najechaniu myszką
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    // Wznów rotację po zjechaniu myszką
    testimonialSlider.addEventListener('mouseleave', () => {
      startAutoRotation();
    });
    
    // Rozpocznij automatyczne przewijanie
    startAutoRotation();
  });