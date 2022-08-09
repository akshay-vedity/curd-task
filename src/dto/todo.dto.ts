import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
    
    @ApiProperty({
        description: 'Name of Payee',
    })
    readonly payee: string;
    
    @ApiProperty({
        description: 'Child name',
    })
    readonly child: string;

    @ApiProperty({
        description: 'Pending Amount',
    })
    readonly pendingAmount: number;
}