/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { ObservableState } from '@reismannnr2/observable-state';
import ReactDatePicker from 'react-datepicker';
import {
  useArrayStateActions,
  useCurrentState$,
} from '@reismannnr2/react-observable-state-hooks';
import isSameDay from 'date-fns/isSameDay';
import { formatDate } from 'src/util/format';

export function DateList(
  props: PropsWithChildren<{ list$: ObservableState<Date[]>; title: string }>,
): React.ReactElement | null {
  const { list$, title } = props;
  const [list] = useCurrentState$(list$);
  const actions = useArrayStateActions(list$);
  return (
    <div
      css={css({ display: 'flex', alignItems: 'center', marginTop: '1rem' })}
    >
      <ReactDatePicker
        onChange={(date) => {
          if (list.every((candidate) => !isSameDay(candidate, date as Date))) {
            actions.append(date as Date);
          }
        }}
        customInput={<button>{title}</button>}
      />
      <ul
        css={css({
          display: 'flex',
          fontSize: 'smaller',
          alignItems: 'center',
          marginLeft: '1rem',
        })}
      >
        {list.map((date, index) => (
          <li
            key={date.toLocaleString()}
            css={css({
              '&:not(:last-of-type)': {
                marginRight: '0.25rem',
              },
            })}
          >
            <button
              type="button"
              css={css({
                fontSize: 'smaller',
                appearance: 'none',
                padding: '0 0.25rem',
                border: '1px dashed black',
                backgroundColor: 'transparent',
              })}
              onClick={() => {
                actions.remove(index);
              }}
            >
              ×{formatDate(date, 'yyyy-MM-dd(eee)')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
