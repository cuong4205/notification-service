import { Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('noti')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get('all')
  getNotifications() {
    return 'This action returns all notifications';
  }

  @Post('send')
  async sendEmail(@Query('addr') addr: string) {
    try {
      await this.notificationService.sendEmail(addr);
    } catch (error) {
      console.log(error);
      throw new Error(
        'Something went wrong, check the config and the service layer',
      );
    }
  }
}
