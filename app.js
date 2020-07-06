function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');

window.addEventListener('keydown', e => {
  const STEP = 50;
  const currTop = extractPos(
    window.getComputedStyle(avatar).getPropertyValue('top')
  );
  const currLeft = extractPos(
    window.getComputedStyle(avatar).getPropertyValue('left')
  );
  const avatarHeight = extractPos(
    window.getComputedStyle(avatar).getPropertyValue('height')
  );
  const avatarWidth = extractPos(
    window.getComputedStyle(avatar).getPropertyValue('width')
  );

  if (e.key === 'ArrowUp' && currTop >= STEP) {
    avatar.style.top = `${currTop - STEP}px`;
  } else if (
    e.key === 'ArrowDown' &&
    currTop + avatarHeight < window.innerHeight
  ) {
    avatar.style.top = `${currTop + STEP}px`;
  } else if (
    e.key === 'ArrowRight' &&
    currLeft + avatarWidth < window.innerWidth
  ) {
    avatar.style.left = `${currLeft + STEP}px`;
    avatar.style.transform = 'rotateY(0)';
  } else if (e.key === 'ArrowLeft' && currLeft >= STEP) {
    avatar.style.left = `${currLeft - STEP}px`;
    avatar.style.transform = 'rotateY(-180deg)';
  }

  if (isTouching(avatar, coin)) moveCoin();
});

const extractPos = pos => +pos.slice(0, -2);

const moveCoin = () => {
  const coinHeight = extractPos(
    window.getComputedStyle(coin).getPropertyValue('height')
  );

  const coinWidth = extractPos(
    window.getComputedStyle(coin).getPropertyValue('width')
  );
  x = Math.floor(Math.random() * (window.innerWidth - coinWidth));
  y = Math.floor(Math.random() * (window.innerHeight - coinHeight));
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};

moveCoin();
