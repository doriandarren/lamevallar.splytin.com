// src/scripts/cookie-handler.js
const cookieBtn = document.getElementById('cookie-btn');
const cookieModal = document.getElementById('cookie-modal');
const analytics = document.getElementById('analytics');
const marketing = document.getElementById('marketing');
const acceptAll = document.getElementById('accept-all');
const rejectAll = document.getElementById('reject-all');
const savePrefs = document.getElementById('save-preferences');

function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000`;
}

function closeModal() {
  cookieModal.classList.add('hidden');
  cookieBtn.classList.remove('hidden');
}

function openModal() {
  cookieModal.classList.remove('hidden');
  cookieBtn.classList.add('hidden');
}

cookieBtn.addEventListener('click', openModal);

acceptAll.addEventListener('click', () => {
  setCookie('cookie_consent', 'all');
  setCookie('analytics', 'true');
  setCookie('marketing', 'true');
  closeModal();
});

rejectAll.addEventListener('click', () => {
  setCookie('cookie_consent', 'none');
  setCookie('analytics', 'false');
  setCookie('marketing', 'false');
  closeModal();
});

savePrefs.addEventListener('click', () => {
  setCookie('cookie_consent', 'preferences');
  setCookie('analytics', analytics.checked);
  setCookie('marketing', marketing.checked);
  closeModal();
});

// Mostrar solo si no hay consentimiento
if (document.cookie.includes('cookie_consent=')) {
  cookieBtn.classList.add('hidden');
} else {
  cookieBtn.classList.remove('hidden');
}
