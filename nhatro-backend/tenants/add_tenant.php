<?php
header('Content-Type: application/json; charset=utf-8');
include '../db.php';

$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$identity_card = $_POST['identity_card'] ?? '';

if ($name && $phone && $identity_card) {
    $stmt = $conn->prepare("INSERT INTO tenants (name, phone, identity_card, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("sss", $name, $phone, $identity_card);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Thêm người thuê thành công']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Lỗi thêm dữ liệu: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Thiếu dữ liệu']);
}
?>