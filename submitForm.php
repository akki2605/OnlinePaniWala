<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
include('config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $msg = $_POST['msg'];

    // Instantiate PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $host;  // Change this to your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = $username;  // Change this to your SMTP username
        $mail->Password   = $password;  // Change this to your SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = $port;  // Change this to your SMTP port
        
        // Recipients
        $mail->setFrom('akashtripathi004@gmail.com', 'Akash Tripathi');  // Change this to your email and name
        $mail->addAddress('akashtripathi004@gmail.com');  // Change this to the recipient's email

        // Content
        $mail->isHTML(false);  // Set to true if you want to send HTML emails
        $mail->Subject = 'Test email using PHPMailer';
        $mail->Body    = "Full Name: $fullname\nPhone Number: $phone\nCity: $city\nMessage: $msg";

        // Send email
        $mail->send();

        echo json_encode(array('status' => 'success'));
        exit;
    } catch (Exception $e) {
        echo json_encode(array('status' => 'error', 'message' => $mail->ErrorInfo));
        exit;
    }
}
?>