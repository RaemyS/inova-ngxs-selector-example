import { Injectable } from '@angular/core';
import {State, Selector, Action, StateContext} from '@ngxs/store';
import {DemoAction} from "./demo.actions";

export interface DemoModel {
  name: string;
  id: number;
  tags: string[];
}

export interface DemoStateModel {
    items: DemoModel[];
}

@State<DemoStateModel>({
    name: 'demo',
    defaults: {
        items: []
    }
})
@Injectable()
export class DemoState {

    @Selector()
    static getState(state: DemoStateModel) {
        return state;
    }

  @Action(DemoAction)
  add(ctx: StateContext<DemoStateModel>, { payload }: DemoAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
