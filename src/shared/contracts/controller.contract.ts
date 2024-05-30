export interface IControllerContract<Input> {
  perform: (dto?: Input) => Promise<any>
}
