import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@/domain/events/user/user-created.event';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserCreatedListener {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    const mail = {
      to: event.email,
      from: '"Instituto Aristoteles" <contato.instituto.aristoteles@gmail.com>',
      subject: 'Bem vindo ao Instituto Aristóteles!',
      template: 'user-password',
      context: {
        username: event.username,
        password: event.password,
        name: event.name,
      },
    };

    await this.mailerService.sendMail(mail);
  }
}
