import { IResponse } from 'src/interfaces/response.interface';

export class ResponseSuccess implements IResponse {
    constructor(infoMessage: string, data?: any) {
        this.message = infoMessage;
        this.response = data;
    };
    message: string;
    response: any[];
}