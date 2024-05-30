export interface IUseCaseContract<Input> {
  run: (dto: Input) => Promise<any>
}
