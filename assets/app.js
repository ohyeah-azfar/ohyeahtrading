/* ===== OH YEAH TRADING — app logic (reads from data.js) ===== */

const FMT = n => "$" + Number(n).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 2});
const STATUS_LABEL = { payout:"Paid Out", active:"Active", failed:"Failed", "firm-closed":"Firm Closed", "secured-lost":"Secured, then lost" };
const STATUS_COLOR = { payout:"#2bd49a", active:"#4fd6ff", failed:"#f56673", "firm-closed":"#f7bd4f", "secured-lost":"#c084fc" };

// Oh No vs Oh Yeah verdict: got paid, came out ahead, or still in play = OH YEAH
function verdict(f){
  if(f.payout > 0) return "oy";
  if(f.refund && f.refund >= f.spend) return "oy";
  if(f.status === "active") return "oy";
  return "on";
}
const VERDICT_TEXT = {
  oy: { word:"OH YEAH!", sub:"a win for the journey", emoji:"🚀" },
  on: { word:"OH NO…",   sub:"chalk it up as a lesson", emoji:"💀" }
};

function totals(){
  let spend=0, payout=0, lost=0, accounts=0;
  FIRMS.forEach(f=>{ spend+=f.spend||0; payout+=f.payout||0; lost+=f.securedLost||0; accounts+=f.accounts||0; });
  return { spend, payout, lost, accounts, firms:FIRMS.length };
}

/* ---------- DASHBOARD ---------- */
function renderDashboard(){
  const t = totals();
  document.getElementById("s-spend").textContent    = FMT(t.spend);
  document.getElementById("s-payout").textContent   = FMT(t.payout);
  document.getElementById("s-firms").textContent    = t.firms;
  document.getElementById("s-lost").textContent     = FMT(t.lost);
  document.getElementById("s-accounts").textContent = t.accounts + " accounts";

  // sort firms by spend (biggest slices first)
  const firms = [...FIRMS].sort((a,b)=> b.spend - a.spend);

  // Oh No vs Oh Yeah scoreboard
  const oy = firms.filter(f=>verdict(f)==="oy").length;
  const on = firms.length - oy;
  document.getElementById("oy-count").textContent = oy;
  document.getElementById("on-count").textContent = on;
  const center = document.getElementById("wheel-center");
  const scoreboard = center.innerHTML;
  const showScore = ()=>{ center.innerHTML = scoreboard; };
  const showVerdict = f=>{
    const v = VERDICT_TEXT[verdict(f)];
    center.innerHTML = `<div class="verdict ${verdict(f)}">${v.emoji}<br>${v.word}<small>${f.name}</small></div>`;
  };

  // ----- WHEEL: spend per firm, clickable -----
  const wheel = new Chart(document.getElementById("wheel"), {
    type:"doughnut",
    data:{
      labels: firms.map(f=>f.name),
      datasets:[{
        data: firms.map(f=>f.spend),
        backgroundColor: firms.map(f=>STATUS_COLOR[f.status]),
        borderColor:"#1b2336", borderWidth:2, hoverOffset:10
      }]
    },
    options:{
      cutout:"66%",
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:c=>` ${c.label}: ${FMT(c.raw)}`}}
      },
      onHover:(e,el)=>{
        e.native.target.style.cursor = el.length ? "pointer":"default";
        if(el.length){ showVerdict(firms[el[0].index]); } else { showScore(); }
      },
      onClick:(e,el)=>{ if(el.length){ location.href = "firm.html?id=" + firms[el[0].index].id; } }
    }
  });
  // restore the scoreboard when the mouse leaves the wheel entirely
  document.getElementById("wheel").addEventListener("mouseleave", showScore);

  // ----- BARS: spend vs payout, top firms -----
  const top = firms.slice(0, 10);
  new Chart(document.getElementById("bars"), {
    type:"bar",
    data:{
      labels: top.map(f=>f.name),
      datasets:[
        { label:"Spend",  data:top.map(f=>f.spend),  backgroundColor:"#ef5e6b" },
        { label:"Payout", data:top.map(f=>f.payout), backgroundColor:"#21c08b" }
      ]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:c=>` ${c.dataset.label}: ${FMT(c.raw)}`}}
      },
      scales:{
        x:{ticks:{color:"#8b97a8",font:{size:10}},grid:{display:false}},
        y:{ticks:{color:"#8b97a8",callback:v=>"$"+v},grid:{color:"#1b2230"}}
      },
      onClick:(e,el)=>{ if(el.length){ location.href = "firm.html?id=" + top[el[0].index].id; } }
    }
  });

  // ----- FIRM GRID -----
  const grid = document.getElementById("firm-grid");
  grid.innerHTML = firms.map(f=>`
    <a class="firm-card" href="firm.html?id=${f.id}">
      <span class="bar ${f.status}"></span>
      <h3>${f.name}</h3>
      <div class="firm-row"><span>Spend</span><b>${FMT(f.spend)}</b></div>
      <div class="firm-row"><span>Payout</span><b>${f.payout?FMT(f.payout):"—"}</b></div>
      <div class="firm-row"><span>Accounts</span><b>${f.accounts||"—"}</b></div>
      <span class="tag ${f.status}">${STATUS_LABEL[f.status]}</span>
    </a>`).join("");
}

