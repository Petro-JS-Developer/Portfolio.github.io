<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $name = $_POST['user_name'];
// $phone = $_POST['user_phone'];
$email = $_POST['input_email'];
$message = $_POST['input_text'];
// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'valhr4445@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'Dolar333'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('valhr4445@gmail.com'); // от кого будет уходить письмо?
$mail->addAddress('DirVolf@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка з сайту портфоліо: ' .$_SERVER['HTTP_REFERER'];
$mail->Body    = "Повідомлення: "  .$message. '<br>Електронна адреса роботодавця: ' .$email;
$mail->AltBody = '';


if(!$mail->send()) {
    echo 'Error';
} else {
  echo $email.', Ваше сообщение отправлено, спасибо!';
}
?>