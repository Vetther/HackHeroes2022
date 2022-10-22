package dev.vetther.backend.mail;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@AllArgsConstructor
@Service
public class MailService {

    private JavaMailSender mailSender;

    public void sendEmail(String emailTo, String topic, String text) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(emailTo);
        helper.setSubject(topic);

        helper.setText("<html><body>" +
                text +
                "</body></html>",
                true);

        this.mailSender.send(message);
    }
}
