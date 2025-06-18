<?php
// Trả về dữ liệu JSON và mã hóa UTF-8
header('Content-Type: application/json; charset=utf-8');

// Kết nối database
include '../db.php'; // chỉnh lại đường dẫn nếu khác

// Kiểm tra kết nối
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Không thể kết nối cơ sở dữ liệu"]);
    exit;
}

// Truy vấn lấy danh sách tenant
$sql = "SELECT tenant_id, name, phone, identity_card, created_at FROM tenants";
$result = $conn->query($sql);

$tenants = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tenants[] = $row;
    }
    echo json_encode($tenants, JSON_UNESCAPED_UNICODE);
} else if ($result) {
    echo json_encode([]); // Không có dữ liệu
} else {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi truy vấn: " . $conn->error]);
}
?>