import { animate, utils } from 'animejs';
import { barchart } from 'toomanycharts';

const growBars = () => {

  animate('.el-bar', {
    scaleX: [0, 1],
    duration: 2000,
    ease: 'linear',
  });
};

export default function basicChart() {
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
