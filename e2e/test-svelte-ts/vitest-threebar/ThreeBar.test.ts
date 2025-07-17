import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ThreeBar from './ThreeBar.svelte';

test('renders ultra basic three-bar chart rect element checks', async () => {
  const screen = render(ThreeBar);
  const bar50 = screen.baseElement.querySelector('[title="Bar value of 50"]');
  expect(bar50).toBeInTheDocument();

  const bar100 = screen.baseElement.querySelector('[title="Bar value of 100"]');
  expect(bar100).toBeInTheDocument();

  const bar30 = screen.baseElement.querySelector('[title="Bar value of 30"]');
  expect(bar30).toBeInTheDocument();
});
test('renders ultra basic three-bar chart text element checks', async () => {
  const screen = render(ThreeBar);
  const labelAAA = screen.baseElement.querySelector('[title="Bar label aaa"]');
  expect(labelAAA).toBeInTheDocument();

  const labelBBB = screen.baseElement.querySelector('[title="Bar label bbb"]');
  expect(labelBBB).toBeInTheDocument();

  const labelCCC = screen.baseElement.querySelector('[title="Bar label ccc"]');
  expect(labelCCC).toBeInTheDocument();
});
