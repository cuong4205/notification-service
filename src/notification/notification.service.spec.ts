import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common';

describe('NotificationService', () => {
  let service: NotificationService;
  let mailerServiceMock: Partial<MailerService>;

  beforeEach(async () => {
    mailerServiceMock = {
      sendMail: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: MailerService, useValue: mailerServiceMock },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should send email successfully with valid address', async () => {
    const email = 'valid@example.com';
    await service.sendEmail(email);

    expect(mailerServiceMock.sendMail).toHaveBeenCalledWith({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'How to Send Emails with Nodemailer',
      text: 'This is a test email sent using nestNodemailer',
    });
  });

  it('should throw BadRequestException for invalid email', async () => {
    await expect(service.sendEmail('invalid-email')).rejects.toThrow(
      BadRequestException,
    );
    expect(mailerServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should log and re-throw error if sendMail fails', async () => {
    (mailerServiceMock.sendMail as jest.Mock).mockRejectedValueOnce(
      new Error('Mail error'),
    );
    await expect(service.sendEmail('valid@example.com')).rejects.toThrow(
      'Mail error',
    );
  });
});
