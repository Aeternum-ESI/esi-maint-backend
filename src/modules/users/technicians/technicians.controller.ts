import { InterventionRequestsService } from 'src/modules/intervention-requests/intervention-requests.service';
import { UpdateTechnicianDataDto } from './dtos/updateTechnicianData.dto';
import { TechniciansService } from './technicians.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { JwtPayload } from 'src/modules/auth/dtos/jwtPayload';

@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}
  @Get()
  getTechnicians() {
    return this.techniciansService.getTechnicians();
  }
  @Get('/me')
  getMe(@User() user: JwtPayload) {
    console.log(user);
    return this.techniciansService.getTechnicianById(Number(user.id));
  }

  @Get('/:id')
  getTechnicianById(@Param('id', ParseIntPipe) id: number) {
    return this.techniciansService.getTechnicianById(id);
  }

  @Patch('/:id')
  updateTechnicianData(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechinicianDataDto: UpdateTechnicianDataDto,
  ) {
    return this.techniciansService.updateTechnicianData(
      id,
      updateTechinicianDataDto,
    );
  }
}
