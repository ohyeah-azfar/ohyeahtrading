/* =====================================================================
   OH YEAH TRADING — central data file
   ---------------------------------------------------------------------
   This is the ONLY file you edit to update the site.
   - Add a prop firm  -> add an object to the FIRMS array
   - Add a journal post -> add an object to the JOURNAL array (top = newest)
   Everything (homepage wheel, firm pages, journal) reads from here.
   ===================================================================== */

const FIRMS = [
  {
    id: "aqua-funded",
    name: "Aqua Funded",
    accounts: 2,
    spend: 101.0,
    payout: 770.40,
    refund: 0,
    status: "payout",          // payout | active | failed | firm-closed
    headline: "$770.40 paid out from a $10,000 account",
    story: [
      "My single best return-on-cost story. Two accounts, only $101 spent total.",
      "Secured a $770.40 payout from a $10,000 account — breakeven achieved and the account ran positive.",
      "Proof that the math can work when the firm pays and I trade my plan."
    ]
  },
  {
    id: "funded-traders-market",
    name: "Funded Traders Market",
    accounts: 1,
    spend: 6711.45,
    payout: 275.0,
    refund: 0,
    status: "payout",
    headline: "$275 paid out — but my heaviest spend on a single firm",
    story: [
      "My largest single-firm spend at $6,711.45.",
      "Did secure a $275 payout, but the account currently sits net negative against what I put in.",
      "The lesson here is cost discipline — chasing reattempts adds up fast."
    ]
  },
  {
    id: "funded-eng",
    name: "Funded Eng",
    accounts: 1,
    spend: 385.0,
    payout: 0,
    refund: 0,
    securedLost: 7000,
    status: "secured-lost",
    headline: "$7,000 secured from a $100k account — then the firm shut down",
    story: [
      "The most painful one. I secured a $7,000 payout from a $100,000 account.",
      "Before it could be paid, the firm closed down. No refund, no payout.",
      "A brutal reminder that firm risk is real — passing is only half the battle."
    ]
  },
  {
    id: "first-class-forex-funds",
    name: "First Class Forex Funds",
    accounts: 2,
    spend: 525.0,
    payout: 0,
    refund: 0,
    securedLost: 3000,
    status: "secured-lost",
    headline: "$3,000 secured — firm closed before it paid",
    story: [
      "Secured a $3,000 payout across the journey here.",
      "The firm shut its doors before the payout was honoured.",
      "Second time firm risk cost me a real, earned payout."
    ]
  },
  {
    id: "only-prop-firm",
    name: "Only Prop Firm",
    accounts: 2,
    spend: 776.64,
    payout: 0,
    refund: 870.0,
    status: "firm-closed",
    headline: "Firm closed before securing payout — but fully refunded ($870)",
    story: [
      "Two accounts, $776.64 spent.",
      "The firm closed before I could secure a payout, but I was refunded $870 — more than I put in.",
      "Breakeven-plus on a firm that didn't survive."
    ]
  },
  {
    id: "my-flash-funding",
    name: "My Flash Funding",
    accounts: 1,
    spend: 248.5,
    payout: 0,
    refund: 248.5,
    status: "firm-closed",
    headline: "Firm closed before pass — fully refunded ($248.50)",
    story: [
      "Firm closed down before I could pass.",
      "Refunded the full $248.50, so a clean breakeven.",
      "No harm done, but another firm that didn't last."
    ]
  },
  {
    id: "skilled-funded-trader",
    name: "Skilled Funded Trader",
    accounts: 1,
    spend: 300.0,
    payout: 0,
    refund: 0,
    status: "firm-closed",
    headline: "Firm closed before pass — no refund",
    story: [
      "Firm closed down before I could pass the challenge.",
      "No refund recovered. $300 written off to firm risk."
    ]
  },
  {
    id: "pip-farm",
    name: "Pip Farm",
    accounts: 15,
    spend: 4602.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "15 accounts, failed at Phase 2",
    story: [
      "One of my highest account counts — 15 accounts, $4,602 spent.",
      "Repeatedly reached Phase 2 but couldn't convert. A core focus for the lessons learned.",
      "Still on my upcoming list — unfinished business."
    ]
  },
  {
    id: "ftmo",
    name: "FTMO",
    accounts: 3,
    spend: 3765.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "3 accounts, failed at Phase 1",
    story: [
      "The benchmark firm. 3 accounts, $3,765 spent.",
      "Couldn't get past Phase 1 here. On the upcoming list for a rematch with a tighter plan."
    ]
  },
  {
    id: "maven",
    name: "Maven",
    accounts: 1,
    spend: 2280.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "Failed Phase 1",
    story: [
      "Single account, $2,280 spent — an expensive Phase 1 fail.",
      "High cost per attempt; a clear reminder to size challenges to the plan."
    ]
  },
  {
    id: "at-funded",
    name: "AT Funded",
    accounts: 10,
    spend: 2320.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "10 accounts, failed at Phase 1",
    story: [
      "10 accounts, $2,320 spent. Couldn't break Phase 1.",
      "Still on the radar — listed in upcoming challenges with a fresh approach."
    ]
  },
  {
    id: "lux-trading",
    name: "Lux Trading",
    accounts: 2,
    spend: 1315.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "Failed Phase 1",
    story: [
      "Two accounts, $1,315 spent. Failed Phase 1.",
      "A $1,000,000 program still sits on my upcoming list — the prize is worth another run."
    ]
  },
  {
    id: "e8",
    name: "E8",
    accounts: 3,
    spend: 1234.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "Failed at the funded stage",
    story: [
      "3 accounts, $1,234 spent. Got all the way to funded — then failed there.",
      "Closest stage to the money without a payout. Painful but instructive."
    ]
  },
  {
    id: "ck-capital",
    name: "CK Capital",
    accounts: 4,
    spend: 1222.4,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "4 accounts, failed at Phase 2",
    story: [
      "4 accounts, $1,222.40 spent. Repeated Phase 2 fails.",
      "Phase 2 has been a recurring wall across firms — a key theme in my review."
    ]
  },
  {
    id: "my-funded-fx",
    name: "My Funded FX",
    accounts: 1,
    spend: 1300.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "Failed Phase 2",
    story: [
      "Single account, $1,300 spent. Failed Phase 2."
    ]
  },
  {
    id: "alpha-capital",
    name: "Alpha Capital",
    accounts: 2,
    spend: 596.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "Failed Phase 1",
    story: [
      "Two accounts, $596 spent, Phase 1 fail.",
      "Alpha Capital Swing programs are on my upcoming list."
    ]
  },
  {
    id: "city-traders-imperium",
    name: "City Traders Imperium",
    accounts: 2,
    spend: 588.0,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "Failed Phase 1",
    story: [
      "Two accounts, $588 spent. Failed Phase 1.",
      "Still on the upcoming list — the swing rules suit my style."
    ]
  },
  {
    id: "funding-frontier",
    name: "Funding Frontier",
    accounts: 1,
    spend: 428.75,
    payout: 0,
    refund: 0,
    status: "failed",
    headline: "Failed Phase 1",
    story: [
      "Single account, $428.75 spent. Failed Phase 1."
    ]
  },
  {
    id: "the5ers",
    name: "The5ers",
    accounts: 2,
    spend: 545.0,
    payout: 0,
    refund: 0,
    status: "active",
    headline: "In progress",
    story: [
      "Two accounts, $545 spent. Currently in progress — no result locked in yet.",
      "On my upcoming list with the 0.5% profit / 3-day rule noted."
    ]
  },
  {
    id: "buoy-trade",
    name: "Buoy Trade",
    accounts: 22,
    spend: 1716.0,
    payout: 0,
    refund: 0,
    status: "active",
    headline: "22 accounts — biggest active push",
    story: [
      "My single biggest account count at 22 accounts, $1,716 spent.",
      "Currently active. A $1,000,000 program (10 accounts) is on my upcoming list — the scale play."
    ]
  }
];

/* ---------------------------------------------------------------------
   JOURNAL — your trade-journey thoughts. Newest first (top of list).
   To add a new entry, copy one block and change the fields.
   --------------------------------------------------------------------- */
const JOURNAL = [
  {
    date: "2026-06-19",
    title: "Why I'm publishing my entire prop journey",
    body: [
      "77 accounts. $30,960 spent. $1,045 paid out. Those are the real numbers, and I'm done hiding them.",
      "I've had firms close on me with $7,000 and $3,000 already secured. I've failed Phase 2 more times than I can count. And I've also proven the model works — Aqua Funded paid me $770 on a $101 outlay.",
      "This page is my accountability. Every challenge, every fail, every payout gets logged here in my own words. If you're on the same grind, follow along.",
      "Oh yeah. Let's get funded — for real this time."
    ]
  }
];
