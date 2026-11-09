/* 
    References & Technical Documentation Sources:
    - MDN Web Docs. (2026). Client-side form validation. Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
    - MDN Web Docs. (2026). Using the Fetch API. Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    - W3Schools. (2026). HTML5 Form Validation Attributes. W3Schools Online Web Tutorials. Retrieved November 3, 2026, from https://www.w3schools.com/html/html_form_validation.asp
    - W3Schools. (2026). JavaScript Regular Expressions. W3Schools Online Web Tutorials. Retrieved November 3, 2026, from https://www.w3schools.com/js/js_regexp.asp

     - Mozilla Developer Network, 2023. Document: DOMContentLoaded event. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Document: getElementById() method. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Document: createElement() method. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Event: submit event. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Regular expressions. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions> [Accessed 3 November 2026].

*/



// Form Elements
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('char-count');

// Form field elements
const formFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    messageType: document.getElementById('message-type'),
    subject: document.getElementById('subject'),
    message: messageTextarea,
    agreeTerms: document.getElementById('agree-terms')
};

// Error message elements
const errorMessages = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    messageType: document.getElementById('message-type-error'),
    subject: document.getElementById('subject-error'),
    message: document.getElementById('message-error'),
    agreeTerms: document.getElementById('agree-terms-error')
};

// Validation Rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[a-zA-Z\s\-']+$/,
        messages: {
            required: 'Full name is required',
            minLength: 'Name must be at least 2 characters',
            maxLength: 'Name cannot exceed 100 characters',
            pattern: 'Name can only contain letters, spaces, hyphens, and apostrophes'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
            required: 'Email address is required',
            pattern: 'Please enter a valid email address'
        }
    },
    phone: {
        required: true,
        pattern: /^[\d\s\-\+\(\)]{10,}$/,
        messages: {
            required: 'Phone number is required',
            pattern: 'Please enter a valid phone number (at least 10 digits)'
        }
    },
    messageType: {
        required: true,
        messages: {
            required: 'Please select an enquiry type'
        }
    },
    subject: {
        required: true,
        minLength: 5,
        maxLength: 100,
        messages: {
            required: 'Subject is required',
            minLength: 'Subject must be at least 5 characters',
            maxLength: 'Subject cannot exceed 100 characters'
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 5000,
        messages: {
            required: 'Message is required',
            minLength: 'Message must be at least 10 characters',
            maxLength: 'Message cannot exceed 5000 characters'
        }
    },
    agreeTerms: {
        required: true,
        messages: {
            required: 'You must agree to be contacted'
        }
    }
};



/*Validate a single field*/
function validateField(fieldName) {
    const field = formFields[fieldName];
    const rules = validationRules[fieldName];
    let value = field.value.trim();

    // Special handling for checkbox
    if (fieldName === 'agreeTerms') {
        value = field.checked;
    }

    // Check required
    if (rules.required && !value) {
        showError(fieldName, rules.messages.required);
        return false;
    }

    // Check minLength
    if (rules.minLength && value.length < rules.minLength) {
        showError(fieldName, rules.messages.minLength);
        return false;
    }

    // Check maxLength
    if (rules.maxLength && value.length > rules.maxLength) {
        showError(fieldName, rules.messages.maxLength);
        return false;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
        showError(fieldName, rules.messages.pattern);
        return false;
    }

    // Field is valid
    clearError(fieldName);
    return true;
}

/*Validate all form fields*/
function validateForm() {
    let isValid = true;
    Object.keys(formFields).forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });
    return isValid;
}

/*Show error message for a field*/
function showError(fieldName, message) {
    const field = formFields[fieldName];
    const errorElement = errorMessages[fieldName];

    if (field) field.classList.add('error');
    if (field) field.classList.remove('success');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/*Clear error message for a field*/
function clearError(fieldName) {
    const field = formFields[fieldName];
    const errorElement = errorMessages[fieldName];

    if (field) field.classList.remove('error');
    if (field) field.classList.add('success');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

/*Show form status message*/
function showFormStatus(type, title, message) {
    formStatus.className = `form-status show ${type}`;
    formStatus.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* Hide form status message*/
function hideFormStatus() {
    formStatus.classList.remove('show');
}

/*Submit form via AJAX simulation*/
async function submitFormAJAX(event) {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
        showFormStatus('error', 'Validation Error', 'Please fix the errors above and try again.');
        return;
    }

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline-block';

    try {
        // Simulate network delay for submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Success
        showFormStatus('success', 'Success!', 'Your message has been sent successfully. We will get back to you soon.');
        contactForm.reset();

        // Clear all field states
        Object.keys(formFields).forEach(fieldName => {
            if (formFields[fieldName]) formFields[fieldName].classList.remove('error', 'success');
            if (errorMessages[fieldName]) errorMessages[fieldName].classList.remove('show');
        });

        // Reset character count
        updateCharCount();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            hideFormStatus();
        }, 5000);

    } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('error', 'Network Error', 'Unable to send message. Please check your connection and try again.');
    } finally {
        // Re-enable submit button and hide loading state
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}

/* Update character count for message textarea */
function updateCharCount() {
    if (!messageTextarea || !charCount) return;
    const count = messageTextarea.value.length;
    charCount.textContent = `${count} / 5000`;
}



if (contactForm) {
    // Form submission
    contactForm.addEventListener('submit', submitFormAJAX);

    // Real-time validation on input
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (!field) return;
        
        field.addEventListener('blur', () => {
            validateField(fieldName);
        });

        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(fieldName);
            }
        });

        field.addEventListener('change', () => {
            if (field.classList.contains('error')) {
                validateField(fieldName);
            }
        });
    });

    // Character count update
    if (messageTextarea) {
        messageTextarea.addEventListener('input', updateCharCount);
        updateCharCount();
    }
}

console.log('Form validation initialized');