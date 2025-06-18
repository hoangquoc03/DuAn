<?php
header('Content-Type: application/json');
include '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$payment_id = $data['payment_id'] ?? null;
$room_id = $data['room_id'] ?? null;
$tenant_id = $data['tenant_id'] ?? null;
$amount = $data['amount'] ?? null;
$payment_date = $data['payment_date'] ?? null;
$note = $data['note'] ?? '';

if ($payment_id && $room_id && $tenant_id && $amount && $payment_date) {
    $stmt = $conn->prepare("UPDATE payments SET room_id = ?, tenant_id = ?, amount = ?, payment_date = ?, note = ? WHERE payment_id = ?");
    $stmt->bind_param("iidssi", $room_id, $tenant_id, $amount, $payment_date, $note, $payment_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Đã cập nhật thanh toán']);
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