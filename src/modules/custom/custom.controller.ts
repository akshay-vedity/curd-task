import { CustomDto } from './../../dto/custom.dto';
import { CustomService } from './custom.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ResponseSuccess } from 'src/dto/response.dto';
import { JoiValidationPipe } from 'src/pipe/joi-validation.pipe';
import { customerValidation, idValidation, pageValidation } from './custom.validation';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('custom')
@Controller('custom')
export class CustomController {

    constructor(
        private readonly customService: CustomService
    ) { }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @ApiBadRequestResponse({ description: '\"job\" is not allowed to be empty' })
    @UsePipes(new JoiValidationPipe(customerValidation))
    async createCustomer(@Body() customDto: CustomDto) {
        let result = await this.customService.create(customDto);
        return new ResponseSuccess("The record has been successfully created.", result);
    }

    @Put('/:id')
    @ApiCreatedResponse({ description: 'The record has been successfully updated.' })
    @ApiBadRequestResponse({ description: '\"job\" is not allowed to be empty' })
    async updateCustomer(@Body(new JoiValidationPipe(customerValidation)) customDto: CustomDto, @Param(new JoiValidationPipe(idValidation)) params: any) {
        let result = await this.customService.update(customDto, params.id);
        return new ResponseSuccess("The record has been successfully updated", result);
    }

    @Delete('/:id')
    @ApiCreatedResponse({ description: 'The record has been successfully deleted.' })
    @ApiBadRequestResponse({ description: '\"id\" is not allowed to be empty' })
    async removeCustomer(@Param(new JoiValidationPipe(idValidation)) params: any) {
        let result = await this.customService.remove(params.id);
        return new ResponseSuccess("The record has been successfully deleted", result);
    }

    @Get()
    @ApiCreatedResponse({ description: 'Customer List [array]' })
    async customerList(@Query(new JoiValidationPipe(pageValidation)) params: any) {
        let result = await this.customService.list(params.page);
        return new ResponseSuccess("Customer List", result);
    }
}
