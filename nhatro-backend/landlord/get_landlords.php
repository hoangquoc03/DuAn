<?php
// Trả về JSON
header('Content-Type: application/json');

// Kết nối cơ sở dữ liệu
include '../db.php'; // Nếu file này nằm trong folder `landlord/`

// Truy vấn dữ liệu
$sql = "SELECT landlord_id, name, phone, address FROM landlords";
$result = $conn->query($sql);

$landlords = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $landlords[] = $row;
    }
    echo json_encode($landlords);
} else {
    echo json_encode([
        "error" => "Lỗi truy vấn: " . $conn->error
    ]);
}
?>