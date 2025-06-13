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

// Order form submission using Getform
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert("🎉 Order placed! We'll contact you soon.");
        form.reset();
      } else {
        response.json().then(data => {
          alert(data.error || "❌ There was a problem with your order.");
        }).catch(() => {
          alert("❌ Submission failed. Please try again.");
        });
      }
    })
    .catch(() => {
      alert("⚠️ Network error. Please try again later.");
    });
  });
});
