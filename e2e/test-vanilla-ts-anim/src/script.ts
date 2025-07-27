import { animate, utils } from 'animejs';
import { barchart } from 'nanocharts';

const growBars = () => {
  utils.set('.el-bar', {
    transformOrigin: 'left center',
    scaleX: 0,
  });
  animate('.el-bar', {
    scaleX: [0, 1],
    duration: 2000,
    ease: 'linear',
  });
};

export default function BasicChart() {
  const basic = barchart({
    data: [50, 100, 30],
    barClass: 'el-bar',
    placement: 'left'
  });

  setTimeout(() => {
    growBars();
  }, 100);
  return basic;
}
