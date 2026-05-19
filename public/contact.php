<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = strip_tags(trim($input['name']));
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($input['subject']));
    $message = strip_tags(trim($input['message']));

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "Données invalides."]);
        exit;
    }

    $recipient = "contact@scrollfree.fr";
    $from_email = "contact@scrollfree.fr"; // Same as domain to ensure delivery
    $email_subject = "[Contact Web] $subject";
    
    $email_content = "Vous avez reçu un nouveau message depuis le formulaire de contact de scrollfree.fr\n\n";
    $email_content .= "--------------------------------------------------\n";
    $email_content .= "Nom : $name\n";
    $email_content .= "Email de l'expéditeur : $email\n";
    $email_content .= "Sujet : $subject\n";
    $email_content .= "--------------------------------------------------\n\n";
    $email_content .= "Message :\n$message\n";

    $headers = "From: Scrollfree <$from_email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $mail_sent = mail($recipient, $email_subject, $email_content, $headers);

    if ($mail_sent) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Merci, votre message a été envoyé."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Le serveur de mail a refusé l'envoi."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Méthode non autorisée."]);
}
?>
