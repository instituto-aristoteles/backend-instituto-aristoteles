import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetUserPasswordEvent } from '@/domain/events/user/reset-user-password.event';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ResetUserPasswordListener {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('reset.user.password')
  async handleResetUserPasswordEvent(event: ResetUserPasswordEvent) {
    const mail = {
      to: event.email,
      from: '"Instituto Aristoteles" <contato.instituto.aristoteles@gmail.com>',
      subject: 'Redefinição de senha',
      template: 'reset-user-password',
      context: {
        password: event.password,
        name: event.name,
      },
    };

    await this.mailerService.sendMail(mail);
  }
}
