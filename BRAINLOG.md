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

## Docs

The docs will be made with fumadocs! Looks too clean.
