/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useContext } from 'react';
import { StateContext } from 'src/state';
import { useCurrentState$ } from '@reismannnr2/react-observable-state-hooks';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSameDay from 'date-fns/isSameDay';
import getDay from 'date-fns/getDay';
import { isHoliday } from '@holiday-jp/holiday_jp';
import { formatDate } from 'src/util/format';

export function DensukeOutput(): React.ReactElement | null {
  const state$ = useContext(StateContext);
  const [state] = useCurrentState$(state$);
  const values =
    state.startDate < state.endDate
      ? eachDayOfInterval({
          start: state.startDate,
          end: state.endDate,
        }).flatMap((date) => {
          return state.patterns
            .filter((pattern) => {
              if (
                pattern.exclude.some((candidate) => isSameDay(candidate, date))
              ) {
                return false;
              }
              if (
                pattern.include.some((candidate) => isSameDay(candidate, date))
              ) {
                return true;
              }
              const holiday = isHoliday(date);
              if (pattern.holiday === 'exclude' && holiday) {
                return false;
              }
              if (pattern.holiday === 'include' && holiday) {
                return true;
              }
              return pattern.days[getDay(date)];
            })
            .map(
              (pattern) => `${formatDate(date, state.format)} ${pattern.value}`,
            );
        })
      : [];
  return (
    <section>
      <textarea
        css={css({
          width: '50%',
          height: '500px',
        })}
        readOnly={true}
        value={values.join('\n')}
      />
    </section>
  );
}
