<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot — bots fill this, humans don't
if (!empty($_POST['website'])) {
    // Silently succeed so bots don't know they were caught
    echo json_encode(['ok' => true]);
    exit;
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email']);
    exit;
}

$to      = 'hello@distro3d.com';
$subject = 'New enquiry from ' . $name . ' — DISTRO 3D';

$body  = "Name:    " . $name    . "\n";
$body .= "Email:   " . $email   . "\n";
$body .= "Service: " . ($service ?: '—') . "\n";
$body .= "\n" . $message;

$headers  = "From: noreply@distro3d.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

echo json_encode(['ok' => (bool) $sent]);
