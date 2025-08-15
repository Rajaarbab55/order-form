const form = document.getElementById("orderForm");
const submitBtn = document.getElementById("submitBtn");
const toast = document.getElementById("toast");

const today = new Date();
today.setDate(today.getDate() + 1);
document.getElementById('delivery-date').min = today.toISOString().split("T")[0];

document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9\- ]/g, '');
});

function showToast(message, type) {
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<div class="spinner"></div> Sending...`;

  const formData = new FormData(form);

  
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const quantity = formData.get("quantity");
  const date = formData.get("delivery_date");
  const notes = formData.get("notes") || "No notes";

  const whatsappNumber = "923412987976";
  const message = `New Order:
Name: ${name}
Phone: ${phone}
Address: ${address}
Quantity: ${quantity}
Delivery Date: ${date}
Notes: ${notes}`;
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  
  window.open(whatsappURL, "_blank");

  showToast("✅ WhatsApp khul raha hai...", "success");
  form.reset();
  submitBtn.disabled = false;
  submitBtn.innerHTML = `📦 Submit Order`;
});
