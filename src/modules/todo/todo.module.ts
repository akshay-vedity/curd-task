import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoModel, TodoDatabaseName, TodoSchema } from '../../schemas/todo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoModel.name, schema: TodoSchema, collection: TodoDatabaseName },
    ])
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
