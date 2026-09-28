# Support options

## Build
- Replace the Support placeholder entry point with a Support section containing two large cards: Money Matters and Health and safety.
- Add translated titles, descriptions, result headings, and placeholder details in English, Chinese, Malay, and Tamil.
- Make each card open its own translated result screen and keep the existing Back navigation and senior-friendly styling.
- Point the Support card on the home screen to the new Support section while preserving all other branches.

## Technical details
- Add `/support` as a parent route with an index screen and `/support/$option` result route.
- Store the two options and translations in a typed local catalogue, following the existing Connection pattern.
- Add the translated Support heading to the shared language strings.
- Validate the flow and labels in all four languages on a phone-sized browser.
