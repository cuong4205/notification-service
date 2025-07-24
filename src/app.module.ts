import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { EmailConsumer } from './kafka/email-consumer';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    KafkaModule,
    NotificationModule,
  ],
  controllers: [EmailConsumer],
  exports: [ConfigModule],
})
export class AppModule {}
