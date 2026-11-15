const menu = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.toggleAttribute('data-open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.hasAttribute('data-open')) {
    setMenu(false);
    menu.focus();
  }
});
const filters = [...document.querySelectorAll('[data-filter]')];
const products = [...document.querySelectorAll('.catalog [data-group]')];
for (const filter of filters) {
  filter.addEventListener('click', () => {
    for (const option of filters) option.setAttribute('aria-pressed', String(option === filter));
    for (const product of products) {
      product.hidden = filter.dataset.filter !== 'All' && product.dataset.group !== filter.dataset.filter;
    }
    const count = products.filter(product => !product.hidden).length;
    document.querySelector('#count').textContent = count === 1 ? '1 style' : count + ' styles';
  });
}
const banner = document.querySelector('.banner');
if (banner) {
  const slides = [...banner.querySelectorAll('img')];
  let selected = 0;
  for (const button of banner.querySelectorAll('[data-step]')) {
    button.addEventListener('click', () => {
      slides[selected].hidden = true;
      selected = (selected + Number(button.dataset.step) + slides.length) % slides.length;
      slides[selected].hidden = false;
      banner.querySelector('[aria-live]').textContent = (selected + 1) + ' / ' + slides.length;
    });
  }
}
