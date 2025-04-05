"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/snakecase-keys";
exports.ids = ["vendor-chunks/snakecase-keys"];
exports.modules = {

/***/ "(rsc)/./node_modules/snakecase-keys/index.js":
/*!**********************************************!*\
  !*** ./node_modules/snakecase-keys/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst map = __webpack_require__(/*! map-obj */ \"(rsc)/./node_modules/map-obj/index.js\")\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(rsc)/./node_modules/snake-case/dist.es2015/index.js\")\n\nconst PlainObjectConstructor = {}.constructor\n\nmodule.exports = function (obj, options) {\n  if (Array.isArray(obj)) {\n    if (obj.some(item => item.constructor !== PlainObjectConstructor)) {\n      throw new Error('obj must be array of plain objects')\n    }\n  } else {\n    if (obj.constructor !== PlainObjectConstructor) {\n      throw new Error('obj must be an plain object')\n    }\n  }\n\n  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)\n\n  return map(obj, function (key, val) {\n    return [\n      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n      val,\n      mapperOptions(key, val, options)\n    ]\n  }, options)\n}\n\nfunction matches (patterns, value) {\n  return patterns.some(function (pattern) {\n    return typeof pattern === 'string'\n      ? pattern === value\n      : pattern.test(value)\n  })\n}\n\nfunction mapperOptions (key, val, options) {\n  return options.shouldRecurse\n    ? { shouldRecurse: options.shouldRecurse(key, val) }\n    : undefined\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc25ha2VjYXNlLWtleXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosWUFBWSxtQkFBTyxDQUFDLHNEQUFTO0FBQzdCLFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsd0VBQVk7O0FBRTFDLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsNkNBQTZDOztBQUV6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaWRkaGFudGd1cHRhL0RvY3VtZW50cy9wcm9qZWN0cy9mb3JnZXRhaS9ub2RlX21vZHVsZXMvc25ha2VjYXNlLWtleXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IG1hcCA9IHJlcXVpcmUoJ21hcC1vYmonKVxuY29uc3QgeyBzbmFrZUNhc2UgfSA9IHJlcXVpcmUoJ3NuYWtlLWNhc2UnKVxuXG5jb25zdCBQbGFpbk9iamVjdENvbnN0cnVjdG9yID0ge30uY29uc3RydWN0b3JcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICBpZiAob2JqLnNvbWUoaXRlbSA9PiBpdGVtLmNvbnN0cnVjdG9yICE9PSBQbGFpbk9iamVjdENvbnN0cnVjdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvYmogbXVzdCBiZSBhcnJheSBvZiBwbGFpbiBvYmplY3RzJylcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9iai5jb25zdHJ1Y3RvciAhPT0gUGxhaW5PYmplY3RDb25zdHJ1Y3Rvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvYmogbXVzdCBiZSBhbiBwbGFpbiBvYmplY3QnKVxuICAgIH1cbiAgfVxuXG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgZGVlcDogdHJ1ZSwgZXhjbHVkZTogW10sIHBhcnNpbmdPcHRpb25zOiB7fSB9LCBvcHRpb25zKVxuXG4gIHJldHVybiBtYXAob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICByZXR1cm4gW1xuICAgICAgbWF0Y2hlcyhvcHRpb25zLmV4Y2x1ZGUsIGtleSkgPyBrZXkgOiBzbmFrZUNhc2Uoa2V5LCBvcHRpb25zLnBhcnNpbmdPcHRpb25zKSxcbiAgICAgIHZhbCxcbiAgICAgIG1hcHBlck9wdGlvbnMoa2V5LCB2YWwsIG9wdGlvbnMpXG4gICAgXVxuICB9LCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChwYXR0ZXJucywgdmFsdWUpIHtcbiAgcmV0dXJuIHBhdHRlcm5zLnNvbWUoZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gdHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnXG4gICAgICA/IHBhdHRlcm4gPT09IHZhbHVlXG4gICAgICA6IHBhdHRlcm4udGVzdCh2YWx1ZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gbWFwcGVyT3B0aW9ucyAoa2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMuc2hvdWxkUmVjdXJzZVxuICAgID8geyBzaG91bGRSZWN1cnNlOiBvcHRpb25zLnNob3VsZFJlY3Vyc2Uoa2V5LCB2YWwpIH1cbiAgICA6IHVuZGVmaW5lZFxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/snakecase-keys/index.js\n");

/***/ })

};
;