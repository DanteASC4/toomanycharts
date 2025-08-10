import { assertEquals } from '@std/assert';
import { afterAll } from '@std/testing/bdd';
import { linechart } from '../src/linechart.ts';
import { buildGalleryPage, SaveablePairs } from './helpers.ts';

const pairs: SaveablePairs = [];

Deno.test(function lineChartBasics() {
  const tlc0 = linechart({
    data: [50, 100, 30],
  });
  assertEquals(tlc0?.getAttribute('width'), '300');
  assertEquals(tlc0?.getAttribute('height'), '110');

  const tlc1 = linechart({
    data: [10, 20, 10, 20, 10, 20, 50, 100],
  });
  assertEquals(tlc1?.getAttribute('width'), '300');
  assertEquals(tlc1?.getAttribute('height'), '110');

  const tlc2 = linechart({
    data: [10, 20, 10, 20, 10, 20, 50, 100],
    fullWidthLine: true,
  });
  assertEquals(tlc2?.getAttribute('width'), '300');
  assertEquals(tlc2?.getAttribute('height'), '110');

  const tlc3 = linechart({
    data: [50, 100, 30],
    color: 'red',
  });
  assertEquals(tlc3?.getAttribute('width'), '300');
  assertEquals(tlc3?.getAttribute('height'), '110');

  const tlc4 = linechart({
    data: [50, 100, 30],
    color: 'red',
    thickness: 5,
  });
  assertEquals(tlc4?.getAttribute('width'), '300');
  assertEquals(tlc4?.getAttribute('height'), '110');

  pairs.push(
    [tlc0, 'basic'],
    [tlc1, 'bunch of points'],
    [tlc2, 'fullwidth line'],
    [tlc3, 'colored line'],
    [tlc4, 'thicker colored line']
  );
});

afterAll(() => {
  buildGalleryPage('Line Chart Extras', pairs);
});
