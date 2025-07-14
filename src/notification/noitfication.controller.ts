import { Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('noti')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get('all')
  getNotifications() {
    return 'This action returns all notifications';
  }

  @Post('send')
  async sendEmail(@Param('addr') addr: string) {
    return this.notificationService.sendEmail(addr);
  }
}
