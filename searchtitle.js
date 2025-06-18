// Helper: Normalize strings (remove diacritics, spaces, lowercase)
function normalizeString(str) {
  return str
    .replace(/Đ/g, "D")
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

// Fetch all listings from DOM
const listings = Array.from(document.querySelectorAll(".main__item"))
  .map((item) => {
    return {
      element: item,
      code: item.querySelector(".main__info--code")?.innerText.trim(),
      price: item.querySelector(".main__info--price")?.innerText.trim(),
      type: item.querySelector(".main__info1")?.innerText.trim(),
      location: item.querySelector(".main__info--add1")?.innerText.trim(),
    };
  })
  .filter((item) => item.code && item.price && item.type && item.location);

// Create suggestion box
const searchInput = document.getElementById("keyword");
const suggestionBox = document.createElement("div");
suggestionBox.className = "suggestion-box";
suggestionBox.style.position = "absolute";
suggestionBox.style.background = "white";
suggestionBox.style.border = "1px solid #ccc";
suggestionBox.style.width = "550px";
suggestionBox.style.maxHeight = "300px";
suggestionBox.style.overflowY = "auto";
suggestionBox.style.zIndex = "999";
suggestionBox.style.display = "none";
suggestionBox.style.right = "auto";
suggestionBox.style.left = "0";
suggestionBox.style.transform = "none";
searchInput.parentElement.appendChild(suggestionBox);

function renderSuggestions(results) {
  suggestionBox.innerHTML = "";

  if (results.length > 0) {
    const header = document.createElement("div");
    header.textContent = " Địa điểm được nhiều người tìm kiếm";
    header.style.padding = "10px";
    header.style.fontWeight = "bold";
    header.style.borderBottom = "1px solid #eee";
    suggestionBox.appendChild(header);
  }

  results.forEach((result) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerHTML = `
      <div style="display: flex; gap: 8px;">
        <i class="fa-solid fa-location-dot" style="color: #555; margin-top: 4px;"></i>
        <div>
          <div style="font-weight: 600;">${result.code}</div>
          <div style="font-size: 12px; color: #666;">
            ${result.location}
          </div>
        </div>
      </div>
    `;
    div.style.padding = "12px";
    div.style.cursor = "pointer";
    div.addEventListener("click", () => {
      searchInput.value = result.code;
      document.getElementById("type").value = mapTypeToValue(result.type);
      document.getElementById("location").value = normalizeString(
        result.location
      );

      const priceValue = parseFloat(result.price.match(/\d+(\.\d+)?/)[0]);
      const priceSelect = document.getElementById("price");
      if (priceValue < 1) priceSelect.value = "duoi";
      else if (priceValue >= 2 && priceValue <= 3) priceSelect.value = "bang";
      else if (priceValue > 3 && priceValue <= 5) priceSelect.value = "tren";
      else if (priceValue > 5 && priceValue <= 8) priceSelect.value = "lon";
      else if (priceValue > 8) priceSelect.value = "ratlon";

      suggestionBox.style.display = "none";

      // Move selected result to top
      const container = document.querySelector(".main__item--container");
      if (container && result.element) {
        container.prepend(result.element);
      }
    });
    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = results.length ? "block" : "none";
}

function mapTypeToValue(typeText) {
  const map = {
    "Nhà nguyên căn": "nhanguyencan",
    "Nhà Nguyên căn": "nhanguyencan",
    "Nhà trọ,phòng trọ": "nhatro",
    "Căn hộ": "canho",
  };
  return map[typeText] || "";
}

searchInput.addEventListener("input", (e) => {
  const query = normalizeString(e.target.value);
  if (!query) {
    suggestionBox.style.display = "none";
    return;
  }
  const matched = listings.filter((item) =>
    normalizeString(item.code).includes(query)
  );
  renderSuggestions(matched);
});

searchInput.addEventListener("focus", () => {
  const shuffled = listings.sort(() => 0.5 - Math.random()).slice(0, 4);
  renderSuggestions(shuffled);
});

document.addEventListener("click", (e) => {
  if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
    suggestionBox.style.display = "none";
  }
});
