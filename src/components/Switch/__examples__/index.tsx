import { Switch } from '@sport/components-mobile/Switch';
import { Card } from '@sport/components-mobile/Card';
import { List } from '@sport/components-mobile/List';
import { Space } from '@sport/components-mobile/Space';

import * as createExamples from '@components/ui-mobile/Switch/__examples__/createExamples';

const componets: createExamples.Components = {
  Card,
  List,
  Space,
  Switch,
};

export const Base = createExamples.createBase(componets);
export const Loading = createExamples.createLoading(componets);
export const Disabled = createExamples.createDisabled(componets);
export const Text = createExamples.createText(componets);
export const InList = createExamples.createInList(componets);
