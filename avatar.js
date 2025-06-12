document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const currentUsername = localStorage.getItem("currentUser");
  const display = document.getElementById("usernameDisplay");
  const avatar = document.querySelector(".avatar");
  const dropdown = document.getElementById("userDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  if (display) {
    if (currentUsername && users[currentUsername]) {
      display.textContent = users[currentUsername].fullName || currentUsername;
    } else {
      display.textContent = "Khách";
    }
  }

  // Toggle dropdown
  if (avatar && dropdown) {
    avatar.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "/html/index.html"; // dẫn về trang chưa đăng nhập
    });
  }
});
