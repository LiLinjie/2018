/**
 * 动效库
 */
export default {
  init () {
    var hasTouch = 'ontouchstart' in window;
    var eventStart = hasTouch ? 'touchstart' : 'mousedown';
    var animation = {
      timeout: {
        'button_ani_1': 100,
        'button_ani_2': 200,
        'button_ani_3': 200
      }
    };
    document.addEventListener(eventStart, function (e) {
      let target = e.target;
      let actClass;
      if (target.disabled) return;
      if (target.dataset.animation && (actClass = `${target.dataset.animation}_act`) && [].indexOf.call(target.classList, actClass) === -1) {
        target.classList.add(actClass);
        setTimeout(function () {
          target.classList.remove(actClass);
        }, animation.timeout[target.dataset.animation]);
      }
    });
  }
};