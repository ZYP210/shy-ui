import { watch, reactive, h, resolveComponent, defineComponent, inject, computed, createApp, ref, Teleport, createCommentVNode, provide, onMounted, onUnmounted, nextTick, getCurrentInstance, onBeforeUnmount, onActivated, onDeactivated, openBlock, createElementBlock, normalizeStyle, createVNode, unref, withCtx, Fragment, renderList, createBlock, watchEffect, createElementVNode, toDisplayString } from "vue";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var setupDefaults$a = {
  cookies: {
    path: "/"
  },
  treeOptions: {
    parentKey: "parentId",
    key: "id",
    children: "children"
  },
  parseDateFormat: "yyyy-MM-dd HH:mm:ss",
  firstDayOfWeek: 1,
  dateDiffRules: [
    ["yyyy", 31536e6],
    ["MM", 2592e6],
    ["dd", 864e5],
    ["HH", 36e5],
    ["mm", 6e4],
    ["ss", 1e3],
    ["S", 0]
  ]
};
var setupDefaults_1 = setupDefaults$a;
function arrayEach$e(list, iterate, context) {
  if (list) {
    if (list.forEach) {
      list.forEach(iterate, context);
    } else {
      for (var index = 0, len = list.length; index < len; index++) {
        iterate.call(context, list[index], index, list);
      }
    }
  }
}
var arrayEach_1 = arrayEach$e;
var objectToString$2 = Object.prototype.toString;
var staticObjectToString = objectToString$2;
var objectToString$1 = staticObjectToString;
function helperCreateInInObjectString$5(type) {
  return function(obj) {
    return "[object " + type + "]" === objectToString$1.call(obj);
  };
}
var helperCreateInInObjectString_1 = helperCreateInInObjectString$5;
var helperCreateInInObjectString$4 = helperCreateInInObjectString_1;
var isArray$r = Array.isArray || helperCreateInInObjectString$4("Array");
var isArray_1 = isArray$r;
function hasOwnProp$a(obj, key) {
  return obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false;
}
var hasOwnProp_1 = hasOwnProp$a;
var hasOwnProp$9 = hasOwnProp_1;
function objectEach$5(obj, iterate, context) {
  if (obj) {
    for (var key in obj) {
      if (hasOwnProp$9(obj, key)) {
        iterate.call(context, obj[key], key, obj);
      }
    }
  }
}
var objectEach_1 = objectEach$5;
var isArray$q = isArray_1;
var arrayEach$d = arrayEach_1;
var objectEach$4 = objectEach_1;
function each$j(obj, iterate, context) {
  if (obj) {
    return (isArray$q(obj) ? arrayEach$d : objectEach$4)(obj, iterate, context);
  }
  return obj;
}
var each_1 = each$j;
function helperCreateInTypeof$6(type) {
  return function(obj) {
    return typeof obj === type;
  };
}
var helperCreateInTypeof_1 = helperCreateInTypeof$6;
var helperCreateInTypeof$5 = helperCreateInTypeof_1;
var isFunction$c = helperCreateInTypeof$5("function");
var isFunction_1 = isFunction$c;
var each$i = each_1;
function helperCreateGetObjects$3(name, getIndex) {
  var proMethod = Object[name];
  return function(obj) {
    var result = [];
    if (obj) {
      if (proMethod) {
        return proMethod(obj);
      }
      each$i(obj, getIndex > 1 ? function(key) {
        result.push(["" + key, obj[key]]);
      } : function() {
        result.push(arguments[getIndex]);
      });
    }
    return result;
  };
}
var helperCreateGetObjects_1 = helperCreateGetObjects$3;
var helperCreateGetObjects$2 = helperCreateGetObjects_1;
var keys$a = helperCreateGetObjects$2("keys", 1);
var keys_1 = keys$a;
var objectToString = staticObjectToString;
var objectEach$3 = objectEach_1;
var arrayEach$c = arrayEach_1;
function getCativeCtor(val, args) {
  var Ctor = val.__proto__.constructor;
  return args ? new Ctor(args) : new Ctor();
}
function handleValueClone(item, isDeep) {
  return isDeep ? copyValue(item, isDeep) : item;
}
function copyValue(val, isDeep) {
  if (val) {
    switch (objectToString.call(val)) {
      case "[object Object]": {
        var restObj = Object.create(val.__proto__);
        objectEach$3(val, function(item, key) {
          restObj[key] = handleValueClone(item, isDeep);
        });
        return restObj;
      }
      case "[object Date]":
      case "[object RegExp]": {
        return getCativeCtor(val, val.valueOf());
      }
      case "[object Array]":
      case "[object Arguments]": {
        var restArr = [];
        arrayEach$c(val, function(item) {
          restArr.push(handleValueClone(item, isDeep));
        });
        return restArr;
      }
      case "[object Set]": {
        var restSet = getCativeCtor(val);
        restSet.forEach(function(item) {
          restSet.add(handleValueClone(item, isDeep));
        });
        return restSet;
      }
      case "[object Map]": {
        var restMap = getCativeCtor(val);
        restMap.forEach(function(item, key) {
          restMap.set(handleValueClone(item, isDeep));
        });
        return restMap;
      }
    }
  }
  return val;
}
function clone$3(obj, deep) {
  if (obj) {
    return copyValue(obj, deep);
  }
  return obj;
}
var clone_1 = clone$3;
var arrayEach$b = arrayEach_1;
var keys$9 = keys_1;
var isArray$p = isArray_1;
var clone$2 = clone_1;
var objectAssignFns = Object.assign;
function handleAssign(destination, args, isClone) {
  var len = args.length;
  for (var source, index = 1; index < len; index++) {
    source = args[index];
    arrayEach$b(keys$9(args[index]), isClone ? function(key) {
      destination[key] = clone$2(source[key], isClone);
    } : function(key) {
      destination[key] = source[key];
    });
  }
  return destination;
}
var assign$b = function(target) {
  if (target) {
    var args = arguments;
    if (target === true) {
      if (args.length > 1) {
        target = isArray$p(target[1]) ? [] : {};
        return handleAssign(target, args, true);
      }
    } else {
      return objectAssignFns ? objectAssignFns.apply(Object, args) : handleAssign(target, args);
    }
  }
  return target;
};
var assign_1 = assign$b;
var setupDefaults$9 = setupDefaults_1;
var arrayEach$a = arrayEach_1;
var each$h = each_1;
var isFunction$b = isFunction_1;
var assign$a = assign_1;
var XEUtils$2 = function() {
};
function mixin() {
  arrayEach$a(arguments, function(methods) {
    each$h(methods, function(fn, name) {
      XEUtils$2[name] = isFunction$b(fn) ? function() {
        var result = fn.apply(XEUtils$2.$context, arguments);
        XEUtils$2.$context = null;
        return result;
      } : fn;
    });
  });
}
function setup$1(options) {
  return assign$a(setupDefaults$9, options);
}
XEUtils$2.VERSION = "3.5.7";
XEUtils$2.mixin = mixin;
XEUtils$2.setup = setup$1;
var ctor = XEUtils$2;
function lastArrayEach$3(obj, iterate, context) {
  for (var len = obj.length - 1; len >= 0; len--) {
    iterate.call(context, obj[len], len, obj);
  }
}
var lastArrayEach_1 = lastArrayEach$3;
var lastArrayEach$2 = lastArrayEach_1;
var keys$8 = keys_1;
function lastObjectEach$2(obj, iterate, context) {
  lastArrayEach$2(keys$8(obj), function(key) {
    iterate.call(context, obj[key], key, obj);
  });
}
var lastObjectEach_1 = lastObjectEach$2;
function isNull$9(obj) {
  return obj === null;
}
var isNull_1 = isNull$9;
var isNull$8 = isNull_1;
function property$5(name, defs) {
  return function(obj) {
    return isNull$8(obj) ? defs : obj[name];
  };
}
var property_1 = property$5;
var each$g = each_1;
var isFunction$a = isFunction_1;
var property$4 = property_1;
function objectMap$1(obj, iterate, context) {
  var result = {};
  if (obj) {
    if (iterate) {
      if (!isFunction$a(iterate)) {
        iterate = property$4(iterate);
      }
      each$g(obj, function(val, index) {
        result[index] = iterate.call(context, val, index, obj);
      });
    } else {
      return obj;
    }
  }
  return result;
}
var objectMap_1 = objectMap$1;
function isPlainObject$6(obj) {
  return obj ? obj.constructor === Object : false;
}
var isPlainObject_1 = isPlainObject$6;
var isArray$o = isArray_1;
var isPlainObject$5 = isPlainObject_1;
var each$f = each_1;
function handleMerge(target, source) {
  if (isPlainObject$5(target) && isPlainObject$5(source) || isArray$o(target) && isArray$o(source)) {
    each$f(source, function(obj, key) {
      target[key] = handleMerge(target[key], obj);
    });
    return target;
  }
  return source;
}
var merge$1 = function(target) {
  if (!target) {
    target = {};
  }
  var args = arguments;
  var len = args.length;
  for (var source, index = 1; index < len; index++) {
    source = args[index];
    if (source) {
      handleMerge(target, source);
    }
  }
  return target;
};
var merge_1 = merge$1;
var each$e = each_1;
function map$6(obj, iterate, context) {
  var result = [];
  if (obj && arguments.length > 1) {
    if (obj.map) {
      return obj.map(iterate, context);
    } else {
      each$e(obj, function() {
        result.push(iterate.apply(context, arguments));
      });
    }
  }
  return result;
}
var map_1 = map$6;
var hasOwnProp$8 = hasOwnProp_1;
var isArray$n = isArray_1;
function helperCreateIterateHandle$4(prop, useArray, restIndex, matchValue, defaultValue) {
  return function(obj, iterate, context) {
    if (obj && iterate) {
      if (prop && obj[prop]) {
        return obj[prop](iterate, context);
      } else {
        if (useArray && isArray$n(obj)) {
          for (var index = 0, len = obj.length; index < len; index++) {
            if (!!iterate.call(context, obj[index], index, obj) === matchValue) {
              return [true, false, index, obj[index]][restIndex];
            }
          }
        } else {
          for (var key in obj) {
            if (hasOwnProp$8(obj, key)) {
              if (!!iterate.call(context, obj[key], key, obj) === matchValue) {
                return [true, false, key, obj[key]][restIndex];
              }
            }
          }
        }
      }
    }
    return defaultValue;
  };
}
var helperCreateIterateHandle_1 = helperCreateIterateHandle$4;
var helperCreateIterateHandle$3 = helperCreateIterateHandle_1;
var some$2 = helperCreateIterateHandle$3("some", 1, 0, true, false);
var some_1 = some$2;
var helperCreateIterateHandle$2 = helperCreateIterateHandle_1;
var every$2 = helperCreateIterateHandle$2("every", 1, 1, false, true);
var every_1 = every$2;
var hasOwnProp$7 = hasOwnProp_1;
function includes$5(obj, val) {
  if (obj) {
    if (obj.includes) {
      return obj.includes(val);
    }
    for (var key in obj) {
      if (hasOwnProp$7(obj, key)) {
        if (val === obj[key]) {
          return true;
        }
      }
    }
  }
  return false;
}
var includes_1 = includes$5;
var isArray$m = isArray_1;
var includes$4 = includes_1;
function includeArrays$2(array1, array2) {
  var len;
  var index = 0;
  if (isArray$m(array1) && isArray$m(array2)) {
    for (len = array2.length; index < len; index++) {
      if (!includes$4(array1, array2[index])) {
        return false;
      }
    }
    return true;
  }
  return includes$4(array1, array2);
}
var includeArrays_1 = includeArrays$2;
var each$d = each_1;
var includes$3 = includes_1;
function uniq$2(array) {
  var result = [];
  each$d(array, function(value) {
    if (!includes$3(result, value)) {
      result.push(value);
    }
  });
  return result;
}
var uniq_1 = uniq$2;
var map$5 = map_1;
function toArray$3(list) {
  return map$5(list, function(item) {
    return item;
  });
}
var toArray_1 = toArray$3;
var uniq$1 = uniq_1;
var toArray$2 = toArray_1;
function union$1() {
  var args = arguments;
  var result = [];
  var index = 0;
  var len = args.length;
  for (; index < len; index++) {
    result = result.concat(toArray$2(args[index]));
  }
  return uniq$1(result);
}
var union_1 = union$1;
var staticStrUndefined$b = "undefined";
var staticStrUndefined_1 = staticStrUndefined$b;
var staticStrUndefined$a = staticStrUndefined_1;
var helperCreateInTypeof$4 = helperCreateInTypeof_1;
var isUndefined$a = helperCreateInTypeof$4(staticStrUndefined$a);
var isUndefined_1 = isUndefined$a;
var isNull$7 = isNull_1;
var isUndefined$9 = isUndefined_1;
function eqNull$7(obj) {
  return isNull$7(obj) || isUndefined$9(obj);
}
var eqNull_1 = eqNull$7;
var staticHGKeyRE$2 = /(.+)?\[(\d+)\]$/;
var staticHGKeyRE_1 = staticHGKeyRE$2;
function helperGetHGSKeys$3(property2) {
  return property2 ? property2.splice && property2.join ? property2 : ("" + property2).replace(/(\[\d+\])\.?/g, "$1.").replace(/\.$/, "").split(".") : [];
}
var helperGetHGSKeys_1 = helperGetHGSKeys$3;
var staticHGKeyRE$1 = staticHGKeyRE_1;
var helperGetHGSKeys$2 = helperGetHGSKeys_1;
var hasOwnProp$6 = hasOwnProp_1;
var isUndefined$8 = isUndefined_1;
var eqNull$6 = eqNull_1;
function get$5(obj, property2, defaultValue) {
  if (eqNull$6(obj)) {
    return defaultValue;
  }
  var result = getValueByPath(obj, property2);
  return isUndefined$8(result) ? defaultValue : result;
}
function getDeepProps(obj, key) {
  var matchs = key ? key.match(staticHGKeyRE$1) : "";
  return matchs ? matchs[1] ? obj[matchs[1]] ? obj[matchs[1]][matchs[2]] : void 0 : obj[matchs[2]] : obj[key];
}
function getValueByPath(obj, property2) {
  if (obj) {
    var rest, props, len;
    var index = 0;
    if (obj[property2] || hasOwnProp$6(obj, property2)) {
      return obj[property2];
    } else {
      props = helperGetHGSKeys$2(property2);
      len = props.length;
      if (len) {
        for (rest = obj; index < len; index++) {
          rest = getDeepProps(rest, props[index]);
          if (eqNull$6(rest)) {
            if (index === len - 1) {
              return rest;
            }
            return;
          }
        }
      }
      return rest;
    }
  }
}
var get_1 = get$5;
var arrayEach$9 = arrayEach_1;
var toArray$1 = toArray_1;
var map$4 = map_1;
var isArray$l = isArray_1;
var isFunction$9 = isFunction_1;
var isPlainObject$4 = isPlainObject_1;
var isUndefined$7 = isUndefined_1;
var isNull$6 = isNull_1;
var eqNull$5 = eqNull_1;
var get$4 = get_1;
var property$3 = property_1;
var ORDER_PROP_ASC = "asc";
var ORDER_PROP_DESC = "desc";
function handleSort(v1, v2) {
  if (isUndefined$7(v1)) {
    return 1;
  }
  if (isNull$6(v1)) {
    return isUndefined$7(v2) ? -1 : 1;
  }
  return v1 && v1.localeCompare ? v1.localeCompare(v2) : v1 > v2 ? 1 : -1;
}
function buildMultiOrders(name, confs, compares) {
  return function(item1, item2) {
    var v1 = item1[name];
    var v2 = item2[name];
    if (v1 === v2) {
      return compares ? compares(item1, item2) : 0;
    }
    return confs.order === ORDER_PROP_DESC ? handleSort(v2, v1) : handleSort(v1, v2);
  };
}
function getSortConfs(arr, list, fieldConfs, context) {
  var sortConfs = [];
  fieldConfs = isArray$l(fieldConfs) ? fieldConfs : [fieldConfs];
  arrayEach$9(fieldConfs, function(handle, index) {
    if (handle) {
      var field = handle;
      var order;
      if (isArray$l(handle)) {
        field = handle[0];
        order = handle[1];
      } else if (isPlainObject$4(handle)) {
        field = handle.field;
        order = handle.order;
      }
      sortConfs.push({
        field,
        order: order || ORDER_PROP_ASC
      });
      arrayEach$9(list, isFunction$9(field) ? function(item, key) {
        item[index] = field.call(context, item.data, key, arr);
      } : function(item) {
        item[index] = field ? get$4(item.data, field) : item.data;
      });
    }
  });
  return sortConfs;
}
function orderBy$3(arr, fieldConfs, context) {
  if (arr) {
    if (eqNull$5(fieldConfs)) {
      return toArray$1(arr).sort(handleSort);
    }
    var compares;
    var list = map$4(arr, function(item) {
      return { data: item };
    });
    var sortConfs = getSortConfs(arr, list, fieldConfs, context);
    var len = sortConfs.length - 1;
    while (len >= 0) {
      compares = buildMultiOrders(len, sortConfs[len], compares);
      len--;
    }
    if (compares) {
      list = list.sort(compares);
    }
    return map$4(list, property$3("data"));
  }
  return [];
}
var orderBy_1 = orderBy$3;
var orderBy$2 = orderBy_1;
var sortBy$1 = orderBy$2;
var sortBy_1 = sortBy$1;
function random$2(minVal, maxVal) {
  return minVal >= maxVal ? minVal : (minVal = minVal >> 0) + Math.round(Math.random() * ((maxVal || 9) - minVal));
}
var random_1 = random$2;
var helperCreateGetObjects$1 = helperCreateGetObjects_1;
var values$6 = helperCreateGetObjects$1("values", 0);
var values_1 = values$6;
var random$1 = random_1;
var values$5 = values_1;
function shuffle$2(array) {
  var index;
  var result = [];
  var list = values$5(array);
  var len = list.length - 1;
  for (; len >= 0; len--) {
    index = len > 0 ? random$1(0, len) : 0;
    result.push(list[index]);
    list.splice(index, 1);
  }
  return result;
}
var shuffle_1 = shuffle$2;
var shuffle$1 = shuffle_1;
function sample$1(array, number) {
  var result = shuffle$1(array);
  if (arguments.length <= 1) {
    return result[0];
  }
  if (number < result.length) {
    result.length = number || 0;
  }
  return result;
}
var sample_1 = sample$1;
function helperCreateToNumber$2(handle) {
  return function(str) {
    if (str) {
      var num = handle(str);
      if (!isNaN(num)) {
        return num;
      }
    }
    return 0;
  };
}
var helperCreateToNumber_1 = helperCreateToNumber$2;
var helperCreateToNumber$1 = helperCreateToNumber_1;
var toNumber$7 = helperCreateToNumber$1(parseFloat);
var toNumber_1 = toNumber$7;
var toNumber$6 = toNumber_1;
function slice$7(array, startIndex, endIndex) {
  var result = [];
  var argsSize = arguments.length;
  if (array) {
    startIndex = argsSize >= 2 ? toNumber$6(startIndex) : 0;
    endIndex = argsSize >= 3 ? toNumber$6(endIndex) : array.length;
    if (array.slice) {
      return array.slice(startIndex, endIndex);
    }
    for (; startIndex < endIndex; startIndex++) {
      result.push(array[startIndex]);
    }
  }
  return result;
}
var slice_1 = slice$7;
var each$c = each_1;
function filter$1(obj, iterate, context) {
  var result = [];
  if (obj && iterate) {
    if (obj.filter) {
      return obj.filter(iterate, context);
    }
    each$c(obj, function(val, key) {
      if (iterate.call(context, val, key, obj)) {
        result.push(val);
      }
    });
  }
  return result;
}
var filter_1 = filter$1;
var helperCreateIterateHandle$1 = helperCreateIterateHandle_1;
var findKey$1 = helperCreateIterateHandle$1("", 0, 2, true);
var findKey_1 = findKey$1;
var helperCreateIterateHandle = helperCreateIterateHandle_1;
var find$1 = helperCreateIterateHandle("find", 1, 3, true);
var find_1 = find$1;
var isArray$k = isArray_1;
var values$4 = values_1;
function findLast$1(obj, iterate, context) {
  if (obj) {
    if (!isArray$k(obj)) {
      obj = values$4(obj);
    }
    for (var len = obj.length - 1; len >= 0; len--) {
      if (iterate.call(context, obj[len], len, obj)) {
        return obj[len];
      }
    }
  }
}
var findLast_1 = findLast$1;
var keys$7 = keys_1;
function reduce$1(array, callback, initialValue) {
  if (array) {
    var len, reduceMethod;
    var index = 0;
    var context = null;
    var previous = initialValue;
    var isInitialVal = arguments.length > 2;
    var keyList = keys$7(array);
    if (array.length && array.reduce) {
      reduceMethod = function() {
        return callback.apply(context, arguments);
      };
      if (isInitialVal) {
        return array.reduce(reduceMethod, previous);
      }
      return array.reduce(reduceMethod);
    }
    if (isInitialVal) {
      index = 1;
      previous = array[keyList[0]];
    }
    for (len = keyList.length; index < len; index++) {
      previous = callback.call(context, previous, array[keyList[index]], index, array);
    }
    return previous;
  }
}
var reduce_1 = reduce$1;
var isArray$j = isArray_1;
function copyWithin$1(array, target, start, end) {
  if (isArray$j(array) && array.copyWithin) {
    return array.copyWithin(target, start, end);
  }
  var replaceIndex, replaceArray;
  var targetIndex = target >> 0;
  var startIndex = start >> 0;
  var len = array.length;
  var endIndex = arguments.length > 3 ? end >> 0 : len;
  if (targetIndex < len) {
    targetIndex = targetIndex >= 0 ? targetIndex : len + targetIndex;
    if (targetIndex >= 0) {
      startIndex = startIndex >= 0 ? startIndex : len + startIndex;
      endIndex = endIndex >= 0 ? endIndex : len + endIndex;
      if (startIndex < endIndex) {
        for (replaceIndex = 0, replaceArray = array.slice(startIndex, endIndex); targetIndex < len; targetIndex++) {
          if (replaceArray.length <= replaceIndex) {
            break;
          }
          array[targetIndex] = replaceArray[replaceIndex++];
        }
      }
    }
  }
  return array;
}
var copyWithin_1 = copyWithin$1;
var isArray$i = isArray_1;
function chunk$1(array, size) {
  var index;
  var result = [];
  var arrLen = size >> 0 || 1;
  if (isArray$i(array)) {
    if (arrLen >= 0 && array.length > arrLen) {
      index = 0;
      while (index < array.length) {
        result.push(array.slice(index, index + arrLen));
        index += arrLen;
      }
    } else {
      result = array.length ? [array] : array;
    }
  }
  return result;
}
var chunk_1 = chunk$1;
var map$3 = map_1;
var property$2 = property_1;
function pluck$2(obj, key) {
  return map$3(obj, property$2(key));
}
var pluck_1 = pluck$2;
var isFunction$8 = isFunction_1;
var eqNull$4 = eqNull_1;
var get$3 = get_1;
var arrayEach$8 = arrayEach_1;
function helperCreateMinMax$2(handle) {
  return function(arr, iterate) {
    if (arr && arr.length) {
      var rest, itemIndex;
      arrayEach$8(arr, function(itemVal, index) {
        if (iterate) {
          itemVal = isFunction$8(iterate) ? iterate(itemVal, index, arr) : get$3(itemVal, iterate);
        }
        if (!eqNull$4(itemVal) && (eqNull$4(rest) || handle(rest, itemVal))) {
          itemIndex = index;
          rest = itemVal;
        }
      });
      return arr[itemIndex];
    }
    return rest;
  };
}
var helperCreateMinMax_1 = helperCreateMinMax$2;
var helperCreateMinMax$1 = helperCreateMinMax_1;
var max$2 = helperCreateMinMax$1(function(rest, itemVal) {
  return rest < itemVal;
});
var max_1 = max$2;
var pluck$1 = pluck_1;
var max$1 = max_1;
function unzip$2(arrays) {
  var index, maxItem, len;
  var result = [];
  if (arrays && arrays.length) {
    index = 0;
    maxItem = max$1(arrays, function(item) {
      return item ? item.length : 0;
    });
    for (len = maxItem ? maxItem.length : 0; index < len; index++) {
      result.push(pluck$1(arrays, index));
    }
  }
  return result;
}
var unzip_1 = unzip$2;
var unzip$1 = unzip_1;
function zip$1() {
  return unzip$1(arguments);
}
var zip_1 = zip$1;
var values$3 = values_1;
var each$b = each_1;
function zipObject$1(props, arr) {
  var result = {};
  arr = arr || [];
  each$b(values$3(props), function(val, key) {
    result[val] = arr[key];
  });
  return result;
}
var zipObject_1 = zipObject$1;
var isArray$h = isArray_1;
var arrayEach$7 = arrayEach_1;
function flattenDeep(array, deep) {
  var result = [];
  arrayEach$7(array, function(vals) {
    result = result.concat(isArray$h(vals) ? deep ? flattenDeep(vals, deep) : vals : [vals]);
  });
  return result;
}
function flatten$1(array, deep) {
  if (isArray$h(array)) {
    return flattenDeep(array, deep);
  }
  return [];
}
var flatten_1 = flatten$1;
var map$2 = map_1;
var isArray$g = isArray_1;
function deepGetObj(obj, path) {
  var index = 0;
  var len = path.length;
  while (obj && index < len) {
    obj = obj[path[index++]];
  }
  return len && obj ? obj : 0;
}
function invoke$1(list, path) {
  var func;
  var args = arguments;
  var params = [];
  var paths = [];
  var index = 2;
  var len = args.length;
  for (; index < len; index++) {
    params.push(args[index]);
  }
  if (isArray$g(path)) {
    len = path.length - 1;
    for (index = 0; index < len; index++) {
      paths.push(path[index]);
    }
    path = path[len];
  }
  return map$2(list, function(context) {
    if (paths.length) {
      context = deepGetObj(context, paths);
    }
    func = context[path] || path;
    if (func && func.apply) {
      return func.apply(context, params);
    }
  });
}
var invoke_1 = invoke$1;
function helperDeleteProperty$2(obj, property2) {
  try {
    delete obj[property2];
  } catch (e) {
    obj[property2] = void 0;
  }
}
var helperDeleteProperty_1 = helperDeleteProperty$2;
var isArray$f = isArray_1;
var lastArrayEach$1 = lastArrayEach_1;
var lastObjectEach$1 = lastObjectEach_1;
function lastEach$2(obj, iterate, context) {
  if (obj) {
    return (isArray$f(obj) ? lastArrayEach$1 : lastObjectEach$1)(obj, iterate, context);
  }
  return obj;
}
var lastEach_1 = lastEach$2;
var helperCreateInTypeof$3 = helperCreateInTypeof_1;
var isObject$4 = helperCreateInTypeof$3("object");
var isObject_1 = isObject$4;
var helperDeleteProperty$1 = helperDeleteProperty_1;
var isPlainObject$3 = isPlainObject_1;
var isObject$3 = isObject_1;
var isArray$e = isArray_1;
var isNull$5 = isNull_1;
var assign$9 = assign_1;
var objectEach$2 = objectEach_1;
function clear$2(obj, defs, assigns) {
  if (obj) {
    var len;
    var isDefs = arguments.length > 1 && (isNull$5(defs) || !isObject$3(defs));
    var extds = isDefs ? assigns : defs;
    if (isPlainObject$3(obj)) {
      objectEach$2(obj, isDefs ? function(val, key) {
        obj[key] = defs;
      } : function(val, key) {
        helperDeleteProperty$1(obj, key);
      });
      if (extds) {
        assign$9(obj, extds);
      }
    } else if (isArray$e(obj)) {
      if (isDefs) {
        len = obj.length;
        while (len > 0) {
          len--;
          obj[len] = defs;
        }
      } else {
        obj.length = 0;
      }
      if (extds) {
        obj.push.apply(obj, extds);
      }
    }
  }
  return obj;
}
var clear_1 = clear$2;
var helperDeleteProperty = helperDeleteProperty_1;
var isFunction$7 = isFunction_1;
var isArray$d = isArray_1;
var each$a = each_1;
var arrayEach$6 = arrayEach_1;
var lastEach$1 = lastEach_1;
var clear$1 = clear_1;
var eqNull$3 = eqNull_1;
function pluckProperty(name) {
  return function(obj, key) {
    return key === name;
  };
}
function remove$2(obj, iterate, context) {
  if (obj) {
    if (!eqNull$3(iterate)) {
      var removeKeys = [];
      var rest = [];
      if (!isFunction$7(iterate)) {
        iterate = pluckProperty(iterate);
      }
      each$a(obj, function(item, index, rest2) {
        if (iterate.call(context, item, index, rest2)) {
          removeKeys.push(index);
        }
      });
      if (isArray$d(obj)) {
        lastEach$1(removeKeys, function(item, key) {
          rest.push(obj[item]);
          obj.splice(item, 1);
        });
      } else {
        rest = {};
        arrayEach$6(removeKeys, function(key) {
          rest[key] = obj[key];
          helperDeleteProperty(obj, key);
        });
      }
      return rest;
    }
    return clear$1(obj);
  }
  return obj;
}
var remove_1 = remove$2;
var setupDefaults$8 = setupDefaults_1;
var orderBy$1 = orderBy_1;
var clone$1 = clone_1;
var each$9 = each_1;
var remove$1 = remove_1;
var assign$8 = assign_1;
function strictTree(array, optChildren) {
  each$9(array, function(item) {
    if (item.children && !item.children.length) {
      remove$1(item, optChildren);
    }
  });
}
function toArrayTree$1(array, options) {
  var opts = assign$8({}, setupDefaults$8.treeOptions, options);
  var optStrict = opts.strict;
  var optKey = opts.key;
  var optParentKey = opts.parentKey;
  var optChildren = opts.children;
  var optMapChildren = opts.mapChildren;
  var optSortKey = opts.sortKey;
  var optReverse = opts.reverse;
  var optData = opts.data;
  var result = [];
  var treeMap = {};
  var idsMap = {};
  var id, treeData, parentId;
  if (optSortKey) {
    array = orderBy$1(clone$1(array), optSortKey);
    if (optReverse) {
      array = array.reverse();
    }
  }
  each$9(array, function(item) {
    id = item[optKey];
    idsMap[id] = true;
  });
  each$9(array, function(item) {
    id = item[optKey];
    if (optData) {
      treeData = {};
      treeData[optData] = item;
    } else {
      treeData = item;
    }
    parentId = item[optParentKey];
    treeMap[id] = treeMap[id] || [];
    treeMap[parentId] = treeMap[parentId] || [];
    treeMap[parentId].push(treeData);
    treeData[optKey] = id;
    treeData[optParentKey] = parentId;
    treeData[optChildren] = treeMap[id];
    if (optMapChildren) {
      treeData[optMapChildren] = treeMap[id];
    }
    if (!optStrict || optStrict && !parentId) {
      if (!idsMap[parentId]) {
        result.push(treeData);
      }
    }
  });
  if (optStrict) {
    strictTree(array, optChildren);
  }
  return result;
}
var toArrayTree_1 = toArrayTree$1;
var setupDefaults$7 = setupDefaults_1;
var each$8 = each_1;
var assign$7 = assign_1;
function unTreeList(result, array, opts) {
  var optChildren = opts.children;
  var optData = opts.data;
  var optClear = opts.clear;
  each$8(array, function(item) {
    var children = item[optChildren];
    if (optData) {
      item = item[optData];
    }
    result.push(item);
    if (children && children.length) {
      unTreeList(result, children, opts);
    }
    if (optClear) {
      delete item[optChildren];
    }
  });
  return result;
}
function toTreeArray$1(array, options) {
  return unTreeList([], array, assign$7({}, setupDefaults$7.treeOptions, options));
}
var toTreeArray_1 = toTreeArray$1;
function helperCreateTreeFunc$4(handle) {
  return function(obj, iterate, options, context) {
    var opts = options || {};
    var optChildren = opts.children || "children";
    return handle(null, obj, iterate, context, [], [], optChildren, opts);
  };
}
var helperCreateTreeFunc_1 = helperCreateTreeFunc$4;
var helperCreateTreeFunc$3 = helperCreateTreeFunc_1;
function findTreeItem(parent, obj, iterate, context, path, node, parseChildren, opts) {
  if (obj) {
    var item, index, len, paths, nodes, match;
    for (index = 0, len = obj.length; index < len; index++) {
      item = obj[index];
      paths = path.concat(["" + index]);
      nodes = node.concat([item]);
      if (iterate.call(context, item, index, obj, paths, parent, nodes)) {
        return { index, item, path: paths, items: obj, parent, nodes };
      }
      if (parseChildren && item) {
        match = findTreeItem(item, item[parseChildren], iterate, context, paths.concat([parseChildren]), nodes, parseChildren);
        if (match) {
          return match;
        }
      }
    }
  }
}
var findTree$1 = helperCreateTreeFunc$3(findTreeItem);
var findTree_1 = findTree$1;
var helperCreateTreeFunc$2 = helperCreateTreeFunc_1;
var each$7 = each_1;
function eachTreeItem(parent, obj, iterate, context, path, node, parseChildren, opts) {
  var paths, nodes;
  each$7(obj, function(item, index) {
    paths = path.concat(["" + index]);
    nodes = node.concat([item]);
    iterate.call(context, item, index, obj, paths, parent, nodes);
    if (item && parseChildren) {
      paths.push(parseChildren);
      eachTreeItem(item, item[parseChildren], iterate, context, paths, nodes, parseChildren);
    }
  });
}
var eachTree$2 = helperCreateTreeFunc$2(eachTreeItem);
var eachTree_1 = eachTree$2;
var helperCreateTreeFunc$1 = helperCreateTreeFunc_1;
var map$1 = map_1;
function mapTreeItem(parent, obj, iterate, context, path, node, parseChildren, opts) {
  var paths, nodes, rest;
  var mapChildren = opts.mapChildren || parseChildren;
  return map$1(obj, function(item, index) {
    paths = path.concat(["" + index]);
    nodes = node.concat([item]);
    rest = iterate.call(context, item, index, obj, paths, parent, nodes);
    if (rest && item && parseChildren && item[parseChildren]) {
      rest[mapChildren] = mapTreeItem(item, item[parseChildren], iterate, context, paths, nodes, parseChildren, opts);
    }
    return rest;
  });
}
var mapTree$1 = helperCreateTreeFunc$1(mapTreeItem);
var mapTree_1 = mapTree$1;
var eachTree$1 = eachTree_1;
function filterTree$1(obj, iterate, options, context) {
  var result = [];
  if (obj && iterate) {
    eachTree$1(obj, function(item, index, items, path, parent, nodes) {
      if (iterate.call(context, item, index, items, path, parent, nodes)) {
        result.push(item);
      }
    }, options);
  }
  return result;
}
var filterTree_1 = filterTree$1;
var helperCreateTreeFunc = helperCreateTreeFunc_1;
var arrayEach$5 = arrayEach_1;
var assign$6 = assign_1;
function searchTreeItem(parentAllow, parent, obj, iterate, context, path, node, parseChildren, opts) {
  var paths, nodes, rest, isAllow, hasChild;
  var rests = [];
  var hasOriginal = opts.original;
  var sourceData = opts.data;
  var mapChildren = opts.mapChildren || parseChildren;
  arrayEach$5(obj, function(item, index) {
    paths = path.concat(["" + index]);
    nodes = node.concat([item]);
    isAllow = parentAllow || iterate.call(context, item, index, obj, paths, parent, nodes);
    hasChild = parseChildren && item[parseChildren];
    if (isAllow || hasChild) {
      if (hasOriginal) {
        rest = item;
      } else {
        rest = assign$6({}, item);
        if (sourceData) {
          rest[sourceData] = item;
        }
      }
      rest[mapChildren] = searchTreeItem(isAllow, item, item[parseChildren], iterate, context, paths, nodes, parseChildren, opts);
      if (isAllow || rest[mapChildren].length) {
        rests.push(rest);
      }
    } else if (isAllow) {
      rests.push(rest);
    }
  });
  return rests;
}
var searchTree$1 = helperCreateTreeFunc(function(parent, obj, iterate, context, path, nodes, parseChildren, opts) {
  return searchTreeItem(0, parent, obj, iterate, context, path, nodes, parseChildren, opts);
});
var searchTree_1 = searchTree$1;
function arrayIndexOf$2(list, val) {
  if (list.indexOf) {
    return list.indexOf(val);
  }
  for (var index = 0, len = list.length; index < len; index++) {
    if (val === list[index]) {
      return index;
    }
  }
}
var arrayIndexOf_1 = arrayIndexOf$2;
function arrayLastIndexOf$2(list, val) {
  if (list.lastIndexOf) {
    return list.lastIndexOf(val);
  }
  for (var len = list.length - 1; len >= 0; len--) {
    if (val === list[len]) {
      return len;
    }
  }
  return -1;
}
var arrayLastIndexOf_1 = arrayLastIndexOf$2;
var helperCreateInTypeof$2 = helperCreateInTypeof_1;
var isNumber$a = helperCreateInTypeof$2("number");
var isNumber_1 = isNumber$a;
var isNumber$9 = isNumber_1;
function isNumberNaN$1(obj) {
  return isNumber$9(obj) && isNaN(obj);
}
var _isNaN = isNumberNaN$1;
var helperCreateInTypeof$1 = helperCreateInTypeof_1;
var isString$9 = helperCreateInTypeof$1("string");
var isString_1 = isString$9;
var helperCreateInInObjectString$3 = helperCreateInInObjectString_1;
var isDate$8 = helperCreateInInObjectString$3("Date");
var isDate_1 = isDate$8;
var staticParseInt$5 = parseInt;
var staticParseInt_1 = staticParseInt$5;
function helperGetUTCDateTime$1(resMaps) {
  return Date.UTC(resMaps.y, resMaps.M || 0, resMaps.d || 1, resMaps.H || 0, resMaps.m || 0, resMaps.s || 0, resMaps.S || 0);
}
var helperGetUTCDateTime_1 = helperGetUTCDateTime$1;
function helperGetDateTime$c(date) {
  return date.getTime();
}
var helperGetDateTime_1 = helperGetDateTime$c;
var staticParseInt$4 = staticParseInt_1;
var helperGetUTCDateTime = helperGetUTCDateTime_1;
var helperGetDateTime$b = helperGetDateTime_1;
var isString$8 = isString_1;
var isDate$7 = isDate_1;
function getParseRule(txt) {
  return "(\\d{" + txt + "})";
}
function toParseMs(num) {
  if (num < 10) {
    return num * 100;
  } else if (num < 100) {
    return num * 10;
  }
  return num;
}
function toParseNum(num) {
  return isNaN(num) ? num : staticParseInt$4(num);
}
var d2 = getParseRule(2);
var d1or2 = getParseRule("1,2");
var d1or7 = getParseRule("1,7");
var d3or4 = getParseRule("3,4");
var place = ".{1}";
var d1Or2RE = place + d1or2;
var dzZ = "(([zZ])|([-+]\\d{2}:?\\d{2}))";
var defaulParseStrs = [d3or4, d1Or2RE, d1Or2RE, d1Or2RE, d1Or2RE, d1Or2RE, place + d1or7, dzZ];
var defaulParseREs = [];
for (var len = defaulParseStrs.length - 1; len >= 0; len--) {
  var rule = "";
  for (var i = 0; i < len + 1; i++) {
    rule += defaulParseStrs[i];
  }
  defaulParseREs.push(new RegExp("^" + rule + "$"));
}
function parseDefaultRules(str) {
  var matchRest, resMaps = {};
  for (var i = 0, dfrLen = defaulParseREs.length; i < dfrLen; i++) {
    matchRest = str.match(defaulParseREs[i]);
    if (matchRest) {
      resMaps.y = matchRest[1];
      resMaps.M = matchRest[2];
      resMaps.d = matchRest[3];
      resMaps.H = matchRest[4];
      resMaps.m = matchRest[5];
      resMaps.s = matchRest[6];
      resMaps.S = matchRest[7];
      resMaps.Z = matchRest[8];
      break;
    }
  }
  return resMaps;
}
var customParseStrs = [
  ["yyyy", d3or4],
  ["yy", d2],
  ["MM", d2],
  ["M", d1or2],
  ["dd", d2],
  ["d", d1or2],
  ["HH", d2],
  ["H", d1or2],
  ["mm", d2],
  ["m", d1or2],
  ["ss", d2],
  ["s", d1or2],
  ["SSS", getParseRule(3)],
  ["S", d1or7],
  ["Z", dzZ]
];
var parseRuleMaps = {};
var parseRuleKeys = ["\\[([^\\]]+)\\]"];
for (var i = 0; i < customParseStrs.length; i++) {
  var itemRule = customParseStrs[i];
  parseRuleMaps[itemRule[0]] = itemRule[1] + "?";
  parseRuleKeys.push(itemRule[0]);
}
var customParseRes = new RegExp(parseRuleKeys.join("|"), "g");
var cacheFormatMaps = {};
function parseCustomRules(str, format) {
  var cacheItem = cacheFormatMaps[format];
  if (!cacheItem) {
    var posIndexs = [];
    var re = format.replace(/([$(){}*+.?\\^|])/g, "\\$1").replace(customParseRes, function(text, val) {
      var firstChar = text.charAt(0);
      if (firstChar === "[") {
        return val;
      }
      posIndexs.push(firstChar);
      return parseRuleMaps[text];
    });
    cacheItem = cacheFormatMaps[format] = {
      _i: posIndexs,
      _r: new RegExp(re)
    };
  }
  var resMaps = {};
  var matchRest = str.match(cacheItem._r);
  if (matchRest) {
    var _i = cacheItem._i;
    for (var i = 1, len = matchRest.length; i < len; i++) {
      resMaps[_i[i - 1]] = matchRest[i];
    }
    return resMaps;
  }
  return resMaps;
}
function parseTimeZone(resMaps) {
  if (/^[zZ]/.test(resMaps.Z)) {
    return new Date(helperGetUTCDateTime(resMaps));
  } else {
    var matchRest = resMaps.Z.match(/([-+])(\d{2}):?(\d{2})/);
    if (matchRest) {
      return new Date(helperGetUTCDateTime(resMaps) - (matchRest[1] === "-" ? -1 : 1) * staticParseInt$4(matchRest[2]) * 36e5 + staticParseInt$4(matchRest[3]) * 6e4);
    }
  }
  return /* @__PURE__ */ new Date("");
}
function toStringDate$d(str, format) {
  if (str) {
    var isDType = isDate$7(str);
    if (isDType || !format && /^[0-9]{11,15}$/.test(str)) {
      return new Date(isDType ? helperGetDateTime$b(str) : staticParseInt$4(str));
    }
    if (isString$8(str)) {
      var resMaps = format ? parseCustomRules(str, format) : parseDefaultRules(str);
      if (resMaps.y) {
        if (resMaps.M) {
          resMaps.M = toParseNum(resMaps.M) - 1;
        }
        if (resMaps.S) {
          resMaps.S = toParseMs(toParseNum(resMaps.S.substring(0, 3)));
        }
        if (resMaps.Z) {
          return parseTimeZone(resMaps);
        } else {
          return new Date(resMaps.y, resMaps.M || 0, resMaps.d || 1, resMaps.H || 0, resMaps.m || 0, resMaps.s || 0, resMaps.S || 0);
        }
      }
    }
  }
  return /* @__PURE__ */ new Date("");
}
var toStringDate_1 = toStringDate$d;
function helperNewDate$4() {
  return /* @__PURE__ */ new Date();
}
var helperNewDate_1 = helperNewDate$4;
var isDate$6 = isDate_1;
var toStringDate$c = toStringDate_1;
var helperNewDate$3 = helperNewDate_1;
function isLeapYear$2(date) {
  var year;
  var currentDate = date ? toStringDate$c(date) : helperNewDate$3();
  if (isDate$6(currentDate)) {
    year = currentDate.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  return false;
}
var isLeapYear_1 = isLeapYear$2;
var isArray$c = isArray_1;
var hasOwnProp$5 = hasOwnProp_1;
function forOf$1(obj, iterate, context) {
  if (obj) {
    if (isArray$c(obj)) {
      for (var index = 0, len = obj.length; index < len; index++) {
        if (iterate.call(context, obj[index], index, obj) === false) {
          break;
        }
      }
    } else {
      for (var key in obj) {
        if (hasOwnProp$5(obj, key)) {
          if (iterate.call(context, obj[key], key, obj) === false) {
            break;
          }
        }
      }
    }
  }
}
var forOf_1 = forOf$1;
var isArray$b = isArray_1;
var keys$6 = hasOwnProp_1;
function lastForOf$1(obj, iterate, context) {
  if (obj) {
    var len, list;
    if (isArray$b(obj)) {
      for (len = obj.length - 1; len >= 0; len--) {
        if (iterate.call(context, obj[len], len, obj) === false) {
          break;
        }
      }
    } else {
      list = keys$6(obj);
      for (len = list.length - 1; len >= 0; len--) {
        if (iterate.call(context, obj[list[len]], list[len], obj) === false) {
          break;
        }
      }
    }
  }
}
var lastForOf_1 = lastForOf$1;
var isArray$a = isArray_1;
var isString$7 = isString_1;
var hasOwnProp$4 = hasOwnProp_1;
function helperCreateIndexOf$2(name, callback) {
  return function(obj, val) {
    if (obj) {
      if (obj[name]) {
        return obj[name](val);
      }
      if (isString$7(obj) || isArray$a(obj)) {
        return callback(obj, val);
      }
      for (var key in obj) {
        if (hasOwnProp$4(obj, key)) {
          if (val === obj[key]) {
            return key;
          }
        }
      }
    }
    return -1;
  };
}
var helperCreateIndexOf_1 = helperCreateIndexOf$2;
var helperCreateIndexOf$1 = helperCreateIndexOf_1;
var arrayIndexOf$1 = arrayIndexOf_1;
var indexOf$1 = helperCreateIndexOf$1("indexOf", arrayIndexOf$1);
var indexOf_1 = indexOf$1;
var helperCreateIndexOf = helperCreateIndexOf_1;
var arrayLastIndexOf$1 = arrayLastIndexOf_1;
var lastIndexOf$2 = helperCreateIndexOf("lastIndexOf", arrayLastIndexOf$1);
var lastIndexOf_1 = lastIndexOf$2;
var isArray$9 = isArray_1;
var isString$6 = isString_1;
var each$6 = each_1;
function getSize$2(obj) {
  var len = 0;
  if (isString$6(obj) || isArray$9(obj)) {
    return obj.length;
  }
  each$6(obj, function() {
    len++;
  });
  return len;
}
var getSize_1 = getSize$2;
var isNumber$8 = isNumber_1;
function isNumberFinite$1(obj) {
  return isNumber$8(obj) && isFinite(obj);
}
var _isFinite = isNumberFinite$1;
var isArray$8 = isArray_1;
var isNull$4 = isNull_1;
var isInteger$2 = function(obj) {
  return !isNull$4(obj) && !isNaN(obj) && !isArray$8(obj) && obj % 1 === 0;
};
var isInteger_1 = isInteger$2;
var isArray$7 = isArray_1;
var isInteger$1 = isInteger_1;
var isNull$3 = isNull_1;
function isFloat$1(obj) {
  return !isNull$3(obj) && !isNaN(obj) && !isArray$7(obj) && !isInteger$1(obj);
}
var isFloat_1 = isFloat$1;
var helperCreateInTypeof = helperCreateInTypeof_1;
var isBoolean$2 = helperCreateInTypeof("boolean");
var isBoolean_1 = isBoolean$2;
var helperCreateInInObjectString$2 = helperCreateInInObjectString_1;
var isRegExp$3 = helperCreateInInObjectString$2("RegExp");
var isRegExp_1 = isRegExp$3;
var helperCreateInInObjectString$1 = helperCreateInInObjectString_1;
var isError$2 = helperCreateInInObjectString$1("Error");
var isError_1 = isError$2;
function isTypeError$1(obj) {
  return obj ? obj.constructor === TypeError : false;
}
var isTypeError_1 = isTypeError$1;
function isEmpty$2(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
var isEmpty_1 = isEmpty$2;
var staticStrUndefined$9 = staticStrUndefined_1;
var supportSymbol = typeof Symbol !== staticStrUndefined$9;
function isSymbol$2(obj) {
  return supportSymbol && Symbol.isSymbol ? Symbol.isSymbol(obj) : typeof obj === "symbol";
}
var isSymbol_1 = isSymbol$2;
var helperCreateInInObjectString = helperCreateInInObjectString_1;
var isArguments$1 = helperCreateInInObjectString("Arguments");
var isArguments_1 = isArguments$1;
var isString$5 = isString_1;
var isNumber$7 = isNumber_1;
function isElement$1(obj) {
  return !!(obj && isString$5(obj.nodeName) && isNumber$7(obj.nodeType));
}
var isElement_1 = isElement$1;
var staticStrUndefined$8 = staticStrUndefined_1;
var staticDocument$3 = typeof document === staticStrUndefined$8 ? 0 : document;
var staticDocument_1 = staticDocument$3;
var staticDocument$2 = staticDocument_1;
function isDocument$1(obj) {
  return !!(obj && staticDocument$2 && obj.nodeType === 9);
}
var isDocument_1 = isDocument$1;
var staticStrUndefined$7 = staticStrUndefined_1;
var staticWindow$2 = typeof window === staticStrUndefined$7 ? 0 : window;
var staticWindow_1 = staticWindow$2;
var staticWindow$1 = staticWindow_1;
function isWindow$1(obj) {
  return staticWindow$1 && !!(obj && obj === obj.window);
}
var isWindow_1 = isWindow$1;
var staticStrUndefined$6 = staticStrUndefined_1;
var supportFormData = typeof FormData !== staticStrUndefined$6;
function isFormData$1(obj) {
  return supportFormData && obj instanceof FormData;
}
var isFormData_1 = isFormData$1;
var staticStrUndefined$5 = staticStrUndefined_1;
var supportMap = typeof Map !== staticStrUndefined$5;
function isMap$1(obj) {
  return supportMap && obj instanceof Map;
}
var isMap_1 = isMap$1;
var staticStrUndefined$4 = staticStrUndefined_1;
var supportWeakMap = typeof WeakMap !== staticStrUndefined$4;
function isWeakMap$1(obj) {
  return supportWeakMap && obj instanceof WeakMap;
}
var isWeakMap_1 = isWeakMap$1;
var staticStrUndefined$3 = staticStrUndefined_1;
var supportSet = typeof Set !== staticStrUndefined$3;
function isSet$1(obj) {
  return supportSet && obj instanceof Set;
}
var isSet_1 = isSet$1;
var staticStrUndefined$2 = staticStrUndefined_1;
var supportWeakSet = typeof WeakSet !== staticStrUndefined$2;
function isWeakSet$1(obj) {
  return supportWeakSet && obj instanceof WeakSet;
}
var isWeakSet_1 = isWeakSet$1;
var isFunction$6 = isFunction_1;
var isString$4 = isString_1;
var isArray$6 = isArray_1;
var hasOwnProp$3 = hasOwnProp_1;
function helperCreateiterateIndexOf$2(callback) {
  return function(obj, iterate, context) {
    if (obj && isFunction$6(iterate)) {
      if (isArray$6(obj) || isString$4(obj)) {
        return callback(obj, iterate, context);
      }
      for (var key in obj) {
        if (hasOwnProp$3(obj, key)) {
          if (iterate.call(context, obj[key], key, obj)) {
            return key;
          }
        }
      }
    }
    return -1;
  };
}
var helperCreateiterateIndexOf_1 = helperCreateiterateIndexOf$2;
var helperCreateiterateIndexOf$1 = helperCreateiterateIndexOf_1;
var findIndexOf$3 = helperCreateiterateIndexOf$1(function(obj, iterate, context) {
  for (var index = 0, len = obj.length; index < len; index++) {
    if (iterate.call(context, obj[index], index, obj)) {
      return index;
    }
  }
  return -1;
});
var findIndexOf_1 = findIndexOf$3;
var isNumber$6 = isNumber_1;
var isArray$5 = isArray_1;
var isString$3 = isString_1;
var isRegExp$2 = isRegExp_1;
var isDate$5 = isDate_1;
var isBoolean$1 = isBoolean_1;
var isUndefined$6 = isUndefined_1;
var keys$5 = keys_1;
var every$1 = every_1;
function helperEqualCompare$2(val1, val2, compare, func, key, obj1, obj2) {
  if (val1 === val2) {
    return true;
  }
  if (val1 && val2 && !isNumber$6(val1) && !isNumber$6(val2) && !isString$3(val1) && !isString$3(val2)) {
    if (isRegExp$2(val1)) {
      return compare("" + val1, "" + val2, key, obj1, obj2);
    }
    if (isDate$5(val1) || isBoolean$1(val1)) {
      return compare(+val1, +val2, key, obj1, obj2);
    } else {
      var result, val1Keys, val2Keys;
      var isObj1Arr = isArray$5(val1);
      var isObj2Arr = isArray$5(val2);
      if (isObj1Arr || isObj2Arr ? isObj1Arr && isObj2Arr : val1.constructor === val2.constructor) {
        val1Keys = keys$5(val1);
        val2Keys = keys$5(val2);
        if (func) {
          result = func(val1, val2, key);
        }
        if (val1Keys.length === val2Keys.length) {
          return isUndefined$6(result) ? every$1(val1Keys, function(key2, index) {
            return key2 === val2Keys[index] && helperEqualCompare$2(val1[key2], val2[val2Keys[index]], compare, func, isObj1Arr || isObj2Arr ? index : key2, val1, val2);
          }) : !!result;
        }
        return false;
      }
    }
  }
  return compare(val1, val2, key, obj1, obj2);
}
var helperEqualCompare_1 = helperEqualCompare$2;
function helperDefaultCompare$2(v1, v2) {
  return v1 === v2;
}
var helperDefaultCompare_1 = helperDefaultCompare$2;
var helperEqualCompare$1 = helperEqualCompare_1;
var helperDefaultCompare$1 = helperDefaultCompare_1;
function isEqual$2(obj1, obj2) {
  return helperEqualCompare$1(obj1, obj2, helperDefaultCompare$1);
}
var isEqual_1 = isEqual$2;
var keys$4 = keys_1;
var findIndexOf$2 = findIndexOf_1;
var isEqual$1 = isEqual_1;
var some$1 = some_1;
var includeArrays$1 = includeArrays_1;
function isMatch$1(obj, source) {
  var objKeys = keys$4(obj);
  var sourceKeys = keys$4(source);
  if (sourceKeys.length) {
    if (includeArrays$1(objKeys, sourceKeys)) {
      return some$1(sourceKeys, function(key2) {
        return findIndexOf$2(objKeys, function(key1) {
          return key1 === key2 && isEqual$1(obj[key1], source[key2]);
        }) > -1;
      });
    }
  } else {
    return true;
  }
  return isEqual$1(obj, source);
}
var isMatch_1 = isMatch$1;
var helperEqualCompare = helperEqualCompare_1;
var helperDefaultCompare = helperDefaultCompare_1;
var isFunction$5 = isFunction_1;
var isUndefined$5 = isUndefined_1;
function isEqualWith$1(obj1, obj2, func) {
  if (isFunction$5(func)) {
    return helperEqualCompare(obj1, obj2, function(v1, v2, key, obj12, obj22) {
      var result = func(v1, v2, key, obj12, obj22);
      return isUndefined$5(result) ? helperDefaultCompare(v1, v2) : !!result;
    }, func);
  }
  return helperEqualCompare(obj1, obj2, helperDefaultCompare);
}
var isEqualWith_1 = isEqualWith$1;
var isSymbol$1 = isSymbol_1;
var isDate$4 = isDate_1;
var isArray$4 = isArray_1;
var isRegExp$1 = isRegExp_1;
var isError$1 = isError_1;
var isNull$2 = isNull_1;
function getType$1(obj) {
  if (isNull$2(obj)) {
    return "null";
  }
  if (isSymbol$1(obj)) {
    return "symbol";
  }
  if (isDate$4(obj)) {
    return "date";
  }
  if (isArray$4(obj)) {
    return "array";
  }
  if (isRegExp$1(obj)) {
    return "regexp";
  }
  if (isError$1(obj)) {
    return "error";
  }
  return typeof obj;
}
var getType_1 = getType$1;
var __uniqueId = 0;
function uniqueId$1(prefix) {
  return [prefix, ++__uniqueId].join("");
}
var uniqueId_1 = uniqueId$1;
var helperCreateiterateIndexOf = helperCreateiterateIndexOf_1;
var findLastIndexOf$1 = helperCreateiterateIndexOf(function(obj, iterate, context) {
  for (var len = obj.length - 1; len >= 0; len--) {
    if (iterate.call(context, obj[len], len, obj)) {
      return len;
    }
  }
  return -1;
});
var findLastIndexOf_1 = findLastIndexOf$1;
var isPlainObject$2 = isPlainObject_1;
var isString$2 = isString_1;
function toStringJSON$1(str) {
  if (isPlainObject$2(str)) {
    return str;
  } else if (isString$2(str)) {
    try {
      return JSON.parse(str);
    } catch (e) {
    }
  }
  return {};
}
var toStringJSON_1 = toStringJSON$1;
var eqNull$2 = eqNull_1;
function toJSONString$1(obj) {
  return eqNull$2(obj) ? "" : JSON.stringify(obj);
}
var toJSONString_1 = toJSONString$1;
var helperCreateGetObjects = helperCreateGetObjects_1;
var entries$1 = helperCreateGetObjects("entries", 2);
var entries_1 = entries$1;
var isFunction$4 = isFunction_1;
var isArray$3 = isArray_1;
var each$5 = each_1;
var findIndexOf$1 = findIndexOf_1;
function helperCreatePickOmit$2(case1, case2) {
  return function(obj, callback) {
    var item, index;
    var rest = {};
    var result = [];
    var context = this;
    var args = arguments;
    var len = args.length;
    if (!isFunction$4(callback)) {
      for (index = 1; index < len; index++) {
        item = args[index];
        result.push.apply(result, isArray$3(item) ? item : [item]);
      }
      callback = 0;
    }
    each$5(obj, function(val, key) {
      if ((callback ? callback.call(context, val, key, obj) : findIndexOf$1(result, function(name) {
        return name === key;
      }) > -1) ? case1 : case2) {
        rest[key] = val;
      }
    });
    return rest;
  };
}
var helperCreatePickOmit_1 = helperCreatePickOmit$2;
var helperCreatePickOmit$1 = helperCreatePickOmit_1;
var pick$1 = helperCreatePickOmit$1(1, 0);
var pick_1 = pick$1;
var helperCreatePickOmit = helperCreatePickOmit_1;
var omit$1 = helperCreatePickOmit(0, 1);
var omit_1 = omit$1;
var values$2 = values_1;
function first$1(obj) {
  return values$2(obj)[0];
}
var first_1 = first$1;
var values$1 = values_1;
function last$1(obj) {
  var list = values$1(obj);
  return list[list.length - 1];
}
var last_1 = last$1;
var staticHGKeyRE = staticHGKeyRE_1;
var helperGetHGSKeys$1 = helperGetHGSKeys_1;
var hasOwnProp$2 = hasOwnProp_1;
function has$1(obj, property2) {
  if (obj) {
    if (hasOwnProp$2(obj, property2)) {
      return true;
    } else {
      var prop, arrIndex, objProp, matchs, rest, isHas;
      var props = helperGetHGSKeys$1(property2);
      var index = 0;
      var len = props.length;
      for (rest = obj; index < len; index++) {
        isHas = false;
        prop = props[index];
        matchs = prop ? prop.match(staticHGKeyRE) : "";
        if (matchs) {
          arrIndex = matchs[1];
          objProp = matchs[2];
          if (arrIndex) {
            if (rest[arrIndex]) {
              if (hasOwnProp$2(rest[arrIndex], objProp)) {
                isHas = true;
                rest = rest[arrIndex][objProp];
              }
            }
          } else {
            if (hasOwnProp$2(rest, objProp)) {
              isHas = true;
              rest = rest[objProp];
            }
          }
        } else {
          if (hasOwnProp$2(rest, prop)) {
            isHas = true;
            rest = rest[prop];
          }
        }
        if (isHas) {
          if (index === len - 1) {
            return true;
          }
        } else {
          break;
        }
      }
    }
  }
  return false;
}
var has_1 = has$1;
var staticParseInt$3 = staticParseInt_1;
var helperGetHGSKeys = helperGetHGSKeys_1;
var hasOwnProp$1 = hasOwnProp_1;
var sKeyRE = /(.+)?\[(\d+)\]$/;
function setDeepProps(obj, key, isEnd, nextKey, value) {
  if (obj[key]) {
    if (isEnd) {
      obj[key] = value;
    }
  } else {
    var index;
    var rest;
    var currMatchs = key ? key.match(sKeyRE) : null;
    if (isEnd) {
      rest = value;
    } else {
      var nextMatchs = nextKey ? nextKey.match(sKeyRE) : null;
      if (nextMatchs && !nextMatchs[1]) {
        rest = new Array(staticParseInt$3(nextMatchs[2]) + 1);
      } else {
        rest = {};
      }
    }
    if (currMatchs) {
      if (currMatchs[1]) {
        index = staticParseInt$3(currMatchs[2]);
        if (obj[currMatchs[1]]) {
          if (isEnd) {
            obj[currMatchs[1]][index] = rest;
          } else {
            if (obj[currMatchs[1]][index]) {
              rest = obj[currMatchs[1]][index];
            } else {
              obj[currMatchs[1]][index] = rest;
            }
          }
        } else {
          obj[currMatchs[1]] = new Array(index + 1);
          obj[currMatchs[1]][index] = rest;
        }
      } else {
        obj[currMatchs[2]] = rest;
      }
    } else {
      obj[key] = rest;
    }
    return rest;
  }
  return obj[key];
}
function set$1(obj, property2, value) {
  if (obj) {
    if ((obj[property2] || hasOwnProp$1(obj, property2)) && !isPrototypePolluted(property2)) {
      obj[property2] = value;
    } else {
      var rest = obj;
      var props = helperGetHGSKeys(property2);
      var len = props.length;
      for (var index = 0; index < len; index++) {
        if (isPrototypePolluted(props[index])) {
          continue;
        }
        var isEnd = index === len - 1;
        rest = setDeepProps(rest, props[index], isEnd, isEnd ? null : props[index + 1], value);
      }
    }
  }
  return obj;
}
function isPrototypePolluted(key) {
  return key === "__proto__" || key === "constructor" || key === "prototype";
}
var set_1 = set$1;
var isEmpty$1 = isEmpty_1;
var isObject$2 = isObject_1;
var isFunction$3 = isFunction_1;
var property$1 = property_1;
var each$4 = each_1;
function createiterateEmpty(iterate) {
  return function() {
    return isEmpty$1(iterate);
  };
}
function groupBy$2(obj, iterate, context) {
  var groupKey;
  var result = {};
  if (obj) {
    if (iterate && isObject$2(iterate)) {
      iterate = createiterateEmpty(iterate);
    } else if (!isFunction$3(iterate)) {
      iterate = property$1(iterate);
    }
    each$4(obj, function(val, key) {
      groupKey = iterate ? iterate.call(context, val, key, obj) : val;
      if (result[groupKey]) {
        result[groupKey].push(val);
      } else {
        result[groupKey] = [val];
      }
    });
  }
  return result;
}
var groupBy_1 = groupBy$2;
var groupBy$1 = groupBy_1;
var objectEach$1 = objectEach_1;
function countBy$1(obj, iterate, context) {
  var result = groupBy$1(obj, iterate, context || this);
  objectEach$1(result, function(item, key) {
    result[key] = item.length;
  });
  return result;
}
var countBy_1 = countBy$1;
function range$1(start, stop, step) {
  var index, len;
  var result = [];
  var args = arguments;
  if (args.length < 2) {
    stop = args[0];
    start = 0;
  }
  index = start >> 0;
  len = stop >> 0;
  if (index < stop) {
    step = step >> 0 || 1;
    for (; index < len; index += step) {
      result.push(index);
    }
  }
  return result;
}
var range_1 = range$1;
var keys$3 = keys_1;
var slice$6 = slice_1;
var includes$2 = includes_1;
var arrayEach$4 = arrayEach_1;
var assign$5 = assign_1;
function destructuring$1(destination, sources) {
  if (destination && sources) {
    var rest = assign$5.apply(this, [{}].concat(slice$6(arguments, 1)));
    var restKeys = keys$3(rest);
    arrayEach$4(keys$3(destination), function(key) {
      if (includes$2(restKeys, key)) {
        destination[key] = rest[key];
      }
    });
  }
  return destination;
}
var destructuring_1 = destructuring$1;
var helperCreateMinMax = helperCreateMinMax_1;
var min$1 = helperCreateMinMax(function(rest, itemVal) {
  return rest > itemVal;
});
var min_1 = min$1;
function helperNumberDecimal$4(numStr) {
  return (numStr.split(".")[1] || "").length;
}
var helperNumberDecimal_1 = helperNumberDecimal$4;
var staticParseInt$2 = staticParseInt_1;
function helperStringRepeat$5(str, count) {
  if (str.repeat) {
    return str.repeat(count);
  }
  var list = isNaN(count) ? [] : new Array(staticParseInt$2(count));
  return list.join(str) + (list.length > 0 ? str : "");
}
var helperStringRepeat_1 = helperStringRepeat$5;
function helperNumberOffsetPoint$2(str, offsetIndex) {
  return str.substring(0, offsetIndex) + "." + str.substring(offsetIndex, str.length);
}
var helperNumberOffsetPoint_1 = helperNumberOffsetPoint$2;
var helperStringRepeat$4 = helperStringRepeat_1;
var helperNumberOffsetPoint$1 = helperNumberOffsetPoint_1;
function toNumberString$8(num) {
  var rest = "" + num;
  var scienceMatchs = rest.match(/^([-+]?)((\d+)|((\d+)?[.](\d+)?))e([-+]{1})([0-9]+)$/);
  if (scienceMatchs) {
    var isNegative = num < 0;
    var absFlag = isNegative ? "-" : "";
    var intNumStr = scienceMatchs[3] || "";
    var dIntNumStr = scienceMatchs[5] || "";
    var dFloatNumStr = scienceMatchs[6] || "";
    var sciencFlag = scienceMatchs[7];
    var scienceNumStr = scienceMatchs[8];
    var floatOffsetIndex = scienceNumStr - dFloatNumStr.length;
    var intOffsetIndex = scienceNumStr - intNumStr.length;
    var dIntOffsetIndex = scienceNumStr - dIntNumStr.length;
    if (sciencFlag === "+") {
      if (intNumStr) {
        return absFlag + intNumStr + helperStringRepeat$4("0", scienceNumStr);
      }
      if (floatOffsetIndex > 0) {
        return absFlag + dIntNumStr + dFloatNumStr + helperStringRepeat$4("0", floatOffsetIndex);
      }
      return absFlag + dIntNumStr + helperNumberOffsetPoint$1(dFloatNumStr, scienceNumStr);
    }
    if (intNumStr) {
      if (intOffsetIndex > 0) {
        return absFlag + "0." + helperStringRepeat$4("0", Math.abs(intOffsetIndex)) + intNumStr;
      }
      return absFlag + helperNumberOffsetPoint$1(intNumStr, intOffsetIndex);
    }
    if (dIntOffsetIndex > 0) {
      return absFlag + "0." + helperStringRepeat$4("0", Math.abs(dIntOffsetIndex)) + dIntNumStr + dFloatNumStr;
    }
    return absFlag + helperNumberOffsetPoint$1(dIntNumStr, dIntOffsetIndex) + dFloatNumStr;
  }
  return rest;
}
var toNumberString_1 = toNumberString$8;
var helperNumberDecimal$3 = helperNumberDecimal_1;
var toNumberString$7 = toNumberString_1;
function helperMultiply$2(multiplier, multiplicand) {
  var str1 = toNumberString$7(multiplier);
  var str2 = toNumberString$7(multiplicand);
  return parseInt(str1.replace(".", "")) * parseInt(str2.replace(".", "")) / Math.pow(10, helperNumberDecimal$3(str1) + helperNumberDecimal$3(str2));
}
var helperMultiply_1 = helperMultiply$2;
var helperMultiply$1 = helperMultiply_1;
var toNumber$5 = toNumber_1;
var toNumberString$6 = toNumberString_1;
function helperCreateMathNumber$3(name) {
  return function(num, digits) {
    var numRest = toNumber$5(num);
    var rest = numRest;
    if (numRest) {
      digits = digits >> 0;
      var numStr = toNumberString$6(numRest);
      var nums = numStr.split(".");
      var intStr = nums[0];
      var floatStr = nums[1] || "";
      var fStr = floatStr.substring(0, digits + 1);
      var subRest = intStr + (fStr ? "." + fStr : "");
      if (digits >= floatStr.length) {
        return toNumber$5(subRest);
      }
      subRest = numRest;
      if (digits > 0) {
        var ratio = Math.pow(10, digits);
        rest = Math[name](helperMultiply$1(subRest, ratio)) / ratio;
      } else {
        rest = Math[name](subRest);
      }
    }
    return rest;
  };
}
var helperCreateMathNumber_1 = helperCreateMathNumber$3;
var helperCreateMathNumber$2 = helperCreateMathNumber_1;
var round$3 = helperCreateMathNumber$2("round");
var round_1 = round$3;
var helperCreateMathNumber$1 = helperCreateMathNumber_1;
var ceil$2 = helperCreateMathNumber$1("ceil");
var ceil_1 = ceil$2;
var helperCreateMathNumber = helperCreateMathNumber_1;
var floor$2 = helperCreateMathNumber("floor");
var floor_1 = floor$2;
var eqNull$1 = eqNull_1;
var isNumber$5 = isNumber_1;
var toNumberString$5 = toNumberString_1;
function toValueString$e(obj) {
  if (isNumber$5(obj)) {
    return toNumberString$5(obj);
  }
  return "" + (eqNull$1(obj) ? "" : obj);
}
var toValueString_1 = toValueString$e;
var round$2 = round_1;
var toValueString$d = toValueString_1;
var helperStringRepeat$3 = helperStringRepeat_1;
var helperNumberOffsetPoint = helperNumberOffsetPoint_1;
function toFixed$3(num, digits) {
  digits = digits >> 0;
  var str = toValueString$d(round$2(num, digits));
  var nums = str.split(".");
  var intStr = nums[0];
  var floatStr = nums[1] || "";
  var digitOffsetIndex = digits - floatStr.length;
  if (digits) {
    if (digitOffsetIndex > 0) {
      return intStr + "." + floatStr + helperStringRepeat$3("0", digitOffsetIndex);
    }
    return intStr + helperNumberOffsetPoint(floatStr, Math.abs(digitOffsetIndex));
  }
  return intStr;
}
var toFixed_1 = toFixed$3;
var setupDefaults$6 = setupDefaults_1;
var round$1 = round_1;
var ceil$1 = ceil_1;
var floor$1 = floor_1;
var isNumber$4 = isNumber_1;
var toValueString$c = toValueString_1;
var toFixed$2 = toFixed_1;
var toNumberString$4 = toNumberString_1;
var assign$4 = assign_1;
function commafy$1(num, options) {
  var opts = assign$4({}, setupDefaults$6.commafyOptions, options);
  var optDigits = opts.digits;
  var isNum = isNumber$4(num);
  var rest, result, isNegative, intStr, floatStr;
  if (isNum) {
    rest = (opts.ceil ? ceil$1 : opts.floor ? floor$1 : round$1)(num, optDigits);
    result = toNumberString$4(optDigits ? toFixed$2(rest, optDigits) : rest).split(".");
    intStr = result[0];
    floatStr = result[1];
    isNegative = intStr && rest < 0;
    if (isNegative) {
      intStr = intStr.substring(1, intStr.length);
    }
  } else {
    rest = toValueString$c(num).replace(/,/g, "");
    result = rest ? [rest] : [];
    intStr = result[0];
  }
  if (result.length) {
    return (isNegative ? "-" : "") + intStr.replace(new RegExp("(?=(?!(\\b))(.{" + (opts.spaceNumber || 3) + "})+$)", "g"), opts.separator || ",") + (floatStr ? "." + floatStr : "");
  }
  return rest;
}
var commafy_1 = commafy$1;
var staticParseInt$1 = staticParseInt_1;
var helperCreateToNumber = helperCreateToNumber_1;
var toInteger$1 = helperCreateToNumber(staticParseInt$1);
var toInteger_1 = toInteger$1;
var helperMultiply = helperMultiply_1;
var toNumber$4 = toNumber_1;
function multiply$3(num1, num2) {
  var multiplier = toNumber$4(num1);
  var multiplicand = toNumber$4(num2);
  return helperMultiply(multiplier, multiplicand);
}
var multiply_1 = multiply$3;
var helperNumberDecimal$2 = helperNumberDecimal_1;
var toNumberString$3 = toNumberString_1;
var multiply$2 = multiply_1;
function helperNumberAdd$2(addend, augend) {
  var str1 = toNumberString$3(addend);
  var str2 = toNumberString$3(augend);
  var ratio = Math.pow(10, Math.max(helperNumberDecimal$2(str1), helperNumberDecimal$2(str2)));
  return (multiply$2(addend, ratio) + multiply$2(augend, ratio)) / ratio;
}
var helperNumberAdd_1 = helperNumberAdd$2;
var helperNumberAdd$1 = helperNumberAdd_1;
var toNumber$3 = toNumber_1;
function add$1(num1, num2) {
  return helperNumberAdd$1(toNumber$3(num1), toNumber$3(num2));
}
var add_1 = add$1;
var helperNumberDecimal$1 = helperNumberDecimal_1;
var toNumberString$2 = toNumberString_1;
var toNumber$2 = toNumber_1;
var toFixed$1 = toFixed_1;
function subtract$1(num1, num2) {
  var subtrahend = toNumber$2(num1);
  var minuend = toNumber$2(num2);
  var str1 = toNumberString$2(subtrahend);
  var str2 = toNumberString$2(minuend);
  var digit1 = helperNumberDecimal$1(str1);
  var digit2 = helperNumberDecimal$1(str2);
  var ratio = Math.pow(10, Math.max(digit1, digit2));
  var precision = digit1 >= digit2 ? digit1 : digit2;
  return parseFloat(toFixed$1((subtrahend * ratio - minuend * ratio) / ratio, precision));
}
var subtract_1 = subtract$1;
var helperNumberDecimal = helperNumberDecimal_1;
var toNumberString$1 = toNumberString_1;
var multiply$1 = multiply_1;
function helperNumberDivide$2(divisor, dividend) {
  var str1 = toNumberString$1(divisor);
  var str2 = toNumberString$1(dividend);
  var divisorDecimal = helperNumberDecimal(str1);
  var dividendDecimal = helperNumberDecimal(str2);
  var powY = dividendDecimal - divisorDecimal;
  var isMinus = powY < 0;
  var multiplicand = Math.pow(10, isMinus ? Math.abs(powY) : powY);
  return multiply$1(str1.replace(".", "") / str2.replace(".", ""), isMinus ? 1 / multiplicand : multiplicand);
}
var helperNumberDivide_1 = helperNumberDivide$2;
var helperNumberDivide$1 = helperNumberDivide_1;
var toNumber$1 = toNumber_1;
function divide$1(num1, num2) {
  return helperNumberDivide$1(toNumber$1(num1), toNumber$1(num2));
}
var divide_1 = divide$1;
var helperNumberAdd = helperNumberAdd_1;
var isFunction$2 = isFunction_1;
var each$3 = each_1;
var get$2 = get_1;
function sum$2(array, iterate, context) {
  var result = 0;
  each$3(array, iterate ? isFunction$2(iterate) ? function() {
    result = helperNumberAdd(result, iterate.apply(context, arguments));
  } : function(val) {
    result = helperNumberAdd(result, get$2(val, iterate));
  } : function(val) {
    result = helperNumberAdd(result, val);
  });
  return result;
}
var sum_1 = sum$2;
var helperNumberDivide = helperNumberDivide_1;
var getSize$1 = getSize_1;
var sum$1 = sum_1;
function mean$1(array, iterate, context) {
  return helperNumberDivide(sum$1(array, iterate, context), getSize$1(array));
}
var mean_1 = mean$1;
var staticStrFirst$5 = "first";
var staticStrFirst_1 = staticStrFirst$5;
var staticStrLast$4 = "last";
var staticStrLast_1 = staticStrLast$4;
function helperGetDateFullYear$5(date) {
  return date.getFullYear();
}
var helperGetDateFullYear_1 = helperGetDateFullYear$5;
var staticDayTime$5 = 864e5;
var staticDayTime_1 = staticDayTime$5;
function helperGetDateMonth$4(date) {
  return date.getMonth();
}
var helperGetDateMonth_1 = helperGetDateMonth$4;
var isDate$3 = isDate_1;
var helperGetDateTime$a = helperGetDateTime_1;
function isValidDate$c(val) {
  return isDate$3(val) && !isNaN(helperGetDateTime$a(val));
}
var isValidDate_1 = isValidDate$c;
var staticStrFirst$4 = staticStrFirst_1;
var staticStrLast$3 = staticStrLast_1;
var staticDayTime$4 = staticDayTime_1;
var helperGetDateFullYear$4 = helperGetDateFullYear_1;
var helperGetDateTime$9 = helperGetDateTime_1;
var helperGetDateMonth$3 = helperGetDateMonth_1;
var toStringDate$b = toStringDate_1;
var isValidDate$b = isValidDate_1;
var isNumber$3 = isNumber_1;
function getWhatMonth$5(date, offsetMonth, offsetDay) {
  var monthNum = offsetMonth && !isNaN(offsetMonth) ? offsetMonth : 0;
  date = toStringDate$b(date);
  if (isValidDate$b(date)) {
    if (offsetDay === staticStrFirst$4) {
      return new Date(helperGetDateFullYear$4(date), helperGetDateMonth$3(date) + monthNum, 1);
    } else if (offsetDay === staticStrLast$3) {
      return new Date(helperGetDateTime$9(getWhatMonth$5(date, monthNum + 1, staticStrFirst$4)) - 1);
    } else if (isNumber$3(offsetDay)) {
      date.setDate(offsetDay);
    }
    if (monthNum) {
      var currDate = date.getDate();
      date.setMonth(helperGetDateMonth$3(date) + monthNum);
      if (currDate !== date.getDate()) {
        date.setDate(1);
        return new Date(helperGetDateTime$9(date) - staticDayTime$4);
      }
    }
  }
  return date;
}
var getWhatMonth_1 = getWhatMonth$5;
var staticStrFirst$3 = staticStrFirst_1;
var staticStrLast$2 = staticStrLast_1;
var helperGetDateFullYear$3 = helperGetDateFullYear_1;
var getWhatMonth$4 = getWhatMonth_1;
var toStringDate$a = toStringDate_1;
var isValidDate$a = isValidDate_1;
function getWhatYear$4(date, offset, month) {
  var number;
  date = toStringDate$a(date);
  if (isValidDate$a(date)) {
    if (offset) {
      number = offset && !isNaN(offset) ? offset : 0;
      date.setFullYear(helperGetDateFullYear$3(date) + number);
    }
    if (month || !isNaN(month)) {
      if (month === staticStrFirst$3) {
        return new Date(helperGetDateFullYear$3(date), 0, 1);
      } else if (month === staticStrLast$2) {
        date.setMonth(11);
        return getWhatMonth$4(date, 0, staticStrLast$2);
      } else {
        date.setMonth(month);
      }
    }
  }
  return date;
}
var getWhatYear_1 = getWhatYear$4;
var getWhatMonth$3 = getWhatMonth_1;
var toStringDate$9 = toStringDate_1;
var isValidDate$9 = isValidDate_1;
function getQuarterNumber(date) {
  var month = date.getMonth();
  if (month < 3) {
    return 1;
  } else if (month < 6) {
    return 2;
  } else if (month < 9) {
    return 3;
  }
  return 4;
}
function getWhatQuarter$1(date, offset, day) {
  var currMonth, monthOffset = offset && !isNaN(offset) ? offset * 3 : 0;
  date = toStringDate$9(date);
  if (isValidDate$9(date)) {
    currMonth = (getQuarterNumber(date) - 1) * 3;
    date.setMonth(currMonth);
    return getWhatMonth$3(date, monthOffset, day);
  }
  return date;
}
var getWhatQuarter_1 = getWhatQuarter$1;
var staticStrFirst$2 = staticStrFirst_1;
var staticStrLast$1 = staticStrLast_1;
var staticParseInt = staticParseInt_1;
var helperGetDateFullYear$2 = helperGetDateFullYear_1;
var helperGetDateMonth$2 = helperGetDateMonth_1;
var helperGetDateTime$8 = helperGetDateTime_1;
var toStringDate$8 = toStringDate_1;
var isValidDate$8 = isValidDate_1;
function getWhatDay$2(date, offset, mode) {
  date = toStringDate$8(date);
  if (isValidDate$8(date) && !isNaN(offset)) {
    date.setDate(date.getDate() + staticParseInt(offset));
    if (mode === staticStrFirst$2) {
      return new Date(helperGetDateFullYear$2(date), helperGetDateMonth$2(date), date.getDate());
    } else if (mode === staticStrLast$1) {
      return new Date(helperGetDateTime$8(getWhatDay$2(date, 1, staticStrFirst$2)) - 1);
    }
  }
  return date;
}
var getWhatDay_1 = getWhatDay$2;
function helperStringUpperCase$2(str) {
  return str.toUpperCase();
}
var helperStringUpperCase_1 = helperStringUpperCase$2;
var staticDayTime$3 = staticDayTime_1;
var staticWeekTime$2 = staticDayTime$3 * 7;
var staticWeekTime_1 = staticWeekTime$2;
var setupDefaults$5 = setupDefaults_1;
var staticDayTime$2 = staticDayTime_1;
var staticWeekTime$1 = staticWeekTime_1;
var helperGetDateTime$7 = helperGetDateTime_1;
var toStringDate$7 = toStringDate_1;
var isValidDate$7 = isValidDate_1;
var isNumber$2 = isNumber_1;
function getWhatWeek$2(date, offsetWeek, offsetDay, firstDay) {
  date = toStringDate$7(date);
  if (isValidDate$7(date)) {
    var hasCustomDay = isNumber$2(offsetDay);
    var hasStartDay = isNumber$2(firstDay);
    var whatDayTime = helperGetDateTime$7(date);
    if (hasCustomDay || hasStartDay) {
      var viewStartDay = hasStartDay ? firstDay : setupDefaults$5.firstDayOfWeek;
      var currentDay = date.getDay();
      var customDay = hasCustomDay ? offsetDay : currentDay;
      if (currentDay !== customDay) {
        var offsetNum = 0;
        if (viewStartDay > currentDay) {
          offsetNum = -(7 - viewStartDay + currentDay);
        } else if (viewStartDay < currentDay) {
          offsetNum = viewStartDay - currentDay;
        }
        if (customDay > viewStartDay) {
          whatDayTime += ((customDay === 0 ? 7 : customDay) - viewStartDay + offsetNum) * staticDayTime$2;
        } else if (customDay < viewStartDay) {
          whatDayTime += (7 - viewStartDay + customDay + offsetNum) * staticDayTime$2;
        } else {
          whatDayTime += offsetNum * staticDayTime$2;
        }
      }
    }
    if (offsetWeek && !isNaN(offsetWeek)) {
      whatDayTime += offsetWeek * staticWeekTime$1;
    }
    return new Date(whatDayTime);
  }
  return date;
}
var getWhatWeek_1 = getWhatWeek$2;
var setupDefaults$4 = setupDefaults_1;
var staticWeekTime = staticWeekTime_1;
var isNumber$1 = isNumber_1;
var isValidDate$6 = isValidDate_1;
var getWhatWeek$1 = getWhatWeek_1;
var helperGetDateTime$6 = helperGetDateTime_1;
function helperCreateGetDateWeek$2(getStartDate) {
  return function(date, firstDay) {
    var viewStartDay = isNumber$1(firstDay) ? firstDay : setupDefaults$4.firstDayOfWeek;
    var targetDate = getWhatWeek$1(date, 0, viewStartDay, viewStartDay);
    if (isValidDate$6(targetDate)) {
      var targetOffsetDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      var targerStartDate = getStartDate(targetDate);
      var targetFirstDay = targerStartDate.getDay();
      if (targetFirstDay > viewStartDay) {
        targerStartDate.setDate(7 - targetFirstDay + viewStartDay + 1);
      }
      if (targetFirstDay < viewStartDay) {
        targerStartDate.setDate(viewStartDay - targetFirstDay + 1);
      }
      return Math.floor((helperGetDateTime$6(targetOffsetDate) - helperGetDateTime$6(targerStartDate)) / staticWeekTime + 1);
    }
    return NaN;
  };
}
var helperCreateGetDateWeek_1 = helperCreateGetDateWeek$2;
var helperCreateGetDateWeek$1 = helperCreateGetDateWeek_1;
var getYearWeek$2 = helperCreateGetDateWeek$1(function(targetDate) {
  return new Date(targetDate.getFullYear(), 0, 1);
});
var getYearWeek_1 = getYearWeek$2;
var helperGetDateFullYear$1 = helperGetDateFullYear_1;
var helperGetDateMonth$1 = helperGetDateMonth_1;
function helperGetYMD$1(date) {
  return new Date(helperGetDateFullYear$1(date), helperGetDateMonth$1(date), date.getDate());
}
var helperGetYMD_1 = helperGetYMD$1;
var helperGetDateTime$5 = helperGetDateTime_1;
var helperGetYMD = helperGetYMD_1;
function helperGetYMDTime$1(date) {
  return helperGetDateTime$5(helperGetYMD(date));
}
var helperGetYMDTime_1 = helperGetYMDTime$1;
var staticDayTime$1 = staticDayTime_1;
var staticStrFirst$1 = staticStrFirst_1;
var helperGetYMDTime = helperGetYMDTime_1;
var getWhatYear$3 = getWhatYear_1;
var toStringDate$6 = toStringDate_1;
var isValidDate$5 = isValidDate_1;
function getYearDay$2(date) {
  date = toStringDate$6(date);
  if (isValidDate$5(date)) {
    return Math.floor((helperGetYMDTime(date) - helperGetYMDTime(getWhatYear$3(date, 0, staticStrFirst$1))) / staticDayTime$1) + 1;
  }
  return NaN;
}
var getYearDay_1 = getYearDay$2;
var toValueString$b = toValueString_1;
var isUndefined$4 = isUndefined_1;
var helperStringRepeat$2 = helperStringRepeat_1;
function padStart$2(str, targetLength, padString) {
  var rest = toValueString$b(str);
  targetLength = targetLength >> 0;
  padString = isUndefined$4(padString) ? " " : "" + padString;
  if (rest.padStart) {
    return rest.padStart(targetLength, padString);
  }
  if (targetLength > rest.length) {
    targetLength -= rest.length;
    if (targetLength > padString.length) {
      padString += helperStringRepeat$2(padString, targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + rest;
  }
  return rest;
}
var padStart_1 = padStart$2;
var setupDefaults$3 = setupDefaults_1;
var helperStringUpperCase$1 = helperStringUpperCase_1;
var helperGetDateFullYear = helperGetDateFullYear_1;
var helperGetDateMonth = helperGetDateMonth_1;
var toStringDate$5 = toStringDate_1;
var getYearWeek$1 = getYearWeek_1;
var getYearDay$1 = getYearDay_1;
var assign$3 = assign_1;
var isValidDate$4 = isValidDate_1;
var isFunction$1 = isFunction_1;
var padStart$1 = padStart_1;
function handleCustomTemplate(date, formats2, match, value) {
  var format = formats2[match];
  if (format) {
    if (isFunction$1(format)) {
      return format(value, match, date);
    } else {
      return format[value];
    }
  }
  return value;
}
var dateFormatRE = /\[([^\]]+)]|y{2,4}|M{1,2}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|Z{1,2}|W{1,2}|D{1,3}|[aAeEq]/g;
function toDateString$2(date, format, options) {
  if (date) {
    date = toStringDate$5(date);
    if (isValidDate$4(date)) {
      var result = format || setupDefaults$3.parseDateFormat || setupDefaults$3.formatString;
      var hours = date.getHours();
      var apm = hours < 12 ? "am" : "pm";
      var formats2 = assign$3({}, setupDefaults$3.parseDateRules || setupDefaults$3.formatStringMatchs, options ? options.formats : null);
      var fy = function(match, length) {
        return ("" + helperGetDateFullYear(date)).substr(4 - length);
      };
      var fM = function(match, length) {
        return padStart$1(helperGetDateMonth(date) + 1, length, "0");
      };
      var fd = function(match, length) {
        return padStart$1(date.getDate(), length, "0");
      };
      var fH = function(match, length) {
        return padStart$1(hours, length, "0");
      };
      var fh = function(match, length) {
        return padStart$1(hours <= 12 ? hours : hours - 12, length, "0");
      };
      var fm = function(match, length) {
        return padStart$1(date.getMinutes(), length, "0");
      };
      var fs = function(match, length) {
        return padStart$1(date.getSeconds(), length, "0");
      };
      var fS = function(match, length) {
        return padStart$1(date.getMilliseconds(), length, "0");
      };
      var fZ = function(match, length) {
        var zoneHours = date.getTimezoneOffset() / 60 * -1;
        return handleCustomTemplate(date, formats2, match, (zoneHours >= 0 ? "+" : "-") + padStart$1(zoneHours, 2, "0") + (length === 1 ? ":" : "") + "00");
      };
      var fW = function(match, length) {
        return padStart$1(handleCustomTemplate(date, formats2, match, getYearWeek$1(date, (options ? options.firstDay : null) || setupDefaults$3.firstDayOfWeek)), length, "0");
      };
      var fD = function(match, length) {
        return padStart$1(handleCustomTemplate(date, formats2, match, getYearDay$1(date)), length, "0");
      };
      var parseDates = {
        yyyy: fy,
        yy: fy,
        MM: fM,
        M: fM,
        dd: fd,
        d: fd,
        HH: fH,
        H: fH,
        hh: fh,
        h: fh,
        mm: fm,
        m: fm,
        ss: fs,
        s: fs,
        SSS: fS,
        S: fS,
        ZZ: fZ,
        Z: fZ,
        WW: fW,
        W: fW,
        DDD: fD,
        D: fD,
        a: function(match) {
          return handleCustomTemplate(date, formats2, match, apm);
        },
        A: function(match) {
          return handleCustomTemplate(date, formats2, match, helperStringUpperCase$1(apm));
        },
        e: function(match) {
          return handleCustomTemplate(date, formats2, match, date.getDay());
        },
        E: function(match) {
          return handleCustomTemplate(date, formats2, match, date.getDay());
        },
        q: function(match) {
          return handleCustomTemplate(date, formats2, match, Math.floor((helperGetDateMonth(date) + 3) / 3));
        }
      };
      return result.replace(dateFormatRE, function(match, skip) {
        return skip || (parseDates[match] ? parseDates[match](match, match.length) : match);
      });
    }
    return "Invalid Date";
  }
  return "";
}
var toDateString_1 = toDateString$2;
var helperGetDateTime$4 = helperGetDateTime_1;
var helperNewDate$2 = helperNewDate_1;
var now$2 = Date.now || function() {
  return helperGetDateTime$4(helperNewDate$2());
};
var now_1 = now$2;
var helperGetDateTime$3 = helperGetDateTime_1;
var now$1 = now_1;
var toStringDate$4 = toStringDate_1;
var isDate$2 = isDate_1;
var timestamp$1 = function(str, format) {
  if (str) {
    var date = toStringDate$4(str, format);
    return isDate$2(date) ? helperGetDateTime$3(date) : date;
  }
  return now$1();
};
var timestamp_1 = timestamp$1;
var toDateString$1 = toDateString_1;
function isDateSame$1(date1, date2, format) {
  if (date1 && date2) {
    date1 = toDateString$1(date1, format);
    return date1 !== "Invalid Date" && date1 === toDateString$1(date2, format);
  }
  return false;
}
var isDateSame_1 = isDateSame$1;
var helperCreateGetDateWeek = helperCreateGetDateWeek_1;
var getMonthWeek$1 = helperCreateGetDateWeek(function(targetDate) {
  return new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
});
var getMonthWeek_1 = getMonthWeek$1;
var getWhatYear$2 = getWhatYear_1;
var toStringDate$3 = toStringDate_1;
var isValidDate$3 = isValidDate_1;
var isLeapYear$1 = isLeapYear_1;
function getDayOfYear$1(date, year) {
  date = toStringDate$3(date);
  if (isValidDate$3(date)) {
    return isLeapYear$1(getWhatYear$2(date, year)) ? 366 : 365;
  }
  return NaN;
}
var getDayOfYear_1 = getDayOfYear$1;
var staticDayTime = staticDayTime_1;
var staticStrFirst = staticStrFirst_1;
var staticStrLast = staticStrLast_1;
var helperGetDateTime$2 = helperGetDateTime_1;
var getWhatMonth$2 = getWhatMonth_1;
var toStringDate$2 = toStringDate_1;
var isValidDate$2 = isValidDate_1;
function getDayOfMonth$1(date, month) {
  date = toStringDate$2(date);
  if (isValidDate$2(date)) {
    return Math.floor((helperGetDateTime$2(getWhatMonth$2(date, month, staticStrLast)) - helperGetDateTime$2(getWhatMonth$2(date, month, staticStrFirst))) / staticDayTime) + 1;
  }
  return NaN;
}
var getDayOfMonth_1 = getDayOfMonth$1;
var setupDefaults$2 = setupDefaults_1;
var helperGetDateTime$1 = helperGetDateTime_1;
var helperNewDate$1 = helperNewDate_1;
var toStringDate$1 = toStringDate_1;
var isValidDate$1 = isValidDate_1;
function getDateDiff$1(startDate, endDate, rules) {
  var startTime, endTime, item, diffTime, rule, len, index;
  var result = { done: false, time: 0 };
  startDate = toStringDate$1(startDate);
  endDate = endDate ? toStringDate$1(endDate) : helperNewDate$1();
  if (isValidDate$1(startDate) && isValidDate$1(endDate)) {
    startTime = helperGetDateTime$1(startDate);
    endTime = helperGetDateTime$1(endDate);
    if (startTime < endTime) {
      diffTime = result.time = endTime - startTime;
      rule = rules && rules.length > 0 ? rules : setupDefaults$2.dateDiffRules;
      result.done = true;
      for (index = 0, len = rule.length; index < len; index++) {
        item = rule[index];
        if (diffTime >= item[1]) {
          if (index === len - 1) {
            result[item[0]] = diffTime || 0;
          } else {
            result[item[0]] = Math.floor(diffTime / item[1]);
            diffTime -= result[item[0]] * item[1];
          }
        } else {
          result[item[0]] = 0;
        }
      }
    }
  }
  return result;
}
var getDateDiff_1 = getDateDiff$1;
var toValueString$a = toValueString_1;
var isUndefined$3 = isUndefined_1;
var helperStringRepeat$1 = helperStringRepeat_1;
function padEnd$1(str, targetLength, padString) {
  var rest = toValueString$a(str);
  targetLength = targetLength >> 0;
  padString = isUndefined$3(padString) ? " " : "" + padString;
  if (rest.padEnd) {
    return rest.padEnd(targetLength, padString);
  }
  if (targetLength > rest.length) {
    targetLength -= rest.length;
    if (targetLength > padString.length) {
      padString += helperStringRepeat$1(padString, targetLength / padString.length);
    }
    return rest + padString.slice(0, targetLength);
  }
  return rest;
}
var padEnd_1 = padEnd$1;
var toValueString$9 = toValueString_1;
var helperStringRepeat = helperStringRepeat_1;
function repeat$1(str, count) {
  return helperStringRepeat(toValueString$9(str), count);
}
var repeat_1 = repeat$1;
var toValueString$8 = toValueString_1;
function trimRight$2(str) {
  return str && str.trimRight ? str.trimRight() : toValueString$8(str).replace(/[\s\uFEFF\xA0]+$/g, "");
}
var trimRight_1 = trimRight$2;
var toValueString$7 = toValueString_1;
function trimLeft$2(str) {
  return str && str.trimLeft ? str.trimLeft() : toValueString$7(str).replace(/^[\s\uFEFF\xA0]+/g, "");
}
var trimLeft_1 = trimLeft$2;
var trimRight$1 = trimRight_1;
var trimLeft$1 = trimLeft_1;
function trim$2(str) {
  return str && str.trim ? str.trim() : trimRight$1(trimLeft$1(str));
}
var trim_1 = trim$2;
var staticEscapeMap$2 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
var staticEscapeMap_1 = staticEscapeMap$2;
var toValueString$6 = toValueString_1;
var keys$2 = keys_1;
function helperFormatEscaper$2(dataMap) {
  var replaceRegexp = new RegExp("(?:" + keys$2(dataMap).join("|") + ")", "g");
  return function(str) {
    return toValueString$6(str).replace(replaceRegexp, function(match) {
      return dataMap[match];
    });
  };
}
var helperFormatEscaper_1 = helperFormatEscaper$2;
var staticEscapeMap$1 = staticEscapeMap_1;
var helperFormatEscaper$1 = helperFormatEscaper_1;
var escape$1 = helperFormatEscaper$1(staticEscapeMap$1);
var _escape = escape$1;
var staticEscapeMap = staticEscapeMap_1;
var helperFormatEscaper = helperFormatEscaper_1;
var each$2 = each_1;
var unescapeMap = {};
each$2(staticEscapeMap, function(item, key) {
  unescapeMap[staticEscapeMap[key]] = key;
});
var unescape$1 = helperFormatEscaper(unescapeMap);
var _unescape = unescape$1;
function helperStringSubstring$2(str, start, end) {
  return str.substring(start, end);
}
var helperStringSubstring_1 = helperStringSubstring$2;
function helperStringLowerCase$2(str) {
  return str.toLowerCase();
}
var helperStringLowerCase_1 = helperStringLowerCase$2;
var toValueString$5 = toValueString_1;
var helperStringSubstring$1 = helperStringSubstring_1;
var helperStringUpperCase = helperStringUpperCase_1;
var helperStringLowerCase$1 = helperStringLowerCase_1;
var camelCacheMaps = {};
function camelCase$1(str) {
  str = toValueString$5(str);
  if (camelCacheMaps[str]) {
    return camelCacheMaps[str];
  }
  var strLen = str.length;
  var rest = str.replace(/([-]+)/g, function(text, flag, index) {
    return index && index + flag.length < strLen ? "-" : "";
  });
  strLen = rest.length;
  rest = rest.replace(/([A-Z]+)/g, function(text, upper, index) {
    var upperLen = upper.length;
    upper = helperStringLowerCase$1(upper);
    if (index) {
      if (upperLen > 2 && index + upperLen < strLen) {
        return helperStringUpperCase(helperStringSubstring$1(upper, 0, 1)) + helperStringSubstring$1(upper, 1, upperLen - 1) + helperStringUpperCase(helperStringSubstring$1(upper, upperLen - 1, upperLen));
      }
      return helperStringUpperCase(helperStringSubstring$1(upper, 0, 1)) + helperStringSubstring$1(upper, 1, upperLen);
    } else {
      if (upperLen > 1 && index + upperLen < strLen) {
        return helperStringSubstring$1(upper, 0, upperLen - 1) + helperStringUpperCase(helperStringSubstring$1(upper, upperLen - 1, upperLen));
      }
    }
    return upper;
  }).replace(/(-[a-zA-Z])/g, function(text, upper) {
    return helperStringUpperCase(helperStringSubstring$1(upper, 1, upper.length));
  });
  camelCacheMaps[str] = rest;
  return rest;
}
var camelCase_1 = camelCase$1;
var toValueString$4 = toValueString_1;
var helperStringSubstring = helperStringSubstring_1;
var helperStringLowerCase = helperStringLowerCase_1;
var kebabCacheMaps = {};
function kebabCase$1(str) {
  str = toValueString$4(str);
  if (kebabCacheMaps[str]) {
    return kebabCacheMaps[str];
  }
  if (/^[A-Z]+$/.test(str)) {
    return helperStringLowerCase(str);
  }
  var rest = str.replace(/^([a-z])([A-Z]+)([a-z]+)$/, function(text, prevLower, upper, nextLower) {
    var upperLen = upper.length;
    if (upperLen > 1) {
      return prevLower + "-" + helperStringLowerCase(helperStringSubstring(upper, 0, upperLen - 1)) + "-" + helperStringLowerCase(helperStringSubstring(upper, upperLen - 1, upperLen)) + nextLower;
    }
    return helperStringLowerCase(prevLower + "-" + upper + nextLower);
  }).replace(/^([A-Z]+)([a-z]+)?$/, function(text, upper, nextLower) {
    var upperLen = upper.length;
    return helperStringLowerCase(helperStringSubstring(upper, 0, upperLen - 1) + "-" + helperStringSubstring(upper, upperLen - 1, upperLen) + (nextLower || ""));
  }).replace(/([a-z]?)([A-Z]+)([a-z]?)/g, function(text, prevLower, upper, nextLower, index) {
    var upperLen = upper.length;
    if (upperLen > 1) {
      if (prevLower) {
        prevLower += "-";
      }
      if (nextLower) {
        return (prevLower || "") + helperStringLowerCase(helperStringSubstring(upper, 0, upperLen - 1)) + "-" + helperStringLowerCase(helperStringSubstring(upper, upperLen - 1, upperLen)) + nextLower;
      }
    }
    return (prevLower || "") + (index ? "-" : "") + helperStringLowerCase(upper) + (nextLower || "");
  });
  rest = rest.replace(/([-]+)/g, function(text, flag, index) {
    return index && index + flag.length < rest.length ? "-" : "";
  });
  kebabCacheMaps[str] = rest;
  return rest;
}
var kebabCase_1 = kebabCase$1;
var toValueString$3 = toValueString_1;
function startsWith$1(str, val, startIndex) {
  var rest = toValueString$3(str);
  return (arguments.length === 1 ? rest : rest.substring(startIndex)).indexOf(val) === 0;
}
var startsWith_1 = startsWith$1;
var toValueString$2 = toValueString_1;
function endsWith$1(str, val, startIndex) {
  var rest = toValueString$2(str);
  var argsLen = arguments.length;
  return argsLen > 1 && (argsLen > 2 ? rest.substring(0, startIndex).indexOf(val) === startIndex - 1 : rest.indexOf(val) === rest.length - 1);
}
var endsWith_1 = endsWith$1;
var setupDefaults$1 = setupDefaults_1;
var toValueString$1 = toValueString_1;
var trim$1 = trim_1;
var get$1 = get_1;
function template$2(str, args, options) {
  return toValueString$1(str).replace((options || setupDefaults$1).tmplRE || /\{{2}([.\w[\]\s]+)\}{2}/g, function(match, key) {
    return get$1(args, trim$1(key));
  });
}
var template_1 = template$2;
var template$1 = template_1;
function toFormatString$1(str, obj) {
  return template$1(str, obj, { tmplRE: /\{([.\w[\]\s]+)\}/g });
}
var toFormatString_1 = toFormatString$1;
function noop$1() {
}
var noop_1 = noop$1;
var slice$5 = slice_1;
function bind$1(callback, context) {
  var args = slice$5(arguments, 2);
  return function() {
    return callback.apply(context, slice$5(arguments).concat(args));
  };
}
var bind_1 = bind$1;
var slice$4 = slice_1;
function once$1(callback, context) {
  var done = false;
  var rest = null;
  var args = slice$4(arguments, 2);
  return function() {
    if (done) {
      return rest;
    }
    rest = callback.apply(context, slice$4(arguments).concat(args));
    done = true;
    return rest;
  };
}
var once_1 = once$1;
var slice$3 = slice_1;
function after$1(count, callback, context) {
  var runCount = 0;
  var rests = [];
  return function() {
    var args = arguments;
    runCount++;
    if (runCount <= count) {
      rests.push(args[0]);
    }
    if (runCount >= count) {
      callback.apply(context, [rests].concat(slice$3(args)));
    }
  };
}
var after_1 = after$1;
var slice$2 = slice_1;
function before$1(count, callback, context) {
  var runCount = 0;
  var rests = [];
  context = context || this;
  return function() {
    var args = arguments;
    runCount++;
    if (runCount < count) {
      rests.push(args[0]);
      callback.apply(context, [rests].concat(slice$2(args)));
    }
  };
}
var before_1 = before$1;
function throttle$1(callback, wait, options) {
  var args, context;
  var opts = options || {};
  var runFlag = false;
  var timeout = 0;
  var optLeading = "leading" in opts ? opts.leading : true;
  var optTrailing = "trailing" in opts ? opts.trailing : false;
  var runFn = function() {
    {
      runFlag = true;
      callback.apply(context, args);
      timeout = setTimeout(endFn, wait);
    }
  };
  var endFn = function() {
    timeout = 0;
    if (!runFlag && optTrailing === true) {
      runFn();
    }
  };
  var cancelFn = function() {
    var rest = timeout !== 0;
    clearTimeout(timeout);
    args = null;
    context = null;
    runFlag = false;
    timeout = 0;
    return rest;
  };
  var throttled = function() {
    args = arguments;
    context = this;
    runFlag = false;
    if (timeout === 0) {
      if (optLeading === true) {
        runFn();
      } else if (optTrailing === true) {
        timeout = setTimeout(endFn, wait);
      }
    }
  };
  throttled.cancel = cancelFn;
  return throttled;
}
var throttle_1 = throttle$1;
function debounce$1(callback, wait, options) {
  var args, context;
  var opts = options || {};
  var runFlag = false;
  var timeout = 0;
  var isLeading = typeof options === "boolean";
  var optLeading = "leading" in opts ? opts.leading : isLeading;
  var optTrailing = "trailing" in opts ? opts.trailing : !isLeading;
  var runFn = function() {
    {
      runFlag = true;
      timeout = 0;
      callback.apply(context, args);
    }
  };
  var endFn = function() {
    if (optLeading === true) {
      timeout = 0;
    }
    if (!runFlag && optTrailing === true) {
      runFn();
    }
  };
  var cancelFn = function() {
    var rest = timeout !== 0;
    clearTimeout(timeout);
    args = null;
    context = null;
    timeout = 0;
    return rest;
  };
  var debounced = function() {
    runFlag = false;
    args = arguments;
    context = this;
    if (timeout === 0) {
      if (optLeading === true) {
        runFn();
      }
    } else {
      clearTimeout(timeout);
    }
    timeout = setTimeout(endFn, wait);
  };
  debounced.cancel = cancelFn;
  return debounced;
}
var debounce_1 = debounce$1;
var slice$1 = slice_1;
function delay$1(callback, wait) {
  var args = slice$1(arguments, 2);
  var context = this;
  return setTimeout(function() {
    callback.apply(context, args);
  }, wait);
}
var delay_1 = delay$1;
var staticDecodeURIComponent$2 = decodeURIComponent;
var staticDecodeURIComponent_1 = staticDecodeURIComponent$2;
var staticDecodeURIComponent$1 = staticDecodeURIComponent_1;
var arrayEach$3 = arrayEach_1;
var isString$1 = isString_1;
function unserialize$2(str) {
  var items;
  var result = {};
  if (str && isString$1(str)) {
    arrayEach$3(str.split("&"), function(param) {
      items = param.split("=");
      result[staticDecodeURIComponent$1(items[0])] = staticDecodeURIComponent$1(items[1] || "");
    });
  }
  return result;
}
var unserialize_1 = unserialize$2;
var staticEncodeURIComponent$2 = encodeURIComponent;
var staticEncodeURIComponent_1 = staticEncodeURIComponent$2;
var staticEncodeURIComponent$1 = staticEncodeURIComponent_1;
var each$1 = each_1;
var isArray$2 = isArray_1;
var isNull$1 = isNull_1;
var isUndefined$2 = isUndefined_1;
var isPlainObject$1 = isPlainObject_1;
function stringifyParams(resultVal, resultKey, isArr) {
  var _arr;
  var result = [];
  each$1(resultVal, function(item, key) {
    _arr = isArray$2(item);
    if (isPlainObject$1(item) || _arr) {
      result = result.concat(stringifyParams(item, resultKey + "[" + key + "]", _arr));
    } else {
      result.push(staticEncodeURIComponent$1(resultKey + "[" + (isArr ? "" : key) + "]") + "=" + staticEncodeURIComponent$1(isNull$1(item) ? "" : item));
    }
  });
  return result;
}
function serialize$1(query) {
  var _arr;
  var params = [];
  each$1(query, function(item, key) {
    if (!isUndefined$2(item)) {
      _arr = isArray$2(item);
      if (isPlainObject$1(item) || _arr) {
        params = params.concat(stringifyParams(item, key, _arr));
      } else {
        params.push(staticEncodeURIComponent$1(key) + "=" + staticEncodeURIComponent$1(isNull$1(item) ? "" : item));
      }
    }
  });
  return params.join("&").replace(/%20/g, "+");
}
var serialize_1 = serialize$1;
var staticStrUndefined$1 = staticStrUndefined_1;
var staticLocation$4 = typeof location === staticStrUndefined$1 ? 0 : location;
var staticLocation_1 = staticLocation$4;
var staticLocation$3 = staticLocation_1;
function helperGetLocatOrigin$2() {
  return staticLocation$3 ? staticLocation$3.origin || staticLocation$3.protocol + "//" + staticLocation$3.host : "";
}
var helperGetLocatOrigin_1 = helperGetLocatOrigin$2;
var staticLocation$2 = staticLocation_1;
var unserialize$1 = unserialize_1;
var helperGetLocatOrigin$1 = helperGetLocatOrigin_1;
function parseURLQuery(uri) {
  return unserialize$1(uri.split("?")[1] || "");
}
function parseUrl$2(url) {
  var hashs, portText, searchs, parsed;
  var href = "" + url;
  if (href.indexOf("//") === 0) {
    href = (staticLocation$2 ? staticLocation$2.protocol : "") + href;
  } else if (href.indexOf("/") === 0) {
    href = helperGetLocatOrigin$1() + href;
  }
  searchs = href.replace(/#.*/, "").match(/(\?.*)/);
  parsed = {
    href,
    hash: "",
    host: "",
    hostname: "",
    protocol: "",
    port: "",
    search: searchs && searchs[1] && searchs[1].length > 1 ? searchs[1] : ""
  };
  parsed.path = href.replace(/^([a-z0-9.+-]*:)\/\//, function(text, protocol) {
    parsed.protocol = protocol;
    return "";
  }).replace(/^([a-z0-9.+-]*)(:\d+)?\/?/, function(text, hostname, port) {
    portText = port || "";
    parsed.port = portText.replace(":", "");
    parsed.hostname = hostname;
    parsed.host = hostname + portText;
    return "/";
  }).replace(/(#.*)/, function(text, hash) {
    parsed.hash = hash.length > 1 ? hash : "";
    return "";
  });
  hashs = parsed.hash.match(/#((.*)\?|(.*))/);
  parsed.pathname = parsed.path.replace(/(\?|#.*).*/, "");
  parsed.origin = parsed.protocol + "//" + parsed.host;
  parsed.hashKey = hashs ? hashs[2] || hashs[1] || "" : "";
  parsed.hashQuery = parseURLQuery(parsed.hash);
  parsed.searchQuery = parseURLQuery(parsed.search);
  return parsed;
}
var parseUrl_1 = parseUrl$2;
var staticLocation$1 = staticLocation_1;
var helperGetLocatOrigin = helperGetLocatOrigin_1;
var lastIndexOf$1 = lastIndexOf_1;
function getBaseURL$1() {
  if (staticLocation$1) {
    var pathname = staticLocation$1.pathname;
    var lastIndex = lastIndexOf$1(pathname, "/") + 1;
    return helperGetLocatOrigin() + (lastIndex === pathname.length ? pathname : pathname.substring(0, lastIndex));
  }
  return "";
}
var getBaseURL_1 = getBaseURL$1;
var staticLocation = staticLocation_1;
var parseUrl$1 = parseUrl_1;
function locat$1() {
  return staticLocation ? parseUrl$1(staticLocation.href) : {};
}
var locat_1 = locat$1;
var setupDefaults = setupDefaults_1;
var staticDocument$1 = staticDocument_1;
var staticDecodeURIComponent = staticDecodeURIComponent_1;
var staticEncodeURIComponent = staticEncodeURIComponent_1;
var isArray$1 = isArray_1;
var isObject$1 = isObject_1;
var isDate$1 = isDate_1;
var isUndefined$1 = isUndefined_1;
var includes$1 = includes_1;
var keys$1 = keys_1;
var assign$2 = assign_1;
var arrayEach$2 = arrayEach_1;
var helperNewDate = helperNewDate_1;
var helperGetDateTime = helperGetDateTime_1;
var getWhatYear$1 = getWhatYear_1;
var getWhatMonth$1 = getWhatMonth_1;
var getWhatDay$1 = getWhatDay_1;
function toCookieUnitTime(unit, expires) {
  var num = parseFloat(expires);
  var nowdate = helperNewDate();
  var time = helperGetDateTime(nowdate);
  switch (unit) {
    case "y":
      return helperGetDateTime(getWhatYear$1(nowdate, num));
    case "M":
      return helperGetDateTime(getWhatMonth$1(nowdate, num));
    case "d":
      return helperGetDateTime(getWhatDay$1(nowdate, num));
    case "h":
    case "H":
      return time + num * 60 * 60 * 1e3;
    case "m":
      return time + num * 60 * 1e3;
    case "s":
      return time + num * 1e3;
  }
  return time;
}
function toCookieUTCString(date) {
  return (isDate$1(date) ? date : new Date(date)).toUTCString();
}
function cookie$1(name, value, options) {
  if (staticDocument$1) {
    var opts, expires, values2, result, cookies, keyIndex;
    var inserts = [];
    var args = arguments;
    if (isArray$1(name)) {
      inserts = name;
    } else if (args.length > 1) {
      inserts = [assign$2({ name, value }, options)];
    } else if (isObject$1(name)) {
      inserts = [name];
    }
    if (inserts.length > 0) {
      arrayEach$2(inserts, function(obj) {
        opts = assign$2({}, setupDefaults.cookies, obj);
        values2 = [];
        if (opts.name) {
          expires = opts.expires;
          values2.push(staticEncodeURIComponent(opts.name) + "=" + staticEncodeURIComponent(isObject$1(opts.value) ? JSON.stringify(opts.value) : opts.value));
          if (expires) {
            if (isNaN(expires)) {
              expires = expires.replace(/^([0-9]+)(y|M|d|H|h|m|s)$/, function(text, num, unit) {
                return toCookieUTCString(toCookieUnitTime(unit, num));
              });
            } else if (/^[0-9]{11,13}$/.test(expires) || isDate$1(expires)) {
              expires = toCookieUTCString(expires);
            } else {
              expires = toCookieUTCString(toCookieUnitTime("d", expires));
            }
            opts.expires = expires;
          }
          arrayEach$2(["expires", "path", "domain", "secure"], function(key) {
            if (!isUndefined$1(opts[key])) {
              values2.push(opts[key] && key === "secure" ? key : key + "=" + opts[key]);
            }
          });
        }
        staticDocument$1.cookie = values2.join("; ");
      });
      return true;
    } else {
      result = {};
      cookies = staticDocument$1.cookie;
      if (cookies) {
        arrayEach$2(cookies.split("; "), function(val) {
          keyIndex = val.indexOf("=");
          result[staticDecodeURIComponent(val.substring(0, keyIndex))] = staticDecodeURIComponent(val.substring(keyIndex + 1) || "");
        });
      }
      return args.length === 1 ? result[name] : result;
    }
  }
  return false;
}
function hasCookieItem(value) {
  return includes$1(cookieKeys(), value);
}
function getCookieItem(name) {
  return cookie$1(name);
}
function setCookieItem(name, value, options) {
  cookie$1(name, value, options);
  return cookie$1;
}
function removeCookieItem(name, options) {
  cookie$1(name, "", assign$2({ expires: -1 }, setupDefaults.cookies, options));
}
function cookieKeys() {
  return keys$1(cookie$1());
}
function cookieJson() {
  return cookie$1();
}
assign$2(cookie$1, {
  has: hasCookieItem,
  set: setCookieItem,
  setItem: setCookieItem,
  get: getCookieItem,
  getItem: getCookieItem,
  remove: removeCookieItem,
  removeItem: removeCookieItem,
  keys: cookieKeys,
  getJSON: cookieJson
});
var cookie_1 = cookie$1;
var staticStrUndefined = staticStrUndefined_1;
var staticDocument = staticDocument_1;
var staticWindow = staticWindow_1;
var assign$1 = assign_1;
var arrayEach$1 = arrayEach_1;
function isBrowseStorage(storage) {
  try {
    var testKey = "__xe_t";
    storage.setItem(testKey, 1);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}
function isBrowseType(type) {
  return navigator.userAgent.indexOf(type) > -1;
}
function browse$2() {
  var $body, isChrome, isEdge;
  var isMobile = false;
  var result = {
    isNode: false,
    isMobile,
    isPC: false,
    isDoc: !!staticDocument
  };
  if (!staticWindow && typeof process !== staticStrUndefined) {
    result.isNode = true;
  } else {
    isEdge = isBrowseType("Edge");
    isChrome = isBrowseType("Chrome");
    isMobile = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent);
    if (result.isDoc) {
      $body = staticDocument.body || staticDocument.documentElement;
      arrayEach$1(["webkit", "khtml", "moz", "ms", "o"], function(core) {
        result["-" + core] = !!$body[core + "MatchesSelector"];
      });
    }
    assign$1(result, {
      edge: isEdge,
      firefox: isBrowseType("Firefox"),
      msie: !isEdge && result["-ms"],
      safari: !isChrome && !isEdge && isBrowseType("Safari"),
      isMobile,
      isPC: !isMobile,
      isLocalStorage: isBrowseStorage(staticWindow.localStorage),
      isSessionStorage: isBrowseStorage(staticWindow.sessionStorage)
    });
  }
  return result;
}
var browse_1 = browse$2;
var XEUtils = ctor;
var assign = assign_1;
var objectEach = objectEach_1;
var lastObjectEach = lastObjectEach_1;
var objectMap = objectMap_1;
var merge = merge_1;
var map = map_1;
var some = some_1;
var every = every_1;
var includeArrays = includeArrays_1;
var arrayEach = arrayEach_1;
var lastArrayEach = lastArrayEach_1;
var uniq = uniq_1;
var union = union_1;
var toArray = toArray_1;
var sortBy = sortBy_1;
var orderBy = orderBy_1;
var shuffle = shuffle_1;
var sample = sample_1;
var slice = slice_1;
var filter = filter_1;
var findKey = findKey_1;
var includes = includes_1;
var find = find_1;
var findLast = findLast_1;
var reduce = reduce_1;
var copyWithin = copyWithin_1;
var chunk = chunk_1;
var zip = zip_1;
var unzip = unzip_1;
var zipObject = zipObject_1;
var flatten = flatten_1;
var pluck = pluck_1;
var invoke = invoke_1;
var toArrayTree = toArrayTree_1;
var toTreeArray = toTreeArray_1;
var findTree = findTree_1;
var eachTree = eachTree_1;
var mapTree = mapTree_1;
var filterTree = filterTree_1;
var searchTree = searchTree_1;
var arrayIndexOf = arrayIndexOf_1;
var arrayLastIndexOf = arrayLastIndexOf_1;
var hasOwnProp = hasOwnProp_1;
var isArray = isArray_1;
var isNull = isNull_1;
var isNumberNaN = _isNaN;
var isUndefined = isUndefined_1;
var isFunction = isFunction_1;
var isObject = isObject_1;
var isString = isString_1;
var isPlainObject = isPlainObject_1;
var isLeapYear = isLeapYear_1;
var isDate = isDate_1;
var eqNull = eqNull_1;
var each = each_1;
var forOf = forOf_1;
var lastForOf = lastForOf_1;
var indexOf = indexOf_1;
var lastIndexOf = lastIndexOf_1;
var keys = keys_1;
var values = values_1;
var clone = clone_1;
var getSize = getSize_1;
var lastEach = lastEach_1;
var remove = remove_1;
var clear = clear_1;
var isNumberFinite = _isFinite;
var isFloat = isFloat_1;
var isInteger = isInteger_1;
var isBoolean = isBoolean_1;
var isNumber = isNumber_1;
var isRegExp = isRegExp_1;
var isError = isError_1;
var isTypeError = isTypeError_1;
var isEmpty = isEmpty_1;
var isSymbol = isSymbol_1;
var isArguments = isArguments_1;
var isElement = isElement_1;
var isDocument = isDocument_1;
var isWindow = isWindow_1;
var isFormData = isFormData_1;
var isMap = isMap_1;
var isWeakMap = isWeakMap_1;
var isSet = isSet_1;
var isWeakSet = isWeakSet_1;
var isMatch = isMatch_1;
var isEqual = isEqual_1;
var isEqualWith = isEqualWith_1;
var getType = getType_1;
var uniqueId = uniqueId_1;
var findIndexOf = findIndexOf_1;
var findLastIndexOf = findLastIndexOf_1;
var toStringJSON = toStringJSON_1;
var toJSONString = toJSONString_1;
var entries = entries_1;
var pick = pick_1;
var omit = omit_1;
var first = first_1;
var last = last_1;
var has = has_1;
var get = get_1;
var set = set_1;
var groupBy = groupBy_1;
var countBy = countBy_1;
var range = range_1;
var destructuring = destructuring_1;
var random = random_1;
var max = max_1;
var min = min_1;
var commafy = commafy_1;
var round = round_1;
var ceil = ceil_1;
var floor = floor_1;
var toFixed = toFixed_1;
var toInteger = toInteger_1;
var toNumber = toNumber_1;
var toNumberString = toNumberString_1;
var add = add_1;
var subtract = subtract_1;
var multiply = multiply_1;
var divide = divide_1;
var sum = sum_1;
var mean = mean_1;
var getWhatYear = getWhatYear_1;
var getWhatQuarter = getWhatQuarter_1;
var getWhatMonth = getWhatMonth_1;
var getWhatDay = getWhatDay_1;
var toStringDate = toStringDate_1;
var toDateString = toDateString_1;
var now = now_1;
var timestamp = timestamp_1;
var isValidDate = isValidDate_1;
var isDateSame = isDateSame_1;
var getWhatWeek = getWhatWeek_1;
var getYearDay = getYearDay_1;
var getYearWeek = getYearWeek_1;
var getMonthWeek = getMonthWeek_1;
var getDayOfYear = getDayOfYear_1;
var getDayOfMonth = getDayOfMonth_1;
var getDateDiff = getDateDiff_1;
var padEnd = padEnd_1;
var padStart = padStart_1;
var repeat = repeat_1;
var trim = trim_1;
var trimRight = trimRight_1;
var trimLeft = trimLeft_1;
var escape = _escape;
var unescape = _unescape;
var camelCase = camelCase_1;
var kebabCase = kebabCase_1;
var startsWith = startsWith_1;
var endsWith = endsWith_1;
var template = template_1;
var toFormatString = toFormatString_1;
var toValueString = toValueString_1;
var noop = noop_1;
var property = property_1;
var bind = bind_1;
var once = once_1;
var after = after_1;
var before = before_1;
var throttle = throttle_1;
var debounce = debounce_1;
var delay = delay_1;
var unserialize = unserialize_1;
var serialize = serialize_1;
var parseUrl = parseUrl_1;
var getBaseURL = getBaseURL_1;
var locat = locat_1;
var cookie = cookie_1;
var browse$1 = browse_1;
assign(XEUtils, {
  // object
  assign,
  objectEach,
  lastObjectEach,
  objectMap,
  merge,
  // array
  uniq,
  union,
  sortBy,
  orderBy,
  shuffle,
  sample,
  some,
  every,
  slice,
  filter,
  find,
  findLast,
  findKey,
  includes,
  arrayIndexOf,
  arrayLastIndexOf,
  map,
  reduce,
  copyWithin,
  chunk,
  zip,
  unzip,
  zipObject,
  flatten,
  toArray,
  includeArrays,
  pluck,
  invoke,
  arrayEach,
  lastArrayEach,
  toArrayTree,
  toTreeArray,
  findTree,
  eachTree,
  mapTree,
  filterTree,
  searchTree,
  // base
  hasOwnProp,
  eqNull,
  isNaN: isNumberNaN,
  isFinite: isNumberFinite,
  isUndefined,
  isArray,
  isFloat,
  isInteger,
  isFunction,
  isBoolean,
  isString,
  isNumber,
  isRegExp,
  isObject,
  isPlainObject,
  isDate,
  isError,
  isTypeError,
  isEmpty,
  isNull,
  isSymbol,
  isArguments,
  isElement,
  isDocument,
  isWindow,
  isFormData,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isLeapYear,
  isMatch,
  isEqual,
  isEqualWith,
  getType,
  uniqueId,
  getSize,
  indexOf,
  lastIndexOf,
  findIndexOf,
  findLastIndexOf,
  toStringJSON,
  toJSONString,
  keys,
  values,
  entries,
  pick,
  omit,
  first,
  last,
  each,
  forOf,
  lastForOf,
  lastEach,
  has,
  get,
  set,
  groupBy,
  countBy,
  clone,
  clear,
  remove,
  range,
  destructuring,
  // number
  random,
  min,
  max,
  commafy,
  round,
  ceil,
  floor,
  toFixed,
  toNumber,
  toNumberString,
  toInteger,
  add,
  subtract,
  multiply,
  divide,
  sum,
  mean,
  // date
  now,
  timestamp,
  isValidDate,
  isDateSame,
  toStringDate,
  toDateString,
  getWhatYear,
  getWhatQuarter,
  getWhatMonth,
  getWhatWeek,
  getWhatDay,
  getYearDay,
  getYearWeek,
  getMonthWeek,
  getDayOfYear,
  getDayOfMonth,
  getDateDiff,
  // string
  trim,
  trimLeft,
  trimRight,
  escape,
  unescape,
  camelCase,
  kebabCase,
  repeat,
  padStart,
  padEnd,
  startsWith,
  endsWith,
  template,
  toFormatString,
  toString: toValueString,
  toValueString,
  // function
  noop,
  property,
  bind,
  once,
  after,
  before,
  throttle,
  debounce,
  delay,
  // url
  unserialize,
  serialize,
  parseUrl,
  // web
  getBaseURL,
  locat,
  browse: browse$1,
  cookie
});
var xeUtils = XEUtils;
const XEUtils$1 = /* @__PURE__ */ getDefaultExportFromCjs(xeUtils);
var iconPrefix = "vxe-icon-";
var GlobalConfig = {
  size: null,
  zIndex: 999,
  version: 0,
  // resizeInterval: 500,
  emptyCell: "　",
  // loadingText: null, // 自定义loading提示内容，如果为null则不显示文本
  table: {
    fit: true,
    showHeader: true,
    animat: true,
    delayHover: 250,
    autoResize: true,
    // keepSource: false,
    // showOverflow: null,
    // showHeaderOverflow: null,
    // showFooterOverflow: null,
    // resizeInterval: 500,
    // size: null,
    // zIndex: null,
    // stripe: false,
    // border: false,
    // round: false,
    // emptyText: '暂无数据',
    // emptyRender: {
    //   name: ''
    // },
    // rowConfig: {
    //   keyField: '_X_ROW_KEY' // 行数据的唯一主键字段名
    // },
    radioConfig: {
      // trigger: 'default'
      strict: true
    },
    checkboxConfig: {
      // trigger: 'default',
      strict: true
    },
    tooltipConfig: {
      enterable: true
    },
    validConfig: {
      showMessage: true,
      message: "default"
    },
    // menuConfig: {
    //   visibleMethod () {}
    // },
    // customConfig: {
    //  storage: false,
    //  checkMethod () {}
    // },
    sortConfig: {
      // remote: false,
      // trigger: 'default',
      // orders: ['asc', 'desc', null],
      // sortMethod: null,
      showIcon: true
    },
    filterConfig: {
      // remote: false,
      // filterMethod: null,
      showIcon: true
    },
    treeConfig: {
      rowField: "id",
      parentField: "parentId",
      children: "children",
      hasChild: "hasChild",
      mapChildren: "_X_ROW_CHILD",
      indent: 20,
      showIcon: true
    },
    expandConfig: {
      // trigger: 'default',
      showIcon: true
    },
    editConfig: {
      // mode: 'cell',
      showIcon: true,
      showAsterisk: true
    },
    importConfig: {
      modes: ["insert", "covering"]
    },
    exportConfig: {
      modes: ["current", "selected"]
    },
    printConfig: {
      modes: ["current", "selected"]
    },
    mouseConfig: {
      extension: true
    },
    keyboardConfig: {
      isEsc: true
    },
    areaConfig: {
      selectCellByHeader: true
    },
    clipConfig: {
      isCopy: true,
      isCut: true,
      isPaste: true
    },
    fnrConfig: {
      isFind: true,
      isReplace: true
    },
    scrollX: {
      enabled: true,
      gt: 60
      // oSize: 0
    },
    scrollY: {
      enabled: true,
      gt: 100
      // oSize: 0
    }
  },
  export: {
    types: {}
  },
  icon: {
    // loading
    LOADING: iconPrefix + "spinner roll vxe-loading--default-icon",
    // table
    TABLE_SORT_ASC: iconPrefix + "caret-up",
    TABLE_SORT_DESC: iconPrefix + "caret-down",
    TABLE_FILTER_NONE: iconPrefix + "funnel",
    TABLE_FILTER_MATCH: iconPrefix + "funnel",
    TABLE_EDIT: iconPrefix + "edit",
    TABLE_HELP: iconPrefix + "question-circle-fill",
    TABLE_TREE_LOADED: iconPrefix + "spinner roll",
    TABLE_TREE_OPEN: iconPrefix + "caret-right rotate90",
    TABLE_TREE_CLOSE: iconPrefix + "caret-right",
    TABLE_EXPAND_LOADED: iconPrefix + "spinner roll",
    TABLE_EXPAND_OPEN: iconPrefix + "arrow-right rotate90",
    TABLE_EXPAND_CLOSE: iconPrefix + "arrow-right",
    TABLE_CHECKBOX_CHECKED: iconPrefix + "checkbox-checked",
    TABLE_CHECKBOX_UNCHECKED: iconPrefix + "checkbox-unchecked",
    TABLE_CHECKBOX_INDETERMINATE: iconPrefix + "checkbox-indeterminate",
    TABLE_RADIO_CHECKED: iconPrefix + "radio-checked",
    TABLE_RADIO_UNCHECKED: iconPrefix + "radio-unchecked",
    // button
    BUTTON_DROPDOWN: iconPrefix + "arrow-down",
    BUTTON_LOADING: iconPrefix + "spinner roll",
    // select
    SELECT_LOADED: iconPrefix + "spinner roll",
    SELECT_OPEN: iconPrefix + "caret-down rotate180",
    SELECT_CLOSE: iconPrefix + "caret-down",
    // pager
    PAGER_JUMP_PREV: iconPrefix + "arrow-double-left",
    PAGER_JUMP_NEXT: iconPrefix + "arrow-double-right",
    PAGER_PREV_PAGE: iconPrefix + "arrow-left",
    PAGER_NEXT_PAGE: iconPrefix + "arrow-right",
    PAGER_JUMP_MORE: iconPrefix + "ellipsis-h",
    // input
    INPUT_CLEAR: iconPrefix + "error-circle-fill",
    INPUT_PWD: iconPrefix + "eye-fill",
    INPUT_SHOW_PWD: iconPrefix + "eye-fill-close",
    INPUT_PREV_NUM: iconPrefix + "caret-up",
    INPUT_NEXT_NUM: iconPrefix + "caret-down",
    INPUT_DATE: iconPrefix + "calendar",
    INPUT_SEARCH: iconPrefix + "search",
    // modal
    MODAL_ZOOM_IN: iconPrefix + "square",
    MODAL_ZOOM_OUT: iconPrefix + "maximize",
    MODAL_CLOSE: iconPrefix + "close",
    MODAL_INFO: iconPrefix + "info-circle-fill",
    MODAL_SUCCESS: iconPrefix + "success-circle-fill",
    MODAL_WARNING: iconPrefix + "warnion-circle-fill",
    MODAL_ERROR: iconPrefix + "error-circle-fill",
    MODAL_QUESTION: iconPrefix + "question-circle-fill",
    MODAL_LOADING: iconPrefix + "spinner roll",
    // toolbar
    TOOLBAR_TOOLS_REFRESH: iconPrefix + "repeat",
    TOOLBAR_TOOLS_REFRESH_LOADING: iconPrefix + "repeat roll",
    TOOLBAR_TOOLS_IMPORT: iconPrefix + "upload",
    TOOLBAR_TOOLS_EXPORT: iconPrefix + "download",
    TOOLBAR_TOOLS_PRINT: iconPrefix + "print",
    TOOLBAR_TOOLS_FULLSCREEN: iconPrefix + "fullscreen",
    TOOLBAR_TOOLS_MINIMIZE: iconPrefix + "minimize",
    TOOLBAR_TOOLS_CUSTOM: iconPrefix + "custom-column",
    // form
    FORM_PREFIX: iconPrefix + "question-circle-fill",
    FORM_SUFFIX: iconPrefix + "question-circle-fill",
    FORM_FOLDING: iconPrefix + "arrow-up rotate180",
    FORM_UNFOLDING: iconPrefix + "arrow-up"
  },
  grid: {
    // size: null,
    // zoomConfig: {
    //   escRestore: true
    // },
    formConfig: {
      enabled: true
    },
    pagerConfig: {
      enabled: true
      // perfect: false
    },
    toolbarConfig: {
      enabled: true
      // perfect: false
    },
    proxyConfig: {
      enabled: true,
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: "result",
        total: "page.total",
        message: "message"
      }
      // beforeItem: null,
      // beforeColumn: null,
      // beforeQuery: null,
      // afterQuery: null,
      // beforeDelete: null,
      // afterDelete: null,
      // beforeSave: null,
      // afterSave: null
    }
  },
  tooltip: {
    // size: null,
    trigger: "hover",
    theme: "dark",
    enterDelay: 500,
    leaveDelay: 300
  },
  pager: {
    // size: null,
    // autoHidden: false,
    // perfect: true,
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  form: {
    // preventSubmit: false,
    // size: null,
    // colon: false,
    validConfig: {
      showMessage: true,
      autoPos: true
    },
    tooltipConfig: {
      enterable: true
    },
    titleAsterisk: true
  },
  input: {
    // size: null,
    // transfer: false
    // parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    // labelFormat: '',
    // valueFormat: '',
    startDate: new Date(1900, 0, 1),
    endDate: new Date(2100, 0, 1),
    startDay: 1,
    selectDay: 1,
    digits: 2,
    controls: true
  },
  textarea: {
    // size: null,
    // autosize: {
    //   minRows: 1,
    //   maxRows: 10
    // }
  },
  select: {
    // size: null,
    // transfer: false,
    // optionConfig: {
    //   keyField: '_X_OPTION_KEY'
    // },
    multiCharOverflow: 8
  },
  toolbar: {
    // size: null,
    // import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // custom: {
    //   isFooter: true
    // },
    // buttons: []
  },
  button: {
    // size: null,
    // transfer: false
  },
  radio: {
    // size: null,
    strict: true
  },
  radioButton: {
    // size: null,
    strict: true
  },
  radioGroup: {
    // size: null,
    strict: true
  },
  checkbox: {
    // size: null
  },
  switch: {
    // size: null
  },
  modal: {
    // size: null,
    top: 15,
    showHeader: true,
    minWidth: 340,
    minHeight: 140,
    lockView: true,
    mask: true,
    duration: 3e3,
    marginSize: 0,
    dblclickZoom: true,
    showTitleOverflow: true,
    animat: true,
    showClose: true,
    draggable: true,
    // storage: false,
    storageKey: "VXE_MODAL_POSITION"
  },
  list: {
    // size: null,
    scrollY: {
      enabled: true,
      gt: 100
      // oSize: 0
    }
  },
  i18n: function(key) {
    return key;
  }
};
function getLog(message, params) {
  return "[vxe-table v".concat("4.3.6-beta.0", "] ").concat(GlobalConfig.i18n(message, params));
}
function outLog(type) {
  return function(message, params) {
    var msg = getLog(message, params);
    console[type](msg);
    return msg;
  };
}
var warnLog = outLog("warn");
var errLog = outLog("error");
var storeMap = {};
var interceptor = {
  mixin: function(options) {
    XEUtils$1.each(options, function(callback, type) {
      return interceptor.add(type, callback);
    });
    return interceptor;
  },
  get: function(type) {
    return storeMap[type] || [];
  },
  add: function(type, callback) {
    if (process.env.NODE_ENV === "development") {
      var eventTypes = ["created", "mounted", "activated", "beforeUnmount", "unmounted", "event.clearActived", "event.clearFilter", "event.clearAreas", "event.showMenu", "event.keydown", "event.export", "event.import"];
      if (eventTypes.indexOf(type) === -1) {
        warnLog("vxe.error.errProp", ["Interceptor.".concat(type), eventTypes.join("|")]);
      }
    }
    if (callback) {
      var eList = storeMap[type];
      if (!eList) {
        eList = storeMap[type] = [];
      }
      if (process.env.NODE_ENV === "development") {
        if (eList.indexOf(callback) > -1) {
          warnLog("vxe.error.coverProp", ["Interceptor", type]);
        }
      }
      eList.push(callback);
    }
    return interceptor;
  },
  delete: function(type, callback) {
    var eList = storeMap[type];
    if (eList) {
      if (callback) {
        XEUtils$1.remove(eList, function(fn) {
          return fn === callback;
        });
      } else {
        delete storeMap[type];
      }
    }
  }
};
var zindexIndex = 0;
var lastZindex = 1;
function isEnableConf(conf) {
  return conf && conf.enabled !== false;
}
function isEmptyValue(cellValue) {
  return cellValue === null || cellValue === void 0 || cellValue === "";
}
function parseFile(file) {
  var name = file.name;
  var tIndex = XEUtils$1.lastIndexOf(name, ".");
  var type = name.substring(tIndex + 1, name.length);
  var filename = name.substring(0, tIndex);
  return { filename, type };
}
function nextZIndex() {
  lastZindex = GlobalConfig.zIndex + zindexIndex++;
  return lastZindex;
}
function getLastZIndex() {
  return lastZindex;
}
function hasChildrenList(item) {
  return item && item.children && item.children.length > 0;
}
function getFuncText(content) {
  return content ? XEUtils$1.toValueString(GlobalConfig.translate ? GlobalConfig.translate("" + content) : content) : "";
}
function formatText(value, placeholder) {
  return "" + (isEmptyValue(value) ? placeholder ? GlobalConfig.emptyCell : "" : value);
}
function eqEmptyValue(cellValue) {
  return cellValue === "" || XEUtils$1.eqNull(cellValue);
}
var ColumnInfo = (
  /** @class */
  function() {
    function ColumnInfo2($xetable, _vm, _a) {
      var _b = _a === void 0 ? {} : _a, renderHeader = _b.renderHeader, renderCell = _b.renderCell, renderFooter = _b.renderFooter, renderData = _b.renderData;
      var $xegrid = $xetable.xegrid;
      var formatter = _vm.formatter;
      var visible = XEUtils$1.isBoolean(_vm.visible) ? _vm.visible : true;
      if (process.env.NODE_ENV === "development") {
        var types = ["seq", "checkbox", "radio", "expand", "html"];
        if (_vm.type && types.indexOf(_vm.type) === -1) {
          warnLog("vxe.error.errProp", ["type=".concat(_vm.type), types.join(", ")]);
        }
        if (XEUtils$1.isBoolean(_vm.cellRender) || _vm.cellRender && !XEUtils$1.isObject(_vm.cellRender)) {
          warnLog("vxe.error.errProp", ["column.cell-render=".concat(_vm.cellRender), "column.cell-render={}"]);
        }
        if (XEUtils$1.isBoolean(_vm.editRender) || _vm.editRender && !XEUtils$1.isObject(_vm.editRender)) {
          warnLog("vxe.error.errProp", ["column.edit-render=".concat(_vm.editRender), "column.edit-render={}"]);
        }
        if (_vm.cellRender && _vm.editRender) {
          warnLog("vxe.error.errConflicts", ["column.cell-render", "column.edit-render"]);
        }
        if (_vm.type === "expand") {
          var tableProps2 = $xetable.props;
          var treeConfig = tableProps2.treeConfig;
          var computeTreeOpts = $xetable.getComputeMaps().computeTreeOpts;
          var treeOpts = computeTreeOpts.value;
          if (treeConfig && treeOpts.line) {
            errLog("vxe.error.errConflicts", ["tree-config.line", "column.type=expand"]);
          }
        }
        if (formatter) {
          if (XEUtils$1.isString(formatter)) {
            var globalFunc = VXETable.formats.get(formatter) || XEUtils$1[formatter];
            if (!XEUtils$1.isFunction(globalFunc)) {
              errLog("vxe.error.notFunc", [formatter]);
            }
          } else if (XEUtils$1.isArray(formatter)) {
            var globalFunc = VXETable.formats.get(formatter[0]) || XEUtils$1[formatter[0]];
            if (!XEUtils$1.isFunction(globalFunc)) {
              errLog("vxe.error.notFunc", [formatter[0]]);
            }
          }
        }
      }
      Object.assign(this, {
        // 基本属性
        type: _vm.type,
        property: _vm.field,
        field: _vm.field,
        title: _vm.title,
        width: _vm.width,
        minWidth: _vm.minWidth,
        maxWidth: _vm.maxWidth,
        resizable: _vm.resizable,
        fixed: _vm.fixed,
        align: _vm.align,
        headerAlign: _vm.headerAlign,
        footerAlign: _vm.footerAlign,
        showOverflow: _vm.showOverflow,
        showHeaderOverflow: _vm.showHeaderOverflow,
        showFooterOverflow: _vm.showFooterOverflow,
        className: _vm.className,
        headerClassName: _vm.headerClassName,
        footerClassName: _vm.footerClassName,
        formatter,
        sortable: _vm.sortable,
        sortBy: _vm.sortBy,
        sortType: _vm.sortType,
        filters: toFilters(_vm.filters),
        filterMultiple: XEUtils$1.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
        filterMethod: _vm.filterMethod,
        filterResetMethod: _vm.filterResetMethod,
        filterRecoverMethod: _vm.filterRecoverMethod,
        filterRender: _vm.filterRender,
        treeNode: _vm.treeNode,
        cellType: _vm.cellType,
        cellRender: _vm.cellRender,
        editRender: _vm.editRender,
        contentRender: _vm.contentRender,
        exportMethod: _vm.exportMethod,
        footerExportMethod: _vm.footerExportMethod,
        titleHelp: _vm.titleHelp,
        titlePrefix: _vm.titlePrefix,
        // 自定义参数
        params: _vm.params,
        // 渲染属性
        id: _vm.colId || XEUtils$1.uniqueId("col_"),
        parentId: null,
        visible,
        // 内部属性（一旦被使用，将导致不可升级版本）
        halfVisible: false,
        defaultVisible: visible,
        checked: false,
        halfChecked: false,
        disabled: false,
        level: 1,
        rowSpan: 1,
        colSpan: 1,
        order: null,
        sortTime: 0,
        renderWidth: 0,
        renderHeight: 0,
        resizeWidth: 0,
        renderLeft: 0,
        renderArgs: [],
        model: {},
        renderHeader: renderHeader || _vm.renderHeader,
        renderCell: renderCell || _vm.renderCell,
        renderFooter: renderFooter || _vm.renderFooter,
        renderData,
        // 单元格插槽，只对 grid 有效
        slots: _vm.slots
      });
      if ($xegrid) {
        var computeProxyOpts = $xegrid.getComputeMaps().computeProxyOpts;
        var proxyOpts = computeProxyOpts.value;
        if (proxyOpts.beforeColumn) {
          proxyOpts.beforeColumn({ $grid: $xegrid, column: this });
        }
      }
    }
    ColumnInfo2.prototype.getTitle = function() {
      return getFuncText(this.title || (this.type === "seq" ? GlobalConfig.i18n("vxe.table.seqTitle") : ""));
    };
    ColumnInfo2.prototype.getKey = function() {
      return this.field || (this.type ? "type=".concat(this.type) : null);
    };
    ColumnInfo2.prototype.update = function(name, value) {
      if (name !== "filters") {
        if (name === "field") {
          this.property = value;
        }
        this[name] = value;
      }
    };
    return ColumnInfo2;
  }()
);
var reClsMap = {};
var browse = XEUtils$1.browse();
function getPropClass(property2, params) {
  return property2 ? XEUtils$1.isFunction(property2) ? property2(params) : property2 : "";
}
function getClsRE(cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp("(?:^|\\s)".concat(cls, "(?!\\S)"), "g");
  }
  return reClsMap[cls];
}
function getNodeOffset(elem, container, rest) {
  if (elem) {
    var parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;
    if (parentElem && parentElem !== document.documentElement && parentElem !== document.body) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }
    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }
  return rest;
}
function isPx(val) {
  return val && /^\d+(px)?$/.test(val);
}
function isScale(val) {
  return val && /^\d+%$/.test(val);
}
function hasClass(elem, cls) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls));
}
function removeClass(elem, cls) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), "");
  }
}
function addClass(elem, cls) {
  if (elem && !hasClass(elem, cls)) {
    removeClass(elem, cls);
    elem.className = "".concat(elem.className, " ").concat(cls);
  }
}
function getDomNode() {
  var documentElement = document.documentElement;
  var bodyElem = document.body;
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  };
}
function getOffsetHeight(elem) {
  return elem ? elem.offsetHeight : 0;
}
function getPaddingTopBottomSize(elem) {
  if (elem) {
    var computedStyle = getComputedStyle(elem);
    var paddingTop = XEUtils$1.toNumber(computedStyle.paddingTop);
    var paddingBottom = XEUtils$1.toNumber(computedStyle.paddingBottom);
    return paddingTop + paddingBottom;
  }
  return 0;
}
function setScrollTop(elem, scrollTop) {
  if (elem) {
    elem.scrollTop = scrollTop;
  }
}
function setScrollLeft(elem, scrollLeft) {
  if (elem) {
    elem.scrollLeft = scrollLeft;
  }
}
function updateCellTitle(overflowElem, column) {
  var content = column.type === "html" ? overflowElem.innerText : overflowElem.textContent;
  if (overflowElem.getAttribute("title") !== content) {
    overflowElem.setAttribute("title", content);
  }
}
function getEventTargetNode(evnt, container, queryCls, queryMethod) {
  var targetElem;
  var target = evnt.target;
  while (target && target.nodeType && target !== document) {
    if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
      targetElem = target;
    } else if (target === container) {
      return { flag: queryCls ? !!targetElem : true, container, targetElem };
    }
    target = target.parentNode;
  }
  return { flag: false };
}
function getOffsetPos(elem, container) {
  return getNodeOffset(elem, container, { left: 0, top: 0 });
}
function getAbsolutePos(elem) {
  var bounding = elem.getBoundingClientRect();
  var boundingTop = bounding.top;
  var boundingLeft = bounding.left;
  var _a = getDomNode(), scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft, visibleHeight = _a.visibleHeight, visibleWidth = _a.visibleWidth;
  return { boundingTop, top: scrollTop + boundingTop, boundingLeft, left: scrollLeft + boundingLeft, visibleHeight, visibleWidth };
}
var scrollIntoViewIfNeeded = "scrollIntoViewIfNeeded";
var scrollIntoView = "scrollIntoView";
function scrollToView(elem) {
  if (elem) {
    if (elem[scrollIntoViewIfNeeded]) {
      elem[scrollIntoViewIfNeeded]();
    } else if (elem[scrollIntoView]) {
      elem[scrollIntoView]();
    }
  }
}
function isNodeElement(elem) {
  return elem && elem.nodeType === 1;
}
function restoreScrollLocation($xetable, scrollLeft, scrollTop) {
  var internalData = $xetable.internalData;
  return $xetable.clearScroll().then(function() {
    if (scrollLeft || scrollTop) {
      internalData.lastScrollLeft = 0;
      internalData.lastScrollTop = 0;
      return $xetable.scrollTo(scrollLeft, scrollTop);
    }
  });
}
function removeScrollListener(scrollElem) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = null;
  }
}
function restoreScrollListener(scrollElem) {
  if (scrollElem && scrollElem._onscroll) {
    scrollElem.onscroll = scrollElem._onscroll;
  }
}
function getRowUniqueId() {
  return XEUtils$1.uniqueId("row_");
}
function getRowkey($xetable) {
  var props = $xetable.props;
  var computeRowOpts = $xetable.getComputeMaps().computeRowOpts;
  var rowId = props.rowId;
  var rowOpts = computeRowOpts.value;
  return rowId || rowOpts.keyField || "_X_ROW_KEY";
}
function getRowid($xetable, row) {
  var rowid = XEUtils$1.get(row, getRowkey($xetable));
  return XEUtils$1.eqNull(rowid) ? "" : encodeURIComponent(rowid);
}
var handleFieldOrColumn = function($xetable, fieldOrColumn) {
  if (fieldOrColumn) {
    return XEUtils$1.isString(fieldOrColumn) ? $xetable.getColumnByField(fieldOrColumn) : fieldOrColumn;
  }
  return null;
};
function getPaddingLeftRightSize(elem) {
  if (elem) {
    var computedStyle = getComputedStyle(elem);
    var paddingLeft = XEUtils$1.toNumber(computedStyle.paddingLeft);
    var paddingRight = XEUtils$1.toNumber(computedStyle.paddingRight);
    return paddingLeft + paddingRight;
  }
  return 0;
}
function getElemenMarginWidth(elem) {
  if (elem) {
    var computedStyle = getComputedStyle(elem);
    var marginLeft = XEUtils$1.toNumber(computedStyle.marginLeft);
    var marginRight = XEUtils$1.toNumber(computedStyle.marginRight);
    return elem.offsetWidth + marginLeft + marginRight;
  }
  return 0;
}
function queryCellElement(cell, selector) {
  return cell.querySelector(".vxe-cell" + selector);
}
function toFilters(filters) {
  if (filters && XEUtils$1.isArray(filters)) {
    return filters.map(function(_a) {
      var label = _a.label, value = _a.value, data = _a.data, resetValue = _a.resetValue, checked = _a.checked;
      return { label, value, data, resetValue, checked: !!checked, _checked: !!checked };
    });
  }
  return filters;
}
function toTreePathSeq(path) {
  return path.map(function(num, i) {
    return i % 2 === 0 ? Number(num) + 1 : ".";
  }).join("");
}
function getCellValue(row, column) {
  return XEUtils$1.get(row, column.field);
}
function setCellValue(row, column, value) {
  return XEUtils$1.set(row, column.field, value);
}
function getColMinWidth(params) {
  var $table = params.$table, column = params.column, cell = params.cell;
  var tableProps2 = $table.props;
  var computeResizableOpts = $table.getComputeMaps().computeResizableOpts;
  var resizableOpts = computeResizableOpts.value;
  var reMinWidth = resizableOpts.minWidth;
  if (reMinWidth) {
    var customMinWidth = XEUtils$1.isFunction(reMinWidth) ? reMinWidth(params) : reMinWidth;
    if (customMinWidth !== "auto") {
      return Math.max(1, XEUtils$1.toNumber(customMinWidth));
    }
  }
  var allColumnHeaderOverflow = tableProps2.showHeaderOverflow;
  var showHeaderOverflow = column.showHeaderOverflow, colMinWidth = column.minWidth;
  var headOverflow = XEUtils$1.isUndefined(showHeaderOverflow) || XEUtils$1.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  var showEllipsis = headOverflow === "ellipsis";
  var showTitle = headOverflow === "title";
  var showTooltip = headOverflow === true || headOverflow === "tooltip";
  var hasEllipsis = showTitle || showTooltip || showEllipsis;
  var minTitleWidth = XEUtils$1.floor((XEUtils$1.toNumber(getComputedStyle(cell).fontSize) || 14) * 1.6);
  var paddingLeftRight = getPaddingLeftRightSize(cell) + getPaddingLeftRightSize(queryCellElement(cell, ""));
  var mWidth = minTitleWidth + paddingLeftRight;
  if (hasEllipsis) {
    var checkboxIconWidth = getPaddingLeftRightSize(queryCellElement(cell, "--title>.vxe-cell--checkbox"));
    var requiredIconWidth = getElemenMarginWidth(queryCellElement(cell, ">.vxe-cell--required-icon"));
    var editIconWidth = getElemenMarginWidth(queryCellElement(cell, ">.vxe-cell--edit-icon"));
    var helpIconWidth = getElemenMarginWidth(queryCellElement(cell, ">.vxe-cell-help-icon"));
    var sortIconWidth = getElemenMarginWidth(queryCellElement(cell, ">.vxe-cell--sort"));
    var filterIconWidth = getElemenMarginWidth(queryCellElement(cell, ">.vxe-cell--filter"));
    mWidth += checkboxIconWidth + requiredIconWidth + editIconWidth + helpIconWidth + filterIconWidth + sortIconWidth;
  }
  if (colMinWidth) {
    var refTableBody = $table.getRefMaps().refTableBody;
    var tableBody = refTableBody.value;
    var bodyElem = tableBody ? tableBody.$el : null;
    if (bodyElem) {
      if (isScale(colMinWidth)) {
        var bodyWidth = bodyElem.clientWidth - 1;
        var meanWidth = bodyWidth / 100;
        return Math.max(mWidth, Math.floor(XEUtils$1.toInteger(colMinWidth) * meanWidth));
      } else if (isPx(colMinWidth)) {
        return Math.max(mWidth, XEUtils$1.toInteger(colMinWidth));
      }
    }
  }
  return mWidth;
}
function isColumnInfo(column) {
  return column && (column.constructor === ColumnInfo || column instanceof ColumnInfo);
}
function createColumn($xetable, options, renderOptions) {
  return isColumnInfo(options) ? options : reactive(new ColumnInfo($xetable, options, renderOptions));
}
function watchColumn(props, column) {
  Object.keys(props).forEach(function(name) {
    watch(function() {
      return props[name];
    }, function(value) {
      column.update(name, value);
    });
  });
}
function assemColumn($xetable, elem, column, colgroup) {
  var reactData = $xetable.reactData;
  var staticColumns = reactData.staticColumns;
  var parentElem = elem.parentNode;
  var parentColumn = colgroup ? colgroup.column : null;
  var parentCols = parentColumn ? parentColumn.children : staticColumns;
  if (parentElem && parentCols) {
    parentCols.splice(XEUtils$1.arrayIndexOf(parentElem.children, elem), 0, column);
    reactData.staticColumns = staticColumns.slice(0);
  }
}
function destroyColumn($xetable, column) {
  var reactData = $xetable.reactData;
  var staticColumns = reactData.staticColumns;
  var matchObj = XEUtils$1.findTree(staticColumns, function(item) {
    return item.id === column.id;
  }, { children: "children" });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  reactData.staticColumns = staticColumns.slice(0);
}
function mergeBodyMethod(mergeList, _rowIndex, _columnIndex) {
  for (var mIndex = 0; mIndex < mergeList.length; mIndex++) {
    var _a = mergeList[mIndex], mergeRowIndex = _a.row, mergeColIndex = _a.col, mergeRowspan = _a.rowspan, mergeColspan = _a.colspan;
    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return { rowspan: mergeRowspan, colspan: mergeColspan };
      }
      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return { rowspan: 0, colspan: 0 };
      }
    }
  }
}
function clearTableDefaultStatus($xetable) {
  var props = $xetable.props, internalData = $xetable.internalData;
  internalData.initStatus = false;
  $xetable.clearSort();
  $xetable.clearCurrentRow();
  $xetable.clearCurrentColumn();
  $xetable.clearRadioRow();
  $xetable.clearRadioReserve();
  $xetable.clearCheckboxRow();
  $xetable.clearCheckboxReserve();
  $xetable.clearRowExpand();
  $xetable.clearTreeExpand();
  $xetable.clearTreeExpandReserve();
  if ($xetable.clearFilter) {
    $xetable.clearFilter();
  }
  if ($xetable.clearSelected && (props.keyboardConfig || props.mouseConfig)) {
    $xetable.clearSelected();
  }
  if ($xetable.clearCellAreas && props.mouseConfig) {
    $xetable.clearCellAreas();
    $xetable.clearCopyCellArea();
  }
  return $xetable.clearScroll();
}
function clearTableAllStatus($xetable) {
  if ($xetable.clearFilter) {
    $xetable.clearFilter();
  }
  return clearTableDefaultStatus($xetable);
}
function rowToVisible($xetable, row) {
  var reactData = $xetable.reactData, internalData = $xetable.internalData;
  var refTableBody = $xetable.getRefMaps().refTableBody;
  var scrollYLoad = reactData.scrollYLoad;
  var afterFullData = internalData.afterFullData, scrollYStore = internalData.scrollYStore;
  var tableBody = refTableBody.value;
  var bodyElem = tableBody ? tableBody.$el : null;
  if (bodyElem) {
    var trElem = bodyElem.querySelector('[rowid="'.concat(getRowid($xetable, row), '"]'));
    if (trElem) {
      var bodyHeight = bodyElem.clientHeight;
      var bodySrcollTop = bodyElem.scrollTop;
      var trOffsetParent = trElem.offsetParent;
      var trOffsetTop = trElem.offsetTop + (trOffsetParent ? trOffsetParent.offsetTop : 0);
      var trHeight = trElem.clientHeight;
      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        return $xetable.scrollTo(null, trOffsetTop);
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        return $xetable.scrollTo(null, bodySrcollTop + trHeight);
      }
    } else {
      if (scrollYLoad) {
        return $xetable.scrollTo(null, (afterFullData.indexOf(row) - 1) * scrollYStore.rowHeight);
      }
    }
  }
  return Promise.resolve();
}
function colToVisible($xetable, column) {
  var reactData = $xetable.reactData, internalData = $xetable.internalData;
  var refTableBody = $xetable.getRefMaps().refTableBody;
  var scrollXLoad = reactData.scrollXLoad;
  var visibleColumn = internalData.visibleColumn;
  var tableBody = refTableBody.value;
  var bodyElem = tableBody ? tableBody.$el : null;
  if (bodyElem) {
    var tdElem = bodyElem.querySelector(".".concat(column.id));
    if (tdElem) {
      var bodyWidth = bodyElem.clientWidth;
      var bodySrcollLeft = bodyElem.scrollLeft;
      var tdOffsetParent = tdElem.offsetParent;
      var tdOffsetLeft = tdElem.offsetLeft + (tdOffsetParent ? tdOffsetParent.offsetLeft : 0);
      var tdWidth = tdElem.clientWidth;
      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        return $xetable.scrollTo(tdOffsetLeft);
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        return $xetable.scrollTo(bodySrcollLeft + tdWidth);
      }
    } else {
      if (scrollXLoad) {
        var scrollLeft = 0;
        for (var index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break;
          }
          scrollLeft += visibleColumn[index].renderWidth;
        }
        return $xetable.scrollTo(scrollLeft);
      }
    }
  }
  return Promise.resolve();
}
function getOnName(type) {
  return "on" + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
}
function getSlotVNs(vns) {
  if (XEUtils$1.isArray(vns)) {
    return vns;
  }
  return [vns];
}
var __assign$j = globalThis && globalThis.__assign || function() {
  __assign$j = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$j.apply(this, arguments);
};
var __spreadArray$4 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var componentDefaultModelProp = "modelValue";
var defaultCompProps = { transfer: true };
function getModelEvent(renderOpts) {
  switch (renderOpts.name) {
    case "input":
    case "textarea":
      return "input";
  }
  return "update:modelValue";
}
function getChangeEvent(renderOpts) {
  switch (renderOpts.name) {
    case "input":
    case "textarea":
    case "$input":
    case "$textarea":
      return "input";
  }
  return "change";
}
function parseDate(value, props) {
  return value && props.valueFormat ? XEUtils$1.toStringDate(value, props.valueFormat) : value;
}
function getFormatDate(value, props, defaultFormat) {
  var _a = props.dateConfig, dateConfig = _a === void 0 ? {} : _a;
  return XEUtils$1.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat);
}
function getLabelFormatDate(value, props) {
  return getFormatDate(value, props, GlobalConfig.i18n("vxe.input.date.labelFormat.".concat(props.type)));
}
function getComponentName(name) {
  return "vxe-".concat(name.replace("$", ""));
}
function getDefaultComponent(_a) {
  var name = _a.name;
  return resolveComponent(getComponentName(name));
}
function handleConfirmFilter(params, checked, option) {
  var $panel = params.$panel;
  $panel.changeOption({}, checked, option);
}
function getNativeAttrs(renderOpts) {
  var name = renderOpts.name, attrs = renderOpts.attrs;
  if (name === "input") {
    attrs = Object.assign({ type: "text" }, attrs);
  }
  return attrs;
}
function getInputImmediateModel(renderOpts) {
  var name = renderOpts.name, immediate = renderOpts.immediate, props = renderOpts.props;
  if (!immediate) {
    if (name === "$input") {
      var type = (props || {}).type;
      return !(!type || type === "text" || type === "number" || type === "integer" || type === "float");
    }
    if (name === "input" || name === "textarea" || name === "$textarea") {
      return false;
    }
    return true;
  }
  return immediate;
}
function getCellEditProps(renderOpts, params, value, defaultProps) {
  var _a;
  return XEUtils$1.assign({ immediate: getInputImmediateModel(renderOpts) }, defaultCompProps, defaultProps, renderOpts.props, (_a = {}, _a[componentDefaultModelProp] = value, _a));
}
function getCellEditFilterProps(renderOpts, params, value, defaultProps) {
  var _a;
  return XEUtils$1.assign({}, defaultCompProps, defaultProps, renderOpts.props, (_a = {}, _a[componentDefaultModelProp] = value, _a));
}
function getComponentFormItemProps(renderOpts, params, value, defaultProps) {
  var _a;
  return XEUtils$1.assign({}, defaultCompProps, defaultProps, renderOpts.props, (_a = {}, _a[componentDefaultModelProp] = value, _a));
}
function isImmediateCell(renderOpts, params) {
  return params.$type === "cell" || getInputImmediateModel(renderOpts);
}
function getCellLabelVNs(renderOpts, params, cellLabel) {
  var placeholder = renderOpts.placeholder;
  return [
    h("span", {
      class: "vxe-cell--label"
    }, placeholder && isEmptyValue(cellLabel) ? [
      h("span", {
        class: "vxe-cell--placeholder"
      }, formatText(getFuncText(placeholder), 1))
    ] : formatText(cellLabel, 1))
  ];
}
function getElementOns(renderOpts, params, modelFunc, changeFunc) {
  var events = renderOpts.events;
  var modelEvent = getModelEvent(renderOpts);
  var changeEvent = getChangeEvent(renderOpts);
  var isSameEvent = changeEvent === modelEvent;
  var ons = {};
  if (events) {
    XEUtils$1.objectEach(events, function(func, key) {
      ons[getOnName(key)] = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        func.apply(void 0, __spreadArray$4([params], args, false));
      };
    });
  }
  if (modelFunc) {
    ons[getOnName(modelEvent)] = function(targetEvnt) {
      modelFunc(targetEvnt);
      if (isSameEvent && changeFunc) {
        changeFunc(targetEvnt);
      }
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }
    };
  }
  if (!isSameEvent && changeFunc) {
    ons[getOnName(changeEvent)] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      changeFunc.apply(void 0, args);
      if (events && events[changeEvent]) {
        events[changeEvent].apply(events, __spreadArray$4([params], args, false));
      }
    };
  }
  return ons;
}
function getComponentOns(renderOpts, params, modelFunc, changeFunc) {
  var events = renderOpts.events;
  var modelEvent = getModelEvent(renderOpts);
  var changeEvent = getChangeEvent(renderOpts);
  var ons = {};
  XEUtils$1.objectEach(events, function(func, key) {
    ons[getOnName(key)] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      func.apply(void 0, __spreadArray$4([params], args, false));
    };
  });
  if (modelFunc) {
    ons[getOnName(modelEvent)] = function(targetEvnt) {
      modelFunc(targetEvnt);
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvnt);
      }
    };
  }
  if (changeFunc) {
    ons[getOnName(changeEvent)] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      changeFunc.apply(void 0, args);
      if (events && events[changeEvent]) {
        events[changeEvent].apply(events, __spreadArray$4([params], args, false));
      }
    };
  }
  return ons;
}
function getEditOns(renderOpts, params) {
  var $table = params.$table, row = params.row, column = params.column;
  var name = renderOpts.name;
  var model = column.model;
  var isImmediate = isImmediateCell(renderOpts, params);
  return getComponentOns(renderOpts, params, function(cellValue) {
    if (isImmediate) {
      setCellValue(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }
  }, function(eventParams) {
    if (!isImmediate && (name === "$input" || name === "$textarea")) {
      var cellValue = eventParams.value;
      model.update = true;
      model.value = cellValue;
      $table.updateStatus(params, cellValue);
    } else {
      $table.updateStatus(params);
    }
  });
}
function getFilterOns(renderOpts, params, option) {
  return getComponentOns(renderOpts, params, function(value) {
    option.data = value;
  }, function() {
    handleConfirmFilter(params, !XEUtils$1.eqNull(option.data), option);
  });
}
function getItemOns(renderOpts, params) {
  var $form = params.$form, data = params.data, property2 = params.property;
  return getComponentOns(renderOpts, params, function(value) {
    XEUtils$1.set(data, property2, value);
  }, function() {
    $form.updateStatus(params);
  });
}
function getNativeEditOns(renderOpts, params) {
  var $table = params.$table, row = params.row, column = params.column;
  var model = column.model;
  return getElementOns(renderOpts, params, function(evnt) {
    var cellValue = evnt.target.value;
    if (isImmediateCell(renderOpts, params)) {
      setCellValue(row, column, cellValue);
    } else {
      model.update = true;
      model.value = cellValue;
    }
  }, function(evnt) {
    var cellValue = evnt.target.value;
    $table.updateStatus(params, cellValue);
  });
}
function getNativeFilterOns(renderOpts, params, option) {
  return getElementOns(renderOpts, params, function(evnt) {
    option.data = evnt.target.value;
  }, function() {
    handleConfirmFilter(params, !XEUtils$1.eqNull(option.data), option);
  });
}
function getNativeItemOns(renderOpts, params) {
  var $form = params.$form, data = params.data, property2 = params.property;
  return getElementOns(renderOpts, params, function(evnt) {
    var itemValue = evnt.target.value;
    XEUtils$1.set(data, property2, itemValue);
  }, function() {
    $form.updateStatus(params);
  });
}
function nativeEditRender(renderOpts, params) {
  var row = params.row, column = params.column;
  var name = renderOpts.name;
  var cellValue = isImmediateCell(renderOpts, params) ? getCellValue(row, column) : column.model.value;
  return [
    h(name, __assign$j(__assign$j(__assign$j({ class: "vxe-default-".concat(name) }, getNativeAttrs(renderOpts)), { value: cellValue }), getNativeEditOns(renderOpts, params)))
  ];
}
function defaultEditRender(renderOpts, params) {
  var row = params.row, column = params.column;
  var cellValue = getCellValue(row, column);
  return [
    h(getDefaultComponent(renderOpts), __assign$j(__assign$j({}, getCellEditProps(renderOpts, params, cellValue)), getEditOns(renderOpts, params)))
  ];
}
function defaultButtonEditRender(renderOpts, params) {
  return [
    h(resolveComponent("vxe-button"), __assign$j(__assign$j({}, getCellEditProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))
  ];
}
function defaultButtonsEditRender(renderOpts, params) {
  return renderOpts.children.map(function(childRenderOpts) {
    return defaultButtonEditRender(childRenderOpts, params)[0];
  });
}
function renderNativeOptgroups(renderOpts, params, renderOptionsMethods) {
  var optionGroups = renderOpts.optionGroups, _a = renderOpts.optionGroupProps, optionGroupProps = _a === void 0 ? {} : _a;
  var groupOptions = optionGroupProps.options || "options";
  var groupLabel = optionGroupProps.label || "label";
  return optionGroups.map(function(group, gIndex) {
    return h("optgroup", {
      key: gIndex,
      label: group[groupLabel]
    }, renderOptionsMethods(group[groupOptions], renderOpts, params));
  });
}
function renderNativeOptions(options, renderOpts, params) {
  var _a = renderOpts.optionProps, optionProps = _a === void 0 ? {} : _a;
  var row = params.row, column = params.column;
  var labelProp = optionProps.label || "label";
  var valueProp = optionProps.value || "value";
  var disabledProp = optionProps.disabled || "disabled";
  var cellValue = isImmediateCell(renderOpts, params) ? getCellValue(row, column) : column.model.value;
  return options.map(function(option, oIndex) {
    return h("option", {
      key: oIndex,
      value: option[valueProp],
      disabled: option[disabledProp],
      /* eslint-disable eqeqeq */
      selected: option[valueProp] == cellValue
    }, option[labelProp]);
  });
}
function nativeFilterRender(renderOpts, params) {
  var column = params.column;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  return column.filters.map(function(option, oIndex) {
    return h(name, __assign$j(__assign$j(__assign$j({ key: oIndex, class: "vxe-default-".concat(name) }, attrs), { value: option.data }), getNativeFilterOns(renderOpts, params, option)));
  });
}
function defaultFilterRender(renderOpts, params) {
  var column = params.column;
  return column.filters.map(function(option, oIndex) {
    var optionValue = option.data;
    return h(getDefaultComponent(renderOpts), __assign$j(__assign$j({ key: oIndex }, getCellEditFilterProps(renderOpts, renderOpts, optionValue)), getFilterOns(renderOpts, params, option)));
  });
}
function handleFilterMethod(_a) {
  var option = _a.option, row = _a.row, column = _a.column;
  var data = option.data;
  var cellValue = XEUtils$1.get(row, column.property);
  return cellValue == data;
}
function nativeSelectEditRender(renderOpts, params) {
  return [
    h("select", __assign$j(__assign$j({ class: "vxe-default-select" }, getNativeAttrs(renderOpts)), getNativeEditOns(renderOpts, params)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params))
  ];
}
function defaultSelectEditRender(renderOpts, params) {
  var row = params.row, column = params.column;
  var options = renderOpts.options, optionProps = renderOpts.optionProps, optionGroups = renderOpts.optionGroups, optionGroupProps = renderOpts.optionGroupProps;
  var cellValue = getCellValue(row, column);
  return [
    h(getDefaultComponent(renderOpts), __assign$j(__assign$j({}, getCellEditProps(renderOpts, params, cellValue, { options, optionProps, optionGroups, optionGroupProps })), getEditOns(renderOpts, params)))
  ];
}
function getSelectCellValue(renderOpts, _a) {
  var row = _a.row, column = _a.column;
  var _b = renderOpts.props, props = _b === void 0 ? {} : _b, options = renderOpts.options, optionGroups = renderOpts.optionGroups, _c = renderOpts.optionProps, optionProps = _c === void 0 ? {} : _c, _d = renderOpts.optionGroupProps, optionGroupProps = _d === void 0 ? {} : _d;
  var cellValue = XEUtils$1.get(row, column.property);
  var selectItem;
  var labelProp = optionProps.label || "label";
  var valueProp = optionProps.value || "value";
  if (!isEmptyValue(cellValue)) {
    return XEUtils$1.map(props.multiple ? cellValue : [cellValue], optionGroups ? function(value) {
      var groupOptions = optionGroupProps.options || "options";
      for (var index = 0; index < optionGroups.length; index++) {
        selectItem = XEUtils$1.find(optionGroups[index][groupOptions], function(item) {
          return item[valueProp] == value;
        });
        if (selectItem) {
          break;
        }
      }
      return selectItem ? selectItem[labelProp] : value;
    } : function(value) {
      selectItem = XEUtils$1.find(options, function(item) {
        return item[valueProp] == value;
      });
      return selectItem ? selectItem[labelProp] : value;
    }).join(", ");
  }
  return "";
}
function nativeItemRender(renderOpts, params) {
  var data = params.data, property2 = params.property;
  var name = renderOpts.name;
  var attrs = getNativeAttrs(renderOpts);
  var itemValue = XEUtils$1.get(data, property2);
  return [
    h(name, __assign$j(__assign$j(__assign$j({ class: "vxe-default-".concat(name) }, attrs), { value: attrs && name === "input" && (attrs.type === "submit" || attrs.type === "reset") ? null : itemValue }), getNativeItemOns(renderOpts, params)))
  ];
}
function defaultItemRender(renderOpts, params) {
  var data = params.data, property2 = params.property;
  var itemValue = XEUtils$1.get(data, property2);
  return [
    h(getDefaultComponent(renderOpts), __assign$j(__assign$j({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
  ];
}
function defaultButtonItemRender(renderOpts, params) {
  return [
    h(resolveComponent("vxe-button"), __assign$j(__assign$j({}, getComponentFormItemProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))
  ];
}
function defaultButtonsItemRender(renderOpts, params) {
  return renderOpts.children.map(function(childRenderOpts) {
    return defaultButtonItemRender(childRenderOpts, params)[0];
  });
}
function renderNativeFormOptions(options, renderOpts, params) {
  var data = params.data, property2 = params.property;
  var _a = renderOpts.optionProps, optionProps = _a === void 0 ? {} : _a;
  var labelProp = optionProps.label || "label";
  var valueProp = optionProps.value || "value";
  var disabledProp = optionProps.disabled || "disabled";
  var cellValue = XEUtils$1.get(data, property2);
  return options.map(function(item, oIndex) {
    return h("option", {
      key: oIndex,
      value: item[valueProp],
      disabled: item[disabledProp],
      /* eslint-disable eqeqeq */
      selected: item[valueProp] == cellValue
    }, item[labelProp]);
  });
}
function handleExportSelectMethod(params) {
  var row = params.row, column = params.column, options = params.options;
  return options.original ? getCellValue(row, column) : getSelectCellValue(column.editRender || column.cellRender, params);
}
function defaultFormItemRadioAndCheckboxRender(renderOpts, params) {
  var name = renderOpts.name, options = renderOpts.options, _a = renderOpts.optionProps, optionProps = _a === void 0 ? {} : _a;
  var data = params.data, property2 = params.property;
  var labelProp = optionProps.label || "label";
  var valueProp = optionProps.value || "value";
  var disabledProp = optionProps.disabled || "disabled";
  var itemValue = XEUtils$1.get(data, property2);
  var compName = getComponentName(name);
  if (options) {
    return [
      h(resolveComponent("".concat(compName, "-group")), __assign$j(__assign$j({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
        default: function() {
          return options.map(function(item, index) {
            return h(resolveComponent(compName), {
              key: index,
              label: item[valueProp],
              content: item[labelProp],
              disabled: item[disabledProp]
            });
          });
        }
      })
    ];
  }
  return [
    h(resolveComponent(compName), __assign$j(__assign$j({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
  ];
}
var renderMap = {
  input: {
    autofocus: "input",
    renderEdit: nativeEditRender,
    renderDefault: nativeEditRender,
    renderFilter: nativeFilterRender,
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: nativeItemRender
  },
  textarea: {
    autofocus: "textarea",
    renderEdit: nativeEditRender,
    renderItemContent: nativeItemRender
  },
  select: {
    renderEdit: nativeSelectEditRender,
    renderDefault: nativeSelectEditRender,
    renderCell: function(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    renderFilter: function(renderOpts, params) {
      var column = params.column;
      return column.filters.map(function(option, oIndex) {
        return h("select", __assign$j(__assign$j({ key: oIndex, class: "vxe-default-select" }, getNativeAttrs(renderOpts)), getNativeFilterOns(renderOpts, params, option)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeOptions) : renderNativeOptions(renderOpts.options, renderOpts, params));
      });
    },
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: function(renderOpts, params) {
      return [
        h("select", __assign$j(__assign$j({ class: "vxe-default-select" }, getNativeAttrs(renderOpts)), getNativeItemOns(renderOpts, params)), renderOpts.optionGroups ? renderNativeOptgroups(renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(renderOpts.options, renderOpts, params))
      ];
    },
    cellExportMethod: handleExportSelectMethod
  },
  $input: {
    autofocus: ".vxe-input--inner",
    renderEdit: defaultEditRender,
    renderCell: function(renderOpts, params) {
      var _a = renderOpts.props, props = _a === void 0 ? {} : _a;
      var row = params.row, column = params.column;
      var digits = props.digits || GlobalConfig.input.digits;
      var cellValue = XEUtils$1.get(row, column.property);
      if (cellValue) {
        switch (props.type) {
          case "date":
          case "week":
          case "month":
          case "year":
            cellValue = getLabelFormatDate(cellValue, props);
            break;
          case "float":
            cellValue = XEUtils$1.toFixed(XEUtils$1.floor(cellValue, digits), digits);
            break;
        }
      }
      return getCellLabelVNs(renderOpts, params, cellValue);
    },
    renderDefault: defaultEditRender,
    renderFilter: defaultFilterRender,
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: defaultItemRender
  },
  $textarea: {
    autofocus: ".vxe-textarea--inner",
    renderItemContent: defaultItemRender
  },
  $button: {
    renderDefault: defaultButtonEditRender,
    renderItemContent: defaultButtonItemRender
  },
  $buttons: {
    renderDefault: defaultButtonsEditRender,
    renderItemContent: defaultButtonsItemRender
  },
  $select: {
    autofocus: ".vxe-input--inner",
    renderEdit: defaultSelectEditRender,
    renderDefault: defaultSelectEditRender,
    renderCell: function(renderOpts, params) {
      return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
    },
    renderFilter: function(renderOpts, params) {
      var column = params.column;
      var options = renderOpts.options, optionProps = renderOpts.optionProps, optionGroups = renderOpts.optionGroups, optionGroupProps = renderOpts.optionGroupProps;
      return column.filters.map(function(option, oIndex) {
        var optionValue = option.data;
        return h(getDefaultComponent(renderOpts), __assign$j(__assign$j({ key: oIndex }, getCellEditFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps })), getFilterOns(renderOpts, params, option)));
      });
    },
    defaultFilterMethod: handleFilterMethod,
    renderItemContent: function(renderOpts, params) {
      var data = params.data, property2 = params.property;
      var options = renderOpts.options, optionProps = renderOpts.optionProps, optionGroups = renderOpts.optionGroups, optionGroupProps = renderOpts.optionGroupProps;
      var itemValue = XEUtils$1.get(data, property2);
      return [
        h(getDefaultComponent(renderOpts), __assign$j(__assign$j({}, getComponentFormItemProps(renderOpts, params, itemValue, { options, optionProps, optionGroups, optionGroupProps })), getItemOns(renderOpts, params)))
      ];
    },
    cellExportMethod: handleExportSelectMethod
  },
  $radio: {
    autofocus: ".vxe-radio--input",
    renderItemContent: defaultFormItemRadioAndCheckboxRender
  },
  $checkbox: {
    autofocus: ".vxe-checkbox--input",
    renderItemContent: defaultFormItemRadioAndCheckboxRender
  },
  $switch: {
    autofocus: ".vxe-switch--button",
    renderEdit: defaultEditRender,
    renderDefault: defaultEditRender,
    renderItemContent: defaultItemRender
  }
};
var renderer = {
  mixin: function(opts) {
    XEUtils$1.each(opts, function(options, name) {
      return renderer.add(name, options);
    });
    return renderer;
  },
  get: function(name) {
    return renderMap[name] || null;
  },
  add: function(name, options) {
    if (name && options) {
      var renders_1 = renderMap[name];
      if (renders_1) {
        if (process.env.NODE_ENV === "development") {
          XEUtils$1.each(options, function(val, key) {
            if (!XEUtils$1.eqNull(renders_1[key]) && renders_1[key] !== val) {
              warnLog("vxe.error.coverProp", ["Renderer.".concat(name), key]);
            }
          });
        }
        Object.assign(renders_1, options);
      } else {
        renderMap[name] = options;
      }
    }
    return renderer;
  },
  delete: function(name) {
    delete renderMap[name];
    return renderer;
  }
};
var Store = (
  /** @class */
  function() {
    function Store2() {
      this.store = {};
    }
    Store2.prototype.mixin = function(options) {
      Object.assign(this.store, options);
      return this;
    };
    Store2.prototype.has = function(name) {
      return !!this.get(name);
    };
    Store2.prototype.get = function(name) {
      return this.store[name];
    };
    Store2.prototype.add = function(name, render) {
      var conf = this.store[name];
      if (process.env.NODE_ENV === "development") {
        var confKeys_1 = XEUtils$1.keys(conf);
        XEUtils$1.each(render, function(item, key) {
          if (confKeys_1.includes(key)) {
            warnLog("vxe.error.coverProp", [name, key]);
          }
        });
      }
      this.store[name] = conf ? XEUtils$1.merge(conf, render) : render;
      return this;
    };
    Store2.prototype.delete = function(name) {
      delete this.store[name];
    };
    Store2.prototype.forEach = function(callback) {
      XEUtils$1.objectEach(this.store, callback);
    };
    return Store2;
  }()
);
var commands = new Store();
if (process.env.NODE_ENV === "development") {
  Object.assign(commands, { _name: "Commands" });
}
var menus = new Store();
if (process.env.NODE_ENV === "development") {
  Object.assign(menus, { _name: "Menus" });
}
var formats = new Store();
if (process.env.NODE_ENV === "development") {
  Object.assign(formats, { _name: "Formats" });
}
var hooks = new Store();
var setup = function(options) {
  return XEUtils$1.merge(GlobalConfig, options);
};
function getExportOrImpotType(types, flag) {
  var rest = [];
  XEUtils$1.objectEach(types, function(val, type) {
    if (val === 0 || val === flag) {
      rest.push(type);
    }
  });
  return rest;
}
var installedPlugins = [];
function use(Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VXETable, options);
      installedPlugins.push(Plugin);
    }
  }
  return VXETable;
}
function t(key, args) {
  return GlobalConfig.i18n(key, args);
}
function _t(key, args) {
  return key ? XEUtils$1.toValueString(GlobalConfig.translate ? GlobalConfig.translate(key, args) : key) : "";
}
var VXETableConfig = (
  /** @class */
  function() {
    function VXETableConfig2() {
    }
    Object.defineProperty(VXETableConfig2.prototype, "zIndex", {
      /**
       * 获取当前的 zIndex
       */
      get: function() {
        return getLastZIndex();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(VXETableConfig2.prototype, "nextZIndex", {
      /**
       * 获取下一个 zIndex
       */
      get: function() {
        return nextZIndex();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(VXETableConfig2.prototype, "exportTypes", {
      /**
       * 获取所有导出类型
       */
      get: function() {
        return getExportOrImpotType(GlobalConfig.export.types, 1);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(VXETableConfig2.prototype, "importTypes", {
      /**
       * 获取所有导入类型
       */
      get: function() {
        return getExportOrImpotType(GlobalConfig.export.types, 2);
      },
      enumerable: false,
      configurable: true
    });
    return VXETableConfig2;
  }()
);
var config = new VXETableConfig();
var v = "v4";
var VXETable = {
  v,
  version: "4.3.6-beta.0",
  setup,
  interceptor,
  renderer,
  commands,
  formats,
  menus,
  hooks,
  config,
  use,
  t,
  _t
};
const PanelComponent$1 = defineComponent({
  name: "VxeTableFilter",
  props: {
    filterStore: Object
  },
  setup: function(props) {
    var $xetable = inject("$xetable", {});
    var tableReactData = $xetable.reactData, tableInternalData = $xetable.internalData;
    var computeHasCheckOption = computed(function() {
      var filterStore = props.filterStore;
      return filterStore && filterStore.options.some(function(option) {
        return option.checked;
      });
    });
    var filterCheckAllEvent = function(evnt, value) {
      var filterStore = props.filterStore;
      filterStore.options.forEach(function(option) {
        option._checked = value;
        option.checked = value;
      });
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    };
    var confirmFilter = function(evnt) {
      var filterStore = props.filterStore;
      filterStore.options.forEach(function(option) {
        option.checked = option._checked;
      });
      $xetable.confirmFilterEvent(evnt);
    };
    var changeRadioOption = function(evnt, checked, item) {
      var filterStore = props.filterStore;
      filterStore.options.forEach(function(option) {
        option._checked = false;
      });
      item._checked = checked;
      $xetable.checkFilterOptions();
      confirmFilter(evnt);
    };
    var resetFilter = function(evnt) {
      var filterStore = props.filterStore;
      $xetable.handleClearFilter(filterStore.column);
      $xetable.confirmFilterEvent(evnt);
    };
    var changeMultipleOption = function(evnt, checked, item) {
      item._checked = checked;
      $xetable.checkFilterOptions();
    };
    var changeOption = function(evnt, checked, item) {
      var filterStore = props.filterStore;
      if (filterStore.multiple) {
        changeMultipleOption(evnt, checked, item);
      } else {
        changeRadioOption(evnt, checked, item);
      }
    };
    var changeAllOption = function(evnt, checked) {
      var filterStore = props.filterStore;
      if (filterStore.multiple) {
        filterCheckAllEvent(evnt, checked);
      } else {
        resetFilter(evnt);
      }
    };
    var $panel = {
      changeRadioOption,
      changeMultipleOption,
      changeAllOption,
      changeOption,
      confirmFilter,
      resetFilter
    };
    var renderOptions = function(filterRender, compConf) {
      var filterStore = props.filterStore;
      var column = filterStore.column, multiple = filterStore.multiple, maxHeight = filterStore.maxHeight;
      var slots = column.slots;
      var filterSlot = slots ? slots.filter : null;
      var params = Object.assign({}, tableInternalData._currFilterParams, { $panel, $table: $xetable });
      if (filterSlot) {
        return [
          h("div", {
            class: "vxe-table--filter-template"
          }, $xetable.callSlot(filterSlot, params))
        ];
      } else if (compConf && compConf.renderFilter) {
        return [
          h("div", {
            class: "vxe-table--filter-template"
          }, getSlotVNs(compConf.renderFilter(filterRender, params)))
        ];
      }
      var isAllChecked = multiple ? filterStore.isAllSelected : !filterStore.options.some(function(item) {
        return item._checked;
      });
      var isAllIndeterminate = multiple && filterStore.isIndeterminate;
      return [
        h("ul", {
          class: "vxe-table--filter-header"
        }, [
          h("li", {
            class: ["vxe-table--filter-option", {
              "is--checked": isAllChecked,
              "is--indeterminate": isAllIndeterminate
            }],
            title: GlobalConfig.i18n(multiple ? "vxe.table.allTitle" : "vxe.table.allFilter"),
            onClick: function(evnt) {
              changeAllOption(evnt, !filterStore.isAllSelected);
            }
          }, (multiple ? [
            h("span", {
              class: ["vxe-checkbox--icon", isAllIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
            })
          ] : []).concat([
            h("span", {
              class: "vxe-checkbox--label"
            }, GlobalConfig.i18n("vxe.table.allFilter"))
          ]))
        ]),
        h("ul", {
          class: "vxe-table--filter-body",
          style: maxHeight ? {
            maxHeight: "".concat(maxHeight, "px")
          } : {}
        }, filterStore.options.map(function(item) {
          var isChecked = item._checked;
          return h("li", {
            class: ["vxe-table--filter-option", {
              "is--checked": item._checked
            }],
            title: item.label,
            onClick: function(evnt) {
              changeOption(evnt, !item._checked, item);
            }
          }, (multiple ? [
            h("span", {
              class: ["vxe-checkbox--icon", isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
            })
          ] : []).concat([
            h("span", {
              class: "vxe-checkbox--label"
            }, formatText(item.label, 1))
          ]));
        }))
      ];
    };
    var renderFooters = function() {
      var filterStore = props.filterStore;
      var column = filterStore.column, multiple = filterStore.multiple;
      var hasCheckOption = computeHasCheckOption.value;
      var filterRender = column.filterRender;
      var compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null;
      var isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate;
      return multiple && (!compConf || compConf.showFilterFooter !== false) ? [
        h("div", {
          class: "vxe-table--filter-footer"
        }, [
          h("button", {
            class: {
              "is--disabled": isDisabled
            },
            disabled: isDisabled,
            onClick: confirmFilter
          }, GlobalConfig.i18n("vxe.table.confirmFilter")),
          h("button", {
            onClick: resetFilter
          }, GlobalConfig.i18n("vxe.table.resetFilter"))
        ])
      ] : [];
    };
    var renderVN = function() {
      var filterStore = props.filterStore;
      var initStore = tableReactData.initStore;
      var column = filterStore.column;
      var filterRender = column ? column.filterRender : null;
      var compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null;
      var filterClassName = compConf ? compConf.filterClassName : "";
      var params = Object.assign({}, tableInternalData._currFilterParams, { $panel, $table: $xetable });
      return h("div", {
        class: [
          "vxe-table--filter-wrapper",
          "filter--prevent-default",
          getPropClass(filterClassName, params),
          {
            "is--animat": $xetable.props.animat,
            "is--multiple": filterStore.multiple,
            "is--active": filterStore.visible
          }
        ],
        style: filterStore.style
      }, initStore.filter && filterStore.visible ? renderOptions(filterRender, compConf).concat(renderFooters()) : []);
    };
    return renderVN;
  }
});
var __assign$i = globalThis && globalThis.__assign || function() {
  __assign$i = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$i.apply(this, arguments);
};
var dynamicContainerElem;
var dynamicStore = reactive({
  modals: []
});
var VxeDynamics = defineComponent({
  setup: function() {
    return function() {
      var modals = dynamicStore.modals;
      return h("div", {
        class: "vxe-dynamics--modal"
      }, modals.map(function(item) {
        return h(resolveComponent("vxe-modal"), item);
      }));
    };
  }
});
var dynamicApp = createApp(VxeDynamics);
function checkDynamic() {
  if (!dynamicContainerElem) {
    dynamicContainerElem = document.createElement("div");
    dynamicContainerElem.className = "vxe-dynamics";
    document.body.appendChild(dynamicContainerElem);
    dynamicApp.mount(dynamicContainerElem);
  }
}
dynamicApp.component(PanelComponent$1.name, PanelComponent$1);
const PanelComponent = defineComponent({
  name: "VxeTableContextMenu",
  setup: function(props, context) {
    var xID = XEUtils$1.uniqueId();
    var $xetable = inject("$xetable", {});
    var tableReactData = $xetable.reactData;
    var refElem = ref();
    var refMaps = {
      refElem
    };
    var $xemenupanel = {
      xID,
      props,
      context,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var renderVN = function() {
      var ctxMenuStore = tableReactData.ctxMenuStore;
      var computeMenuOpts = $xetable.getComputeMaps().computeMenuOpts;
      var menuOpts = computeMenuOpts.value;
      return h(Teleport, {
        to: "body",
        disabled: false
      }, [
        h("div", {
          ref: refElem,
          class: ["vxe-table--context-menu-wrapper", menuOpts.className, {
            "is--visible": ctxMenuStore.visible
          }],
          style: ctxMenuStore.style
        }, ctxMenuStore.list.map(function(options, gIndex) {
          return options.every(function(item) {
            return item.visible === false;
          }) ? createCommentVNode() : h("ul", {
            class: "vxe-context-menu--option-wrapper",
            key: gIndex
          }, options.map(function(item, index) {
            var hasChildMenus = item.children && item.children.some(function(child) {
              return child.visible !== false;
            });
            return item.visible === false ? null : h("li", {
              class: [item.className, {
                "link--disabled": item.disabled,
                "link--active": item === ctxMenuStore.selected
              }],
              key: "".concat(gIndex, "_").concat(index)
            }, [
              h("a", {
                class: "vxe-context-menu--link",
                onClick: function(evnt) {
                  $xetable.ctxMenuLinkEvent(evnt, item);
                },
                onMouseover: function(evnt) {
                  $xetable.ctxMenuMouseoverEvent(evnt, item);
                },
                onMouseout: function(evnt) {
                  $xetable.ctxMenuMouseoutEvent(evnt, item);
                }
              }, [
                h("i", {
                  class: ["vxe-context-menu--link-prefix", item.prefixIcon]
                }),
                h("span", {
                  class: "vxe-context-menu--link-content"
                }, getFuncText(item.name)),
                h("i", {
                  class: ["vxe-context-menu--link-suffix", hasChildMenus ? item.suffixIcon || "suffix--haschild" : item.suffixIcon]
                })
              ]),
              hasChildMenus ? h("ul", {
                class: ["vxe-table--context-menu-clild-wrapper", {
                  "is--show": item === ctxMenuStore.selected && ctxMenuStore.showChild
                }]
              }, item.children.map(function(child, cIndex) {
                return child.visible === false ? null : h("li", {
                  class: [child.className, {
                    "link--disabled": child.disabled,
                    "link--active": child === ctxMenuStore.selectChild
                  }],
                  key: "".concat(gIndex, "_").concat(index, "_").concat(cIndex)
                }, [
                  h("a", {
                    class: "vxe-context-menu--link",
                    onClick: function(evnt) {
                      $xetable.ctxMenuLinkEvent(evnt, child);
                    },
                    onMouseover: function(evnt) {
                      $xetable.ctxMenuMouseoverEvent(evnt, item, child);
                    },
                    onMouseout: function(evnt) {
                      $xetable.ctxMenuMouseoutEvent(evnt, item);
                    }
                  }, [
                    h("i", {
                      class: ["vxe-context-menu--link-prefix", child.prefixIcon]
                    }),
                    h("span", {
                      class: "vxe-context-menu--link-content"
                    }, getFuncText(child.name))
                  ])
                ]);
              })) : null
            ]);
          }));
        }))
      ]);
    };
    $xemenupanel.renderVN = renderVN;
    return $xemenupanel;
  },
  render: function() {
    return this.renderVN();
  }
});
var EVENT_KEYS = {
  F2: "F2",
  ESCAPE: "Escape",
  ENTER: "Enter",
  TAB: "Tab",
  DELETE: "Delete",
  BACKSPACE: "Backspace",
  SPACEBAR: " ",
  CONTEXT_MENU: "ContextMenu",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown"
};
var convertEventKeys = {
  " ": "Spacebar",
  Apps: EVENT_KEYS.CONTEXT_MENU,
  Del: EVENT_KEYS.DELETE,
  Up: EVENT_KEYS.ARROW_UP,
  Down: EVENT_KEYS.ARROW_DOWN,
  Left: EVENT_KEYS.ARROW_LEFT,
  Right: EVENT_KEYS.ARROW_RIGHT
};
var wheelName = browse.firefox ? "DOMMouseScroll" : "mousewheel";
var eventStore$1 = [];
var hasEventKey = function(evnt, targetKey) {
  var key = evnt.key;
  targetKey = targetKey.toLowerCase();
  return key ? targetKey === key.toLowerCase() || !!(convertEventKeys[key] && convertEventKeys[key].toLowerCase() === targetKey) : false;
};
function triggerEvent(evnt) {
  var isWheel = evnt.type === wheelName;
  eventStore$1.forEach(function(_a) {
    var type = _a.type, cb = _a.cb;
    if (!evnt.cancelBubble) {
      if (type === evnt.type || isWheel && type === "mousewheel") {
        cb(evnt);
      }
    }
  });
}
var GlobalEvent = {
  on: function(comp, type, cb) {
    eventStore$1.push({ comp, type, cb });
  },
  off: function(comp, type) {
    XEUtils$1.remove(eventStore$1, function(item) {
      return item.comp === comp && item.type === type;
    });
  },
  trigger: triggerEvent,
  eqKeypad: function(evnt, keyVal) {
    var key = evnt.key;
    if (keyVal.toLowerCase() === key.toLowerCase()) {
      return true;
    }
    return false;
  }
};
if (browse.isDoc) {
  if (!browse.msie) {
    document.addEventListener("copy", triggerEvent, false);
    document.addEventListener("cut", triggerEvent, false);
    document.addEventListener("paste", triggerEvent, false);
  }
  document.addEventListener("keydown", triggerEvent, false);
  document.addEventListener("contextmenu", triggerEvent, false);
  window.addEventListener("mousedown", triggerEvent, false);
  window.addEventListener("blur", triggerEvent, false);
  window.addEventListener("resize", triggerEvent, false);
  window.addEventListener(wheelName, XEUtils$1.throttle(triggerEvent, 100, { leading: true, trailing: false }), { passive: true, capture: false });
}
var __assign$h = globalThis && globalThis.__assign || function() {
  __assign$h = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$h.apply(this, arguments);
};
dynamicApp.component(PanelComponent.name, PanelComponent);
var __assign$g = globalThis && globalThis.__assign || function() {
  __assign$g = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$g.apply(this, arguments);
};
globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function useSize(props) {
  var xesize = inject("xesize", null);
  var computeSize = computed(function() {
    return props.size || (xesize ? xesize.value : null);
  });
  provide("xesize", computeSize);
  return computeSize;
}
const VxeButtonComponent = defineComponent({
  name: "VxeButton",
  props: {
    /**
     * 按钮类型
     */
    type: String,
    className: String,
    /**
     * 按钮尺寸
     */
    size: { type: String, default: function() {
      return GlobalConfig.button.size || GlobalConfig.size;
    } },
    /**
     * 用来标识这一项
     */
    name: [String, Number],
    /**
     * 按钮内容
     */
    content: String,
    /**
     * 固定显示下拉面板的方向
     */
    placement: String,
    /**
     * 按钮状态
     */
    status: String,
    /**
     * 按钮的图标
     */
    icon: String,
    /**
     * 圆角边框
     */
    round: Boolean,
    /**
     * 圆角按钮
     */
    circle: Boolean,
    /**
     * 是否禁用
     */
    disabled: Boolean,
    /**
     * 是否加载中
     */
    loading: Boolean,
    /**
     * 在下拉面板关闭时销毁内容
     */
    destroyOnClose: Boolean,
    /**
     * 是否将弹框容器插入于 body 内
     */
    transfer: { type: Boolean, default: function() {
      return GlobalConfig.button.transfer;
    } }
  },
  emits: [
    "click",
    "dropdown-click"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      inited: false,
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: ""
    });
    var internalData = {
      showTime: null
    };
    var refElem = ref();
    var refButton = ref();
    var refBtnPanel = ref();
    var refMaps = {
      refElem
    };
    var $xebutton = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var buttonMethods = {};
    var computeIsFormBtn = computed(function() {
      var type = props.type;
      if (type) {
        return ["submit", "reset", "button"].indexOf(type) > -1;
      }
      return false;
    });
    var computeBtnType = computed(function() {
      var type = props.type;
      return type && type === "text" ? type : "button";
    });
    var updateZindex = function() {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex();
      }
    };
    var updatePlacement = function() {
      return nextTick().then(function() {
        var transfer = props.transfer, placement = props.placement;
        var panelIndex = reactData.panelIndex;
        var targetElem = refButton.value;
        var panelElem = refBtnPanel.value;
        if (panelElem && targetElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };
          var _a = getAbsolutePos(targetElem), top_1 = _a.top, left = _a.left, boundingTop = _a.boundingTop, visibleHeight = _a.visibleHeight, visibleWidth = _a.visibleWidth;
          var panelPlacement = "bottom";
          if (transfer) {
            var btnLeft = left + targetWidth - panelWidth;
            var btnTop = top_1 + targetHeight;
            if (placement === "top") {
              panelPlacement = "top";
              btnTop = top_1 - panelHeight;
            } else if (!placement) {
              if (boundingTop + targetHeight + panelHeight + marginSize > visibleHeight) {
                panelPlacement = "top";
                btnTop = top_1 - panelHeight;
              }
              if (btnTop < marginSize) {
                panelPlacement = "bottom";
                btnTop = top_1 + targetHeight;
              }
            }
            if (btnLeft + panelWidth + marginSize > visibleWidth) {
              btnLeft -= btnLeft + panelWidth + marginSize - visibleWidth;
            }
            if (btnLeft < marginSize) {
              btnLeft = marginSize;
            }
            Object.assign(panelStyle, {
              left: "".concat(btnLeft, "px"),
              right: "auto",
              top: "".concat(btnTop, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === "top") {
              panelPlacement = "top";
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = "top";
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }
          reactData.panelStyle = panelStyle;
          reactData.panelPlacement = panelPlacement;
          return nextTick();
        }
      });
    };
    var clickEvent = function(evnt) {
      buttonMethods.dispatchEvent("click", { $event: evnt }, evnt);
    };
    var mousedownDropdownEvent = function(evnt) {
      var isLeftBtn = evnt.button === 0;
      if (isLeftBtn) {
        evnt.stopPropagation();
      }
    };
    var clickDropdownEvent = function(evnt) {
      var dropdownElem = evnt.currentTarget;
      var panelElem = refBtnPanel.value;
      var _a = getEventTargetNode(evnt, dropdownElem, "vxe-button"), flag = _a.flag, targetElem = _a.targetElem;
      if (flag) {
        if (panelElem) {
          panelElem.dataset.active = "N";
        }
        reactData.showPanel = false;
        setTimeout(function() {
          if (!panelElem || panelElem.dataset.active !== "Y") {
            reactData.animatVisible = false;
          }
        }, 350);
        buttonMethods.dispatchEvent("dropdown-click", { name: targetElem.getAttribute("name"), $event: evnt }, evnt);
      }
    };
    var mouseenterEvent = function() {
      var panelElem = refBtnPanel.value;
      if (panelElem) {
        panelElem.dataset.active = "Y";
        reactData.animatVisible = true;
        setTimeout(function() {
          if (panelElem.dataset.active === "Y") {
            reactData.showPanel = true;
            updateZindex();
            updatePlacement();
            setTimeout(function() {
              if (reactData.showPanel) {
                updatePlacement();
              }
            }, 50);
          }
        }, 20);
      }
    };
    var mouseenterTargetEvent = function() {
      var panelElem = refBtnPanel.value;
      if (panelElem) {
        panelElem.dataset.active = "Y";
        if (!reactData.inited) {
          reactData.inited = true;
        }
        internalData.showTime = setTimeout(function() {
          if (panelElem.dataset.active === "Y") {
            mouseenterEvent();
          } else {
            reactData.animatVisible = false;
          }
        }, 250);
      }
    };
    var closePanel = function() {
      var panelElem = refBtnPanel.value;
      clearTimeout(internalData.showTime);
      if (panelElem) {
        panelElem.dataset.active = "N";
        setTimeout(function() {
          if (panelElem.dataset.active !== "Y") {
            reactData.showPanel = false;
            setTimeout(function() {
              if (panelElem.dataset.active !== "Y") {
                reactData.animatVisible = false;
              }
            }, 350);
          }
        }, 100);
      } else {
        reactData.animatVisible = false;
        reactData.showPanel = false;
      }
    };
    var mouseleaveEvent = function() {
      closePanel();
    };
    var renderContent = function() {
      var content = props.content, icon = props.icon, loading = props.loading;
      var contVNs = [];
      if (loading) {
        contVNs.push(h("i", {
          class: ["vxe-button--loading-icon", GlobalConfig.icon.BUTTON_LOADING]
        }));
      } else if (slots.icon) {
        contVNs.push(h("span", {
          class: "vxe-button--custom-icon"
        }, slots.icon({})));
      } else if (icon) {
        contVNs.push(h("i", {
          class: ["vxe-button--icon", icon]
        }));
      }
      if (slots.default) {
        contVNs.push(h("span", {
          class: "vxe-button--content"
        }, slots.default({})));
      } else if (content) {
        contVNs.push(h("span", {
          class: "vxe-button--content"
        }, getFuncText(content)));
      }
      return contVNs;
    };
    buttonMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $button: $xebutton, $event: evnt }, params));
      },
      focus: function() {
        var btnElem = refButton.value;
        btnElem.focus();
        return nextTick();
      },
      blur: function() {
        var btnElem = refButton.value;
        btnElem.blur();
        return nextTick();
      }
    };
    Object.assign($xebutton, buttonMethods);
    onMounted(function() {
      GlobalEvent.on($xebutton, "mousewheel", function(evnt) {
        var panelElem = refBtnPanel.value;
        if (reactData.showPanel && !getEventTargetNode(evnt, panelElem).flag) {
          closePanel();
        }
      });
    });
    onUnmounted(function() {
      GlobalEvent.off($xebutton, "mousewheel");
    });
    var renderVN = function() {
      var _a, _b, _c, _d;
      var className = props.className, transfer = props.transfer, type = props.type, round2 = props.round, circle = props.circle, destroyOnClose = props.destroyOnClose, status = props.status, name = props.name, disabled = props.disabled, loading = props.loading;
      var inited = reactData.inited, showPanel = reactData.showPanel;
      var isFormBtn = computeIsFormBtn.value;
      var btnType = computeBtnType.value;
      var vSize = computeSize.value;
      if (slots.dropdowns) {
        return h("div", {
          ref: refElem,
          class: ["vxe-button--dropdown", className, (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--active"] = showPanel, _a)]
        }, [
          h("button", {
            ref: refButton,
            class: ["vxe-button", "type--".concat(btnType), (_b = {}, _b["size--".concat(vSize)] = vSize, _b["theme--".concat(status)] = status, _b["is--round"] = round2, _b["is--circle"] = circle, _b["is--disabled"] = disabled || loading, _b["is--loading"] = loading, _b)],
            name,
            type: isFormBtn ? type : "button",
            disabled: disabled || loading,
            onMouseenter: mouseenterTargetEvent,
            onMouseleave: mouseleaveEvent,
            onClick: clickEvent
          }, renderContent().concat([
            h("i", {
              class: "vxe-button--dropdown-arrow ".concat(GlobalConfig.icon.BUTTON_DROPDOWN)
            })
          ])),
          h(Teleport, {
            to: "body",
            disabled: transfer ? !inited : true
          }, [
            h("div", {
              ref: refBtnPanel,
              class: ["vxe-button--dropdown-panel", (_c = {}, _c["size--".concat(vSize)] = vSize, _c["animat--leave"] = reactData.animatVisible, _c["animat--enter"] = showPanel, _c)],
              placement: reactData.panelPlacement,
              style: reactData.panelStyle
            }, inited ? [
              h("div", {
                class: "vxe-button--dropdown-wrapper",
                onMousedown: mousedownDropdownEvent,
                onClick: clickDropdownEvent,
                onMouseenter: mouseenterEvent,
                onMouseleave: mouseleaveEvent
              }, destroyOnClose && !showPanel ? [] : slots.dropdowns({}))
            ] : [])
          ])
        ]);
      }
      return h("button", {
        ref: refButton,
        class: ["vxe-button", "type--".concat(btnType), (_d = {}, _d["size--".concat(vSize)] = vSize, _d["theme--".concat(status)] = status, _d["is--round"] = round2, _d["is--circle"] = circle, _d["is--disabled"] = disabled || loading, _d["is--loading"] = loading, _d)],
        name,
        type: isFormBtn ? type : "button",
        disabled: disabled || loading,
        onClick: clickEvent
      }, renderContent());
    };
    $xebutton.renderVN = renderVN;
    return $xebutton;
  },
  render: function() {
    return this.renderVN();
  }
});
const VxeLoadingComponent = defineComponent({
  name: "VxeLoading",
  props: {
    modelValue: Boolean,
    icon: String,
    text: String
  },
  setup: function(props) {
    var computeLoadingIcon = computed(function() {
      return props.icon || GlobalConfig.icon.LOADING;
    });
    var computeLoadingText = computed(function() {
      var loadingText = GlobalConfig.loadingText;
      return props.text || (loadingText === null ? loadingText : GlobalConfig.i18n("vxe.loading.text"));
    });
    return function() {
      var loadingIcon = computeLoadingIcon.value;
      var loadingText = computeLoadingText.value;
      return h("div", {
        class: ["vxe-loading", {
          "is--visible": props.modelValue
        }]
      }, [
        h("div", {
          class: "vxe-loading--chunk"
        }, [
          loadingIcon ? h("i", {
            class: loadingIcon
          }) : h("div", {
            class: "vxe-loading--spinner"
          }),
          loadingText ? h("div", {
            class: "vxe-loading--text"
          }, "".concat(loadingText)) : null
        ])
      ]);
    };
  }
});
var VxeLoading = Object.assign(VxeLoadingComponent, {
  install: function(app) {
    app.component(VxeLoadingComponent.name, VxeLoadingComponent);
  }
});
var __assign$f = globalThis && globalThis.__assign || function() {
  __assign$f = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$f.apply(this, arguments);
};
var allActivedModals = [];
var msgQueue = [];
const VxeModalComponent = defineComponent({
  name: "VxeModal",
  props: {
    modelValue: Boolean,
    id: String,
    type: { type: String, default: "modal" },
    loading: { type: Boolean, default: null },
    status: String,
    iconStatus: String,
    className: String,
    top: { type: [Number, String], default: function() {
      return GlobalConfig.modal.top;
    } },
    position: [String, Object],
    title: String,
    duration: { type: [Number, String], default: function() {
      return GlobalConfig.modal.duration;
    } },
    message: [Number, String],
    content: [Number, String],
    cancelButtonText: { type: String, default: function() {
      return GlobalConfig.modal.cancelButtonText;
    } },
    confirmButtonText: { type: String, default: function() {
      return GlobalConfig.modal.confirmButtonText;
    } },
    lockView: { type: Boolean, default: function() {
      return GlobalConfig.modal.lockView;
    } },
    lockScroll: Boolean,
    mask: { type: Boolean, default: function() {
      return GlobalConfig.modal.mask;
    } },
    maskClosable: { type: Boolean, default: function() {
      return GlobalConfig.modal.maskClosable;
    } },
    escClosable: { type: Boolean, default: function() {
      return GlobalConfig.modal.escClosable;
    } },
    resize: Boolean,
    showHeader: { type: Boolean, default: function() {
      return GlobalConfig.modal.showHeader;
    } },
    showFooter: { type: Boolean, default: function() {
      return GlobalConfig.modal.showFooter;
    } },
    showZoom: Boolean,
    showClose: { type: Boolean, default: function() {
      return GlobalConfig.modal.showClose;
    } },
    dblclickZoom: { type: Boolean, default: function() {
      return GlobalConfig.modal.dblclickZoom;
    } },
    width: [Number, String],
    height: [Number, String],
    minWidth: { type: [Number, String], default: function() {
      return GlobalConfig.modal.minWidth;
    } },
    minHeight: { type: [Number, String], default: function() {
      return GlobalConfig.modal.minHeight;
    } },
    zIndex: Number,
    marginSize: { type: [Number, String], default: function() {
      return GlobalConfig.modal.marginSize;
    } },
    fullscreen: Boolean,
    draggable: { type: Boolean, default: function() {
      return GlobalConfig.modal.draggable;
    } },
    remember: { type: Boolean, default: function() {
      return GlobalConfig.modal.remember;
    } },
    destroyOnClose: { type: Boolean, default: function() {
      return GlobalConfig.modal.destroyOnClose;
    } },
    showTitleOverflow: { type: Boolean, default: function() {
      return GlobalConfig.modal.showTitleOverflow;
    } },
    transfer: { type: Boolean, default: function() {
      return GlobalConfig.modal.transfer;
    } },
    storage: { type: Boolean, default: function() {
      return GlobalConfig.modal.storage;
    } },
    storageKey: { type: String, default: function() {
      return GlobalConfig.modal.storageKey;
    } },
    animat: { type: Boolean, default: function() {
      return GlobalConfig.modal.animat;
    } },
    size: { type: String, default: function() {
      return GlobalConfig.modal.size || GlobalConfig.size;
    } },
    beforeHideMethod: { type: Function, default: function() {
      return GlobalConfig.modal.beforeHideMethod;
    } },
    slots: Object
  },
  emits: [
    "update:modelValue",
    "show",
    "hide",
    "before-hide",
    "close",
    "confirm",
    "cancel",
    "zoom"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      inited: false,
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      zoomLocat: null,
      firstOpen: true
    });
    var refElem = ref();
    var refModalBox = ref();
    var refConfirmBtn = ref();
    var refCancelBtn = ref();
    var refMaps = {
      refElem
    };
    var $xemodal = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var modalMethods = {};
    var computeIsMsg = computed(function() {
      return props.type === "message";
    });
    var getBox = function() {
      var boxElem = refModalBox.value;
      return boxElem;
    };
    var recalculate = function() {
      var width = props.width, height = props.height;
      var boxElem = getBox();
      boxElem.style.width = "".concat(width ? isNaN(width) ? width : "".concat(width, "px") : "");
      boxElem.style.height = "".concat(height ? isNaN(height) ? height : "".concat(height, "px") : "");
      return nextTick();
    };
    var updateZindex = function() {
      var zIndex = props.zIndex;
      var modalZindex = reactData.modalZindex;
      if (zIndex) {
        reactData.modalZindex = zIndex;
      } else if (modalZindex < getLastZIndex()) {
        reactData.modalZindex = nextZIndex();
      }
    };
    var updatePosition = function() {
      return nextTick().then(function() {
        var position = props.position;
        var marginSize = XEUtils$1.toNumber(props.marginSize);
        var boxElem = getBox();
        var clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var isPosCenter = position === "center";
        var _a = XEUtils$1.isString(position) ? { top: position, left: position } : Object.assign({}, position), top = _a.top, left = _a.left;
        var topCenter = isPosCenter || top === "center";
        var leftCenter = isPosCenter || left === "center";
        var posTop = "";
        var posLeft = "";
        if (left && !leftCenter) {
          posLeft = isNaN(left) ? left : "".concat(left, "px");
        } else {
          posLeft = "".concat(Math.max(marginSize, clientVisibleWidth / 2 - boxElem.offsetWidth / 2), "px");
        }
        if (top && !topCenter) {
          posTop = isNaN(top) ? top : "".concat(top, "px");
        } else {
          posTop = "".concat(Math.max(marginSize, clientVisibleHeight / 2 - boxElem.offsetHeight / 2), "px");
        }
        boxElem.style.top = posTop;
        boxElem.style.left = posLeft;
      });
    };
    var updateStyle = function() {
      nextTick(function() {
        var offsetTop = 0;
        msgQueue.forEach(function(comp) {
          var boxElem = comp.getBox();
          offsetTop += XEUtils$1.toNumber(comp.props.top);
          comp.reactData.modalTop = offsetTop;
          offsetTop += boxElem.clientHeight;
        });
      });
    };
    var removeMsgQueue = function() {
      if (msgQueue.indexOf($xemodal) > -1) {
        XEUtils$1.remove(msgQueue, function(comp) {
          return comp === $xemodal;
        });
      }
      updateStyle();
    };
    var closeModal2 = function(type) {
      var remember = props.remember, beforeHideMethod = props.beforeHideMethod;
      var visible = reactData.visible;
      var isMsg = computeIsMsg.value;
      var params = { type };
      if (visible) {
        Promise.resolve(beforeHideMethod ? beforeHideMethod(params) : null).then(function(rest) {
          if (!XEUtils$1.isError(rest)) {
            if (isMsg) {
              removeMsgQueue();
            }
            reactData.contentVisible = false;
            if (!remember) {
              reactData.zoomLocat = null;
            }
            XEUtils$1.remove(allActivedModals, function(item) {
              return item === $xemodal;
            });
            modalMethods.dispatchEvent("before-hide", params);
            setTimeout(function() {
              reactData.visible = false;
              emit("update:modelValue", false);
              modalMethods.dispatchEvent("hide", params);
            }, 200);
          }
        }).catch(function(e) {
          return e;
        });
      }
      return nextTick();
    };
    var closeEvent = function(evnt) {
      var type = "close";
      modalMethods.dispatchEvent(type, { type }, evnt);
      closeModal2(type);
    };
    var confirmEvent = function(evnt) {
      var type = "confirm";
      modalMethods.dispatchEvent(type, { type }, evnt);
      closeModal2(type);
    };
    var cancelEvent = function(evnt) {
      var type = "cancel";
      modalMethods.dispatchEvent(type, { type }, evnt);
      closeModal2(type);
    };
    var getStorageMap = function(key) {
      var version = GlobalConfig.version;
      var rest = XEUtils$1.toStringJSON(localStorage.getItem(key) || "");
      return rest && rest._v === version ? rest : { _v: version };
    };
    var hasPosStorage = function() {
      var id = props.id, remember = props.remember, storage = props.storage, storageKey = props.storageKey;
      return !!(id && remember && storage && getStorageMap(storageKey)[id]);
    };
    var restorePosStorage = function() {
      var id = props.id, remember = props.remember, storage = props.storage, storageKey = props.storageKey;
      if (id && remember && storage) {
        var posStorage = getStorageMap(storageKey)[id];
        if (posStorage) {
          var boxElem = getBox();
          var _a = posStorage.split(","), left = _a[0], top_1 = _a[1], width = _a[2], height = _a[3], zoomLeft = _a[4], zoomTop = _a[5], zoomWidth = _a[6], zoomHeight = _a[7];
          if (left) {
            boxElem.style.left = "".concat(left, "px");
          }
          if (top_1) {
            boxElem.style.top = "".concat(top_1, "px");
          }
          if (width) {
            boxElem.style.width = "".concat(width, "px");
          }
          if (height) {
            boxElem.style.height = "".concat(height, "px");
          }
          if (zoomLeft && zoomTop) {
            reactData.zoomLocat = {
              left: zoomLeft,
              top: zoomTop,
              width: zoomWidth,
              height: zoomHeight
            };
          }
        }
      }
    };
    var addMsgQueue = function() {
      if (msgQueue.indexOf($xemodal) === -1) {
        msgQueue.push($xemodal);
      }
      updateStyle();
    };
    var savePosStorage = function() {
      var id = props.id, remember = props.remember, storage = props.storage, storageKey = props.storageKey;
      var zoomLocat = reactData.zoomLocat;
      if (id && remember && storage) {
        var boxElem = getBox();
        var posStorageMap = getStorageMap(storageKey);
        posStorageMap[id] = [
          boxElem.style.left,
          boxElem.style.top,
          boxElem.style.width,
          boxElem.style.height
        ].concat(zoomLocat ? [
          zoomLocat.left,
          zoomLocat.top,
          zoomLocat.width,
          zoomLocat.height
        ] : []).map(function(val) {
          return val ? XEUtils$1.toNumber(val) : "";
        }).join(",");
        localStorage.setItem(storageKey, XEUtils$1.toJSONString(posStorageMap));
      }
    };
    var maximize = function() {
      return nextTick().then(function() {
        if (!reactData.zoomLocat) {
          var marginSize = Math.max(0, XEUtils$1.toNumber(props.marginSize));
          var boxElem = getBox();
          var _a = getDomNode(), visibleHeight = _a.visibleHeight, visibleWidth = _a.visibleWidth;
          reactData.zoomLocat = {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft,
            width: boxElem.offsetWidth + (boxElem.style.width ? 0 : 1),
            height: boxElem.offsetHeight + (boxElem.style.height ? 0 : 1)
          };
          Object.assign(boxElem.style, {
            top: "".concat(marginSize, "px"),
            left: "".concat(marginSize, "px"),
            width: "".concat(visibleWidth - marginSize * 2, "px"),
            height: "".concat(visibleHeight - marginSize * 2, "px")
          });
          savePosStorage();
        }
      });
    };
    var openModal2 = function() {
      var duration = props.duration, remember = props.remember, showFooter = props.showFooter;
      var inited = reactData.inited, visible = reactData.visible;
      var isMsg = computeIsMsg.value;
      if (!inited) {
        reactData.inited = true;
      }
      if (!visible) {
        if (!remember) {
          recalculate();
        }
        reactData.visible = true;
        reactData.contentVisible = false;
        updateZindex();
        allActivedModals.push($xemodal);
        setTimeout(function() {
          reactData.contentVisible = true;
          nextTick(function() {
            if (showFooter) {
              var confirmBtn = refConfirmBtn.value;
              var cancelBtn = refCancelBtn.value;
              var operBtn = confirmBtn || cancelBtn;
              if (operBtn) {
                operBtn.focus();
              }
            }
            var type = "";
            var params = { type };
            emit("update:modelValue", true);
            modalMethods.dispatchEvent("show", params);
          });
        }, 10);
        if (isMsg) {
          addMsgQueue();
          if (duration !== -1) {
            setTimeout(function() {
              return closeModal2("close");
            }, XEUtils$1.toNumber(duration));
          }
        } else {
          nextTick(function() {
            var fullscreen = props.fullscreen;
            var firstOpen = reactData.firstOpen;
            if (!remember || firstOpen) {
              updatePosition().then(function() {
                setTimeout(function() {
                  return updatePosition();
                }, 20);
              });
            }
            if (firstOpen) {
              reactData.firstOpen = false;
              if (hasPosStorage()) {
                restorePosStorage();
              } else if (fullscreen) {
                nextTick(function() {
                  return maximize();
                });
              }
            } else {
              if (fullscreen) {
                nextTick(function() {
                  return maximize();
                });
              }
            }
          });
        }
      }
      return nextTick();
    };
    var selfClickEvent = function(evnt) {
      var el = refElem.value;
      if (props.maskClosable && evnt.target === el) {
        var type = "mask";
        closeModal2(type);
      }
    };
    var handleGlobalKeydownEvent = function(evnt) {
      var isEsc = hasEventKey(evnt, EVENT_KEYS.ESCAPE);
      if (isEsc) {
        var lastModal_1 = XEUtils$1.max(allActivedModals, function(item) {
          return item.reactData.modalZindex;
        });
        if (lastModal_1) {
          setTimeout(function() {
            if (lastModal_1 === $xemodal && lastModal_1.props.escClosable) {
              closeModal2("exit");
            }
          }, 10);
        }
      }
    };
    var isMaximized = function() {
      return !!reactData.zoomLocat;
    };
    var revert = function() {
      return nextTick().then(function() {
        var zoomLocat = reactData.zoomLocat;
        if (zoomLocat) {
          var boxElem = getBox();
          reactData.zoomLocat = null;
          Object.assign(boxElem.style, {
            top: "".concat(zoomLocat.top, "px"),
            left: "".concat(zoomLocat.left, "px"),
            width: "".concat(zoomLocat.width, "px"),
            height: "".concat(zoomLocat.height, "px")
          });
          savePosStorage();
        }
      });
    };
    var zoom = function() {
      if (reactData.zoomLocat) {
        return revert().then(function() {
          return isMaximized();
        });
      }
      return maximize().then(function() {
        return isMaximized();
      });
    };
    var toggleZoomEvent = function(evnt) {
      var zoomLocat = reactData.zoomLocat;
      var params = { type: zoomLocat ? "revert" : "max" };
      return zoom().then(function() {
        modalMethods.dispatchEvent("zoom", params, evnt);
      });
    };
    var getPosition = function() {
      var isMsg = computeIsMsg.value;
      if (!isMsg) {
        var boxElem = getBox();
        if (boxElem) {
          return {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft
          };
        }
      }
      return null;
    };
    var setPosition = function(top, left) {
      var isMsg = computeIsMsg.value;
      if (!isMsg) {
        var boxElem = getBox();
        if (XEUtils$1.isNumber(top)) {
          boxElem.style.top = "".concat(top, "px");
        }
        if (XEUtils$1.isNumber(left)) {
          boxElem.style.left = "".concat(left, "px");
        }
      }
      return nextTick();
    };
    var boxMousedownEvent = function() {
      var modalZindex = reactData.modalZindex;
      if (allActivedModals.some(function(comp) {
        return comp.reactData.visible && comp.reactData.modalZindex > modalZindex;
      })) {
        updateZindex();
      }
    };
    var mousedownEvent = function(evnt) {
      var remember = props.remember, storage = props.storage;
      var zoomLocat = reactData.zoomLocat;
      var marginSize = XEUtils$1.toNumber(props.marginSize);
      var boxElem = getBox();
      if (!zoomLocat && evnt.button === 0 && !getEventTargetNode(evnt, boxElem, "trigger--btn").flag) {
        evnt.preventDefault();
        var domMousemove_1 = document.onmousemove;
        var domMouseup_1 = document.onmouseup;
        var disX_1 = evnt.clientX - boxElem.offsetLeft;
        var disY_1 = evnt.clientY - boxElem.offsetTop;
        var _a = getDomNode(), visibleHeight_1 = _a.visibleHeight, visibleWidth_1 = _a.visibleWidth;
        document.onmousemove = function(evnt2) {
          evnt2.preventDefault();
          var offsetWidth = boxElem.offsetWidth;
          var offsetHeight = boxElem.offsetHeight;
          var minX = marginSize;
          var maxX = visibleWidth_1 - offsetWidth - marginSize - 1;
          var minY = marginSize;
          var maxY = visibleHeight_1 - offsetHeight - marginSize - 1;
          var left = evnt2.clientX - disX_1;
          var top = evnt2.clientY - disY_1;
          if (left > maxX) {
            left = maxX;
          }
          if (left < minX) {
            left = minX;
          }
          if (top > maxY) {
            top = maxY;
          }
          if (top < minY) {
            top = minY;
          }
          boxElem.style.left = "".concat(left, "px");
          boxElem.style.top = "".concat(top, "px");
          boxElem.className = boxElem.className.replace(/\s?is--drag/, "") + " is--drag";
        };
        document.onmouseup = function() {
          document.onmousemove = domMousemove_1;
          document.onmouseup = domMouseup_1;
          if (remember && storage) {
            nextTick(function() {
              savePosStorage();
            });
          }
          setTimeout(function() {
            boxElem.className = boxElem.className.replace(/\s?is--drag/, "");
          }, 50);
        };
      }
    };
    var dragEvent = function(evnt) {
      evnt.preventDefault();
      var remember = props.remember, storage = props.storage;
      var _a = getDomNode(), visibleHeight = _a.visibleHeight, visibleWidth = _a.visibleWidth;
      var marginSize = XEUtils$1.toNumber(props.marginSize);
      var targetElem = evnt.target;
      var type = targetElem.getAttribute("type");
      var minWidth = XEUtils$1.toNumber(props.minWidth);
      var minHeight = XEUtils$1.toNumber(props.minHeight);
      var maxWidth = visibleWidth;
      var maxHeight = visibleHeight;
      var boxElem = getBox();
      var domMousemove = document.onmousemove;
      var domMouseup = document.onmouseup;
      var clientWidth = boxElem.clientWidth;
      var clientHeight = boxElem.clientHeight;
      var disX = evnt.clientX;
      var disY = evnt.clientY;
      var offsetTop = boxElem.offsetTop;
      var offsetLeft = boxElem.offsetLeft;
      var params = { type: "resize" };
      document.onmousemove = function(evnt2) {
        evnt2.preventDefault();
        var dragLeft;
        var dragTop;
        var width;
        var height;
        switch (type) {
          case "wl":
            dragLeft = disX - evnt2.clientX;
            width = dragLeft + clientWidth;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                boxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }
            break;
          case "swst":
            dragLeft = disX - evnt2.clientX;
            dragTop = disY - evnt2.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                boxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                boxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }
            break;
          case "swlb":
            dragLeft = disX - evnt2.clientX;
            dragTop = evnt2.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
                boxElem.style.left = "".concat(offsetLeft - dragLeft, "px");
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }
            break;
          case "st":
            dragTop = disY - evnt2.clientY;
            height = clientHeight + dragTop;
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                boxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }
            break;
          case "wr":
            dragLeft = evnt2.clientX - disX;
            width = dragLeft + clientWidth;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }
            break;
          case "sest":
            dragLeft = evnt2.clientX - disX;
            dragTop = disY - evnt2.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
                boxElem.style.top = "".concat(offsetTop - dragTop, "px");
              }
            }
            break;
          case "selb":
            dragLeft = evnt2.clientX - disX;
            dragTop = evnt2.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = "".concat(width < maxWidth ? width : maxWidth, "px");
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }
            break;
          case "sb":
            dragTop = evnt2.clientY - disY;
            height = dragTop + clientHeight;
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = "".concat(height < maxHeight ? height : maxHeight, "px");
              }
            }
            break;
        }
        boxElem.className = boxElem.className.replace(/\s?is--drag/, "") + " is--drag";
        if (remember && storage) {
          savePosStorage();
        }
        modalMethods.dispatchEvent("zoom", params, evnt2);
      };
      document.onmouseup = function() {
        reactData.zoomLocat = null;
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        setTimeout(function() {
          boxElem.className = boxElem.className.replace(/\s?is--drag/, "");
        }, 50);
      };
    };
    var renderTitles = function() {
      var _a = props.slots, propSlots = _a === void 0 ? {} : _a, showClose = props.showClose, showZoom = props.showZoom, title = props.title;
      var zoomLocat = reactData.zoomLocat;
      var titleSlot = slots.title || propSlots.title;
      var cornerSlot = slots.corner || propSlots.corner;
      var titVNs = [
        h("div", {
          class: "vxe-modal--header-title"
        }, titleSlot ? getSlotVNs(titleSlot({ $modal: $xemodal })) : title ? getFuncText(title) : GlobalConfig.i18n("vxe.alert.title"))
      ];
      var rightVNs = [];
      if (cornerSlot) {
        rightVNs.push(h("span", {
          class: "vxe-modal--corner-warpper"
        }, getSlotVNs(cornerSlot({ $modal: $xemodal }))));
      }
      if (showZoom) {
        rightVNs.push(h("i", {
          class: ["vxe-modal--zoom-btn", "trigger--btn", zoomLocat ? GlobalConfig.icon.MODAL_ZOOM_OUT : GlobalConfig.icon.MODAL_ZOOM_IN],
          title: GlobalConfig.i18n("vxe.modal.zoom".concat(zoomLocat ? "Out" : "In")),
          onClick: toggleZoomEvent
        }));
      }
      if (showClose) {
        rightVNs.push(h("i", {
          class: ["vxe-modal--close-btn", "trigger--btn", GlobalConfig.icon.MODAL_CLOSE],
          title: GlobalConfig.i18n("vxe.modal.close"),
          onClick: closeEvent
        }));
      }
      titVNs.push(h("div", {
        class: "vxe-modal--header-right"
      }, rightVNs));
      return titVNs;
    };
    var renderHeaders = function() {
      var _a = props.slots, propSlots = _a === void 0 ? {} : _a, showZoom = props.showZoom, draggable = props.draggable;
      var isMsg = computeIsMsg.value;
      var headerSlot = slots.header || propSlots.header;
      var headVNs = [];
      if (props.showHeader) {
        var headerOns = {};
        if (draggable) {
          headerOns.onMousedown = mousedownEvent;
        }
        if (showZoom && props.dblclickZoom && props.type === "modal") {
          headerOns.onDblclick = toggleZoomEvent;
        }
        headVNs.push(h("div", __assign$f({ class: ["vxe-modal--header", {
          "is--draggable": draggable,
          "is--ellipsis": !isMsg && props.showTitleOverflow
        }] }, headerOns), headerSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : getSlotVNs(headerSlot({ $modal: $xemodal })) : renderTitles()));
      }
      return headVNs;
    };
    var renderBodys = function() {
      var _a = props.slots, propSlots = _a === void 0 ? {} : _a, status = props.status, message = props.message;
      var content = props.content || message;
      var isMsg = computeIsMsg.value;
      var defaultSlot = slots.default || propSlots.default;
      var contVNs = [];
      if (status) {
        contVNs.push(h("div", {
          class: "vxe-modal--status-wrapper"
        }, [
          h("i", {
            class: ["vxe-modal--status-icon", props.iconStatus || GlobalConfig.icon["MODAL_".concat(status).toLocaleUpperCase()]]
          })
        ]));
      }
      contVNs.push(h("div", {
        class: "vxe-modal--content"
      }, defaultSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : getSlotVNs(defaultSlot({ $modal: $xemodal })) : getFuncText(content)));
      if (!isMsg) {
        contVNs.push(h(VxeLoading, {
          class: "vxe-modal--loading",
          modelValue: props.loading
        }));
      }
      return [
        h("div", {
          class: "vxe-modal--body"
        }, contVNs)
      ];
    };
    var renderBtns = function() {
      var type = props.type;
      var btnVNs = [];
      if (type === "confirm") {
        btnVNs.push(h(VxeButtonComponent, {
          ref: refCancelBtn,
          content: props.cancelButtonText || GlobalConfig.i18n("vxe.button.cancel"),
          onClick: cancelEvent
        }));
      }
      btnVNs.push(h(VxeButtonComponent, {
        ref: refConfirmBtn,
        status: "primary",
        content: props.confirmButtonText || GlobalConfig.i18n("vxe.button.confirm"),
        onClick: confirmEvent
      }));
      return btnVNs;
    };
    var renderFooters = function() {
      var _a = props.slots, propSlots = _a === void 0 ? {} : _a;
      var isMsg = computeIsMsg.value;
      var footerSlot = slots.footer || propSlots.footer;
      var footVNs = [];
      if (props.showFooter) {
        footVNs.push(h("div", {
          class: "vxe-modal--footer"
        }, footerSlot ? !reactData.inited || props.destroyOnClose && !reactData.visible ? [] : getSlotVNs(footerSlot({ $modal: $xemodal })) : renderBtns()));
      }
      if (!isMsg && props.resize) {
        footVNs.push(h("span", {
          class: "vxe-modal--resize"
        }, ["wl", "wr", "swst", "sest", "st", "swlb", "selb", "sb"].map(function(type) {
          return h("span", {
            class: "".concat(type, "-resize"),
            type,
            onMousedown: dragEvent
          });
        })));
      }
      return footVNs;
    };
    modalMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $modal: $xemodal, $event: evnt }, params));
      },
      open: openModal2,
      close: function() {
        return closeModal2("close");
      },
      getBox,
      getPosition,
      setPosition,
      isMaximized,
      zoom,
      maximize,
      revert
    };
    Object.assign($xemodal, modalMethods);
    watch(function() {
      return props.width;
    }, recalculate);
    watch(function() {
      return props.height;
    }, recalculate);
    watch(function() {
      return props.modelValue;
    }, function(value) {
      if (value) {
        openModal2();
      } else {
        closeModal2("model");
      }
    });
    onMounted(function() {
      nextTick(function() {
        if (props.storage && !props.id) {
          errLog("vxe.error.reqProp", ["modal.id"]);
        }
        if (props.modelValue) {
          openModal2();
        }
        recalculate();
      });
      if (props.escClosable) {
        GlobalEvent.on($xemodal, "keydown", handleGlobalKeydownEvent);
      }
    });
    onUnmounted(function() {
      GlobalEvent.off($xemodal, "keydown");
      removeMsgQueue();
    });
    var renderVN = function() {
      var _a;
      var className = props.className, type = props.type, animat = props.animat, loading = props.loading, status = props.status, lockScroll = props.lockScroll, lockView = props.lockView, mask = props.mask, resize = props.resize;
      var inited = reactData.inited, zoomLocat = reactData.zoomLocat, modalTop = reactData.modalTop, contentVisible = reactData.contentVisible, visible = reactData.visible;
      var vSize = computeSize.value;
      return h(Teleport, {
        to: "body",
        disabled: props.transfer ? !inited : true
      }, [
        h("div", {
          ref: refElem,
          class: ["vxe-modal--wrapper", "type--".concat(type), className || "", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["status--".concat(status)] = status, _a["is--animat"] = animat, _a["lock--scroll"] = lockScroll, _a["lock--view"] = lockView, _a["is--resize"] = resize, _a["is--mask"] = mask, _a["is--maximize"] = zoomLocat, _a["is--visible"] = contentVisible, _a["is--active"] = visible, _a["is--loading"] = loading, _a)],
          style: {
            zIndex: reactData.modalZindex,
            top: modalTop ? "".concat(modalTop, "px") : null
          },
          onClick: selfClickEvent
        }, [
          h("div", {
            ref: refModalBox,
            class: "vxe-modal--box",
            onMousedown: boxMousedownEvent
          }, renderHeaders().concat(renderBodys(), renderFooters()))
        ])
      ]);
    };
    $xemodal.renderVN = renderVN;
    return $xemodal;
  },
  render: function() {
    return this.renderVN();
  }
});
function toStringTimeDate(str) {
  if (str) {
    var rest = /* @__PURE__ */ new Date();
    var h2 = 0;
    var m = 0;
    var s = 0;
    if (XEUtils$1.isDate(str)) {
      h2 = str.getHours();
      m = str.getMinutes();
      s = str.getSeconds();
    } else {
      str = XEUtils$1.toValueString(str);
      var parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/);
      if (parses) {
        h2 = XEUtils$1.toNumber(parses[1]);
        m = XEUtils$1.toNumber(parses[3]);
        s = XEUtils$1.toNumber(parses[5]);
      }
    }
    rest.setHours(h2);
    rest.setMinutes(m);
    rest.setSeconds(s);
    return rest;
  }
  return /* @__PURE__ */ new Date("");
}
function getDateQuarter(date) {
  var month = date.getMonth();
  if (month < 3) {
    return 1;
  } else if (month < 6) {
    return 2;
  } else if (month < 9) {
    return 3;
  }
  return 4;
}
function handleNumber(val) {
  return XEUtils$1.isString(val) ? val.replace(/,/g, "") : val;
}
function toFloatValueFixed(inputValue, digitsValue) {
  if (/^-/.test("" + inputValue)) {
    return XEUtils$1.toFixed(XEUtils$1.ceil(inputValue, digitsValue), digitsValue);
  }
  return XEUtils$1.toFixed(XEUtils$1.floor(inputValue, digitsValue), digitsValue);
}
var yearSize = 12;
var monthSize = 20;
var quarterSize = 8;
const VxeInputConstructor = defineComponent({
  name: "VxeInput",
  props: {
    modelValue: [String, Number, Date],
    immediate: { type: Boolean, default: true },
    name: String,
    type: { type: String, default: "text" },
    clearable: { type: Boolean, default: function() {
      return GlobalConfig.input.clearable;
    } },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    autocomplete: { type: String, default: "off" },
    align: String,
    form: String,
    className: String,
    size: { type: String, default: function() {
      return GlobalConfig.input.size || GlobalConfig.size;
    } },
    multiple: Boolean,
    // number、integer、float
    min: { type: [String, Number], default: null },
    max: { type: [String, Number], default: null },
    step: [String, Number],
    exponential: { type: Boolean, default: function() {
      return GlobalConfig.input.exponential;
    } },
    // number、integer、float、password
    controls: { type: Boolean, default: function() {
      return GlobalConfig.input.controls;
    } },
    // float
    digits: { type: [String, Number], default: function() {
      return GlobalConfig.input.digits;
    } },
    // date、week、month、quarter、year
    startDate: { type: [String, Number, Date], default: function() {
      return GlobalConfig.input.startDate;
    } },
    endDate: { type: [String, Number, Date], default: function() {
      return GlobalConfig.input.endDate;
    } },
    minDate: [String, Number, Date],
    maxDate: [String, Number, Date],
    // 已废弃 startWeek，被 startDay 替换
    startWeek: Number,
    startDay: { type: [String, Number], default: function() {
      return GlobalConfig.input.startDay;
    } },
    labelFormat: { type: String, default: function() {
      return GlobalConfig.input.labelFormat;
    } },
    valueFormat: { type: String, default: function() {
      return GlobalConfig.input.valueFormat;
    } },
    editable: { type: Boolean, default: true },
    festivalMethod: { type: Function, default: function() {
      return GlobalConfig.input.festivalMethod;
    } },
    disabledMethod: { type: Function, default: function() {
      return GlobalConfig.input.disabledMethod;
    } },
    // week
    selectDay: { type: [String, Number], default: function() {
      return GlobalConfig.input.selectDay;
    } },
    prefixIcon: String,
    suffixIcon: String,
    placement: String,
    transfer: { type: Boolean, default: function() {
      return GlobalConfig.input.transfer;
    } }
  },
  emits: [
    "update:modelValue",
    "input",
    "change",
    "keydown",
    "keyup",
    "wheel",
    "click",
    "focus",
    "blur",
    "clear",
    "search-click",
    "toggle-visible",
    "prev-number",
    "next-number",
    "prefix-click",
    "suffix-click",
    "date-prev",
    "date-today",
    "date-next"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      inited: false,
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      animatVisible: false,
      panelStyle: null,
      panelPlacement: "",
      isActivated: false,
      inputValue: props.modelValue,
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: "",
      datePanelType: "day",
      selectMonth: null,
      currentDate: null
    });
    var refElem = ref();
    var refInputTarget = ref();
    var refInputPanel = ref();
    var refInputTimeBody = ref();
    var refMaps = {
      refElem,
      refInput: refInputTarget
    };
    var $xeinput = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var inputMethods = {};
    var parseDate2 = function(value, format) {
      var type = props.type;
      if (type === "time") {
        return toStringTimeDate(value);
      }
      return XEUtils$1.toStringDate(value, format);
    };
    var computeIsDateTimeType = computed(function() {
      var type = props.type;
      return type === "time" || type === "datetime";
    });
    var computeIsNumType = computed(function() {
      return ["number", "integer", "float"].indexOf(props.type) > -1;
    });
    var computeIsDatePickerType = computed(function() {
      var isDateTimeType = computeIsDateTimeType.value;
      return isDateTimeType || ["date", "week", "month", "quarter", "year"].indexOf(props.type) > -1;
    });
    var computeIsPawdType = computed(function() {
      return props.type === "password";
    });
    var computeIsSearchType = computed(function() {
      return props.type === "search";
    });
    var computeDigitsValue = computed(function() {
      return XEUtils$1.toInteger(props.digits) || 1;
    });
    var computeStepValue = computed(function() {
      var type = props.type;
      var digitsValue = computeDigitsValue.value;
      var step = props.step;
      if (type === "integer") {
        return XEUtils$1.toInteger(step) || 1;
      } else if (type === "float") {
        return XEUtils$1.toNumber(step) || 1 / Math.pow(10, digitsValue);
      }
      return XEUtils$1.toNumber(step) || 1;
    });
    var computeIsClearable = computed(function() {
      var type = props.type;
      var isNumType = computeIsNumType.value;
      var isDatePickerType = computeIsDatePickerType.value;
      var isPawdType = computeIsPawdType.value;
      return props.clearable && (isPawdType || isNumType || isDatePickerType || type === "text" || type === "search");
    });
    var computeDateStartTime = computed(function() {
      return props.startDate ? XEUtils$1.toStringDate(props.startDate) : null;
    });
    var computeDateEndTime = computed(function() {
      return props.endDate ? XEUtils$1.toStringDate(props.endDate) : null;
    });
    var computeSupportMultiples = computed(function() {
      return ["date", "week", "month", "quarter", "year"].includes(props.type);
    });
    var computeDateListValue = computed(function() {
      var modelValue = props.modelValue, multiple = props.multiple;
      var isDatePickerType = computeIsDatePickerType.value;
      var dateValueFormat = computeDateValueFormat.value;
      if (multiple && modelValue && isDatePickerType) {
        return XEUtils$1.toValueString(modelValue).split(",").map(function(item) {
          var date = parseDate2(item, dateValueFormat);
          if (XEUtils$1.isValidDate(date)) {
            return date;
          }
          return null;
        });
      }
      return [];
    });
    var computeDateMultipleValue = computed(function() {
      var dateListValue = computeDateListValue.value;
      var dateValueFormat = computeDateValueFormat.value;
      return dateListValue.map(function(date) {
        return XEUtils$1.toDateString(date, dateValueFormat);
      });
    });
    var computeDateMultipleLabel = computed(function() {
      var dateListValue = computeDateListValue.value;
      var dateLabelFormat = computeDateLabelFormat.value;
      return dateListValue.map(function(date) {
        return XEUtils$1.toDateString(date, dateLabelFormat);
      }).join(", ");
    });
    var computeDateValueFormat = computed(function() {
      var type = props.type;
      return type === "time" ? "HH:mm:ss" : props.valueFormat || (type === "datetime" ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd");
    });
    var computeDateValue = computed(function() {
      var modelValue = props.modelValue;
      var isDatePickerType = computeIsDatePickerType.value;
      var dateValueFormat = computeDateValueFormat.value;
      var val = null;
      if (modelValue && isDatePickerType) {
        var date = parseDate2(modelValue, dateValueFormat);
        if (XEUtils$1.isValidDate(date)) {
          val = date;
        }
      }
      return val;
    });
    var computeIsDisabledPrevDateBtn = computed(function() {
      var dateStartTime = computeDateStartTime.value;
      var selectMonth = reactData.selectMonth;
      if (selectMonth && dateStartTime) {
        return selectMonth <= dateStartTime;
      }
      return false;
    });
    var computeIsDisabledNextDateBtn = computed(function() {
      var dateEndTime = computeDateEndTime.value;
      var selectMonth = reactData.selectMonth;
      if (selectMonth && dateEndTime) {
        return selectMonth >= dateEndTime;
      }
      return false;
    });
    var computeDateTimeLabel = computed(function() {
      var datetimePanelValue = reactData.datetimePanelValue;
      if (datetimePanelValue) {
        return XEUtils$1.toDateString(datetimePanelValue, "HH:mm:ss");
      }
      return "";
    });
    var computeDateHMSTime = computed(function() {
      var dateValue = computeDateValue.value;
      var isDateTimeType = computeIsDateTimeType.value;
      return dateValue && isDateTimeType ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1e3 : 0;
    });
    var computeDateLabelFormat = computed(function() {
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        return props.labelFormat || GlobalConfig.i18n("vxe.input.date.labelFormat.".concat(props.type));
      }
      return null;
    });
    var computeYearList = computed(function() {
      var selectMonth = reactData.selectMonth, currentDate = reactData.currentDate;
      var years = [];
      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var selectFullYear = selectMonth.getFullYear();
        var startYearDate = new Date(selectFullYear - selectFullYear % yearSize, 0, 1);
        for (var index = -4; index < yearSize + 4; index++) {
          var date = XEUtils$1.getWhatYear(startYearDate, index, "first");
          var itemFullYear = date.getFullYear();
          years.push({
            date,
            isCurrent: true,
            isPrev: index < 0,
            isNow: currFullYear === itemFullYear,
            isNext: index >= yearSize,
            year: itemFullYear
          });
        }
      }
      return years;
    });
    var computeSelectDatePanelLabel = computed(function() {
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        var datePanelType = reactData.datePanelType, selectMonth = reactData.selectMonth;
        var yearList = computeYearList.value;
        var year = "";
        var month = void 0;
        if (selectMonth) {
          year = selectMonth.getFullYear();
          month = selectMonth.getMonth() + 1;
        }
        if (datePanelType === "quarter") {
          return GlobalConfig.i18n("vxe.input.date.quarterLabel", [year]);
        } else if (datePanelType === "month") {
          return GlobalConfig.i18n("vxe.input.date.monthLabel", [year]);
        } else if (datePanelType === "year") {
          return yearList.length ? "".concat(yearList[0].year, " - ").concat(yearList[yearList.length - 1].year) : "";
        }
        return GlobalConfig.i18n("vxe.input.date.dayLabel", [year, month ? GlobalConfig.i18n("vxe.input.date.m".concat(month)) : "-"]);
      }
      return "";
    });
    var computeFirstDayOfWeek = computed(function() {
      var startDay = props.startDay, startWeek = props.startWeek;
      return XEUtils$1.toNumber(XEUtils$1.isNumber(startDay) || XEUtils$1.isString(startDay) ? startDay : startWeek);
    });
    var computeWeekDatas = computed(function() {
      var weeks = [];
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        var sWeek = computeFirstDayOfWeek.value;
        weeks.push(sWeek);
        for (var index = 0; index < 6; index++) {
          if (sWeek >= 6) {
            sWeek = 0;
          } else {
            sWeek++;
          }
          weeks.push(sWeek);
        }
      }
      return weeks;
    });
    var computeDateHeaders = computed(function() {
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        var weekDatas = computeWeekDatas.value;
        return weekDatas.map(function(day) {
          return {
            value: day,
            label: GlobalConfig.i18n("vxe.input.date.weeks.w".concat(day))
          };
        });
      }
      return [];
    });
    var computeWeekHeaders = computed(function() {
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        var dateHeaders = computeDateHeaders.value;
        return [{ label: GlobalConfig.i18n("vxe.input.date.weeks.w") }].concat(dateHeaders);
      }
      return [];
    });
    var computeYearDatas = computed(function() {
      var yearList = computeYearList.value;
      return XEUtils$1.chunk(yearList, 4);
    });
    var computeQuarterList = computed(function() {
      var selectMonth = reactData.selectMonth, currentDate = reactData.currentDate;
      var quarters = [];
      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var currQuarter = getDateQuarter(currentDate);
        var firstYear = XEUtils$1.getWhatYear(selectMonth, 0, "first");
        var selFullYear = firstYear.getFullYear();
        for (var index = -2; index < quarterSize - 2; index++) {
          var date = XEUtils$1.getWhatQuarter(firstYear, index);
          var itemFullYear = date.getFullYear();
          var itemQuarter = getDateQuarter(date);
          var isPrev = itemFullYear < selFullYear;
          quarters.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemQuarter === currQuarter,
            isNext: !isPrev && itemFullYear > selFullYear,
            quarter: itemQuarter
          });
        }
      }
      return quarters;
    });
    var computeQuarterDatas = computed(function() {
      var quarterList = computeQuarterList.value;
      return XEUtils$1.chunk(quarterList, 2);
    });
    var computeMonthList = computed(function() {
      var selectMonth = reactData.selectMonth, currentDate = reactData.currentDate;
      var months = [];
      if (selectMonth && currentDate) {
        var currFullYear = currentDate.getFullYear();
        var currMonth = currentDate.getMonth();
        var selFullYear = XEUtils$1.getWhatYear(selectMonth, 0, "first").getFullYear();
        for (var index = -4; index < monthSize - 4; index++) {
          var date = XEUtils$1.getWhatYear(selectMonth, 0, index);
          var itemFullYear = date.getFullYear();
          var itemMonth = date.getMonth();
          var isPrev = itemFullYear < selFullYear;
          months.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth,
            isNext: !isPrev && itemFullYear > selFullYear,
            month: itemMonth
          });
        }
      }
      return months;
    });
    var computeMonthDatas = computed(function() {
      var monthList = computeMonthList.value;
      return XEUtils$1.chunk(monthList, 4);
    });
    var computeDayList = computed(function() {
      var selectMonth = reactData.selectMonth, currentDate = reactData.currentDate;
      var days = [];
      if (selectMonth && currentDate) {
        var dateHMSTime = computeDateHMSTime.value;
        var weekDatas = computeWeekDatas.value;
        var currFullYear = currentDate.getFullYear();
        var currMonth = currentDate.getMonth();
        var currDate = currentDate.getDate();
        var selFullYear = selectMonth.getFullYear();
        var selMonth = selectMonth.getMonth();
        var selDay = selectMonth.getDay();
        var prevOffsetDate = -weekDatas.indexOf(selDay);
        var startDayDate = new Date(XEUtils$1.getWhatDay(selectMonth, prevOffsetDate).getTime() + dateHMSTime);
        for (var index = 0; index < 42; index++) {
          var date = XEUtils$1.getWhatDay(startDayDate, index);
          var itemFullYear = date.getFullYear();
          var itemMonth = date.getMonth();
          var itemDate = date.getDate();
          var isPrev = date < selectMonth;
          days.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear && itemMonth === selMonth,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth && itemDate === currDate,
            isNext: !isPrev && selMonth !== itemMonth,
            label: itemDate
          });
        }
      }
      return days;
    });
    var computeDayDatas = computed(function() {
      var dayList = computeDayList.value;
      return XEUtils$1.chunk(dayList, 7);
    });
    var computeWeekDates = computed(function() {
      var dayDatas = computeDayDatas.value;
      var firstDayOfWeek = computeFirstDayOfWeek.value;
      return dayDatas.map(function(list) {
        var firstItem = list[0];
        var item = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: XEUtils$1.getYearWeek(firstItem.date, firstDayOfWeek)
        };
        return [item].concat(list);
      });
    });
    var computeHourList = computed(function() {
      var list = [];
      var isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        for (var index = 0; index < 24; index++) {
          list.push({
            value: index,
            label: ("" + index).padStart(2, "0")
          });
        }
      }
      return list;
    });
    var computeMinuteList = computed(function() {
      var list = [];
      var isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        for (var index = 0; index < 60; index++) {
          list.push({
            value: index,
            label: ("" + index).padStart(2, "0")
          });
        }
      }
      return list;
    });
    var computeSecondList = computed(function() {
      var minuteList = computeMinuteList.value;
      return minuteList;
    });
    var computeInpReadonly = computed(function() {
      var type = props.type, readonly = props.readonly, editable = props.editable, multiple = props.multiple;
      return readonly || multiple || !editable || type === "week" || type === "quarter";
    });
    var computeInputType = computed(function() {
      var type = props.type;
      var showPwd = reactData.showPwd;
      var isNumType = computeIsNumType.value;
      var isDatePickerType = computeIsDatePickerType.value;
      var isPawdType = computeIsPawdType.value;
      if (isDatePickerType || isNumType || isPawdType && showPwd || type === "number") {
        return "text";
      }
      return type;
    });
    var computeInpPlaceholder = computed(function() {
      var placeholder = props.placeholder;
      if (placeholder) {
        return getFuncText(placeholder);
      }
      return "";
    });
    var computeInpMaxlength = computed(function() {
      var maxlength = props.maxlength;
      var isNumType = computeIsNumType.value;
      return isNumType && !XEUtils$1.toNumber(maxlength) ? 16 : maxlength;
    });
    var computeInpImmediate = computed(function() {
      var type = props.type, immediate = props.immediate;
      return immediate || !(type === "text" || type === "number" || type === "integer" || type === "float");
    });
    var computeNumValue = computed(function() {
      var type = props.type;
      var inputValue = reactData.inputValue;
      var isNumType = computeIsNumType.value;
      if (isNumType) {
        return type === "integer" ? XEUtils$1.toInteger(handleNumber(inputValue)) : XEUtils$1.toNumber(handleNumber(inputValue));
      }
      return 0;
    });
    var computeIsDisabledSubtractNumber = computed(function() {
      var min2 = props.min;
      var inputValue = reactData.inputValue;
      var isNumType = computeIsNumType.value;
      var numValue = computeNumValue.value;
      if ((inputValue || inputValue === 0) && isNumType && min2 !== null) {
        return numValue <= XEUtils$1.toNumber(min2);
      }
      return false;
    });
    var computeIsDisabledAddNumber = computed(function() {
      var max2 = props.max;
      var inputValue = reactData.inputValue;
      var isNumType = computeIsNumType.value;
      var numValue = computeNumValue.value;
      if ((inputValue || inputValue === 0) && isNumType && max2 !== null) {
        return numValue >= XEUtils$1.toNumber(max2);
      }
      return false;
    });
    var getNumberValue = function(val) {
      var type = props.type, exponential = props.exponential;
      var inpMaxlength = computeInpMaxlength.value;
      var digitsValue = computeDigitsValue.value;
      var restVal = type === "float" ? toFloatValueFixed(val, digitsValue) : XEUtils$1.toValueString(val);
      if (exponential && (val === restVal || XEUtils$1.toValueString(val).toLowerCase() === XEUtils$1.toNumber(restVal).toExponential())) {
        return val;
      }
      return restVal.slice(0, inpMaxlength);
    };
    var triggerEvent2 = function(evnt) {
      var inputValue = reactData.inputValue;
      inputMethods.dispatchEvent(evnt.type, { value: inputValue }, evnt);
    };
    var emitModel = function(value, evnt) {
      reactData.inputValue = value;
      emit("update:modelValue", value);
      inputMethods.dispatchEvent("input", { value }, evnt);
      if (XEUtils$1.toValueString(props.modelValue) !== value) {
        inputMethods.dispatchEvent("change", { value }, evnt);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
        }
      }
    };
    var emitInputEvent = function(value, evnt) {
      var isDatePickerType = computeIsDatePickerType.value;
      var inpImmediate = computeInpImmediate.value;
      reactData.inputValue = value;
      if (!isDatePickerType) {
        if (inpImmediate) {
          emitModel(value, evnt);
        } else {
          inputMethods.dispatchEvent("input", { value }, evnt);
        }
      }
    };
    var inputEvent = function(evnt) {
      var inputElem = evnt.target;
      var value = inputElem.value;
      emitInputEvent(value, evnt);
    };
    var changeEvent = function(evnt) {
      var inpImmediate = computeInpImmediate.value;
      if (!inpImmediate) {
        triggerEvent2(evnt);
      }
    };
    var focusEvent = function(evnt) {
      reactData.isActivated = true;
      triggerEvent2(evnt);
    };
    var clickPrefixEvent = function(evnt) {
      var disabled = props.disabled;
      if (!disabled) {
        var inputValue = reactData.inputValue;
        inputMethods.dispatchEvent("prefix-click", { value: inputValue }, evnt);
      }
    };
    var hidePanelTimeout;
    var hidePanel = function() {
      return new Promise(function(resolve) {
        reactData.visiblePanel = false;
        hidePanelTimeout = window.setTimeout(function() {
          reactData.animatVisible = false;
          resolve();
        }, 350);
      });
    };
    var clearValueEvent = function(evnt, value) {
      var type = props.type;
      var isNumType = computeIsNumType.value;
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        hidePanel();
      }
      if (isNumType || ["text", "search", "password"].indexOf(type) > -1) {
        focus();
      }
      inputMethods.dispatchEvent("clear", { value }, evnt);
    };
    var clickSuffixEvent = function(evnt) {
      var disabled = props.disabled;
      if (!disabled) {
        if (hasClass(evnt.currentTarget, "is--clear")) {
          emitModel("", evnt);
          clearValueEvent(evnt, "");
        } else {
          var inputValue = reactData.inputValue;
          inputMethods.dispatchEvent("suffix-click", { value: inputValue }, evnt);
        }
      }
    };
    var dateParseValue = function(value) {
      var type = props.type;
      var valueFormat = props.valueFormat;
      var dateLabelFormat = computeDateLabelFormat.value;
      var firstDayOfWeek = computeFirstDayOfWeek.value;
      var dValue = null;
      var dLabel = "";
      if (value) {
        dValue = parseDate2(value, valueFormat);
      }
      if (XEUtils$1.isValidDate(dValue)) {
        dLabel = XEUtils$1.toDateString(dValue, dateLabelFormat, { firstDay: firstDayOfWeek });
        if (dateLabelFormat && type === "week") {
          var firstWeekDate = XEUtils$1.getWhatWeek(dValue, 0, firstDayOfWeek, firstDayOfWeek);
          if (firstWeekDate.getFullYear() < dValue.getFullYear()) {
            var yyIndex = dateLabelFormat.indexOf("yyyy");
            if (yyIndex > -1) {
              var yyNum = Number(dLabel.substring(yyIndex, yyIndex + 4));
              if (yyNum && !isNaN(yyNum)) {
                dLabel = dLabel.replace("".concat(yyNum), "".concat(yyNum - 1));
              }
            }
          }
        }
      } else {
        dValue = null;
      }
      reactData.datePanelValue = dValue;
      reactData.datePanelLabel = dLabel;
    };
    var changeValue = function() {
      var isDatePickerType = computeIsDatePickerType.value;
      var inputValue = reactData.inputValue;
      if (isDatePickerType) {
        dateParseValue(inputValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    };
    var initValue = function() {
      var type = props.type;
      var inputValue = reactData.inputValue;
      var isDatePickerType = computeIsDatePickerType.value;
      var digitsValue = computeDigitsValue.value;
      if (isDatePickerType) {
        changeValue();
      } else if (type === "float") {
        if (inputValue) {
          var validValue = toFloatValueFixed(inputValue, digitsValue);
          if (inputValue !== validValue) {
            emitModel(validValue, { type: "init" });
          }
        }
      }
    };
    var vaildMaxNum = function(num) {
      return props.max === null || XEUtils$1.toNumber(num) <= XEUtils$1.toNumber(props.max);
    };
    var vaildMinNum = function(num) {
      return props.min === null || XEUtils$1.toNumber(num) >= XEUtils$1.toNumber(props.min);
    };
    var dateRevert = function() {
      reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
    };
    var dateCheckMonth = function(date) {
      var month = XEUtils$1.getWhatMonth(date, 0, "first");
      if (!XEUtils$1.isEqual(month, reactData.selectMonth)) {
        reactData.selectMonth = month;
      }
    };
    var dateChange = function(date) {
      var modelValue = props.modelValue, multiple = props.multiple;
      var datetimePanelValue = reactData.datetimePanelValue;
      var isDateTimeType = computeIsDateTimeType.value;
      var dateValueFormat = computeDateValueFormat.value;
      var firstDayOfWeek = computeFirstDayOfWeek.value;
      if (props.type === "week") {
        var sWeek = XEUtils$1.toNumber(props.selectDay);
        date = XEUtils$1.getWhatWeek(date, 0, sWeek, firstDayOfWeek);
      } else if (isDateTimeType) {
        date.setHours(datetimePanelValue.getHours());
        date.setMinutes(datetimePanelValue.getMinutes());
        date.setSeconds(datetimePanelValue.getSeconds());
      }
      var inpVal = XEUtils$1.toDateString(date, dateValueFormat, { firstDay: firstDayOfWeek });
      dateCheckMonth(date);
      if (multiple) {
        var dateMultipleValue = computeDateMultipleValue.value;
        if (isDateTimeType) {
          var dateListValue = computeDateListValue.value;
          var datetimeRest_1 = [];
          dateListValue.forEach(function(item) {
            if (item && !XEUtils$1.isDateSame(date, item, "yyyyMMdd")) {
              item.setHours(datetimePanelValue.getHours());
              item.setMinutes(datetimePanelValue.getMinutes());
              item.setSeconds(datetimePanelValue.getSeconds());
              datetimeRest_1.push(item);
            }
          });
          datetimeRest_1.push(date);
          emitModel(datetimeRest_1.map(function(date2) {
            return XEUtils$1.toDateString(date2, dateValueFormat);
          }).join(","), { type: "update" });
        } else {
          if (dateMultipleValue.some(function(val) {
            return XEUtils$1.isEqual(val, inpVal);
          })) {
            emitModel(dateMultipleValue.filter(function(val) {
              return !XEUtils$1.isEqual(val, inpVal);
            }).join(","), { type: "update" });
          } else {
            emitModel(dateMultipleValue.concat([inpVal]).join(","), { type: "update" });
          }
        }
      } else {
        if (!XEUtils$1.isEqual(modelValue, inpVal)) {
          emitModel(inpVal, { type: "update" });
        }
      }
    };
    var afterCheckValue = function() {
      var type = props.type, min2 = props.min, max2 = props.max, exponential = props.exponential;
      var inputValue = reactData.inputValue, datetimePanelValue = reactData.datetimePanelValue;
      var isNumType = computeIsNumType.value;
      var isDatePickerType = computeIsDatePickerType.value;
      var dateLabelFormat = computeDateLabelFormat.value;
      var inpReadonly = computeInpReadonly.value;
      if (!inpReadonly) {
        if (isNumType) {
          if (inputValue) {
            var inpNumVal = type === "integer" ? XEUtils$1.toInteger(handleNumber(inputValue)) : XEUtils$1.toNumber(handleNumber(inputValue));
            if (!vaildMinNum(inpNumVal)) {
              inpNumVal = min2;
            } else if (!vaildMaxNum(inpNumVal)) {
              inpNumVal = max2;
            }
            if (exponential) {
              var inpStringVal = XEUtils$1.toValueString(inputValue).toLowerCase();
              if (inpStringVal === XEUtils$1.toNumber(inpNumVal).toExponential()) {
                inpNumVal = inpStringVal;
              }
            }
            emitModel(getNumberValue(inpNumVal), { type: "check" });
          }
        } else if (isDatePickerType) {
          if (inputValue) {
            var inpDateVal = parseDate2(inputValue, dateLabelFormat);
            if (XEUtils$1.isValidDate(inpDateVal)) {
              if (type === "time") {
                inpDateVal = XEUtils$1.toDateString(inpDateVal, dateLabelFormat);
                if (inputValue !== inpDateVal) {
                  emitModel(inpDateVal, { type: "check" });
                }
                reactData.inputValue = inpDateVal;
              } else {
                var isChange = false;
                var firstDayOfWeek = computeFirstDayOfWeek.value;
                if (type === "datetime") {
                  var dateValue = computeDateValue.value;
                  if (inputValue !== XEUtils$1.toDateString(dateValue, dateLabelFormat) || inputValue !== XEUtils$1.toDateString(inpDateVal, dateLabelFormat)) {
                    isChange = true;
                    datetimePanelValue.setHours(inpDateVal.getHours());
                    datetimePanelValue.setMinutes(inpDateVal.getMinutes());
                    datetimePanelValue.setSeconds(inpDateVal.getSeconds());
                  }
                } else {
                  isChange = true;
                }
                reactData.inputValue = XEUtils$1.toDateString(inpDateVal, dateLabelFormat, { firstDay: firstDayOfWeek });
                if (isChange) {
                  dateChange(inpDateVal);
                }
              }
            } else {
              dateRevert();
            }
          } else {
            emitModel("", { type: "check" });
          }
        }
      }
    };
    var blurEvent = function(evnt) {
      var inputValue = reactData.inputValue;
      var inpImmediate = computeInpImmediate.value;
      if (!inpImmediate) {
        emitModel(inputValue, evnt);
      }
      afterCheckValue();
      if (!reactData.visiblePanel) {
        reactData.isActivated = false;
      }
      inputMethods.dispatchEvent("blur", { value: inputValue }, evnt);
    };
    var passwordToggleEvent = function(evnt) {
      var readonly = props.readonly, disabled = props.disabled;
      var showPwd = reactData.showPwd;
      if (!disabled && !readonly) {
        reactData.showPwd = !showPwd;
      }
      inputMethods.dispatchEvent("toggle-visible", { visible: reactData.showPwd }, evnt);
    };
    var searchEvent = function(evnt) {
      inputMethods.dispatchEvent("search-click", {}, evnt);
    };
    var numberChange = function(isPlus, evnt) {
      var min2 = props.min, max2 = props.max, type = props.type;
      var inputValue = reactData.inputValue;
      var stepValue = computeStepValue.value;
      var numValue = type === "integer" ? XEUtils$1.toInteger(handleNumber(inputValue)) : XEUtils$1.toNumber(handleNumber(inputValue));
      var newValue = isPlus ? XEUtils$1.add(numValue, stepValue) : XEUtils$1.subtract(numValue, stepValue);
      var restNum;
      if (!vaildMinNum(newValue)) {
        restNum = min2;
      } else if (!vaildMaxNum(newValue)) {
        restNum = max2;
      } else {
        restNum = newValue;
      }
      emitInputEvent(getNumberValue(restNum), evnt);
    };
    var downbumTimeout;
    var numberNextEvent = function(evnt) {
      var readonly = props.readonly, disabled = props.disabled;
      var isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      clearTimeout(downbumTimeout);
      if (!disabled && !readonly && !isDisabledSubtractNumber) {
        numberChange(false, evnt);
      }
      inputMethods.dispatchEvent("next-number", {}, evnt);
    };
    var numberDownNextEvent = function(evnt) {
      downbumTimeout = window.setTimeout(function() {
        numberNextEvent(evnt);
        numberDownNextEvent(evnt);
      }, 60);
    };
    var numberPrevEvent = function(evnt) {
      var readonly = props.readonly, disabled = props.disabled;
      var isDisabledAddNumber = computeIsDisabledAddNumber.value;
      clearTimeout(downbumTimeout);
      if (!disabled && !readonly && !isDisabledAddNumber) {
        numberChange(true, evnt);
      }
      inputMethods.dispatchEvent("prev-number", {}, evnt);
    };
    var numberKeydownEvent = function(evnt) {
      var isUpArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_UP);
      var isDwArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_DOWN);
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault();
        if (isUpArrow) {
          numberPrevEvent(evnt);
        } else {
          numberNextEvent(evnt);
        }
      }
    };
    var keydownEvent = function(evnt) {
      var exponential = props.exponential, controls = props.controls;
      var isNumType = computeIsNumType.value;
      if (isNumType) {
        var isCtrlKey = evnt.ctrlKey;
        var isShiftKey = evnt.shiftKey;
        var isAltKey = evnt.altKey;
        var keyCode = evnt.keyCode;
        if (!isCtrlKey && !isShiftKey && !isAltKey && (hasEventKey(evnt, EVENT_KEYS.SPACEBAR) || (!exponential || keyCode !== 69) && (keyCode >= 65 && keyCode <= 90) || keyCode >= 186 && keyCode <= 188 || keyCode >= 191)) {
          evnt.preventDefault();
        }
        if (controls) {
          numberKeydownEvent(evnt);
        }
      }
      triggerEvent2(evnt);
    };
    var keyupEvent = function(evnt) {
      triggerEvent2(evnt);
    };
    var numberStopDown = function() {
      clearTimeout(downbumTimeout);
    };
    var numberDownPrevEvent = function(evnt) {
      downbumTimeout = window.setTimeout(function() {
        numberPrevEvent(evnt);
        numberDownPrevEvent(evnt);
      }, 60);
    };
    var numberMousedownEvent = function(evnt) {
      numberStopDown();
      if (evnt.button === 0) {
        var isPrevNumber_1 = hasClass(evnt.currentTarget, "is--prev");
        if (isPrevNumber_1) {
          numberPrevEvent(evnt);
        } else {
          numberNextEvent(evnt);
        }
        downbumTimeout = window.setTimeout(function() {
          if (isPrevNumber_1) {
            numberDownPrevEvent(evnt);
          } else {
            numberDownNextEvent(evnt);
          }
        }, 500);
      }
    };
    var wheelEvent = function(evnt) {
      var isNumType = computeIsNumType.value;
      if (isNumType && props.controls) {
        if (reactData.isActivated) {
          var delta = evnt.deltaY;
          if (delta > 0) {
            numberNextEvent(evnt);
          } else if (delta < 0) {
            numberPrevEvent(evnt);
          }
          evnt.preventDefault();
        }
      }
      triggerEvent2(evnt);
    };
    var dateMonthHandle = function(date, offsetMonth) {
      reactData.selectMonth = XEUtils$1.getWhatMonth(date, offsetMonth, "first");
    };
    var dateNowHandle = function() {
      var currentDate = XEUtils$1.getWhatDay(Date.now(), 0, "first");
      reactData.currentDate = currentDate;
      dateMonthHandle(currentDate, 0);
    };
    var dateToggleTypeEvent = function() {
      var datePanelType = reactData.datePanelType;
      if (datePanelType === "month" || datePanelType === "quarter") {
        datePanelType = "year";
      } else {
        datePanelType = "month";
      }
      reactData.datePanelType = datePanelType;
    };
    var datePrevEvent = function(evnt) {
      var type = props.type;
      var datePanelType = reactData.datePanelType, selectMonth = reactData.selectMonth;
      var isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      if (!isDisabledPrevDateBtn) {
        if (type === "year") {
          reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, -yearSize, "first");
        } else if (type === "month" || type === "quarter") {
          if (datePanelType === "year") {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, -yearSize, "first");
          } else {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, -1, "first");
          }
        } else {
          if (datePanelType === "year") {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, -yearSize, "first");
          } else if (datePanelType === "month") {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, -1, "first");
          } else {
            reactData.selectMonth = XEUtils$1.getWhatMonth(selectMonth, -1, "first");
          }
        }
        inputMethods.dispatchEvent("date-prev", { type }, evnt);
      }
    };
    var dateTodayMonthEvent = function(evnt) {
      dateNowHandle();
      if (!props.multiple) {
        dateChange(reactData.currentDate);
        hidePanel();
      }
      inputMethods.dispatchEvent("date-today", { type: props.type }, evnt);
    };
    var dateNextEvent = function(evnt) {
      var type = props.type;
      var datePanelType = reactData.datePanelType, selectMonth = reactData.selectMonth;
      var isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      if (!isDisabledNextDateBtn) {
        if (type === "year") {
          reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, yearSize, "first");
        } else if (type === "month" || type === "quarter") {
          if (datePanelType === "year") {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, yearSize, "first");
          } else {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, 1, "first");
          }
        } else {
          if (datePanelType === "year") {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, yearSize, "first");
          } else if (datePanelType === "month") {
            reactData.selectMonth = XEUtils$1.getWhatYear(selectMonth, 1, "first");
          } else {
            reactData.selectMonth = XEUtils$1.getWhatMonth(selectMonth, 1, "first");
          }
        }
        inputMethods.dispatchEvent("date-next", { type }, evnt);
      }
    };
    var isDateDisabled = function(item) {
      var disabledMethod = props.disabledMethod;
      var datePanelType = reactData.datePanelType;
      return disabledMethod && disabledMethod({ type: datePanelType, viewType: datePanelType, date: item.date, $input: $xeinput });
    };
    var dateSelectItem = function(date) {
      var type = props.type, multiple = props.multiple;
      var datePanelType = reactData.datePanelType;
      if (type === "month") {
        if (datePanelType === "year") {
          reactData.datePanelType = "month";
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (!multiple) {
            hidePanel();
          }
        }
      } else if (type === "year") {
        dateChange(date);
        if (!multiple) {
          hidePanel();
        }
      } else if (type === "quarter") {
        if (datePanelType === "year") {
          reactData.datePanelType = "quarter";
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (!multiple) {
            hidePanel();
          }
        }
      } else {
        if (datePanelType === "month") {
          reactData.datePanelType = type === "week" ? type : "day";
          dateCheckMonth(date);
        } else if (datePanelType === "year") {
          reactData.datePanelType = "month";
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (!multiple) {
            hidePanel();
          }
        }
      }
    };
    var dateSelectEvent = function(item) {
      if (!isDateDisabled(item)) {
        dateSelectItem(item.date);
      }
    };
    var dateMoveDay = function(offsetDay) {
      if (!isDateDisabled({ date: offsetDay })) {
        var dayList = computeDayList.value;
        if (!dayList.some(function(item) {
          return XEUtils$1.isDateSame(item.date, offsetDay, "yyyyMMdd");
        })) {
          dateCheckMonth(offsetDay);
        }
        dateParseValue(offsetDay);
      }
    };
    var dateMoveYear = function(offsetYear) {
      if (!isDateDisabled({ date: offsetYear })) {
        var yearList = computeYearList.value;
        if (!yearList.some(function(item) {
          return XEUtils$1.isDateSame(item.date, offsetYear, "yyyy");
        })) {
          dateCheckMonth(offsetYear);
        }
        dateParseValue(offsetYear);
      }
    };
    var dateMoveQuarter = function(offsetQuarter) {
      if (!isDateDisabled({ date: offsetQuarter })) {
        var quarterList = computeQuarterList.value;
        if (!quarterList.some(function(item) {
          return XEUtils$1.isDateSame(item.date, offsetQuarter, "yyyyq");
        })) {
          dateCheckMonth(offsetQuarter);
        }
        dateParseValue(offsetQuarter);
      }
    };
    var dateMoveMonth = function(offsetMonth) {
      if (!isDateDisabled({ date: offsetMonth })) {
        var monthList = computeMonthList.value;
        if (!monthList.some(function(item) {
          return XEUtils$1.isDateSame(item.date, offsetMonth, "yyyyMM");
        })) {
          dateCheckMonth(offsetMonth);
        }
        dateParseValue(offsetMonth);
      }
    };
    var dateMouseenterEvent = function(item) {
      if (!isDateDisabled(item)) {
        var datePanelType = reactData.datePanelType;
        if (datePanelType === "month") {
          dateMoveMonth(item.date);
        } else if (datePanelType === "quarter") {
          dateMoveQuarter(item.date);
        } else if (datePanelType === "year") {
          dateMoveYear(item.date);
        } else {
          dateMoveDay(item.date);
        }
      }
    };
    var updateTimePos = function(liElem) {
      if (liElem) {
        var height = liElem.offsetHeight;
        var ulElem = liElem.parentNode;
        ulElem.scrollTop = liElem.offsetTop - height * 4;
      }
    };
    var dateTimeChangeEvent = function(evnt) {
      reactData.datetimePanelValue = new Date(reactData.datetimePanelValue.getTime());
      updateTimePos(evnt.currentTarget);
    };
    var dateHourEvent = function(evnt, item) {
      reactData.datetimePanelValue.setHours(item.value);
      dateTimeChangeEvent(evnt);
    };
    var dateConfirmEvent = function() {
      var multiple = props.multiple;
      var dateValue = computeDateValue.value;
      var isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType || multiple) {
        dateChange(dateValue || reactData.currentDate);
      }
      hidePanel();
    };
    var dateMinuteEvent = function(evnt, item) {
      reactData.datetimePanelValue.setMinutes(item.value);
      dateTimeChangeEvent(evnt);
    };
    var dateSecondEvent = function(evnt, item) {
      reactData.datetimePanelValue.setSeconds(item.value);
      dateTimeChangeEvent(evnt);
    };
    var dateOffsetEvent = function(evnt) {
      var isActivated = reactData.isActivated, datePanelValue = reactData.datePanelValue, datePanelType = reactData.datePanelType;
      if (isActivated) {
        evnt.preventDefault();
        var isLeftArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_LEFT);
        var isUpArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_UP);
        var isRightArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_RIGHT);
        var isDwArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_DOWN);
        if (datePanelType === "year") {
          var offsetYear = XEUtils$1.getWhatYear(datePanelValue || Date.now(), 0, "first");
          if (isLeftArrow) {
            offsetYear = XEUtils$1.getWhatYear(offsetYear, -1);
          } else if (isUpArrow) {
            offsetYear = XEUtils$1.getWhatYear(offsetYear, -4);
          } else if (isRightArrow) {
            offsetYear = XEUtils$1.getWhatYear(offsetYear, 1);
          } else if (isDwArrow) {
            offsetYear = XEUtils$1.getWhatYear(offsetYear, 4);
          }
          dateMoveYear(offsetYear);
        } else if (datePanelType === "quarter") {
          var offsetQuarter = XEUtils$1.getWhatQuarter(datePanelValue || Date.now(), 0, "first");
          if (isLeftArrow) {
            offsetQuarter = XEUtils$1.getWhatQuarter(offsetQuarter, -1);
          } else if (isUpArrow) {
            offsetQuarter = XEUtils$1.getWhatQuarter(offsetQuarter, -2);
          } else if (isRightArrow) {
            offsetQuarter = XEUtils$1.getWhatQuarter(offsetQuarter, 1);
          } else if (isDwArrow) {
            offsetQuarter = XEUtils$1.getWhatQuarter(offsetQuarter, 2);
          }
          dateMoveQuarter(offsetQuarter);
        } else if (datePanelType === "month") {
          var offsetMonth = XEUtils$1.getWhatMonth(datePanelValue || Date.now(), 0, "first");
          if (isLeftArrow) {
            offsetMonth = XEUtils$1.getWhatMonth(offsetMonth, -1);
          } else if (isUpArrow) {
            offsetMonth = XEUtils$1.getWhatMonth(offsetMonth, -4);
          } else if (isRightArrow) {
            offsetMonth = XEUtils$1.getWhatMonth(offsetMonth, 1);
          } else if (isDwArrow) {
            offsetMonth = XEUtils$1.getWhatMonth(offsetMonth, 4);
          }
          dateMoveMonth(offsetMonth);
        } else {
          var offsetDay = datePanelValue || XEUtils$1.getWhatDay(Date.now(), 0, "first");
          var firstDayOfWeek = computeFirstDayOfWeek.value;
          if (isLeftArrow) {
            offsetDay = XEUtils$1.getWhatDay(offsetDay, -1);
          } else if (isUpArrow) {
            offsetDay = XEUtils$1.getWhatWeek(offsetDay, -1, firstDayOfWeek);
          } else if (isRightArrow) {
            offsetDay = XEUtils$1.getWhatDay(offsetDay, 1);
          } else if (isDwArrow) {
            offsetDay = XEUtils$1.getWhatWeek(offsetDay, 1, firstDayOfWeek);
          }
          dateMoveDay(offsetDay);
        }
      }
    };
    var datePgOffsetEvent = function(evnt) {
      var isActivated = reactData.isActivated;
      if (isActivated) {
        var isPgUp = hasEventKey(evnt, EVENT_KEYS.PAGE_UP);
        evnt.preventDefault();
        if (isPgUp) {
          datePrevEvent(evnt);
        } else {
          dateNextEvent(evnt);
        }
      }
    };
    var dateOpenPanel = function() {
      var type = props.type;
      var isDateTimeType = computeIsDateTimeType.value;
      var dateValue = computeDateValue.value;
      if (["year", "quarter", "month", "week"].indexOf(type) > -1) {
        reactData.datePanelType = type;
      } else {
        reactData.datePanelType = "day";
      }
      reactData.currentDate = XEUtils$1.getWhatDay(Date.now(), 0, "first");
      if (dateValue) {
        dateMonthHandle(dateValue, 0);
        dateParseValue(dateValue);
      } else {
        dateNowHandle();
      }
      if (isDateTimeType) {
        reactData.datetimePanelValue = reactData.datePanelValue || XEUtils$1.getWhatDay(Date.now(), 0, "first");
        nextTick(function() {
          var timeBodyElem = refInputTimeBody.value;
          XEUtils$1.arrayEach(timeBodyElem.querySelectorAll("li.is--selected"), updateTimePos);
        });
      }
    };
    var updateZindex = function() {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex();
      }
    };
    var updatePlacement = function() {
      return nextTick().then(function() {
        var transfer = props.transfer, placement = props.placement;
        var panelIndex = reactData.panelIndex;
        var targetElem = refInputTarget.value;
        var panelElem = refInputPanel.value;
        if (targetElem && panelElem) {
          var targetHeight = targetElem.offsetHeight;
          var targetWidth = targetElem.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };
          var _a = getAbsolutePos(targetElem), boundingTop = _a.boundingTop, boundingLeft = _a.boundingLeft, visibleHeight = _a.visibleHeight, visibleWidth = _a.visibleWidth;
          var panelPlacement = "bottom";
          if (transfer) {
            var left = boundingLeft;
            var top_1 = boundingTop + targetHeight;
            if (placement === "top") {
              panelPlacement = "top";
              top_1 = boundingTop - panelHeight;
            } else if (!placement) {
              if (top_1 + panelHeight + marginSize > visibleHeight) {
                panelPlacement = "top";
                top_1 = boundingTop - panelHeight;
              }
              if (top_1 < marginSize) {
                panelPlacement = "bottom";
                top_1 = boundingTop + targetHeight;
              }
            }
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            }
            if (left < marginSize) {
              left = marginSize;
            }
            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top_1, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === "top") {
              panelPlacement = "top";
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = "top";
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }
          reactData.panelStyle = panelStyle;
          reactData.panelPlacement = panelPlacement;
          return nextTick();
        }
      });
    };
    var showPanel = function() {
      var disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel;
      var isDatePickerType = computeIsDatePickerType.value;
      if (!disabled && !visiblePanel) {
        if (!reactData.inited) {
          reactData.inited = true;
        }
        clearTimeout(hidePanelTimeout);
        reactData.isActivated = true;
        reactData.animatVisible = true;
        if (isDatePickerType) {
          dateOpenPanel();
        }
        setTimeout(function() {
          reactData.visiblePanel = true;
        }, 10);
        updateZindex();
        return updatePlacement();
      }
      return nextTick();
    };
    var datePickerOpenEvent = function(evnt) {
      var readonly = props.readonly;
      if (!readonly) {
        evnt.preventDefault();
        showPanel();
      }
    };
    var clickEvent = function(evnt) {
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        datePickerOpenEvent(evnt);
      }
      triggerEvent2(evnt);
    };
    var handleGlobalMousedownEvent = function(evnt) {
      var disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel, isActivated = reactData.isActivated;
      var isDatePickerType = computeIsDatePickerType.value;
      var el = refElem.value;
      var panelElem = refInputPanel.value;
      if (!disabled && isActivated) {
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag;
        if (!reactData.isActivated) {
          if (isDatePickerType) {
            if (visiblePanel) {
              hidePanel();
              afterCheckValue();
            }
          } else {
            afterCheckValue();
          }
        }
      }
    };
    var handleGlobalKeydownEvent = function(evnt) {
      var clearable = props.clearable, disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel;
      var isDatePickerType = computeIsDatePickerType.value;
      if (!disabled) {
        var isTab = hasEventKey(evnt, EVENT_KEYS.TAB);
        var isDel = hasEventKey(evnt, EVENT_KEYS.DELETE);
        var isEsc = hasEventKey(evnt, EVENT_KEYS.ESCAPE);
        var isEnter = hasEventKey(evnt, EVENT_KEYS.ENTER);
        var isLeftArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_LEFT);
        var isUpArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_UP);
        var isRightArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_RIGHT);
        var isDwArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_DOWN);
        var isPgUp = hasEventKey(evnt, EVENT_KEYS.PAGE_UP);
        var isPgDn = hasEventKey(evnt, EVENT_KEYS.PAGE_DOWN);
        var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        var isActivated = reactData.isActivated;
        if (isTab) {
          if (isActivated) {
            afterCheckValue();
          }
          isActivated = false;
          reactData.isActivated = isActivated;
        } else if (operArrow) {
          if (isDatePickerType) {
            if (isActivated) {
              if (visiblePanel) {
                dateOffsetEvent(evnt);
              } else if (isUpArrow || isDwArrow) {
                datePickerOpenEvent(evnt);
              }
            }
          }
        } else if (isEnter) {
          if (isDatePickerType) {
            if (visiblePanel) {
              if (reactData.datePanelValue) {
                dateSelectItem(reactData.datePanelValue);
              } else {
                hidePanel();
              }
            } else if (isActivated) {
              datePickerOpenEvent(evnt);
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePickerType) {
            if (isActivated) {
              datePgOffsetEvent(evnt);
            }
          }
        }
        if (isTab || isEsc) {
          if (visiblePanel) {
            hidePanel();
          }
        } else if (isDel && clearable) {
          if (isActivated) {
            clearValueEvent(evnt, null);
          }
        }
      }
    };
    var handleGlobalMousewheelEvent = function(evnt) {
      var disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel;
      if (!disabled) {
        if (visiblePanel) {
          var panelElem = refInputPanel.value;
          if (getEventTargetNode(evnt, panelElem).flag) {
            updatePlacement();
          } else {
            hidePanel();
            afterCheckValue();
          }
        }
      }
    };
    var handleGlobalBlurEvent = function() {
      var isActivated = reactData.isActivated, visiblePanel = reactData.visiblePanel;
      if (visiblePanel) {
        hidePanel();
        afterCheckValue();
      } else if (isActivated) {
        afterCheckValue();
      }
    };
    var renderDateLabel = function(item, label) {
      var festivalMethod = props.festivalMethod;
      if (festivalMethod) {
        var datePanelType = reactData.datePanelType;
        var festivalRest = festivalMethod({ type: datePanelType, viewType: datePanelType, date: item.date, $input: $xeinput });
        var festivalItem = festivalRest ? XEUtils$1.isString(festivalRest) ? { label: festivalRest } : festivalRest : {};
        var extraItem = festivalItem.extra ? XEUtils$1.isString(festivalItem.extra) ? { label: festivalItem.extra } : festivalItem.extra : null;
        var labels = [
          h("span", {
            class: ["vxe-input--date-label", {
              "is-notice": festivalItem.notice
            }]
          }, extraItem && extraItem.label ? [
            h("span", label),
            h("span", {
              class: ["vxe-input--date-label--extra", extraItem.important ? "is-important" : "", extraItem.className],
              style: extraItem.style
            }, XEUtils$1.toValueString(extraItem.label))
          ] : label)
        ];
        var festivalLabel = festivalItem.label;
        if (festivalLabel) {
          var festivalLabels = XEUtils$1.toValueString(festivalLabel).split(",");
          labels.push(h("span", {
            class: ["vxe-input--date-festival", festivalItem.important ? "is-important" : "", festivalItem.className],
            style: festivalItem.style
          }, [
            festivalLabels.length > 1 ? h("span", {
              class: ["vxe-input--date-festival--overlap", "overlap--".concat(festivalLabels.length)]
            }, festivalLabels.map(function(label2) {
              return h("span", label2.substring(0, 3));
            })) : h("span", {
              class: "vxe-input--date-festival--label"
            }, festivalLabels[0].substring(0, 3))
          ]));
        }
        return labels;
      }
      return label;
    };
    var renderDateDayTable = function() {
      var multiple = props.multiple;
      var datePanelType = reactData.datePanelType, datePanelValue = reactData.datePanelValue;
      var dateValue = computeDateValue.value;
      var dateHeaders = computeDateHeaders.value;
      var dayDatas = computeDayDatas.value;
      var dateListValue = computeDateListValue.value;
      var matchFormat = "yyyyMMdd";
      return [
        h("table", {
          class: "vxe-input--date-".concat(datePanelType, "-view"),
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h("thead", [
            h("tr", dateHeaders.map(function(item) {
              return h("th", item.label);
            }))
          ]),
          h("tbody", dayDatas.map(function(rows) {
            return h("tr", rows.map(function(item) {
              return h("td", {
                class: {
                  "is--prev": item.isPrev,
                  "is--current": item.isCurrent,
                  "is--now": item.isNow,
                  "is--next": item.isNext,
                  "is--disabled": isDateDisabled(item),
                  "is--selected": multiple ? dateListValue.some(function(val) {
                    return XEUtils$1.isDateSame(val, item.date, matchFormat);
                  }) : XEUtils$1.isDateSame(dateValue, item.date, matchFormat),
                  "is--hover": XEUtils$1.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: function() {
                  return dateSelectEvent(item);
                },
                onMouseenter: function() {
                  return dateMouseenterEvent(item);
                }
              }, renderDateLabel(item, item.label));
            }));
          }))
        ])
      ];
    };
    var renderDateWeekTable = function() {
      var multiple = props.multiple;
      var datePanelType = reactData.datePanelType, datePanelValue = reactData.datePanelValue;
      var dateValue = computeDateValue.value;
      var weekHeaders = computeWeekHeaders.value;
      var weekDates = computeWeekDates.value;
      var dateListValue = computeDateListValue.value;
      var matchFormat = "yyyyMMdd";
      return [
        h("table", {
          class: "vxe-input--date-".concat(datePanelType, "-view"),
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h("thead", [
            h("tr", weekHeaders.map(function(item) {
              return h("th", item.label);
            }))
          ]),
          h("tbody", weekDates.map(function(rows) {
            var isSelected = multiple ? rows.some(function(item) {
              return dateListValue.some(function(val) {
                return XEUtils$1.isDateSame(val, item.date, matchFormat);
              });
            }) : rows.some(function(item) {
              return XEUtils$1.isDateSame(dateValue, item.date, matchFormat);
            });
            var isHover = rows.some(function(item) {
              return XEUtils$1.isDateSame(datePanelValue, item.date, matchFormat);
            });
            return h("tr", rows.map(function(item) {
              return h("td", {
                class: {
                  "is--prev": item.isPrev,
                  "is--current": item.isCurrent,
                  "is--now": item.isNow,
                  "is--next": item.isNext,
                  "is--disabled": isDateDisabled(item),
                  "is--selected": isSelected,
                  "is--hover": isHover
                },
                // event
                onClick: function() {
                  return dateSelectEvent(item);
                },
                onMouseenter: function() {
                  return dateMouseenterEvent(item);
                }
              }, renderDateLabel(item, item.label));
            }));
          }))
        ])
      ];
    };
    var renderDateMonthTable = function() {
      var multiple = props.multiple;
      var datePanelType = reactData.datePanelType, datePanelValue = reactData.datePanelValue;
      var dateValue = computeDateValue.value;
      var monthDatas = computeMonthDatas.value;
      var dateListValue = computeDateListValue.value;
      var matchFormat = "yyyyMM";
      return [
        h("table", {
          class: "vxe-input--date-".concat(datePanelType, "-view"),
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h("tbody", monthDatas.map(function(rows) {
            return h("tr", rows.map(function(item) {
              return h("td", {
                class: {
                  "is--prev": item.isPrev,
                  "is--current": item.isCurrent,
                  "is--now": item.isNow,
                  "is--next": item.isNext,
                  "is--disabled": isDateDisabled(item),
                  "is--selected": multiple ? dateListValue.some(function(val) {
                    return XEUtils$1.isDateSame(val, item.date, matchFormat);
                  }) : XEUtils$1.isDateSame(dateValue, item.date, matchFormat),
                  "is--hover": XEUtils$1.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: function() {
                  return dateSelectEvent(item);
                },
                onMouseenter: function() {
                  return dateMouseenterEvent(item);
                }
              }, renderDateLabel(item, GlobalConfig.i18n("vxe.input.date.months.m".concat(item.month))));
            }));
          }))
        ])
      ];
    };
    var renderDateQuarterTable = function() {
      var multiple = props.multiple;
      var datePanelType = reactData.datePanelType, datePanelValue = reactData.datePanelValue;
      var dateValue = computeDateValue.value;
      var quarterDatas = computeQuarterDatas.value;
      var dateListValue = computeDateListValue.value;
      var matchFormat = "yyyyq";
      return [
        h("table", {
          class: "vxe-input--date-".concat(datePanelType, "-view"),
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h("tbody", quarterDatas.map(function(rows) {
            return h("tr", rows.map(function(item) {
              return h("td", {
                class: {
                  "is--prev": item.isPrev,
                  "is--current": item.isCurrent,
                  "is--now": item.isNow,
                  "is--next": item.isNext,
                  "is--disabled": isDateDisabled(item),
                  "is--selected": multiple ? dateListValue.some(function(val) {
                    return XEUtils$1.isDateSame(val, item.date, matchFormat);
                  }) : XEUtils$1.isDateSame(dateValue, item.date, matchFormat),
                  "is--hover": XEUtils$1.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: function() {
                  return dateSelectEvent(item);
                },
                onMouseenter: function() {
                  return dateMouseenterEvent(item);
                }
              }, renderDateLabel(item, GlobalConfig.i18n("vxe.input.date.quarters.q".concat(item.quarter))));
            }));
          }))
        ])
      ];
    };
    var renderDateYearTable = function() {
      var multiple = props.multiple;
      var datePanelType = reactData.datePanelType, datePanelValue = reactData.datePanelValue;
      var dateValue = computeDateValue.value;
      var yearDatas = computeYearDatas.value;
      var dateListValue = computeDateListValue.value;
      var matchFormat = "yyyy";
      return [
        h("table", {
          class: "vxe-input--date-".concat(datePanelType, "-view"),
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          h("tbody", yearDatas.map(function(rows) {
            return h("tr", rows.map(function(item) {
              return h("td", {
                class: {
                  "is--prev": item.isPrev,
                  "is--current": item.isCurrent,
                  "is--now": item.isNow,
                  "is--next": item.isNext,
                  "is--disabled": isDateDisabled(item),
                  "is--selected": multiple ? dateListValue.some(function(val) {
                    return XEUtils$1.isDateSame(val, item.date, matchFormat);
                  }) : XEUtils$1.isDateSame(dateValue, item.date, matchFormat),
                  "is--hover": XEUtils$1.isDateSame(datePanelValue, item.date, matchFormat)
                },
                onClick: function() {
                  return dateSelectEvent(item);
                },
                onMouseenter: function() {
                  return dateMouseenterEvent(item);
                }
              }, renderDateLabel(item, item.year));
            }));
          }))
        ])
      ];
    };
    var renderDateTable = function() {
      var datePanelType = reactData.datePanelType;
      switch (datePanelType) {
        case "week":
          return renderDateWeekTable();
        case "month":
          return renderDateMonthTable();
        case "quarter":
          return renderDateQuarterTable();
        case "year":
          return renderDateYearTable();
      }
      return renderDateDayTable();
    };
    var renderDatePanel = function() {
      var multiple = props.multiple;
      var datePanelType = reactData.datePanelType;
      var isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      var isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      var selectDatePanelLabel = computeSelectDatePanelLabel.value;
      return [
        h("div", {
          class: "vxe-input--date-picker-header"
        }, [
          h("div", {
            class: "vxe-input--date-picker-type-wrapper"
          }, [
            datePanelType === "year" ? h("span", {
              class: "vxe-input--date-picker-label"
            }, selectDatePanelLabel) : h("span", {
              class: "vxe-input--date-picker-btn",
              onClick: dateToggleTypeEvent
            }, selectDatePanelLabel)
          ]),
          h("div", {
            class: "vxe-input--date-picker-btn-wrapper"
          }, [
            h("span", {
              class: ["vxe-input--date-picker-btn vxe-input--date-picker-prev-btn", {
                "is--disabled": isDisabledPrevDateBtn
              }],
              onClick: datePrevEvent
            }, [
              h("i", {
                class: "vxe-icon-caret-left"
              })
            ]),
            h("span", {
              class: "vxe-input--date-picker-btn vxe-input--date-picker-current-btn",
              onClick: dateTodayMonthEvent
            }, [
              h("i", {
                class: "vxe-icon-dot"
              })
            ]),
            h("span", {
              class: ["vxe-input--date-picker-btn vxe-input--date-picker-next-btn", {
                "is--disabled": isDisabledNextDateBtn
              }],
              onClick: dateNextEvent
            }, [
              h("i", {
                class: "vxe-icon-caret-right"
              })
            ]),
            multiple && computeSupportMultiples.value ? h("span", {
              class: "vxe-input--date-picker-btn vxe-input--date-picker-confirm-btn"
            }, [
              h("button", {
                class: "vxe-input--date-picker-confirm",
                type: "button",
                onClick: dateConfirmEvent
              }, GlobalConfig.i18n("vxe.button.confirm"))
            ]) : null
          ])
        ]),
        h("div", {
          class: "vxe-input--date-picker-body"
        }, renderDateTable())
      ];
    };
    var renderTimePanel = function() {
      var datetimePanelValue = reactData.datetimePanelValue;
      var dateTimeLabel = computeDateTimeLabel.value;
      var hourList = computeHourList.value;
      var minuteList = computeMinuteList.value;
      var secondList = computeSecondList.value;
      return [
        h("div", {
          class: "vxe-input--time-picker-header"
        }, [
          h("span", {
            class: "vxe-input--time-picker-title"
          }, dateTimeLabel),
          h("button", {
            class: "vxe-input--time-picker-confirm",
            type: "button",
            onClick: dateConfirmEvent
          }, GlobalConfig.i18n("vxe.button.confirm"))
        ]),
        h("div", {
          ref: refInputTimeBody,
          class: "vxe-input--time-picker-body"
        }, [
          h("ul", {
            class: "vxe-input--time-picker-hour-list"
          }, hourList.map(function(item, index) {
            return h("li", {
              key: index,
              class: {
                "is--selected": datetimePanelValue && datetimePanelValue.getHours() === item.value
              },
              onClick: function(evnt) {
                return dateHourEvent(evnt, item);
              }
            }, item.label);
          })),
          h("ul", {
            class: "vxe-input--time-picker-minute-list"
          }, minuteList.map(function(item, index) {
            return h("li", {
              key: index,
              class: {
                "is--selected": datetimePanelValue && datetimePanelValue.getMinutes() === item.value
              },
              onClick: function(evnt) {
                return dateMinuteEvent(evnt, item);
              }
            }, item.label);
          })),
          h("ul", {
            class: "vxe-input--time-picker-second-list"
          }, secondList.map(function(item, index) {
            return h("li", {
              key: index,
              class: {
                "is--selected": datetimePanelValue && datetimePanelValue.getSeconds() === item.value
              },
              onClick: function(evnt) {
                return dateSecondEvent(evnt, item);
              }
            }, item.label);
          }))
        ])
      ];
    };
    var renderPanel = function() {
      var _a;
      var type = props.type, transfer = props.transfer;
      var inited = reactData.inited, animatVisible = reactData.animatVisible, visiblePanel = reactData.visiblePanel, panelPlacement = reactData.panelPlacement, panelStyle = reactData.panelStyle;
      var vSize = computeSize.value;
      var isDatePickerType = computeIsDatePickerType.value;
      var renders = [];
      if (isDatePickerType) {
        if (type === "datetime") {
          renders.push(h("div", {
            class: "vxe-input--panel-layout-wrapper"
          }, [
            h("div", {
              class: "vxe-input--panel-left-wrapper"
            }, renderDatePanel()),
            h("div", {
              class: "vxe-input--panel-right-wrapper"
            }, renderTimePanel())
          ]));
        } else if (type === "time") {
          renders.push(h("div", {
            class: "vxe-input--panel-wrapper"
          }, renderTimePanel()));
        } else {
          renders.push(h("div", {
            class: "vxe-input--panel-wrapper"
          }, renderDatePanel()));
        }
        return h(Teleport, {
          to: "body",
          disabled: transfer ? !inited : true
        }, [
          h("div", {
            ref: refInputPanel,
            class: ["vxe-table--ignore-clear vxe-input--panel", "type--".concat(type), (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--transfer"] = transfer, _a["animat--leave"] = animatVisible, _a["animat--enter"] = visiblePanel, _a)],
            placement: panelPlacement,
            style: panelStyle
          }, renders)
        ]);
      }
      return null;
    };
    var renderNumberIcon = function() {
      var isDisabledAddNumber = computeIsDisabledAddNumber.value;
      var isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      return h("span", {
        class: "vxe-input--number-suffix"
      }, [
        h("span", {
          class: ["vxe-input--number-prev is--prev", {
            "is--disabled": isDisabledAddNumber
          }],
          onMousedown: numberMousedownEvent,
          onMouseup: numberStopDown,
          onMouseleave: numberStopDown
        }, [
          h("i", {
            class: ["vxe-input--number-prev-icon", GlobalConfig.icon.INPUT_PREV_NUM]
          })
        ]),
        h("span", {
          class: ["vxe-input--number-next is--next", {
            "is--disabled": isDisabledSubtractNumber
          }],
          onMousedown: numberMousedownEvent,
          onMouseup: numberStopDown,
          onMouseleave: numberStopDown
        }, [
          h("i", {
            class: ["vxe-input--number-next-icon", GlobalConfig.icon.INPUT_NEXT_NUM]
          })
        ])
      ]);
    };
    var renderDatePickerIcon = function() {
      return h("span", {
        class: "vxe-input--date-picker-suffix",
        onClick: datePickerOpenEvent
      }, [
        h("i", {
          class: ["vxe-input--date-picker-icon", GlobalConfig.icon.INPUT_DATE]
        })
      ]);
    };
    var renderSearchIcon = function() {
      return h("span", {
        class: "vxe-input--search-suffix",
        onClick: searchEvent
      }, [
        h("i", {
          class: ["vxe-input--search-icon", GlobalConfig.icon.INPUT_SEARCH]
        })
      ]);
    };
    var renderPasswordIcon = function() {
      var showPwd = reactData.showPwd;
      return h("span", {
        class: "vxe-input--password-suffix",
        onClick: passwordToggleEvent
      }, [
        h("i", {
          class: ["vxe-input--password-icon", showPwd ? GlobalConfig.icon.INPUT_SHOW_PWD : GlobalConfig.icon.INPUT_PWD]
        })
      ]);
    };
    var rendePrefixIcon = function() {
      var prefixIcon = props.prefixIcon;
      var prefixSlot = slots.prefix;
      var icons = [];
      if (prefixSlot) {
        icons.push(h("span", {
          class: "vxe-input--prefix-icon"
        }, prefixSlot({})));
      } else if (prefixIcon) {
        icons.push(h("i", {
          class: ["vxe-input--prefix-icon", prefixIcon]
        }));
      }
      return icons.length ? h("span", {
        class: "vxe-input--prefix",
        onClick: clickPrefixEvent
      }, icons) : null;
    };
    var renderSuffixIcon2 = function() {
      var disabled = props.disabled, suffixIcon = props.suffixIcon;
      var inputValue = reactData.inputValue;
      var suffixSlot = slots.suffix;
      var isClearable = computeIsClearable.value;
      var icons = [];
      if (suffixSlot) {
        icons.push(h("span", {
          class: "vxe-input--suffix-icon"
        }, suffixSlot({})));
      } else if (suffixIcon) {
        icons.push(h("i", {
          class: ["vxe-input--suffix-icon", suffixIcon]
        }));
      }
      if (isClearable) {
        icons.push(h("i", {
          class: ["vxe-input--clear-icon", GlobalConfig.icon.INPUT_CLEAR]
        }));
      }
      return icons.length ? h("span", {
        class: ["vxe-input--suffix", {
          "is--clear": isClearable && !disabled && !(inputValue === "" || XEUtils$1.eqNull(inputValue))
        }],
        onClick: clickSuffixEvent
      }, icons) : null;
    };
    var renderExtraSuffixIcon = function() {
      var controls = props.controls;
      var isNumType = computeIsNumType.value;
      var isDatePickerType = computeIsDatePickerType.value;
      var isPawdType = computeIsPawdType.value;
      var isSearchType = computeIsSearchType.value;
      var icons;
      if (isPawdType) {
        icons = renderPasswordIcon();
      } else if (isNumType) {
        if (controls) {
          icons = renderNumberIcon();
        }
      } else if (isDatePickerType) {
        icons = renderDatePickerIcon();
      } else if (isSearchType) {
        icons = renderSearchIcon();
      }
      return icons ? h("span", {
        class: "vxe-input--extra-suffix"
      }, [icons]) : null;
    };
    inputMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $input: $xeinput, $event: evnt }, params));
      },
      focus: function() {
        var inputElem = refInputTarget.value;
        reactData.isActivated = true;
        inputElem.focus();
        return nextTick();
      },
      blur: function() {
        var inputElem = refInputTarget.value;
        inputElem.blur();
        reactData.isActivated = false;
        return nextTick();
      },
      showPanel,
      hidePanel,
      updatePlacement
    };
    Object.assign($xeinput, inputMethods);
    watch(function() {
      return props.modelValue;
    }, function(val) {
      reactData.inputValue = val;
      changeValue();
    });
    watch(function() {
      return props.type;
    }, function() {
      Object.assign(reactData, {
        inputValue: props.modelValue,
        datetimePanelValue: null,
        datePanelValue: null,
        datePanelLabel: "",
        datePanelType: "day",
        selectMonth: null,
        currentDate: null
      });
      initValue();
    });
    watch(computeDateLabelFormat, function() {
      var isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        dateParseValue(reactData.datePanelValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    });
    nextTick(function() {
      GlobalEvent.on($xeinput, "mousewheel", handleGlobalMousewheelEvent);
      GlobalEvent.on($xeinput, "mousedown", handleGlobalMousedownEvent);
      GlobalEvent.on($xeinput, "keydown", handleGlobalKeydownEvent);
      GlobalEvent.on($xeinput, "blur", handleGlobalBlurEvent);
    });
    onUnmounted(function() {
      numberStopDown();
      GlobalEvent.off($xeinput, "mousewheel");
      GlobalEvent.off($xeinput, "mousedown");
      GlobalEvent.off($xeinput, "keydown");
      GlobalEvent.off($xeinput, "blur");
    });
    initValue();
    var renderVN = function() {
      var _a;
      var className = props.className, controls = props.controls, type = props.type, align = props.align, name = props.name, disabled = props.disabled, readonly = props.readonly, autocomplete = props.autocomplete;
      var inputValue = reactData.inputValue, visiblePanel = reactData.visiblePanel, isActivated = reactData.isActivated;
      var vSize = computeSize.value;
      var isDatePickerType = computeIsDatePickerType.value;
      var inpReadonly = computeInpReadonly.value;
      var inpMaxlength = computeInpMaxlength.value;
      var inputType = computeInputType.value;
      var inpPlaceholder = computeInpPlaceholder.value;
      var childs = [];
      var prefix = rendePrefixIcon();
      var suffix = renderSuffixIcon2();
      if (prefix) {
        childs.push(prefix);
      }
      childs.push(h("input", {
        ref: refInputTarget,
        class: "vxe-input--inner",
        value: inputValue,
        name,
        type: inputType,
        placeholder: inpPlaceholder,
        maxlength: inpMaxlength,
        readonly: inpReadonly,
        disabled,
        autocomplete,
        onKeydown: keydownEvent,
        onKeyup: keyupEvent,
        onWheel: wheelEvent,
        onClick: clickEvent,
        onInput: inputEvent,
        onChange: changeEvent,
        onFocus: focusEvent,
        onBlur: blurEvent
      }));
      if (suffix) {
        childs.push(suffix);
      }
      childs.push(renderExtraSuffixIcon());
      if (isDatePickerType) {
        childs.push(renderPanel());
      }
      return h("div", {
        ref: refElem,
        class: ["vxe-input", "type--".concat(type), className, (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--".concat(align)] = align, _a["is--controls"] = controls, _a["is--prefix"] = !!prefix, _a["is--suffix"] = !!suffix, _a["is--readonly"] = readonly, _a["is--visivle"] = visiblePanel, _a["is--disabled"] = disabled, _a["is--active"] = isActivated, _a)]
      }, childs);
    };
    $xeinput.renderVN = renderVN;
    return $xeinput;
  },
  render: function() {
    return this.renderVN();
  }
});
const VxeCheckboxComponent = defineComponent({
  name: "VxeCheckbox",
  props: {
    modelValue: [String, Number, Boolean],
    label: { type: [String, Number], default: null },
    indeterminate: Boolean,
    title: [String, Number],
    checkedValue: { type: [String, Number, Boolean], default: true },
    uncheckedValue: { type: [String, Number, Boolean], default: false },
    content: [String, Number],
    disabled: Boolean,
    size: { type: String, default: function() {
      return GlobalConfig.checkbox.size || GlobalConfig.size;
    } }
  },
  emits: [
    "update:modelValue",
    "change"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var $xecheckbox = {
      xID,
      props,
      context
    };
    var checkboxMethods = {};
    var computeSize = useSize(props);
    var $xecheckboxgroup = inject("$xecheckboxgroup", null);
    var computeIsChecked = computed(function() {
      if ($xecheckboxgroup) {
        return XEUtils$1.includes($xecheckboxgroup.props.modelValue, props.label);
      }
      return props.modelValue === props.checkedValue;
    });
    var computeIsDisabled = computed(function() {
      if (props.disabled) {
        return true;
      }
      if ($xecheckboxgroup) {
        var groupProps = $xecheckboxgroup.props;
        var computeIsMaximize = $xecheckboxgroup.getComputeMaps().computeIsMaximize;
        var isMaximize = computeIsMaximize.value;
        var isChecked = computeIsChecked.value;
        return groupProps.disabled || isMaximize && !isChecked;
      }
      return false;
    });
    var changeEvent = function(evnt) {
      var checkedValue = props.checkedValue, uncheckedValue = props.uncheckedValue;
      var isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        var checked = evnt.target.checked;
        var value = checked ? checkedValue : uncheckedValue;
        var params = { checked, value, label: props.label };
        if ($xecheckboxgroup) {
          $xecheckboxgroup.handleChecked(params, evnt);
        } else {
          emit("update:modelValue", value);
          checkboxMethods.dispatchEvent("change", params, evnt);
          if ($xeform && $xeformiteminfo) {
            $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
          }
        }
      }
    };
    checkboxMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $checkbox: $xecheckbox, $event: evnt }, params));
      }
    };
    Object.assign($xecheckbox, checkboxMethods);
    var renderVN = function() {
      var _a;
      var vSize = computeSize.value;
      var isDisabled = computeIsDisabled.value;
      var isChecked = computeIsChecked.value;
      var indeterminate = props.indeterminate;
      return h("label", {
        class: ["vxe-checkbox", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--indeterminate"] = indeterminate, _a["is--disabled"] = isDisabled, _a["is--checked"] = isChecked, _a)],
        title: props.title
      }, [
        h("input", {
          class: "vxe-checkbox--input",
          type: "checkbox",
          disabled: isDisabled,
          checked: isChecked,
          onChange: changeEvent
        }),
        h("span", {
          class: ["vxe-checkbox--icon", indeterminate ? "vxe-icon-checkbox-indeterminate" : isChecked ? "vxe-icon-checkbox-checked" : "vxe-icon-checkbox-unchecked"]
        }),
        h("span", {
          class: "vxe-checkbox--label"
        }, slots.default ? slots.default({}) : getFuncText(props.content))
      ]);
    };
    $xecheckbox.renderVN = renderVN;
    return $xecheckbox;
  },
  render: function() {
    return this.renderVN();
  }
});
function isOptionVisible(option) {
  return option.visible !== false;
}
function getOptUniqueId() {
  return XEUtils$1.uniqueId("opt_");
}
const VxeSelectComponent = defineComponent({
  name: "VxeSelect",
  props: {
    modelValue: null,
    clearable: Boolean,
    placeholder: String,
    loading: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    multiCharOverflow: { type: [Number, String], default: function() {
      return GlobalConfig.select.multiCharOverflow;
    } },
    prefixIcon: String,
    placement: String,
    options: Array,
    optionProps: Object,
    optionGroups: Array,
    optionGroupProps: Object,
    optionConfig: Object,
    className: [String, Function],
    max: { type: [String, Number], default: null },
    size: { type: String, default: function() {
      return GlobalConfig.select.size || GlobalConfig.size;
    } },
    filterable: Boolean,
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    emptyText: String,
    // 已废弃，被 option-config.keyField 替换
    optionId: { type: String, default: function() {
      return GlobalConfig.select.optionId;
    } },
    // 已废弃，被 option-config.useKey 替换
    optionKey: Boolean,
    transfer: { type: Boolean, default: function() {
      return GlobalConfig.select.transfer;
    } }
  },
  emits: [
    "update:modelValue",
    "change",
    "clear"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      inited: false,
      staticOptions: [],
      fullGroupList: [],
      fullOptionList: [],
      visibleGroupList: [],
      visibleOptionList: [],
      remoteValueList: [],
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      currentOption: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false,
      searchValue: "",
      searchLoading: false
    });
    var refElem = ref();
    var refInput = ref();
    var refInpSearch = ref();
    var refOptionWrapper = ref();
    var refOptionPanel = ref();
    var refMaps = {
      refElem
    };
    var $xeselect = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var selectMethods = {};
    var computePropsOpts = computed(function() {
      return props.optionProps || {};
    });
    var computeGroupPropsOpts = computed(function() {
      return props.optionGroupProps || {};
    });
    var computeLabelField = computed(function() {
      var propsOpts = computePropsOpts.value;
      return propsOpts.label || "label";
    });
    var computeValueField = computed(function() {
      var propsOpts = computePropsOpts.value;
      return propsOpts.value || "value";
    });
    var computeGroupLabelField = computed(function() {
      var groupPropsOpts = computeGroupPropsOpts.value;
      return groupPropsOpts.label || "label";
    });
    var computeGroupOptionsField = computed(function() {
      var groupPropsOpts = computeGroupPropsOpts.value;
      return groupPropsOpts.options || "options";
    });
    var computeIsMaximize = computed(function() {
      var modelValue = props.modelValue, multiple = props.multiple, max2 = props.max;
      if (multiple && max2) {
        return (modelValue ? modelValue.length : 0) >= XEUtils$1.toNumber(max2);
      }
      return false;
    });
    var computeOptionOpts = computed(function() {
      return Object.assign({}, GlobalConfig.select.optionConfig, props.optionConfig);
    });
    var computeIsGroup = computed(function() {
      return reactData.fullGroupList.some(function(item) {
        return item.options && item.options.length;
      });
    });
    var computeMultiMaxCharNum = computed(function() {
      return XEUtils$1.toNumber(props.multiCharOverflow);
    });
    var callSlot = function(slotFunc, params) {
      if (slotFunc) {
        if (XEUtils$1.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null;
        }
        if (XEUtils$1.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc(params));
        }
      }
      return [];
    };
    var findOption = function(optionValue) {
      var fullOptionList = reactData.fullOptionList, fullGroupList = reactData.fullGroupList;
      var isGroup = computeIsGroup.value;
      var valueField = computeValueField.value;
      if (isGroup) {
        for (var gIndex = 0; gIndex < fullGroupList.length; gIndex++) {
          var group = fullGroupList[gIndex];
          if (group.options) {
            for (var index = 0; index < group.options.length; index++) {
              var option = group.options[index];
              if (optionValue === option[valueField]) {
                return option;
              }
            }
          }
        }
      }
      return fullOptionList.find(function(item) {
        return optionValue === item[valueField];
      });
    };
    var getRemoteSelectLabel = function(value) {
      var remoteValueList = reactData.remoteValueList;
      var labelField = computeLabelField.value;
      var remoteItem = remoteValueList.find(function(item2) {
        return value === item2.key;
      });
      var item = remoteItem ? remoteItem.result : null;
      return XEUtils$1.toValueString(item ? item[labelField] : value);
    };
    var getSelectLabel = function(value) {
      var labelField = computeLabelField.value;
      var item = findOption(value);
      return XEUtils$1.toValueString(item ? item[labelField] : value);
    };
    var computeSelectLabel = computed(function() {
      var modelValue = props.modelValue, multiple = props.multiple, remote = props.remote;
      var multiMaxCharNum = computeMultiMaxCharNum.value;
      if (modelValue && multiple) {
        var vals = XEUtils$1.isArray(modelValue) ? modelValue : [modelValue];
        if (remote) {
          return vals.map(function(val) {
            return getRemoteSelectLabel(val);
          }).join(", ");
        }
        return vals.map(function(val) {
          var label = getSelectLabel(val);
          if (multiMaxCharNum > 0 && label.length > multiMaxCharNum) {
            return "".concat(label.substring(0, multiMaxCharNum), "...");
          }
          return label;
        }).join(", ");
      }
      if (remote) {
        return getRemoteSelectLabel(modelValue);
      }
      return getSelectLabel(modelValue);
    });
    var getOptkey = function() {
      var optionOpts = computeOptionOpts.value;
      return optionOpts.keyField || props.optionId || "_X_OPTION_KEY";
    };
    var getOptid = function(option) {
      var optid = option[getOptkey()];
      return optid ? encodeURIComponent(optid) : "";
    };
    var refreshOption = function() {
      var filterable = props.filterable, filterMethod = props.filterMethod;
      var fullOptionList = reactData.fullOptionList, fullGroupList = reactData.fullGroupList, searchValue = reactData.searchValue;
      var isGroup = computeIsGroup.value;
      var groupLabelField = computeGroupLabelField.value;
      var labelField = computeLabelField.value;
      if (isGroup) {
        if (filterable && filterMethod) {
          reactData.visibleGroupList = fullGroupList.filter(function(group) {
            return isOptionVisible(group) && filterMethod({ group, option: null, searchValue });
          });
        } else if (filterable) {
          reactData.visibleGroupList = fullGroupList.filter(function(group) {
            return isOptionVisible(group) && (!searchValue || "".concat(group[groupLabelField]).indexOf(searchValue) > -1);
          });
        } else {
          reactData.visibleGroupList = fullGroupList.filter(isOptionVisible);
        }
      } else {
        if (filterable && filterMethod) {
          reactData.visibleOptionList = fullOptionList.filter(function(option) {
            return isOptionVisible(option) && filterMethod({ group: null, option, searchValue });
          });
        } else if (filterable) {
          reactData.visibleOptionList = fullOptionList.filter(function(option) {
            return isOptionVisible(option) && (!searchValue || "".concat(option[labelField]).indexOf(searchValue) > -1);
          });
        } else {
          reactData.visibleOptionList = fullOptionList.filter(isOptionVisible);
        }
      }
      return nextTick();
    };
    var cacheItemMap = function() {
      var fullOptionList = reactData.fullOptionList, fullGroupList = reactData.fullGroupList;
      var groupOptionsField = computeGroupOptionsField.value;
      var key = getOptkey();
      var handleOptis = function(item) {
        if (!getOptid(item)) {
          item[key] = getOptUniqueId();
        }
      };
      if (fullGroupList.length) {
        fullGroupList.forEach(function(group) {
          handleOptis(group);
          if (group[groupOptionsField]) {
            group[groupOptionsField].forEach(handleOptis);
          }
        });
      } else if (fullOptionList.length) {
        fullOptionList.forEach(handleOptis);
      }
      refreshOption();
    };
    var setCurrentOption = function(option) {
      var valueField = computeValueField.value;
      if (option) {
        reactData.currentOption = option;
        reactData.currentValue = option[valueField];
      }
    };
    var scrollToOption = function(option, isAlignBottom) {
      return nextTick().then(function() {
        if (option) {
          var optWrapperElem = refOptionWrapper.value;
          var panelElem = refOptionPanel.value;
          var optElem = panelElem.querySelector("[optid='".concat(getOptid(option), "']"));
          if (optWrapperElem && optElem) {
            var wrapperHeight = optWrapperElem.offsetHeight;
            var offsetPadding = 5;
            if (isAlignBottom) {
              if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight;
              }
            } else {
              if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding;
              }
            }
          }
        }
      });
    };
    var updateZindex = function() {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex();
      }
    };
    var updatePlacement = function() {
      return nextTick().then(function() {
        var transfer = props.transfer, placement = props.placement;
        var panelIndex = reactData.panelIndex;
        var el = refElem.value;
        var panelElem = refOptionPanel.value;
        if (panelElem && el) {
          var targetHeight = el.offsetHeight;
          var targetWidth = el.offsetWidth;
          var panelHeight = panelElem.offsetHeight;
          var panelWidth = panelElem.offsetWidth;
          var marginSize = 5;
          var panelStyle = {
            zIndex: panelIndex
          };
          var _a = getAbsolutePos(el), boundingTop = _a.boundingTop, boundingLeft = _a.boundingLeft, visibleHeight = _a.visibleHeight, visibleWidth = _a.visibleWidth;
          var panelPlacement = "bottom";
          if (transfer) {
            var left = boundingLeft;
            var top_1 = boundingTop + targetHeight;
            if (placement === "top") {
              panelPlacement = "top";
              top_1 = boundingTop - panelHeight;
            } else if (!placement) {
              if (top_1 + panelHeight + marginSize > visibleHeight) {
                panelPlacement = "top";
                top_1 = boundingTop - panelHeight;
              }
              if (top_1 < marginSize) {
                panelPlacement = "bottom";
                top_1 = boundingTop + targetHeight;
              }
            }
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            }
            if (left < marginSize) {
              left = marginSize;
            }
            Object.assign(panelStyle, {
              left: "".concat(left, "px"),
              top: "".concat(top_1, "px"),
              minWidth: "".concat(targetWidth, "px")
            });
          } else {
            if (placement === "top") {
              panelPlacement = "top";
              panelStyle.bottom = "".concat(targetHeight, "px");
            } else if (!placement) {
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = "top";
                  panelStyle.bottom = "".concat(targetHeight, "px");
                }
              }
            }
          }
          reactData.panelStyle = panelStyle;
          reactData.panelPlacement = panelPlacement;
          return nextTick();
        }
      });
    };
    var hidePanelTimeout;
    var showOptionPanel = function() {
      var loading = props.loading, disabled = props.disabled, filterable = props.filterable;
      if (!loading && !disabled) {
        clearTimeout(hidePanelTimeout);
        if (!reactData.inited) {
          reactData.inited = true;
        }
        reactData.isActivated = true;
        reactData.animatVisible = true;
        if (filterable) {
          refreshOption();
        }
        setTimeout(function() {
          var modelValue = props.modelValue, multiple = props.multiple;
          var currOption = findOption(multiple && modelValue ? modelValue[0] : modelValue);
          reactData.visiblePanel = true;
          if (currOption) {
            setCurrentOption(currOption);
            scrollToOption(currOption);
          }
          handleFocusSearch();
        }, 10);
        updateZindex();
        updatePlacement();
      }
    };
    var hideOptionPanel = function() {
      reactData.searchValue = "";
      reactData.searchLoading = false;
      reactData.visiblePanel = false;
      hidePanelTimeout = window.setTimeout(function() {
        reactData.animatVisible = false;
      }, 350);
    };
    var changeEvent = function(evnt, selectValue) {
      if (selectValue !== props.modelValue) {
        emit("update:modelValue", selectValue);
        selectMethods.dispatchEvent("change", { value: selectValue }, evnt);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, selectValue);
        }
      }
    };
    var clearValueEvent = function(evnt, selectValue) {
      reactData.remoteValueList = [];
      changeEvent(evnt, selectValue);
      selectMethods.dispatchEvent("clear", { value: selectValue }, evnt);
    };
    var clearEvent = function(params, evnt) {
      clearValueEvent(evnt, null);
      hideOptionPanel();
    };
    var changeOptionEvent = function(evnt, selectValue, option) {
      var modelValue = props.modelValue, multiple = props.multiple;
      var remoteValueList = reactData.remoteValueList;
      if (multiple) {
        var multipleValue = void 0;
        if (modelValue) {
          if (modelValue.indexOf(selectValue) === -1) {
            multipleValue = modelValue.concat([selectValue]);
          } else {
            multipleValue = modelValue.filter(function(val) {
              return val !== selectValue;
            });
          }
        } else {
          multipleValue = [selectValue];
        }
        var remoteItem = remoteValueList.find(function(item) {
          return item.key === selectValue;
        });
        if (remoteItem) {
          remoteItem.result = option;
        } else {
          remoteValueList.push({ key: selectValue, result: option });
        }
        changeEvent(evnt, multipleValue);
      } else {
        reactData.remoteValueList = [{ key: selectValue, result: option }];
        changeEvent(evnt, selectValue);
        hideOptionPanel();
      }
    };
    var handleGlobalMousewheelEvent = function(evnt) {
      var disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel;
      if (!disabled) {
        if (visiblePanel) {
          var panelElem = refOptionPanel.value;
          if (getEventTargetNode(evnt, panelElem).flag) {
            updatePlacement();
          } else {
            hideOptionPanel();
          }
        }
      }
    };
    var handleGlobalMousedownEvent = function(evnt) {
      var disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel;
      if (!disabled) {
        var el = refElem.value;
        var panelElem = refOptionPanel.value;
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag;
        if (visiblePanel && !reactData.isActivated) {
          hideOptionPanel();
        }
      }
    };
    var findOffsetOption = function(optionValue, isUpArrow) {
      var visibleOptionList = reactData.visibleOptionList, visibleGroupList = reactData.visibleGroupList;
      var isGroup = computeIsGroup.value;
      var valueField = computeValueField.value;
      var groupOptionsField = computeGroupOptionsField.value;
      var firstOption;
      var prevOption;
      var nextOption;
      var currOption;
      if (isGroup) {
        for (var gIndex = 0; gIndex < visibleGroupList.length; gIndex++) {
          var group = visibleGroupList[gIndex];
          var groupOptionList = group[groupOptionsField];
          var isGroupDisabled = group.disabled;
          if (groupOptionList) {
            for (var index = 0; index < groupOptionList.length; index++) {
              var option = groupOptionList[index];
              var isVisible = isOptionVisible(option);
              var isDisabled = isGroupDisabled || option.disabled;
              if (!firstOption && !isDisabled) {
                firstOption = option;
              }
              if (currOption) {
                if (isVisible && !isDisabled) {
                  nextOption = option;
                  if (!isUpArrow) {
                    return { offsetOption: nextOption };
                  }
                }
              }
              if (optionValue === option[valueField]) {
                currOption = option;
                if (isUpArrow) {
                  return { offsetOption: prevOption };
                }
              } else {
                if (isVisible && !isDisabled) {
                  prevOption = option;
                }
              }
            }
          }
        }
      } else {
        for (var index = 0; index < visibleOptionList.length; index++) {
          var option = visibleOptionList[index];
          var isDisabled = option.disabled;
          if (!firstOption && !isDisabled) {
            firstOption = option;
          }
          if (currOption) {
            if (!isDisabled) {
              nextOption = option;
              if (!isUpArrow) {
                return { offsetOption: nextOption };
              }
            }
          }
          if (optionValue === option[valueField]) {
            currOption = option;
            if (isUpArrow) {
              return { offsetOption: prevOption };
            }
          } else {
            if (!isDisabled) {
              prevOption = option;
            }
          }
        }
      }
      return { firstOption };
    };
    var handleGlobalKeydownEvent = function(evnt) {
      var clearable = props.clearable, disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel, currentValue = reactData.currentValue, currentOption = reactData.currentOption;
      if (!disabled) {
        var isTab = hasEventKey(evnt, EVENT_KEYS.TAB);
        var isEnter = hasEventKey(evnt, EVENT_KEYS.ENTER);
        var isEsc = hasEventKey(evnt, EVENT_KEYS.ESCAPE);
        var isUpArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_UP);
        var isDwArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_DOWN);
        var isDel = hasEventKey(evnt, EVENT_KEYS.DELETE);
        var isSpacebar = hasEventKey(evnt, EVENT_KEYS.SPACEBAR);
        if (isTab) {
          reactData.isActivated = false;
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            hideOptionPanel();
          } else if (isEnter) {
            evnt.preventDefault();
            evnt.stopPropagation();
            changeOptionEvent(evnt, currentValue, currentOption);
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault();
            var _a = findOffsetOption(currentValue, isUpArrow), firstOption = _a.firstOption, offsetOption = _a.offsetOption;
            if (!offsetOption && !findOption(currentValue)) {
              offsetOption = firstOption;
            }
            setCurrentOption(offsetOption);
            scrollToOption(offsetOption, isDwArrow);
          } else if (isSpacebar) {
            evnt.preventDefault();
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && reactData.isActivated) {
          evnt.preventDefault();
          showOptionPanel();
        }
        if (reactData.isActivated) {
          if (isDel && clearable) {
            clearValueEvent(evnt, null);
          }
        }
      }
    };
    var handleGlobalBlurEvent = function() {
      hideOptionPanel();
    };
    var handleFocusSearch = function() {
      if (props.filterable) {
        nextTick(function() {
          var inpSearch = refInpSearch.value;
          if (inpSearch) {
            inpSearch.focus();
          }
        });
      }
    };
    var focusEvent = function() {
      if (!props.disabled) {
        reactData.isActivated = true;
      }
    };
    var blurEvent = function() {
      reactData.isActivated = false;
    };
    var modelSearchEvent = function(value) {
      reactData.searchValue = value;
    };
    var focusSearchEvent = function() {
      reactData.isActivated = true;
    };
    var keydownSearchEvent = function(params) {
      var $event = params.$event;
      var isEnter = hasEventKey($event, EVENT_KEYS.ENTER);
      if (isEnter) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    };
    var triggerSearchEvent = XEUtils$1.debounce(function() {
      var remote = props.remote, remoteMethod = props.remoteMethod;
      var searchValue = reactData.searchValue;
      if (remote && remoteMethod) {
        reactData.searchLoading = true;
        Promise.resolve(remoteMethod({ searchValue })).then(function() {
          return nextTick();
        }).catch(function() {
          return nextTick();
        }).finally(function() {
          reactData.searchLoading = false;
          refreshOption();
        });
      } else {
        refreshOption();
      }
    }, 350, { trailing: true });
    var togglePanelEvent = function(params) {
      var $event = params.$event;
      $event.preventDefault();
      if (reactData.visiblePanel) {
        hideOptionPanel();
      } else {
        showOptionPanel();
      }
    };
    var checkOptionDisabled = function(isSelected, option, group) {
      if (option.disabled) {
        return true;
      }
      if (group && group.disabled) {
        return true;
      }
      var isMaximize = computeIsMaximize.value;
      if (isMaximize && !isSelected) {
        return true;
      }
      return false;
    };
    var renderOption = function(list, group) {
      var optionKey = props.optionKey, modelValue = props.modelValue, multiple = props.multiple;
      var currentValue = reactData.currentValue;
      var optionOpts = computeOptionOpts.value;
      var labelField = computeLabelField.value;
      var valueField = computeValueField.value;
      var isGroup = computeIsGroup.value;
      var useKey = optionOpts.useKey;
      return list.map(function(option, cIndex) {
        var slots2 = option.slots, className = option.className;
        var optionValue = option[valueField];
        var isSelected = multiple ? modelValue && modelValue.indexOf(optionValue) > -1 : modelValue === optionValue;
        var isVisible = !isGroup || isOptionVisible(option);
        var isDisabled = checkOptionDisabled(isSelected, option, group);
        var optid = getOptid(option);
        var defaultSlot = slots2 ? slots2.default : null;
        return isVisible ? h("div", {
          key: useKey || optionKey ? optid : cIndex,
          class: ["vxe-select-option", className ? XEUtils$1.isFunction(className) ? className({ option, $select: $xeselect }) : className : "", {
            "is--disabled": isDisabled,
            "is--selected": isSelected,
            "is--hover": currentValue === optionValue
          }],
          // attrs
          optid,
          // event
          onMousedown: function(evnt) {
            var isLeftBtn = evnt.button === 0;
            if (isLeftBtn) {
              evnt.stopPropagation();
            }
          },
          onClick: function(evnt) {
            if (!isDisabled) {
              changeOptionEvent(evnt, optionValue, option);
            }
          },
          onMouseenter: function() {
            if (!isDisabled) {
              setCurrentOption(option);
            }
          }
        }, defaultSlot ? callSlot(defaultSlot, { option, $select: $xeselect }) : formatText(getFuncText(option[labelField]))) : null;
      });
    };
    var renderOptgroup = function() {
      var optionKey = props.optionKey;
      var visibleGroupList = reactData.visibleGroupList;
      var optionOpts = computeOptionOpts.value;
      var groupLabelField = computeGroupLabelField.value;
      var groupOptionsField = computeGroupOptionsField.value;
      var useKey = optionOpts.useKey;
      return visibleGroupList.map(function(group, gIndex) {
        var slots2 = group.slots, className = group.className;
        var optid = getOptid(group);
        var isGroupDisabled = group.disabled;
        var defaultSlot = slots2 ? slots2.default : null;
        return h("div", {
          key: useKey || optionKey ? optid : gIndex,
          class: ["vxe-optgroup", className ? XEUtils$1.isFunction(className) ? className({ option: group, $select: $xeselect }) : className : "", {
            "is--disabled": isGroupDisabled
          }],
          // attrs
          optid
        }, [
          h("div", {
            class: "vxe-optgroup--title"
          }, defaultSlot ? callSlot(defaultSlot, { option: group, $select: $xeselect }) : getFuncText(group[groupLabelField])),
          h("div", {
            class: "vxe-optgroup--wrapper"
          }, renderOption(group[groupOptionsField] || [], group))
        ]);
      });
    };
    var renderOpts = function() {
      var visibleGroupList = reactData.visibleGroupList, visibleOptionList = reactData.visibleOptionList, searchLoading = reactData.searchLoading;
      var isGroup = computeIsGroup.value;
      if (searchLoading) {
        return [
          h("div", {
            class: "vxe-select--search-loading"
          }, [
            h("i", {
              class: ["vxe-select--search-icon", GlobalConfig.icon.SELECT_LOADED]
            }),
            h("span", {
              class: "vxe-select--search-text"
            }, GlobalConfig.i18n("vxe.select.loadingText"))
          ])
        ];
      }
      if (isGroup) {
        if (visibleGroupList.length) {
          return renderOptgroup();
        }
      } else {
        if (visibleOptionList.length) {
          return renderOption(visibleOptionList);
        }
      }
      return [
        h("div", {
          class: "vxe-select--empty-placeholder"
        }, props.emptyText || GlobalConfig.i18n("vxe.select.emptyText"))
      ];
    };
    selectMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $select: $xeselect, $event: evnt }, params));
      },
      isPanelVisible: function() {
        return reactData.visiblePanel;
      },
      togglePanel: function() {
        if (reactData.visiblePanel) {
          hideOptionPanel();
        } else {
          showOptionPanel();
        }
        return nextTick();
      },
      hidePanel: function() {
        if (reactData.visiblePanel) {
          hideOptionPanel();
        }
        return nextTick();
      },
      showPanel: function() {
        if (!reactData.visiblePanel) {
          showOptionPanel();
        }
        return nextTick();
      },
      refreshOption,
      focus: function() {
        var $input = refInput.value;
        reactData.isActivated = true;
        $input.blur();
        return nextTick();
      },
      blur: function() {
        var $input = refInput.value;
        $input.blur();
        reactData.isActivated = false;
        return nextTick();
      }
    };
    Object.assign($xeselect, selectMethods);
    watch(function() {
      return reactData.staticOptions;
    }, function(value) {
      if (value.some(function(item) {
        return item.options && item.options.length;
      })) {
        reactData.fullOptionList = [];
        reactData.fullGroupList = value;
      } else {
        reactData.fullGroupList = [];
        reactData.fullOptionList = value || [];
      }
      cacheItemMap();
    });
    watch(function() {
      return props.options;
    }, function(value) {
      reactData.fullGroupList = [];
      reactData.fullOptionList = value || [];
      cacheItemMap();
    });
    watch(function() {
      return props.optionGroups;
    }, function(value) {
      reactData.fullOptionList = [];
      reactData.fullGroupList = value || [];
      cacheItemMap();
    });
    onMounted(function() {
      nextTick(function() {
        var options = props.options, optionGroups = props.optionGroups;
        if (optionGroups) {
          reactData.fullGroupList = optionGroups;
        } else if (options) {
          reactData.fullOptionList = options;
        }
        cacheItemMap();
      });
      GlobalEvent.on($xeselect, "mousewheel", handleGlobalMousewheelEvent);
      GlobalEvent.on($xeselect, "mousedown", handleGlobalMousedownEvent);
      GlobalEvent.on($xeselect, "keydown", handleGlobalKeydownEvent);
      GlobalEvent.on($xeselect, "blur", handleGlobalBlurEvent);
    });
    onUnmounted(function() {
      GlobalEvent.off($xeselect, "mousewheel");
      GlobalEvent.off($xeselect, "mousedown");
      GlobalEvent.off($xeselect, "keydown");
      GlobalEvent.off($xeselect, "blur");
    });
    var renderVN = function() {
      var _a, _b;
      var className = props.className, transfer = props.transfer, disabled = props.disabled, loading = props.loading, filterable = props.filterable;
      var inited = reactData.inited, isActivated = reactData.isActivated, visiblePanel = reactData.visiblePanel;
      var vSize = computeSize.value;
      var selectLabel = computeSelectLabel.value;
      var prefixSlot = slots.prefix;
      return h("div", {
        ref: refElem,
        class: ["vxe-select", className ? XEUtils$1.isFunction(className) ? className({ $select: $xeselect }) : className : "", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--visivle"] = visiblePanel, _a["is--disabled"] = disabled, _a["is--filter"] = filterable, _a["is--loading"] = loading, _a["is--active"] = isActivated, _a)]
      }, [
        h("div", {
          class: "vxe-select-slots",
          ref: "hideOption"
        }, slots.default ? slots.default({}) : []),
        h(VxeInputConstructor, {
          ref: refInput,
          clearable: props.clearable,
          placeholder: props.placeholder,
          readonly: true,
          disabled,
          type: "text",
          prefixIcon: props.prefixIcon,
          suffixIcon: loading ? GlobalConfig.icon.SELECT_LOADED : visiblePanel ? GlobalConfig.icon.SELECT_OPEN : GlobalConfig.icon.SELECT_CLOSE,
          modelValue: selectLabel,
          onClear: clearEvent,
          onClick: togglePanelEvent,
          onFocus: focusEvent,
          onBlur: blurEvent,
          onSuffixClick: togglePanelEvent
        }, prefixSlot ? {
          prefix: function() {
            return prefixSlot({});
          }
        } : {}),
        h(Teleport, {
          to: "body",
          disabled: transfer ? !inited : true
        }, [
          h("div", {
            ref: refOptionPanel,
            class: ["vxe-table--ignore-clear vxe-select--panel", (_b = {}, _b["size--".concat(vSize)] = vSize, _b["is--transfer"] = transfer, _b["animat--leave"] = !loading && reactData.animatVisible, _b["animat--enter"] = !loading && visiblePanel, _b)],
            placement: reactData.panelPlacement,
            style: reactData.panelStyle
          }, inited ? [
            filterable ? h("div", {
              class: "vxe-select-filter--wrapper"
            }, [
              h(VxeInputConstructor, {
                ref: refInpSearch,
                class: "vxe-select-filter--input",
                modelValue: reactData.searchValue,
                clearable: true,
                placeholder: GlobalConfig.i18n("vxe.select.search"),
                prefixIcon: GlobalConfig.icon.INPUT_SEARCH,
                "onUpdate:modelValue": modelSearchEvent,
                onFocus: focusSearchEvent,
                onKeydown: keydownSearchEvent,
                onChange: triggerSearchEvent,
                onSearch: triggerSearchEvent
              })
            ]) : createCommentVNode(),
            h("div", {
              ref: refOptionWrapper,
              class: "vxe-select-option--wrapper"
            }, renderOpts())
          ] : [])
        ])
      ]);
    };
    $xeselect.renderVN = renderVN;
    provide("$xeselect", $xeselect);
    return $xeselect;
  },
  render: function() {
    return this.renderVN();
  }
});
const ExportPanelComponent = defineComponent({
  name: "VxeExportPanel",
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  setup: function(props) {
    var $xetable = inject("$xetable", {});
    var _a = $xetable.getComputeMaps(), computeExportOpts = _a.computeExportOpts, computePrintOpts = _a.computePrintOpts;
    var reactData = reactive({
      isAll: false,
      isIndeterminate: false,
      loading: false
    });
    var xButtonConfirm = ref();
    var xInputFilename = ref();
    var xInputSheetname = ref();
    var computeCheckedAll = computed(function() {
      var storeData = props.storeData;
      return storeData.columns.every(function(column) {
        return column.checked;
      });
    });
    var computeShowSheet = computed(function() {
      var defaultOptions = props.defaultOptions;
      return ["html", "xml", "xlsx", "pdf"].indexOf(defaultOptions.type) > -1;
    });
    var computeSupportMerge = computed(function() {
      var storeData = props.storeData, defaultOptions = props.defaultOptions;
      return !defaultOptions.original && defaultOptions.mode === "current" && (storeData.isPrint || ["html", "xlsx"].indexOf(defaultOptions.type) > -1);
    });
    var computeSupportStyle = computed(function() {
      var defaultOptions = props.defaultOptions;
      return !defaultOptions.original && ["xlsx"].indexOf(defaultOptions.type) > -1;
    });
    var handleOptionCheck = function(column) {
      var storeData = props.storeData;
      var matchObj = XEUtils$1.findTree(storeData.columns, function(item) {
        return item === column;
      });
      if (matchObj && matchObj.parent) {
        var parent_1 = matchObj.parent;
        if (parent_1.children && parent_1.children.length) {
          parent_1.checked = parent_1.children.every(function(column2) {
            return column2.checked;
          });
          parent_1.halfChecked = !parent_1.checked && parent_1.children.some(function(column2) {
            return column2.checked || column2.halfChecked;
          });
          handleOptionCheck(parent_1);
        }
      }
    };
    var checkStatus = function() {
      var storeData = props.storeData;
      var columns = storeData.columns;
      reactData.isAll = columns.every(function(column) {
        return column.disabled || column.checked;
      });
      reactData.isIndeterminate = !reactData.isAll && columns.some(function(column) {
        return !column.disabled && (column.checked || column.halfChecked);
      });
    };
    var changeOption = function(column) {
      var isChecked = !column.checked;
      XEUtils$1.eachTree([column], function(item) {
        item.checked = isChecked;
        item.halfChecked = false;
      });
      handleOptionCheck(column);
      checkStatus();
    };
    var allColumnEvent = function() {
      var storeData = props.storeData;
      var isAll = !reactData.isAll;
      XEUtils$1.eachTree(storeData.columns, function(column) {
        if (!column.disabled) {
          column.checked = isAll;
          column.halfChecked = false;
        }
      });
      reactData.isAll = isAll;
      checkStatus();
    };
    var showEvent = function() {
      nextTick(function() {
        var filenameInp = xInputFilename.value;
        var sheetnameInp = xInputSheetname.value;
        var confirmBtn = xButtonConfirm.value;
        var targetElem = filenameInp || sheetnameInp || confirmBtn;
        if (targetElem) {
          targetElem.focus();
        }
      });
      checkStatus();
    };
    var getExportOption = function() {
      var storeData = props.storeData, defaultOptions = props.defaultOptions;
      var hasMerge = storeData.hasMerge, columns = storeData.columns;
      var checkedAll = computeCheckedAll.value;
      var supportMerge = computeSupportMerge.value;
      var expColumns = XEUtils$1.searchTree(columns, function(column) {
        return column.checked;
      }, { children: "children", mapChildren: "childNodes", original: true });
      return Object.assign({}, defaultOptions, {
        columns: expColumns,
        isMerge: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false
      });
    };
    var printEvent = function() {
      var storeData = props.storeData;
      var printOpts = computePrintOpts.value;
      storeData.visible = false;
      $xetable.print(Object.assign({}, printOpts, getExportOption()));
    };
    var exportEvent = function() {
      var storeData = props.storeData;
      var exportOpts = computeExportOpts.value;
      reactData.loading = true;
      $xetable.exportData(Object.assign({}, exportOpts, getExportOption())).then(function() {
        reactData.loading = false;
        storeData.visible = false;
      }).catch(function() {
        reactData.loading = false;
      });
    };
    var cancelEvent = function() {
      var storeData = props.storeData;
      storeData.visible = false;
    };
    var confirmEvent = function() {
      var storeData = props.storeData;
      if (storeData.isPrint) {
        printEvent();
      } else {
        exportEvent();
      }
    };
    var renderVN = function() {
      var defaultOptions = props.defaultOptions, storeData = props.storeData;
      var isAllChecked = reactData.isAll, isAllIndeterminate = reactData.isIndeterminate;
      var hasTree = storeData.hasTree, hasMerge = storeData.hasMerge, isPrint = storeData.isPrint, hasColgroup = storeData.hasColgroup;
      var isHeader = defaultOptions.isHeader;
      var cols = [];
      var checkedAll = computeCheckedAll.value;
      var showSheet = computeShowSheet.value;
      var supportMerge = computeSupportMerge.value;
      var supportStyle = computeSupportStyle.value;
      XEUtils$1.eachTree(storeData.columns, function(column) {
        var colTitle = formatText(column.getTitle(), 1);
        var isColGroup = column.children && column.children.length;
        var isChecked = column.checked;
        var indeterminate = column.halfChecked;
        cols.push(h("li", {
          class: ["vxe-export--panel-column-option", "level--".concat(column.level), {
            "is--group": isColGroup,
            "is--checked": isChecked,
            "is--indeterminate": indeterminate,
            "is--disabled": column.disabled
          }],
          title: colTitle,
          onClick: function() {
            if (!column.disabled) {
              changeOption(column);
            }
          }
        }, [
          h("span", {
            class: ["vxe-checkbox--icon", indeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
          }),
          h("span", {
            class: "vxe-checkbox--label"
          }, colTitle)
        ]));
      });
      return h(VxeModalComponent, {
        modelValue: storeData.visible,
        title: GlobalConfig.i18n(isPrint ? "vxe.export.printTitle" : "vxe.export.expTitle"),
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: reactData.loading,
        "onUpdate:modelValue": function(value) {
          storeData.visible = value;
        },
        onShow: showEvent
      }, {
        default: function() {
          return h("div", {
            class: "vxe-export--panel"
          }, [
            h("table", {
              cellspacing: 0,
              cellpadding: 0,
              border: 0
            }, [
              h("tbody", [
                [
                  isPrint ? createCommentVNode() : h("tr", [
                    h("td", GlobalConfig.i18n("vxe.export.expName")),
                    h("td", [
                      h(VxeInputConstructor, {
                        ref: xInputFilename,
                        modelValue: defaultOptions.filename,
                        type: "text",
                        clearable: true,
                        placeholder: GlobalConfig.i18n("vxe.export.expNamePlaceholder"),
                        "onUpdate:modelValue": function(value) {
                          defaultOptions.filename = value;
                        }
                      })
                    ])
                  ]),
                  isPrint ? createCommentVNode() : h("tr", [
                    h("td", GlobalConfig.i18n("vxe.export.expType")),
                    h("td", [
                      h(VxeSelectComponent, {
                        modelValue: defaultOptions.type,
                        options: storeData.typeList.map(function(item) {
                          return {
                            value: item.value,
                            label: GlobalConfig.i18n(item.label)
                          };
                        }),
                        "onUpdate:modelValue": function(value) {
                          defaultOptions.type = value;
                        }
                      })
                    ])
                  ]),
                  isPrint || showSheet ? h("tr", [
                    h("td", GlobalConfig.i18n("vxe.export.expSheetName")),
                    h("td", [
                      h(VxeInputConstructor, {
                        ref: xInputSheetname,
                        modelValue: defaultOptions.sheetName,
                        type: "text",
                        clearable: true,
                        placeholder: GlobalConfig.i18n("vxe.export.expSheetNamePlaceholder"),
                        "onUpdate:modelValue": function(value) {
                          defaultOptions.sheetName = value;
                        }
                      })
                    ])
                  ]) : createCommentVNode(),
                  h("tr", [
                    h("td", GlobalConfig.i18n("vxe.export.expMode")),
                    h("td", [
                      h(VxeSelectComponent, {
                        modelValue: defaultOptions.mode,
                        options: storeData.modeList.map(function(item) {
                          return {
                            value: item.value,
                            label: GlobalConfig.i18n(item.label)
                          };
                        }),
                        "onUpdate:modelValue": function(value) {
                          defaultOptions.mode = value;
                        }
                      })
                    ])
                  ]),
                  h("tr", [
                    h("td", [GlobalConfig.i18n("vxe.export.expColumn")]),
                    h("td", [
                      h("div", {
                        class: "vxe-export--panel-column"
                      }, [
                        h("ul", {
                          class: "vxe-export--panel-column-header"
                        }, [
                          h("li", {
                            class: ["vxe-export--panel-column-option", {
                              "is--checked": isAllChecked,
                              "is--indeterminate": isAllIndeterminate
                            }],
                            title: GlobalConfig.i18n("vxe.table.allTitle"),
                            onClick: allColumnEvent
                          }, [
                            h("span", {
                              class: ["vxe-checkbox--icon", isAllIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
                            }),
                            h("span", {
                              class: "vxe-checkbox--label"
                            }, GlobalConfig.i18n("vxe.export.expCurrentColumn"))
                          ])
                        ]),
                        h("ul", {
                          class: "vxe-export--panel-column-body"
                        }, cols)
                      ])
                    ])
                  ]),
                  h("tr", [
                    h("td", GlobalConfig.i18n("vxe.export.expOpts")),
                    h("td", [
                      h("div", {
                        class: "vxe-export--panel-option-row"
                      }, [
                        h(VxeCheckboxComponent, {
                          modelValue: defaultOptions.isHeader,
                          title: GlobalConfig.i18n("vxe.export.expHeaderTitle"),
                          content: GlobalConfig.i18n("vxe.export.expOptHeader"),
                          "onUpdate:modelValue": function(value) {
                            defaultOptions.isHeader = value;
                          }
                        }),
                        h(VxeCheckboxComponent, {
                          modelValue: defaultOptions.isFooter,
                          disabled: !storeData.hasFooter,
                          title: GlobalConfig.i18n("vxe.export.expFooterTitle"),
                          content: GlobalConfig.i18n("vxe.export.expOptFooter"),
                          "onUpdate:modelValue": function(value) {
                            defaultOptions.isFooter = value;
                          }
                        }),
                        h(VxeCheckboxComponent, {
                          modelValue: defaultOptions.original,
                          title: GlobalConfig.i18n("vxe.export.expOriginalTitle"),
                          content: GlobalConfig.i18n("vxe.export.expOptOriginal"),
                          "onUpdate:modelValue": function(value) {
                            defaultOptions.original = value;
                          }
                        })
                      ]),
                      h("div", {
                        class: "vxe-export--panel-option-row"
                      }, [
                        h(VxeCheckboxComponent, {
                          modelValue: isHeader && hasColgroup && supportMerge ? defaultOptions.isColgroup : false,
                          title: GlobalConfig.i18n("vxe.export.expColgroupTitle"),
                          disabled: !isHeader || !hasColgroup || !supportMerge,
                          content: GlobalConfig.i18n("vxe.export.expOptColgroup"),
                          "onUpdate:modelValue": function(value) {
                            defaultOptions.isColgroup = value;
                          }
                        }),
                        h(VxeCheckboxComponent, {
                          modelValue: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false,
                          title: GlobalConfig.i18n("vxe.export.expMergeTitle"),
                          disabled: !hasMerge || !supportMerge || !checkedAll,
                          content: GlobalConfig.i18n("vxe.export.expOptMerge"),
                          "onUpdate:modelValue": function(value) {
                            defaultOptions.isMerge = value;
                          }
                        }),
                        isPrint ? createCommentVNode() : h(VxeCheckboxComponent, {
                          modelValue: supportStyle ? defaultOptions.useStyle : false,
                          disabled: !supportStyle,
                          title: GlobalConfig.i18n("vxe.export.expUseStyleTitle"),
                          content: GlobalConfig.i18n("vxe.export.expOptUseStyle"),
                          "onUpdate:modelValue": function(value) {
                            defaultOptions.useStyle = value;
                          }
                        }),
                        h(VxeCheckboxComponent, {
                          modelValue: hasTree ? defaultOptions.isAllExpand : false,
                          disabled: !hasTree,
                          title: GlobalConfig.i18n("vxe.export.expAllExpandTitle"),
                          content: GlobalConfig.i18n("vxe.export.expOptAllExpand"),
                          "onUpdate:modelValue": function(value) {
                            defaultOptions.isAllExpand = value;
                          }
                        })
                      ])
                    ])
                  ])
                ]
              ])
            ]),
            h("div", {
              class: "vxe-export--panel-btns"
            }, [
              h(VxeButtonComponent, {
                content: GlobalConfig.i18n("vxe.export.expCancel"),
                onClick: cancelEvent
              }),
              h(VxeButtonComponent, {
                ref: xButtonConfirm,
                status: "primary",
                content: GlobalConfig.i18n(isPrint ? "vxe.export.expPrint" : "vxe.export.expConfirm"),
                onClick: confirmEvent
              })
            ])
          ]);
        }
      });
    };
    return renderVN;
  }
});
const VxeRadioGroupComponent = defineComponent({
  name: "VxeRadioGroup",
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    strict: { type: Boolean, default: function() {
      return GlobalConfig.radio.strict;
    } },
    size: { type: String, default: function() {
      return GlobalConfig.radio.size || GlobalConfig.size;
    } }
  },
  emits: [
    "update:modelValue",
    "change"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var $xeradiogroup = {
      xID,
      props,
      context,
      name: XEUtils$1.uniqueId("xegroup_")
    };
    var radioGroupMethods = {};
    useSize(props);
    var radioGroupPrivateMethods = {
      handleChecked: function(params, evnt) {
        emit("update:modelValue", params.label);
        radioGroupMethods.dispatchEvent("change", params);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, params.label);
        }
      }
    };
    radioGroupMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $radioGroup: $xeradiogroup, $event: evnt }, params));
      }
    };
    var renderVN = function() {
      return h("div", {
        class: "vxe-radio-group"
      }, slots.default ? slots.default({}) : []);
    };
    Object.assign($xeradiogroup, radioGroupPrivateMethods, {
      renderVN,
      dispatchEvent
    });
    provide("$xeradiogroup", $xeradiogroup);
    return renderVN;
  }
});
const VxeRadioComponent = defineComponent({
  name: "VxeRadio",
  props: {
    modelValue: [String, Number, Boolean],
    label: { type: [String, Number, Boolean], default: null },
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    name: String,
    strict: { type: Boolean, default: function() {
      return GlobalConfig.radio.strict;
    } },
    size: { type: String, default: function() {
      return GlobalConfig.radio.size || GlobalConfig.size;
    } }
  },
  emits: [
    "update:modelValue",
    "change"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var $xeradio = {
      xID,
      props,
      context
    };
    var computeSize = useSize(props);
    var $xeradiogroup = inject("$xeradiogroup", null);
    var radioMethods = {};
    var computeDisabled = computed(function() {
      return props.disabled || $xeradiogroup && $xeradiogroup.props.disabled;
    });
    var computeName = computed(function() {
      return $xeradiogroup ? $xeradiogroup.name : props.name;
    });
    var computeStrict = computed(function() {
      return $xeradiogroup ? $xeradiogroup.props.strict : props.strict;
    });
    var computeChecked = computed(function() {
      var modelValue = props.modelValue, label = props.label;
      return $xeradiogroup ? $xeradiogroup.props.modelValue === label : modelValue === label;
    });
    var handleValue = function(label, evnt) {
      if ($xeradiogroup) {
        $xeradiogroup.handleChecked({ label }, evnt);
      } else {
        emit("update:modelValue", label);
        radioMethods.dispatchEvent("change", { label }, evnt);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, label);
        }
      }
    };
    var changeEvent = function(evnt) {
      var isDisabled = computeDisabled.value;
      if (!isDisabled) {
        handleValue(props.label, evnt);
      }
    };
    var clickEvent = function(evnt) {
      var isDisabled = computeDisabled.value;
      var isStrict = computeStrict.value;
      if (!isDisabled && !isStrict) {
        if (props.label === ($xeradiogroup ? $xeradiogroup.props.modelValue : props.modelValue)) {
          handleValue(null, evnt);
        }
      }
    };
    radioMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $radio: $xeradio, $event: evnt }, params));
      }
    };
    Object.assign($xeradio, radioMethods);
    var renderVN = function() {
      var _a;
      var vSize = computeSize.value;
      var isDisabled = computeDisabled.value;
      var name = computeName.value;
      var isChecked = computeChecked.value;
      return h("label", {
        class: ["vxe-radio", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--checked"] = isChecked, _a["is--disabled"] = isDisabled, _a)],
        title: props.title
      }, [
        h("input", {
          class: "vxe-radio--input",
          type: "radio",
          name,
          checked: isChecked,
          disabled: isDisabled,
          onChange: changeEvent,
          onClick: clickEvent
        }),
        h("span", {
          class: ["vxe-radio--icon", isChecked ? "vxe-icon-radio-checked" : "vxe-icon-radio-unchecked"]
        }),
        h("span", {
          class: "vxe-radio--label"
        }, slots.default ? slots.default({}) : getFuncText(props.content))
      ]);
    };
    $xeradio.renderVN = renderVN;
    return $xeradio;
  },
  render: function() {
    return this.renderVN();
  }
});
const ImportPanelComponent = defineComponent({
  name: "VxeImportPanel",
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  setup: function(props) {
    var $xetable = inject("$xetable", {});
    var computeImportOpts = $xetable.getComputeMaps().computeImportOpts;
    var reactData = reactive({
      loading: false
    });
    var refFileBtn = ref();
    var computeSelectName = computed(function() {
      var storeData = props.storeData;
      return "".concat(storeData.filename, ".").concat(storeData.type);
    });
    var computeHasFile = computed(function() {
      var storeData = props.storeData;
      return storeData.file && storeData.type;
    });
    var computeParseTypeLabel = computed(function() {
      var storeData = props.storeData;
      var type = storeData.type, typeList = storeData.typeList;
      if (type) {
        var selectItem = XEUtils$1.find(typeList, function(item) {
          return type === item.value;
        });
        return selectItem ? GlobalConfig.i18n(selectItem.label) : "*.*";
      }
      return "*.".concat(typeList.map(function(item) {
        return item.value;
      }).join(", *."));
    });
    var clearFileEvent = function() {
      var storeData = props.storeData;
      Object.assign(storeData, {
        filename: "",
        sheetName: "",
        type: ""
      });
    };
    var selectFileEvent = function() {
      var storeData = props.storeData, defaultOptions = props.defaultOptions;
      $xetable.readFile(defaultOptions).then(function(params) {
        var file = params.file;
        Object.assign(storeData, parseFile(file), { file });
      }).catch(function(e) {
        return e;
      });
    };
    var showEvent = function() {
      nextTick(function() {
        var targetElem = refFileBtn.value;
        if (targetElem) {
          targetElem.focus();
        }
      });
    };
    var cancelEvent = function() {
      var storeData = props.storeData;
      storeData.visible = false;
    };
    var importEvent = function() {
      var storeData = props.storeData, defaultOptions = props.defaultOptions;
      var importOpts = computeImportOpts.value;
      reactData.loading = true;
      $xetable.importByFile(storeData.file, Object.assign({}, importOpts, defaultOptions)).then(function() {
        reactData.loading = false;
        storeData.visible = false;
      }).catch(function() {
        reactData.loading = false;
      });
    };
    var renderVN = function() {
      var defaultOptions = props.defaultOptions, storeData = props.storeData;
      var selectName = computeSelectName.value;
      var hasFile = computeHasFile.value;
      var parseTypeLabel = computeParseTypeLabel.value;
      return h(VxeModalComponent, {
        modelValue: storeData.visible,
        title: GlobalConfig.i18n("vxe.import.impTitle"),
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: reactData.loading,
        "onUpdate:modelValue": function(value) {
          storeData.visible = value;
        },
        onShow: showEvent
      }, {
        default: function() {
          return h("div", {
            class: "vxe-export--panel"
          }, [
            h("table", {
              cellspacing: 0,
              cellpadding: 0,
              border: 0
            }, [
              h("tbody", [
                h("tr", [
                  h("td", GlobalConfig.i18n("vxe.import.impFile")),
                  h("td", [
                    hasFile ? h("div", {
                      class: "vxe-import-selected--file",
                      title: selectName
                    }, [
                      h("span", selectName),
                      h("i", {
                        class: GlobalConfig.icon.INPUT_CLEAR,
                        onClick: clearFileEvent
                      })
                    ]) : h("button", {
                      ref: refFileBtn,
                      class: "vxe-import-select--file",
                      onClick: selectFileEvent
                    }, GlobalConfig.i18n("vxe.import.impSelect"))
                  ])
                ]),
                h("tr", [
                  h("td", GlobalConfig.i18n("vxe.import.impType")),
                  h("td", parseTypeLabel)
                ]),
                h("tr", [
                  h("td", GlobalConfig.i18n("vxe.import.impOpts")),
                  h("td", [
                    h(VxeRadioGroupComponent, {
                      modelValue: defaultOptions.mode,
                      "onUpdate:modelValue": function(value) {
                        defaultOptions.mode = value;
                      }
                    }, {
                      default: function() {
                        return storeData.modeList.map(function(item) {
                          return h(VxeRadioComponent, { label: item.value, content: GlobalConfig.i18n(item.label) });
                        });
                      }
                    })
                  ])
                ])
              ])
            ]),
            h("div", {
              class: "vxe-export--panel-btns"
            }, [
              h(VxeButtonComponent, {
                content: GlobalConfig.i18n("vxe.import.impCancel"),
                onClick: cancelEvent
              }),
              h(VxeButtonComponent, {
                status: "primary",
                disabled: !hasFile,
                content: GlobalConfig.i18n("vxe.import.impConfirm"),
                onClick: importEvent
              })
            ])
          ]);
        }
      });
    };
    return renderVN;
  }
});
dynamicApp.component(ExportPanelComponent.name, ExportPanelComponent);
dynamicApp.component(ImportPanelComponent.name, ImportPanelComponent);
var __assign$e = globalThis && globalThis.__assign || function() {
  __assign$e = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$e.apply(this, arguments);
};
const VxeIconComponent = defineComponent({
  name: "VxeIcon",
  props: {
    name: String,
    roll: Boolean
  },
  emits: [
    "click"
  ],
  setup: function(props, _a) {
    var emit = _a.emit;
    var clickEvent = function(evnt) {
      emit("click", { $event: evnt });
    };
    return function() {
      return h("i", {
        class: ["vxe-icon-".concat(props.name), props.roll ? "roll" : ""],
        onClick: clickEvent
      });
    };
  }
});
var VxeIcon = Object.assign(VxeIconComponent, {
  install: function(app) {
    app.component(VxeIconComponent.name, VxeIconComponent);
  }
});
dynamicApp.component(VxeIcon.name, VxeIcon);
var __assign$d = globalThis && globalThis.__assign || function() {
  __assign$d = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$d.apply(this, arguments);
};
function renderHelpIcon(params) {
  var $table = params.$table, column = params.column;
  var titlePrefix = column.titlePrefix || column.titleHelp;
  return titlePrefix ? [
    h("i", {
      class: ["vxe-cell-help-icon", titlePrefix.icon || GlobalConfig.icon.TABLE_HELP],
      onMouseenter: function(evnt) {
        $table.triggerHeaderHelpEvent(evnt, params);
      },
      onMouseleave: function(evnt) {
        $table.handleTargetLeaveEvent(evnt);
      }
    })
  ] : [];
}
function renderTitleContent(params, content) {
  var $table = params.$table, column = params.column;
  var props = $table.props, internalData = $table.internalData;
  var computeTooltipOpts = $table.getComputeMaps().computeTooltipOpts;
  var allColumnHeaderOverflow = props.showHeaderOverflow;
  var type = column.type, showHeaderOverflow = column.showHeaderOverflow;
  var tooltipOpts = computeTooltipOpts.value;
  var showAllTip = tooltipOpts.showAll;
  var headOverflow = XEUtils$1.isUndefined(showHeaderOverflow) || XEUtils$1.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  var showTitle = headOverflow === "title";
  var showTooltip = headOverflow === true || headOverflow === "tooltip";
  var ons = {};
  if (showTitle || showTooltip || showAllTip) {
    ons.onMouseenter = function(evnt) {
      if (internalData._isResize) {
        return;
      }
      if (showTitle) {
        updateCellTitle(evnt.currentTarget, column);
      } else if (showTooltip || showAllTip) {
        $table.triggerHeaderTooltipEvent(evnt, params);
      }
    };
  }
  if (showTooltip || showAllTip) {
    ons.onMouseleave = function(evnt) {
      if (internalData._isResize) {
        return;
      }
      if (showTooltip || showAllTip) {
        $table.handleTargetLeaveEvent(evnt);
      }
    };
  }
  return [
    type === "html" && XEUtils$1.isString(content) ? h("span", __assign$d({ class: "vxe-cell--title", innerHTML: content }, ons)) : h("span", __assign$d({ class: "vxe-cell--title" }, ons), content)
  ];
}
function getFooterContent(params) {
  var $table = params.$table, column = params.column, _columnIndex = params._columnIndex, items = params.items;
  var slots = column.slots, editRender = column.editRender, cellRender = column.cellRender;
  var renderOpts = editRender || cellRender;
  var footerSlot = slots ? slots.footer : null;
  if (footerSlot) {
    return $table.callSlot(footerSlot, params);
  }
  if (renderOpts) {
    var compConf = VXETable.renderer.get(renderOpts.name);
    if (compConf && compConf.renderFooter) {
      return getSlotVNs(compConf.renderFooter(renderOpts, params));
    }
  }
  return [formatText(items[_columnIndex], 1)];
}
function getDefaultCellLabel(params) {
  var $table = params.$table, row = params.row, column = params.column;
  return formatText($table.getCellLabel(row, column), 1);
}
var Cell = {
  createColumn: function($xetable, columnOpts) {
    var type = columnOpts.type, sortable = columnOpts.sortable, filters = columnOpts.filters, editRender = columnOpts.editRender, treeNode = columnOpts.treeNode;
    var props = $xetable.props;
    var editConfig = props.editConfig;
    var _a = $xetable.getComputeMaps(), computeEditOpts = _a.computeEditOpts, computeCheckboxOpts = _a.computeCheckboxOpts;
    var checkboxOpts = computeCheckboxOpts.value;
    var editOpts = computeEditOpts.value;
    var renConfs = {
      renderHeader: Cell.renderDefaultHeader,
      renderCell: treeNode ? Cell.renderTreeCell : Cell.renderDefaultCell,
      renderFooter: Cell.renderDefaultFooter
    };
    switch (type) {
      case "seq":
        renConfs.renderHeader = Cell.renderSeqHeader;
        renConfs.renderCell = treeNode ? Cell.renderTreeIndexCell : Cell.renderSeqCell;
        break;
      case "radio":
        renConfs.renderHeader = Cell.renderRadioHeader;
        renConfs.renderCell = treeNode ? Cell.renderTreeRadioCell : Cell.renderRadioCell;
        break;
      case "checkbox":
        renConfs.renderHeader = Cell.renderCheckboxHeader;
        renConfs.renderCell = checkboxOpts.checkField ? treeNode ? Cell.renderTreeSelectionCellByProp : Cell.renderCheckboxCellByProp : treeNode ? Cell.renderTreeSelectionCell : Cell.renderCheckboxCell;
        break;
      case "expand":
        renConfs.renderCell = Cell.renderExpandCell;
        renConfs.renderData = Cell.renderExpandData;
        break;
      case "html":
        renConfs.renderCell = treeNode ? Cell.renderTreeHTMLCell : Cell.renderHTMLCell;
        if (filters && sortable) {
          renConfs.renderHeader = Cell.renderSortAndFilterHeader;
        } else if (sortable) {
          renConfs.renderHeader = Cell.renderSortHeader;
        } else if (filters) {
          renConfs.renderHeader = Cell.renderFilterHeader;
        }
        break;
      default:
        if (editConfig && editRender) {
          renConfs.renderHeader = Cell.renderEditHeader;
          renConfs.renderCell = editOpts.mode === "cell" ? treeNode ? Cell.renderTreeCellEdit : Cell.renderCellEdit : treeNode ? Cell.renderTreeRowEdit : Cell.renderRowEdit;
        } else if (filters && sortable) {
          renConfs.renderHeader = Cell.renderSortAndFilterHeader;
        } else if (sortable) {
          renConfs.renderHeader = Cell.renderSortHeader;
        } else if (filters) {
          renConfs.renderHeader = Cell.renderFilterHeader;
        }
    }
    return createColumn($xetable, columnOpts, renConfs);
  },
  /**
   * 单元格
   */
  renderHeaderTitle: function(params) {
    var $table = params.$table, column = params.column;
    var slots = column.slots, editRender = column.editRender, cellRender = column.cellRender;
    var renderOpts = editRender || cellRender;
    var headerSlot = slots ? slots.header : null;
    if (headerSlot) {
      return renderTitleContent(params, $table.callSlot(headerSlot, params));
    }
    if (renderOpts) {
      var compConf = VXETable.renderer.get(renderOpts.name);
      if (compConf && compConf.renderHeader) {
        return renderTitleContent(params, getSlotVNs(compConf.renderHeader(renderOpts, params)));
      }
    }
    return renderTitleContent(params, [formatText(column.getTitle(), 1)]);
  },
  renderDefaultHeader: function(params) {
    return renderHelpIcon(params).concat(Cell.renderHeaderTitle(params));
  },
  renderDefaultCell: function(params) {
    var $table = params.$table, row = params.row, column = params.column;
    var slots = column.slots, editRender = column.editRender, cellRender = column.cellRender;
    var renderOpts = editRender || cellRender;
    var defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    if (renderOpts) {
      var funName = editRender ? "renderCell" : "renderDefault";
      var compConf = VXETable.renderer.get(renderOpts.name);
      var compFn = compConf ? compConf[funName] : null;
      if (compFn) {
        return getSlotVNs(compFn(renderOpts, Object.assign({ $type: editRender ? "edit" : "cell" }, params)));
      }
    }
    var cellValue = $table.getCellLabel(row, column);
    var cellPlaceholder = editRender ? editRender.placeholder : "";
    return [
      h("span", {
        class: "vxe-cell--label"
      }, editRender && eqEmptyValue(cellValue) ? [
        // 如果设置占位符
        h("span", {
          class: "vxe-cell--placeholder"
        }, formatText(getFuncText(cellPlaceholder), 1))
      ] : formatText(cellValue, 1))
    ];
  },
  renderTreeCell: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderDefaultCell(params));
  },
  renderDefaultFooter: function(params) {
    return [
      h("span", {
        class: "vxe-cell--item"
      }, getFooterContent(params))
    ];
  },
  /**
   * 树节点
   */
  renderTreeIcon: function(params, cellVNodes) {
    var $table = params.$table, isHidden = params.isHidden;
    var reactData = $table.reactData;
    var computeTreeOpts = $table.getComputeMaps().computeTreeOpts;
    var treeExpandeds = reactData.treeExpandeds, treeLazyLoadeds = reactData.treeLazyLoadeds;
    var treeOpts = computeTreeOpts.value;
    var row = params.row, column = params.column, level = params.level;
    var slots = column.slots;
    var children = treeOpts.children, hasChild = treeOpts.hasChild, indent = treeOpts.indent, lazy = treeOpts.lazy, trigger = treeOpts.trigger, iconLoaded = treeOpts.iconLoaded, showIcon = treeOpts.showIcon, iconOpen = treeOpts.iconOpen, iconClose = treeOpts.iconClose;
    var rowChilds = row[children];
    var iconSlot = slots ? slots.icon : null;
    var hasLazyChilds = false;
    var isAceived = false;
    var isLazyLoaded = false;
    var ons = {};
    if (iconSlot) {
      return $table.callSlot(iconSlot, params);
    }
    if (!isHidden) {
      isAceived = $table.findRowIndexOf(treeExpandeds, row) > -1;
      if (lazy) {
        isLazyLoaded = $table.findRowIndexOf(treeLazyLoadeds, row) > -1;
        hasLazyChilds = row[hasChild];
      }
    }
    if (!trigger || trigger === "default") {
      ons.onClick = function(evnt) {
        return $table.triggerTreeExpandEvent(evnt, params);
      };
    }
    return [
      h("div", {
        class: ["vxe-cell--tree-node", {
          "is--active": isAceived
        }],
        style: {
          paddingLeft: "".concat(level * indent, "px")
        }
      }, [
        showIcon && (rowChilds && rowChilds.length || hasLazyChilds) ? [
          h("div", __assign$d({ class: "vxe-tree--btn-wrapper" }, ons), [
            h("i", {
              class: ["vxe-tree--node-btn", isLazyLoaded ? iconLoaded || GlobalConfig.icon.TABLE_TREE_LOADED : isAceived ? iconOpen || GlobalConfig.icon.TABLE_TREE_OPEN : iconClose || GlobalConfig.icon.TABLE_TREE_CLOSE]
            })
          ])
        ] : null,
        h("div", {
          class: "vxe-tree-cell"
        }, cellVNodes)
      ])
    ];
  },
  /**
   * 索引
   */
  renderSeqHeader: function(params) {
    var $table = params.$table, column = params.column;
    var slots = column.slots;
    var headerSlot = slots ? slots.header : null;
    return renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : [formatText(column.getTitle(), 1)]);
  },
  renderSeqCell: function(params) {
    var $table = params.$table, column = params.column;
    var props = $table.props;
    var treeConfig = props.treeConfig;
    var computeSeqOpts = $table.getComputeMaps().computeSeqOpts;
    var seqOpts = computeSeqOpts.value;
    var slots = column.slots;
    var defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    var seq = params.seq;
    var seqMethod = seqOpts.seqMethod;
    return [formatText(seqMethod ? seqMethod(params) : treeConfig ? seq : (seqOpts.startIndex || 0) + seq, 1)];
  },
  renderTreeIndexCell: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderSeqCell(params));
  },
  /**
   * 单选
   */
  renderRadioHeader: function(params) {
    var $table = params.$table, column = params.column;
    var slots = column.slots;
    var headerSlot = slots ? slots.header : null;
    var titleSlot = slots ? slots.title : null;
    return renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : [
      h("span", {
        class: "vxe-radio--label"
      }, titleSlot ? $table.callSlot(titleSlot, params) : formatText(column.getTitle(), 1))
    ]);
  },
  renderRadioCell: function(params) {
    var $table = params.$table, column = params.column, isHidden = params.isHidden;
    var reactData = $table.reactData;
    var computeRadioOpts = $table.getComputeMaps().computeRadioOpts;
    var selectRow = reactData.selectRow;
    var radioOpts = computeRadioOpts.value;
    var slots = column.slots;
    var labelField = radioOpts.labelField, checkMethod = radioOpts.checkMethod, visibleMethod = radioOpts.visibleMethod;
    var row = params.row;
    var defaultSlot = slots ? slots.default : null;
    var radioSlot = slots ? slots.radio : null;
    var isChecked = row === selectRow;
    var isVisible = !visibleMethod || visibleMethod({ row });
    var isDisabled = !!checkMethod;
    var ons;
    if (!isHidden) {
      ons = {
        onClick: function(evnt) {
          if (!isDisabled && isVisible) {
            $table.triggerRadioRowEvent(evnt, params);
          }
        }
      };
      if (checkMethod) {
        isDisabled = !checkMethod({ row });
      }
    }
    var radioParams = __assign$d(__assign$d({}, params), { checked: isChecked, disabled: isDisabled, visible: isVisible });
    if (radioSlot) {
      return $table.callSlot(radioSlot, radioParams);
    }
    var radioVNs = [];
    if (isVisible) {
      radioVNs.push(h("span", {
        class: ["vxe-radio--icon", isChecked ? GlobalConfig.icon.TABLE_RADIO_CHECKED : GlobalConfig.icon.TABLE_RADIO_UNCHECKED]
      }));
    }
    if (defaultSlot || labelField) {
      radioVNs.push(h("span", {
        class: "vxe-radio--label"
      }, defaultSlot ? $table.callSlot(defaultSlot, radioParams) : XEUtils$1.get(row, labelField)));
    }
    return [
      h("span", __assign$d({ class: ["vxe-cell--radio", {
        "is--checked": isChecked,
        "is--disabled": isDisabled
      }] }, ons), radioVNs)
    ];
  },
  renderTreeRadioCell: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderRadioCell(params));
  },
  /**
   * 多选
   */
  renderCheckboxHeader: function(params) {
    var $table = params.$table, column = params.column, isHidden = params.isHidden;
    var reactData = $table.reactData;
    var _a = $table.getComputeMaps(), computeIsAllCheckboxDisabled = _a.computeIsAllCheckboxDisabled, computeCheckboxOpts = _a.computeCheckboxOpts;
    var isAllCheckboxSelected = reactData.isAllSelected, isAllCheckboxIndeterminate = reactData.isIndeterminate;
    var isAllCheckboxDisabled = computeIsAllCheckboxDisabled.value;
    var slots = column.slots;
    var headerSlot = slots ? slots.header : null;
    var titleSlot = slots ? slots.title : null;
    var checkboxOpts = computeCheckboxOpts.value;
    var headerTitle = column.getTitle();
    var ons;
    if (!isHidden) {
      ons = {
        onClick: function(evnt) {
          if (!isAllCheckboxDisabled) {
            $table.triggerCheckAllEvent(evnt, !isAllCheckboxSelected);
          }
        }
      };
    }
    var checkboxParams = __assign$d(__assign$d({}, params), { checked: isAllCheckboxSelected, disabled: isAllCheckboxDisabled, indeterminate: isAllCheckboxIndeterminate });
    if (headerSlot) {
      return renderTitleContent(checkboxParams, $table.callSlot(headerSlot, checkboxParams));
    }
    if (checkboxOpts.checkStrictly ? !checkboxOpts.showHeader : checkboxOpts.showHeader === false) {
      return renderTitleContent(checkboxParams, [
        h("span", {
          class: "vxe-checkbox--label"
        }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : headerTitle)
      ]);
    }
    return renderTitleContent(checkboxParams, [
      h("span", __assign$d({ class: ["vxe-cell--checkbox", {
        "is--checked": isAllCheckboxSelected,
        "is--disabled": isAllCheckboxDisabled,
        "is--indeterminate": isAllCheckboxIndeterminate
      }], title: GlobalConfig.i18n("vxe.table.allTitle") }, ons), [
        h("span", {
          class: ["vxe-checkbox--icon", isAllCheckboxIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isAllCheckboxSelected ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
        })
      ].concat(titleSlot || headerTitle ? [
        h("span", {
          class: "vxe-checkbox--label"
        }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : headerTitle)
      ] : []))
    ]);
  },
  renderCheckboxCell: function(params) {
    var $table = params.$table, row = params.row, column = params.column, isHidden = params.isHidden;
    var props = $table.props, reactData = $table.reactData;
    var treeConfig = props.treeConfig;
    var selection = reactData.selection, treeIndeterminates = reactData.treeIndeterminates;
    var computeCheckboxOpts = $table.getComputeMaps().computeCheckboxOpts;
    var checkboxOpts = computeCheckboxOpts.value;
    var labelField = checkboxOpts.labelField, checkMethod = checkboxOpts.checkMethod, visibleMethod = checkboxOpts.visibleMethod;
    var slots = column.slots;
    var defaultSlot = slots ? slots.default : null;
    var checkboxSlot = slots ? slots.checkbox : null;
    var indeterminate = false;
    var isChecked = false;
    var isVisible = !visibleMethod || visibleMethod({ row });
    var isDisabled = !!checkMethod;
    var ons;
    if (!isHidden) {
      isChecked = $table.findRowIndexOf(selection, row) > -1;
      ons = {
        onClick: function(evnt) {
          if (!isDisabled && isVisible) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };
      if (checkMethod) {
        isDisabled = !checkMethod({ row });
      }
      if (treeConfig) {
        indeterminate = $table.findRowIndexOf(treeIndeterminates, row) > -1;
      }
    }
    var checkboxParams = __assign$d(__assign$d({}, params), { checked: isChecked, disabled: isDisabled, visible: isVisible, indeterminate });
    if (checkboxSlot) {
      return $table.callSlot(checkboxSlot, checkboxParams);
    }
    var checkVNs = [];
    if (isVisible) {
      checkVNs.push(h("span", {
        class: ["vxe-checkbox--icon", indeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
      }));
    }
    if (defaultSlot || labelField) {
      checkVNs.push(h("span", {
        class: "vxe-checkbox--label"
      }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : XEUtils$1.get(row, labelField)));
    }
    return [
      h("span", __assign$d({ class: ["vxe-cell--checkbox", {
        "is--checked": isChecked,
        "is--disabled": isDisabled,
        "is--indeterminate": indeterminate
      }] }, ons), checkVNs)
    ];
  },
  renderTreeSelectionCell: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderCheckboxCell(params));
  },
  renderCheckboxCellByProp: function(params) {
    var $table = params.$table, row = params.row, column = params.column, isHidden = params.isHidden;
    var props = $table.props, reactData = $table.reactData;
    var treeConfig = props.treeConfig;
    var treeIndeterminates = reactData.treeIndeterminates;
    var computeCheckboxOpts = $table.getComputeMaps().computeCheckboxOpts;
    var checkboxOpts = computeCheckboxOpts.value;
    var labelField = checkboxOpts.labelField, checkField = checkboxOpts.checkField, halfField = checkboxOpts.halfField, checkMethod = checkboxOpts.checkMethod, visibleMethod = checkboxOpts.visibleMethod;
    var slots = column.slots;
    var defaultSlot = slots ? slots.default : null;
    var checkboxSlot = slots ? slots.checkbox : null;
    var indeterminate = false;
    var isChecked = false;
    var isVisible = !visibleMethod || visibleMethod({ row });
    var isDisabled = !!checkMethod;
    var ons;
    if (!isHidden) {
      isChecked = XEUtils$1.get(row, checkField);
      ons = {
        onClick: function(evnt) {
          if (!isDisabled && isVisible) {
            $table.triggerCheckRowEvent(evnt, params, !isChecked);
          }
        }
      };
      if (checkMethod) {
        isDisabled = !checkMethod({ row });
      }
      if (treeConfig) {
        indeterminate = $table.findRowIndexOf(treeIndeterminates, row) > -1;
      }
    }
    var checkboxParams = __assign$d(__assign$d({}, params), { checked: isChecked, disabled: isDisabled, visible: isVisible, indeterminate });
    if (checkboxSlot) {
      return $table.callSlot(checkboxSlot, checkboxParams);
    }
    var checkVNs = [];
    if (isVisible) {
      checkVNs.push(h("span", {
        class: ["vxe-checkbox--icon", indeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
      }));
      if (defaultSlot || labelField) {
        checkVNs.push(h("span", {
          class: "vxe-checkbox--label"
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : XEUtils$1.get(row, labelField)));
      }
    }
    return [
      h("span", __assign$d({ class: ["vxe-cell--checkbox", {
        "is--checked": isChecked,
        "is--disabled": isDisabled,
        "is--indeterminate": halfField && !isChecked ? row[halfField] : indeterminate
      }] }, ons), checkVNs)
    ];
  },
  renderTreeSelectionCellByProp: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderCheckboxCellByProp(params));
  },
  /**
   * 展开行
   */
  renderExpandCell: function(params) {
    var $table = params.$table, isHidden = params.isHidden, row = params.row, column = params.column;
    var reactData = $table.reactData;
    var rowExpandeds = reactData.rowExpandeds, expandLazyLoadeds = reactData.expandLazyLoadeds;
    var computeExpandOpts = $table.getComputeMaps().computeExpandOpts;
    var expandOpts = computeExpandOpts.value;
    var lazy = expandOpts.lazy, labelField = expandOpts.labelField, iconLoaded = expandOpts.iconLoaded, showIcon = expandOpts.showIcon, iconOpen = expandOpts.iconOpen, iconClose = expandOpts.iconClose, visibleMethod = expandOpts.visibleMethod;
    var slots = column.slots;
    var defaultSlot = slots ? slots.default : null;
    var iconSlot = slots ? slots.icon : null;
    var isAceived = false;
    var isLazyLoaded = false;
    if (iconSlot) {
      return $table.callSlot(iconSlot, params);
    }
    if (!isHidden) {
      isAceived = $table.findRowIndexOf(rowExpandeds, params.row) > -1;
      if (lazy) {
        isLazyLoaded = $table.findRowIndexOf(expandLazyLoadeds, row) > -1;
      }
    }
    return [
      showIcon && (!visibleMethod || visibleMethod(params)) ? h("span", {
        class: ["vxe-table--expanded", {
          "is--active": isAceived
        }],
        onClick: function(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }
      }, [
        h("i", {
          class: ["vxe-table--expand-btn", isLazyLoaded ? iconLoaded || GlobalConfig.icon.TABLE_EXPAND_LOADED : isAceived ? iconOpen || GlobalConfig.icon.TABLE_EXPAND_OPEN : iconClose || GlobalConfig.icon.TABLE_EXPAND_CLOSE]
        })
      ]) : null,
      defaultSlot || labelField ? h("span", {
        class: "vxe-table--expand-label"
      }, defaultSlot ? $table.callSlot(defaultSlot, params) : XEUtils$1.get(row, labelField)) : null
    ];
  },
  renderExpandData: function(params) {
    var $table = params.$table, column = params.column;
    var slots = column.slots, contentRender = column.contentRender;
    var contentSlot = slots ? slots.content : null;
    if (contentSlot) {
      return $table.callSlot(contentSlot, params);
    }
    if (contentRender) {
      var compConf = VXETable.renderer.get(contentRender.name);
      if (compConf && compConf.renderExpand) {
        return getSlotVNs(compConf.renderExpand(contentRender, params));
      }
    }
    return [];
  },
  /**
   * HTML 标签
   */
  renderHTMLCell: function(params) {
    var $table = params.$table, column = params.column;
    var slots = column.slots;
    var defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    return [
      h("span", {
        class: "vxe-cell--html",
        innerHTML: getDefaultCellLabel(params)
      })
    ];
  },
  renderTreeHTMLCell: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderHTMLCell(params));
  },
  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader: function(params) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderSortIcon(params)).concat(Cell.renderFilterIcon(params));
  },
  /**
   * 排序
   */
  renderSortHeader: function(params) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderSortIcon(params));
  },
  renderSortIcon: function(params) {
    var $table = params.$table, column = params.column;
    var computeSortOpts = $table.getComputeMaps().computeSortOpts;
    var sortOpts = computeSortOpts.value;
    var showIcon = sortOpts.showIcon, iconAsc = sortOpts.iconAsc, iconDesc = sortOpts.iconDesc;
    var order = column.order;
    return showIcon ? [
      h("span", {
        class: "vxe-cell--sort"
      }, [
        h("i", {
          class: ["vxe-sort--asc-btn", iconAsc || GlobalConfig.icon.TABLE_SORT_ASC, {
            "sort--active": order === "asc"
          }],
          title: GlobalConfig.i18n("vxe.table.sortAsc"),
          onClick: function(evnt) {
            $table.triggerSortEvent(evnt, column, "asc");
          }
        }),
        h("i", {
          class: ["vxe-sort--desc-btn", iconDesc || GlobalConfig.icon.TABLE_SORT_DESC, {
            "sort--active": order === "desc"
          }],
          title: GlobalConfig.i18n("vxe.table.sortDesc"),
          onClick: function(evnt) {
            $table.triggerSortEvent(evnt, column, "desc");
          }
        })
      ])
    ] : [];
  },
  /**
   * 筛选
   */
  renderFilterHeader: function(params) {
    return Cell.renderDefaultHeader(params).concat(Cell.renderFilterIcon(params));
  },
  renderFilterIcon: function(params) {
    var $table = params.$table, column = params.column, hasFilter = params.hasFilter;
    var reactData = $table.reactData;
    var filterStore = reactData.filterStore;
    var computeFilterOpts = $table.getComputeMaps().computeFilterOpts;
    var filterOpts = computeFilterOpts.value;
    var showIcon = filterOpts.showIcon, iconNone = filterOpts.iconNone, iconMatch = filterOpts.iconMatch;
    return showIcon ? [
      h("span", {
        class: ["vxe-cell--filter", {
          "is--active": filterStore.visible && filterStore.column === column
        }]
      }, [
        h("i", {
          class: ["vxe-filter--btn", hasFilter ? iconMatch || GlobalConfig.icon.TABLE_FILTER_MATCH : iconNone || GlobalConfig.icon.TABLE_FILTER_NONE],
          title: GlobalConfig.i18n("vxe.table.filter"),
          onClick: function(evnt) {
            $table.triggerFilterEvent(evnt, params.column, params);
          }
        })
      ])
    ] : [];
  },
  /**
   * 可编辑
   */
  renderEditHeader: function(params) {
    var $table = params.$table, column = params.column;
    var props = $table.props;
    var computeEditOpts = $table.getComputeMaps().computeEditOpts;
    var editConfig = props.editConfig, editRules = props.editRules;
    var editOpts = computeEditOpts.value;
    var sortable = column.sortable, filters = column.filters, editRender = column.editRender;
    var isRequired = false;
    if (editRules) {
      var columnRules = XEUtils$1.get(editRules, column.field);
      if (columnRules) {
        isRequired = columnRules.some(function(rule) {
          return rule.required;
        });
      }
    }
    return (isEnableConf(editConfig) ? [
      isRequired && editOpts.showAsterisk ? h("i", {
        class: "vxe-cell--required-icon"
      }) : null,
      isEnableConf(editRender) && editOpts.showIcon ? h("i", {
        class: ["vxe-cell--edit-icon", editOpts.icon || GlobalConfig.icon.TABLE_EDIT]
      }) : null
    ] : []).concat(Cell.renderDefaultHeader(params)).concat(sortable ? Cell.renderSortIcon(params) : []).concat(filters ? Cell.renderFilterIcon(params) : []);
  },
  // 行格编辑模式
  renderRowEdit: function(params) {
    var $table = params.$table, column = params.column;
    var reactData = $table.reactData;
    var editStore = reactData.editStore;
    var actived = editStore.actived;
    var editRender = column.editRender;
    return Cell.runRenderer(params, isEnableConf(editRender) && actived && actived.row === params.row);
  },
  renderTreeRowEdit: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderRowEdit(params));
  },
  // 单元格编辑模式
  renderCellEdit: function(params) {
    var $table = params.$table, column = params.column;
    var reactData = $table.reactData;
    var editStore = reactData.editStore;
    var actived = editStore.actived;
    var editRender = column.editRender;
    return Cell.runRenderer(params, isEnableConf(editRender) && actived && actived.row === params.row && actived.column === params.column);
  },
  renderTreeCellEdit: function(params) {
    return Cell.renderTreeIcon(params, Cell.renderCellEdit(params));
  },
  runRenderer: function(params, isEdit) {
    var $table = params.$table, column = params.column;
    var slots = column.slots, editRender = column.editRender, formatter = column.formatter;
    var defaultSlot = slots ? slots.default : null;
    var editSlot = slots ? slots.edit : null;
    var compConf = VXETable.renderer.get(editRender.name);
    if (isEdit) {
      if (editSlot) {
        return $table.callSlot(editSlot, params);
      }
      if (compConf && compConf.renderEdit) {
        return getSlotVNs(compConf.renderEdit(editRender, Object.assign({ $type: "edit" }, params)));
      }
      return [];
    }
    if (defaultSlot) {
      return $table.callSlot(defaultSlot, params);
    }
    if (formatter) {
      return [
        h("span", {
          class: "vxe-cell--label"
        }, getDefaultCellLabel(params))
      ];
    }
    return Cell.renderDefaultCell(params);
  }
};
var columnProps = {
  // 列唯一主键
  colId: [String, Number],
  // 渲染类型 index,radio,checkbox,expand,html
  type: String,
  // 列字段名
  field: String,
  // 列标题
  title: String,
  // 列宽度
  width: [Number, String],
  // 列最小宽度，把剩余宽度按比例分配
  minWidth: [Number, String],
  // 列最大宽度
  maxWidth: [Number, String],
  // 是否允许拖动列宽调整大小
  resizable: { type: Boolean, default: null },
  // 将列固定在左侧或者右侧
  fixed: String,
  // 列对其方式
  align: String,
  // 表头对齐方式
  headerAlign: String,
  // 表尾列的对齐方式
  footerAlign: String,
  // 当内容过长时显示为省略号
  showOverflow: { type: [Boolean, String], default: null },
  // 当表头内容过长时显示为省略号
  showHeaderOverflow: { type: [Boolean, String], default: null },
  // 当表尾内容过长时显示为省略号
  showFooterOverflow: { type: [Boolean, String], default: null },
  // 给单元格附加 className
  className: [String, Function],
  // 给表头单元格附加 className
  headerClassName: [String, Function],
  // 给表尾单元格附加 className
  footerClassName: [String, Function],
  // 格式化显示内容
  formatter: [Function, Array, String],
  // 是否允许排序
  sortable: Boolean,
  // 自定义排序的属性
  sortBy: [String, Function],
  // 排序的字段类型，比如字符串转数值等
  sortType: String,
  // 配置筛选条件数组
  filters: { type: Array, default: null },
  // 筛选是否允许多选
  filterMultiple: { type: Boolean, default: true },
  // 自定义筛选方法
  filterMethod: Function,
  // 筛选重置方法
  filterResetMethod: Function,
  // 筛选复原方法
  filterRecoverMethod: Function,
  // 筛选模板配置项
  filterRender: Object,
  // 指定为树节点
  treeNode: Boolean,
  // 是否可视
  visible: { type: Boolean, default: null },
  // 单元格数据导出方法
  exportMethod: Function,
  // 表尾单元格数据导出方法
  footerExportMethod: Function,
  // 已废弃，被 titlePrefix 替换
  titleHelp: Object,
  // 标题帮助图标配置项
  titlePrefix: Object,
  // 单元格值类型
  cellType: String,
  // 单元格渲染配置项
  cellRender: Object,
  // 单元格编辑渲染配置项
  editRender: Object,
  // 内容渲染配置项
  contentRender: Object,
  // 额外的参数
  params: Object
};
const VxeTableColumnComponent = defineComponent({
  name: "VxeColumn",
  props: columnProps,
  setup: function(props, _a) {
    var slots = _a.slots;
    var refElem = ref();
    var $xetable = inject("$xetable", {});
    var colgroup = inject("xecolgroup", null);
    var column = Cell.createColumn($xetable, props);
    column.slots = slots;
    provide("$xegrid", null);
    watchColumn(props, column);
    onMounted(function() {
      assemColumn($xetable, refElem.value, column, colgroup);
    });
    onUnmounted(function() {
      destroyColumn($xetable, column);
    });
    var renderVN = function() {
      return h("div", {
        ref: refElem
      });
    };
    return renderVN;
  }
});
var VxeColumn = Object.assign(VxeTableColumnComponent, {
  install: function(app) {
    app.component(VxeTableColumnComponent.name, VxeTableColumnComponent);
    app.component("VxeTableColumn", VxeTableColumnComponent);
  }
});
dynamicApp.component(VxeTableColumnComponent.name, VxeTableColumnComponent);
dynamicApp.component("VxeTableColumn", VxeTableColumnComponent);
const VxeTableColgroupComponent = defineComponent({
  name: "VxeColgroup",
  props: columnProps,
  setup: function(props, _a) {
    var slots = _a.slots;
    var refElem = ref();
    var $xetable = inject("$xetable", {});
    var colgroup = inject("xecolgroup", null);
    var column = Cell.createColumn($xetable, props);
    var columnSlots = {};
    if (slots.header) {
      columnSlots.header = slots.header;
    }
    var xecolumn = { column };
    column.slots = columnSlots;
    column.children = [];
    provide("xecolgroup", xecolumn);
    provide("$xegrid", null);
    watchColumn(props, column);
    onMounted(function() {
      assemColumn($xetable, refElem.value, column, colgroup);
    });
    onUnmounted(function() {
      destroyColumn($xetable, column);
    });
    var renderVN = function() {
      return h("div", {
        ref: refElem
      }, slots.default ? slots.default() : []);
    };
    return renderVN;
  }
});
Object.assign(VxeTableColgroupComponent, {
  install: function(app) {
    app.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent);
    app.component("VxeTableColgroup", VxeTableColgroupComponent);
  }
});
dynamicApp.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent);
dynamicApp.component("VxeTableColgroup", VxeTableColgroupComponent);
const tableProps = {
  /** 基本属性 */
  id: String,
  // 数据
  data: Array,
  // 表格的高度
  height: [Number, String],
  // 表格的最大高度
  maxHeight: [Number, String],
  // 已废弃，被 column-config.resizable 替换
  resizable: { type: Boolean, default: function() {
    return GlobalConfig.table.resizable;
  } },
  // 是否带有斑马纹
  stripe: { type: Boolean, default: function() {
    return GlobalConfig.table.stripe;
  } },
  // 是否带有边框
  border: { type: [Boolean, String], default: function() {
    return GlobalConfig.table.border;
  } },
  // 是否圆角边框
  round: { type: Boolean, default: function() {
    return GlobalConfig.table.round;
  } },
  // 表格的尺寸
  size: { type: String, default: function() {
    return GlobalConfig.table.size || GlobalConfig.size;
  } },
  // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
  fit: { type: Boolean, default: function() {
    return GlobalConfig.table.fit;
  } },
  // 表格是否加载中
  loading: Boolean,
  // 所有的列对其方式
  align: { type: String, default: function() {
    return GlobalConfig.table.align;
  } },
  // 所有的表头列的对齐方式
  headerAlign: { type: String, default: function() {
    return GlobalConfig.table.headerAlign;
  } },
  // 所有的表尾列的对齐方式
  footerAlign: { type: String, default: function() {
    return GlobalConfig.table.footerAlign;
  } },
  // 是否显示表头
  showHeader: { type: Boolean, default: function() {
    return GlobalConfig.table.showHeader;
  } },
  // （即将废弃）是否要高亮当前选中行
  highlightCurrentRow: { type: Boolean, default: function() {
    return GlobalConfig.table.highlightCurrentRow;
  } },
  // （即将废弃）鼠标移到行是否要高亮显示
  highlightHoverRow: { type: Boolean, default: function() {
    return GlobalConfig.table.highlightHoverRow;
  } },
  // （即将废弃）是否要高亮当前选中列
  highlightCurrentColumn: { type: Boolean, default: function() {
    return GlobalConfig.table.highlightCurrentColumn;
  } },
  // （即将废弃）鼠标移到列是否要高亮显示
  highlightHoverColumn: { type: Boolean, default: function() {
    return GlobalConfig.table.highlightHoverColumn;
  } },
  // （即将废弃）激活单元格编辑时是否高亮显示
  highlightCell: Boolean,
  // 是否显示表尾合计
  showFooter: Boolean,
  // 表尾合计的计算方法
  footerMethod: Function,
  // 给行附加 className
  rowClassName: [String, Function],
  // 给单元格附加 className
  cellClassName: [String, Function],
  // 给表头的行附加 className
  headerRowClassName: [String, Function],
  // 给表头的单元格附加 className
  headerCellClassName: [String, Function],
  // 给表尾的行附加 className
  footerRowClassName: [String, Function],
  // 给表尾的单元格附加 className
  footerCellClassName: [String, Function],
  // 给单元格附加样式
  cellStyle: [Object, Function],
  // 给表头单元格附加样式
  headerCellStyle: [Object, Function],
  // 给表尾单元格附加样式
  footerCellStyle: [Object, Function],
  // 给行附加样式
  rowStyle: [Object, Function],
  // 给表头行附加样式
  headerRowStyle: [Object, Function],
  // 给表尾行附加样式
  footerRowStyle: [Object, Function],
  // 合并指定单元格
  mergeCells: Array,
  // 合并指定的表尾
  mergeFooterItems: Array,
  // 自定义合并行或列的方法
  spanMethod: Function,
  // 表尾合并行或列
  footerSpanMethod: Function,
  // 设置所有内容过长时显示为省略号
  showOverflow: { type: [Boolean, String], default: function() {
    return GlobalConfig.table.showOverflow;
  } },
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow: { type: [Boolean, String], default: function() {
    return GlobalConfig.table.showHeaderOverflow;
  } },
  // 设置表尾所有内容过长时显示为省略号
  showFooterOverflow: { type: [Boolean, String], default: function() {
    return GlobalConfig.table.showFooterOverflow;
  } },
  /** 高级属性 */
  // （即将废弃）columnKey 已废弃，被 column-config.useKey 替换
  columnKey: Boolean,
  // （即将废弃）rowKey 已废弃，被 row-config.useKey 替换
  rowKey: Boolean,
  // （即将废弃）rowId 已废弃，被 row-config.keyField 替换
  rowId: { type: String, default: function() {
    return GlobalConfig.table.rowId;
  } },
  zIndex: Number,
  emptyText: { type: String, default: function() {
    return GlobalConfig.table.emptyText;
  } },
  keepSource: { type: Boolean, default: function() {
    return GlobalConfig.table.keepSource;
  } },
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize: { type: Boolean, default: function() {
    return GlobalConfig.table.autoResize;
  } },
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize: [Boolean, String, Number],
  // 列配置信息
  columnConfig: Object,
  // 行配置信息
  rowConfig: Object,
  // 列调整配置项
  resizableConfig: Object,
  // 序号配置项
  seqConfig: Object,
  // 排序配置项
  sortConfig: Object,
  // 筛选配置项
  filterConfig: Object,
  // 单选框配置
  radioConfig: Object,
  // 复选框配置项
  checkboxConfig: Object,
  // tooltip 配置项
  tooltipConfig: Object,
  // 导出配置项
  exportConfig: Object,
  // 导入配置项
  importConfig: Object,
  // 打印配置项
  printConfig: Object,
  // 展开行配置项
  expandConfig: Object,
  // 树形结构配置项
  treeConfig: Object,
  // 快捷菜单配置项
  menuConfig: Object,
  // 鼠标配置项
  mouseConfig: Object,
  // 区域配置项
  areaConfig: Object,
  // 按键配置项
  keyboardConfig: Object,
  // 复制粘/贴配置项
  clipConfig: Object,
  // 查找/替换配置项
  fnrConfig: Object,
  // 编辑配置项
  editConfig: Object,
  // 校验配置项
  validConfig: Object,
  // 校验规则配置项
  editRules: Object,
  // 加载中配置项
  loadingConfig: Object,
  // 空内容渲染配置项
  emptyRender: Object,
  // 自定义列配置项
  customConfig: Object,
  // 横向虚拟滚动配置项
  scrollX: Object,
  // 纵向虚拟滚动配置项
  scrollY: Object,
  // （即将废弃）优化相关
  animat: { type: Boolean, default: function() {
    return GlobalConfig.table.animat;
  } },
  // （可能会被废弃的参数，不要使用）
  delayHover: { type: Number, default: function() {
    return GlobalConfig.table.delayHover;
  } },
  // 额外的参数
  params: Object
};
const tableEmits = [
  "update:data",
  "keydown-start",
  "keydown",
  "keydown-end",
  "paste",
  "copy",
  "cut",
  "current-change",
  "radio-change",
  "checkbox-change",
  "checkbox-all",
  "checkbox-range-start",
  "checkbox-range-change",
  "checkbox-range-end",
  "cell-click",
  "cell-dblclick",
  "cell-menu",
  "cell-mouseenter",
  "cell-mouseleave",
  "cell-selected",
  "header-cell-click",
  "header-cell-dblclick",
  "header-cell-menu",
  "footer-cell-click",
  "footer-cell-dblclick",
  "footer-cell-menu",
  "clear-merge",
  "sort-change",
  "clear-sort",
  "filter-change",
  "filter-visible",
  "clear-filter",
  "resizable-change",
  "toggle-row-expand",
  "toggle-tree-expand",
  "menu-click",
  "edit-closed",
  "edit-actived",
  "edit-disabled",
  "valid-error",
  "scroll",
  "custom",
  "change-fnr",
  "open-fnr",
  "fnr-change",
  "fnr-find",
  "fnr-find-all",
  "fnr-replace",
  "fnr-replace-all",
  "cell-area-copy",
  "cell-area-cut",
  "cell-area-paste",
  "cell-area-merge",
  "clear-cell-area-merge",
  "header-cell-area-selection",
  "cell-area-selection-start",
  "cell-area-selection-drag",
  "cell-area-selection-end",
  "cell-area-extension-start",
  "cell-area-extension-drag",
  "cell-area-extension-end",
  "cell-area-arrows-start",
  "cell-area-arrows-end",
  "active-cell-change-start",
  "active-cell-change-end"
];
var __assign$c = globalThis && globalThis.__assign || function() {
  __assign$c = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$c.apply(this, arguments);
};
var __spreadArray$3 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var tableComponentPropKeys = Object.keys(tableProps);
var tableComponentMethodKeys = ["clearAll", "syncData", "updateData", "loadData", "reloadData", "reloadRow", "loadColumn", "reloadColumn", "getRowNode", "getColumnNode", "getRowIndex", "getVTRowIndex", "getVMRowIndex", "getColumnIndex", "getVTColumnIndex", "getVMColumnIndex", "createData", "createRow", "revertData", "clearData", "isInsertByRow", "isUpdateByRow", "getColumns", "getColumnById", "getColumnByField", "getTableColumn", "getData", "getCheckboxRecords", "getParentRow", "getRowSeq", "getRowById", "getRowid", "getTableData", "hideColumn", "showColumn", "resetColumn", "refreshColumn", "refreshScroll", "recalculate", "closeTooltip", "isAllCheckboxChecked", "isAllCheckboxIndeterminate", "getCheckboxIndeterminateRecords", "setCheckboxRow", "isCheckedByCheckboxRow", "isIndeterminateByCheckboxRow", "toggleCheckboxRow", "setAllCheckboxRow", "getRadioReserveRecord", "clearRadioReserve", "getCheckboxReserveRecords", "clearCheckboxReserve", "toggleAllCheckboxRow", "clearCheckboxRow", "setCurrentRow", "isCheckedByRadioRow", "setRadioRow", "clearCurrentRow", "clearRadioRow", "getCurrentRecord", "getRadioRecord", "getCurrentColumn", "setCurrentColumn", "clearCurrentColumn", "sort", "clearSort", "isSort", "getSortColumns", "closeFilter", "isFilter", "isRowExpandLoaded", "clearRowExpandLoaded", "reloadRowExpand", "reloadRowExpand", "toggleRowExpand", "setAllRowExpand", "setRowExpand", "isExpandByRow", "clearRowExpand", "clearRowExpandReserve", "getRowExpandRecords", "getTreeExpandRecords", "isTreeExpandLoaded", "clearTreeExpandLoaded", "reloadTreeExpand", "reloadTreeChilds", "toggleTreeExpand", "setAllTreeExpand", "setTreeExpand", "isTreeExpandByRow", "clearTreeExpand", "clearTreeExpandReserve", "getScroll", "scrollTo", "scrollToRow", "scrollToColumn", "clearScroll", "updateFooter", "updateStatus", "setMergeCells", "removeInsertRow", "removeMergeCells", "getMergeCells", "clearMergeCells", "setMergeFooterItems", "removeMergeFooterItems", "getMergeFooterItems", "clearMergeFooterItems", "openTooltip", "focus", "blur", "connect"];
var gridComponentEmits = __spreadArray$3(__spreadArray$3([], tableEmits, true), [
  "page-change",
  "form-submit",
  "form-submit-invalid",
  "form-reset",
  "form-collapse",
  "form-toggle-collapse",
  "toolbar-button-click",
  "toolbar-tool-click",
  "zoom"
], false);
const VxeGridComponent = defineComponent({
  name: "VxeGrid",
  props: __assign$c(__assign$c({}, tableProps), { columns: Array, pagerConfig: Object, proxyConfig: Object, toolbarConfig: Object, formConfig: Object, zoomConfig: Object, size: { type: String, default: function() {
    return GlobalConfig.grid.size || GlobalConfig.size;
  } } }),
  emits: gridComponentEmits,
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var instance = getCurrentInstance();
    var computeSize = useSize(props);
    var reactData = reactive({
      tableLoading: false,
      proxyInited: false,
      isZMax: false,
      tableData: [],
      pendingRecords: [],
      filterData: [],
      formData: {},
      sortData: [],
      tZindex: 0,
      tablePage: {
        total: 0,
        pageSize: GlobalConfig.pager.pageSize || 10,
        currentPage: 1
      }
    });
    var refElem = ref();
    var refTable = ref();
    var refForm = ref();
    var refToolbar = ref();
    var refPager = ref();
    var refFormWrapper = ref();
    var refToolbarWrapper = ref();
    var refTopWrapper = ref();
    var refBottomWrapper = ref();
    var refPagerWrapper = ref();
    var extendTableMethods = function(methodKeys) {
      var funcs = {};
      methodKeys.forEach(function(name) {
        funcs[name] = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var $xetable = refTable.value;
          return $xetable && $xetable[name].apply($xetable, args);
        };
      });
      return funcs;
    };
    var gridExtendTableMethods = extendTableMethods(tableComponentMethodKeys);
    tableComponentMethodKeys.forEach(function(name) {
      gridExtendTableMethods[name] = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var $xetable = refTable.value;
        return $xetable && $xetable[name].apply($xetable, args);
      };
    });
    var computeProxyOpts = computed(function() {
      return Object.assign({}, GlobalConfig.grid.proxyConfig, props.proxyConfig);
    });
    var computeIsMsg = computed(function() {
      var proxyOpts = computeProxyOpts.value;
      return proxyOpts.message !== false;
    });
    var computePagerOpts = computed(function() {
      return Object.assign({}, GlobalConfig.grid.pagerConfig, props.pagerConfig);
    });
    var computeFormOpts = computed(function() {
      return Object.assign({}, GlobalConfig.grid.formConfig, props.formConfig);
    });
    var computeToolbarOpts = computed(function() {
      return Object.assign({}, GlobalConfig.grid.toolbarConfig, props.toolbarConfig);
    });
    var computeZoomOpts = computed(function() {
      return Object.assign({}, GlobalConfig.grid.zoomConfig, props.zoomConfig);
    });
    var computeStyles = computed(function() {
      return reactData.isZMax ? { zIndex: reactData.tZindex } : null;
    });
    var computeTableExtendProps = computed(function() {
      var rest = {};
      var gridProps = props;
      tableComponentPropKeys.forEach(function(key) {
        rest[key] = gridProps[key];
      });
      return rest;
    });
    var refMaps = {
      refElem,
      refTable,
      refForm,
      refToolbar,
      refPager
    };
    var computeMaps = {
      computeProxyOpts,
      computePagerOpts,
      computeFormOpts,
      computeToolbarOpts,
      computeZoomOpts
    };
    var $xegrid = {
      xID,
      props,
      context,
      instance,
      reactData,
      getRefMaps: function() {
        return refMaps;
      },
      getComputeMaps: function() {
        return computeMaps;
      }
    };
    var gridMethods = {};
    var handleRowClassName = function(params) {
      var pendingRecords = reactData.pendingRecords;
      var rowClassName = props.rowClassName;
      var clss = [];
      if (pendingRecords.some(function(item) {
        return item === params.row;
      })) {
        clss.push("row--pending");
      }
      clss.push(rowClassName ? XEUtils$1.isFunction(rowClassName) ? rowClassName(params) : rowClassName : "");
      return clss;
    };
    var handleBeforeEditMethod = function(params) {
      var editConfig = props.editConfig;
      var pendingRecords = reactData.pendingRecords;
      var $xetable = refTable.value;
      var beforeEditMethod = editConfig ? editConfig.beforeEditMethod || editConfig.activeMethod : null;
      if ($xetable.findRowIndexOf(pendingRecords, params.row) === -1) {
        return !beforeEditMethod || beforeEditMethod(__assign$c(__assign$c({}, params), { $grid: $xegrid }));
      }
      return false;
    };
    var computeTableProps = computed(function() {
      var seqConfig = props.seqConfig, pagerConfig = props.pagerConfig, loading = props.loading, editConfig = props.editConfig, proxyConfig = props.proxyConfig;
      var isZMax = reactData.isZMax, tableLoading = reactData.tableLoading, tablePage = reactData.tablePage, tableData = reactData.tableData;
      var tableExtendProps = computeTableExtendProps.value;
      var proxyOpts = computeProxyOpts.value;
      var tableProps2 = Object.assign({}, tableExtendProps);
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          tableProps2.maxHeight = "auto";
        } else {
          tableProps2.height = "auto";
        }
      }
      if (proxyConfig) {
        tableProps2.loading = loading || tableLoading;
        tableProps2.data = tableData;
        tableProps2.rowClassName = handleRowClassName;
        if (proxyOpts.seq && isEnableConf(pagerConfig)) {
          tableProps2.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize });
        }
      }
      if (editConfig) {
        tableProps2.editConfig = Object.assign({}, editConfig, { beforeEditMethod: handleBeforeEditMethod });
      }
      return tableProps2;
    });
    var initToolbar = function() {
      nextTick(function() {
        var $xetable = refTable.value;
        var $xetoolbar = refToolbar.value;
        if ($xetable && $xetoolbar) {
          $xetable.connect($xetoolbar);
        }
      });
    };
    var initPages = function() {
      var tablePage = reactData.tablePage;
      var pagerConfig = props.pagerConfig;
      var pagerOpts = computePagerOpts.value;
      var currentPage = pagerOpts.currentPage, pageSize = pagerOpts.pageSize;
      if (pagerConfig) {
        if (currentPage) {
          tablePage.currentPage = currentPage;
        }
        if (pageSize) {
          tablePage.pageSize = pageSize;
        }
      }
    };
    var triggerPendingEvent = function(code) {
      var pendingRecords = reactData.pendingRecords;
      var isMsg = computeIsMsg.value;
      var $xetable = refTable.value;
      var selectRecords = $xetable.getCheckboxRecords();
      if (selectRecords.length) {
        var plus_1 = [];
        var minus_1 = [];
        selectRecords.forEach(function(data) {
          if (pendingRecords.some(function(item) {
            return data === item;
          })) {
            minus_1.push(data);
          } else {
            plus_1.push(data);
          }
        });
        if (minus_1.length) {
          reactData.pendingRecords = pendingRecords.filter(function(item) {
            return $xetable.findRowIndexOf(minus_1, item) === -1;
          }).concat(plus_1);
        } else if (plus_1.length) {
          reactData.pendingRecords = pendingRecords.concat(plus_1);
        }
        gridExtendTableMethods.clearCheckboxRow();
      } else {
        if (isMsg) {
          if (process.env.NODE_ENV === "development") {
            if (!VXETable.modal) {
              errLog("vxe.error.reqModule", ["Modal"]);
            }
          }
          VXETable.modal.message({ id: code, content: GlobalConfig.i18n("vxe.grid.selectOneRecord"), status: "warning" });
        }
      }
    };
    var getRespMsg = function(rest, defaultMsg) {
      var proxyOpts = computeProxyOpts.value;
      var _a = proxyOpts.props, proxyProps = _a === void 0 ? {} : _a;
      var msg;
      if (rest && proxyProps.message) {
        msg = XEUtils$1.get(rest, proxyProps.message);
      }
      return msg || GlobalConfig.i18n(defaultMsg);
    };
    var handleDeleteRow = function(code, alertKey, callback) {
      var isMsg = computeIsMsg.value;
      var selectRecords = gridExtendTableMethods.getCheckboxRecords();
      if (isMsg) {
        if (selectRecords.length) {
          return VXETable.modal.confirm({ id: "cfm_".concat(code), content: GlobalConfig.i18n(alertKey), escClosable: true }).then(function(type) {
            if (type === "confirm") {
              callback();
            }
          });
        } else {
          if (process.env.NODE_ENV === "development") {
            if (!VXETable.modal) {
              errLog("vxe.error.reqModule", ["Modal"]);
            }
          }
          VXETable.modal.message({ id: "msg_".concat(code), content: GlobalConfig.i18n("vxe.grid.selectOneRecord"), status: "warning" });
        }
      } else {
        if (selectRecords.length) {
          callback();
        }
      }
      return Promise.resolve();
    };
    var pageChangeEvent = function(params) {
      var proxyConfig = props.proxyConfig;
      var tablePage = reactData.tablePage;
      var currentPage = params.currentPage, pageSize = params.pageSize;
      tablePage.currentPage = currentPage;
      tablePage.pageSize = pageSize;
      gridMethods.dispatchEvent("page-change", params);
      if (proxyConfig) {
        gridMethods.commitProxy("query");
      }
    };
    var sortChangeEvent = function(params) {
      var $xetable = refTable.value;
      var proxyConfig = props.proxyConfig;
      var computeSortOpts = $xetable.getComputeMaps().computeSortOpts;
      var sortOpts = computeSortOpts.value;
      if (sortOpts.remote) {
        reactData.sortData = params.sortList;
        if (proxyConfig) {
          reactData.tablePage.currentPage = 1;
          gridMethods.commitProxy("query");
        }
      }
      gridMethods.dispatchEvent("sort-change", params);
    };
    var filterChangeEvent = function(params) {
      var $xetable = refTable.value;
      var proxyConfig = props.proxyConfig;
      var computeFilterOpts = $xetable.getComputeMaps().computeFilterOpts;
      var filterOpts = computeFilterOpts.value;
      if (filterOpts.remote) {
        reactData.filterData = params.filterList;
        if (proxyConfig) {
          reactData.tablePage.currentPage = 1;
          gridMethods.commitProxy("query");
        }
      }
      gridMethods.dispatchEvent("filter-change", params);
    };
    var submitFormEvent = function(params) {
      var proxyConfig = props.proxyConfig;
      if (proxyConfig) {
        gridMethods.commitProxy("reload");
      }
      gridMethods.dispatchEvent("form-submit", params);
    };
    var resetFormEvent = function(params) {
      var proxyConfig = props.proxyConfig;
      if (proxyConfig) {
        gridMethods.commitProxy("reload");
      }
      gridMethods.dispatchEvent("form-reset", params);
    };
    var submitInvalidEvent = function(params) {
      gridMethods.dispatchEvent("form-submit-invalid", params);
    };
    var collapseEvent = function(params) {
      nextTick(function() {
        return gridExtendTableMethods.recalculate(true);
      });
      gridMethods.dispatchEvent("form-toggle-collapse", params);
      gridMethods.dispatchEvent("form-collapse", params);
    };
    var handleZoom = function(isMax) {
      var isZMax = reactData.isZMax;
      if (isMax ? !isZMax : isZMax) {
        reactData.isZMax = !isZMax;
        if (reactData.tZindex < getLastZIndex()) {
          reactData.tZindex = nextZIndex();
        }
      }
      return nextTick().then(function() {
        return gridExtendTableMethods.recalculate(true);
      }).then(function() {
        return reactData.isZMax;
      });
    };
    var getFuncSlot = function(optSlots, slotKey) {
      var funcSlot = optSlots[slotKey];
      if (funcSlot) {
        if (XEUtils$1.isString(funcSlot)) {
          if (slots[funcSlot]) {
            return slots[funcSlot];
          } else {
            if (process.env.NODE_ENV === "development") {
              errLog("vxe.error.notSlot", [funcSlot]);
            }
          }
        } else {
          return funcSlot;
        }
      }
      return null;
    };
    var renderForms = function() {
      var formConfig = props.formConfig, proxyConfig = props.proxyConfig;
      var formData = reactData.formData;
      var proxyOpts = computeProxyOpts.value;
      var formOpts = computeFormOpts.value;
      var restVNs = [];
      if (isEnableConf(formConfig) || slots.form) {
        var slotVNs = [];
        if (slots.form) {
          slotVNs = slots.form({ $grid: $xegrid });
        } else {
          if (formOpts.items) {
            var formSlots_1 = {};
            if (!formOpts.inited) {
              formOpts.inited = true;
              var beforeItem_1 = proxyOpts.beforeItem;
              if (proxyOpts && beforeItem_1) {
                formOpts.items.forEach(function(item) {
                  beforeItem_1({ $grid: $xegrid, item });
                });
              }
            }
            formOpts.items.forEach(function(item) {
              XEUtils$1.each(item.slots, function(func) {
                if (!XEUtils$1.isFunction(func)) {
                  if (slots[func]) {
                    formSlots_1[func] = slots[func];
                  }
                }
              });
            });
            slotVNs.push(h(resolveComponent("vxe-form"), __assign$c(__assign$c({ ref: refForm }, Object.assign({}, formOpts, {
              data: proxyConfig && proxyOpts.form ? formData : formOpts.data
            })), { onSubmit: submitFormEvent, onReset: resetFormEvent, onSubmitInvalid: submitInvalidEvent, onCollapse: collapseEvent }), formSlots_1));
          }
        }
        restVNs.push(h("div", {
          ref: refFormWrapper,
          class: "vxe-grid--form-wrapper"
        }, slotVNs));
      }
      return restVNs;
    };
    var renderToolbars = function() {
      var toolbarConfig = props.toolbarConfig;
      var toolbarOpts = computeToolbarOpts.value;
      var restVNs = [];
      if (isEnableConf(toolbarConfig) || slots.toolbar) {
        var slotVNs = [];
        if (slots.toolbar) {
          slotVNs = slots.toolbar({ $grid: $xegrid });
        } else {
          var toolbarOptSlots = toolbarOpts.slots;
          var buttonsSlot = void 0;
          var toolsSlot = void 0;
          var toolbarSlots = {};
          if (toolbarOptSlots) {
            buttonsSlot = getFuncSlot(toolbarOptSlots, "buttons");
            toolsSlot = getFuncSlot(toolbarOptSlots, "tools");
            if (buttonsSlot) {
              toolbarSlots.buttons = buttonsSlot;
            }
            if (toolsSlot) {
              toolbarSlots.tools = toolsSlot;
            }
          }
          slotVNs.push(h(resolveComponent("vxe-toolbar"), __assign$c({ ref: refToolbar }, toolbarOpts), toolbarSlots));
        }
        restVNs.push(h("div", {
          ref: refToolbarWrapper,
          class: "vxe-grid--toolbar-wrapper"
        }, slotVNs));
      }
      return restVNs;
    };
    var renderTops = function() {
      if (slots.top) {
        return [
          h("div", {
            ref: refTopWrapper,
            class: "vxe-grid--top-wrapper"
          }, slots.top({ $grid: $xegrid }))
        ];
      }
      return [];
    };
    var tableCompEvents = {};
    tableEmits.forEach(function(name) {
      var type = XEUtils$1.camelCase("on-".concat(name));
      tableCompEvents[type] = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return emit.apply(void 0, __spreadArray$3([name], args, false));
      };
    });
    var renderTables = function() {
      var proxyConfig = props.proxyConfig;
      var tableProps2 = computeTableProps.value;
      var proxyOpts = computeProxyOpts.value;
      var tableOns = Object.assign({}, tableCompEvents);
      var emptySlot = slots.empty;
      if (proxyConfig) {
        if (proxyOpts.sort) {
          tableOns.onSortChange = sortChangeEvent;
        }
        if (proxyOpts.filter) {
          tableOns.onFilterChange = filterChangeEvent;
        }
      }
      return [
        h(resolveComponent("vxe-table"), __assign$c(__assign$c({ ref: refTable }, tableProps2), tableOns), emptySlot ? {
          empty: function() {
            return emptySlot({});
          }
        } : {})
      ];
    };
    var renderBottoms = function() {
      if (slots.bottom) {
        return [
          h("div", {
            ref: refBottomWrapper,
            class: "vxe-grid--bottom-wrapper"
          }, slots.bottom({ $grid: $xegrid }))
        ];
      }
      return [];
    };
    var renderPagers = function() {
      var pagerConfig = props.pagerConfig;
      var pagerOpts = computePagerOpts.value;
      var restVNs = [];
      if (isEnableConf(pagerConfig) || slots.pager) {
        var slotVNs = [];
        if (slots.pager) {
          slotVNs = slots.pager({ $grid: $xegrid });
        } else {
          var pagerOptSlots = pagerOpts.slots;
          var pagerSlots = {};
          var leftSlot = void 0;
          var rightSlot = void 0;
          if (pagerOptSlots) {
            leftSlot = getFuncSlot(pagerOptSlots, "left");
            rightSlot = getFuncSlot(pagerOptSlots, "right");
            if (leftSlot) {
              pagerSlots.left = leftSlot;
            }
            if (rightSlot) {
              pagerSlots.right = rightSlot;
            }
          }
          slotVNs.push(h(resolveComponent("vxe-pager"), __assign$c(__assign$c(__assign$c({ ref: refPager }, pagerOpts), props.proxyConfig ? reactData.tablePage : {}), { onPageChange: pageChangeEvent }), pagerSlots));
        }
        restVNs.push(h("div", {
          ref: refPagerWrapper,
          class: "vxe-grid--pager-wrapper"
        }, slotVNs));
      }
      return restVNs;
    };
    var initProxy = function() {
      var proxyConfig = props.proxyConfig, formConfig = props.formConfig;
      var proxyInited = reactData.proxyInited;
      var proxyOpts = computeProxyOpts.value;
      var formOpts = computeFormOpts.value;
      if (proxyConfig) {
        if (isEnableConf(formConfig) && proxyOpts.form && formOpts.items) {
          var formData_1 = {};
          formOpts.items.forEach(function(item) {
            var field = item.field, itemRender = item.itemRender;
            if (field) {
              var itemValue = null;
              if (itemRender) {
                var defaultValue = itemRender.defaultValue;
                if (XEUtils$1.isFunction(defaultValue)) {
                  itemValue = defaultValue({ item });
                } else if (!XEUtils$1.isUndefined(defaultValue)) {
                  itemValue = defaultValue;
                }
              }
              formData_1[field] = itemValue;
            }
          });
          reactData.formData = formData_1;
        }
        if (!proxyInited) {
          reactData.proxyInited = true;
          if (proxyOpts.autoLoad !== false) {
            nextTick(function() {
              return gridMethods.commitProxy("_init");
            });
          }
        }
      }
    };
    gridMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $grid: $xegrid, $event: evnt }, params));
      },
      /**
       * 提交指令，支持 code 或 button
       * @param {String/Object} code 字符串或对象
       */
      commitProxy: function(proxyTarget) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        var toolbarConfig = props.toolbarConfig, pagerConfig = props.pagerConfig, editRules = props.editRules;
        var tablePage = reactData.tablePage, formData = reactData.formData;
        var isMsg = computeIsMsg.value;
        var proxyOpts = computeProxyOpts.value;
        var toolbarOpts = computeToolbarOpts.value;
        var beforeQuery = proxyOpts.beforeQuery, afterQuery = proxyOpts.afterQuery, beforeDelete = proxyOpts.beforeDelete, afterDelete = proxyOpts.afterDelete, beforeSave = proxyOpts.beforeSave, afterSave = proxyOpts.afterSave, _a = proxyOpts.ajax, ajax = _a === void 0 ? {} : _a, _b = proxyOpts.props, proxyProps = _b === void 0 ? {} : _b;
        var $xetable = refTable.value;
        var button = null;
        var code = null;
        if (XEUtils$1.isString(proxyTarget)) {
          var buttons = toolbarOpts.buttons;
          var matchObj = toolbarConfig && buttons ? XEUtils$1.findTree(buttons, function(item) {
            return item.code === proxyTarget;
          }, { children: "dropdowns" }) : null;
          button = matchObj ? matchObj.item : null;
          code = proxyTarget;
        } else {
          button = proxyTarget;
          code = button.code;
        }
        var btnParams = button ? button.params : null;
        switch (code) {
          case "insert":
            $xetable.insert({});
            break;
          case "insert_actived":
            $xetable.insert({}).then(function(_a2) {
              var row = _a2.row;
              return $xetable.setActiveRow(row);
            });
            break;
          case "mark_cancel":
            triggerPendingEvent(code);
            break;
          case "remove":
            return handleDeleteRow(code, "vxe.grid.removeSelectRecord", function() {
              return $xetable.removeCheckboxRow();
            });
          case "import":
            $xetable.importData(btnParams);
            break;
          case "open_import":
            $xetable.openImport(btnParams);
            break;
          case "export":
            $xetable.exportData(btnParams);
            break;
          case "open_export":
            $xetable.openExport(btnParams);
            break;
          case "reset_custom":
            $xetable.resetColumn(true);
            break;
          case "_init":
          case "reload":
          case "query": {
            var ajaxMethods = ajax.query;
            if (ajaxMethods) {
              var isInited = code === "_init";
              var isReload = code === "reload";
              var sortList = [];
              var filterList = [];
              var pageParams = {};
              if (pagerConfig) {
                if (isInited || isReload) {
                  tablePage.currentPage = 1;
                }
                if (isEnableConf(pagerConfig)) {
                  pageParams = __assign$c({}, tablePage);
                }
              }
              if (isInited) {
                var computeSortOpts = $xetable.getComputeMaps().computeSortOpts;
                var sortOpts = computeSortOpts.value;
                var defaultSort = sortOpts.defaultSort;
                if (defaultSort) {
                  if (!XEUtils$1.isArray(defaultSort)) {
                    defaultSort = [defaultSort];
                  }
                  sortList = defaultSort.map(function(item) {
                    return {
                      field: item.field,
                      property: item.field,
                      order: item.order
                    };
                  });
                }
                filterList = $xetable.getCheckedFilters();
              } else {
                if (isReload) {
                  reactData.pendingRecords = [];
                  $xetable.clearAll();
                } else {
                  sortList = $xetable.getSortColumns();
                  filterList = $xetable.getCheckedFilters();
                }
              }
              var params = {
                code,
                button,
                $grid: $xegrid,
                page: pageParams,
                sort: sortList.length ? sortList[0] : {},
                sorts: sortList,
                filters: filterList,
                form: formData,
                options: ajaxMethods
              };
              reactData.sortData = sortList;
              reactData.filterData = filterList;
              reactData.tableLoading = true;
              var applyArgs_1 = [params].concat(args);
              return Promise.resolve((beforeQuery || ajaxMethods).apply(void 0, applyArgs_1)).catch(function(e) {
                return e;
              }).then(function(rest) {
                reactData.tableLoading = false;
                if (rest) {
                  if (isEnableConf(pagerConfig)) {
                    var total = XEUtils$1.get(rest, proxyProps.total || "page.total") || 0;
                    tablePage.total = XEUtils$1.toNumber(total);
                    reactData.tableData = XEUtils$1.get(rest, proxyProps.result || "result") || [];
                    var pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1);
                    if (tablePage.currentPage > pageCount) {
                      tablePage.currentPage = pageCount;
                    }
                  } else {
                    reactData.tableData = (proxyProps.list ? XEUtils$1.get(rest, proxyProps.list) : rest) || [];
                  }
                } else {
                  reactData.tableData = [];
                }
                if (afterQuery) {
                  afterQuery.apply(void 0, applyArgs_1);
                }
              });
            } else {
              if (process.env.NODE_ENV === "development") {
                errLog("vxe.error.notFunc", ["proxy-config.ajax.query"]);
              }
            }
            break;
          }
          case "delete": {
            var ajaxMethods_1 = ajax.delete;
            if (ajaxMethods_1) {
              var selectRecords_1 = gridExtendTableMethods.getCheckboxRecords();
              var removeRecords_1 = selectRecords_1.filter(function(row) {
                return !$xetable.isInsertByRow(row);
              });
              var body = { removeRecords: removeRecords_1 };
              var applyArgs_2 = [{ $grid: $xegrid, code, button, body, options: ajaxMethods_1 }].concat(args);
              if (selectRecords_1.length) {
                return handleDeleteRow(code, "vxe.grid.deleteSelectRecord", function() {
                  if (!removeRecords_1.length) {
                    return $xetable.remove(selectRecords_1);
                  }
                  reactData.tableLoading = true;
                  return Promise.resolve((beforeDelete || ajaxMethods_1).apply(void 0, applyArgs_2)).then(function(rest) {
                    reactData.tableLoading = false;
                    reactData.pendingRecords = reactData.pendingRecords.filter(function(row) {
                      return $xetable.findRowIndexOf(removeRecords_1, row) === -1;
                    });
                    if (isMsg) {
                      if (process.env.NODE_ENV === "development") {
                        if (!VXETable.modal) {
                          errLog("vxe.error.reqModule", ["Modal"]);
                        }
                      }
                      VXETable.modal.message({ content: getRespMsg(rest, "vxe.grid.delSuccess"), status: "success" });
                    }
                    if (afterDelete) {
                      afterDelete.apply(void 0, applyArgs_2);
                    } else {
                      gridMethods.commitProxy("query");
                    }
                  }).catch(function(rest) {
                    reactData.tableLoading = false;
                    if (isMsg) {
                      if (process.env.NODE_ENV === "development") {
                        if (!VXETable.modal.message) {
                          errLog("vxe.error.reqModule", ["Modal"]);
                        }
                      }
                      VXETable.modal.message({ id: code, content: getRespMsg(rest, "vxe.grid.operError"), status: "error" });
                    }
                  });
                });
              } else {
                if (isMsg) {
                  if (process.env.NODE_ENV === "development") {
                    if (!VXETable.modal) {
                      errLog("vxe.error.reqModule", ["Modal"]);
                    }
                  }
                  VXETable.modal.message({ id: code, content: GlobalConfig.i18n("vxe.grid.selectOneRecord"), status: "warning" });
                }
              }
            } else {
              if (process.env.NODE_ENV === "development") {
                errLog("vxe.error.notFunc", ["proxy-config.ajax.delete"]);
              }
            }
            break;
          }
          case "save": {
            var ajaxMethods_2 = ajax.save;
            if (ajaxMethods_2) {
              var body_1 = Object.assign({ pendingRecords: reactData.pendingRecords }, $xetable.getRecordset());
              var insertRecords_1 = body_1.insertRecords, removeRecords_2 = body_1.removeRecords, updateRecords_1 = body_1.updateRecords, pendingRecords_1 = body_1.pendingRecords;
              var applyArgs_3 = [{ $grid: $xegrid, code, button, body: body_1, options: ajaxMethods_2 }].concat(args);
              if (insertRecords_1.length) {
                body_1.pendingRecords = pendingRecords_1.filter(function(row) {
                  return $xetable.findRowIndexOf(insertRecords_1, row) === -1;
                });
              }
              if (pendingRecords_1.length) {
                body_1.insertRecords = insertRecords_1.filter(function(row) {
                  return $xetable.findRowIndexOf(pendingRecords_1, row) === -1;
                });
              }
              var restPromise = Promise.resolve();
              if (editRules) {
                restPromise = $xetable.validate(body_1.insertRecords.concat(updateRecords_1));
              }
              return restPromise.then(function(errMap) {
                if (errMap) {
                  return;
                }
                if (body_1.insertRecords.length || removeRecords_2.length || updateRecords_1.length || body_1.pendingRecords.length) {
                  reactData.tableLoading = true;
                  return Promise.resolve((beforeSave || ajaxMethods_2).apply(void 0, applyArgs_3)).then(function(rest) {
                    reactData.tableLoading = false;
                    reactData.pendingRecords = [];
                    if (isMsg) {
                      if (process.env.NODE_ENV === "development") {
                        if (!VXETable.modal) {
                          errLog("vxe.error.reqModule", ["Modal"]);
                        }
                      }
                      VXETable.modal.message({ content: getRespMsg(rest, "vxe.grid.saveSuccess"), status: "success" });
                    }
                    if (afterSave) {
                      afterSave.apply(void 0, applyArgs_3);
                    } else {
                      gridMethods.commitProxy("query");
                    }
                  }).catch(function(rest) {
                    reactData.tableLoading = false;
                    if (isMsg) {
                      if (process.env.NODE_ENV === "development") {
                        if (!VXETable.modal) {
                          errLog("vxe.error.reqModule", ["Modal"]);
                        }
                      }
                      VXETable.modal.message({ id: code, content: getRespMsg(rest, "vxe.grid.operError"), status: "error" });
                    }
                  });
                } else {
                  if (isMsg) {
                    if (process.env.NODE_ENV === "development") {
                      if (!VXETable.modal) {
                        errLog("vxe.error.reqModule", ["Modal"]);
                      }
                    }
                    VXETable.modal.message({ id: code, content: GlobalConfig.i18n("vxe.grid.dataUnchanged"), status: "info" });
                  }
                }
              });
            } else {
              if (process.env.NODE_ENV === "development") {
                errLog("vxe.error.notFunc", ["proxy-config.ajax.save"]);
              }
            }
            break;
          }
          default: {
            var btnMethod = VXETable.commands.get(code);
            if (btnMethod) {
              btnMethod.apply(void 0, __spreadArray$3([{ code, button, $grid: $xegrid, $table: $xetable }], args, false));
            }
          }
        }
        return nextTick();
      },
      zoom: function() {
        if (reactData.isZMax) {
          return gridMethods.revert();
        }
        return gridMethods.maximize();
      },
      isMaximized: function() {
        return reactData.isZMax;
      },
      maximize: function() {
        return handleZoom(true);
      },
      revert: function() {
        return handleZoom();
      },
      getFormItems: function(itemIndex) {
        var formOpts = computeFormOpts.value;
        var formConfig = props.formConfig;
        var items = formOpts.items;
        var itemList = [];
        XEUtils$1.eachTree(isEnableConf(formConfig) && items ? items : [], function(item) {
          itemList.push(item);
        }, { children: "children" });
        return XEUtils$1.isUndefined(itemIndex) ? itemList : itemList[itemIndex];
      },
      getPendingRecords: function() {
        return reactData.pendingRecords;
      },
      getProxyInfo: function() {
        if (props.proxyConfig) {
          var sortData = reactData.sortData;
          return {
            data: reactData.tableData,
            filter: reactData.filterData,
            form: reactData.formData,
            sort: sortData.length ? sortData[0] : {},
            sorts: sortData,
            pager: reactData.tablePage,
            pendingRecords: reactData.pendingRecords
          };
        }
        return null;
      }
    };
    if (process.env.NODE_ENV === "development") {
      gridMethods.loadColumn = function(columns) {
        var $xetable = refTable.value;
        XEUtils$1.eachTree(columns, function(column) {
          if (column.slots) {
            XEUtils$1.each(column.slots, function(func) {
              if (!XEUtils$1.isFunction(func)) {
                if (!slots[func]) {
                  errLog("vxe.error.notSlot", [func]);
                }
              }
            });
          }
        });
        return $xetable.loadColumn(columns);
      };
      gridMethods.reloadColumn = function(columns) {
        gridExtendTableMethods.clearAll();
        return gridMethods.loadColumn(columns);
      };
    }
    var gridPrivateMethods = {
      extendTableMethods,
      callSlot: function(slotFunc, params) {
        if (slotFunc) {
          if (XEUtils$1.isString(slotFunc)) {
            slotFunc = slots[slotFunc] || null;
          }
          if (XEUtils$1.isFunction(slotFunc)) {
            return getSlotVNs(slotFunc(params));
          }
        }
        return [];
      },
      /**
       * 获取需要排除的高度
       */
      getExcludeHeight: function() {
        var height = props.height;
        var isZMax = reactData.isZMax;
        var el = refElem.value;
        var formWrapper = refFormWrapper.value;
        var toolbarWrapper = refToolbarWrapper.value;
        var topWrapper = refTopWrapper.value;
        var bottomWrapper = refBottomWrapper.value;
        var pagerWrapper = refPagerWrapper.value;
        var parentPaddingSize = isZMax || height !== "auto" ? 0 : getPaddingTopBottomSize(el.parentNode);
        return parentPaddingSize + getPaddingTopBottomSize(el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper);
      },
      getParentHeight: function() {
        var el = refElem.value;
        if (el) {
          return (reactData.isZMax ? getDomNode().visibleHeight : XEUtils$1.toNumber(getComputedStyle(el.parentNode).height)) - gridPrivateMethods.getExcludeHeight();
        }
        return 0;
      },
      triggerToolbarBtnEvent: function(button, evnt) {
        gridMethods.commitProxy(button, evnt);
        gridMethods.dispatchEvent("toolbar-button-click", { code: button.code, button }, evnt);
      },
      triggerToolbarTolEvent: function(tool, evnt) {
        gridMethods.commitProxy(tool, evnt);
        gridMethods.dispatchEvent("toolbar-tool-click", { code: tool.code, tool, $event: evnt });
      },
      triggerZoomEvent: function(evnt) {
        gridMethods.zoom();
        gridMethods.dispatchEvent("zoom", { type: reactData.isZMax ? "max" : "revert" }, evnt);
      }
    };
    Object.assign($xegrid, gridExtendTableMethods, gridMethods, gridPrivateMethods);
    watch(function() {
      return props.columns;
    }, function(value) {
      nextTick(function() {
        return $xegrid.loadColumn(value || []);
      });
    });
    watch(function() {
      return props.toolbarConfig;
    }, function(value) {
      if (value) {
        initToolbar();
      }
    });
    watch(function() {
      return props.pagerConfig;
    }, function() {
      initPages();
    });
    watch(function() {
      return props.proxyConfig;
    }, function() {
      initProxy();
    });
    var handleGlobalKeydownEvent = function(evnt) {
      var zoomOpts = computeZoomOpts.value;
      var isEsc = hasEventKey(evnt, EVENT_KEYS.ESCAPE);
      if (isEsc && reactData.isZMax && zoomOpts.escRestore !== false) {
        gridPrivateMethods.triggerZoomEvent(evnt);
      }
    };
    VXETable.hooks.forEach(function(options) {
      var setupGrid = options.setupGrid;
      if (setupGrid) {
        var hookRest = setupGrid($xegrid);
        if (hookRest && XEUtils$1.isObject(hookRest)) {
          Object.assign($xegrid, hookRest);
        }
      }
    });
    initPages();
    onMounted(function() {
      nextTick(function() {
        var data = props.data, columns = props.columns, proxyConfig = props.proxyConfig;
        var proxyOpts = computeProxyOpts.value;
        var formOpts = computeFormOpts.value;
        if (proxyConfig && (data || proxyOpts.form && formOpts.data)) {
          errLog("vxe.error.errConflicts", ["grid.data", "grid.proxy-config"]);
        }
        if (columns && columns.length) {
          $xegrid.loadColumn(columns);
        }
        initToolbar();
      });
      GlobalEvent.on($xegrid, "keydown", handleGlobalKeydownEvent);
    });
    onUnmounted(function() {
      GlobalEvent.off($xegrid, "keydown");
    });
    nextTick(function() {
      initProxy();
    });
    var renderVN = function() {
      var _a;
      var vSize = computeSize.value;
      var styles = computeStyles.value;
      return h("div", {
        ref: refElem,
        class: ["vxe-grid", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--animat"] = !!props.animat, _a["is--round"] = props.round, _a["is--maximize"] = reactData.isZMax, _a["is--loading"] = props.loading || reactData.tableLoading, _a)],
        style: styles
      }, renderForms().concat(renderToolbars(), renderTops(), renderTables(), renderBottoms(), renderPagers()));
    };
    $xegrid.renderVN = renderVN;
    provide("$xegrid", $xegrid);
    return $xegrid;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeGridComponent, {
  install: function(app) {
    app.component(VxeGridComponent.name, VxeGridComponent);
  }
});
dynamicApp.component(VxeGridComponent.name, VxeGridComponent);
var __assign$b = globalThis && globalThis.__assign || function() {
  __assign$b = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$b.apply(this, arguments);
};
const VxeToolbarComponent = defineComponent({
  name: "VxeToolbar",
  props: {
    loading: Boolean,
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    print: [Boolean, Object],
    zoom: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: { type: Array, default: function() {
      return GlobalConfig.toolbar.buttons;
    } },
    tools: { type: Array, default: function() {
      return GlobalConfig.toolbar.tools;
    } },
    perfect: { type: Boolean, default: function() {
      return GlobalConfig.toolbar.perfect;
    } },
    size: { type: String, default: function() {
      return GlobalConfig.toolbar.size || GlobalConfig.size;
    } },
    className: [String, Function]
  },
  emits: [
    "button-click",
    "tool-click"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      isRefresh: false,
      columns: []
    });
    var refElem = ref();
    var refCustomWrapper = ref();
    var customStore = reactive({
      isAll: false,
      isIndeterminate: false,
      activeBtn: false,
      activeWrapper: false,
      visible: false
    });
    var refMaps = {
      refElem
    };
    var $xetoolbar = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var toolbarMethods = {};
    var $xegrid = inject("$xegrid", null);
    var $xetable;
    var computeRefreshOpts = computed(function() {
      return Object.assign({}, GlobalConfig.toolbar.refresh, props.refresh);
    });
    var computeImportOpts = computed(function() {
      return Object.assign({}, GlobalConfig.toolbar.import, props.import);
    });
    var computeExportOpts = computed(function() {
      return Object.assign({}, GlobalConfig.toolbar.export, props.export);
    });
    var computePrintOpts = computed(function() {
      return Object.assign({}, GlobalConfig.toolbar.print, props.print);
    });
    var computeZoomOpts = computed(function() {
      return Object.assign({}, GlobalConfig.toolbar.zoom, props.zoom);
    });
    var computeCustomOpts = computed(function() {
      return Object.assign({}, GlobalConfig.toolbar.custom, props.custom);
    });
    var checkTable = function() {
      if ($xetable) {
        return true;
      }
      errLog("vxe.error.barUnableLink");
    };
    var checkCustomStatus = function() {
      var columns = reactData.columns;
      var computeTableCustomOpts = $xetable.getComputeMaps().computeCustomOpts;
      var tableCustomOpts = computeTableCustomOpts.value;
      var checkMethod = tableCustomOpts.checkMethod;
      customStore.isAll = columns.every(function(column) {
        return (checkMethod ? !checkMethod({ column }) : false) || column.visible;
      });
      customStore.isIndeterminate = !customStore.isAll && columns.some(function(column) {
        return (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible);
      });
    };
    var showCustom = function() {
      customStore.visible = true;
      checkCustomStatus();
    };
    var handleTableCustom = function() {
      $xetable.handleCustom();
    };
    var closeCustom = function() {
      var custom = props.custom;
      var customOpts = computeCustomOpts.value;
      if (customStore.visible) {
        customStore.visible = false;
        if (custom && !customOpts.immediate) {
          handleTableCustom();
        }
      }
    };
    var emitCustomEvent = function(type, evnt) {
      var comp = $xegrid || $xetable;
      comp.dispatchEvent("custom", { type }, evnt);
    };
    var confirmCustomEvent = function(evnt) {
      closeCustom();
      emitCustomEvent("confirm", evnt);
    };
    var customOpenEvent = function(evnt) {
      if (checkTable()) {
        if (!customStore.visible) {
          showCustom();
          emitCustomEvent("open", evnt);
        }
      }
    };
    var customColseEvent = function(evnt) {
      if (customStore.visible) {
        closeCustom();
        emitCustomEvent("close", evnt);
      }
    };
    var resetCustomEvent = function(evnt) {
      var columns = reactData.columns;
      var computeTableCustomOpts = $xetable.getComputeMaps().computeCustomOpts;
      var tableCustomOpts = computeTableCustomOpts.value;
      var checkMethod = tableCustomOpts.checkMethod;
      XEUtils$1.eachTree(columns, function(column) {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = column.defaultVisible;
          column.halfVisible = false;
        }
        column.resizeWidth = 0;
      });
      $xetable.saveCustomResizable(true);
      closeCustom();
      emitCustomEvent("reset", evnt);
    };
    var handleOptionCheck = function(column) {
      var columns = reactData.columns;
      var matchObj = XEUtils$1.findTree(columns, function(item) {
        return item === column;
      });
      if (matchObj && matchObj.parent) {
        var parent_1 = matchObj.parent;
        if (parent_1.children && parent_1.children.length) {
          parent_1.visible = parent_1.children.every(function(column2) {
            return column2.visible;
          });
          parent_1.halfVisible = !parent_1.visible && parent_1.children.some(function(column2) {
            return column2.visible || column2.halfVisible;
          });
          handleOptionCheck(parent_1);
        }
      }
    };
    var changeCustomOption = function(column) {
      var isChecked = !column.visible;
      var customOpts = computeCustomOpts.value;
      XEUtils$1.eachTree([column], function(item) {
        item.visible = isChecked;
        item.halfVisible = false;
      });
      handleOptionCheck(column);
      if (props.custom && customOpts.immediate) {
        handleTableCustom();
      }
      checkCustomStatus();
    };
    var allCustomEvent = function() {
      var columns = reactData.columns;
      var computeTableCustomOpts = $xetable.getComputeMaps().computeCustomOpts;
      var tableCustomOpts = computeTableCustomOpts.value;
      var checkMethod = tableCustomOpts.checkMethod;
      var isAll = !customStore.isAll;
      XEUtils$1.eachTree(columns, function(column) {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll;
          column.halfVisible = false;
        }
      });
      customStore.isAll = isAll;
      checkCustomStatus();
    };
    var handleGlobalMousedownEvent = function(evnt) {
      var customWrapperElem = refCustomWrapper.value;
      if (!getEventTargetNode(evnt, customWrapperElem).flag) {
        customColseEvent(evnt);
      }
    };
    var handleGlobalBlurEvent = function(evnt) {
      customColseEvent(evnt);
    };
    var handleClickSettingEvent = function(evnt) {
      if (customStore.visible) {
        customColseEvent(evnt);
      } else {
        customOpenEvent(evnt);
      }
    };
    var handleMouseenterSettingEvent = function(evnt) {
      customStore.activeBtn = true;
      customOpenEvent(evnt);
    };
    var handleMouseleaveSettingEvent = function(evnt) {
      customStore.activeBtn = false;
      setTimeout(function() {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          customColseEvent(evnt);
        }
      }, 300);
    };
    var handleWrapperMouseenterEvent = function(evnt) {
      customStore.activeWrapper = true;
      customOpenEvent(evnt);
    };
    var handleWrapperMouseleaveEvent = function(evnt) {
      customStore.activeWrapper = false;
      setTimeout(function() {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          customColseEvent(evnt);
        }
      }, 300);
    };
    var refreshEvent = function() {
      var isRefresh = reactData.isRefresh;
      var refreshOpts = computeRefreshOpts.value;
      if (!isRefresh) {
        var queryMethod = refreshOpts.queryMethod || refreshOpts.query;
        if (queryMethod) {
          reactData.isRefresh = true;
          try {
            Promise.resolve(queryMethod({})).catch(function(e) {
              return e;
            }).then(function() {
              reactData.isRefresh = false;
            });
          } catch (e) {
            reactData.isRefresh = false;
          }
        } else if ($xegrid) {
          reactData.isRefresh = true;
          $xegrid.commitProxy(refreshOpts.code || "reload").catch(function(e) {
            return e;
          }).then(function() {
            reactData.isRefresh = false;
          });
        }
      }
    };
    var zoomEvent = function(evnt) {
      if ($xegrid) {
        $xegrid.triggerZoomEvent(evnt);
      }
    };
    var btnEvent = function(evnt, item) {
      var code = item.code;
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarBtnEvent(item, evnt);
        } else {
          var commandMethod = VXETable.commands.get(code);
          var params = { code, button: item, $table: $xetable, $event: evnt };
          if (commandMethod) {
            commandMethod(params, evnt);
          }
          $xetoolbar.dispatchEvent("button-click", params, evnt);
        }
      }
    };
    var tolEvent = function(evnt, item) {
      var code = item.code;
      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarTolEvent(item, evnt);
        } else {
          var commandMethod = VXETable.commands.get(code);
          var params = { code, tool: item, $table: $xetable, $event: evnt };
          if (commandMethod) {
            commandMethod(params, evnt);
          }
          $xetoolbar.dispatchEvent("tool-click", params, evnt);
        }
      }
    };
    var importEvent = function() {
      if (checkTable()) {
        $xetable.openImport();
      }
    };
    var exportEvent = function() {
      if (checkTable()) {
        $xetable.openExport();
      }
    };
    var printEvent = function() {
      if (checkTable()) {
        $xetable.openPrint();
      }
    };
    var renderDropdowns = function(item, isBtn) {
      var dropdowns = item.dropdowns;
      var downVNs = [];
      if (dropdowns) {
        return dropdowns.map(function(child, index) {
          if (child.visible === false) {
            return createCommentVNode();
          }
          return h(resolveComponent("vxe-button"), {
            key: index,
            disabled: child.disabled,
            loading: child.loading,
            type: child.type,
            icon: child.icon,
            circle: child.circle,
            round: child.round,
            status: child.status,
            content: child.name,
            onClick: function(evnt) {
              return isBtn ? btnEvent(evnt, child) : tolEvent(evnt, child);
            }
          });
        });
      }
      return downVNs;
    };
    var renderBtns = function() {
      var buttons = props.buttons;
      var buttonsSlot = slots.buttons;
      if (buttonsSlot) {
        return getSlotVNs(buttonsSlot({ $grid: $xegrid, $table: $xetable }));
      }
      var btnVNs = [];
      if (buttons) {
        buttons.forEach(function(item) {
          var dropdowns = item.dropdowns, buttonRender = item.buttonRender;
          if (item.visible !== false) {
            var compConf = buttonRender ? VXETable.renderer.get(buttonRender.name) : null;
            if (buttonRender && compConf && compConf.renderToolbarButton) {
              btnVNs.push(h("span", {
                class: "vxe-button--item"
              }, getSlotVNs(compConf.renderToolbarButton(buttonRender, { $grid: $xegrid, $table: $xetable, button: item }))));
            } else {
              btnVNs.push(h(resolveComponent("vxe-button"), {
                disabled: item.disabled,
                loading: item.loading,
                type: item.type,
                icon: item.icon,
                circle: item.circle,
                round: item.round,
                status: item.status,
                content: item.name,
                destroyOnClose: item.destroyOnClose,
                placement: item.placement,
                transfer: item.transfer,
                onClick: function(evnt) {
                  return btnEvent(evnt, item);
                }
              }, dropdowns && dropdowns.length ? {
                dropdowns: function() {
                  return renderDropdowns(item, true);
                }
              } : {}));
            }
          }
        });
      }
      return btnVNs;
    };
    var renderRightTools = function() {
      var tools = props.tools;
      var toolsSlot = slots.tools;
      if (toolsSlot) {
        return getSlotVNs(toolsSlot({ $grid: $xegrid, $table: $xetable }));
      }
      var btnVNs = [];
      if (tools) {
        tools.forEach(function(item) {
          var dropdowns = item.dropdowns, toolRender = item.toolRender;
          if (item.visible !== false) {
            var compConf = toolRender ? VXETable.renderer.get(toolRender.name) : null;
            if (toolRender && compConf && compConf.renderToolbarTool) {
              btnVNs.push(h("span", {
                class: "vxe-tool--item"
              }, getSlotVNs(compConf.renderToolbarTool(toolRender, { $grid: $xegrid, $table: $xetable, tool: item }))));
            } else {
              btnVNs.push(h(resolveComponent("vxe-button"), {
                disabled: item.disabled,
                loading: item.loading,
                type: item.type,
                icon: item.icon,
                circle: item.circle,
                round: item.round,
                status: item.status,
                content: item.name,
                destroyOnClose: item.destroyOnClose,
                placement: item.placement,
                transfer: item.transfer,
                onClick: function(evnt) {
                  return tolEvent(evnt, item);
                }
              }, dropdowns && dropdowns.length ? {
                dropdowns: function() {
                  return renderDropdowns(item, false);
                }
              } : {}));
            }
          }
        });
      }
      return btnVNs;
    };
    var renderCustoms = function() {
      var columns = reactData.columns;
      var customOpts = computeCustomOpts.value;
      var colVNs = [];
      var customBtnOns = {};
      var customWrapperOns = {};
      var checkMethod;
      if ($xetable) {
        var computeTableCustomOpts = $xetable.getComputeMaps().computeCustomOpts;
        var tableCustomOpts = computeTableCustomOpts.value;
        checkMethod = tableCustomOpts.checkMethod;
      }
      if (customOpts.trigger === "manual")
        ;
      else if (customOpts.trigger === "hover") {
        customBtnOns.onMouseenter = handleMouseenterSettingEvent;
        customBtnOns.onMouseleave = handleMouseleaveSettingEvent;
        customWrapperOns.onMouseenter = handleWrapperMouseenterEvent;
        customWrapperOns.onMouseleave = handleWrapperMouseleaveEvent;
      } else {
        customBtnOns.onClick = handleClickSettingEvent;
      }
      XEUtils$1.eachTree(columns, function(column) {
        var colTitle = formatText(column.getTitle(), 1);
        var colKey = column.getKey();
        var isColGroup = column.children && column.children.length;
        var isDisabled = checkMethod ? !checkMethod({ column }) : false;
        if (isColGroup || colKey) {
          var isChecked = column.visible;
          var isIndeterminate = column.halfVisible;
          colVNs.push(h("li", {
            class: ["vxe-custom--option", "level--".concat(column.level), {
              "is--group": isColGroup,
              "is--checked": isChecked,
              "is--indeterminate": isIndeterminate,
              "is--disabled": isDisabled
            }],
            title: colTitle,
            onClick: function() {
              if (!isDisabled) {
                changeCustomOption(column);
              }
            }
          }, [
            h("span", {
              class: ["vxe-checkbox--icon", isIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
            }),
            h("span", {
              class: "vxe-checkbox--label"
            }, colTitle)
          ]));
        }
      });
      var isAllChecked = customStore.isAll;
      var isAllIndeterminate = customStore.isIndeterminate;
      return h("div", {
        class: ["vxe-custom--wrapper", {
          "is--active": customStore.visible
        }],
        ref: refCustomWrapper
      }, [
        h(resolveComponent("vxe-button"), __assign$b({ circle: true, icon: customOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_CUSTOM, title: GlobalConfig.i18n("vxe.toolbar.custom") }, customBtnOns)),
        h("div", {
          class: "vxe-custom--option-wrapper"
        }, [
          h("ul", {
            class: "vxe-custom--header"
          }, [
            h("li", {
              class: ["vxe-custom--option", {
                "is--checked": isAllChecked,
                "is--indeterminate": isAllIndeterminate
              }],
              title: GlobalConfig.i18n("vxe.table.allTitle"),
              onClick: allCustomEvent
            }, [
              h("span", {
                class: ["vxe-checkbox--icon", isAllIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED]
              }),
              h("span", {
                class: "vxe-checkbox--label"
              }, GlobalConfig.i18n("vxe.toolbar.customAll"))
            ])
          ]),
          h("ul", __assign$b({ class: "vxe-custom--body" }, customWrapperOns), colVNs),
          customOpts.isFooter === false ? null : h("div", {
            class: "vxe-custom--footer"
          }, [
            h("button", {
              class: "btn--confirm",
              onClick: confirmCustomEvent
            }, GlobalConfig.i18n("vxe.toolbar.customConfirm")),
            h("button", {
              class: "btn--reset",
              onClick: resetCustomEvent
            }, GlobalConfig.i18n("vxe.toolbar.customRestore"))
          ])
        ])
      ]);
    };
    toolbarMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $toolbar: $xetoolbar, $event: evnt }, params));
      },
      syncUpdate: function(params) {
        var collectColumn = params.collectColumn;
        $xetable = params.$table;
        reactData.columns = collectColumn;
      }
    };
    Object.assign($xetoolbar, toolbarMethods);
    onMounted(function() {
      GlobalEvent.on($xetoolbar, "mousedown", handleGlobalMousedownEvent);
      GlobalEvent.on($xetoolbar, "blur", handleGlobalBlurEvent);
    });
    onUnmounted(function() {
      GlobalEvent.off($xetoolbar, "mousedown");
      GlobalEvent.off($xetoolbar, "blur");
    });
    nextTick(function() {
      var refresh = props.refresh;
      var refreshOpts = computeRefreshOpts.value;
      var queryMethod = refreshOpts.queryMethod || refreshOpts.query;
      if (refresh && !$xegrid && !queryMethod) {
        warnLog("vxe.error.notFunc", ["queryMethod"]);
      }
    });
    var renderVN = function() {
      var _a;
      var perfect = props.perfect, loading = props.loading, refresh = props.refresh, zoom = props.zoom, custom = props.custom, className = props.className;
      var vSize = computeSize.value;
      var refreshOpts = computeRefreshOpts.value;
      var importOpts = computeImportOpts.value;
      var exportOpts = computeExportOpts.value;
      var printOpts = computePrintOpts.value;
      var zoomOpts = computeZoomOpts.value;
      return h("div", {
        ref: refElem,
        class: ["vxe-toolbar", className ? XEUtils$1.isFunction(className) ? className({ $toolbar: $xetoolbar }) : className : "", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--perfect"] = perfect, _a["is--loading"] = loading, _a)]
      }, [
        h("div", {
          class: "vxe-buttons--wrapper"
        }, renderBtns()),
        h("div", {
          class: "vxe-tools--wrapper"
        }, renderRightTools()),
        h("div", {
          class: "vxe-tools--operate"
        }, [
          props.import ? h(resolveComponent("vxe-button"), {
            circle: true,
            icon: importOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_IMPORT,
            title: GlobalConfig.i18n("vxe.toolbar.import"),
            onClick: importEvent
          }) : createCommentVNode(),
          props.export ? h(resolveComponent("vxe-button"), {
            circle: true,
            icon: exportOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_EXPORT,
            title: GlobalConfig.i18n("vxe.toolbar.export"),
            onClick: exportEvent
          }) : createCommentVNode(),
          props.print ? h(resolveComponent("vxe-button"), {
            circle: true,
            icon: printOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_PRINT,
            title: GlobalConfig.i18n("vxe.toolbar.print"),
            onClick: printEvent
          }) : createCommentVNode(),
          refresh ? h(resolveComponent("vxe-button"), {
            circle: true,
            icon: reactData.isRefresh ? refreshOpts.iconLoading || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH_LOADING : refreshOpts.icon || GlobalConfig.icon.TOOLBAR_TOOLS_REFRESH,
            title: GlobalConfig.i18n("vxe.toolbar.refresh"),
            onClick: refreshEvent
          }) : createCommentVNode(),
          zoom && $xegrid ? h(resolveComponent("vxe-button"), {
            circle: true,
            icon: $xegrid.isMaximized() ? zoomOpts.iconOut || GlobalConfig.icon.TOOLBAR_TOOLS_MINIMIZE : zoomOpts.iconIn || GlobalConfig.icon.TOOLBAR_TOOLS_FULLSCREEN,
            title: GlobalConfig.i18n("vxe.toolbar.zoom".concat($xegrid.isMaximized() ? "Out" : "In")),
            onClick: zoomEvent
          }) : createCommentVNode(),
          custom ? renderCustoms() : createCommentVNode()
        ])
      ]);
    };
    $xetoolbar.renderVN = renderVN;
    return $xetoolbar;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeToolbarComponent, {
  install: function(app) {
    app.component(VxeToolbarComponent.name, VxeToolbarComponent);
  }
});
dynamicApp.component(VxeToolbarComponent.name, VxeToolbarComponent);
var __assign$a = globalThis && globalThis.__assign || function() {
  __assign$a = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$a.apply(this, arguments);
};
const VxePagerComponent = defineComponent({
  name: "VxePager",
  props: {
    size: { type: String, default: function() {
      return GlobalConfig.pager.size || GlobalConfig.size;
    } },
    // 自定义布局
    layouts: { type: Array, default: function() {
      return GlobalConfig.pager.layouts || ["PrevJump", "PrevPage", "Jump", "PageCount", "NextPage", "NextJump", "Sizes", "Total"];
    } },
    // 当前页
    currentPage: { type: Number, default: 1 },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: { type: Number, default: function() {
      return GlobalConfig.pager.pageSize || 10;
    } },
    // 总条数
    total: { type: Number, default: 0 },
    // 显示页码按钮的数量
    pagerCount: { type: Number, default: function() {
      return GlobalConfig.pager.pagerCount || 7;
    } },
    // 每页大小选项列表
    pageSizes: { type: Array, default: function() {
      return GlobalConfig.pager.pageSizes || [10, 15, 20, 50, 100];
    } },
    // 列对其方式
    align: { type: String, default: function() {
      return GlobalConfig.pager.align;
    } },
    // 带边框
    border: { type: Boolean, default: function() {
      return GlobalConfig.pager.border;
    } },
    // 带背景颜色
    background: { type: Boolean, default: function() {
      return GlobalConfig.pager.background;
    } },
    // 配套的样式
    perfect: { type: Boolean, default: function() {
      return GlobalConfig.pager.perfect;
    } },
    // 当只有一页时隐藏
    autoHidden: { type: Boolean, default: function() {
      return GlobalConfig.pager.autoHidden;
    } },
    transfer: { type: Boolean, default: function() {
      return GlobalConfig.pager.transfer;
    } },
    className: [String, Function],
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String
  },
  emits: [
    "update:pageSize",
    "update:currentPage",
    "page-change"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var $xegrid = inject("$xegrid", null);
    var reactData = reactive({
      inpCurrPage: props.currentPage
    });
    var refElem = ref();
    var refMaps = {
      refElem
    };
    var $xepager = {
      xID,
      props,
      context,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var pagerMethods = {};
    var pagerPrivateMethods = {};
    var getPageCount = function(total, size) {
      return Math.max(Math.ceil(total / size), 1);
    };
    var computePageCount = computed(function() {
      return getPageCount(props.total, props.pageSize);
    });
    var jumpPageEvent = function(evnt, currentPage) {
      emit("update:currentPage", currentPage);
      if (evnt && currentPage !== props.currentPage) {
        pagerMethods.dispatchEvent("page-change", { type: "current", pageSize: props.pageSize, currentPage }, evnt);
      }
    };
    var changeCurrentPage = function(currentPage, evnt) {
      emit("update:currentPage", currentPage);
      if (evnt && currentPage !== props.currentPage) {
        pagerMethods.dispatchEvent("page-change", { type: "current", pageSize: props.pageSize, currentPage }, evnt);
      }
    };
    var triggerJumpEvent = function(evnt) {
      var inputElem = evnt.target;
      var inpValue = XEUtils$1.toNumber(inputElem.value);
      var pageCount = computePageCount.value;
      var current = inpValue <= 0 ? 1 : inpValue >= pageCount ? pageCount : inpValue;
      inputElem.value = XEUtils$1.toValueString(current);
      changeCurrentPage(current, evnt);
    };
    var computeNumList = computed(function() {
      var pagerCount = props.pagerCount;
      var pageCount = computePageCount.value;
      var len = pageCount > pagerCount ? pagerCount - 2 : pagerCount;
      var rest = [];
      for (var index = 0; index < len; index++) {
        rest.push(index);
      }
      return rest;
    });
    var computeOffsetNumber = computed(function() {
      return Math.floor((props.pagerCount - 2) / 2);
    });
    var computeSizeList = computed(function() {
      return props.pageSizes.map(function(item) {
        if (XEUtils$1.isNumber(item)) {
          return {
            value: item,
            label: "".concat(GlobalConfig.i18n("vxe.pager.pagesize", [item]))
          };
        }
        return __assign$a({ value: "", label: "" }, item);
      });
    });
    var handlePrevPage = function(evnt) {
      var currentPage = props.currentPage;
      var pageCount = computePageCount.value;
      if (currentPage > 1) {
        changeCurrentPage(Math.min(pageCount, Math.max(currentPage - 1, 1)), evnt);
      }
    };
    var handleNextPage = function(evnt) {
      var currentPage = props.currentPage;
      var pageCount = computePageCount.value;
      if (currentPage < pageCount) {
        changeCurrentPage(Math.min(pageCount, currentPage + 1), evnt);
      }
    };
    var handlePrevJump = function(evnt) {
      var numList = computeNumList.value;
      changeCurrentPage(Math.max(props.currentPage - numList.length, 1), evnt);
    };
    var handleNextJump = function(evnt) {
      var pageCount = computePageCount.value;
      var numList = computeNumList.value;
      changeCurrentPage(Math.min(props.currentPage + numList.length, pageCount), evnt);
    };
    var pageSizeEvent = function(params) {
      var value = params.value;
      var pageSize = XEUtils$1.toNumber(value);
      emit("update:pageSize", pageSize);
      pagerMethods.dispatchEvent("page-change", { type: "size", pageSize, currentPage: Math.min(props.currentPage, getPageCount(props.total, pageSize)) });
    };
    var jumpInputEvent = function(evnt) {
      var inputElem = evnt.target;
      reactData.inpCurrPage = inputElem.value;
    };
    var jumpKeydownEvent = function(evnt) {
      if (hasEventKey(evnt, EVENT_KEYS.ENTER)) {
        triggerJumpEvent(evnt);
      } else if (hasEventKey(evnt, EVENT_KEYS.ARROW_UP)) {
        evnt.preventDefault();
        handleNextPage(evnt);
      } else if (hasEventKey(evnt, EVENT_KEYS.ARROW_DOWN)) {
        evnt.preventDefault();
        handlePrevPage(evnt);
      }
    };
    var renderPrevPage = function() {
      return h("button", {
        class: ["vxe-pager--prev-btn", {
          "is--disabled": props.currentPage <= 1
        }],
        type: "button",
        title: GlobalConfig.i18n("vxe.pager.prevPage"),
        onClick: handlePrevPage
      }, [
        h("i", {
          class: ["vxe-pager--btn-icon", props.iconPrevPage || GlobalConfig.icon.PAGER_PREV_PAGE]
        })
      ]);
    };
    var renderPrevJump = function(tagName) {
      return h(tagName || "button", {
        class: ["vxe-pager--jump-prev", {
          "is--fixed": !tagName,
          "is--disabled": props.currentPage <= 1
        }],
        type: "button",
        title: GlobalConfig.i18n("vxe.pager.prevJump"),
        onClick: handlePrevJump
      }, [
        tagName ? h("i", {
          class: ["vxe-pager--jump-more-icon", props.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h("i", {
          class: ["vxe-pager--jump-icon", props.iconJumpPrev || GlobalConfig.icon.PAGER_JUMP_PREV]
        })
      ]);
    };
    var renderNextJump = function(tagName) {
      var pageCount = computePageCount.value;
      return h(tagName || "button", {
        class: ["vxe-pager--jump-next", {
          "is--fixed": !tagName,
          "is--disabled": props.currentPage >= pageCount
        }],
        type: "button",
        title: GlobalConfig.i18n("vxe.pager.nextJump"),
        onClick: handleNextJump
      }, [
        tagName ? h("i", {
          class: ["vxe-pager--jump-more-icon", props.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h("i", {
          class: ["vxe-pager--jump-icon", props.iconJumpNext || GlobalConfig.icon.PAGER_JUMP_NEXT]
        })
      ]);
    };
    var renderNextPage = function() {
      var pageCount = computePageCount.value;
      return h("button", {
        class: ["vxe-pager--next-btn", {
          "is--disabled": props.currentPage >= pageCount
        }],
        type: "button",
        title: GlobalConfig.i18n("vxe.pager.nextPage"),
        onClick: handleNextPage
      }, [
        h("i", {
          class: ["vxe-pager--btn-icon", props.iconNextPage || GlobalConfig.icon.PAGER_NEXT_PAGE]
        })
      ]);
    };
    var renderNumber = function(showJump) {
      var currentPage = props.currentPage, pagerCount = props.pagerCount;
      var nums = [];
      var pageCount = computePageCount.value;
      var numList = computeNumList.value;
      var offsetNumber = computeOffsetNumber.value;
      var isOv = pageCount > pagerCount;
      var isLt = isOv && currentPage > offsetNumber + 1;
      var isGt = isOv && currentPage < pageCount - offsetNumber;
      var startNumber = 1;
      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1);
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1);
        }
      }
      if (showJump && isLt) {
        nums.push(h("button", {
          class: "vxe-pager--num-btn",
          type: "button",
          onClick: function(evnt) {
            return jumpPageEvent(evnt, 1);
          }
        }, 1), renderPrevJump("span"));
      }
      numList.forEach(function(item, index) {
        var number = startNumber + index;
        if (number <= pageCount) {
          nums.push(h("button", {
            key: number,
            class: ["vxe-pager--num-btn", {
              "is--active": currentPage === number
            }],
            type: "button",
            onClick: function(evnt) {
              return jumpPageEvent(evnt, number);
            }
          }, number));
        }
      });
      if (showJump && isGt) {
        nums.push(renderNextJump("button"), h("button", {
          class: "vxe-pager--num-btn",
          type: "button",
          onClick: function(evnt) {
            return jumpPageEvent(evnt, pageCount);
          }
        }, pageCount));
      }
      return h("span", {
        class: "vxe-pager--btn-wrapper"
      }, nums);
    };
    var renderJumpNumber = function() {
      return renderNumber(true);
    };
    var renderSizes = function() {
      var sizeList = computeSizeList.value;
      return h(resolveComponent("vxe-select"), {
        class: "vxe-pager--sizes",
        modelValue: props.pageSize,
        placement: "top",
        transfer: props.transfer,
        options: sizeList,
        onChange: pageSizeEvent
      });
    };
    var renderJump = function(isFull) {
      return h("span", {
        class: "vxe-pager--jump"
      }, [
        isFull ? h("span", {
          class: "vxe-pager--goto-text"
        }, GlobalConfig.i18n("vxe.pager.goto")) : null,
        h("input", {
          class: "vxe-pager--goto",
          value: reactData.inpCurrPage,
          type: "text",
          autocomplete: "off",
          onInput: jumpInputEvent,
          onKeydown: jumpKeydownEvent,
          onBlur: triggerJumpEvent
        }),
        isFull ? h("span", {
          class: "vxe-pager--classifier-text"
        }, GlobalConfig.i18n("vxe.pager.pageClassifier")) : null
      ]);
    };
    var renderFullJump = function() {
      return renderJump(true);
    };
    var renderPageCount = function() {
      var pageCount = computePageCount.value;
      return h("span", {
        class: "vxe-pager--count"
      }, [
        h("span", {
          class: "vxe-pager--separator"
        }),
        h("span", pageCount)
      ]);
    };
    var renderTotal = function() {
      return h("span", {
        class: "vxe-pager--total"
      }, GlobalConfig.i18n("vxe.pager.total", [props.total]));
    };
    pagerMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $pager: $xepager, $event: evnt }, params));
      },
      prevPage: function() {
        handlePrevPage();
        return nextTick();
      },
      nextPage: function() {
        handleNextPage();
        return nextTick();
      },
      prevJump: function() {
        handlePrevJump();
        return nextTick();
      },
      nextJump: function() {
        handleNextJump();
        return nextTick();
      }
    };
    pagerPrivateMethods = {
      handlePrevPage,
      handleNextPage,
      handlePrevJump,
      handleNextJump
    };
    Object.assign($xepager, pagerMethods, pagerPrivateMethods);
    watch(function() {
      return props.currentPage;
    }, function(value) {
      reactData.inpCurrPage = value;
    });
    var renderVN = function() {
      var _a;
      var align = props.align, layouts = props.layouts, className = props.className;
      var childNodes = [];
      var vSize = computeSize.value;
      var pageCount = computePageCount.value;
      if (slots.left) {
        childNodes.push(h("span", {
          class: "vxe-pager--left-wrapper"
        }, slots.left({ $grid: $xegrid })));
      }
      layouts.forEach(function(name) {
        var renderFn;
        switch (name) {
          case "PrevPage":
            renderFn = renderPrevPage;
            break;
          case "PrevJump":
            renderFn = renderPrevJump;
            break;
          case "Number":
            renderFn = renderNumber;
            break;
          case "JumpNumber":
            renderFn = renderJumpNumber;
            break;
          case "NextJump":
            renderFn = renderNextJump;
            break;
          case "NextPage":
            renderFn = renderNextPage;
            break;
          case "Sizes":
            renderFn = renderSizes;
            break;
          case "FullJump":
            renderFn = renderFullJump;
            break;
          case "Jump":
            renderFn = renderJump;
            break;
          case "PageCount":
            renderFn = renderPageCount;
            break;
          case "Total":
            renderFn = renderTotal;
            break;
        }
        if (renderFn) {
          childNodes.push(renderFn());
        }
      });
      if (slots.right) {
        childNodes.push(h("span", {
          class: "vxe-pager--right-wrapper"
        }, slots.right({ $grid: $xegrid })));
      }
      return h("div", {
        ref: refElem,
        class: ["vxe-pager", className ? XEUtils$1.isFunction(className) ? className({ $pager: $xepager }) : className : "", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["align--".concat(align)] = align, _a["is--border"] = props.border, _a["is--background"] = props.background, _a["is--perfect"] = props.perfect, _a["is--hidden"] = props.autoHidden && pageCount === 1, _a["is--loading"] = props.loading, _a)]
      }, [
        h("div", {
          class: "vxe-pager--wrapper"
        }, childNodes)
      ]);
    };
    $xepager.renderVN = renderVN;
    return $xepager;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxePagerComponent, {
  install: function(app) {
    app.component(VxePagerComponent.name, VxePagerComponent);
  }
});
dynamicApp.component(VxePagerComponent.name, VxePagerComponent);
Object.assign(VxeCheckboxComponent, {
  install: function(app) {
    app.component(VxeCheckboxComponent.name, VxeCheckboxComponent);
  }
});
dynamicApp.component(VxeCheckboxComponent.name, VxeCheckboxComponent);
const VxeCheckboxGroupComponent = defineComponent({
  name: "VxeCheckboxGroup",
  props: {
    modelValue: Array,
    disabled: Boolean,
    max: { type: [String, Number], default: null },
    size: { type: String, default: function() {
      return GlobalConfig.checkbox.size || GlobalConfig.size;
    } }
  },
  emits: [
    "update:modelValue",
    "change"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var computeIsMaximize = computed(function() {
      var modelValue = props.modelValue, max2 = props.max;
      if (max2) {
        return (modelValue ? modelValue.length : 0) >= XEUtils$1.toNumber(max2);
      }
      return false;
    });
    var computeMaps = {
      computeIsMaximize
    };
    var $xecheckboxgroup = {
      xID,
      props,
      context,
      getComputeMaps: function() {
        return computeMaps;
      }
    };
    useSize(props);
    var checkboxGroupMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $checkboxGroup: $xecheckboxgroup, $event: evnt }, params));
      }
    };
    var checkboxGroupPrivateMethods = {
      handleChecked: function(params, evnt) {
        var checked = params.checked, label = params.label;
        var checklist = props.modelValue || [];
        var checkIndex = checklist.indexOf(label);
        if (checked) {
          if (checkIndex === -1) {
            checklist.push(label);
          }
        } else {
          checklist.splice(checkIndex, 1);
        }
        emit("update:modelValue", checklist);
        $xecheckboxgroup.dispatchEvent("change", Object.assign({ checklist }, params), evnt);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, checklist);
        }
      }
    };
    Object.assign($xecheckboxgroup, checkboxGroupMethods, checkboxGroupPrivateMethods);
    var renderVN = function() {
      return h("div", {
        class: "vxe-checkbox-group"
      }, slots.default ? slots.default({}) : []);
    };
    $xecheckboxgroup.renderVN = renderVN;
    provide("$xecheckboxgroup", $xecheckboxgroup);
    return renderVN;
  }
});
Object.assign(VxeCheckboxGroupComponent, {
  install: function(app) {
    app.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent);
  }
});
dynamicApp.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent);
Object.assign(VxeRadioComponent, {
  install: function(app) {
    app.component(VxeRadioComponent.name, VxeRadioComponent);
  }
});
dynamicApp.component(VxeRadioComponent.name, VxeRadioComponent);
Object.assign(VxeRadioGroupComponent, {
  install: function(app) {
    app.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent);
  }
});
dynamicApp.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent);
const VxeRadioButtonComponent = defineComponent({
  name: "VxeRadioButton",
  props: {
    modelValue: [String, Number, Boolean],
    label: { type: [String, Number, Boolean], default: null },
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    strict: { type: Boolean, default: function() {
      return GlobalConfig.radioButton.strict;
    } },
    size: { type: String, default: function() {
      return GlobalConfig.radioButton.size || GlobalConfig.size;
    } }
  },
  emits: [
    "update:modelValue",
    "change"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var $xeradiobutton = {
      xID,
      props,
      context
    };
    var radioButtonMethods = {};
    var $xeradiogroup = inject("$xeradiogroup", null);
    var computeDisabled = computed(function() {
      return props.disabled || $xeradiogroup && $xeradiogroup.props.disabled;
    });
    var computeName = computed(function() {
      return $xeradiogroup ? $xeradiogroup.name : null;
    });
    var computeStrict = computed(function() {
      return $xeradiogroup ? $xeradiogroup.props.strict : props.strict;
    });
    var computeChecked = computed(function() {
      var modelValue = props.modelValue, label = props.label;
      return $xeradiogroup ? $xeradiogroup.props.modelValue === label : modelValue === label;
    });
    radioButtonMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $radioButton: $xeradiobutton, $event: evnt }, params));
      }
    };
    Object.assign($xeradiobutton, radioButtonMethods);
    var handleValue = function(label, evnt) {
      if ($xeradiogroup) {
        $xeradiogroup.handleChecked({ label }, evnt);
      } else {
        emit("update:modelValue", label);
        radioButtonMethods.dispatchEvent("change", { label }, evnt);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, label);
        }
      }
    };
    var changeEvent = function(evnt) {
      var isDisabled = computeDisabled.value;
      if (!isDisabled) {
        handleValue(props.label, evnt);
      }
    };
    var clickEvent = function(evnt) {
      var isDisabled = computeDisabled.value;
      var isStrict = computeStrict.value;
      if (!isDisabled && !isStrict) {
        if (props.label === ($xeradiogroup ? $xeradiogroup.props.modelValue : props.modelValue)) {
          handleValue(null, evnt);
        }
      }
    };
    var renderVN = function() {
      var _a;
      var vSize = computeSize.value;
      var isDisabled = computeDisabled.value;
      var name = computeName.value;
      var checked = computeChecked.value;
      return h("label", {
        class: ["vxe-radio", "vxe-radio-button", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--disabled"] = isDisabled, _a)],
        title: props.title
      }, [
        h("input", {
          class: "vxe-radio--input",
          type: "radio",
          name,
          checked,
          disabled: isDisabled,
          onChange: changeEvent,
          onClick: clickEvent
        }),
        h("span", {
          class: "vxe-radio--label"
        }, slots.default ? slots.default({}) : getFuncText(props.content))
      ]);
    };
    Object.assign($xeradiobutton, {
      renderVN,
      dispatchEvent
    });
    return renderVN;
  }
});
Object.assign(VxeRadioButtonComponent, {
  install: function(app) {
    app.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent);
  }
});
dynamicApp.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent);
Object.assign(VxeInputConstructor, {
  install: function(app) {
    app.component(VxeInputConstructor.name, VxeInputConstructor);
  }
});
dynamicApp.component(VxeInputConstructor.name, VxeInputConstructor);
var autoTxtElem;
const VxeTextareaComponent = defineComponent({
  name: "VxeTextarea",
  props: {
    modelValue: [String, Number],
    className: String,
    immediate: { type: Boolean, default: true },
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    rows: { type: [String, Number], default: 2 },
    cols: { type: [String, Number], default: null },
    showWordCount: Boolean,
    countMethod: Function,
    autosize: [Boolean, Object],
    form: String,
    resize: { type: String, default: function() {
      return GlobalConfig.textarea.resize;
    } },
    size: { type: String, default: function() {
      return GlobalConfig.textarea.size || GlobalConfig.size;
    } }
  },
  emits: [
    "update:modelValue",
    "input",
    "keydown",
    "keyup",
    "click",
    "change",
    "focus",
    "blur"
  ],
  setup: function(props, context) {
    var emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      inputValue: props.modelValue
    });
    var refElem = ref();
    var refTextarea = ref();
    var refMaps = {
      refElem,
      refTextarea
    };
    var $xetextarea = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var textareaMethods = {};
    var computeInputCount = computed(function() {
      return XEUtils$1.getSize(reactData.inputValue);
    });
    var computeIsCountError = computed(function() {
      var inputCount = computeInputCount.value;
      return props.maxlength && inputCount > XEUtils$1.toNumber(props.maxlength);
    });
    var computeSizeOpts = computed(function() {
      return Object.assign({ minRows: 1, maxRows: 10 }, GlobalConfig.textarea.autosize, props.autosize);
    });
    var updateAutoTxt = function() {
      var size = props.size, autosize = props.autosize;
      var inputValue = reactData.inputValue;
      if (autosize) {
        if (!autoTxtElem) {
          autoTxtElem = document.createElement("div");
        }
        if (!autoTxtElem.parentNode) {
          document.body.appendChild(autoTxtElem);
        }
        var textElem = refTextarea.value;
        var textStyle = getComputedStyle(textElem);
        autoTxtElem.className = ["vxe-textarea--autosize", size ? "size--".concat(size) : ""].join(" ");
        autoTxtElem.style.width = "".concat(textElem.clientWidth, "px");
        autoTxtElem.style.padding = textStyle.padding;
        autoTxtElem.innerHTML = ("" + (inputValue || "　")).replace(/\n$/, "\n　");
      }
    };
    var handleResize = function() {
      if (props.autosize) {
        nextTick(function() {
          var sizeOpts = computeSizeOpts.value;
          var minRows = sizeOpts.minRows, maxRows = sizeOpts.maxRows;
          var textElem = refTextarea.value;
          var sizeHeight = autoTxtElem.clientHeight;
          var textStyle = getComputedStyle(textElem);
          var lineHeight = XEUtils$1.toNumber(textStyle.lineHeight);
          var paddingTop = XEUtils$1.toNumber(textStyle.paddingTop);
          var paddingBottom = XEUtils$1.toNumber(textStyle.paddingBottom);
          var borderTopWidth = XEUtils$1.toNumber(textStyle.borderTopWidth);
          var borderBottomWidth = XEUtils$1.toNumber(textStyle.borderBottomWidth);
          var intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
          var rowNum = (sizeHeight - intervalHeight) / lineHeight;
          var textRows = rowNum && /[0-9]/.test("" + rowNum) ? rowNum : Math.floor(rowNum) + 1;
          var vaildRows = textRows;
          if (textRows < minRows) {
            vaildRows = minRows;
          } else if (textRows > maxRows) {
            vaildRows = maxRows;
          }
          textElem.style.height = "".concat(vaildRows * lineHeight + intervalHeight, "px");
        });
      }
    };
    var triggerEvent2 = function(evnt) {
      var value = reactData.inputValue;
      $xetextarea.dispatchEvent(evnt.type, { value }, evnt);
    };
    var emitUpdate = function(value, evnt) {
      reactData.inputValue = value;
      emit("update:modelValue", value);
      if (XEUtils$1.toValueString(props.modelValue) !== value) {
        textareaMethods.dispatchEvent("change", { value }, evnt);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
        }
      }
    };
    var inputEvent = function(evnt) {
      var immediate = props.immediate;
      var textElem = evnt.target;
      var value = textElem.value;
      reactData.inputValue = value;
      if (immediate) {
        emitUpdate(value, evnt);
      }
      $xetextarea.dispatchEvent("input", { value }, evnt);
      handleResize();
    };
    var changeEvent = function(evnt) {
      var immediate = props.immediate;
      if (immediate) {
        triggerEvent2(evnt);
      } else {
        emitUpdate(reactData.inputValue, evnt);
      }
    };
    var blurEvent = function(evnt) {
      var immediate = props.immediate;
      var inputValue = reactData.inputValue;
      if (!immediate) {
        emitUpdate(inputValue, evnt);
      }
      $xetextarea.dispatchEvent("blur", { value: inputValue }, evnt);
    };
    textareaMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $textarea: $xetextarea, $event: evnt }, params));
      },
      focus: function() {
        var textElem = refTextarea.value;
        textElem.focus();
        return nextTick();
      },
      blur: function() {
        var textElem = refTextarea.value;
        textElem.blur();
        return nextTick();
      }
    };
    Object.assign($xetextarea, textareaMethods);
    watch(function() {
      return props.modelValue;
    }, function(val) {
      reactData.inputValue = val;
      updateAutoTxt();
    });
    nextTick(function() {
      var autosize = props.autosize;
      if (autosize) {
        updateAutoTxt();
        handleResize();
      }
    });
    var renderVN = function() {
      var _a;
      var className = props.className, resize = props.resize, placeholder = props.placeholder, disabled = props.disabled, maxlength = props.maxlength, autosize = props.autosize, showWordCount = props.showWordCount, countMethod = props.countMethod, rows = props.rows, cols = props.cols;
      var inputValue = reactData.inputValue;
      var vSize = computeSize.value;
      var isCountError = computeIsCountError.value;
      var inputCount = computeInputCount.value;
      return h("div", {
        ref: refElem,
        class: ["vxe-textarea", className, (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--autosize"] = autosize, _a["is--disabled"] = disabled, _a["def--rows"] = !XEUtils$1.eqNull(rows), _a["def--cols"] = !XEUtils$1.eqNull(cols), _a)]
      }, [
        h("textarea", {
          ref: refTextarea,
          class: "vxe-textarea--inner",
          value: inputValue,
          name: props.name,
          placeholder: placeholder ? getFuncText(placeholder) : null,
          maxlength,
          readonly: props.readonly,
          disabled,
          rows,
          cols,
          style: resize ? {
            resize
          } : null,
          onInput: inputEvent,
          onChange: changeEvent,
          onKeydown: triggerEvent2,
          onKeyup: triggerEvent2,
          onClick: triggerEvent2,
          onFocus: triggerEvent2,
          onBlur: blurEvent
        }),
        showWordCount ? h("span", {
          class: ["vxe-textarea--count", {
            "is--error": isCountError
          }]
        }, countMethod ? "".concat(countMethod({ value: inputValue })) : "".concat(inputCount).concat(maxlength ? "/".concat(maxlength) : "")) : null
      ]);
    };
    $xetextarea.renderVN = renderVN;
    return $xetextarea;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeTextareaComponent, {
  install: function(app) {
    app.component(VxeTextareaComponent.name, VxeTextareaComponent);
  }
});
dynamicApp.component(VxeTextareaComponent.name, VxeTextareaComponent);
Object.assign(VxeButtonComponent, {
  install: function(app) {
    app.component(VxeButtonComponent.name, VxeButtonComponent);
  }
});
dynamicApp.component(VxeButtonComponent.name, VxeButtonComponent);
var __assign$9 = globalThis && globalThis.__assign || function() {
  __assign$9 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$9.apply(this, arguments);
};
function openModal(options) {
  checkDynamic();
  return new Promise(function(resolve) {
    if (options && options.id && allActivedModals.some(function(comp) {
      return comp.props.id === options.id;
    })) {
      resolve("exist");
    } else {
      var _onHide_1 = options.onHide;
      var modalOpts_1 = Object.assign(options, {
        key: XEUtils$1.uniqueId(),
        modelValue: true,
        onHide: function(params) {
          var modalList = dynamicStore.modals;
          if (_onHide_1) {
            _onHide_1(params);
          }
          dynamicStore.modals = modalList.filter(function(item) {
            return item.key !== modalOpts_1.key;
          });
          resolve(params.type);
        }
      });
      dynamicStore.modals.push(modalOpts_1);
    }
  });
}
function getModal(id) {
  return XEUtils$1.find(allActivedModals, function($modal) {
    return $modal.props.id === id;
  });
}
function closeModal(id) {
  var modals = id ? [getModal(id)] : allActivedModals;
  var restPromises = [];
  modals.forEach(function($modal) {
    if ($modal) {
      restPromises.push($modal.close());
    }
  });
  return Promise.all(restPromises);
}
function handleOpen(defOpts, content, title, options) {
  var opts;
  if (XEUtils$1.isObject(content)) {
    opts = content;
  } else {
    opts = { content: XEUtils$1.toValueString(content), title };
  }
  return openModal(__assign$9(__assign$9(__assign$9({}, defOpts), options), opts));
}
function openAlert(content, title, options) {
  return handleOpen({
    type: "alert",
    showFooter: true
  }, content, title, options);
}
function openConfirm(content, title, options) {
  return handleOpen({
    type: "confirm",
    status: "question",
    showFooter: true
  }, content, title, options);
}
function openMessage(content, options) {
  return handleOpen({
    type: "message",
    mask: false,
    lockView: false,
    showHeader: false
  }, content, "", options);
}
var ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal,
  alert: openAlert,
  confirm: openConfirm,
  message: openMessage
};
Object.assign(VxeModalComponent, {
  install: function(app) {
    app.component(VxeModalComponent.name, VxeModalComponent);
    VXETable.modal = ModalController;
  }
});
dynamicApp.component(VxeModalComponent.name, VxeModalComponent);
var __assign$8 = globalThis && globalThis.__assign || function() {
  __assign$8 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$8.apply(this, arguments);
};
var __spreadArray$2 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
const VxeTooltipComponent = defineComponent({
  name: "VxeTooltip",
  props: {
    modelValue: Boolean,
    size: { type: String, default: function() {
      return GlobalConfig.tooltip.size || GlobalConfig.size;
    } },
    trigger: { type: String, default: function() {
      return GlobalConfig.tooltip.trigger;
    } },
    theme: { type: String, default: function() {
      return GlobalConfig.tooltip.theme;
    } },
    content: { type: [String, Number], default: null },
    useHTML: Boolean,
    zIndex: [String, Number],
    isArrow: { type: Boolean, default: true },
    enterable: Boolean,
    enterDelay: { type: Number, default: function() {
      return GlobalConfig.tooltip.enterDelay;
    } },
    leaveDelay: { type: Number, default: function() {
      return GlobalConfig.tooltip.leaveDelay;
    } }
  },
  emits: [
    "update:modelValue"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      target: null,
      isUpdate: false,
      visible: false,
      tipContent: "",
      tipActive: false,
      tipTarget: null,
      tipZindex: 0,
      tipStore: {
        style: {},
        placement: "",
        arrowStyle: {}
      }
    });
    var refElem = ref();
    var refMaps = {
      refElem
    };
    var $xetooltip = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var tooltipMethods = {};
    var updateTipStyle = function() {
      var tipTarget = reactData.tipTarget, tipStore = reactData.tipStore;
      if (tipTarget) {
        var _a = getDomNode(), scrollTop = _a.scrollTop, scrollLeft = _a.scrollLeft, visibleWidth = _a.visibleWidth;
        var _b = getAbsolutePos(tipTarget), top_1 = _b.top, left = _b.left;
        var el = refElem.value;
        var marginSize = 6;
        var offsetHeight = el.offsetHeight;
        var offsetWidth = el.offsetWidth;
        var tipLeft = left;
        var tipTop = top_1 - offsetHeight - marginSize;
        tipLeft = Math.max(marginSize, left + Math.floor((tipTarget.offsetWidth - offsetWidth) / 2));
        if (tipLeft + offsetWidth + marginSize > scrollLeft + visibleWidth) {
          tipLeft = scrollLeft + visibleWidth - offsetWidth - marginSize;
        }
        if (top_1 - offsetHeight < scrollTop + marginSize) {
          tipStore.placement = "bottom";
          tipTop = top_1 + tipTarget.offsetHeight + marginSize;
        }
        tipStore.style.top = "".concat(tipTop, "px");
        tipStore.style.left = "".concat(tipLeft, "px");
        tipStore.arrowStyle.left = "".concat(left - tipLeft + tipTarget.offsetWidth / 2, "px");
      }
    };
    var updateValue = function(value) {
      if (value !== reactData.visible) {
        reactData.visible = value;
        reactData.isUpdate = true;
        emit("update:modelValue", value);
      }
    };
    var updateZindex = function() {
      if (reactData.tipZindex < getLastZIndex()) {
        reactData.tipZindex = nextZIndex();
      }
    };
    var clickEvent = function() {
      if (reactData.visible) {
        tooltipMethods.close();
      } else {
        tooltipMethods.open();
      }
    };
    var targetMouseenterEvent = function() {
      tooltipMethods.open();
    };
    var targetMouseleaveEvent = function() {
      var trigger = props.trigger, enterable = props.enterable, leaveDelay = props.leaveDelay;
      reactData.tipActive = false;
      if (enterable && trigger === "hover") {
        setTimeout(function() {
          if (!reactData.tipActive) {
            tooltipMethods.close();
          }
        }, leaveDelay);
      } else {
        tooltipMethods.close();
      }
    };
    var wrapperMouseenterEvent = function() {
      reactData.tipActive = true;
    };
    var wrapperMouseleaveEvent = function() {
      var trigger = props.trigger, enterable = props.enterable, leaveDelay = props.leaveDelay;
      reactData.tipActive = false;
      if (enterable && trigger === "hover") {
        setTimeout(function() {
          if (!reactData.tipActive) {
            tooltipMethods.close();
          }
        }, leaveDelay);
      }
    };
    var showTip = function() {
      var tipStore = reactData.tipStore;
      var el = refElem.value;
      if (el) {
        var parentNode = el.parentNode;
        if (!parentNode) {
          document.body.appendChild(el);
        }
      }
      updateValue(true);
      updateZindex();
      tipStore.placement = "top";
      tipStore.style = { width: "auto", left: 0, top: 0, zIndex: props.zIndex || reactData.tipZindex };
      tipStore.arrowStyle = { left: "50%" };
      return tooltipMethods.updatePlacement();
    };
    var showDelayTip = XEUtils$1.debounce(function() {
      if (reactData.tipActive) {
        showTip();
      }
    }, props.enterDelay, { leading: false, trailing: true });
    tooltipMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $tooltip: $xetooltip, $event: evnt }, params));
      },
      open: function(target, content) {
        return tooltipMethods.toVisible(target || reactData.target, content);
      },
      close: function() {
        reactData.tipTarget = null;
        reactData.tipActive = false;
        Object.assign(reactData.tipStore, {
          style: {},
          placement: "",
          arrowStyle: null
        });
        updateValue(false);
        return nextTick();
      },
      toVisible: function(target, content) {
        if (target) {
          var trigger = props.trigger, enterDelay = props.enterDelay;
          reactData.tipActive = true;
          reactData.tipTarget = target;
          if (content) {
            reactData.tipContent = content;
          }
          if (enterDelay && trigger === "hover") {
            showDelayTip();
          } else {
            return showTip();
          }
        }
        return nextTick();
      },
      updatePlacement: function() {
        return nextTick().then(function() {
          var tipTarget = reactData.tipTarget;
          var el = refElem.value;
          if (tipTarget && el) {
            updateTipStyle();
            return nextTick().then(updateTipStyle);
          }
        });
      },
      isActived: function() {
        return reactData.tipActive;
      },
      setActived: function(actived) {
        reactData.tipActive = !!actived;
      }
    };
    Object.assign($xetooltip, tooltipMethods);
    watch(function() {
      return props.content;
    }, function() {
      reactData.tipContent = props.content;
    });
    watch(function() {
      return props.modelValue;
    }, function() {
      if (!reactData.isUpdate) {
        if (props.modelValue) {
          tooltipMethods.open();
        } else {
          tooltipMethods.close();
        }
      }
      reactData.isUpdate = false;
    });
    onMounted(function() {
      nextTick(function() {
        var trigger = props.trigger, content = props.content, modelValue = props.modelValue;
        var wrapperElem = refElem.value;
        var parentNode = wrapperElem.parentNode;
        if (parentNode) {
          reactData.tipContent = content;
          reactData.tipZindex = nextZIndex();
          XEUtils$1.arrayEach(wrapperElem.children, function(elem, index) {
            if (index > 1) {
              parentNode.insertBefore(elem, wrapperElem);
              if (!reactData.target) {
                reactData.target = elem;
              }
            }
          });
          parentNode.removeChild(wrapperElem);
          var target = reactData.target;
          if (target) {
            if (trigger === "hover") {
              target.onmouseenter = targetMouseenterEvent;
              target.onmouseleave = targetMouseleaveEvent;
            } else if (trigger === "click") {
              target.onclick = clickEvent;
            }
          }
          if (modelValue) {
            tooltipMethods.open();
          }
        }
      });
    });
    onBeforeUnmount(function() {
      var trigger = props.trigger;
      var target = reactData.target;
      var wrapperElem = refElem.value;
      if (wrapperElem) {
        var parentNode = wrapperElem.parentNode;
        if (parentNode) {
          parentNode.removeChild(wrapperElem);
        }
      }
      if (target) {
        if (trigger === "hover") {
          target.onmouseenter = null;
          target.onmouseleave = null;
        } else if (trigger === "click") {
          target.onclick = null;
        }
      }
    });
    var renderContent = function() {
      var useHTML = props.useHTML;
      var tipContent = reactData.tipContent;
      var contentSlot = slots.content;
      if (contentSlot) {
        return h("div", {
          key: 1,
          class: "vxe-table--tooltip-content"
        }, getSlotVNs(contentSlot({})));
      }
      if (useHTML) {
        return h("div", {
          key: 2,
          class: "vxe-table--tooltip-content",
          innerHTML: tipContent
        });
      }
      return h("div", {
        key: 3,
        class: "vxe-table--tooltip-content"
      }, formatText(tipContent));
    };
    var renderVN = function() {
      var _a;
      var theme = props.theme, isArrow = props.isArrow, enterable = props.enterable;
      var tipActive = reactData.tipActive, visible = reactData.visible, tipStore = reactData.tipStore;
      var defaultSlot = slots.default;
      var vSize = computeSize.value;
      var ons;
      if (enterable) {
        ons = {
          onMouseenter: wrapperMouseenterEvent,
          onMouseleave: wrapperMouseleaveEvent
        };
      }
      return h("div", __assign$8({ ref: refElem, class: ["vxe-table--tooltip-wrapper", "theme--".concat(theme), (_a = {}, _a["size--".concat(vSize)] = vSize, _a["placement--".concat(tipStore.placement)] = tipStore.placement, _a["is--enterable"] = enterable, _a["is--visible"] = visible, _a["is--arrow"] = isArrow, _a["is--actived"] = tipActive, _a)], style: tipStore.style }, ons), __spreadArray$2([
        renderContent(),
        h("div", {
          class: "vxe-table--tooltip-arrow",
          style: tipStore.arrowStyle
        })
      ], defaultSlot ? getSlotVNs(defaultSlot({})) : [], true));
    };
    $xetooltip.renderVN = renderVN;
    return $xetooltip;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeTooltipComponent, {
  install: function(app) {
    VXETable.tooltip = true;
    app.component(VxeTooltipComponent.name, VxeTooltipComponent);
  }
});
dynamicApp.component(VxeTooltipComponent.name, VxeTooltipComponent);
var ItemInfo = (
  /** @class */
  function() {
    function ItemInfo2($xeform, item) {
      Object.assign(this, {
        id: XEUtils$1.uniqueId("item_"),
        title: item.title,
        field: item.field,
        span: item.span,
        align: item.align,
        titleAlign: item.titleAlign,
        titleWidth: item.titleWidth,
        titleColon: item.titleColon,
        titleAsterisk: item.titleAsterisk,
        titlePrefix: item.titlePrefix,
        titleSuffix: item.titleSuffix,
        titleOverflow: item.titleOverflow,
        resetValue: item.resetValue,
        visibleMethod: item.visibleMethod,
        visible: item.visible,
        folding: item.folding,
        collapseNode: item.collapseNode,
        className: item.className,
        itemRender: item.itemRender,
        // 渲染属性
        showError: false,
        errRule: null,
        slots: item.slots,
        children: []
      });
    }
    ItemInfo2.prototype.update = function(name, value) {
      this[name] = value;
    };
    return ItemInfo2;
  }()
);
function isFormItem(item) {
  return item instanceof ItemInfo;
}
function createItem($xeform, _vm) {
  return isFormItem(_vm) ? _vm : new ItemInfo($xeform, _vm);
}
function handleFieldOrItem($xeform, fieldOrItem) {
  if (fieldOrItem) {
    return XEUtils$1.isString(fieldOrItem) ? $xeform.getItemByField(fieldOrItem) : fieldOrItem;
  }
  return null;
}
function isHiddenItem($xeform, formItem) {
  var reactData = $xeform.reactData;
  var collapseAll = reactData.collapseAll;
  var folding = formItem.folding, visible = formItem.visible;
  return visible === false || folding && collapseAll;
}
function isActivetem($xeform, formItem) {
  var visibleMethod = formItem.visibleMethod, itemRender = formItem.itemRender, visible = formItem.visible, field = formItem.field;
  if (visible === false) {
    return visible;
  }
  var compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null;
  if (!visibleMethod && compConf && compConf.itemVisibleMethod) {
    visibleMethod = compConf.itemVisibleMethod;
  }
  if (!visibleMethod) {
    return true;
  }
  var data = $xeform.props.data;
  return visibleMethod({ data, field, property: field, item: formItem, $form: $xeform });
}
function watchItem(props, formItem) {
  Object.keys(props).forEach(function(name) {
    watch(function() {
      return props[name];
    }, function(value) {
      formItem.update(name, value);
    });
  });
}
function assemItem($xeform, el, formItem, formGather) {
  var reactData = $xeform.reactData;
  var staticItems = reactData.staticItems;
  var parentElem = el.parentNode;
  var parentItem = formGather ? formGather.formItem : null;
  var parentItems = parentItem ? parentItem.children : staticItems;
  if (parentElem) {
    parentItems.splice(XEUtils$1.arrayIndexOf(parentElem.children, el), 0, formItem);
    reactData.staticItems = staticItems.slice(0);
  }
}
function destroyItem($xeform, formItem) {
  var reactData = $xeform.reactData;
  var staticItems = reactData.staticItems;
  var index = XEUtils$1.findIndexOf(staticItems, function(item) {
    return item.id === formItem.id;
  });
  if (index > -1) {
    staticItems.splice(index, 1);
  }
  reactData.staticItems = staticItems.slice(0);
}
var __assign$7 = globalThis && globalThis.__assign || function() {
  __assign$7 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$7.apply(this, arguments);
};
function renderPrefixIcon(titlePrefix) {
  return h("span", {
    class: "vxe-form--item-title-prefix"
  }, [
    h("i", {
      class: titlePrefix.icon || GlobalConfig.icon.FORM_PREFIX
    })
  ]);
}
function renderSuffixIcon(titleSuffix) {
  return h("span", {
    class: "vxe-form--item-title-suffix"
  }, [
    h("i", {
      class: titleSuffix.icon || GlobalConfig.icon.FORM_SUFFIX
    })
  ]);
}
function renderTitle($xeform, item) {
  var data = $xeform.props.data;
  var computeTooltipOpts = $xeform.getComputeMaps().computeTooltipOpts;
  var slots = item.slots, field = item.field, itemRender = item.itemRender, titlePrefix = item.titlePrefix, titleSuffix = item.titleSuffix;
  var tooltipOpts = computeTooltipOpts.value;
  var compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null;
  var params = { data, field, property: field, item, $form: $xeform };
  var titleSlot = slots ? slots.title : null;
  var contVNs = [];
  var titVNs = [];
  if (titlePrefix) {
    titVNs.push(titlePrefix.content || titlePrefix.message ? h(resolveComponent("vxe-tooltip"), __assign$7(__assign$7(__assign$7({}, tooltipOpts), titlePrefix), { content: getFuncText(titlePrefix.content || titlePrefix.message) }), {
      default: function() {
        return renderPrefixIcon(titlePrefix);
      }
    }) : renderPrefixIcon(titlePrefix));
  }
  titVNs.push(h("span", {
    class: "vxe-form--item-title-label"
  }, compConf && compConf.renderItemTitle ? getSlotVNs(compConf.renderItemTitle(itemRender, params)) : titleSlot ? $xeform.callSlot(titleSlot, params) : getFuncText(item.title)));
  contVNs.push(h("div", {
    class: "vxe-form--item-title-content"
  }, titVNs));
  var fixVNs = [];
  if (titleSuffix) {
    fixVNs.push(titleSuffix.content || titleSuffix.message ? h(resolveComponent("vxe-tooltip"), __assign$7(__assign$7(__assign$7({}, tooltipOpts), titleSuffix), { content: getFuncText(titleSuffix.content || titleSuffix.message) }), {
      default: function() {
        return renderSuffixIcon(titleSuffix);
      }
    }) : renderSuffixIcon(titleSuffix));
  }
  contVNs.push(h("div", {
    class: "vxe-form--item-title-postfix"
  }, fixVNs));
  return contVNs;
}
var __assign$6 = globalThis && globalThis.__assign || function() {
  __assign$6 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$6.apply(this, arguments);
};
var VxeFormConfigItem = defineComponent({
  name: "VxeFormConfigItem",
  props: {
    itemConfig2: Object,
    itemConfig: Object
  },
  setup: function(props) {
    var $xeform = inject("$xeform", {});
    var xeformiteminfo = { itemConfig: props.itemConfig };
    provide("$xeformiteminfo", xeformiteminfo);
    provide("$xeformgather", null);
    var renderVN = function() {
      var reactData = $xeform.reactData;
      var _a = $xeform.props, data = _a.data, rules = _a.rules, allSpan = _a.span, allAlign = _a.align, allTitleAlign = _a.titleAlign, allTitleWidth = _a.titleWidth, allTitleColon = _a.titleColon, allTitleAsterisk = _a.titleAsterisk, allTitleOverflow = _a.titleOverflow;
      var computeValidOpts = $xeform.getComputeMaps().computeValidOpts;
      var item = props.itemConfig;
      var collapseAll = reactData.collapseAll;
      var validOpts = computeValidOpts.value;
      var slots = item.slots, title = item.title, visible = item.visible, folding = item.folding, field = item.field, collapseNode = item.collapseNode, itemRender = item.itemRender, showError = item.showError, errRule = item.errRule, className = item.className, titleOverflow = item.titleOverflow, children = item.children;
      var compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null;
      var itemClassName = compConf ? compConf.itemClassName : "";
      var defaultSlot = slots ? slots.default : null;
      var titleSlot = slots ? slots.title : null;
      var span = item.span || allSpan;
      var align = item.align || allAlign;
      var titleAlign = XEUtils$1.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign;
      var titleWidth = XEUtils$1.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth;
      var titleColon = XEUtils$1.eqNull(item.titleColon) ? allTitleColon : item.titleColon;
      var titleAsterisk = XEUtils$1.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk;
      var itemOverflow = XEUtils$1.isUndefined(titleOverflow) || XEUtils$1.isNull(titleOverflow) ? allTitleOverflow : titleOverflow;
      var showEllipsis = itemOverflow === "ellipsis";
      var showTitle = itemOverflow === "title";
      var showTooltip = itemOverflow === true || itemOverflow === "tooltip";
      var hasEllipsis = showTitle || showTooltip || showEllipsis;
      var params = { data, field, property: field, item, $form: $xeform };
      if (visible === false) {
        return createCommentVNode();
      }
      var isRequired = false;
      if (rules) {
        var itemRules = rules[field];
        if (itemRules) {
          isRequired = itemRules.some(function(rule) {
            return rule.required;
          });
        }
      }
      var isGather = children && children.length > 0;
      if (isGather) {
        var childVNs = children.map(function(childItem, index) {
          return h(VxeFormConfigItem, {
            key: index,
            itemConfig: childItem
          });
        });
        return childVNs.length ? h("div", {
          class: ["vxe-form--gather vxe-row", item.id, span ? "vxe-col--".concat(span, " is--span") : "", className ? XEUtils$1.isFunction(className) ? className(params) : className : ""]
        }, childVNs) : createCommentVNode();
      }
      var contentVNs = [];
      if (defaultSlot) {
        contentVNs = $xeform.callSlot(defaultSlot, params);
      } else if (compConf && compConf.renderItemContent) {
        contentVNs = getSlotVNs(compConf.renderItemContent(itemRender, params));
      } else if (field) {
        contentVNs = [XEUtils$1.toValueString(XEUtils$1.get(data, field))];
      }
      if (collapseNode) {
        contentVNs.push(h("div", {
          class: "vxe-form--item-trigger-node",
          onClick: $xeform.toggleCollapseEvent
        }, [
          h("span", {
            class: "vxe-form--item-trigger-text"
          }, collapseAll ? GlobalConfig.i18n("vxe.form.unfolding") : GlobalConfig.i18n("vxe.form.folding")),
          h("i", {
            class: ["vxe-form--item-trigger-icon", collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
          })
        ]));
      }
      if (errRule && validOpts.showMessage) {
        contentVNs.push(h("div", {
          class: "vxe-form--item-valid",
          style: errRule.maxWidth ? {
            width: "".concat(errRule.maxWidth, "px")
          } : null
        }, errRule.content));
      }
      var ons = showTooltip ? {
        onMouseenter: function(evnt) {
          $xeform.triggerTitleTipEvent(evnt, params);
        },
        onMouseleave: $xeform.handleTitleTipLeaveEvent
      } : {};
      return h("div", {
        class: [
          "vxe-form--item",
          item.id,
          span ? "vxe-col--".concat(span, " is--span") : "",
          className ? XEUtils$1.isFunction(className) ? className(params) : className : "",
          itemClassName ? XEUtils$1.isFunction(itemClassName) ? itemClassName(params) : itemClassName : "",
          {
            "is--title": title,
            "is--colon": titleColon,
            "is--asterisk": titleAsterisk,
            "is--required": isRequired,
            "is--hidden": folding && collapseAll,
            "is--active": isActivetem($xeform, item),
            "is--error": showError
          }
        ],
        itemConfig: item,
        key: item.id
      }, [
        h("div", {
          class: "vxe-form--item-inner"
        }, [
          title || titleSlot ? h("div", __assign$6({ class: ["vxe-form--item-title", titleAlign ? "align--".concat(titleAlign) : null, {
            "is--ellipsis": hasEllipsis
          }], style: titleWidth ? {
            width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
          } : null, title: showTitle ? getFuncText(title) : null }, ons), renderTitle($xeform, item)) : null,
          h("div", {
            class: ["vxe-form--item-content", align ? "align--".concat(align) : null]
          }, contentVNs)
        ])
      ]);
    };
    var $xeformconfigitem = {
      renderVN
    };
    return $xeformconfigitem;
  },
  render: function() {
    return this.renderVN();
  }
});
var __assign$5 = globalThis && globalThis.__assign || function() {
  __assign$5 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$5.apply(this, arguments);
};
var Rule = (
  /** @class */
  function() {
    function Rule2(rule) {
      Object.assign(this, {
        $options: rule,
        required: rule.required,
        min: rule.min,
        max: rule.min,
        type: rule.type,
        pattern: rule.pattern,
        validator: rule.validator,
        trigger: rule.trigger,
        maxWidth: rule.maxWidth
      });
    }
    Object.defineProperty(Rule2.prototype, "content", {
      get: function() {
        return getFuncText(this.$options.content || this.$options.message);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Rule2.prototype, "message", {
      get: function() {
        return this.content;
      },
      enumerable: false,
      configurable: true
    });
    return Rule2;
  }()
);
var validErrorRuleValue = function(rule, val) {
  var type = rule.type, min2 = rule.min, max2 = rule.max, pattern = rule.pattern;
  var isNumType = type === "number";
  var numVal = isNumType ? XEUtils$1.toNumber(val) : XEUtils$1.getSize(val);
  if (isNumType && isNaN(val)) {
    return true;
  }
  if (!XEUtils$1.eqNull(min2) && numVal < XEUtils$1.toNumber(min2)) {
    return true;
  }
  if (!XEUtils$1.eqNull(max2) && numVal > XEUtils$1.toNumber(max2)) {
    return true;
  }
  if (pattern && !(XEUtils$1.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return true;
  }
  return false;
};
function getResetValue(value, resetValue) {
  if (XEUtils$1.isArray(value)) {
    resetValue = [];
  }
  return resetValue;
}
const VxeFormComponent = defineComponent({
  name: "VxeForm",
  props: {
    collapseStatus: { type: Boolean, default: true },
    loading: Boolean,
    data: Object,
    size: { type: String, default: function() {
      return GlobalConfig.form.size || GlobalConfig.size;
    } },
    span: { type: [String, Number], default: function() {
      return GlobalConfig.form.span;
    } },
    align: { type: String, default: function() {
      return GlobalConfig.form.align;
    } },
    titleAlign: { type: String, default: function() {
      return GlobalConfig.form.titleAlign;
    } },
    titleWidth: { type: [String, Number], default: function() {
      return GlobalConfig.form.titleWidth;
    } },
    titleColon: { type: Boolean, default: function() {
      return GlobalConfig.form.titleColon;
    } },
    titleAsterisk: { type: Boolean, default: function() {
      return GlobalConfig.form.titleAsterisk;
    } },
    titleOverflow: { type: [Boolean, String], default: null },
    className: [String, Function],
    readonly: Boolean,
    items: Array,
    rules: Object,
    preventSubmit: { type: Boolean, default: function() {
      return GlobalConfig.form.preventSubmit;
    } },
    validConfig: Object,
    tooltipConfig: Object,
    customLayout: { type: Boolean, default: function() {
      return GlobalConfig.form.customLayout;
    } }
  },
  emits: [
    "update:collapseStatus",
    "collapse",
    "toggle-collapse",
    "submit",
    "submit-invalid",
    "reset"
  ],
  setup: function(props, context) {
    var hasUseTooltip = VXETable.tooltip;
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      collapseAll: props.collapseStatus,
      staticItems: [],
      formItems: []
    });
    var internalData = reactive({
      tooltipTimeout: null,
      tooltipStore: {
        item: null,
        visible: false
      }
    });
    var refElem = ref();
    var refTooltip = ref();
    var formMethods = {};
    var computeValidOpts = computed(function() {
      return Object.assign({}, GlobalConfig.form.validConfig, props.validConfig);
    });
    var computeTooltipOpts = computed(function() {
      return Object.assign({}, GlobalConfig.tooltip, GlobalConfig.form.tooltipConfig, props.tooltipConfig);
    });
    var refMaps = {
      refElem
    };
    var computeMaps = {
      computeSize,
      computeValidOpts,
      computeTooltipOpts
    };
    var $xeform = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      },
      getComputeMaps: function() {
        return computeMaps;
      }
    };
    var callSlot = function(slotFunc, params) {
      if (slotFunc) {
        if (XEUtils$1.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null;
        }
        if (XEUtils$1.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc(params));
        }
      }
      return [];
    };
    var loadItem = function(list) {
      if (list.length) {
        if (process.env.NODE_ENV === "development") {
          list.forEach(function(item) {
            if (item.slots) {
              XEUtils$1.each(item.slots, function(func) {
                if (!XEUtils$1.isFunction(func)) {
                  if (!slots[func]) {
                    errLog("vxe.error.notSlot", [func]);
                  }
                }
              });
            }
          });
        }
        reactData.staticItems = XEUtils$1.mapTree(list, function(item) {
          return createItem($xeform, item);
        }, { children: "children" });
      }
      return nextTick();
    };
    var getItems = function() {
      var itemList = [];
      XEUtils$1.eachTree(reactData.formItems, function(item) {
        itemList.push(item);
      }, { children: "children" });
      return itemList;
    };
    var getItemByField = function(field) {
      var rest = XEUtils$1.findTree(reactData.formItems, function(item) {
        return item.field === field;
      }, { children: "children" });
      return rest ? rest.item : null;
    };
    var getCollapseStatus = function() {
      return reactData.collapseAll;
    };
    var toggleCollapse = function() {
      var status = !getCollapseStatus();
      reactData.collapseAll = status;
      emit("update:collapseStatus", status);
      return nextTick();
    };
    var toggleCollapseEvent = function(evnt) {
      toggleCollapse();
      var status = getCollapseStatus();
      formMethods.dispatchEvent("toggle-collapse", { status, collapse: status, data: props.data }, evnt);
      formMethods.dispatchEvent("collapse", { status, collapse: status, data: props.data }, evnt);
    };
    var clearValidate = function(fieldOrItem) {
      if (fieldOrItem) {
        var item = handleFieldOrItem($xeform, fieldOrItem);
        if (item) {
          item.showError = false;
        }
      } else {
        getItems().forEach(function(item2) {
          item2.showError = false;
        });
      }
      return nextTick();
    };
    var reset = function() {
      var data = props.data;
      var itemList = getItems();
      if (data) {
        itemList.forEach(function(item) {
          var field = item.field, resetValue = item.resetValue, itemRender = item.itemRender;
          if (isEnableConf(itemRender)) {
            var compConf = VXETable.renderer.get(itemRender.name);
            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({ data, field, property: field, item, $form: $xeform });
            } else if (field) {
              XEUtils$1.set(data, field, resetValue === null ? getResetValue(XEUtils$1.get(data, field), void 0) : XEUtils$1.clone(resetValue, true));
            }
          }
        });
      }
      return clearValidate();
    };
    var resetEvent = function(evnt) {
      evnt.preventDefault();
      reset();
      formMethods.dispatchEvent("reset", { data: props.data }, evnt);
    };
    var handleFocus = function(fields) {
      var el = refElem.value;
      for (var i = 0; i < fields.length; i++) {
        var property2 = fields[i];
        var item = getItemByField(property2);
        if (item && isEnableConf(item.itemRender)) {
          var itemRender = item.itemRender;
          var compConf = VXETable.renderer.get(itemRender.name);
          var inputElem = null;
          if (!i) {
            scrollToView(el.querySelector(".".concat(item.id)));
          }
          if (itemRender.autofocus) {
            inputElem = el.querySelector(".".concat(item.id, " ").concat(itemRender.autofocus));
          }
          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = el.querySelector(".".concat(item.id, " ").concat(compConf.autofocus));
          }
          if (inputElem) {
            inputElem.focus();
            break;
          }
        }
      }
    };
    var validItemRules = function(validType, property2, val) {
      var data = props.data, formRules = props.rules;
      var errorRules = [];
      var syncVailds = [];
      if (property2 && formRules) {
        var rules_1 = XEUtils$1.get(formRules, property2);
        if (rules_1) {
          var itemValue_1 = XEUtils$1.isUndefined(val) ? XEUtils$1.get(data, property2) : val;
          rules_1.forEach(function(rule) {
            var type = rule.type, trigger = rule.trigger, required = rule.required;
            if (validType === "all" || !trigger || validType === trigger) {
              if (XEUtils$1.isFunction(rule.validator)) {
                var customValid = rule.validator({
                  itemValue: itemValue_1,
                  rule,
                  rules: rules_1,
                  data,
                  field: property2,
                  property: property2,
                  $form: $xeform
                });
                if (customValid) {
                  if (XEUtils$1.isError(customValid)) {
                    errorRules.push(new Rule({ type: "custom", trigger, content: customValid.message, rule: new Rule(rule) }));
                  } else if (customValid.catch) {
                    syncVailds.push(customValid.catch(function(e) {
                      errorRules.push(new Rule({ type: "custom", trigger, content: e ? e.message : rule.content || rule.message, rule: new Rule(rule) }));
                    }));
                  }
                }
              } else {
                var isArrType = type === "array";
                var hasEmpty = isArrType || XEUtils$1.isArray(itemValue_1) ? !XEUtils$1.isArray(itemValue_1) || !itemValue_1.length : eqEmptyValue(itemValue_1);
                if (required ? hasEmpty || validErrorRuleValue(rule, itemValue_1) : !hasEmpty && validErrorRuleValue(rule, itemValue_1)) {
                  errorRules.push(new Rule(rule));
                }
              }
            }
          });
        }
      }
      return Promise.all(syncVailds).then(function() {
        if (errorRules.length) {
          var rest = { rules: errorRules, rule: errorRules[0] };
          return Promise.reject(rest);
        }
      });
    };
    var showErrTime;
    var beginValidate = function(itemList, type, callback) {
      var data = props.data, formRules = props.rules;
      var validOpts = computeValidOpts.value;
      var validRest = {};
      var validFields = [];
      var itemValids = [];
      clearTimeout(showErrTime);
      if (data && formRules) {
        itemList.forEach(function(item) {
          var field = item.field;
          if (field && !isHiddenItem($xeform, item) && isActivetem($xeform, item)) {
            itemValids.push(validItemRules(type || "all", field).then(function() {
              item.errRule = null;
            }).catch(function(_a) {
              var rule = _a.rule, rules = _a.rules;
              var rest = { rule, rules, data, field, property: field, $form: $xeform };
              if (!validRest[field]) {
                validRest[field] = [];
              }
              validRest[field].push(rest);
              validFields.push(field);
              item.errRule = rule;
              return Promise.reject(rest);
            }));
          }
        });
        return Promise.all(itemValids).then(function() {
          if (callback) {
            callback();
          }
        }).catch(function() {
          return new Promise(function(resolve) {
            showErrTime = window.setTimeout(function() {
              itemList.forEach(function(item) {
                if (item.errRule) {
                  item.showError = true;
                }
              });
            }, 20);
            if (validOpts.autoPos !== false) {
              nextTick(function() {
                handleFocus(validFields);
              });
            }
            if (callback) {
              callback(validRest);
              resolve();
            } else {
              resolve(validRest);
            }
          });
        });
      }
      if (callback) {
        callback();
      }
      return Promise.resolve();
    };
    var validate = function(callback) {
      clearValidate();
      return beginValidate(getItems(), "", callback);
    };
    var validateField = function(fieldOrItem, callback) {
      var item = handleFieldOrItem($xeform, fieldOrItem);
      return beginValidate(item ? [item] : [], "", callback);
    };
    var submitEvent = function(evnt) {
      evnt.preventDefault();
      if (!props.preventSubmit) {
        clearValidate();
        beginValidate(getItems()).then(function(errMap) {
          if (errMap) {
            formMethods.dispatchEvent("submit-invalid", { data: props.data, errMap }, evnt);
          } else {
            formMethods.dispatchEvent("submit", { data: props.data }, evnt);
          }
        });
      }
    };
    var closeTooltip = function() {
      var tooltipStore = internalData.tooltipStore;
      var $tooltip = refTooltip.value;
      if (tooltipStore.visible) {
        Object.assign(tooltipStore, {
          item: null,
          visible: false
        });
        if ($tooltip) {
          $tooltip.close();
        }
      }
      return nextTick();
    };
    var triggerTitleTipEvent = function(evnt, params) {
      var item = params.item;
      var tooltipStore = internalData.tooltipStore;
      var $tooltip = refTooltip.value;
      var overflowElem = evnt.currentTarget.children[0];
      var content = (overflowElem.textContent || "").trim();
      var isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth;
      clearTimeout(internalData.tooltipTimeout);
      if (tooltipStore.item !== item) {
        closeTooltip();
      }
      if (content && isCellOverflow) {
        Object.assign(tooltipStore, {
          item,
          visible: true
        });
        if ($tooltip) {
          $tooltip.open(overflowElem, content);
        }
      }
    };
    var handleTitleTipLeaveEvent = function() {
      var tooltipOpts = computeTooltipOpts.value;
      var $tooltip = refTooltip.value;
      if ($tooltip) {
        $tooltip.setActived(false);
      }
      if (tooltipOpts.enterable) {
        internalData.tooltipTimeout = setTimeout(function() {
          $tooltip = refTooltip.value;
          if ($tooltip && !$tooltip.isActived()) {
            closeTooltip();
          }
        }, tooltipOpts.leaveDelay);
      } else {
        closeTooltip();
      }
    };
    var triggerItemEvent = function(evnt, field, itemValue) {
      if (field) {
        return validItemRules(evnt ? ["blur"].includes(evnt.type) ? "blur" : "change" : "all", field, itemValue).then(function() {
          clearValidate(field);
        }).catch(function(_a) {
          var rule = _a.rule;
          var item = getItemByField(field);
          if (item) {
            item.showError = true;
            item.errRule = rule;
          }
        });
      }
      return nextTick();
    };
    var updateStatus = function(scope, itemValue) {
      var field = scope.field;
      return triggerItemEvent(new Event("change"), field, itemValue);
    };
    formMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $form: $xeform, $event: evnt }, params));
      },
      reset,
      validate,
      validateField,
      clearValidate,
      updateStatus,
      toggleCollapse,
      getItems,
      getItemByField,
      closeTooltip
    };
    var formPrivateMethods = {
      callSlot,
      triggerItemEvent,
      toggleCollapseEvent,
      triggerTitleTipEvent,
      handleTitleTipLeaveEvent
    };
    Object.assign($xeform, formMethods, formPrivateMethods);
    watch(function() {
      return reactData.staticItems;
    }, function(value) {
      reactData.formItems = value;
    });
    watch(function() {
      return props.items;
    }, function(value) {
      loadItem(value || []);
    });
    watch(function() {
      return props.collapseStatus;
    }, function(value) {
      reactData.collapseAll = !!value;
    });
    onMounted(function() {
      nextTick(function() {
        if (process.env.NODE_ENV === "development") {
          if (props.customLayout && props.items) {
            errLog("vxe.error.errConflicts", ["custom-layout", "items"]);
          }
        }
        loadItem(props.items || []);
      });
    });
    var renderVN = function() {
      var _a;
      var loading = props.loading, className = props.className, data = props.data, customLayout = props.customLayout;
      var formItems = reactData.formItems;
      var vSize = computeSize.value;
      var tooltipOpts = computeTooltipOpts.value;
      var defaultSlot = slots.default;
      return h("form", {
        ref: refElem,
        class: ["vxe-form", className ? XEUtils$1.isFunction(className) ? className({ items: formItems, data, $form: $xeform }) : className : "", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--loading"] = loading, _a)],
        onSubmit: submitEvent,
        onReset: resetEvent
      }, [
        h("div", {
          class: "vxe-form--wrapper vxe-row"
        }, customLayout ? defaultSlot ? defaultSlot({}) : [] : formItems.map(function(item, index) {
          return h(VxeFormConfigItem, {
            key: index,
            itemConfig2: item,
            itemConfig: item
          });
        })),
        h("div", {
          class: "vxe-form-slots",
          ref: "hideItem"
        }, customLayout ? [] : defaultSlot ? defaultSlot({}) : []),
        /**
         * 加载中
         */
        h(VxeLoading, {
          class: "vxe-form--loading",
          modelValue: loading
        }),
        /**
         * 工具提示
         */
        hasUseTooltip ? h(resolveComponent("vxe-tooltip"), __assign$5({ ref: refTooltip }, tooltipOpts)) : createCommentVNode()
      ]);
    };
    $xeform.renderVN = renderVN;
    provide("$xeform", $xeform);
    provide("$xeformgather", null);
    provide("$xeformitem", null);
    provide("$xeformiteminfo", null);
    return $xeform;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeFormComponent, {
  install: function(app) {
    app.component(VxeFormComponent.name, VxeFormComponent);
  }
});
dynamicApp.component(VxeFormComponent.name, VxeFormComponent);
var __assign$4 = globalThis && globalThis.__assign || function() {
  __assign$4 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$4.apply(this, arguments);
};
var formItemProps = {
  title: String,
  field: String,
  span: [String, Number],
  align: String,
  titleAlign: {
    type: String,
    default: null
  },
  titleWidth: {
    type: [String, Number],
    default: null
  },
  titleColon: {
    type: Boolean,
    default: null
  },
  titleAsterisk: {
    type: Boolean,
    default: null
  },
  className: [String, Function],
  titleOverflow: {
    type: [Boolean, String],
    default: null
  },
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: { default: null },
  visibleMethod: Function,
  visible: { type: Boolean, default: null },
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object
};
const VxeFormItemComponent = defineComponent({
  name: "VxeFormItem",
  props: formItemProps,
  setup: function(props, _a) {
    var slots = _a.slots;
    var refElem = ref();
    var $xeform = inject("$xeform", {});
    var formGather = inject("$xeformgather", null);
    var formItem = reactive(createItem($xeform, props));
    var xeformitem = { formItem };
    var xeformiteminfo = { itemConfig: formItem };
    formItem.slots = slots;
    provide("$xeformiteminfo", xeformiteminfo);
    provide("$xeformitem", xeformitem);
    provide("$xeformgather", null);
    watchItem(props, formItem);
    onMounted(function() {
      assemItem($xeform, refElem.value, formItem, formGather);
    });
    onUnmounted(function() {
      destroyItem($xeform, formItem);
    });
    var renderItem = function($xeform2, item) {
      var props2 = $xeform2.props, reactData = $xeform2.reactData;
      var data = props2.data, rules = props2.rules, allTitleAlign = props2.titleAlign, allTitleWidth = props2.titleWidth, allTitleColon = props2.titleColon, allTitleAsterisk = props2.titleAsterisk, allTitleOverflow = props2.titleOverflow;
      var collapseAll = reactData.collapseAll;
      var computeValidOpts = $xeform2.getComputeMaps().computeValidOpts;
      var validOpts = computeValidOpts.value;
      var slots2 = item.slots, title = item.title, visible = item.visible, folding = item.folding, field = item.field, collapseNode = item.collapseNode, itemRender = item.itemRender, showError = item.showError, errRule = item.errRule, className = item.className, titleOverflow = item.titleOverflow;
      var compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null;
      var itemClassName = compConf ? compConf.itemClassName : "";
      var defaultSlot = slots2 ? slots2.default : null;
      var titleSlot = slots2 ? slots2.title : null;
      var span = item.span || props2.span;
      var align = item.align || props2.align;
      var titleAlign = XEUtils$1.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign;
      var titleWidth = XEUtils$1.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth;
      var titleColon = XEUtils$1.eqNull(item.titleColon) ? allTitleColon : item.titleColon;
      var titleAsterisk = XEUtils$1.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk;
      var itemOverflow = XEUtils$1.isUndefined(titleOverflow) || XEUtils$1.isNull(titleOverflow) ? allTitleOverflow : titleOverflow;
      var showEllipsis = itemOverflow === "ellipsis";
      var showTitle = itemOverflow === "title";
      var showTooltip = itemOverflow === true || itemOverflow === "tooltip";
      var hasEllipsis = showTitle || showTooltip || showEllipsis;
      var params = { data, field, property: field, item, $form: $xeform2 };
      var isRequired = false;
      if (visible === false) {
        return createCommentVNode();
      }
      if (rules) {
        var itemRules = rules[field];
        if (itemRules) {
          isRequired = itemRules.some(function(rule) {
            return rule.required;
          });
        }
      }
      var contentVNs = [];
      if (defaultSlot) {
        contentVNs = $xeform2.callSlot(defaultSlot, params);
      } else if (compConf && compConf.renderItemContent) {
        contentVNs = getSlotVNs(compConf.renderItemContent(itemRender, params));
      } else if (field) {
        contentVNs = ["".concat(XEUtils$1.get(data, field))];
      }
      if (collapseNode) {
        contentVNs.push(h("div", {
          class: "vxe-form--item-trigger-node",
          onClick: $xeform2.toggleCollapseEvent
        }, [
          h("span", {
            class: "vxe-form--item-trigger-text"
          }, collapseAll ? GlobalConfig.i18n("vxe.form.unfolding") : GlobalConfig.i18n("vxe.form.folding")),
          h("i", {
            class: ["vxe-form--item-trigger-icon", collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
          })
        ]));
      }
      if (errRule && validOpts.showMessage) {
        contentVNs.push(h("div", {
          class: "vxe-form--item-valid",
          style: errRule.maxWidth ? {
            width: "".concat(errRule.maxWidth, "px")
          } : null
        }, errRule.message));
      }
      var ons = showTooltip ? {
        onMouseenter: function(evnt) {
          $xeform2.triggerTitleTipEvent(evnt, params);
        },
        onMouseleave: $xeform2.handleTitleTipLeaveEvent
      } : {};
      return h("div", {
        ref: refElem,
        class: [
          "vxe-form--item",
          item.id,
          span ? "vxe-col--".concat(span, " is--span") : "",
          className ? XEUtils$1.isFunction(className) ? className(params) : className : "",
          itemClassName ? XEUtils$1.isFunction(itemClassName) ? itemClassName(params) : itemClassName : "",
          {
            "is--title": title,
            "is--colon": titleColon,
            "is--asterisk": titleAsterisk,
            "is--required": isRequired,
            "is--hidden": folding && collapseAll,
            "is--active": isActivetem($xeform2, item),
            "is--error": showError
          }
        ]
      }, [
        h("div", {
          class: "vxe-form--item-inner"
        }, [
          title || titleSlot ? h("div", __assign$4({ class: ["vxe-form--item-title", titleAlign ? "align--".concat(titleAlign) : null, {
            "is--ellipsis": hasEllipsis
          }], style: titleWidth ? {
            width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
          } : null, title: showTitle ? getFuncText(title) : null }, ons), renderTitle($xeform2, item)) : null,
          h("div", {
            class: ["vxe-form--item-content", align ? "align--".concat(align) : null]
          }, contentVNs)
        ])
      ]);
    };
    var renderVN = function() {
      var formProps = $xeform ? $xeform.props : null;
      return formProps && formProps.customLayout ? renderItem($xeform, formItem) : h("div", {
        ref: refElem
      });
    };
    var $xeformitem = {
      renderVN
    };
    return $xeformitem;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeFormItemComponent, {
  install: function(app) {
    app.component(VxeFormItemComponent.name, VxeFormItemComponent);
  }
});
dynamicApp.component(VxeFormItemComponent.name, VxeFormItemComponent);
const VxeFormGatherComponent = defineComponent({
  name: "VxeFormGather",
  props: formItemProps,
  setup: function(props, _a) {
    var slots = _a.slots;
    var refElem = ref();
    var $xeform = inject("$xeform", {});
    var formGather = inject("$xeformgather", null);
    var defaultSlot = slots.default;
    var formItem = reactive(createItem($xeform, props));
    var xeformitem = { formItem };
    var xeformiteminfo = { itemConfig: formItem };
    formItem.children = [];
    provide("$xeformiteminfo", xeformiteminfo);
    provide("$xeformgather", xeformitem);
    provide("$xeformitem", null);
    watchItem(props, formItem);
    onMounted(function() {
      assemItem($xeform, refElem.value, formItem, formGather);
    });
    onUnmounted(function() {
      destroyItem($xeform, formItem);
    });
    if (process.env.NODE_ENV === "development") {
      nextTick(function() {
        if ($xeform && $xeform.props.customLayout) {
          errLog("vxe.error.errConflicts", ["custom-layout", "<form-gather ...>"]);
        }
      });
    }
    var renderVN = function() {
      return h("div", {
        ref: refElem
      }, defaultSlot ? defaultSlot() : []);
    };
    var $xeformgather = {
      renderVN
    };
    return $xeformgather;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeFormGatherComponent, {
  install: function(app) {
    app.component(VxeFormGatherComponent.name, VxeFormGatherComponent);
  }
});
dynamicApp.component(VxeFormGatherComponent.name, VxeFormGatherComponent);
Object.assign(VxeSelectComponent, {
  install: function(app) {
    app.component(VxeSelectComponent.name, VxeSelectComponent);
  }
});
dynamicApp.component(VxeSelectComponent.name, VxeSelectComponent);
var OptionInfo = (
  /** @class */
  function() {
    function OptionInfo2($xeselect, _vm) {
      Object.assign(this, {
        id: XEUtils$1.uniqueId("option_"),
        value: _vm.value,
        label: _vm.label,
        visible: _vm.visible,
        className: _vm.className,
        disabled: _vm.disabled
      });
    }
    OptionInfo2.prototype.update = function(name, value) {
      this[name] = value;
    };
    return OptionInfo2;
  }()
);
function isOption(option) {
  return option instanceof OptionInfo;
}
function createOption($xeselect, _vm) {
  return isOption(_vm) ? _vm : new OptionInfo($xeselect, _vm);
}
function watchOption(props, option) {
  Object.keys(props).forEach(function(name) {
    watch(function() {
      return props[name];
    }, function(value) {
      option.update(name, value);
    });
  });
}
function assemOption($xeselect, el, option, optgroup) {
  var reactData = $xeselect.reactData;
  var staticOptions = reactData.staticOptions;
  var parentElem = el.parentNode;
  var parentOption = optgroup ? optgroup.option : null;
  var parentCols = parentOption ? parentOption.options : staticOptions;
  if (parentElem && parentCols) {
    parentCols.splice(XEUtils$1.arrayIndexOf(parentElem.children, el), 0, option);
    reactData.staticOptions = staticOptions.slice(0);
  }
}
function destroyOption($xeselect, option) {
  var reactData = $xeselect.reactData;
  var staticOptions = reactData.staticOptions;
  var matchObj = XEUtils$1.findTree(staticOptions, function(item) {
    return item.id === option.id;
  }, { children: "options" });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  reactData.staticOptions = staticOptions.slice(0);
}
const VxeOptgroupComponent = defineComponent({
  name: "VxeOptgroup",
  props: {
    label: { type: [String, Number, Boolean], default: "" },
    visible: { type: Boolean, default: null },
    className: [String, Function],
    disabled: Boolean
  },
  setup: function(props, _a) {
    var slots = _a.slots;
    var elem = ref();
    var $xeselect = inject("$xeselect", {});
    var option = createOption($xeselect, props);
    var xeoption = { option };
    option.options = [];
    provide("xeoptgroup", xeoption);
    watchOption(props, option);
    onMounted(function() {
      assemOption($xeselect, elem.value, option);
    });
    onUnmounted(function() {
      destroyOption($xeselect, option);
    });
    return function() {
      return h("div", {
        ref: elem
      }, slots.default ? slots.default() : []);
    };
  }
});
Object.assign(VxeOptgroupComponent, {
  install: function(app) {
    app.component(VxeOptgroupComponent.name, VxeOptgroupComponent);
  }
});
dynamicApp.component(VxeOptgroupComponent.name, VxeOptgroupComponent);
const VxeOptionComponent = defineComponent({
  name: "VxeOption",
  props: {
    value: null,
    label: { type: [String, Number, Boolean], default: "" },
    visible: { type: Boolean, default: null },
    className: [String, Function],
    disabled: Boolean
  },
  setup: function(props, _a) {
    var slots = _a.slots;
    var elem = ref();
    var $xeselect = inject("$xeselect", {});
    var optgroup = inject("xeoptgroup", null);
    var option = createOption($xeselect, props);
    option.slots = slots;
    watchOption(props, option);
    onMounted(function() {
      assemOption($xeselect, elem.value, option, optgroup);
    });
    onUnmounted(function() {
      destroyOption($xeselect, option);
    });
    return function() {
      return h("div", {
        ref: elem
      });
    };
  }
});
Object.assign(VxeOptionComponent, {
  install: function(app) {
    app.component(VxeOptionComponent.name, VxeOptionComponent);
  }
});
dynamicApp.component(VxeOptionComponent.name, VxeOptionComponent);
const VxeSwitchComponent = defineComponent({
  name: "VxeSwitch",
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    size: { type: String, default: function() {
      return GlobalConfig.switch.size || GlobalConfig.size;
    } },
    openLabel: String,
    closeLabel: String,
    openValue: { type: [String, Number, Boolean], default: true },
    closeValue: { type: [String, Number, Boolean], default: false },
    openIcon: String,
    closeIcon: String
  },
  emits: [
    "update:modelValue",
    "change",
    "focus",
    "blur"
  ],
  setup: function(props, context) {
    var emit = context.emit;
    var $xeform = inject("$xeform", null);
    var $xeformiteminfo = inject("$xeformiteminfo", null);
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      isActivated: false,
      hasAnimat: false,
      offsetLeft: 0
    });
    var $xeswitch = {
      xID,
      props,
      context,
      reactData
    };
    var refButton = ref();
    var switchMethods = {};
    var computeOnShowLabel = computed(function() {
      return getFuncText(props.openLabel);
    });
    var computeOffShowLabel = computed(function() {
      return getFuncText(props.closeLabel);
    });
    var computeIsChecked = computed(function() {
      return props.modelValue === props.openValue;
    });
    var _atimeout;
    var clickEvent = function(evnt) {
      if (!props.disabled) {
        var isChecked = computeIsChecked.value;
        clearTimeout(_atimeout);
        var value = isChecked ? props.closeValue : props.openValue;
        reactData.hasAnimat = true;
        emit("update:modelValue", value);
        switchMethods.dispatchEvent("change", { value }, evnt);
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
        }
        _atimeout = setTimeout(function() {
          reactData.hasAnimat = false;
        }, 400);
      }
    };
    var focusEvent = function(evnt) {
      reactData.isActivated = true;
      switchMethods.dispatchEvent("focus", { value: props.modelValue }, evnt);
    };
    var blurEvent = function(evnt) {
      reactData.isActivated = false;
      switchMethods.dispatchEvent("blur", { value: props.modelValue }, evnt);
    };
    switchMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $switch: $xeswitch, $event: evnt }, params));
      },
      focus: function() {
        var btnElem = refButton.value;
        reactData.isActivated = true;
        btnElem.focus();
        return nextTick();
      },
      blur: function() {
        var btnElem = refButton.value;
        btnElem.blur();
        reactData.isActivated = false;
        return nextTick();
      }
    };
    Object.assign($xeswitch, switchMethods);
    var renderVN = function() {
      var _a;
      var disabled = props.disabled, openIcon = props.openIcon, closeIcon = props.closeIcon;
      var isChecked = computeIsChecked.value;
      var vSize = computeSize.value;
      var onShowLabel = computeOnShowLabel.value;
      var offShowLabel = computeOffShowLabel.value;
      return h("div", {
        class: ["vxe-switch", isChecked ? "is--on" : "is--off", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--disabled"] = disabled, _a["is--animat"] = reactData.hasAnimat, _a)]
      }, [
        h("button", {
          ref: refButton,
          class: "vxe-switch--button",
          type: "button",
          disabled,
          onClick: clickEvent,
          onFocus: focusEvent,
          onBlur: blurEvent
        }, [
          h("span", {
            class: "vxe-switch--label vxe-switch--label-on"
          }, [
            openIcon ? h("i", {
              class: ["vxe-switch--label-icon", openIcon]
            }) : createCommentVNode(),
            onShowLabel
          ]),
          h("span", {
            class: "vxe-switch--label vxe-switch--label-off"
          }, [
            closeIcon ? h("i", {
              class: ["vxe-switch--label-icon", closeIcon]
            }) : createCommentVNode(),
            offShowLabel
          ]),
          h("span", {
            class: "vxe-switch--icon"
          })
        ])
      ]);
    };
    $xeswitch.renderVN = renderVN;
    return $xeswitch;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeSwitchComponent, {
  install: function(app) {
    app.component(VxeSwitchComponent.name, VxeSwitchComponent);
  }
});
dynamicApp.component(VxeSwitchComponent.name, VxeSwitchComponent);
var resizeTimeout;
var eventStore = [];
var defaultInterval = 500;
function eventHandle() {
  if (eventStore.length) {
    eventStore.forEach(function(item) {
      item.tarList.forEach(function(observer) {
        var target = observer.target, width = observer.width, heighe = observer.heighe;
        var clientWidth = target.clientWidth;
        var clientHeight = target.clientHeight;
        var rWidth = clientWidth && width !== clientWidth;
        var rHeight = clientHeight && heighe !== clientHeight;
        if (rWidth || rHeight) {
          observer.width = clientWidth;
          observer.heighe = clientHeight;
          setTimeout(item.callback);
        }
      });
    });
    eventListener();
  }
}
function eventListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, GlobalConfig.resizeInterval || defaultInterval);
}
var XEResizeObserver = (
  /** @class */
  function() {
    function XEResizeObserver2(callback) {
      this.tarList = [];
      this.callback = callback;
    }
    XEResizeObserver2.prototype.observe = function(target) {
      var _this = this;
      if (target) {
        var tarList = this.tarList;
        if (!tarList.some(function(observer) {
          return observer.target === target;
        })) {
          tarList.push({
            target,
            width: target.clientWidth,
            heighe: target.clientHeight
          });
        }
        if (!eventStore.length) {
          eventListener();
        }
        if (!eventStore.some(function(item) {
          return item === _this;
        })) {
          eventStore.push(this);
        }
      }
    };
    XEResizeObserver2.prototype.unobserve = function(target) {
      XEUtils$1.remove(eventStore, function(item) {
        return item.tarList.some(function(observer) {
          return observer.target === target;
        });
      });
    };
    XEResizeObserver2.prototype.disconnect = function() {
      var _this = this;
      XEUtils$1.remove(eventStore, function(item) {
        return item === _this;
      });
    };
    return XEResizeObserver2;
  }()
);
function createResizeEvent(callback) {
  if (window.ResizeObserver) {
    return new window.ResizeObserver(callback);
  }
  return new XEResizeObserver(callback);
}
const VxeListComponent = defineComponent({
  name: "VxeList",
  props: {
    data: Array,
    height: [Number, String],
    maxHeight: [Number, String],
    loading: Boolean,
    className: [String, Function],
    size: { type: String, default: function() {
      return GlobalConfig.list.size || GlobalConfig.size;
    } },
    autoResize: { type: Boolean, default: function() {
      return GlobalConfig.list.autoResize;
    } },
    syncResize: [Boolean, String, Number],
    scrollY: Object
  },
  emits: [
    "scroll"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      scrollYLoad: false,
      bodyHeight: 0,
      rowHeight: 0,
      topSpaceHeight: 0,
      items: []
    });
    var refElem = ref();
    var refVirtualWrapper = ref();
    var refVirtualBody = ref();
    var internalData = {
      fullData: [],
      lastScrollLeft: 0,
      lastScrollTop: 0,
      scrollYStore: {
        startIndex: 0,
        endIndex: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0
      }
    };
    var refMaps = {
      refElem
    };
    var $xelist = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var listMethods = {};
    var computeSYOpts = computed(function() {
      return Object.assign({}, GlobalConfig.list.scrollY, props.scrollY);
    });
    var computeStyles = computed(function() {
      var height = props.height, maxHeight = props.maxHeight;
      var style2 = {};
      if (height) {
        style2.height = "".concat(isNaN(height) ? height : "".concat(height, "px"));
      } else if (maxHeight) {
        style2.height = "auto";
        style2.maxHeight = "".concat(isNaN(maxHeight) ? maxHeight : "".concat(maxHeight, "px"));
      }
      return style2;
    });
    var updateYSpace = function() {
      var scrollYLoad = reactData.scrollYLoad;
      var scrollYStore = internalData.scrollYStore, fullData = internalData.fullData;
      reactData.bodyHeight = scrollYLoad ? fullData.length * scrollYStore.rowHeight : 0;
      reactData.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0;
    };
    var handleData = function() {
      var scrollYLoad = reactData.scrollYLoad;
      var fullData = internalData.fullData, scrollYStore = internalData.scrollYStore;
      reactData.items = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0);
      return nextTick();
    };
    var updateYData = function() {
      handleData();
      updateYSpace();
    };
    var computeScrollLoad = function() {
      return nextTick().then(function() {
        var scrollYLoad = reactData.scrollYLoad;
        var scrollYStore = internalData.scrollYStore;
        var virtualBodyElem = refVirtualBody.value;
        var sYOpts = computeSYOpts.value;
        var rowHeight = 0;
        var firstItemElem;
        if (virtualBodyElem) {
          if (sYOpts.sItem) {
            firstItemElem = virtualBodyElem.querySelector(sYOpts.sItem);
          }
          if (!firstItemElem) {
            firstItemElem = virtualBodyElem.children[0];
          }
        }
        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight;
        }
        rowHeight = Math.max(20, rowHeight);
        scrollYStore.rowHeight = rowHeight;
        if (scrollYLoad) {
          var scrollBodyElem = refVirtualWrapper.value;
          var visibleYSize = Math.max(8, Math.ceil(scrollBodyElem.clientHeight / rowHeight));
          var offsetYSize = sYOpts.oSize ? XEUtils$1.toNumber(sYOpts.oSize) : browse.edge ? 10 : 0;
          scrollYStore.offsetSize = offsetYSize;
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex, visibleYSize + offsetYSize, scrollYStore.endIndex);
          updateYData();
        } else {
          updateYSpace();
        }
        reactData.rowHeight = rowHeight;
      });
    };
    var clearScroll = function() {
      var scrollBodyElem = refVirtualWrapper.value;
      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0;
      }
      return nextTick();
    };
    var scrollTo = function(scrollLeft, scrollTop) {
      var scrollBodyElem = refVirtualWrapper.value;
      if (XEUtils$1.isNumber(scrollLeft)) {
        scrollBodyElem.scrollLeft = scrollLeft;
      }
      if (XEUtils$1.isNumber(scrollTop)) {
        scrollBodyElem.scrollTop = scrollTop;
      }
      if (reactData.scrollYLoad) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            nextTick(function() {
              resolve();
            });
          }, 50);
        });
      }
      return nextTick();
    };
    var refreshScroll = function() {
      var lastScrollLeft = internalData.lastScrollLeft, lastScrollTop = internalData.lastScrollTop;
      return clearScroll().then(function() {
        if (lastScrollLeft || lastScrollTop) {
          internalData.lastScrollLeft = 0;
          internalData.lastScrollTop = 0;
          return scrollTo(lastScrollLeft, lastScrollTop);
        }
      });
    };
    var recalculate = function() {
      var el = refElem.value;
      if (el.clientWidth && el.clientHeight) {
        return computeScrollLoad();
      }
      return Promise.resolve();
    };
    var loadYData = function(evnt) {
      var scrollYStore = internalData.scrollYStore;
      var startIndex = scrollYStore.startIndex, endIndex = scrollYStore.endIndex, visibleSize = scrollYStore.visibleSize, offsetSize = scrollYStore.offsetSize, rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.floor(scrollTop / rowHeight);
      var offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize);
      var offsetEndIndex = toVisibleIndex + visibleSize + offsetSize;
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex;
          scrollYStore.endIndex = offsetEndIndex;
          updateYData();
        }
      }
    };
    var scrollEvent = function(evnt) {
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var scrollLeft = scrollBodyElem.scrollLeft;
      var isX = scrollLeft !== internalData.lastScrollLeft;
      var isY = scrollTop !== internalData.lastScrollTop;
      internalData.lastScrollTop = scrollTop;
      internalData.lastScrollLeft = scrollLeft;
      if (reactData.scrollYLoad) {
        loadYData(evnt);
      }
      listMethods.dispatchEvent("scroll", { scrollLeft, scrollTop, isX, isY }, evnt);
    };
    listMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $list: $xelist, $event: evnt }, params));
      },
      /**
       * 加载数据
       * @param {Array} datas 数据
       */
      loadData: function(datas) {
        var scrollYStore = internalData.scrollYStore;
        var sYOpts = computeSYOpts.value;
        var fullData = datas || [];
        Object.assign(scrollYStore, {
          startIndex: 0,
          endIndex: 1,
          visibleSize: 0
        });
        internalData.fullData = fullData;
        reactData.scrollYLoad = !!sYOpts.enabled && sYOpts.gt > -1 && sYOpts.gt <= fullData.length;
        handleData();
        return computeScrollLoad().then(function() {
          refreshScroll();
        });
      },
      /**
       * 重新加载数据
       * @param {Array} datas 数据
       */
      reloadData: function(datas) {
        clearScroll();
        return listMethods.loadData(datas);
      },
      recalculate,
      scrollTo,
      refreshScroll,
      clearScroll
    };
    Object.assign($xelist, listMethods);
    watch(function() {
      return props.data;
    }, function(value) {
      listMethods.loadData(value || []);
    });
    watch(function() {
      return props.syncResize;
    }, function(value) {
      if (value) {
        recalculate();
        nextTick(function() {
          return setTimeout(function() {
            return recalculate();
          });
        });
      }
    });
    var resizeObserver;
    nextTick(function() {
      GlobalEvent.on($xelist, "resize", function() {
        recalculate();
      });
      if (props.autoResize) {
        var el = refElem.value;
        resizeObserver = createResizeEvent(function() {
          return recalculate();
        });
        resizeObserver.observe(el);
      }
      listMethods.loadData(props.data || []);
    });
    onUnmounted(function() {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      GlobalEvent.off($xelist, "resize");
    });
    var renderVN = function() {
      var _a;
      var className = props.className, loading = props.loading;
      var bodyHeight = reactData.bodyHeight, topSpaceHeight = reactData.topSpaceHeight, items = reactData.items;
      var vSize = computeSize.value;
      var styles = computeStyles.value;
      return h("div", {
        ref: refElem,
        class: ["vxe-list", className ? XEUtils$1.isFunction(className) ? className({ $list: $xelist }) : className : "", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--loading"] = loading, _a)]
      }, [
        h("div", {
          ref: refVirtualWrapper,
          class: "vxe-list--virtual-wrapper",
          style: styles,
          onScroll: scrollEvent
        }, [
          h("div", {
            class: "vxe-list--y-space",
            style: {
              height: bodyHeight ? "".concat(bodyHeight, "px") : ""
            }
          }),
          h("div", {
            ref: refVirtualBody,
            class: "vxe-list--body",
            style: {
              marginTop: topSpaceHeight ? "".concat(topSpaceHeight, "px") : ""
            }
          }, slots.default ? slots.default({ items, $list: $xelist }) : [])
        ]),
        /**
         * 加载中
         */
        h(VxeLoading, {
          class: "vxe-list--loading",
          modelValue: loading
        })
      ]);
    };
    $xelist.renderVN = renderVN;
    return $xelist;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxeListComponent, {
  install: function(app) {
    app.component(VxeListComponent.name, VxeListComponent);
  }
});
dynamicApp.component(VxeListComponent.name, VxeListComponent);
const VxePulldownComponent = defineComponent({
  name: "VxePulldown",
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    placement: String,
    size: { type: String, default: function() {
      return GlobalConfig.size;
    } },
    destroyOnClose: Boolean,
    transfer: Boolean
  },
  emits: [
    "update:modelValue",
    "hide-panel"
  ],
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var reactData = reactive({
      inited: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    });
    var refElem = ref();
    var refPulldowContent = ref();
    var refPulldowPnanel = ref();
    var refMaps = {
      refElem
    };
    var $xepulldown = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: function() {
        return refMaps;
      }
    };
    var pulldownMethods = {};
    var updateZindex = function() {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex();
      }
    };
    var isPanelVisible = function() {
      return reactData.visiblePanel;
    };
    var updatePlacement = function() {
      return nextTick().then(function() {
        var transfer = props.transfer, placement = props.placement;
        var panelIndex = reactData.panelIndex, visiblePanel = reactData.visiblePanel;
        if (visiblePanel) {
          var targetElem = refPulldowContent.value;
          var panelElem = refPulldowPnanel.value;
          if (panelElem && targetElem) {
            var targetHeight = targetElem.offsetHeight;
            var targetWidth = targetElem.offsetWidth;
            var panelHeight = panelElem.offsetHeight;
            var panelWidth = panelElem.offsetWidth;
            var marginSize = 5;
            var panelStyle = {
              zIndex: panelIndex
            };
            var _a = getAbsolutePos(targetElem), boundingTop = _a.boundingTop, boundingLeft = _a.boundingLeft, visibleHeight = _a.visibleHeight, visibleWidth = _a.visibleWidth;
            var panelPlacement = "bottom";
            if (transfer) {
              var left = boundingLeft;
              var top_1 = boundingTop + targetHeight;
              if (placement === "top") {
                panelPlacement = "top";
                top_1 = boundingTop - panelHeight;
              } else if (!placement) {
                if (top_1 + panelHeight + marginSize > visibleHeight) {
                  panelPlacement = "top";
                  top_1 = boundingTop - panelHeight;
                }
                if (top_1 < marginSize) {
                  panelPlacement = "bottom";
                  top_1 = boundingTop + targetHeight;
                }
              }
              if (left + panelWidth + marginSize > visibleWidth) {
                left -= left + panelWidth + marginSize - visibleWidth;
              }
              if (left < marginSize) {
                left = marginSize;
              }
              Object.assign(panelStyle, {
                left: "".concat(left, "px"),
                top: "".concat(top_1, "px"),
                minWidth: "".concat(targetWidth, "px")
              });
            } else {
              if (placement === "top") {
                panelPlacement = "top";
                panelStyle.bottom = "".concat(targetHeight, "px");
              } else if (!placement) {
                if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                  if (boundingTop - targetHeight - panelHeight > marginSize) {
                    panelPlacement = "top";
                    panelStyle.bottom = "".concat(targetHeight, "px");
                  }
                }
              }
            }
            reactData.panelStyle = panelStyle;
            reactData.panelPlacement = panelPlacement;
          }
        }
        return nextTick();
      });
    };
    var hidePanelTimeout;
    var showPanel = function() {
      if (!reactData.inited) {
        reactData.inited = true;
      }
      return new Promise(function(resolve) {
        if (!props.disabled) {
          clearTimeout(hidePanelTimeout);
          reactData.isActivated = true;
          reactData.animatVisible = true;
          setTimeout(function() {
            reactData.visiblePanel = true;
            emit("update:modelValue", true);
            updatePlacement();
            setTimeout(function() {
              resolve(updatePlacement());
            }, 40);
          }, 10);
          updateZindex();
        } else {
          nextTick(function() {
            resolve();
          });
        }
      });
    };
    var hidePanel = function() {
      reactData.visiblePanel = false;
      emit("update:modelValue", false);
      return new Promise(function(resolve) {
        if (reactData.animatVisible) {
          hidePanelTimeout = window.setTimeout(function() {
            reactData.animatVisible = false;
            nextTick(function() {
              resolve();
            });
          }, 350);
        } else {
          nextTick(function() {
            resolve();
          });
        }
      });
    };
    var togglePanel = function() {
      if (reactData.visiblePanel) {
        return hidePanel();
      }
      return showPanel();
    };
    var handleGlobalMousewheelEvent = function(evnt) {
      var disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel;
      var panelElem = refPulldowPnanel.value;
      if (!disabled) {
        if (visiblePanel) {
          if (getEventTargetNode(evnt, panelElem).flag) {
            updatePlacement();
          } else {
            hidePanel();
            pulldownMethods.dispatchEvent("hide-panel", {}, evnt);
          }
        }
      }
    };
    var handleGlobalMousedownEvent = function(evnt) {
      var disabled = props.disabled;
      var visiblePanel = reactData.visiblePanel;
      var el = refElem.value;
      var panelElem = refPulldowPnanel.value;
      if (!disabled) {
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag;
        if (visiblePanel && !reactData.isActivated) {
          hidePanel();
          pulldownMethods.dispatchEvent("hide-panel", {}, evnt);
        }
      }
    };
    var handleGlobalBlurEvent = function(evnt) {
      if (reactData.visiblePanel) {
        reactData.isActivated = false;
        hidePanel();
        pulldownMethods.dispatchEvent("hide-panel", {}, evnt);
      }
    };
    pulldownMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $pulldown: $xepulldown, $event: evnt }, params));
      },
      isPanelVisible,
      togglePanel,
      showPanel,
      hidePanel
    };
    Object.assign($xepulldown, pulldownMethods);
    watch(function() {
      return props.modelValue;
    }, function(value) {
      if (value) {
        showPanel();
      } else {
        hidePanel();
      }
    });
    nextTick(function() {
      GlobalEvent.on($xepulldown, "mousewheel", handleGlobalMousewheelEvent);
      GlobalEvent.on($xepulldown, "mousedown", handleGlobalMousedownEvent);
      GlobalEvent.on($xepulldown, "blur", handleGlobalBlurEvent);
    });
    onUnmounted(function() {
      GlobalEvent.off($xepulldown, "mousewheel");
      GlobalEvent.off($xepulldown, "mousedown");
      GlobalEvent.off($xepulldown, "blur");
    });
    var renderVN = function() {
      var _a, _b;
      var destroyOnClose = props.destroyOnClose, transfer = props.transfer, disabled = props.disabled;
      var inited = reactData.inited, isActivated = reactData.isActivated, animatVisible = reactData.animatVisible, visiblePanel = reactData.visiblePanel, panelStyle = reactData.panelStyle, panelPlacement = reactData.panelPlacement;
      var vSize = computeSize.value;
      return h("div", {
        ref: refElem,
        class: ["vxe-pulldown", (_a = {}, _a["size--".concat(vSize)] = vSize, _a["is--visivle"] = visiblePanel, _a["is--disabled"] = disabled, _a["is--active"] = isActivated, _a)]
      }, [
        h("div", {
          ref: refPulldowContent,
          class: "vxe-pulldown--content"
        }, slots.default ? slots.default({ $pulldown: $xepulldown }) : []),
        h(Teleport, {
          to: "body",
          disabled: transfer ? !inited : true
        }, [
          h("div", {
            ref: refPulldowPnanel,
            class: ["vxe-table--ignore-clear vxe-pulldown--panel", (_b = {}, _b["size--".concat(vSize)] = vSize, _b["is--transfer"] = transfer, _b["animat--leave"] = animatVisible, _b["animat--enter"] = visiblePanel, _b)],
            placement: panelPlacement,
            style: panelStyle
          }, slots.dropdown ? [
            h("div", {
              class: "vxe-pulldown--wrapper"
            }, !inited || destroyOnClose && !visiblePanel && !animatVisible ? [] : slots.dropdown({ $pulldown: $xepulldown }))
          ] : [])
        ])
      ]);
    };
    $xepulldown.renderVN = renderVN;
    return $xepulldown;
  },
  render: function() {
    return this.renderVN();
  }
});
Object.assign(VxePulldownComponent, {
  install: function(app) {
    app.component(VxePulldownComponent.name, VxePulldownComponent);
  }
});
dynamicApp.component(VxePulldownComponent.name, VxePulldownComponent);
var __assign$3 = globalThis && globalThis.__assign || function() {
  __assign$3 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$3.apply(this, arguments);
};
var __spreadArray$1 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var renderType$2 = "body";
var lineOffsetSizes = {
  mini: 3,
  small: 2,
  medium: 1
};
const TableBodyComponent = defineComponent({
  name: "VxeTableBody",
  props: {
    tableData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    fixedType: { type: String, default: null }
  },
  setup: function(props) {
    var $xetable = inject("$xetable", {});
    var xesize = inject("xesize", null);
    var xID = $xetable.xID, tableProps2 = $xetable.props, tableContext = $xetable.context, tableReactData = $xetable.reactData, tableInternalData = $xetable.internalData;
    var _a = $xetable.getRefMaps(), refTableHeader = _a.refTableHeader, refTableBody = _a.refTableBody, refTableFooter = _a.refTableFooter, refTableLeftBody = _a.refTableLeftBody, refTableRightBody = _a.refTableRightBody, refValidTooltip = _a.refValidTooltip;
    var _b = $xetable.getComputeMaps(), computeEditOpts = _b.computeEditOpts, computeMouseOpts = _b.computeMouseOpts, computeSYOpts = _b.computeSYOpts, computeEmptyOpts = _b.computeEmptyOpts, computeKeyboardOpts = _b.computeKeyboardOpts, computeTooltipOpts = _b.computeTooltipOpts, computeRadioOpts = _b.computeRadioOpts, computeExpandOpts = _b.computeExpandOpts, computeTreeOpts = _b.computeTreeOpts, computeCheckboxOpts = _b.computeCheckboxOpts, computeValidOpts = _b.computeValidOpts, computeRowOpts = _b.computeRowOpts, computeColumnOpts = _b.computeColumnOpts;
    var refElem = ref();
    var refBodyTable = ref();
    var refBodyColgroup = ref();
    var refBodyTBody = ref();
    var refBodyXSpace = ref();
    var refBodyYSpace = ref();
    var refBodyEmptyBlock = ref();
    var getOffsetSize = function() {
      if (xesize) {
        var vSize = xesize.value;
        if (vSize) {
          return lineOffsetSizes[vSize] || 0;
        }
      }
      return 0;
    };
    var countTreeExpand = function(prevRow, params) {
      var count = 1;
      if (!prevRow) {
        return count;
      }
      var treeOpts = computeTreeOpts.value;
      var rowChildren = prevRow[treeOpts.children];
      if ($xetable.isTreeExpandByRow(prevRow)) {
        for (var index = 0; index < rowChildren.length; index++) {
          count += countTreeExpand(rowChildren[index]);
        }
      }
      return count;
    };
    var calcTreeLine = function(params, items, rIndex) {
      var expandSize = 1;
      if (rIndex) {
        expandSize = countTreeExpand(items[rIndex - 1]);
      }
      return tableReactData.rowHeight * expandSize - (rIndex ? 1 : 12 - getOffsetSize());
    };
    var isOperateMouse = function() {
      var delayHover = tableProps2.delayHover;
      var lastScrollTime = tableInternalData.lastScrollTime, _isResize = tableInternalData._isResize;
      return _isResize || lastScrollTime && Date.now() < lastScrollTime + delayHover;
    };
    var renderLine = function(params) {
      var row = params.row, column = params.column;
      var treeConfig = tableProps2.treeConfig;
      var treeOpts = computeTreeOpts.value;
      var slots = column.slots, treeNode = column.treeNode;
      var fullAllDataRowIdData = tableInternalData.fullAllDataRowIdData;
      var rowid = getRowid($xetable, row);
      var rest = fullAllDataRowIdData[rowid];
      var rLevel = 0;
      var rIndex = 0;
      var items = [];
      if (rest) {
        rLevel = rest.level;
        rIndex = rest._index;
        items = rest.items;
      }
      if (slots && slots.line) {
        return $xetable.callSlot(slots.line, params);
      }
      if (treeConfig && treeNode && treeOpts.line) {
        return [
          h("div", {
            class: "vxe-tree--line-wrapper"
          }, [
            h("div", {
              class: "vxe-tree--line",
              style: {
                height: "".concat(calcTreeLine(params, items, rIndex), "px"),
                left: "".concat(rLevel * treeOpts.indent + (rLevel ? 2 - getOffsetSize() : 0) + 16, "px")
              }
            })
          ])
        ];
      }
      return [];
    };
    var renderColumn = function(seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, columns, items) {
      var _a2;
      var columnKey = tableProps2.columnKey, height = tableProps2.height, allColumnOverflow = tableProps2.showOverflow, allCellClassName = tableProps2.cellClassName, cellStyle = tableProps2.cellStyle, allAlign = tableProps2.align, spanMethod = tableProps2.spanMethod, mouseConfig = tableProps2.mouseConfig, editConfig = tableProps2.editConfig, editRules = tableProps2.editRules, tooltipConfig = tableProps2.tooltipConfig;
      var tableData = tableReactData.tableData, overflowX = tableReactData.overflowX, scrollYLoad = tableReactData.scrollYLoad, currentColumn = tableReactData.currentColumn, mergeList = tableReactData.mergeList, editStore = tableReactData.editStore, validStore = tableReactData.validStore, isAllOverflow = tableReactData.isAllOverflow;
      var afterFullData = tableInternalData.afterFullData;
      var validOpts = computeValidOpts.value;
      var checkboxOpts = computeCheckboxOpts.value;
      var editOpts = computeEditOpts.value;
      var tooltipOpts = computeTooltipOpts.value;
      var rowOpts = computeRowOpts.value;
      var sYOpts = computeSYOpts.value;
      var columnOpts = computeColumnOpts.value;
      var type = column.type, cellRender = column.cellRender, editRender = column.editRender, align = column.align, showOverflow = column.showOverflow, className = column.className, treeNode = column.treeNode;
      var actived = editStore.actived;
      var scrollYRHeight = sYOpts.rHeight;
      var rowHeight = rowOpts.height;
      var renderOpts = editRender || cellRender;
      var compConf = renderOpts ? VXETable.renderer.get(renderOpts.name) : null;
      var cellClassName = compConf ? compConf.cellClassName : "";
      var showAllTip = tooltipOpts.showAll;
      var columnIndex = $xetable.getColumnIndex(column);
      var _columnIndex = $xetable.getVTColumnIndex(column);
      var isEdit = isEnableConf(editRender);
      var fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
      var cellOverflow = XEUtils$1.isUndefined(showOverflow) || XEUtils$1.isNull(showOverflow) ? allColumnOverflow : showOverflow;
      var showEllipsis = cellOverflow === "ellipsis";
      var showTitle = cellOverflow === "title";
      var showTooltip = cellOverflow === true || cellOverflow === "tooltip";
      var hasEllipsis = showTitle || showTooltip || showEllipsis;
      var isDirty;
      var tdOns = {};
      var cellAlign = align || allAlign;
      var hasValidError = validStore.row === row && validStore.column === column;
      var showValidTip = editRules && validOpts.showMessage && (validOpts.message === "default" ? height || tableData.length > 1 : validOpts.message === "inline");
      var attrs = { colid: column.id };
      var params = { $table: $xetable, seq, rowid, row, rowIndex, $rowIndex, _rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed: fixedType, type: renderType$2, isHidden: fixedHiddenColumn, level: rowLevel, visibleData: afterFullData, data: tableData, items };
      if (scrollYLoad && !hasEllipsis) {
        showEllipsis = hasEllipsis = true;
      }
      if (showTitle || showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseenter = function(evnt) {
          if (isOperateMouse()) {
            return;
          }
          if (showTitle) {
            updateCellTitle(evnt.currentTarget, column);
          } else if (showTooltip || showAllTip) {
            $xetable.triggerBodyTooltipEvent(evnt, params);
          }
          $xetable.dispatchEvent("cell-mouseenter", Object.assign({ cell: evnt.currentTarget }, params), evnt);
        };
      }
      if (showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseleave = function(evnt) {
          if (isOperateMouse()) {
            return;
          }
          if (showTooltip || showAllTip) {
            $xetable.handleTargetLeaveEvent(evnt);
          }
          $xetable.dispatchEvent("cell-mouseleave", Object.assign({ cell: evnt.currentTarget }, params), evnt);
        };
      }
      if (checkboxOpts.range || mouseConfig) {
        tdOns.onMousedown = function(evnt) {
          $xetable.triggerCellMousedownEvent(evnt, params);
        };
      }
      tdOns.onClick = function(evnt) {
        $xetable.triggerCellClickEvent(evnt, params);
      };
      tdOns.onDblclick = function(evnt) {
        $xetable.triggerCellDblclickEvent(evnt, params);
      };
      if (mergeList.length) {
        var spanRest = mergeBodyMethod(mergeList, _rowIndex, _columnIndex);
        if (spanRest) {
          var rowspan = spanRest.rowspan, colspan = spanRest.colspan;
          if (!rowspan || !colspan) {
            return null;
          }
          if (rowspan > 1) {
            attrs.rowspan = rowspan;
          }
          if (colspan > 1) {
            attrs.colspan = colspan;
          }
        }
      } else if (spanMethod) {
        var _b2 = spanMethod(params) || {}, _c = _b2.rowspan, rowspan = _c === void 0 ? 1 : _c, _d = _b2.colspan, colspan = _d === void 0 ? 1 : _d;
        if (!rowspan || !colspan) {
          return null;
        }
        if (rowspan > 1) {
          attrs.rowspan = rowspan;
        }
        if (colspan > 1) {
          attrs.colspan = colspan;
        }
      }
      if (fixedHiddenColumn && mergeList) {
        if (attrs.colspan > 1 || attrs.rowspan > 1) {
          fixedHiddenColumn = false;
        }
      }
      if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && (editOpts.showStatus || editOpts.showUpdateStatus)) {
        isDirty = $xetable.isUpdateByRow(row, column.field);
      }
      var tdVNs = [];
      if (fixedHiddenColumn && (allColumnOverflow ? isAllOverflow : allColumnOverflow)) {
        tdVNs.push(h("div", {
          class: ["vxe-cell", {
            "c--title": showTitle,
            "c--tooltip": showTooltip,
            "c--ellipsis": showEllipsis
          }],
          style: {
            maxHeight: hasEllipsis && (scrollYRHeight || rowHeight) ? "".concat(scrollYRHeight || rowHeight, "px") : ""
          }
        }));
      } else {
        tdVNs.push.apply(tdVNs, __spreadArray$1(__spreadArray$1([], renderLine(params), false), [h("div", {
          class: ["vxe-cell", {
            "c--title": showTitle,
            "c--tooltip": showTooltip,
            "c--ellipsis": showEllipsis
          }],
          style: {
            maxHeight: hasEllipsis && (scrollYRHeight || rowHeight) ? "".concat(scrollYRHeight || rowHeight, "px") : ""
          },
          title: showTitle ? $xetable.getCellLabel(row, column) : null
        }, column.renderCell(params))], false));
        if (showValidTip && hasValidError) {
          tdVNs.push(h("div", {
            class: "vxe-cell--valid",
            style: validStore.rule && validStore.rule.maxWidth ? {
              width: "".concat(validStore.rule.maxWidth, "px")
            } : null
          }, [
            h("span", {
              class: "vxe-cell--valid-msg"
            }, validStore.content)
          ]));
        }
      }
      return h("td", __assign$3(__assign$3(__assign$3({ class: [
        "vxe-body--column",
        column.id,
        (_a2 = {}, _a2["col--".concat(cellAlign)] = cellAlign, _a2["col--".concat(type)] = type, _a2["col--last"] = $columnIndex === columns.length - 1, _a2["col--tree-node"] = treeNode, _a2["col--edit"] = isEdit, _a2["col--ellipsis"] = hasEllipsis, _a2["fixed--hidden"] = fixedHiddenColumn, _a2["col--dirty"] = isDirty, _a2["col--actived"] = editConfig && isEdit && (actived.row === row && (actived.column === column || editOpts.mode === "row")), _a2["col--valid-error"] = hasValidError, _a2["col--current"] = currentColumn === column, _a2),
        getPropClass(cellClassName, params),
        getPropClass(className, params),
        getPropClass(allCellClassName, params)
      ], key: columnKey || columnOpts.useKey ? column.id : $columnIndex }, attrs), { style: Object.assign({
        height: hasEllipsis && (scrollYRHeight || rowHeight) ? "".concat(scrollYRHeight || rowHeight, "px") : ""
      }, cellStyle ? XEUtils$1.isFunction(cellStyle) ? cellStyle(params) : cellStyle : null) }), tdOns), tdVNs);
    };
    var renderRows = function(fixedType, tableData, tableColumn) {
      var stripe = tableProps2.stripe, rowKey = tableProps2.rowKey, highlightHoverRow = tableProps2.highlightHoverRow, rowClassName = tableProps2.rowClassName, rowStyle = tableProps2.rowStyle, allColumnOverflow = tableProps2.showOverflow, editConfig = tableProps2.editConfig, treeConfig = tableProps2.treeConfig;
      var hasFixedColumn = tableReactData.hasFixedColumn, treeExpandeds = tableReactData.treeExpandeds, scrollYLoad = tableReactData.scrollYLoad, editStore = tableReactData.editStore, rowExpandeds = tableReactData.rowExpandeds, expandColumn = tableReactData.expandColumn, selectRow = tableReactData.selectRow;
      var fullAllDataRowIdData = tableInternalData.fullAllDataRowIdData;
      var checkboxOpts = computeCheckboxOpts.value;
      var radioOpts = computeRadioOpts.value;
      var treeOpts = computeTreeOpts.value;
      var editOpts = computeEditOpts.value;
      var rowOpts = computeRowOpts.value;
      var transform = treeOpts.transform;
      var rows = [];
      tableData.forEach(function(row, $rowIndex) {
        var trOn = {};
        var rowIndex = $rowIndex;
        rowIndex = $xetable.getRowIndex(row);
        if (rowOpts.isHover || highlightHoverRow) {
          trOn.onMouseenter = function(evnt) {
            if (isOperateMouse()) {
              return;
            }
            $xetable.triggerHoverEvent(evnt, { row, rowIndex });
          };
          trOn.onMouseleave = function() {
            if (isOperateMouse()) {
              return;
            }
            $xetable.clearHoverRow();
          };
        }
        var rowid = getRowid($xetable, row);
        var rest = fullAllDataRowIdData[rowid];
        var rowLevel = 0;
        var seq = -1;
        var _rowIndex = 0;
        if (rest) {
          rowLevel = rest.level;
          seq = rest.seq;
          _rowIndex = rest._index;
        }
        var params = { $table: $xetable, seq, rowid, fixed: fixedType, type: renderType$2, level: rowLevel, row, rowIndex, $rowIndex, _rowIndex };
        var isExpandRow = expandColumn && rowExpandeds.length && $xetable.findRowIndexOf(rowExpandeds, row) > -1;
        var isExpandTree = false;
        var rowChildren = [];
        var isNewRow = false;
        if (editConfig) {
          isNewRow = $xetable.findRowIndexOf(editStore.insertList, row) > -1;
        }
        if (treeConfig && !scrollYLoad && !transform && treeExpandeds.length) {
          rowChildren = row[treeOpts.children];
          isExpandTree = rowChildren && rowChildren.length && $xetable.findRowIndexOf(treeExpandeds, row) > -1;
        }
        rows.push(h("tr", __assign$3({ class: [
          "vxe-body--row",
          treeConfig ? "row--level-".concat(rowLevel) : "",
          {
            "row--stripe": stripe && ($xetable.getVTRowIndex(row) + 1) % 2 === 0,
            "is--new": isNewRow,
            "is--expand-row": isExpandRow,
            "is--expand-tree": isExpandTree,
            "row--new": isNewRow && (editOpts.showStatus || editOpts.showInsertStatus),
            "row--radio": radioOpts.highlight && selectRow === row,
            "row--checked": checkboxOpts.highlight && $xetable.isCheckedByCheckboxRow(row)
          },
          getPropClass(rowClassName, params)
        ], rowid, style: rowStyle ? XEUtils$1.isFunction(rowStyle) ? rowStyle(params) : rowStyle : null, key: rowKey || rowOpts.useKey || treeConfig ? rowid : $rowIndex }, trOn), tableColumn.map(function(column, $columnIndex) {
          return renderColumn(seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData);
        })));
        if (isExpandRow) {
          var expandOpts = computeExpandOpts.value;
          var expandHeight = expandOpts.height;
          var cellStyle = {};
          if (expandHeight) {
            cellStyle.height = "".concat(expandHeight, "px");
          }
          if (treeConfig) {
            cellStyle.paddingLeft = "".concat(rowLevel * treeOpts.indent + 30, "px");
          }
          var showOverflow = expandColumn.showOverflow;
          var hasEllipsis = XEUtils$1.isUndefined(showOverflow) || XEUtils$1.isNull(showOverflow) ? allColumnOverflow : showOverflow;
          var expandParams = { $table: $xetable, seq, column: expandColumn, fixed: fixedType, type: renderType$2, level: rowLevel, row, rowIndex, $rowIndex, _rowIndex };
          rows.push(h("tr", __assign$3({ class: "vxe-body--expanded-row", key: "expand_".concat(rowid), style: rowStyle ? XEUtils$1.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle : null }, trOn), [
            h("td", {
              class: {
                "vxe-body--expanded-column": 1,
                "fixed--hidden": fixedType && !hasFixedColumn,
                "col--ellipsis": hasEllipsis
              },
              colspan: tableColumn.length
            }, [
              h("div", {
                class: {
                  "vxe-body--expanded-cell": 1,
                  "is--ellipsis": expandHeight
                },
                style: cellStyle
              }, [
                expandColumn.renderData(expandParams)
              ])
            ])
          ]));
        }
        if (treeConfig && !scrollYLoad && !transform && treeExpandeds.length) {
          var rowChildren_1 = row[treeOpts.children];
          if (rowChildren_1 && rowChildren_1.length && $xetable.findRowIndexOf(treeExpandeds, row) > -1) {
            rows.push.apply(rows, renderRows(fixedType, rowChildren_1, tableColumn));
          }
        }
      });
      return rows;
    };
    var scrollProcessTimeout;
    var syncBodyScroll = function(fixedType, scrollTop, elem1, elem2) {
      if (elem1 || elem2) {
        if (elem1) {
          removeScrollListener(elem1);
          elem1.scrollTop = scrollTop;
        }
        if (elem2) {
          removeScrollListener(elem2);
          elem2.scrollTop = scrollTop;
        }
        clearTimeout(scrollProcessTimeout);
        scrollProcessTimeout = setTimeout(function() {
          restoreScrollListener(elem1);
          restoreScrollListener(elem2);
        }, 300);
      }
    };
    var scrollEvent = function(evnt) {
      var fixedType = props.fixedType;
      var highlightHoverRow = tableProps2.highlightHoverRow;
      var scrollXLoad = tableReactData.scrollXLoad, scrollYLoad = tableReactData.scrollYLoad;
      var elemStore = tableInternalData.elemStore, lastScrollTop = tableInternalData.lastScrollTop, lastScrollLeft = tableInternalData.lastScrollLeft;
      var rowOpts = computeRowOpts.value;
      var tableHeader = refTableHeader.value;
      var tableBody = refTableBody.value;
      var tableFooter = refTableFooter.value;
      var leftBody = refTableLeftBody.value;
      var rightBody = refTableRightBody.value;
      var validTip = refValidTooltip.value;
      var scrollBodyElem = refElem.value;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      var bodyElem = tableBody.$el;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var bodyYRef = elemStore["main-body-ySpace"];
      var bodyYElem = bodyYRef ? bodyYRef.value : null;
      var bodyXRef = elemStore["main-body-xSpace"];
      var bodyXElem = bodyXRef ? bodyXRef.value : null;
      var bodyHeight = scrollYLoad && bodyYElem ? bodyYElem.clientHeight : bodyElem.clientHeight;
      var bodyWidth = scrollXLoad && bodyXElem ? bodyXElem.clientWidth : bodyElem.clientWidth;
      var scrollTop = scrollBodyElem.scrollTop;
      var scrollLeft = bodyElem.scrollLeft;
      var isRollX = scrollLeft !== lastScrollLeft;
      var isRollY = scrollTop !== lastScrollTop;
      tableInternalData.lastScrollTop = scrollTop;
      tableInternalData.lastScrollLeft = scrollLeft;
      tableInternalData.lastScrollTime = Date.now();
      if (rowOpts.isHover || highlightHoverRow) {
        $xetable.clearHoverRow();
      }
      if (leftElem && fixedType === "left") {
        scrollTop = leftElem.scrollTop;
        syncBodyScroll(fixedType, scrollTop, bodyElem, rightElem);
      } else if (rightElem && fixedType === "right") {
        scrollTop = rightElem.scrollTop;
        syncBodyScroll(fixedType, scrollTop, bodyElem, leftElem);
      } else {
        if (isRollX) {
          if (headerElem) {
            headerElem.scrollLeft = bodyElem.scrollLeft;
          }
          if (footerElem) {
            footerElem.scrollLeft = bodyElem.scrollLeft;
          }
        }
        if (leftElem || rightElem) {
          $xetable.checkScrolling();
          if (isRollY) {
            syncBodyScroll(fixedType, scrollTop, leftElem, rightElem);
          }
        }
      }
      if (scrollXLoad && isRollX) {
        $xetable.triggerScrollXEvent(evnt);
      }
      if (scrollYLoad && isRollY) {
        $xetable.triggerScrollYEvent(evnt);
      }
      if (isRollX && validTip && validTip.reactData.visible) {
        validTip.updatePlacement();
      }
      $xetable.dispatchEvent("scroll", {
        type: renderType$2,
        fixed: fixedType,
        scrollTop,
        scrollLeft,
        scrollHeight: bodyElem.scrollHeight,
        scrollWidth: bodyElem.scrollWidth,
        bodyHeight,
        bodyWidth,
        isX: isRollX,
        isY: isRollY
      }, evnt);
    };
    var wheelTime;
    var wheelYSize = 0;
    var wheelYInterval = 0;
    var wheelYTotal = 0;
    var isPrevWheelTop = false;
    var handleWheel = function(evnt, isTopWheel, deltaTop, isRollX, isRollY) {
      var elemStore = tableInternalData.elemStore;
      var scrollXLoad = tableReactData.scrollXLoad, scrollYLoad = tableReactData.scrollYLoad;
      var tableBody = refTableBody.value;
      var leftBody = refTableLeftBody.value;
      var rightBody = refTableRightBody.value;
      var leftElem = leftBody ? leftBody.$el : null;
      var rightElem = rightBody ? rightBody.$el : null;
      var bodyElem = tableBody.$el;
      var bodyYRef = elemStore["main-body-ySpace"];
      var bodyYElem = bodyYRef ? bodyYRef.value : null;
      var bodyXRef = elemStore["main-body-xSpace"];
      var bodyXElem = bodyXRef ? bodyXRef.value : null;
      var bodyHeight = scrollYLoad && bodyYElem ? bodyYElem.clientHeight : bodyElem.clientHeight;
      var bodyWidth = scrollXLoad && bodyXElem ? bodyXElem.clientWidth : bodyElem.clientWidth;
      var remainSize = isPrevWheelTop === isTopWheel ? Math.max(0, wheelYSize - wheelYTotal) : 0;
      isPrevWheelTop = isTopWheel;
      wheelYSize = Math.abs(isTopWheel ? deltaTop - remainSize : deltaTop + remainSize);
      wheelYInterval = 0;
      wheelYTotal = 0;
      clearTimeout(wheelTime);
      var handleSmooth = function() {
        if (wheelYTotal < wheelYSize) {
          var fixedType = props.fixedType;
          wheelYInterval = Math.max(5, Math.floor(wheelYInterval * 1.5));
          wheelYTotal = wheelYTotal + wheelYInterval;
          if (wheelYTotal > wheelYSize) {
            wheelYInterval = wheelYInterval - (wheelYTotal - wheelYSize);
          }
          var scrollTop = bodyElem.scrollTop, clientHeight = bodyElem.clientHeight, scrollHeight = bodyElem.scrollHeight;
          var targerTop = scrollTop + wheelYInterval * (isTopWheel ? -1 : 1);
          bodyElem.scrollTop = targerTop;
          if (leftElem) {
            leftElem.scrollTop = targerTop;
          }
          if (rightElem) {
            rightElem.scrollTop = targerTop;
          }
          if (isTopWheel ? targerTop < scrollHeight - clientHeight : targerTop >= 0) {
            wheelTime = setTimeout(handleSmooth, 10);
          }
          $xetable.dispatchEvent("scroll", {
            type: renderType$2,
            fixed: fixedType,
            scrollTop: bodyElem.scrollTop,
            scrollLeft: bodyElem.scrollLeft,
            scrollHeight: bodyElem.scrollHeight,
            scrollWidth: bodyElem.scrollWidth,
            bodyHeight,
            bodyWidth,
            isX: isRollX,
            isY: isRollY
          }, evnt);
        }
      };
      handleSmooth();
    };
    var wheelEvent = function(evnt) {
      var deltaY = evnt.deltaY, deltaX = evnt.deltaX;
      var highlightHoverRow = tableProps2.highlightHoverRow;
      var scrollYLoad = tableReactData.scrollYLoad;
      var lastScrollTop = tableInternalData.lastScrollTop, lastScrollLeft = tableInternalData.lastScrollLeft;
      var rowOpts = computeRowOpts.value;
      var tableBody = refTableBody.value;
      var scrollBodyElem = refElem.value;
      var bodyElem = tableBody.$el;
      var deltaTop = deltaY;
      var deltaLeft = deltaX;
      var isTopWheel = deltaTop < 0;
      if (isTopWheel ? scrollBodyElem.scrollTop <= 0 : scrollBodyElem.scrollTop >= scrollBodyElem.scrollHeight - scrollBodyElem.clientHeight) {
        return;
      }
      var scrollTop = scrollBodyElem.scrollTop + deltaTop;
      var scrollLeft = bodyElem.scrollLeft + deltaLeft;
      var isRollX = scrollLeft !== lastScrollLeft;
      var isRollY = scrollTop !== lastScrollTop;
      if (isRollY) {
        evnt.preventDefault();
        tableInternalData.lastScrollTop = scrollTop;
        tableInternalData.lastScrollLeft = scrollLeft;
        tableInternalData.lastScrollTime = Date.now();
        if (rowOpts.isHover || highlightHoverRow) {
          $xetable.clearHoverRow();
        }
        handleWheel(evnt, isTopWheel, deltaTop, isRollX, isRollY);
        if (scrollYLoad) {
          $xetable.triggerScrollYEvent(evnt);
        }
      }
    };
    onMounted(function() {
      nextTick(function() {
        var fixedType = props.fixedType;
        var elemStore = tableInternalData.elemStore;
        var prefix = "".concat(fixedType || "main", "-body-");
        var el = refElem.value;
        elemStore["".concat(prefix, "wrapper")] = refElem;
        elemStore["".concat(prefix, "table")] = refBodyTable;
        elemStore["".concat(prefix, "colgroup")] = refBodyColgroup;
        elemStore["".concat(prefix, "list")] = refBodyTBody;
        elemStore["".concat(prefix, "xSpace")] = refBodyXSpace;
        elemStore["".concat(prefix, "ySpace")] = refBodyYSpace;
        elemStore["".concat(prefix, "emptyBlock")] = refBodyEmptyBlock;
        el.onscroll = scrollEvent;
        el._onscroll = scrollEvent;
      });
    });
    onBeforeUnmount(function() {
      var el = refElem.value;
      clearTimeout(wheelTime);
      el._onscroll = null;
      el.onscroll = null;
    });
    onUnmounted(function() {
      var fixedType = props.fixedType;
      var elemStore = tableInternalData.elemStore;
      var prefix = "".concat(fixedType || "main", "-body-");
      elemStore["".concat(prefix, "wrapper")] = null;
      elemStore["".concat(prefix, "table")] = null;
      elemStore["".concat(prefix, "colgroup")] = null;
      elemStore["".concat(prefix, "list")] = null;
      elemStore["".concat(prefix, "xSpace")] = null;
      elemStore["".concat(prefix, "ySpace")] = null;
      elemStore["".concat(prefix, "emptyBlock")] = null;
    });
    var renderVN = function() {
      var fixedColumn = props.fixedColumn, fixedType = props.fixedType, tableColumn = props.tableColumn;
      var keyboardConfig = tableProps2.keyboardConfig, allColumnOverflow = tableProps2.showOverflow, spanMethod = tableProps2.spanMethod, mouseConfig = tableProps2.mouseConfig;
      var tableData = tableReactData.tableData, mergeList = tableReactData.mergeList, scrollYLoad = tableReactData.scrollYLoad, isAllOverflow = tableReactData.isAllOverflow;
      var visibleColumn = tableInternalData.visibleColumn;
      var slots = tableContext.slots;
      var sYOpts = computeSYOpts.value;
      var emptyOpts = computeEmptyOpts.value;
      var keyboardOpts = computeKeyboardOpts.value;
      var mouseOpts = computeMouseOpts.value;
      if (fixedType) {
        if (scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow)) {
          if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
            tableColumn = fixedColumn;
          } else {
            tableColumn = visibleColumn;
          }
        } else {
          tableColumn = visibleColumn;
        }
      }
      var emptyContent;
      if (slots.empty) {
        emptyContent = $xetable.callSlot(slots.empty, { $table: $xetable });
      } else {
        var compConf = emptyOpts.name ? VXETable.renderer.get(emptyOpts.name) : null;
        var renderEmpty = compConf ? compConf.renderEmpty : null;
        if (renderEmpty) {
          emptyContent = getSlotVNs(renderEmpty(emptyOpts, { $table: $xetable }));
        } else {
          emptyContent = tableProps2.emptyText || GlobalConfig.i18n("vxe.table.emptyText");
        }
      }
      return h("div", __assign$3({ ref: refElem, class: ["vxe-table--body-wrapper", fixedType ? "fixed-".concat(fixedType, "--wrapper") : "body--wrapper"], xid: xID }, sYOpts.mode === "wheel" ? { onWheel: wheelEvent } : {}), [
        fixedType ? createCommentVNode() : h("div", {
          ref: refBodyXSpace,
          class: "vxe-body--x-space"
        }),
        h("div", {
          ref: refBodyYSpace,
          class: "vxe-body--y-space"
        }),
        h("table", {
          ref: refBodyTable,
          class: "vxe-table--body",
          xid: xID,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          /**
           * 列宽
           */
          h("colgroup", {
            ref: refBodyColgroup
          }, tableColumn.map(function(column, $columnIndex) {
            return h("col", {
              name: column.id,
              key: $columnIndex
            });
          })),
          /**
           * 内容
           */
          h("tbody", {
            ref: refBodyTBody
          }, renderRows(fixedType, tableData, tableColumn))
        ]),
        h("div", {
          class: "vxe-table--checkbox-range"
        }),
        mouseConfig && mouseOpts.area ? h("div", {
          class: "vxe-table--cell-area"
        }, [
          h("span", {
            class: "vxe-table--cell-main-area"
          }, mouseOpts.extension ? [
            h("span", {
              class: "vxe-table--cell-main-area-btn",
              onMousedown: function(evnt) {
                $xetable.triggerCellExtendMousedownEvent(evnt, { $table: $xetable, fixed: fixedType, type: renderType$2 });
              }
            })
          ] : []),
          h("span", {
            class: "vxe-table--cell-copy-area"
          }),
          h("span", {
            class: "vxe-table--cell-extend-area"
          }),
          h("span", {
            class: "vxe-table--cell-multi-area"
          }),
          h("span", {
            class: "vxe-table--cell-active-area"
          })
        ]) : null,
        !fixedType ? h("div", {
          class: "vxe-table--empty-block",
          ref: refBodyEmptyBlock
        }, [
          h("div", {
            class: "vxe-table--empty-content"
          }, emptyContent)
        ]) : null
      ]);
    };
    return renderVN;
  }
});
var getAllColumns = function(columns, parentColumn) {
  var result = [];
  columns.forEach(function(column) {
    column.parentId = parentColumn ? parentColumn.id : null;
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(function(column2) {
        return column2.visible;
      })) {
        result.push(column);
        result.push.apply(result, getAllColumns(column.children, column));
      } else {
        result.push(column);
      }
    }
  });
  return result;
};
var convertToRows = function(originColumns) {
  var maxLevel = 1;
  var traverse = function(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children && column.children.length && column.children.some(function(column2) {
      return column2.visible;
    })) {
      var colSpan_1 = 0;
      column.children.forEach(function(subColumn) {
        if (subColumn.visible) {
          traverse(subColumn, column);
          colSpan_1 += subColumn.colSpan;
        }
      });
      column.colSpan = colSpan_1;
    } else {
      column.colSpan = 1;
    }
  };
  originColumns.forEach(function(column) {
    column.level = 1;
    traverse(column);
  });
  var rows = [];
  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }
  var allColumns = getAllColumns(originColumns);
  allColumns.forEach(function(column) {
    if (column.children && column.children.length && column.children.some(function(column2) {
      return column2.visible;
    })) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }
    rows[column.level - 1].push(column);
  });
  return rows;
};
var __assign$2 = globalThis && globalThis.__assign || function() {
  __assign$2 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$2.apply(this, arguments);
};
var renderType$1 = "header";
const VxeTableHeader = defineComponent({
  name: "VxeTableHeader",
  props: {
    tableData: Array,
    tableColumn: Array,
    tableGroupColumn: Array,
    fixedColumn: Array,
    fixedType: { type: String, default: null }
  },
  setup: function(props) {
    var $xetable = inject("$xetable", {});
    var xID = $xetable.xID, tableProps2 = $xetable.props, tableReactData = $xetable.reactData, tableInternalData = $xetable.internalData;
    var _a = $xetable.getRefMaps(), tableRefElem = _a.refElem, refTableBody = _a.refTableBody, refLeftContainer = _a.refLeftContainer, refRightContainer = _a.refRightContainer, refCellResizeBar = _a.refCellResizeBar;
    var computeColumnOpts = $xetable.getComputeMaps().computeColumnOpts;
    var headerColumn = ref([]);
    var refElem = ref();
    var refHeaderTable = ref();
    var refHeaderColgroup = ref();
    var refHeaderTHead = ref();
    var refHeaderXSpace = ref();
    var refHeaderBorderRepair = ref();
    var uploadColumn = function() {
      var isGroup = tableReactData.isGroup;
      headerColumn.value = isGroup ? convertToRows(props.tableGroupColumn) : [];
    };
    var resizeMousedown = function(evnt, params) {
      var column = params.column;
      var fixedType = props.fixedType;
      var tableBody = refTableBody.value;
      var leftContainerElem = refLeftContainer.value;
      var rightContainerElem = refRightContainer.value;
      var resizeBarElem = refCellResizeBar.value;
      var dragClientX = evnt.clientX;
      var wrapperElem = refElem.value;
      var dragBtnElem = evnt.target;
      var cell = params.cell = dragBtnElem.parentNode;
      var dragLeft = 0;
      var tableBodyElem = tableBody.$el;
      var pos = getOffsetPos(dragBtnElem, wrapperElem);
      var dragBtnWidth = dragBtnElem.clientWidth;
      var dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2);
      var minInterval = getColMinWidth(params) - dragBtnOffsetWidth;
      var dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval;
      var dragPosLeft = pos.left + dragBtnOffsetWidth;
      var domMousemove = document.onmousemove;
      var domMouseup = document.onmouseup;
      var isLeftFixed = fixedType === "left";
      var isRightFixed = fixedType === "right";
      var tableEl = tableRefElem.value;
      var fixedOffsetWidth = 0;
      if (isLeftFixed || isRightFixed) {
        var siblingProp = isLeftFixed ? "nextElementSibling" : "previousElementSibling";
        var tempCellElem = cell[siblingProp];
        while (tempCellElem) {
          if (hasClass(tempCellElem, "fixed--hidden")) {
            break;
          } else if (!hasClass(tempCellElem, "col--group")) {
            fixedOffsetWidth += tempCellElem.offsetWidth;
          }
          tempCellElem = tempCellElem[siblingProp];
        }
        if (isRightFixed && rightContainerElem) {
          dragPosLeft = rightContainerElem.offsetLeft + fixedOffsetWidth;
        }
      }
      var updateEvent = function(evnt2) {
        evnt2.stopPropagation();
        evnt2.preventDefault();
        var offsetX = evnt2.clientX - dragClientX;
        var left = dragPosLeft + offsetX;
        var scrollLeft = fixedType ? 0 : tableBodyElem.scrollLeft;
        if (isLeftFixed) {
          left = Math.min(left, (rightContainerElem ? rightContainerElem.offsetLeft : tableBodyElem.clientWidth) - fixedOffsetWidth - minInterval);
        } else if (isRightFixed) {
          dragMinLeft = (leftContainerElem ? leftContainerElem.clientWidth : 0) + fixedOffsetWidth + minInterval;
          left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval);
        } else {
          dragMinLeft = Math.max(tableBodyElem.scrollLeft, dragMinLeft);
        }
        dragLeft = Math.max(left, dragMinLeft);
        resizeBarElem.style.left = "".concat(dragLeft - scrollLeft, "px");
      };
      tableInternalData._isResize = true;
      addClass(tableEl, "drag--resize");
      resizeBarElem.style.display = "block";
      document.onmousemove = updateEvent;
      document.onmouseup = function(evnt2) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        var resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft);
        column.resizeWidth = resizeWidth;
        resizeBarElem.style.display = "none";
        tableInternalData._isResize = false;
        tableInternalData._lastResizeTime = Date.now();
        $xetable.analyColumnWidth();
        $xetable.recalculate(true).then(function() {
          $xetable.saveCustomResizable();
          $xetable.updateCellAreas();
          $xetable.dispatchEvent("resizable-change", __assign$2(__assign$2({}, params), { resizeWidth }), evnt2);
        });
        removeClass(tableEl, "drag--resize");
      };
      updateEvent(evnt);
      if ($xetable.closeMenu) {
        $xetable.closeMenu();
      }
    };
    watch(function() {
      return props.tableColumn;
    }, uploadColumn);
    onMounted(function() {
      nextTick(function() {
        var fixedType = props.fixedType;
        var internalData = $xetable.internalData;
        var elemStore = internalData.elemStore;
        var prefix = "".concat(fixedType || "main", "-header-");
        elemStore["".concat(prefix, "wrapper")] = refElem;
        elemStore["".concat(prefix, "table")] = refHeaderTable;
        elemStore["".concat(prefix, "colgroup")] = refHeaderColgroup;
        elemStore["".concat(prefix, "list")] = refHeaderTHead;
        elemStore["".concat(prefix, "xSpace")] = refHeaderXSpace;
        elemStore["".concat(prefix, "repair")] = refHeaderBorderRepair;
        uploadColumn();
      });
    });
    onUnmounted(function() {
      var fixedType = props.fixedType;
      var internalData = $xetable.internalData;
      var elemStore = internalData.elemStore;
      var prefix = "".concat(fixedType || "main", "-header-");
      elemStore["".concat(prefix, "wrapper")] = null;
      elemStore["".concat(prefix, "table")] = null;
      elemStore["".concat(prefix, "colgroup")] = null;
      elemStore["".concat(prefix, "list")] = null;
      elemStore["".concat(prefix, "xSpace")] = null;
      elemStore["".concat(prefix, "repair")] = null;
    });
    var renderVN = function() {
      var fixedType = props.fixedType, fixedColumn = props.fixedColumn, tableColumn = props.tableColumn;
      var resizable = tableProps2.resizable, border = tableProps2.border, columnKey = tableProps2.columnKey, headerRowClassName = tableProps2.headerRowClassName, headerCellClassName = tableProps2.headerCellClassName, headerRowStyle = tableProps2.headerRowStyle, headerCellStyle = tableProps2.headerCellStyle, allColumnHeaderOverflow = tableProps2.showHeaderOverflow, allHeaderAlign = tableProps2.headerAlign, allAlign = tableProps2.align, mouseConfig = tableProps2.mouseConfig;
      var isGroup = tableReactData.isGroup, currentColumn = tableReactData.currentColumn, scrollXLoad = tableReactData.scrollXLoad, overflowX = tableReactData.overflowX, scrollbarWidth = tableReactData.scrollbarWidth;
      var visibleColumn = tableInternalData.visibleColumn;
      var columnOpts = computeColumnOpts.value;
      var headerGroups = headerColumn.value;
      var renderColumnList = tableColumn;
      if (isGroup) {
        renderColumnList = visibleColumn;
      } else {
        if (fixedType) {
          if (scrollXLoad || allColumnHeaderOverflow) {
            renderColumnList = fixedColumn;
          }
        }
        headerGroups = [renderColumnList];
      }
      return h("div", {
        ref: refElem,
        class: ["vxe-table--header-wrapper", fixedType ? "fixed-".concat(fixedType, "--wrapper") : "body--wrapper"],
        xid: xID
      }, [
        fixedType ? createCommentVNode() : h("div", {
          ref: refHeaderXSpace,
          class: "vxe-body--x-space"
        }),
        h("table", {
          ref: refHeaderTable,
          class: "vxe-table--header",
          xid: xID,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          /**
           * 列宽
           */
          h("colgroup", {
            ref: refHeaderColgroup
          }, renderColumnList.map(function(column, $columnIndex) {
            return h("col", {
              name: column.id,
              key: $columnIndex
            });
          }).concat(scrollbarWidth ? [
            h("col", {
              name: "col_gutter"
            })
          ] : [])),
          /**
           * 头部
           */
          h("thead", {
            ref: refHeaderTHead
          }, headerGroups.map(function(cols, $rowIndex) {
            return h("tr", {
              class: ["vxe-header--row", headerRowClassName ? XEUtils$1.isFunction(headerRowClassName) ? headerRowClassName({ $table: $xetable, $rowIndex, fixed: fixedType, type: renderType$1 }) : headerRowClassName : ""],
              style: headerRowStyle ? XEUtils$1.isFunction(headerRowStyle) ? headerRowStyle({ $table: $xetable, $rowIndex, fixed: fixedType, type: renderType$1 }) : headerRowStyle : null
            }, cols.map(function(column, $columnIndex) {
              var _a2;
              var type = column.type, showHeaderOverflow = column.showHeaderOverflow, headerAlign = column.headerAlign, align = column.align, headerClassName = column.headerClassName;
              var isColGroup = column.children && column.children.length;
              var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : !!column.fixed && overflowX;
              var headOverflow = XEUtils$1.isUndefined(showHeaderOverflow) || XEUtils$1.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
              var headAlign = headerAlign || align || allHeaderAlign || allAlign;
              var showEllipsis = headOverflow === "ellipsis";
              var showTitle = headOverflow === "title";
              var showTooltip = headOverflow === true || headOverflow === "tooltip";
              var hasEllipsis = showTitle || showTooltip || showEllipsis;
              var hasFilter = column.filters && column.filters.some(function(item) {
                return item.checked;
              });
              var columnIndex = $xetable.getColumnIndex(column);
              var _columnIndex = $xetable.getVTColumnIndex(column);
              var params = { $table: $xetable, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed: fixedType, type: renderType$1, isHidden: fixedHiddenColumn, hasFilter };
              var thOns = {
                onClick: function(evnt) {
                  return $xetable.triggerHeaderCellClickEvent(evnt, params);
                },
                onDblclick: function(evnt) {
                  return $xetable.triggerHeaderCellDblclickEvent(evnt, params);
                }
              };
              if (scrollXLoad && !hasEllipsis) {
                showEllipsis = hasEllipsis = true;
              }
              if (mouseConfig) {
                thOns.onMousedown = function(evnt) {
                  return $xetable.triggerHeaderCellMousedownEvent(evnt, params);
                };
              }
              return h("th", __assign$2(__assign$2({ class: [
                "vxe-header--column",
                column.id,
                (_a2 = {}, _a2["col--".concat(headAlign)] = headAlign, _a2["col--".concat(type)] = type, _a2["col--last"] = $columnIndex === cols.length - 1, _a2["col--fixed"] = column.fixed, _a2["col--group"] = isColGroup, _a2["col--ellipsis"] = hasEllipsis, _a2["fixed--hidden"] = fixedHiddenColumn, _a2["is--sortable"] = column.sortable, _a2["col--filter"] = !!column.filters, _a2["is--filter-active"] = hasFilter, _a2["col--current"] = currentColumn === column, _a2),
                headerClassName ? XEUtils$1.isFunction(headerClassName) ? headerClassName(params) : headerClassName : "",
                headerCellClassName ? XEUtils$1.isFunction(headerCellClassName) ? headerCellClassName(params) : headerCellClassName : ""
              ], colid: column.id, colspan: column.colSpan > 1 ? column.colSpan : null, rowspan: column.rowSpan > 1 ? column.rowSpan : null, style: headerCellStyle ? XEUtils$1.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle : null }, thOns), { key: columnKey || columnOpts.useKey || isColGroup ? column.id : $columnIndex }), [
                h("div", {
                  class: ["vxe-cell", {
                    "c--title": showTitle,
                    "c--tooltip": showTooltip,
                    "c--ellipsis": showEllipsis
                  }]
                }, column.renderHeader(params)),
                /**
                 * 列宽拖动
                 */
                !fixedHiddenColumn && !isColGroup && (XEUtils$1.isBoolean(column.resizable) ? column.resizable : columnOpts.resizable || resizable) ? h("div", {
                  class: ["vxe-resizable", {
                    "is--line": !border || border === "none"
                  }],
                  onMousedown: function(evnt) {
                    return resizeMousedown(evnt, params);
                  }
                }) : null
              ]);
            }).concat(scrollbarWidth ? [
              h("th", {
                class: "vxe-header--gutter col--gutter"
              })
            ] : []));
          }))
        ]),
        /**
         * 其他
         */
        h("div", {
          ref: refHeaderBorderRepair,
          class: "vxe-table--header-border-line"
        })
      ]);
    };
    return renderVN;
  }
});
var Header = Object.assign(VxeTableHeader, {
  install: function(app) {
    app.component(VxeTableHeader.name, VxeTableHeader);
  }
});
dynamicApp.component(VxeTableHeader.name, VxeTableHeader);
var __assign$1 = globalThis && globalThis.__assign || function() {
  __assign$1 = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign$1.apply(this, arguments);
};
var renderType = "footer";
function mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex) {
  for (var mIndex = 0; mIndex < mergeFooterList.length; mIndex++) {
    var _a = mergeFooterList[mIndex], mergeRowIndex = _a.row, mergeColIndex = _a.col, mergeRowspan = _a.rowspan, mergeColspan = _a.colspan;
    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return { rowspan: mergeRowspan, colspan: mergeColspan };
      }
      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return { rowspan: 0, colspan: 0 };
      }
    }
  }
}
const VxeTableFooterComponent = defineComponent({
  name: "VxeTableFooter",
  props: {
    footerTableData: { type: Array, default: function() {
      return [];
    } },
    tableColumn: { type: Array, default: function() {
      return [];
    } },
    fixedColumn: { type: Array, default: function() {
      return [];
    } },
    fixedType: { type: String, default: null }
  },
  setup: function(props) {
    var $xetable = inject("$xetable", {});
    var xID = $xetable.xID, tableProps2 = $xetable.props, tableReactData = $xetable.reactData, tableInternalData = $xetable.internalData;
    var _a = $xetable.getRefMaps(), refTableHeader = _a.refTableHeader, refTableBody = _a.refTableBody, refValidTooltip = _a.refValidTooltip;
    var _b = $xetable.getComputeMaps(), computeTooltipOpts = _b.computeTooltipOpts, computeColumnOpts = _b.computeColumnOpts;
    var refElem = ref();
    var refFooterTable = ref();
    var refFooterColgroup = ref();
    var refFooterTFoot = ref();
    var refFooterXSpace = ref();
    var scrollEvent = function(evnt) {
      var fixedType = props.fixedType;
      var scrollXLoad = tableReactData.scrollXLoad;
      var lastScrollLeft = tableInternalData.lastScrollLeft;
      var validTip = refValidTooltip.value;
      var tableHeader = refTableHeader.value;
      var tableBody = refTableBody.value;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = refElem.value;
      var bodyElem = tableBody.$el;
      var scrollLeft = footerElem.scrollLeft;
      var isX = scrollLeft !== lastScrollLeft;
      tableInternalData.lastScrollLeft = scrollLeft;
      tableInternalData.lastScrollTime = Date.now();
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }
      if (scrollXLoad && isX) {
        $xetable.triggerScrollXEvent(evnt);
      }
      if (isX && validTip && validTip.reactData.visible) {
        validTip.updatePlacement();
      }
      $xetable.dispatchEvent("scroll", { type: renderType, fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, isX, isY: false }, evnt);
    };
    onMounted(function() {
      nextTick(function() {
        var fixedType = props.fixedType;
        var elemStore = tableInternalData.elemStore;
        var prefix = "".concat(fixedType || "main", "-footer-");
        elemStore["".concat(prefix, "wrapper")] = refElem;
        elemStore["".concat(prefix, "table")] = refFooterTable;
        elemStore["".concat(prefix, "colgroup")] = refFooterColgroup;
        elemStore["".concat(prefix, "list")] = refFooterTFoot;
        elemStore["".concat(prefix, "xSpace")] = refFooterXSpace;
      });
    });
    onUnmounted(function() {
      var fixedType = props.fixedType;
      var elemStore = tableInternalData.elemStore;
      var prefix = "".concat(fixedType || "main", "-footer-");
      elemStore["".concat(prefix, "wrapper")] = null;
      elemStore["".concat(prefix, "table")] = null;
      elemStore["".concat(prefix, "colgroup")] = null;
      elemStore["".concat(prefix, "list")] = null;
      elemStore["".concat(prefix, "xSpace")] = null;
    });
    var renderVN = function() {
      var fixedType = props.fixedType, fixedColumn = props.fixedColumn, tableColumn = props.tableColumn, footerTableData = props.footerTableData;
      var footerRowClassName = tableProps2.footerRowClassName, footerCellClassName = tableProps2.footerCellClassName, footerRowStyle = tableProps2.footerRowStyle, footerCellStyle = tableProps2.footerCellStyle, allFooterAlign = tableProps2.footerAlign, footerSpanMethod = tableProps2.footerSpanMethod, allAlign = tableProps2.align, columnKey = tableProps2.columnKey, allColumnFooterOverflow = tableProps2.showFooterOverflow;
      var visibleColumn = tableInternalData.visibleColumn;
      var scrollXLoad = tableReactData.scrollXLoad, overflowX = tableReactData.overflowX, scrollbarWidth = tableReactData.scrollbarWidth, currentColumn = tableReactData.currentColumn, mergeFooterList = tableReactData.mergeFooterList;
      var tooltipOpts = computeTooltipOpts.value;
      var columnOpts = computeColumnOpts.value;
      if (fixedType) {
        if (scrollXLoad || allColumnFooterOverflow) {
          if (!mergeFooterList.length || !footerSpanMethod) {
            tableColumn = fixedColumn;
          } else {
            tableColumn = visibleColumn;
          }
        } else {
          tableColumn = visibleColumn;
        }
      }
      return h("div", {
        ref: refElem,
        class: ["vxe-table--footer-wrapper", fixedType ? "fixed-".concat(fixedType, "--wrapper") : "body--wrapper"],
        xid: xID,
        onScroll: scrollEvent
      }, [
        fixedType ? createCommentVNode() : h("div", {
          ref: refFooterXSpace,
          class: "vxe-body--x-space"
        }),
        h("table", {
          ref: refFooterTable,
          class: "vxe-table--footer",
          xid: xID,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          /**
           * 列宽
           */
          h("colgroup", {
            ref: refFooterColgroup
          }, tableColumn.map(function(column, $columnIndex) {
            return h("col", {
              name: column.id,
              key: $columnIndex
            });
          }).concat(scrollbarWidth ? [
            h("col", {
              name: "col_gutter"
            })
          ] : [])),
          /**
           * 底部
           */
          h("tfoot", {
            ref: refFooterTFoot
          }, footerTableData.map(function(list, _rowIndex) {
            var $rowIndex = _rowIndex;
            return h("tr", {
              class: ["vxe-footer--row", footerRowClassName ? XEUtils$1.isFunction(footerRowClassName) ? footerRowClassName({ $table: $xetable, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }) : footerRowClassName : ""],
              style: footerRowStyle ? XEUtils$1.isFunction(footerRowStyle) ? footerRowStyle({ $table: $xetable, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }) : footerRowStyle : null
            }, tableColumn.map(function(column, $columnIndex) {
              var _a2;
              var type = column.type, showFooterOverflow = column.showFooterOverflow, footerAlign = column.footerAlign, align = column.align, footerClassName = column.footerClassName;
              var showAllTip = tooltipOpts.showAll;
              var isColGroup = column.children && column.children.length;
              var fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX;
              var footOverflow = XEUtils$1.isUndefined(showFooterOverflow) || XEUtils$1.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
              var footAlign = footerAlign || align || allFooterAlign || allAlign;
              var showEllipsis = footOverflow === "ellipsis";
              var showTitle = footOverflow === "title";
              var showTooltip = footOverflow === true || footOverflow === "tooltip";
              var hasEllipsis = showTitle || showTooltip || showEllipsis;
              var attrs = { colid: column.id };
              var tfOns = {};
              var columnIndex = $xetable.getColumnIndex(column);
              var _columnIndex = $xetable.getVTColumnIndex(column);
              var itemIndex = _columnIndex;
              var params = { $table: $xetable, _rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, type: renderType, data: footerTableData };
              if (scrollXLoad && !hasEllipsis) {
                showEllipsis = hasEllipsis = true;
              }
              if (showTitle || showTooltip || showAllTip) {
                tfOns.onMouseenter = function(evnt) {
                  if (showTitle) {
                    updateCellTitle(evnt.currentTarget, column);
                  } else if (showTooltip || showAllTip) {
                    $xetable.triggerFooterTooltipEvent(evnt, params);
                  }
                };
              }
              if (showTooltip || showAllTip) {
                tfOns.onMouseleave = function(evnt) {
                  if (showTooltip || showAllTip) {
                    $xetable.handleTargetLeaveEvent(evnt);
                  }
                };
              }
              tfOns.onClick = function(evnt) {
                $xetable.dispatchEvent("footer-cell-click", Object.assign({ cell: evnt.currentTarget }, params), evnt);
              };
              tfOns.onDblclick = function(evnt) {
                $xetable.dispatchEvent("footer-cell-dblclick", Object.assign({ cell: evnt.currentTarget }, params), evnt);
              };
              if (mergeFooterList.length) {
                var spanRest = mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex);
                if (spanRest) {
                  var rowspan = spanRest.rowspan, colspan = spanRest.colspan;
                  if (!rowspan || !colspan) {
                    return null;
                  }
                  if (rowspan > 1) {
                    attrs.rowspan = rowspan;
                  }
                  if (colspan > 1) {
                    attrs.colspan = colspan;
                  }
                }
              } else if (footerSpanMethod) {
                var _b2 = footerSpanMethod(params) || {}, _c = _b2.rowspan, rowspan = _c === void 0 ? 1 : _c, _d = _b2.colspan, colspan = _d === void 0 ? 1 : _d;
                if (!rowspan || !colspan) {
                  return null;
                }
                if (rowspan > 1) {
                  attrs.rowspan = rowspan;
                }
                if (colspan > 1) {
                  attrs.colspan = colspan;
                }
              }
              return h("td", __assign$1(__assign$1(__assign$1(__assign$1({ class: ["vxe-footer--column", column.id, (_a2 = {}, _a2["col--".concat(footAlign)] = footAlign, _a2["col--".concat(type)] = type, _a2["col--last"] = $columnIndex === tableColumn.length - 1, _a2["fixed--hidden"] = fixedHiddenColumn, _a2["col--ellipsis"] = hasEllipsis, _a2["col--current"] = currentColumn === column, _a2), getPropClass(footerClassName, params), getPropClass(footerCellClassName, params)] }, attrs), { style: footerCellStyle ? XEUtils$1.isFunction(footerCellStyle) ? footerCellStyle(params) : footerCellStyle : null }), tfOns), { key: columnKey || columnOpts.useKey ? column.id : $columnIndex }), [
                h("div", {
                  class: ["vxe-cell", {
                    "c--title": showTitle,
                    "c--tooltip": showTooltip,
                    "c--ellipsis": showEllipsis
                  }]
                }, column.renderFooter(params))
              ]);
            }).concat(scrollbarWidth ? [
              h("td", {
                class: "vxe-footer--gutter col--gutter"
              })
            ] : []));
          }))
        ])
      ]);
    };
    return renderVN;
  }
});
var Footer = Object.assign(VxeTableFooterComponent, {
  install: function(app) {
    app.component(VxeTableFooterComponent.name, VxeTableFooterComponent);
  }
});
dynamicApp.component(VxeTableFooterComponent.name, VxeTableFooterComponent);
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t2) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t2[p] = s[p];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var isWebkit = browse["-webkit"] && !browse.edge;
var resizableStorageKey = "VXE_TABLE_CUSTOM_COLUMN_WIDTH";
var visibleStorageKey = "VXE_TABLE_CUSTOM_COLUMN_VISIBLE";
const VxeTableComponent = defineComponent({
  name: "VxeTable",
  props: tableProps,
  emits: tableEmits,
  setup: function(props, context) {
    var slots = context.slots, emit = context.emit;
    var hasUseTooltip = VXETable.tooltip;
    var xID = XEUtils$1.uniqueId();
    var computeSize = useSize(props);
    var instance = getCurrentInstance();
    var reactData = reactive({
      // 低性能的静态列
      staticColumns: [],
      // 渲染的列分组
      tableGroupColumn: [],
      // 可视区渲染的列
      tableColumn: [],
      // 渲染中的数据
      tableData: [],
      // 是否启用了横向 X 可视渲染方式加载
      scrollXLoad: false,
      // 是否启用了纵向 Y 可视渲染方式加载
      scrollYLoad: false,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollbarWidth: 0,
      // 横向滚动条的高度
      scrollbarHeight: 0,
      // 行高
      rowHeight: 0,
      // 表格父容器的高度
      parentHeight: 0,
      // 是否使用分组表头
      isGroup: false,
      isAllOverflow: false,
      // 复选框属性，是否全选
      isAllSelected: false,
      // 复选框属性，有选中且非全选状态
      isIndeterminate: false,
      // 复选框属性，已选中的行
      selection: [],
      // 当前行
      currentRow: null,
      // 单选框属性，选中列
      currentColumn: null,
      // 单选框属性，选中行
      selectRow: null,
      // 表尾合计数据
      footerTableData: [],
      // 展开列信息
      expandColumn: null,
      // 树节点列信息
      treeNodeColumn: null,
      hasFixedColumn: false,
      // 已展开的行
      rowExpandeds: [],
      // 懒加载中的展开行的列表
      expandLazyLoadeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 懒加载中的树节点的列表
      treeLazyLoadeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 合并单元格的对象集
      mergeList: [],
      // 合并表尾数据的对象集
      mergeFooterList: [],
      // 初始化标识
      initStore: {
        filter: false,
        import: false,
        export: false
      },
      // 当前选中的筛选列
      filterStore: {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false,
        maxHeight: null
      },
      // 存放列相关的信息
      columnStore: {
        leftList: [],
        centerList: [],
        rightList: [],
        resizeList: [],
        pxList: [],
        pxMinList: [],
        scaleList: [],
        scaleMinList: [],
        autoList: []
      },
      // 存放快捷菜单的信息
      ctxMenuStore: {
        selected: null,
        visible: false,
        showChild: false,
        selectChild: null,
        list: [],
        style: null
      },
      // 存放可编辑相关信息
      editStore: {
        indexs: {
          columns: []
        },
        titles: {
          columns: []
        },
        // 选中源
        selected: {
          row: null,
          column: null
        },
        // 已复制源
        copyed: {
          cut: false,
          rows: [],
          columns: []
        },
        // 激活
        actived: {
          row: null,
          column: null
        },
        insertList: [],
        removeList: []
      },
      // 存放 tooltip 相关信息
      tooltipStore: {
        row: null,
        column: null,
        content: null,
        visible: false,
        currOpts: null
      },
      // 存放数据校验相关信息
      validStore: {
        visible: false,
        row: null,
        column: null,
        content: "",
        rule: null,
        isArrow: false
      },
      // 导入相关信息
      importStore: {
        inited: false,
        file: null,
        type: "",
        modeList: [],
        typeList: [],
        filename: "",
        visible: false
      },
      importParams: {
        mode: "",
        types: null,
        message: true
      },
      // 导出相关信息
      exportStore: {
        inited: false,
        name: "",
        modeList: [],
        typeList: [],
        columns: [],
        isPrint: false,
        hasFooter: false,
        hasMerge: false,
        hasTree: false,
        hasColgroup: false,
        visible: false
      },
      exportParams: {
        filename: "",
        sheetName: "",
        mode: "",
        type: "",
        isColgroup: false,
        isMerge: false,
        isAllExpand: false,
        useStyle: false,
        original: false,
        message: true,
        isHeader: false,
        isFooter: false
      }
    });
    var internalData = {
      tZindex: 0,
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {
        offsetSize: 0,
        visibleSize: 0,
        startIndex: 0,
        endIndex: 0
      },
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {
        rowHeight: 0,
        offsetSize: 0,
        visibleSize: 0,
        startIndex: 0,
        endIndex: 0
      },
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      customHeight: 0,
      customMaxHeight: 0,
      // 当前 hover 行
      hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      lastScrollTime: 0,
      // 单选框属性，已选中保留的行
      radioReserveRow: null,
      // 复选框属性，已选中保留的行
      checkboxReserveRowMap: {},
      // 行数据，已展开保留的行
      rowExpandedReserveRowMap: {},
      // 树结构数据，已展开保留的行
      treeExpandedReserveRowMap: {},
      // 列表完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      // 树结构完整数据、条件处理后
      tableFullTreeData: [],
      afterTreeFullData: [],
      tableSynchData: [],
      tableSourceData: [],
      // 收集的列配置（带分组）
      collectColumn: [],
      // 完整所有列（不带分组）
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 总的缓存数据集
      fullAllDataRowIdData: {},
      // 渲染中缓存数据
      fullDataRowIdData: {},
      fullColumnIdData: {},
      fullColumnFieldData: {},
      inited: false,
      tooltipTimeout: null,
      initStatus: false,
      isActivated: false
    };
    var tableMethods = {};
    var tablePrivateMethods = {};
    var refElem = ref();
    var refTooltip = ref();
    var refCommTooltip = ref();
    var refValidTooltip = ref();
    var refTableFilter = ref();
    var refTableMenu = ref();
    var refTableHeader = ref();
    var refTableBody = ref();
    var refTableFooter = ref();
    var refTableLeftHeader = ref();
    var refTableLeftBody = ref();
    var refTableLeftFooter = ref();
    var refTableRightHeader = ref();
    var refTableRightBody = ref();
    var refTableRightFooter = ref();
    var refLeftContainer = ref();
    var refRightContainer = ref();
    var refCellResizeBar = ref();
    var refEmptyPlaceholder = ref();
    var $xegrid = inject("$xegrid", null);
    var $xetoolbar;
    var computeValidOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.validConfig, props.validConfig);
    });
    var computeSXOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.scrollX, props.scrollX);
    });
    var computeSYOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.scrollY, props.scrollY);
    });
    var computeRowHeightMaps = computed(function() {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      };
    });
    var computeColumnOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.columnConfig, props.columnConfig);
    });
    var computeRowOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.rowConfig, props.rowConfig);
    });
    var computeResizableOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.resizableConfig, props.resizableConfig);
    });
    var computeSeqOpts = computed(function() {
      return Object.assign({ startIndex: 0 }, GlobalConfig.table.seqConfig, props.seqConfig);
    });
    var computeRadioOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.radioConfig, props.radioConfig);
    });
    var computeCheckboxOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.checkboxConfig, props.checkboxConfig);
    });
    var computeTooltipOpts = ref();
    computeTooltipOpts = computed(function() {
      return Object.assign({}, GlobalConfig.tooltip, GlobalConfig.table.tooltipConfig, props.tooltipConfig);
    });
    var computeTipConfig = computed(function() {
      var tooltipStore = reactData.tooltipStore;
      var tooltipOpts = computeTooltipOpts.value;
      return __assign(__assign({}, tooltipOpts), tooltipStore.currOpts);
    });
    var computeValidTipOpts = computed(function() {
      var tooltipOpts = computeTooltipOpts.value;
      return Object.assign({ isArrow: false }, tooltipOpts);
    });
    var computeEditOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.editConfig, props.editConfig);
    });
    var computeSortOpts = computed(function() {
      return Object.assign({ orders: ["asc", "desc", null] }, GlobalConfig.table.sortConfig, props.sortConfig);
    });
    var computeFilterOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.filterConfig, props.filterConfig);
    });
    var computeMouseOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.mouseConfig, props.mouseConfig);
    });
    var computeAreaOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.areaConfig, props.areaConfig);
    });
    var computeKeyboardOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.keyboardConfig, props.keyboardConfig);
    });
    var computeClipOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.clipConfig, props.clipConfig);
    });
    var computeFNROpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.fnrConfig, props.fnrConfig);
    });
    var computeMenuOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.menuConfig, props.menuConfig);
    });
    var computeHeaderMenu = computed(function() {
      var menuOpts = computeMenuOpts.value;
      var headerOpts = menuOpts.header;
      return headerOpts && headerOpts.options ? headerOpts.options : [];
    });
    var computeBodyMenu = computed(function() {
      var menuOpts = computeMenuOpts.value;
      var bodyOpts = menuOpts.body;
      return bodyOpts && bodyOpts.options ? bodyOpts.options : [];
    });
    var computeFooterMenu = computed(function() {
      var menuOpts = computeMenuOpts.value;
      var footerOpts = menuOpts.footer;
      return footerOpts && footerOpts.options ? footerOpts.options : [];
    });
    var computeIsMenu = computed(function() {
      var menuOpts = computeMenuOpts.value;
      var headerMenu = computeHeaderMenu.value;
      var bodyMenu = computeBodyMenu.value;
      var footerMenu = computeFooterMenu.value;
      return !!(props.menuConfig && isEnableConf(menuOpts) && (headerMenu.length || bodyMenu.length || footerMenu.length));
    });
    var computeMenuList = computed(function() {
      var ctxMenuStore = reactData.ctxMenuStore;
      var rest = [];
      ctxMenuStore.list.forEach(function(list) {
        list.forEach(function(item) {
          rest.push(item);
        });
      });
      return rest;
    });
    var computeExportOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.exportConfig, props.exportConfig);
    });
    var computeImportOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.importConfig, props.importConfig);
    });
    var computePrintOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.printConfig, props.printConfig);
    });
    var computeExpandOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.expandConfig, props.expandConfig);
    });
    var computeTreeOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.treeConfig, props.treeConfig);
    });
    var computeEmptyOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.emptyRender, props.emptyRender);
    });
    var computeLoadingOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.loadingConfig, props.loadingConfig);
    });
    var computeCellOffsetWidth = computed(function() {
      return props.border ? Math.max(2, Math.ceil(reactData.scrollbarWidth / reactData.tableColumn.length)) : 1;
    });
    var computeCustomOpts = computed(function() {
      return Object.assign({}, GlobalConfig.table.customConfig, props.customConfig);
    });
    var computeTableBorder = computed(function() {
      var border = props.border;
      if (border === true) {
        return "full";
      }
      if (border) {
        return border;
      }
      return "default";
    });
    var computeIsAllCheckboxDisabled = computed(function() {
      props.treeConfig;
      var tableData = reactData.tableData;
      var tableFullData = internalData.tableFullData;
      var checkboxOpts = computeCheckboxOpts.value;
      var strict = checkboxOpts.strict, checkMethod = checkboxOpts.checkMethod;
      if (strict) {
        if (tableData.length || tableFullData.length) {
          if (checkMethod) {
            return tableFullData.every(function(row) {
              return !checkMethod({ row });
            });
          }
          return false;
        }
        return true;
      }
      return false;
    });
    var refMaps = {
      refElem,
      refTooltip,
      refValidTooltip,
      refTableFilter,
      refTableMenu,
      refTableHeader,
      refTableBody,
      refTableFooter,
      refTableLeftHeader,
      refTableLeftBody,
      refTableLeftFooter,
      refTableRightHeader,
      refTableRightBody,
      refTableRightFooter,
      refLeftContainer,
      refRightContainer,
      refCellResizeBar
    };
    var computeMaps = {
      computeSize,
      computeValidOpts,
      computeSXOpts,
      computeSYOpts,
      computeColumnOpts,
      computeRowOpts,
      computeResizableOpts,
      computeSeqOpts,
      computeRadioOpts,
      computeCheckboxOpts,
      computeTooltipOpts,
      computeEditOpts,
      computeSortOpts,
      computeFilterOpts,
      computeMouseOpts,
      computeAreaOpts,
      computeKeyboardOpts,
      computeClipOpts,
      computeFNROpts,
      computeHeaderMenu,
      computeBodyMenu,
      computeFooterMenu,
      computeIsMenu,
      computeMenuOpts,
      computeExportOpts,
      computeImportOpts,
      computePrintOpts,
      computeExpandOpts,
      computeTreeOpts,
      computeEmptyOpts,
      computeLoadingOpts,
      computeCustomOpts,
      computeIsAllCheckboxDisabled
    };
    var $xetable = {
      xID,
      props,
      context,
      instance,
      reactData,
      internalData,
      getRefMaps: function() {
        return refMaps;
      },
      getComputeMaps: function() {
        return computeMaps;
      },
      xegrid: $xegrid
    };
    var eqCellValue = function(row1, row2, field) {
      var val1 = XEUtils$1.get(row1, field);
      var val2 = XEUtils$1.get(row2, field);
      if (eqEmptyValue(val1) && eqEmptyValue(val2)) {
        return true;
      }
      if (XEUtils$1.isString(val1) || XEUtils$1.isNumber(val1)) {
        return "" + val1 === "" + val2;
      }
      return XEUtils$1.isEqual(val1, val2);
    };
    var getNextSortOrder = function(column) {
      var sortOpts = computeSortOpts.value;
      var orders = sortOpts.orders;
      var currOrder = column.order || null;
      var oIndex = orders.indexOf(currOrder) + 1;
      return orders[oIndex < orders.length ? oIndex : 0];
    };
    var getCustomStorageMap = function(key) {
      var version = GlobalConfig.version;
      var rest = XEUtils$1.toStringJSON(localStorage.getItem(key) || "");
      return rest && rest._v === version ? rest : { _v: version };
    };
    var getRecoverRow = function(list) {
      var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
      return list.filter(function(row) {
        var rowid = getRowid($xetable, row);
        return !!fullAllDataRowIdData[rowid];
      });
    };
    var handleReserveRow = function(reserveRowMap) {
      var fullDataRowIdData = internalData.fullDataRowIdData;
      var reserveList = [];
      XEUtils$1.each(reserveRowMap, function(item, rowid) {
        if (fullDataRowIdData[rowid] && $xetable.findRowIndexOf(reserveList, fullDataRowIdData[rowid].row) === -1) {
          reserveList.push(fullDataRowIdData[rowid].row);
        }
      });
      return reserveList;
    };
    var computeVirtualX = function() {
      var visibleColumn = internalData.visibleColumn;
      var tableBody = refTableBody.value;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      if (tableBodyElem) {
        var scrollLeft = tableBodyElem.scrollLeft, clientWidth = tableBodyElem.clientWidth;
        var endWidth = scrollLeft + clientWidth;
        var toVisibleIndex = -1;
        var cWidth = 0;
        var visibleSize = 0;
        for (var colIndex = 0, colLen = visibleColumn.length; colIndex < colLen; colIndex++) {
          cWidth += visibleColumn[colIndex].renderWidth;
          if (toVisibleIndex === -1 && scrollLeft < cWidth) {
            toVisibleIndex = colIndex;
          }
          if (toVisibleIndex >= 0) {
            visibleSize++;
            if (cWidth > endWidth) {
              break;
            }
          }
        }
        return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(8, visibleSize) };
      }
      return { toVisibleIndex: 0, visibleSize: 8 };
    };
    var computeVirtualY = function() {
      var tableHeader = refTableHeader.value;
      var tableBody = refTableBody.value;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      var vSize = computeSize.value;
      var rowHeightMaps = computeRowHeightMaps.value;
      if (tableBodyElem) {
        var tableHeaderElem = tableHeader ? tableHeader.$el : null;
        var rowHeight = 0;
        var firstTrElem = void 0;
        firstTrElem = tableBodyElem.querySelector("tr");
        if (!firstTrElem && tableHeaderElem) {
          firstTrElem = tableHeaderElem.querySelector("tr");
        }
        if (firstTrElem) {
          rowHeight = firstTrElem.clientHeight;
        }
        if (!rowHeight) {
          rowHeight = rowHeightMaps[vSize || "default"];
        }
        var visibleSize = Math.max(8, Math.ceil(tableBodyElem.clientHeight / rowHeight) + 2);
        return { rowHeight, visibleSize };
      }
      return { rowHeight: 0, visibleSize: 8 };
    };
    var calculateMergerOffserIndex = function(list, offsetItem, type) {
      for (var mcIndex = 0, len = list.length; mcIndex < len; mcIndex++) {
        var mergeItem = list[mcIndex];
        var startIndex = offsetItem.startIndex, endIndex = offsetItem.endIndex;
        var mergeStartIndex = mergeItem[type];
        var mergeSpanNumber = mergeItem[type + "span"];
        var mergeEndIndex = mergeStartIndex + mergeSpanNumber;
        if (mergeStartIndex < startIndex && startIndex < mergeEndIndex) {
          offsetItem.startIndex = mergeStartIndex;
        }
        if (mergeStartIndex < endIndex && endIndex < mergeEndIndex) {
          offsetItem.endIndex = mergeEndIndex;
        }
        if (offsetItem.startIndex !== startIndex || offsetItem.endIndex !== endIndex) {
          mcIndex = -1;
        }
      }
    };
    var setMerges = function(merges, mList, rowList) {
      if (merges) {
        var treeConfig = props.treeConfig;
        var visibleColumn_1 = internalData.visibleColumn;
        if (!XEUtils$1.isArray(merges)) {
          merges = [merges];
        }
        if (treeConfig && merges.length) {
          errLog("vxe.error.noTree", ["merge-cells | merge-footer-items"]);
        }
        merges.forEach(function(item) {
          var row = item.row, col = item.col, rowspan = item.rowspan, colspan = item.colspan;
          if (rowList && XEUtils$1.isNumber(row)) {
            row = rowList[row];
          }
          if (XEUtils$1.isNumber(col)) {
            col = visibleColumn_1[col];
          }
          if ((rowList ? row : XEUtils$1.isNumber(row)) && col && (rowspan || colspan)) {
            rowspan = XEUtils$1.toNumber(rowspan) || 1;
            colspan = XEUtils$1.toNumber(colspan) || 1;
            if (rowspan > 1 || colspan > 1) {
              var mcIndex = XEUtils$1.findIndexOf(mList, function(item2) {
                return (item2._row === row || getRowid($xetable, item2._row) === getRowid($xetable, row)) && (item2._col.id === col || item2._col.id === col.id);
              });
              var mergeItem = mList[mcIndex];
              if (mergeItem) {
                mergeItem.rowspan = rowspan;
                mergeItem.colspan = colspan;
                mergeItem._rowspan = rowspan;
                mergeItem._colspan = colspan;
              } else {
                var mergeRowIndex = rowList ? $xetable.findRowIndexOf(rowList, row) : row;
                var mergeColIndex = tableMethods.getVTColumnIndex(col);
                mList.push({
                  row: mergeRowIndex,
                  col: mergeColIndex,
                  rowspan,
                  colspan,
                  _row: row,
                  _col: col,
                  _rowspan: rowspan,
                  _colspan: colspan
                });
              }
            }
          }
        });
      }
    };
    var removeMerges = function(merges, mList, rowList) {
      var rest = [];
      if (merges) {
        var treeConfig = props.treeConfig;
        var visibleColumn_2 = internalData.visibleColumn;
        if (!XEUtils$1.isArray(merges)) {
          merges = [merges];
        }
        if (treeConfig && merges.length) {
          errLog("vxe.error.noTree", ["merge-cells | merge-footer-items"]);
        }
        merges.forEach(function(item) {
          var row = item.row, col = item.col;
          if (rowList && XEUtils$1.isNumber(row)) {
            row = rowList[row];
          }
          if (XEUtils$1.isNumber(col)) {
            col = visibleColumn_2[col];
          }
          var mcIndex = XEUtils$1.findIndexOf(mList, function(item2) {
            return (item2._row === row || getRowid($xetable, item2._row) === getRowid($xetable, row)) && (item2._col.id === col || item2._col.id === col.id);
          });
          if (mcIndex > -1) {
            var rItems = mList.splice(mcIndex, 1);
            rest.push(rItems[0]);
          }
        });
      }
      return rest;
    };
    var clearAllSort = function() {
      var tableFullColumn = internalData.tableFullColumn;
      tableFullColumn.forEach(function(column) {
        column.order = null;
      });
    };
    var calcHeight = function(key) {
      var parentHeight = reactData.parentHeight;
      var val = props[key];
      var num = 0;
      if (val) {
        if (val === "auto") {
          num = parentHeight;
        } else {
          var excludeHeight = $xetable.getExcludeHeight();
          if (isScale(val)) {
            num = Math.floor((XEUtils$1.toInteger(val) || 1) / 100 * parentHeight);
          } else {
            num = XEUtils$1.toNumber(val);
          }
          num = Math.max(40, num - excludeHeight);
        }
      }
      return num;
    };
    var restoreCustomStorage = function() {
      var id = props.id, customConfig = props.customConfig;
      var collectColumn = internalData.collectColumn;
      var customOpts = computeCustomOpts.value;
      var storage = customOpts.storage;
      var isResizable = storage === true || storage && storage.resizable;
      var isVisible = storage === true || storage && storage.visible;
      if (customConfig && (isResizable || isVisible)) {
        var customMap_1 = {};
        if (!id) {
          errLog("vxe.error.reqProp", ["id"]);
          return;
        }
        if (isResizable) {
          var columnWidthStorage = getCustomStorageMap(resizableStorageKey)[id];
          if (columnWidthStorage) {
            XEUtils$1.each(columnWidthStorage, function(resizeWidth, field) {
              customMap_1[field] = { field, resizeWidth };
            });
          }
        }
        if (isVisible) {
          var columnVisibleStorage = getCustomStorageMap(visibleStorageKey)[id];
          if (columnVisibleStorage) {
            var colVisibles = columnVisibleStorage.split("|");
            var colHides = colVisibles[0] ? colVisibles[0].split(",") : [];
            var colShows = colVisibles[1] ? colVisibles[1].split(",") : [];
            colHides.forEach(function(field) {
              if (customMap_1[field]) {
                customMap_1[field].visible = false;
              } else {
                customMap_1[field] = { field, visible: false };
              }
            });
            colShows.forEach(function(field) {
              if (customMap_1[field]) {
                customMap_1[field].visible = true;
              } else {
                customMap_1[field] = { field, visible: true };
              }
            });
          }
        }
        var keyMap_1 = {};
        XEUtils$1.eachTree(collectColumn, function(column) {
          var colKey = column.getKey();
          if (colKey) {
            keyMap_1[colKey] = column;
          }
        });
        XEUtils$1.each(customMap_1, function(_a, field) {
          var visible = _a.visible, resizeWidth = _a.resizeWidth;
          var column = keyMap_1[field];
          if (column) {
            if (XEUtils$1.isNumber(resizeWidth)) {
              column.resizeWidth = resizeWidth;
            }
            if (XEUtils$1.isBoolean(visible)) {
              column.visible = visible;
            }
          }
        });
      }
    };
    var cacheColumnMap = function() {
      var tableFullColumn = internalData.tableFullColumn, collectColumn = internalData.collectColumn;
      var fullColumnIdData = internalData.fullColumnIdData = {};
      var fullColumnFieldData = internalData.fullColumnFieldData = {};
      var mouseOpts = computeMouseOpts.value;
      var isGroup = collectColumn.some(hasChildrenList);
      var isAllOverflow = !!props.showOverflow;
      var expandColumn;
      var treeNodeColumn;
      var checkboxColumn;
      var radioColumn;
      var handleFunc = function(column, index, items, path, parent) {
        var colid = column.id, field = column.field;
        column.fixed;
        var type = column.type, treeNode = column.treeNode;
        var rest = { column, colid, index, items, parent };
        if (field) {
          if (process.env.NODE_ENV === "development") {
            if (fullColumnFieldData[field]) {
              warnLog("vxe.error.colRepet", ["field", field]);
            }
          }
          fullColumnFieldData[field] = rest;
        }
        if (treeNode) {
          if (process.env.NODE_ENV === "development") {
            if (treeNodeColumn) {
              warnLog("vxe.error.colRepet", ["tree-node", treeNode]);
            }
          }
          if (!treeNodeColumn) {
            treeNodeColumn = column;
          }
        } else if (type === "expand") {
          if (process.env.NODE_ENV === "development") {
            if (expandColumn) {
              warnLog("vxe.error.colRepet", ["type", type]);
            }
          }
          if (!expandColumn) {
            expandColumn = column;
          }
        }
        if (process.env.NODE_ENV === "development") {
          if (type === "checkbox") {
            if (checkboxColumn) {
              warnLog("vxe.error.colRepet", ["type", type]);
            }
            if (!checkboxColumn) {
              checkboxColumn = column;
            }
          } else if (type === "radio") {
            if (radioColumn) {
              warnLog("vxe.error.colRepet", ["type", type]);
            }
            if (!radioColumn) {
              radioColumn = column;
            }
          }
        }
        if (isAllOverflow && column.showOverflow === false) {
          isAllOverflow = false;
        }
        if (fullColumnIdData[colid]) {
          errLog("vxe.error.colRepet", ["colId", colid]);
        }
        fullColumnIdData[colid] = rest;
      };
      if (isGroup) {
        XEUtils$1.eachTree(collectColumn, function(column, index, items, path, parent, nodes) {
          column.level = nodes.length;
          handleFunc(column, index, items, path, parent);
        });
      } else {
        tableFullColumn.forEach(handleFunc);
      }
      if (process.env.NODE_ENV === "development") {
        if (expandColumn && mouseOpts.area) {
          errLog("vxe.error.errConflicts", ["mouse-config.area", "column.type=expand"]);
        }
      }
      reactData.isGroup = isGroup;
      reactData.treeNodeColumn = treeNodeColumn;
      reactData.expandColumn = expandColumn;
      reactData.isAllOverflow = isAllOverflow;
    };
    var updateHeight = function() {
      internalData.customHeight = calcHeight("height");
      internalData.customMaxHeight = calcHeight("maxHeight");
    };
    var autoCellWidth = function() {
      var tableHeader = refTableHeader.value;
      var tableBody = refTableBody.value;
      var tableFooter = refTableFooter.value;
      var bodyElem = tableBody ? tableBody.$el : null;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;
      if (!bodyElem) {
        return;
      }
      var tableWidth = 0;
      var minCellWidth = 40;
      var bodyWidth = bodyElem.clientWidth - 1;
      var remainWidth = bodyWidth;
      var meanWidth = remainWidth / 100;
      var fit = props.fit;
      var columnStore = reactData.columnStore;
      var resizeList = columnStore.resizeList, pxMinList = columnStore.pxMinList, pxList = columnStore.pxList, scaleList = columnStore.scaleList, scaleMinList = columnStore.scaleMinList, autoList = columnStore.autoList;
      pxMinList.forEach(function(column) {
        var minWidth = XEUtils$1.toInteger(column.minWidth);
        tableWidth += minWidth;
        column.renderWidth = minWidth;
      });
      scaleMinList.forEach(function(column) {
        var scaleWidth = Math.floor(XEUtils$1.toInteger(column.minWidth) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      });
      scaleList.forEach(function(column) {
        var scaleWidth = Math.floor(XEUtils$1.toInteger(column.width) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      });
      pxList.forEach(function(column) {
        var width = XEUtils$1.toInteger(column.width);
        tableWidth += width;
        column.renderWidth = width;
      });
      resizeList.forEach(function(column) {
        var width = XEUtils$1.toInteger(column.resizeWidth);
        tableWidth += width;
        column.renderWidth = width;
      });
      remainWidth -= tableWidth;
      meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0;
      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach(function(column) {
            tableWidth += meanWidth;
            column.renderWidth += meanWidth;
          });
        }
      } else {
        meanWidth = minCellWidth;
      }
      autoList.forEach(function(column) {
        var width = Math.max(meanWidth, minCellWidth);
        column.renderWidth = width;
        tableWidth += width;
      });
      if (fit) {
        var dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoList);
        var dynamicSize = dynamicList.length - 1;
        if (dynamicSize > 0) {
          var odiffer = bodyWidth - tableWidth;
          if (odiffer > 0) {
            while (odiffer > 0 && dynamicSize >= 0) {
              odiffer--;
              dynamicList[dynamicSize--].renderWidth++;
            }
            tableWidth = bodyWidth;
          }
        }
      }
      var tableHeight = bodyElem.offsetHeight;
      var overflowY = bodyElem.scrollHeight > bodyElem.clientHeight;
      var scrollbarWidth = 0;
      if (overflowY) {
        scrollbarWidth = Math.max(bodyElem.offsetWidth - bodyElem.clientWidth, 0);
      }
      reactData.scrollbarWidth = scrollbarWidth;
      reactData.overflowY = overflowY;
      internalData.tableWidth = tableWidth;
      internalData.tableHeight = tableHeight;
      var headerHeight = 0;
      if (headerElem) {
        headerHeight = headerElem.clientHeight;
        nextTick(function() {
          if (headerElem && bodyElem && headerElem.scrollLeft !== bodyElem.scrollLeft) {
            headerElem.scrollLeft = bodyElem.scrollLeft;
          }
        });
      }
      internalData.headerHeight = headerHeight;
      var overflowX = false;
      var footerHeight = 0;
      var scrollbarHeight = 0;
      if (footerElem) {
        footerHeight = footerElem.offsetHeight;
        overflowX = tableWidth > footerElem.clientWidth;
        if (overflowX) {
          scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
        }
      } else {
        overflowX = tableWidth > bodyWidth;
        if (overflowX) {
          scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
        }
      }
      internalData.footerHeight = footerHeight;
      reactData.overflowX = overflowX;
      reactData.scrollbarHeight = scrollbarHeight;
      updateHeight();
      reactData.parentHeight = Math.max(internalData.headerHeight + footerHeight + 20, tablePrivateMethods.getParentHeight());
      if (overflowX) {
        tablePrivateMethods.checkScrolling();
      }
    };
    var getOrderField = function(column) {
      var sortBy2 = column.sortBy, sortType = column.sortType;
      return function(row) {
        var cellValue;
        if (sortBy2) {
          cellValue = XEUtils$1.isFunction(sortBy2) ? sortBy2({ row, column }) : XEUtils$1.get(row, sortBy2);
        } else {
          cellValue = tablePrivateMethods.getCellLabel(row, column);
        }
        if (!sortType || sortType === "auto") {
          return isNaN(cellValue) ? cellValue : XEUtils$1.toNumber(cellValue);
        } else if (sortType === "number") {
          return XEUtils$1.toNumber(cellValue);
        } else if (sortType === "string") {
          return XEUtils$1.toValueString(cellValue);
        }
        return cellValue;
      };
    };
    var updateAfterDataIndex = function() {
      var treeConfig = props.treeConfig;
      var afterFullData = internalData.afterFullData, fullDataRowIdData = internalData.fullDataRowIdData, fullAllDataRowIdData = internalData.fullAllDataRowIdData;
      var afterTreeFullData = internalData.afterTreeFullData;
      var treeOpts = computeTreeOpts.value;
      if (treeConfig) {
        XEUtils$1.eachTree(afterTreeFullData, function(row, index, items, path) {
          var rowid = getRowid($xetable, row);
          var allrest = fullAllDataRowIdData[rowid];
          var seq = path.map(function(num, i) {
            return i % 2 === 0 ? Number(num) + 1 : ".";
          }).join("");
          if (allrest) {
            allrest.seq = seq;
            allrest._index = index;
          } else {
            var rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0 };
            fullAllDataRowIdData[rowid] = rest;
            fullDataRowIdData[rowid] = rest;
          }
        }, { children: treeOpts.transform ? treeOpts.mapChildren : treeOpts.children });
      } else {
        afterFullData.forEach(function(row, index) {
          var rowid = getRowid($xetable, row);
          var allrest = fullAllDataRowIdData[rowid];
          var seq = index + 1;
          if (allrest) {
            allrest.seq = seq;
            allrest._index = index;
          } else {
            var rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0 };
            fullAllDataRowIdData[rowid] = rest;
            fullDataRowIdData[rowid] = rest;
          }
        });
      }
    };
    var handleVirtualTreeToList = function() {
      var treeConfig = props.treeConfig;
      var treeExpandeds = reactData.treeExpandeds;
      var treeOpts = computeTreeOpts.value;
      if (treeConfig && treeOpts.transform) {
        var fullData_1 = [];
        var expandMaps_1 = /* @__PURE__ */ new Map();
        XEUtils$1.eachTree(internalData.afterTreeFullData, function(row, index, items, path, parent) {
          if (!parent || expandMaps_1.has(parent) && $xetable.findRowIndexOf(treeExpandeds, parent) > -1) {
            expandMaps_1.set(row, 1);
            fullData_1.push(row);
          }
        }, { children: treeOpts.mapChildren });
        internalData.afterFullData = fullData_1;
        updateScrollYStatus(fullData_1);
        return fullData_1;
      }
      return internalData.afterFullData;
    };
    var updateAfterFullData = function() {
      var treeConfig = props.treeConfig;
      var tableFullColumn = internalData.tableFullColumn, tableFullData = internalData.tableFullData, tableFullTreeData = internalData.tableFullTreeData;
      var filterOpts = computeFilterOpts.value;
      var sortOpts = computeSortOpts.value;
      var treeOpts = computeTreeOpts.value;
      var transform = treeOpts.transform;
      var allRemoteFilter = filterOpts.remote, allFilterMethod = filterOpts.filterMethod;
      var allRemoteSort = sortOpts.remote, allSortMethod = sortOpts.sortMethod, sortMultiple = sortOpts.multiple, chronological = sortOpts.chronological;
      var tableData = [];
      var tableTree = [];
      if (!allRemoteFilter || !allRemoteSort) {
        var filterColumns_1 = [];
        var orderColumns_1 = [];
        tableFullColumn.forEach(function(column) {
          var field = column.field, sortable = column.sortable, order = column.order, filters = column.filters;
          if (!allRemoteFilter && filters && filters.length) {
            var valueList_1 = [];
            var itemList_1 = [];
            filters.forEach(function(item) {
              if (item.checked) {
                itemList_1.push(item);
                valueList_1.push(item.value);
              }
            });
            if (itemList_1.length) {
              filterColumns_1.push({ column, valueList: valueList_1, itemList: itemList_1 });
            }
          }
          if (!allRemoteSort && sortable && order) {
            orderColumns_1.push({ column, field, property: field, order, sortTime: column.sortTime });
          }
        });
        if (sortMultiple && chronological && orderColumns_1.length > 1) {
          orderColumns_1 = XEUtils$1.orderBy(orderColumns_1, "sortTime");
        }
        if (!allRemoteFilter && filterColumns_1.length) {
          var handleFilter = function(row) {
            return filterColumns_1.every(function(_a) {
              var column = _a.column, valueList = _a.valueList, itemList = _a.itemList;
              var filterMethod = column.filterMethod, filterRender = column.filterRender;
              var compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null;
              var compFilterMethod = compConf ? compConf.filterMethod : null;
              var defaultFilterMethod = compConf ? compConf.defaultFilterMethod : null;
              var cellValue = getCellValue(row, column);
              if (filterMethod) {
                return itemList.some(function(item) {
                  return filterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xetable });
                });
              } else if (compFilterMethod) {
                return itemList.some(function(item) {
                  return compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xetable });
                });
              } else if (allFilterMethod) {
                return allFilterMethod({ options: itemList, values: valueList, cellValue, row, column });
              } else if (defaultFilterMethod) {
                return itemList.some(function(item) {
                  return defaultFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xetable });
                });
              }
              return valueList.indexOf(XEUtils$1.get(row, column.field)) > -1;
            });
          };
          if (treeConfig && transform) {
            tableTree = XEUtils$1.searchTree(tableFullTreeData, handleFilter, __assign(__assign({}, treeOpts), { original: true }));
            tableData = tableTree;
          } else {
            tableData = treeConfig ? tableFullTreeData.filter(handleFilter) : tableFullData.filter(handleFilter);
            tableTree = tableData;
          }
        } else {
          if (treeConfig && transform) {
            tableTree = XEUtils$1.searchTree(tableFullTreeData, function() {
              return true;
            }, __assign(__assign({}, treeOpts), { original: true }));
            tableData = tableTree;
          } else {
            tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0);
            tableTree = tableData;
          }
        }
        if (!allRemoteSort && orderColumns_1.length) {
          if (treeConfig && transform) {
            if (allSortMethod) {
              var sortRests = allSortMethod({ data: tableTree, sortList: orderColumns_1, $table: $xetable });
              tableTree = XEUtils$1.isArray(sortRests) ? sortRests : tableTree;
            } else {
              tableTree = XEUtils$1.orderBy(tableTree, orderColumns_1.map(function(_a) {
                var column = _a.column, order = _a.order;
                return [getOrderField(column), order];
              }));
            }
            tableData = tableTree;
          } else {
            if (allSortMethod) {
              var sortRests = allSortMethod({ data: tableData, sortList: orderColumns_1, $table: $xetable });
              tableData = XEUtils$1.isArray(sortRests) ? sortRests : tableData;
            } else {
              tableData = XEUtils$1.orderBy(tableData, orderColumns_1.map(function(_a) {
                var column = _a.column, order = _a.order;
                return [getOrderField(column), order];
              }));
            }
            tableTree = tableData;
          }
        }
      } else {
        if (treeConfig && transform) {
          tableTree = XEUtils$1.searchTree(tableFullTreeData, function() {
            return true;
          }, __assign(__assign({}, treeOpts), { original: true }));
          tableData = tableTree;
        } else {
          tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0);
          tableTree = tableData;
        }
      }
      internalData.afterFullData = tableData;
      internalData.afterTreeFullData = tableTree;
      updateAfterDataIndex();
    };
    var updateStyle = function() {
      var border = props.border, showFooter = props.showFooter, allColumnOverflow = props.showOverflow, allColumnHeaderOverflow = props.showHeaderOverflow, allColumnFooterOverflow = props.showFooterOverflow, mouseConfig = props.mouseConfig, spanMethod = props.spanMethod, footerSpanMethod = props.footerSpanMethod, keyboardConfig = props.keyboardConfig;
      var isGroup = reactData.isGroup, currentRow = reactData.currentRow, tableColumn = reactData.tableColumn, scrollXLoad = reactData.scrollXLoad, scrollYLoad = reactData.scrollYLoad, scrollbarWidth = reactData.scrollbarWidth, scrollbarHeight = reactData.scrollbarHeight, columnStore = reactData.columnStore, editStore = reactData.editStore, mergeList = reactData.mergeList, mergeFooterList = reactData.mergeFooterList, isAllOverflow = reactData.isAllOverflow;
      var visibleColumn = internalData.visibleColumn, fullColumnIdData = internalData.fullColumnIdData, tableHeight = internalData.tableHeight, tableWidth = internalData.tableWidth, headerHeight = internalData.headerHeight, footerHeight = internalData.footerHeight, elemStore = internalData.elemStore, customHeight = internalData.customHeight, customMaxHeight = internalData.customMaxHeight;
      var containerList = ["main", "left", "right"];
      var emptyPlaceholderElem = refEmptyPlaceholder.value;
      var cellOffsetWidth = computeCellOffsetWidth.value;
      var mouseOpts = computeMouseOpts.value;
      var keyboardOpts = computeKeyboardOpts.value;
      var bodyWrapperRef = elemStore["main-body-wrapper"];
      var bodyWrapperElem = bodyWrapperRef ? bodyWrapperRef.value : null;
      if (emptyPlaceholderElem) {
        emptyPlaceholderElem.style.top = "".concat(headerHeight, "px");
        emptyPlaceholderElem.style.height = bodyWrapperElem ? "".concat(bodyWrapperElem.offsetHeight - scrollbarHeight, "px") : "";
      }
      if (customHeight > 0) {
        if (showFooter) {
          customHeight += scrollbarHeight;
        }
      }
      containerList.forEach(function(name, index) {
        var fixedType = index > 0 ? name : "";
        var layoutList = ["header", "body", "footer"];
        var isFixedLeft = fixedType === "left";
        var fixedColumn = [];
        var fixedWrapperElem;
        if (fixedType) {
          fixedColumn = isFixedLeft ? columnStore.leftList : columnStore.rightList;
          fixedWrapperElem = isFixedLeft ? refLeftContainer.value : refRightContainer.value;
        }
        layoutList.forEach(function(layout) {
          var wrapperRef = elemStore["".concat(name, "-").concat(layout, "-wrapper")];
          var wrapperElem = wrapperRef ? wrapperRef.value : null;
          var tableRef = elemStore["".concat(name, "-").concat(layout, "-table")];
          var tableElem = tableRef ? tableRef.value : null;
          if (layout === "header") {
            var tWidth = tableWidth;
            var renderColumnList = tableColumn;
            if (isGroup) {
              renderColumnList = visibleColumn;
            } else {
              if (fixedType) {
                if (scrollXLoad || allColumnHeaderOverflow) {
                  renderColumnList = fixedColumn;
                }
              }
            }
            tWidth = renderColumnList.reduce(function(previous, column) {
              return previous + column.renderWidth;
            }, 0);
            if (tableElem) {
              tableElem.style.width = tWidth ? "".concat(tWidth + scrollbarWidth, "px") : "";
            }
            var repairRef = elemStore["".concat(name, "-").concat(layout, "-repair")];
            var repairElem = repairRef ? repairRef.value : null;
            if (repairElem) {
              repairElem.style.width = "".concat(tableWidth, "px");
            }
            var listRef = elemStore["".concat(name, "-").concat(layout, "-list")];
            var listElem = listRef ? listRef.value : null;
            if (isGroup && listElem) {
              XEUtils$1.arrayEach(listElem.querySelectorAll(".col--group"), function(thElem) {
                var colNode = tableMethods.getColumnNode(thElem);
                if (colNode) {
                  var column_1 = colNode.item;
                  var showHeaderOverflow = column_1.showHeaderOverflow;
                  var cellOverflow = XEUtils$1.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow;
                  var showEllipsis = cellOverflow === "ellipsis";
                  var showTitle = cellOverflow === "title";
                  var showTooltip = cellOverflow === true || cellOverflow === "tooltip";
                  var hasEllipsis = showTitle || showTooltip || showEllipsis;
                  var childWidth_1 = 0;
                  var countChild_1 = 0;
                  if (hasEllipsis) {
                    XEUtils$1.eachTree(column_1.children, function(item) {
                      if (!item.children || !column_1.children.length) {
                        countChild_1++;
                      }
                      childWidth_1 += item.renderWidth;
                    }, { children: "children" });
                  }
                  thElem.style.width = hasEllipsis ? "".concat(childWidth_1 - countChild_1 - (border ? 2 : 0), "px") : "";
                }
              });
            }
          } else if (layout === "body") {
            var emptyBlockRef = elemStore["".concat(name, "-").concat(layout, "-emptyBlock")];
            var emptyBlockElem = emptyBlockRef ? emptyBlockRef.value : null;
            if (isNodeElement(wrapperElem)) {
              if (customMaxHeight) {
                wrapperElem.style.maxHeight = "".concat(fixedType ? customMaxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : customMaxHeight - headerHeight, "px");
              } else {
                if (customHeight > 0) {
                  wrapperElem.style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight, "px");
                } else {
                  wrapperElem.style.height = "";
                }
              }
            }
            if (fixedWrapperElem) {
              if (isNodeElement(wrapperElem)) {
                wrapperElem.style.top = "".concat(headerHeight, "px");
              }
              fixedWrapperElem.style.height = "".concat((customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1), "px");
              fixedWrapperElem.style.width = "".concat(fixedColumn.reduce(function(previous, column) {
                return previous + column.renderWidth;
              }, isFixedLeft ? 0 : scrollbarWidth), "px");
            }
            var tWidth = tableWidth;
            var renderColumnList = tableColumn;
            if (fixedType) {
              if (scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow)) {
                if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
                  renderColumnList = fixedColumn;
                } else {
                  renderColumnList = visibleColumn;
                }
              } else {
                renderColumnList = visibleColumn;
              }
            }
            tWidth = renderColumnList.reduce(function(previous, column) {
              return previous + column.renderWidth;
            }, 0);
            if (tableElem) {
              tableElem.style.width = tWidth ? "".concat(tWidth, "px") : "";
              tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse["-moz"] || browse.safari) ? "".concat(scrollbarWidth, "px") : "";
            }
            if (emptyBlockElem) {
              emptyBlockElem.style.width = tWidth ? "".concat(tWidth, "px") : "";
            }
          } else if (layout === "footer") {
            var tWidth = tableWidth;
            var renderColumnList = tableColumn;
            if (fixedType) {
              if (scrollXLoad || allColumnFooterOverflow) {
                if (!mergeFooterList.length || !footerSpanMethod) {
                  renderColumnList = fixedColumn;
                } else {
                  renderColumnList = visibleColumn;
                }
              } else {
                renderColumnList = visibleColumn;
              }
            }
            tWidth = renderColumnList.reduce(function(previous, column) {
              return previous + column.renderWidth;
            }, 0);
            if (isNodeElement(wrapperElem)) {
              if (fixedWrapperElem) {
                wrapperElem.style.top = "".concat(customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight, "px");
              }
              wrapperElem.style.marginTop = "".concat(-Math.max(1, scrollbarHeight), "px");
            }
            if (tableElem) {
              tableElem.style.width = tWidth ? "".concat(tWidth + scrollbarWidth, "px") : "";
            }
          }
          var colgroupRef = elemStore["".concat(name, "-").concat(layout, "-colgroup")];
          var colgroupElem = colgroupRef ? colgroupRef.value : null;
          if (colgroupElem) {
            XEUtils$1.arrayEach(colgroupElem.children, function(colElem) {
              var colid = colElem.getAttribute("name");
              if (colid === "col_gutter") {
                colElem.style.width = "".concat(scrollbarWidth, "px");
              }
              if (fullColumnIdData[colid]) {
                var column_2 = fullColumnIdData[colid].column;
                var showHeaderOverflow = column_2.showHeaderOverflow, showFooterOverflow = column_2.showFooterOverflow, showOverflow = column_2.showOverflow;
                var cellOverflow = void 0;
                colElem.style.width = "".concat(column_2.renderWidth, "px");
                if (layout === "header") {
                  cellOverflow = XEUtils$1.isUndefined(showHeaderOverflow) || XEUtils$1.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
                } else if (layout === "footer") {
                  cellOverflow = XEUtils$1.isUndefined(showFooterOverflow) || XEUtils$1.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
                } else {
                  cellOverflow = XEUtils$1.isUndefined(showOverflow) || XEUtils$1.isNull(showOverflow) ? allColumnOverflow : showOverflow;
                }
                var showEllipsis = cellOverflow === "ellipsis";
                var showTitle = cellOverflow === "title";
                var showTooltip = cellOverflow === true || cellOverflow === "tooltip";
                var hasEllipsis_1 = showTitle || showTooltip || showEllipsis;
                var listRef2 = elemStore["".concat(name, "-").concat(layout, "-list")];
                var listElem2 = listRef2 ? listRef2.value : null;
                if (scrollYLoad && !hasEllipsis_1) {
                  hasEllipsis_1 = true;
                }
                if (listElem2) {
                  XEUtils$1.arrayEach(listElem2.querySelectorAll(".".concat(column_2.id)), function(elem) {
                    var colspan = parseInt(elem.getAttribute("colspan") || 1);
                    var cellElem = elem.querySelector(".vxe-cell");
                    var colWidth = column_2.renderWidth;
                    if (cellElem) {
                      if (colspan > 1) {
                        var columnIndex = tableMethods.getColumnIndex(column_2);
                        for (var index_1 = 1; index_1 < colspan; index_1++) {
                          var nextColumn = tableMethods.getColumns(columnIndex + index_1);
                          if (nextColumn) {
                            colWidth += nextColumn.renderWidth;
                          }
                        }
                      }
                      cellElem.style.width = hasEllipsis_1 ? "".concat(colWidth - cellOffsetWidth * colspan, "px") : "";
                    }
                  });
                }
              }
            });
          }
        });
      });
      if (currentRow) {
        tableMethods.setCurrentRow(currentRow);
      }
      if (mouseConfig && mouseOpts.selected && editStore.selected.row && editStore.selected.column) {
        $xetable.addCellSelectedClass();
      }
      return nextTick();
    };
    var checkValidate = function(type) {
      if ($xetable.triggerValidate) {
        return $xetable.triggerValidate(type);
      }
      return nextTick();
    };
    var handleChangeCell = function(evnt, params) {
      checkValidate("blur").catch(function(e) {
        return e;
      }).then(function() {
        $xetable.handleActived(params, evnt).then(function() {
          return checkValidate("change");
        }).catch(function(e) {
          return e;
        });
      });
    };
    var handleDefaultSort = function() {
      var sortConfig = props.sortConfig;
      if (sortConfig) {
        var sortOpts = computeSortOpts.value;
        var defaultSort = sortOpts.defaultSort;
        if (defaultSort) {
          if (!XEUtils$1.isArray(defaultSort)) {
            defaultSort = [defaultSort];
          }
          if (defaultSort.length) {
            (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach(function(item, index) {
              var field = item.field, order = item.order;
              if (field && order) {
                var column = tableMethods.getColumnByField(field);
                if (column && column.sortable) {
                  column.order = order;
                  column.sortTime = Date.now() + index;
                }
              }
            });
            if (!sortOpts.remote) {
              tablePrivateMethods.handleTableData(true).then(updateStyle);
            }
          }
        }
      }
    };
    var handleDefaultSelectionChecked = function() {
      var checkboxConfig = props.checkboxConfig;
      if (checkboxConfig) {
        var fullDataRowIdData_1 = internalData.fullDataRowIdData;
        var checkboxOpts = computeCheckboxOpts.value;
        var checkAll = checkboxOpts.checkAll, checkRowKeys = checkboxOpts.checkRowKeys;
        if (checkAll) {
          tableMethods.setAllCheckboxRow(true);
        } else if (checkRowKeys) {
          var defSelection_1 = [];
          checkRowKeys.forEach(function(rowid) {
            if (fullDataRowIdData_1[rowid]) {
              defSelection_1.push(fullDataRowIdData_1[rowid].row);
            }
          });
          tableMethods.setCheckboxRow(defSelection_1, true);
        }
      }
    };
    var handleDefaultRadioChecked = function() {
      var _a;
      var radioConfig = props.radioConfig;
      if (radioConfig) {
        var fullDataRowIdData = internalData.fullDataRowIdData;
        var radioOpts = computeRadioOpts.value;
        var rowid = radioOpts.checkRowKey, reserve = radioOpts.reserve;
        if (rowid) {
          if (fullDataRowIdData[rowid]) {
            tableMethods.setRadioRow(fullDataRowIdData[rowid].row);
          }
          if (reserve) {
            var rowkey = getRowkey($xetable);
            internalData.radioReserveRow = (_a = {}, _a[rowkey] = rowid, _a);
          }
        }
      }
    };
    var handleDefaultRowExpand = function() {
      var expandConfig = props.expandConfig;
      if (expandConfig) {
        var fullDataRowIdData_2 = internalData.fullDataRowIdData;
        var expandOpts = computeExpandOpts.value;
        var expandAll = expandOpts.expandAll, expandRowKeys = expandOpts.expandRowKeys;
        if (expandAll) {
          tableMethods.setAllRowExpand(true);
        } else if (expandRowKeys) {
          var defExpandeds_1 = [];
          expandRowKeys.forEach(function(rowid) {
            if (fullDataRowIdData_2[rowid]) {
              defExpandeds_1.push(fullDataRowIdData_2[rowid].row);
            }
          });
          tableMethods.setRowExpand(defExpandeds_1, true);
        }
      }
    };
    var handleRadioReserveRow = function(row) {
      var radioOpts = computeRadioOpts.value;
      if (radioOpts.reserve) {
        internalData.radioReserveRow = row;
      }
    };
    var handleCheckboxReserveRow = function(row, checked) {
      var checkboxReserveRowMap = internalData.checkboxReserveRowMap;
      var checkboxOpts = computeCheckboxOpts.value;
      if (checkboxOpts.reserve) {
        var rowid = getRowid($xetable, row);
        if (checked) {
          checkboxReserveRowMap[rowid] = row;
        } else if (checkboxReserveRowMap[rowid]) {
          delete checkboxReserveRowMap[rowid];
        }
      }
    };
    var handleReserveStatus = function() {
      var treeConfig = props.treeConfig;
      var expandColumn = reactData.expandColumn, currentRow = reactData.currentRow, selectRow = reactData.selectRow, selection = reactData.selection, rowExpandeds = reactData.rowExpandeds, treeExpandeds = reactData.treeExpandeds;
      var fullDataRowIdData = internalData.fullDataRowIdData, fullAllDataRowIdData = internalData.fullAllDataRowIdData, radioReserveRow = internalData.radioReserveRow;
      var expandOpts = computeExpandOpts.value;
      var treeOpts = computeTreeOpts.value;
      var radioOpts = computeRadioOpts.value;
      var checkboxOpts = computeCheckboxOpts.value;
      if (selectRow && !fullAllDataRowIdData[getRowid($xetable, selectRow)]) {
        reactData.selectRow = null;
      }
      if (radioOpts.reserve && radioReserveRow) {
        var rowid = getRowid($xetable, radioReserveRow);
        if (fullDataRowIdData[rowid]) {
          tableMethods.setRadioRow(fullDataRowIdData[rowid].row);
        }
      }
      reactData.selection = getRecoverRow(selection);
      if (checkboxOpts.reserve) {
        tableMethods.setCheckboxRow(handleReserveRow(internalData.checkboxReserveRowMap), true);
      }
      if (currentRow && !fullAllDataRowIdData[getRowid($xetable, currentRow)]) {
        reactData.currentRow = null;
      }
      reactData.rowExpandeds = expandColumn ? getRecoverRow(rowExpandeds) : [];
      if (expandColumn && expandOpts.reserve) {
        tableMethods.setRowExpand(handleReserveRow(internalData.rowExpandedReserveRowMap), true);
      }
      reactData.treeExpandeds = treeConfig ? getRecoverRow(treeExpandeds) : [];
      if (treeConfig && treeOpts.reserve) {
        tableMethods.setTreeExpand(handleReserveRow(internalData.treeExpandedReserveRowMap), true);
      }
    };
    var handleDefaultTreeExpand = function() {
      var treeConfig = props.treeConfig;
      if (treeConfig) {
        var tableFullData_1 = internalData.tableFullData;
        var treeOpts_1 = computeTreeOpts.value;
        var expandAll = treeOpts_1.expandAll, expandRowKeys = treeOpts_1.expandRowKeys;
        if (expandAll) {
          tableMethods.setAllTreeExpand(true);
        } else if (expandRowKeys) {
          var defExpandeds_2 = [];
          var rowkey_1 = getRowkey($xetable);
          expandRowKeys.forEach(function(rowid) {
            var matchObj = XEUtils$1.findTree(tableFullData_1, function(item) {
              return rowid === XEUtils$1.get(item, rowkey_1);
            }, treeOpts_1);
            if (matchObj) {
              defExpandeds_2.push(matchObj.item);
            }
          });
          tableMethods.setTreeExpand(defExpandeds_2, true);
        }
      }
    };
    var handleAsyncTreeExpandChilds = function(row) {
      var treeExpandeds = reactData.treeExpandeds, treeLazyLoadeds = reactData.treeLazyLoadeds;
      var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
      var treeOpts = computeTreeOpts.value;
      var checkboxOpts = computeCheckboxOpts.value;
      var transform = treeOpts.transform, loadMethod = treeOpts.loadMethod;
      var checkStrictly = checkboxOpts.checkStrictly;
      var rest = fullAllDataRowIdData[getRowid($xetable, row)];
      return new Promise(function(resolve) {
        if (loadMethod) {
          treeLazyLoadeds.push(row);
          loadMethod({ $table: $xetable, row }).then(function(childRecords) {
            rest.treeLoaded = true;
            XEUtils$1.remove(treeLazyLoadeds, function(item) {
              return $xetable.eqRow(item, row);
            });
            if (!XEUtils$1.isArray(childRecords)) {
              childRecords = [];
            }
            if (childRecords) {
              return tableMethods.loadTreeChildren(row, childRecords).then(function(childRows) {
                if (childRows.length && $xetable.findRowIndexOf(treeExpandeds, row) === -1) {
                  treeExpandeds.push(row);
                }
                if (!checkStrictly && tableMethods.isCheckedByCheckboxRow(row)) {
                  tableMethods.setCheckboxRow(childRows, true);
                }
                return nextTick().then(function() {
                  if (transform) {
                    return tablePrivateMethods.handleTableData();
                  }
                });
              });
            }
          }).catch(function() {
            rest.treeLoaded = false;
            XEUtils$1.remove(treeLazyLoadeds, function(item) {
              return $xetable.eqRow(item, row);
            });
          }).finally(function() {
            nextTick().then(function() {
              return tableMethods.recalculate();
            }).then(function() {
              return resolve();
            });
          });
        } else {
          resolve();
        }
      });
    };
    var handleTreeExpandReserve = function(row, expanded) {
      var treeExpandedReserveRowMap = internalData.treeExpandedReserveRowMap;
      var treeOpts = computeTreeOpts.value;
      if (treeOpts.reserve) {
        var rowid = getRowid($xetable, row);
        if (expanded) {
          treeExpandedReserveRowMap[rowid] = row;
        } else if (treeExpandedReserveRowMap[rowid]) {
          delete treeExpandedReserveRowMap[rowid];
        }
      }
    };
    var handleAsyncRowExpand = function(row) {
      var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
      return new Promise(function(resolve) {
        var expandOpts = computeExpandOpts.value;
        var loadMethod = expandOpts.loadMethod;
        if (loadMethod) {
          var rest_1 = fullAllDataRowIdData[getRowid($xetable, row)];
          reactData.expandLazyLoadeds.push(row);
          loadMethod({ $table: $xetable, row, rowIndex: tableMethods.getRowIndex(row), $rowIndex: tableMethods.getVMRowIndex(row) }).then(function() {
            rest_1.expandLoaded = true;
            reactData.rowExpandeds.push(row);
          }).catch(function() {
            rest_1.expandLoaded = false;
          }).finally(function() {
            XEUtils$1.remove(reactData.expandLazyLoadeds, function(item) {
              return $xetable.eqRow(item, row);
            });
            resolve(nextTick().then(function() {
              return tableMethods.recalculate();
            }));
          });
        } else {
          resolve();
        }
      });
    };
    var handleRowExpandReserve = function(row, expanded) {
      var rowExpandedReserveRowMap = internalData.rowExpandedReserveRowMap;
      var expandOpts = computeExpandOpts.value;
      if (expandOpts.reserve) {
        var rowid = getRowid($xetable, row);
        if (expanded) {
          rowExpandedReserveRowMap[rowid] = row;
        } else if (rowExpandedReserveRowMap[rowid]) {
          delete rowExpandedReserveRowMap[rowid];
        }
      }
    };
    var handleDefaultMergeCells = function() {
      var mergeCells = props.mergeCells;
      if (mergeCells) {
        tableMethods.setMergeCells(mergeCells);
      }
    };
    var handleDefaultMergeFooterItems = function() {
      var mergeFooterItems = props.mergeFooterItems;
      if (mergeFooterItems) {
        tableMethods.setMergeFooterItems(mergeFooterItems);
      }
    };
    var computeScrollLoad = function() {
      return nextTick().then(function() {
        var scrollXLoad = reactData.scrollXLoad, scrollYLoad = reactData.scrollYLoad;
        var scrollXStore = internalData.scrollXStore, scrollYStore = internalData.scrollYStore;
        var sYOpts = computeSYOpts.value;
        var sXOpts = computeSXOpts.value;
        if (scrollXLoad) {
          var visibleXSize = computeVirtualX().visibleSize;
          var offsetXSize = sXOpts.oSize ? XEUtils$1.toNumber(sXOpts.oSize) : browse.edge ? 5 : 0;
          scrollXStore.offsetSize = offsetXSize;
          scrollXStore.visibleSize = visibleXSize;
          scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex);
          tablePrivateMethods.updateScrollXData();
        } else {
          tablePrivateMethods.updateScrollXSpace();
        }
        var _a = computeVirtualY(), rowHeight = _a.rowHeight, visibleYSize = _a.visibleSize;
        scrollYStore.rowHeight = rowHeight;
        if (scrollYLoad) {
          var offsetYSize = sYOpts.oSize ? XEUtils$1.toNumber(sYOpts.oSize) : browse.edge ? 10 : 0;
          scrollYStore.offsetSize = offsetYSize;
          scrollYStore.visibleSize = visibleYSize;
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex);
          tablePrivateMethods.updateScrollYData();
        } else {
          tablePrivateMethods.updateScrollYSpace();
        }
        reactData.rowHeight = rowHeight;
        nextTick(updateStyle);
      });
    };
    var loadTableData = function(datas) {
      var keepSource = props.keepSource, treeConfig = props.treeConfig;
      var editStore = reactData.editStore, oldScrollYLoad = reactData.scrollYLoad;
      var scrollYStore = internalData.scrollYStore, scrollXStore = internalData.scrollXStore, lastScrollLeft = internalData.lastScrollLeft, lastScrollTop = internalData.lastScrollTop;
      var treeOpts = computeTreeOpts.value;
      var transform = treeOpts.transform;
      var treeData = [];
      var fullData = datas ? datas.slice(0) : [];
      if (treeConfig) {
        if (transform) {
          if (process.env.NODE_ENV === "development") {
            if (!treeOpts.rowField) {
              errLog("vxe.error.reqProp", ["tree-config.rowField"]);
            }
            if (!treeOpts.parentField) {
              errLog("vxe.error.reqProp", ["tree-config.parentField"]);
            }
            if (!treeOpts.children) {
              errLog("vxe.error.reqProp", ["tree-config.children"]);
            }
            if (!treeOpts.mapChildren) {
              errLog("vxe.error.reqProp", ["tree-config.mapChildren"]);
            }
            if (treeOpts.children === treeOpts.mapChildren) {
              errLog("vxe.error.errConflicts", ["tree-config.children", "tree-config.mapChildren"]);
            }
            fullData.forEach(function(row) {
              if (row[treeOpts.children] && row[treeOpts.children].length) {
                warnLog("vxe.error.errConflicts", ["tree-config.transform", "row.".concat(treeOpts.children)]);
              }
            });
          }
          treeData = XEUtils$1.toArrayTree(fullData, {
            key: treeOpts.rowField,
            parentKey: treeOpts.parentField,
            children: treeOpts.children,
            mapChildren: treeOpts.mapChildren
          });
          fullData = treeData.slice(0);
        } else {
          treeData = fullData.slice(0);
        }
      }
      scrollYStore.startIndex = 0;
      scrollYStore.endIndex = 1;
      scrollXStore.startIndex = 0;
      scrollXStore.endIndex = 1;
      editStore.insertList = [];
      editStore.removeList = [];
      var sYLoad = updateScrollYStatus(fullData);
      reactData.scrollYLoad = sYLoad;
      internalData.tableFullData = fullData;
      internalData.tableFullTreeData = treeData;
      tablePrivateMethods.cacheRowMap(true);
      internalData.tableSynchData = datas;
      if (keepSource) {
        internalData.tableSourceData = XEUtils$1.clone(fullData, true);
      }
      if (process.env.NODE_ENV === "development") {
        if (sYLoad) {
          if (!(props.height || props.maxHeight)) {
            errLog("vxe.error.reqProp", ["table.height | table.max-height | table.scroll-y={enabled: false}"]);
          }
          if (!props.showOverflow) {
            warnLog("vxe.error.reqProp", ["table.show-overflow"]);
          }
          if (props.spanMethod) {
            warnLog("vxe.error.scrollErrProp", ["table.span-method"]);
          }
        }
      }
      if ($xetable.clearCellAreas && props.mouseConfig) {
        $xetable.clearCellAreas();
        $xetable.clearCopyCellArea();
      }
      tableMethods.clearMergeCells();
      tableMethods.clearMergeFooterItems();
      tablePrivateMethods.handleTableData(true);
      tableMethods.updateFooter();
      return nextTick().then(function() {
        updateHeight();
        updateStyle();
      }).then(function() {
        computeScrollLoad();
      }).then(function() {
        if (sYLoad) {
          scrollYStore.endIndex = scrollYStore.visibleSize;
        }
        handleReserveStatus();
        tablePrivateMethods.checkSelectionStatus();
        return new Promise(function(resolve) {
          nextTick().then(function() {
            return tableMethods.recalculate();
          }).then(function() {
            var targetScrollLeft = lastScrollLeft;
            var targetScrollTop = lastScrollTop;
            var sXOpts = computeSXOpts.value;
            var sYOpts = computeSYOpts.value;
            if (sXOpts.scrollToLeftOnChange) {
              targetScrollLeft = 0;
            }
            if (sYOpts.scrollToTopOnChange) {
              targetScrollTop = 0;
            }
            if (oldScrollYLoad === sYLoad) {
              restoreScrollLocation($xetable, targetScrollLeft, targetScrollTop).then(resolve);
            } else {
              setTimeout(function() {
                return restoreScrollLocation($xetable, targetScrollLeft, targetScrollTop).then(resolve);
              });
            }
          });
        });
      });
    };
    var handleLoadDefaults = function() {
      handleDefaultSelectionChecked();
      handleDefaultRadioChecked();
      handleDefaultRowExpand();
      handleDefaultTreeExpand();
      handleDefaultMergeCells();
      handleDefaultMergeFooterItems();
      nextTick(function() {
        return setTimeout(function() {
          return tableMethods.recalculate();
        });
      });
    };
    var handleInitDefaults = function() {
      handleDefaultSort();
    };
    var handleTableColumn = function() {
      var scrollXLoad = reactData.scrollXLoad;
      var visibleColumn = internalData.visibleColumn, scrollXStore = internalData.scrollXStore, fullColumnIdData = internalData.fullColumnIdData;
      var tableColumn = scrollXLoad ? visibleColumn.slice(scrollXStore.startIndex, scrollXStore.endIndex) : visibleColumn.slice(0);
      tableColumn.forEach(function(column, $index) {
        var colid = column.id;
        var rest = fullColumnIdData[colid];
        if (rest) {
          rest.$index = $index;
        }
      });
      reactData.tableColumn = tableColumn;
    };
    var loadScrollXData = function() {
      var mergeList = reactData.mergeList, mergeFooterList = reactData.mergeFooterList;
      var scrollXStore = internalData.scrollXStore;
      var startIndex = scrollXStore.startIndex, endIndex = scrollXStore.endIndex, offsetSize = scrollXStore.offsetSize;
      var _a = computeVirtualX(), toVisibleIndex = _a.toVisibleIndex, visibleSize = _a.visibleSize;
      var offsetItem = {
        startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
        endIndex: toVisibleIndex + visibleSize + offsetSize
      };
      calculateMergerOffserIndex(mergeList.concat(mergeFooterList), offsetItem, "col");
      var offsetStartIndex = offsetItem.startIndex, offsetEndIndex = offsetItem.endIndex;
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollXStore.startIndex = offsetStartIndex;
          scrollXStore.endIndex = offsetEndIndex;
          tablePrivateMethods.updateScrollXData();
        }
      }
      tableMethods.closeTooltip();
    };
    var getColumnList = function(columns) {
      var result = [];
      columns.forEach(function(column) {
        result.push.apply(result, column.children && column.children.length ? getColumnList(column.children) : [column]);
      });
      return result;
    };
    var parseColumns = function() {
      var leftList = [];
      var centerList = [];
      var rightList = [];
      var isGroup = reactData.isGroup, columnStore = reactData.columnStore;
      var sXOpts = computeSXOpts.value;
      var collectColumn = internalData.collectColumn, tableFullColumn = internalData.tableFullColumn, scrollXStore = internalData.scrollXStore, fullColumnIdData = internalData.fullColumnIdData;
      if (isGroup) {
        var leftGroupList_1 = [];
        var centerGroupList_1 = [];
        var rightGroupList_1 = [];
        XEUtils$1.eachTree(collectColumn, function(column, index, items, path, parent) {
          var isColGroup = hasChildrenList(column);
          if (parent && parent.fixed) {
            column.fixed = parent.fixed;
          }
          if (parent && column.fixed !== parent.fixed) {
            errLog("vxe.error.groupFixed");
          }
          if (isColGroup) {
            column.visible = !!XEUtils$1.findTree(column.children, function(subColumn) {
              return hasChildrenList(subColumn) ? false : subColumn.visible;
            });
          } else if (column.visible) {
            if (column.fixed === "left") {
              leftList.push(column);
            } else if (column.fixed === "right") {
              rightList.push(column);
            } else {
              centerList.push(column);
            }
          }
        });
        collectColumn.forEach(function(column) {
          if (column.visible) {
            if (column.fixed === "left") {
              leftGroupList_1.push(column);
            } else if (column.fixed === "right") {
              rightGroupList_1.push(column);
            } else {
              centerGroupList_1.push(column);
            }
          }
        });
        reactData.tableGroupColumn = leftGroupList_1.concat(centerGroupList_1).concat(rightGroupList_1);
      } else {
        tableFullColumn.forEach(function(column) {
          if (column.visible) {
            if (column.fixed === "left") {
              leftList.push(column);
            } else if (column.fixed === "right") {
              rightList.push(column);
            } else {
              centerList.push(column);
            }
          }
        });
      }
      var visibleColumn = leftList.concat(centerList).concat(rightList);
      var scrollXLoad = !!sXOpts.enabled && sXOpts.gt > -1 && sXOpts.gt < tableFullColumn.length;
      reactData.hasFixedColumn = leftList.length > 0 || rightList.length > 0;
      Object.assign(columnStore, { leftList, centerList, rightList });
      if (scrollXLoad) {
        if (process.env.NODE_ENV === "development") {
          if (props.showHeader && !props.showHeaderOverflow) {
            warnLog("vxe.error.reqProp", ["show-header-overflow"]);
          }
          if (props.showFooter && !props.showFooterOverflow) {
            warnLog("vxe.error.reqProp", ["show-footer-overflow"]);
          }
          if (props.spanMethod) {
            warnLog("vxe.error.scrollErrProp", ["span-method"]);
          }
          if (props.footerSpanMethod) {
            warnLog("vxe.error.scrollErrProp", ["footer-span-method"]);
          }
        }
        var visibleSize = computeVirtualX().visibleSize;
        scrollXStore.startIndex = 0;
        scrollXStore.endIndex = visibleSize;
        scrollXStore.visibleSize = visibleSize;
      }
      if (visibleColumn.length !== internalData.visibleColumn.length || !internalData.visibleColumn.every(function(column, index) {
        return column === visibleColumn[index];
      })) {
        tableMethods.clearMergeCells();
        tableMethods.clearMergeFooterItems();
      }
      reactData.scrollXLoad = scrollXLoad;
      visibleColumn.forEach(function(column, index) {
        var colid = column.id;
        var rest = fullColumnIdData[colid];
        if (rest) {
          rest._index = index;
        }
      });
      internalData.visibleColumn = visibleColumn;
      handleTableColumn();
      return tableMethods.updateFooter().then(function() {
        return tableMethods.recalculate();
      }).then(function() {
        tablePrivateMethods.updateCellAreas();
        return tableMethods.recalculate();
      });
    };
    var handleColumn = function(collectColumn) {
      internalData.collectColumn = collectColumn;
      var tableFullColumn = getColumnList(collectColumn);
      internalData.tableFullColumn = tableFullColumn;
      cacheColumnMap();
      restoreCustomStorage();
      parseColumns().then(function() {
        if (reactData.scrollXLoad) {
          loadScrollXData();
        }
      });
      tableMethods.clearMergeCells();
      tableMethods.clearMergeFooterItems();
      tablePrivateMethods.handleTableData(true);
      if (process.env.NODE_ENV === "development") {
        if ((reactData.scrollXLoad || reactData.scrollYLoad) && reactData.expandColumn) {
          warnLog("vxe.error.scrollErrProp", ["column.type=expand"]);
        }
      }
      return nextTick().then(function() {
        if ($xetoolbar) {
          $xetoolbar.syncUpdate({ collectColumn, $table: $xetable });
        }
        return tableMethods.recalculate();
      });
    };
    var updateScrollYStatus = function(fullData) {
      var treeConfig = props.treeConfig;
      var sYOpts = computeSYOpts.value;
      var treeOpts = computeTreeOpts.value;
      var transform = treeOpts.transform;
      var scrollYLoad = (transform || !treeConfig) && !!sYOpts.enabled && sYOpts.gt > -1 && sYOpts.gt < fullData.length;
      reactData.scrollYLoad = scrollYLoad;
      return scrollYLoad;
    };
    var handleBaseTreeExpand = function(rows, expanded) {
      var treeExpandeds = reactData.treeExpandeds, treeLazyLoadeds = reactData.treeLazyLoadeds, treeNodeColumn = reactData.treeNodeColumn;
      var fullAllDataRowIdData = internalData.fullAllDataRowIdData, tableFullData = internalData.tableFullData;
      var treeOpts = computeTreeOpts.value;
      var reserve = treeOpts.reserve, lazy = treeOpts.lazy, hasChild = treeOpts.hasChild, children = treeOpts.children, accordion = treeOpts.accordion, toggleMethod = treeOpts.toggleMethod;
      var result = [];
      var columnIndex = tableMethods.getColumnIndex(treeNodeColumn);
      var $columnIndex = tableMethods.getVMColumnIndex(treeNodeColumn);
      var validRows = toggleMethod ? rows.filter(function(row) {
        return toggleMethod({ $table: $xetable, expanded, column: treeNodeColumn, columnIndex, $columnIndex, row });
      }) : rows;
      if (accordion) {
        validRows = validRows.length ? [validRows[validRows.length - 1]] : [];
        var matchObj_1 = XEUtils$1.findTree(tableFullData, function(item) {
          return item === validRows[0];
        }, treeOpts);
        if (matchObj_1) {
          XEUtils$1.remove(treeExpandeds, function(item) {
            return matchObj_1.items.indexOf(item) > -1;
          });
        }
      }
      if (expanded) {
        validRows.forEach(function(row) {
          if ($xetable.findRowIndexOf(treeExpandeds, row) === -1) {
            var rest = fullAllDataRowIdData[getRowid($xetable, row)];
            var isLoad = lazy && row[hasChild] && !rest.treeLoaded && $xetable.findRowIndexOf(treeLazyLoadeds, row) === -1;
            if (isLoad) {
              result.push(handleAsyncTreeExpandChilds(row));
            } else {
              if (row[children] && row[children].length) {
                treeExpandeds.push(row);
              }
            }
          }
        });
      } else {
        XEUtils$1.remove(treeExpandeds, function(row) {
          return $xetable.findRowIndexOf(validRows, row) > -1;
        });
      }
      if (reserve) {
        validRows.forEach(function(row) {
          return handleTreeExpandReserve(row, expanded);
        });
      }
      return Promise.all(result).then(function() {
        return tableMethods.recalculate();
      });
    };
    var handleVirtualTreeExpand = function(rows, expanded) {
      return handleBaseTreeExpand(rows, expanded).then(function() {
        handleVirtualTreeToList();
        return tablePrivateMethods.handleTableData();
      }).then(function() {
        return tableMethods.recalculate();
      });
    };
    var loadScrollYData = function(evnt) {
      var mergeList = reactData.mergeList;
      var scrollYStore = internalData.scrollYStore;
      var startIndex = scrollYStore.startIndex, endIndex = scrollYStore.endIndex, visibleSize = scrollYStore.visibleSize, offsetSize = scrollYStore.offsetSize, rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.currentTarget || evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.floor(scrollTop / rowHeight);
      var offsetItem = {
        startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
        endIndex: toVisibleIndex + visibleSize + offsetSize
      };
      calculateMergerOffserIndex(mergeList, offsetItem, "row");
      var offsetStartIndex = offsetItem.startIndex, offsetEndIndex = offsetItem.endIndex;
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex;
          scrollYStore.endIndex = offsetEndIndex;
          tablePrivateMethods.updateScrollYData();
        }
      }
    };
    var createGetRowCacheProp = function(prop) {
      return function(row) {
        var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
        if (row) {
          var rowid = getRowid($xetable, row);
          var rest = fullAllDataRowIdData[rowid];
          if (rest) {
            return rest[prop];
          }
        }
        return -1;
      };
    };
    var createGetColumnCacheProp = function(prop) {
      return function(column) {
        var fullColumnIdData = internalData.fullColumnIdData;
        if (column) {
          var rest = fullColumnIdData[column.id];
          if (rest) {
            return rest[prop];
          }
        }
        return -1;
      };
    };
    var debounceScrollY = XEUtils$1.debounce(function(evnt) {
      loadScrollYData(evnt);
    }, 20, { leading: false, trailing: true });
    var keyCtxTimeout;
    tableMethods = {
      dispatchEvent: function(type, params, evnt) {
        emit(type, Object.assign({ $table: $xetable, $event: evnt }, params));
      },
      /**
       * 重置表格的一切数据状态
       */
      clearAll: function() {
        return clearTableAllStatus($xetable);
      },
      /**
       * 同步 data 数据（即将废弃）
       * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
       * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
       */
      syncData: function() {
        return nextTick().then(function() {
          reactData.tableData = [];
          emit("update:data", internalData.tableFullData);
          return nextTick();
        });
      },
      /**
       * 手动处理数据，用于手动排序与筛选
       * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
       */
      updateData: function() {
        var scrollXLoad = reactData.scrollXLoad, scrollYLoad = reactData.scrollYLoad;
        return tablePrivateMethods.handleTableData(true).then(function() {
          tableMethods.updateFooter();
          if (scrollXLoad || scrollYLoad) {
            if (scrollXLoad) {
              tablePrivateMethods.updateScrollXSpace();
            }
            if (scrollYLoad) {
              tablePrivateMethods.updateScrollYSpace();
            }
            return tableMethods.refreshScroll();
          }
        }).then(function() {
          tablePrivateMethods.updateCellAreas();
          return tableMethods.recalculate(true);
        }).then(function() {
          setTimeout(function() {
            return $xetable.recalculate();
          }, 50);
        });
      },
      /**
       * 重新加载数据，不会清空表格状态
       * @param {Array} datas 数据
       */
      loadData: function(datas) {
        var inited = internalData.inited, initStatus = internalData.initStatus;
        return loadTableData(datas).then(function() {
          internalData.inited = true;
          internalData.initStatus = true;
          if (!initStatus) {
            handleLoadDefaults();
          }
          if (!inited) {
            handleInitDefaults();
          }
          return tableMethods.recalculate();
        });
      },
      /**
       * 重新加载数据，会清空表格状态
       * @param {Array} datas 数据
       */
      reloadData: function(datas) {
        var inited = internalData.inited;
        return tableMethods.clearAll().then(function() {
          internalData.inited = true;
          internalData.initStatus = true;
          return loadTableData(datas);
        }).then(function() {
          handleLoadDefaults();
          if (!inited) {
            handleInitDefaults();
          }
          return tableMethods.recalculate();
        });
      },
      /**
       * 局部加载行数据并恢复到初始状态
       * 对于行数据需要局部更改的场景中可能会用到
       * @param {Row} row 行对象
       * @param {Object} record 新数据
       * @param {String} field 字段名
       */
      reloadRow: function(row, record, field) {
        var keepSource = props.keepSource;
        var tableData = reactData.tableData;
        var tableSourceData = internalData.tableSourceData;
        if (keepSource) {
          var rowIndex = tableMethods.getRowIndex(row);
          var oRow = tableSourceData[rowIndex];
          if (oRow && row) {
            if (field) {
              var newValue = XEUtils$1.get(record || row, field);
              XEUtils$1.set(row, field, newValue);
              XEUtils$1.set(oRow, field, newValue);
            } else {
              var newRecord = XEUtils$1.clone(__assign({}, record), true);
              XEUtils$1.destructuring(oRow, Object.assign(row, newRecord));
            }
          }
          reactData.tableData = tableData.slice(0);
        } else {
          if (process.env.NODE_ENV === "development") {
            warnLog("vxe.error.reqProp", ["keep-source"]);
          }
        }
        return nextTick();
      },
      /**
       * 用于树结构，给行数据加载子节点
       */
      loadTreeChildren: function(row, childRecords) {
        var keepSource = props.keepSource;
        var tableSourceData = internalData.tableSourceData, fullDataRowIdData = internalData.fullDataRowIdData, fullAllDataRowIdData = internalData.fullAllDataRowIdData;
        var treeOpts = computeTreeOpts.value;
        var transform = treeOpts.transform, children = treeOpts.children, mapChildren = treeOpts.mapChildren;
        var parentRest = fullAllDataRowIdData[getRowid($xetable, row)];
        var parentLevel = parentRest ? parentRest.level : 0;
        return tableMethods.createData(childRecords).then(function(rows) {
          if (keepSource) {
            var rowid_1 = getRowid($xetable, row);
            var matchObj = XEUtils$1.findTree(tableSourceData, function(item) {
              return rowid_1 === getRowid($xetable, item);
            }, treeOpts);
            if (matchObj) {
              matchObj.item[children] = XEUtils$1.clone(rows, true);
            }
          }
          XEUtils$1.eachTree(rows, function(childRow, index, items, path, parent, nodes) {
            var rowid = getRowid($xetable, childRow);
            var rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, items, parent, level: parentLevel + nodes.length };
            fullDataRowIdData[rowid] = rest;
            fullAllDataRowIdData[rowid] = rest;
          }, treeOpts);
          row[children] = rows;
          if (transform) {
            row[mapChildren] = rows;
          }
          updateAfterDataIndex();
          return rows;
        });
      },
      /**
       * 加载列配置
       * 对于表格列需要重载、局部递增场景下可能会用到
       * @param {ColumnInfo} columns 列配置
       */
      loadColumn: function(columns) {
        var collectColumn = XEUtils$1.mapTree(columns, function(column) {
          return reactive(Cell.createColumn($xetable, column));
        });
        return handleColumn(collectColumn);
      },
      /**
       * 加载列配置并恢复到初始状态
       * 对于表格列需要重载、局部递增场景下可能会用到
       * @param {ColumnInfo} columns 列配置
       */
      reloadColumn: function(columns) {
        return tableMethods.clearAll().then(function() {
          return tableMethods.loadColumn(columns);
        });
      },
      /**
       * 根据 tr 元素获取对应的 row 信息
       * @param {Element} tr 元素
       */
      getRowNode: function(tr) {
        if (tr) {
          var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
          var rowid = tr.getAttribute("rowid");
          if (rowid) {
            var rest = fullAllDataRowIdData[rowid];
            if (rest) {
              return { rowid: rest.rowid, item: rest.row, index: rest.index, items: rest.items, parent: rest.parent };
            }
          }
        }
        return null;
      },
      /**
       * 根据 th/td 元素获取对应的 column 信息
       * @param {Element} cell 元素
       */
      getColumnNode: function(cell) {
        if (cell) {
          var fullColumnIdData = internalData.fullColumnIdData;
          var colid = cell.getAttribute("colid");
          if (colid) {
            var rest = fullColumnIdData[colid];
            if (rest) {
              return { colid: rest.colid, item: rest.column, index: rest.index, items: rest.items, parent: rest.parent };
            }
          }
        }
        return null;
      },
      /**
       * 根据 row 获取序号
       * @param {Row} row 行对象
       */
      getRowSeq: createGetRowCacheProp("seq"),
      /**
       * 根据 row 获取相对于 data 中的索引
       * @param {Row} row 行对象
       */
      getRowIndex: createGetRowCacheProp("index"),
      /**
       * 根据 row 获取相对于当前数据中的索引
       * @param {Row} row 行对象
       */
      getVTRowIndex: createGetRowCacheProp("_index"),
      /**
       * 根据 row 获取渲染中的虚拟索引
       * @param {Row} row 行对象
       */
      getVMRowIndex: createGetRowCacheProp("$index"),
      /**
       * 根据 column 获取相对于 columns 中的索引
       * @param {ColumnInfo} column 列配置
       */
      getColumnIndex: createGetColumnCacheProp("index"),
      /**
       * 根据 column 获取相对于当前表格列中的索引
       * @param {ColumnInfo} column 列配置
       */
      getVTColumnIndex: createGetColumnCacheProp("_index"),
      /**
       * 根据 column 获取渲染中的虚拟索引
       * @param {ColumnInfo} column 列配置
       */
      getVMColumnIndex: createGetColumnCacheProp("$index"),
      /**
       * 创建 data 对象
       * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
       * @param {Array} records 新数据
       */
      createData: function(records) {
        var treeConfig = props.treeConfig;
        var treeOpts = computeTreeOpts.value;
        var handleRrecord = function(record) {
          return reactive(tablePrivateMethods.defineField(record || {}));
        };
        var rows = treeConfig ? XEUtils$1.mapTree(records, handleRrecord, treeOpts) : records.map(handleRrecord);
        return nextTick().then(function() {
          return rows;
        });
      },
      /**
       * 创建 Row|Rows 对象
       * 对于某些特殊场景需要对数据进行手动插入时可能会用到
       * @param {Array/Object} records 新数据
       */
      createRow: function(records) {
        var isArr = XEUtils$1.isArray(records);
        if (!isArr) {
          records = [records];
        }
        return nextTick().then(function() {
          return tableMethods.createData(records).then(function(rows) {
            return isArr ? rows : rows[0];
          });
        });
      },
      /**
       * 还原数据
       * 如果不传任何参数，则还原整个表格
       * 如果传 row 则还原一行
       * 如果传 rows 则还原多行
       * 如果还额外传了 field 则还原指定的单元格数据
       */
      revertData: function(rows, field) {
        var keepSource = props.keepSource;
        var tableSourceData = internalData.tableSourceData, tableFullData = internalData.tableFullData;
        if (!keepSource) {
          if (process.env.NODE_ENV === "development") {
            warnLog("vxe.error.reqProp", ["keep-source"]);
          }
          return nextTick();
        }
        var targetRows = rows;
        if (rows) {
          if (!XEUtils$1.isArray(rows)) {
            targetRows = [rows];
          }
        } else {
          targetRows = XEUtils$1.toArray($xetable.getUpdateRecords());
        }
        if (targetRows.length) {
          targetRows.forEach(function(row) {
            if (!tableMethods.isInsertByRow(row)) {
              var rowIndex = $xetable.findRowIndexOf(tableFullData, row);
              var oRow = tableSourceData[rowIndex];
              if (oRow && row) {
                if (field) {
                  XEUtils$1.set(row, field, XEUtils$1.clone(XEUtils$1.get(oRow, field), true));
                } else {
                  XEUtils$1.destructuring(row, XEUtils$1.clone(oRow, true));
                }
              }
            }
          });
        }
        if (rows) {
          return nextTick();
        }
        return tableMethods.reloadData(tableSourceData);
      },
      /**
       * 清空单元格内容
       * 如果不创参数，则清空整个表格内容
       * 如果传 row 则清空一行内容
       * 如果传 rows 则清空多行内容
       * 如果还额外传了 field 则清空指定单元格内容
       * @param {Array/Row} rows 行数据
       * @param {String} field 字段名
       */
      clearData: function(rows, field) {
        var tableFullData = internalData.tableFullData, visibleColumn = internalData.visibleColumn;
        if (!arguments.length) {
          rows = tableFullData;
        } else if (rows && !XEUtils$1.isArray(rows)) {
          rows = [rows];
        }
        if (field) {
          rows.forEach(function(row) {
            return XEUtils$1.set(row, field, null);
          });
        } else {
          rows.forEach(function(row) {
            visibleColumn.forEach(function(column) {
              if (column.field) {
                setCellValue(row, column, null);
              }
            });
          });
        }
        return nextTick();
      },
      /**
       * 检查是否为临时行数据
       * @param {Row} row 行对象
       */
      isInsertByRow: function(row) {
        var editStore = reactData.editStore;
        return $xetable.findRowIndexOf(editStore.insertList, row) > -1;
      },
      /**
       * 删除所有新增的临时数据
       * @returns
       */
      removeInsertRow: function() {
        var editStore = reactData.editStore;
        return $xetable.remove(editStore.insertList);
      },
      /**
       * 检查行或列数据是否发生改变
       * @param {Row} row 行对象
       * @param {String} field 字段名
       */
      isUpdateByRow: function(row, field) {
        var _a, _b;
        var keepSource = props.keepSource, treeConfig = props.treeConfig;
        var visibleColumn = internalData.visibleColumn, tableSourceData = internalData.tableSourceData, fullDataRowIdData = internalData.fullDataRowIdData;
        var treeOpts = computeTreeOpts.value;
        if (keepSource) {
          var oRow = void 0, property2 = void 0;
          var rowid_2 = getRowid($xetable, row);
          if (!fullDataRowIdData[rowid_2]) {
            return false;
          }
          if (treeConfig) {
            var children = treeOpts.children;
            var matchObj = XEUtils$1.findTree(tableSourceData, function(item) {
              return rowid_2 === getRowid($xetable, item);
            }, treeOpts);
            row = Object.assign({}, row, (_a = {}, _a[children] = null, _a));
            if (matchObj) {
              oRow = Object.assign({}, matchObj.item, (_b = {}, _b[children] = null, _b));
            }
          } else {
            var oRowIndex = fullDataRowIdData[rowid_2].index;
            oRow = tableSourceData[oRowIndex];
          }
          if (oRow) {
            if (arguments.length > 1) {
              return !eqCellValue(oRow, row, field);
            }
            for (var index = 0, len = visibleColumn.length; index < len; index++) {
              property2 = visibleColumn[index].field;
              if (property2 && !eqCellValue(oRow, row, property2)) {
                return true;
              }
            }
          }
        }
        return false;
      },
      /**
       * 获取表格的可视列，也可以指定索引获取列
       * @param {Number} columnIndex 索引
       */
      getColumns: function(columnIndex) {
        var columns = internalData.visibleColumn;
        return XEUtils$1.isUndefined(columnIndex) ? columns.slice(0) : columns[columnIndex];
      },
      /**
       * 根据列的唯一主键获取列
       * @param {String} colid 列主键
       */
      getColumnById: function(colid) {
        var fullColumnIdData = internalData.fullColumnIdData;
        return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null;
      },
      /**
       * 根据列的字段名获取列
       * @param {String} field 字段名
       */
      getColumnByField: function(field) {
        var fullColumnFieldData = internalData.fullColumnFieldData;
        return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null;
      },
      /**
       * 获取当前表格的列
       * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
       */
      getTableColumn: function() {
        return {
          collectColumn: internalData.collectColumn.slice(0),
          fullColumn: internalData.tableFullColumn.slice(0),
          visibleColumn: internalData.visibleColumn.slice(0),
          tableColumn: reactData.tableColumn.slice(0)
        };
      },
      /**
       * 获取数据，和 data 的行为一致，也可以指定索引获取数据
       */
      getData: function(rowIndex) {
        var tableSynchData = props.data || internalData.tableSynchData;
        return XEUtils$1.isUndefined(rowIndex) ? tableSynchData.slice(0) : tableSynchData[rowIndex];
      },
      /**
       * 用于多选行，获取已选中的数据
       */
      getCheckboxRecords: function(isFull) {
        var treeConfig = props.treeConfig;
        var tableFullData = internalData.tableFullData, afterFullData = internalData.afterFullData, afterTreeFullData = internalData.afterTreeFullData, tableFullTreeData = internalData.tableFullTreeData;
        var treeOpts = computeTreeOpts.value;
        var checkboxOpts = computeCheckboxOpts.value;
        var transform = treeOpts.transform, children = treeOpts.children, mapChildren = treeOpts.mapChildren;
        var checkField = checkboxOpts.checkField;
        var rowList = [];
        var currTableData = isFull ? transform ? tableFullTreeData : tableFullData : transform ? afterTreeFullData : afterFullData;
        if (checkField) {
          if (treeConfig) {
            rowList = XEUtils$1.filterTree(currTableData, function(row) {
              return XEUtils$1.get(row, checkField);
            }, { children: transform ? mapChildren : children });
          } else {
            rowList = currTableData.filter(function(row) {
              return XEUtils$1.get(row, checkField);
            });
          }
        } else {
          var selection_1 = reactData.selection;
          if (treeConfig) {
            rowList = XEUtils$1.filterTree(currTableData, function(row) {
              return $xetable.findRowIndexOf(selection_1, row) > -1;
            }, { children: transform ? mapChildren : children });
          } else {
            rowList = currTableData.filter(function(row) {
              return $xetable.findRowIndexOf(selection_1, row) > -1;
            });
          }
        }
        return rowList;
      },
      /**
       * 只对 tree-config 有效，获取行的父级
       */
      getParentRow: function(rowOrRowid) {
        var treeConfig = props.treeConfig;
        var fullDataRowIdData = internalData.fullDataRowIdData;
        if (rowOrRowid && treeConfig) {
          var rowid = void 0;
          if (XEUtils$1.isString(rowOrRowid)) {
            rowid = rowOrRowid;
          } else {
            rowid = getRowid($xetable, rowOrRowid);
          }
          if (rowid) {
            return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].parent : null;
          }
        }
        return null;
      },
      /**
       * 根据行的唯一主键获取行
       * @param {String/Number} rowid 行主键
       */
      getRowById: function(cellValue) {
        var fullDataRowIdData = internalData.fullDataRowIdData;
        var rowid = XEUtils$1.eqNull(cellValue) ? "" : encodeURIComponent(cellValue);
        return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null;
      },
      /**
       * 根据行获取行的唯一主键
       * @param {Row} row 行对象
       */
      getRowid: function(row) {
        return getRowid($xetable, row);
      },
      /**
       * 获取处理后的表格数据
       * 如果存在筛选条件，继续处理
       * 如果存在排序，继续处理
       */
      getTableData: function() {
        var tableData = reactData.tableData, footerTableData = reactData.footerTableData;
        var tableFullData = internalData.tableFullData, afterFullData = internalData.afterFullData;
        return {
          fullData: tableFullData.slice(0),
          visibleData: afterFullData.slice(0),
          tableData: tableData.slice(0),
          footerData: footerTableData.slice(0)
        };
      },
      /**
       * 隐藏指定列
       */
      hideColumn: function(fieldOrColumn) {
        var column = handleFieldOrColumn($xetable, fieldOrColumn);
        if (column) {
          column.visible = false;
        }
        return tablePrivateMethods.handleCustom();
      },
      /**
       * 显示指定列
       */
      showColumn: function(fieldOrColumn) {
        var column = handleFieldOrColumn($xetable, fieldOrColumn);
        if (column) {
          column.visible = true;
        }
        return tablePrivateMethods.handleCustom();
      },
      /**
       * 手动重置列的显示隐藏、列宽拖动的状态；
       * 如果为 true 则重置所有状态
       * 如果已关联工具栏，则会同步更新
       */
      resetColumn: function(options) {
        var tableFullColumn = internalData.tableFullColumn;
        var customOpts = computeCustomOpts.value;
        var checkMethod = customOpts.checkMethod;
        var opts = Object.assign({ visible: true, resizable: options === true }, options);
        tableFullColumn.forEach(function(column) {
          if (opts.resizable) {
            column.resizeWidth = 0;
          }
          if (!checkMethod || checkMethod({ column })) {
            column.visible = column.defaultVisible;
          }
        });
        if (opts.resizable) {
          tablePrivateMethods.saveCustomResizable(true);
        }
        return tablePrivateMethods.handleCustom();
      },
      /**
       * 刷新列信息
       * 将固定的列左边、右边分别靠边
       */
      refreshColumn: function() {
        return parseColumns().then(function() {
          return tableMethods.refreshScroll();
        }).then(function() {
          return tableMethods.recalculate();
        });
      },
      /**
       * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
       */
      refreshScroll: function() {
        var lastScrollLeft = internalData.lastScrollLeft, lastScrollTop = internalData.lastScrollTop;
        var tableBody = refTableBody.value;
        var tableFooter = refTableFooter.value;
        var leftBody = refTableLeftBody.value;
        var rightBody = refTableRightBody.value;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var leftBodyElem = leftBody ? leftBody.$el : null;
        var rightBodyElem = rightBody ? rightBody.$el : null;
        var tableFooterElem = tableFooter ? tableFooter.$el : null;
        return new Promise(function(resolve) {
          if (lastScrollLeft || lastScrollTop) {
            return restoreScrollLocation($xetable, lastScrollLeft, lastScrollTop).then(resolve).then(function() {
              setTimeout(resolve, 30);
            });
          }
          setScrollTop(tableBodyElem, lastScrollTop);
          setScrollTop(leftBodyElem, lastScrollTop);
          setScrollTop(rightBodyElem, lastScrollTop);
          setScrollLeft(tableFooterElem, lastScrollLeft);
          setTimeout(resolve, 30);
        });
      },
      /**
       * 计算单元格列宽，动态分配可用剩余空间
       * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
       */
      recalculate: function(refull) {
        autoCellWidth();
        if (refull === true) {
          return computeScrollLoad().then(function() {
            autoCellWidth();
            return computeScrollLoad();
          });
        }
        return computeScrollLoad();
      },
      openTooltip: function(target, content) {
        var $commTip = refCommTooltip.value;
        if ($commTip) {
          return $commTip.open(target, content);
        }
        return nextTick();
      },
      /**
       * 关闭 tooltip
       */
      closeTooltip: function() {
        var tooltipStore = reactData.tooltipStore;
        var $tooltip = refTooltip.value;
        var $commTip = refCommTooltip.value;
        if (tooltipStore.visible) {
          Object.assign(tooltipStore, {
            row: null,
            column: null,
            content: null,
            visible: false
          });
          if ($tooltip) {
            $tooltip.close();
          }
        }
        if ($commTip) {
          $commTip.close();
        }
        return nextTick();
      },
      /**
       * 判断列头复选框是否被选中
       */
      isAllCheckboxChecked: function() {
        return reactData.isAllSelected;
      },
      /**
       * 判断列头复选框是否被半选
       */
      isAllCheckboxIndeterminate: function() {
        return !reactData.isAllSelected && reactData.isIndeterminate;
      },
      /**
       * 获取复选框半选状态的行数据
       */
      getCheckboxIndeterminateRecords: function(isFull) {
        var treeConfig = props.treeConfig;
        var afterFullData = internalData.afterFullData;
        var treeIndeterminates = reactData.treeIndeterminates;
        if (treeConfig) {
          return isFull ? treeIndeterminates.slice(0) : treeIndeterminates.filter(function(row) {
            return $xetable.findRowIndexOf(afterFullData, row) > -1;
          });
        }
        return [];
      },
      /**
       * 用于多选行，设置行为选中状态，第二个参数为选中与否
       * @param {Array/Row} rows 行数据
       * @param {Boolean} value 是否选中
       */
      setCheckboxRow: function(rows, value) {
        if (rows && !XEUtils$1.isArray(rows)) {
          rows = [rows];
        }
        rows.forEach(function(row) {
          return tablePrivateMethods.handleSelectRow({ row }, !!value);
        });
        return nextTick();
      },
      isCheckedByCheckboxRow: function(row) {
        var selection = reactData.selection;
        var checkboxOpts = computeCheckboxOpts.value;
        var checkField = checkboxOpts.checkField;
        if (checkField) {
          return XEUtils$1.get(row, checkField);
        }
        return $xetable.findRowIndexOf(selection, row) > -1;
      },
      isIndeterminateByCheckboxRow: function(row) {
        var treeIndeterminates = reactData.treeIndeterminates;
        return $xetable.findRowIndexOf(treeIndeterminates, row) > -1 && !tableMethods.isCheckedByCheckboxRow(row);
      },
      /**
       * 多选，切换某一行的选中状态
       */
      toggleCheckboxRow: function(row) {
        tablePrivateMethods.handleToggleCheckRowEvent(null, { row });
        return nextTick();
      },
      /**
       * 用于多选行，设置所有行的选中状态
       * @param {Boolean} value 是否选中
       */
      setAllCheckboxRow: function(value) {
        var treeConfig = props.treeConfig;
        var selection = reactData.selection;
        var afterFullData = internalData.afterFullData, checkboxReserveRowMap = internalData.checkboxReserveRowMap;
        var treeOpts = computeTreeOpts.value;
        var checkboxOpts = computeCheckboxOpts.value;
        var checkField = checkboxOpts.checkField, reserve = checkboxOpts.reserve, checkStrictly = checkboxOpts.checkStrictly, checkMethod = checkboxOpts.checkMethod;
        var selectRows = [];
        var beforeSelection = treeConfig ? [] : selection.filter(function(row) {
          return $xetable.findRowIndexOf(afterFullData, row) === -1;
        });
        if (checkStrictly) {
          reactData.isAllSelected = value;
        } else {
          if (checkField) {
            var checkValFn = function(row) {
              if (!checkMethod || checkMethod({ row })) {
                if (value) {
                  selectRows.push(row);
                }
                XEUtils$1.set(row, checkField, value);
              }
            };
            if (treeConfig) {
              XEUtils$1.eachTree(afterFullData, checkValFn, treeOpts);
            } else {
              afterFullData.forEach(checkValFn);
            }
          } else {
            if (treeConfig) {
              if (value) {
                XEUtils$1.eachTree(afterFullData, function(row) {
                  if (!checkMethod || checkMethod({ row })) {
                    selectRows.push(row);
                  }
                }, treeOpts);
              } else {
                if (checkMethod) {
                  XEUtils$1.eachTree(afterFullData, function(row) {
                    if (checkMethod({ row }) ? 0 : $xetable.findRowIndexOf(selection, row) > -1) {
                      selectRows.push(row);
                    }
                  }, treeOpts);
                }
              }
            } else {
              if (value) {
                if (checkMethod) {
                  selectRows = afterFullData.filter(function(row) {
                    return $xetable.findRowIndexOf(selection, row) > -1 || checkMethod({ row });
                  });
                } else {
                  selectRows = afterFullData.slice(0);
                }
              } else {
                if (checkMethod) {
                  selectRows = afterFullData.filter(function(row) {
                    return checkMethod({ row }) ? 0 : $xetable.findRowIndexOf(selection, row) > -1;
                  });
                }
              }
            }
          }
          if (reserve) {
            if (value) {
              selectRows.forEach(function(row) {
                checkboxReserveRowMap[getRowid($xetable, row)] = row;
              });
            } else {
              afterFullData.forEach(function(row) {
                return handleCheckboxReserveRow(row, false);
              });
            }
          }
          reactData.selection = checkField ? [] : beforeSelection.concat(selectRows);
        }
        reactData.treeIndeterminates = [];
        tablePrivateMethods.checkSelectionStatus();
        return nextTick();
      },
      /**
       * 获取单选框保留选中的行
       */
      getRadioReserveRecord: function(isFull) {
        var treeConfig = props.treeConfig;
        var fullDataRowIdData = internalData.fullDataRowIdData, radioReserveRow = internalData.radioReserveRow, afterFullData = internalData.afterFullData;
        var radioOpts = computeRadioOpts.value;
        var treeOpts = computeTreeOpts.value;
        if (radioOpts.reserve && radioReserveRow) {
          var rowid_3 = getRowid($xetable, radioReserveRow);
          if (isFull) {
            if (!fullDataRowIdData[rowid_3]) {
              return radioReserveRow;
            }
          } else {
            var rowkey_2 = getRowkey($xetable);
            if (treeConfig) {
              var matchObj = XEUtils$1.findTree(afterFullData, function(row) {
                return rowid_3 === XEUtils$1.get(row, rowkey_2);
              }, treeOpts);
              if (matchObj) {
                return radioReserveRow;
              }
            } else {
              if (!afterFullData.some(function(row) {
                return rowid_3 === XEUtils$1.get(row, rowkey_2);
              })) {
                return radioReserveRow;
              }
            }
          }
        }
        return null;
      },
      clearRadioReserve: function() {
        internalData.radioReserveRow = null;
        return nextTick();
      },
      /**
       * 获取复选框保留选中的行
       */
      getCheckboxReserveRecords: function(isFull) {
        var treeConfig = props.treeConfig;
        var afterFullData = internalData.afterFullData, fullDataRowIdData = internalData.fullDataRowIdData, checkboxReserveRowMap = internalData.checkboxReserveRowMap;
        var checkboxOpts = computeCheckboxOpts.value;
        var treeOpts = computeTreeOpts.value;
        var reserveSelection = [];
        if (checkboxOpts.reserve) {
          var afterFullIdMaps_1 = {};
          if (treeConfig) {
            XEUtils$1.eachTree(afterFullData, function(row) {
              afterFullIdMaps_1[getRowid($xetable, row)] = 1;
            }, treeOpts);
          } else {
            afterFullData.forEach(function(row) {
              afterFullIdMaps_1[getRowid($xetable, row)] = 1;
            });
          }
          XEUtils$1.each(checkboxReserveRowMap, function(oldRow, oldRowid) {
            if (oldRow) {
              if (isFull) {
                if (!fullDataRowIdData[oldRowid]) {
                  reserveSelection.push(oldRow);
                }
              } else {
                if (!afterFullIdMaps_1[oldRowid]) {
                  reserveSelection.push(oldRow);
                }
              }
            }
          });
        }
        return reserveSelection;
      },
      clearCheckboxReserve: function() {
        internalData.checkboxReserveRowMap = {};
        return nextTick();
      },
      /**
       * 多选，切换所有行的选中状态
       */
      toggleAllCheckboxRow: function() {
        tablePrivateMethods.triggerCheckAllEvent(null, !reactData.isAllSelected);
        return nextTick();
      },
      /**
       * 用于多选行，手动清空用户的选择
       * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
       */
      clearCheckboxRow: function() {
        var treeConfig = props.treeConfig;
        var tableFullData = internalData.tableFullData;
        var treeOpts = computeTreeOpts.value;
        var checkboxOpts = computeCheckboxOpts.value;
        var checkField = checkboxOpts.checkField, reserve = checkboxOpts.reserve;
        if (checkField) {
          if (treeConfig) {
            XEUtils$1.eachTree(tableFullData, function(item) {
              return XEUtils$1.set(item, checkField, false);
            }, treeOpts);
          } else {
            tableFullData.forEach(function(item) {
              return XEUtils$1.set(item, checkField, false);
            });
          }
        }
        if (reserve) {
          tableFullData.forEach(function(row) {
            return handleCheckboxReserveRow(row, false);
          });
        }
        reactData.isAllSelected = false;
        reactData.isIndeterminate = false;
        reactData.selection = [];
        reactData.treeIndeterminates = [];
        return nextTick();
      },
      /**
       * 用于当前行，设置某一行为高亮状态
       * @param {Row} row 行对象
       */
      setCurrentRow: function(row) {
        var rowOpts = computeRowOpts.value;
        var el = refElem.value;
        tableMethods.clearCurrentRow();
        tableMethods.clearCurrentColumn();
        reactData.currentRow = row;
        if (rowOpts.isCurrent || props.highlightCurrentRow) {
          if (el) {
            XEUtils$1.arrayEach(el.querySelectorAll('[rowid="'.concat(getRowid($xetable, row), '"]')), function(elem) {
              return addClass(elem, "row--current");
            });
          }
        }
        return nextTick();
      },
      isCheckedByRadioRow: function(row) {
        return $xetable.eqRow(reactData.selectRow, row);
      },
      /**
       * 用于单选行，设置某一行为选中状态
       * @param {Row} row 行对象
       */
      setRadioRow: function(row) {
        var radioOpts = computeRadioOpts.value;
        var checkMethod = radioOpts.checkMethod;
        if (row && (!checkMethod || checkMethod({ row }))) {
          reactData.selectRow = row;
          handleRadioReserveRow(row);
        }
        return nextTick();
      },
      /**
       * 用于当前行，手动清空当前高亮的状态
       */
      clearCurrentRow: function() {
        var el = refElem.value;
        reactData.currentRow = null;
        internalData.hoverRow = null;
        if (el) {
          XEUtils$1.arrayEach(el.querySelectorAll(".row--current"), function(elem) {
            return removeClass(elem, "row--current");
          });
        }
        return nextTick();
      },
      /**
       * 用于单选行，手动清空用户的选择
       */
      clearRadioRow: function() {
        reactData.selectRow = null;
        return nextTick();
      },
      /**
       * 用于当前行，获取当前行的数据
       */
      getCurrentRecord: function() {
        var rowOpts = computeRowOpts.value;
        return rowOpts.isCurrent || props.highlightCurrentRow ? reactData.currentRow : null;
      },
      /**
       * 用于单选行，获取当已选中的数据
       */
      getRadioRecord: function(isFull) {
        var treeConfig = props.treeConfig;
        var fullDataRowIdData = internalData.fullDataRowIdData, afterFullData = internalData.afterFullData;
        var selectRow = reactData.selectRow;
        var treeOpts = computeTreeOpts.value;
        if (selectRow) {
          var rowid_4 = getRowid($xetable, selectRow);
          if (isFull) {
            if (!fullDataRowIdData[rowid_4]) {
              return selectRow;
            }
          } else {
            if (treeConfig) {
              var rowkey_3 = getRowkey($xetable);
              var matchObj = XEUtils$1.findTree(afterFullData, function(row) {
                return rowid_4 === XEUtils$1.get(row, rowkey_3);
              }, treeOpts);
              if (matchObj) {
                return selectRow;
              }
            } else {
              if ($xetable.findRowIndexOf(afterFullData, selectRow) > -1) {
                return selectRow;
              }
            }
          }
        }
        return null;
      },
      getCurrentColumn: function() {
        var columnOpts = computeColumnOpts.value;
        return columnOpts.isCurrent || props.highlightCurrentColumn ? reactData.currentColumn : null;
      },
      /**
       * 用于当前列，设置某列行为高亮状态
       */
      setCurrentColumn: function(fieldOrColumn) {
        var column = handleFieldOrColumn($xetable, fieldOrColumn);
        if (column) {
          tableMethods.clearCurrentRow();
          tableMethods.clearCurrentColumn();
          reactData.currentColumn = column;
        }
        return nextTick();
      },
      /**
       * 用于当前列，手动清空当前高亮的状态
       */
      clearCurrentColumn: function() {
        reactData.currentColumn = null;
        return nextTick();
      },
      sort: function(sortConfs, sortOrder) {
        var sortOpts = computeSortOpts.value;
        var multiple = sortOpts.multiple, remote = sortOpts.remote, orders = sortOpts.orders;
        if (sortConfs) {
          if (XEUtils$1.isString(sortConfs)) {
            sortConfs = [
              { field: sortConfs, order: sortOrder }
            ];
          }
        }
        if (!XEUtils$1.isArray(sortConfs)) {
          sortConfs = [sortConfs];
        }
        if (sortConfs.length) {
          if (!multiple) {
            clearAllSort();
          }
          (multiple ? sortConfs : [sortConfs[0]]).forEach(function(confs, index) {
            var field = confs.field, order = confs.order;
            var column = field;
            if (XEUtils$1.isString(field)) {
              column = tableMethods.getColumnByField(field);
            }
            if (column && column.sortable) {
              if (orders.indexOf(order) === -1) {
                order = getNextSortOrder(column);
              }
              if (column.order !== order) {
                column.order = order;
              }
              column.sortTime = Date.now() + index;
            }
          });
          if (!remote) {
            tablePrivateMethods.handleTableData(true);
          }
          return nextTick().then(updateStyle);
        }
        return nextTick();
      },
      /**
       * 清空指定列的排序条件
       * 如果为空则清空所有列的排序条件
       * @param {String} fieldOrColumn 列或字段名
       */
      clearSort: function(fieldOrColumn) {
        var sortOpts = computeSortOpts.value;
        if (fieldOrColumn) {
          var column = handleFieldOrColumn($xetable, fieldOrColumn);
          if (column) {
            column.order = null;
          }
        } else {
          clearAllSort();
        }
        if (!sortOpts.remote) {
          tablePrivateMethods.handleTableData(true);
        }
        return nextTick().then(updateStyle);
      },
      isSort: function(fieldOrColumn) {
        if (fieldOrColumn) {
          var column = handleFieldOrColumn($xetable, fieldOrColumn);
          return column ? column.sortable && !!column.order : false;
        }
        return tableMethods.getSortColumns().length > 0;
      },
      getSortColumns: function() {
        var sortOpts = computeSortOpts.value;
        var multiple = sortOpts.multiple, chronological = sortOpts.chronological;
        var sortList = [];
        var tableFullColumn = internalData.tableFullColumn;
        tableFullColumn.forEach(function(column) {
          var field = column.field, order = column.order;
          if (column.sortable && order) {
            sortList.push({ column, field, property: field, order, sortTime: column.sortTime });
          }
        });
        if (multiple && chronological && sortList.length > 1) {
          return XEUtils$1.orderBy(sortList, "sortTime");
        }
        return sortList;
      },
      /**
       * 关闭筛选
       * @param {Event} evnt 事件
       */
      closeFilter: function() {
        var filterStore = reactData.filterStore;
        var column = filterStore.column, visible = filterStore.visible;
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          options: [],
          visible: false
        });
        if (visible) {
          $xetable.dispatchEvent("filter-visible", { column, property: column.field, field: column.field, filterList: $xetable.getCheckedFilters(), visible: false }, null);
        }
        return nextTick();
      },
      /**
       * 判断指定列是否为筛选状态，如果为空则判断所有列
       * @param {String} fieldOrColumn 字段名
       */
      isFilter: function(fieldOrColumn) {
        var column = handleFieldOrColumn($xetable, fieldOrColumn);
        if (column) {
          return column.filters && column.filters.some(function(option) {
            return option.checked;
          });
        }
        return $xetable.getCheckedFilters().length > 0;
      },
      /**
       * 判断展开行是否懒加载完成
       * @param {Row} row 行对象
       */
      isRowExpandLoaded: function(row) {
        var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
        var rest = fullAllDataRowIdData[getRowid($xetable, row)];
        return rest && !!rest.expandLoaded;
      },
      clearRowExpandLoaded: function(row) {
        var expandLazyLoadeds = reactData.expandLazyLoadeds;
        var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
        var expandOpts = computeExpandOpts.value;
        var lazy = expandOpts.lazy;
        var rest = fullAllDataRowIdData[getRowid($xetable, row)];
        if (lazy && rest) {
          rest.expandLoaded = false;
          XEUtils$1.remove(expandLazyLoadeds, function(item) {
            return $xetable.eqRow(item, row);
          });
        }
        return nextTick();
      },
      /**
       * 重新懒加载展开行，并展开内容
       * @param {Row} row 行对象
       */
      reloadRowExpand: function(row) {
        var expandLazyLoadeds = reactData.expandLazyLoadeds;
        var expandOpts = computeExpandOpts.value;
        var lazy = expandOpts.lazy;
        if (lazy && $xetable.findRowIndexOf(expandLazyLoadeds, row) === -1) {
          tableMethods.clearRowExpandLoaded(row).then(function() {
            return handleAsyncRowExpand(row);
          });
        }
        return nextTick();
      },
      reloadExpandContent: function(row) {
        if (process.env.NODE_ENV === "development") {
          warnLog("vxe.error.delFunc", ["reloadExpandContent", "reloadRowExpand"]);
        }
        return tableMethods.reloadRowExpand(row);
      },
      /**
       * 切换展开行
       */
      toggleRowExpand: function(row) {
        return tableMethods.setRowExpand(row, !tableMethods.isExpandByRow(row));
      },
      /**
       * 设置所有行的展开与否
       * @param {Boolean} expanded 是否展开
       */
      setAllRowExpand: function(expanded) {
        var expandOpts = computeExpandOpts.value;
        return tableMethods.setRowExpand(expandOpts.lazy ? reactData.tableData : internalData.tableFullData, expanded);
      },
      /**
       * 设置展开行，二个参数设置这一行展开与否
       * 支持单行
       * 支持多行
       * @param {Array/Row} rows 行数据
       * @param {Boolean} expanded 是否展开
       */
      setRowExpand: function(rows, expanded) {
        var rowExpandeds = reactData.rowExpandeds, expandLazyLoadeds = reactData.expandLazyLoadeds, column = reactData.expandColumn;
        var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
        var expandOpts = computeExpandOpts.value;
        var reserve = expandOpts.reserve, lazy = expandOpts.lazy, accordion = expandOpts.accordion, toggleMethod = expandOpts.toggleMethod;
        var lazyRests = [];
        var columnIndex = tableMethods.getColumnIndex(column);
        var $columnIndex = tableMethods.getVMColumnIndex(column);
        if (rows) {
          if (!XEUtils$1.isArray(rows)) {
            rows = [rows];
          }
          if (accordion) {
            rowExpandeds = [];
            rows = rows.slice(rows.length - 1, rows.length);
          }
          var validRows_1 = toggleMethod ? rows.filter(function(row) {
            return toggleMethod({ $table: $xetable, expanded, column, columnIndex, $columnIndex, row, rowIndex: tableMethods.getRowIndex(row), $rowIndex: tableMethods.getVMRowIndex(row) });
          }) : rows;
          if (expanded) {
            validRows_1.forEach(function(row) {
              if ($xetable.findRowIndexOf(rowExpandeds, row) === -1) {
                var rest = fullAllDataRowIdData[getRowid($xetable, row)];
                var isLoad = lazy && !rest.expandLoaded && $xetable.findRowIndexOf(expandLazyLoadeds, row) === -1;
                if (isLoad) {
                  lazyRests.push(handleAsyncRowExpand(row));
                } else {
                  rowExpandeds.push(row);
                }
              }
            });
          } else {
            XEUtils$1.remove(rowExpandeds, function(row) {
              return $xetable.findRowIndexOf(validRows_1, row) > -1;
            });
          }
          if (reserve) {
            validRows_1.forEach(function(row) {
              return handleRowExpandReserve(row, expanded);
            });
          }
        }
        reactData.rowExpandeds = rowExpandeds;
        return Promise.all(lazyRests).then(function() {
          return tableMethods.recalculate();
        });
      },
      /**
       * 判断行是否为展开状态
       * @param {Row} row 行对象
       */
      isExpandByRow: function(row) {
        var rowExpandeds = reactData.rowExpandeds;
        return $xetable.findRowIndexOf(rowExpandeds, row) > -1;
      },
      /**
       * 手动清空展开行状态，数据会恢复成未展开的状态
       */
      clearRowExpand: function() {
        var rowExpandeds = reactData.rowExpandeds;
        var tableFullData = internalData.tableFullData;
        var expandOpts = computeExpandOpts.value;
        var reserve = expandOpts.reserve;
        var isExists = rowExpandeds.length;
        reactData.rowExpandeds = [];
        if (reserve) {
          tableFullData.forEach(function(row) {
            return handleRowExpandReserve(row, false);
          });
        }
        return nextTick().then(function() {
          if (isExists) {
            tableMethods.recalculate();
          }
        });
      },
      clearRowExpandReserve: function() {
        internalData.rowExpandedReserveRowMap = {};
        return nextTick();
      },
      getRowExpandRecords: function() {
        return reactData.rowExpandeds.slice(0);
      },
      getTreeExpandRecords: function() {
        return reactData.treeExpandeds.slice(0);
      },
      /**
       * 判断树节点是否懒加载完成
       * @param {Row} row 行对象
       */
      isTreeExpandLoaded: function(row) {
        var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
        var rest = fullAllDataRowIdData[getRowid($xetable, row)];
        return rest && !!rest.treeLoaded;
      },
      clearTreeExpandLoaded: function(row) {
        var treeExpandeds = reactData.treeExpandeds;
        var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
        var treeOpts = computeTreeOpts.value;
        var transform = treeOpts.transform, lazy = treeOpts.lazy;
        var rest = fullAllDataRowIdData[getRowid($xetable, row)];
        if (lazy && rest) {
          rest.treeLoaded = false;
          XEUtils$1.remove(treeExpandeds, function(item) {
            return $xetable.eqRow(item, row);
          });
        }
        if (transform) {
          handleVirtualTreeToList();
          return tablePrivateMethods.handleTableData();
        }
        return nextTick();
      },
      /**
       * 重新懒加载树节点，并展开该节点
       * @param {Row} row 行对象
       */
      reloadTreeExpand: function(row) {
        var treeLazyLoadeds = reactData.treeLazyLoadeds;
        var treeOpts = computeTreeOpts.value;
        var transform = treeOpts.transform, lazy = treeOpts.lazy, hasChild = treeOpts.hasChild;
        if (lazy && row[hasChild] && $xetable.findRowIndexOf(treeLazyLoadeds, row) === -1) {
          tableMethods.clearTreeExpandLoaded(row).then(function() {
            return handleAsyncTreeExpandChilds(row);
          }).then(function() {
            if (transform) {
              handleVirtualTreeToList();
              return tablePrivateMethods.handleTableData();
            }
          }).then(function() {
            return tableMethods.recalculate();
          });
        }
        return nextTick();
      },
      reloadTreeChilds: function(row) {
        if (process.env.NODE_ENV === "development") {
          warnLog("vxe.error.delFunc", ["reloadTreeChilds", "reloadTreeExpand"]);
        }
        return tableMethods.reloadTreeExpand(row);
      },
      /**
       * 切换/展开树节点
       */
      toggleTreeExpand: function(row) {
        return tableMethods.setTreeExpand(row, !tableMethods.isTreeExpandByRow(row));
      },
      /**
       * 设置所有树节点的展开与否
       * @param {Boolean} expanded 是否展开
       */
      setAllTreeExpand: function(expanded) {
        var tableFullData = internalData.tableFullData;
        var treeOpts = computeTreeOpts.value;
        var transform = treeOpts.transform, lazy = treeOpts.lazy, children = treeOpts.children;
        var expandeds = [];
        XEUtils$1.eachTree(tableFullData, function(row) {
          var rowChildren = row[children];
          if (lazy || rowChildren && rowChildren.length) {
            expandeds.push(row);
          }
        }, treeOpts);
        return tableMethods.setTreeExpand(expandeds, expanded).then(function() {
          if (transform) {
            handleVirtualTreeToList();
            return tableMethods.recalculate();
          }
        });
      },
      /**
       * 设置展开树形节点，二个参数设置这一行展开与否
       * 支持单行
       * 支持多行
       * @param {Array/Row} rows 行数据
       * @param {Boolean} expanded 是否展开
       */
      setTreeExpand: function(rows, expanded) {
        var treeOpts = computeTreeOpts.value;
        var transform = treeOpts.transform;
        if (rows) {
          if (!XEUtils$1.isArray(rows)) {
            rows = [rows];
          }
          if (rows.length) {
            if (transform) {
              return handleVirtualTreeExpand(rows, expanded);
            } else {
              return handleBaseTreeExpand(rows, expanded);
            }
          }
        }
        return nextTick();
      },
      /**
       * 判断行是否为树形节点展开状态
       * @param {Row} row 行对象
       */
      isTreeExpandByRow: function(row) {
        var treeExpandeds = reactData.treeExpandeds;
        return $xetable.findRowIndexOf(treeExpandeds, row) > -1;
      },
      /**
       * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
       */
      clearTreeExpand: function() {
        var treeExpandeds = reactData.treeExpandeds;
        var tableFullTreeData = internalData.tableFullTreeData;
        var treeOpts = computeTreeOpts.value;
        var transform = treeOpts.transform, reserve = treeOpts.reserve;
        var isExists = treeExpandeds.length;
        reactData.treeExpandeds = [];
        if (reserve) {
          XEUtils$1.eachTree(tableFullTreeData, function(row) {
            return handleTreeExpandReserve(row, false);
          }, treeOpts);
        }
        return tablePrivateMethods.handleTableData().then(function() {
          if (transform) {
            handleVirtualTreeToList();
            return tablePrivateMethods.handleTableData();
          }
        }).then(function() {
          if (isExists) {
            return tableMethods.recalculate();
          }
        });
      },
      clearTreeExpandReserve: function() {
        internalData.treeExpandedReserveRowMap = {};
        return nextTick();
      },
      /**
       * 获取表格的滚动状态
       */
      getScroll: function() {
        var scrollXLoad = reactData.scrollXLoad, scrollYLoad = reactData.scrollYLoad;
        var tableBody = refTableBody.value;
        var bodyElem = tableBody.$el;
        return {
          virtualX: scrollXLoad,
          virtualY: scrollYLoad,
          scrollTop: bodyElem.scrollTop,
          scrollLeft: bodyElem.scrollLeft
        };
      },
      /**
       * 如果有滚动条，则滚动到对应的位置
       * @param {Number} scrollLeft 左距离
       * @param {Number} scrollTop 上距离
       */
      scrollTo: function(scrollLeft, scrollTop) {
        var tableBody = refTableBody.value;
        var tableFooter = refTableFooter.value;
        var rightBody = refTableRightBody.value;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var rightBodyElem = rightBody ? rightBody.$el : null;
        var tableFooterElem = tableFooter ? tableFooter.$el : null;
        if (XEUtils$1.isNumber(scrollLeft)) {
          setScrollLeft(tableFooterElem || tableBodyElem, scrollLeft);
        }
        if (XEUtils$1.isNumber(scrollTop)) {
          setScrollTop(rightBodyElem || tableBodyElem, scrollTop);
        }
        if (reactData.scrollXLoad || reactData.scrollYLoad) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              nextTick(function() {
                resolve();
              });
            }, 50);
          });
        }
        return nextTick();
      },
      /**
       * 如果有滚动条，则滚动到对应的行
       * @param {Row} row 行对象
       * @param {ColumnInfo} fieldOrColumn 列配置
       */
      scrollToRow: function(row, fieldOrColumn) {
        var rest = [];
        if (row) {
          if (props.treeConfig) {
            rest.push(tablePrivateMethods.scrollToTreeRow(row));
          } else {
            rest.push(rowToVisible($xetable, row));
          }
        }
        if (fieldOrColumn) {
          rest.push(tableMethods.scrollToColumn(fieldOrColumn));
        }
        return Promise.all(rest);
      },
      /**
       * 如果有滚动条，则滚动到对应的列
       */
      scrollToColumn: function(fieldOrColumn) {
        var fullColumnIdData = internalData.fullColumnIdData;
        var column = handleFieldOrColumn($xetable, fieldOrColumn);
        if (column && fullColumnIdData[column.id]) {
          return colToVisible($xetable, column);
        }
        return nextTick();
      },
      /**
       * 手动清除滚动相关信息，还原到初始状态
       */
      clearScroll: function() {
        var scrollXStore = internalData.scrollXStore, scrollYStore = internalData.scrollYStore;
        var tableBody = refTableBody.value;
        var tableFooter = refTableFooter.value;
        var rightBody = refTableRightBody.value;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var rightBodyElem = rightBody ? rightBody.$el : null;
        var tableFooterElem = tableFooter ? tableFooter.$el : null;
        if (rightBodyElem) {
          restoreScrollListener(rightBodyElem);
          rightBodyElem.scrollTop = 0;
        }
        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0;
        }
        if (tableBodyElem) {
          restoreScrollListener(tableBodyElem);
          tableBodyElem.scrollTop = 0;
          tableBodyElem.scrollLeft = 0;
        }
        scrollXStore.startIndex = 0;
        scrollYStore.startIndex = 0;
        return nextTick();
      },
      /**
       * 更新表尾合计
       */
      updateFooter: function() {
        var showFooter = props.showFooter, footerMethod = props.footerMethod;
        var visibleColumn = internalData.visibleColumn, afterFullData = internalData.afterFullData;
        if (showFooter && footerMethod) {
          reactData.footerTableData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: afterFullData, $table: $xetable, $grid: $xegrid }) : [];
        }
        return nextTick();
      },
      /**
       * 更新列状态
       * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
       * 如果单元格配置了校验规则，则会进行校验
       */
      updateStatus: function(scope, cellValue) {
        var customVal = !XEUtils$1.isUndefined(cellValue);
        return nextTick().then(function() {
          var editRules = props.editRules;
          var validStore = reactData.validStore;
          var tableBody = refTableBody.value;
          if (scope && tableBody && editRules) {
            var row_1 = scope.row, column_3 = scope.column;
            var type = "change";
            if ($xetable.hasCellRules) {
              if ($xetable.hasCellRules(type, row_1, column_3)) {
                var cell_1 = tablePrivateMethods.getCell(row_1, column_3);
                if (cell_1) {
                  return $xetable.validCellRules(type, row_1, column_3, cellValue).then(function() {
                    if (customVal && validStore.visible) {
                      setCellValue(row_1, column_3, cellValue);
                    }
                    $xetable.clearValidate();
                  }).catch(function(_a) {
                    var rule = _a.rule;
                    if (customVal) {
                      setCellValue(row_1, column_3, cellValue);
                    }
                    $xetable.showValidTooltip({ rule, row: row_1, column: column_3, cell: cell_1 });
                  });
                }
              }
            }
          }
        });
      },
      /**
       * 设置合并单元格
       * @param {TableMergeConfig[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
       */
      setMergeCells: function(merges) {
        if (props.spanMethod) {
          errLog("vxe.error.errConflicts", ["merge-cells", "span-method"]);
        }
        setMerges(merges, reactData.mergeList, internalData.afterFullData);
        return nextTick().then(function() {
          return tablePrivateMethods.updateCellAreas();
        });
      },
      /**
       * 移除单元格合并
       * @param {TableMergeConfig[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
       */
      removeMergeCells: function(merges) {
        if (props.spanMethod) {
          errLog("vxe.error.errConflicts", ["merge-cells", "span-method"]);
        }
        var rest = removeMerges(merges, reactData.mergeList, internalData.afterFullData);
        return nextTick().then(function() {
          tablePrivateMethods.updateCellAreas();
          return rest;
        });
      },
      /**
       * 获取所有被合并的单元格
       */
      getMergeCells: function() {
        return reactData.mergeList.slice(0);
      },
      /**
       * 清除所有单元格合并
       */
      clearMergeCells: function() {
        reactData.mergeList = [];
        return nextTick();
      },
      setMergeFooterItems: function(merges) {
        if (props.footerSpanMethod) {
          errLog("vxe.error.errConflicts", ["merge-footer-items", "footer-span-method"]);
        }
        setMerges(merges, reactData.mergeFooterList);
        return nextTick().then(function() {
          return tablePrivateMethods.updateCellAreas();
        });
      },
      removeMergeFooterItems: function(merges) {
        if (props.footerSpanMethod) {
          errLog("vxe.error.errConflicts", ["merge-footer-items", "footer-span-method"]);
        }
        var rest = removeMerges(merges, reactData.mergeFooterList);
        return nextTick().then(function() {
          tablePrivateMethods.updateCellAreas();
          return rest;
        });
      },
      /**
       * 获取所有被合并的表尾
       */
      getMergeFooterItems: function() {
        return reactData.mergeFooterList.slice(0);
      },
      /**
       * 清除所有表尾合并
       */
      clearMergeFooterItems: function() {
        reactData.mergeFooterList = [];
        return nextTick();
      },
      focus: function() {
        internalData.isActivated = true;
        return nextTick();
      },
      blur: function() {
        internalData.isActivated = false;
        return nextTick();
      },
      /**
       * 连接工具栏
       * @param $toolbar
       */
      connect: function($toolbar) {
        if ($toolbar) {
          $xetoolbar = $toolbar;
          $xetoolbar.syncUpdate({ collectColumn: internalData.collectColumn, $table: $xetable });
        } else {
          errLog("vxe.error.barUnableLink");
        }
        return nextTick();
      }
    };
    var handleGlobalMousedownEvent = function(evnt) {
      var editStore = reactData.editStore, ctxMenuStore = reactData.ctxMenuStore, filterStore = reactData.filterStore;
      var mouseConfig = props.mouseConfig;
      var el = refElem.value;
      var editOpts = computeEditOpts.value;
      var actived = editStore.actived;
      var $validTooltip = refValidTooltip.value;
      var tableFilter = refTableFilter.value;
      var tableMenu = refTableMenu.value;
      if (tableFilter) {
        if (getEventTargetNode(evnt, el, "vxe-cell--filter").flag)
          ;
        else if (getEventTargetNode(evnt, tableFilter.$el).flag)
          ;
        else {
          if (!getEventTargetNode(evnt, document.body, "vxe-table--ignore-clear").flag) {
            tablePrivateMethods.preventEvent(evnt, "event.clearFilter", filterStore.args, tableMethods.closeFilter);
          }
        }
      }
      if (actived.row) {
        if (!(editOpts.autoClear === false)) {
          var cell = actived.args.cell;
          if (!cell || !getEventTargetNode(evnt, cell).flag) {
            if ($validTooltip && getEventTargetNode(evnt, $validTooltip.$el).flag)
              ;
            else if (!internalData._lastCallTime || internalData._lastCallTime + 50 < Date.now()) {
              if (!getEventTargetNode(evnt, document.body, "vxe-table--ignore-clear").flag) {
                tablePrivateMethods.preventEvent(evnt, "event.clearActived", actived.args, function() {
                  var isClear;
                  if (editOpts.mode === "row") {
                    var rowTargetNode = getEventTargetNode(evnt, el, "vxe-body--row");
                    var rowNodeRest = rowTargetNode.flag ? tableMethods.getRowNode(rowTargetNode.targetElem) : null;
                    isClear = rowNodeRest ? !$xetable.eqRow(rowNodeRest.item, actived.args.row) : false;
                  } else {
                    isClear = !getEventTargetNode(evnt, el, "col--edit").flag;
                  }
                  if (!isClear) {
                    isClear = getEventTargetNode(evnt, el, "vxe-header--row").flag;
                  }
                  if (!isClear) {
                    isClear = getEventTargetNode(evnt, el, "vxe-footer--row").flag;
                  }
                  if (!isClear && props.height && !reactData.overflowY) {
                    var bodyWrapperElem = evnt.target;
                    if (hasClass(bodyWrapperElem, "vxe-table--body-wrapper")) {
                      isClear = evnt.offsetY < bodyWrapperElem.clientHeight;
                    }
                  }
                  if (isClear || // 如果点击了当前表格之外
                  !getEventTargetNode(evnt, el).flag) {
                    setTimeout(function() {
                      return $xetable.clearEdit(evnt);
                    });
                  }
                });
              }
            }
          }
        }
      } else if (mouseConfig) {
        if (!getEventTargetNode(evnt, el).flag && !($xegrid && getEventTargetNode(evnt, $xegrid.getRefMaps().refElem.value).flag) && !(tableMenu && getEventTargetNode(evnt, tableMenu.getRefMaps().refElem.value).flag) && !($xetoolbar && getEventTargetNode(evnt, $xetoolbar.getRefMaps().refElem.value).flag)) {
          $xetable.clearSelected();
          if ($xetable.clearCellAreas) {
            if (!getEventTargetNode(evnt, document.body, "vxe-table--ignore-areas-clear").flag) {
              tablePrivateMethods.preventEvent(evnt, "event.clearAreas", {}, function() {
                $xetable.clearCellAreas();
                $xetable.clearCopyCellArea();
              });
            }
          }
        }
      }
      if ($xetable.closeMenu) {
        if (ctxMenuStore.visible && tableMenu && !getEventTargetNode(evnt, tableMenu.getRefMaps().refElem.value).flag) {
          $xetable.closeMenu();
        }
      }
      internalData.isActivated = getEventTargetNode(evnt, $xegrid ? $xegrid.getRefMaps().refElem.value : el).flag;
    };
    var handleGlobalBlurEvent = function() {
      tableMethods.closeFilter();
      if ($xetable.closeMenu) {
        $xetable.closeMenu();
      }
    };
    var handleGlobalMousewheelEvent = function() {
      tableMethods.closeTooltip();
      if ($xetable.closeMenu) {
        $xetable.closeMenu();
      }
    };
    var keydownEvent = function(evnt) {
      var mouseConfig = props.mouseConfig, keyboardConfig = props.keyboardConfig;
      var filterStore = reactData.filterStore, ctxMenuStore = reactData.ctxMenuStore, editStore = reactData.editStore;
      var mouseOpts = computeMouseOpts.value;
      var keyboardOpts = computeKeyboardOpts.value;
      var actived = editStore.actived;
      var isEsc = hasEventKey(evnt, EVENT_KEYS.ESCAPE);
      if (isEsc) {
        tablePrivateMethods.preventEvent(evnt, "event.keydown", null, function() {
          tableMethods.dispatchEvent("keydown-start", {}, evnt);
          if (keyboardConfig && mouseConfig && mouseOpts.area && $xetable.handleKeyboardEvent) {
            $xetable.handleKeyboardEvent(evnt);
          } else if (actived.row || filterStore.visible || ctxMenuStore.visible) {
            evnt.stopPropagation();
            if ($xetable.closeMenu) {
              $xetable.closeMenu();
            }
            tableMethods.closeFilter();
            if (keyboardConfig && keyboardOpts.isEsc) {
              if (actived.row) {
                var params_1 = actived.args;
                $xetable.clearEdit(evnt);
                if (mouseOpts.selected) {
                  nextTick(function() {
                    return $xetable.handleSelected(params_1, evnt);
                  });
                }
              }
            }
          }
          tableMethods.dispatchEvent("keydown", {}, evnt);
          tableMethods.dispatchEvent("keydown-end", {}, evnt);
        });
      }
    };
    var handleGlobalKeydownEvent = function(evnt) {
      if (internalData.isActivated) {
        tablePrivateMethods.preventEvent(evnt, "event.keydown", null, function() {
          var mouseConfig = props.mouseConfig, keyboardConfig = props.keyboardConfig, treeConfig = props.treeConfig, editConfig = props.editConfig, highlightCurrentRow = props.highlightCurrentRow;
          var ctxMenuStore = reactData.ctxMenuStore, editStore = reactData.editStore, currentRow = reactData.currentRow;
          var isMenu = computeIsMenu.value;
          var bodyMenu = computeBodyMenu.value;
          var keyboardOpts = computeKeyboardOpts.value;
          var mouseOpts = computeMouseOpts.value;
          var editOpts = computeEditOpts.value;
          var treeOpts = computeTreeOpts.value;
          var menuList = computeMenuList.value;
          var rowOpts = computeRowOpts.value;
          var selected = editStore.selected, actived = editStore.actived;
          var keyCode = evnt.keyCode;
          var isEsc = hasEventKey(evnt, EVENT_KEYS.ESCAPE);
          var isBack = hasEventKey(evnt, EVENT_KEYS.BACKSPACE);
          var isTab = hasEventKey(evnt, EVENT_KEYS.TAB);
          var isEnter = hasEventKey(evnt, EVENT_KEYS.ENTER);
          var isSpacebar = hasEventKey(evnt, EVENT_KEYS.SPACEBAR);
          var isLeftArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_LEFT);
          var isUpArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_UP);
          var isRightArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_RIGHT);
          var isDwArrow = hasEventKey(evnt, EVENT_KEYS.ARROW_DOWN);
          var isDel = hasEventKey(evnt, EVENT_KEYS.DELETE);
          var isF2 = hasEventKey(evnt, EVENT_KEYS.F2);
          var isContextMenu = hasEventKey(evnt, EVENT_KEYS.CONTEXT_MENU);
          var hasMetaKey = evnt.metaKey;
          var hasCtrlKey = evnt.ctrlKey;
          var hasShiftKey = evnt.shiftKey;
          var isAltKey = evnt.altKey;
          var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
          var operCtxMenu = isMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);
          var isEditStatus = isEnableConf(editConfig) && actived.column && actived.row;
          var params;
          if (operCtxMenu) {
            evnt.preventDefault();
            if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
              $xetable.moveCtxMenu(evnt, ctxMenuStore, "selectChild", isLeftArrow, false, ctxMenuStore.selected.children);
            } else {
              $xetable.moveCtxMenu(evnt, ctxMenuStore, "selected", isRightArrow, true, menuList);
            }
          } else if (keyboardConfig && mouseConfig && mouseOpts.area && $xetable.handleKeyboardEvent) {
            $xetable.handleKeyboardEvent(evnt);
          } else if (isEsc) {
            if ($xetable.closeMenu) {
              $xetable.closeMenu();
            }
            tableMethods.closeFilter();
            if (keyboardConfig && keyboardOpts.isEsc) {
              if (actived.row) {
                var params_2 = actived.args;
                $xetable.clearEdit(evnt);
                if (mouseOpts.selected) {
                  nextTick(function() {
                    return $xetable.handleSelected(params_2, evnt);
                  });
                }
              }
            }
          } else if (isSpacebar && keyboardConfig && keyboardOpts.isChecked && selected.row && selected.column && (selected.column.type === "checkbox" || selected.column.type === "radio")) {
            evnt.preventDefault();
            if (selected.column.type === "checkbox") {
              tablePrivateMethods.handleToggleCheckRowEvent(evnt, selected.args);
            } else {
              tablePrivateMethods.triggerRadioRowEvent(evnt, selected.args);
            }
          } else if (isF2 && isEnableConf(editConfig)) {
            if (!isEditStatus) {
              if (selected.row && selected.column) {
                evnt.preventDefault();
                $xetable.handleActived(selected.args, evnt);
              }
            }
          } else if (isContextMenu) {
            internalData._keyCtx = selected.row && selected.column && bodyMenu.length;
            clearTimeout(keyCtxTimeout);
            keyCtxTimeout = setTimeout(function() {
              internalData._keyCtx = false;
            }, 1e3);
          } else if (isEnter && !isAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow)) {
            if (hasCtrlKey) {
              if (actived.row) {
                params = actived.args;
                $xetable.clearEdit(evnt);
                if (mouseOpts.selected) {
                  nextTick(function() {
                    return $xetable.handleSelected(params, evnt);
                  });
                }
              }
            } else {
              if (selected.row || actived.row) {
                var targetArgs = selected.row ? selected.args : actived.args;
                if (hasShiftKey) {
                  if (keyboardOpts.enterToTab) {
                    $xetable.moveTabSelected(targetArgs, hasShiftKey, evnt);
                  } else {
                    $xetable.moveSelected(targetArgs, isLeftArrow, true, isRightArrow, false, evnt);
                  }
                } else {
                  if (keyboardOpts.enterToTab) {
                    $xetable.moveTabSelected(targetArgs, hasShiftKey, evnt);
                  } else {
                    $xetable.moveSelected(targetArgs, isLeftArrow, false, isRightArrow, true, evnt);
                  }
                }
              } else if (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
                var childrens = currentRow[treeOpts.children];
                if (childrens && childrens.length) {
                  evnt.preventDefault();
                  var targetRow_1 = childrens[0];
                  params = {
                    $table: $xetable,
                    row: targetRow_1,
                    rowIndex: tableMethods.getRowIndex(targetRow_1),
                    $rowIndex: tableMethods.getVMRowIndex(targetRow_1)
                  };
                  tableMethods.setTreeExpand(currentRow, true).then(function() {
                    return tableMethods.scrollToRow(targetRow_1);
                  }).then(function() {
                    return tablePrivateMethods.triggerCurrentRowEvent(evnt, params);
                  });
                }
              }
            }
          } else if (operArrow && keyboardConfig && keyboardOpts.isArrow) {
            if (!isEditStatus) {
              if (selected.row && selected.column) {
                $xetable.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
              } else if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
                $xetable.moveCurrentRow(isUpArrow, isDwArrow, evnt);
              }
            }
          } else if (isTab && keyboardConfig && keyboardOpts.isTab) {
            if (selected.row || selected.column) {
              $xetable.moveTabSelected(selected.args, hasShiftKey, evnt);
            } else if (actived.row || actived.column) {
              $xetable.moveTabSelected(actived.args, hasShiftKey, evnt);
            }
          } else if (keyboardConfig && isEnableConf(editConfig) && (isDel || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow ? isBack && keyboardOpts.isArrow : isBack))) {
            if (!isEditStatus) {
              var delMethod = keyboardOpts.delMethod, backMethod = keyboardOpts.backMethod;
              if (keyboardOpts.isDel && (selected.row || selected.column)) {
                if (delMethod) {
                  delMethod({
                    row: selected.row,
                    rowIndex: tableMethods.getRowIndex(selected.row),
                    column: selected.column,
                    columnIndex: tableMethods.getColumnIndex(selected.column),
                    $table: $xetable
                  });
                } else {
                  setCellValue(selected.row, selected.column, null);
                }
                if (isBack) {
                  if (backMethod) {
                    backMethod({
                      row: selected.row,
                      rowIndex: tableMethods.getRowIndex(selected.row),
                      column: selected.column,
                      columnIndex: tableMethods.getColumnIndex(selected.column),
                      $table: $xetable
                    });
                  } else {
                    $xetable.handleActived(selected.args, evnt);
                  }
                } else if (isDel) {
                  tableMethods.updateFooter();
                }
              } else if (isBack && keyboardOpts.isArrow && treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
                var parentRow_1 = XEUtils$1.findTree(internalData.afterFullData, function(item) {
                  return item === currentRow;
                }, treeOpts).parent;
                if (parentRow_1) {
                  evnt.preventDefault();
                  params = {
                    $table: $xetable,
                    row: parentRow_1,
                    rowIndex: tableMethods.getRowIndex(parentRow_1),
                    $rowIndex: tableMethods.getVMRowIndex(parentRow_1)
                  };
                  tableMethods.setTreeExpand(parentRow_1, false).then(function() {
                    return tableMethods.scrollToRow(parentRow_1);
                  }).then(function() {
                    return tablePrivateMethods.triggerCurrentRowEvent(evnt, params);
                  });
                }
              }
            }
          } else if (keyboardConfig && isEnableConf(editConfig) && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222)) {
            var editMethod = keyboardOpts.editMethod;
            if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
              var beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod;
              if (!beforeEditMethod || beforeEditMethod(__assign(__assign({}, selected.args), { $table: $xetable }))) {
                if (editMethod) {
                  editMethod({
                    row: selected.row,
                    rowIndex: tableMethods.getRowIndex(selected.row),
                    column: selected.column,
                    columnIndex: tableMethods.getColumnIndex(selected.column),
                    $table: $xetable,
                    $grid: $xegrid
                  });
                } else {
                  setCellValue(selected.row, selected.column, null);
                  $xetable.handleActived(selected.args, evnt);
                }
              }
            }
          }
          tableMethods.dispatchEvent("keydown", {}, evnt);
        });
      }
    };
    var handleGlobalPasteEvent = function(evnt) {
      var keyboardConfig = props.keyboardConfig, mouseConfig = props.mouseConfig;
      var editStore = reactData.editStore, filterStore = reactData.filterStore;
      var isActivated = internalData.isActivated;
      var mouseOpts = computeMouseOpts.value;
      var keyboardOpts = computeKeyboardOpts.value;
      var actived = editStore.actived;
      if (isActivated && !filterStore.visible) {
        if (!(actived.row || actived.column)) {
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xetable.handlePasteCellAreaEvent) {
            $xetable.handlePasteCellAreaEvent(evnt);
          }
        }
        tableMethods.dispatchEvent("paste", {}, evnt);
      }
    };
    var handleGlobalCopyEvent = function(evnt) {
      var keyboardConfig = props.keyboardConfig, mouseConfig = props.mouseConfig;
      var editStore = reactData.editStore, filterStore = reactData.filterStore;
      var isActivated = internalData.isActivated;
      var mouseOpts = computeMouseOpts.value;
      var keyboardOpts = computeKeyboardOpts.value;
      var actived = editStore.actived;
      if (isActivated && !filterStore.visible) {
        if (!(actived.row || actived.column)) {
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xetable.handleCopyCellAreaEvent) {
            $xetable.handleCopyCellAreaEvent(evnt);
          }
        }
        tableMethods.dispatchEvent("copy", {}, evnt);
      }
    };
    var handleGlobalCutEvent = function(evnt) {
      var keyboardConfig = props.keyboardConfig, mouseConfig = props.mouseConfig;
      var editStore = reactData.editStore, filterStore = reactData.filterStore;
      var isActivated = internalData.isActivated;
      var mouseOpts = computeMouseOpts.value;
      var keyboardOpts = computeKeyboardOpts.value;
      var actived = editStore.actived;
      if (isActivated && !filterStore.visible) {
        if (!(actived.row || actived.column)) {
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xetable.handleCutCellAreaEvent) {
            $xetable.handleCutCellAreaEvent(evnt);
          }
        }
        tableMethods.dispatchEvent("cut", {}, evnt);
      }
    };
    var handleGlobalResizeEvent = function() {
      if ($xetable.closeMenu) {
        $xetable.closeMenu();
      }
      tablePrivateMethods.updateCellAreas();
      tableMethods.recalculate(true);
    };
    var handleTargetEnterEvent = function(isClear) {
      var $tooltip = refTooltip.value;
      clearTimeout(internalData.tooltipTimeout);
      if (isClear) {
        tableMethods.closeTooltip();
      } else {
        if ($tooltip) {
          $tooltip.setActived(true);
        }
      }
    };
    var handleTooltip = function(evnt, cell, overflowElem, tipElem, params) {
      params.cell = cell;
      var tooltipStore = reactData.tooltipStore;
      var tooltipOpts = computeTooltipOpts.value;
      var column = params.column, row = params.row;
      var showAll = tooltipOpts.showAll, contentMethod = tooltipOpts.contentMethod;
      var customContent = contentMethod ? contentMethod(params) : null;
      var useCustom = contentMethod && !XEUtils$1.eqNull(customContent);
      var content = useCustom ? customContent : XEUtils$1.toString(column.type === "html" ? overflowElem.innerText : overflowElem.textContent).trim();
      var isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth;
      if (content && (showAll || useCustom || isCellOverflow)) {
        Object.assign(tooltipStore, {
          row,
          column,
          visible: true,
          currOpts: null
        });
        nextTick(function() {
          var $tooltip = refTooltip.value;
          if ($tooltip) {
            $tooltip.open(isCellOverflow ? overflowElem : tipElem || overflowElem, formatText(content));
          }
        });
      }
      return nextTick();
    };
    tablePrivateMethods = {
      getSetupOptions: function() {
        return GlobalConfig;
      },
      updateAfterDataIndex,
      callSlot: function(slotFunc, params) {
        if (slotFunc) {
          if ($xegrid) {
            return $xegrid.callSlot(slotFunc, params);
          }
          if (XEUtils$1.isFunction(slotFunc)) {
            return getSlotVNs(slotFunc(params));
          }
        }
        return [];
      },
      /**
       * 获取父容器元素
       */
      getParentElem: function() {
        var el = refElem.value;
        if ($xegrid) {
          var gridEl = $xegrid.getRefMaps().refElem.value;
          return gridEl ? gridEl.parentNode : null;
        }
        return el ? el.parentNode : null;
      },
      /**
       * 获取父容器的高度
       */
      getParentHeight: function() {
        var height = props.height;
        var el = refElem.value;
        if (el) {
          var parentElem = el.parentNode;
          var parentPaddingSize = height === "auto" ? getPaddingTopBottomSize(parentElem) : 0;
          return Math.floor($xegrid ? $xegrid.getParentHeight() : XEUtils$1.toNumber(getComputedStyle(parentElem).height) - parentPaddingSize);
        }
        return 0;
      },
      /**
       * 获取需要排除的高度
       * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
       * 如果存在表尾合计滚动条，则需要排除滚动条高度
       */
      getExcludeHeight: function() {
        return $xegrid ? $xegrid.getExcludeHeight() : 0;
      },
      /**
       * 定义行数据中的列属性，如果不存在则定义
       * @param {Row} record 行数据
       */
      defineField: function(record) {
        var treeConfig = props.treeConfig;
        var expandOpts = computeExpandOpts.value;
        var treeOpts = computeTreeOpts.value;
        var radioOpts = computeRadioOpts.value;
        var checkboxOpts = computeCheckboxOpts.value;
        var rowkey = getRowkey($xetable);
        internalData.tableFullColumn.forEach(function(column) {
          var field = column.field, editRender = column.editRender;
          if (field && !XEUtils$1.has(record, field) && !record[field]) {
            var cellValue = null;
            if (editRender) {
              var defaultValue = editRender.defaultValue;
              if (XEUtils$1.isFunction(defaultValue)) {
                cellValue = defaultValue({ column });
              } else if (!XEUtils$1.isUndefined(defaultValue)) {
                cellValue = defaultValue;
              }
            }
            XEUtils$1.set(record, field, cellValue);
          }
        });
        var otherFields = [radioOpts.labelField, checkboxOpts.checkField, checkboxOpts.labelField, expandOpts.labelField];
        otherFields.forEach(function(key) {
          if (key && eqEmptyValue(XEUtils$1.get(record, key))) {
            XEUtils$1.set(record, key, null);
          }
        });
        if (treeConfig && treeOpts.lazy && XEUtils$1.isUndefined(record[treeOpts.children])) {
          record[treeOpts.children] = null;
        }
        if (eqEmptyValue(XEUtils$1.get(record, rowkey))) {
          XEUtils$1.set(record, rowkey, getRowUniqueId());
        }
        return record;
      },
      handleTableData: function(force) {
        var scrollYLoad = reactData.scrollYLoad;
        var scrollYStore = internalData.scrollYStore, fullDataRowIdData = internalData.fullDataRowIdData;
        var fullList = internalData.afterFullData;
        if (force) {
          updateAfterFullData();
          fullList = handleVirtualTreeToList();
        }
        var tableData = scrollYLoad ? fullList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullList.slice(0);
        tableData.forEach(function(row, $index) {
          var rowid = getRowid($xetable, row);
          var rest = fullDataRowIdData[rowid];
          if (rest) {
            rest.$index = $index;
          }
        });
        reactData.tableData = tableData;
        return nextTick();
      },
      /**
       * 更新数据行的 Map
       * 牺牲数据组装的耗时，用来换取使用过程中的流畅
       */
      cacheRowMap: function(isSource) {
        var treeConfig = props.treeConfig;
        var treeOpts = computeTreeOpts.value;
        var fullDataRowIdData = internalData.fullDataRowIdData, fullAllDataRowIdData = internalData.fullAllDataRowIdData, tableFullData = internalData.tableFullData, tableFullTreeData = internalData.tableFullTreeData;
        var rowkey = getRowkey($xetable);
        var isLazy = treeConfig && treeOpts.lazy;
        var handleCache = function(row, index, items, path, parent, nodes) {
          var rowid = getRowid($xetable, row);
          var seq = treeConfig && path ? toTreePathSeq(path) : index + 1;
          var level = nodes ? nodes.length - 1 : 0;
          if (eqEmptyValue(rowid)) {
            rowid = getRowUniqueId();
            XEUtils$1.set(row, rowkey, rowid);
          }
          if (isLazy && row[treeOpts.hasChild] && XEUtils$1.isUndefined(row[treeOpts.children])) {
            row[treeOpts.children] = null;
          }
          var rest = { row, rowid, seq, index: treeConfig && parent ? -1 : index, _index: -1, $index: -1, items, parent, level };
          if (isSource) {
            fullDataRowIdData[rowid] = rest;
          }
          fullAllDataRowIdData[rowid] = rest;
        };
        if (isSource) {
          fullDataRowIdData = internalData.fullDataRowIdData = {};
        }
        fullAllDataRowIdData = internalData.fullAllDataRowIdData = {};
        if (treeConfig) {
          XEUtils$1.eachTree(tableFullTreeData, handleCache, treeOpts);
        } else {
          tableFullData.forEach(handleCache);
        }
      },
      /**
       * 指定列宽的列进行拆分
       */
      analyColumnWidth: function() {
        var tableFullColumn = internalData.tableFullColumn;
        var columnOpts = computeColumnOpts.value;
        var defaultWidth = columnOpts.width, defaultMinWidth = columnOpts.minWidth;
        var resizeList = [];
        var pxList = [];
        var pxMinList = [];
        var scaleList = [];
        var scaleMinList = [];
        var autoList = [];
        tableFullColumn.forEach(function(column) {
          if (defaultWidth && !column.width) {
            column.width = defaultWidth;
          }
          if (defaultMinWidth && !column.minWidth) {
            column.minWidth = defaultMinWidth;
          }
          if (column.visible) {
            if (column.resizeWidth) {
              resizeList.push(column);
            } else if (isPx(column.width)) {
              pxList.push(column);
            } else if (isScale(column.width)) {
              scaleList.push(column);
            } else if (isPx(column.minWidth)) {
              pxMinList.push(column);
            } else if (isScale(column.minWidth)) {
              scaleMinList.push(column);
            } else {
              autoList.push(column);
            }
          }
        });
        Object.assign(reactData.columnStore, { resizeList, pxList, pxMinList, scaleList, scaleMinList, autoList });
      },
      saveCustomResizable: function(isReset) {
        var id = props.id, customConfig = props.customConfig;
        var customOpts = computeCustomOpts.value;
        var collectColumn = internalData.collectColumn;
        var storage = customOpts.storage;
        var isResizable = storage === true || storage && storage.resizable;
        if (customConfig && isResizable) {
          var columnWidthStorageMap = getCustomStorageMap(resizableStorageKey);
          var columnWidthStorage_1;
          if (!id) {
            errLog("vxe.error.reqProp", ["id"]);
            return;
          }
          if (!isReset) {
            columnWidthStorage_1 = XEUtils$1.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {};
            XEUtils$1.eachTree(collectColumn, function(column) {
              if (column.resizeWidth) {
                var colKey = column.getKey();
                if (colKey) {
                  columnWidthStorage_1[colKey] = column.renderWidth;
                }
              }
            });
          }
          columnWidthStorageMap[id] = XEUtils$1.isEmpty(columnWidthStorage_1) ? void 0 : columnWidthStorage_1;
          localStorage.setItem(resizableStorageKey, XEUtils$1.toJSONString(columnWidthStorageMap));
        }
      },
      saveCustomVisible: function() {
        var id = props.id, customConfig = props.customConfig;
        var collectColumn = internalData.collectColumn;
        var customOpts = computeCustomOpts.value;
        var checkMethod = customOpts.checkMethod, storage = customOpts.storage;
        var isVisible = storage === true || storage && storage.visible;
        if (customConfig && isVisible) {
          var columnVisibleStorageMap = getCustomStorageMap(visibleStorageKey);
          var colHides_1 = [];
          var colShows_1 = [];
          if (!id) {
            errLog("vxe.error.reqProp", ["id"]);
            return;
          }
          XEUtils$1.eachTree(collectColumn, function(column) {
            if (!checkMethod || checkMethod({ column })) {
              if (!column.visible && column.defaultVisible) {
                var colKey = column.getKey();
                if (colKey) {
                  colHides_1.push(colKey);
                }
              } else if (column.visible && !column.defaultVisible) {
                var colKey = column.getKey();
                if (colKey) {
                  colShows_1.push(colKey);
                }
              }
            }
          });
          columnVisibleStorageMap[id] = [colHides_1.join(",")].concat(colShows_1.length ? [colShows_1.join(",")] : []).join("|") || void 0;
          localStorage.setItem(visibleStorageKey, XEUtils$1.toJSONString(columnVisibleStorageMap));
        }
      },
      handleCustom: function() {
        tablePrivateMethods.saveCustomVisible();
        tablePrivateMethods.analyColumnWidth();
        return tableMethods.refreshColumn();
      },
      preventEvent: function(evnt, type, args, next, end) {
        var evntList = VXETable.interceptor.get(type);
        var rest;
        if (!evntList.some(function(func) {
          return func(Object.assign({ $grid: $xegrid, $table: $xetable, $event: evnt }, args)) === false;
        })) {
          if (next) {
            rest = next();
          }
        }
        if (end) {
          end();
        }
        return rest;
      },
      checkSelectionStatus: function() {
        var treeConfig = props.treeConfig;
        var selection = reactData.selection, treeIndeterminates = reactData.treeIndeterminates;
        var afterFullData = internalData.afterFullData;
        var checkboxOpts = computeCheckboxOpts.value;
        var checkField = checkboxOpts.checkField, halfField = checkboxOpts.halfField, checkStrictly = checkboxOpts.checkStrictly, checkMethod = checkboxOpts.checkMethod;
        if (!checkStrictly) {
          var disableRows_1 = [];
          var checkRows_1 = [];
          var isAllResolve = false;
          var isAllSelected = false;
          var isIndeterminate = false;
          if (checkField) {
            isAllResolve = afterFullData.every(checkMethod ? function(row) {
              if (!checkMethod({ row })) {
                disableRows_1.push(row);
                return true;
              }
              if (XEUtils$1.get(row, checkField)) {
                checkRows_1.push(row);
                return true;
              }
              return false;
            } : function(row) {
              return XEUtils$1.get(row, checkField);
            });
            isAllSelected = isAllResolve && afterFullData.length !== disableRows_1.length;
            if (treeConfig) {
              if (halfField) {
                isIndeterminate = !isAllSelected && afterFullData.some(function(row) {
                  return XEUtils$1.get(row, checkField) || XEUtils$1.get(row, halfField) || $xetable.findRowIndexOf(treeIndeterminates, row) > -1;
                });
              } else {
                isIndeterminate = !isAllSelected && afterFullData.some(function(row) {
                  return XEUtils$1.get(row, checkField) || $xetable.findRowIndexOf(treeIndeterminates, row) > -1;
                });
              }
            } else {
              if (halfField) {
                isIndeterminate = !isAllSelected && afterFullData.some(function(row) {
                  return XEUtils$1.get(row, checkField) || XEUtils$1.get(row, halfField);
                });
              } else {
                isIndeterminate = !isAllSelected && afterFullData.some(function(row) {
                  return XEUtils$1.get(row, checkField);
                });
              }
            }
          } else {
            isAllResolve = afterFullData.every(checkMethod ? function(row) {
              if (!checkMethod({ row })) {
                disableRows_1.push(row);
                return true;
              }
              if ($xetable.findRowIndexOf(selection, row) > -1) {
                checkRows_1.push(row);
                return true;
              }
              return false;
            } : function(row) {
              return $xetable.findRowIndexOf(selection, row) > -1;
            });
            isAllSelected = isAllResolve && afterFullData.length !== disableRows_1.length;
            if (treeConfig) {
              isIndeterminate = !isAllSelected && afterFullData.some(function(row) {
                return $xetable.findRowIndexOf(treeIndeterminates, row) > -1 || $xetable.findRowIndexOf(selection, row) > -1;
              });
            } else {
              isIndeterminate = !isAllSelected && afterFullData.some(function(row) {
                return $xetable.findRowIndexOf(selection, row) > -1;
              });
            }
          }
          reactData.isAllSelected = isAllSelected;
          reactData.isIndeterminate = isIndeterminate;
        }
      },
      /**
       * 多选，行选中事件
       * value 选中true 不选false 半选-1
       */
      handleSelectRow: function(_a, value) {
        var row = _a.row;
        var treeConfig = props.treeConfig;
        var selection = reactData.selection, treeIndeterminates = reactData.treeIndeterminates;
        var afterFullData = internalData.afterFullData;
        var treeOpts = computeTreeOpts.value;
        var checkboxOpts = computeCheckboxOpts.value;
        var checkField = checkboxOpts.checkField, checkStrictly = checkboxOpts.checkStrictly, checkMethod = checkboxOpts.checkMethod;
        if (checkField) {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              if ($xetable.findRowIndexOf(treeIndeterminates, row) === -1) {
                treeIndeterminates.push(row);
              }
              XEUtils$1.set(row, checkField, false);
            } else {
              XEUtils$1.eachTree([row], function(item) {
                if ($xetable.eqRow(item, row) || (!checkMethod || checkMethod({ row: item }))) {
                  XEUtils$1.set(item, checkField, value);
                  XEUtils$1.remove(treeIndeterminates, function(half) {
                    return $xetable.eqRow(half, item);
                  });
                  handleCheckboxReserveRow(row, value);
                }
              }, treeOpts);
            }
            var matchObj = XEUtils$1.findTree(afterFullData, function(item) {
              return $xetable.eqRow(item, row);
            }, treeOpts);
            if (matchObj && matchObj.parent) {
              var parentStatus = void 0;
              var vItems_1 = checkMethod ? matchObj.items.filter(function(item) {
                return checkMethod({ row: item });
              }) : matchObj.items;
              var indeterminatesItem = XEUtils$1.find(matchObj.items, function(item) {
                return $xetable.findRowIndexOf(treeIndeterminates, item) > -1;
              });
              if (indeterminatesItem) {
                parentStatus = -1;
              } else {
                var selectItems = matchObj.items.filter(function(item) {
                  return XEUtils$1.get(item, checkField);
                });
                parentStatus = selectItems.filter(function(item) {
                  return $xetable.findRowIndexOf(vItems_1, item) > -1;
                }).length === vItems_1.length ? true : selectItems.length || value === -1 ? -1 : false;
              }
              return tablePrivateMethods.handleSelectRow({ row: matchObj.parent }, parentStatus);
            }
          } else {
            if (!checkMethod || checkMethod({ row })) {
              XEUtils$1.set(row, checkField, value);
              handleCheckboxReserveRow(row, value);
            }
          }
        } else {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              if ($xetable.findRowIndexOf(treeIndeterminates, row) === -1) {
                treeIndeterminates.push(row);
              }
              XEUtils$1.remove(selection, function(item) {
                return $xetable.eqRow(item, row);
              });
            } else {
              XEUtils$1.eachTree([row], function(item) {
                if ($xetable.eqRow(item, row) || (!checkMethod || checkMethod({ row: item }))) {
                  if (value) {
                    selection.push(item);
                  } else {
                    XEUtils$1.remove(selection, function(select) {
                      return $xetable.eqRow(select, item);
                    });
                  }
                  XEUtils$1.remove(treeIndeterminates, function(half) {
                    return $xetable.eqRow(half, item);
                  });
                  handleCheckboxReserveRow(row, value);
                }
              }, treeOpts);
            }
            var matchObj = XEUtils$1.findTree(afterFullData, function(item) {
              return $xetable.eqRow(item, row);
            }, treeOpts);
            if (matchObj && matchObj.parent) {
              var parentStatus = void 0;
              var vItems_2 = checkMethod ? matchObj.items.filter(function(item) {
                return checkMethod({ row: item });
              }) : matchObj.items;
              var indeterminatesItem = XEUtils$1.find(matchObj.items, function(item) {
                return $xetable.findRowIndexOf(treeIndeterminates, item) > -1;
              });
              if (indeterminatesItem) {
                parentStatus = -1;
              } else {
                var selectItems = matchObj.items.filter(function(item) {
                  return $xetable.findRowIndexOf(selection, item) > -1;
                });
                parentStatus = selectItems.filter(function(item) {
                  return $xetable.findRowIndexOf(vItems_2, item) > -1;
                }).length === vItems_2.length ? true : selectItems.length || value === -1 ? -1 : false;
              }
              return tablePrivateMethods.handleSelectRow({ row: matchObj.parent }, parentStatus);
            }
          } else {
            if (!checkMethod || checkMethod({ row })) {
              if (value) {
                if ($xetable.findRowIndexOf(selection, row) === -1) {
                  selection.push(row);
                }
              } else {
                XEUtils$1.remove(selection, function(item) {
                  return $xetable.eqRow(item, row);
                });
              }
              handleCheckboxReserveRow(row, value);
            }
          }
        }
        tablePrivateMethods.checkSelectionStatus();
      },
      triggerHeaderHelpEvent: function(evnt, params) {
        var column = params.column;
        var titlePrefix = column.titlePrefix || column.titleHelp;
        if (titlePrefix.content || titlePrefix.message) {
          var tooltipStore = reactData.tooltipStore;
          var content_1 = getFuncText(titlePrefix.content || titlePrefix.message);
          handleTargetEnterEvent(true);
          tooltipStore.visible = true;
          tooltipStore.currOpts = __assign(__assign({}, titlePrefix), { content: null });
          nextTick(function() {
            var $tooltip = refTooltip.value;
            if ($tooltip) {
              $tooltip.open(evnt.currentTarget, content_1);
            }
          });
        }
      },
      /**
       * 触发表头 tooltip 事件
       */
      triggerHeaderTooltipEvent: function(evnt, params) {
        var tooltipStore = reactData.tooltipStore;
        var column = params.column;
        var titleElem = evnt.currentTarget;
        handleTargetEnterEvent(true);
        if (tooltipStore.column !== column || !tooltipStore.visible) {
          handleTooltip(evnt, titleElem, titleElem, null, params);
        }
      },
      /**
       * 触发单元格 tooltip 事件
       */
      triggerBodyTooltipEvent: function(evnt, params) {
        var editConfig = props.editConfig;
        var editStore = reactData.editStore;
        var tooltipStore = reactData.tooltipStore;
        var editOpts = computeEditOpts.value;
        var actived = editStore.actived;
        var row = params.row, column = params.column;
        var cell = evnt.currentTarget;
        handleTargetEnterEvent(tooltipStore.column !== column || tooltipStore.row !== row);
        if (isEnableConf(editConfig)) {
          if (editOpts.mode === "row" && actived.row === row || actived.row === row && actived.column === column) {
            return;
          }
        }
        if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
          var overflowElem = void 0;
          var tipElem = void 0;
          if (column.treeNode) {
            overflowElem = cell.querySelector(".vxe-tree-cell");
            if (column.type === "html") {
              tipElem = cell.querySelector(".vxe-cell--html");
            }
          } else {
            tipElem = cell.querySelector(column.type === "html" ? ".vxe-cell--html" : ".vxe-cell--label");
          }
          handleTooltip(evnt, cell, overflowElem || cell.children[0], tipElem, params);
        }
      },
      /**
       * 触发表尾 tooltip 事件
       */
      triggerFooterTooltipEvent: function(evnt, params) {
        var column = params.column;
        var tooltipStore = reactData.tooltipStore;
        var cell = evnt.currentTarget;
        handleTargetEnterEvent(tooltipStore.column !== column || tooltipStore.row);
        if (tooltipStore.column !== column || !tooltipStore.visible) {
          handleTooltip(evnt, cell, cell.querySelector(".vxe-cell--item") || cell.children[0], null, params);
        }
      },
      handleTargetLeaveEvent: function() {
        var tooltipOpts = computeTooltipOpts.value;
        var $tooltip = refTooltip.value;
        if ($tooltip) {
          $tooltip.setActived(false);
        }
        if (tooltipOpts.enterable) {
          internalData.tooltipTimeout = setTimeout(function() {
            $tooltip = refTooltip.value;
            if ($tooltip && !$tooltip.isActived()) {
              tableMethods.closeTooltip();
            }
          }, tooltipOpts.leaveDelay);
        } else {
          tableMethods.closeTooltip();
        }
      },
      triggerHeaderCellClickEvent: function(evnt, params) {
        var _lastResizeTime = internalData._lastResizeTime;
        var sortOpts = computeSortOpts.value;
        var columnOpts = computeColumnOpts.value;
        var column = params.column;
        var cell = evnt.currentTarget;
        var triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300;
        var triggerSort = getEventTargetNode(evnt, cell, "vxe-cell--sort").flag;
        var triggerFilter = getEventTargetNode(evnt, cell, "vxe-cell--filter").flag;
        if (sortOpts.trigger === "cell" && !(triggerResizable || triggerSort || triggerFilter)) {
          tablePrivateMethods.triggerSortEvent(evnt, column, getNextSortOrder(column));
        }
        tableMethods.dispatchEvent("header-cell-click", Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt);
        if (columnOpts.isCurrent || props.highlightCurrentColumn) {
          tableMethods.setCurrentColumn(column);
        }
      },
      triggerHeaderCellDblclickEvent: function(evnt, params) {
        tableMethods.dispatchEvent("header-cell-dblclick", Object.assign({ cell: evnt.currentTarget }, params), evnt);
      },
      /**
       * 列点击事件
       * 如果是单击模式，则激活为编辑状态
       * 如果是双击模式，则单击后选中状态
       */
      triggerCellClickEvent: function(evnt, params) {
        var highlightCurrentRow = props.highlightCurrentRow, editConfig = props.editConfig;
        var editStore = reactData.editStore;
        var expandOpts = computeExpandOpts.value;
        var editOpts = computeEditOpts.value;
        var treeOpts = computeTreeOpts.value;
        var radioOpts = computeRadioOpts.value;
        var checkboxOpts = computeCheckboxOpts.value;
        var rowOpts = computeRowOpts.value;
        var actived = editStore.actived;
        var row = params.row, column = params.column;
        var type = column.type, treeNode = column.treeNode;
        var isRadioType = type === "radio";
        var isCheckboxType = type === "checkbox";
        var isExpandType = type === "expand";
        var cell = evnt.currentTarget;
        var triggerRadio = isRadioType && getEventTargetNode(evnt, cell, "vxe-cell--radio").flag;
        var triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, "vxe-cell--checkbox").flag;
        var triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, "vxe-tree--btn-wrapper").flag;
        var triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, "vxe-table--expanded").flag;
        params = Object.assign({ cell, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode }, params);
        if (!triggerCheckbox && !triggerRadio) {
          if (!triggerExpandNode && (expandOpts.trigger === "row" || isExpandType && expandOpts.trigger === "cell")) {
            tablePrivateMethods.triggerRowExpandEvent(evnt, params);
          }
          if (treeOpts.trigger === "row" || treeNode && treeOpts.trigger === "cell") {
            tablePrivateMethods.triggerTreeExpandEvent(evnt, params);
          }
        }
        if (!triggerTreeNode) {
          if (!triggerExpandNode) {
            if (rowOpts.isCurrent || highlightCurrentRow) {
              if (!triggerCheckbox && !triggerRadio) {
                tablePrivateMethods.triggerCurrentRowEvent(evnt, params);
              }
            }
            if (!triggerRadio && (radioOpts.trigger === "row" || isRadioType && radioOpts.trigger === "cell")) {
              tablePrivateMethods.triggerRadioRowEvent(evnt, params);
            }
            if (!triggerCheckbox && (checkboxOpts.trigger === "row" || isCheckboxType && checkboxOpts.trigger === "cell")) {
              tablePrivateMethods.handleToggleCheckRowEvent(evnt, params);
            }
          }
          if (isEnableConf(editConfig)) {
            if (editOpts.trigger === "manual") {
              if (actived.args && actived.row === row && column !== actived.column) {
                handleChangeCell(evnt, params);
              }
            } else if (!actived.args || row !== actived.row || column !== actived.column) {
              if (editOpts.trigger === "click") {
                handleChangeCell(evnt, params);
              } else if (editOpts.trigger === "dblclick") {
                if (editOpts.mode === "row" && actived.row === row) {
                  handleChangeCell(evnt, params);
                }
              }
            }
          }
        }
        tableMethods.dispatchEvent("cell-click", params, evnt);
      },
      /**
       * 列双击点击事件
       * 如果是双击模式，则激活为编辑状态
       */
      triggerCellDblclickEvent: function(evnt, params) {
        var editConfig = props.editConfig;
        var editStore = reactData.editStore;
        var editOpts = computeEditOpts.value;
        var actived = editStore.actived;
        var cell = evnt.currentTarget;
        params = Object.assign({ cell }, params);
        if (isEnableConf(editConfig) && editOpts.trigger === "dblclick") {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editOpts.mode === "row") {
              checkValidate("blur").catch(function(e) {
                return e;
              }).then(function() {
                $xetable.handleActived(params, evnt).then(function() {
                  return checkValidate("change");
                }).catch(function(e) {
                  return e;
                });
              });
            } else if (editOpts.mode === "cell") {
              $xetable.handleActived(params, evnt).then(function() {
                return checkValidate("change");
              }).catch(function(e) {
                return e;
              });
            }
          }
        }
        tableMethods.dispatchEvent("cell-dblclick", params, evnt);
      },
      handleToggleCheckRowEvent: function(evnt, params) {
        var selection = reactData.selection;
        var checkboxOpts = computeCheckboxOpts.value;
        var checkField = checkboxOpts.checkField;
        var row = params.row;
        var value = checkField ? !XEUtils$1.get(row, checkField) : $xetable.findRowIndexOf(selection, row) === -1;
        if (evnt) {
          tablePrivateMethods.triggerCheckRowEvent(evnt, params, value);
        } else {
          tablePrivateMethods.handleSelectRow(params, value);
        }
      },
      triggerCheckRowEvent: function(evnt, params, value) {
        var checkboxOpts = computeCheckboxOpts.value;
        var checkMethod = checkboxOpts.checkMethod;
        if (!checkMethod || checkMethod({ row: params.row })) {
          tablePrivateMethods.handleSelectRow(params, value);
          tableMethods.dispatchEvent("checkbox-change", Object.assign({
            records: tableMethods.getCheckboxRecords(),
            reserves: tableMethods.getCheckboxReserveRecords(),
            indeterminates: tableMethods.getCheckboxIndeterminateRecords(),
            checked: value
          }, params), evnt);
        }
      },
      /**
       * 多选，选中所有事件
       */
      triggerCheckAllEvent: function(evnt, value) {
        tableMethods.setAllCheckboxRow(value);
        if (evnt) {
          tableMethods.dispatchEvent("checkbox-all", {
            records: tableMethods.getCheckboxRecords(),
            reserves: tableMethods.getCheckboxReserveRecords(),
            indeterminates: tableMethods.getCheckboxIndeterminateRecords(),
            checked: value
          }, evnt);
        }
      },
      /**
       * 单选，行选中事件
       */
      triggerRadioRowEvent: function(evnt, params) {
        var oldValue = reactData.selectRow;
        var row = params.row;
        var radioOpts = computeRadioOpts.value;
        var newValue = row;
        var isChange = oldValue !== newValue;
        if (isChange) {
          tableMethods.setRadioRow(newValue);
        } else if (!radioOpts.strict) {
          isChange = oldValue === newValue;
          if (isChange) {
            newValue = null;
            tableMethods.clearRadioRow();
          }
        }
        if (isChange) {
          tableMethods.dispatchEvent("radio-change", __assign({ oldValue, newValue }, params), evnt);
        }
      },
      triggerCurrentRowEvent: function(evnt, params) {
        var oldValue = reactData.currentRow;
        var newValue = params.row;
        var isChange = oldValue !== newValue;
        tableMethods.setCurrentRow(newValue);
        if (isChange) {
          tableMethods.dispatchEvent("current-change", __assign({ oldValue, newValue }, params), evnt);
        }
      },
      /**
       * 展开行事件
       */
      triggerRowExpandEvent: function(evnt, params) {
        var expandLazyLoadeds = reactData.expandLazyLoadeds, column = reactData.expandColumn;
        var expandOpts = computeExpandOpts.value;
        var row = params.row;
        var lazy = expandOpts.lazy;
        if (!lazy || $xetable.findRowIndexOf(expandLazyLoadeds, row) === -1) {
          var expanded = !tableMethods.isExpandByRow(row);
          var columnIndex = tableMethods.getColumnIndex(column);
          var $columnIndex = tableMethods.getVMColumnIndex(column);
          tableMethods.setRowExpand(row, expanded);
          tableMethods.dispatchEvent("toggle-row-expand", {
            expanded,
            column,
            columnIndex,
            $columnIndex,
            row,
            rowIndex: tableMethods.getRowIndex(row),
            $rowIndex: tableMethods.getVMRowIndex(row)
          }, evnt);
        }
      },
      /**
       * 展开树节点事件
       */
      triggerTreeExpandEvent: function(evnt, params) {
        var treeLazyLoadeds = reactData.treeLazyLoadeds;
        var treeOpts = computeTreeOpts.value;
        var row = params.row, column = params.column;
        var lazy = treeOpts.lazy;
        if (!lazy || $xetable.findRowIndexOf(treeLazyLoadeds, row) === -1) {
          var expanded = !tableMethods.isTreeExpandByRow(row);
          var columnIndex = tableMethods.getColumnIndex(column);
          var $columnIndex = tableMethods.getVMColumnIndex(column);
          tableMethods.setTreeExpand(row, expanded);
          tableMethods.dispatchEvent("toggle-tree-expand", { expanded, column, columnIndex, $columnIndex, row }, evnt);
        }
      },
      /**
       * 点击排序事件
       */
      triggerSortEvent: function(evnt, column, order) {
        var sortOpts = computeSortOpts.value;
        var field = column.field, sortable = column.sortable;
        if (sortable) {
          if (!order || column.order === order) {
            tableMethods.clearSort(sortOpts.multiple ? column : null);
          } else {
            tableMethods.sort({ field, order });
          }
          var params = { column, field, property: field, order: column.order, sortList: tableMethods.getSortColumns() };
          tableMethods.dispatchEvent("sort-change", params, evnt);
        }
      },
      /**
       * 横向 X 可视渲染事件处理
       */
      triggerScrollXEvent: function() {
        loadScrollXData();
      },
      /**
       * 纵向 Y 可视渲染事件处理
       */
      triggerScrollYEvent: function(evnt) {
        var scrollYStore = internalData.scrollYStore;
        var adaptive = scrollYStore.adaptive, offsetSize = scrollYStore.offsetSize, visibleSize = scrollYStore.visibleSize;
        if (isWebkit && adaptive && offsetSize * 2 + visibleSize <= 40) {
          loadScrollYData(evnt);
        } else {
          debounceScrollY(evnt);
        }
      },
      /**
       * 对于树形结构中，可以直接滚动到指定深层节点中
       * 对于某些特定的场景可能会用到，比如定位到某一节点
       * @param {Row} row 行对象
       */
      scrollToTreeRow: function(row) {
        var treeConfig = props.treeConfig;
        var tableFullData = internalData.tableFullData;
        var rests = [];
        if (treeConfig) {
          var treeOpts = computeTreeOpts.value;
          var matchObj = XEUtils$1.findTree(tableFullData, function(item) {
            return $xetable.eqRow(item, row);
          }, treeOpts);
          if (matchObj) {
            var nodes_1 = matchObj.nodes;
            nodes_1.forEach(function(row2, index) {
              if (index < nodes_1.length - 1 && !tableMethods.isTreeExpandByRow(row2)) {
                rests.push(tableMethods.setTreeExpand(row2, true));
              }
            });
          }
        }
        return Promise.all(rests).then(function() {
          return rowToVisible($xetable, row);
        });
      },
      // 更新横向 X 可视渲染上下剩余空间大小
      updateScrollXSpace: function() {
        var isGroup = reactData.isGroup, scrollXLoad = reactData.scrollXLoad, scrollbarWidth = reactData.scrollbarWidth;
        var visibleColumn = internalData.visibleColumn, scrollXStore = internalData.scrollXStore, elemStore = internalData.elemStore, tableWidth = internalData.tableWidth;
        var tableHeader = refTableHeader.value;
        var tableBody = refTableBody.value;
        var tableFooter = refTableFooter.value;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        if (tableBodyElem) {
          var tableHeaderElem = tableHeader ? tableHeader.$el : null;
          var tableFooterElem = tableFooter ? tableFooter.$el : null;
          var headerElem = tableHeaderElem ? tableHeaderElem.querySelector(".vxe-table--header") : null;
          var bodyElem = tableBodyElem.querySelector(".vxe-table--body");
          var footerElem = tableFooterElem ? tableFooterElem.querySelector(".vxe-table--footer") : null;
          var leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce(function(previous, column) {
            return previous + column.renderWidth;
          }, 0);
          var marginLeft = "";
          if (scrollXLoad) {
            marginLeft = "".concat(leftSpaceWidth, "px");
          }
          if (headerElem) {
            headerElem.style.marginLeft = isGroup ? "" : marginLeft;
          }
          bodyElem.style.marginLeft = marginLeft;
          if (footerElem) {
            footerElem.style.marginLeft = marginLeft;
          }
          var containerList = ["main"];
          containerList.forEach(function(name) {
            var layoutList = ["header", "body", "footer"];
            layoutList.forEach(function(layout) {
              var xSpaceRef = elemStore["".concat(name, "-").concat(layout, "-xSpace")];
              var xSpaceElem = xSpaceRef ? xSpaceRef.value : null;
              if (xSpaceElem) {
                xSpaceElem.style.width = scrollXLoad ? "".concat(tableWidth + (layout === "header" ? scrollbarWidth : 0), "px") : "";
              }
            });
          });
          nextTick(updateStyle);
        }
      },
      // 更新纵向 Y 可视渲染上下剩余空间大小
      updateScrollYSpace: function() {
        var scrollYLoad = reactData.scrollYLoad;
        var scrollYStore = internalData.scrollYStore, elemStore = internalData.elemStore, afterFullData = internalData.afterFullData;
        var startIndex = scrollYStore.startIndex, rowHeight = scrollYStore.rowHeight;
        var bodyHeight = afterFullData.length * rowHeight;
        var topSpaceHeight = Math.max(0, startIndex * rowHeight);
        var containerList = ["main", "left", "right"];
        var marginTop = "";
        var ySpaceHeight = "";
        if (scrollYLoad) {
          marginTop = "".concat(topSpaceHeight, "px");
          ySpaceHeight = "".concat(bodyHeight, "px");
        }
        containerList.forEach(function(name) {
          var layoutList = ["header", "body", "footer"];
          var tableRef = elemStore["".concat(name, "-body-table")];
          var tableElem = tableRef ? tableRef.value : null;
          if (tableElem) {
            tableElem.style.marginTop = marginTop;
          }
          layoutList.forEach(function(layout) {
            var ySpaceRef = elemStore["".concat(name, "-").concat(layout, "-ySpace")];
            var ySpaceElem = ySpaceRef ? ySpaceRef.value : null;
            if (ySpaceElem) {
              ySpaceElem.style.height = ySpaceHeight;
            }
          });
        });
        nextTick(updateStyle);
      },
      updateScrollXData: function() {
        nextTick(function() {
          handleTableColumn();
          tablePrivateMethods.updateScrollXSpace();
        });
      },
      updateScrollYData: function() {
        nextTick(function() {
          tablePrivateMethods.handleTableData();
          tablePrivateMethods.updateScrollYSpace();
        });
      },
      /**
       * 处理固定列的显示状态
       */
      checkScrolling: function() {
        var leftContainerElem = refLeftContainer.value;
        var rightContainerElem = refRightContainer.value;
        var tableBody = refTableBody.value;
        var bodyElem = tableBody ? tableBody.$el : null;
        if (bodyElem) {
          if (leftContainerElem) {
            if (bodyElem.scrollLeft > 0) {
              addClass(leftContainerElem, "scrolling--middle");
            } else {
              removeClass(leftContainerElem, "scrolling--middle");
            }
          }
          if (rightContainerElem) {
            if (bodyElem.clientWidth < bodyElem.scrollWidth - Math.ceil(bodyElem.scrollLeft)) {
              addClass(rightContainerElem, "scrolling--middle");
            } else {
              removeClass(rightContainerElem, "scrolling--middle");
            }
          }
        }
      },
      updateZindex: function() {
        if (props.zIndex) {
          internalData.tZindex = props.zIndex;
        } else if (internalData.tZindex < getLastZIndex()) {
          internalData.tZindex = nextZIndex();
        }
      },
      updateCellAreas: function() {
        var mouseConfig = props.mouseConfig;
        var mouseOpts = computeMouseOpts.value;
        if (mouseConfig && mouseOpts.area && $xetable.handleUpdateCellAreas) {
          $xetable.handleUpdateCellAreas();
        }
      },
      /**
       * 行 hover 事件
       */
      triggerHoverEvent: function(evnt, _a) {
        var row = _a.row;
        tablePrivateMethods.setHoverRow(row);
      },
      setHoverRow: function(row) {
        var rowid = getRowid($xetable, row);
        var el = refElem.value;
        tablePrivateMethods.clearHoverRow();
        if (el) {
          XEUtils$1.arrayEach(el.querySelectorAll('[rowid="'.concat(rowid, '"]')), function(elem) {
            return addClass(elem, "row--hover");
          });
        }
        internalData.hoverRow = row;
      },
      clearHoverRow: function() {
        var el = refElem.value;
        if (el) {
          XEUtils$1.arrayEach(el.querySelectorAll(".vxe-body--row.row--hover"), function(elem) {
            return removeClass(elem, "row--hover");
          });
        }
        internalData.hoverRow = null;
      },
      getCell: function(row, column) {
        var rowid = getRowid($xetable, row);
        var tableBody = refTableBody.value;
        var leftBody = refTableLeftBody.value;
        var rightBody = refTableRightBody.value;
        var bodyElem;
        if (column.fixed) {
          if (column.fixed === "left") {
            if (leftBody) {
              bodyElem = leftBody.$el;
            }
          } else {
            if (rightBody) {
              bodyElem = rightBody.$el;
            }
          }
        }
        if (!bodyElem) {
          bodyElem = tableBody.$el;
        }
        if (bodyElem) {
          return bodyElem.querySelector('.vxe-body--row[rowid="'.concat(rowid, '"] .').concat(column.id));
        }
        return null;
      },
      getCellLabel: function(row, column) {
        var formatter = column.formatter;
        var cellValue = getCellValue(row, column);
        var cellLabel = cellValue;
        if (formatter) {
          var formatData = void 0;
          var fullAllDataRowIdData = internalData.fullAllDataRowIdData;
          var rowid = getRowid($xetable, row);
          var colid = column.id;
          var rest = fullAllDataRowIdData[rowid];
          if (rest) {
            formatData = rest.formatData;
            if (!formatData) {
              formatData = fullAllDataRowIdData[rowid].formatData = {};
            }
            if (rest && formatData[colid]) {
              if (formatData[colid].value === cellValue) {
                return formatData[colid].label;
              }
            }
          }
          var formatParams = { cellValue, row, rowIndex: tableMethods.getRowIndex(row), column, columnIndex: tableMethods.getColumnIndex(column) };
          if (XEUtils$1.isString(formatter)) {
            var globalFunc = VXETable.formats.get(formatter);
            cellLabel = globalFunc ? globalFunc(formatParams) : "";
          } else if (XEUtils$1.isArray(formatter)) {
            var globalFunc = VXETable.formats.get(formatter[0]);
            cellLabel = globalFunc ? globalFunc.apply(void 0, __spreadArray([formatParams], formatter.slice(1), false)) : "";
          } else {
            cellLabel = formatter(formatParams);
          }
          if (formatData) {
            formatData[colid] = { value: cellValue, label: cellLabel };
          }
        }
        return cellLabel;
      },
      findRowIndexOf: function(list, row) {
        return row ? XEUtils$1.findIndexOf(list, function(item) {
          return $xetable.eqRow(item, row);
        }) : -1;
      },
      eqRow: function(row1, row2) {
        if (row1 && row2) {
          if (row1 === row2) {
            return true;
          }
          return getRowid($xetable, row1) === getRowid($xetable, row2);
        }
        return false;
      }
    };
    if (process.env.NODE_ENV === "development") {
      "openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print".split(",").forEach(function(name) {
        $xetable[name] = function() {
          errLog("vxe.error.reqModule", ["Export"]);
        };
      });
      "clearValidate,fullValidate,validate".split(",").forEach(function(name) {
        $xetable[name] = function() {
          errLog("vxe.error.reqModule", ["Validator"]);
        };
      });
    }
    Object.assign($xetable, tableMethods, tablePrivateMethods);
    var renderFixed = function(fixedType) {
      var showHeader = props.showHeader, showFooter = props.showFooter;
      var tableData = reactData.tableData, tableColumn = reactData.tableColumn, tableGroupColumn = reactData.tableGroupColumn, columnStore = reactData.columnStore, footerTableData = reactData.footerTableData;
      var isFixedLeft = fixedType === "left";
      var fixedColumn = isFixedLeft ? columnStore.leftList : columnStore.rightList;
      return h("div", {
        ref: isFixedLeft ? refLeftContainer : refRightContainer,
        class: "vxe-table--fixed-".concat(fixedType, "-wrapper")
      }, [
        showHeader ? h(Header, {
          ref: isFixedLeft ? refTableLeftHeader : refTableRightHeader,
          fixedType,
          tableData,
          tableColumn,
          tableGroupColumn,
          fixedColumn
        }) : createCommentVNode(),
        h(TableBodyComponent, {
          ref: isFixedLeft ? refTableLeftBody : refTableRightBody,
          fixedType,
          tableData,
          tableColumn,
          fixedColumn
        }),
        showFooter ? h(Footer, {
          ref: isFixedLeft ? refTableLeftFooter : refTableRightFooter,
          footerTableData,
          tableColumn,
          fixedColumn,
          fixedType
        }) : createCommentVNode()
      ]);
    };
    var renderEmptyContenet = function() {
      var emptyOpts = computeEmptyOpts.value;
      var params = { $table: $xetable };
      if (slots.empty) {
        return slots.empty(params);
      } else {
        var compConf = emptyOpts.name ? VXETable.renderer.get(emptyOpts.name) : null;
        var renderEmpty = compConf ? compConf.renderEmpty : null;
        if (renderEmpty) {
          return getSlotVNs(renderEmpty(emptyOpts, params));
        }
      }
      return getFuncText(props.emptyText) || GlobalConfig.i18n("vxe.table.emptyText");
    };
    function handleUupdateResize() {
      var el = refElem.value;
      if (el && el.clientWidth && el.clientHeight) {
        tableMethods.recalculate();
      }
    }
    watch(function() {
      return props.data;
    }, function(value) {
      var inited = internalData.inited, initStatus = internalData.initStatus;
      loadTableData(value || []).then(function() {
        var scrollXLoad = reactData.scrollXLoad, scrollYLoad = reactData.scrollYLoad, expandColumn = reactData.expandColumn;
        internalData.inited = true;
        internalData.initStatus = true;
        if (!initStatus) {
          handleLoadDefaults();
        }
        if (!inited) {
          handleInitDefaults();
        }
        if (process.env.NODE_ENV === "development") {
          if ((scrollXLoad || scrollYLoad) && expandColumn) {
            warnLog("vxe.error.scrollErrProp", ["column.type=expand"]);
          }
        }
        tableMethods.recalculate();
      });
    });
    watch(function() {
      return reactData.staticColumns;
    }, function(value) {
      handleColumn(value);
    });
    watch(function() {
      return reactData.tableColumn;
    }, function() {
      tablePrivateMethods.analyColumnWidth();
    });
    watch(function() {
      return props.showHeader;
    }, function() {
      nextTick(function() {
        tableMethods.recalculate(true).then(function() {
          return tableMethods.refreshScroll();
        });
      });
    });
    watch(function() {
      return props.showFooter;
    }, function() {
      nextTick(function() {
        tableMethods.recalculate(true).then(function() {
          return tableMethods.refreshScroll();
        });
      });
    });
    watch(function() {
      return props.height;
    }, function() {
      nextTick(function() {
        return tableMethods.recalculate(true);
      });
    });
    watch(function() {
      return props.maxHeight;
    }, function() {
      nextTick(function() {
        return tableMethods.recalculate(true);
      });
    });
    watch(function() {
      return props.syncResize;
    }, function(value) {
      if (value) {
        handleUupdateResize();
        nextTick(function() {
          handleUupdateResize();
          setTimeout(function() {
            return handleUupdateResize();
          });
        });
      }
    });
    watch(function() {
      return props.mergeCells;
    }, function(value) {
      tableMethods.clearMergeCells();
      nextTick(function() {
        if (value) {
          tableMethods.setMergeCells(value);
        }
      });
    });
    watch(function() {
      return props.mergeFooterItems;
    }, function(value) {
      tableMethods.clearMergeFooterItems();
      nextTick(function() {
        if (value) {
          tableMethods.setMergeFooterItems(value);
        }
      });
    });
    VXETable.hooks.forEach(function(options) {
      var setupTable = options.setupTable;
      if (setupTable) {
        var hookRest = setupTable($xetable);
        if (hookRest && XEUtils$1.isObject(hookRest)) {
          Object.assign($xetable, hookRest);
        }
      }
    });
    tablePrivateMethods.preventEvent(null, "created", { $table: $xetable });
    var resizeObserver;
    onActivated(function() {
      tableMethods.recalculate().then(function() {
        return tableMethods.refreshScroll();
      });
      tablePrivateMethods.preventEvent(null, "activated", { $table: $xetable });
    });
    onDeactivated(function() {
      internalData.isActivated = false;
      tablePrivateMethods.preventEvent(null, "deactivated", { $table: $xetable });
    });
    onMounted(function() {
      nextTick(function() {
        var data = props.data, treeConfig = props.treeConfig, showOverflow = props.showOverflow;
        var scrollXStore = internalData.scrollXStore, scrollYStore = internalData.scrollYStore;
        var sYOpts = computeSYOpts.value;
        var editOpts = computeEditOpts.value;
        var treeOpts = computeTreeOpts.value;
        var radioOpts = computeRadioOpts.value;
        var checkboxOpts = computeCheckboxOpts.value;
        var expandOpts = computeExpandOpts.value;
        var rowOpts = computeRowOpts.value;
        if (process.env.NODE_ENV === "development") {
          if (!(props.rowId || rowOpts.keyField) && (checkboxOpts.reserve || checkboxOpts.checkRowKeys || radioOpts.reserve || radioOpts.checkRowKey || expandOpts.expandRowKeys || treeOpts.expandRowKeys)) {
            warnLog("vxe.error.reqProp", ["row-config.keyField"]);
          }
          if (props.editConfig && (editOpts.showStatus || editOpts.showUpdateStatus || editOpts.showInsertStatus) && !props.keepSource) {
            warnLog("vxe.error.reqProp", ["keep-source"]);
          }
          if (treeConfig && treeOpts.line && (!(props.rowKey || rowOpts.useKey) || !showOverflow)) {
            warnLog("vxe.error.reqProp", ["row-config.useKey | show-overflow"]);
          }
          if (treeConfig && props.stripe) {
            warnLog("vxe.error.noTree", ["stripe"]);
          }
          if (props.showFooter && !props.footerMethod) {
            warnLog("vxe.error.reqProp", ["footer-method"]);
          }
          var exportConfig = props.exportConfig, importConfig = props.importConfig;
          var exportOpts = computeExportOpts.value;
          var importOpts = computeImportOpts.value;
          if (importConfig && importOpts.types && !importOpts.importMethod && !XEUtils$1.includeArrays(VXETable.config.importTypes, importOpts.types)) {
            warnLog("vxe.error.errProp", ["export-config.types=".concat(importOpts.types.join(",")), importOpts.types.filter(function(type) {
              return XEUtils$1.includes(VXETable.config.importTypes, type);
            }).join(",") || VXETable.config.importTypes.join(",")]);
          }
          if (exportConfig && exportOpts.types && !exportOpts.exportMethod && !XEUtils$1.includeArrays(VXETable.config.exportTypes, exportOpts.types)) {
            warnLog("vxe.error.errProp", ["export-config.types=".concat(exportOpts.types.join(",")), exportOpts.types.filter(function(type) {
              return XEUtils$1.includes(VXETable.config.exportTypes, type);
            }).join(",") || VXETable.config.exportTypes.join(",")]);
          }
        }
        if (process.env.NODE_ENV === "development") {
          var customOpts = computeCustomOpts.value;
          var mouseOpts = computeMouseOpts.value;
          var rowOpts_1 = computeRowOpts.value;
          if (!props.id && props.customConfig && (customOpts.storage === true || customOpts.storage && customOpts.storage.resizable || customOpts.storage && customOpts.storage.visible)) {
            errLog("vxe.error.reqProp", ["id"]);
          }
          if (props.treeConfig && checkboxOpts.range) {
            errLog("vxe.error.noTree", ["checkbox-config.range"]);
          }
          if (rowOpts_1.height && !props.showOverflow) {
            warnLog("vxe.error.notProp", ["table.show-overflow"]);
          }
          if (!$xetable.handleUpdateCellAreas) {
            if (props.clipConfig) {
              warnLog("vxe.error.notProp", ["clip-config"]);
            }
            if (props.fnrConfig) {
              warnLog("vxe.error.notProp", ["fnr-config"]);
            }
            if (mouseOpts.area) {
              errLog("vxe.error.notProp", ["mouse-config.area"]);
              return;
            }
          }
          if (mouseOpts.area && mouseOpts.selected) {
            warnLog("vxe.error.errConflicts", ["mouse-config.area", "mouse-config.selected"]);
          }
          if (mouseOpts.area && checkboxOpts.range) {
            warnLog("vxe.error.errConflicts", ["mouse-config.area", "checkbox-config.range"]);
          }
          if (props.treeConfig && mouseOpts.area) {
            errLog("vxe.error.noTree", ["mouse-config.area"]);
          }
        }
        if (process.env.NODE_ENV === "development") {
          if (props.editConfig && !$xetable.insert) {
            errLog("vxe.error.reqModule", ["Edit"]);
          }
          if (props.editRules && !$xetable.validate) {
            errLog("vxe.error.reqModule", ["Validator"]);
          }
          if ((checkboxOpts.range || props.keyboardConfig || props.mouseConfig) && !$xetable.triggerCellMousedownEvent) {
            errLog("vxe.error.reqModule", ["Keyboard"]);
          }
          if ((props.printConfig || props.importConfig || props.exportConfig) && !$xetable.exportData) {
            errLog("vxe.error.reqModule", ["Export"]);
          }
        }
        Object.assign(scrollYStore, {
          startIndex: 0,
          endIndex: 0,
          visibleSize: 0,
          adaptive: sYOpts.adaptive !== false
        });
        Object.assign(scrollXStore, {
          startIndex: 0,
          endIndex: 0,
          visibleSize: 0
        });
        loadTableData(data || []).then(function() {
          if (data && data.length) {
            internalData.inited = true;
            internalData.initStatus = true;
            handleLoadDefaults();
            handleInitDefaults();
          }
          updateStyle();
        });
        if (props.autoResize) {
          var el = refElem.value;
          var parentEl = tablePrivateMethods.getParentElem();
          resizeObserver = createResizeEvent(function() {
            if (props.autoResize) {
              tableMethods.recalculate(true);
            }
          });
          if (el) {
            resizeObserver.observe(el);
          }
          if (parentEl) {
            resizeObserver.observe(parentEl);
          }
        }
      });
      GlobalEvent.on($xetable, "paste", handleGlobalPasteEvent);
      GlobalEvent.on($xetable, "copy", handleGlobalCopyEvent);
      GlobalEvent.on($xetable, "cut", handleGlobalCutEvent);
      GlobalEvent.on($xetable, "mousedown", handleGlobalMousedownEvent);
      GlobalEvent.on($xetable, "blur", handleGlobalBlurEvent);
      GlobalEvent.on($xetable, "mousewheel", handleGlobalMousewheelEvent);
      GlobalEvent.on($xetable, "keydown", handleGlobalKeydownEvent);
      GlobalEvent.on($xetable, "resize", handleGlobalResizeEvent);
      if ($xetable.handleGlobalContextmenuEvent) {
        GlobalEvent.on($xetable, "contextmenu", $xetable.handleGlobalContextmenuEvent);
      }
      tablePrivateMethods.preventEvent(null, "mounted", { $table: $xetable });
    });
    onBeforeUnmount(function() {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      tableMethods.closeFilter();
      if ($xetable.closeMenu) {
        $xetable.closeMenu();
      }
      tablePrivateMethods.preventEvent(null, "beforeUnmount", { $table: $xetable });
    });
    onUnmounted(function() {
      GlobalEvent.off($xetable, "paste");
      GlobalEvent.off($xetable, "copy");
      GlobalEvent.off($xetable, "cut");
      GlobalEvent.off($xetable, "mousedown");
      GlobalEvent.off($xetable, "blur");
      GlobalEvent.off($xetable, "mousewheel");
      GlobalEvent.off($xetable, "keydown");
      GlobalEvent.off($xetable, "resize");
      GlobalEvent.off($xetable, "contextmenu");
      tablePrivateMethods.preventEvent(null, "unmounted", { $table: $xetable });
    });
    var renderVN = function() {
      var _a;
      var loading = props.loading, stripe = props.stripe, showHeader = props.showHeader, height = props.height, treeConfig = props.treeConfig, mouseConfig = props.mouseConfig, showFooter = props.showFooter, highlightCell = props.highlightCell, highlightHoverRow = props.highlightHoverRow, highlightHoverColumn = props.highlightHoverColumn, editConfig = props.editConfig;
      var isGroup = reactData.isGroup, overflowX = reactData.overflowX, overflowY = reactData.overflowY, scrollXLoad = reactData.scrollXLoad, scrollYLoad = reactData.scrollYLoad, scrollbarHeight = reactData.scrollbarHeight, tableData = reactData.tableData, tableColumn = reactData.tableColumn, tableGroupColumn = reactData.tableGroupColumn, footerTableData = reactData.footerTableData, initStore = reactData.initStore, columnStore = reactData.columnStore, filterStore = reactData.filterStore;
      var leftList = columnStore.leftList, rightList = columnStore.rightList;
      var tipConfig = computeTipConfig.value;
      var treeOpts = computeTreeOpts.value;
      var rowOpts = computeRowOpts.value;
      var columnOpts = computeColumnOpts.value;
      var vSize = computeSize.value;
      var tableBorder = computeTableBorder.value;
      var mouseOpts = computeMouseOpts.value;
      var validOpts = computeValidOpts.value;
      var validTipOpts = computeValidTipOpts.value;
      var loadingOpts = computeLoadingOpts.value;
      var isMenu = computeIsMenu.value;
      return h("div", {
        ref: refElem,
        class: ["vxe-table", "vxe-table--render-default", "tid_".concat(xID), "border--".concat(tableBorder), (_a = {}, _a["size--".concat(vSize)] = vSize, _a["vxe-editable"] = !!editConfig, _a["cell--highlight"] = highlightCell, _a["cell--selected"] = mouseConfig && mouseOpts.selected, _a["cell--area"] = mouseConfig && mouseOpts.area, _a["row--highlight"] = rowOpts.isHover || highlightHoverRow, _a["column--highlight"] = columnOpts.isHover || highlightHoverColumn, _a["is--header"] = showHeader, _a["is--footer"] = showFooter, _a["is--group"] = isGroup, _a["is--tree-line"] = treeConfig && treeOpts.line, _a["is--fixed-left"] = leftList.length, _a["is--fixed-right"] = rightList.length, _a["is--animat"] = !!props.animat, _a["is--round"] = props.round, _a["is--stripe"] = !treeConfig && stripe, _a["is--loading"] = loading, _a["is--empty"] = !loading && !tableData.length, _a["is--scroll-y"] = overflowY, _a["is--scroll-x"] = overflowX, _a["is--virtual-x"] = scrollXLoad, _a["is--virtual-y"] = scrollYLoad, _a)],
        onKeydown: keydownEvent
      }, [
        /**
         * 隐藏列
         */
        h("div", {
          class: "vxe-table-slots"
        }, slots.default ? slots.default({}) : []),
        h("div", {
          class: "vxe-table--render-wrapper"
        }, [
          h("div", {
            class: "vxe-table--main-wrapper"
          }, [
            /**
             * 表头
             */
            showHeader ? h(Header, {
              ref: refTableHeader,
              tableData,
              tableColumn,
              tableGroupColumn
            }) : createCommentVNode(),
            /**
             * 表体
             */
            h(TableBodyComponent, {
              ref: refTableBody,
              tableData,
              tableColumn
            }),
            /**
             * 表尾
             */
            showFooter ? h(Footer, {
              ref: refTableFooter,
              footerTableData,
              tableColumn
            }) : createCommentVNode()
          ]),
          h("div", {
            class: "vxe-table--fixed-wrapper"
          }, [
            /**
             * 左侧固定区域
             */
            leftList && leftList.length && overflowX ? renderFixed("left") : createCommentVNode(),
            /**
             * 右侧固定区域
             */
            rightList && rightList.length && overflowX ? renderFixed("right") : createCommentVNode()
          ])
        ]),
        /**
         * 空数据
         */
        h("div", {
          ref: refEmptyPlaceholder,
          class: "vxe-table--empty-placeholder"
        }, [
          h("div", {
            class: "vxe-table--empty-content"
          }, renderEmptyContenet())
        ]),
        /**
         * 边框线
         */
        h("div", {
          class: "vxe-table--border-line"
        }),
        /**
         * 列宽线
         */
        h("div", {
          ref: refCellResizeBar,
          class: "vxe-table--resizable-bar",
          style: overflowX ? {
            "padding-bottom": "".concat(scrollbarHeight, "px")
          } : null
        }),
        /**
         * 加载中
         */
        h(VxeLoading, {
          class: "vxe-table--loading",
          modelValue: loading,
          icon: loadingOpts.icon,
          text: loadingOpts.text
        }),
        /**
         * 筛选
         */
        initStore.filter ? h(resolveComponent("vxe-table-filter"), {
          ref: refTableFilter,
          filterStore
        }) : createCommentVNode(),
        /**
         * 导入
         */
        initStore.import && props.importConfig ? h(resolveComponent("vxe-import-panel"), {
          defaultOptions: reactData.importParams,
          storeData: reactData.importStore
        }) : createCommentVNode(),
        /**
         * 导出/导出
         */
        initStore.export && (props.exportConfig || props.printConfig) ? h(resolveComponent("vxe-export-panel"), {
          defaultOptions: reactData.exportParams,
          storeData: reactData.exportStore
        }) : createCommentVNode(),
        /**
         * 快捷菜单
         */
        isMenu ? h(resolveComponent("vxe-table-context-menu"), {
          ref: refTableMenu
        }) : createCommentVNode(),
        /**
         * 通用提示
         */
        hasUseTooltip ? h(resolveComponent("vxe-tooltip"), {
          ref: refCommTooltip,
          isArrow: false,
          enterable: false
        }) : createCommentVNode(),
        /**
         * 校验提示
         */
        hasUseTooltip && props.editRules && validOpts.showMessage && (validOpts.message === "default" ? !height : validOpts.message === "tooltip") ? h(resolveComponent("vxe-tooltip"), __assign({ ref: refValidTooltip, class: "vxe-table--valid-error" }, validOpts.message === "tooltip" || tableData.length === 1 ? validTipOpts : {})) : createCommentVNode(),
        /**
         * 工具提示
         */
        hasUseTooltip ? h(resolveComponent("vxe-tooltip"), __assign({ ref: refTooltip }, tipConfig)) : createCommentVNode()
      ]);
    };
    $xetable.renderVN = renderVN;
    provide("xecolgroup", null);
    provide("$xetable", $xetable);
    return $xetable;
  },
  render: function() {
    return this.renderVN();
  }
});
var VxeTable = Object.assign(VxeTableComponent, {
  install: function(app) {
    app.component(VxeTableComponent.name, VxeTableComponent);
  }
});
dynamicApp.component(VxeTableComponent.name, VxeTableComponent);
const zhCN = {
  vxe: {
    loading: {
      text: "加载中..."
    },
    error: {
      groupFixed: "如果使用分组表头，固定列必须按组设置",
      groupMouseRange: '分组表头与 "{0}" 不能同时使用，这可能会出现错误',
      groupTag: '分组列头应该使用 "{0}" 而不是 "{1}"，这可能会出现错误',
      scrollErrProp: '启用虚拟滚动后不支持该参数 "{0}"',
      errConflicts: '参数 "{0}" 与 "{1}" 有冲突',
      unableInsert: "无法插入到指定位置，请检查参数是否正确",
      useErr: '安装 "{0}" 模块时发生错误，可能顺序不正确，依赖的模块需要在 Table 之前安装',
      barUnableLink: "工具栏无法关联表格",
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
      reqModule: '缺少 "{0}" 模块',
      reqProp: '缺少必要的 "{0}" 参数，这可能会导致出现错误',
      emptyProp: '参数 "{0}" 不允许为空',
      errProp: '不支持的参数 "{0}"，可能为 "{1}"',
      colRepet: 'column.{0}="{1}" 重复了，这可能会导致某些功能无法使用',
      notFunc: '方法 "{0}" 不存在',
      notSlot: '插槽 "{0}" 不存在',
      noTree: '树结构不支持 "{0}"',
      notProp: '不支持的参数 "{0}"',
      coverProp: '"{0}" 的参数 "{1}" 被覆盖，这可能会出现错误',
      delFunc: '方法 "{0}" 已废弃，请使用 "{1}"',
      delProp: '参数 "{0}" 已废弃，请使用 "{1}"',
      delEvent: '事件 "{0}" 已废弃，请使用 "{1}"',
      removeProp: '参数 "{0}" 已废弃，不建议使用，这可能会导致出现错误',
      errFormat: '全局的格式化内容应该使用 "VXETable.formats" 定义，挂载 "formatter={0}" 的方式已不建议使用',
      notType: '不支持的文件类型 "{0}"',
      notExp: "该浏览器不支持导入/导出功能",
      impFields: "导入失败，请检查字段名和数据格式是否正确",
      treeNotImp: "树表格不支持导入"
    },
    renderer: {
      search: "搜索",
      cases: {
        equal: "等于",
        unequal: "不等于",
        gt: "大于",
        ge: "大于或等于",
        lt: "小于",
        le: "小于或等于",
        begin: "开头是",
        notbegin: "开头不是",
        endin: "结尾是",
        notendin: "结尾不是",
        include: "包含",
        exclude: "不包含",
        between: "介于",
        custom: "自定义筛选",
        insensitive: "不区分大小写",
        isSensitive: "区分大小写"
      },
      combination: {
        menus: {
          clearSort: "清除排序",
          sortAsc: "升序",
          sortDesc: "降序",
          fixedColumn: "锁定列",
          fixedGroup: "锁定组",
          cancelFixed: "取消锁定",
          fixedLeft: "锁定左侧",
          fixedRight: "锁定右侧",
          clearFilter: "清除筛选",
          textOption: "文本筛选",
          numberOption: "数值筛选"
        },
        popup: {
          title: "自定义筛选的方式",
          currColumnTitle: "当前列：",
          and: "与",
          or: "或",
          describeHtml: "可用 ? 代表单个字符<br/>用 * 代表任意多个字符"
        },
        empty: "(空白)",
        notData: "无匹配项"
      }
    },
    pro: {
      area: {
        mergeErr: "无法对合并单元格进行该操作",
        multiErr: "无法对多重选择区域进行该操作",
        extendErr: "如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同",
        pasteMultiErr: "无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作"
      },
      fnr: {
        title: "查找和替换",
        findLabel: "查找",
        replaceLabel: "替换",
        findTitle: "查找内容：",
        replaceTitle: "替换为：",
        tabs: {
          find: "查找",
          replace: "替换"
        },
        filter: {
          re: "正则表达式",
          whole: "全词匹配",
          sensitive: "区分大小写"
        },
        btns: {
          findNext: "查找下一个",
          findAll: "查找全部",
          replace: "替换",
          replaceAll: "替换全部",
          cancel: "取消"
        },
        header: {
          seq: "#",
          cell: "单元格",
          value: "值"
        },
        empty: "(空值)",
        reError: "无效的正则表达式",
        recordCount: "已找到 {0} 个单元格",
        notCell: "找不到匹配的单元格",
        replaceSuccess: "成功替换 {0} 个单元格"
      }
    },
    table: {
      emptyText: "暂无数据",
      allTitle: "全选/取消",
      seqTitle: "#",
      confirmFilter: "筛选",
      resetFilter: "重置",
      allFilter: "全部",
      sortAsc: "升序：最低到最高",
      sortDesc: "降序：最高到最低",
      filter: "对所选的列启用筛选",
      impSuccess: "成功导入 {0} 条记录",
      expLoading: "正在导出中",
      expSuccess: "导出成功",
      expFilename: "导出_{0}",
      expOriginFilename: "导出_源_{0}",
      customTitle: "列设置",
      customAll: "全部",
      customConfirm: "确认",
      customRestore: "还原"
    },
    grid: {
      selectOneRecord: "请至少选择一条记录！",
      deleteSelectRecord: "您确定要删除所选记录吗？",
      removeSelectRecord: "您确定要移除所选记录吗？",
      dataUnchanged: "数据未改动！",
      delSuccess: "成功删除所选记录！",
      saveSuccess: "保存成功！",
      operError: "发生错误，操作失败！"
    },
    select: {
      search: "搜索",
      loadingText: "加载中",
      emptyText: "暂无数据"
    },
    pager: {
      goto: "前往",
      pagesize: "{0}条/页",
      total: "共 {0} 条记录",
      pageClassifier: "页",
      prevPage: "上一页",
      nextPage: "下一页",
      prevJump: "向上跳页",
      nextJump: "向下跳页"
    },
    alert: {
      title: "消息提示"
    },
    button: {
      confirm: "确认",
      cancel: "取消"
    },
    import: {
      modes: {
        covering: "覆盖",
        insert: "新增"
      },
      impTitle: "导入数据",
      impFile: "文件名",
      impSelect: "选择文件",
      impType: "文件类型",
      impOpts: "参数设置",
      impConfirm: "导入",
      impCancel: "取消"
    },
    export: {
      types: {
        csv: "CSV (逗号分隔)(*.csv)",
        html: "网页(*.html)",
        xml: "XML 数据(*.xml)",
        txt: "文本文件(制表符分隔)(*.txt)",
        xls: "Excel 97-2003 工作簿(*.xls)",
        xlsx: "Excel 工作簿(*.xlsx)",
        pdf: "PDF (*.pdf)"
      },
      modes: {
        current: "当前数据（当前页的数据）",
        selected: "选中数据（当前页选中的数据）",
        all: "全量数据（包括所有分页的数据）"
      },
      printTitle: "打印数据",
      expTitle: "导出数据",
      expName: "文件名",
      expNamePlaceholder: "请输入文件名",
      expSheetName: "标题",
      expSheetNamePlaceholder: "请输入标题",
      expType: "保存类型",
      expMode: "选择数据",
      expCurrentColumn: "全部字段",
      expColumn: "选择字段",
      expOpts: "参数设置",
      expOptHeader: "表头",
      expHeaderTitle: "是否需要表头",
      expOptFooter: "表尾",
      expFooterTitle: "是否需要表尾",
      expOptColgroup: "分组表头",
      expColgroupTitle: "如果存在，则支持带有分组结构的表头",
      expOptMerge: "合并",
      expMergeTitle: "如果存在，则支持带有合并结构的单元格",
      expOptAllExpand: "展开层级",
      expAllExpandTitle: "如果存在，则支持将带有层级结构的数据全部展开",
      expOptUseStyle: "样式",
      expUseStyleTitle: "如果存在，则支持带样式的单元格",
      expOptOriginal: "源数据",
      expOriginalTitle: "如果为源数据，则支持导入到表格中",
      expPrint: "打印",
      expConfirm: "导出",
      expCancel: "取消"
    },
    modal: {
      zoomIn: "最大化",
      zoomOut: "还原",
      close: "关闭"
    },
    form: {
      folding: "收起",
      unfolding: "展开"
    },
    toolbar: {
      import: "导入",
      export: "导出",
      print: "打印",
      refresh: "刷新",
      zoomIn: "全屏",
      zoomOut: "还原",
      custom: "列设置",
      customAll: "全部",
      customConfirm: "确认",
      customRestore: "还原"
    },
    input: {
      date: {
        m1: "01 月",
        m2: "02 月",
        m3: "03 月",
        m4: "04 月",
        m5: "05 月",
        m6: "06 月",
        m7: "07 月",
        m8: "08 月",
        m9: "09 月",
        m10: "10 月",
        m11: "11 月",
        m12: "12 月",
        quarterLabel: "{0} 年",
        monthLabel: "{0} 年",
        dayLabel: "{0} 年 {1}",
        labelFormat: {
          date: "yyyy-MM-dd",
          time: "HH:mm:ss",
          datetime: "yyyy-MM-dd HH:mm:ss",
          week: "yyyy 年第 WW 周",
          month: "yyyy-MM",
          quarter: "yyyy 年第 q 季度",
          year: "yyyy"
        },
        weeks: {
          w: "周",
          w0: "周日",
          w1: "周一",
          w2: "周二",
          w3: "周三",
          w4: "周四",
          w5: "周五",
          w6: "周六"
        },
        months: {
          m0: "一月",
          m1: "二月",
          m2: "三月",
          m3: "四月",
          m4: "五月",
          m5: "六月",
          m6: "七月",
          m7: "八月",
          m8: "九月",
          m9: "十月",
          m10: "十一月",
          m11: "十二月"
        },
        quarters: {
          q1: "第一季度",
          q2: "第二季度",
          q3: "第三季度",
          q4: "第四季度"
        }
      }
    }
  }
};
setup({
  i18n: function(key, args) {
    return XEUtils$1.toFormatString(XEUtils$1.get(zhCN, key), args);
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "GanttTable",
  props: {
    option: {},
    data: {},
    width: {}
  },
  emits: ["scroll-y"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const tableRef = ref();
    const emit = __emit;
    const handleScrollEvent = () => {
      const dom = tableRef.value.$el.querySelector(".vxe-table--body-wrapper");
      emit("scroll-y", dom.scrollTop);
    };
    const setScrollY = (y) => {
      const dom = tableRef.value.$el.querySelector(".vxe-table--body-wrapper");
      dom.scrollTop = y;
    };
    __expose({ setScrollY });
    const columns = computed(() => {
      return props.option.columns;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "gantt-table",
        style: normalizeStyle({ width: props.width + "px" })
      }, [
        createVNode(unref(VxeTable), {
          class: "satellite-table",
          border: true,
          onScroll: handleScrollEvent,
          ref_key: "tableRef",
          ref: tableRef,
          height: "auto",
          "auto-resize": "",
          size: "small",
          data: _ctx.data,
          "show-overflow": "",
          "row-config": { height: 40 }
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(columns.value, (column, index) => {
              return openBlock(), createBlock(unref(VxeColumn), {
                key: index,
                field: column.field,
                title: column.title,
                align: "center",
                width: column.width || void 0,
                "min-width": column.minWidth || void 0
              }, null, 8, ["field", "title", "width", "min-width"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["data"])
      ], 4);
    };
  }
});
const GanttTable_vue_vue_type_style_index_0_scoped_269069ba_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const GanttTable = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-269069ba"]]);
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t2, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t2 = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h2 = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t3 % 100;
      return "[" + t3 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t3, e2, n2) {
      var r2 = String(t3);
      return !r2 || r2.length >= e2 ? t3 : "" + Array(e2 + 1 - r2.length).join(n2) + t3;
    }, v2 = { s: m, z: function(t3) {
      var e2 = -t3.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t3(e2, n2) {
      if (e2.date() < n2.date())
        return -t3(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t3) {
      return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
    }, p: function(t3) {
      return { M: c, y: h2, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t3) {
      return void 0 === t3;
    } }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t3) {
      return t3 instanceof _ || !(!t3 || !t3[p]);
    }, w = function t3(e2, n2, r2) {
      var i2;
      if (!e2)
        return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1)
          return t3(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, O = function(t3, e2) {
      if (S(t3))
        return t3.clone();
      var n2 = "object" == typeof e2 ? e2 : {};
      return n2.date = t3, n2.args = arguments, new _(n2);
    }, b = v2;
    b.l = w, b.i = S, b.w = function(t3, e2) {
      return O(t3, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t3) {
        this.$L = w(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p] = true;
      }
      var m2 = M2.prototype;
      return m2.parse = function(t3) {
        this.$d = function(t4) {
          var e2 = t4.date, n2 = t4.utc;
          if (null === e2)
            return /* @__PURE__ */ new Date(NaN);
          if (b.u(e2))
            return /* @__PURE__ */ new Date();
          if (e2 instanceof Date)
            return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t3), this.init();
      }, m2.init = function() {
        var t3 = this.$d;
        this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
      }, m2.$utils = function() {
        return b;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t3, e2) {
        var n2 = O(t3);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t3, e2) {
        return O(t3) < this.startOf(e2);
      }, m2.isBefore = function(t3, e2) {
        return this.endOf(e2) < O(t3);
      }, m2.$g = function(t3, e2, n2) {
        return b.u(t3) ? this[e2] : this.set(n2, t3);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t3, e2) {
        var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t3), l2 = function(t4, e3) {
          var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t4) : new Date(n2.$y, e3, t4), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t4, e3) {
          return b.w(n2.toDate()[t4].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h2:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v3 + "Hours", 0);
          case u:
            return $2(v3 + "Minutes", 1);
          case s:
            return $2(v3 + "Seconds", 2);
          case i:
            return $2(v3 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t3) {
        return this.startOf(t3, false);
      }, m2.$set = function(t3, e2) {
        var n2, o2 = b.p(t3), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h2] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h2) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t3, e2) {
        return this.clone().$set(t3, e2);
      }, m2.get = function(t3) {
        return this[b.p(t3)]();
      }, m2.add = function(r2, f2) {
        var d3, l2 = this;
        r2 = Number(r2);
        var $2 = b.p(f2), y2 = function(t3) {
          var e2 = O(l2);
          return b.w(e2.date(e2.date() + Math.round(t3 * r2)), l2);
        };
        if ($2 === c)
          return this.set(c, this.$M + r2);
        if ($2 === h2)
          return this.set(h2, this.$y + r2);
        if ($2 === a)
          return y2(1);
        if ($2 === o)
          return y2(7);
        var M3 = (d3 = {}, d3[s] = e, d3[u] = n, d3[i] = t2, d3)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return b.w(m3, this);
      }, m2.subtract = function(t3, e2) {
        return this.add(-1 * t3, e2);
      }, m2.format = function(t3) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h3 = function(t4, n3, i3, s3) {
          return t4 && (t4[n3] || t4(e2, r2)) || i3[n3].slice(0, s3);
        }, d3 = function(t4) {
          return b.s(s2 % 12 || 12, t4, "0");
        }, $2 = f2 || function(t4, e3, n3) {
          var r3 = t4 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y, function(t4, r3) {
          return r3 || function(t5) {
            switch (t5) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b.s(a2 + 1, 2, "0");
              case "MMM":
                return h3(n2.monthsShort, a2, c2, 3);
              case "MMMM":
                return h3(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h3(n2.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h3(n2.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d3(1);
              case "hh":
                return d3(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t4) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d3, l2) {
        var $2, y2 = this, M3 = b.p(d3), m3 = O(r2), v3 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return b.m(y2, m3);
        };
        switch (M3) {
          case h2:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f:
            $2 = D2() / 3;
            break;
          case o:
            $2 = (g2 - v3) / 6048e5;
            break;
          case a:
            $2 = (g2 - v3) / 864e5;
            break;
          case u:
            $2 = g2 / n;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t2;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t3, e2) {
        if (!t3)
          return this.$L;
        var n2 = this.clone(), r2 = w(t3, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return b.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), k = _.prototype;
    return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h2], ["$D", d]].forEach(function(t3) {
      k[t3[1]] = function(e2) {
        return this.$g(e2, t3[0], t3[1]);
      };
    }), O.extend = function(t3, e2) {
      return t3.$i || (t3(e2, _, O), t3.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t3) {
      return O(1e3 * t3);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
const _hoisted_1$1 = { class: "gantt-chart" };
const _hoisted_2 = { class: "svg-container" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GanttChart",
  props: {
    data: {}
  },
  emits: ["scroll-y"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const highLight = reactive({});
    const rectRef = ref();
    watchEffect(() => {
      Object.keys(highLight).forEach((key) => {
        const color = highLight[key] ? "#0f505e" : "transparent";
        rectRef.value[key].style.backgroundColor = color;
      });
    });
    const props = __props;
    const formatTime = (unix) => {
      const day = dayjs.unix(unix);
      return day.format("YYYY-MM-DD");
    };
    const addHour = (unix, hour) => {
      const day = dayjs.unix(unix);
      return day.add(hour, "hour").unix();
    };
    const timeInterval = ref(24);
    const blockWidth = ref(200);
    const allTime = computed(() => {
      return props.data.map((item) => {
        return {
          startTime: dayjs(item.startTime).unix(),
          endTime: dayjs(item.endTime).unix()
        };
      });
    });
    const minTime = computed(() => {
      var _a;
      return allTime.value.reduce((acc, cur) => {
        return cur.startTime < acc ? cur.startTime : acc;
      }, ((_a = allTime.value[0]) == null ? void 0 : _a.startTime) || void 0);
    });
    const maxTime = computed(() => {
      var _a;
      return allTime.value.reduce((acc, cur) => {
        return cur.endTime > acc ? cur.endTime : acc;
      }, ((_a = allTime.value[0]) == null ? void 0 : _a.endTime) || void 0);
    });
    const secondWidth = computed(() => {
      return blockWidth.value / (timeInterval.value * 60 * 60);
    });
    const blockLength = computed(() => {
      if (maxTime.value && minTime.value) {
        const blockLength2 = Math.floor(
          (maxTime.value - minTime.value) / (timeInterval.value * 60 * 60)
        ) + 2;
        return blockLength2;
      } else {
        return 15;
      }
    });
    const totalWidth = computed(() => {
      if (blockLength.value) {
        return blockWidth.value * blockLength.value;
      } else {
        return 0;
      }
    });
    watchEffect(() => {
      totalWidth.value;
      blockLength.value;
      totalWidth.value;
    });
    computed(() => {
      return 40 * svgList.value.length;
    });
    ref();
    ref();
    const ganttMapContainerRef = ref();
    const ganttChartBodyRef = ref();
    ref();
    const ganttChartHeaderRef = ref();
    const headerStyle = reactive({
      transform: "translateY(0)",
      width: `${totalWidth.value}px`
    });
    watchEffect(() => {
      headerStyle.width = `${totalWidth.value}px`;
    });
    const handleScrollEvent = (event, type) => {
      emit("scroll-y", ganttChartBodyRef.value.scrollTop);
    };
    const setScrollY = (y) => {
      ganttChartBodyRef.value.scrollTop = y;
    };
    __expose({ setScrollY });
    const emit = __emit;
    const blocks = computed(() => {
      const blocks2 = [];
      for (let i = 0; i < blockLength.value; i++) {
        const unix = addHour(minTime.value, i * timeInterval.value);
        const obj = {
          unix,
          time: formatTime(unix)
        };
        blocks2.push(obj);
      }
      return blocks2;
    });
    const svgList = computed(() => {
      return allTime.value.map((item) => {
        const obj = {
          width: (item.endTime - item.startTime) * secondWidth.value,
          position: 0.5 * blockWidth.value + (item.startTime - minTime.value) * secondWidth.value
        };
        return obj;
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createElementVNode("div", {
          class: "gantt-chart-container",
          ref_key: "ganttMapContainerRef",
          ref: ganttMapContainerRef,
          onScroll: _cache[1] || (_cache[1] = ($event) => handleScrollEvent())
        }, [
          createElementVNode("div", {
            class: "gantt-chart-header",
            ref_key: "ganttChartHeaderRef",
            ref: ganttChartHeaderRef,
            style: normalizeStyle(headerStyle)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(blocks.value, (block, index) => {
              return openBlock(), createElementBlock("div", {
                class: "header-block",
                key: index
              }, toDisplayString(block.time), 1);
            }), 128))
          ], 4),
          createElementVNode("div", {
            class: "gantt-chart-body",
            onScroll: _cache[0] || (_cache[0] = ($event) => handleScrollEvent()),
            ref_key: "ganttChartBodyRef",
            ref: ganttChartBodyRef,
            style: normalizeStyle(headerStyle)
          }, [
            createElementVNode("div", _hoisted_2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(svgList.value, (svg, index) => {
                return openBlock(), createElementBlock("div", {
                  key: index,
                  class: "gantt-chart-item"
                }, [
                  createElementVNode("div", {
                    ref_for: true,
                    ref_key: "rectRef",
                    ref: rectRef,
                    class: "gantt-chart-item-bar",
                    style: normalizeStyle({
                      width: `${svg.width}px`,
                      left: `${svg.position}px`
                    })
                  }, null, 4)
                ]);
              }), 128))
            ])
          ], 36)
        ], 544)
      ]);
    };
  }
});
const GanttChart_vue_vue_type_style_index_0_scoped_ed826475_lang = "";
const GanttChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ed826475"]]);
const style = "";
const _hoisted_1 = { class: "gantt-view" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GanttView",
  props: {
    option: {},
    data: {},
    tableWidth: { default: 200 }
  },
  setup(__props) {
    const props = __props;
    const tableRef = ref();
    const chartRef = ref();
    const handleScrollYEvent = (y, type) => {
      if (type === "table") {
        chartRef.value.setScrollY(y);
      } else {
        tableRef.value.setScrollY(y);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(GanttTable, {
          ref_key: "tableRef",
          ref: tableRef,
          option: props.option,
          data: props.data,
          width: props.tableWidth,
          onScrollY: _cache[0] || (_cache[0] = ($event) => handleScrollYEvent($event, "table"))
        }, null, 8, ["option", "data", "width"]),
        createVNode(GanttChart, {
          ref_key: "chartRef",
          ref: chartRef,
          data: _ctx.data,
          onScrollY: _cache[1] || (_cache[1] = ($event) => handleScrollYEvent($event, "chart"))
        }, null, 8, ["data"])
      ]);
    };
  }
});
const GanttView_vue_vue_type_style_index_0_scoped_c179cdbd_lang = "";
const GanttView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c179cdbd"]]);
export {
  GanttView as Gantt
};
