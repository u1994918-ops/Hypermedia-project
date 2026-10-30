/* Optional improvements. All content and project notes work without JavaScript. */
const navigationLinks = Array.from(document.querySelectorAll('nav a'));
const sections = navigationLinks.map(link => document.querySelector(link.getAttribute('href')));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navigationLinks.forEach(link => {
          const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
          if (isCurrent) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, {rootMargin: '-15% 0px -55% 0px'});
  sections.forEach(section => observer.observe(section));
}

const shareButton = document.querySelector('[data-share]');
const shareStatus = document.querySelector('.share-status');
shareButton.hidden = false;

shareButton.addEventListener('click', async () => {
  if (window.location.protocol === 'file:') {
    shareStatus.textContent = 'Publish the website to share a public link.';
    return;
  }
  const pageUrl = window.location.href.split('#')[0];
  try {
    await navigator.clipboard.writeText(pageUrl);
    shareStatus.textContent = 'Portfolio link copied to the clipboard.';
  } catch (error) {
    shareStatus.textContent = `Copy the link from your address bar: ${pageUrl}`;
  }
});
