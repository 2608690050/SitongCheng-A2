async function fillCategories(){
  try {
    const cats = await apiGet('/categories');
    const sel = document.getElementById('category');
    for (const c of cats) { const opt=document.createElement('option'); opt.value=c.id; opt.textContent=c.name; sel.appendChild(opt); }
  } catch(e){ console.warn('Categories failed:', e); }
}
async function doSearch(){
  const q=document.getElementById('q').value.trim();
  const location=document.getElementById('location').value.trim();
  const category=document.getElementById('category').value;
  const date_from=document.getElementById('date_from').value;
  const date_to=document.getElementById('date_to').value;
  const params=new URLSearchParams();
  if(q) params.set('q', q);
  if(location) params.set('location', location);
  if(category) params.set('category_id', category);
  if(date_from) params.set('date_from', date_from);
  if(date_to) params.set('date_to', date_to);
  const alertBox=document.getElementById('result-alert'); alertBox.style.display='none';
  try {
    const data = await apiGet(`/events?${params.toString()}`);
    const wrap = document.getElementById('results');
    if(!data.length){ alertBox.textContent='No matching events found.'; alertBox.style.display=''; wrap.innerHTML=''; return; }
    wrap.innerHTML = data.map(ev => {
      const badge = isPast(ev.event_date) ? '<span class="badge muted">Past</span>' : '<span class="badge">Upcoming</span>';
      return `<article class="card">
        <img src="${ev.image_url || 'https://picsum.photos/seed/search/'+Math.floor(Math.random()*1000)+'/600/400'}" alt="event image">
        <div class="p">
          <div class="row" style="justify-content:space-between;">
            <strong>${ev.name}</strong>${badge}
          </div>
          <div class="muted">${ev.category || ''} · ${ev.city || ev.location || ''}</div>
          <div class="muted">${dateLabel(ev.event_date, ev.event_time)}</div>
          <div class="row" style="justify-content:space-between; margin-top:.5rem;">
            <span>${ev.ticket_price > 0 ? ('Ticket ' + (new Intl.NumberFormat(undefined,{style:'currency',currency:'AUD'})).format(ev.ticket_price)) : 'Free'}</span>
            <a class="btn" href="event.html?id=${ev.id}">View details</a>
          </div>
        </div>
      </article>`;
    }).join('');
  } catch(e){ alertBox.textContent = 'Search failed: ' + e.message; alertBox.style.display=''; }
}
function clearFilters(){
  document.getElementById('q').value='';
  document.getElementById('location').value='';
  document.getElementById('category').value='';
  document.getElementById('date_from').value='';
  document.getElementById('date_to').value='';
  document.getElementById('results').innerHTML='';
  const alertBox=document.getElementById('result-alert'); alertBox.style.display='none';
}
document.addEventListener('DOMContentLoaded', () => {
  fillCategories();
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('clearBtn').addEventListener('click', clearFilters);
});
