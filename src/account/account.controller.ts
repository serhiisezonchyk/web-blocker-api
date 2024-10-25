import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDto, PatchAccountDto } from './dto';
import { AccountService } from './account.service';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { SessionInfo } from 'src/common/decorators/session-info.decorator';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Get()
  @ApiOkResponse({
    type: AccountDto,
  })
  getAccount(@SessionInfo() session: GetSessionInfoDto):Promise<AccountDto> {
    return this.accountService.getAccount(session.id)
  }

  @Patch()
  @ApiOkResponse({
    type: AccountDto,
  })
  patchAccount(
    @Body() body: PatchAccountDto,
    @SessionInfo() session: GetSessionInfoDto,
  ):Promise<AccountDto>  {
    return this.accountService.pathAccount(session.id,body)
  }
}
