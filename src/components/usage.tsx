/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

export function Usage(): React.ReactElement | null {
  return (
    <section css={css({ marginBottom: '2rem' })}>
      <h2>解説</h2>
      <div>
        <ul
          css={css({
            listStyleType: 'circle',
            listStylePosition: 'inside',
          })}
        >
          <li>条件を変更すると自動で下部の一覧が更新される</li>
          <li>ドラッグ＆ドロップでソート可能</li>
          <li>日付指定＞祝日指定＞曜日の順で優先度が高い</li>
          <li>
            開始日・終了日の範囲外の日付を「日付指定:追加」で追加しても無効
          </li>
          <li>そのほか基本的な使い方はなんとなくで</li>
        </ul>
      </div>
    </section>
  );
}
