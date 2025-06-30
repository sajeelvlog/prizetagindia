// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Order form logic
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  const mobileInput = document.getElementById('phone');
  const whatsappInput = document.getElementById('whatsapp');
  const sameWhatsappCheckbox = document.getElementById('sameAsPhone');

  sameWhatsappCheckbox.addEventListener('change', function () {
    if (this.checked) {
      whatsappInput.value = mobileInput.value;
      whatsappInput.setAttribute('readonly', 'readonly');
    } else {
      whatsappInput.removeAttribute('readonly');
      whatsappInput.value = '';
    }
  });

  mobileInput.addEventListener('input', function () {
    if (sameWhatsappCheckbox.checked) {
      whatsappInput.value = mobileInput.value;
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const mobile = mobileInput.value.trim();
    const whatsapp = whatsappInput.value.trim();
    const selectedPayment = document.querySelector('input[name="payment"]:checked')?.value;
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
      alert("📱 Mobile number must be exactly 10 digits.");
      return;
    }

    if (!sameWhatsappCheckbox.checked && !mobileRegex.test(whatsapp)) {
      alert("📲 WhatsApp number must also be 10 digits.");
      return;
    }

    if (!selectedPayment) {
      alert("💳 Please select a payment method.");
      return;
    }

    whatsappInput.removeAttribute('readonly');

    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbwmsxsRWERW3R_Pjlbik1_xVlhea7guXLDxqhp-gvXpkp9ZrE4iU2_uPfmEyaVOhJvI/exec", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert("🎉 Order placed! We'll contact you soon.");
        form.reset();
        whatsappInput.removeAttribute('readonly');
      } else {
        alert("❌ Submission failed. Please try again.");
      }
    })
    .catch(() => {
      alert("⚠️ Network error. Please try again later.");
    });
  });
});
