import { page } from '@vitest/browser/context';
import { expect, test } from 'vitest';
import BasicChartTest from './Basic';

test('renders most basic possible barchart', () => {
  // const parent = HelloWorld({ name: 'Vitest' })
  const parent = BasicChartTest();
  document.body.appendChild(parent);

  // const element = getByText(parent, 'Hello Vitest!');
  const bar1 = page.getByTitle('Bar value of 50');
  expect(bar1).toBeInTheDocument();

  const bar2 = page.getByTitle('Bar value of 100');
  expect(bar2).toBeInTheDocument();

  const bar3 = page.getByTitle('Bar value of 30');
  expect(bar3).toBeInTheDocument();
});
