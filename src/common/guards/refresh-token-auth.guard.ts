import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export class RefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
