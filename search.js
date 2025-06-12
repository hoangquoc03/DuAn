document.addEventListener("DOMContentLoaded", function () {
  function normalize(str) {
    return str
      .replace(/Đ/g, "D") // thay Đ → D
      .replace(/đ/g, "d") // thay đ → d
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
      .replace(/[^\w\s]|_/g, "") // loại bỏ dấu câu
      .replace(/\s+/g, "") // loại bỏ khoảng trắng
      .trim()
      .toLowerCase()
      .replace(/hanoi/g, "hanoi"); // thay thế thủ công nếu cần
  }

  const savedFilters = JSON.parse(localStorage.getItem("headerFilters"));
  if (savedFilters) {
    const type = document.getElementById("type");
    const location = document.getElementById("location");
    const price = document.getElementById("price");

    if (type && savedFilters.type) type.value = savedFilters.type;
    if (location && savedFilters.location)
      location.value = savedFilters.location;
    if (price && savedFilters.price) price.value = savedFilters.price;
  }

  ["type", "location", "price"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", () => {
        const filters = {
          type: document.getElementById("type")?.value,
          location: document.getElementById("location")?.value,
          price: document.getElementById("price")?.value,
        };
        localStorage.setItem("headerFilters", JSON.stringify(filters));
      });
    }
  });

  // === 3. XỬ LÝ NÚT TÌM KIẾM ===
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const type = document.getElementById("type")?.value;
      const location = document.getElementById("location")?.value;
      const price = document.getElementById("price")?.value;

      const filters = { type, location, price };
      localStorage.setItem("headerFilters", JSON.stringify(filters));

      let targetUrl = "";
      switch (type) {
        case "nhanguyencan":
          targetUrl = "/html/homeN_in.html";
          break;
        case "nhatro":
          targetUrl = "/html/home_in.html";
          break;
        case "canho":
          targetUrl = "/html/canho_in.html";
          break;
        default:
          targetUrl = "/html/home_in.html";
      }

      window.location.href = `${targetUrl}?location=${location}&price=${price}`;
    });
  }

  const params = new URLSearchParams(window.location.search);
  const locationFilter = params.get("location");
  const priceFilter = params.get("price");

  if (locationFilter || priceFilter) {
    const items = document.querySelectorAll(".main__item");

    items.forEach((item) => {
      const address = item
        .querySelector(".main__info--add1")
        ?.innerText.toLowerCase();
      const priceText = item.querySelector(".main__info--price")?.innerText;
      const match = priceText && priceText.match(/\d+(\.\d+)?/);
      const priceValue = match ? parseFloat(match[0]) : 0;

      let locationNorm = normalize(locationFilter);
      let matchLocation =
        !locationFilter ||
        (address && normalize(address).includes(locationNorm)) ||
        normalize(address).includes(locationNorm + " ha noi");

      let matchPrice = true;

      if (!isNaN(priceValue)) {
        if (priceFilter === "duoi") {
          matchPrice = priceValue < 1;
        } else if (priceFilter === "bang") {
          matchPrice = priceValue >= 2 && priceValue <= 3;
        } else if (priceFilter === "tren") {
          matchPrice = priceValue > 3 && priceValue <= 5;
        } else if (priceFilter === "lon") {
          matchPrice = priceValue > 5 && priceValue <= 8;
        } else if (priceFilter === "ratlon") {
          matchPrice = priceValue > 8 && priceValue <= 9;
        }
      }

      console.log("So sánh normalize:", {
        addressRaw: address,
        addressNormalized: normalize(address),
        locationRaw: locationFilter,
        locationNormalized: normalize(locationFilter),
      });

      if (matchLocation && matchPrice) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
});
