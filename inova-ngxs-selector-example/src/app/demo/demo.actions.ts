import {DemoModel} from "./demo.state";

export class DemoAction {
  static readonly type = '[Demo] Add item';
  constructor(readonly payload: DemoModel) { }
}
