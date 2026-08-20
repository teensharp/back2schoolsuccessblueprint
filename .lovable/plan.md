# Remove the Essay Notes section from Day 4 Blueprint Lab

The "Essay Notes" part — "The through-line of my story" and the "Moments I can write about" table — is removed from the Day 4 Blueprint Lab page.

## Change

- Delete the `essay` part (both fields) from the Day 4 lab page in `src/lib/content/day4.ts`.

## Notes

Any answers students already saved under those two keys stay in the database but no longer appear anywhere in the workbook, and they drop out of the Day 4 lab completion percentage.
