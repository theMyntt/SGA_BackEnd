import { IAddressContract } from '@shared/contracts/address.contract'
import { IRgContract } from '../contracts/rg.contract'
import { TGenderContract } from '../contracts/gender.contract'
import { ApiProperty } from '@nestjs/swagger'

export class UserInformationDTO {
  @ApiProperty({
    readOnly: true,
  })
  public _id?: string

  @ApiProperty({
    type: String,
    description: 'The school ID from User',
    example: '5f9888188888888888888888',
    required: true,
  })
  public schoolId?: string

  @ApiProperty({
    type: String,
    description: 'The name from User',
    example: 'User Name',
    required: false,
  })
  public name?: string

  @ApiProperty({
    type: String,
    description: 'The email from User',
    example: 'john.doe@example.com',
    required: true,
  })
  public email?: string

  @ApiProperty({
    type: String,
    description: 'The password from User',
    example: 'password123',
    required: true,
  })
  public password?: string

  @ApiProperty({
    type: String,
    description: 'The phone from User',
    example: '1234567890',
    required: false,
  })
  public phone?: string

  @ApiProperty({
    type: String,
    description: 'The CPF from User',
    example: '217.628.880-76',
    required: false,
  })
  public cpf?: string

  @ApiProperty({
    type: String,
    description: 'The RG from User',
    example: '12345678',
    required: false,
  })
  public rg?: IRgContract

  @ApiProperty({
    type: Object,
    description: 'The address from User',
    example: 'Street',
    required: false,
  })
  public address?: IAddressContract

  @ApiProperty({
    type: Date,
    description: 'The birth date from User',
    example: '1990-01-01T00:00:00.000Z',
    required: false,
  })
  public birthDate?: Date

  @ApiProperty({
    type: String,
    description: 'The gender from User',
    example: 'MASCULINE',
    required: false,
  })
  public gender?: TGenderContract

  @ApiProperty({
    type: String,
    description: 'The class from User',
    example: 'class1',
  })
  public class?: string

  @ApiProperty({
    type: Boolean,
    description: 'The isAdmin from User',
    example: true,
  })
  public isAdmin?: boolean

  @ApiProperty({
    readOnly: true,
  })
  public createdAt?: Date

  @ApiProperty({
    readOnly: true,
  })
  public updatedAt?: Date
}
