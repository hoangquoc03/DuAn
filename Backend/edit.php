<?php include 'config.php'; ?>
<?php
$id = $_GET['id'];
$result = $conn->query("SELECT * FROM rooms WHERE id = $id");
$data = $result->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $room_name = $_POST['room_name'];
    $price = $_POST['price'];
    $area = $_POST['area'];
    $address = $_POST['address'];
    $description = $_POST['description'];
    
    if ($_FILES['image']['name']) {
        $image = $_FILES['image']['name'];
        move_uploaded_file($_FILES['image']['tmp_name'], "uploads/" . $image);
        $conn->query("UPDATE rooms SET room_name='$room_name', price=$price, area=$area, address='$address', description='$description', image='$image' WHERE id=$id");
    } else {
        $conn->query("UPDATE rooms SET room_name='$room_name', price=$price, area=$area, address='$address', description='$description' WHERE id=$id");
    }
    header("Location: index.php");
}
?>
<form method="POST" enctype="multipart/form-data">
    <h2>Sửa phòng trọ</h2>
    Tên phòng: <input type="text" name="room_name" value="<?= $data['room_name'] ?>"><br>
    Giá: <input type="number" name="price" step="0.01" value="<?= $data['price'] ?>"><br>
    Diện tích: <input type="number" name="area" step="0.1" value="<?= $data['area'] ?>"><br>
    Địa chỉ: <input type="text" name="address" value="<?= $data['address'] ?>"><br>
    Mô tả: <textarea name="description"><?= $data['description'] ?></textarea><br>
    Ảnh mới (tùy chọn): <input type="file" name="image"><br>
    <button type="submit">Cập nhật</button>
</form>