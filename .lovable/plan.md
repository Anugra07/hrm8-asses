
# Move Bundles Above Assessment Library with Expand/Collapse

## What Changes
The Assessments page will be restructured so the **Bundles section appears first** (right after the hero), showing 4 featured bundles initially with a "View All 12 Bundles" button that expands to reveal the full grid inline -- no navigation to another page required.

## Layout (Top to Bottom)
1. Hero (unchanged)
2. **Role-Specific Bundles** section (moved up, enhanced)
   - Heading: "Role-Specific Bundles" with "12 bundles" pill
   - Initially shows 4 featured bundles in a 4-column grid
   - Each card shows: name, test count, "best for" tags, price, savings badge
   - Each card has an expandable detail section (collapsible) showing the 3 tests and their skills
   - A "View All 12 Bundles" button expands the grid to show all 12
   - When expanded, button text changes to "Show Less"
3. Assessment Library section (existing, unchanged)
4. CTA section (unchanged)

## Technical Details

### `src/pages/Assessments.tsx`

- Add state: `const [showAllBundles, setShowAllBundles] = useState(false)`
- Add state: `const [expandedBundle, setExpandedBundle] = useState<string | null>(null)` for per-card expand
- Import all `bundles` (already imported), plus `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `Check`, `ChevronDown`
- Remove the `featuredBundleIds` / `featuredBundles` constants
- Compute displayed bundles: `showAllBundles ? bundles : bundles.slice(0, 4)`
- Move the bundles section above the Assessment Library section
- Replace the simple bundle cards with richer cards that include:
  - Bundle name, test count, "best for" tags, price with strikethrough original, savings badge
  - A collapsible detail area toggled per card showing the 3 included tests and their specific skills (using `Check` icons)
  - A "Select Bundle" CTA linking to `/wizard`
- Replace the "View All Bundles" link button with a toggle button that expands/collapses the remaining 8 bundles inline
- Use a 2-column grid on desktop (since the cards are richer now) instead of 4-column
- Remove the old "Save with Bundles" section entirely (replaced by the new top section)
