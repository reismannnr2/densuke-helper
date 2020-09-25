/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Layout } from 'src/components/layout';
import { StateContext, state$ } from 'src/state';
import { Pattern } from 'src/components/pattern';

function Main(): React.ReactElement | null {
  return (
    <main
      css={css({
        width: 1024,
        padding: 8,
      })}
    >
      <Pattern />
      <Pattern />
      <Pattern />
    </main>
  );
}

export function Index(): React.ReactElement | null {
  return (
    <StateContext.Provider value={state$}>
      <Layout>
        <Main />
      </Layout>
    </StateContext.Provider>
  );
}
