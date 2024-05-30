export interface IServiceContract<Input> {
  find: (dto: Input) => Promise<any>
  findAll?: () => Promise<any>
  create: (dto: Input) => Promise<boolean>
  remove: (dto: Input) => Promise<boolean>
}
