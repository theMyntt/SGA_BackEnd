import { IAddressContract } from '@shared/contracts/address.contract'

export class SchoolInformationDTO {
  public _id?: string
  public name?: string
  public address?: IAddressContract
  public createdAt?: Date
  public updatedAt?: Date
}
