# What is this file?

This is kind of a mish-mash of my thoughts process and progress on things, mainly for myself because I work on this lib / tool primarily in odd bits of time I have which means it's a bit spontaneous, so it helps with remembering what I've been doing and why. It's also kind of a rubber-duck place as well for deciding on things.

Since this is more of a passion project I thought it'd be fun to have here where anyone could see.

The little **update#** are usually points in which I had stopped writing prior, but came back not to long after.

# 7/18/2025

Just realized I'm not really using min/max at all lol. I guess for now that's ok, I think incorporating those wouldn't be impossible but would be annoying to calc like a proportional automatic min or max based on given width/height.

Maybe not using it and just always having things be based on the height / width would be best to keep things as simple as possible for users.

Also just thought of labels being on the inside or outside. But that would mean viewbox padding if it were outside and not at the 'end' of each bar, since the start of each would be out of the viewBox. Though this wouldn't be too difficult to implement with a bit of exterior padding to the viewbox when labels are set to 'outside.' Unless that would throw off all the x/y caclulations...

## Same Day Later Thoughts...

### Min/Max?

Yeah thinking about it more, I'm going to remove min/max. I can't imagine a scenario where simple bars would be wanted with a scale much higher than the actual data, or less for that matter.

This also made me think of negative numbers. It would actually be not super hard to do that, automatically i.e. if there's any negative number in the dataset place all bars at center, with negative values below half or to the left, and positive to the right. But I think this might be better as it's own bar type like stacked. type = 'mirrored' maybe. Anyway that's for later regardless.

### Simple plugins

I think it'd also be nice to have a simple plugin system, like one for 'hover tooltip' that'd utilize modern APIs like popover and whatnot. Also a future thing but wanted to record that though!

Misc ideas:
- Auto-generate a small legend to go with a chart
- Hover tooltip utilizing anchor positioning

### BarChart Specific Placement

I think from the start I was a bit 🤔 on the "orientation" key, and I just had the thought that for bar charts - it can just be the four sides. Left, top, right, bottom.

As for an intuitive key, I think "placement" sounds right. Which side would you like your bars sir? The top! Also means functions don't need to be renamed, can pass placement to vertical/horizontal and have that factored into the calculations.

# 7/19/2025

Ok so I've done some more thinking on both calculating bar placement & testing.


## Bar Placement

I think I can make the calculations more consistent, because regardless of which side the bars should be anchored to, the spacing should be the same.

I will draw out a diagram and do some figuring out of the math related!

## Testing

So I like the way that testing is done now, but for development - it's a bit tedious. Each time I want to see the output I have to:
1. Rebuild the module
  - `deno run -A scripts/build_npm.ts 0.0.1`
2. `cd` into `e2e/test-svelte-ts`
3. Run `pnpm install ../../npm`
4. Stop any current tests, and close any stranded chromium windows
5. Re-run `pnpm test:chromium`

This slows me down more than I'd like. I think later on this will be great for having a way to test many frameworks (vitest-browser is cool!) but for development I need something more rapid.

I'm thinking I might use `deno-dom` so I can create elements without needing browser APIs. But I don't want that to be bundled with the resulting library.

So I think I should be able to use a CLI flag when building to not use that, something like `deno run -A scripts/build_npm.ts 0.0.1 prod` or `--mode=prod` which is easy to pick up with Deno.

### Update1

Actually I think that importing a library at all means it will be it the output, but whatever for now I'll roll with it. And I guess that means it'll work server side which is cool and something I hadn't considered. Maybe it'd be better like that??

### Update2

@b-fuze/deno-dom `doc.createElementNS('http://www.w3.org/2000/svg')` unimplemented...

## Docs

The docs will be made with fumadocs! Looks too clean.

## many hours later...

Ok so in figuring out the bar placement, I went down a rabbit hole for a few hours drawing things out on excalidraw. I'll include that in the `extras` folder.

***The read order for it is roughly top-down first, then left to right. Each train of though I'd mostly go down, and then shift to the right & start from the top when thinking through something more different.***

But I think this time I've really nailed the spacing down so I'm excited to implement the new methodology I found. I'm sure this is a solved problem out there but it was fun to arrive at my own answer.

as for the **testing** side of things. Welp, the `SVG` namespace is not yet implemented for deno-dom. Sooooooo either I install an npm package which I'd like to avoid or just continue testing the builds.

I could probably just make a nushell script for it or something, or `watch-exec` it.

