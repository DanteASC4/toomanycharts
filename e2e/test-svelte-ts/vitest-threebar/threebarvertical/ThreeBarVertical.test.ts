import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ThreeBarVertical from './ThreeBarVertical.svelte';

test('[Top] renders ultra basic three-bar chart rect element checks', async () => {
  const screen = render(ThreeBarVertical, {
    placed: 'top',
  });
  const bar50 = screen.baseElement.querySelector('[title="Bar value of 50"]');
  expect(bar50).toBeInTheDocument();
  expect(bar50!.getAttribute('width')).toBe('50');

  const bar100 = screen.baseElement.querySelector('[title="Bar value of 100"]');
  expect(bar100).toBeInTheDocument();
  expect(bar100!.getAttribute('width')).toBe('100');

  const bar30 = screen.baseElement.querySelector('[title="Bar value of 30"]');
  expect(bar30).toBeInTheDocument();
  expect(bar30!.getAttribute('width')).toBe('30');

  const labelAAA = screen.baseElement.querySelector('[title="Bar label aaa"]');
  expect(labelAAA).toBeInTheDocument();

  const labelBBB = screen.baseElement.querySelector('[title="Bar label bbb"]');
  expect(labelBBB).toBeInTheDocument();

  const labelCCC = screen.baseElement.querySelector('[title="Bar label ccc"]');
  expect(labelCCC).toBeInTheDocument();
});

test('[Bottom] renders ultra basic three-bar chart rect element checks', async () => {
  const screen = render(ThreeBarVertical, {
    placed: 'bottom',
  });
  const bar50 = screen.baseElement.querySelector('[title="Bar value of 50"]');
  expect(bar50).toBeInTheDocument();
  expect(bar50!.getAttribute('width')).toBe('50');

  const bar100 = screen.baseElement.querySelector('[title="Bar value of 100"]');
  expect(bar100).toBeInTheDocument();
  expect(bar100!.getAttribute('width')).toBe('100');

  const bar30 = screen.baseElement.querySelector('[title="Bar value of 30"]');
  expect(bar30).toBeInTheDocument();
  expect(bar30!.getAttribute('width')).toBe('30');

  const labelAAA = screen.baseElement.querySelector('[title="Bar label aaa"]');
  expect(labelAAA).toBeInTheDocument();

  const labelBBB = screen.baseElement.querySelector('[title="Bar label bbb"]');
  expect(labelBBB).toBeInTheDocument();

  const labelCCC = screen.baseElement.querySelector('[title="Bar label ccc"]');
  expect(labelCCC).toBeInTheDocument();
});
