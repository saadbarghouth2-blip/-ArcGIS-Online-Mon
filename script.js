// Data for cards and resources (will detect files available on server)
const filesOnServer = [
  // These will be replaced dynamically if present
];

// Try to fetch file list from server directory by testing known filenames (we'll list some common names)
const possibleFiles = [
  "ArcGIS_Online_Development_Plan.pdf",
  "Week 1 Practical Tasks – Web Maps & Field Operations.pdf",
  "Week 2 Practical Tasks – Dashboards & Experience Builder.pdf",
  "Week 3 Practical Tasks – StoryMaps, Instant Apps & QuickCapture.pdf",
  "Week 4 Practical Tasks – Survey123, Workforce & ArcGIS Hub.pdf",
  "ArcGIS_Online_Development_Plan.docx"
];

const available = [];
possibleFiles.forEach(name => {
  // We can't reliably check file existence without server, but links will work when files are present.
  available.push(name);
});

// Build plan cards
const grid = document.querySelector('.grid');
const plans = [
  {title:"أسبوع 1 — Web Maps & Field Operations", desc:"إنشاء الخرائط والطبقات وتجهيز عمليات الميدان.", file:"ArcGIS_Online_Development_Plan.pdf"},
  {title:"أسبوع 2 — Dashboards & Experience Builder", desc:"بناء لوحات معلومات وتجارب تفاعلية.", file:"Week 2 Practical Tasks – Dashboards & Experience Builder.pdf"},
  {title:"أسبوع 3 — StoryMaps & QuickCapture", desc:"قِصَص تفاعلية وأدوات جمع بيانات سريعة.", file:"Week 3 Practical Tasks – StoryMaps, Instant Apps & QuickCapture.pdf"},
  {title:"أسبوع 4 — Survey123 & ArcGIS Hub", desc:"نماذج واستضافة المحتوى على Hub.", file:"Week 4 Practical Tasks – Survey123, Workforce & ArcGIS Hub.pdf"}
];

plans.forEach(p => {
  const el = document.createElement('div');
  el.className = 'plan-card';
  el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><div class="meta">اضغط للمعاينة أو التحميل</div>`;
  el.addEventListener('click', () => openPreview(p.file));
  grid.appendChild(el);
});

// Resources section
const resGrid = document.querySelector('.resources-grid');
available.forEach(f => {
  const itm = document.createElement('div');
  itm.className = 'resource-item';
  itm.innerHTML = `<div><a href="${f}" target="_blank">${f}</a></div><div class="small">ملف قابل للتحميل والمعاينة</div><div><button class="btn outline" onclick="openPreview('${f}')">معاينة</button> <a class="btn primary" href="${f}" download>تحميل</a></div>`;
  resGrid.appendChild(itm);
});

// Modal controls
const modal = document.getElementById('modal');
const modalFrame = document.getElementById('modalFrame');
const modalClose = document.getElementById('modalClose') || document.getElementById('modalCloseBtn');

function openPreview(file){
  const url = file;
  modalFrame.src = url;
  modal.setAttribute('aria-hidden','false');
  history.pushState({}, '', '#preview');
}

document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
function closeModal(){
  modalFrame.src = '';
  modal.setAttribute('aria-hidden','true');
  history.pushState({}, '', location.pathname);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Mobile menu toggle
document.getElementById('menuBtn').addEventListener('click', ()=>{
  const nav = document.getElementById('nav');
  if(nav.style.display === 'flex') nav.style.display = '';
  else nav.style.display = 'flex';
});

// Prepare downloadable site zip (link already included). No further action needed here.
