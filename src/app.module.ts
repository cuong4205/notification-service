import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { KafkaModule } from './kafka/kafka.module';
import { EmailConsumer } from './kafka/email-consumer';
import { NotificationService } from './notification/notification.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './notification/noitfication.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    KafkaModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [EmailConsumer, NotificationController],
  providers: [NotificationService],
  exports: [ConfigModule, MailerModule, NotificationService],
})
export class AppModule {}
