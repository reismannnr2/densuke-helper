/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Layout } from 'src/components/layout';
import { StateContext, state$ } from 'src/state';
import { Patterns } from 'src/components/patterns';
import { DensukeOutput } from 'src/components/densuke-output';
import { BaseSetting } from 'src/components/base-setting';
import { Usage } from 'src/components/usage';

function Main(): React.ReactElement | null {
  return (
    <main
      css={css({
        width: 1024,
        padding: 8,
      })}
    >
      <h1>伝助ヘルパー</h1>
      <Usage />
      <BaseSetting />
      <Patterns />
      <DensukeOutput />
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
