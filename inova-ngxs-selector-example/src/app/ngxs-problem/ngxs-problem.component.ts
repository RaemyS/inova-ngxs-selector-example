import { Component, inject } from '@angular/core';
import {Store} from "@ngxs/store";
import {DemoState, DemoStateModel} from "../demo/demo.state";
import {lastValueFrom} from "rxjs";
import {DemoAction} from "../demo/demo.actions";

@Component({
  selector: 'app-ngxs-problem',
  standalone: true,
  imports: [],
  templateUrl: './ngxs-problem.component.html',
  styleUrl: './ngxs-problem.component.css'
})
export class NgxsProblemComponent {

  private readonly store = inject(Store);

  // TODO: This code leads to maybe unexpected behavior on selecting the state from the ngxs store.
  // TODO: Fix the code to avoid, that valueFromFirstSnapshot and valueFromSecondSnapshot share the same object reference
  async onPerformAction() {

    // Set a breakpoint after this line and resume step by step, to analyze the object reference problem
    const valueFromFirstSnapshot = this.store.selectSnapshot<DemoStateModel>(DemoState.getState);
    console.log('valueFromFirstSnapshot', valueFromFirstSnapshot);

    // This array is being applied via dispatch and changed later
    const tags = ['1', '2', '3']

    // We dispatch the state here
    // Now check valueFromFirstSnapshot. Do you see the problem?
    // valueFromFirstSnapshot was selected earlier but contains now the dispatched value!
    await lastValueFrom(this.store.dispatch(new DemoAction({id: 666, name: 'hallo', tags: tags})));

    // valueFromSecondSnapshot is as expected, since this snapshot is selected after dispatching the state
    const valueFromSecondSnapshot = this.store.selectSnapshot<DemoStateModel>(DemoState.getState);
    console.log('valueFromSecondSnapshot', valueFromSecondSnapshot);

    // Let us now check, if valueFromFirstSnapshot and valueFromSecondSnapshot share the same object reference...
    // The answer is: yes!
    // This means, that a dispatch (or any other change) on the state affects directly the previously selected values.
    // => ngxs does not clone on select (neither on selectSnapshot, nor on select with Observables)!
    console.log('are first and second ref equal?', Object.is(valueFromFirstSnapshot, valueFromSecondSnapshot));

    // This means further, if we add a new element on the tags array,
    // we also change the values of valueFromFirstSnapshot and valueFromSecondSnapshot!
    tags.push('666');
    console.log('valueFromSecondSnapshot after tags changed', valueFromSecondSnapshot);
  }

  onResetStore() {
    this.store.reset({
      ...this.store.snapshot(),
      ['demo']: {
        items: []
      },
    });

    const stateAfterReset = this.store.selectSnapshot<DemoStateModel>(DemoState.getState);
    console.log('snapshot after state reset', stateAfterReset);
  }
}
