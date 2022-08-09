import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoModelConstant } from 'src/utils/model.constants';

@Schema({
    autoIndex: true,
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc: any, ret: any) {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: function (doc: any, ret: any) {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    }
})

export class TodoModel extends Document {

    @Prop({ required: true })
    payee: string;

    @Prop({ required: true })
    child: string;

    @Prop({ required: true })
    pendingAmount: number;
}

export const TodoDatabaseName = TodoModelConstant;
export const TodoSchema = SchemaFactory.createForClass(TodoModel);