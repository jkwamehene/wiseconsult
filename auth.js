// Authentication Functionality
// ============================================

// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// ========== PASSWORD TOGGLE ==========
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// ========== ADMIN LOGIN FORM ==========
const adminLoginForm = document.getElementById('adminLoginForm');

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        // Show loading state
        const submitBtn = adminLoginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual authentication)
        setTimeout(() => {
            // Demo credentials - REMOVE IN PRODUCTION
            if (email === 'admin@veritransgh.com' && password === 'admin123') {
                showNotification('Login successful! Redirecting to dashboard...', 'success');
                setTimeout(() => {
                    // Redirect to admin dashboard
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            } else {
                showNotification('Invalid credentials. Please try again.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 1500);
    });
}

// ========== CUSTOMER LOGIN FORM ==========
const customerLoginForm = document.getElementById('customerLoginForm');

if (customerLoginForm) {
    customerLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('customerEmail').value;
        const password = document.getElementById('customerPassword').value;

        // Show loading state
        const submitBtn = customerLoginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual authentication)
        setTimeout(() => {
            // Demo credentials - REMOVE IN PRODUCTION
            if (email && password.length >= 6) {
                showNotification('Login successful! Welcome back!', 'success');
                setTimeout(() => {
                    // Redirect to customer dashboard
                    window.location.href = 'customer-dashboard.html';
                }, 1500);
            } else {
                showNotification('Invalid credentials. Please try again.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 1500);
    });
}

// ========== SOCIAL LOGIN BUTTONS ==========
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('btn-google') ? 'Google' : 'Facebook';
        showNotification(`${provider} authentication coming soon!`, 'info');
    });
});

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ========== FORM VALIDATION ==========
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');

        let message = 'This field is required';
        if (this.type === 'email') {
            message = 'Please enter a valid email address';
        }
        showNotification(message, 'error');
    });

    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

console.log('✓ Authentication scripts loaded');
