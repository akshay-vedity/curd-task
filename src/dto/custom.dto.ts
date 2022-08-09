import { ApiProperty } from '@nestjs/swagger';

export class CustomDto {
    
    @ApiProperty({
        description: 'Name of customer',
    })
    readonly name: string;
    
    @ApiProperty({
        description: 'Customer job role',
    })
    readonly job: string;
}