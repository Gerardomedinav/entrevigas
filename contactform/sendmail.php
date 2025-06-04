<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST['subject'] ?? ''));
    $message = strip_tags(trim($_POST['message'] ?? ''));

    if (!$name || !$email || !$message) {
        http_response_code(400);
        echo "Por favor complete los campos obligatorios.";
        exit;
    }

    $to = "gerardomedinavv@gmail.com"; // tu mail
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Nombre: $name\nEmail: $email\nAsunto: $subject\nMensaje:\n$message";

    if (mail($to, $subject ?: "Nuevo mensaje de contacto", $body, $headers)) {
        echo "Mensaje enviado correctamente.";
    } else {
        http_response_code(500);
        echo "Error al enviar el mensaje.";
    }
} else {
    http_response_code(403);
    echo "Acceso no permitido.";
}
