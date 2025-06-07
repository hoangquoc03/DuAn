document.addEventListener("DOMContentLoaded", function () {
  const heartIcons = document.querySelectorAll(".img__icon7 .fa-heart");
  const heartCount = document.getElementById("heart-count");
  const heartIconHeader = document.getElementById("heart-icon");

  const favoritesList = document.createElement("div");
  favoritesList.classList.add("favorites-list");
  heartIconHeader.parentElement.appendChild(favoritesList);

  const headerTitle = document.createElement("div");
  headerTitle.classList.add("favorites-list-header");
  headerTitle.innerText = "Trọ đã lưu";
  favoritesList.appendChild(headerTitle);

  let favorites = [];

  function updateFavoritesList() {
    favoritesList.innerHTML = "";
    favoritesList.appendChild(headerTitle);

    if (favorites.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.classList.add("favorite-item");
      emptyMsg.innerText = "Danh sách ưu thích trống";
      favoritesList.appendChild(emptyMsg);
    } else {
      favorites.forEach((item) => {
        const newItem = document.createElement("div");
        newItem.classList.add("favorite-item");

        newItem.innerHTML = `
          <img src="${item.image}" alt="Ảnh trọ">
          <div class="favorite-details">
            <div class="favorite-title">${item.title}</div>
            <div class="favorite-price">${item.price}</div>
          </div>
        `;
        favoritesList.appendChild(newItem);
      });

      const footer = document.createElement("div");
      footer.classList.add("favorites-list-footer");
      footer.innerHTML = 'Xem tất cả <i class="fa-solid fa-arrow-right"></i>';
      favoritesList.appendChild(footer);
    }

    heartCount.innerText = favorites.length;
    heartCount.style.display = favorites.length ? "block" : "none";
  }

  heartIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const item = icon.closest(".main__item");
      const title = item.querySelector(".main__info--code").innerText;
      const price = item.querySelector(".main__info--price").innerText;
      const image = item.querySelector("img").getAttribute("src");

      const index = favorites.findIndex(
        (fav) => fav.title === title && fav.price === price
      );

      if (index === -1) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid", "favorite");

        favorites.push({ title, price, image });
      } else {
        icon.classList.remove("fa-solid", "favorite");
        icon.classList.add("fa-regular");

        favorites.splice(index, 1);
      }

      updateFavoritesList();
    });
  });

  heartIconHeader.addEventListener("click", function () {
    favoritesList.classList.toggle("active");
  });

  updateFavoritesList();
});
