import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as EmailValidator from 'email-validator';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly mailService: MailerService) {}

  async sendEmail(addr: string, message: string): Promise<void> {
    if (!EmailValidator.validate(addr)) {
      this.logger.error(`Invalid email address: ${addr}`);
      throw new BadRequestException('Invalid email address');
    }
    try {
      await this.mailService.sendMail({
        from: process.env.EMAIL_FROM,
        to: addr,
        subject: `Notification from NestJS`,
        text: message,
      });

      this.logger.log(`Email sent successfully to ${addr}`);
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw error; // Re-throw to handle at controller level
    }
  }
}
