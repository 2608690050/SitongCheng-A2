async function apiGet(path){
  const url = `${API_BASE}${path}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success && json.ok !== true) throw new Error(json.message || 'API error');
  return json.data ?? json;
}
function fmtMoney(n){ const val = Number(n || 0); return new Intl.NumberFormat(undefined,{style:'currency',currency:'AUD'}).format(val); }
function isPast(dateStr){ const today=new Date(); today.setHours(0,0,0,0); const d=new Date(dateStr); return d<today; }
function dateLabel(dateStr, timeStr) {
  // 取 yyyy-MM-dd 部分
  const dateOnly = dateStr.split('T')[0]; // "2025-08-21"
  const [year, month, day] = dateOnly.split('-').map(Number);

  // 拆分时间
  const [hour, minute, second] = (timeStr || "00:00:00").split(":").map(Number);

  // 用本地年月日 + 传入的时分秒，避免 UTC 偏移
  const d = new Date(year, month - 1, day, hour, minute, second);

  return d.toLocaleString();
}
