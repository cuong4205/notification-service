import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from '../notification/notification.service';
@Controller()
export class EmailConsumer implements OnModuleInit {
  constructor(private readonly notificationService: NotificationService) {}

  onModuleInit() {
    console.log('Email consumer initialized');
  }

  @EventPattern('send.email')
  async sendEmail(@Payload() data: { addr: string; message: string }) {
    console.log('Received send email event:', data);
    await this.notificationService.sendEmail(data.addr, data.message);
  }
}
