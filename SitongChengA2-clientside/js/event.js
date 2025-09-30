function getParam(name){ const u=new URL(location.href); return u.searchParams.get(name); }
function progressPct(raised, goal){ const g=Number(goal||0), r=Number(raised||0); if(g<=0) return 0; return Math.max(0, Math.min(100, Math.round((r/g)*100))); }
(async function initEvent(){
  const id=getParam('id'); const container=document.getElementById('event-container');
  if(!id){ container.innerHTML='<div class="alert">Missing event id</div>'; return; }
  try {
    const ev = await apiGet(`/events/${id}`);
    const pct = progressPct(ev.raised_amount, ev.goal_amount);
    container.innerHTML = `
      <div class="grid" style="grid-template-columns: 1.5fr 1fr;">
        <div class="card">
          <img src="${ev.image_url || 'https://picsum.photos/seed/event/'+ev.id+'/800/480'}" alt="event image">
          <div class="p">
            <h1>${ev.name}</h1>
            <div class="row muted">${ev.category || ''} · ${ev.city || ev.location || ''}</div>
            <div class="row muted">${dateLabel(ev.event_date, ev.event_time)}</div>
            <p>${ev.full_description || ev.short_description || ''}</p>
          </div>
        </div>
        <div class="card">
          <div class="p">
            <h3>Participate</h3>
            <p><strong>Ticket:</strong> ${ev.ticket_price > 0 ? (new Intl.NumberFormat(undefined,{style:'currency',currency:'AUD'})).format(ev.ticket_price) : 'Free'}</p>
            <button class="btn" onclick="showUnderConstruction()">Register</button>
            <hr/>
            <h3>Goal vs Progress</h3>
            <div class="row" style="justify-content:space-between;">
              <span>Goal: ${fmtMoney(ev.goal_amount)}</span>
              <span>Raised: ${fmtMoney(ev.raised_amount)}</span>
            </div>
            <div class="progress-wrap" style="margin:.5rem 0 0.25rem;">
              <div class="progress" style="width:${pct}%"></div>
            </div>
            <div class="muted">${pct}% funded</div>
            <hr/>
            <h4>Hosted by</h4>
            <div>${ev.organisation || ''}</div>
            ${ev.organisation_website ? `<a href="${ev.organisation_website}" target="_blank" class="muted">${ev.organisation_website}</a>` : ''}
          </div>
        </div>
      </div>`;
  } catch(e){ container.innerHTML = `<div class="alert">Failed to load event: ${e.message}</div>`; }
})();