# October 2026 bilingual registration

English: `/` and `/register.html`. Mandarin: `/zh/` and `/zh/register.html`.
Five dates, each EN 09:00–13:00 and ZH 14:00–18:00 MYT, 12 seats per class.
Shared session IDs are in sessions.js; ticket amounts and participant counts in tickets.js.
Use `?session=L1-20261003-EN&ticket=standard` (ticket: standard, early, buddy).
Legacy `?date=3-Oct` links still work. Missing dates require an explicit selection.

Formspree captures session, language, time, seats, amount due and registration ID.
Successful submission passes only non-personal session/ticket/ID details to the payment page.
Actual bank/TNG details are unchanged. Never treat page views or payment slip clicks as Purchase.

The private Google Sheet DIY Registration, Plumbing Lev1 tab, is the only payment ledger.
October 2026 is a formula-driven dashboard. No personal information or private sheet is published.
There is NO real-time website inventory/reservation service. Ronald must confirm availability
and early-bird eligibility before customers pay. Site does not claim otherwise.
The existing daily import automation maps new fields; it does not verify payments.

To change a session: update sessions.js, static date links/options, dashboard session rows,
and import automation rules together. For price changes update tickets.js and static price cards.

Temporary visibility update: only 3 and 10 October are shown and accepted by public registration.
17/24/31 remain in sessions.js for existing payment references and in the internal tracker.
To restore: extend OCTOBER_PUBLIC_DAYS and restore corresponding static date cards/options in both languages.
