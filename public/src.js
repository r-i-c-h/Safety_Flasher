/*** STATE COLOR FLIP [ Popup Layer controls below ] ***/
const docRoot = document.documentElement;
const primaryContainer = document.getElementById('primary');
const flashlightIcon = document.getElementById('flashlight');
const height = document.body.getElementsByClassName('content-wrapper')[0].clientHeight;
const midline = height / 2;
const colorLight = '#FFFFFF';
const colorDark = '#111111';
const INITIAL_SPEED = 500;

const throttleWrapper = function(context) {
  var baseFunction = this;
  var lastEventTimestamp = null;
  var speedLimit = 500;
  return function() {
    var self = context || this,
      args = arguments,
      now = Date.now();
    if (!lastEventTimestamp || now - lastEventTimestamp >= speedLimit) {
      lastEventTimestamp = now;
      baseFunction.apply(self, args);
    }
  };
};

let toggledBool = false;
let scaleNum = 8;
const toggleState = () => {
  toggledBool = !toggledBool;
  if (toggledBool) {
    docRoot.style.setProperty('--uno', colorLight);
    docRoot.style.setProperty('--dos', colorDark);
  } else {
    docRoot.style.setProperty('--uno', colorDark);
    docRoot.style.setProperty('--dos', colorLight);
  }
};
let flipTimer = setInterval(toggleState, INITIAL_SPEED);
const updateTimer = () => {
  clearInterval(flipTimer);
  flipTimer = setInterval(toggleState, scaleNum ** 3);
};
const decideAction = e => {
  if (e.clientY < midline - 20) {
    if (scaleNum > 3) {
      // If <= 3, (9 really) timing becomes unreliable
      scaleNum--;
    }
  }
  if (e.clientY > midline + 20) {
    scaleNum++;
  }
  updateTimer();
};

primaryContainer.addEventListener('click', e => {
  e.preventDefault();
  throttleWrapper(decideAction(e));
});

const popupLayer = document.getElementsByClassName('popup')[0];
const showPopup = () => {
  primaryContainer.style.display = 'none';
  popupLayer.style.display = 'flex';
};
const hidePopup = () => {
  popupLayer.style.display = 'none';
  primaryContainer.style.display = 'flex';
};

flashlightIcon.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  throttleWrapper(showPopup());
});

popupLayer.addEventListener('click', e => {
  e.preventDefault();
  throttleWrapper(hidePopup());
});
