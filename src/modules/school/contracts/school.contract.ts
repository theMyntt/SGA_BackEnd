import { IAddressContract } from '@shared/contracts/address.contract'

export type TSchoolContract = {
  _id?: string
  name?: string
  address?: IAddressContract
  createdAt?: Date
  updatedAt?: Date
}
