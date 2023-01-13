"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const antDesignVue = require("ant-design-vue");
const iconsVue = require("@ant-design/icons-vue");
const utils = require("@shy-plugins/utils");
function getIcon(iconType) {
  if (iconType === "warning") {
    return vue.createVNode(iconsVue.InfoCircleFilled, {
      "class": "modal-icon-warning"
    }, null);
  } else if (iconType === "success") {
    return vue.createVNode(iconsVue.CheckCircleFilled, {
      "class": "modal-icon-success"
    }, null);
  } else if (iconType === "info") {
    return vue.createVNode(iconsVue.InfoCircleFilled, {
      "class": "modal-icon-info"
    }, null);
  } else {
    return vue.createVNode(iconsVue.CloseCircleFilled, {
      "class": "modal-icon-error"
    }, null);
  }
}
function renderContent({
  content
}) {
  if (utils.isString(content)) {
    return vue.createVNode("div", {
      "innerHTML": `<div>${content}</div>`
    }, null);
  } else {
    return content;
  }
}
function createConfirm(options) {
  const iconType = options.iconType || "warning";
  Reflect.deleteProperty(options, "iconType");
  const opt = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options)
  };
  return antDesignVue.Modal.confirm(opt);
}
const getBaseOptions = () => {
  return {
    okText: "\u786E\u5B9A",
    centered: true
  };
};
function createModalOptions(options, icon) {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon)
  };
}
function createSuccessModal(options) {
  return antDesignVue.Modal.success(createModalOptions(options, "success"));
}
function createErrorModal(options) {
  return antDesignVue.Modal.error(createModalOptions(options, "close"));
}
function createInfoModal(options) {
  return antDesignVue.Modal.info(createModalOptions(options, "info"));
}
function createWarningModal(options) {
  return antDesignVue.Modal.warning(createModalOptions(options, "warning"));
}
antDesignVue.notification.config({
  placement: "topRight",
  duration: 3
});
function useMessage() {
  return {
    createMessage: antDesignVue.message,
    notification: antDesignVue.notification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal
  };
}
function pagination(list, pageNo, pageSize) {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret = offset + Number(pageSize) >= list.length ? list.slice(offset, list.length) : list.slice(offset, offset + Number(pageSize));
  return ret;
}
function usePagination(list, pageSize) {
  const currentPage = vue.ref(1);
  const pageSizeRef = vue.ref(pageSize);
  const getPaginationList = vue.computed(() => {
    return pagination(vue.unref(list), vue.unref(currentPage), vue.unref(pageSizeRef));
  });
  const getTotal = vue.computed(() => {
    return vue.unref(list).length;
  });
  function setCurrentPage(page) {
    currentPage.value = page;
  }
  function setPageSize(pageSize2) {
    pageSizeRef.value = pageSize2;
  }
  return { setCurrentPage, getTotal, setPageSize, getPaginationList };
}
function useCopyToClipboard(initial) {
  const clipboardRef = vue.ref(initial || "");
  const isSuccessRef = vue.ref(false);
  const copiedRef = vue.ref(false);
  vue.watch(
    clipboardRef,
    (str) => {
      if (utils.isDef(str)) {
        copiedRef.value = true;
        isSuccessRef.value = copyTextToClipboard(str);
      }
    },
    { immediate: !!initial, flush: "sync" }
  );
  return { clipboardRef, isSuccessRef, copiedRef };
}
function copyTextToClipboard(input, { target = document.body } = {}) {
  const element = document.createElement("textarea");
  const previouslyFocusedElement = document.activeElement;
  element.value = input;
  element.setAttribute("readonly", "");
  element.style.contain = "strict";
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.fontSize = "12pt";
  const selection = document.getSelection();
  let originalRange;
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }
  target.append(element);
  element.select();
  element.selectionStart = 0;
  element.selectionEnd = input.length;
  let isSuccess = false;
  try {
    isSuccess = document.execCommand("copy");
  } catch (e) {
    throw new Error(e);
  }
  element.remove();
  if (originalRange && selection) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
  return isSuccess;
}
var _a;
const isClient = typeof window !== "undefined";
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(r) {
  return typeof r === "function" ? r() : vue.unref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  const filter = (invoke) => {
    const duration = resolveUnref(ms);
    const maxDuration = resolveUnref(options.maxWait);
    if (timer)
      clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }
      return invoke();
    }
    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer)
          clearTimeout(timer);
        maxTimer = null;
        invoke();
      }, maxDuration);
    }
    timer = setTimeout(() => {
      if (maxTimer)
        clearTimeout(maxTimer);
      maxTimer = null;
      invoke();
    }, duration);
  };
  return filter;
}
function throttleFilter(ms, trailing = true, leading = true) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
  };
  const filter = (invoke) => {
    const duration = resolveUnref(ms);
    const elapsed = Date.now() - lastExec;
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      timer = setTimeout(() => {
        lastExec = Date.now();
        isLeading = true;
        clear();
        invoke();
      }, duration - elapsed);
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
  };
  return filter;
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading), fn);
}
function tryOnMounted(fn, sync = true) {
  if (vue.getCurrentInstance())
    vue.onMounted(fn);
  else if (sync)
    fn();
  else
    vue.nextTick(fn);
}
function tryOnUnmounted(fn) {
  if (vue.getCurrentInstance())
    vue.onUnmounted(fn);
}
function useTimeoutFn(handle, wait, native = false) {
  if (!utils.isFunction(handle)) {
    throw new Error("handle is not Function!");
  }
  const { readyRef, stop, start } = useTimeoutRef(wait);
  if (native) {
    handle();
  } else {
    vue.watch(
      readyRef,
      (maturity) => {
        maturity && handle();
      },
      { immediate: false }
    );
  }
  return { readyRef, stop, start };
}
function useTimeoutRef(wait) {
  const readyRef = vue.ref(false);
  let timer;
  function stop() {
    readyRef.value = false;
    timer && window.clearTimeout(timer);
  }
  function start() {
    stop();
    timer = setTimeout(() => {
      readyRef.value = true;
    }, wait);
  }
  start();
  tryOnUnmounted(stop);
  return { readyRef, stop, start };
}
function useIntersectionObserver({
  target,
  root: root2,
  onIntersect,
  rootMargin = "0px",
  threshold = 0.1
}) {
  let cleanup = () => {
  };
  const observer = vue.ref(null);
  const stopEffect = vue.watchEffect(() => {
    cleanup();
    observer.value = new IntersectionObserver(onIntersect, {
      root: root2 ? root2.value : null,
      rootMargin,
      threshold
    });
    const current = target.value;
    current && observer.value.observe(current);
    cleanup = () => {
      if (observer.value) {
        observer.value.disconnect();
        target.value && observer.value.unobserve(target.value);
      }
    };
  });
  return {
    observer,
    stop: () => {
      cleanup();
      stopEffect();
    }
  };
}
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b;
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};
const move = (el, amount) => {
  el.scrollTop = amount;
};
const position = (el) => {
  return el.scrollTop;
};
function useScrollTo({
  el,
  to,
  duration = 500,
  callback
}) {
  const isActiveRef = vue.ref(false);
  const start = position(el);
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  duration = utils.isUnDef(duration) ? 500 : duration;
  const animateScroll = function() {
    if (!vue.unref(isActiveRef)) {
      return;
    }
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    move(el, val);
    if (currentTime < duration && vue.unref(isActiveRef)) {
      requestAnimationFrame(animateScroll);
    } else {
      if (callback && utils.isFunction(callback)) {
        callback();
      }
    }
  };
  const run = () => {
    isActiveRef.value = true;
    animateScroll();
  };
  const stop = () => {
    isActiveRef.value = false;
  };
  return { start: run, stop };
}
function useWindowSizeFn(fn, wait = 150, options) {
  let handler = () => {
    fn();
  };
  const handleSize = useDebounceFn(handler, wait);
  handler = handleSize;
  const start = () => {
    if (options && options.immediate) {
      handler();
    }
    window.addEventListener("resize", handler);
  };
  const stop = () => {
    window.removeEventListener("resize", handler);
  };
  tryOnMounted(() => {
    start();
  });
  tryOnUnmounted(() => {
    stop();
  });
  return [start, stop];
}
function onMountedOrActivated(hook) {
  let mounted;
  vue.onMounted(() => {
    hook();
    vue.nextTick(() => {
      mounted = true;
    });
  });
  vue.onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}
