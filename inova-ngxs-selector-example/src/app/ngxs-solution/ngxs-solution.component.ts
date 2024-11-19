import {Component, inject} from '@angular/core';
import {Store} from "@ngxs/store";
import {DemoState, DemoStateModel} from "../demo/demo.state";
import {lastValueFrom} from "rxjs";
import {DemoAction} from "../demo/demo.actions";

@Component({
  selector: 'app-ngxs-solution',
  standalone: true,
  imports: [],
  templateUrl: './ngxs-solution.component.html',
  styleUrl: './ngxs-solution.component.css'
})
export class NgxsSolutionComponent {
  private readonly store = inject(Store);

  async onPerformAction() {

    // Set a breakpoint after this line and resume step by step, to analyze the object references
    // Notice the structuredClone on the next line
    const valueFromFirstSnapshot = structuredClone(this.store.selectSnapshot<DemoStateModel>(DemoState.getState));
    console.log('valueFromFirstSnapshot', valueFromFirstSnapshot);

    // This array is being applied via dispatch and changed later
    const tags = ['1', '2', '3']

    // We dispatch the state here
    // Now check valueFromFirstSnapshot. Is this value still affected by the dispatch?
    await lastValueFrom(this.store.dispatch(new DemoAction({id: 666, name: 'hallo', tags: tags})));

    // valueFromSecondSnapshot is as expected, since this snapshot is selected after dispatching the state
    // We try next to copy the object with destructuring
    const valueFromSecondSnapshot = {...this.store.selectSnapshot<DemoStateModel>(DemoState.getState)};
    console.log('valueFromSecondSnapshot', valueFromSecondSnapshot);

    // Let us now check, if valueFromFirstSnapshot and valueFromSecondSnapshot share the same object reference...
    // The answer is: no! We have successfully uncoupled the two snapshots!
    console.log('are first and second ref equal?', Object.is(valueFromFirstSnapshot, valueFromSecondSnapshot));

    // What happens now, if we add a new element on the tags array?
    // Check valueFromFirstSnapshot, as well as valueFromSecondSnapshot.
    // Why does valueFromSecondSnapshot contain the new tag after the push to the tags array? How could we fix this as well?
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