# 7/20/2025

Ok so it's the next day, I've finished the first implementation of the new method! And I was considering my options with the whole `deno-dom` reporting that the namespace is unimplemented. But I had the thought of just trying it with `createElement` and that works!

I'm sure thre will be some caveats, but I'll do my best to keep in mind that any weird issues later on could be from this.

## Scales & More?

Did some more thinking about the scales of said charts, and I feel more firmly that not using `min/max` at least for the bar chart is definitely the way to go.

Ultimately, I don't want to try to compete with the many amazing data vis libraries/frameworks that exist and do all the detailed aspects super in-depth and more.

This whole thing was inspired partially by google sheet's sparkline function, I thought it was quite interesting how a simple rectangle could so vastly enhance data readability when used correctly.

So I want to keep the actual data side of creating charts dead simple.

Maybe if I add more charts, more things would be needed, but right now I want to keep the only things needed as an array of data. I had some more thoughts on the labels, which I'll get to later but I think I should do some more testing of the new bar chart creation method before I get ahead of myself.

## Update1

After a small tweak to some math, it's working! For all four sides! I even tested it with rectangular dimensions and it works! Which makes sense but is still nice to see.

Ok time to push.

## Update2

Alright so I think the next thing to do is to remove min/max for the afore mentioned reasons, and then tackle labels, then color.

**Mini update**
Ok that was easy, since I wasn't using them lol.

### Labels

Labels. So like I mentioned prior, I had some thoughts about labels, I think it's a bit tricky all things considered, mainly due to font-size, which also depends on the font-family, and depending on the size of the container, some labels may get cut off in some scenarios & whatnot.

And that led me to an idea... What if I just control them with CSS? Lemme try it before explaining.

**Mini update**
Mission failure! But honestly that's fine. I'm also kind of glad, because I had the scary thought - what if everything could've been spaced by simply using flexbox 💀

But you can control some things via CSS, that I knew already. Like fill & some other visual properties.

I think the best thing to do here, is to do labels how I originally was going to, and then later on it can be improved, and I'll I'll also aim to make a 'legend' plugin as I think this would be another viable option.

I'll just rotatate it a bit as needed for each placement option.

**Mini update**
Luckily that part was pretty simple now, just used the bar coords with offsets as needed. But when the bars are on the right, placing the text becomes complicated - since everything is placed via top-left coordinates the same logic leads to overlap since text is added naturally from the left to the right, and in this case the bars are to the right. If there was a way to like "right-align" text so that when text is added, it's auto-shifted to the right that would be most ideal, or it could be placed via top-right coordinate instead of top-left. I think those both might be possile, but again, I don't feel like going down a text positioning rabbit hole right now.

I had also considered allowing the labels to have a placement mode of "outside" but nah, that's another rabbit hole of now needig to expand the viewbox according to font size & text length and whatnot. I think aligning some labels manually with CSS would be simpler and more reliable. I'll include many examples of doing additional stuff like this (CSS external labels) later. Because again I don't want to get crazy with capabilities - this is meant to be simple & plug-n-play friendly.

One thing I will do though, before pushing this is allow no labels. I think it's time to allow labels to be empty. I'll just have it default to an empty array. As external labels, a legend, or otherwise could be used in place of labels to potientially better effect.

Additionally though later on, I'd like to support image labels. I think a small image could be a great way of using labels.

**Mini update**
Done!

## Update3 - Colors

One thing that hit me just now is responsiveness. I think the simplest way to do that would be making coordinates for things percentages. But I'll worry about that later.

### Colors!

Ah colors, I love how something that seems so simple can be so crazy deep. At least it surprised me how deep the world of color is when I first explored it.

Any oklch enjoyers?

Alright so here's what I'm thinking. Currently for bar charts, the data will have one of two structures.

This: `[1,2,3]`
Or: `[[1,2,3],[4,5,6],[7,8,9]]`

