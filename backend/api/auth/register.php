<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No data received"]);
    exit;
}

$name  = $data['name'];
$email = $data['email'];
$pass  = password_hash($data['password'], PASSWORD_DEFAULT);
$role  = $data['role'];

$sql = "INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $email, $pass, $role]);

echo json_encode(["status" => "success"]);