/* ---------- FIRM DETAIL ---------- */
function renderFirm(){
  const id = new URLSearchParams(location.search).get("id");
  const f = FIRMS.find(x=>x.id===id);
  const root = document.getElementById("firm-root");
  if(!f){ root.innerHTML = `<a class="back" href="index.html">&larr; Back</a><div class="story"><p>Firm not found.</p></div>`; return; }
  document.title = f.name + " — Oh Yeah Trading";

  const net = (f.payout||0) + (f.refund||0) - (f.spend||0);
  const callout = f.securedLost
    ? `<div class="callout"><b>Secured ${FMT(f.securedLost)}</b> — then the firm closed before paying. The hardest kind of loss in this game.</div>` : "";

  root.innerHTML = `
    <a class="back" href="index.html">&larr; Back to dashboard</a>
    <div class="detail-head">
      <h1>${f.name}</h1>
      <span class="tag ${f.status}" style="font-size:13px">${STATUS_LABEL[f.status]}</span>
    </div>
    <p class="lead" style="color:var(--muted);margin:0">${f.headline||""}</p>

    <div class="detail-stats">
      <div class="stat spend"><div class="k">Spent</div><div class="v">${FMT(f.spend)}</div></div>
      <div class="stat payout"><div class="k">Payout</div><div class="v">${f.payout?FMT(f.payout):"$0"}</div></div>
      <div class="stat"><div class="k">Refund</div><div class="v">${f.refund?FMT(f.refund):"$0"}</div></div>
      <div class="stat accounts"><div class="k">Accounts</div><div class="v">${f.accounts||"—"}</div></div>
    </div>

    ${callout}

    <div class="story">
      ${f.story.map(p=>`<p>${p}</p>`).join("")}
      <p style="color:var(--muted);font-size:14px;margin-top:18px">
        Net so far: <b style="color:${net>=0?'var(--accent)':'var(--danger)'}">${net>=0?'+':''}${FMT(net)}</b>
        (payout + refund − spend)
      </p>
    </div>`;
}

/* ---------- JOURNAL ---------- */
function renderJournal(){
  const root = document.getElementById("journal-root");
  if(!JOURNAL.length){ root.innerHTML = `<div class="post"><p>No entries yet.</p></div>`; return; }
  root.innerHTML = JOURNAL.map(e=>`
    <article class="post">
      <div class="date">${new Date(e.date+"T00:00:00").toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</div>
      <h2>${e.title}</h2>
      ${e.body.map(p=>`<p>${p}</p>`).join("")}
    </article>`).join("");
}
