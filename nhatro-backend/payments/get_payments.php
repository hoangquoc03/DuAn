<?php
header('Content-Type: application/json; charset=utf-8');
include '../db.php'; // đảm bảo đúng đường dẫn kết nối

$sql = "SELECT 
            p.payment_id,
            p.amount,
            p.payment_date,
            p.note,
            r.room_number,
            t.name AS tenant_name
        FROM payments p
        JOIN rooms r ON p.room_id = r.room_id
        JOIN tenants t ON p.tenant_id = t.tenant_id
        ORDER BY p.payment_date DESC";

$result = $conn->query($sql);

$payments = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $payments[] = $row;
    }
    echo json_encode($payments, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Lỗi truy vấn: " . $conn->error]);
}
?>