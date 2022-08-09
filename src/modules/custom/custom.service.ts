import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { CUSTOM_API_ENDPOINT } from 'src/utils/constants';
import { Custom } from 'src/interfaces/custom.interface';

@Injectable()
export class CustomService {

    constructor(
        private readonly httpService: HttpService
    ) { }
    
    async create(custom: Custom) {
        const response = await this.httpService.post(`${CUSTOM_API_ENDPOINT}/users`, custom)
            .toPromise()
            .catch((err) => {
                throw new HttpException(err.response.data, err.response.status);
            });
        return response.data;
    }

    async update(custom: Custom, id: number) {
        const response = await this.httpService.put(`${CUSTOM_API_ENDPOINT}/users/${id}`, custom)
            .toPromise()
            .catch((err) => {
                throw new HttpException(err.response.data, err.response.status);
            });
        return response.data;
    }

    async remove(id: number) {
        const response = await this.httpService.delete(`${CUSTOM_API_ENDPOINT}/users/${id}`)
            .toPromise()
            .catch((err) => {
                throw new HttpException(err.response.data, err.response.status);
            });
        return response.data;
    }

    async list(pageNumber: number) {
        const response = await this.httpService.get(`${CUSTOM_API_ENDPOINT}/users?page=${pageNumber}`)
            .toPromise()
            .catch((err) => {
                throw new HttpException(err.response.data, err.response.status);
            });
        return response.data;
    }
}
