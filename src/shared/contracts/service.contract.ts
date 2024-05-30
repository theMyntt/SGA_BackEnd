export interface IServiceContract<Input, Output> {
  find: (dto: Input) => Promise<Output>
  findAll?: () => Promise<Output>
  create: (dto: Input) => Promise<boolean>
  remove: (dto: Input) => Promise<boolean>
}
