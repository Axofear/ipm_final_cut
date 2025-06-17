<?php
// Remove session_start() completely
header('Content-Type: application/json'); // Add JSON header

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contact_form";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

// Get and sanitize input
$fullName = !empty($_POST['fullName']) ? htmlspecialchars(trim($_POST['fullName']), ENT_QUOTES, 'UTF-8') : '';
$email = !empty($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = !empty($_POST['phone']) ? htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8') : '';
$company = !empty($_POST['company']) ? htmlspecialchars(trim($_POST['company']), ENT_QUOTES, 'UTF-8') : '';
$service = !empty($_POST['service']) ? htmlspecialchars(trim($_POST['service']), ENT_QUOTES, 'UTF-8') : '';
$message = !empty($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';

// Validate required fields
if (empty($fullName) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO contacts (full_name, email, phone, company, service, message, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
}

$stmt->bind_param("ssssss", $fullName, $email, $phone, $company, $service, $message);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Message sent successfully! We will contact you soon.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error saving message. Please try again.']);
}

// Close connections
$stmt->close();
$conn->close();
exit; // Ensure no extra output
?>
<!-- hello -->