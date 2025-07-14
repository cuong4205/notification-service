import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(addr: string): Promise<void> {
    await this.mailService
      .sendMail({
        from: 'Kingsley Okure <cuong040205@gmail.com>',
        to: addr,
        subject: `How to Send Emails with Nodemailer`,
        text: 'This is a test email sent using nestNodemailer',
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }
}
