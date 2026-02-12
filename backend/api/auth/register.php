<?php
// 🔥 CORS HEADERS (must be at top)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// 🔥 Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        "error" => true,
        "message" => "No data received"
    ]);
    exit;
}

$name  = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$role  = $data['role'] ?? 'student';

if (!$name || !$email || !$password) {
    http_response_code(400);
    echo json_encode([
        "error" => true,
        "message" => "All fields are required"
    ]);
    exit;
}

// 🔒 Prevent invalid roles
$allowedRoles = ['student', 'teacher','admin'];
if (!in_array($role, $allowedRoles)) {
    http_response_code(403);
    echo json_encode([
        "error" => true,
        "message" => "Invalid role"
    ]);
    exit;
}

// 🔍 Check duplicate email yes
$check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$check->execute([$email]);

if ($check->rowCount() > 0) {
    http_response_code(409);
    echo json_encode([
        "error" => true,
        "message" => "Email already exists"
    ]);
    exit;
}

// 🔐 Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// ✅ Insert user
$stmt = $pdo->prepare(
    "INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)"
);
$stmt->execute([$name, $email, $hashedPassword, $role]);

echo json_encode([
    "success" => true,
    "message" => "Registration successful"
]);
