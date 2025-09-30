(async function initHome(){
  try {
    const events = await apiGet('/events/home');
    const wrap = document.getElementById('home-events');
    wrap.innerHTML = events.map(ev => {
      const past = isPast(ev.event_date);
      const badge = past ? '<span class="badge muted">Past</span>' : '<span class="badge">Upcoming</span>';
      return `<article class="card">
          <img src="${ev.image_url || 'https://picsum.photos/seed/ch/'+Math.floor(Math.random()*1000)+'/600/400'}" alt="event image">
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
  } catch(e){
    document.getElementById('home-events').innerHTML = `<div class="alert">Failed to load events: ${e.message}</div>`;
  }
})();