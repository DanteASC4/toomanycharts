# What is this file?

This is kind of a mish-mash of my thoughts process and progress on things, mainly for myself because I work on this lib / tool primarily in odd bits of time I have which means it's a bit spontaneous, so it helps with remembering what I've been doing and why. It's also kind of a rubber-duck place as well for deciding on things.

Since this is more of a passion project I thought it'd be fun to have here where anyone could see.

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
