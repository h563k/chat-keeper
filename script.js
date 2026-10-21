// ChatKeeper 宣传落地页 — 交互脚本
document.getElementById('year').textContent = new Date().getFullYear();

// 导航：滚动收缩 + 移动端菜单
const nav = document.getElementById('nav');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

function onScroll() {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
  });
  // 点击锚点后收起菜单
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// 滚动浮现动画
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll(
  '.card, .section-header, .shot, .faq-item, .cta-block'
);
revealTargets.forEach((el) => {
  if (!reduceMotion) el.classList.add('reveal');
});

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
}

// FAQ 手风琴：同时只展开一个
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});
