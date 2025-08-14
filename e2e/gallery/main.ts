import { Hono } from 'hono';
import { serveStatic } from 'hono/deno';
import { html } from 'hono/html';

const app = new Hono();

app.use('/out/*', serveStatic({ root: './' }));
app.get('/', (c) => {
  return c.html(html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TooManyCharts Unit Test Gallery</title>
        <style>
          html,
          body {
            height: 100vh;
            width: 100vw;
            margin: 0;
            overflow: hidden;
            background: #000;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
          a {
            padding: 0.15rem 0.25rem;
            font-size: 1.5rem;
          }
          a:visited {
            color: blue;
          }
        </style>
      </head>
      <body>
        <a href="./out/barchart.html"> BarChart </a>
        <a href="./out/barchartextras.html"> BarChart Extras </a>
        <a href="./out/barchartstacked.html"> BarChartStacked </a>
        <a href="./out/barchartstackedextras.html"> BarChartStacked Extras </a>
        <a href="./out/linechart.html"> Line Chart </a>
        <a href="./out/linechartextras.html"> Line Chart Extras </a>
        <a href="./out/linechartmany.html"> Line Chart Many </a>
      </body>
    </html>`);
});

Deno.serve(app.fetch);
