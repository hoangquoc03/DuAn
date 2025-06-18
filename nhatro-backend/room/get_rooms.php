<?php
header('Content-Type: application/json');

// Kết nối database
include '../db.php'; // điều chỉnh đúng đường dẫn nếu file nằm trong folder room/

// Truy vấn lấy danh sách phòng
$sql = "SELECT 
            room_id, 
            room_number, 
            price, 
            status, 
            landlord_id, 
            tenant_id, 
            rented_from, 
            due_date 
        FROM rooms";

$result = $conn->query($sql);

$rooms = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row;
    }
    echo json_encode($rooms);
} else {
    // Nếu lỗi truy vấn, trả lỗi ra frontend
    echo json_encode(["error" => "Lỗi truy vấn: " . $conn->error]);
}
?>