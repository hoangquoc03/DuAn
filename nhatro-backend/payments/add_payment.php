<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$room_id = $data['room_id'] ?? null;
$tenant_id = $data['tenant_id'] ?? null;
$amount = $data['amount'] ?? null;
$payment_date = $data['payment_date'] ?? null;
$note = $data['note'] ?? '';

if ($room_id && $tenant_id && $amount && $payment_date) {
    $stmt = $conn->prepare("INSERT INTO payments (room_id, tenant_id, amount, payment_date, note) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iidss", $room_id, $tenant_id, $amount, $payment_date, $note);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Đã thêm thanh toán']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $stmt->error]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Thiếu dữ liệu']);
}
?>