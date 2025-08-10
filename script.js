const form = document.getElementById("orderForm");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toast");

  document.getElementById('delivery-date').min = new Date().toISOString().split("T")[0];

  function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="spinner"></div> Sending...`;

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        showToast("✅ آپ کا آرڈر موصول ہوگیا ہے!", "success");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      showToast("❌ کچھ غلط ہوگیا، دوبارہ کوشش کریں۔", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `📦 Submit Order`;
    }
  });