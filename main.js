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
