<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"));

$username = $data->Username;
$password = $data->Password;
$email = $data->Email;
$phone = $data->Phone;
$fullname = $data->fullname;

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["message" => "Tên đăng nhập đã tồn tại"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO users (username, password, email, phone, fullname, role) VALUES (?, ?, ?, ?, ?, 'user')");
$stmt->bind_param("sssss", $username, $password, $email, $phone, $fullname);
$stmt->execute();

echo json_encode(["message" => "Đăng ký thành công"]);
?>