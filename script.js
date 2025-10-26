const form = document.getElementById('purchaseForm');
const list = document.getElementById('purchaseList');
const infoText = document.getElementById('infoText');

let purchases = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const select = document.getElementById('itemSelect');
  const name = select.options[select.selectedIndex].text;
  const price = parseFloat(document.getElementById('itemPrice').value);

  if (!price || price <= 0) return;

  purchases.push({ name, price });
  renderList();
  form.reset();
});

function renderList() {
  list.innerHTML = '';
  let total = 0;

  purchases.forEach((item, index) => {
    total += item.price;

    const div = document.createElement('div');
    div.className = 'flex justify-between items-center border p-3 rounded shadow';
    div.innerHTML = `
      <div class="flex items-center space-x-3">
        <div>
          <p class="font-semibold">${item.name}</p>
          <p class="text-gray-600">${item.price} грн</p>
        </div>
      </div>
      <button class="text-red-600 hover:text-red-800" onclick="deleteItem(${index})">Видалити</button>
    `;
    list.appendChild(div);
  });

  infoText.textContent = `Покупок: ${purchases.length} | Загальна вартість: ${total.toFixed(2)} грн`;
}

function deleteItem(index) {
  purchases.splice(index, 1);
  renderList();
}
