/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DatePattern, StateContext } from 'src/state';
import {
  useChildState$,
  useCurrentState$,
  useArrayStateActions,
  ArrayActions,
  useArrayStateElement$,
} from '@reismannnr2/react-observable-state-hooks';
import { ObservableState } from '@reismannnr2/observable-state';
import { useDrop, useDrag } from 'react-dnd';
import { RadioSelection } from 'src/components/forms/radio-selection';
import { range } from 'src/util/iterable';
import { ToggleBox } from 'src/components/forms/toggle-box';
import { formatWeekday } from 'src/util/format';
import { v4 as uuid } from 'uuid';
import { DateList } from 'src/components/date-list';

const holidayDefinition = [
  { label: '含む', value: 'include' as const },
  { label: '除く', value: 'exclude' as const },
  { label: '気にしない', value: 'ignore' as const },
];

const PatternItem = function PatternItem(
  props: PropsWithChildren<{
    pattern: DatePattern;
    index: number;
    actions: ArrayActions<DatePattern>;
  }>,
): React.ReactElement | null {
  const { pattern, index, actions } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [textFocused, setTextFocused] = useState(false);
  const pattern$ = useMemo(() => new ObservableState(pattern), [
    index,
    pattern.uuid,
  ]);
  const include$ = useChildState$(pattern$, 'include');
  const exclude$ = useChildState$(pattern$, 'exclude');
  const days$ = useChildState$(pattern$, 'days');
  useEffect(() => {
    const subscription = pattern$.subscribe((pattern) => {
      actions.replace(index, pattern);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [pattern$, actions]);
  const [, drop] = useDrop<
    { type: 'date-pattern'; index: number },
    unknown,
    unknown
  >({
    accept: 'date-pattern',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (clientOffset === null) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      actions.move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    canDrag: !textFocused,
    item: { type: 'date-pattern', index: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      css={css({
        border: '1px solid black',
        padding: '1rem',
        opacity: opacity,
      })}
      ref={ref}
    >
      <div
        css={css({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <label
          css={css({
            display: 'block',
            marginBottom: '0.5rem',
            width: 'min-content',
          })}
        >
          <input
            type="text"
            value={pattern.value}
            css={css({
              fontSize: 'small',
              padding: '0.25rem',
            })}
            onFocus={() => {
              setTextFocused(true);
            }}
            onBlur={() => {
              setTextFocused(false);
            }}
            onChange={(e) => {
              pattern$.update((pattern) => ({
                ...pattern,
                value: e.target.value,
              }));
            }}
          />
        </label>
        <button
          type="button"
          css={css({ width: '3rem' })}
          onClick={() => {
            actions.remove(index);
          }}
        >
          ×削除
        </button>
      </div>
      <div css={css({ display: 'flex', marginBottom: '0.5rem' })}>
        <span css={css({ marginRight: '0.25rem' })}>曜日:</span>
        <ul
          css={css({
            display: 'flex',
            fontSize: 'small',
          })}
        >
          {range(7).map((v) => (
            <li
              key={v}
              css={css({
                '&:not(:last-of-type)': {
                  marginRight: '0.25rem',
                },
              })}
            >
              <ToggleBox
                check$={useArrayStateElement$(days$, v)}
                styles={css({ padding: '0 0.25rem' })}
              >
                {formatWeekday(v, { short: true })}
              </ToggleBox>
            </li>
          ))}
        </ul>
      </div>
      <div
        css={css({
          display: 'flex',
        })}
      >
        <span css={css({ marginRight: '0.5rem' })}>{'祝日:'}</span>
        <RadioSelection<'ignore' | 'exclude' | 'include'>
          definitions={holidayDefinition}
          target$={useChildState$(pattern$, 'holiday')}
          styles={css({
            fontSize: 'small',
          })}
        />
      </div>
      <DateList list$={include$} title={'日付指定: 追加'} />
      <DateList list$={exclude$} title={'日付指定: 除外'} />
    </div>
  );
};

export function Patterns(): React.ReactElement | null {
  const state$ = useContext(StateContext);
  const patterns$ = useChildState$(state$, 'patterns');
  const patternActions = useArrayStateActions(patterns$);
  const [patterns] = useCurrentState$(patterns$);
  return (
    <section
      css={css({
        marginBottom: '2rem',
      })}
    >
      <ul>
        {patterns.map((pattern, index) => (
          <li
            key={pattern.uuid}
            css={css({
              '&:not(:last-of-type)': {
                marginBottom: '0.5rem',
              },
            })}
          >
            <PatternItem
              pattern={pattern}
              index={index}
              actions={patternActions}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          patternActions.append({
            uuid: uuid(),
            value: '',
            days: [false, false, false, false, false, false, false],
            holiday: 'ignore',
            include: [],
            exclude: [],
          });
        }}
      >
        ＋追加
      </button>
    </section>
  );
}
