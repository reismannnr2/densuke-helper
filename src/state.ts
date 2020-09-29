import React from 'react';
import { v4 as uuid } from 'uuid';
import startOfDay from 'date-fns/startOfMonth';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import { ObservableState } from '@reismannnr2/observable-state';

export interface DatePattern {
  readonly uuid: string;
  value: string;
  days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  holiday: 'include' | 'exclude' | 'ignore';
  include: Date[];
  exclude: Date[];
}

export interface State {
  format: string;
  startDate: Date;
  endDate: Date;
  patterns: DatePattern[];
}

export const init: State = {
  format: 'MM-dd(eee)',
  startDate: startOfDay(new Date()),
  endDate: lastDayOfMonth(new Date()),
  patterns: [
    {
      uuid: uuid(),
      value: '昼',
      days: [true, false, false, false, false, false, true],
      holiday: 'include',
      include: [],
      exclude: [],
    },
    {
      uuid: uuid(),
      value: '夜',
      days: [true, true, true, true, true, true, true],
      holiday: 'ignore',
      include: [],
      exclude: [],
    },
  ],
};
export const state$ = new ObservableState(init);
export const StateContext = React.createContext(state$);
