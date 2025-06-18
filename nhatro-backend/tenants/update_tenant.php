<?php
header('Content-Type: application/json; charset=utf-8');
include '../db.php';

$tenant_id = $_POST['tenant_id'] ?? 0;
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$identity_card = $_POST['identity_card'] ?? '';

if ($tenant_id && $name && $phone && $identity_card) {
    $stmt = $conn->prepare("UPDATE tenants SET name = ?, phone = ?, identity_card = ? WHERE tenant_id = ?");
    $stmt->bind_param("sssi", $name, $phone, $identity_card, $tenant_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Cập nhật người thuê thành công']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Lỗi cập nhật: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Thiếu dữ liệu']);
}
?>