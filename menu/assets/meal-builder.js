// Meal Builder: loads items from data/dutch-bros.json if available,
// otherwise falls back to the built-in list below (same values).
const FALLBACK_ITEMS = [
  { name: "Golden Eagle Breve (medium, estimate)", price: 5.25, calories: 480 },
  { name: "Caramelizer Freeze (medium, estimate)", price: 5.75, calories: 550 },
  { name: "Blue Rebel, iced (medium, estimate)", price: 5.95, calories: 190 },
  { name: "Cold Brew with Soft Top (medium, estimate)", price: 5.25, calories: 120 },
  { name: "Chai Latte (medium, estimate)", price: 4.95, calories: 320 },
  { name: "Lemonade (medium, estimate)", price: 3.95, calories: 150 },
  { name: "Dutch Soda (medium, estimate)", price: 3.25, calories: 180 },
  { name: "Muffin Top (estimate)", price: 3.50, calories: 450 }
];

function render(items) {
  const box = document.getElementById("items");
  box.innerHTML = "";
  items.forEach((item, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" data-i="${i}"> ${item.name} — $${item.price.toFixed(2)} — ${item.calories} cal`;
    const qty = document.createElement("input");
    qty.type = "number"; qty.min = "1"; qty.value = "1"; qty.setAttribute("data-q", i);
    qty.style.maxWidth = "80px";
    label.appendChild(document.createTextNode(" Qty: "));
    label.appendChild(qty);
    box.appendChild(label);
  });
  window.__items = items;
}

function calculate() {
  let total = 0, cal = 0;
  document.querySelectorAll("#items input[type=checkbox]").forEach(cb => {
    if (!cb.checked) return;
    const i = parseInt(cb.getAttribute("data-i"), 10);
    const q = parseInt(document.querySelector(`[data-q="${i}"]`).value || "1", 10);
    total += window.__items[i].price * q;
    cal += window.__items[i].calories * q;
  });
  document.getElementById("total").textContent = `Total: $${total.toFixed(2)} — ${cal} calories (estimate)`;
}

function clearAll() {
  document.querySelectorAll("#items input").forEach(el => {
    if (el.type === "checkbox") el.checked = false;
    if (el.type === "number") el.value = "1";
  });
  document.getElementById("total").textContent = "Total: $0.00 — 0 calories (estimate)";
}

fetch("../data/dutch-bros.json")
  .then(r => r.json())
  .then(d => render(d.meal_builder_items || FALLBACK_ITEMS))
  .catch(() => render(FALLBACK_ITEMS));
