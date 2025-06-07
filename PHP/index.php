<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "boarding_house";
$conn = new mysqli($host, $user, $pass, $db);

// Thêm
if (isset($_POST['add'])) {
    $ten = $_POST['ten'];
    $diachi = $_POST['diachi'];
    $gia = $_POST['gia'];
    $dientich = $_POST['dientich'];
    $conn->query("INSERT INTO nhatro (ten, diachi, gia, dientich) VALUES ('$ten', '$diachi', '$gia', '$dientich')");
}

// Xoá
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $conn->query("DELETE FROM nhatro WHERE id = $id");
}

// Cập nhật
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $ten = $_POST['ten'];
    $diachi = $_POST['diachi'];
    $gia = $_POST['gia'];
    $dientich = $_POST['dientich'];
    $conn->query("UPDATE nhatro SET ten='$ten', diachi='$diachi', gia='$gia', dientich='$dientich' WHERE id=$id");
}

// Lấy dữ liệu để sửa
$editData = null;
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $result = $conn->query("SELECT * FROM nhatro WHERE id = $id");
    $editData = $result->fetch_assoc();
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Quản lý nhà trọ</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/icon/styleP.css">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" sizes="57x57" href="/ico/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/ico/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/ico/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/ico/apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/ico/apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/ico/apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/ico/apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/ico/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/ico/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/ico/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/ico/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/ico/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/ico/favicon-16x16.png" />
    <link rel="manifest" href="./img/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />
</head>

<body>

    <div class="container">
        <h2 class="mb-4">🏠 Quản lý nhà trọ</h2>

        <!-- Form thêm/sửa -->
        <div class="form-container">
            <form method="post">
                <input type="hidden" name="id" value="<?= $editData['id'] ?? '' ?>">
                <div class="row mb-3">
                    <div class="col">
                        <label class="form-label">Tên nhà trọ:</label>
                        <input type="text" class="form-control" name="ten" value="<?= $editData['ten'] ?? '' ?>"
                            required>
                    </div>
                    <div class="col">
                        <label class="form-label">Địa chỉ:</label>
                        <input type="text" class="form-control" name="diachi" value="<?= $editData['diachi'] ?? '' ?>"
                            required>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <label class="form-label">Giá thuê (triệu/tháng):</label>
                        <input type="number" step="0.1" class="form-control" name="gia"
                            value="<?= $editData['gia'] ?? '' ?>" required>
                    </div>
                    <div class="col">
                        <label class="form-label">Diện tích (m²):</label>
                        <input type="number" step="0.1" class="form-control" name="dientich"
                            value="<?= $editData['dientich'] ?? '' ?>" required>
                    </div>
                </div>
                <button type="submit" name="<?= $editData ? 'update' : 'add' ?>" class="btn btn-custom">
                    <?= $editData ? 'Cập nhật nhà trọ' : 'Thêm nhà trọ' ?>
                </button>
            </form>
        </div>

        <!-- Danh sách nhà trọ -->
        <div class="table-container">
            <table class="table table-bordered table-striped table-hover mt-4">
                <thead class="table-success">
                    <tr>
                        <th>ID</th>
                        <th>Tên nhà trọ</th>
                        <th>Địa chỉ</th>
                        <th>Giá (triệu)</th>
                        <th>Diện tích (m²)</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
        $result = $conn->query("SELECT * FROM nhatro ORDER BY id DESC");
        while ($row = $result->fetch_assoc()) {
          echo "<tr>
            <td>{$row['id']}</td>
            <td>{$row['ten']}</td>
            <td>{$row['diachi']}</td>
            <td>{$row['gia']}</td>
            <td>{$row['dientich']}</td>
            <td>
              <a href='?edit={$row['id']}' class='btn btn-warning btn-sm'>Sửa</a>
              <a href='?delete={$row['id']}' class='btn btn-danger btn-sm' onclick='return confirm(\"Bạn chắc chắn muốn xoá?\")'>Xoá</a>
            </td>
          </tr>";
        }
        ?>
                </tbody>
            </table>
        </div>
    </div>

</body>

</html>