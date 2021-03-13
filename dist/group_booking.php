<?php 
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  // от кого письмо
  $mail->setFrom('info@starhomehostel.ru', 'Клиент StarHome');
  // кому отправить
  $mail->addAddress('artiom.ygryumov@gmail.com');
  // тема письма
  $mail->Subject = 'Заявка на групповое бронирование';

  // тело письма
  $body = '<h1 style="color:#000001;">Новая заявка!</h1>';

  if(trim(!empty($_POST['user_name']))) {
    $body.='<p style="color:#000001;"><strong>Имя:</strong> '.$_POST['user_name'].'</p>';
  }
  if(trim(!empty($_POST['user_phone']))) {
    $body.='<p style="color:#000001;"><strong>Номер:</strong><a href="tel:'.$_POST['user_phone'].'"> '.$_POST['user_phone'].'</a></p>';
  }
  if(trim(!empty($_POST['user_quantity']))) {
    $body.='<p style="color:#000001;"><strong>Кол-во:</strong> '.$_POST['user_quantity'].'</p>';
  }
  if(trim(!empty($_POST['check_in']))) {
    $body.='<p style="color:#000001;"><strong>Дата заезда:</strong> '.$_POST['check_in'].'</p>';
  }
  if(trim(!empty($_POST['check_out']))) {
    $body.='<p style="color:#000001;"><strong>Дата выезда:</strong> '.$_POST['check_out'].'</p>';
  }
  if(trim(!empty($_POST['user_email']))) {
    $body.='<p style="color:#000001;"><strong>E-mail:</strong> '.$_POST['user_email'].'</p>';
  }
  if(trim(!empty($_POST['user_message']))) {
    $body.='<p style="color:#000001;"><strong>Сообщение:</strong> '.$_POST['user_message'].'</p>';
  }

  $mail->Body = $body;

  // отправляем
  if (!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>