function createContext(context, key = Symbol(), options = {}) {
  const { readonly = true, createProvider = false, native = false } = options;
  const state = vue.reactive(context);
  const provideData = readonly ? vue.readonly(state) : state;
  !createProvider && vue.provide(key, native ? context : provideData);
  return {
    state
  };
}
function useContext(key = Symbol(), defaultValue) {
  return vue.inject(key, defaultValue || {});
}
const headerHeightRef = vue.ref(0);
const footerHeightRef = vue.ref(0);
function useLayoutHeight() {
  function setHeaderHeight(val) {
    headerHeightRef.value = val;
  }
  function setFooterHeight(val) {
    footerHeightRef.value = val;
  }
  return { headerHeightRef, footerHeightRef, setHeaderHeight, setFooterHeight };
}
function useContentHeight(flag, anchorRef, subtractHeightRefs, substractSpaceRefs, upwardSpace = 0, offsetHeightRef = vue.ref(0)) {
  const contentHeight = vue.ref(null);
  const { footerHeightRef: layoutFooterHeightRef } = useLayoutHeight();
  let compensationHeight = {
    useLayoutFooter: true
  };
  const setCompensation = (params) => {
    compensationHeight = params;
  };
  function redoHeight() {
    vue.nextTick(() => {
      calcContentHeight();
    });
  }
  function calcSubtractSpace(element, direction = "all") {
    var _a2, _b, _c, _d;
    function numberPx(px) {
      return Number(px.replace(/[^\d]/g, ""));
    }
    let subtractHeight = 0;
    const ZERO_PX = "0px";
    if (element) {
      const cssStyle = getComputedStyle(element);
      const marginTop = numberPx((_a2 = cssStyle == null ? void 0 : cssStyle.marginTop) != null ? _a2 : ZERO_PX);
      const marginBottom = numberPx((_b = cssStyle == null ? void 0 : cssStyle.marginBottom) != null ? _b : ZERO_PX);
      const paddingTop = numberPx((_c = cssStyle == null ? void 0 : cssStyle.paddingTop) != null ? _c : ZERO_PX);
      const paddingBottom = numberPx((_d = cssStyle == null ? void 0 : cssStyle.paddingBottom) != null ? _d : ZERO_PX);
      if (direction === "all") {
        subtractHeight += marginTop;
        subtractHeight += marginBottom;
        subtractHeight += paddingTop;
        subtractHeight += paddingBottom;
      } else if (direction === "top") {
        subtractHeight += marginTop;
        subtractHeight += paddingTop;
      } else {
        subtractHeight += marginBottom;
        subtractHeight += paddingBottom;
      }
    }
    return subtractHeight;
  }
  function getEl(element) {
    if (element == null) {
      return null;
    }
    return element instanceof HTMLDivElement ? element : element.$el;
  }
  async function calcContentHeight() {
    var _a2;
    if (!flag.value) {
      return;
    }
    await vue.nextTick();
    const anchorEl = getEl(vue.unref(anchorRef));
    if (!anchorEl) {
      return;
    }
    const { bottomIncludeBody } = utils.getViewportOffset(anchorEl);
    let substractHeight = 0;
    subtractHeightRefs.forEach((item) => {
      var _a3, _b;
      substractHeight += (_b = (_a3 = getEl(vue.unref(item))) == null ? void 0 : _a3.offsetHeight) != null ? _b : 0;
    });
    let substractSpaceHeight = (_a2 = calcSubtractSpace(anchorEl)) != null ? _a2 : 0;
    substractSpaceRefs.forEach((item) => {
      substractSpaceHeight += calcSubtractSpace(getEl(vue.unref(item)));
    });
    let upwardSpaceHeight = 0;
    function upward(element, upwardLvlOrClass) {
      if (element && upwardLvlOrClass) {
        const parent = element.parentElement;
        if (parent) {
          if (utils.isString(upwardLvlOrClass)) {
            if (!parent.classList.contains(upwardLvlOrClass)) {
              upwardSpaceHeight += calcSubtractSpace(parent, "bottom");
              upward(parent, upwardLvlOrClass);
            } else {
              upwardSpaceHeight += calcSubtractSpace(parent, "bottom");
            }
          } else if (utils.isNumber(upwardLvlOrClass)) {
            if (upwardLvlOrClass > 0) {
              upwardSpaceHeight += calcSubtractSpace(parent, "bottom");
              upward(parent, --upwardLvlOrClass);
            }
          }
        }
      }
    }
    if (vue.isRef(upwardSpace)) {
      upward(anchorEl, vue.unref(upwardSpace));
    } else {
      upward(anchorEl, upwardSpace);
    }
    let height = bottomIncludeBody - vue.unref(layoutFooterHeightRef) - vue.unref(offsetHeightRef) - substractHeight - substractSpaceHeight - upwardSpaceHeight;
    const calcCompensationHeight = () => {
      var _a3;
      (_a3 = compensationHeight.elements) == null ? void 0 : _a3.forEach((item) => {
        var _a4, _b;
        height += (_b = (_a4 = getEl(vue.unref(item))) == null ? void 0 : _a4.offsetHeight) != null ? _b : 0;
      });
    };
    if (compensationHeight.useLayoutFooter && vue.unref(layoutFooterHeightRef) > 0) {
      calcCompensationHeight();
    } else {
      calcCompensationHeight();
    }
    contentHeight.value = height;
  }
  onMountedOrActivated(() => {
    vue.nextTick(() => {
      calcContentHeight();
    });
  });
  useWindowSizeFn(
    () => {
      calcContentHeight();
    },
    50,
    { immediate: true }
  );
  vue.watch(
    () => [layoutFooterHeightRef.value],
    () => {
      calcContentHeight();
    },
    {
      flush: "post",
      immediate: true
    }
  );
  return { redoHeight, setCompensation, contentHeight };
}
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
function entries(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}
function useAttrs(params = {}) {
  const instance = vue.getCurrentInstance();
  if (!instance)
    return {};
  const {
    excludeListeners = false,
    excludeKeys = [],
    excludeDefaultKeys = true
  } = params;
  const attrs = vue.shallowRef({});
  const allExcludeKeys = excludeKeys.concat(
    excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : []
  );
  instance.attrs = vue.reactive(instance.attrs);
  vue.watchEffect(() => {
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
      if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))) {
        acm[key] = val;
      }
      return acm;
    }, {});
    attrs.value = res;
  });
  return attrs;
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$b = Object.prototype;
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
var nativeObjectToString$1 = objectProto$b.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$a = Object.prototype;
var nativeObjectToString = objectProto$a.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
const isArray$1 = isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$9 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer = moduleExports$1 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$2.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries2) {
  var index = -1, length = entries2 == null ? 0 : entries2.length;
  this.clear();
  while (++index < length) {
    var entry = entries2[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries2) {
  var index = -1, length = entries2 == null ? 0 : entries2.length;
  this.clear();
  while (++index < length) {
    var entry = entries2[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries2) {
  var index = -1, length = entries2 == null ? 0 : entries2.length;
  this.clear();
  while (++index < length) {
    var entry = entries2[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries2) {
  var data = this.__data__ = new ListCache(entries2);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$2 = Object.prototype;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set = getNative(root$1, "Set");
const Set$1 = Set;
var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag$1 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1 || Map$2 && getTag(new Map$2()) != mapTag$1 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$1;
        case mapCtorString:
          return mapTag$1;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$1;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
function isEqual(value, other) {
  return baseIsEqual(value, other);
}
function useRuleFormItem(props, key = "value", changeEvent = "change", emitData) {
  const instance = vue.getCurrentInstance();
  const emit = instance == null ? void 0 : instance.emit;
  const innerState = vue.reactive({
    value: props[key]
  });
  const defaultState = vue.readonly(innerState);
  const setState = (val) => {
    innerState.value = val;
  };
  vue.watchEffect(() => {
    innerState.value = props[key];
  });
  const state = vue.computed({
    get() {
      return innerState.value;
    },
    set(value) {
      if (isEqual(value, defaultState.value))
        return;
      innerState.value = value;
      emit == null ? void 0 : emit(changeEvent, value, ...vue.toRaw(vue.unref(emitData)) || []);
      vue.nextTick(() => {
        emit == null ? void 0 : emit(changeEvent, value, ...vue.toRaw(vue.unref(emitData)) || []);
      });
    }
  });
  return [state, setState, defaultState];
}
function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80
}) {
  let remove = () => {
  };
  const isAddRef = vue.ref(false);
  if (el) {
    const element = vue.ref(el);
    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait);
    const realHandler = wait ? handler : listener;
    const removeEventListener = (e) => {
      isAddRef.value = true;
      e.removeEventListener(name, realHandler, options);
    };
    const addEventListener = (e) => e.addEventListener(name, realHandler, options);
    const removeWatch = vue.watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          !vue.unref(isAddRef) && addEventListener(v);
          cleanUp(() => {
            autoRemove && removeEventListener(v);
          });
        }
      },
      { immediate: true }
    );
    remove = () => {
      removeEventListener(element.value);
      removeWatch();
    };
  }
  return { removeEvent: remove };
}
var sizeEnum = /* @__PURE__ */ ((sizeEnum2) => {
  sizeEnum2["XS"] = "XS";
  sizeEnum2["SM"] = "SM";
  sizeEnum2["MD"] = "MD";
  sizeEnum2["LG"] = "LG";
  sizeEnum2["XL"] = "XL";
  sizeEnum2["XXL"] = "XXL";
  return sizeEnum2;
})(sizeEnum || {});
var screenEnum = /* @__PURE__ */ ((screenEnum2) => {
  screenEnum2[screenEnum2["XS"] = 480] = "XS";
  screenEnum2[screenEnum2["SM"] = 576] = "SM";
  screenEnum2[screenEnum2["MD"] = 768] = "MD";
  screenEnum2[screenEnum2["LG"] = 992] = "LG";
  screenEnum2[screenEnum2["XL"] = 1200] = "XL";
  screenEnum2[screenEnum2["XXL"] = 1600] = "XXL";
  return screenEnum2;
})(screenEnum || {});
const screenMap = /* @__PURE__ */ new Map();
screenMap.set("XS", 480);
screenMap.set("SM", 576);
screenMap.set("MD", 768);
screenMap.set("LG", 992);
screenMap.set("XL", 1200);
screenMap.set("XXL", 1600);
let globalScreenRef;
let globalWidthRef;
let globalRealWidthRef;
function useBreakpoint() {
  return {
    screenRef: vue.computed(() => vue.unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef
  };
}
function createBreakpointListen(fn) {
  const screenRef = vue.ref("XL");
  const realWidthRef = vue.ref(window.innerWidth);
  function getWindowWidth() {
    const width = document.body.clientWidth;
    const xs = screenMap.get("XS");
    const sm = screenMap.get("SM");
    const md = screenMap.get("MD");
    const lg = screenMap.get("LG");
    const xl = screenMap.get("XL");
    if (width < xs) {
      screenRef.value = "XS";
    } else if (width < sm) {
      screenRef.value = "SM";
    } else if (width < md) {
      screenRef.value = "MD";
    } else if (width < lg) {
      screenRef.value = "LG";
    } else if (width < xl) {
      screenRef.value = "XL";
    } else {
      screenRef.value = "XXL";
    }
    realWidthRef.value = width;
  }
  useEventListener({
    el: window,
    name: "resize",
    listener: () => {
      getWindowWidth();
      resizeFn();
    }
  });
  getWindowWidth();
  globalScreenRef = vue.computed(() => vue.unref(screenRef));
  globalWidthRef = vue.computed(() => screenMap.get(vue.unref(screenRef)));
  globalRealWidthRef = vue.computed(() => vue.unref(realWidthRef));
  function resizeFn() {
    fn == null ? void 0 : fn({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum
    });
  }
  resizeFn();
  return {
    screenRef: globalScreenRef,
    screenEnum,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef
  };
}
function useDesign(scope) {
  const values = {
    prefixCls: "shy"
  };
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls
  };
}
const zh = {
  lang: {
    shortWeekDays: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"],
    shortMonths: [
      "1\u6708",
      "2\u6708",
      "3\u6708",
      "4\u6708",
      "5\u6708",
      "6\u6708",
      "7\u6708",
      "8\u6708",
      "9\u6708",
      "10\u6708",
      "11\u6708",
      "12\u6708"
    ]
  },
  common: {
    okText: "\u786E\u8BA4",
    closeText: "\u5173\u95ED",
    cancelText: "\u53D6\u6D88",
    loadingText: "\u52A0\u8F7D\u4E2D...",
    saveText: "\u4FDD\u5B58",
    delText: "\u5220\u9664",
    resetText: "\u91CD\u7F6E",
    searchText: "\u641C\u7D22",
    queryText: "\u67E5\u8BE2",
    inputText: "\u8BF7\u8F93\u5165",
    chooseText: "\u8BF7\u9009\u62E9",
    redo: "\u5237\u65B0",
    back: "\u8FD4\u56DE",
    light: "\u4EAE\u8272\u4E3B\u9898",
    dark: "\u9ED1\u6697\u4E3B\u9898"
  },
  component: {
    app: {
      searchNotData: "\u6682\u65E0\u641C\u7D22\u7ED3\u679C",
      toSearch: "\u786E\u8BA4",
      toNavigate: "\u5207\u6362"
    },
    countdown: {
      normalText: "\u83B7\u53D6\u9A8C\u8BC1\u7801",
      sendText: "{0}\u79D2\u540E\u91CD\u65B0\u83B7\u53D6"
    },
    cropper: {
      selectImage: "\u9009\u62E9\u56FE\u7247",
      uploadSuccess: "\u4E0A\u4F20\u6210\u529F",
      modalTitle: "\u5934\u50CF\u4E0A\u4F20",
      okText: "\u786E\u8BA4\u5E76\u4E0A\u4F20",
      btn_reset: "\u91CD\u7F6E",
      btn_rotate_left: "\u9006\u65F6\u9488\u65CB\u8F6C",
      btn_rotate_right: "\u987A\u65F6\u9488\u65CB\u8F6C",
      btn_scale_x: "\u6C34\u5E73\u7FFB\u8F6C",
      btn_scale_y: "\u5782\u76F4\u7FFB\u8F6C",
      btn_zoom_in: "\u653E\u5927",
      btn_zoom_out: "\u7F29\u5C0F",
      preview: "\u9884\u89C8"
    },
    drawer: {
      loadingText: "\u52A0\u8F7D\u4E2D...",
      cancelText: "\u5173\u95ED",
      okText: "\u786E\u8BA4"
    },
    excel: {
      exportModalTitle: "\u5BFC\u51FA\u6570\u636E",
      fileType: "\u6587\u4EF6\u7C7B\u578B",
      fileName: "\u6587\u4EF6\u540D"
    },
    form: {
      putAway: "\u6536\u8D77",
      unfold: "\u5C55\u5F00",
      maxTip: "\u5B57\u7B26\u6570\u5E94\u5C0F\u4E8E{0}\u4F4D",
      apiSelectNotFound: "\u8BF7\u7B49\u5F85\u6570\u636E\u52A0\u8F7D\u5B8C\u6210..."
    },
    icon: {
      placeholder: "\u70B9\u51FB\u9009\u62E9\u56FE\u6807",
      search: "\u641C\u7D22\u56FE\u6807",
      copy: "\u590D\u5236\u56FE\u6807\u6210\u529F!"
    },
    menu: {
      search: "\u83DC\u5355\u641C\u7D22"
    },
    modal: {
      cancelText: "\u5173\u95ED",
      okText: "\u786E\u8BA4",
      close: "\u5173\u95ED",
      maximize: "\u6700\u5927\u5316",
      restore: "\u8FD8\u539F"
    },
    table: {
      settingDens: "\u5BC6\u5EA6",
      settingDensDefault: "\u9ED8\u8BA4",
      settingDensMiddle: "\u4E2D\u7B49",
      settingDensSmall: "\u7D27\u51D1",
      settingColumn: "\u5217\u8BBE\u7F6E",
      settingColumnShow: "\u5217\u5C55\u793A",
      settingIndexColumnShow: "\u5E8F\u53F7\u5217",
      settingSelectColumnShow: "\u52FE\u9009\u5217",
      settingFixedLeft: "\u56FA\u5B9A\u5230\u5DE6\u4FA7",
      settingFixedRight: "\u56FA\u5B9A\u5230\u53F3\u4FA7",
      settingFullScreen: "\u5168\u5C4F",
      index: "\u5E8F\u53F7",
      total: "\u5171 {total} \u6761\u6570\u636E"
    },
    time: {
      before: "\u524D",
      after: "\u540E",
      just: "\u521A\u521A",
      seconds: "\u79D2",
      minutes: "\u5206\u949F",
      hours: "\u5C0F\u65F6",
      days: "\u5929"
    },
    tree: {
      selectAll: "\u9009\u62E9\u5168\u90E8",
      unSelectAll: "\u53D6\u6D88\u9009\u62E9",
      expandAll: "\u5C55\u5F00\u5168\u90E8",
      unExpandAll: "\u6298\u53E0\u5168\u90E8",
      checkStrictly: "\u5C42\u7EA7\u5173\u8054",
      checkUnStrictly: "\u5C42\u7EA7\u72EC\u7ACB"
    },
    upload: {
      save: "\u4FDD\u5B58",
      upload: "\u4E0A\u4F20",
      imgUpload: "\u56FE\u7247\u4E0A\u4F20",
      uploaded: "\u5DF2\u4E0A\u4F20",
      operating: "\u64CD\u4F5C",
      del: "\u5220\u9664",
      download: "\u4E0B\u8F7D",
      saveWarn: "\u8BF7\u7B49\u5F85\u6587\u4EF6\u4E0A\u4F20\u540E\uFF0C\u4FDD\u5B58!",
      saveError: "\u6CA1\u6709\u4E0A\u4F20\u6210\u529F\u7684\u6587\u4EF6\uFF0C\u65E0\u6CD5\u4FDD\u5B58!",
      preview: "\u9884\u89C8",
      choose: "\u9009\u62E9\u6587\u4EF6",
      accept: "\u652F\u6301{0}\u683C\u5F0F",
      acceptUpload: "\u53EA\u80FD\u4E0A\u4F20{0}\u683C\u5F0F\u6587\u4EF6",
      maxSize: "\u5355\u4E2A\u6587\u4EF6\u4E0D\u8D85\u8FC7{0}MB",
      maxSizeMultiple: "\u53EA\u80FD\u4E0A\u4F20\u4E0D\u8D85\u8FC7{0}MB\u7684\u6587\u4EF6!",
      maxNumber: "\u6700\u591A\u53EA\u80FD\u4E0A\u4F20{0}\u4E2A\u6587\u4EF6",
      legend: "\u7565\u7F29\u56FE",
      fileName: "\u6587\u4EF6\u540D",
      fileSize: "\u6587\u4EF6\u5927\u5C0F",
      fileStatue: "\u72B6\u6001",
      startUpload: "\u5F00\u59CB\u4E0A\u4F20",
      uploadSuccess: "\u4E0A\u4F20\u6210\u529F",
      uploadError: "\u4E0A\u4F20\u5931\u8D25",
      uploading: "\u4E0A\u4F20\u4E2D",
      uploadWait: "\u8BF7\u7B49\u5F85\u6587\u4EF6\u4E0A\u4F20\u7ED3\u675F\u540E\u64CD\u4F5C",
      reUploadFailed: "\u91CD\u65B0\u4E0A\u4F20\u5931\u8D25\u6587\u4EF6"
    },
    verify: {
      error: "\u9A8C\u8BC1\u5931\u8D25\uFF01",
      time: "\u9A8C\u8BC1\u6821\u9A8C\u6210\u529F,\u8017\u65F6{time}\u79D2\uFF01",
      redoTip: "\u70B9\u51FB\u56FE\u7247\u53EF\u5237\u65B0",
      dragText: "\u8BF7\u6309\u4F4F\u6ED1\u5757\u62D6\u52A8",
      successText: "\u9A8C\u8BC1\u901A\u8FC7"
    }
  }
};
const useI18n = () => {
  const getValue2 = (keyList, obj, index = 0) => {
    const next = obj[keyList[index]];
    if (index === keyList.length - 1) {
      return next;
    } else {
      return getValue2(keyList, next, index + 1);
    }
  };
  const t = (key) => {
    const keyList = key.split(".");
    return getValue2(keyList, zh);
  };
  return { t };
};
exports.copyTextToClipboard = copyTextToClipboard;
exports.createBreakpointListen = createBreakpointListen;
exports.createContext = createContext;
exports.entries = entries;
exports.onMountedOrActivated = onMountedOrActivated;
exports.screenEnum = screenEnum;
exports.sizeEnum = sizeEnum;
exports.useAttrs = useAttrs;
exports.useBreakpoint = useBreakpoint;
exports.useContentHeight = useContentHeight;
exports.useContext = useContext;
exports.useCopyToClipboard = useCopyToClipboard;
exports.useDesign = useDesign;
exports.useEventListener = useEventListener;
exports.useI18n = useI18n;
exports.useIntersectionObserver = useIntersectionObserver;
exports.useMessage = useMessage;
exports.usePagination = usePagination;
exports.useRuleFormItem = useRuleFormItem;
exports.useScrollTo = useScrollTo;
exports.useTimeoutFn = useTimeoutFn;
exports.useTimeoutRef = useTimeoutRef;
exports.useWindowSizeFn = useWindowSizeFn;
