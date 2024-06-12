import { IAddressContract } from '@shared/contracts/address.contract'
import { IRgContract } from '../contracts/rg.contract'
import { TGenderContract } from '../contracts/gender.contract'

export class UserInformationDTO {
  public _id?: string
  public schoolId?: string
  public name?: string
  public email?: string
  public password?: string
  public phone?: string
  public cpf?: string
  public rg?: IRgContract
  public adress: IAddressContract
  public birthDate?: Date
  public gender?: TGenderContract
  public class?: string
  public isAdmin?: boolean
  public createdAt?: Date
  public updatedAt?: Date
}
