<?php
header('Content-Type: application/json; charset=utf-8');
include '../db.php';

$tenant_id = $_POST['tenant_id'] ?? 0;

if ($tenant_id) {
    $stmt = $conn->prepare("DELETE FROM tenants WHERE tenant_id = ?");
    $stmt->bind_param("i", $tenant_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Xóa người thuê thành công']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Lỗi xóa dữ liệu: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Thiếu tenant_id']);
}
?>