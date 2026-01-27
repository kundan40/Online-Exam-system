<?php
require "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$pass  = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($pass, $user['password'])) {
    echo json_encode([
        "status" => "success",
        "user" => [
            "id" => $user['id'],
            "role" => $user['role']
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid login"]);
}
