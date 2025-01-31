/*!
  * Understrap v1.2.0 (https://understrap.com)
  * Copyright 2013-2025 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL-3.0 (undefined)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alert$1 = {exports: {}};

	var util = {exports: {}};

	/*!
	  * Bootstrap index.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return util.exports;
		hasRequiredUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/index.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const MAX_UID = 1000000;
			  const MILLISECONDS_MULTIPLIER = 1000;
			  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

			  const toType = object => {
			    if (object === null || object === undefined) {
			      return `${object}`;
			    }
			    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
			  };
			  /**
			   * Public Util API
			   */

			  const getUID = prefix => {
			    do {
			      prefix += Math.floor(Math.random() * MAX_UID);
			    } while (document.getElementById(prefix));
			    return prefix;
			  };
			  const getSelector = element => {
			    let selector = element.getAttribute('data-bs-target');
			    if (!selector || selector === '#') {
			      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
			      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			      // `document.querySelector` will rightfully complain it is invalid.
			      // See https://github.com/twbs/bootstrap/issues/32273

			      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
			        return null;
			      } // Just in case some CMS puts out a full URL with the anchor appended

			      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
			        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
			      }
			      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
			    }
			    return selector;
			  };
			  const getSelectorFromElement = element => {
			    const selector = getSelector(element);
			    if (selector) {
			      return document.querySelector(selector) ? selector : null;
			    }
			    return null;
			  };
			  const getElementFromSelector = element => {
			    const selector = getSelector(element);
			    return selector ? document.querySelector(selector) : null;
			  };
			  const getTransitionDurationFromElement = element => {
			    if (!element) {
			      return 0;
			    } // Get transition-duration of the element

			    let {
			      transitionDuration,
			      transitionDelay
			    } = window.getComputedStyle(element);
			    const floatTransitionDuration = Number.parseFloat(transitionDuration);
			    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

			    if (!floatTransitionDuration && !floatTransitionDelay) {
			      return 0;
			    } // If multiple durations are defined, take the first

			    transitionDuration = transitionDuration.split(',')[0];
			    transitionDelay = transitionDelay.split(',')[0];
			    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
			  };
			  const triggerTransitionEnd = element => {
			    element.dispatchEvent(new Event(TRANSITION_END));
			  };
			  const isElement = object => {
			    if (!object || typeof object !== 'object') {
			      return false;
			    }
			    if (typeof object.jquery !== 'undefined') {
			      object = object[0];
			    }
			    return typeof object.nodeType !== 'undefined';
			  };
			  const getElement = object => {
			    // it's a jQuery object or a node element
			    if (isElement(object)) {
			      return object.jquery ? object[0] : object;
			    }
			    if (typeof object === 'string' && object.length > 0) {
			      return document.querySelector(object);
			    }
			    return null;
			  };
			  const isVisible = element => {
			    if (!isElement(element) || element.getClientRects().length === 0) {
			      return false;
			    }
			    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

			    const closedDetails = element.closest('details:not([open])');
			    if (!closedDetails) {
			      return elementIsVisible;
			    }
			    if (closedDetails !== element) {
			      const summary = element.closest('summary');
			      if (summary && summary.parentNode !== closedDetails) {
			        return false;
			      }
			      if (summary === null) {
			        return false;
			      }
			    }
			    return elementIsVisible;
			  };
			  const isDisabled = element => {
			    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
			      return true;
			    }
			    if (element.classList.contains('disabled')) {
			      return true;
			    }
			    if (typeof element.disabled !== 'undefined') {
			      return element.disabled;
			    }
			    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
			  };
			  const findShadowRoot = element => {
			    if (!document.documentElement.attachShadow) {
			      return null;
			    } // Can find the shadow root otherwise it'll return the document

			    if (typeof element.getRootNode === 'function') {
			      const root = element.getRootNode();
			      return root instanceof ShadowRoot ? root : null;
			    }
			    if (element instanceof ShadowRoot) {
			      return element;
			    } // when we don't find a shadow root

			    if (!element.parentNode) {
			      return null;
			    }
			    return findShadowRoot(element.parentNode);
			  };
			  const noop = () => {};
			  /**
			   * Trick to restart an element's animation
			   *
			   * @param {HTMLElement} element
			   * @return void
			   *
			   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
			   */

			  const reflow = element => {
			    element.offsetHeight; // eslint-disable-line no-unused-expressions
			  };
			  const getjQuery = () => {
			    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			      return window.jQuery;
			    }
			    return null;
			  };
			  const DOMContentLoadedCallbacks = [];
			  const onDOMContentLoaded = callback => {
			    if (document.readyState === 'loading') {
			      // add listener on the first call when the document is in loading state
			      if (!DOMContentLoadedCallbacks.length) {
			        document.addEventListener('DOMContentLoaded', () => {
			          for (const callback of DOMContentLoadedCallbacks) {
			            callback();
			          }
			        });
			      }
			      DOMContentLoadedCallbacks.push(callback);
			    } else {
			      callback();
			    }
			  };
			  const isRTL = () => document.documentElement.dir === 'rtl';
			  const defineJQueryPlugin = plugin => {
			    onDOMContentLoaded(() => {
			      const $ = getjQuery();
			      /* istanbul ignore if */

			      if ($) {
			        const name = plugin.NAME;
			        const JQUERY_NO_CONFLICT = $.fn[name];
			        $.fn[name] = plugin.jQueryInterface;
			        $.fn[name].Constructor = plugin;
			        $.fn[name].noConflict = () => {
			          $.fn[name] = JQUERY_NO_CONFLICT;
			          return plugin.jQueryInterface;
			        };
			      }
			    });
			  };
			  const execute = callback => {
			    if (typeof callback === 'function') {
			      callback();
			    }
			  };
			  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
			    if (!waitForTransition) {
			      execute(callback);
			      return;
			    }
			    const durationPadding = 5;
			    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
			    let called = false;
			    const handler = ({
			      target
			    }) => {
			      if (target !== transitionElement) {
			        return;
			      }
			      called = true;
			      transitionElement.removeEventListener(TRANSITION_END, handler);
			      execute(callback);
			    };
			    transitionElement.addEventListener(TRANSITION_END, handler);
			    setTimeout(() => {
			      if (!called) {
			        triggerTransitionEnd(transitionElement);
			      }
			    }, emulatedDuration);
			  };
			  /**
			   * Return the previous/next element of a list.
			   *
			   * @param {array} list    The list of elements
			   * @param activeElement   The active element
			   * @param shouldGetNext   Choose to get next or previous element
			   * @param isCycleAllowed
			   * @return {Element|elem} The proper element
			   */

			  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
			    const listLength = list.length;
			    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
			    // depending on the direction and if cycle is allowed

			    if (index === -1) {
			      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
			    }
			    index += shouldGetNext ? 1 : -1;
			    if (isCycleAllowed) {
			      index = (index + listLength) % listLength;
			    }
			    return list[Math.max(0, Math.min(index, listLength - 1))];
			  };
			  exports.defineJQueryPlugin = defineJQueryPlugin;
			  exports.execute = execute;
			  exports.executeAfterTransition = executeAfterTransition;
			  exports.findShadowRoot = findShadowRoot;
			  exports.getElement = getElement;
			  exports.getElementFromSelector = getElementFromSelector;
			  exports.getNextActiveElement = getNextActiveElement;
			  exports.getSelectorFromElement = getSelectorFromElement;
			  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
			  exports.getUID = getUID;
			  exports.getjQuery = getjQuery;
			  exports.isDisabled = isDisabled;
			  exports.isElement = isElement;
			  exports.isRTL = isRTL;
			  exports.isVisible = isVisible;
			  exports.noop = noop;
			  exports.onDOMContentLoaded = onDOMContentLoaded;
			  exports.reflow = reflow;
			  exports.toType = toType;
			  exports.triggerTransitionEnd = triggerTransitionEnd;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (util, util.exports));
		return util.exports;
	}

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredEventHandler;

	function requireEventHandler () {
		if (hasRequiredEventHandler) return eventHandler.exports;
		hasRequiredEventHandler = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/event-handler.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
			  const stripNameRegex = /\..*/;
			  const stripUidRegex = /::\d+$/;
			  const eventRegistry = {}; // Events storage

			  let uidEvent = 1;
			  const customEvents = {
			    mouseenter: 'mouseover',
			    mouseleave: 'mouseout'
			  };
			  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
			  /**
			   * Private methods
			   */

			  function makeEventUid(element, uid) {
			    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
			  }
			  function getElementEvents(element) {
			    const uid = makeEventUid(element);
			    element.uidEvent = uid;
			    eventRegistry[uid] = eventRegistry[uid] || {};
			    return eventRegistry[uid];
			  }
			  function bootstrapHandler(element, fn) {
			    return function handler(event) {
			      hydrateObj(event, {
			        delegateTarget: element
			      });
			      if (handler.oneOff) {
			        EventHandler.off(element, event.type, fn);
			      }
			      return fn.apply(element, [event]);
			    };
			  }
			  function bootstrapDelegationHandler(element, selector, fn) {
			    return function handler(event) {
			      const domElements = element.querySelectorAll(selector);
			      for (let {
			        target
			      } = event; target && target !== this; target = target.parentNode) {
			        for (const domElement of domElements) {
			          if (domElement !== target) {
			            continue;
			          }
			          hydrateObj(event, {
			            delegateTarget: target
			          });
			          if (handler.oneOff) {
			            EventHandler.off(element, event.type, selector, fn);
			          }
			          return fn.apply(target, [event]);
			        }
			      }
			    };
			  }
			  function findHandler(events, callable, delegationSelector = null) {
			    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
			  }
			  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
			    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

			    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
			    let typeEvent = getTypeEvent(originalTypeEvent);
			    if (!nativeEvents.has(typeEvent)) {
			      typeEvent = originalTypeEvent;
			    }
			    return [isDelegated, callable, typeEvent];
			  }
			  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
			    if (typeof originalTypeEvent !== 'string' || !element) {
			      return;
			    }
			    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
			    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

			    if (originalTypeEvent in customEvents) {
			      const wrapFunction = fn => {
			        return function (event) {
			          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
			            return fn.call(this, event);
			          }
			        };
			      };
			      callable = wrapFunction(callable);
			    }
			    const events = getElementEvents(element);
			    const handlers = events[typeEvent] || (events[typeEvent] = {});
			    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
			    if (previousFunction) {
			      previousFunction.oneOff = previousFunction.oneOff && oneOff;
			      return;
			    }
			    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
			    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
			    fn.delegationSelector = isDelegated ? handler : null;
			    fn.callable = callable;
			    fn.oneOff = oneOff;
			    fn.uidEvent = uid;
			    handlers[uid] = fn;
			    element.addEventListener(typeEvent, fn, isDelegated);
			  }
			  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
			    const fn = findHandler(events[typeEvent], handler, delegationSelector);
			    if (!fn) {
			      return;
			    }
			    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
			    delete events[typeEvent][fn.uidEvent];
			  }
			  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
			    const storeElementEvent = events[typeEvent] || {};
			    for (const handlerKey of Object.keys(storeElementEvent)) {
			      if (handlerKey.includes(namespace)) {
			        const event = storeElementEvent[handlerKey];
			        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			      }
			    }
			  }
			  function getTypeEvent(event) {
			    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
			    event = event.replace(stripNameRegex, '');
			    return customEvents[event] || event;
			  }
			  const EventHandler = {
			    on(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, false);
			    },
			    one(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, true);
			    },
			    off(element, originalTypeEvent, handler, delegationFunction) {
			      if (typeof originalTypeEvent !== 'string' || !element) {
			        return;
			      }
			      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
			      const inNamespace = typeEvent !== originalTypeEvent;
			      const events = getElementEvents(element);
			      const storeElementEvent = events[typeEvent] || {};
			      const isNamespace = originalTypeEvent.startsWith('.');
			      if (typeof callable !== 'undefined') {
			        // Simplest case: handler is passed, remove that listener ONLY.
			        if (!Object.keys(storeElementEvent).length) {
			          return;
			        }
			        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			        return;
			      }
			      if (isNamespace) {
			        for (const elementEvent of Object.keys(events)) {
			          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
			        }
			      }
			      for (const keyHandlers of Object.keys(storeElementEvent)) {
			        const handlerKey = keyHandlers.replace(stripUidRegex, '');
			        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
			          const event = storeElementEvent[keyHandlers];
			          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			        }
			      }
			    },
			    trigger(element, event, args) {
			      if (typeof event !== 'string' || !element) {
			        return null;
			      }
			      const $ = index.getjQuery();
			      const typeEvent = getTypeEvent(event);
			      const inNamespace = event !== typeEvent;
			      let jQueryEvent = null;
			      let bubbles = true;
			      let nativeDispatch = true;
			      let defaultPrevented = false;
			      if (inNamespace && $) {
			        jQueryEvent = $.Event(event, args);
			        $(element).trigger(jQueryEvent);
			        bubbles = !jQueryEvent.isPropagationStopped();
			        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
			        defaultPrevented = jQueryEvent.isDefaultPrevented();
			      }
			      let evt = new Event(event, {
			        bubbles,
			        cancelable: true
			      });
			      evt = hydrateObj(evt, args);
			      if (defaultPrevented) {
			        evt.preventDefault();
			      }
			      if (nativeDispatch) {
			        element.dispatchEvent(evt);
			      }
			      if (evt.defaultPrevented && jQueryEvent) {
			        jQueryEvent.preventDefault();
			      }
			      return evt;
			    }
			  };
			  function hydrateObj(obj, meta) {
			    for (const [key, value] of Object.entries(meta || {})) {
			      try {
			        obj[key] = value;
			      } catch (_unused) {
			        Object.defineProperty(obj, key, {
			          configurable: true,
			          get() {
			            return value;
			          }
			        });
			      }
			    }
			    return obj;
			  }
			  return EventHandler;
			});
	} (eventHandler));
		return eventHandler.exports;
	}

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return data.exports;
		hasRequiredData = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/data.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const elementMap = new Map();
			  const data = {
			    set(element, key, instance) {
			      if (!elementMap.has(element)) {
			        elementMap.set(element, new Map());
			      }
			      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
			      // can be removed later when multiple key/instances are fine to be used

			      if (!instanceMap.has(key) && instanceMap.size !== 0) {
			        // eslint-disable-next-line no-console
			        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			        return;
			      }
			      instanceMap.set(key, instance);
			    },
			    get(element, key) {
			      if (elementMap.has(element)) {
			        return elementMap.get(element).get(key) || null;
			      }
			      return null;
			    },
			    remove(element, key) {
			      if (!elementMap.has(element)) {
			        return;
			      }
			      const instanceMap = elementMap.get(element);
			      instanceMap.delete(key); // free up element references if there are no instances left for an element

			      if (instanceMap.size === 0) {
			        elementMap.delete(element);
			      }
			    }
			  };
			  return data;
			});
	} (data));
		return data.exports;
	}

	var config = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredManipulator;

	function requireManipulator () {
		if (hasRequiredManipulator) return manipulator.exports;
		hasRequiredManipulator = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/manipulator.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  function normalizeData(value) {
			    if (value === 'true') {
			      return true;
			    }
			    if (value === 'false') {
			      return false;
			    }
			    if (value === Number(value).toString()) {
			      return Number(value);
			    }
			    if (value === '' || value === 'null') {
			      return null;
			    }
			    if (typeof value !== 'string') {
			      return value;
			    }
			    try {
			      return JSON.parse(decodeURIComponent(value));
			    } catch (_unused) {
			      return value;
			    }
			  }
			  function normalizeDataKey(key) {
			    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
			  }
			  const Manipulator = {
			    setDataAttribute(element, key, value) {
			      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
			    },
			    removeDataAttribute(element, key) {
			      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
			    },
			    getDataAttributes(element) {
			      if (!element) {
			        return {};
			      }
			      const attributes = {};
			      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
			      for (const key of bsKeys) {
			        let pureKey = key.replace(/^bs/, '');
			        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
			        attributes[pureKey] = normalizeData(element.dataset[key]);
			      }
			      return attributes;
			    },
			    getDataAttribute(element, key) {
			      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
			    }
			  };
			  return Manipulator;
			});
	} (manipulator));
		return manipulator.exports;
	}

	/*!
	  * Bootstrap config.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredConfig;

	function requireConfig () {
		if (hasRequiredConfig) return config.exports;
		hasRequiredConfig = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil(), requireManipulator()) ;
			})(commonjsGlobal, function (index, Manipulator) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/config.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Class definition
			   */

			  class Config {
			    // Getters
			    static get Default() {
			      return {};
			    }
			    static get DefaultType() {
			      return {};
			    }
			    static get NAME() {
			      throw new Error('You have to implement the static method "NAME", for each component!');
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    }
			    _configAfterMerge(config) {
			      return config;
			    }
			    _mergeConfigObj(config, element) {
			      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

			      return {
			        ...this.constructor.Default,
			        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
			        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
			        ...(typeof config === 'object' ? config : {})
			      };
			    }
			    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
			      for (const property of Object.keys(configTypes)) {
			        const expectedTypes = configTypes[property];
			        const value = config[property];
			        const valueType = index.isElement(value) ? 'element' : index.toType(value);
			        if (!new RegExp(expectedTypes).test(valueType)) {
			          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
			        }
			      }
			    }
			  }
			  return Config;
			});
	} (config));
		return config.exports;
	}

	/*!
	  * Bootstrap base-component.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBaseComponent;

	function requireBaseComponent () {
		if (hasRequiredBaseComponent) return baseComponent.exports;
		hasRequiredBaseComponent = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig()) ;
			})(commonjsGlobal, function (Data, index, EventHandler, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): base-component.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const VERSION = '5.2.3';
			  /**
			   * Class definition
			   */

			  class BaseComponent extends Config__default.default {
			    constructor(element, config) {
			      super();
			      element = index.getElement(element);
			      if (!element) {
			        return;
			      }
			      this._element = element;
			      this._config = this._getConfig(config);
			      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
			    } // Public

			    dispose() {
			      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
			      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
			      for (const propertyName of Object.getOwnPropertyNames(this)) {
			        this[propertyName] = null;
			      }
			    }
			    _queueCallback(callback, element, isAnimated = true) {
			      index.executeAfterTransition(callback, element, isAnimated);
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config, this._element);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    } // Static

			    static getInstance(element) {
			      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
			    }
			    static getOrCreateInstance(element, config = {}) {
			      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
			    }
			    static get VERSION() {
			      return VERSION;
			    }
			    static get DATA_KEY() {
			      return `bs.${this.NAME}`;
			    }
			    static get EVENT_KEY() {
			      return `.${this.DATA_KEY}`;
			    }
			    static eventName(name) {
			      return `${name}${this.EVENT_KEY}`;
			    }
			  }
			  return BaseComponent;
			});
	} (baseComponent));
		return baseComponent.exports;
	}

	var componentFunctions = {exports: {}};

	/*!
	  * Bootstrap component-functions.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredComponentFunctions;

	function requireComponentFunctions () {
		if (hasRequiredComponentFunctions) return componentFunctions.exports;
		hasRequiredComponentFunctions = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports, requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (exports, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/component-functions.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  const enableDismissTrigger = (component, method = 'hide') => {
			    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
			    const name = component.NAME;
			    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
			      if (['A', 'AREA'].includes(this.tagName)) {
			        event.preventDefault();
			      }
			      if (index.isDisabled(this)) {
			        return;
			      }
			      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
			      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

			      instance[method]();
			    });
			  };
			  exports.enableDismissTrigger = enableDismissTrigger;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (componentFunctions, componentFunctions.exports));
		return componentFunctions.exports;
	}

	/*!
	  * Bootstrap alert.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): alert.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'alert';
		  const DATA_KEY = 'bs.alert';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_CLOSE = `close${EVENT_KEY}`;
		  const EVENT_CLOSED = `closed${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  /**
		   * Class definition
		   */

		  class Alert extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    close() {
		      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);
		      if (closeEvent.defaultPrevented) {
		        return;
		      }
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
		      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
		    } // Private

		    _destroyElement() {
		      this._element.remove();
		      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
		      this.dispose();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Alert.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Alert, 'close');
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Alert);
		  return Alert;
		});
	} (alert$1));

	var alert = alert$1.exports;

	var button$1 = {exports: {}};

	/*!
	  * Bootstrap button.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): button.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'button';
		  const DATA_KEY = 'bs.button';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  /**
		   * Class definition
		   */

		  class Button extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
		      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Button.getOrCreateInstance(this);
		        if (config === 'toggle') {
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
		    event.preventDefault();
		    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
		    const data = Button.getOrCreateInstance(button);
		    data.toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Button);
		  return Button;
		});
	} (button$1));

	var button = button$1.exports;

	var carousel$1 = {exports: {}};

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSelectorEngine;

	function requireSelectorEngine () {
		if (hasRequiredSelectorEngine) return selectorEngine.exports;
		hasRequiredSelectorEngine = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/selector-engine.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const SelectorEngine = {
			    find(selector, element = document.documentElement) {
			      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
			    },
			    findOne(selector, element = document.documentElement) {
			      return Element.prototype.querySelector.call(element, selector);
			    },
			    children(element, selector) {
			      return [].concat(...element.children).filter(child => child.matches(selector));
			    },
			    parents(element, selector) {
			      const parents = [];
			      let ancestor = element.parentNode.closest(selector);
			      while (ancestor) {
			        parents.push(ancestor);
			        ancestor = ancestor.parentNode.closest(selector);
			      }
			      return parents;
			    },
			    prev(element, selector) {
			      let previous = element.previousElementSibling;
			      while (previous) {
			        if (previous.matches(selector)) {
			          return [previous];
			        }
			        previous = previous.previousElementSibling;
			      }
			      return [];
			    },
			    // TODO: this is now unused; remove later along with prev()
			    next(element, selector) {
			      let next = element.nextElementSibling;
			      while (next) {
			        if (next.matches(selector)) {
			          return [next];
			        }
			        next = next.nextElementSibling;
			      }
			      return [];
			    },
			    focusableChildren(element) {
			      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
			      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
			    }
			  };
			  return SelectorEngine;
			});
	} (selectorEngine));
		return selectorEngine.exports;
	}

	var swipe = {exports: {}};

	/*!
	  * Bootstrap swipe.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSwipe;

	function requireSwipe () {
		if (hasRequiredSwipe) return swipe.exports;
		hasRequiredSwipe = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireConfig(), requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (Config, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/swipe.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'swipe';
			  const EVENT_KEY = '.bs.swipe';
			  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
			  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
			  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
			  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
			  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
			  const POINTER_TYPE_TOUCH = 'touch';
			  const POINTER_TYPE_PEN = 'pen';
			  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
			  const SWIPE_THRESHOLD = 40;
			  const Default = {
			    endCallback: null,
			    leftCallback: null,
			    rightCallback: null
			  };
			  const DefaultType = {
			    endCallback: '(function|null)',
			    leftCallback: '(function|null)',
			    rightCallback: '(function|null)'
			  };
			  /**
			   * Class definition
			   */

			  class Swipe extends Config__default.default {
			    constructor(element, config) {
			      super();
			      this._element = element;
			      if (!element || !Swipe.isSupported()) {
			        return;
			      }
			      this._config = this._getConfig(config);
			      this._deltaX = 0;
			      this._supportPointerEvents = Boolean(window.PointerEvent);
			      this._initEvents();
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    dispose() {
			      EventHandler__default.default.off(this._element, EVENT_KEY);
			    } // Private

			    _start(event) {
			      if (!this._supportPointerEvents) {
			        this._deltaX = event.touches[0].clientX;
			        return;
			      }
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX;
			      }
			    }
			    _end(event) {
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX - this._deltaX;
			      }
			      this._handleSwipe();
			      index.execute(this._config.endCallback);
			    }
			    _move(event) {
			      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
			    }
			    _handleSwipe() {
			      const absDeltaX = Math.abs(this._deltaX);
			      if (absDeltaX <= SWIPE_THRESHOLD) {
			        return;
			      }
			      const direction = absDeltaX / this._deltaX;
			      this._deltaX = 0;
			      if (!direction) {
			        return;
			      }
			      index.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
			    }
			    _initEvents() {
			      if (this._supportPointerEvents) {
			        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => this._end(event));
			        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
			      } else {
			        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => this._end(event));
			      }
			    }
			    _eventIsPointerPenTouch(event) {
			      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
			    } // Static

			    static isSupported() {
			      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
			    }
			  }
			  return Swipe;
			});
	} (swipe));
		return swipe.exports;
	}

	/*!
	  * Bootstrap carousel.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireSwipe(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, Manipulator, SelectorEngine, Swipe, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Swipe__default = /*#__PURE__*/_interopDefaultLegacy(Swipe);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): carousel.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'carousel';
		  const DATA_KEY = 'bs.carousel';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

		  const ORDER_NEXT = 'next';
		  const ORDER_PREV = 'prev';
		  const DIRECTION_LEFT = 'left';
		  const DIRECTION_RIGHT = 'right';
		  const EVENT_SLIDE = `slide${EVENT_KEY}`;
		  const EVENT_SLID = `slid${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
		  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
		  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_CAROUSEL = 'carousel';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_SLIDE = 'slide';
		  const CLASS_NAME_END = 'carousel-item-end';
		  const CLASS_NAME_START = 'carousel-item-start';
		  const CLASS_NAME_NEXT = 'carousel-item-next';
		  const CLASS_NAME_PREV = 'carousel-item-prev';
		  const SELECTOR_ACTIVE = '.active';
		  const SELECTOR_ITEM = '.carousel-item';
		  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
		  const SELECTOR_ITEM_IMG = '.carousel-item img';
		  const SELECTOR_INDICATORS = '.carousel-indicators';
		  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
		  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
		  const KEY_TO_DIRECTION = {
		    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
		    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
		  };
		  const Default = {
		    interval: 5000,
		    keyboard: true,
		    pause: 'hover',
		    ride: false,
		    touch: true,
		    wrap: true
		  };
		  const DefaultType = {
		    interval: '(number|boolean)',
		    // TODO:v6 remove boolean support
		    keyboard: 'boolean',
		    pause: '(string|boolean)',
		    ride: '(boolean|string)',
		    touch: 'boolean',
		    wrap: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Carousel extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._interval = null;
		      this._activeElement = null;
		      this._isSliding = false;
		      this.touchTimeout = null;
		      this._swipeHelper = null;
		      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
		      this._addEventListeners();
		      if (this._config.ride === CLASS_NAME_CAROUSEL) {
		        this.cycle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    next() {
		      this._slide(ORDER_NEXT);
		    }
		    nextWhenVisible() {
		      // FIXME TODO use `document.visibilityState`
		      // Don't call next when the page isn't visible
		      // or the carousel or its parent isn't visible
		      if (!document.hidden && index.isVisible(this._element)) {
		        this.next();
		      }
		    }
		    prev() {
		      this._slide(ORDER_PREV);
		    }
		    pause() {
		      if (this._isSliding) {
		        index.triggerTransitionEnd(this._element);
		      }
		      this._clearInterval();
		    }
		    cycle() {
		      this._clearInterval();
		      this._updateInterval();
		      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
		    }
		    _maybeEnableCycle() {
		      if (!this._config.ride) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.cycle());
		        return;
		      }
		      this.cycle();
		    }
		    to(index) {
		      const items = this._getItems();
		      if (index > items.length - 1 || index < 0) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
		        return;
		      }
		      const activeIndex = this._getItemIndex(this._getActive());
		      if (activeIndex === index) {
		        return;
		      }
		      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
		      this._slide(order, items[index]);
		    }
		    dispose() {
		      if (this._swipeHelper) {
		        this._swipeHelper.dispose();
		      }
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      config.defaultInterval = config.interval;
		      return config;
		    }
		    _addEventListeners() {
		      if (this._config.keyboard) {
		        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		      }
		      if (this._config.pause === 'hover') {
		        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, () => this.pause());
		        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
		      }
		      if (this._config.touch && Swipe__default.default.isSupported()) {
		        this._addTouchEventListeners();
		      }
		    }
		    _addTouchEventListeners() {
		      for (const img of SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element)) {
		        EventHandler__default.default.on(img, EVENT_DRAG_START, event => event.preventDefault());
		      }
		      const endCallBack = () => {
		        if (this._config.pause !== 'hover') {
		          return;
		        } // If it's a touch-enabled device, mouseenter/leave are fired as
		        // part of the mouse compatibility events on first tap - the carousel
		        // would stop cycling until user tapped out of it;
		        // here, we listen for touchend, explicitly pause the carousel
		        // (as if it's the second time we tap on it, mouseenter compat event
		        // is NOT fired) and after a timeout (to allow for mouse compatibility
		        // events to fire) we explicitly restart cycling

		        this.pause();
		        if (this.touchTimeout) {
		          clearTimeout(this.touchTimeout);
		        }
		        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
		      };
		      const swipeConfig = {
		        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
		        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
		        endCallback: endCallBack
		      };
		      this._swipeHelper = new Swipe__default.default(this._element, swipeConfig);
		    }
		    _keydown(event) {
		      if (/input|textarea/i.test(event.target.tagName)) {
		        return;
		      }
		      const direction = KEY_TO_DIRECTION[event.key];
		      if (direction) {
		        event.preventDefault();
		        this._slide(this._directionToOrder(direction));
		      }
		    }
		    _getItemIndex(element) {
		      return this._getItems().indexOf(element);
		    }
		    _setActiveIndicatorElement(index) {
		      if (!this._indicatorsElement) {
		        return;
		      }
		      const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
		      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
		      activeIndicator.removeAttribute('aria-current');
		      const newActiveIndicator = SelectorEngine__default.default.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
		      if (newActiveIndicator) {
		        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
		        newActiveIndicator.setAttribute('aria-current', 'true');
		      }
		    }
		    _updateInterval() {
		      const element = this._activeElement || this._getActive();
		      if (!element) {
		        return;
		      }
		      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
		      this._config.interval = elementInterval || this._config.defaultInterval;
		    }
		    _slide(order, element = null) {
		      if (this._isSliding) {
		        return;
		      }
		      const activeElement = this._getActive();
		      const isNext = order === ORDER_NEXT;
		      const nextElement = element || index.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
		      if (nextElement === activeElement) {
		        return;
		      }
		      const nextElementIndex = this._getItemIndex(nextElement);
		      const triggerEvent = eventName => {
		        return EventHandler__default.default.trigger(this._element, eventName, {
		          relatedTarget: nextElement,
		          direction: this._orderToDirection(order),
		          from: this._getItemIndex(activeElement),
		          to: nextElementIndex
		        });
		      };
		      const slideEvent = triggerEvent(EVENT_SLIDE);
		      if (slideEvent.defaultPrevented) {
		        return;
		      }
		      if (!activeElement || !nextElement) {
		        // Some weirdness is happening, so we bail
		        // todo: change tests that use empty divs to avoid this check
		        return;
		      }
		      const isCycling = Boolean(this._interval);
		      this.pause();
		      this._isSliding = true;
		      this._setActiveIndicatorElement(nextElementIndex);
		      this._activeElement = nextElement;
		      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
		      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
		      nextElement.classList.add(orderClassName);
		      index.reflow(nextElement);
		      activeElement.classList.add(directionalClassName);
		      nextElement.classList.add(directionalClassName);
		      const completeCallBack = () => {
		        nextElement.classList.remove(directionalClassName, orderClassName);
		        nextElement.classList.add(CLASS_NAME_ACTIVE);
		        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
		        this._isSliding = false;
		        triggerEvent(EVENT_SLID);
		      };
		      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
		      if (isCycling) {
		        this.cycle();
		      }
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_SLIDE);
		    }
		    _getActive() {
		      return SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
		    }
		    _getItems() {
		      return SelectorEngine__default.default.find(SELECTOR_ITEM, this._element);
		    }
		    _clearInterval() {
		      if (this._interval) {
		        clearInterval(this._interval);
		        this._interval = null;
		      }
		    }
		    _directionToOrder(direction) {
		      if (index.isRTL()) {
		        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
		      }
		      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
		    }
		    _orderToDirection(order) {
		      if (index.isRTL()) {
		        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
		      }
		      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Carousel.getOrCreateInstance(this, config);
		        if (typeof config === 'number') {
		          data.to(config);
		          return;
		        }
		        if (typeof config === 'string') {
		          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
		      return;
		    }
		    event.preventDefault();
		    const carousel = Carousel.getOrCreateInstance(target);
		    const slideIndex = this.getAttribute('data-bs-slide-to');
		    if (slideIndex) {
		      carousel.to(slideIndex);
		      carousel._maybeEnableCycle();
		      return;
		    }
		    if (Manipulator__default.default.getDataAttribute(this, 'slide') === 'next') {
		      carousel.next();
		      carousel._maybeEnableCycle();
		      return;
		    }
		    carousel.prev();
		    carousel._maybeEnableCycle();
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);
		    for (const carousel of carousels) {
		      Carousel.getOrCreateInstance(carousel);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Carousel);
		  return Carousel;
		});
	} (carousel$1));

	var carousel = carousel$1.exports;

	var collapse$1 = {exports: {}};

	/*!
	  * Bootstrap collapse.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): collapse.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'collapse';
		  const DATA_KEY = 'bs.collapse';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_COLLAPSE = 'collapse';
		  const CLASS_NAME_COLLAPSING = 'collapsing';
		  const CLASS_NAME_COLLAPSED = 'collapsed';
		  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
		  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
		  const WIDTH = 'width';
		  const HEIGHT = 'height';
		  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
		  const Default = {
		    parent: null,
		    toggle: true
		  };
		  const DefaultType = {
		    parent: '(null|element)',
		    toggle: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Collapse extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isTransitioning = false;
		      this._triggerArray = [];
		      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
		      for (const elem of toggleList) {
		        const selector = index.getSelectorFromElement(elem);
		        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElement => foundElement === this._element);
		        if (selector !== null && filterElement.length) {
		          this._triggerArray.push(elem);
		        }
		      }
		      this._initializeChildren();
		      if (!this._config.parent) {
		        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
		      }
		      if (this._config.toggle) {
		        this.toggle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      if (this._isShown()) {
		        this.hide();
		      } else {
		        this.show();
		      }
		    }
		    show() {
		      if (this._isTransitioning || this._isShown()) {
		        return;
		      }
		      let activeChildren = []; // find active children

		      if (this._config.parent) {
		        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
		          toggle: false
		        }));
		      }
		      if (activeChildren.length && activeChildren[0]._isTransitioning) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      for (const activeInstance of activeChildren) {
		        activeInstance.hide();
		      }
		      const dimension = this._getDimension();
		      this._element.classList.remove(CLASS_NAME_COLLAPSE);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.style[dimension] = 0;
		      this._addAriaAndCollapsedClass(this._triggerArray, true);
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		        this._element.style[dimension] = '';
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		      };
		      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
		      const scrollSize = `scroll${capitalizedDimension}`;
		      this._queueCallback(complete, this._element, true);
		      this._element.style[dimension] = `${this._element[scrollSize]}px`;
		    }
		    hide() {
		      if (this._isTransitioning || !this._isShown()) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      const dimension = this._getDimension();
		      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		      for (const trigger of this._triggerArray) {
		        const element = index.getElementFromSelector(trigger);
		        if (element && !this._isShown(element)) {
		          this._addAriaAndCollapsedClass([trigger], false);
		        }
		      }
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.style[dimension] = '';
		      this._queueCallback(complete, this._element, true);
		    }
		    _isShown(element = this._element) {
		      return element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _configAfterMerge(config) {
		      config.toggle = Boolean(config.toggle); // Coerce string values

		      config.parent = index.getElement(config.parent);
		      return config;
		    }
		    _getDimension() {
		      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
		    }
		    _initializeChildren() {
		      if (!this._config.parent) {
		        return;
		      }
		      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
		      for (const element of children) {
		        const selected = index.getElementFromSelector(element);
		        if (selected) {
		          this._addAriaAndCollapsedClass([element], this._isShown(selected));
		        }
		      }
		    }
		    _getFirstLevelChildren(selector) {
		      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

		      return SelectorEngine__default.default.find(selector, this._config.parent).filter(element => !children.includes(element));
		    }
		    _addAriaAndCollapsedClass(triggerArray, isOpen) {
		      if (!triggerArray.length) {
		        return;
		      }
		      for (const element of triggerArray) {
		        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
		        element.setAttribute('aria-expanded', isOpen);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      const _config = {};
		      if (typeof config === 'string' && /show|hide/.test(config)) {
		        _config.toggle = false;
		      }
		      return this.each(function () {
		        const data = Collapse.getOrCreateInstance(this, _config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
		    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
		      event.preventDefault();
		    }
		    const selector = index.getSelectorFromElement(this);
		    const selectorElements = SelectorEngine__default.default.find(selector);
		    for (const element of selectorElements) {
		      Collapse.getOrCreateInstance(element, {
		        toggle: false
		      }).toggle();
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Collapse);
		  return Collapse;
		});
	} (collapse$1));

	var collapse = collapse$1.exports;

	var dropdown$1 = {exports: {}};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement$1(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement$1(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]

	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement$1(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max$1 = Math.max;
	var min$1 = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;
	  if (uaData != null && uaData.brands) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }
	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;
	  if (includeScale && isHTMLElement$1(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }
	  var _ref = isElement(element) ? getWindow(element) : window,
	    visualViewport = _ref.visualViewport;
	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;
	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...

	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false

	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument :
	  // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot ||
	    // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || (
	    // DOM Element detected
	    isShadowRoot(element) ? element.host : null) ||
	    // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement$1(element) ||
	  // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block

	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());
	  if (isIE && isHTMLElement$1(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }
	  while (isHTMLElement$1(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.

	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min, value, max) {
	  return max$1(min, min$1(value, max));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	    name = _ref.name,
	    options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options;
	  var _options$element = options.element,
	    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  } // CSS selector

	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules

	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	    y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	    popperRect = _ref2.popperRect,
	    placement = _ref2.placement,
	    variation = _ref2.variation,
	    offsets = _ref2.offsets,
	    position = _ref2.position,
	    gpuAcceleration = _ref2.gpuAcceleration,
	    adaptive = _ref2.adaptive,
	    roundOffsets = _ref2.roundOffsets,
	    isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	    x = _offsets$x === void 0 ? 0 : _offsets$x,
	    _offsets$y = offsets.y,
	    y = _offsets$y === void 0 ? 0 : _offsets$y;
	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    offsetParent = offsetParent;
	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
	      // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
	      // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref4.x;
	  y = _ref4.y;
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref5) {
	  var state = _ref5.state,
	    options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	    _options$adaptive = options.adaptive,
	    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	    _options$roundOffsets = options.roundOffsets,
	    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	    instance = _ref.instance,
	    options = _ref.options;
	  var _options$scroll = options.scroll,
	    scroll = _options$scroll === void 0 ? true : _options$scroll,
	    _options$resize = options.resize,
	    resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    var layoutViewport = isLayoutViewport();
	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max$1(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max$1(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max$1(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	    overflow = _getComputedStyle.overflow,
	    overflowX = _getComputedStyle.overflowX,
	    overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement$1(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`

	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement$1(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents

	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max$1(rect.top, accRect.top);
	    accRect.right = min$1(rect.right, accRect.right);
	    accRect.bottom = min$1(rect.bottom, accRect.bottom);
	    accRect.left = max$1(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	    element = _ref.element,
	    placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    _options$placement = _options.placement,
	    placement = _options$placement === void 0 ? state.placement : _options$placement,
	    _options$strategy = _options.strategy,
	    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	    _options$boundary = _options.boundary,
	    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	    _options$rootBoundary = _options.rootBoundary,
	    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	    _options$elementConte = _options.elementContext,
	    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	    _options$altBoundary = _options.altBoundary,
	    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	    _options$padding = _options.padding,
	    padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    placement = _options.placement,
	    boundary = _options.boundary,
	    rootBoundary = _options.rootBoundary,
	    padding = _options.padding,
	    flipVariations = _options.flipVariations,
	    _options$allowedAutoP = _options.allowedAutoPlacements,
	    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	    specifiedFallbackPlacements = options.fallbackPlacements,
	    padding = options.padding,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    _options$flipVariatio = options.flipVariations,
	    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	    allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules

	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	    skidding = _ref[0],
	    distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options,
	    name = _ref2.name;
	  var _options$offset = options.offset,
	    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	    x = _data$state$placement.x,
	    y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var offset$2 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset$1
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    padding = options.padding,
	    _options$tether = options.tether,
	    tether = _options$tether === void 0 ? true : _options$tether,
	    _options$tetherOffset = options.tetherOffset,
	    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var _offsetModifierState$;
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min = offset + overflow[mainSide];
	    var max = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min$1(min, tetherMin) : min, offset, tether ? max$1(max, tetherMax) : max);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _offsetModifierState$2;
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _len = altAxis === 'y' ? 'height' : 'width';
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement$1(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var isOffsetParentAnElement = isHTMLElement$1(offsetParent);
	  var offsetParentIsScaled = isHTMLElement$1(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement$1(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	    _generatorOptions$def = _generatorOptions.defaultModifiers,
	    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	    _generatorOptions$def2 = _generatorOptions.defaultOptions,
	    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	          reference = _state$elements.reference,
	          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers

	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	            fn = _state$orderedModifie.fn,
	            _state$orderedModifie2 = _state$orderedModifie.options,
	            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	            name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	          _ref3$options = _ref3.options,
	          options = _ref3$options === void 0 ? {} : _ref3$options,
	          effect = _ref3.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$2, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		afterMain: afterMain,
		afterRead: afterRead,
		afterWrite: afterWrite,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		auto: auto,
		basePlacements: basePlacements,
		beforeMain: beforeMain,
		beforeRead: beforeRead,
		beforeWrite: beforeWrite,
		bottom: bottom,
		clippingParents: clippingParents,
		computeStyles: computeStyles$1,
		createPopper: createPopper,
		createPopperBase: createPopper$2,
		createPopperLite: createPopper$1,
		detectOverflow: detectOverflow,
		end: end,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		left: left,
		main: main,
		modifierPhases: modifierPhases,
		offset: offset$2,
		placements: placements,
		popper: popper,
		popperGenerator: popperGenerator,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1,
		read: read,
		reference: reference,
		right: right,
		start: start,
		top: top,
		variationPlacements: variationPlacements,
		viewport: viewport,
		write: write
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (Popper, index, EventHandler, Manipulator, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): dropdown.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'dropdown';
		  const DATA_KEY = 'bs.dropdown';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const TAB_KEY = 'Tab';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_DROPUP = 'dropup';
		  const CLASS_NAME_DROPEND = 'dropend';
		  const CLASS_NAME_DROPSTART = 'dropstart';
		  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
		  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
		  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
		  const SELECTOR_MENU = '.dropdown-menu';
		  const SELECTOR_NAVBAR = '.navbar';
		  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
		  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
		  const PLACEMENT_TOP = index.isRTL() ? 'top-end' : 'top-start';
		  const PLACEMENT_TOPEND = index.isRTL() ? 'top-start' : 'top-end';
		  const PLACEMENT_BOTTOM = index.isRTL() ? 'bottom-end' : 'bottom-start';
		  const PLACEMENT_BOTTOMEND = index.isRTL() ? 'bottom-start' : 'bottom-end';
		  const PLACEMENT_RIGHT = index.isRTL() ? 'left-start' : 'right-start';
		  const PLACEMENT_LEFT = index.isRTL() ? 'right-start' : 'left-start';
		  const PLACEMENT_TOPCENTER = 'top';
		  const PLACEMENT_BOTTOMCENTER = 'bottom';
		  const Default = {
		    autoClose: true,
		    boundary: 'clippingParents',
		    display: 'dynamic',
		    offset: [0, 2],
		    popperConfig: null,
		    reference: 'toggle'
		  };
		  const DefaultType = {
		    autoClose: '(boolean|string)',
		    boundary: '(string|element)',
		    display: 'string',
		    offset: '(array|string|function)',
		    popperConfig: '(null|object|function)',
		    reference: '(string|element|object)'
		  };
		  /**
		   * Class definition
		   */

		  class Dropdown extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._popper = null;
		      this._parent = this._element.parentNode; // dropdown wrapper
		      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      this._menu = SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.findOne(SELECTOR_MENU, this._parent);
		      this._inNavbar = this._detectNavbar();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      return this._isShown() ? this.hide() : this.show();
		    }
		    show() {
		      if (index.isDisabled(this._element) || this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._createPopper(); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      this._element.focus();
		      this._element.setAttribute('aria-expanded', true);
		      this._menu.classList.add(CLASS_NAME_SHOW);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
		    }
		    hide() {
		      if (index.isDisabled(this._element) || !this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      this._completeHide(relatedTarget);
		    }
		    dispose() {
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      super.dispose();
		    }
		    update() {
		      this._inNavbar = this._detectNavbar();
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Private

		    _completeHide(relatedTarget) {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);
		      if (hideEvent.defaultPrevented) {
		        return;
		      } // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      this._menu.classList.remove(CLASS_NAME_SHOW);
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._element.setAttribute('aria-expanded', 'false');
		      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
		      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
		    }
		    _getConfig(config) {
		      config = super._getConfig(config);
		      if (typeof config.reference === 'object' && !index.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
		        // Popper virtual elements require a getBoundingClientRect method
		        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		      }
		      return config;
		    }
		    _createPopper() {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
		      }
		      let referenceElement = this._element;
		      if (this._config.reference === 'parent') {
		        referenceElement = this._parent;
		      } else if (index.isElement(this._config.reference)) {
		        referenceElement = index.getElement(this._config.reference);
		      } else if (typeof this._config.reference === 'object') {
		        referenceElement = this._config.reference;
		      }
		      const popperConfig = this._getPopperConfig();
		      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
		    }
		    _isShown() {
		      return this._menu.classList.contains(CLASS_NAME_SHOW);
		    }
		    _getPlacement() {
		      const parentDropdown = this._parent;
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
		        return PLACEMENT_RIGHT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
		        return PLACEMENT_LEFT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
		        return PLACEMENT_TOPCENTER;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
		        return PLACEMENT_BOTTOMCENTER;
		      } // We need to trim the value because custom properties can also include spaces

		      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
		        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
		      }
		      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
		    }
		    _detectNavbar() {
		      return this._element.closest(SELECTOR_NAVBAR) !== null;
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _getPopperConfig() {
		      const defaultBsPopperConfig = {
		        placement: this._getPlacement(),
		        modifiers: [{
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }]
		      }; // Disable Popper if we have a static display or Dropdown is in Navbar

		      if (this._inNavbar || this._config.display === 'static') {
		        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

		        defaultBsPopperConfig.modifiers = [{
		          name: 'applyStyles',
		          enabled: false
		        }];
		      }
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _selectMenuItem({
		      key,
		      target
		    }) {
		      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index.isVisible(element));
		      if (!items.length) {
		        return;
		      } // if target isn't included in items (e.g. when expanding the dropdown)
		      // allow cycling to get the last item in case key equals ARROW_UP_KEY

		      index.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Dropdown.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		    static clearMenus(event) {
		      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
		        return;
		      }
		      const openToggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_SHOWN);
		      for (const toggle of openToggles) {
		        const context = Dropdown.getInstance(toggle);
		        if (!context || context._config.autoClose === false) {
		          continue;
		        }
		        const composedPath = event.composedPath();
		        const isMenuTarget = composedPath.includes(context._menu);
		        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
		          continue;
		        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu

		        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
		          continue;
		        }
		        const relatedTarget = {
		          relatedTarget: context._element
		        };
		        if (event.type === 'click') {
		          relatedTarget.clickEvent = event;
		        }
		        context._completeHide(relatedTarget);
		      }
		    }
		    static dataApiKeydownHandler(event) {
		      // If not an UP | DOWN | ESCAPE key => not a dropdown command
		      // If input/textarea && if key is other than ESCAPE => not a dropdown command
		      const isInput = /input|textarea/i.test(event.target.tagName);
		      const isEscapeEvent = event.key === ESCAPE_KEY;
		      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
		      if (!isUpOrDownEvent && !isEscapeEvent) {
		        return;
		      }
		      if (isInput && !isEscapeEvent) {
		        return;
		      }
		      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
		      const instance = Dropdown.getOrCreateInstance(getToggleButton);
		      if (isUpOrDownEvent) {
		        event.stopPropagation();
		        instance.show();
		        instance._selectMenuItem(event);
		        return;
		      }
		      if (instance._isShown()) {
		        // else is escape and we check if it is shown
		        event.stopPropagation();
		        instance.hide();
		        getToggleButton.focus();
		      }
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    event.preventDefault();
		    Dropdown.getOrCreateInstance(this).toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Dropdown);
		  return Dropdown;
		});
	} (dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdown$1.exports);

	var modal = {exports: {}};

	var scrollbar = {exports: {}};

	/*!
	  * Bootstrap scrollbar.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbar.exports;
		hasRequiredScrollbar = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil()) ;
			})(commonjsGlobal, function (SelectorEngine, Manipulator, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/scrollBar.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
			  const SELECTOR_STICKY_CONTENT = '.sticky-top';
			  const PROPERTY_PADDING = 'padding-right';
			  const PROPERTY_MARGIN = 'margin-right';
			  /**
			   * Class definition
			   */

			  class ScrollBarHelper {
			    constructor() {
			      this._element = document.body;
			    } // Public

			    getWidth() {
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
			      const documentWidth = document.documentElement.clientWidth;
			      return Math.abs(window.innerWidth - documentWidth);
			    }
			    hide() {
			      const width = this.getWidth();
			      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width

			      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth

			      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
			      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
			    }
			    reset() {
			      this._resetElementAttributes(this._element, 'overflow');
			      this._resetElementAttributes(this._element, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
			    }
			    isOverflowing() {
			      return this.getWidth() > 0;
			    } // Private

			    _disableOverFlow() {
			      this._saveInitialAttribute(this._element, 'overflow');
			      this._element.style.overflow = 'hidden';
			    }
			    _setElementAttributes(selector, styleProperty, callback) {
			      const scrollbarWidth = this.getWidth();
			      const manipulationCallBack = element => {
			        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
			          return;
			        }
			        this._saveInitialAttribute(element, styleProperty);
			        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _saveInitialAttribute(element, styleProperty) {
			      const actualValue = element.style.getPropertyValue(styleProperty);
			      if (actualValue) {
			        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
			      }
			    }
			    _resetElementAttributes(selector, styleProperty) {
			      const manipulationCallBack = element => {
			        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

			        if (value === null) {
			          element.style.removeProperty(styleProperty);
			          return;
			        }
			        Manipulator__default.default.removeDataAttribute(element, styleProperty);
			        element.style.setProperty(styleProperty, value);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _applyManipulationCallback(selector, callBack) {
			      if (index.isElement(selector)) {
			        callBack(selector);
			        return;
			      }
			      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
			        callBack(sel);
			      }
			    }
			  }
			  return ScrollBarHelper;
			});
	} (scrollbar));
		return scrollbar.exports;
	}

	var backdrop = {exports: {}};

	/*!
	  * Bootstrap backdrop.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBackdrop;

	function requireBackdrop () {
		if (hasRequiredBackdrop) return backdrop.exports;
		hasRequiredBackdrop = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireUtil(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, index, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/backdrop.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'backdrop';
			  const CLASS_NAME_FADE = 'fade';
			  const CLASS_NAME_SHOW = 'show';
			  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
			  const Default = {
			    className: 'modal-backdrop',
			    clickCallback: null,
			    isAnimated: false,
			    isVisible: true,
			    // if false, we use the backdrop helper without adding any element to the dom
			    rootElement: 'body' // give the choice to place backdrop under different elements
			  };
			  const DefaultType = {
			    className: 'string',
			    clickCallback: '(function|null)',
			    isAnimated: 'boolean',
			    isVisible: 'boolean',
			    rootElement: '(element|string)'
			  };
			  /**
			   * Class definition
			   */

			  class Backdrop extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isAppended = false;
			      this._element = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    show(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._append();
			      const element = this._getElement();
			      if (this._config.isAnimated) {
			        index.reflow(element);
			      }
			      element.classList.add(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        index.execute(callback);
			      });
			    }
			    hide(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._getElement().classList.remove(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        this.dispose();
			        index.execute(callback);
			      });
			    }
			    dispose() {
			      if (!this._isAppended) {
			        return;
			      }
			      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
			      this._element.remove();
			      this._isAppended = false;
			    } // Private

			    _getElement() {
			      if (!this._element) {
			        const backdrop = document.createElement('div');
			        backdrop.className = this._config.className;
			        if (this._config.isAnimated) {
			          backdrop.classList.add(CLASS_NAME_FADE);
			        }
			        this._element = backdrop;
			      }
			      return this._element;
			    }
			    _configAfterMerge(config) {
			      // use getElement() with the default "body" to get a fresh Element on each instantiation
			      config.rootElement = index.getElement(config.rootElement);
			      return config;
			    }
			    _append() {
			      if (this._isAppended) {
			        return;
			      }
			      const element = this._getElement();
			      this._config.rootElement.append(element);
			      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
			        index.execute(this._config.clickCallback);
			      });
			      this._isAppended = true;
			    }
			    _emulateAnimation(callback) {
			      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
			    }
			  }
			  return Backdrop;
			});
	} (backdrop));
		return backdrop.exports;
	}

	var focustrap = {exports: {}};

	/*!
	  * Bootstrap focustrap.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredFocustrap;

	function requireFocustrap () {
		if (hasRequiredFocustrap) return focustrap.exports;
		hasRequiredFocustrap = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/focustrap.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'focustrap';
			  const DATA_KEY = 'bs.focustrap';
			  const EVENT_KEY = `.${DATA_KEY}`;
			  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
			  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
			  const TAB_KEY = 'Tab';
			  const TAB_NAV_FORWARD = 'forward';
			  const TAB_NAV_BACKWARD = 'backward';
			  const Default = {
			    autofocus: true,
			    trapElement: null // The element to trap focus inside of
			  };
			  const DefaultType = {
			    autofocus: 'boolean',
			    trapElement: 'element'
			  };
			  /**
			   * Class definition
			   */

			  class FocusTrap extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isActive = false;
			      this._lastTabNavDirection = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    activate() {
			      if (this._isActive) {
			        return;
			      }
			      if (this._config.autofocus) {
			        this._config.trapElement.focus();
			      }
			      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

			      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
			      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
			      this._isActive = true;
			    }
			    deactivate() {
			      if (!this._isActive) {
			        return;
			      }
			      this._isActive = false;
			      EventHandler__default.default.off(document, EVENT_KEY);
			    } // Private

			    _handleFocusin(event) {
			      const {
			        trapElement
			      } = this._config;
			      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
			        return;
			      }
			      const elements = SelectorEngine__default.default.focusableChildren(trapElement);
			      if (elements.length === 0) {
			        trapElement.focus();
			      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			        elements[elements.length - 1].focus();
			      } else {
			        elements[0].focus();
			      }
			    }
			    _handleKeydown(event) {
			      if (event.key !== TAB_KEY) {
			        return;
			      }
			      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
			    }
			  }
			  return FocusTrap;
			});
	} (focustrap));
		return focustrap.exports;
	}

	/*!
	  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireScrollbar(), requireBaseComponent(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): modal.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'modal';
		  const DATA_KEY = 'bs.modal';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
		  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_OPEN = 'modal-open';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_STATIC = 'modal-static';
		  const OPEN_SELECTOR = '.modal.show';
		  const SELECTOR_DIALOG = '.modal-dialog';
		  const SELECTOR_MODAL_BODY = '.modal-body';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
		  const Default = {
		    backdrop: true,
		    focus: true,
		    keyboard: true
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    focus: 'boolean',
		    keyboard: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Modal extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._isShown = false;
		      this._isTransitioning = false;
		      this._scrollBar = new ScrollBarHelper__default.default();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown || this._isTransitioning) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._isTransitioning = true;
		      this._scrollBar.hide();
		      document.body.classList.add(CLASS_NAME_OPEN);
		      this._adjustDialog();
		      this._backdrop.show(() => this._showElement(relatedTarget));
		    }
		    hide() {
		      if (!this._isShown || this._isTransitioning) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = false;
		      this._isTransitioning = true;
		      this._focustrap.deactivate();
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
		    }
		    dispose() {
		      for (const htmlElement of [window, this._dialog]) {
		        EventHandler__default.default.off(htmlElement, EVENT_KEY);
		      }
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    }
		    handleUpdate() {
		      this._adjustDialog();
		    } // Private

		    _initializeBackDrop() {
		      return new Backdrop__default.default({
		        isVisible: Boolean(this._config.backdrop),
		        // 'static' option will be translated to true, and booleans will keep their value,
		        isAnimated: this._isAnimated()
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _showElement(relatedTarget) {
		      // try to append dynamic modal
		      if (!document.body.contains(this._element)) {
		        document.body.append(this._element);
		      }
		      this._element.style.display = 'block';
		      this._element.removeAttribute('aria-hidden');
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.scrollTop = 0;
		      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
		      if (modalBody) {
		        modalBody.scrollTop = 0;
		      }
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      const transitionComplete = () => {
		        if (this._config.focus) {
		          this._focustrap.activate();
		        }
		        this._isTransitioning = false;
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (this._config.keyboard) {
		          event.preventDefault();
		          this.hide();
		          return;
		        }
		        this._triggerBackdropTransition();
		      });
		      EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		        if (this._isShown && !this._isTransitioning) {
		          this._adjustDialog();
		        }
		      });
		      EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
		        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
		        EventHandler__default.default.one(this._element, EVENT_CLICK_DISMISS, event2 => {
		          if (this._element !== event.target || this._element !== event2.target) {
		            return;
		          }
		          if (this._config.backdrop === 'static') {
		            this._triggerBackdropTransition();
		            return;
		          }
		          if (this._config.backdrop) {
		            this.hide();
		          }
		        });
		      });
		    }
		    _hideModal() {
		      this._element.style.display = 'none';
		      this._element.setAttribute('aria-hidden', true);
		      this._element.removeAttribute('aria-modal');
		      this._element.removeAttribute('role');
		      this._isTransitioning = false;
		      this._backdrop.hide(() => {
		        document.body.classList.remove(CLASS_NAME_OPEN);
		        this._resetAdjustments();
		        this._scrollBar.reset();
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      });
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_FADE);
		    }
		    _triggerBackdropTransition() {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

		      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
		        return;
		      }
		      if (!isModalOverflowing) {
		        this._element.style.overflowY = 'hidden';
		      }
		      this._element.classList.add(CLASS_NAME_STATIC);
		      this._queueCallback(() => {
		        this._element.classList.remove(CLASS_NAME_STATIC);
		        this._queueCallback(() => {
		          this._element.style.overflowY = initialOverflowY;
		        }, this._dialog);
		      }, this._dialog);
		      this._element.focus();
		    }
		    /**
		     * The following methods are used to handle overflowing modals
		     */

		    _adjustDialog() {
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const scrollbarWidth = this._scrollBar.getWidth();
		      const isBodyOverflowing = scrollbarWidth > 0;
		      if (isBodyOverflowing && !isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingLeft' : 'paddingRight';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		      if (!isBodyOverflowing && isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingRight' : 'paddingLeft';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		    }
		    _resetAdjustments() {
		      this._element.style.paddingLeft = '';
		      this._element.style.paddingRight = '';
		    } // Static

		    static jQueryInterface(config, relatedTarget) {
		      return this.each(function () {
		        const data = Modal.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](relatedTarget);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
		      if (showEvent.defaultPrevented) {
		        // only register focus restorer if modal will actually get shown
		        return;
		      }
		      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		        if (index.isVisible(this)) {
		          this.focus();
		        }
		      });
		    }); // avoid conflict when clicking modal toggler while another one is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen) {
		      Modal.getInstance(alreadyOpen).hide();
		    }
		    const data = Modal.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  componentFunctions.enableDismissTrigger(Modal);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Modal);
		  return Modal;
		});
	} (modal));

	var Modal = modal.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireScrollbar(), requireEventHandler(), requireBaseComponent(), requireSelectorEngine(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): offcanvas.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'offcanvas';
		  const DATA_KEY = 'bs.offcanvas';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const ESCAPE_KEY = 'Escape';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const CLASS_NAME_HIDING = 'hiding';
		  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
		  const OPEN_SELECTOR = '.offcanvas.show';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
		  const Default = {
		    backdrop: true,
		    keyboard: true,
		    scroll: false
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    keyboard: 'boolean',
		    scroll: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Offcanvas extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isShown = false;
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._backdrop.show();
		      if (!this._config.scroll) {
		        new ScrollBarHelper__default.default().hide();
		      }
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      const completeCallBack = () => {
		        if (!this._config.scroll || this._config.backdrop) {
		          this._focustrap.activate();
		        }
		        this._element.classList.add(CLASS_NAME_SHOW);
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(completeCallBack, this._element, true);
		    }
		    hide() {
		      if (!this._isShown) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._focustrap.deactivate();
		      this._element.blur();
		      this._isShown = false;
		      this._element.classList.add(CLASS_NAME_HIDING);
		      this._backdrop.hide();
		      const completeCallback = () => {
		        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);
		        this._element.removeAttribute('aria-modal');
		        this._element.removeAttribute('role');
		        if (!this._config.scroll) {
		          new ScrollBarHelper__default.default().reset();
		        }
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._queueCallback(completeCallback, this._element, true);
		    }
		    dispose() {
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    } // Private

		    _initializeBackDrop() {
		      const clickCallback = () => {
		        if (this._config.backdrop === 'static') {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      }; // 'static' option will be translated to true, and booleans will keep their value

		      const isVisible = Boolean(this._config.backdrop);
		      return new Backdrop__default.default({
		        className: CLASS_NAME_BACKDROP,
		        isVisible,
		        isAnimated: true,
		        rootElement: this._element.parentNode,
		        clickCallback: isVisible ? clickCallback : null
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (!this._config.keyboard) {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      });
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Offcanvas.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		      // focus on trigger when it is closed
		      if (index.isVisible(this)) {
		        this.focus();
		      }
		    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen && alreadyOpen !== target) {
		      Offcanvas.getInstance(alreadyOpen).hide();
		    }
		    const data = Offcanvas.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
		      Offcanvas.getOrCreateInstance(selector).show();
		    }
		  });
		  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
		      if (getComputedStyle(element).position !== 'fixed') {
		        Offcanvas.getOrCreateInstance(element).hide();
		      }
		    }
		  });
		  componentFunctions.enableDismissTrigger(Offcanvas);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Offcanvas);
		  return Offcanvas;
		});
	} (offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	var popover$1 = {exports: {}};

	var tooltip$1 = {exports: {}};

	var sanitizer = {exports: {}};

	/*!
	  * Bootstrap sanitizer.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSanitizer;

	function requireSanitizer () {
		if (hasRequiredSanitizer) return sanitizer.exports;
		hasRequiredSanitizer = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/sanitizer.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
			  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
			  /**
			   * A pattern that recognizes a commonly useful subset of URLs that are safe.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
			  /**
			   * A pattern that matches safe data URLs. Only matches image, video and audio types.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
			  const allowedAttribute = (attribute, allowedAttributeList) => {
			    const attributeName = attribute.nodeName.toLowerCase();
			    if (allowedAttributeList.includes(attributeName)) {
			      if (uriAttributes.has(attributeName)) {
			        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
			      }
			      return true;
			    } // Check if a regular expression validates the attribute.

			    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
			  };
			  const DefaultAllowlist = {
			    // Global attributes allowed on any supplied element below.
			    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
			    a: ['target', 'href', 'title', 'rel'],
			    area: [],
			    b: [],
			    br: [],
			    col: [],
			    code: [],
			    div: [],
			    em: [],
			    hr: [],
			    h1: [],
			    h2: [],
			    h3: [],
			    h4: [],
			    h5: [],
			    h6: [],
			    i: [],
			    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
			    li: [],
			    ol: [],
			    p: [],
			    pre: [],
			    s: [],
			    small: [],
			    span: [],
			    sub: [],
			    sup: [],
			    strong: [],
			    u: [],
			    ul: []
			  };
			  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
			    if (!unsafeHtml.length) {
			      return unsafeHtml;
			    }
			    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
			      return sanitizeFunction(unsafeHtml);
			    }
			    const domParser = new window.DOMParser();
			    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
			    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
			    for (const element of elements) {
			      const elementName = element.nodeName.toLowerCase();
			      if (!Object.keys(allowList).includes(elementName)) {
			        element.remove();
			        continue;
			      }
			      const attributeList = [].concat(...element.attributes);
			      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
			      for (const attribute of attributeList) {
			        if (!allowedAttribute(attribute, allowedAttributes)) {
			          element.removeAttribute(attribute.nodeName);
			        }
			      }
			    }
			    return createdDocument.body.innerHTML;
			  }
			  exports.DefaultAllowlist = DefaultAllowlist;
			  exports.sanitizeHtml = sanitizeHtml;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (sanitizer, sanitizer.exports));
		return sanitizer.exports;
	}

	var templateFactory = {exports: {}};

	/*!
	  * Bootstrap template-factory.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredTemplateFactory;

	function requireTemplateFactory () {
		if (hasRequiredTemplateFactory) return templateFactory.exports;
		hasRequiredTemplateFactory = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSanitizer(), requireUtil(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (sanitizer, index, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/template-factory.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'TemplateFactory';
			  const Default = {
			    allowList: sanitizer.DefaultAllowlist,
			    content: {},
			    // { selector : text ,  selector2 : text2 , }
			    extraClass: '',
			    html: false,
			    sanitize: true,
			    sanitizeFn: null,
			    template: '<div></div>'
			  };
			  const DefaultType = {
			    allowList: 'object',
			    content: 'object',
			    extraClass: '(string|function)',
			    html: 'boolean',
			    sanitize: 'boolean',
			    sanitizeFn: '(null|function)',
			    template: 'string'
			  };
			  const DefaultContentType = {
			    entry: '(string|element|function|null)',
			    selector: '(string|element)'
			  };
			  /**
			   * Class definition
			   */

			  class TemplateFactory extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    getContent() {
			      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
			    }
			    hasContent() {
			      return this.getContent().length > 0;
			    }
			    changeContent(content) {
			      this._checkContent(content);
			      this._config.content = {
			        ...this._config.content,
			        ...content
			      };
			      return this;
			    }
			    toHtml() {
			      const templateWrapper = document.createElement('div');
			      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
			      for (const [selector, text] of Object.entries(this._config.content)) {
			        this._setContent(templateWrapper, text, selector);
			      }
			      const template = templateWrapper.children[0];
			      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
			      if (extraClass) {
			        template.classList.add(...extraClass.split(' '));
			      }
			      return template;
			    } // Private

			    _typeCheckConfig(config) {
			      super._typeCheckConfig(config);
			      this._checkContent(config.content);
			    }
			    _checkContent(arg) {
			      for (const [selector, content] of Object.entries(arg)) {
			        super._typeCheckConfig({
			          selector,
			          entry: content
			        }, DefaultContentType);
			      }
			    }
			    _setContent(template, content, selector) {
			      const templateElement = SelectorEngine__default.default.findOne(selector, template);
			      if (!templateElement) {
			        return;
			      }
			      content = this._resolvePossibleFunction(content);
			      if (!content) {
			        templateElement.remove();
			        return;
			      }
			      if (index.isElement(content)) {
			        this._putElementInTemplate(index.getElement(content), templateElement);
			        return;
			      }
			      if (this._config.html) {
			        templateElement.innerHTML = this._maybeSanitize(content);
			        return;
			      }
			      templateElement.textContent = content;
			    }
			    _maybeSanitize(arg) {
			      return this._config.sanitize ? sanitizer.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
			    }
			    _resolvePossibleFunction(arg) {
			      return typeof arg === 'function' ? arg(this) : arg;
			    }
			    _putElementInTemplate(element, templateElement) {
			      if (this._config.html) {
			        templateElement.innerHTML = '';
			        templateElement.append(element);
			        return;
			      }
			      templateElement.textContent = element.textContent;
			    }
			  }
			  return TemplateFactory;
			});
	} (templateFactory));
		return templateFactory.exports;
	}

	/*!
	  * Bootstrap tooltip.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireSanitizer(), requireEventHandler(), requireManipulator(), requireBaseComponent(), requireTemplateFactory()) ;
		})(commonjsGlobal, function (Popper, index, sanitizer, EventHandler, Manipulator, BaseComponent, TemplateFactory) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const TemplateFactory__default = /*#__PURE__*/_interopDefaultLegacy(TemplateFactory);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tooltip.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tooltip';
		  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_MODAL = 'modal';
		  const CLASS_NAME_SHOW = 'show';
		  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
		  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
		  const EVENT_MODAL_HIDE = 'hide.bs.modal';
		  const TRIGGER_HOVER = 'hover';
		  const TRIGGER_FOCUS = 'focus';
		  const TRIGGER_CLICK = 'click';
		  const TRIGGER_MANUAL = 'manual';
		  const EVENT_HIDE = 'hide';
		  const EVENT_HIDDEN = 'hidden';
		  const EVENT_SHOW = 'show';
		  const EVENT_SHOWN = 'shown';
		  const EVENT_INSERTED = 'inserted';
		  const EVENT_CLICK = 'click';
		  const EVENT_FOCUSIN = 'focusin';
		  const EVENT_FOCUSOUT = 'focusout';
		  const EVENT_MOUSEENTER = 'mouseenter';
		  const EVENT_MOUSELEAVE = 'mouseleave';
		  const AttachmentMap = {
		    AUTO: 'auto',
		    TOP: 'top',
		    RIGHT: index.isRTL() ? 'left' : 'right',
		    BOTTOM: 'bottom',
		    LEFT: index.isRTL() ? 'right' : 'left'
		  };
		  const Default = {
		    allowList: sanitizer.DefaultAllowlist,
		    animation: true,
		    boundary: 'clippingParents',
		    container: false,
		    customClass: '',
		    delay: 0,
		    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
		    html: false,
		    offset: [0, 0],
		    placement: 'top',
		    popperConfig: null,
		    sanitize: true,
		    sanitizeFn: null,
		    selector: false,
		    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
		    title: '',
		    trigger: 'hover focus'
		  };
		  const DefaultType = {
		    allowList: 'object',
		    animation: 'boolean',
		    boundary: '(string|element)',
		    container: '(string|element|boolean)',
		    customClass: '(string|function)',
		    delay: '(number|object)',
		    fallbackPlacements: 'array',
		    html: 'boolean',
		    offset: '(array|string|function)',
		    placement: '(string|function)',
		    popperConfig: '(null|object|function)',
		    sanitize: 'boolean',
		    sanitizeFn: '(null|function)',
		    selector: '(string|boolean)',
		    template: 'string',
		    title: '(string|element|function)',
		    trigger: 'string'
		  };
		  /**
		   * Class definition
		   */

		  class Tooltip extends BaseComponent__default.default {
		    constructor(element, config) {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
		      }
		      super(element, config); // Private

		      this._isEnabled = true;
		      this._timeout = 0;
		      this._isHovered = null;
		      this._activeTrigger = {};
		      this._popper = null;
		      this._templateFactory = null;
		      this._newContent = null; // Protected

		      this.tip = null;
		      this._setListeners();
		      if (!this._config.selector) {
		        this._fixTitle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    enable() {
		      this._isEnabled = true;
		    }
		    disable() {
		      this._isEnabled = false;
		    }
		    toggleEnabled() {
		      this._isEnabled = !this._isEnabled;
		    }
		    toggle() {
		      if (!this._isEnabled) {
		        return;
		      }
		      this._activeTrigger.click = !this._activeTrigger.click;
		      if (this._isShown()) {
		        this._leave();
		        return;
		      }
		      this._enter();
		    }
		    dispose() {
		      clearTimeout(this._timeout);
		      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		      if (this._element.getAttribute('data-bs-original-title')) {
		        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
		      }
		      this._disposePopper();
		      super.dispose();
		    }
		    show() {
		      if (this._element.style.display === 'none') {
		        throw new Error('Please use show on visible elements');
		      }
		      if (!(this._isWithContent() && this._isEnabled)) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
		      const shadowRoot = index.findShadowRoot(this._element);
		      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
		      if (showEvent.defaultPrevented || !isInTheDom) {
		        return;
		      } // todo v6 remove this OR make it optional

		      this._disposePopper();
		      const tip = this._getTipElement();
		      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
		      const {
		        container
		      } = this._config;
		      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
		        container.append(tip);
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
		      }
		      this._popper = this._createPopper(tip);
		      tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      const complete = () => {
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));
		        if (this._isHovered === false) {
		          this._leave();
		        }
		        this._isHovered = false;
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    hide() {
		      if (!this._isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDE));
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const tip = this._getTipElement();
		      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      this._activeTrigger[TRIGGER_CLICK] = false;
		      this._activeTrigger[TRIGGER_FOCUS] = false;
		      this._activeTrigger[TRIGGER_HOVER] = false;
		      this._isHovered = null; // it is a trick to support manual triggering

		      const complete = () => {
		        if (this._isWithActiveTrigger()) {
		          return;
		        }
		        if (!this._isHovered) {
		          this._disposePopper();
		        }
		        this._element.removeAttribute('aria-describedby');
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    update() {
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Protected

		    _isWithContent() {
		      return Boolean(this._getTitle());
		    }
		    _getTipElement() {
		      if (!this.tip) {
		        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
		      }
		      return this.tip;
		    }
		    _createTipElement(content) {
		      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6

		      if (!tip) {
		        return null;
		      }
		      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW); // todo: on v6 the following can be achieved with CSS only

		      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
		      const tipId = index.getUID(this.constructor.NAME).toString();
		      tip.setAttribute('id', tipId);
		      if (this._isAnimated()) {
		        tip.classList.add(CLASS_NAME_FADE);
		      }
		      return tip;
		    }
		    setContent(content) {
		      this._newContent = content;
		      if (this._isShown()) {
		        this._disposePopper();
		        this.show();
		      }
		    }
		    _getTemplateFactory(content) {
		      if (this._templateFactory) {
		        this._templateFactory.changeContent(content);
		      } else {
		        this._templateFactory = new TemplateFactory__default.default({
		          ...this._config,
		          // the `content` var has to be after `this._config`
		          // to override config.content in case of popover
		          content,
		          extraClass: this._resolvePossibleFunction(this._config.customClass)
		        });
		      }
		      return this._templateFactory;
		    }
		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
		      };
		    }
		    _getTitle() {
		      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
		    } // Private

		    _initializeOnDelegatedTarget(event) {
		      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
		    }
		    _isAnimated() {
		      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
		    }
		    _isShown() {
		      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
		    }
		    _createPopper(tip) {
		      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
		      const attachment = AttachmentMap[placement.toUpperCase()];
		      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _resolvePossibleFunction(arg) {
		      return typeof arg === 'function' ? arg.call(this._element) : arg;
		    }
		    _getPopperConfig(attachment) {
		      const defaultBsPopperConfig = {
		        placement: attachment,
		        modifiers: [{
		          name: 'flip',
		          options: {
		            fallbackPlacements: this._config.fallbackPlacements
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }, {
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'arrow',
		          options: {
		            element: `.${this.constructor.NAME}-arrow`
		          }
		        }, {
		          name: 'preSetPlacement',
		          enabled: true,
		          phase: 'beforeMain',
		          fn: data => {
		            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
		            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
		            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
		          }
		        }]
		      };
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _setListeners() {
		      const triggers = this._config.trigger.split(' ');
		      for (const trigger of triggers) {
		        if (trigger === 'click') {
		          EventHandler__default.default.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context.toggle();
		          });
		        } else if (trigger !== TRIGGER_MANUAL) {
		          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
		          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
		          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
		            context._enter();
		          });
		          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
		            context._leave();
		          });
		        }
		      }
		      this._hideModalHandler = () => {
		        if (this._element) {
		          this.hide();
		        }
		      };
		      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		    }
		    _fixTitle() {
		      const title = this._element.getAttribute('title');
		      if (!title) {
		        return;
		      }
		      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
		        this._element.setAttribute('aria-label', title);
		      }
		      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility

		      this._element.removeAttribute('title');
		    }
		    _enter() {
		      if (this._isShown() || this._isHovered) {
		        this._isHovered = true;
		        return;
		      }
		      this._isHovered = true;
		      this._setTimeout(() => {
		        if (this._isHovered) {
		          this.show();
		        }
		      }, this._config.delay.show);
		    }
		    _leave() {
		      if (this._isWithActiveTrigger()) {
		        return;
		      }
		      this._isHovered = false;
		      this._setTimeout(() => {
		        if (!this._isHovered) {
		          this.hide();
		        }
		      }, this._config.delay.hide);
		    }
		    _setTimeout(handler, timeout) {
		      clearTimeout(this._timeout);
		      this._timeout = setTimeout(handler, timeout);
		    }
		    _isWithActiveTrigger() {
		      return Object.values(this._activeTrigger).includes(true);
		    }
		    _getConfig(config) {
		      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
		      for (const dataAttribute of Object.keys(dataAttributes)) {
		        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
		          delete dataAttributes[dataAttribute];
		        }
		      }
		      config = {
		        ...dataAttributes,
		        ...(typeof config === 'object' && config ? config : {})
		      };
		      config = this._mergeConfigObj(config);
		      config = this._configAfterMerge(config);
		      this._typeCheckConfig(config);
		      return config;
		    }
		    _configAfterMerge(config) {
		      config.container = config.container === false ? document.body : index.getElement(config.container);
		      if (typeof config.delay === 'number') {
		        config.delay = {
		          show: config.delay,
		          hide: config.delay
		        };
		      }
		      if (typeof config.title === 'number') {
		        config.title = config.title.toString();
		      }
		      if (typeof config.content === 'number') {
		        config.content = config.content.toString();
		      }
		      return config;
		    }
		    _getDelegateConfig() {
		      const config = {};
		      for (const key in this._config) {
		        if (this.constructor.Default[key] !== this._config[key]) {
		          config[key] = this._config[key];
		        }
		      }
		      config.selector = false;
		      config.trigger = 'manual'; // In the future can be replaced with:
		      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
		      // `Object.fromEntries(keysWithDifferentValues)`

		      return config;
		    }
		    _disposePopper() {
		      if (this._popper) {
		        this._popper.destroy();
		        this._popper = null;
		      }
		      if (this.tip) {
		        this.tip.remove();
		        this.tip = null;
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tooltip.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tooltip);
		  return Tooltip;
		});
	} (tooltip$1));

	var tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip$1.exports);

	/*!
	  * Bootstrap popover.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), tooltip$1.exports) ;
		})(commonjsGlobal, function (index, Tooltip) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): popover.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'popover';
		  const SELECTOR_TITLE = '.popover-header';
		  const SELECTOR_CONTENT = '.popover-body';
		  const Default = {
		    ...Tooltip__default.default.Default,
		    content: '',
		    offset: [0, 8],
		    placement: 'right',
		    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
		    trigger: 'click'
		  };
		  const DefaultType = {
		    ...Tooltip__default.default.DefaultType,
		    content: '(null|string|element|function)'
		  };
		  /**
		   * Class definition
		   */

		  class Popover extends Tooltip__default.default {
		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Overrides

		    _isWithContent() {
		      return this._getTitle() || this._getContent();
		    } // Private

		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TITLE]: this._getTitle(),
		        [SELECTOR_CONTENT]: this._getContent()
		      };
		    }
		    _getContent() {
		      return this._resolvePossibleFunction(this._config.content);
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Popover.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Popover);
		  return Popover;
		});
	} (popover$1));

	var popover = popover$1.exports;

	var scrollspy$1 = {exports: {}};

	/*!
	  * Bootstrap scrollspy.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): scrollspy.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'scrollspy';
		  const DATA_KEY = 'bs.scrollspy';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
		  const EVENT_CLICK = `click${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
		  const SELECTOR_TARGET_LINKS = '[href]';
		  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
		  const SELECTOR_NAV_LINKS = '.nav-link';
		  const SELECTOR_NAV_ITEMS = '.nav-item';
		  const SELECTOR_LIST_ITEMS = '.list-group-item';
		  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
		  const SELECTOR_DROPDOWN = '.dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const Default = {
		    offset: null,
		    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: '0px 0px -25%',
		    smoothScroll: false,
		    target: null,
		    threshold: [0.1, 0.5, 1]
		  };
		  const DefaultType = {
		    offset: '(number|null)',
		    // TODO v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: 'string',
		    smoothScroll: 'boolean',
		    target: 'element',
		    threshold: 'array'
		  };
		  /**
		   * Class definition
		   */

		  class ScrollSpy extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
		      this._activeTarget = null;
		      this._observer = null;
		      this._previousScrollData = {
		        visibleEntryTop: 0,
		        parentScrollTop: 0
		      };
		      this.refresh(); // initialize
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    refresh() {
		      this._initializeTargetsAndObservables();
		      this._maybeEnableSmoothScroll();
		      if (this._observer) {
		        this._observer.disconnect();
		      } else {
		        this._observer = this._getNewObserver();
		      }
		      for (const section of this._observableSections.values()) {
		        this._observer.observe(section);
		      }
		    }
		    dispose() {
		      this._observer.disconnect();
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
		      config.target = index.getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

		      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
		      if (typeof config.threshold === 'string') {
		        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
		      }
		      return config;
		    }
		    _maybeEnableSmoothScroll() {
		      if (!this._config.smoothScroll) {
		        return;
		      } // unregister any previous listeners

		      EventHandler__default.default.off(this._config.target, EVENT_CLICK);
		      EventHandler__default.default.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
		        const observableSection = this._observableSections.get(event.target.hash);
		        if (observableSection) {
		          event.preventDefault();
		          const root = this._rootElement || window;
		          const height = observableSection.offsetTop - this._element.offsetTop;
		          if (root.scrollTo) {
		            root.scrollTo({
		              top: height,
		              behavior: 'smooth'
		            });
		            return;
		          } // Chrome 60 doesn't support `scrollTo`

		          root.scrollTop = height;
		        }
		      });
		    }
		    _getNewObserver() {
		      const options = {
		        root: this._rootElement,
		        threshold: this._config.threshold,
		        rootMargin: this._config.rootMargin
		      };
		      return new IntersectionObserver(entries => this._observerCallback(entries), options);
		    } // The logic of selection

		    _observerCallback(entries) {
		      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
		      const activate = entry => {
		        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
		        this._process(targetElement(entry));
		      };
		      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
		      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
		      this._previousScrollData.parentScrollTop = parentScrollTop;
		      for (const entry of entries) {
		        if (!entry.isIntersecting) {
		          this._activeTarget = null;
		          this._clearActiveClass(targetElement(entry));
		          continue;
		        }
		        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

		        if (userScrollsDown && entryIsLowerThanPrevious) {
		          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

		          if (!parentScrollTop) {
		            return;
		          }
		          continue;
		        } // if we are scrolling up, pick the smallest offsetTop

		        if (!userScrollsDown && !entryIsLowerThanPrevious) {
		          activate(entry);
		        }
		      }
		    }
		    _initializeTargetsAndObservables() {
		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      const targetLinks = SelectorEngine__default.default.find(SELECTOR_TARGET_LINKS, this._config.target);
		      for (const anchor of targetLinks) {
		        // ensure that the anchor has an id and is not disabled
		        if (!anchor.hash || index.isDisabled(anchor)) {
		          continue;
		        }
		        const observableSection = SelectorEngine__default.default.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

		        if (index.isVisible(observableSection)) {
		          this._targetLinks.set(anchor.hash, anchor);
		          this._observableSections.set(anchor.hash, observableSection);
		        }
		      }
		    }
		    _process(target) {
		      if (this._activeTarget === target) {
		        return;
		      }
		      this._clearActiveClass(this._config.target);
		      this._activeTarget = target;
		      target.classList.add(CLASS_NAME_ACTIVE);
		      this._activateParents(target);
		      EventHandler__default.default.trigger(this._element, EVENT_ACTIVATE, {
		        relatedTarget: target
		      });
		    }
		    _activateParents(target) {
		      // Activate dropdown parents
		      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
		        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
		        return;
		      }
		      for (const listGroup of SelectorEngine__default.default.parents(target, SELECTOR_NAV_LIST_GROUP)) {
		        // Set triggered links parents as active
		        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
		        for (const item of SelectorEngine__default.default.prev(listGroup, SELECTOR_LINK_ITEMS)) {
		          item.classList.add(CLASS_NAME_ACTIVE);
		        }
		      }
		    }
		    _clearActiveClass(parent) {
		      parent.classList.remove(CLASS_NAME_ACTIVE);
		      const activeNodes = SelectorEngine__default.default.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent);
		      for (const node of activeNodes) {
		        node.classList.remove(CLASS_NAME_ACTIVE);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = ScrollSpy.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const spy of SelectorEngine__default.default.find(SELECTOR_DATA_SPY)) {
		      ScrollSpy.getOrCreateInstance(spy);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(ScrollSpy);
		  return ScrollSpy;
		});
	} (scrollspy$1));

	var scrollspy = scrollspy$1.exports;

	var tab$1 = {exports: {}};

	/*!
	  * Bootstrap tab.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tab.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tab';
		  const DATA_KEY = 'bs.tab';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_DROPDOWN = 'dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
		  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
		  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
		  const SELECTOR_OUTER = '.nav-item, .list-group-item';
		  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

		  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
		  /**
		   * Class definition
		   */

		  class Tab extends BaseComponent__default.default {
		    constructor(element) {
		      super(element);
		      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
		      if (!this._parent) {
		        return; // todo: should Throw exception on v6
		        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
		      } // Set up initial aria attributes

		      this._setInitialAttributes(this._parent, this._getChildren());
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		    } // Getters

		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      // Shows this elem and deactivate the active sibling if exists
		      const innerElem = this._element;
		      if (this._elemIsActive(innerElem)) {
		        return;
		      } // Search for active tab on same parent to deactivate it

		      const active = this._getActiveElem();
		      const hideEvent = active ? EventHandler__default.default.trigger(active, EVENT_HIDE, {
		        relatedTarget: innerElem
		      }) : null;
		      const showEvent = EventHandler__default.default.trigger(innerElem, EVENT_SHOW, {
		        relatedTarget: active
		      });
		      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
		        return;
		      }
		      this._deactivate(active, innerElem);
		      this._activate(innerElem, active);
		    } // Private

		    _activate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.add(CLASS_NAME_ACTIVE);
		      this._activate(index.getElementFromSelector(element)); // Search and activate/show the proper section

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.add(CLASS_NAME_SHOW);
		          return;
		        }
		        element.removeAttribute('tabindex');
		        element.setAttribute('aria-selected', true);
		        this._toggleDropDown(element, true);
		        EventHandler__default.default.trigger(element, EVENT_SHOWN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _deactivate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.remove(CLASS_NAME_ACTIVE);
		      element.blur();
		      this._deactivate(index.getElementFromSelector(element)); // Search and deactivate the shown section too

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.remove(CLASS_NAME_SHOW);
		          return;
		        }
		        element.setAttribute('aria-selected', false);
		        element.setAttribute('tabindex', '-1');
		        this._toggleDropDown(element, false);
		        EventHandler__default.default.trigger(element, EVENT_HIDDEN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _keydown(event) {
		      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
		        return;
		      }
		      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

		      event.preventDefault();
		      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
		      const nextActiveElement = index.getNextActiveElement(this._getChildren().filter(element => !index.isDisabled(element)), event.target, isNext, true);
		      if (nextActiveElement) {
		        nextActiveElement.focus({
		          preventScroll: true
		        });
		        Tab.getOrCreateInstance(nextActiveElement).show();
		      }
		    }
		    _getChildren() {
		      // collection of inner elements
		      return SelectorEngine__default.default.find(SELECTOR_INNER_ELEM, this._parent);
		    }
		    _getActiveElem() {
		      return this._getChildren().find(child => this._elemIsActive(child)) || null;
		    }
		    _setInitialAttributes(parent, children) {
		      this._setAttributeIfNotExists(parent, 'role', 'tablist');
		      for (const child of children) {
		        this._setInitialAttributesOnChild(child);
		      }
		    }
		    _setInitialAttributesOnChild(child) {
		      child = this._getInnerElement(child);
		      const isActive = this._elemIsActive(child);
		      const outerElem = this._getOuterElement(child);
		      child.setAttribute('aria-selected', isActive);
		      if (outerElem !== child) {
		        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
		      }
		      if (!isActive) {
		        child.setAttribute('tabindex', '-1');
		      }
		      this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too

		      this._setInitialAttributesOnTargetPanel(child);
		    }
		    _setInitialAttributesOnTargetPanel(child) {
		      const target = index.getElementFromSelector(child);
		      if (!target) {
		        return;
		      }
		      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
		      if (child.id) {
		        this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
		      }
		    }
		    _toggleDropDown(element, open) {
		      const outerElem = this._getOuterElement(element);
		      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
		        return;
		      }
		      const toggle = (selector, className) => {
		        const element = SelectorEngine__default.default.findOne(selector, outerElem);
		        if (element) {
		          element.classList.toggle(className, open);
		        }
		      };
		      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
		      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
		      outerElem.setAttribute('aria-expanded', open);
		    }
		    _setAttributeIfNotExists(element, attribute, value) {
		      if (!element.hasAttribute(attribute)) {
		        element.setAttribute(attribute, value);
		      }
		    }
		    _elemIsActive(elem) {
		      return elem.classList.contains(CLASS_NAME_ACTIVE);
		    } // Try to get the inner element (usually the .nav-link)

		    _getInnerElement(elem) {
		      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine__default.default.findOne(SELECTOR_INNER_ELEM, elem);
		    } // Try to get the outer element (usually the .nav-item)

		    _getOuterElement(elem) {
		      return elem.closest(SELECTOR_OUTER) || elem;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tab.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    Tab.getOrCreateInstance(this).show();
		  });
		  /**
		   * Initialize on focus
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const element of SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
		      Tab.getOrCreateInstance(element);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tab);
		  return Tab;
		});
	} (tab$1));

	var tab = tab$1.exports;

	var toast$1 = {exports: {}};

	/*!
	  * Bootstrap toast.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): toast.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'toast';
		  const DATA_KEY = 'bs.toast';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
		  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
		  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
		  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const DefaultType = {
		    animation: 'boolean',
		    autohide: 'boolean',
		    delay: 'number'
		  };
		  const Default = {
		    animation: true,
		    autohide: true,
		    delay: 5000
		  };
		  /**
		   * Class definition
		   */

		  class Toast extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._timeout = null;
		      this._hasMouseInteraction = false;
		      this._hasKeyboardInteraction = false;
		      this._setListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._clearTimeout();
		      if (this._config.animation) {
		        this._element.classList.add(CLASS_NAME_FADE);
		      }
		      const complete = () => {
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		        this._maybeScheduleHide();
		      };
		      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated

		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    hide() {
		      if (!this.isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const complete = () => {
		        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated

		        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    dispose() {
		      this._clearTimeout();
		      if (this.isShown()) {
		        this._element.classList.remove(CLASS_NAME_SHOW);
		      }
		      super.dispose();
		    }
		    isShown() {
		      return this._element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _maybeScheduleHide() {
		      if (!this._config.autohide) {
		        return;
		      }
		      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
		        return;
		      }
		      this._timeout = setTimeout(() => {
		        this.hide();
		      }, this._config.delay);
		    }
		    _onInteraction(event, isInteracting) {
		      switch (event.type) {
		        case 'mouseover':
		        case 'mouseout':
		          {
		            this._hasMouseInteraction = isInteracting;
		            break;
		          }
		        case 'focusin':
		        case 'focusout':
		          {
		            this._hasKeyboardInteraction = isInteracting;
		            break;
		          }
		      }
		      if (isInteracting) {
		        this._clearTimeout();
		        return;
		      }
		      const nextElement = event.relatedTarget;
		      if (this._element === nextElement || this._element.contains(nextElement)) {
		        return;
		      }
		      this._maybeScheduleHide();
		    }
		    _setListeners() {
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
		    }
		    _clearTimeout() {
		      clearTimeout(this._timeout);
		      this._timeout = null;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Toast.getOrCreateInstance(this, config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config](this);
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Toast);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Toast);
		  return Toast;
		});
	} (toast$1));

	var toast = toast$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	        element;
	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }
	      element = document.getElementById(id);
	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }
	        element.focus();
	      }
	    }, false);
	  }
	})();

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

	/*!
	 * Splide.js
	 * Version  : 4.1.4
	 * License  : MIT
	 * Copyright: 2022 Naotoshi Fujita
	 */
	var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
	var CREATED = 1;
	var MOUNTED = 2;
	var IDLE = 3;
	var MOVING = 4;
	var SCROLLING = 5;
	var DRAGGING = 6;
	var DESTROYED = 7;
	var STATES = {
	  CREATED: CREATED,
	  MOUNTED: MOUNTED,
	  IDLE: IDLE,
	  MOVING: MOVING,
	  SCROLLING: SCROLLING,
	  DRAGGING: DRAGGING,
	  DESTROYED: DESTROYED
	};
	function empty(array) {
	  array.length = 0;
	}
	function slice(arrayLike, start, end) {
	  return Array.prototype.slice.call(arrayLike, start, end);
	}
	function apply(func) {
	  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
	}
	var nextTick = setTimeout;
	var noop = function noop() {};
	function raf(func) {
	  return requestAnimationFrame(func);
	}
	function typeOf(type, subject) {
	  return typeof subject === type;
	}
	function isObject(subject) {
	  return !isNull(subject) && typeOf("object", subject);
	}
	var isArray = Array.isArray;
	var isFunction = apply(typeOf, "function");
	var isString$1 = apply(typeOf, "string");
	var isUndefined$1 = apply(typeOf, "undefined");
	function isNull(subject) {
	  return subject === null;
	}
	function isHTMLElement(subject) {
	  try {
	    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
	  } catch (e) {
	    return false;
	  }
	}
	function toArray(value) {
	  return isArray(value) ? value : [value];
	}
	function forEach(values, iteratee) {
	  toArray(values).forEach(iteratee);
	}
	function includes(array, value) {
	  return array.indexOf(value) > -1;
	}
	function push(array, items) {
	  array.push.apply(array, toArray(items));
	  return array;
	}
	function toggleClass(elm, classes, add) {
	  if (elm) {
	    forEach(classes, function (name) {
	      if (name) {
	        elm.classList[add ? "add" : "remove"](name);
	      }
	    });
	  }
	}
	function addClass(elm, classes) {
	  toggleClass(elm, isString$1(classes) ? classes.split(" ") : classes, true);
	}
	function append(parent, children) {
	  forEach(children, parent.appendChild.bind(parent));
	}
	function before(nodes, ref) {
	  forEach(nodes, function (node) {
	    var parent = (ref || node).parentNode;
	    if (parent) {
	      parent.insertBefore(node, ref);
	    }
	  });
	}
	function matches(elm, selector) {
	  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
	}
	function children(parent, selector) {
	  var children2 = parent ? slice(parent.children) : [];
	  return selector ? children2.filter(function (child) {
	    return matches(child, selector);
	  }) : children2;
	}
	function child(parent, selector) {
	  return selector ? children(parent, selector)[0] : parent.firstElementChild;
	}
	var ownKeys = Object.keys;
	function forOwn(object, iteratee, right) {
	  if (object) {
	    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function (key) {
	      key !== "__proto__" && iteratee(object[key], key);
	    });
	  }
	  return object;
	}
	function assign(object) {
	  slice(arguments, 1).forEach(function (source) {
	    forOwn(source, function (value, key) {
	      object[key] = source[key];
	    });
	  });
	  return object;
	}
	function merge(object) {
	  slice(arguments, 1).forEach(function (source) {
	    forOwn(source, function (value, key) {
	      if (isArray(value)) {
	        object[key] = value.slice();
	      } else if (isObject(value)) {
	        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
	      } else {
	        object[key] = value;
	      }
	    });
	  });
	  return object;
	}
	function omit(object, keys) {
	  forEach(keys || ownKeys(object), function (key) {
	    delete object[key];
	  });
	}
	function removeAttribute(elms, attrs) {
	  forEach(elms, function (elm) {
	    forEach(attrs, function (attr) {
	      elm && elm.removeAttribute(attr);
	    });
	  });
	}
	function setAttribute(elms, attrs, value) {
	  if (isObject(attrs)) {
	    forOwn(attrs, function (value2, name) {
	      setAttribute(elms, name, value2);
	    });
	  } else {
	    forEach(elms, function (elm) {
	      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
	    });
	  }
	}
	function create(tag, attrs, parent) {
	  var elm = document.createElement(tag);
	  if (attrs) {
	    isString$1(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
	  }
	  parent && append(parent, elm);
	  return elm;
	}
	function style(elm, prop, value) {
	  if (isUndefined$1(value)) {
	    return getComputedStyle(elm)[prop];
	  }
	  if (!isNull(value)) {
	    elm.style[prop] = "" + value;
	  }
	}
	function display(elm, display2) {
	  style(elm, "display", display2);
	}
	function focus(elm) {
	  elm["setActive"] && elm["setActive"]() || elm.focus({
	    preventScroll: true
	  });
	}
	function getAttribute(elm, attr) {
	  return elm.getAttribute(attr);
	}
	function hasClass(elm, className) {
	  return elm && elm.classList.contains(className);
	}
	function rect(target) {
	  return target.getBoundingClientRect();
	}
	function remove(nodes) {
	  forEach(nodes, function (node) {
	    if (node && node.parentNode) {
	      node.parentNode.removeChild(node);
	    }
	  });
	}
	function parseHtml(html) {
	  return child(new DOMParser().parseFromString(html, "text/html").body);
	}
	function prevent(e, stopPropagation) {
	  e.preventDefault();
	  if (stopPropagation) {
	    e.stopPropagation();
	    e.stopImmediatePropagation();
	  }
	}
	function query(parent, selector) {
	  return parent && parent.querySelector(selector);
	}
	function queryAll(parent, selector) {
	  return selector ? slice(parent.querySelectorAll(selector)) : [];
	}
	function removeClass(elm, classes) {
	  toggleClass(elm, classes, false);
	}
	function timeOf(e) {
	  return e.timeStamp;
	}
	function unit(value) {
	  return isString$1(value) ? value : value ? value + "px" : "";
	}
	var PROJECT_CODE = "splide";
	var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
	function assert(condition, message) {
	  if (!condition) {
	    throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
	  }
	}
	var min = Math.min,
	  max = Math.max,
	  floor = Math.floor,
	  ceil = Math.ceil,
	  abs = Math.abs;
	function approximatelyEqual(x, y, epsilon) {
	  return abs(x - y) < epsilon;
	}
	function between(number, x, y, exclusive) {
	  var minimum = min(x, y);
	  var maximum = max(x, y);
	  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
	}
	function clamp(number, x, y) {
	  var minimum = min(x, y);
	  var maximum = max(x, y);
	  return min(max(minimum, number), maximum);
	}
	function sign(x) {
	  return +(x > 0) - +(x < 0);
	}
	function format(string, replacements) {
	  forEach(replacements, function (replacement) {
	    string = string.replace("%s", "" + replacement);
	  });
	  return string;
	}
	function pad(number) {
	  return number < 10 ? "0" + number : "" + number;
	}
	var ids = {};
	function uniqueId(prefix) {
	  return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
	}
	function EventBinder() {
	  var listeners = [];
	  function bind(targets, events, callback, options) {
	    forEachEvent(targets, events, function (target, event, namespace) {
	      var isEventTarget = "addEventListener" in target;
	      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
	      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
	      listeners.push([target, event, namespace, callback, remover]);
	    });
	  }
	  function unbind(targets, events, callback) {
	    forEachEvent(targets, events, function (target, event, namespace) {
	      listeners = listeners.filter(function (listener) {
	        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
	          listener[4]();
	          return false;
	        }
	        return true;
	      });
	    });
	  }
	  function dispatch(target, type, detail) {
	    var e;
	    var bubbles = true;
	    if (typeof CustomEvent === "function") {
	      e = new CustomEvent(type, {
	        bubbles: bubbles,
	        detail: detail
	      });
	    } else {
	      e = document.createEvent("CustomEvent");
	      e.initCustomEvent(type, bubbles, false, detail);
	    }
	    target.dispatchEvent(e);
	    return e;
	  }
	  function forEachEvent(targets, events, iteratee) {
	    forEach(targets, function (target) {
	      target && forEach(events, function (events2) {
	        events2.split(" ").forEach(function (eventNS) {
	          var fragment = eventNS.split(".");
	          iteratee(target, fragment[0], fragment[1]);
	        });
	      });
	    });
	  }
	  function destroy() {
	    listeners.forEach(function (data) {
	      data[4]();
	    });
	    empty(listeners);
	  }
	  return {
	    bind: bind,
	    unbind: unbind,
	    dispatch: dispatch,
	    destroy: destroy
	  };
	}
	var EVENT_MOUNTED = "mounted";
	var EVENT_READY = "ready";
	var EVENT_MOVE = "move";
	var EVENT_MOVED = "moved";
	var EVENT_CLICK = "click";
	var EVENT_ACTIVE = "active";
	var EVENT_INACTIVE = "inactive";
	var EVENT_VISIBLE = "visible";
	var EVENT_HIDDEN = "hidden";
	var EVENT_REFRESH = "refresh";
	var EVENT_UPDATED = "updated";
	var EVENT_RESIZE = "resize";
	var EVENT_RESIZED = "resized";
	var EVENT_DRAG = "drag";
	var EVENT_DRAGGING = "dragging";
	var EVENT_DRAGGED = "dragged";
	var EVENT_SCROLL = "scroll";
	var EVENT_SCROLLED = "scrolled";
	var EVENT_OVERFLOW = "overflow";
	var EVENT_DESTROY = "destroy";
	var EVENT_ARROWS_MOUNTED = "arrows:mounted";
	var EVENT_ARROWS_UPDATED = "arrows:updated";
	var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
	var EVENT_PAGINATION_UPDATED = "pagination:updated";
	var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
	var EVENT_AUTOPLAY_PLAY = "autoplay:play";
	var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
	var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
	var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
	var EVENT_SLIDE_KEYDOWN = "sk";
	var EVENT_SHIFTED = "sh";
	var EVENT_END_INDEX_CHANGED = "ei";
	function EventInterface(Splide2) {
	  var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
	  var binder = EventBinder();
	  function on(events, callback) {
	    binder.bind(bus, toArray(events).join(" "), function (e) {
	      callback.apply(callback, isArray(e.detail) ? e.detail : []);
	    });
	  }
	  function emit(event) {
	    binder.dispatch(bus, event, slice(arguments, 1));
	  }
	  if (Splide2) {
	    Splide2.event.on(EVENT_DESTROY, binder.destroy);
	  }
	  return assign(binder, {
	    bus: bus,
	    on: on,
	    off: apply(binder.unbind, bus),
	    emit: emit
	  });
	}
	function RequestInterval(interval, onInterval, onUpdate, limit) {
	  var now = Date.now;
	  var startTime;
	  var rate = 0;
	  var id;
	  var paused = true;
	  var count = 0;
	  function update() {
	    if (!paused) {
	      rate = interval ? min((now() - startTime) / interval, 1) : 1;
	      onUpdate && onUpdate(rate);
	      if (rate >= 1) {
	        onInterval();
	        startTime = now();
	        if (limit && ++count >= limit) {
	          return pause();
	        }
	      }
	      id = raf(update);
	    }
	  }
	  function start(resume) {
	    resume || cancel();
	    startTime = now() - (resume ? rate * interval : 0);
	    paused = false;
	    id = raf(update);
	  }
	  function pause() {
	    paused = true;
	  }
	  function rewind() {
	    startTime = now();
	    rate = 0;
	    if (onUpdate) {
	      onUpdate(rate);
	    }
	  }
	  function cancel() {
	    id && cancelAnimationFrame(id);
	    rate = 0;
	    id = 0;
	    paused = true;
	  }
	  function set(time) {
	    interval = time;
	  }
	  function isPaused() {
	    return paused;
	  }
	  return {
	    start: start,
	    rewind: rewind,
	    pause: pause,
	    cancel: cancel,
	    set: set,
	    isPaused: isPaused
	  };
	}
	function State(initialState) {
	  var state = initialState;
	  function set(value) {
	    state = value;
	  }
	  function is(states) {
	    return includes(toArray(states), state);
	  }
	  return {
	    set: set,
	    is: is
	  };
	}
	function Throttle(func, duration) {
	  var interval = RequestInterval(duration || 0, func, null, 1);
	  return function () {
	    interval.isPaused() && interval.start();
	  };
	}
	function Media(Splide2, Components2, options) {
	  var state = Splide2.state;
	  var breakpoints = options.breakpoints || {};
	  var reducedMotion = options.reducedMotion || {};
	  var binder = EventBinder();
	  var queries = [];
	  function setup() {
	    var isMin = options.mediaQuery === "min";
	    ownKeys(breakpoints).sort(function (n, m) {
	      return isMin ? +n - +m : +m - +n;
	    }).forEach(function (key) {
	      register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
	    });
	    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
	    update();
	  }
	  function destroy(completely) {
	    if (completely) {
	      binder.destroy();
	    }
	  }
	  function register(options2, query) {
	    var queryList = matchMedia(query);
	    binder.bind(queryList, "change", update);
	    queries.push([options2, queryList]);
	  }
	  function update() {
	    var destroyed = state.is(DESTROYED);
	    var direction = options.direction;
	    var merged = queries.reduce(function (merged2, entry) {
	      return merge(merged2, entry[1].matches ? entry[0] : {});
	    }, {});
	    omit(options);
	    set(merged);
	    if (options.destroy) {
	      Splide2.destroy(options.destroy === "completely");
	    } else if (destroyed) {
	      destroy(true);
	      Splide2.mount();
	    } else {
	      direction !== options.direction && Splide2.refresh();
	    }
	  }
	  function reduce(enable) {
	    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
	      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
	    }
	  }
	  function set(opts, base, notify) {
	    merge(options, opts);
	    base && merge(Object.getPrototypeOf(options), opts);
	    if (notify || !state.is(CREATED)) {
	      Splide2.emit(EVENT_UPDATED, options);
	    }
	  }
	  return {
	    setup: setup,
	    destroy: destroy,
	    reduce: reduce,
	    set: set
	  };
	}
	var ARROW = "Arrow";
	var ARROW_LEFT = ARROW + "Left";
	var ARROW_RIGHT = ARROW + "Right";
	var ARROW_UP = ARROW + "Up";
	var ARROW_DOWN = ARROW + "Down";
	var RTL = "rtl";
	var TTB = "ttb";
	var ORIENTATION_MAP = {
	  width: ["height"],
	  left: ["top", "right"],
	  right: ["bottom", "left"],
	  x: ["y"],
	  X: ["Y"],
	  Y: ["X"],
	  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
	  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
	};
	function Direction(Splide2, Components2, options) {
	  function resolve(prop, axisOnly, direction) {
	    direction = direction || options.direction;
	    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
	    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
	      var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
	      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
	    });
	  }
	  function orient(value) {
	    return value * (options.direction === RTL ? 1 : -1);
	  }
	  return {
	    resolve: resolve,
	    orient: orient
	  };
	}
	var ROLE = "role";
	var TAB_INDEX = "tabindex";
	var DISABLED = "disabled";
	var ARIA_PREFIX = "aria-";
	var ARIA_CONTROLS = ARIA_PREFIX + "controls";
	var ARIA_CURRENT = ARIA_PREFIX + "current";
	var ARIA_SELECTED = ARIA_PREFIX + "selected";
	var ARIA_LABEL = ARIA_PREFIX + "label";
	var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
	var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
	var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
	var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
	var ARIA_LIVE = ARIA_PREFIX + "live";
	var ARIA_BUSY = ARIA_PREFIX + "busy";
	var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
	var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
	var CLASS_PREFIX = PROJECT_CODE + "__";
	var STATUS_CLASS_PREFIX = "is-";
	var CLASS_ROOT = PROJECT_CODE;
	var CLASS_TRACK = CLASS_PREFIX + "track";
	var CLASS_LIST = CLASS_PREFIX + "list";
	var CLASS_SLIDE = CLASS_PREFIX + "slide";
	var CLASS_CLONE = CLASS_SLIDE + "--clone";
	var CLASS_CONTAINER = CLASS_SLIDE + "__container";
	var CLASS_ARROWS = CLASS_PREFIX + "arrows";
	var CLASS_ARROW = CLASS_PREFIX + "arrow";
	var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
	var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
	var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
	var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
	var CLASS_PROGRESS = CLASS_PREFIX + "progress";
	var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
	var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
	var CLASS_SPINNER = CLASS_PREFIX + "spinner";
	var CLASS_SR = CLASS_PREFIX + "sr";
	var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
	var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
	var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
	var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
	var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
	var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
	var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
	var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
	var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
	var CLASSES = {
	  slide: CLASS_SLIDE,
	  clone: CLASS_CLONE,
	  arrows: CLASS_ARROWS,
	  arrow: CLASS_ARROW,
	  prev: CLASS_ARROW_PREV,
	  next: CLASS_ARROW_NEXT,
	  pagination: CLASS_PAGINATION,
	  page: CLASS_PAGINATION_PAGE,
	  spinner: CLASS_SPINNER
	};
	function closest(from, selector) {
	  if (isFunction(from.closest)) {
	    return from.closest(selector);
	  }
	  var elm = from;
	  while (elm && elm.nodeType === 1) {
	    if (matches(elm, selector)) {
	      break;
	    }
	    elm = elm.parentElement;
	  }
	  return elm;
	}
	var FRICTION = 5;
	var LOG_INTERVAL = 200;
	var POINTER_DOWN_EVENTS = "touchstart mousedown";
	var POINTER_MOVE_EVENTS = "touchmove mousemove";
	var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
	function Elements(Splide2, Components2, options) {
	  var _EventInterface = EventInterface(Splide2),
	    on = _EventInterface.on,
	    bind = _EventInterface.bind;
	  var root = Splide2.root;
	  var i18n = options.i18n;
	  var elements = {};
	  var slides = [];
	  var rootClasses = [];
	  var trackClasses = [];
	  var track;
	  var list;
	  var isUsingKey;
	  function setup() {
	    collect();
	    init();
	    update();
	  }
	  function mount() {
	    on(EVENT_REFRESH, destroy);
	    on(EVENT_REFRESH, setup);
	    on(EVENT_UPDATED, update);
	    bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
	      isUsingKey = e.type === "keydown";
	    }, {
	      capture: true
	    });
	    bind(root, "focusin", function () {
	      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
	    });
	  }
	  function destroy(completely) {
	    var attrs = ALL_ATTRIBUTES.concat("style");
	    empty(slides);
	    removeClass(root, rootClasses);
	    removeClass(track, trackClasses);
	    removeAttribute([track, list], attrs);
	    removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
	  }
	  function update() {
	    removeClass(root, rootClasses);
	    removeClass(track, trackClasses);
	    rootClasses = getClasses(CLASS_ROOT);
	    trackClasses = getClasses(CLASS_TRACK);
	    addClass(root, rootClasses);
	    addClass(track, trackClasses);
	    setAttribute(root, ARIA_LABEL, options.label);
	    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
	  }
	  function collect() {
	    track = find("." + CLASS_TRACK);
	    list = child(track, "." + CLASS_LIST);
	    assert(track && list, "A track/list element is missing.");
	    push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
	    forOwn({
	      arrows: CLASS_ARROWS,
	      pagination: CLASS_PAGINATION,
	      prev: CLASS_ARROW_PREV,
	      next: CLASS_ARROW_NEXT,
	      bar: CLASS_PROGRESS_BAR,
	      toggle: CLASS_TOGGLE
	    }, function (className, key) {
	      elements[key] = find("." + className);
	    });
	    assign(elements, {
	      root: root,
	      track: track,
	      list: list,
	      slides: slides
	    });
	  }
	  function init() {
	    var id = root.id || uniqueId(PROJECT_CODE);
	    var role = options.role;
	    root.id = id;
	    track.id = track.id || id + "-track";
	    list.id = list.id || id + "-list";
	    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
	      setAttribute(root, ROLE, role);
	    }
	    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
	    setAttribute(list, ROLE, "presentation");
	  }
	  function find(selector) {
	    var elm = query(root, selector);
	    return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
	  }
	  function getClasses(base) {
	    return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
	  }
	  return assign(elements, {
	    setup: setup,
	    mount: mount,
	    destroy: destroy
	  });
	}
	var SLIDE = "slide";
	var LOOP = "loop";
	var FADE = "fade";
	function Slide$1(Splide2, index, slideIndex, slide) {
	  var event = EventInterface(Splide2);
	  var on = event.on,
	    emit = event.emit,
	    bind = event.bind;
	  var Components = Splide2.Components,
	    root = Splide2.root,
	    options = Splide2.options;
	  var isNavigation = options.isNavigation,
	    updateOnMove = options.updateOnMove,
	    i18n = options.i18n,
	    pagination = options.pagination,
	    slideFocus = options.slideFocus;
	  var resolve = Components.Direction.resolve;
	  var styles = getAttribute(slide, "style");
	  var label = getAttribute(slide, ARIA_LABEL);
	  var isClone = slideIndex > -1;
	  var container = child(slide, "." + CLASS_CONTAINER);
	  var destroyed;
	  function mount() {
	    if (!isClone) {
	      slide.id = root.id + "-slide" + pad(index + 1);
	      setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
	      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
	      setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
	    }
	    listen();
	  }
	  function listen() {
	    bind(slide, "click", apply(emit, EVENT_CLICK, self));
	    bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
	    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
	    on(EVENT_NAVIGATION_MOUNTED, initNavigation);
	    if (updateOnMove) {
	      on(EVENT_MOVE, onMove);
	    }
	  }
	  function destroy() {
	    destroyed = true;
	    event.destroy();
	    removeClass(slide, STATUS_CLASSES);
	    removeAttribute(slide, ALL_ATTRIBUTES);
	    setAttribute(slide, "style", styles);
	    setAttribute(slide, ARIA_LABEL, label || "");
	  }
	  function initNavigation() {
	    var controls = Splide2.splides.map(function (target) {
	      var Slide2 = target.splide.Components.Slides.getAt(index);
	      return Slide2 ? Slide2.slide.id : "";
	    }).join(" ");
	    setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
	    setAttribute(slide, ARIA_CONTROLS, controls);
	    setAttribute(slide, ROLE, slideFocus ? "button" : "");
	    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
	  }
	  function onMove() {
	    if (!destroyed) {
	      update();
	    }
	  }
	  function update() {
	    if (!destroyed) {
	      var curr = Splide2.index;
	      updateActivity();
	      updateVisibility();
	      toggleClass(slide, CLASS_PREV, index === curr - 1);
	      toggleClass(slide, CLASS_NEXT, index === curr + 1);
	    }
	  }
	  function updateActivity() {
	    var active = isActive();
	    if (active !== hasClass(slide, CLASS_ACTIVE)) {
	      toggleClass(slide, CLASS_ACTIVE, active);
	      setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
	      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
	    }
	  }
	  function updateVisibility() {
	    var visible = isVisible();
	    var hidden = !visible && (!isActive() || isClone);
	    if (!Splide2.state.is([MOVING, SCROLLING])) {
	      setAttribute(slide, ARIA_HIDDEN, hidden || "");
	    }
	    setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
	    if (slideFocus) {
	      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
	    }
	    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
	      toggleClass(slide, CLASS_VISIBLE, visible);
	      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
	    }
	    if (!visible && document.activeElement === slide) {
	      var Slide2 = Components.Slides.getAt(Splide2.index);
	      Slide2 && focus(Slide2.slide);
	    }
	  }
	  function style$1(prop, value, useContainer) {
	    style(useContainer && container || slide, prop, value);
	  }
	  function isActive() {
	    var curr = Splide2.index;
	    return curr === index || options.cloneStatus && curr === slideIndex;
	  }
	  function isVisible() {
	    if (Splide2.is(FADE)) {
	      return isActive();
	    }
	    var trackRect = rect(Components.Elements.track);
	    var slideRect = rect(slide);
	    var left = resolve("left", true);
	    var right = resolve("right", true);
	    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
	  }
	  function isWithin(from, distance) {
	    var diff = abs(from - index);
	    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
	      diff = min(diff, Splide2.length - diff);
	    }
	    return diff <= distance;
	  }
	  var self = {
	    index: index,
	    slideIndex: slideIndex,
	    slide: slide,
	    container: container,
	    isClone: isClone,
	    mount: mount,
	    destroy: destroy,
	    update: update,
	    style: style$1,
	    isWithin: isWithin
	  };
	  return self;
	}
	function Slides(Splide2, Components2, options) {
	  var _EventInterface2 = EventInterface(Splide2),
	    on = _EventInterface2.on,
	    emit = _EventInterface2.emit,
	    bind = _EventInterface2.bind;
	  var _Components2$Elements = Components2.Elements,
	    slides = _Components2$Elements.slides,
	    list = _Components2$Elements.list;
	  var Slides2 = [];
	  function mount() {
	    init();
	    on(EVENT_REFRESH, destroy);
	    on(EVENT_REFRESH, init);
	  }
	  function init() {
	    slides.forEach(function (slide, index) {
	      register(slide, index, -1);
	    });
	  }
	  function destroy() {
	    forEach$1(function (Slide2) {
	      Slide2.destroy();
	    });
	    empty(Slides2);
	  }
	  function update() {
	    forEach$1(function (Slide2) {
	      Slide2.update();
	    });
	  }
	  function register(slide, index, slideIndex) {
	    var object = Slide$1(Splide2, index, slideIndex, slide);
	    object.mount();
	    Slides2.push(object);
	    Slides2.sort(function (Slide1, Slide2) {
	      return Slide1.index - Slide2.index;
	    });
	  }
	  function get(excludeClones) {
	    return excludeClones ? filter(function (Slide2) {
	      return !Slide2.isClone;
	    }) : Slides2;
	  }
	  function getIn(page) {
	    var Controller = Components2.Controller;
	    var index = Controller.toIndex(page);
	    var max = Controller.hasFocus() ? 1 : options.perPage;
	    return filter(function (Slide2) {
	      return between(Slide2.index, index, index + max - 1);
	    });
	  }
	  function getAt(index) {
	    return filter(index)[0];
	  }
	  function add(items, index) {
	    forEach(items, function (slide) {
	      if (isString$1(slide)) {
	        slide = parseHtml(slide);
	      }
	      if (isHTMLElement(slide)) {
	        var ref = slides[index];
	        ref ? before(slide, ref) : append(list, slide);
	        addClass(slide, options.classes.slide);
	        observeImages(slide, apply(emit, EVENT_RESIZE));
	      }
	    });
	    emit(EVENT_REFRESH);
	  }
	  function remove$1(matcher) {
	    remove(filter(matcher).map(function (Slide2) {
	      return Slide2.slide;
	    }));
	    emit(EVENT_REFRESH);
	  }
	  function forEach$1(iteratee, excludeClones) {
	    get(excludeClones).forEach(iteratee);
	  }
	  function filter(matcher) {
	    return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
	      return isString$1(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
	    });
	  }
	  function style(prop, value, useContainer) {
	    forEach$1(function (Slide2) {
	      Slide2.style(prop, value, useContainer);
	    });
	  }
	  function observeImages(elm, callback) {
	    var images = queryAll(elm, "img");
	    var length = images.length;
	    if (length) {
	      images.forEach(function (img) {
	        bind(img, "load error", function () {
	          if (! --length) {
	            callback();
	          }
	        });
	      });
	    } else {
	      callback();
	    }
	  }
	  function getLength(excludeClones) {
	    return excludeClones ? slides.length : Slides2.length;
	  }
	  function isEnough() {
	    return Slides2.length > options.perPage;
	  }
	  return {
	    mount: mount,
	    destroy: destroy,
	    update: update,
	    register: register,
	    get: get,
	    getIn: getIn,
	    getAt: getAt,
	    add: add,
	    remove: remove$1,
	    forEach: forEach$1,
	    filter: filter,
	    style: style,
	    getLength: getLength,
	    isEnough: isEnough
	  };
	}
	function Layout(Splide2, Components2, options) {
	  var _EventInterface3 = EventInterface(Splide2),
	    on = _EventInterface3.on,
	    bind = _EventInterface3.bind,
	    emit = _EventInterface3.emit;
	  var Slides = Components2.Slides;
	  var resolve = Components2.Direction.resolve;
	  var _Components2$Elements2 = Components2.Elements,
	    root = _Components2$Elements2.root,
	    track = _Components2$Elements2.track,
	    list = _Components2$Elements2.list;
	  var getAt = Slides.getAt,
	    styleSlides = Slides.style;
	  var vertical;
	  var rootRect;
	  var overflow;
	  function mount() {
	    init();
	    bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
	    on([EVENT_UPDATED, EVENT_REFRESH], init);
	    on(EVENT_RESIZE, resize);
	  }
	  function init() {
	    vertical = options.direction === TTB;
	    style(root, "maxWidth", unit(options.width));
	    style(track, resolve("paddingLeft"), cssPadding(false));
	    style(track, resolve("paddingRight"), cssPadding(true));
	    resize(true);
	  }
	  function resize(force) {
	    var newRect = rect(root);
	    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
	      style(track, "height", cssTrackHeight());
	      styleSlides(resolve("marginRight"), unit(options.gap));
	      styleSlides("width", cssSlideWidth());
	      styleSlides("height", cssSlideHeight(), true);
	      rootRect = newRect;
	      emit(EVENT_RESIZED);
	      if (overflow !== (overflow = isOverflow())) {
	        toggleClass(root, CLASS_OVERFLOW, overflow);
	        emit(EVENT_OVERFLOW, overflow);
	      }
	    }
	  }
	  function cssPadding(right) {
	    var padding = options.padding;
	    var prop = resolve(right ? "right" : "left");
	    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
	  }
	  function cssTrackHeight() {
	    var height = "";
	    if (vertical) {
	      height = cssHeight();
	      assert(height, "height or heightRatio is missing.");
	      height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
	    }
	    return height;
	  }
	  function cssHeight() {
	    return unit(options.height || rect(list).width * options.heightRatio);
	  }
	  function cssSlideWidth() {
	    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
	  }
	  function cssSlideHeight() {
	    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
	  }
	  function cssSlideSize() {
	    var gap = unit(options.gap);
	    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
	  }
	  function listSize() {
	    return rect(list)[resolve("width")];
	  }
	  function slideSize(index, withoutGap) {
	    var Slide = getAt(index || 0);
	    return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
	  }
	  function totalSize(index, withoutGap) {
	    var Slide = getAt(index);
	    if (Slide) {
	      var right = rect(Slide.slide)[resolve("right")];
	      var left = rect(list)[resolve("left")];
	      return abs(right - left) + (withoutGap ? 0 : getGap());
	    }
	    return 0;
	  }
	  function sliderSize(withoutGap) {
	    return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
	  }
	  function getGap() {
	    var Slide = getAt(0);
	    return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
	  }
	  function getPadding(right) {
	    return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
	  }
	  function isOverflow() {
	    return Splide2.is(FADE) || sliderSize(true) > listSize();
	  }
	  return {
	    mount: mount,
	    resize: resize,
	    listSize: listSize,
	    slideSize: slideSize,
	    sliderSize: sliderSize,
	    totalSize: totalSize,
	    getPadding: getPadding,
	    isOverflow: isOverflow
	  };
	}
	var MULTIPLIER = 2;
	function Clones(Splide2, Components2, options) {
	  var event = EventInterface(Splide2);
	  var on = event.on;
	  var Elements = Components2.Elements,
	    Slides = Components2.Slides;
	  var resolve = Components2.Direction.resolve;
	  var clones = [];
	  var cloneCount;
	  function mount() {
	    on(EVENT_REFRESH, remount);
	    on([EVENT_UPDATED, EVENT_RESIZE], observe);
	    if (cloneCount = computeCloneCount()) {
	      generate(cloneCount);
	      Components2.Layout.resize(true);
	    }
	  }
	  function remount() {
	    destroy();
	    mount();
	  }
	  function destroy() {
	    remove(clones);
	    empty(clones);
	    event.destroy();
	  }
	  function observe() {
	    var count = computeCloneCount();
	    if (cloneCount !== count) {
	      if (cloneCount < count || !count) {
	        event.emit(EVENT_REFRESH);
	      }
	    }
	  }
	  function generate(count) {
	    var slides = Slides.get().slice();
	    var length = slides.length;
	    if (length) {
	      while (slides.length < count) {
	        push(slides, slides);
	      }
	      push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
	        var isHead = index < count;
	        var clone = cloneDeep(Slide.slide, index);
	        isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
	        push(clones, clone);
	        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
	      });
	    }
	  }
	  function cloneDeep(elm, index) {
	    var clone = elm.cloneNode(true);
	    addClass(clone, options.classes.clone);
	    clone.id = Splide2.root.id + "-clone" + pad(index + 1);
	    return clone;
	  }
	  function computeCloneCount() {
	    var clones2 = options.clones;
	    if (!Splide2.is(LOOP)) {
	      clones2 = 0;
	    } else if (isUndefined$1(clones2)) {
	      var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
	      var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
	      clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
	    }
	    return clones2;
	  }
	  return {
	    mount: mount,
	    destroy: destroy
	  };
	}
	function Move(Splide2, Components2, options) {
	  var _EventInterface4 = EventInterface(Splide2),
	    on = _EventInterface4.on,
	    emit = _EventInterface4.emit;
	  var set = Splide2.state.set;
	  var _Components2$Layout = Components2.Layout,
	    slideSize = _Components2$Layout.slideSize,
	    getPadding = _Components2$Layout.getPadding,
	    totalSize = _Components2$Layout.totalSize,
	    listSize = _Components2$Layout.listSize,
	    sliderSize = _Components2$Layout.sliderSize;
	  var _Components2$Directio = Components2.Direction,
	    resolve = _Components2$Directio.resolve,
	    orient = _Components2$Directio.orient;
	  var _Components2$Elements3 = Components2.Elements,
	    list = _Components2$Elements3.list,
	    track = _Components2$Elements3.track;
	  var Transition;
	  function mount() {
	    Transition = Components2.Transition;
	    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
	  }
	  function reposition() {
	    if (!Components2.Controller.isBusy()) {
	      Components2.Scroll.cancel();
	      jump(Splide2.index);
	      Components2.Slides.update();
	    }
	  }
	  function move(dest, index, prev, callback) {
	    if (dest !== index && canShift(dest > prev)) {
	      cancel();
	      translate(shift(getPosition(), dest > prev), true);
	    }
	    set(MOVING);
	    emit(EVENT_MOVE, index, prev, dest);
	    Transition.start(index, function () {
	      set(IDLE);
	      emit(EVENT_MOVED, index, prev, dest);
	      callback && callback();
	    });
	  }
	  function jump(index) {
	    translate(toPosition(index, true));
	  }
	  function translate(position, preventLoop) {
	    if (!Splide2.is(FADE)) {
	      var destination = preventLoop ? position : loop(position);
	      style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
	      position !== destination && emit(EVENT_SHIFTED);
	    }
	  }
	  function loop(position) {
	    if (Splide2.is(LOOP)) {
	      var index = toIndex(position);
	      var exceededMax = index > Components2.Controller.getEnd();
	      var exceededMin = index < 0;
	      if (exceededMin || exceededMax) {
	        position = shift(position, exceededMax);
	      }
	    }
	    return position;
	  }
	  function shift(position, backwards) {
	    var excess = position - getLimit(backwards);
	    var size = sliderSize();
	    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
	    return position;
	  }
	  function cancel() {
	    translate(getPosition(), true);
	    Transition.cancel();
	  }
	  function toIndex(position) {
	    var Slides = Components2.Slides.get();
	    var index = 0;
	    var minDistance = Infinity;
	    for (var i = 0; i < Slides.length; i++) {
	      var slideIndex = Slides[i].index;
	      var distance = abs(toPosition(slideIndex, true) - position);
	      if (distance <= minDistance) {
	        minDistance = distance;
	        index = slideIndex;
	      } else {
	        break;
	      }
	    }
	    return index;
	  }
	  function toPosition(index, trimming) {
	    var position = orient(totalSize(index - 1) - offset(index));
	    return trimming ? trim(position) : position;
	  }
	  function getPosition() {
	    var left = resolve("left");
	    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
	  }
	  function trim(position) {
	    if (options.trimSpace && Splide2.is(SLIDE)) {
	      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
	    }
	    return position;
	  }
	  function offset(index) {
	    var focus = options.focus;
	    return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
	  }
	  function getLimit(max) {
	    return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
	  }
	  function canShift(backwards) {
	    var shifted = orient(shift(getPosition(), backwards));
	    return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
	  }
	  function exceededLimit(max, position) {
	    position = isUndefined$1(position) ? getPosition() : position;
	    var exceededMin = max !== true && orient(position) < orient(getLimit(false));
	    var exceededMax = max !== false && orient(position) > orient(getLimit(true));
	    return exceededMin || exceededMax;
	  }
	  return {
	    mount: mount,
	    move: move,
	    jump: jump,
	    translate: translate,
	    shift: shift,
	    cancel: cancel,
	    toIndex: toIndex,
	    toPosition: toPosition,
	    getPosition: getPosition,
	    getLimit: getLimit,
	    exceededLimit: exceededLimit,
	    reposition: reposition
	  };
	}
	function Controller(Splide2, Components2, options) {
	  var _EventInterface5 = EventInterface(Splide2),
	    on = _EventInterface5.on,
	    emit = _EventInterface5.emit;
	  var Move = Components2.Move;
	  var getPosition = Move.getPosition,
	    getLimit = Move.getLimit,
	    toPosition = Move.toPosition;
	  var _Components2$Slides = Components2.Slides,
	    isEnough = _Components2$Slides.isEnough,
	    getLength = _Components2$Slides.getLength;
	  var omitEnd = options.omitEnd;
	  var isLoop = Splide2.is(LOOP);
	  var isSlide = Splide2.is(SLIDE);
	  var getNext = apply(getAdjacent, false);
	  var getPrev = apply(getAdjacent, true);
	  var currIndex = options.start || 0;
	  var endIndex;
	  var prevIndex = currIndex;
	  var slideCount;
	  var perMove;
	  var perPage;
	  function mount() {
	    init();
	    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
	    on(EVENT_RESIZED, onResized);
	  }
	  function init() {
	    slideCount = getLength(true);
	    perMove = options.perMove;
	    perPage = options.perPage;
	    endIndex = getEnd();
	    var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
	    if (index !== currIndex) {
	      currIndex = index;
	      Move.reposition();
	    }
	  }
	  function onResized() {
	    if (endIndex !== getEnd()) {
	      emit(EVENT_END_INDEX_CHANGED);
	    }
	  }
	  function go(control, allowSameIndex, callback) {
	    if (!isBusy()) {
	      var dest = parse(control);
	      var index = loop(dest);
	      if (index > -1 && (allowSameIndex || index !== currIndex)) {
	        setIndex(index);
	        Move.move(dest, index, prevIndex, callback);
	      }
	    }
	  }
	  function scroll(destination, duration, snap, callback) {
	    Components2.Scroll.scroll(destination, duration, snap, function () {
	      var index = loop(Move.toIndex(getPosition()));
	      setIndex(omitEnd ? min(index, endIndex) : index);
	      callback && callback();
	    });
	  }
	  function parse(control) {
	    var index = currIndex;
	    if (isString$1(control)) {
	      var _ref = control.match(/([+\-<>])(\d+)?/) || [],
	        indicator = _ref[1],
	        number = _ref[2];
	      if (indicator === "+" || indicator === "-") {
	        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
	      } else if (indicator === ">") {
	        index = number ? toIndex(+number) : getNext(true);
	      } else if (indicator === "<") {
	        index = getPrev(true);
	      }
	    } else {
	      index = isLoop ? control : clamp(control, 0, endIndex);
	    }
	    return index;
	  }
	  function getAdjacent(prev, destination) {
	    var number = perMove || (hasFocus() ? 1 : perPage);
	    var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
	    if (dest === -1 && isSlide) {
	      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
	        return prev ? 0 : endIndex;
	      }
	    }
	    return destination ? dest : loop(dest);
	  }
	  function computeDestIndex(dest, from, snapPage) {
	    if (isEnough() || hasFocus()) {
	      var index = computeMovableDestIndex(dest);
	      if (index !== dest) {
	        from = dest;
	        dest = index;
	        snapPage = false;
	      }
	      if (dest < 0 || dest > endIndex) {
	        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
	          dest = toIndex(toPage(dest));
	        } else {
	          if (isLoop) {
	            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
	          } else if (options.rewind) {
	            dest = dest < 0 ? endIndex : 0;
	          } else {
	            dest = -1;
	          }
	        }
	      } else {
	        if (snapPage && dest !== from) {
	          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
	        }
	      }
	    } else {
	      dest = -1;
	    }
	    return dest;
	  }
	  function computeMovableDestIndex(dest) {
	    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
	      var position = getPosition();
	      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
	        dest < currIndex ? --dest : ++dest;
	      }
	    }
	    return dest;
	  }
	  function loop(index) {
	    return isLoop ? (index + slideCount) % slideCount || 0 : index;
	  }
	  function getEnd() {
	    var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
	    while (omitEnd && end-- > 0) {
	      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
	        end++;
	        break;
	      }
	    }
	    return clamp(end, 0, slideCount - 1);
	  }
	  function toIndex(page) {
	    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
	  }
	  function toPage(index) {
	    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
	  }
	  function toDest(destination) {
	    var closest = Move.toIndex(destination);
	    return isSlide ? clamp(closest, 0, endIndex) : closest;
	  }
	  function setIndex(index) {
	    if (index !== currIndex) {
	      prevIndex = currIndex;
	      currIndex = index;
	    }
	  }
	  function getIndex(prev) {
	    return prev ? prevIndex : currIndex;
	  }
	  function hasFocus() {
	    return !isUndefined$1(options.focus) || options.isNavigation;
	  }
	  function isBusy() {
	    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
	  }
	  return {
	    mount: mount,
	    go: go,
	    scroll: scroll,
	    getNext: getNext,
	    getPrev: getPrev,
	    getAdjacent: getAdjacent,
	    getEnd: getEnd,
	    setIndex: setIndex,
	    getIndex: getIndex,
	    toIndex: toIndex,
	    toPage: toPage,
	    toDest: toDest,
	    hasFocus: hasFocus,
	    isBusy: isBusy
	  };
	}
	var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
	var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
	var SIZE = 40;
	function Arrows(Splide2, Components2, options) {
	  var event = EventInterface(Splide2);
	  var on = event.on,
	    bind = event.bind,
	    emit = event.emit;
	  var classes = options.classes,
	    i18n = options.i18n;
	  var Elements = Components2.Elements,
	    Controller = Components2.Controller;
	  var placeholder = Elements.arrows,
	    track = Elements.track;
	  var wrapper = placeholder;
	  var prev = Elements.prev;
	  var next = Elements.next;
	  var created;
	  var wrapperClasses;
	  var arrows = {};
	  function mount() {
	    init();
	    on(EVENT_UPDATED, remount);
	  }
	  function remount() {
	    destroy();
	    mount();
	  }
	  function init() {
	    var enabled = options.arrows;
	    if (enabled && !(prev && next)) {
	      createArrows();
	    }
	    if (prev && next) {
	      assign(arrows, {
	        prev: prev,
	        next: next
	      });
	      display(wrapper, enabled ? "" : "none");
	      addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
	      if (enabled) {
	        listen();
	        update();
	        setAttribute([prev, next], ARIA_CONTROLS, track.id);
	        emit(EVENT_ARROWS_MOUNTED, prev, next);
	      }
	    }
	  }
	  function destroy() {
	    event.destroy();
	    removeClass(wrapper, wrapperClasses);
	    if (created) {
	      remove(placeholder ? [prev, next] : wrapper);
	      prev = next = null;
	    } else {
	      removeAttribute([prev, next], ALL_ATTRIBUTES);
	    }
	  }
	  function listen() {
	    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
	    bind(next, "click", apply(go, ">"));
	    bind(prev, "click", apply(go, "<"));
	  }
	  function go(control) {
	    Controller.go(control, true);
	  }
	  function createArrows() {
	    wrapper = placeholder || create("div", classes.arrows);
	    prev = createArrow(true);
	    next = createArrow(false);
	    created = true;
	    append(wrapper, [prev, next]);
	    !placeholder && before(wrapper, track);
	  }
	  function createArrow(prev2) {
	    var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
	    return parseHtml(arrow);
	  }
	  function update() {
	    if (prev && next) {
	      var index = Splide2.index;
	      var prevIndex = Controller.getPrev();
	      var nextIndex = Controller.getNext();
	      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
	      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
	      prev.disabled = prevIndex < 0;
	      next.disabled = nextIndex < 0;
	      setAttribute(prev, ARIA_LABEL, prevLabel);
	      setAttribute(next, ARIA_LABEL, nextLabel);
	      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
	    }
	  }
	  return {
	    arrows: arrows,
	    mount: mount,
	    destroy: destroy,
	    update: update
	  };
	}
	var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
	function Autoplay(Splide2, Components2, options) {
	  var _EventInterface6 = EventInterface(Splide2),
	    on = _EventInterface6.on,
	    bind = _EventInterface6.bind,
	    emit = _EventInterface6.emit;
	  var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
	  var isPaused = interval.isPaused;
	  var Elements = Components2.Elements,
	    _Components2$Elements4 = Components2.Elements,
	    root = _Components2$Elements4.root,
	    toggle = _Components2$Elements4.toggle;
	  var autoplay = options.autoplay;
	  var hovered;
	  var focused;
	  var stopped = autoplay === "pause";
	  function mount() {
	    if (autoplay) {
	      listen();
	      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
	      stopped || play();
	      update();
	    }
	  }
	  function listen() {
	    if (options.pauseOnHover) {
	      bind(root, "mouseenter mouseleave", function (e) {
	        hovered = e.type === "mouseenter";
	        autoToggle();
	      });
	    }
	    if (options.pauseOnFocus) {
	      bind(root, "focusin focusout", function (e) {
	        focused = e.type === "focusin";
	        autoToggle();
	      });
	    }
	    if (toggle) {
	      bind(toggle, "click", function () {
	        stopped ? play() : pause(true);
	      });
	    }
	    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
	    on(EVENT_MOVE, onMove);
	  }
	  function play() {
	    if (isPaused() && Components2.Slides.isEnough()) {
	      interval.start(!options.resetProgress);
	      focused = hovered = stopped = false;
	      update();
	      emit(EVENT_AUTOPLAY_PLAY);
	    }
	  }
	  function pause(stop) {
	    if (stop === void 0) {
	      stop = true;
	    }
	    stopped = !!stop;
	    update();
	    if (!isPaused()) {
	      interval.pause();
	      emit(EVENT_AUTOPLAY_PAUSE);
	    }
	  }
	  function autoToggle() {
	    if (!stopped) {
	      hovered || focused ? pause(false) : play();
	    }
	  }
	  function update() {
	    if (toggle) {
	      toggleClass(toggle, CLASS_ACTIVE, !stopped);
	      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
	    }
	  }
	  function onAnimationFrame(rate) {
	    var bar = Elements.bar;
	    bar && style(bar, "width", rate * 100 + "%");
	    emit(EVENT_AUTOPLAY_PLAYING, rate);
	  }
	  function onMove(index) {
	    var Slide = Components2.Slides.getAt(index);
	    interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
	  }
	  return {
	    mount: mount,
	    destroy: interval.cancel,
	    play: play,
	    pause: pause,
	    isPaused: isPaused
	  };
	}
	function Cover(Splide2, Components2, options) {
	  var _EventInterface7 = EventInterface(Splide2),
	    on = _EventInterface7.on;
	  function mount() {
	    if (options.cover) {
	      on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
	      on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
	    }
	  }
	  function cover(cover2) {
	    Components2.Slides.forEach(function (Slide) {
	      var img = child(Slide.container || Slide.slide, "img");
	      if (img && img.src) {
	        toggle(cover2, img, Slide);
	      }
	    });
	  }
	  function toggle(cover2, img, Slide) {
	    Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
	    display(img, cover2 ? "none" : "");
	  }
	  return {
	    mount: mount,
	    destroy: apply(cover, false)
	  };
	}
	var BOUNCE_DIFF_THRESHOLD = 10;
	var BOUNCE_DURATION = 600;
	var FRICTION_FACTOR = 0.6;
	var BASE_VELOCITY = 1.5;
	var MIN_DURATION = 800;
	function Scroll(Splide2, Components2, options) {
	  var _EventInterface8 = EventInterface(Splide2),
	    on = _EventInterface8.on,
	    emit = _EventInterface8.emit;
	  var set = Splide2.state.set;
	  var Move = Components2.Move;
	  var getPosition = Move.getPosition,
	    getLimit = Move.getLimit,
	    exceededLimit = Move.exceededLimit,
	    translate = Move.translate;
	  var isSlide = Splide2.is(SLIDE);
	  var interval;
	  var callback;
	  var friction = 1;
	  function mount() {
	    on(EVENT_MOVE, clear);
	    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
	  }
	  function scroll(destination, duration, snap, onScrolled, noConstrain) {
	    var from = getPosition();
	    clear();
	    if (snap && (!isSlide || !exceededLimit())) {
	      var size = Components2.Layout.sliderSize();
	      var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
	      destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
	    }
	    var noDistance = approximatelyEqual(from, destination, 1);
	    friction = 1;
	    duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
	    callback = onScrolled;
	    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
	    set(SCROLLING);
	    emit(EVENT_SCROLL);
	    interval.start();
	  }
	  function onEnd() {
	    set(IDLE);
	    callback && callback();
	    emit(EVENT_SCROLLED);
	  }
	  function update(from, to, noConstrain, rate) {
	    var position = getPosition();
	    var target = from + (to - from) * easing(rate);
	    var diff = (target - position) * friction;
	    translate(position + diff);
	    if (isSlide && !noConstrain && exceededLimit()) {
	      friction *= FRICTION_FACTOR;
	      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
	        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
	      }
	    }
	  }
	  function clear() {
	    if (interval) {
	      interval.cancel();
	    }
	  }
	  function cancel() {
	    if (interval && !interval.isPaused()) {
	      clear();
	      onEnd();
	    }
	  }
	  function easing(t) {
	    var easingFunc = options.easingFunc;
	    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
	  }
	  return {
	    mount: mount,
	    destroy: clear,
	    scroll: scroll,
	    cancel: cancel
	  };
	}
	var SCROLL_LISTENER_OPTIONS = {
	  passive: false,
	  capture: true
	};
	function Drag(Splide2, Components2, options) {
	  var _EventInterface9 = EventInterface(Splide2),
	    on = _EventInterface9.on,
	    emit = _EventInterface9.emit,
	    bind = _EventInterface9.bind,
	    unbind = _EventInterface9.unbind;
	  var state = Splide2.state;
	  var Move = Components2.Move,
	    Scroll = Components2.Scroll,
	    Controller = Components2.Controller,
	    track = Components2.Elements.track,
	    reduce = Components2.Media.reduce;
	  var _Components2$Directio2 = Components2.Direction,
	    resolve = _Components2$Directio2.resolve,
	    orient = _Components2$Directio2.orient;
	  var getPosition = Move.getPosition,
	    exceededLimit = Move.exceededLimit;
	  var basePosition;
	  var baseEvent;
	  var prevBaseEvent;
	  var isFree;
	  var dragging;
	  var exceeded = false;
	  var clickPrevented;
	  var disabled;
	  var target;
	  function mount() {
	    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
	    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
	    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
	    bind(track, "click", onClick, {
	      capture: true
	    });
	    bind(track, "dragstart", prevent);
	    on([EVENT_MOUNTED, EVENT_UPDATED], init);
	  }
	  function init() {
	    var drag = options.drag;
	    disable(!drag);
	    isFree = drag === "free";
	  }
	  function onPointerDown(e) {
	    clickPrevented = false;
	    if (!disabled) {
	      var isTouch = isTouchEvent(e);
	      if (isDraggable(e.target) && (isTouch || !e.button)) {
	        if (!Controller.isBusy()) {
	          target = isTouch ? track : window;
	          dragging = state.is([MOVING, SCROLLING]);
	          prevBaseEvent = null;
	          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
	          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
	          Move.cancel();
	          Scroll.cancel();
	          save(e);
	        } else {
	          prevent(e, true);
	        }
	      }
	    }
	  }
	  function onPointerMove(e) {
	    if (!state.is(DRAGGING)) {
	      state.set(DRAGGING);
	      emit(EVENT_DRAG);
	    }
	    if (e.cancelable) {
	      if (dragging) {
	        Move.translate(basePosition + constrain(diffCoord(e)));
	        var expired = diffTime(e) > LOG_INTERVAL;
	        var hasExceeded = exceeded !== (exceeded = exceededLimit());
	        if (expired || hasExceeded) {
	          save(e);
	        }
	        clickPrevented = true;
	        emit(EVENT_DRAGGING);
	        prevent(e);
	      } else if (isSliderDirection(e)) {
	        dragging = shouldStart(e);
	        prevent(e);
	      }
	    }
	  }
	  function onPointerUp(e) {
	    if (state.is(DRAGGING)) {
	      state.set(IDLE);
	      emit(EVENT_DRAGGED);
	    }
	    if (dragging) {
	      move(e);
	      prevent(e);
	    }
	    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
	    unbind(target, POINTER_UP_EVENTS, onPointerUp);
	    dragging = false;
	  }
	  function onClick(e) {
	    if (!disabled && clickPrevented) {
	      prevent(e, true);
	    }
	  }
	  function save(e) {
	    prevBaseEvent = baseEvent;
	    baseEvent = e;
	    basePosition = getPosition();
	  }
	  function move(e) {
	    var velocity = computeVelocity(e);
	    var destination = computeDestination(velocity);
	    var rewind = options.rewind && options.rewindByDrag;
	    reduce(false);
	    if (isFree) {
	      Controller.scroll(destination, 0, options.snap);
	    } else if (Splide2.is(FADE)) {
	      Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
	    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
	      Controller.go(exceededLimit(true) ? ">" : "<");
	    } else {
	      Controller.go(Controller.toDest(destination), true);
	    }
	    reduce(true);
	  }
	  function shouldStart(e) {
	    var thresholds = options.dragMinThreshold;
	    var isObj = isObject(thresholds);
	    var mouse = isObj && thresholds.mouse || 0;
	    var touch = (isObj ? thresholds.touch : +thresholds) || 10;
	    return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
	  }
	  function isSliderDirection(e) {
	    return abs(diffCoord(e)) > abs(diffCoord(e, true));
	  }
	  function computeVelocity(e) {
	    if (Splide2.is(LOOP) || !exceeded) {
	      var time = diffTime(e);
	      if (time && time < LOG_INTERVAL) {
	        return diffCoord(e) / time;
	      }
	    }
	    return 0;
	  }
	  function computeDestination(velocity) {
	    return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
	  }
	  function diffCoord(e, orthogonal) {
	    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
	  }
	  function diffTime(e) {
	    return timeOf(e) - timeOf(getBaseEvent(e));
	  }
	  function getBaseEvent(e) {
	    return baseEvent === e && prevBaseEvent || baseEvent;
	  }
	  function coordOf(e, orthogonal) {
	    return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
	  }
	  function constrain(diff) {
	    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
	  }
	  function isDraggable(target2) {
	    var noDrag = options.noDrag;
	    return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
	  }
	  function isTouchEvent(e) {
	    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
	  }
	  function isDragging() {
	    return dragging;
	  }
	  function disable(value) {
	    disabled = value;
	  }
	  return {
	    mount: mount,
	    disable: disable,
	    isDragging: isDragging
	  };
	}
	var NORMALIZATION_MAP = {
	  Spacebar: " ",
	  Right: ARROW_RIGHT,
	  Left: ARROW_LEFT,
	  Up: ARROW_UP,
	  Down: ARROW_DOWN
	};
	function normalizeKey(key) {
	  key = isString$1(key) ? key : key.key;
	  return NORMALIZATION_MAP[key] || key;
	}
	var KEYBOARD_EVENT = "keydown";
	function Keyboard(Splide2, Components2, options) {
	  var _EventInterface10 = EventInterface(Splide2),
	    on = _EventInterface10.on,
	    bind = _EventInterface10.bind,
	    unbind = _EventInterface10.unbind;
	  var root = Splide2.root;
	  var resolve = Components2.Direction.resolve;
	  var target;
	  var disabled;
	  function mount() {
	    init();
	    on(EVENT_UPDATED, destroy);
	    on(EVENT_UPDATED, init);
	    on(EVENT_MOVE, onMove);
	  }
	  function init() {
	    var keyboard = options.keyboard;
	    if (keyboard) {
	      target = keyboard === "global" ? window : root;
	      bind(target, KEYBOARD_EVENT, onKeydown);
	    }
	  }
	  function destroy() {
	    unbind(target, KEYBOARD_EVENT);
	  }
	  function disable(value) {
	    disabled = value;
	  }
	  function onMove() {
	    var _disabled = disabled;
	    disabled = true;
	    nextTick(function () {
	      disabled = _disabled;
	    });
	  }
	  function onKeydown(e) {
	    if (!disabled) {
	      var key = normalizeKey(e);
	      if (key === resolve(ARROW_LEFT)) {
	        Splide2.go("<");
	      } else if (key === resolve(ARROW_RIGHT)) {
	        Splide2.go(">");
	      }
	    }
	  }
	  return {
	    mount: mount,
	    destroy: destroy,
	    disable: disable
	  };
	}
	var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
	var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
	var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
	function LazyLoad(Splide2, Components2, options) {
	  var _EventInterface11 = EventInterface(Splide2),
	    on = _EventInterface11.on,
	    off = _EventInterface11.off,
	    bind = _EventInterface11.bind,
	    emit = _EventInterface11.emit;
	  var isSequential = options.lazyLoad === "sequential";
	  var events = [EVENT_MOVED, EVENT_SCROLLED];
	  var entries = [];
	  function mount() {
	    if (options.lazyLoad) {
	      init();
	      on(EVENT_REFRESH, init);
	    }
	  }
	  function init() {
	    empty(entries);
	    register();
	    if (isSequential) {
	      loadNext();
	    } else {
	      off(events);
	      on(events, check);
	      check();
	    }
	  }
	  function register() {
	    Components2.Slides.forEach(function (Slide) {
	      queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
	        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
	        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
	        if (src !== img.src || srcset !== img.srcset) {
	          var className = options.classes.spinner;
	          var parent = img.parentElement;
	          var spinner = child(parent, "." + className) || create("span", className, parent);
	          entries.push([img, Slide, spinner]);
	          img.src || display(img, "none");
	        }
	      });
	    });
	  }
	  function check() {
	    entries = entries.filter(function (data) {
	      var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
	      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
	    });
	    entries.length || off(events);
	  }
	  function load(data) {
	    var img = data[0];
	    addClass(data[1].slide, CLASS_LOADING);
	    bind(img, "load error", apply(onLoad, data));
	    setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
	    setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
	    removeAttribute(img, SRC_DATA_ATTRIBUTE);
	    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
	  }
	  function onLoad(data, e) {
	    var img = data[0],
	      Slide = data[1];
	    removeClass(Slide.slide, CLASS_LOADING);
	    if (e.type !== "error") {
	      remove(data[2]);
	      display(img, "");
	      emit(EVENT_LAZYLOAD_LOADED, img, Slide);
	      emit(EVENT_RESIZE);
	    }
	    isSequential && loadNext();
	  }
	  function loadNext() {
	    entries.length && load(entries.shift());
	  }
	  return {
	    mount: mount,
	    destroy: apply(empty, entries),
	    check: check
	  };
	}
	function Pagination(Splide2, Components2, options) {
	  var event = EventInterface(Splide2);
	  var on = event.on,
	    emit = event.emit,
	    bind = event.bind;
	  var Slides = Components2.Slides,
	    Elements = Components2.Elements,
	    Controller = Components2.Controller;
	  var hasFocus = Controller.hasFocus,
	    getIndex = Controller.getIndex,
	    go = Controller.go;
	  var resolve = Components2.Direction.resolve;
	  var placeholder = Elements.pagination;
	  var items = [];
	  var list;
	  var paginationClasses;
	  function mount() {
	    destroy();
	    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
	    var enabled = options.pagination;
	    placeholder && display(placeholder, enabled ? "" : "none");
	    if (enabled) {
	      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
	      createPagination();
	      update();
	      emit(EVENT_PAGINATION_MOUNTED, {
	        list: list,
	        items: items
	      }, getAt(Splide2.index));
	    }
	  }
	  function destroy() {
	    if (list) {
	      remove(placeholder ? slice(list.children) : list);
	      removeClass(list, paginationClasses);
	      empty(items);
	      list = null;
	    }
	    event.destroy();
	  }
	  function createPagination() {
	    var length = Splide2.length;
	    var classes = options.classes,
	      i18n = options.i18n,
	      perPage = options.perPage;
	    var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
	    list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
	    addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
	    setAttribute(list, ROLE, "tablist");
	    setAttribute(list, ARIA_LABEL, i18n.select);
	    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
	    for (var i = 0; i < max; i++) {
	      var li = create("li", null, list);
	      var button = create("button", {
	        class: classes.page,
	        type: "button"
	      }, li);
	      var controls = Slides.getIn(i).map(function (Slide) {
	        return Slide.slide.id;
	      });
	      var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
	      bind(button, "click", apply(onClick, i));
	      if (options.paginationKeyboard) {
	        bind(button, "keydown", apply(onKeydown, i));
	      }
	      setAttribute(li, ROLE, "presentation");
	      setAttribute(button, ROLE, "tab");
	      setAttribute(button, ARIA_CONTROLS, controls.join(" "));
	      setAttribute(button, ARIA_LABEL, format(text, i + 1));
	      setAttribute(button, TAB_INDEX, -1);
	      items.push({
	        li: li,
	        button: button,
	        page: i
	      });
	    }
	  }
	  function onClick(page) {
	    go(">" + page, true);
	  }
	  function onKeydown(page, e) {
	    var length = items.length;
	    var key = normalizeKey(e);
	    var dir = getDirection();
	    var nextPage = -1;
	    if (key === resolve(ARROW_RIGHT, false, dir)) {
	      nextPage = ++page % length;
	    } else if (key === resolve(ARROW_LEFT, false, dir)) {
	      nextPage = (--page + length) % length;
	    } else if (key === "Home") {
	      nextPage = 0;
	    } else if (key === "End") {
	      nextPage = length - 1;
	    }
	    var item = items[nextPage];
	    if (item) {
	      focus(item.button);
	      go(">" + nextPage);
	      prevent(e, true);
	    }
	  }
	  function getDirection() {
	    return options.paginationDirection || options.direction;
	  }
	  function getAt(index) {
	    return items[Controller.toPage(index)];
	  }
	  function update() {
	    var prev = getAt(getIndex(true));
	    var curr = getAt(getIndex());
	    if (prev) {
	      var button = prev.button;
	      removeClass(button, CLASS_ACTIVE);
	      removeAttribute(button, ARIA_SELECTED);
	      setAttribute(button, TAB_INDEX, -1);
	    }
	    if (curr) {
	      var _button = curr.button;
	      addClass(_button, CLASS_ACTIVE);
	      setAttribute(_button, ARIA_SELECTED, true);
	      setAttribute(_button, TAB_INDEX, "");
	    }
	    emit(EVENT_PAGINATION_UPDATED, {
	      list: list,
	      items: items
	    }, prev, curr);
	  }
	  return {
	    items: items,
	    mount: mount,
	    destroy: destroy,
	    getAt: getAt,
	    update: update
	  };
	}
	var TRIGGER_KEYS = [" ", "Enter"];
	function Sync(Splide2, Components2, options) {
	  var isNavigation = options.isNavigation,
	    slideFocus = options.slideFocus;
	  var events = [];
	  function mount() {
	    Splide2.splides.forEach(function (target) {
	      if (!target.isParent) {
	        sync(Splide2, target.splide);
	        sync(target.splide, Splide2);
	      }
	    });
	    if (isNavigation) {
	      navigate();
	    }
	  }
	  function destroy() {
	    events.forEach(function (event) {
	      event.destroy();
	    });
	    empty(events);
	  }
	  function remount() {
	    destroy();
	    mount();
	  }
	  function sync(splide, target) {
	    var event = EventInterface(splide);
	    event.on(EVENT_MOVE, function (index, prev, dest) {
	      target.go(target.is(LOOP) ? dest : index);
	    });
	    events.push(event);
	  }
	  function navigate() {
	    var event = EventInterface(Splide2);
	    var on = event.on;
	    on(EVENT_CLICK, onClick);
	    on(EVENT_SLIDE_KEYDOWN, onKeydown);
	    on([EVENT_MOUNTED, EVENT_UPDATED], update);
	    events.push(event);
	    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
	  }
	  function update() {
	    setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
	  }
	  function onClick(Slide) {
	    Splide2.go(Slide.index);
	  }
	  function onKeydown(Slide, e) {
	    if (includes(TRIGGER_KEYS, normalizeKey(e))) {
	      onClick(Slide);
	      prevent(e);
	    }
	  }
	  return {
	    setup: apply(Components2.Media.set, {
	      slideFocus: isUndefined$1(slideFocus) ? isNavigation : slideFocus
	    }, true),
	    mount: mount,
	    destroy: destroy,
	    remount: remount
	  };
	}
	function Wheel(Splide2, Components2, options) {
	  var _EventInterface12 = EventInterface(Splide2),
	    bind = _EventInterface12.bind;
	  var lastTime = 0;
	  function mount() {
	    if (options.wheel) {
	      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
	    }
	  }
	  function onWheel(e) {
	    if (e.cancelable) {
	      var deltaY = e.deltaY;
	      var backwards = deltaY < 0;
	      var timeStamp = timeOf(e);
	      var _min = options.wheelMinThreshold || 0;
	      var sleep = options.wheelSleep || 0;
	      if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
	        Splide2.go(backwards ? "<" : ">");
	        lastTime = timeStamp;
	      }
	      shouldPrevent(backwards) && prevent(e);
	    }
	  }
	  function shouldPrevent(backwards) {
	    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
	  }
	  return {
	    mount: mount
	  };
	}
	var SR_REMOVAL_DELAY = 90;
	function Live(Splide2, Components2, options) {
	  var _EventInterface13 = EventInterface(Splide2),
	    on = _EventInterface13.on;
	  var track = Components2.Elements.track;
	  var enabled = options.live && !options.isNavigation;
	  var sr = create("span", CLASS_SR);
	  var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
	  function mount() {
	    if (enabled) {
	      disable(!Components2.Autoplay.isPaused());
	      setAttribute(track, ARIA_ATOMIC, true);
	      sr.textContent = "\u2026";
	      on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
	      on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
	      on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
	    }
	  }
	  function toggle(active) {
	    setAttribute(track, ARIA_BUSY, active);
	    if (active) {
	      append(track, sr);
	      interval.start();
	    } else {
	      remove(sr);
	      interval.cancel();
	    }
	  }
	  function destroy() {
	    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
	    remove(sr);
	  }
	  function disable(disabled) {
	    if (enabled) {
	      setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
	    }
	  }
	  return {
	    mount: mount,
	    disable: disable,
	    destroy: destroy
	  };
	}
	var ComponentConstructors = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  Media: Media,
	  Direction: Direction,
	  Elements: Elements,
	  Slides: Slides,
	  Layout: Layout,
	  Clones: Clones,
	  Move: Move,
	  Controller: Controller,
	  Arrows: Arrows,
	  Autoplay: Autoplay,
	  Cover: Cover,
	  Scroll: Scroll,
	  Drag: Drag,
	  Keyboard: Keyboard,
	  LazyLoad: LazyLoad,
	  Pagination: Pagination,
	  Sync: Sync,
	  Wheel: Wheel,
	  Live: Live
	});
	var I18N = {
	  prev: "Previous slide",
	  next: "Next slide",
	  first: "Go to first slide",
	  last: "Go to last slide",
	  slideX: "Go to slide %s",
	  pageX: "Go to page %s",
	  play: "Start autoplay",
	  pause: "Pause autoplay",
	  carousel: "carousel",
	  slide: "slide",
	  select: "Select a slide to show",
	  slideLabel: "%s of %s"
	};
	var DEFAULTS = {
	  type: "slide",
	  role: "region",
	  speed: 400,
	  perPage: 1,
	  cloneStatus: true,
	  arrows: true,
	  pagination: true,
	  paginationKeyboard: true,
	  interval: 5e3,
	  pauseOnHover: true,
	  pauseOnFocus: true,
	  resetProgress: true,
	  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
	  drag: true,
	  direction: "ltr",
	  trimSpace: true,
	  focusableNodes: "a, button, textarea, input, select, iframe",
	  live: true,
	  classes: CLASSES,
	  i18n: I18N,
	  reducedMotion: {
	    speed: 0,
	    rewindSpeed: 0,
	    autoplay: "pause"
	  }
	};
	function Fade(Splide2, Components2, options) {
	  var Slides = Components2.Slides;
	  function mount() {
	    EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
	  }
	  function init() {
	    Slides.forEach(function (Slide) {
	      Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
	    });
	  }
	  function start(index, done) {
	    Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
	    nextTick(done);
	  }
	  return {
	    mount: mount,
	    start: start,
	    cancel: noop
	  };
	}
	function Slide(Splide2, Components2, options) {
	  var Move = Components2.Move,
	    Controller = Components2.Controller,
	    Scroll = Components2.Scroll;
	  var list = Components2.Elements.list;
	  var transition = apply(style, list, "transition");
	  var endCallback;
	  function mount() {
	    EventInterface(Splide2).bind(list, "transitionend", function (e) {
	      if (e.target === list && endCallback) {
	        cancel();
	        endCallback();
	      }
	    });
	  }
	  function start(index, done) {
	    var destination = Move.toPosition(index, true);
	    var position = Move.getPosition();
	    var speed = getSpeed(index);
	    if (abs(destination - position) >= 1 && speed >= 1) {
	      if (options.useScroll) {
	        Scroll.scroll(destination, speed, false, done);
	      } else {
	        transition("transform " + speed + "ms " + options.easing);
	        Move.translate(destination, true);
	        endCallback = done;
	      }
	    } else {
	      Move.jump(index);
	      done();
	    }
	  }
	  function cancel() {
	    transition("");
	    Scroll.cancel();
	  }
	  function getSpeed(index) {
	    var rewindSpeed = options.rewindSpeed;
	    if (Splide2.is(SLIDE) && rewindSpeed) {
	      var prev = Controller.getIndex(true);
	      var end = Controller.getEnd();
	      if (prev === 0 && index >= end || prev >= end && index === 0) {
	        return rewindSpeed;
	      }
	    }
	    return options.speed;
	  }
	  return {
	    mount: mount,
	    start: start,
	    cancel: cancel
	  };
	}
	var _Splide = /*#__PURE__*/function () {
	  function _Splide(target, options) {
	    this.event = EventInterface();
	    this.Components = {};
	    this.state = State(CREATED);
	    this.splides = [];
	    this._o = {};
	    this._E = {};
	    var root = isString$1(target) ? query(document, target) : target;
	    assert(root, root + " is invalid.");
	    this.root = root;
	    options = merge({
	      label: getAttribute(root, ARIA_LABEL) || "",
	      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
	    }, DEFAULTS, _Splide.defaults, options || {});
	    try {
	      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
	    } catch (e) {
	      assert(false, "Invalid JSON");
	    }
	    this._o = Object.create(merge({}, options));
	  }
	  var _proto = _Splide.prototype;
	  _proto.mount = function mount(Extensions, Transition) {
	    var _this = this;
	    var state = this.state,
	      Components2 = this.Components;
	    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
	    state.set(CREATED);
	    this._C = Components2;
	    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
	    this._E = Extensions || this._E;
	    var Constructors = assign({}, ComponentConstructors, this._E, {
	      Transition: this._T
	    });
	    forOwn(Constructors, function (Component, key) {
	      var component = Component(_this, Components2, _this._o);
	      Components2[key] = component;
	      component.setup && component.setup();
	    });
	    forOwn(Components2, function (component) {
	      component.mount && component.mount();
	    });
	    this.emit(EVENT_MOUNTED);
	    addClass(this.root, CLASS_INITIALIZED);
	    state.set(IDLE);
	    this.emit(EVENT_READY);
	    return this;
	  };
	  _proto.sync = function sync(splide) {
	    this.splides.push({
	      splide: splide
	    });
	    splide.splides.push({
	      splide: this,
	      isParent: true
	    });
	    if (this.state.is(IDLE)) {
	      this._C.Sync.remount();
	      splide.Components.Sync.remount();
	    }
	    return this;
	  };
	  _proto.go = function go(control) {
	    this._C.Controller.go(control);
	    return this;
	  };
	  _proto.on = function on(events, callback) {
	    this.event.on(events, callback);
	    return this;
	  };
	  _proto.off = function off(events) {
	    this.event.off(events);
	    return this;
	  };
	  _proto.emit = function emit(event) {
	    var _this$event;
	    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
	    return this;
	  };
	  _proto.add = function add(slides, index) {
	    this._C.Slides.add(slides, index);
	    return this;
	  };
	  _proto.remove = function remove(matcher) {
	    this._C.Slides.remove(matcher);
	    return this;
	  };
	  _proto.is = function is(type) {
	    return this._o.type === type;
	  };
	  _proto.refresh = function refresh() {
	    this.emit(EVENT_REFRESH);
	    return this;
	  };
	  _proto.destroy = function destroy(completely) {
	    if (completely === void 0) {
	      completely = true;
	    }
	    var event = this.event,
	      state = this.state;
	    if (state.is(CREATED)) {
	      EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
	    } else {
	      forOwn(this._C, function (component) {
	        component.destroy && component.destroy(completely);
	      }, true);
	      event.emit(EVENT_DESTROY);
	      event.destroy();
	      completely && empty(this.splides);
	      state.set(DESTROYED);
	    }
	    return this;
	  };
	  _createClass(_Splide, [{
	    key: "options",
	    get: function get() {
	      return this._o;
	    },
	    set: function set(options) {
	      this._C.Media.set(options, true, true);
	    }
	  }, {
	    key: "length",
	    get: function get() {
	      return this._C.Slides.getLength(true);
	    }
	  }, {
	    key: "index",
	    get: function get() {
	      return this._C.Controller.getIndex();
	    }
	  }]);
	  return _Splide;
	}();
	var Splide = _Splide;
	Splide.defaults = {};
	Splide.STATES = STATES;

	// these aren't really private, but nor are they really useful to document

	/**
	 * @private
	 */
	class LuxonError extends Error {}

	/**
	 * @private
	 */
	class InvalidDateTimeError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid DateTime: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidIntervalError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Interval: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidDurationError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Duration: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class ConflictingSpecificationError extends LuxonError {}

	/**
	 * @private
	 */
	class InvalidUnitError extends LuxonError {
	  constructor(unit) {
	    super(`Invalid unit ${unit}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidArgumentError extends LuxonError {}

	/**
	 * @private
	 */
	class ZoneIsAbstractError extends LuxonError {
	  constructor() {
	    super("Zone is an abstract class");
	  }
	}

	/**
	 * @private
	 */

	const n = "numeric",
	  s = "short",
	  l = "long";
	const DATE_SHORT = {
	  year: n,
	  month: n,
	  day: n
	};
	const DATE_MED = {
	  year: n,
	  month: s,
	  day: n
	};
	const DATE_MED_WITH_WEEKDAY = {
	  year: n,
	  month: s,
	  day: n,
	  weekday: s
	};
	const DATE_FULL = {
	  year: n,
	  month: l,
	  day: n
	};
	const DATE_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l
	};
	const TIME_SIMPLE = {
	  hour: n,
	  minute: n
	};
	const TIME_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n
	};
	const TIME_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s
	};
	const TIME_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l
	};
	const TIME_24_SIMPLE = {
	  hour: n,
	  minute: n,
	  hourCycle: "h23"
	};
	const TIME_24_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n,
	  hourCycle: "h23"
	};
	const TIME_24_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hourCycle: "h23",
	  timeZoneName: s
	};
	const TIME_24_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hourCycle: "h23",
	  timeZoneName: l
	};
	const DATETIME_SHORT = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n
	};
	const DATETIME_SHORT_WITH_SECONDS = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n
	};
	const DATETIME_MED = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n
	};
	const DATETIME_MED_WITH_SECONDS = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n
	};
	const DATETIME_MED_WITH_WEEKDAY = {
	  year: n,
	  month: s,
	  day: n,
	  weekday: s,
	  hour: n,
	  minute: n
	};
	const DATETIME_FULL = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  timeZoneName: s
	};
	const DATETIME_FULL_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s
	};
	const DATETIME_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  timeZoneName: l
	};
	const DATETIME_HUGE_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l
	};

	/**
	 * @interface
	 */
	class Zone {
	  /**
	   * The type of zone
	   * @abstract
	   * @type {string}
	   */
	  get type() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * The name of this zone.
	   * @abstract
	   * @type {string}
	   */
	  get name() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * The IANA name of this zone.
	   * Defaults to `name` if not overwritten by a subclass.
	   * @abstract
	   * @type {string}
	   */
	  get ianaName() {
	    return this.name;
	  }

	  /**
	   * Returns whether the offset is known to be fixed for the whole year.
	   * @abstract
	   * @type {boolean}
	   */
	  get isUniversal() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's common name (such as EST) at the specified timestamp
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the name
	   * @param {Object} opts - Options to affect the format
	   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
	   * @param {string} opts.locale - What locale to return the offset name in.
	   * @return {string}
	   */
	  offsetName(ts, opts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's value as a string
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the offset
	   * @param {string} format - What style of offset to return.
	   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
	   * @return {string}
	   */
	  formatOffset(ts, format) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return the offset in minutes for this zone at the specified timestamp.
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to compute the offset
	   * @return {number}
	   */
	  offset(ts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is equal to another zone
	   * @abstract
	   * @param {Zone} otherZone - the zone to compare
	   * @return {boolean}
	   */
	  equals(otherZone) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is valid.
	   * @abstract
	   * @type {boolean}
	   */
	  get isValid() {
	    throw new ZoneIsAbstractError();
	  }
	}

	let singleton$1 = null;

	/**
	 * Represents the local zone for this JavaScript environment.
	 * @implements {Zone}
	 */
	class SystemZone extends Zone {
	  /**
	   * Get a singleton instance of the local zone
	   * @return {SystemZone}
	   */
	  static get instance() {
	    if (singleton$1 === null) {
	      singleton$1 = new SystemZone();
	    }
	    return singleton$1;
	  }

	  /** @override **/
	  get type() {
	    return "system";
	  }

	  /** @override **/
	  get name() {
	    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
	  }

	  /** @override **/
	  get isUniversal() {
	    return false;
	  }

	  /** @override **/
	  offsetName(ts, {
	    format,
	    locale
	  }) {
	    return parseZoneInfo(ts, format, locale);
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /** @override **/
	  offset(ts) {
	    return -new Date(ts).getTimezoneOffset();
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "system";
	  }

	  /** @override **/
	  get isValid() {
	    return true;
	  }
	}

	let dtfCache = {};
	function makeDTF(zone) {
	  if (!dtfCache[zone]) {
	    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
	      hour12: false,
	      timeZone: zone,
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit",
	      second: "2-digit",
	      era: "short"
	    });
	  }
	  return dtfCache[zone];
	}
	const typeToPos = {
	  year: 0,
	  month: 1,
	  day: 2,
	  era: 3,
	  hour: 4,
	  minute: 5,
	  second: 6
	};
	function hackyOffset(dtf, date) {
	  const formatted = dtf.format(date).replace(/\u200E/g, ""),
	    parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted),
	    [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
	  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
	}
	function partsOffset(dtf, date) {
	  const formatted = dtf.formatToParts(date);
	  const filled = [];
	  for (let i = 0; i < formatted.length; i++) {
	    const {
	      type,
	      value
	    } = formatted[i];
	    const pos = typeToPos[type];
	    if (type === "era") {
	      filled[pos] = value;
	    } else if (!isUndefined(pos)) {
	      filled[pos] = parseInt(value, 10);
	    }
	  }
	  return filled;
	}
	let ianaZoneCache = {};
	/**
	 * A zone identified by an IANA identifier, like America/New_York
	 * @implements {Zone}
	 */
	class IANAZone extends Zone {
	  /**
	   * @param {string} name - Zone name
	   * @return {IANAZone}
	   */
	  static create(name) {
	    if (!ianaZoneCache[name]) {
	      ianaZoneCache[name] = new IANAZone(name);
	    }
	    return ianaZoneCache[name];
	  }

	  /**
	   * Reset local caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCache() {
	    ianaZoneCache = {};
	    dtfCache = {};
	  }

	  /**
	   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
	   * @param {string} s - The string to check validity on
	   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
	   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
	   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
	   * @return {boolean}
	   */
	  static isValidSpecifier(s) {
	    return this.isValidZone(s);
	  }

	  /**
	   * Returns whether the provided string identifies a real zone
	   * @param {string} zone - The string to check
	   * @example IANAZone.isValidZone("America/New_York") //=> true
	   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
	   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
	   * @return {boolean}
	   */
	  static isValidZone(zone) {
	    if (!zone) {
	      return false;
	    }
	    try {
	      new Intl.DateTimeFormat("en-US", {
	        timeZone: zone
	      }).format();
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	  constructor(name) {
	    super();
	    /** @private **/
	    this.zoneName = name;
	    /** @private **/
	    this.valid = IANAZone.isValidZone(name);
	  }

	  /**
	   * The type of zone. `iana` for all instances of `IANAZone`.
	   * @override
	   * @type {string}
	   */
	  get type() {
	    return "iana";
	  }

	  /**
	   * The name of this zone (i.e. the IANA zone name).
	   * @override
	   * @type {string}
	   */
	  get name() {
	    return this.zoneName;
	  }

	  /**
	   * Returns whether the offset is known to be fixed for the whole year:
	   * Always returns false for all IANA zones.
	   * @override
	   * @type {boolean}
	   */
	  get isUniversal() {
	    return false;
	  }

	  /**
	   * Returns the offset's common name (such as EST) at the specified timestamp
	   * @override
	   * @param {number} ts - Epoch milliseconds for which to get the name
	   * @param {Object} opts - Options to affect the format
	   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
	   * @param {string} opts.locale - What locale to return the offset name in.
	   * @return {string}
	   */
	  offsetName(ts, {
	    format,
	    locale
	  }) {
	    return parseZoneInfo(ts, format, locale, this.name);
	  }

	  /**
	   * Returns the offset's value as a string
	   * @override
	   * @param {number} ts - Epoch milliseconds for which to get the offset
	   * @param {string} format - What style of offset to return.
	   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
	   * @return {string}
	   */
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /**
	   * Return the offset in minutes for this zone at the specified timestamp.
	   * @override
	   * @param {number} ts - Epoch milliseconds for which to compute the offset
	   * @return {number}
	   */
	  offset(ts) {
	    const date = new Date(ts);
	    if (isNaN(date)) return NaN;
	    const dtf = makeDTF(this.name);
	    let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
	    if (adOrBc === "BC") {
	      year = -Math.abs(year) + 1;
	    }

	    // because we're using hour12 and https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
	    const adjustedHour = hour === 24 ? 0 : hour;
	    const asUTC = objToLocalTS({
	      year,
	      month,
	      day,
	      hour: adjustedHour,
	      minute,
	      second,
	      millisecond: 0
	    });
	    let asTS = +date;
	    const over = asTS % 1000;
	    asTS -= over >= 0 ? over : 1000 + over;
	    return (asUTC - asTS) / (60 * 1000);
	  }

	  /**
	   * Return whether this Zone is equal to another zone
	   * @override
	   * @param {Zone} otherZone - the zone to compare
	   * @return {boolean}
	   */
	  equals(otherZone) {
	    return otherZone.type === "iana" && otherZone.name === this.name;
	  }

	  /**
	   * Return whether this Zone is valid.
	   * @override
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.valid;
	  }
	}

	// todo - remap caching

	let intlLFCache = {};
	function getCachedLF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let dtf = intlLFCache[key];
	  if (!dtf) {
	    dtf = new Intl.ListFormat(locString, opts);
	    intlLFCache[key] = dtf;
	  }
	  return dtf;
	}
	let intlDTCache = {};
	function getCachedDTF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let dtf = intlDTCache[key];
	  if (!dtf) {
	    dtf = new Intl.DateTimeFormat(locString, opts);
	    intlDTCache[key] = dtf;
	  }
	  return dtf;
	}
	let intlNumCache = {};
	function getCachedINF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let inf = intlNumCache[key];
	  if (!inf) {
	    inf = new Intl.NumberFormat(locString, opts);
	    intlNumCache[key] = inf;
	  }
	  return inf;
	}
	let intlRelCache = {};
	function getCachedRTF(locString, opts = {}) {
	  const {
	    base,
	    ...cacheKeyOpts
	  } = opts; // exclude `base` from the options
	  const key = JSON.stringify([locString, cacheKeyOpts]);
	  let inf = intlRelCache[key];
	  if (!inf) {
	    inf = new Intl.RelativeTimeFormat(locString, opts);
	    intlRelCache[key] = inf;
	  }
	  return inf;
	}
	let sysLocaleCache = null;
	function systemLocale() {
	  if (sysLocaleCache) {
	    return sysLocaleCache;
	  } else {
	    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
	    return sysLocaleCache;
	  }
	}
	let weekInfoCache = {};
	function getCachedWeekInfo(locString) {
	  let data = weekInfoCache[locString];
	  if (!data) {
	    const locale = new Intl.Locale(locString);
	    // browsers currently implement this as a property, but spec says it should be a getter function
	    data = "getWeekInfo" in locale ? locale.getWeekInfo() : locale.weekInfo;
	    weekInfoCache[locString] = data;
	  }
	  return data;
	}
	function parseLocaleString(localeStr) {
	  // I really want to avoid writing a BCP 47 parser
	  // see, e.g. https://github.com/wooorm/bcp-47
	  // Instead, we'll do this:

	  // a) if the string has no -u extensions, just leave it alone
	  // b) if it does, use Intl to resolve everything
	  // c) if Intl fails, try again without the -u

	  // private subtags and unicode subtags have ordering requirements,
	  // and we're not properly parsing this, so just strip out the
	  // private ones if they exist.
	  const xIndex = localeStr.indexOf("-x-");
	  if (xIndex !== -1) {
	    localeStr = localeStr.substring(0, xIndex);
	  }
	  const uIndex = localeStr.indexOf("-u-");
	  if (uIndex === -1) {
	    return [localeStr];
	  } else {
	    let options;
	    let selectedStr;
	    try {
	      options = getCachedDTF(localeStr).resolvedOptions();
	      selectedStr = localeStr;
	    } catch (e) {
	      const smaller = localeStr.substring(0, uIndex);
	      options = getCachedDTF(smaller).resolvedOptions();
	      selectedStr = smaller;
	    }
	    const {
	      numberingSystem,
	      calendar
	    } = options;
	    return [selectedStr, numberingSystem, calendar];
	  }
	}
	function intlConfigString(localeStr, numberingSystem, outputCalendar) {
	  if (outputCalendar || numberingSystem) {
	    if (!localeStr.includes("-u-")) {
	      localeStr += "-u";
	    }
	    if (outputCalendar) {
	      localeStr += `-ca-${outputCalendar}`;
	    }
	    if (numberingSystem) {
	      localeStr += `-nu-${numberingSystem}`;
	    }
	    return localeStr;
	  } else {
	    return localeStr;
	  }
	}
	function mapMonths(f) {
	  const ms = [];
	  for (let i = 1; i <= 12; i++) {
	    const dt = DateTime.utc(2009, i, 1);
	    ms.push(f(dt));
	  }
	  return ms;
	}
	function mapWeekdays(f) {
	  const ms = [];
	  for (let i = 1; i <= 7; i++) {
	    const dt = DateTime.utc(2016, 11, 13 + i);
	    ms.push(f(dt));
	  }
	  return ms;
	}
	function listStuff(loc, length, englishFn, intlFn) {
	  const mode = loc.listingMode();
	  if (mode === "error") {
	    return null;
	  } else if (mode === "en") {
	    return englishFn(length);
	  } else {
	    return intlFn(length);
	  }
	}
	function supportsFastNumbers(loc) {
	  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
	    return false;
	  } else {
	    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
	  }
	}

	/**
	 * @private
	 */

	class PolyNumberFormatter {
	  constructor(intl, forceSimple, opts) {
	    this.padTo = opts.padTo || 0;
	    this.floor = opts.floor || false;
	    const {
	      padTo,
	      floor,
	      ...otherOpts
	    } = opts;
	    if (!forceSimple || Object.keys(otherOpts).length > 0) {
	      const intlOpts = {
	        useGrouping: false,
	        ...opts
	      };
	      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
	      this.inf = getCachedINF(intl, intlOpts);
	    }
	  }
	  format(i) {
	    if (this.inf) {
	      const fixed = this.floor ? Math.floor(i) : i;
	      return this.inf.format(fixed);
	    } else {
	      // to match the browser's numberformatter defaults
	      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
	      return padStart(fixed, this.padTo);
	    }
	  }
	}

	/**
	 * @private
	 */

	class PolyDateFormatter {
	  constructor(dt, intl, opts) {
	    this.opts = opts;
	    this.originalZone = undefined;
	    let z = undefined;
	    if (this.opts.timeZone) {
	      // Don't apply any workarounds if a timeZone is explicitly provided in opts
	      this.dt = dt;
	    } else if (dt.zone.type === "fixed") {
	      // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
	      // That is why fixed-offset TZ is set to that unless it is:
	      // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
	      // 2. Unsupported by the browser:
	      //    - some do not support Etc/
	      //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
	      const gmtOffset = -1 * (dt.offset / 60);
	      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
	      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
	        z = offsetZ;
	        this.dt = dt;
	      } else {
	        // Not all fixed-offset zones like Etc/+4:30 are present in tzdata so
	        // we manually apply the offset and substitute the zone as needed.
	        z = "UTC";
	        this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({
	          minutes: dt.offset
	        });
	        this.originalZone = dt.zone;
	      }
	    } else if (dt.zone.type === "system") {
	      this.dt = dt;
	    } else if (dt.zone.type === "iana") {
	      this.dt = dt;
	      z = dt.zone.name;
	    } else {
	      // Custom zones can have any offset / offsetName so we just manually
	      // apply the offset and substitute the zone as needed.
	      z = "UTC";
	      this.dt = dt.setZone("UTC").plus({
	        minutes: dt.offset
	      });
	      this.originalZone = dt.zone;
	    }
	    const intlOpts = {
	      ...this.opts
	    };
	    intlOpts.timeZone = intlOpts.timeZone || z;
	    this.dtf = getCachedDTF(intl, intlOpts);
	  }
	  format() {
	    if (this.originalZone) {
	      // If we have to substitute in the actual zone name, we have to use
	      // formatToParts so that the timezone can be replaced.
	      return this.formatToParts().map(({
	        value
	      }) => value).join("");
	    }
	    return this.dtf.format(this.dt.toJSDate());
	  }
	  formatToParts() {
	    const parts = this.dtf.formatToParts(this.dt.toJSDate());
	    if (this.originalZone) {
	      return parts.map(part => {
	        if (part.type === "timeZoneName") {
	          const offsetName = this.originalZone.offsetName(this.dt.ts, {
	            locale: this.dt.locale,
	            format: this.opts.timeZoneName
	          });
	          return {
	            ...part,
	            value: offsetName
	          };
	        } else {
	          return part;
	        }
	      });
	    }
	    return parts;
	  }
	  resolvedOptions() {
	    return this.dtf.resolvedOptions();
	  }
	}

	/**
	 * @private
	 */
	class PolyRelFormatter {
	  constructor(intl, isEnglish, opts) {
	    this.opts = {
	      style: "long",
	      ...opts
	    };
	    if (!isEnglish && hasRelative()) {
	      this.rtf = getCachedRTF(intl, opts);
	    }
	  }
	  format(count, unit) {
	    if (this.rtf) {
	      return this.rtf.format(count, unit);
	    } else {
	      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
	    }
	  }
	  formatToParts(count, unit) {
	    if (this.rtf) {
	      return this.rtf.formatToParts(count, unit);
	    } else {
	      return [];
	    }
	  }
	}
	const fallbackWeekSettings = {
	  firstDay: 1,
	  minimalDays: 4,
	  weekend: [6, 7]
	};

	/**
	 * @private
	 */

	class Locale {
	  static fromOpts(opts) {
	    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.weekSettings, opts.defaultToEN);
	  }
	  static create(locale, numberingSystem, outputCalendar, weekSettings, defaultToEN = false) {
	    const specifiedLocale = locale || Settings.defaultLocale;
	    // the system locale is useful for human-readable strings but annoying for parsing/formatting known formats
	    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
	    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
	    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
	    const weekSettingsR = validateWeekSettings(weekSettings) || Settings.defaultWeekSettings;
	    return new Locale(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
	  }
	  static resetCache() {
	    sysLocaleCache = null;
	    intlDTCache = {};
	    intlNumCache = {};
	    intlRelCache = {};
	  }
	  static fromObject({
	    locale,
	    numberingSystem,
	    outputCalendar,
	    weekSettings
	  } = {}) {
	    return Locale.create(locale, numberingSystem, outputCalendar, weekSettings);
	  }
	  constructor(locale, numbering, outputCalendar, weekSettings, specifiedLocale) {
	    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
	    this.locale = parsedLocale;
	    this.numberingSystem = numbering || parsedNumberingSystem || null;
	    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
	    this.weekSettings = weekSettings;
	    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
	    this.weekdaysCache = {
	      format: {},
	      standalone: {}
	    };
	    this.monthsCache = {
	      format: {},
	      standalone: {}
	    };
	    this.meridiemCache = null;
	    this.eraCache = {};
	    this.specifiedLocale = specifiedLocale;
	    this.fastNumbersCached = null;
	  }
	  get fastNumbers() {
	    if (this.fastNumbersCached == null) {
	      this.fastNumbersCached = supportsFastNumbers(this);
	    }
	    return this.fastNumbersCached;
	  }
	  listingMode() {
	    const isActuallyEn = this.isEnglish();
	    const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
	    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
	  }
	  clone(alts) {
	    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
	      return this;
	    } else {
	      return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, validateWeekSettings(alts.weekSettings) || this.weekSettings, alts.defaultToEN || false);
	    }
	  }
	  redefaultToEN(alts = {}) {
	    return this.clone({
	      ...alts,
	      defaultToEN: true
	    });
	  }
	  redefaultToSystem(alts = {}) {
	    return this.clone({
	      ...alts,
	      defaultToEN: false
	    });
	  }
	  months(length, format = false) {
	    return listStuff(this, length, months, () => {
	      const intl = format ? {
	          month: length,
	          day: "numeric"
	        } : {
	          month: length
	        },
	        formatStr = format ? "format" : "standalone";
	      if (!this.monthsCache[formatStr][length]) {
	        this.monthsCache[formatStr][length] = mapMonths(dt => this.extract(dt, intl, "month"));
	      }
	      return this.monthsCache[formatStr][length];
	    });
	  }
	  weekdays(length, format = false) {
	    return listStuff(this, length, weekdays, () => {
	      const intl = format ? {
	          weekday: length,
	          year: "numeric",
	          month: "long",
	          day: "numeric"
	        } : {
	          weekday: length
	        },
	        formatStr = format ? "format" : "standalone";
	      if (!this.weekdaysCache[formatStr][length]) {
	        this.weekdaysCache[formatStr][length] = mapWeekdays(dt => this.extract(dt, intl, "weekday"));
	      }
	      return this.weekdaysCache[formatStr][length];
	    });
	  }
	  meridiems() {
	    return listStuff(this, undefined, () => meridiems, () => {
	      // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
	      // for AM and PM. This is probably wrong, but it's makes parsing way easier.
	      if (!this.meridiemCache) {
	        const intl = {
	          hour: "numeric",
	          hourCycle: "h12"
	        };
	        this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(dt => this.extract(dt, intl, "dayperiod"));
	      }
	      return this.meridiemCache;
	    });
	  }
	  eras(length) {
	    return listStuff(this, length, eras, () => {
	      const intl = {
	        era: length
	      };

	      // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
	      // to definitely enumerate them.
	      if (!this.eraCache[length]) {
	        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(dt => this.extract(dt, intl, "era"));
	      }
	      return this.eraCache[length];
	    });
	  }
	  extract(dt, intlOpts, field) {
	    const df = this.dtFormatter(dt, intlOpts),
	      results = df.formatToParts(),
	      matching = results.find(m => m.type.toLowerCase() === field);
	    return matching ? matching.value : null;
	  }
	  numberFormatter(opts = {}) {
	    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
	    // (in contrast, the rest of the condition is used heavily)
	    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
	  }
	  dtFormatter(dt, intlOpts = {}) {
	    return new PolyDateFormatter(dt, this.intl, intlOpts);
	  }
	  relFormatter(opts = {}) {
	    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
	  }
	  listFormatter(opts = {}) {
	    return getCachedLF(this.intl, opts);
	  }
	  isEnglish() {
	    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
	  }
	  getWeekSettings() {
	    if (this.weekSettings) {
	      return this.weekSettings;
	    } else if (!hasLocaleWeekInfo()) {
	      return fallbackWeekSettings;
	    } else {
	      return getCachedWeekInfo(this.locale);
	    }
	  }
	  getStartOfWeek() {
	    return this.getWeekSettings().firstDay;
	  }
	  getMinDaysInFirstWeek() {
	    return this.getWeekSettings().minimalDays;
	  }
	  getWeekendDays() {
	    return this.getWeekSettings().weekend;
	  }
	  equals(other) {
	    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
	  }
	  toString() {
	    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
	  }
	}

	let singleton = null;

	/**
	 * A zone with a fixed offset (meaning no DST)
	 * @implements {Zone}
	 */
	class FixedOffsetZone extends Zone {
	  /**
	   * Get a singleton instance of UTC
	   * @return {FixedOffsetZone}
	   */
	  static get utcInstance() {
	    if (singleton === null) {
	      singleton = new FixedOffsetZone(0);
	    }
	    return singleton;
	  }

	  /**
	   * Get an instance with a specified offset
	   * @param {number} offset - The offset in minutes
	   * @return {FixedOffsetZone}
	   */
	  static instance(offset) {
	    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
	  }

	  /**
	   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
	   * @param {string} s - The offset string to parse
	   * @example FixedOffsetZone.parseSpecifier("UTC+6")
	   * @example FixedOffsetZone.parseSpecifier("UTC+06")
	   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
	   * @return {FixedOffsetZone}
	   */
	  static parseSpecifier(s) {
	    if (s) {
	      const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
	      if (r) {
	        return new FixedOffsetZone(signedOffset(r[1], r[2]));
	      }
	    }
	    return null;
	  }
	  constructor(offset) {
	    super();
	    /** @private **/
	    this.fixed = offset;
	  }

	  /**
	   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
	   * @override
	   * @type {string}
	   */
	  get type() {
	    return "fixed";
	  }

	  /**
	   * The name of this zone.
	   * All fixed zones' names always start with "UTC" (plus optional offset)
	   * @override
	   * @type {string}
	   */
	  get name() {
	    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
	  }

	  /**
	   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
	   *
	   * @override
	   * @type {string}
	   */
	  get ianaName() {
	    if (this.fixed === 0) {
	      return "Etc/UTC";
	    } else {
	      return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
	    }
	  }

	  /**
	   * Returns the offset's common name at the specified timestamp.
	   *
	   * For fixed offset zones this equals to the zone name.
	   * @override
	   */
	  offsetName() {
	    return this.name;
	  }

	  /**
	   * Returns the offset's value as a string
	   * @override
	   * @param {number} ts - Epoch milliseconds for which to get the offset
	   * @param {string} format - What style of offset to return.
	   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
	   * @return {string}
	   */
	  formatOffset(ts, format) {
	    return formatOffset(this.fixed, format);
	  }

	  /**
	   * Returns whether the offset is known to be fixed for the whole year:
	   * Always returns true for all fixed offset zones.
	   * @override
	   * @type {boolean}
	   */
	  get isUniversal() {
	    return true;
	  }

	  /**
	   * Return the offset in minutes for this zone at the specified timestamp.
	   *
	   * For fixed offset zones, this is constant and does not depend on a timestamp.
	   * @override
	   * @return {number}
	   */
	  offset() {
	    return this.fixed;
	  }

	  /**
	   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
	   * @override
	   * @param {Zone} otherZone - the zone to compare
	   * @return {boolean}
	   */
	  equals(otherZone) {
	    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
	  }

	  /**
	   * Return whether this Zone is valid:
	   * All fixed offset zones are valid.
	   * @override
	   * @type {boolean}
	   */
	  get isValid() {
	    return true;
	  }
	}

	/**
	 * A zone that failed to parse. You should never need to instantiate this.
	 * @implements {Zone}
	 */
	class InvalidZone extends Zone {
	  constructor(zoneName) {
	    super();
	    /**  @private */
	    this.zoneName = zoneName;
	  }

	  /** @override **/
	  get type() {
	    return "invalid";
	  }

	  /** @override **/
	  get name() {
	    return this.zoneName;
	  }

	  /** @override **/
	  get isUniversal() {
	    return false;
	  }

	  /** @override **/
	  offsetName() {
	    return null;
	  }

	  /** @override **/
	  formatOffset() {
	    return "";
	  }

	  /** @override **/
	  offset() {
	    return NaN;
	  }

	  /** @override **/
	  equals() {
	    return false;
	  }

	  /** @override **/
	  get isValid() {
	    return false;
	  }
	}

	/**
	 * @private
	 */

	function normalizeZone(input, defaultZone) {
	  if (isUndefined(input) || input === null) {
	    return defaultZone;
	  } else if (input instanceof Zone) {
	    return input;
	  } else if (isString(input)) {
	    const lowered = input.toLowerCase();
	    if (lowered === "default") return defaultZone;else if (lowered === "local" || lowered === "system") return SystemZone.instance;else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
	  } else if (isNumber(input)) {
	    return FixedOffsetZone.instance(input);
	  } else if (typeof input === "object" && "offset" in input && typeof input.offset === "function") {
	    // This is dumb, but the instanceof check above doesn't seem to really work
	    // so we're duck checking it
	    return input;
	  } else {
	    return new InvalidZone(input);
	  }
	}

	const numberingSystems = {
	  arab: "[\u0660-\u0669]",
	  arabext: "[\u06F0-\u06F9]",
	  bali: "[\u1B50-\u1B59]",
	  beng: "[\u09E6-\u09EF]",
	  deva: "[\u0966-\u096F]",
	  fullwide: "[\uFF10-\uFF19]",
	  gujr: "[\u0AE6-\u0AEF]",
	  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
	  khmr: "[\u17E0-\u17E9]",
	  knda: "[\u0CE6-\u0CEF]",
	  laoo: "[\u0ED0-\u0ED9]",
	  limb: "[\u1946-\u194F]",
	  mlym: "[\u0D66-\u0D6F]",
	  mong: "[\u1810-\u1819]",
	  mymr: "[\u1040-\u1049]",
	  orya: "[\u0B66-\u0B6F]",
	  tamldec: "[\u0BE6-\u0BEF]",
	  telu: "[\u0C66-\u0C6F]",
	  thai: "[\u0E50-\u0E59]",
	  tibt: "[\u0F20-\u0F29]",
	  latn: "\\d"
	};
	const numberingSystemsUTF16 = {
	  arab: [1632, 1641],
	  arabext: [1776, 1785],
	  bali: [6992, 7001],
	  beng: [2534, 2543],
	  deva: [2406, 2415],
	  fullwide: [65296, 65303],
	  gujr: [2790, 2799],
	  khmr: [6112, 6121],
	  knda: [3302, 3311],
	  laoo: [3792, 3801],
	  limb: [6470, 6479],
	  mlym: [3430, 3439],
	  mong: [6160, 6169],
	  mymr: [4160, 4169],
	  orya: [2918, 2927],
	  tamldec: [3046, 3055],
	  telu: [3174, 3183],
	  thai: [3664, 3673],
	  tibt: [3872, 3881]
	};
	const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
	function parseDigits(str) {
	  let value = parseInt(str, 10);
	  if (isNaN(value)) {
	    value = "";
	    for (let i = 0; i < str.length; i++) {
	      const code = str.charCodeAt(i);
	      if (str[i].search(numberingSystems.hanidec) !== -1) {
	        value += hanidecChars.indexOf(str[i]);
	      } else {
	        for (const key in numberingSystemsUTF16) {
	          const [min, max] = numberingSystemsUTF16[key];
	          if (code >= min && code <= max) {
	            value += code - min;
	          }
	        }
	      }
	    }
	    return parseInt(value, 10);
	  } else {
	    return value;
	  }
	}

	// cache of {numberingSystem: {append: regex}}
	let digitRegexCache = {};
	function resetDigitRegexCache() {
	  digitRegexCache = {};
	}
	function digitRegex({
	  numberingSystem
	}, append = "") {
	  const ns = numberingSystem || "latn";
	  if (!digitRegexCache[ns]) {
	    digitRegexCache[ns] = {};
	  }
	  if (!digitRegexCache[ns][append]) {
	    digitRegexCache[ns][append] = new RegExp(`${numberingSystems[ns]}${append}`);
	  }
	  return digitRegexCache[ns][append];
	}

	let now = () => Date.now(),
	  defaultZone = "system",
	  defaultLocale = null,
	  defaultNumberingSystem = null,
	  defaultOutputCalendar = null,
	  twoDigitCutoffYear = 60,
	  throwOnInvalid,
	  defaultWeekSettings = null;

	/**
	 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
	 */
	class Settings {
	  /**
	   * Get the callback for returning the current timestamp.
	   * @type {function}
	   */
	  static get now() {
	    return now;
	  }

	  /**
	   * Set the callback for returning the current timestamp.
	   * The function should return a number, which will be interpreted as an Epoch millisecond count
	   * @type {function}
	   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
	   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
	   */
	  static set now(n) {
	    now = n;
	  }

	  /**
	   * Set the default time zone to create DateTimes in. Does not affect existing instances.
	   * Use the value "system" to reset this value to the system's time zone.
	   * @type {string}
	   */
	  static set defaultZone(zone) {
	    defaultZone = zone;
	  }

	  /**
	   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
	   * The default value is the system's time zone (the one set on the machine that runs this code).
	   * @type {Zone}
	   */
	  static get defaultZone() {
	    return normalizeZone(defaultZone, SystemZone.instance);
	  }

	  /**
	   * Get the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultLocale() {
	    return defaultLocale;
	  }

	  /**
	   * Set the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultLocale(locale) {
	    defaultLocale = locale;
	  }

	  /**
	   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultNumberingSystem() {
	    return defaultNumberingSystem;
	  }

	  /**
	   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultNumberingSystem(numberingSystem) {
	    defaultNumberingSystem = numberingSystem;
	  }

	  /**
	   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultOutputCalendar() {
	    return defaultOutputCalendar;
	  }

	  /**
	   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultOutputCalendar(outputCalendar) {
	    defaultOutputCalendar = outputCalendar;
	  }

	  /**
	   * @typedef {Object} WeekSettings
	   * @property {number} firstDay
	   * @property {number} minimalDays
	   * @property {number[]} weekend
	   */

	  /**
	   * @return {WeekSettings|null}
	   */
	  static get defaultWeekSettings() {
	    return defaultWeekSettings;
	  }

	  /**
	   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
	   * how many days are required in the first week of a year.
	   * Does not affect existing instances.
	   *
	   * @param {WeekSettings|null} weekSettings
	   */
	  static set defaultWeekSettings(weekSettings) {
	    defaultWeekSettings = validateWeekSettings(weekSettings);
	  }

	  /**
	   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
	   * @type {number}
	   */
	  static get twoDigitCutoffYear() {
	    return twoDigitCutoffYear;
	  }

	  /**
	   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
	   * @type {number}
	   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
	   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
	   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
	   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
	   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
	   */
	  static set twoDigitCutoffYear(cutoffYear) {
	    twoDigitCutoffYear = cutoffYear % 100;
	  }

	  /**
	   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static get throwOnInvalid() {
	    return throwOnInvalid;
	  }

	  /**
	   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static set throwOnInvalid(t) {
	    throwOnInvalid = t;
	  }

	  /**
	   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCaches() {
	    Locale.resetCache();
	    IANAZone.resetCache();
	    DateTime.resetCache();
	    resetDigitRegexCache();
	  }
	}

	class Invalid {
	  constructor(reason, explanation) {
	    this.reason = reason;
	    this.explanation = explanation;
	  }
	  toMessage() {
	    if (this.explanation) {
	      return `${this.reason}: ${this.explanation}`;
	    } else {
	      return this.reason;
	    }
	  }
	}

	const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
	  leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
	function unitOutOfRange(unit, value) {
	  return new Invalid("unit out of range", `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
	}
	function dayOfWeek(year, month, day) {
	  const d = new Date(Date.UTC(year, month - 1, day));
	  if (year < 100 && year >= 0) {
	    d.setUTCFullYear(d.getUTCFullYear() - 1900);
	  }
	  const js = d.getUTCDay();
	  return js === 0 ? 7 : js;
	}
	function computeOrdinal(year, month, day) {
	  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
	}
	function uncomputeOrdinal(year, ordinal) {
	  const table = isLeapYear(year) ? leapLadder : nonLeapLadder,
	    month0 = table.findIndex(i => i < ordinal),
	    day = ordinal - table[month0];
	  return {
	    month: month0 + 1,
	    day
	  };
	}
	function isoWeekdayToLocal(isoWeekday, startOfWeek) {
	  return (isoWeekday - startOfWeek + 7) % 7 + 1;
	}

	/**
	 * @private
	 */

	function gregorianToWeek(gregObj, minDaysInFirstWeek = 4, startOfWeek = 1) {
	  const {
	      year,
	      month,
	      day
	    } = gregObj,
	    ordinal = computeOrdinal(year, month, day),
	    weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);
	  let weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7),
	    weekYear;
	  if (weekNumber < 1) {
	    weekYear = year - 1;
	    weekNumber = weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek);
	  } else if (weekNumber > weeksInWeekYear(year, minDaysInFirstWeek, startOfWeek)) {
	    weekYear = year + 1;
	    weekNumber = 1;
	  } else {
	    weekYear = year;
	  }
	  return {
	    weekYear,
	    weekNumber,
	    weekday,
	    ...timeObject(gregObj)
	  };
	}
	function weekToGregorian(weekData, minDaysInFirstWeek = 4, startOfWeek = 1) {
	  const {
	      weekYear,
	      weekNumber,
	      weekday
	    } = weekData,
	    weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek),
	    yearInDays = daysInYear(weekYear);
	  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek,
	    year;
	  if (ordinal < 1) {
	    year = weekYear - 1;
	    ordinal += daysInYear(year);
	  } else if (ordinal > yearInDays) {
	    year = weekYear + 1;
	    ordinal -= daysInYear(weekYear);
	  } else {
	    year = weekYear;
	  }
	  const {
	    month,
	    day
	  } = uncomputeOrdinal(year, ordinal);
	  return {
	    year,
	    month,
	    day,
	    ...timeObject(weekData)
	  };
	}
	function gregorianToOrdinal(gregData) {
	  const {
	    year,
	    month,
	    day
	  } = gregData;
	  const ordinal = computeOrdinal(year, month, day);
	  return {
	    year,
	    ordinal,
	    ...timeObject(gregData)
	  };
	}
	function ordinalToGregorian(ordinalData) {
	  const {
	    year,
	    ordinal
	  } = ordinalData;
	  const {
	    month,
	    day
	  } = uncomputeOrdinal(year, ordinal);
	  return {
	    year,
	    month,
	    day,
	    ...timeObject(ordinalData)
	  };
	}

	/**
	 * Check if local week units like localWeekday are used in obj.
	 * If so, validates that they are not mixed with ISO week units and then copies them to the normal week unit properties.
	 * Modifies obj in-place!
	 * @param obj the object values
	 */
	function usesLocalWeekValues(obj, loc) {
	  const hasLocaleWeekData = !isUndefined(obj.localWeekday) || !isUndefined(obj.localWeekNumber) || !isUndefined(obj.localWeekYear);
	  if (hasLocaleWeekData) {
	    const hasIsoWeekData = !isUndefined(obj.weekday) || !isUndefined(obj.weekNumber) || !isUndefined(obj.weekYear);
	    if (hasIsoWeekData) {
	      throw new ConflictingSpecificationError("Cannot mix locale-based week fields with ISO-based week fields");
	    }
	    if (!isUndefined(obj.localWeekday)) obj.weekday = obj.localWeekday;
	    if (!isUndefined(obj.localWeekNumber)) obj.weekNumber = obj.localWeekNumber;
	    if (!isUndefined(obj.localWeekYear)) obj.weekYear = obj.localWeekYear;
	    delete obj.localWeekday;
	    delete obj.localWeekNumber;
	    delete obj.localWeekYear;
	    return {
	      minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
	      startOfWeek: loc.getStartOfWeek()
	    };
	  } else {
	    return {
	      minDaysInFirstWeek: 4,
	      startOfWeek: 1
	    };
	  }
	}
	function hasInvalidWeekData(obj, minDaysInFirstWeek = 4, startOfWeek = 1) {
	  const validYear = isInteger(obj.weekYear),
	    validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear, minDaysInFirstWeek, startOfWeek)),
	    validWeekday = integerBetween(obj.weekday, 1, 7);
	  if (!validYear) {
	    return unitOutOfRange("weekYear", obj.weekYear);
	  } else if (!validWeek) {
	    return unitOutOfRange("week", obj.weekNumber);
	  } else if (!validWeekday) {
	    return unitOutOfRange("weekday", obj.weekday);
	  } else return false;
	}
	function hasInvalidOrdinalData(obj) {
	  const validYear = isInteger(obj.year),
	    validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validOrdinal) {
	    return unitOutOfRange("ordinal", obj.ordinal);
	  } else return false;
	}
	function hasInvalidGregorianData(obj) {
	  const validYear = isInteger(obj.year),
	    validMonth = integerBetween(obj.month, 1, 12),
	    validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validMonth) {
	    return unitOutOfRange("month", obj.month);
	  } else if (!validDay) {
	    return unitOutOfRange("day", obj.day);
	  } else return false;
	}
	function hasInvalidTimeData(obj) {
	  const {
	    hour,
	    minute,
	    second,
	    millisecond
	  } = obj;
	  const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0,
	    validMinute = integerBetween(minute, 0, 59),
	    validSecond = integerBetween(second, 0, 59),
	    validMillisecond = integerBetween(millisecond, 0, 999);
	  if (!validHour) {
	    return unitOutOfRange("hour", hour);
	  } else if (!validMinute) {
	    return unitOutOfRange("minute", minute);
	  } else if (!validSecond) {
	    return unitOutOfRange("second", second);
	  } else if (!validMillisecond) {
	    return unitOutOfRange("millisecond", millisecond);
	  } else return false;
	}

	/*
	  This is just a junk drawer, containing anything used across multiple classes.
	  Because Luxon is small(ish), this should stay small and we won't worry about splitting
	  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
	*/


	/**
	 * @private
	 */

	// TYPES

	function isUndefined(o) {
	  return typeof o === "undefined";
	}
	function isNumber(o) {
	  return typeof o === "number";
	}
	function isInteger(o) {
	  return typeof o === "number" && o % 1 === 0;
	}
	function isString(o) {
	  return typeof o === "string";
	}
	function isDate(o) {
	  return Object.prototype.toString.call(o) === "[object Date]";
	}

	// CAPABILITIES

	function hasRelative() {
	  try {
	    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
	  } catch (e) {
	    return false;
	  }
	}
	function hasLocaleWeekInfo() {
	  try {
	    return typeof Intl !== "undefined" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
	  } catch (e) {
	    return false;
	  }
	}

	// OBJECTS AND ARRAYS

	function maybeArray(thing) {
	  return Array.isArray(thing) ? thing : [thing];
	}
	function bestBy(arr, by, compare) {
	  if (arr.length === 0) {
	    return undefined;
	  }
	  return arr.reduce((best, next) => {
	    const pair = [by(next), next];
	    if (!best) {
	      return pair;
	    } else if (compare(best[0], pair[0]) === best[0]) {
	      return best;
	    } else {
	      return pair;
	    }
	  }, null)[1];
	}
	function pick(obj, keys) {
	  return keys.reduce((a, k) => {
	    a[k] = obj[k];
	    return a;
	  }, {});
	}
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	function validateWeekSettings(settings) {
	  if (settings == null) {
	    return null;
	  } else if (typeof settings !== "object") {
	    throw new InvalidArgumentError("Week settings must be an object");
	  } else {
	    if (!integerBetween(settings.firstDay, 1, 7) || !integerBetween(settings.minimalDays, 1, 7) || !Array.isArray(settings.weekend) || settings.weekend.some(v => !integerBetween(v, 1, 7))) {
	      throw new InvalidArgumentError("Invalid week settings");
	    }
	    return {
	      firstDay: settings.firstDay,
	      minimalDays: settings.minimalDays,
	      weekend: Array.from(settings.weekend)
	    };
	  }
	}

	// NUMBERS AND STRINGS

	function integerBetween(thing, bottom, top) {
	  return isInteger(thing) && thing >= bottom && thing <= top;
	}

	// x % n but takes the sign of n instead of x
	function floorMod(x, n) {
	  return x - n * Math.floor(x / n);
	}
	function padStart(input, n = 2) {
	  const isNeg = input < 0;
	  let padded;
	  if (isNeg) {
	    padded = "-" + ("" + -input).padStart(n, "0");
	  } else {
	    padded = ("" + input).padStart(n, "0");
	  }
	  return padded;
	}
	function parseInteger(string) {
	  if (isUndefined(string) || string === null || string === "") {
	    return undefined;
	  } else {
	    return parseInt(string, 10);
	  }
	}
	function parseFloating(string) {
	  if (isUndefined(string) || string === null || string === "") {
	    return undefined;
	  } else {
	    return parseFloat(string);
	  }
	}
	function parseMillis(fraction) {
	  // Return undefined (instead of 0) in these cases, where fraction is not set
	  if (isUndefined(fraction) || fraction === null || fraction === "") {
	    return undefined;
	  } else {
	    const f = parseFloat("0." + fraction) * 1000;
	    return Math.floor(f);
	  }
	}
	function roundTo(number, digits, towardZero = false) {
	  const factor = 10 ** digits,
	    rounder = towardZero ? Math.trunc : Math.round;
	  return rounder(number * factor) / factor;
	}

	// DATE BASICS

	function isLeapYear(year) {
	  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}
	function daysInYear(year) {
	  return isLeapYear(year) ? 366 : 365;
	}
	function daysInMonth(year, month) {
	  const modMonth = floorMod(month - 1, 12) + 1,
	    modYear = year + (month - modMonth) / 12;
	  if (modMonth === 2) {
	    return isLeapYear(modYear) ? 29 : 28;
	  } else {
	    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
	  }
	}

	// convert a calendar object to a local timestamp (epoch, but with the offset baked in)
	function objToLocalTS(obj) {
	  let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);

	  // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
	  if (obj.year < 100 && obj.year >= 0) {
	    d = new Date(d);
	    // set the month and day again, this is necessary because year 2000 is a leap year, but year 100 is not
	    // so if obj.year is in 99, but obj.day makes it roll over into year 100,
	    // the calculations done by Date.UTC are using year 2000 - which is incorrect
	    d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
	  }
	  return +d;
	}

	// adapted from moment.js: https://github.com/moment/moment/blob/000ac1800e620f770f4eb31b5ae908f6167b0ab2/src/lib/units/week-calendar-utils.js
	function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
	  const fwdlw = isoWeekdayToLocal(dayOfWeek(year, 1, minDaysInFirstWeek), startOfWeek);
	  return -fwdlw + minDaysInFirstWeek - 1;
	}
	function weeksInWeekYear(weekYear, minDaysInFirstWeek = 4, startOfWeek = 1) {
	  const weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
	  const weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
	  return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
	}
	function untruncateYear(year) {
	  if (year > 99) {
	    return year;
	  } else return year > Settings.twoDigitCutoffYear ? 1900 + year : 2000 + year;
	}

	// PARSING

	function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
	  const date = new Date(ts),
	    intlOpts = {
	      hourCycle: "h23",
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit"
	    };
	  if (timeZone) {
	    intlOpts.timeZone = timeZone;
	  }
	  const modified = {
	    timeZoneName: offsetFormat,
	    ...intlOpts
	  };
	  const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(m => m.type.toLowerCase() === "timezonename");
	  return parsed ? parsed.value : null;
	}

	// signedOffset('-5', '30') -> -330
	function signedOffset(offHourStr, offMinuteStr) {
	  let offHour = parseInt(offHourStr, 10);

	  // don't || this because we want to preserve -0
	  if (Number.isNaN(offHour)) {
	    offHour = 0;
	  }
	  const offMin = parseInt(offMinuteStr, 10) || 0,
	    offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
	  return offHour * 60 + offMinSigned;
	}

	// COERCION

	function asNumber(value) {
	  const numericValue = Number(value);
	  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) throw new InvalidArgumentError(`Invalid unit value ${value}`);
	  return numericValue;
	}
	function normalizeObject(obj, normalizer) {
	  const normalized = {};
	  for (const u in obj) {
	    if (hasOwnProperty(obj, u)) {
	      const v = obj[u];
	      if (v === undefined || v === null) continue;
	      normalized[normalizer(u)] = asNumber(v);
	    }
	  }
	  return normalized;
	}

	/**
	 * Returns the offset's value as a string
	 * @param {number} ts - Epoch milliseconds for which to get the offset
	 * @param {string} format - What style of offset to return.
	 *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
	 * @return {string}
	 */
	function formatOffset(offset, format) {
	  const hours = Math.trunc(Math.abs(offset / 60)),
	    minutes = Math.trunc(Math.abs(offset % 60)),
	    sign = offset >= 0 ? "+" : "-";
	  switch (format) {
	    case "short":
	      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
	    case "narrow":
	      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
	    case "techie":
	      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
	    default:
	      throw new RangeError(`Value format ${format} is out of range for property format`);
	  }
	}
	function timeObject(obj) {
	  return pick(obj, ["hour", "minute", "second", "millisecond"]);
	}

	/**
	 * @private
	 */

	const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
	function months(length) {
	  switch (length) {
	    case "narrow":
	      return [...monthsNarrow];
	    case "short":
	      return [...monthsShort];
	    case "long":
	      return [...monthsLong];
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	    case "2-digit":
	      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	    default:
	      return null;
	  }
	}
	const weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
	function weekdays(length) {
	  switch (length) {
	    case "narrow":
	      return [...weekdaysNarrow];
	    case "short":
	      return [...weekdaysShort];
	    case "long":
	      return [...weekdaysLong];
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7"];
	    default:
	      return null;
	  }
	}
	const meridiems = ["AM", "PM"];
	const erasLong = ["Before Christ", "Anno Domini"];
	const erasShort = ["BC", "AD"];
	const erasNarrow = ["B", "A"];
	function eras(length) {
	  switch (length) {
	    case "narrow":
	      return [...erasNarrow];
	    case "short":
	      return [...erasShort];
	    case "long":
	      return [...erasLong];
	    default:
	      return null;
	  }
	}
	function meridiemForDateTime(dt) {
	  return meridiems[dt.hour < 12 ? 0 : 1];
	}
	function weekdayForDateTime(dt, length) {
	  return weekdays(length)[dt.weekday - 1];
	}
	function monthForDateTime(dt, length) {
	  return months(length)[dt.month - 1];
	}
	function eraForDateTime(dt, length) {
	  return eras(length)[dt.year < 0 ? 0 : 1];
	}
	function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
	  const units = {
	    years: ["year", "yr."],
	    quarters: ["quarter", "qtr."],
	    months: ["month", "mo."],
	    weeks: ["week", "wk."],
	    days: ["day", "day", "days"],
	    hours: ["hour", "hr."],
	    minutes: ["minute", "min."],
	    seconds: ["second", "sec."]
	  };
	  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
	  if (numeric === "auto" && lastable) {
	    const isDay = unit === "days";
	    switch (count) {
	      case 1:
	        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
	      case -1:
	        return isDay ? "yesterday" : `last ${units[unit][0]}`;
	      case 0:
	        return isDay ? "today" : `this ${units[unit][0]}`;
	    }
	  }
	  const isInPast = Object.is(count, -0) || count < 0,
	    fmtValue = Math.abs(count),
	    singular = fmtValue === 1,
	    lilUnits = units[unit],
	    fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
	  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
	}

	function stringifyTokens(splits, tokenToString) {
	  let s = "";
	  for (const token of splits) {
	    if (token.literal) {
	      s += token.val;
	    } else {
	      s += tokenToString(token.val);
	    }
	  }
	  return s;
	}
	const macroTokenToFormatOpts = {
	  D: DATE_SHORT,
	  DD: DATE_MED,
	  DDD: DATE_FULL,
	  DDDD: DATE_HUGE,
	  t: TIME_SIMPLE,
	  tt: TIME_WITH_SECONDS,
	  ttt: TIME_WITH_SHORT_OFFSET,
	  tttt: TIME_WITH_LONG_OFFSET,
	  T: TIME_24_SIMPLE,
	  TT: TIME_24_WITH_SECONDS,
	  TTT: TIME_24_WITH_SHORT_OFFSET,
	  TTTT: TIME_24_WITH_LONG_OFFSET,
	  f: DATETIME_SHORT,
	  ff: DATETIME_MED,
	  fff: DATETIME_FULL,
	  ffff: DATETIME_HUGE,
	  F: DATETIME_SHORT_WITH_SECONDS,
	  FF: DATETIME_MED_WITH_SECONDS,
	  FFF: DATETIME_FULL_WITH_SECONDS,
	  FFFF: DATETIME_HUGE_WITH_SECONDS
	};

	/**
	 * @private
	 */

	class Formatter {
	  static create(locale, opts = {}) {
	    return new Formatter(locale, opts);
	  }
	  static parseFormat(fmt) {
	    // white-space is always considered a literal in user-provided formats
	    // the " " token has a special meaning (see unitForToken)

	    let current = null,
	      currentFull = "",
	      bracketed = false;
	    const splits = [];
	    for (let i = 0; i < fmt.length; i++) {
	      const c = fmt.charAt(i);
	      if (c === "'") {
	        if (currentFull.length > 0) {
	          splits.push({
	            literal: bracketed || /^\s+$/.test(currentFull),
	            val: currentFull
	          });
	        }
	        current = null;
	        currentFull = "";
	        bracketed = !bracketed;
	      } else if (bracketed) {
	        currentFull += c;
	      } else if (c === current) {
	        currentFull += c;
	      } else {
	        if (currentFull.length > 0) {
	          splits.push({
	            literal: /^\s+$/.test(currentFull),
	            val: currentFull
	          });
	        }
	        currentFull = c;
	        current = c;
	      }
	    }
	    if (currentFull.length > 0) {
	      splits.push({
	        literal: bracketed || /^\s+$/.test(currentFull),
	        val: currentFull
	      });
	    }
	    return splits;
	  }
	  static macroTokenToFormatOpts(token) {
	    return macroTokenToFormatOpts[token];
	  }
	  constructor(locale, formatOpts) {
	    this.opts = formatOpts;
	    this.loc = locale;
	    this.systemLoc = null;
	  }
	  formatWithSystemDefault(dt, opts) {
	    if (this.systemLoc === null) {
	      this.systemLoc = this.loc.redefaultToSystem();
	    }
	    const df = this.systemLoc.dtFormatter(dt, {
	      ...this.opts,
	      ...opts
	    });
	    return df.format();
	  }
	  dtFormatter(dt, opts = {}) {
	    return this.loc.dtFormatter(dt, {
	      ...this.opts,
	      ...opts
	    });
	  }
	  formatDateTime(dt, opts) {
	    return this.dtFormatter(dt, opts).format();
	  }
	  formatDateTimeParts(dt, opts) {
	    return this.dtFormatter(dt, opts).formatToParts();
	  }
	  formatInterval(interval, opts) {
	    const df = this.dtFormatter(interval.start, opts);
	    return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
	  }
	  resolvedOptions(dt, opts) {
	    return this.dtFormatter(dt, opts).resolvedOptions();
	  }
	  num(n, p = 0) {
	    // we get some perf out of doing this here, annoyingly
	    if (this.opts.forceSimple) {
	      return padStart(n, p);
	    }
	    const opts = {
	      ...this.opts
	    };
	    if (p > 0) {
	      opts.padTo = p;
	    }
	    return this.loc.numberFormatter(opts).format(n);
	  }
	  formatDateTimeFromString(dt, fmt) {
	    const knownEnglish = this.loc.listingMode() === "en",
	      useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory",
	      string = (opts, extract) => this.loc.extract(dt, opts, extract),
	      formatOffset = opts => {
	        if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
	          return "Z";
	        }
	        return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
	      },
	      meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({
	        hour: "numeric",
	        hourCycle: "h12"
	      }, "dayperiod"),
	      month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
	        month: length
	      } : {
	        month: length,
	        day: "numeric"
	      }, "month"),
	      weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
	        weekday: length
	      } : {
	        weekday: length,
	        month: "long",
	        day: "numeric"
	      }, "weekday"),
	      maybeMacro = token => {
	        const formatOpts = Formatter.macroTokenToFormatOpts(token);
	        if (formatOpts) {
	          return this.formatWithSystemDefault(dt, formatOpts);
	        } else {
	          return token;
	        }
	      },
	      era = length => knownEnglish ? eraForDateTime(dt, length) : string({
	        era: length
	      }, "era"),
	      tokenToString = token => {
	        // Where possible: https://cldr.unicode.org/translation/date-time/date-time-symbols
	        switch (token) {
	          // ms
	          case "S":
	            return this.num(dt.millisecond);
	          case "u":
	          // falls through
	          case "SSS":
	            return this.num(dt.millisecond, 3);
	          // seconds
	          case "s":
	            return this.num(dt.second);
	          case "ss":
	            return this.num(dt.second, 2);
	          // fractional seconds
	          case "uu":
	            return this.num(Math.floor(dt.millisecond / 10), 2);
	          case "uuu":
	            return this.num(Math.floor(dt.millisecond / 100));
	          // minutes
	          case "m":
	            return this.num(dt.minute);
	          case "mm":
	            return this.num(dt.minute, 2);
	          // hours
	          case "h":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
	          case "hh":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
	          case "H":
	            return this.num(dt.hour);
	          case "HH":
	            return this.num(dt.hour, 2);
	          // offset
	          case "Z":
	            // like +6
	            return formatOffset({
	              format: "narrow",
	              allowZ: this.opts.allowZ
	            });
	          case "ZZ":
	            // like +06:00
	            return formatOffset({
	              format: "short",
	              allowZ: this.opts.allowZ
	            });
	          case "ZZZ":
	            // like +0600
	            return formatOffset({
	              format: "techie",
	              allowZ: this.opts.allowZ
	            });
	          case "ZZZZ":
	            // like EST
	            return dt.zone.offsetName(dt.ts, {
	              format: "short",
	              locale: this.loc.locale
	            });
	          case "ZZZZZ":
	            // like Eastern Standard Time
	            return dt.zone.offsetName(dt.ts, {
	              format: "long",
	              locale: this.loc.locale
	            });
	          // zone
	          case "z":
	            // like America/New_York
	            return dt.zoneName;
	          // meridiems
	          case "a":
	            return meridiem();
	          // dates
	          case "d":
	            return useDateTimeFormatter ? string({
	              day: "numeric"
	            }, "day") : this.num(dt.day);
	          case "dd":
	            return useDateTimeFormatter ? string({
	              day: "2-digit"
	            }, "day") : this.num(dt.day, 2);
	          // weekdays - standalone
	          case "c":
	            // like 1
	            return this.num(dt.weekday);
	          case "ccc":
	            // like 'Tues'
	            return weekday("short", true);
	          case "cccc":
	            // like 'Tuesday'
	            return weekday("long", true);
	          case "ccccc":
	            // like 'T'
	            return weekday("narrow", true);
	          // weekdays - format
	          case "E":
	            // like 1
	            return this.num(dt.weekday);
	          case "EEE":
	            // like 'Tues'
	            return weekday("short", false);
	          case "EEEE":
	            // like 'Tuesday'
	            return weekday("long", false);
	          case "EEEEE":
	            // like 'T'
	            return weekday("narrow", false);
	          // months - standalone
	          case "L":
	            // like 1
	            return useDateTimeFormatter ? string({
	              month: "numeric",
	              day: "numeric"
	            }, "month") : this.num(dt.month);
	          case "LL":
	            // like 01, doesn't seem to work
	            return useDateTimeFormatter ? string({
	              month: "2-digit",
	              day: "numeric"
	            }, "month") : this.num(dt.month, 2);
	          case "LLL":
	            // like Jan
	            return month("short", true);
	          case "LLLL":
	            // like January
	            return month("long", true);
	          case "LLLLL":
	            // like J
	            return month("narrow", true);
	          // months - format
	          case "M":
	            // like 1
	            return useDateTimeFormatter ? string({
	              month: "numeric"
	            }, "month") : this.num(dt.month);
	          case "MM":
	            // like 01
	            return useDateTimeFormatter ? string({
	              month: "2-digit"
	            }, "month") : this.num(dt.month, 2);
	          case "MMM":
	            // like Jan
	            return month("short", false);
	          case "MMMM":
	            // like January
	            return month("long", false);
	          case "MMMMM":
	            // like J
	            return month("narrow", false);
	          // years
	          case "y":
	            // like 2014
	            return useDateTimeFormatter ? string({
	              year: "numeric"
	            }, "year") : this.num(dt.year);
	          case "yy":
	            // like 14
	            return useDateTimeFormatter ? string({
	              year: "2-digit"
	            }, "year") : this.num(dt.year.toString().slice(-2), 2);
	          case "yyyy":
	            // like 0012
	            return useDateTimeFormatter ? string({
	              year: "numeric"
	            }, "year") : this.num(dt.year, 4);
	          case "yyyyyy":
	            // like 000012
	            return useDateTimeFormatter ? string({
	              year: "numeric"
	            }, "year") : this.num(dt.year, 6);
	          // eras
	          case "G":
	            // like AD
	            return era("short");
	          case "GG":
	            // like Anno Domini
	            return era("long");
	          case "GGGGG":
	            return era("narrow");
	          case "kk":
	            return this.num(dt.weekYear.toString().slice(-2), 2);
	          case "kkkk":
	            return this.num(dt.weekYear, 4);
	          case "W":
	            return this.num(dt.weekNumber);
	          case "WW":
	            return this.num(dt.weekNumber, 2);
	          case "n":
	            return this.num(dt.localWeekNumber);
	          case "nn":
	            return this.num(dt.localWeekNumber, 2);
	          case "ii":
	            return this.num(dt.localWeekYear.toString().slice(-2), 2);
	          case "iiii":
	            return this.num(dt.localWeekYear, 4);
	          case "o":
	            return this.num(dt.ordinal);
	          case "ooo":
	            return this.num(dt.ordinal, 3);
	          case "q":
	            // like 1
	            return this.num(dt.quarter);
	          case "qq":
	            // like 01
	            return this.num(dt.quarter, 2);
	          case "X":
	            return this.num(Math.floor(dt.ts / 1000));
	          case "x":
	            return this.num(dt.ts);
	          default:
	            return maybeMacro(token);
	        }
	      };
	    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
	  }
	  formatDurationFromString(dur, fmt) {
	    const tokenToField = token => {
	        switch (token[0]) {
	          case "S":
	            return "millisecond";
	          case "s":
	            return "second";
	          case "m":
	            return "minute";
	          case "h":
	            return "hour";
	          case "d":
	            return "day";
	          case "w":
	            return "week";
	          case "M":
	            return "month";
	          case "y":
	            return "year";
	          default:
	            return null;
	        }
	      },
	      tokenToString = lildur => token => {
	        const mapped = tokenToField(token);
	        if (mapped) {
	          return this.num(lildur.get(mapped), token.length);
	        } else {
	          return token;
	        }
	      },
	      tokens = Formatter.parseFormat(fmt),
	      realTokens = tokens.reduce((found, {
	        literal,
	        val
	      }) => literal ? found : found.concat(val), []),
	      collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter(t => t));
	    return stringifyTokens(tokens, tokenToString(collapsed));
	  }
	}

	/*
	 * This file handles parsing for well-specified formats. Here's how it works:
	 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
	 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
	 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
	 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
	 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
	 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
	 */

	const ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
	function combineRegexes(...regexes) {
	  const full = regexes.reduce((f, r) => f + r.source, "");
	  return RegExp(`^${full}$`);
	}
	function combineExtractors(...extractors) {
	  return m => extractors.reduce(([mergedVals, mergedZone, cursor], ex) => {
	    const [val, zone, next] = ex(m, cursor);
	    return [{
	      ...mergedVals,
	      ...val
	    }, zone || mergedZone, next];
	  }, [{}, null, 1]).slice(0, 2);
	}
	function parse(s, ...patterns) {
	  if (s == null) {
	    return [null, null];
	  }
	  for (const [regex, extractor] of patterns) {
	    const m = regex.exec(s);
	    if (m) {
	      return extractor(m);
	    }
	  }
	  return [null, null];
	}
	function simpleParse(...keys) {
	  return (match, cursor) => {
	    const ret = {};
	    let i;
	    for (i = 0; i < keys.length; i++) {
	      ret[keys[i]] = parseInteger(match[cursor + i]);
	    }
	    return [ret, null, cursor + i];
	  };
	}

	// ISO and SQL parsing
	const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
	const isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
	const isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
	const isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
	const isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
	const isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
	const isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
	const isoOrdinalRegex = /(\d{4})-?(\d{3})/;
	const extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
	const extractISOOrdinalData = simpleParse("year", "ordinal");
	const sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/; // dumbed-down version of the ISO one
	const sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`);
	const sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
	function int(match, pos, fallback) {
	  const m = match[pos];
	  return isUndefined(m) ? fallback : parseInteger(m);
	}
	function extractISOYmd(match, cursor) {
	  const item = {
	    year: int(match, cursor),
	    month: int(match, cursor + 1, 1),
	    day: int(match, cursor + 2, 1)
	  };
	  return [item, null, cursor + 3];
	}
	function extractISOTime(match, cursor) {
	  const item = {
	    hours: int(match, cursor, 0),
	    minutes: int(match, cursor + 1, 0),
	    seconds: int(match, cursor + 2, 0),
	    milliseconds: parseMillis(match[cursor + 3])
	  };
	  return [item, null, cursor + 4];
	}
	function extractISOOffset(match, cursor) {
	  const local = !match[cursor] && !match[cursor + 1],
	    fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
	    zone = local ? null : FixedOffsetZone.instance(fullOffset);
	  return [{}, zone, cursor + 3];
	}
	function extractIANAZone(match, cursor) {
	  const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
	  return [{}, zone, cursor + 1];
	}

	// ISO time parsing

	const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);

	// ISO duration parsing

	const isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
	function extractISODuration(match) {
	  const [s, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match;
	  const hasNegativePrefix = s[0] === "-";
	  const negativeSeconds = secondStr && secondStr[0] === "-";
	  const maybeNegate = (num, force = false) => num !== undefined && (force || num && hasNegativePrefix) ? -num : num;
	  return [{
	    years: maybeNegate(parseFloating(yearStr)),
	    months: maybeNegate(parseFloating(monthStr)),
	    weeks: maybeNegate(parseFloating(weekStr)),
	    days: maybeNegate(parseFloating(dayStr)),
	    hours: maybeNegate(parseFloating(hourStr)),
	    minutes: maybeNegate(parseFloating(minuteStr)),
	    seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
	    milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
	  }];
	}

	// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
	// and not just that we're in -240 *right now*. But since I don't think these are used that often
	// I'm just going to ignore that
	const obsOffsets = {
	  GMT: 0,
	  EDT: -4 * 60,
	  EST: -5 * 60,
	  CDT: -5 * 60,
	  CST: -6 * 60,
	  MDT: -6 * 60,
	  MST: -7 * 60,
	  PDT: -7 * 60,
	  PST: -8 * 60
	};
	function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
	  const result = {
	    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
	    month: monthsShort.indexOf(monthStr) + 1,
	    day: parseInteger(dayStr),
	    hour: parseInteger(hourStr),
	    minute: parseInteger(minuteStr)
	  };
	  if (secondStr) result.second = parseInteger(secondStr);
	  if (weekdayStr) {
	    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
	  }
	  return result;
	}

	// RFC 2822/5322
	const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
	function extractRFC2822(match) {
	  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  let offset;
	  if (obsOffset) {
	    offset = obsOffsets[obsOffset];
	  } else if (milOffset) {
	    offset = 0;
	  } else {
	    offset = signedOffset(offHourStr, offMinuteStr);
	  }
	  return [result, new FixedOffsetZone(offset)];
	}
	function preprocessRFC2822(s) {
	  // Remove comments and folding whitespace and replace multiple-spaces with a single space
	  return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
	}

	// http date

	const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
	  rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
	  ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
	function extractRFC1123Or850(match) {
	  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}
	function extractASCII(match) {
	  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}
	const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
	const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
	const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
	const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
	const extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
	const extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
	const extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
	const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);

	/*
	 * @private
	 */

	function parseISODate(s) {
	  return parse(s, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
	}
	function parseRFC2822Date(s) {
	  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
	}
	function parseHTTPDate(s) {
	  return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
	}
	function parseISODuration(s) {
	  return parse(s, [isoDuration, extractISODuration]);
	}
	const extractISOTimeOnly = combineExtractors(extractISOTime);
	function parseISOTimeOnly(s) {
	  return parse(s, [isoTimeOnly, extractISOTimeOnly]);
	}
	const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
	const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
	const extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
	function parseSQL(s) {
	  return parse(s, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
	}

	const INVALID$2 = "Invalid Duration";

	// unit conversion constants
	const lowOrderMatrix = {
	    weeks: {
	      days: 7,
	      hours: 7 * 24,
	      minutes: 7 * 24 * 60,
	      seconds: 7 * 24 * 60 * 60,
	      milliseconds: 7 * 24 * 60 * 60 * 1000
	    },
	    days: {
	      hours: 24,
	      minutes: 24 * 60,
	      seconds: 24 * 60 * 60,
	      milliseconds: 24 * 60 * 60 * 1000
	    },
	    hours: {
	      minutes: 60,
	      seconds: 60 * 60,
	      milliseconds: 60 * 60 * 1000
	    },
	    minutes: {
	      seconds: 60,
	      milliseconds: 60 * 1000
	    },
	    seconds: {
	      milliseconds: 1000
	    }
	  },
	  casualMatrix = {
	    years: {
	      quarters: 4,
	      months: 12,
	      weeks: 52,
	      days: 365,
	      hours: 365 * 24,
	      minutes: 365 * 24 * 60,
	      seconds: 365 * 24 * 60 * 60,
	      milliseconds: 365 * 24 * 60 * 60 * 1000
	    },
	    quarters: {
	      months: 3,
	      weeks: 13,
	      days: 91,
	      hours: 91 * 24,
	      minutes: 91 * 24 * 60,
	      seconds: 91 * 24 * 60 * 60,
	      milliseconds: 91 * 24 * 60 * 60 * 1000
	    },
	    months: {
	      weeks: 4,
	      days: 30,
	      hours: 30 * 24,
	      minutes: 30 * 24 * 60,
	      seconds: 30 * 24 * 60 * 60,
	      milliseconds: 30 * 24 * 60 * 60 * 1000
	    },
	    ...lowOrderMatrix
	  },
	  daysInYearAccurate = 146097.0 / 400,
	  daysInMonthAccurate = 146097.0 / 4800,
	  accurateMatrix = {
	    years: {
	      quarters: 4,
	      months: 12,
	      weeks: daysInYearAccurate / 7,
	      days: daysInYearAccurate,
	      hours: daysInYearAccurate * 24,
	      minutes: daysInYearAccurate * 24 * 60,
	      seconds: daysInYearAccurate * 24 * 60 * 60,
	      milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
	    },
	    quarters: {
	      months: 3,
	      weeks: daysInYearAccurate / 28,
	      days: daysInYearAccurate / 4,
	      hours: daysInYearAccurate * 24 / 4,
	      minutes: daysInYearAccurate * 24 * 60 / 4,
	      seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
	      milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000 / 4
	    },
	    months: {
	      weeks: daysInMonthAccurate / 7,
	      days: daysInMonthAccurate,
	      hours: daysInMonthAccurate * 24,
	      minutes: daysInMonthAccurate * 24 * 60,
	      seconds: daysInMonthAccurate * 24 * 60 * 60,
	      milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
	    },
	    ...lowOrderMatrix
	  };

	// units ordered by size
	const orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
	const reverseUnits = orderedUnits$1.slice(0).reverse();

	// clone really means "create another instance just like this one, but with these changes"
	function clone$1(dur, alts, clear = false) {
	  // deep merge for vals
	  const conf = {
	    values: clear ? alts.values : {
	      ...dur.values,
	      ...(alts.values || {})
	    },
	    loc: dur.loc.clone(alts.loc),
	    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
	    matrix: alts.matrix || dur.matrix
	  };
	  return new Duration(conf);
	}
	function durationToMillis(matrix, vals) {
	  let sum = vals.milliseconds ?? 0;
	  for (const unit of reverseUnits.slice(1)) {
	    if (vals[unit]) {
	      sum += vals[unit] * matrix[unit]["milliseconds"];
	    }
	  }
	  return sum;
	}

	// NB: mutates parameters
	function normalizeValues(matrix, vals) {
	  // the logic below assumes the overall value of the duration is positive
	  // if this is not the case, factor is used to make it so
	  const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;
	  orderedUnits$1.reduceRight((previous, current) => {
	    if (!isUndefined(vals[current])) {
	      if (previous) {
	        const previousVal = vals[previous] * factor;
	        const conv = matrix[current][previous];

	        // if (previousVal < 0):
	        // lower order unit is negative (e.g. { years: 2, days: -2 })
	        // normalize this by reducing the higher order unit by the appropriate amount
	        // and increasing the lower order unit
	        // this can never make the higher order unit negative, because this function only operates
	        // on positive durations, so the amount of time represented by the lower order unit cannot
	        // be larger than the higher order unit
	        // else:
	        // lower order unit is positive (e.g. { years: 2, days: 450 } or { years: -2, days: 450 })
	        // in this case we attempt to convert as much as possible from the lower order unit into
	        // the higher order one
	        //
	        // Math.floor takes care of both of these cases, rounding away from 0
	        // if previousVal < 0 it makes the absolute value larger
	        // if previousVal >= it makes the absolute value smaller
	        const rollUp = Math.floor(previousVal / conv);
	        vals[current] += rollUp * factor;
	        vals[previous] -= rollUp * conv * factor;
	      }
	      return current;
	    } else {
	      return previous;
	    }
	  }, null);

	  // try to convert any decimals into smaller units if possible
	  // for example for { years: 2.5, days: 0, seconds: 0 } we want to get { years: 2, days: 182, hours: 12 }
	  orderedUnits$1.reduce((previous, current) => {
	    if (!isUndefined(vals[current])) {
	      if (previous) {
	        const fraction = vals[previous] % 1;
	        vals[previous] -= fraction;
	        vals[current] += fraction * matrix[previous][current];
	      }
	      return current;
	    } else {
	      return previous;
	    }
	  }, null);
	}

	// Remove all properties with a value of 0 from an object
	function removeZeroes(vals) {
	  const newVals = {};
	  for (const [key, value] of Object.entries(vals)) {
	    if (value !== 0) {
	      newVals[key] = value;
	    }
	  }
	  return newVals;
	}

	/**
	 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime#plus} to add a Duration object to a DateTime, producing another DateTime.
	 *
	 * Here is a brief overview of commonly used methods and getters in Duration:
	 *
	 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
	 * * **Unit values** See the {@link Duration#years}, {@link Duration#months}, {@link Duration#weeks}, {@link Duration#days}, {@link Duration#hours}, {@link Duration#minutes}, {@link Duration#seconds}, {@link Duration#milliseconds} accessors.
	 * * **Configuration** See  {@link Duration#locale} and {@link Duration#numberingSystem} accessors.
	 * * **Transformation** To create new Durations out of old ones use {@link Duration#plus}, {@link Duration#minus}, {@link Duration#normalize}, {@link Duration#set}, {@link Duration#reconfigure}, {@link Duration#shiftTo}, and {@link Duration#negate}.
	 * * **Output** To convert the Duration into other representations, see {@link Duration#as}, {@link Duration#toISO}, {@link Duration#toFormat}, and {@link Duration#toJSON}
	 *
	 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
	 */
	class Duration {
	  /**
	   * @private
	   */
	  constructor(config) {
	    const accurate = config.conversionAccuracy === "longterm" || false;
	    let matrix = accurate ? accurateMatrix : casualMatrix;
	    if (config.matrix) {
	      matrix = config.matrix;
	    }

	    /**
	     * @access private
	     */
	    this.values = config.values;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.conversionAccuracy = accurate ? "longterm" : "casual";
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.matrix = matrix;
	    /**
	     * @access private
	     */
	    this.isLuxonDuration = true;
	  }

	  /**
	   * Create Duration from a number of milliseconds.
	   * @param {number} count of milliseconds
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  static fromMillis(count, opts) {
	    return Duration.fromObject({
	      milliseconds: count
	    }, opts);
	  }

	  /**
	   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
	   * If this object is empty then a zero milliseconds duration is returned.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.years
	   * @param {number} obj.quarters
	   * @param {number} obj.months
	   * @param {number} obj.weeks
	   * @param {number} obj.days
	   * @param {number} obj.hours
	   * @param {number} obj.minutes
	   * @param {number} obj.seconds
	   * @param {number} obj.milliseconds
	   * @param {Object} [opts=[]] - options for creating this Duration
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
	   * @param {string} [opts.matrix=Object] - the custom conversion system to use
	   * @return {Duration}
	   */
	  static fromObject(obj, opts = {}) {
	    if (obj == null || typeof obj !== "object") {
	      throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`);
	    }
	    return new Duration({
	      values: normalizeObject(obj, Duration.normalizeUnit),
	      loc: Locale.fromObject(opts),
	      conversionAccuracy: opts.conversionAccuracy,
	      matrix: opts.matrix
	    });
	  }

	  /**
	   * Create a Duration from DurationLike.
	   *
	   * @param {Object | number | Duration} durationLike
	   * One of:
	   * - object with keys like 'years' and 'hours'.
	   * - number representing milliseconds
	   * - Duration instance
	   * @return {Duration}
	   */
	  static fromDurationLike(durationLike) {
	    if (isNumber(durationLike)) {
	      return Duration.fromMillis(durationLike);
	    } else if (Duration.isDuration(durationLike)) {
	      return durationLike;
	    } else if (typeof durationLike === "object") {
	      return Duration.fromObject(durationLike);
	    } else {
	      throw new InvalidArgumentError(`Unknown duration argument ${durationLike} of type ${typeof durationLike}`);
	    }
	  }

	  /**
	   * Create a Duration from an ISO 8601 duration string.
	   * @param {string} text - text to parse
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
	   * @param {string} [opts.matrix=Object] - the preset conversion system to use
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
	   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
	   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
	   * @return {Duration}
	   */
	  static fromISO(text, opts) {
	    const [parsed] = parseISODuration(text);
	    if (parsed) {
	      return Duration.fromObject(parsed, opts);
	    } else {
	      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	    }
	  }

	  /**
	   * Create a Duration from an ISO 8601 time string.
	   * @param {string} text - text to parse
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
	   * @param {string} [opts.matrix=Object] - the conversion system to use
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
	   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
	   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @return {Duration}
	   */
	  static fromISOTime(text, opts) {
	    const [parsed] = parseISOTimeOnly(text);
	    if (parsed) {
	      return Duration.fromObject(parsed, opts);
	    } else {
	      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	    }
	  }

	  /**
	   * Create an invalid Duration.
	   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Duration}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
	    }
	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
	    if (Settings.throwOnInvalid) {
	      throw new InvalidDurationError(invalid);
	    } else {
	      return new Duration({
	        invalid
	      });
	    }
	  }

	  /**
	   * @private
	   */
	  static normalizeUnit(unit) {
	    const normalized = {
	      year: "years",
	      years: "years",
	      quarter: "quarters",
	      quarters: "quarters",
	      month: "months",
	      months: "months",
	      week: "weeks",
	      weeks: "weeks",
	      day: "days",
	      days: "days",
	      hour: "hours",
	      hours: "hours",
	      minute: "minutes",
	      minutes: "minutes",
	      second: "seconds",
	      seconds: "seconds",
	      millisecond: "milliseconds",
	      milliseconds: "milliseconds"
	    }[unit ? unit.toLowerCase() : unit];
	    if (!normalized) throw new InvalidUnitError(unit);
	    return normalized;
	  }

	  /**
	   * Check if an object is a Duration. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDuration(o) {
	    return o && o.isLuxonDuration || false;
	  }

	  /**
	   * Get  the locale of a Duration, such 'en-GB'
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
	   * * `S` for milliseconds
	   * * `s` for seconds
	   * * `m` for minutes
	   * * `h` for hours
	   * * `d` for days
	   * * `w` for weeks
	   * * `M` for months
	   * * `y` for years
	   * Notes:
	   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
	   * * Tokens can be escaped by wrapping with single quotes.
	   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
	   * @param {string} fmt - the format string
	   * @param {Object} opts - options
	   * @param {boolean} [opts.floor=true] - floor numerical values
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
	    const fmtOpts = {
	      ...opts,
	      floor: opts.round !== false && opts.floor !== false
	    };
	    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
	  }

	  /**
	   * Returns a string representation of a Duration with all units included.
	   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
	   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
	   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
	   * @example
	   * ```js
	   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
	   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
	   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
	   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
	   * ```
	   */
	  toHuman(opts = {}) {
	    if (!this.isValid) return INVALID$2;
	    const l = orderedUnits$1.map(unit => {
	      const val = this.values[unit];
	      if (isUndefined(val)) {
	        return null;
	      }
	      return this.loc.numberFormatter({
	        style: "unit",
	        unitDisplay: "long",
	        ...opts,
	        unit: unit.slice(0, -1)
	      }).format(val);
	    }).filter(n => n);
	    return this.loc.listFormatter({
	      type: "conjunction",
	      style: opts.listStyle || "narrow",
	      ...opts
	    }).format(l);
	  }

	  /**
	   * Returns a JavaScript object with this Duration's values.
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
	   * @return {Object}
	   */
	  toObject() {
	    if (!this.isValid) return {};
	    return {
	      ...this.values
	    };
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Duration.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
	   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
	   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
	   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
	   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
	   * @return {string}
	   */
	  toISO() {
	    // we could use the formatter, but this is an easier way to get the minimum string
	    if (!this.isValid) return null;
	    let s = "P";
	    if (this.years !== 0) s += this.years + "Y";
	    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
	    if (this.weeks !== 0) s += this.weeks + "W";
	    if (this.days !== 0) s += this.days + "D";
	    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) s += "T";
	    if (this.hours !== 0) s += this.hours + "H";
	    if (this.minutes !== 0) s += this.minutes + "M";
	    if (this.seconds !== 0 || this.milliseconds !== 0)
	      // this will handle "floating point madness" by removing extra decimal places
	      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
	      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
	    if (s === "P") s += "T0S";
	    return s;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
	   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
	   * @return {string}
	   */
	  toISOTime(opts = {}) {
	    if (!this.isValid) return null;
	    const millis = this.toMillis();
	    if (millis < 0 || millis >= 86400000) return null;
	    opts = {
	      suppressMilliseconds: false,
	      suppressSeconds: false,
	      includePrefix: false,
	      format: "extended",
	      ...opts,
	      includeOffset: false
	    };
	    const dateTime = DateTime.fromMillis(millis, {
	      zone: "UTC"
	    });
	    return dateTime.toISOTime(opts);
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
	   * @return {string}
	   */
	  toString() {
	    return this.toISO();
	  }

	  /**
	   * Returns a string representation of this Duration appropriate for the REPL.
	   * @return {string}
	   */
	  [Symbol.for("nodejs.util.inspect.custom")]() {
	    if (this.isValid) {
	      return `Duration { values: ${JSON.stringify(this.values)} }`;
	    } else {
	      return `Duration { Invalid, reason: ${this.invalidReason} }`;
	    }
	  }

	  /**
	   * Returns an milliseconds value of this Duration.
	   * @return {number}
	   */
	  toMillis() {
	    if (!this.isValid) return NaN;
	    return durationToMillis(this.matrix, this.values);
	  }

	  /**
	   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
	   * @return {number}
	   */
	  valueOf() {
	    return this.toMillis();
	  }

	  /**
	   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;
	    const dur = Duration.fromDurationLike(duration),
	      result = {};
	    for (const k of orderedUnits$1) {
	      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
	        result[k] = dur.get(k) + this.get(k);
	      }
	    }
	    return clone$1(this, {
	      values: result
	    }, true);
	  }

	  /**
	   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  minus(duration) {
	    if (!this.isValid) return this;
	    const dur = Duration.fromDurationLike(duration);
	    return this.plus(dur.negate());
	  }

	  /**
	   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
	   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
	   * @return {Duration}
	   */
	  mapUnits(fn) {
	    if (!this.isValid) return this;
	    const result = {};
	    for (const k of Object.keys(this.values)) {
	      result[k] = asNumber(fn(this.values[k], k));
	    }
	    return clone$1(this, {
	      values: result
	    }, true);
	  }

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
	   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
	   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
	   * @return {number}
	   */
	  get(unit) {
	    return this[Duration.normalizeUnit(unit)];
	  }

	  /**
	   * "Set" the values of specified units. Return a newly-constructed Duration.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dur.set({ years: 2017 })
	   * @example dur.set({ hours: 8, minutes: 30 })
	   * @return {Duration}
	   */
	  set(values) {
	    if (!this.isValid) return this;
	    const mixed = {
	      ...this.values,
	      ...normalizeObject(values, Duration.normalizeUnit)
	    };
	    return clone$1(this, {
	      values: mixed
	    });
	  }

	  /**
	   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
	   * @example dur.reconfigure({ locale: 'en-GB' })
	   * @return {Duration}
	   */
	  reconfigure({
	    locale,
	    numberingSystem,
	    conversionAccuracy,
	    matrix
	  } = {}) {
	    const loc = this.loc.clone({
	      locale,
	      numberingSystem
	    });
	    const opts = {
	      loc,
	      matrix,
	      conversionAccuracy
	    };
	    return clone$1(this, opts);
	  }

	  /**
	   * Return the length of the duration in the specified unit.
	   * @param {string} unit - a unit such as 'minutes' or 'days'
	   * @example Duration.fromObject({years: 1}).as('days') //=> 365
	   * @example Duration.fromObject({years: 1}).as('months') //=> 12
	   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
	   * @return {number}
	   */
	  as(unit) {
	    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
	  }

	  /**
	   * Reduce this Duration to its canonical representation in its current units.
	   * Assuming the overall value of the Duration is positive, this means:
	   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
	   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
	   *   the overall value would be negative, see third example)
	   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
	   *
	   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
	   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
	   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
	   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
	   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
	   * @return {Duration}
	   */
	  normalize() {
	    if (!this.isValid) return this;
	    const vals = this.toObject();
	    normalizeValues(this.matrix, vals);
	    return clone$1(this, {
	      values: vals
	    }, true);
	  }

	  /**
	   * Rescale units to its largest representation
	   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
	   * @return {Duration}
	   */
	  rescale() {
	    if (!this.isValid) return this;
	    const vals = removeZeroes(this.normalize().shiftToAll().toObject());
	    return clone$1(this, {
	      values: vals
	    }, true);
	  }

	  /**
	   * Convert this Duration into its representation in a different set of units.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
	   * @return {Duration}
	   */
	  shiftTo(...units) {
	    if (!this.isValid) return this;
	    if (units.length === 0) {
	      return this;
	    }
	    units = units.map(u => Duration.normalizeUnit(u));
	    const built = {},
	      accumulated = {},
	      vals = this.toObject();
	    let lastUnit;
	    for (const k of orderedUnits$1) {
	      if (units.indexOf(k) >= 0) {
	        lastUnit = k;
	        let own = 0;

	        // anything we haven't boiled down yet should get boiled to this unit
	        for (const ak in accumulated) {
	          own += this.matrix[ak][k] * accumulated[ak];
	          accumulated[ak] = 0;
	        }

	        // plus anything that's already in this unit
	        if (isNumber(vals[k])) {
	          own += vals[k];
	        }

	        // only keep the integer part for now in the hopes of putting any decimal part
	        // into a smaller unit later
	        const i = Math.trunc(own);
	        built[k] = i;
	        accumulated[k] = (own * 1000 - i * 1000) / 1000;

	        // otherwise, keep it in the wings to boil it later
	      } else if (isNumber(vals[k])) {
	        accumulated[k] = vals[k];
	      }
	    }

	    // anything leftover becomes the decimal for the last unit
	    // lastUnit must be defined since units is not empty
	    for (const key in accumulated) {
	      if (accumulated[key] !== 0) {
	        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
	      }
	    }
	    normalizeValues(this.matrix, built);
	    return clone$1(this, {
	      values: built
	    }, true);
	  }

	  /**
	   * Shift this Duration to all available units.
	   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
	   * @return {Duration}
	   */
	  shiftToAll() {
	    if (!this.isValid) return this;
	    return this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds");
	  }

	  /**
	   * Return the negative of this Duration.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
	   * @return {Duration}
	   */
	  negate() {
	    if (!this.isValid) return this;
	    const negated = {};
	    for (const k of Object.keys(this.values)) {
	      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
	    }
	    return clone$1(this, {
	      values: negated
	    }, true);
	  }

	  /**
	   * Get the years.
	   * @type {number}
	   */
	  get years() {
	    return this.isValid ? this.values.years || 0 : NaN;
	  }

	  /**
	   * Get the quarters.
	   * @type {number}
	   */
	  get quarters() {
	    return this.isValid ? this.values.quarters || 0 : NaN;
	  }

	  /**
	   * Get the months.
	   * @type {number}
	   */
	  get months() {
	    return this.isValid ? this.values.months || 0 : NaN;
	  }

	  /**
	   * Get the weeks
	   * @type {number}
	   */
	  get weeks() {
	    return this.isValid ? this.values.weeks || 0 : NaN;
	  }

	  /**
	   * Get the days.
	   * @type {number}
	   */
	  get days() {
	    return this.isValid ? this.values.days || 0 : NaN;
	  }

	  /**
	   * Get the hours.
	   * @type {number}
	   */
	  get hours() {
	    return this.isValid ? this.values.hours || 0 : NaN;
	  }

	  /**
	   * Get the minutes.
	   * @type {number}
	   */
	  get minutes() {
	    return this.isValid ? this.values.minutes || 0 : NaN;
	  }

	  /**
	   * Get the seconds.
	   * @return {number}
	   */
	  get seconds() {
	    return this.isValid ? this.values.seconds || 0 : NaN;
	  }

	  /**
	   * Get the milliseconds.
	   * @return {number}
	   */
	  get milliseconds() {
	    return this.isValid ? this.values.milliseconds || 0 : NaN;
	  }

	  /**
	   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
	   * on invalid DateTimes or Intervals.
	   * @return {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this Duration became invalid, or null if the Duration is valid
	   * @return {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Equality check
	   * Two Durations are equal iff they have the same units and the same values for each unit.
	   * @param {Duration} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }
	    if (!this.loc.equals(other.loc)) {
	      return false;
	    }
	    function eq(v1, v2) {
	      // Consider 0 and undefined as equal
	      if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
	      return v1 === v2;
	    }
	    for (const u of orderedUnits$1) {
	      if (!eq(this.values[u], other.values[u])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	const INVALID$1 = "Invalid Interval";

	// checks if the start is equal to or before the end
	function validateStartEnd(start, end) {
	  if (!start || !start.isValid) {
	    return Interval.invalid("missing or invalid start");
	  } else if (!end || !end.isValid) {
	    return Interval.invalid("missing or invalid end");
	  } else if (end < start) {
	    return Interval.invalid("end before start", `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
	  } else {
	    return null;
	  }
	}

	/**
	 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
	 *
	 * Here is a brief overview of the most commonly used methods and getters in Interval:
	 *
	 * * **Creation** To create an Interval, use {@link Interval.fromDateTimes}, {@link Interval.after}, {@link Interval.before}, or {@link Interval.fromISO}.
	 * * **Accessors** Use {@link Interval#start} and {@link Interval#end} to get the start and end.
	 * * **Interrogation** To analyze the Interval, use {@link Interval#count}, {@link Interval#length}, {@link Interval#hasSame}, {@link Interval#contains}, {@link Interval#isAfter}, or {@link Interval#isBefore}.
	 * * **Transformation** To create other Intervals out of this one, use {@link Interval#set}, {@link Interval#splitAt}, {@link Interval#splitBy}, {@link Interval#divideEqually}, {@link Interval.merge}, {@link Interval.xor}, {@link Interval#union}, {@link Interval#intersection}, or {@link Interval#difference}.
	 * * **Comparison** To compare this Interval to another one, use {@link Interval#equals}, {@link Interval#overlaps}, {@link Interval#abutsStart}, {@link Interval#abutsEnd}, {@link Interval#engulfs}
	 * * **Output** To convert the Interval into other representations, see {@link Interval#toString}, {@link Interval#toLocaleString}, {@link Interval#toISO}, {@link Interval#toISODate}, {@link Interval#toISOTime}, {@link Interval#toFormat}, and {@link Interval#toDuration}.
	 */
	class Interval {
	  /**
	   * @private
	   */
	  constructor(config) {
	    /**
	     * @access private
	     */
	    this.s = config.start;
	    /**
	     * @access private
	     */
	    this.e = config.end;
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.isLuxonInterval = true;
	  }

	  /**
	   * Create an invalid Interval.
	   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Interval}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
	    }
	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
	    if (Settings.throwOnInvalid) {
	      throw new InvalidIntervalError(invalid);
	    } else {
	      return new Interval({
	        invalid
	      });
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
	   * @param {DateTime|Date|Object} start
	   * @param {DateTime|Date|Object} end
	   * @return {Interval}
	   */
	  static fromDateTimes(start, end) {
	    const builtStart = friendlyDateTime(start),
	      builtEnd = friendlyDateTime(end);
	    const validateError = validateStartEnd(builtStart, builtEnd);
	    if (validateError == null) {
	      return new Interval({
	        start: builtStart,
	        end: builtEnd
	      });
	    } else {
	      return validateError;
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and a Duration to extend to.
	   * @param {DateTime|Date|Object} start
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static after(start, duration) {
	    const dur = Duration.fromDurationLike(duration),
	      dt = friendlyDateTime(start);
	    return Interval.fromDateTimes(dt, dt.plus(dur));
	  }

	  /**
	   * Create an Interval from an end DateTime and a Duration to extend backwards to.
	   * @param {DateTime|Date|Object} end
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static before(end, duration) {
	    const dur = Duration.fromDurationLike(duration),
	      dt = friendlyDateTime(end);
	    return Interval.fromDateTimes(dt.minus(dur), dt);
	  }

	  /**
	   * Create an Interval from an ISO 8601 string.
	   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
	   * @param {string} text - the ISO string to parse
	   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {Interval}
	   */
	  static fromISO(text, opts) {
	    const [s, e] = (text || "").split("/", 2);
	    if (s && e) {
	      let start, startIsValid;
	      try {
	        start = DateTime.fromISO(s, opts);
	        startIsValid = start.isValid;
	      } catch (e) {
	        startIsValid = false;
	      }
	      let end, endIsValid;
	      try {
	        end = DateTime.fromISO(e, opts);
	        endIsValid = end.isValid;
	      } catch (e) {
	        endIsValid = false;
	      }
	      if (startIsValid && endIsValid) {
	        return Interval.fromDateTimes(start, end);
	      }
	      if (startIsValid) {
	        const dur = Duration.fromISO(e, opts);
	        if (dur.isValid) {
	          return Interval.after(start, dur);
	        }
	      } else if (endIsValid) {
	        const dur = Duration.fromISO(s, opts);
	        if (dur.isValid) {
	          return Interval.before(end, dur);
	        }
	      }
	    }
	    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	  }

	  /**
	   * Check if an object is an Interval. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isInterval(o) {
	    return o && o.isLuxonInterval || false;
	  }

	  /**
	   * Returns the start of the Interval
	   * @type {DateTime}
	   */
	  get start() {
	    return this.isValid ? this.s : null;
	  }

	  /**
	   * Returns the end of the Interval
	   * @type {DateTime}
	   */
	  get end() {
	    return this.isValid ? this.e : null;
	  }

	  /**
	   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalidReason === null;
	  }

	  /**
	   * Returns an error code if this Interval is invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Returns the length of the Interval in the specified unit.
	   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
	   * @return {number}
	   */
	  length(unit = "milliseconds") {
	    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
	  }

	  /**
	   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
	   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
	   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
	   * @param {string} [unit='milliseconds'] - the unit of time to count.
	   * @param {Object} opts - options
	   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
	   * @return {number}
	   */
	  count(unit = "milliseconds", opts) {
	    if (!this.isValid) return NaN;
	    const start = this.start.startOf(unit, opts);
	    let end;
	    if (opts?.useLocaleWeeks) {
	      end = this.end.reconfigure({
	        locale: start.locale
	      });
	    } else {
	      end = this.end;
	    }
	    end = end.startOf(unit, opts);
	    return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
	  }

	  /**
	   * Returns whether this Interval's start and end are both in the same unit of time
	   * @param {string} unit - the unit of time to check sameness on
	   * @return {boolean}
	   */
	  hasSame(unit) {
	    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
	  }

	  /**
	   * Return whether this Interval has the same start and end DateTimes.
	   * @return {boolean}
	   */
	  isEmpty() {
	    return this.s.valueOf() === this.e.valueOf();
	  }

	  /**
	   * Return whether this Interval's start is after the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isAfter(dateTime) {
	    if (!this.isValid) return false;
	    return this.s > dateTime;
	  }

	  /**
	   * Return whether this Interval's end is before the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isBefore(dateTime) {
	    if (!this.isValid) return false;
	    return this.e <= dateTime;
	  }

	  /**
	   * Return whether this Interval contains the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  contains(dateTime) {
	    if (!this.isValid) return false;
	    return this.s <= dateTime && this.e > dateTime;
	  }

	  /**
	   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
	   * @param {Object} values - the values to set
	   * @param {DateTime} values.start - the starting DateTime
	   * @param {DateTime} values.end - the ending DateTime
	   * @return {Interval}
	   */
	  set({
	    start,
	    end
	  } = {}) {
	    if (!this.isValid) return this;
	    return Interval.fromDateTimes(start || this.s, end || this.e);
	  }

	  /**
	   * Split this Interval at each of the specified DateTimes
	   * @param {...DateTime} dateTimes - the unit of time to count.
	   * @return {Array}
	   */
	  splitAt(...dateTimes) {
	    if (!this.isValid) return [];
	    const sorted = dateTimes.map(friendlyDateTime).filter(d => this.contains(d)).sort((a, b) => a.toMillis() - b.toMillis()),
	      results = [];
	    let {
	        s
	      } = this,
	      i = 0;
	    while (s < this.e) {
	      const added = sorted[i] || this.e,
	        next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	      i += 1;
	    }
	    return results;
	  }

	  /**
	   * Split this Interval into smaller Intervals, each of the specified length.
	   * Left over time is grouped into a smaller interval
	   * @param {Duration|Object|number} duration - The length of each resulting interval.
	   * @return {Array}
	   */
	  splitBy(duration) {
	    const dur = Duration.fromDurationLike(duration);
	    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
	      return [];
	    }
	    let {
	        s
	      } = this,
	      idx = 1,
	      next;
	    const results = [];
	    while (s < this.e) {
	      const added = this.start.plus(dur.mapUnits(x => x * idx));
	      next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	      idx += 1;
	    }
	    return results;
	  }

	  /**
	   * Split this Interval into the specified number of smaller intervals.
	   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
	   * @return {Array}
	   */
	  divideEqually(numberOfParts) {
	    if (!this.isValid) return [];
	    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
	  }

	  /**
	   * Return whether this Interval overlaps with the specified Interval
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  overlaps(other) {
	    return this.e > other.s && this.s < other.e;
	  }

	  /**
	   * Return whether this Interval's end is adjacent to the specified Interval's start.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsStart(other) {
	    if (!this.isValid) return false;
	    return +this.e === +other.s;
	  }

	  /**
	   * Return whether this Interval's start is adjacent to the specified Interval's end.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsEnd(other) {
	    if (!this.isValid) return false;
	    return +other.e === +this.s;
	  }

	  /**
	   * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  engulfs(other) {
	    if (!this.isValid) return false;
	    return this.s <= other.s && this.e >= other.e;
	  }

	  /**
	   * Return whether this Interval has the same start and end as the specified Interval.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }
	    return this.s.equals(other.s) && this.e.equals(other.e);
	  }

	  /**
	   * Return an Interval representing the intersection of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
	   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  intersection(other) {
	    if (!this.isValid) return this;
	    const s = this.s > other.s ? this.s : other.s,
	      e = this.e < other.e ? this.e : other.e;
	    if (s >= e) {
	      return null;
	    } else {
	      return Interval.fromDateTimes(s, e);
	    }
	  }

	  /**
	   * Return an Interval representing the union of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  union(other) {
	    if (!this.isValid) return this;
	    const s = this.s < other.s ? this.s : other.s,
	      e = this.e > other.e ? this.e : other.e;
	    return Interval.fromDateTimes(s, e);
	  }

	  /**
	   * Merge an array of Intervals into a equivalent minimal set of Intervals.
	   * Combines overlapping and adjacent Intervals.
	   * @param {Array} intervals
	   * @return {Array}
	   */
	  static merge(intervals) {
	    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(([sofar, current], item) => {
	      if (!current) {
	        return [sofar, item];
	      } else if (current.overlaps(item) || current.abutsStart(item)) {
	        return [sofar, current.union(item)];
	      } else {
	        return [sofar.concat([current]), item];
	      }
	    }, [[], null]);
	    if (final) {
	      found.push(final);
	    }
	    return found;
	  }

	  /**
	   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
	   * @param {Array} intervals
	   * @return {Array}
	   */
	  static xor(intervals) {
	    let start = null,
	      currentCount = 0;
	    const results = [],
	      ends = intervals.map(i => [{
	        time: i.s,
	        type: "s"
	      }, {
	        time: i.e,
	        type: "e"
	      }]),
	      flattened = Array.prototype.concat(...ends),
	      arr = flattened.sort((a, b) => a.time - b.time);
	    for (const i of arr) {
	      currentCount += i.type === "s" ? 1 : -1;
	      if (currentCount === 1) {
	        start = i.time;
	      } else {
	        if (start && +start !== +i.time) {
	          results.push(Interval.fromDateTimes(start, i.time));
	        }
	        start = null;
	      }
	    }
	    return Interval.merge(results);
	  }

	  /**
	   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
	   * @param {...Interval} intervals
	   * @return {Array}
	   */
	  difference(...intervals) {
	    return Interval.xor([this].concat(intervals)).map(i => this.intersection(i)).filter(i => i && !i.isEmpty());
	  }

	  /**
	   * Returns a string representation of this Interval appropriate for debugging.
	   * @return {string}
	   */
	  toString() {
	    if (!this.isValid) return INVALID$1;
	    return `[${this.s.toISO()} – ${this.e.toISO()})`;
	  }

	  /**
	   * Returns a string representation of this Interval appropriate for the REPL.
	   * @return {string}
	   */
	  [Symbol.for("nodejs.util.inspect.custom")]() {
	    if (this.isValid) {
	      return `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`;
	    } else {
	      return `Interval { Invalid, reason: ${this.invalidReason} }`;
	    }
	  }

	  /**
	   * Returns a localized string representing this Interval. Accepts the same options as the
	   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
	   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
	   * is browser-specific, but in general it will return an appropriate representation of the
	   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
	   * specified.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
	   * Intl.DateTimeFormat constructor options.
	   * @param {Object} opts - Options to override the configuration of the start DateTime.
	   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
	   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
	   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
	   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
	   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
	   * @return {string}
	   */
	  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
	    return this.isValid ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID$1;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Interval.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime#toISO}
	   * @return {string}
	   */
	  toISO(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of date of this Interval.
	   * The time components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {string}
	   */
	  toISODate() {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISODate()}/${this.e.toISODate()}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of time of this Interval.
	   * The date components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime#toISO}
	   * @return {string}
	   */
	  toISOTime(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this Interval formatted according to the specified format
	   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
	   * formatting tool.
	   * @param {string} dateFormat - The format string. This string formats the start and end time.
	   * See {@link DateTime#toFormat} for details.
	   * @param {Object} opts - Options.
	   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
	   * representations.
	   * @return {string}
	   */
	  toFormat(dateFormat, {
	    separator = " – "
	  } = {}) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
	  }

	  /**
	   * Return a Duration representing the time spanned by this interval.
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
	   * @return {Duration}
	   */
	  toDuration(unit, opts) {
	    if (!this.isValid) {
	      return Duration.invalid(this.invalidReason);
	    }
	    return this.e.diff(this.s, unit, opts);
	  }

	  /**
	   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
	   * @param {function} mapFn
	   * @return {Interval}
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
	   */
	  mapEndpoints(mapFn) {
	    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
	  }
	}

	/**
	 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
	 */
	class Info {
	  /**
	   * Return whether the specified zone contains a DST.
	   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
	   * @return {boolean}
	   */
	  static hasDST(zone = Settings.defaultZone) {
	    const proto = DateTime.now().setZone(zone).set({
	      month: 12
	    });
	    return !zone.isUniversal && proto.offset !== proto.set({
	      month: 6
	    }).offset;
	  }

	  /**
	   * Return whether the specified zone is a valid IANA specifier.
	   * @param {string} zone - Zone to check
	   * @return {boolean}
	   */
	  static isValidIANAZone(zone) {
	    return IANAZone.isValidZone(zone);
	  }

	  /**
	   * Converts the input into a {@link Zone} instance.
	   *
	   * * If `input` is already a Zone instance, it is returned unchanged.
	   * * If `input` is a string containing a valid time zone name, a Zone instance
	   *   with that name is returned.
	   * * If `input` is a string that doesn't refer to a known time zone, a Zone
	   *   instance with {@link Zone#isValid} == false is returned.
	   * * If `input is a number, a Zone instance with the specified fixed offset
	   *   in minutes is returned.
	   * * If `input` is `null` or `undefined`, the default zone is returned.
	   * @param {string|Zone|number} [input] - the value to be converted
	   * @return {Zone}
	   */
	  static normalizeZone(input) {
	    return normalizeZone(input, Settings.defaultZone);
	  }

	  /**
	   * Get the weekday on which the week starts according to the given locale.
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
	   */
	  static getStartOfWeek({
	    locale = null,
	    locObj = null
	  } = {}) {
	    return (locObj || Locale.create(locale)).getStartOfWeek();
	  }

	  /**
	   * Get the minimum number of days necessary in a week before it is considered part of the next year according
	   * to the given locale.
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @returns {number}
	   */
	  static getMinimumDaysInFirstWeek({
	    locale = null,
	    locObj = null
	  } = {}) {
	    return (locObj || Locale.create(locale)).getMinDaysInFirstWeek();
	  }

	  /**
	   * Get the weekdays, which are considered the weekend according to the given locale
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
	   */
	  static getWeekendWeekdays({
	    locale = null,
	    locObj = null
	  } = {}) {
	    // copy the array, because we cache it internally
	    return (locObj || Locale.create(locale)).getWeekendDays().slice();
	  }

	  /**
	   * Return an array of standalone month names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @example Info.months()[0] //=> 'January'
	   * @example Info.months('short')[0] //=> 'Jan'
	   * @example Info.months('numeric')[0] //=> '1'
	   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
	   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
	   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
	   * @return {Array}
	   */
	  static months(length = "long", {
	    locale = null,
	    numberingSystem = null,
	    locObj = null,
	    outputCalendar = "gregory"
	  } = {}) {
	    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
	  }

	  /**
	   * Return an array of format month names.
	   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
	   * changes the string.
	   * See {@link Info#months}
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @return {Array}
	   */
	  static monthsFormat(length = "long", {
	    locale = null,
	    numberingSystem = null,
	    locObj = null,
	    outputCalendar = "gregory"
	  } = {}) {
	    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
	  }

	  /**
	   * Return an array of standalone week names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @example Info.weekdays()[0] //=> 'Monday'
	   * @example Info.weekdays('short')[0] //=> 'Mon'
	   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
	   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
	   * @return {Array}
	   */
	  static weekdays(length = "long", {
	    locale = null,
	    numberingSystem = null,
	    locObj = null
	  } = {}) {
	    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
	  }

	  /**
	   * Return an array of format week names.
	   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
	   * changes the string.
	   * See {@link Info#weekdays}
	   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale=null] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.locObj=null] - an existing locale object to use
	   * @return {Array}
	   */
	  static weekdaysFormat(length = "long", {
	    locale = null,
	    numberingSystem = null,
	    locObj = null
	  } = {}) {
	    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
	  }

	  /**
	   * Return an array of meridiems.
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
	   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
	   * @return {Array}
	   */
	  static meridiems({
	    locale = null
	  } = {}) {
	    return Locale.create(locale).meridiems();
	  }

	  /**
	   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
	   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.eras() //=> [ 'BC', 'AD' ]
	   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
	   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
	   * @return {Array}
	   */
	  static eras(length = "short", {
	    locale = null
	  } = {}) {
	    return Locale.create(locale, null, "gregory").eras(length);
	  }

	  /**
	   * Return the set of available features in this environment.
	   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
	   * Keys:
	   * * `relative`: whether this environment supports relative time formatting
	   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
	   * @example Info.features() //=> { relative: false, localeWeek: true }
	   * @return {Object}
	   */
	  static features() {
	    return {
	      relative: hasRelative(),
	      localeWeek: hasLocaleWeekInfo()
	    };
	  }
	}

	function dayDiff(earlier, later) {
	  const utcDayStart = dt => dt.toUTC(0, {
	      keepLocalTime: true
	    }).startOf("day").valueOf(),
	    ms = utcDayStart(later) - utcDayStart(earlier);
	  return Math.floor(Duration.fromMillis(ms).as("days"));
	}
	function highOrderDiffs(cursor, later, units) {
	  const differs = [["years", (a, b) => b.year - a.year], ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4], ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12], ["weeks", (a, b) => {
	    const days = dayDiff(a, b);
	    return (days - days % 7) / 7;
	  }], ["days", dayDiff]];
	  const results = {};
	  const earlier = cursor;
	  let lowestOrder, highWater;

	  /* This loop tries to diff using larger units first.
	     If we overshoot, we backtrack and try the next smaller unit.
	     "cursor" starts out at the earlier timestamp and moves closer and closer to "later"
	     as we use smaller and smaller units.
	     highWater keeps track of where we would be if we added one more of the smallest unit,
	     this is used later to potentially convert any difference smaller than the smallest higher order unit
	     into a fraction of that smallest higher order unit
	  */
	  for (const [unit, differ] of differs) {
	    if (units.indexOf(unit) >= 0) {
	      lowestOrder = unit;
	      results[unit] = differ(cursor, later);
	      highWater = earlier.plus(results);
	      if (highWater > later) {
	        // we overshot the end point, backtrack cursor by 1
	        results[unit]--;
	        cursor = earlier.plus(results);

	        // if we are still overshooting now, we need to backtrack again
	        // this happens in certain situations when diffing times in different zones,
	        // because this calculation ignores time zones
	        if (cursor > later) {
	          // keep the "overshot by 1" around as highWater
	          highWater = cursor;
	          // backtrack cursor by 1
	          results[unit]--;
	          cursor = earlier.plus(results);
	        }
	      } else {
	        cursor = highWater;
	      }
	    }
	  }
	  return [cursor, results, highWater, lowestOrder];
	}
	function diff (earlier, later, units, opts) {
	  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
	  const remainingMillis = later - cursor;
	  const lowerOrderUnits = units.filter(u => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0);
	  if (lowerOrderUnits.length === 0) {
	    if (highWater < later) {
	      highWater = cursor.plus({
	        [lowestOrder]: 1
	      });
	    }
	    if (highWater !== cursor) {
	      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
	    }
	  }
	  const duration = Duration.fromObject(results, opts);
	  if (lowerOrderUnits.length > 0) {
	    return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
	  } else {
	    return duration;
	  }
	}

	const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
	function intUnit(regex, post = i => i) {
	  return {
	    regex,
	    deser: ([s]) => post(parseDigits(s))
	  };
	}
	const NBSP = String.fromCharCode(160);
	const spaceOrNBSP = `[ ${NBSP}]`;
	const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
	function fixListRegex(s) {
	  // make dots optional and also make them literal
	  // make space and non breakable space characters interchangeable
	  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
	}
	function stripInsensitivities(s) {
	  return s.replace(/\./g, "") // ignore dots that were made optional
	  .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
	  .toLowerCase();
	}
	function oneOf(strings, startIndex) {
	  if (strings === null) {
	    return null;
	  } else {
	    return {
	      regex: RegExp(strings.map(fixListRegex).join("|")),
	      deser: ([s]) => strings.findIndex(i => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex
	    };
	  }
	}
	function offset(regex, groups) {
	  return {
	    regex,
	    deser: ([, h, m]) => signedOffset(h, m),
	    groups
	  };
	}
	function simple(regex) {
	  return {
	    regex,
	    deser: ([s]) => s
	  };
	}
	function escapeToken(value) {
	  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	}

	/**
	 * @param token
	 * @param {Locale} loc
	 */
	function unitForToken(token, loc) {
	  const one = digitRegex(loc),
	    two = digitRegex(loc, "{2}"),
	    three = digitRegex(loc, "{3}"),
	    four = digitRegex(loc, "{4}"),
	    six = digitRegex(loc, "{6}"),
	    oneOrTwo = digitRegex(loc, "{1,2}"),
	    oneToThree = digitRegex(loc, "{1,3}"),
	    oneToSix = digitRegex(loc, "{1,6}"),
	    oneToNine = digitRegex(loc, "{1,9}"),
	    twoToFour = digitRegex(loc, "{2,4}"),
	    fourToSix = digitRegex(loc, "{4,6}"),
	    literal = t => ({
	      regex: RegExp(escapeToken(t.val)),
	      deser: ([s]) => s,
	      literal: true
	    }),
	    unitate = t => {
	      if (token.literal) {
	        return literal(t);
	      }
	      switch (t.val) {
	        // era
	        case "G":
	          return oneOf(loc.eras("short"), 0);
	        case "GG":
	          return oneOf(loc.eras("long"), 0);
	        // years
	        case "y":
	          return intUnit(oneToSix);
	        case "yy":
	          return intUnit(twoToFour, untruncateYear);
	        case "yyyy":
	          return intUnit(four);
	        case "yyyyy":
	          return intUnit(fourToSix);
	        case "yyyyyy":
	          return intUnit(six);
	        // months
	        case "M":
	          return intUnit(oneOrTwo);
	        case "MM":
	          return intUnit(two);
	        case "MMM":
	          return oneOf(loc.months("short", true), 1);
	        case "MMMM":
	          return oneOf(loc.months("long", true), 1);
	        case "L":
	          return intUnit(oneOrTwo);
	        case "LL":
	          return intUnit(two);
	        case "LLL":
	          return oneOf(loc.months("short", false), 1);
	        case "LLLL":
	          return oneOf(loc.months("long", false), 1);
	        // dates
	        case "d":
	          return intUnit(oneOrTwo);
	        case "dd":
	          return intUnit(two);
	        // ordinals
	        case "o":
	          return intUnit(oneToThree);
	        case "ooo":
	          return intUnit(three);
	        // time
	        case "HH":
	          return intUnit(two);
	        case "H":
	          return intUnit(oneOrTwo);
	        case "hh":
	          return intUnit(two);
	        case "h":
	          return intUnit(oneOrTwo);
	        case "mm":
	          return intUnit(two);
	        case "m":
	          return intUnit(oneOrTwo);
	        case "q":
	          return intUnit(oneOrTwo);
	        case "qq":
	          return intUnit(two);
	        case "s":
	          return intUnit(oneOrTwo);
	        case "ss":
	          return intUnit(two);
	        case "S":
	          return intUnit(oneToThree);
	        case "SSS":
	          return intUnit(three);
	        case "u":
	          return simple(oneToNine);
	        case "uu":
	          return simple(oneOrTwo);
	        case "uuu":
	          return intUnit(one);
	        // meridiem
	        case "a":
	          return oneOf(loc.meridiems(), 0);
	        // weekYear (k)
	        case "kkkk":
	          return intUnit(four);
	        case "kk":
	          return intUnit(twoToFour, untruncateYear);
	        // weekNumber (W)
	        case "W":
	          return intUnit(oneOrTwo);
	        case "WW":
	          return intUnit(two);
	        // weekdays
	        case "E":
	        case "c":
	          return intUnit(one);
	        case "EEE":
	          return oneOf(loc.weekdays("short", false), 1);
	        case "EEEE":
	          return oneOf(loc.weekdays("long", false), 1);
	        case "ccc":
	          return oneOf(loc.weekdays("short", true), 1);
	        case "cccc":
	          return oneOf(loc.weekdays("long", true), 1);
	        // offset/zone
	        case "Z":
	        case "ZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
	        case "ZZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
	        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
	        // because we don't have any way to figure out what they are
	        case "z":
	          return simple(/[a-z_+-/]{1,256}?/i);
	        // this special-case "token" represents a place where a macro-token expanded into a white-space literal
	        // in this case we accept any non-newline white-space
	        case " ":
	          return simple(/[^\S\n\r]/);
	        default:
	          return literal(t);
	      }
	    };
	  const unit = unitate(token) || {
	    invalidReason: MISSING_FTP
	  };
	  unit.token = token;
	  return unit;
	}
	const partTypeStyleToTokenVal = {
	  year: {
	    "2-digit": "yy",
	    numeric: "yyyyy"
	  },
	  month: {
	    numeric: "M",
	    "2-digit": "MM",
	    short: "MMM",
	    long: "MMMM"
	  },
	  day: {
	    numeric: "d",
	    "2-digit": "dd"
	  },
	  weekday: {
	    short: "EEE",
	    long: "EEEE"
	  },
	  dayperiod: "a",
	  dayPeriod: "a",
	  hour12: {
	    numeric: "h",
	    "2-digit": "hh"
	  },
	  hour24: {
	    numeric: "H",
	    "2-digit": "HH"
	  },
	  minute: {
	    numeric: "m",
	    "2-digit": "mm"
	  },
	  second: {
	    numeric: "s",
	    "2-digit": "ss"
	  },
	  timeZoneName: {
	    long: "ZZZZZ",
	    short: "ZZZ"
	  }
	};
	function tokenForPart(part, formatOpts, resolvedOpts) {
	  const {
	    type,
	    value
	  } = part;
	  if (type === "literal") {
	    const isSpace = /^\s+$/.test(value);
	    return {
	      literal: !isSpace,
	      val: isSpace ? " " : value
	    };
	  }
	  const style = formatOpts[type];

	  // The user might have explicitly specified hour12 or hourCycle
	  // if so, respect their decision
	  // if not, refer back to the resolvedOpts, which are based on the locale
	  let actualType = type;
	  if (type === "hour") {
	    if (formatOpts.hour12 != null) {
	      actualType = formatOpts.hour12 ? "hour12" : "hour24";
	    } else if (formatOpts.hourCycle != null) {
	      if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
	        actualType = "hour12";
	      } else {
	        actualType = "hour24";
	      }
	    } else {
	      // tokens only differentiate between 24 hours or not,
	      // so we do not need to check hourCycle here, which is less supported anyways
	      actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
	    }
	  }
	  let val = partTypeStyleToTokenVal[actualType];
	  if (typeof val === "object") {
	    val = val[style];
	  }
	  if (val) {
	    return {
	      literal: false,
	      val
	    };
	  }
	  return undefined;
	}
	function buildRegex(units) {
	  const re = units.map(u => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
	  return [`^${re}$`, units];
	}
	function match(input, regex, handlers) {
	  const matches = input.match(regex);
	  if (matches) {
	    const all = {};
	    let matchIndex = 1;
	    for (const i in handlers) {
	      if (hasOwnProperty(handlers, i)) {
	        const h = handlers[i],
	          groups = h.groups ? h.groups + 1 : 1;
	        if (!h.literal && h.token) {
	          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
	        }
	        matchIndex += groups;
	      }
	    }
	    return [matches, all];
	  } else {
	    return [matches, {}];
	  }
	}
	function dateTimeFromMatches(matches) {
	  const toField = token => {
	    switch (token) {
	      case "S":
	        return "millisecond";
	      case "s":
	        return "second";
	      case "m":
	        return "minute";
	      case "h":
	      case "H":
	        return "hour";
	      case "d":
	        return "day";
	      case "o":
	        return "ordinal";
	      case "L":
	      case "M":
	        return "month";
	      case "y":
	        return "year";
	      case "E":
	      case "c":
	        return "weekday";
	      case "W":
	        return "weekNumber";
	      case "k":
	        return "weekYear";
	      case "q":
	        return "quarter";
	      default:
	        return null;
	    }
	  };
	  let zone = null;
	  let specificOffset;
	  if (!isUndefined(matches.z)) {
	    zone = IANAZone.create(matches.z);
	  }
	  if (!isUndefined(matches.Z)) {
	    if (!zone) {
	      zone = new FixedOffsetZone(matches.Z);
	    }
	    specificOffset = matches.Z;
	  }
	  if (!isUndefined(matches.q)) {
	    matches.M = (matches.q - 1) * 3 + 1;
	  }
	  if (!isUndefined(matches.h)) {
	    if (matches.h < 12 && matches.a === 1) {
	      matches.h += 12;
	    } else if (matches.h === 12 && matches.a === 0) {
	      matches.h = 0;
	    }
	  }
	  if (matches.G === 0 && matches.y) {
	    matches.y = -matches.y;
	  }
	  if (!isUndefined(matches.u)) {
	    matches.S = parseMillis(matches.u);
	  }
	  const vals = Object.keys(matches).reduce((r, k) => {
	    const f = toField(k);
	    if (f) {
	      r[f] = matches[k];
	    }
	    return r;
	  }, {});
	  return [vals, zone, specificOffset];
	}
	let dummyDateTimeCache = null;
	function getDummyDateTime() {
	  if (!dummyDateTimeCache) {
	    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
	  }
	  return dummyDateTimeCache;
	}
	function maybeExpandMacroToken(token, locale) {
	  if (token.literal) {
	    return token;
	  }
	  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
	  const tokens = formatOptsToTokens(formatOpts, locale);
	  if (tokens == null || tokens.includes(undefined)) {
	    return token;
	  }
	  return tokens;
	}
	function expandMacroTokens(tokens, locale) {
	  return Array.prototype.concat(...tokens.map(t => maybeExpandMacroToken(t, locale)));
	}

	/**
	 * @private
	 */

	class TokenParser {
	  constructor(locale, format) {
	    this.locale = locale;
	    this.format = format;
	    this.tokens = expandMacroTokens(Formatter.parseFormat(format), locale);
	    this.units = this.tokens.map(t => unitForToken(t, locale));
	    this.disqualifyingUnit = this.units.find(t => t.invalidReason);
	    if (!this.disqualifyingUnit) {
	      const [regexString, handlers] = buildRegex(this.units);
	      this.regex = RegExp(regexString, "i");
	      this.handlers = handlers;
	    }
	  }
	  explainFromTokens(input) {
	    if (!this.isValid) {
	      return {
	        input,
	        tokens: this.tokens,
	        invalidReason: this.invalidReason
	      };
	    } else {
	      const [rawMatches, matches] = match(input, this.regex, this.handlers),
	        [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, undefined];
	      if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
	        throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
	      }
	      return {
	        input,
	        tokens: this.tokens,
	        regex: this.regex,
	        rawMatches,
	        matches,
	        result,
	        zone,
	        specificOffset
	      };
	    }
	  }
	  get isValid() {
	    return !this.disqualifyingUnit;
	  }
	  get invalidReason() {
	    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
	  }
	}
	function explainFromTokens(locale, input, format) {
	  const parser = new TokenParser(locale, format);
	  return parser.explainFromTokens(input);
	}
	function parseFromTokens(locale, input, format) {
	  const {
	    result,
	    zone,
	    specificOffset,
	    invalidReason
	  } = explainFromTokens(locale, input, format);
	  return [result, zone, specificOffset, invalidReason];
	}
	function formatOptsToTokens(formatOpts, locale) {
	  if (!formatOpts) {
	    return null;
	  }
	  const formatter = Formatter.create(locale, formatOpts);
	  const df = formatter.dtFormatter(getDummyDateTime());
	  const parts = df.formatToParts();
	  const resolvedOpts = df.resolvedOptions();
	  return parts.map(p => tokenForPart(p, formatOpts, resolvedOpts));
	}

	const INVALID = "Invalid DateTime";
	const MAX_DATE = 8.64e15;
	function unsupportedZone(zone) {
	  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
	}

	// we cache week data on the DT object and this intermediates the cache
	/**
	 * @param {DateTime} dt
	 */
	function possiblyCachedWeekData(dt) {
	  if (dt.weekData === null) {
	    dt.weekData = gregorianToWeek(dt.c);
	  }
	  return dt.weekData;
	}

	/**
	 * @param {DateTime} dt
	 */
	function possiblyCachedLocalWeekData(dt) {
	  if (dt.localWeekData === null) {
	    dt.localWeekData = gregorianToWeek(dt.c, dt.loc.getMinDaysInFirstWeek(), dt.loc.getStartOfWeek());
	  }
	  return dt.localWeekData;
	}

	// clone really means, "make a new object with these modifications". all "setters" really use this
	// to create a new object while only changing some of the properties
	function clone(inst, alts) {
	  const current = {
	    ts: inst.ts,
	    zone: inst.zone,
	    c: inst.c,
	    o: inst.o,
	    loc: inst.loc,
	    invalid: inst.invalid
	  };
	  return new DateTime({
	    ...current,
	    ...alts,
	    old: current
	  });
	}

	// find the right offset a given local time. The o input is our guess, which determines which
	// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
	function fixOffset(localTS, o, tz) {
	  // Our UTC time is just a guess because our offset is just a guess
	  let utcGuess = localTS - o * 60 * 1000;

	  // Test whether the zone matches the offset for this ts
	  const o2 = tz.offset(utcGuess);

	  // If so, offset didn't change and we're done
	  if (o === o2) {
	    return [utcGuess, o];
	  }

	  // If not, change the ts by the difference in the offset
	  utcGuess -= (o2 - o) * 60 * 1000;

	  // If that gives us the local time we want, we're done
	  const o3 = tz.offset(utcGuess);
	  if (o2 === o3) {
	    return [utcGuess, o2];
	  }

	  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
	  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
	}

	// convert an epoch timestamp into a calendar object with the given offset
	function tsToObj(ts, offset) {
	  ts += offset * 60 * 1000;
	  const d = new Date(ts);
	  return {
	    year: d.getUTCFullYear(),
	    month: d.getUTCMonth() + 1,
	    day: d.getUTCDate(),
	    hour: d.getUTCHours(),
	    minute: d.getUTCMinutes(),
	    second: d.getUTCSeconds(),
	    millisecond: d.getUTCMilliseconds()
	  };
	}

	// convert a calendar object to a epoch timestamp
	function objToTS(obj, offset, zone) {
	  return fixOffset(objToLocalTS(obj), offset, zone);
	}

	// create a new DT instance by adding a duration, adjusting for DSTs
	function adjustTime(inst, dur) {
	  const oPre = inst.o,
	    year = inst.c.year + Math.trunc(dur.years),
	    month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
	    c = {
	      ...inst.c,
	      year,
	      month,
	      day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
	    },
	    millisToAdd = Duration.fromObject({
	      years: dur.years - Math.trunc(dur.years),
	      quarters: dur.quarters - Math.trunc(dur.quarters),
	      months: dur.months - Math.trunc(dur.months),
	      weeks: dur.weeks - Math.trunc(dur.weeks),
	      days: dur.days - Math.trunc(dur.days),
	      hours: dur.hours,
	      minutes: dur.minutes,
	      seconds: dur.seconds,
	      milliseconds: dur.milliseconds
	    }).as("milliseconds"),
	    localTS = objToLocalTS(c);
	  let [ts, o] = fixOffset(localTS, oPre, inst.zone);
	  if (millisToAdd !== 0) {
	    ts += millisToAdd;
	    // that could have changed the offset by going over a DST, but we want to keep the ts the same
	    o = inst.zone.offset(ts);
	  }
	  return {
	    ts,
	    o
	  };
	}

	// helper useful in turning the results of parsing into real dates
	// by handling the zone options
	function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
	  const {
	    setZone,
	    zone
	  } = opts;
	  if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
	    const interpretationZone = parsedZone || zone,
	      inst = DateTime.fromObject(parsed, {
	        ...opts,
	        zone: interpretationZone,
	        specificOffset
	      });
	    return setZone ? inst : inst.setZone(zone);
	  } else {
	    return DateTime.invalid(new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`));
	  }
	}

	// if you want to output a technical format (e.g. RFC 2822), this helper
	// helps handle the details
	function toTechFormat(dt, format, allowZ = true) {
	  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
	    allowZ,
	    forceSimple: true
	  }).formatDateTimeFromString(dt, format) : null;
	}
	function toISODate(o, extended) {
	  const longFormat = o.c.year > 9999 || o.c.year < 0;
	  let c = "";
	  if (longFormat && o.c.year >= 0) c += "+";
	  c += padStart(o.c.year, longFormat ? 6 : 4);
	  if (extended) {
	    c += "-";
	    c += padStart(o.c.month);
	    c += "-";
	    c += padStart(o.c.day);
	  } else {
	    c += padStart(o.c.month);
	    c += padStart(o.c.day);
	  }
	  return c;
	}
	function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
	  let c = padStart(o.c.hour);
	  if (extended) {
	    c += ":";
	    c += padStart(o.c.minute);
	    if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
	      c += ":";
	    }
	  } else {
	    c += padStart(o.c.minute);
	  }
	  if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
	    c += padStart(o.c.second);
	    if (o.c.millisecond !== 0 || !suppressMilliseconds) {
	      c += ".";
	      c += padStart(o.c.millisecond, 3);
	    }
	  }
	  if (includeOffset) {
	    if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
	      c += "Z";
	    } else if (o.o < 0) {
	      c += "-";
	      c += padStart(Math.trunc(-o.o / 60));
	      c += ":";
	      c += padStart(Math.trunc(-o.o % 60));
	    } else {
	      c += "+";
	      c += padStart(Math.trunc(o.o / 60));
	      c += ":";
	      c += padStart(Math.trunc(o.o % 60));
	    }
	  }
	  if (extendedZone) {
	    c += "[" + o.zone.ianaName + "]";
	  }
	  return c;
	}

	// defaults for unspecified units in the supported calendars
	const defaultUnitValues = {
	    month: 1,
	    day: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  },
	  defaultWeekUnitValues = {
	    weekNumber: 1,
	    weekday: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  },
	  defaultOrdinalUnitValues = {
	    ordinal: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  };

	// Units in the supported calendars, sorted by bigness
	const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
	  orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"],
	  orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

	// standardize case and plurality in units
	function normalizeUnit(unit) {
	  const normalized = {
	    year: "year",
	    years: "year",
	    month: "month",
	    months: "month",
	    day: "day",
	    days: "day",
	    hour: "hour",
	    hours: "hour",
	    minute: "minute",
	    minutes: "minute",
	    quarter: "quarter",
	    quarters: "quarter",
	    second: "second",
	    seconds: "second",
	    millisecond: "millisecond",
	    milliseconds: "millisecond",
	    weekday: "weekday",
	    weekdays: "weekday",
	    weeknumber: "weekNumber",
	    weeksnumber: "weekNumber",
	    weeknumbers: "weekNumber",
	    weekyear: "weekYear",
	    weekyears: "weekYear",
	    ordinal: "ordinal"
	  }[unit.toLowerCase()];
	  if (!normalized) throw new InvalidUnitError(unit);
	  return normalized;
	}
	function normalizeUnitWithLocalWeeks(unit) {
	  switch (unit.toLowerCase()) {
	    case "localweekday":
	    case "localweekdays":
	      return "localWeekday";
	    case "localweeknumber":
	    case "localweeknumbers":
	      return "localWeekNumber";
	    case "localweekyear":
	    case "localweekyears":
	      return "localWeekYear";
	    default:
	      return normalizeUnit(unit);
	  }
	}

	// cache offsets for zones based on the current timestamp when this function is
	// first called. When we are handling a datetime from components like (year,
	// month, day, hour) in a time zone, we need a guess about what the timezone
	// offset is so that we can convert into a UTC timestamp. One way is to find the
	// offset of now in the zone. The actual date may have a different offset (for
	// example, if we handle a date in June while we're in December in a zone that
	// observes DST), but we can check and adjust that.
	//
	// When handling many dates, calculating the offset for now every time is
	// expensive. It's just a guess, so we can cache the offset to use even if we
	// are right on a time change boundary (we'll just correct in the other
	// direction). Using a timestamp from first read is a slight optimization for
	// handling dates close to the current date, since those dates will usually be
	// in the same offset (we could set the timestamp statically, instead). We use a
	// single timestamp for all zones to make things a bit more predictable.
	//
	// This is safe for quickDT (used by local() and utc()) because we don't fill in
	// higher-order units from tsNow (as we do in fromObject, this requires that
	// offset is calculated from tsNow).
	function guessOffsetForZone(zone) {
	  if (!zoneOffsetGuessCache[zone]) {
	    if (zoneOffsetTs === undefined) {
	      zoneOffsetTs = Settings.now();
	    }
	    zoneOffsetGuessCache[zone] = zone.offset(zoneOffsetTs);
	  }
	  return zoneOffsetGuessCache[zone];
	}

	// this is a dumbed down version of fromObject() that runs about 60% faster
	// but doesn't do any validation, makes a bunch of assumptions about what units
	// are present, and so on.
	function quickDT(obj, opts) {
	  const zone = normalizeZone(opts.zone, Settings.defaultZone);
	  if (!zone.isValid) {
	    return DateTime.invalid(unsupportedZone(zone));
	  }
	  const loc = Locale.fromObject(opts);
	  let ts, o;

	  // assume we have the higher-order units
	  if (!isUndefined(obj.year)) {
	    for (const u of orderedUnits) {
	      if (isUndefined(obj[u])) {
	        obj[u] = defaultUnitValues[u];
	      }
	    }
	    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
	    if (invalid) {
	      return DateTime.invalid(invalid);
	    }
	    const offsetProvis = guessOffsetForZone(zone);
	    [ts, o] = objToTS(obj, offsetProvis, zone);
	  } else {
	    ts = Settings.now();
	  }
	  return new DateTime({
	    ts,
	    zone,
	    loc,
	    o
	  });
	}
	function diffRelative(start, end, opts) {
	  const round = isUndefined(opts.round) ? true : opts.round,
	    format = (c, unit) => {
	      c = roundTo(c, round || opts.calendary ? 0 : 2, true);
	      const formatter = end.loc.clone(opts).relFormatter(opts);
	      return formatter.format(c, unit);
	    },
	    differ = unit => {
	      if (opts.calendary) {
	        if (!end.hasSame(start, unit)) {
	          return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
	        } else return 0;
	      } else {
	        return end.diff(start, unit).get(unit);
	      }
	    };
	  if (opts.unit) {
	    return format(differ(opts.unit), opts.unit);
	  }
	  for (const unit of opts.units) {
	    const count = differ(unit);
	    if (Math.abs(count) >= 1) {
	      return format(count, unit);
	    }
	  }
	  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
	}
	function lastOpts(argList) {
	  let opts = {},
	    args;
	  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
	    opts = argList[argList.length - 1];
	    args = Array.from(argList).slice(0, argList.length - 1);
	  } else {
	    args = Array.from(argList);
	  }
	  return [opts, args];
	}

	/**
	 * Timestamp to use for cached zone offset guesses (exposed for test)
	 */
	let zoneOffsetTs;
	/**
	 * Cache for zone offset guesses (exposed for test).
	 *
	 * This optimizes quickDT via guessOffsetForZone to avoid repeated calls of
	 * zone.offset().
	 */
	let zoneOffsetGuessCache = {};

	/**
	 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
	 *
	 * A DateTime comprises of:
	 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
	 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
	 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
	 *
	 * Here is a brief overview of the most commonly used functionality it provides:
	 *
	 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link DateTime.local}, {@link DateTime.utc}, and (most flexibly) {@link DateTime.fromObject}. To create one from a standard string format, use {@link DateTime.fromISO}, {@link DateTime.fromHTTP}, and {@link DateTime.fromRFC2822}. To create one from a custom string format, use {@link DateTime.fromFormat}. To create one from a native JS date, use {@link DateTime.fromJSDate}.
	 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link DateTime#toObject}), use the {@link DateTime#year}, {@link DateTime#month},
	 * {@link DateTime#day}, {@link DateTime#hour}, {@link DateTime#minute}, {@link DateTime#second}, {@link DateTime#millisecond} accessors.
	 * * **Week calendar**: For ISO week calendar attributes, see the {@link DateTime#weekYear}, {@link DateTime#weekNumber}, and {@link DateTime#weekday} accessors.
	 * * **Configuration** See the {@link DateTime#locale} and {@link DateTime#numberingSystem} accessors.
	 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link DateTime#set}, {@link DateTime#reconfigure}, {@link DateTime#setZone}, {@link DateTime#setLocale}, {@link DateTime.plus}, {@link DateTime#minus}, {@link DateTime#endOf}, {@link DateTime#startOf}, {@link DateTime#toUTC}, and {@link DateTime#toLocal}.
	 * * **Output**: To convert the DateTime to other representations, use the {@link DateTime#toRelative}, {@link DateTime#toRelativeCalendar}, {@link DateTime#toJSON}, {@link DateTime#toISO}, {@link DateTime#toHTTP}, {@link DateTime#toObject}, {@link DateTime#toRFC2822}, {@link DateTime#toString}, {@link DateTime#toLocaleString}, {@link DateTime#toFormat}, {@link DateTime#toMillis} and {@link DateTime#toJSDate}.
	 *
	 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
	 */
	class DateTime {
	  /**
	   * @access private
	   */
	  constructor(config) {
	    const zone = config.zone || Settings.defaultZone;
	    let invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
	    /**
	     * @access private
	     */
	    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
	    let c = null,
	      o = null;
	    if (!invalid) {
	      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
	      if (unchanged) {
	        [c, o] = [config.old.c, config.old.o];
	      } else {
	        // If an offset has been passed and we have not been called from
	        // clone(), we can trust it and avoid the offset calculation.
	        const ot = isNumber(config.o) && !config.old ? config.o : zone.offset(this.ts);
	        c = tsToObj(this.ts, ot);
	        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
	        c = invalid ? null : c;
	        o = invalid ? null : ot;
	      }
	    }

	    /**
	     * @access private
	     */
	    this._zone = zone;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.invalid = invalid;
	    /**
	     * @access private
	     */
	    this.weekData = null;
	    /**
	     * @access private
	     */
	    this.localWeekData = null;
	    /**
	     * @access private
	     */
	    this.c = c;
	    /**
	     * @access private
	     */
	    this.o = o;
	    /**
	     * @access private
	     */
	    this.isLuxonDateTime = true;
	  }

	  // CONSTRUCT

	  /**
	   * Create a DateTime for the current instant, in the system's time zone.
	   *
	   * Use Settings to override these default values if needed.
	   * @example DateTime.now().toISO() //~> now in the ISO format
	   * @return {DateTime}
	   */
	  static now() {
	    return new DateTime({});
	  }

	  /**
	   * Create a local DateTime
	   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month, 1-indexed
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @example DateTime.local()                                  //~> now
	   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
	   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
	   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
	   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
	   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
	   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
	   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
	   * @return {DateTime}
	   */
	  static local() {
	    const [opts, args] = lastOpts(arguments),
	      [year, month, day, hour, minute, second, millisecond] = args;
	    return quickDT({
	      year,
	      month,
	      day,
	      hour,
	      minute,
	      second,
	      millisecond
	    }, opts);
	  }

	  /**
	   * Create a DateTime in UTC
	   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
	   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
	   * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
	   * @example DateTime.utc()                                              //~> now
	   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
	   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
	   * @return {DateTime}
	   */
	  static utc() {
	    const [opts, args] = lastOpts(arguments),
	      [year, month, day, hour, minute, second, millisecond] = args;
	    opts.zone = FixedOffsetZone.utcInstance;
	    return quickDT({
	      year,
	      month,
	      day,
	      hour,
	      minute,
	      second,
	      millisecond
	    }, opts);
	  }

	  /**
	   * Create a DateTime from a JavaScript Date object. Uses the default zone.
	   * @param {Date} date - a JavaScript Date object
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @return {DateTime}
	   */
	  static fromJSDate(date, options = {}) {
	    const ts = isDate(date) ? date.valueOf() : NaN;
	    if (Number.isNaN(ts)) {
	      return DateTime.invalid("invalid input");
	    }
	    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }
	    return new DateTime({
	      ts: ts,
	      zone: zoneToUse,
	      loc: Locale.fromObject(options)
	    });
	  }

	  /**
	   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromMillis(milliseconds, options = {}) {
	    if (!isNumber(milliseconds)) {
	      throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
	    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
	      // this isn't perfect because we can still end up out of range because of additional shifting, but it's a start
	      return DateTime.invalid("Timestamp out of range");
	    } else {
	      return new DateTime({
	        ts: milliseconds,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options)
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} seconds - a number of seconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromSeconds(seconds, options = {}) {
	    if (!isNumber(seconds)) {
	      throw new InvalidArgumentError("fromSeconds requires a numerical input");
	    } else {
	      return new DateTime({
	        ts: seconds * 1000,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options)
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.year - a year, such as 1987
	   * @param {number} obj.month - a month, 1-12
	   * @param {number} obj.day - a day of the month, 1-31, depending on the month
	   * @param {number} obj.ordinal - day of the year, 1-365 or 366
	   * @param {number} obj.weekYear - an ISO week year
	   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
	   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
	   * @param {number} obj.localWeekYear - a week year, according to the locale
	   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
	   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
	   * @param {number} obj.hour - hour of the day, 0-23
	   * @param {number} obj.minute - minute of the hour, 0-59
	   * @param {number} obj.second - second of the minute, 0-59
	   * @param {number} obj.millisecond - millisecond of the second, 0-999
	   * @param {Object} opts - options for creating this DateTime
	   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
	   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
	   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
	   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
	   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
	   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
	   * @return {DateTime}
	   */
	  static fromObject(obj, opts = {}) {
	    obj = obj || {};
	    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }
	    const loc = Locale.fromObject(opts);
	    const normalized = normalizeObject(obj, normalizeUnitWithLocalWeeks);
	    const {
	      minDaysInFirstWeek,
	      startOfWeek
	    } = usesLocalWeekValues(normalized, loc);
	    const tsNow = Settings.now(),
	      offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow),
	      containsOrdinal = !isUndefined(normalized.ordinal),
	      containsGregorYear = !isUndefined(normalized.year),
	      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
	      containsGregor = containsGregorYear || containsGregorMD,
	      definiteWeekDef = normalized.weekYear || normalized.weekNumber;

	    // cases:
	    // just a weekday -> this week's instance of that weekday, no worries
	    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
	    // (gregorian month or day) + ordinal -> error
	    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

	    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
	      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
	    }
	    if (containsGregorMD && containsOrdinal) {
	      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
	    }
	    const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;

	    // configure ourselves to deal with gregorian dates or week stuff
	    let units,
	      defaultValues,
	      objNow = tsToObj(tsNow, offsetProvis);
	    if (useWeekData) {
	      units = orderedWeekUnits;
	      defaultValues = defaultWeekUnitValues;
	      objNow = gregorianToWeek(objNow, minDaysInFirstWeek, startOfWeek);
	    } else if (containsOrdinal) {
	      units = orderedOrdinalUnits;
	      defaultValues = defaultOrdinalUnitValues;
	      objNow = gregorianToOrdinal(objNow);
	    } else {
	      units = orderedUnits;
	      defaultValues = defaultUnitValues;
	    }

	    // set default values for missing stuff
	    let foundFirst = false;
	    for (const u of units) {
	      const v = normalized[u];
	      if (!isUndefined(v)) {
	        foundFirst = true;
	      } else if (foundFirst) {
	        normalized[u] = defaultValues[u];
	      } else {
	        normalized[u] = objNow[u];
	      }
	    }

	    // make sure the values we have are in range
	    const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized),
	      invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
	    if (invalid) {
	      return DateTime.invalid(invalid);
	    }

	    // compute the actual time
	    const gregorian = useWeekData ? weekToGregorian(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? ordinalToGregorian(normalized) : normalized,
	      [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
	      inst = new DateTime({
	        ts: tsFinal,
	        zone: zoneToUse,
	        o: offsetFinal,
	        loc
	      });

	    // gregorian data + weekday serves only to validate
	    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
	      return DateTime.invalid("mismatched weekday", `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`);
	    }
	    if (!inst.isValid) {
	      return DateTime.invalid(inst.invalid);
	    }
	    return inst;
	  }

	  /**
	   * Create a DateTime from an ISO 8601 string
	   * @param {string} text - the ISO string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
	   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
	   * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
	   * @example DateTime.fromISO('2016-W05-4')
	   * @return {DateTime}
	   */
	  static fromISO(text, opts = {}) {
	    const [vals, parsedZone] = parseISODate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
	  }

	  /**
	   * Create a DateTime from an RFC 2822 string
	   * @param {string} text - the RFC 2822 string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
	   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
	   * @return {DateTime}
	   */
	  static fromRFC2822(text, opts = {}) {
	    const [vals, parsedZone] = parseRFC2822Date(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
	  }

	  /**
	   * Create a DateTime from an HTTP header date
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @param {string} text - the HTTP header date
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
	   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
	   * @return {DateTime}
	   */
	  static fromHTTP(text, opts = {}) {
	    const [vals, parsedZone] = parseHTTPDate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
	  }

	  /**
	   * Create a DateTime from an input string and format string.
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromFormat(text, fmt, opts = {}) {
	    if (isUndefined(text) || isUndefined(fmt)) {
	      throw new InvalidArgumentError("fromFormat requires an input string and a format");
	    }
	    const {
	        locale = null,
	        numberingSystem = null
	      } = opts,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      }),
	      [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
	    if (invalid) {
	      return DateTime.invalid(invalid);
	    } else {
	      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
	    }
	  }

	  /**
	   * @deprecated use fromFormat instead
	   */
	  static fromString(text, fmt, opts = {}) {
	    return DateTime.fromFormat(text, fmt, opts);
	  }

	  /**
	   * Create a DateTime from a SQL date, time, or datetime
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale
	   * @param {string} text - the string to parse
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @example DateTime.fromSQL('2017-05-15')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
	   * @example DateTime.fromSQL('09:12:34.342')
	   * @return {DateTime}
	   */
	  static fromSQL(text, opts = {}) {
	    const [vals, parsedZone] = parseSQL(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
	  }

	  /**
	   * Create an invalid DateTime.
	   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {DateTime}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
	    }
	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
	    if (Settings.throwOnInvalid) {
	      throw new InvalidDateTimeError(invalid);
	    } else {
	      return new DateTime({
	        invalid
	      });
	    }
	  }

	  /**
	   * Check if an object is an instance of DateTime. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDateTime(o) {
	    return o && o.isLuxonDateTime || false;
	  }

	  /**
	   * Produce the format string for a set of options
	   * @param formatOpts
	   * @param localeOpts
	   * @returns {string}
	   */
	  static parseFormatForOpts(formatOpts, localeOpts = {}) {
	    const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
	    return !tokenList ? null : tokenList.map(t => t ? t.val : null).join("");
	  }

	  /**
	   * Produce the the fully expanded format token for the locale
	   * Does NOT quote characters, so quoted tokens will not round trip correctly
	   * @param fmt
	   * @param localeOpts
	   * @returns {string}
	   */
	  static expandFormat(fmt, localeOpts = {}) {
	    const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
	    return expanded.map(t => t.val).join("");
	  }
	  static resetCache() {
	    zoneOffsetTs = undefined;
	    zoneOffsetGuessCache = {};
	  }

	  // INFO

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
	   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
	   * @return {number}
	   */
	  get(unit) {
	    return this[unit];
	  }

	  /**
	   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
	   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
	   * * The DateTime was created by an operation on another invalid date
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get outputCalendar() {
	    return this.isValid ? this.loc.outputCalendar : null;
	  }

	  /**
	   * Get the time zone associated with this DateTime.
	   * @type {Zone}
	   */
	  get zone() {
	    return this._zone;
	  }

	  /**
	   * Get the name of the time zone.
	   * @type {string}
	   */
	  get zoneName() {
	    return this.isValid ? this.zone.name : null;
	  }

	  /**
	   * Get the year
	   * @example DateTime.local(2017, 5, 25).year //=> 2017
	   * @type {number}
	   */
	  get year() {
	    return this.isValid ? this.c.year : NaN;
	  }

	  /**
	   * Get the quarter
	   * @example DateTime.local(2017, 5, 25).quarter //=> 2
	   * @type {number}
	   */
	  get quarter() {
	    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
	  }

	  /**
	   * Get the month (1-12).
	   * @example DateTime.local(2017, 5, 25).month //=> 5
	   * @type {number}
	   */
	  get month() {
	    return this.isValid ? this.c.month : NaN;
	  }

	  /**
	   * Get the day of the month (1-30ish).
	   * @example DateTime.local(2017, 5, 25).day //=> 25
	   * @type {number}
	   */
	  get day() {
	    return this.isValid ? this.c.day : NaN;
	  }

	  /**
	   * Get the hour of the day (0-23).
	   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
	   * @type {number}
	   */
	  get hour() {
	    return this.isValid ? this.c.hour : NaN;
	  }

	  /**
	   * Get the minute of the hour (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
	   * @type {number}
	   */
	  get minute() {
	    return this.isValid ? this.c.minute : NaN;
	  }

	  /**
	   * Get the second of the minute (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
	   * @type {number}
	   */
	  get second() {
	    return this.isValid ? this.c.second : NaN;
	  }

	  /**
	   * Get the millisecond of the second (0-999).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
	   * @type {number}
	   */
	  get millisecond() {
	    return this.isValid ? this.c.millisecond : NaN;
	  }

	  /**
	   * Get the week year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
	   * @type {number}
	   */
	  get weekYear() {
	    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
	  }

	  /**
	   * Get the week number of the week year (1-52ish).
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
	   * @type {number}
	   */
	  get weekNumber() {
	    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
	  }

	  /**
	   * Get the day of the week.
	   * 1 is Monday and 7 is Sunday
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 11, 31).weekday //=> 4
	   * @type {number}
	   */
	  get weekday() {
	    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
	  }

	  /**
	   * Returns true if this date is on a weekend according to the locale, false otherwise
	   * @returns {boolean}
	   */
	  get isWeekend() {
	    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
	  }

	  /**
	   * Get the day of the week according to the locale.
	   * 1 is the first day of the week and 7 is the last day of the week.
	   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
	   * @returns {number}
	   */
	  get localWeekday() {
	    return this.isValid ? possiblyCachedLocalWeekData(this).weekday : NaN;
	  }

	  /**
	   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
	   * because the week can start on different days of the week (see localWeekday) and because a different number of days
	   * is required for a week to count as the first week of a year.
	   * @returns {number}
	   */
	  get localWeekNumber() {
	    return this.isValid ? possiblyCachedLocalWeekData(this).weekNumber : NaN;
	  }

	  /**
	   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
	   * differently, see localWeekNumber.
	   * @returns {number}
	   */
	  get localWeekYear() {
	    return this.isValid ? possiblyCachedLocalWeekData(this).weekYear : NaN;
	  }

	  /**
	   * Get the ordinal (meaning the day of the year)
	   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
	   * @type {number|DateTime}
	   */
	  get ordinal() {
	    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
	  }

	  /**
	   * Get the human readable short month name, such as 'Oct'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
	   * @type {string}
	   */
	  get monthShort() {
	    return this.isValid ? Info.months("short", {
	      locObj: this.loc
	    })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable long month name, such as 'October'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthLong //=> October
	   * @type {string}
	   */
	  get monthLong() {
	    return this.isValid ? Info.months("long", {
	      locObj: this.loc
	    })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable short weekday, such as 'Mon'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
	   * @type {string}
	   */
	  get weekdayShort() {
	    return this.isValid ? Info.weekdays("short", {
	      locObj: this.loc
	    })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the human readable long weekday, such as 'Monday'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
	   * @type {string}
	   */
	  get weekdayLong() {
	    return this.isValid ? Info.weekdays("long", {
	      locObj: this.loc
	    })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the UTC offset of this DateTime in minutes
	   * @example DateTime.now().offset //=> -240
	   * @example DateTime.utc().offset //=> 0
	   * @type {number}
	   */
	  get offset() {
	    return this.isValid ? +this.o : NaN;
	  }

	  /**
	   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameShort() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "short",
	        locale: this.locale
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameLong() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "long",
	        locale: this.locale
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get whether this zone's offset ever changes, as in a DST.
	   * @type {boolean}
	   */
	  get isOffsetFixed() {
	    return this.isValid ? this.zone.isUniversal : null;
	  }

	  /**
	   * Get whether the DateTime is in a DST.
	   * @type {boolean}
	   */
	  get isInDST() {
	    if (this.isOffsetFixed) {
	      return false;
	    } else {
	      return this.offset > this.set({
	        month: 1,
	        day: 1
	      }).offset || this.offset > this.set({
	        month: 5
	      }).offset;
	    }
	  }

	  /**
	   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
	   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
	   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
	   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
	   * @returns {DateTime[]}
	   */
	  getPossibleOffsets() {
	    if (!this.isValid || this.isOffsetFixed) {
	      return [this];
	    }
	    const dayMs = 86400000;
	    const minuteMs = 60000;
	    const localTS = objToLocalTS(this.c);
	    const oEarlier = this.zone.offset(localTS - dayMs);
	    const oLater = this.zone.offset(localTS + dayMs);
	    const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
	    const o2 = this.zone.offset(localTS - oLater * minuteMs);
	    if (o1 === o2) {
	      return [this];
	    }
	    const ts1 = localTS - o1 * minuteMs;
	    const ts2 = localTS - o2 * minuteMs;
	    const c1 = tsToObj(ts1, o1);
	    const c2 = tsToObj(ts2, o2);
	    if (c1.hour === c2.hour && c1.minute === c2.minute && c1.second === c2.second && c1.millisecond === c2.millisecond) {
	      return [clone(this, {
	        ts: ts1
	      }), clone(this, {
	        ts: ts2
	      })];
	    }
	    return [this];
	  }

	  /**
	   * Returns true if this DateTime is in a leap year, false otherwise
	   * @example DateTime.local(2016).isInLeapYear //=> true
	   * @example DateTime.local(2013).isInLeapYear //=> false
	   * @type {boolean}
	   */
	  get isInLeapYear() {
	    return isLeapYear(this.year);
	  }

	  /**
	   * Returns the number of days in this DateTime's month
	   * @example DateTime.local(2016, 2).daysInMonth //=> 29
	   * @example DateTime.local(2016, 3).daysInMonth //=> 31
	   * @type {number}
	   */
	  get daysInMonth() {
	    return daysInMonth(this.year, this.month);
	  }

	  /**
	   * Returns the number of days in this DateTime's year
	   * @example DateTime.local(2016).daysInYear //=> 366
	   * @example DateTime.local(2013).daysInYear //=> 365
	   * @type {number}
	   */
	  get daysInYear() {
	    return this.isValid ? daysInYear(this.year) : NaN;
	  }

	  /**
	   * Returns the number of weeks in this DateTime's year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2004).weeksInWeekYear //=> 53
	   * @example DateTime.local(2013).weeksInWeekYear //=> 52
	   * @type {number}
	   */
	  get weeksInWeekYear() {
	    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
	  }

	  /**
	   * Returns the number of weeks in this DateTime's local week year
	   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
	   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
	   * @type {number}
	   */
	  get weeksInLocalWeekYear() {
	    return this.isValid ? weeksInWeekYear(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
	  }

	  /**
	   * Returns the resolved Intl options for this DateTime.
	   * This is useful in understanding the behavior of formatting methods
	   * @param {Object} opts - the same options as toLocaleString
	   * @return {Object}
	   */
	  resolvedLocaleOptions(opts = {}) {
	    const {
	      locale,
	      numberingSystem,
	      calendar
	    } = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this);
	    return {
	      locale,
	      numberingSystem,
	      outputCalendar: calendar
	    };
	  }

	  // TRANSFORM

	  /**
	   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to {@link DateTime#setZone}('utc')
	   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
	   * @param {Object} [opts={}] - options to pass to `setZone()`
	   * @return {DateTime}
	   */
	  toUTC(offset = 0, opts = {}) {
	    return this.setZone(FixedOffsetZone.instance(offset), opts);
	  }

	  /**
	   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to `setZone('local')`
	   * @return {DateTime}
	   */
	  toLocal() {
	    return this.setZone(Settings.defaultZone);
	  }

	  /**
	   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
	   *
	   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
	   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
	   * @param {Object} opts - options
	   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
	   * @return {DateTime}
	   */
	  setZone(zone, {
	    keepLocalTime = false,
	    keepCalendarTime = false
	  } = {}) {
	    zone = normalizeZone(zone, Settings.defaultZone);
	    if (zone.equals(this.zone)) {
	      return this;
	    } else if (!zone.isValid) {
	      return DateTime.invalid(unsupportedZone(zone));
	    } else {
	      let newTS = this.ts;
	      if (keepLocalTime || keepCalendarTime) {
	        const offsetGuess = zone.offset(this.ts);
	        const asObj = this.toObject();
	        [newTS] = objToTS(asObj, offsetGuess, zone);
	      }
	      return clone(this, {
	        ts: newTS,
	        zone
	      });
	    }
	  }

	  /**
	   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
	   * @param {Object} properties - the properties to set
	   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
	   * @return {DateTime}
	   */
	  reconfigure({
	    locale,
	    numberingSystem,
	    outputCalendar
	  } = {}) {
	    const loc = this.loc.clone({
	      locale,
	      numberingSystem,
	      outputCalendar
	    });
	    return clone(this, {
	      loc
	    });
	  }

	  /**
	   * "Set" the locale. Returns a newly-constructed DateTime.
	   * Just a convenient alias for reconfigure({ locale })
	   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
	   * @return {DateTime}
	   */
	  setLocale(locale) {
	    return this.reconfigure({
	      locale
	    });
	  }

	  /**
	   * "Set" the values of specified units. Returns a newly-constructed DateTime.
	   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
	   *
	   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
	   * They cannot be mixed with ISO-week units like `weekday`.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dt.set({ year: 2017 })
	   * @example dt.set({ hour: 8, minute: 30 })
	   * @example dt.set({ weekday: 5 })
	   * @example dt.set({ year: 2005, ordinal: 234 })
	   * @return {DateTime}
	   */
	  set(values) {
	    if (!this.isValid) return this;
	    const normalized = normalizeObject(values, normalizeUnitWithLocalWeeks);
	    const {
	      minDaysInFirstWeek,
	      startOfWeek
	    } = usesLocalWeekValues(normalized, this.loc);
	    const settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday),
	      containsOrdinal = !isUndefined(normalized.ordinal),
	      containsGregorYear = !isUndefined(normalized.year),
	      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
	      containsGregor = containsGregorYear || containsGregorMD,
	      definiteWeekDef = normalized.weekYear || normalized.weekNumber;
	    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
	      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
	    }
	    if (containsGregorMD && containsOrdinal) {
	      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
	    }
	    let mixed;
	    if (settingWeekStuff) {
	      mixed = weekToGregorian({
	        ...gregorianToWeek(this.c, minDaysInFirstWeek, startOfWeek),
	        ...normalized
	      }, minDaysInFirstWeek, startOfWeek);
	    } else if (!isUndefined(normalized.ordinal)) {
	      mixed = ordinalToGregorian({
	        ...gregorianToOrdinal(this.c),
	        ...normalized
	      });
	    } else {
	      mixed = {
	        ...this.toObject(),
	        ...normalized
	      };

	      // if we didn't set the day but we ended up on an overflow date,
	      // use the last day of the right month
	      if (isUndefined(normalized.day)) {
	        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
	      }
	    }
	    const [ts, o] = objToTS(mixed, this.o, this.zone);
	    return clone(this, {
	      ts,
	      o
	    });
	  }

	  /**
	   * Add a period of time to this DateTime and return the resulting DateTime
	   *
	   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @example DateTime.now().plus(123) //~> in 123 milliseconds
	   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
	   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
	   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
	   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
	   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
	   * @return {DateTime}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;
	    const dur = Duration.fromDurationLike(duration);
	    return clone(this, adjustTime(this, dur));
	  }

	  /**
	   * Subtract a period of time to this DateTime and return the resulting DateTime
	   * See {@link DateTime#plus}
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   @return {DateTime}
	   */
	  minus(duration) {
	    if (!this.isValid) return this;
	    const dur = Duration.fromDurationLike(duration).negate();
	    return clone(this, adjustTime(this, dur));
	  }

	  /**
	   * "Set" this DateTime to the beginning of a unit of time.
	   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @param {Object} opts - options
	   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
	   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
	   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
	   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
	   * @return {DateTime}
	   */
	  startOf(unit, {
	    useLocaleWeeks = false
	  } = {}) {
	    if (!this.isValid) return this;
	    const o = {},
	      normalizedUnit = Duration.normalizeUnit(unit);
	    switch (normalizedUnit) {
	      case "years":
	        o.month = 1;
	      // falls through
	      case "quarters":
	      case "months":
	        o.day = 1;
	      // falls through
	      case "weeks":
	      case "days":
	        o.hour = 0;
	      // falls through
	      case "hours":
	        o.minute = 0;
	      // falls through
	      case "minutes":
	        o.second = 0;
	      // falls through
	      case "seconds":
	        o.millisecond = 0;
	        break;
	      // no default, invalid units throw in normalizeUnit()
	    }
	    if (normalizedUnit === "weeks") {
	      if (useLocaleWeeks) {
	        const startOfWeek = this.loc.getStartOfWeek();
	        const {
	          weekday
	        } = this;
	        if (weekday < startOfWeek) {
	          o.weekNumber = this.weekNumber - 1;
	        }
	        o.weekday = startOfWeek;
	      } else {
	        o.weekday = 1;
	      }
	    }
	    if (normalizedUnit === "quarters") {
	      const q = Math.ceil(this.month / 3);
	      o.month = (q - 1) * 3 + 1;
	    }
	    return this.set(o);
	  }

	  /**
	   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
	   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @param {Object} opts - options
	   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
	   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
	   * @return {DateTime}
	   */
	  endOf(unit, opts) {
	    return this.isValid ? this.plus({
	      [unit]: 1
	    }).startOf(unit, opts).minus(1) : this;
	  }

	  // OUTPUT

	  /**
	   * Returns a string representation of this DateTime formatted according to the specified format string.
	   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
	   * @param {string} fmt - the format string
	   * @param {Object} opts - opts to override the configuration options on this DateTime
	   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
	   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
	   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
	   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
	  }

	  /**
	   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
	   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
	   * of the DateTime in the assigned locale.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
	   * @param {Object} opts - opts to override the configuration options on this DateTime
	   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
	   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
	   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
	   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
	   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
	   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
	   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
	   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
	   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
	   * @return {string}
	   */
	  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
	    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
	  }

	  /**
	   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
	   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
	   * @example DateTime.now().toLocaleParts(); //=> [
	   *                                   //=>   { type: 'day', value: '25' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'month', value: '05' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'year', value: '1982' }
	   *                                   //=> ]
	   */
	  toLocaleParts(opts = {}) {
	    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
	   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
	   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
	   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
	   * @return {string}
	   */
	  toISO({
	    format = "extended",
	    suppressSeconds = false,
	    suppressMilliseconds = false,
	    includeOffset = true,
	    extendedZone = false
	  } = {}) {
	    if (!this.isValid) {
	      return null;
	    }
	    const ext = format === "extended";
	    let c = toISODate(this, ext);
	    c += "T";
	    c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
	    return c;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's date component
	   * @param {Object} opts - options
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
	   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
	   * @return {string}
	   */
	  toISODate({
	    format = "extended"
	  } = {}) {
	    if (!this.isValid) {
	      return null;
	    }
	    return toISODate(this, format === "extended");
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's week date
	   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
	   * @return {string}
	   */
	  toISOWeekDate() {
	    return toTechFormat(this, "kkkk-'W'WW-c");
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's time component
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
	   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
	   * @return {string}
	   */
	  toISOTime({
	    suppressMilliseconds = false,
	    suppressSeconds = false,
	    includeOffset = true,
	    includePrefix = false,
	    extendedZone = false,
	    format = "extended"
	  } = {}) {
	    if (!this.isValid) {
	      return null;
	    }
	    let c = includePrefix ? "T" : "";
	    return c + toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
	  }

	  /**
	   * Returns an RFC 2822-compatible string representation of this DateTime
	   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
	   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
	   * @return {string}
	   */
	  toRFC2822() {
	    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
	   * Specifically, the string conforms to RFC 1123.
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
	   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
	   * @return {string}
	   */
	  toHTTP() {
	    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Date
	   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
	   * @return {string}
	   */
	  toSQLDate() {
	    if (!this.isValid) {
	      return null;
	    }
	    return toISODate(this, true);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Time
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
	   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
	   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
	   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
	   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
	   * @return {string}
	   */
	  toSQLTime({
	    includeOffset = true,
	    includeZone = false,
	    includeOffsetSpace = true
	  } = {}) {
	    let fmt = "HH:mm:ss.SSS";
	    if (includeZone || includeOffset) {
	      if (includeOffsetSpace) {
	        fmt += " ";
	      }
	      if (includeZone) {
	        fmt += "z";
	      } else if (includeOffset) {
	        fmt += "ZZ";
	      }
	    }
	    return toTechFormat(this, fmt, true);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
	   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
	   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
	   * @return {string}
	   */
	  toSQL(opts = {}) {
	    if (!this.isValid) {
	      return null;
	    }
	    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for debugging
	   * @return {string}
	   */
	  toString() {
	    return this.isValid ? this.toISO() : INVALID;
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for the REPL.
	   * @return {string}
	   */
	  [Symbol.for("nodejs.util.inspect.custom")]() {
	    if (this.isValid) {
	      return `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`;
	    } else {
	      return `DateTime { Invalid, reason: ${this.invalidReason} }`;
	    }
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
	   * @return {number}
	   */
	  valueOf() {
	    return this.toMillis();
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime.
	   * @return {number}
	   */
	  toMillis() {
	    return this.isValid ? this.ts : NaN;
	  }

	  /**
	   * Returns the epoch seconds of this DateTime.
	   * @return {number}
	   */
	  toSeconds() {
	    return this.isValid ? this.ts / 1000 : NaN;
	  }

	  /**
	   * Returns the epoch seconds (as a whole number) of this DateTime.
	   * @return {number}
	   */
	  toUnixInteger() {
	    return this.isValid ? Math.floor(this.ts / 1000) : NaN;
	  }

	  /**
	   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns a BSON serializable equivalent to this DateTime.
	   * @return {Date}
	   */
	  toBSON() {
	    return this.toJSDate();
	  }

	  /**
	   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
	   * @param opts - options for generating the object
	   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
	   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
	   * @return {Object}
	   */
	  toObject(opts = {}) {
	    if (!this.isValid) return {};
	    const base = {
	      ...this.c
	    };
	    if (opts.includeConfig) {
	      base.outputCalendar = this.outputCalendar;
	      base.numberingSystem = this.loc.numberingSystem;
	      base.locale = this.loc.locale;
	    }
	    return base;
	  }

	  /**
	   * Returns a JavaScript Date equivalent to this DateTime.
	   * @return {Date}
	   */
	  toJSDate() {
	    return new Date(this.isValid ? this.ts : NaN);
	  }

	  // COMPARE

	  /**
	   * Return the difference between two DateTimes as a Duration.
	   * @param {DateTime} otherDateTime - the DateTime to compare this one to
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example
	   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
	   *     i2 = DateTime.fromISO('1983-10-14T10:30');
	   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
	   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
	   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
	   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
	   * @return {Duration}
	   */
	  diff(otherDateTime, unit = "milliseconds", opts = {}) {
	    if (!this.isValid || !otherDateTime.isValid) {
	      return Duration.invalid("created by diffing an invalid DateTime");
	    }
	    const durOpts = {
	      locale: this.locale,
	      numberingSystem: this.numberingSystem,
	      ...opts
	    };
	    const units = maybeArray(unit).map(Duration.normalizeUnit),
	      otherIsLater = otherDateTime.valueOf() > this.valueOf(),
	      earlier = otherIsLater ? this : otherDateTime,
	      later = otherIsLater ? otherDateTime : this,
	      diffed = diff(earlier, later, units, durOpts);
	    return otherIsLater ? diffed.negate() : diffed;
	  }

	  /**
	   * Return the difference between this DateTime and right now.
	   * See {@link DateTime#diff}
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  diffNow(unit = "milliseconds", opts = {}) {
	    return this.diff(DateTime.now(), unit, opts);
	  }

	  /**
	   * Return an Interval spanning between this DateTime and another DateTime
	   * @param {DateTime} otherDateTime - the other end point of the Interval
	   * @return {Interval}
	   */
	  until(otherDateTime) {
	    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
	  }

	  /**
	   * Return whether this DateTime is in the same unit of time as another DateTime.
	   * Higher-order units must also be identical for this function to return `true`.
	   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
	   * @param {DateTime} otherDateTime - the other DateTime
	   * @param {string} unit - the unit of time to check sameness on
	   * @param {Object} opts - options
	   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
	   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
	   * @return {boolean}
	   */
	  hasSame(otherDateTime, unit, opts) {
	    if (!this.isValid) return false;
	    const inputMs = otherDateTime.valueOf();
	    const adjustedToZone = this.setZone(otherDateTime.zone, {
	      keepLocalTime: true
	    });
	    return adjustedToZone.startOf(unit, opts) <= inputMs && inputMs <= adjustedToZone.endOf(unit, opts);
	  }

	  /**
	   * Equality check
	   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
	   * To compare just the millisecond values, use `+dt1 === +dt2`.
	   * @param {DateTime} other - the other DateTime
	   * @return {boolean}
	   */
	  equals(other) {
	    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
	  }

	  /**
	   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
	   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
	   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
	   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
	   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
	   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
	   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
	   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
	   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
	   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
	   */
	  toRelative(options = {}) {
	    if (!this.isValid) return null;
	    const base = options.base || DateTime.fromObject({}, {
	        zone: this.zone
	      }),
	      padding = options.padding ? this < base ? -options.padding : options.padding : 0;
	    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
	    let unit = options.unit;
	    if (Array.isArray(options.unit)) {
	      units = options.unit;
	      unit = undefined;
	    }
	    return diffRelative(base, this.plus(padding), {
	      ...options,
	      numeric: "always",
	      units,
	      unit
	    });
	  }

	  /**
	   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
	   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
	   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
	   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
	   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
	   */
	  toRelativeCalendar(options = {}) {
	    if (!this.isValid) return null;
	    return diffRelative(options.base || DateTime.fromObject({}, {
	      zone: this.zone
	    }), this, {
	      ...options,
	      numeric: "auto",
	      units: ["years", "months", "days"],
	      calendary: true
	    });
	  }

	  /**
	   * Return the min of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
	   * @return {DateTime} the min DateTime, or undefined if called with no argument
	   */
	  static min(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("min requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, i => i.valueOf(), Math.min);
	  }

	  /**
	   * Return the max of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
	   * @return {DateTime} the max DateTime, or undefined if called with no argument
	   */
	  static max(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("max requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, i => i.valueOf(), Math.max);
	  }

	  // MISC

	  /**
	   * Explain how a string would be parsed by fromFormat()
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see description)
	   * @param {Object} options - options taken by fromFormat()
	   * @return {Object}
	   */
	  static fromFormatExplain(text, fmt, options = {}) {
	    const {
	        locale = null,
	        numberingSystem = null
	      } = options,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      });
	    return explainFromTokens(localeToUse, text, fmt);
	  }

	  /**
	   * @deprecated use fromFormatExplain instead
	   */
	  static fromStringExplain(text, fmt, options = {}) {
	    return DateTime.fromFormatExplain(text, fmt, options);
	  }

	  /**
	   * Build a parser for `fmt` using the given locale. This parser can be passed
	   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
	   * can be used to optimize cases where many dates need to be parsed in a
	   * specific format.
	   *
	   * @param {String} fmt - the format the string is expected to be in (see
	   * description)
	   * @param {Object} options - options used to set locale and numberingSystem
	   * for parser
	   * @returns {TokenParser} - opaque object to be used
	   */
	  static buildFormatParser(fmt, options = {}) {
	    const {
	        locale = null,
	        numberingSystem = null
	      } = options,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      });
	    return new TokenParser(localeToUse, fmt);
	  }

	  /**
	   * Create a DateTime from an input string and format parser.
	   *
	   * The format parser must have been created with the same locale as this call.
	   *
	   * @param {String} text - the string to parse
	   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
	   * @param {Object} opts - options taken by fromFormat()
	   * @returns {DateTime}
	   */
	  static fromFormatParser(text, formatParser, opts = {}) {
	    if (isUndefined(text) || isUndefined(formatParser)) {
	      throw new InvalidArgumentError("fromFormatParser requires an input string and a format parser");
	    }
	    const {
	        locale = null,
	        numberingSystem = null
	      } = opts,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      });
	    if (!localeToUse.equals(formatParser.locale)) {
	      throw new InvalidArgumentError(`fromFormatParser called with a locale of ${localeToUse}, ` + `but the format parser was created for ${formatParser.locale}`);
	    }
	    const {
	      result,
	      zone,
	      specificOffset,
	      invalidReason
	    } = formatParser.explainFromTokens(text);
	    if (invalidReason) {
	      return DateTime.invalid(invalidReason);
	    } else {
	      return parseDataToDateTime(result, zone, opts, `format ${formatParser.format}`, text, specificOffset);
	    }
	  }

	  // FORMAT PRESETS

	  /**
	   * {@link DateTime#toLocaleString} format like 10/14/1983
	   * @type {Object}
	   */
	  static get DATE_SHORT() {
	    return DATE_SHORT;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_MED() {
	    return DATE_MED;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_MED_WITH_WEEKDAY() {
	    return DATE_MED_WITH_WEEKDAY;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_FULL() {
	    return DATE_FULL;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_HUGE() {
	    return DATE_HUGE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_SIMPLE() {
	    return TIME_SIMPLE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SECONDS() {
	    return TIME_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SHORT_OFFSET() {
	    return TIME_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_LONG_OFFSET() {
	    return TIME_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_SIMPLE() {
	    return TIME_24_SIMPLE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SECONDS() {
	    return TIME_24_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SHORT_OFFSET() {
	    return TIME_24_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_LONG_OFFSET() {
	    return TIME_24_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT() {
	    return DATETIME_SHORT;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT_WITH_SECONDS() {
	    return DATETIME_SHORT_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED() {
	    return DATETIME_MED;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_SECONDS() {
	    return DATETIME_MED_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_WEEKDAY() {
	    return DATETIME_MED_WITH_WEEKDAY;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL() {
	    return DATETIME_FULL;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL_WITH_SECONDS() {
	    return DATETIME_FULL_WITH_SECONDS;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE() {
	    return DATETIME_HUGE;
	  }

	  /**
	   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE_WITH_SECONDS() {
	    return DATETIME_HUGE_WITH_SECONDS;
	  }
	}

	/**
	 * @private
	 */
	function friendlyDateTime(dateTimeish) {
	  if (DateTime.isDateTime(dateTimeish)) {
	    return dateTimeish;
	  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
	    return DateTime.fromJSDate(dateTimeish);
	  } else if (dateTimeish && typeof dateTimeish === "object") {
	    return DateTime.fromObject(dateTimeish);
	  } else {
	    throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
	  }
	}

	/* Gets Splide library to generate a carousel on the homepage */
	const splideCheck = document.querySelector('.splide');
	const bodyElement = document.querySelector('body');

	/* -----------------------------------------------------------------
	Checks for the existance of dropdown menus inside #main-menu,
	selects the last one and assigns to it the class .dropdown-menu-end
	in order to align the right end of the dropdown against the viewport
	right limit
	----------------------------------------------------------------- */

	const dropdownMenus = document.querySelectorAll("#main-menu > .dropdown > .dropdown-menu");
	const lastDropdown = dropdownMenus.length - 1;
	dropdownMenus[lastDropdown].classList.add("dropdown-menu-end");

	/* ----------------------------------
	Pacientes/Profesionales modal
	---------------------------------- */
	window.addEventListener('load', event => {
	  const docCookies = document.cookie;
	  const docHref = document.location.href;
	  const searchCookie = 'tipo_usuario';
	  if (!docCookies.includes(searchCookie) && !docHref.includes(searchCookie)) {
	    const modalTipoUsuario = new Modal(document.getElementById('tipo-usuario'), {
	      'backdrop': true,
	      'keyboard': false
	    });
	    modalTipoUsuario.show();
	  }
	});

	/* ---------------------
	SplideJS implementation
	--------------------- */
	if (splideCheck) {
	  new Splide(".splide", {
	    perPage: 4,
	    // Responsive breakpoints
	    breakpoints: {
	      1200: {
	        perPage: 3
	      },
	      992: {
	        perPage: 2
	      },
	      576: {
	        perPage: 1
	      }
	    },
	    gap: "2rem"
	  }).mount();
	}

	// Custom look for "list-group" items in "Resoluciones FACO" page
	let listElems = document.querySelectorAll("#lista-resoluciones > li");
	listElems.forEach(function (elem) {
	  elem.classList.add("list-group-item");
	});

	/* -------------------------
	Delegados Departamentales
	--------------------------*/
	if (bodyElement.classList.contains('delegados-departamentales')) {
	  const listaDepartamentos = document.getElementById('lista-departamentos');
	  const contentBlocks = document.querySelectorAll('.content-departamento');
	  const deptosMapa = document.querySelectorAll('.svg-map-wrapper > svg path');
	  const deptosVacios = ['rio-seco', 'sobremonte', 'pocho', 'minas'];
	  const deptosMapaFilter = Array.from(deptosMapa).filter(elemento => {
	    const idElemento = elemento.getAttribute('id');
	    return !deptosVacios.includes(idElemento);
	  });
	  function initDeptos() {
	    let deptoInit = listaDepartamentos.value;
	    contentBlocks.forEach(element => {
	      if (element.id === deptoInit) {
	        element.classList.remove('d-none');
	        element.classList.add('d-block');
	      } else {
	        element.classList.add('d-none');
	        element.classList.remove('d-block');
	      }
	    });
	    deptosMapa.forEach(element => {
	      if (element.id === deptoInit) {
	        element.classList.add('selected');
	        element.classList.remove('not-selected');
	      } else {
	        element.classList.add('not-selected');
	        element.classList.remove('selected');
	      }
	    });
	  }
	  initDeptos();
	  listaDepartamentos.addEventListener('change', evt => {
	    let deptoSelecc = evt.target.value;
	    contentBlocks.forEach(element => {
	      if (element.id === deptoSelecc) {
	        element.classList.remove('d-none');
	        element.classList.add('d-block');
	      } else {
	        element.classList.add('d-none');
	        element.classList.remove('d-block');
	      }
	    });
	    deptosMapa.forEach(element => {
	      if (element.id === deptoSelecc) {
	        element.classList.add('selected');
	        element.classList.remove('not-selected');
	      } else {
	        element.classList.add('not-selected');
	        element.classList.remove('selected');
	      }
	    });
	  });
	  deptosMapaFilter.forEach(element => {
	    element.addEventListener('click', evt => {
	      const opcionesLista = document.querySelectorAll('#lista-departamentos > option');
	      let deptoSelecc = evt.target.getAttribute('id');
	      console.log(deptoSelecc);
	      opcionesLista.forEach(element => {
	        if (element.value === deptoSelecc) {
	          element.setAttribute('selected', true);
	        } else {
	          element.removeAttribute('selected');
	        }
	      });
	      deptosMapa.forEach(mapElement => {
	        mapElement.classList.remove('selected');
	        mapElement.classList.add('not-selected');
	      });
	      evt.target.classList.add('selected');
	      evt.target.classList.remove('not-selected');
	      contentBlocks.forEach(element => {
	        if (element.id === deptoSelecc) {
	          element.classList.remove('d-none');
	          element.classList.add('d-block');
	        } else {
	          element.classList.add('d-none');
	          element.classList.remove('d-block');
	        }
	      });
	    });
	  });
	  deptosVacios.forEach(element => {
	    let deptoVacio = document.getElementById(element);
	    deptoVacio.classList.add('forbidden');
	  });
	}

	/* --------------------------
	Convenios y Beneficios
	-------------------------- */
	if (bodyElement.classList.contains('convenios-beneficios')) {
	  const botonesFiltro = document.querySelectorAll('.boton-filtro');
	  botonesFiltro.forEach(function (boton) {
	    boton.addEventListener('click', function () {
	      botonesFiltro.forEach(function (elem) {
	        elem.classList.remove('active');
	      });
	      boton.classList.add('active');
	      let rubroFiltro = boton.getAttribute('colodont-rubro');
	      let convenios = document.querySelectorAll('.convenio');
	      if (rubroFiltro === 'todos') {
	        convenios.forEach(function (convenio) {
	          convenio.classList.remove('d-none');
	        });
	      } else {
	        convenios.forEach(function (convenio) {
	          convenio.classList.add('d-none');
	        });
	        let conveniosRubro = document.querySelectorAll('.' + rubroFiltro);
	        conveniosRubro.forEach(function (convenio) {
	          convenio.classList.remove('d-none');
	        });
	      }
	    });
	  });
	}

	/* --------------------------
	Urgencias Odontologicas
	-------------------------- */
	const today = DateTime.now();
	async function getData(url) {
	  try {
	    const data = await fetch(url);
	    const result = await data.json();
	    return result;
	  } catch (error) {
	    console.log(error);
	  }
	}
	async function filterData() {
	  const profesionales = document.getElementById('profesionales');
	  profesionales.innerHTML = '';
	  const data = await getData('https://indexweb.com.ar/matriculas/urgencias.ashx?Todos=Todos');
	  const formattedData = data.map(element => {
	    const objDia = DateTime.fromFormat(element.Dia.substr(0, 10), 'dd/LL/yyyy').toFormat('dd/LL/yyyy');
	    return {
	      ...element,
	      Dia: objDia
	    };
	  });

	  /* ---- SEGMENTO PREPARADO PARA FUTURA FUNCIONALIDAD ----- */
	  /* ---- Potencial agregado de filtro por ciudad      ----- */
	  /* ---- Reorganiza el JSON con un objeto por Ciudad  ----- */
	  /* ---- y los profesionales de cada ciudad dentro de el --
	   const arrCiudades = formattedData.reduce( (acc, objeto) => {
	      var ciudadExistente = acc.find((ciudad) => {
	          return ciudad.nombre === objeto.Ciudad;
	      });
	       if (ciudadExistente) {
	          ciudadExistente.profesionales.push({
	              Dia: objeto.Dia,
	              MP: objeto.MP,
	              Nombre: objeto.Nombre,
	              Celular: objeto.Celular,
	              Descripcion: objeto.Descripcion,
	              Seccional: objeto.Seccional,
	              IdSeccional: objeto.IdSeccional
	          });
	      } else {
	          acc.push({
	              nombre: objeto.Ciudad,
	              profesionales: [{
	                  Dia: objeto.Dia,
	                  MP: objeto.MP,
	                  Nombre: objeto.Nombre,
	                  Celular: objeto.Celular,
	                  Descripcion: objeto.Descripcion,
	                  Seccional: objeto.Seccional,
	                  IdSeccional: objeto.IdSeccional
	              }],
	          });
	      }
	       return acc;
	  }, []);
	  ----------------------------------------------------------- */

	  const hoy = today.toFormat('dd/LL/yyyy');
	  const urgenciasHoy = formattedData.filter(element => {
	    return element.Dia === hoy;
	  });
	  if (urgenciasHoy.length > 0) {
	    urgenciasHoy.forEach(element => {
	      const profesional = document.createElement('div');
	      const profesionalHeader = document.createElement('div');
	      const profesionalBody = document.createElement('div');
	      profesional.classList.add('card', 'mb-4', 'text-bg-light');
	      profesionalHeader.classList.add('card-header');
	      profesionalBody.classList.add('card-body');
	      profesionalHeader.textContent = element.Ciudad;
	      profesionalBody.innerHTML = `
            <h4 class="card-title"><strong>${element.Nombre}</strong></h5>
            <h5 class="card-subtitle mb-4">Matrícula Profesional ${element.MP}</h6>
            <p class="card-text mb-0"><strong>Teléfono:</strong> ${element.Celular}</p>
            <p class="card-text"><strong>Detalles: </strong>${element.Descripcion}</p>`;
	      profesional.append(profesionalHeader, profesionalBody);
	      profesionales.append(profesional);
	    });
	  } else {
	    profesionales.innerHTML = `<h2>No se han encontrado profesionales</h2>
        <p>Ningún profesional en nuestros registros se encuentra atendiendo urgencias el día de hoy</p>`;
	  }
	}
	filterData();

	exports.Alert = alert;
	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = Modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

}));
//# sourceMappingURL=child-theme.js.map
