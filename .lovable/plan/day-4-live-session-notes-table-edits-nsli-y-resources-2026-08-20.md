# Day 4 Live Session Notes — table edits + NSLI-Y resources

## Part A — table changes

1. **Summer Learning Symposium table** — remove the "How they got in" column, leaving Student and What they did.
2. **Order** — move the Opportunity Gallery Walk section (table plus its pattern reflection prompt) so it appears *after* the Summer Learning Symposium section.
3. **Opportunity Gallery Walk table** — remove "Grades served" and "Deadline (approx.)", leaving Opportunity, Interest area, and Why it could fit me.

## Part B — NSLI-Y materials in the 3:05 PM workshop

Inside the "Workshop: The Making of an Applier" section, add a resource group above the existing note-taking prompts:

- A download link to the **TeenSHARP NSLI-Y Application Guided Worksheet** (PDF), served from the project CDN.
- The five NSLI-Y screenshots (What is NSLI-Y / Eligibility, and the four "Helpful Information" navigation views), shown as captioned reference images walking students through where to find Eligibility, Participation Requirements, Dates & Deadlines, and Application Components on the NSLI-Y site.
- Short captions naming what each screenshot points to, so the images read as a how-to-navigate walkthrough rather than decoration.

The existing workshop reflection prompts stay unchanged, below the new resources.

## Technical detail

- Content edits in `src/lib/content/day4.ts` (`pages.session.parts`): reorder `gallery` after `symposium`; drop columns from the `d4.s.gallery` and `d4.s.symposium` table fields; add image blocks plus a resource link to the `workshop` part.
- Upload the PDF and the six screenshots with `lovable-assets` and reference the generated `.asset.json` URLs — no binaries committed to the repo.
- The content schema already has an `image` block; add a small `resource` block type (label + href + description) in `src/lib/content/types.ts` and render it in `src/components/workbook/PageRenderer.tsx` as a branded download link.
- No saved-answer changes; removed columns simply stop rendering.
