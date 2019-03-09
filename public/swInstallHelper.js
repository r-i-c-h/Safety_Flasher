// FOR WebApp INSTALL CALLS
const installLink = document.getElementsByClassName('info-box--install-instructions')[0];
var deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
  // e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
  window.deferredPrompt = e; // Stash event so it can be triggered later.

  installLink.classList.remove('hidden');
  if (window.navigator.standalone === true) {
    console.log('Already Installed on Apple Device');
    installLink.classList.add('hidden');
  }
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Already Installed on Android Device');
    installLink.classList.add('hidden');
  }
  installLink.addEventListener('click', e => {
    e.stopPropagation();
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        installLink.classList.add('hidden');
        deferredPrompt = null;
      } else {
        console.log('User dismissed Add2HomeScreen prompt');
      }
    });
  });
});
window.addEventListener('appinstalled', e => {
  console.log('PWA installed aok');
});

/*
needsToSeePrompt(user) {
  if (navigator.standalone) { return false; }
*/
