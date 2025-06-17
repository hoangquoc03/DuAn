<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"));
$username = $data->Username;
$password = $data->Password;

$stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    echo json_encode([
        "message" => "Đăng nhập thành công!",
        "user" => [
            "id" => $user["id"],
            "fullname" => $user["fullname"],
            "Username" => $user["username"],
            "role" => $user["role"]
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Sai tài khoản hoặc mật khẩu"]);
}
?>