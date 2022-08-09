import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoModel } from 'src/schemas/todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from 'src/interfaces/todo.interface';
import { isEmpty } from 'src/helper/helper';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, ONE } from 'src/utils/constants';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(TodoModel.name) private todoModel: Model<TodoModel>,
    ) { }

    async create(todo: Todo) {
        try {
            return await new this.todoModel(todo).save();
        } catch (error) {
            throw new HttpException({ message: error.message, detail: [] }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(todo: Todo) {
        try {
            let todoModel = await this.todoModel.findOne({ '_id': todo.id });
            if (todoModel) {
                todoModel.payee = todo.payee;
                todoModel.child = todo.child;
                todoModel.pendingAmount = todo.pendingAmount;
                return await todoModel.save();
            } else {
                throw new HttpException({ message: "Record not found", detail: [] }, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({ message: error.message, detail: [] }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: any) {
        try {
            let todoModel = await this.todoModel.findOne({ '_id': id });
            if (todoModel) {
                return await todoModel.remove();
            } else {
                throw new HttpException({ message: "Record not found", detail: [] }, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({ message: error.message, detail: [] }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(params: any) {
        let pageNo = isEmpty(params.pageNo) ? DEFAULT_PAGE : parseInt(params.pageNo);
        let pageSize = isEmpty(params.pageSize) ? DEFAULT_PER_PAGE : parseInt(params.pageSize);
        let statusQuery = !isEmpty(params.isActive) ? { 'isActive': parseInt(params.isActive) } : {};
        let deleteQuery = !isEmpty(params.isDeleted) ? { 'isDeleted': parseInt(params.isDeleted) } : {};
        let payeeQuery = !isEmpty(params.payee) ? { payee: { '$regex': params.payee, '$options': 'i' } } : {};
        let childQuery = !isEmpty(params.child) ? { child: { '$regex': params.child, '$options': 'i' } } : {};
        let query = { $and: [payeeQuery, childQuery] };

        return {
            'total': await this.todoModel.find(query).countDocuments(),
            'list': await this.todoModel.find(query).limit(pageSize).skip((pageNo - ONE) * pageSize).sort('-createdAt')
        }
    }
}
