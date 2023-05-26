import { Meta } from '@storybook/react';
import { Description, Primary, ArgsTable, PRIMARY_STORY, Stories } from '@storybook/addon-docs';

import { Switch } from '@sport/components-mobile/Switch';

import docs from './docs.md';

const meta: Meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      page: () => (
        <>
          <Description markdown={docs} />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
};

export default meta;

export * from '../__examples__';
