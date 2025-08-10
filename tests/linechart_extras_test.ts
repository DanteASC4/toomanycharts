import { assertEquals } from '@std/assert';
import { afterAll } from '@std/testing/bdd';
import { linechart } from '../src/linechart.ts';
import { buildGalleryPage, SaveablePairs } from './helpers.ts';

const pairs: SaveablePairs = [];

Deno.test(function lineChartExtras() {
  const tlc0 = linechart({
    data: [50, 100, 30],
  });
  // const offset = autoOffset(3);
  // const values = [50, 100, 30];
  // const result = genCoordsStraight(values, offset, 300);
  // console.group("Test");
  // console.log(offset);
  // console.log(values);
  // console.log(result);
  // console.groupEnd();
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

  // saveIfReal(tlc0, "linechart_extras", "tlc0");
  // saveIfReal(tlc1, "linechart_extras", "tlc1");
  // saveIfReal(tlc2, "linechart_extras", "tlc2");
  // saveIfReal(tlc3, "linechart_extras", "tlc3");
  // saveIfReal(tlc4, "linechart_extras", "tlc4");

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
