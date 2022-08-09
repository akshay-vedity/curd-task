import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ResponseSuccess } from 'src/dto/response.dto';
import { JoiValidationPipe } from 'src/pipe/joi-validation.pipe';
import { TodoDto } from 'src/dto/todo.dto';
import { createValidation, updateValidation, objectIdValidation, listValidation } from './todo.validation';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('TODO')
@Controller('todo')
export class TodoController {

    constructor(
        private readonly todoService: TodoService
    ) { }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @ApiBadRequestResponse({ description: '\"payee\" is not allowed to be empty' })
    @UsePipes(new JoiValidationPipe(createValidation))
    async createRecord(@Body() todoDto: TodoDto) {
        let result = await this.todoService.create(todoDto);
        return new ResponseSuccess("The record has been successfully created.", result);
    }

    @Put()
    @ApiCreatedResponse({ description: 'The record has been successfully updated.' })
    @ApiBadRequestResponse({ description: '\"id\" is not allowed to be empty' })
    @UsePipes(new JoiValidationPipe(updateValidation))
    async updateRecord(@Body() todoDto: TodoDto) {
        let result = await this.todoService.update(todoDto);
        return new ResponseSuccess("The record has been successfully updated.", result);
    }

    @Delete('/:id')
    @ApiCreatedResponse({ description: 'The record has been successfully deleted.' })
    @ApiBadRequestResponse({ description: '\"id\" is not allowed to be empty' })
    @UsePipes(new JoiValidationPipe(objectIdValidation))
    async removeRecord(@Param() params: any) {
        let result = await this.todoService.remove(params.id);
        return new ResponseSuccess("Record deleted", {});
    }

    @Get()
    @ApiCreatedResponse({ description: 'Records [array]' })
    @UsePipes(new JoiValidationPipe(listValidation))
    async findAll(@Query() params: any) {
        let result = await this.todoService.findAll(params);
        return new ResponseSuccess("List", result);
    }
}
