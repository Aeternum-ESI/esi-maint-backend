import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/dtos/jwtPayload';
import { CreateInterventionRequestDto } from './dto/createInterventionRequest.dto';
import { InterventionRequestsService } from './intervention-requests.service';
import { CompleteInterventionRequestDto } from './dto/completeInterventionRequest.dto';

@Controller('intervention-requests')
export class InterventionRequestsController {
  constructor(
    private readonly interventionRequestsService: InterventionRequestsService,
  ) {}

  @Get()
  getAllInterventionRequests() {
    return this.interventionRequestsService.getAllInterventionRequests();
  }

  @Get('me')
  getInterventionRequestsByUserId(@User() user: JwtPayload) {
    return this.interventionRequestsService.getInterventionRequestByUserId(
      user.id,
    );
  }

  @Get(':id')
  getInterventionRequestById(@Param('id', ParseIntPipe) id: number) {
    return this.interventionRequestsService.getInterventionRequestById(id);
  }

  @Post()
  createInterventionRequest(
    @User() user: JwtPayload,
    @Body() createInterventionRequestDto: CreateInterventionRequestDto,
  ) {
    return this.interventionRequestsService.createInterventionRequest(
      user.id,
      createInterventionRequestDto,
    );
  }

  @Post(':id/complete')
  async completeInterventionRequest(
    @Param('id', ParseIntPipe) id: number,
    @User() user: JwtPayload,
    @Body() completeInterventionRequestDto: CompleteInterventionRequestDto,
  ) {
    await this.interventionRequestsService.completeInterventionRequest(
      user.id,
      id,
      completeInterventionRequestDto,
    );

    return 'Intervention request was completed successfully';
  }
}
