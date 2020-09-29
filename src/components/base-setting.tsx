/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useContext } from 'react';
import { StateContext } from 'src/state';
import {
  useChildState$,
  useCurrentState$,
} from '@reismannnr2/react-observable-state-hooks';
import ReactDatePicker from 'react-datepicker';

export function BaseSetting(): React.ReactElement | null {
  const state$ = useContext(StateContext);
  const startDate$ = useChildState$(state$, 'startDate');
  const [startDate] = useCurrentState$(startDate$);
  const endDate$ = useChildState$(state$, 'endDate');
  const [endDate] = useCurrentState$(endDate$);
  const format$ = useChildState$(state$, 'format');
  const [format] = useCurrentState$(format$);
  return (
    <section
      css={css({
        marginBottom: '2rem',
      })}
    >
      <div
        css={css({
          display: 'flex',
        })}
      >
        <span css={css({ marginRight: '0.25rem' })}>開始日:</span>
        <ReactDatePicker
          selected={startDate as Date}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => {
            startDate$.update(() => date as Date);
          }}
        />
      </div>
      <div
        css={css({
          display: 'flex',
        })}
      >
        <span css={css({ marginRight: '0.25rem' })}>終了日:</span>
        <ReactDatePicker
          selected={endDate as Date}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => {
            endDate$.update(() => date as Date);
          }}
        />
      </div>
      <div>
        <label
          css={css({
            display: 'block',
          })}
        >
          <span css={css({ marginRight: '0.25rem' })}>日付書式:</span>
          <input
            type="text"
            value={format}
            onChange={(e) => {
              format$.update(() => e.target.value);
            }}
          />
        </label>
        <p css={css({ fontSize: 'small' })}>
          <a href={'https://date-fns.org/v2.16.1/docs/format'}>
            書式の書き方はこちら
          </a>
        </p>
      </div>
    </section>
  );
}
