import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { DemoState, DemoStateModel } from './demo.state';

describe('Demo state', () => {
    let store: Store;

    beforeEach(() => {
      TestBed.configureTestingModule({
       providers: [provideStore([DemoState])]
      
      });

      store = TestBed.inject(Store);
    });

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(DemoState.getState);
        const expected: DemoStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
