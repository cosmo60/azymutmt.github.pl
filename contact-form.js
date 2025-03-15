// Skrypt do obsługi formularza kontaktowego
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Walidacja formularza
            let isValid = true;
            const formElements = contactForm.querySelectorAll('input, textarea, select');
            
            formElements.forEach(element => {
                if (element.hasAttribute('required') && !element.value.trim()) {
                    element.classList.add('error');
                    isValid = false;
                } else {
                    element.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showNotification('Proszę wypełnić wszystkie wymagane pola', 'error');
                return;
            }
            
            // Pobranie danych z formularza
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // W tym miejscu zwykle byłby kod do wysyłania formularza
            // Poniżej jest przykład wykorzystania EmailJS (https://www.emailjs.com/)
            // W prawdziwej implementacji należy zastąpić poniższe ID oraz szablony własnymi
            
            // Powiadomienie o wysyłaniu
            showNotification('Wysyłanie wiadomości...', 'info');
            
            // Symulacja wysyłania e-maila (zastąp to rzeczywistą implementacją)
            sendEmail(formData)
                .then(() => {
                    // Sukces
                    showNotification('Wiadomość została wysłana. Dziękujemy!', 'success');
                    contactForm.reset();
                })
                .catch((error) => {
                    // Błąd
                    console.error('Błąd wysyłania wiadomości:', error);
                    showNotification('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.', 'error');
                });
        });
    }
    
    // Funkcja do wyświetlania powiadomień
    function showNotification(message, type = 'info') {
        // Sprawdź, czy kontener powiadomień istnieje
        let notificationContainer = document.querySelector('.notification-container');
        
        // Jeśli nie, utwórz go
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            notificationContainer.style.position = 'fixed';
            notificationContainer.style.top = '20px';
            notificationContainer.style.right = '20px';
            notificationContainer.style.zIndex = '1000';
            document.body.appendChild(notificationContainer);
        }
        
        // Utwórz powiadomienie
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style powiadomienia
        notification.style.padding = '15px 20px';
        notification.style.marginBottom = '10px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.1)';
        notification.style.fontSize = '14px';
        notification.style.transition = 'all 0.3s ease';
        
        // Kolory w zależności od typu powiadomienia
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#F44336';
            notification.style.color = 'white';
        } else if (type === 'info') {
            notification.style.backgroundColor = '#2196F3';
            notification.style.color = 'white';
        }
        
        // Dodaj powiadomienie do kontenera
        notificationContainer.appendChild(notification);
        
        // Usuń powiadomienie po pewnym czasie
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Funkcja do wysyłania e-maila (wykorzystując EmailJS - przykład)
    function sendEmail(formData) {
        // W rzeczywistej implementacji użyj EmailJS lub innego serwisu
        // Zwracamy Promise dla symulacji asynchronicznego wysyłania
        return new Promise((resolve, reject) => {
            // Symulacja opóźnienia
            setTimeout(() => {
                // Symulacja 90% szansy na sukces
                if (Math.random() < 0.9) {
                    resolve();
                } else {
                    reject(new Error('Błąd wysyłania'));
                }
            }, 1500);
            
            /* 
            // Rzeczywista implementacja z EmailJS wyglądałaby tak:
            emailjs.send('service_id', 'template_id', {
                from_name: formData.name,
                reply_to: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            }, 'user_id')
            .then(function(response) {
                resolve(response);
            }, function(error) {
                reject(error);
            });
            */
        });
    }
    
    // Dodanie klasy error do nieprawidłowych pól
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
});

// Dodatkowe style dla formularza
document.addEventListener('DOMContentLoaded', function() {
    // Tworzenie elementu style
    const style = document.createElement('style');
    style.textContent = `
        .form-control.error {
            border-color: #F44336 !important;
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.25) !important;
        }
        
        .notification {
            animation: slideIn 0.3s ease forwards;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    // Dodanie stylów do nagłówka
    document.head.appendChild(style);
});