*(stacked charts currently unimplemented, but later I'll do it - just slicing up a rect)*

So I think the simplest thing for colors would be to allow the same data types.

#### E.g.

Data is: `[1,2,3]`
Colors: `['red','green','blue']`

then it's as simple as:
- bar 1 = red
- bar 2 = green
- bar 3 = blue

Additionally I can have it pick with modulo so we just wrap around allowing for something like:

Data is: `[1,2,3,4,5,6]`
Colors: `['red','green','blue']`

then it's as simple as:
- bar 1 = red
- bar 2 = green
- bar 3 = blue
- bar 4 = red
- bar 5 = green
- bar 6 = blue

And so on. This would also work for stacked arrays I'd just be moduloing twice depending on which sub-rect I'm coloring. Also this allows for any color type.

**Mini Update**
Got distracted and did a couple chore type things.

- I've added a "philosophy" section to the readme, where later I'll elaborate on some decisions (like no min/max). But I'll get to that later.
- Updated the readme to have a better checklist of pre-0.1.0 things

Damn it I just remembered I left `barWidth` in the parameters. Prety sure that'd throw off the spacing.
Tested it and yep. Of course. Ok well luckily - I can just use the proper width for calculating coords, and then offset the result by the bar width (if it's different).

Surely it will be simple to implement.

**Mini Update**
Phew, it was as I thought - pretty straightforward. Took like 5 minutes. Ok re-focus time, back to colors!

Except unfortunately I've run out of time for now. I've gotta do some other stuff but I'll come back to this soon!

# 7/22/2025

Two days later & I've done it! In my spare time I've got colors working, and not just normal solid colors - those are working just like I wanted & described above but I've added an additional coloring option! Gradients!

Now gradients is yet another thing that you can really go far with, but for now at least I've kept things relatively basic.

Here's a rough overview of coloring options:

- **No supplied colors**
    - Bars will be colored white when no form of coloring is chosen
- **`colors` array**
    - Colors will be chosen by using module on the index for each bar
        - This means you don't need to supply a color for every bar
        - Or you can add a single color to the array to have all the bars be that color
    - Can be any valid color format
- **`gradientColors` array**
    - When supplied will automatically create an evenly-spread linearGradient consisting of the given colors
        - E.g. `gradientColors: ['#ff00ff', '#00ffff']` will create a gradient like so:
        - ```
          #ff00ff #00ffff
        <-0----------1->
        ```
    - This also takes precedence over the `colors` array when supplied (as-in if both are given, `gradientColors` will be used)
    - Additional optional related params: `gradientDirection` and `gradientMode`, see docs for details!
- Note that **text labels** are not affected by any coloring as of now.
    - Mainly because I'm still a bit uncertain of whether labels will be fully supported given the difficulties involved, and perceived value added by overcoming them. At least for now.
- **stroke** has been largely untouched, but the same process would work for that and I think it would be nice to have as well. That's coming soon!
    - Unsure of whether gradients are possible in the same way. My gut says yes but I haven't tested it. Potential avenues for implementation:
        - I think masking has "border-box" or something related as a property, maybe
        - Could add a second `rect` behind each bar with a width calculated based on desired stroke width & bar width to give the perception of having an outline. This would also allow for coloring in the same way as bars at the cost of increasing the end payload size by a significant amount.
            Perhaps size could be mitigated via `<use>` (I tried this for the gradient stuff but I couldn't get it to work which kind of makes sense I guess, I may revisit it later though!)

This also meant doing a bit of a refactor in terms of output, particularly to support a really cool (I think) way of using gradient colors. That being the `gradientMode` of `'continuous'` which the docs will expand on.

Previously the structure was something like:

```html
<svg>
    <g>
        <rect />
        <text />
    </g>
    <!-- etc... -->
</svg>
```

And now it's:
```html
<svg>
    <!-- defs exists only if using gradients -->
    <defs></defs>
    <g>
        <rect />
        <!-- etc... -->
    </g>
    <g>
        <text />
        <!-- etc... -->
    </g>
</svg>
```

Which I think I actually like more anyway.

## 0.1.0 release

That being said I also did some more thinking and I've decided that for a `0.1.0` release `stacked` bar charts aren't really needed. I don't want to get sucked into the classic "I should do this before putting this out there" and then when I'm done with that I think "wait but this too" and whatnot.

This started as bar charts only anyway so it'll go out with just that!

That also means I've moved the todo-list to it's own markdown file.

# 7/23/2025

So I did some more thinking and had some more thoughts. Crazy, I know.

## I forgor

Ah I'm a fool. I was thinking about using the package myself now that it's mostly usable and then realized a major oversight. The way things are currently setup, with no max for the scale I had not considered making a barchart that exceeds the dimensions of it's container.

Put simply, I've been testing things with values that are less than the resulting size, if I were to use something larger - the bar would be extending past the bounds of it's viewable area. This isn't a terrible thing, "breaking the scale" in a way is also conveying information - but I know it's important to be able to change that behavior.

And tackling this means bringing back some form of `max`, I think what I'll do is:

- Re-introduce just `max` and use this to set the viewbox dimensions
    - Can be optional again, and when not supplied we'll assume something like 15% more than the highest datapoint value
    - Would need to set height or width according to placement option
    - Will keep the no "min" needed

I was also thinking about making things percentages, but that'd still use a `max` of some sort so yeah one way or another, `max` is back.

**Update1**
Alright I'm back & luckily it was a simple fix, just use the max as the viewbox's height or width depending on where the bars are placed.

This also makes me think that I should separate width & height from the element & the viewbox, maybe just as an override. But I want to field test things more before I do that.

## Docs

Aside from that the docs site is going well! It's a bit overkill feature-wise but fumadocs makes for a very slick experience just like I wanted. It's also fine because I don't need to use every single feature offered.

Probably a few more days to finish up the first version of that as I want to include loads of examples.

## ssr, react, & more

Initially I had planned for this lib to be client-sided, but the usage of `@b-fuze/deno-dom` allows for this lib to server-side as well.

There's a couple issues with it though.

### no `createElementNS`

Right now I'm just using `createElement` because `createElementNS` doesn't exist. While this hasn't resulted in any major pitfalls I'm imagining at some point I'll run into some sort of issue due to that.

The lib `deno-dom` is still alive though, with the most recent release being 2 weeks ago at time of writing. Perhaps I'll contribute as well?

I have noticed one issue though, that being that for whatever reason, when doing `setAttribute("viewBox","0 0 300 300")` the resulting HTML has `viewbox` instead of `viewBox`, it ignores the uppercase `B`. Luckily modern browsers don't care too much about that, and render it anyway but it does cause some warnings.

So that leaves a couple options.

a. abandon `ssr` for now, focus on client side only like originally intended.
b. roll with it, there's still no actual issues with things now, and switch libs later or hope for `deno-dom` to get Updated
 - (or help move the update along myself)
c. find a different way of creating elements for `ssr`

I'm leaning towards either `c` or `b`. Deno is awesome, and iirc one of the things it enables is a way of using languages outside of js/ts in projects.


#### `c`

So if I could find a library compatible, in any language I could potentially use it. What I'm worried about that though is **bundle-size.** Since I really want to keep this lib lightweight. I'll have to research that more, but it sounds both intersting, and potentially very viable as languages apart from js/ts could be significantly faster.

#### `b`

Option `b` is probably the more realistic option though, and for the time being I'm going to stick with what I have. Again, there aren't any huge issues as of now, and it works pretty seamlessly.

### environment detection

One thing I encountered when I was using the lib myself for the docs site was the fact than in react, the `class` attribute is `className`. That's pretty annoying. I've now got to figure out how to account for that. In the short-term a param for it would work just fine, but I want to be able to auto-detect this.

With `vite` you can do `import.meta.env` and read the dir contents, perhaps something like this would work & I can look for `.jsx or .tsx` file extensions.

Though if the function is used inline, I wonder if it would even be an issue, I was only seeing that get flagged as an error because I was pasting the SVG in directly instead of calling the function inline, since it was for including an example of the output.

For now I'll add a param that allows you to have the output react-friendly and later maybe auto-detect env if it's an issue.
- `className` instead of `class`
- `xmlnsXlink` instead of `xmlns:xlink`

I wonder if it should also detect if it's client side automatically to use `document.createElementNS` instead of `deno-dom`. That's a good idea I think.

**Update1**
I just looked through the `deno-dom` repo a bit and found a doc describing some of the goals for the lib. There's a section called SVG and right now it's described as "???" 🤣 funny though since it still is working alright for SVG elements!


**Update2**
Wait I just realized, the usual convention for this (I think) is to have framework-specific imports I think. Something like:
```ts
import { barchart } from 'nanocharts/svelte';
// or
import { barchart } from 'nanocharts/react';
```

I think this is better than what I was thinking with auto-detection of stuff, though it is an interesting idea. But I'll get to that later anyway, there's still much to be done for the core itself.


# 7/24/2025

The lib internals itself are a bit unorganized, as I've been doing a bunch of 'figuring out as I go' but that doesn't mean I can't stay organized. I also want to always keep that core philosophy in mind of being simple to get value from, but with the ability to take things further if you wanted something a bit more.

## Naming

I did a bit of thinking on this, and while I like the idea of having everything under one function, similar to `SPARKLINE` I think keeping exports divided based on the chart type would benefit the end bundle size, if my understanding of how that works is correct that is.

```bash
 └─ tests # unit tests
 └─ e2e # framework specific & other usage tests
 └─ src
    ├─ utils
    │  └─ maths.ts
    ├─ creating # element creation relating to chart of filename
    │  └─ barchart.ts
    └─ main.ts
    └─ barchart.ts
    └─ etc... # more charttypes.ts
```

# 7/25/2025

For now going to just commit to `deno-dom` to make it less janky internally, and I think I've settled on wanting this to work in non-browser contexts as well.

Still need to do a bit more before 0.1.0, that being:

- Cleanup
    - Match the above organizational goal
    - Do less "checks" for the user, with proper docs & error messages I shouldn't need to check things for the user really. This isn't referring to the default creation. I know that you can have default params but some of them are based on the presence or absence of other params so I'll leave that stuff for now.
- Docs site
    - So far so good, fumadocs is awesome.
    - Main docs remaining:
        - Barchart page
        - Loads of examples

# 7/26/2025

It's the weekend now, didn't get much done yesterday so I was eager to wrap up the 0.1.0 todos. I go to test things out by building things, and I'm met with:

```
error: Uncaught (in promise) "Not implemented support for Wasm modules: https://jsr.io/@b-fuze/deno-dom/0.1.52/build/deno-wasm/deno-wasm_bg.wasm"
```

...

![](https://media1.tenor.com/m/2U_hdX_TSCMAAAAd/patrick-bateman-stare.gif)

Welp, no more `deno-dom`. Did a bit of research and looks like `linkedom` is what I'm looking for! This should also resolve that issue I was having with casing of attributes, where `viewBox` was being output as `viewbox`.

I realized it was more problematic than I initially thought because it was also affecting the `gradienttransform` attribute which is needed for rotating gradients.

Maybe I can use the esm shim import? But I don't know if that's better than just installing it 🤔 lemme do a bit of research on that. **Update** is that it's pretty much the same thing as far as I can tell, I didn't dig too deep as `linkedom` is actually quite lightweight which is nice. I installed it just to keep consistent with having already installed things.

So no more `@b-fuze/deno-dom`! Unfortunate as WASM is pretty cool & should be faster - but `linkedom` looks to be also focused on performance so it shouldn't be a noticeable difference really, I'll switch back as the WASM side of things matures.


Did a bit more looking into it and `linkedom` mentions deno in a recent update which is cool! That update also mentions workers being added, which I'm not sure if that refers to creating workers like in browsers or that the lib itself can now leverage workers. Either way the more I think about it the more my dismay about switching lessens.

Couple nice things with `linkedom`:
- Can now create in the SVG namespace like in browsers! No more asserting the output type!
- No more casing issues!

Ok I'm repeating myself at this point but what seemed like a major setback turned out to be an absolute win! Ok back to adding examples!

# 7/27/2025

Interesting start to the day!

After much fiddling with things, I finally got pretty much all the `0.1.0` todos wrapped up.
- Basic logo
- Basic Docs site
    - Up and running on github pages after a bunch of wrestling with some auto-generated things
- Exports and everything in place


Then I went to publish the npm package, now prior to this I *had* checked that the npm package with the name "NanoCharts" wasn't taken - it wasn't!

So I go to run `npm publish`, I login, all of that, and then at the last moment get hit with a message saying "NanoCharts" is too similar to existing package "nano-charts"!

I go check it out, lo' and behold - someone with quite a similar idea to me! Though this package had not been updated in about 7 years.

Alright then I'll go "minicharts" nope, also taken, same idea as well! Haha the odds! This time though it's 8 years ago. Ok surely "toomanycharts" will be available... Nope! Also taken, this time 8 months ago, though this one has no README or repo linked which is interesting.

I even partially committed to "toomanycharts" before realizing, I thought for sure that one would be available, 😆 you know what, I'm thinking I'll go with "toomanycharts". In the spirit of things, this one isn't taken either.

If I get a message saying someone has "too-manycharts" when I try to publish under that I'll explode.

**Update**

Phew, that one was available as I thought! Version `0.1.0` is out! I'll be doing the stacked barcharts next I think.

# 7/28/2025

Ok so I've done the basic implementation for stacked barcharts, and it felt almost too simple. One thing I've realized is that I didn't think about how the labels for stacked bar charts would be colored. It made me think that labels should have their own color parameter, which could be just one color, but I could also let it have multiple colors to also allow for alternating colors.


Writing this down here, but I think allowing for **images** somehow would be really nice. I'll think it through later, but would ideally introduce much more overhead on the page, don't want to block anything. Hmmm. I know JS has the `Image` constructor but not sure if that'd be the best option. Couple ideas:
- Image
- Actual `<img...` eles
- SVGs
    - This would be easy to do I think so I'll likely allow this anyway

But that's for later.

# 7/29/2025

Continuing work on the stacked bar chart, & test coverage - I noticed some bad parameter naming. I had named the paramter for adding a class to the labels elements `textClass`... The "label" class param is called "textClass" which felt wrong so!
- `textClass` -> `labelClass`

Then while I was doing a bit of work on test coverage - I realized I forgot about `textGroupClass`. So!
- `textGroupClass` -> `labelGroupClass`

Since this whole lib is in the early stages I won't just mark it as "deprecated" or anything, just going to fully rename it now while I can.

Which got me thinking if a "CHANGELOG.md" would be good, but I've got a nice doc site already, so I think that would be better there!
Changelog page on the way!

**Update1**
While working on coverage I saw that the coverage wasn't picking up a certain part of that nested ternary used for the color picking.

```ts
const color =
  isGradient && gradientId
    ? gradientMode === 'continuous'
      ? 'transparent'
      : `url('#${gradientId}')`
    : colors && colors.length > 0
    ? colors[i % colors.length]
    : ['#ffffff', '#aaaaaa'];
```
particularly the "url" bit which is when it's a non-continuous gradient. Though I checked the output & see that that is being used for non-continuous gradients, but honestly it's a bit of an abomination so I don't blame the coverage check.

I think that's a sign that it's time to split this up into a good ol' if/else if/else block!

**Update2**
Turns out it wasn't the url part that wasn't being used, it was the normal colors part - I guess I misread the little indicator in the html output. It's fine though as that ternary shouldn't exist anyway.

**Update3**
In the coverage it shows that this is uncovered:
```ts
if (typeof document !== "undefined" && document instanceof Document) {
    return document.createElementNS("http://www.w3.org/2000/svg", ele);
} else {
    const { document } = parseHTML(
        `<!doctype html><html><head></head><body></body></html>`,
    );
    return document.createElementNS("http://www.w3.org/2000/svg", ele);
}
```
Which makes sense, because I don't have a test with a global faux-document anyway. I'm not sure if this check is even needed, since linkedom is imported it will be bundled regardless if my understanding is correct, so I may remove this later but for now I'll ignore that.

**Update4**

Ok just about everything is at or above 90% for coverage. Going to stop now. Only oddity is the `barWidth` param, that was reported as not being covered for the cases where it's not equal to the automatic `evenWidth`. But I remember trying that out & visually it looked correct so I'll leave it as-is for now.

Need to update docs as I think barchart stacked is pretty much good to go!

# 8/1/2025

So I've begun work on the linechart, and I've already got a bunch of thoughts / things to figure out. Gonna write them here to not  forget.


## Multiple Lines

Was thinking I'd do a `linechartMulti` for drawing multiple lines. But then I thought I might just allow the `data` to be `number[]` or `number[][]` instead of two separate functions.

Except that would go against how it was done for bar chart stacked. I think I'll make a separate function to keep things consistent, and beccause it would be better for bundling to split things up.

## Scales?

With bars it was easy to not really need scales / a grid. But I'd been thinking about it & I feel like something scales related could be really helpful for linecharts.

Considering this as the output:
![](./extras/line_ex0.png)

That doesn't really need scales or anything. And that's plenty in terms of gleaning information. But what if you wanted this:
![](./extras/line_ex1.png)

That's different. It conveys different information. But how much? I think enough to warrant having that functionality. Except now that I'm thinking about it, I don't think it needs scales.

That's the midpoint basically. So I think in using this space as a rubber duck I've landed on a good solution, allowing a midpoint to be specified. Otherwise we'll start from `0,0`

## Labels Overhaul

After doing some late night / random thinking about things I've come to a point where I'm thinking labels could be quite important in some use cases.

That being said they've kind of taken a backseat to the actual visuals thus far, and rightfully so I might add - but I think I can see how they could be extraordinarily useful.

The tricky thing is that their implementation will depend on the type of chart. So I'm going to finish the 4 basic chart functions:
- `barchart`
- `barchartStacked`
- `linechart`
- `linechartMulti`
    - Name likely to change for this, sounds bad??

Then I'm going to do some framework specific packaging, and then I think overhaul how labels work. Rough intended feature list:
- Image labels
- Truncation
- Perfect-Placing mode?
    - So it can be tricky, but I know it's possible to truly perfectly place text by calculating how big the resulting box would be based on the font used, and font-size.
    - This would definitely be optional, because I'd imagine that this would be a non-trivial calculation which could add up depending on the # of times run.
- for barcharts > centered on bars
    - right now labels are only placed on the ends
    - I think it'd be fantastic to do something like:
    ```
    =------=
    |  #   |
    =------=
    ```
Maybe some more things too. We'll see!
**Note to self** add this to the roadmap page.


**Update1**
`linechartMulti` -> `linechartMany` sounds better I think!

**Update2**

The `linechart` won't have a `placement` parameter for now since it's read strictly from left to right, and if you want to rotate it you can just use `transform` on it. 

...Also just realizing I could have just done `place` instead of `placement`... wdjaiojwdiowoijqowj
I'll make that change with the linechart update, less to write and more in-line with CSS naming.

I'm also thinking I'll move some mathematical functions out of `maths.ts` and into the relevant `creating/chart-type` files to keep things more organized.

Or maybe a `maths/` folder with corresponding names? Or would that be excessive, hmmmm... I think that sounds better, then the folder structure would be something like:

```
├─ src
│  ├─ ...
│  ├─ utils
│  │  └─ ...
│  ├─ creating
│  │  ├─ common.ts
│  │  ├─ chart-type.ts
│  ├─ math
│  │  ├─ common.ts
│  │  ├─ chart-type.ts
```

Which feels sensible to me I think. And I think this would also benefit bundling. But I think I will have one per type, instead of 1-to-1.

So instead of:
```
├─ src
│  ├─ math
│  │  ├─ common.ts
│  │  ├─ barchart.ts
│  │  ├─ barchartstacked.ts
```

I'll do:
```
├─ src
│  ├─ math
│  │  ├─ common.ts
│  │  ├─ barcharts.ts
```

Since the variations of similar types usually share the underlying bits. It would also mean this won't be doubling overall files.

# 8/10/2025

So it's been a bit since I've written here, but I've been making steady progress nonetheless! I re-did the whole deno testing setup to allow for rapid prototyping, as before I had a half baked workflow of running tests with that now-unused `saveIfReal` function, and then opening up the resulting SVG in the browser.

Now that whole process is automated! The `deno` ecosystem is awesome, it was pretty easy to figure out how to get sub-workspaces to run at the same time. The only thing I couldn't figure out is how to "watch" when running more than one task at once, since when I called it with `--watch` the first task would just sit on "watching" and the sub-tasks wouldn't get run. That's why I setup a version using the `watch-exec` external tool which I know isn't best practice, but it's also entirely optional, and not a huge deal as  of now.

## Gradients

So from the start I knew I wasn't tapping into the *full* potential of gradients. For one, I've only incorporated a single `linear` gradient. There's also `radialGradients` and normally you can use multiple gradients at once. 

This decision to go for more of a rudimentary level of gradients was made after thinking things through!
- Radial gradients I think in the context of charts wouldn't even look to great (from what I can imagine using them)
- Multiple gradients while powerful isn't super common, and since charts are mainly for conveying information, having super complex multi-gradient backgrounds could detract from that.

BUT I do plan to add those things at some point, it just doesn't feel worth it any time soon. That being said I realized one feature of gradients that I think *should* be added, and that's custom stops.

Currently the stops for linear gradients are placed automatically distributed evenly, meaning if you give two colors you will always get a gradient of 50% one color and 50% the other. While this is mostly fine, since you can supply more of the same colors to pseudo-place the color stops, I forgot about  hard-stops! 

Like a barbershop swirl or candy cane stripes, the current setup means stripes of that kind are impossible. So custom `stops` are on the way soon! They'll be optional of course!


# 8/13/2025

After thinking about it, I am thinking that maybe there shouldn't be a `linechartMany` and instead it should be just `linechart` and you can make one or many lines depending on the `data` parameter. Hmmm... 🤔 But that would also mean doing a bunch of annoying typescript assertions for parameters.

Oh wait I just realized the solution, it should *always* assume many. `data` should just always be `number[][]` and not `number[]`. The function can make one or however many lines!

Time to go delete the singular `linechart` and make the `linechartMany` into `linechart`. I don't know why I didn't think of this initially.

Maybe I can allow `number[]` and just check if the Array is one-dimensional and if so just throw it in array internally. I also realized that the `linechart` is a bit more involved since I think ultimately I want to allow styling of each line, which would mean multiple gradients. But the current setup doesn't allow for that.

Though perhaps that's a bit excessive? I think to me it also sounds fine because I really enjoy thinking of things in terms of arrays, but I hope it would still be intuitive to others.

Right now it's something like:
```js
{
    gradientColors: ['red', 'blue'] 
}
```
Which would produce a `red-to-blue` gradient.

But I think it wouldn't be too hard to allow:
```js
{
    gradientColors: [
        ['red','blue']  // -> a red-to-blue gradient
        ['green', 'yellow'] // -> a green-to-yellow gradient
    ]
}
```

Which I feel like is pretty intuitive. This is also how colors work, and this same kind of "as many as wanted of said style" works because of the alternating nature of them, where even if you supply two colors for 10 data points, we just go loop the choices. So I think this does feel intuitive!

But what about color stops... Hmmmmm I don't want another argument for just those, I think that would be too hard to match to the numbers.

In CSS, there is no color type that uses `:` so what if it went something like `<color>:<stop-percentage>`. According to the [spec](https://svgwg.org/svg2-draft/pservers.html#StopElementOffsetAttribute) the `stop-offset` is either `0-1` or `0%-100%`. I think the  percentages are a lot easier for most people so we'll roll with that. It means things could look like:
```js
{
    gradientColors: [
        ['rgb(255, 0, 0):30%','rgb(0, 0, 255):60%']
    ]
}
```
Which feels pretty fine to me. Except that would mean additional checks for `:`. Which I don't think would be super costly. Otherwise it would be assuming the next value in the array is a stop:
```js
{
    gradientColors: [
        ['rgb(255, 0, 0)', '30%', 'rgb(0, 0, 255)', '60%']
    ]
}
```
Which seems a bit more 'normal' but I want stops to be optional, like maybe only the `30%` is there and not the `60%`. We can't check for `%` because there are color formats that use `%`. So yeah I think that decides it! It'll be `<color>:<stop-percentage>`!

Now I wonder if I can make this into a typescript mapped type...

**update**
Common TypeScript W
```ts
type MakeRange<
  N extends number,
  Result extends Array<unknown> = [],
> =
  (Result['length'] extends N
    ? Result
    : MakeRange<N, [...Result, Result['length']]>
  );

type MaxP = MakeRange<101>;
type Percentage = `${MaxP[number]}%`;
```
![An image showing how when you hover over the "Percentage" type in the typescript playground you can see the allowed literal types are evaluated to be 0% to 100%](./extras/ts_percent_type.png)


**update2**
Ok I've consolidated them! The beginning of the function is a bit verbose as I'm turning a bunch of stuff into arrays if it's the singular version, but it feels much better than having two versions for a singular line or multiple lines.

Cool!

I think a bit more testing and it'll basically be usable!

# 8/14/2025

So I had a terrifying thought, what if I should have combined `barchart` and `barchartstacked`!?!? But then I remembered that was how I started and it was cumbersome, and increased the import size because one function had both implementations. Bar Charts are a different type of chart compared to a Stacked Bar Chart, whereas the linechart ordeal was just more of the same thing - lines. So the import size isn't increasing nor is the implementation different, it's just looping over inputs. 

Ok so time to implement gradient color stops!

# 8/17/2025

So I added the gradient stops, revamped testing, got coverage to 100% with some more tests. Everything looked well & good so I pushed an update! Then I tried making the test with a bunch of datapoints smooth, and it looked wrong. It just happened that my test with three datapoints looked "ok". 

A bunch of research later I had a basic understanding of the math for drawing bezier curves, but I couldn't wrap my head around implementing that into the `<path>` element.

After a bunch of manual math with paper & pen, a temporary test setup with manual writing `<path>` elements & each coordinate + set of control points, trying 1000 things, I figured it out! It was actually thanks to the example usage of the `<path>` element on `mdn`.
 TLDR is that the formula for ideal smoothness is to use the x of the midpoint between each set of points & the first point's Y / second point's Y for the control points. It only took like almost 5 hours to figure out.
