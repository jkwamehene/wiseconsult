// Resources Page JavaScript
// ============================================

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');

        // Close other open items in the same category
        const parent = this.closest('.faq-accordion');
        parent.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
                item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');

        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        } else {
            answer.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

console.log('✓ Resources page scripts loaded');
