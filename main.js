const imPosition = document.querySelectorAll(".container.background img");
const imContainer = document.querySelector(".container.background");
const dotItem = document.querySelectorAll(".dot1");
let imgNumber = imPosition.length;
let index = 0;

imPosition.forEach((image, i) => {
  image.style.left = i * 100 + "%";
  image.style.position = "absolute";
});

function showImage(i) {
  index = i;
  imContainer.style.transform = `translateX(-${index * 100}%)`;

  dotItem.forEach((dot) => dot.classList.remove("active"));
  dotItem[index].classList.add("active");
}

dotItem.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showImage(i);
  });
});

function autoSlide() {
  index++;
  if (index >= imgNumber) index = 0;
  showImage(index);
}
setInterval(autoSlide, 5000);

document.querySelectorAll(".info-item .btn").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelector(".container").classList.toggle("log-in");
  });
});

// đăng nhập và đăng ký
function register(event) {
  event.preventDefault();

  let username = document.getElementById("regUsername").value.trim();
  let password = document.getElementById("regPassword").value.trim();
  let email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  let fullName = document.getElementById("regFullname").value.trim();
  let regMessage = document.getElementById("regMessage");

  let lowerCaseLetter = /[a-z]/g;
  let upperCaseLetter = /[A-Z]/g;
  let numbers = /[0-9]/g;

  regMessage.style.color = "red";

  if (!email && !phone) {
    regMessage.textContent = "Vui lòng nhập email hoặc Số điện thoại.";
    return;
  }

  if (!username || !password || (!email && !phone) || !fullName) {
    regMessage.innerText =
      "Vui lòng nhập đầy đủ thông tin! (Email hoặc SĐT là bắt buộc)";
    return;
  }

  if (password.length < 8) {
    regMessage.innerText = "Mật khẩu phải có ít nhất 8 kí tự.";
    return;
  }
  if (!lowerCaseLetter.test(password)) {
    regMessage.innerText = "Mật khẩu phải bao gồm chữ cái thường.";
    return;
  }
  if (!upperCaseLetter.test(password)) {
    regMessage.innerText = "Mật khẩu phải bao gồm chữ cái In hoa.";
    return;
  }
  if (!numbers.test(password)) {
    regMessage.innerText = "Mật khẩu phải bao gồm chữ số.";
    return;
  }

  let user = {
    username: username,
    password: password,
    fullName: fullName,
    email: email,
  };

  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : {};

  if (users[username]) {
    regMessage.innerText = "Tên người dùng đã tồn tại!";
  } else {
    users[username] = user;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username); // Lưu trạng thái đăng nhập
    regMessage.innerText = "Đăng kí thành công";
    regMessage.style.color = "green";

    setTimeout(() => {
      window.location.href = "/html/logn_in.html";
    }, 1500);
  }
}
function login(event) {
  event.preventDefault();

  let username = document.getElementById("loginUsername").value.trim();
  let password = document.getElementById("loginPassword").value.trim();
  let loginMessage = document.getElementById("loginMessage");

  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : {};

  let storedUser = users[username];

  if (storedUser && storedUser.password === password) {
    loginMessage.innerText = "Đăng nhập thành công";
    loginMessage.style.color = "green";
    setTimeout(() => {
      window.location.href = "/html/logn_in.html";
    }, 1500);
  } else {
    loginMessage.innerText = "Sai tên người dùng hoặc mật khẩu";
    loginMessage.style.color = "red";
  }
}
/// trỏ hàng yêu thích
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
//  avater
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

  const currentUser = localStorage.getItem("currentUser");
  let allFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
  if (!allFavorites[currentUser]) {
    allFavorites[currentUser] = [];
  }
  let favorites = allFavorites[currentUser];

  function saveFavorites() {
    allFavorites[currentUser] = favorites;
    localStorage.setItem("favorites", JSON.stringify(allFavorites));
  }

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
          <a href="${item.link}" target="_blank" class="favorite-link" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit;">
            <img src="${item.image}" alt="Ảnh trọ" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
            <div class="favorite-details">
              <div class="favorite-title" style="font-weight: 600; font-size: 14px;">${item.title}</div>
              <div class="favorite-price" style="color: red; font-size: 13px;">${item.price}</div>
            </div>
          </a>
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

    updateHeartIcons();
  }

  function updateHeartIcons() {
    heartIcons.forEach((icon) => {
      const item = icon.closest(".main__item");

      const titleElement = item.querySelector(".main__info--code");
      const priceElement = item.querySelector(".main__info--price");

      if (!titleElement || !priceElement) return;

      const title = titleElement.innerText.trim();
      const price = priceElement.innerText.replace("Từ", "").trim();

      const isFavorited = favorites.some(
        (fav) => fav.title === title && fav.price === price
      );

      if (isFavorited) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid", "favorite");
      } else {
        icon.classList.remove("fa-solid", "favorite");
        icon.classList.add("fa-regular");
      }
    });
  }

  heartIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const item = icon.closest(".main__item");

      const titleElement = item.querySelector(".main__info--code");
      const priceElement = item.querySelector(".main__info--price");
      const imageElement = item.querySelector(".main__img");
      const linkElement = item.querySelector("a");

      if (!titleElement || !priceElement || !imageElement) {
        console.warn("Thiếu thông tin mục yêu thích:", {
          titleElement,
          priceElement,
          imageElement,
        });
        return;
      }
      const title = titleElement.innerText.trim();
      const price = priceElement.innerText.replace("Từ", "").trim();
      const image = imageElement.getAttribute("src");
      const link = linkElement ? linkElement.getAttribute("href") : "#";

      const index = favorites.findIndex(
        (fav) => fav.title === title && fav.price === price
      );

      if (index === -1) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid", "favorite");

        favorites.push({ title, price, image, link });
      } else {
        icon.classList.remove("fa-solid", "favorite");
        icon.classList.add("fa-regular");

        favorites.splice(index, 1);
      }

      saveFavorites();
      updateFavoritesList();
    });
  });

  heartIconHeader.addEventListener("click", function () {
    favoritesList.classList.toggle("active");
  });

  updateFavoritesList();
});
