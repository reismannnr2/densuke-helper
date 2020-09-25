/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { PropsWithChildren, useState } from 'react';
import { range } from 'src/util/iterable';
import { formatWeekday } from 'src/util/format';

function Checkbox(
  props: PropsWithChildren<{ text: string }>,
): React.ReactElement | null {
  const [checked, setChecked] = useState(false);
  return (
    <li
      css={css({
        '&:not(:last-of-type)': {
          marginRight: '1rem',
        },
      })}
    >
      <label css={css({ display: 'block' })}>
        <input
          type="checkbox"
          css={css({ display: 'none' })}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        <div
          css={css({
            padding: '0.5rem',
            border: `1px ${checked ? 'solid black' : 'dashed darkgrey'}`,
            backgroundColor: checked ? 'black' : 'white',
            color: checked ? 'white' : 'black',
          })}
        >
          {props.text}
        </div>
      </label>
    </li>
  );
}

function RadioItem(
  props: PropsWithChildren<{
    value: string;
    label: string;
    current: string;
    onSelected: (value: string) => void;
  }>,
): React.ReactElement | null {
  const { value, label, current, onSelected } = props;
  const checked = value === current;
  return (
    <li
      key={value}
      css={css({
        '&:not(:last-of-type)': {
          marginRight: '1rem',
        },
      })}
    >
      <label css={css({ display: 'block' })}>
        <input
          type="checkbox"
          css={css({ display: 'none' })}
          checked={checked}
          onChange={(e) => {
            if (e.target.checked) {
              onSelected(value);
            }
          }}
        />
        <div
          css={css({
            padding: '0.5rem',
            border: `1px ${checked ? 'solid black' : 'dashed darkgrey'}`,
            backgroundColor: checked ? 'black' : 'white',
            color: checked ? 'white' : 'black',
          })}
        >
          {label}
        </div>
      </label>
    </li>
  );
}

function Radios(
  props: PropsWithChildren<{
    values: Array<{ label: string; value: string }>;
    init: number;
  }>,
): React.ReactElement | null {
  const [current, setCurrent] = useState(props.values[props.init].value);
  return (
    <ul
      css={css({
        display: 'flex',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
      })}
    >
      {props.values.map((value) => (
        <RadioItem
          key={value.value}
          value={value.value}
          label={value.label}
          current={current}
          onSelected={(value) => setCurrent(value)}
        />
      ))}
    </ul>
  );
}

export function Pattern(): React.ReactElement | null {
  return (
    <div
      css={css({
        '&:not(:first-of-type)': { borderTop: '1px solid darkgrey' },
      })}
    >
      <ul
        css={css({
          display: 'flex',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        })}
      >
        {range(7).map((v) => (
          <Checkbox key={v} text={formatWeekday(v, { short: true })} />
        ))}
      </ul>
      <Radios
        init={2}
        values={[
          { value: 'include', label: '含む' },
          { value: 'exclude', label: '除外' },
          { value: 'ignore', label: '無視' },
        ]}
      />
    </div>
  );
}
