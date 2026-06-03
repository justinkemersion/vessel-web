# Display copy style

Rules for any user-facing text in vessel-web: page copy, metadata, portal content, component strings, and contract examples that mirror live UI.

## No em dashes or en dashes

Do **not** use em dashes (`—`, U+2014) or en dashes (`–`, U+2013) in display copy.

Use instead:

- A period and a new sentence
- A comma
- A colon
- Parentheses for asides

**Bad:** `No ticket triage — just a direct line.`  
**Good:** `No ticket triage. Just a direct line.`

**Bad:** `Welcome, —.` (loading placeholder)  
**Good:** `Welcome, Operator.` or omit the name until loaded

## Applies to

- [`src/lib/portal-content.ts`](../src/lib/portal-content.ts) (descriptions, taglines, notes)
- React components (headings, body copy, buttons, aria labels where visible)
- [`src/app/layout.tsx`](../src/app/layout.tsx) metadata (`title`, `description`, Open Graph when added)

## Does not apply to

- Code comments and JSDoc (prefer plain hyphens there too when possible)
- README deploy notes and internal operator docs outside the site UI
- Third-party content pulled from external READMEs at runtime (not used today)

## Check before merge

Search display-copy paths for dash characters:

```bash
rg '[—–]' src/ _contract/
```

Fix any hits in files that feed the UI.
