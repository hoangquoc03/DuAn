<?php include 'config.php'; ?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $room_name = $_POST['room_name'];
    $price = $_POST['price'];
    $area = $_POST['area'];
    $address = $_POST['address'];
    $description = $_POST['description'];
    
    $image = $_FILES['image']['name'];
    move_uploaded_file($_FILES['image']['tmp_name'], "uploads/" . $image);

    $stmt = $conn->prepare("INSERT INTO rooms (room_name, price, area, address, description, image) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sddsss", $room_name, $price, $area, $address, $description, $image);
    $stmt->execute();

    header("Location: index.php");
}
?>
<form method="POST" enctype="multipart/form-data">
    <h2>Thêm phòng trọ</h2>
    Tên phòng: <input type="text" name="room_name"><br>
    Giá: <input type="number" name="price" step="0.01"><br>
    Diện tích (m²): <input type="number" name="area" step="0.1"><br>
    Địa chỉ: <input type="text" name="address"><br>
    Mô tả: <textarea name="description"></textarea><br>
    Ảnh: <input type="file" name="image"><br>
    <button type="submit">Thêm</button>
</form>