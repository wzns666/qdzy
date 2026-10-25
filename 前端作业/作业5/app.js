/* 6 条看板数据：只在这里维护，HTML 中不重复写卡片 */
const METRICS = [
  { label: '访问量', value: '128,430', unit: '次', delta: 12.4, higherIsBetter: true, icon: 'eye' },
  { label: '新增用户', value: '3,268', unit: '人', delta: 8.2, higherIsBetter: true, icon: 'users' },
  { label: '转化率', value: '4.86', unit: '%', delta: 0.32, higherIsBetter: true, icon: 'target' },
  { label: '客单价', value: '¥286.50', unit: '', delta: 3.1, higherIsBetter: true, icon: 'wallet' },
  { label: '支付订单', value: '2,147', unit: '单', delta: 15.8, higherIsBetter: true, icon: 'bag' },
  { label: '退款率', value: '1.24', unit: '%', delta: -0.18, higherIsBetter: false, icon: 'refund' }
];

/* 图标：内联 SVG path，外层 SVG 使用 currentColor 与明确尺寸 */
const ICONS = {
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M17 8v6M14 11h6"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/>',
  bag: '<path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  refund: '<path d="M4 10a8 8 0 1 1 2 7"/><path d="M4 5v5h5"/>'
};

document.querySelector('#kpi-grid').innerHTML = METRICS.map((item) => {
  const up = item.delta >= 0;
  const tone = up === item.higherIsBetter ? 'good' : 'bad';
  return `
    <article class="card">
      <div class="card-top">
        <span class="icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            ${ICONS[item.icon]}
          </svg>
        </span>
        <h3>${item.label}</h3>
      </div>
      <p class="value">${item.value}<small>${item.unit}</small></p>
      <p class="delta ${tone}">
        <span class="arrow" aria-hidden="true">${up ? '↑' : '↓'}</span>
        <strong>${up ? '+' : ''}${item.delta}%</strong>
        <span>较昨日</span>
      </p>
    </article>`;
}).join('');

/* 深色 / 浅色主题切换 */
const root = document.documentElement;
const toggle = document.querySelector('#theme-toggle');

toggle.addEventListener('click', () => {
  const toDark = root.dataset.theme !== 'dark';
  root.dataset.theme = toDark ? 'dark' : 'light';
  toggle.textContent = toDark ? '浅色模式' : '深色模式';
  toggle.setAttribute('aria-label', `切换到${toDark ? '浅色' : '深色'}模式`);
});
