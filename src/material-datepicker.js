"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.moment = factory();
}(this, function() {
    function utils_hooks__hooks() {
        return hookCallback.apply(null, arguments);
    }
    function setHookCallback(callback) {
        hookCallback = callback;
    }
    function isArray(input) {
        return "[object Array]" === Object.prototype.toString.call(input);
    }
    function isDate(input) {
        return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input);
    }
    function map(arr, fn) {
        var i, res = [];
        for (i = 0; i < arr.length; ++i) res.push(fn(arr[i], i));
        return res;
    }
    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    function extend(a, b) {
        for (var i in b) hasOwnProp(b, i) && (a[i] = b[i]);
        return hasOwnProp(b, "toString") && (a.toString = b.toString), hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf), 
        a;
    }
    function create_utc__createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !0).utc();
    }
    function defaultParsingFlags() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        };
    }
    function getParsingFlags(m) {
        return null == m._pf && (m._pf = defaultParsingFlags()), m._pf;
    }
    function valid__isValid(m) {
        if (null == m._isValid) {
            var flags = getParsingFlags(m);
            m._isValid = !(isNaN(m._d.getTime()) || !(flags.overflow < 0) || flags.empty || flags.invalidMonth || flags.invalidWeekday || flags.nullInput || flags.invalidFormat || flags.userInvalidated), 
            m._strict && (m._isValid = m._isValid && 0 === flags.charsLeftOver && 0 === flags.unusedTokens.length && void 0 === flags.bigHour);
        }
        return m._isValid;
    }
    function valid__createInvalid(flags) {
        var m = create_utc__createUTC(NaN);
        return null != flags ? extend(getParsingFlags(m), flags) : getParsingFlags(m).userInvalidated = !0, 
        m;
    }
    function copyConfig(to, from) {
        var i, prop, val;
        if ("undefined" != typeof from._isAMomentObject && (to._isAMomentObject = from._isAMomentObject), 
        "undefined" != typeof from._i && (to._i = from._i), "undefined" != typeof from._f && (to._f = from._f), 
        "undefined" != typeof from._l && (to._l = from._l), "undefined" != typeof from._strict && (to._strict = from._strict), 
        "undefined" != typeof from._tzm && (to._tzm = from._tzm), "undefined" != typeof from._isUTC && (to._isUTC = from._isUTC), 
        "undefined" != typeof from._offset && (to._offset = from._offset), "undefined" != typeof from._pf && (to._pf = getParsingFlags(from)), 
        "undefined" != typeof from._locale && (to._locale = from._locale), momentProperties.length > 0) for (i in momentProperties) prop = momentProperties[i], 
        val = from[prop], "undefined" != typeof val && (to[prop] = val);
        return to;
    }
    function Moment(config) {
        copyConfig(this, config), this._d = new Date(null != config._d ? config._d.getTime() : NaN), 
        updateInProgress === !1 && (updateInProgress = !0, utils_hooks__hooks.updateOffset(this), 
        updateInProgress = !1);
    }
    function isMoment(obj) {
        return obj instanceof Moment || null != obj && null != obj._isAMomentObject;
    }
    function absFloor(number) {
        return 0 > number ? Math.ceil(number) : Math.floor(number);
    }
    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        return 0 !== coercedNumber && isFinite(coercedNumber) && (value = absFloor(coercedNumber)), 
        value;
    }
    function compareArrays(array1, array2, dontConvert) {
        var i, len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0;
        for (i = 0; len > i; i++) (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
        return diffs + lengthDiff;
    }
    function Locale() {}
    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
    }
    function chooseLocale(names) {
        for (var j, next, locale, split, i = 0; i < names.length; ) {
            for (split = normalizeLocale(names[i]).split("-"), j = split.length, next = normalizeLocale(names[i + 1]), 
            next = next ? next.split("-") : null; j > 0; ) {
                if (locale = loadLocale(split.slice(0, j).join("-"))) return locale;
                if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1) break;
                j--;
            }
            i++;
        }
        return null;
    }
    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && "undefined" != typeof module && module && module.exports) try {
            oldLocale = globalLocale._abbr, require("./locale/" + name), locale_locales__getSetGlobalLocale(oldLocale);
        } catch (e) {}
        return locales[name];
    }
    function locale_locales__getSetGlobalLocale(key, values) {
        var data;
        return key && (data = "undefined" == typeof values ? locale_locales__getLocale(key) : defineLocale(key, values), 
        data && (globalLocale = data)), globalLocale._abbr;
    }
    function defineLocale(name, values) {
        return null !== values ? (values.abbr = name, locales[name] = locales[name] || new Locale(), 
        locales[name].set(values), locale_locales__getSetGlobalLocale(name), locales[name]) : (delete locales[name], 
        null);
    }
    function locale_locales__getLocale(key) {
        var locale;
        if (key && key._locale && key._locale._abbr && (key = key._locale._abbr), !key) return globalLocale;
        if (!isArray(key)) {
            if (locale = loadLocale(key)) return locale;
            key = [ key ];
        }
        return chooseLocale(key);
    }
    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
    }
    function normalizeUnits(units) {
        return "string" == typeof units ? aliases[units] || aliases[units.toLowerCase()] : void 0;
    }
    function normalizeObjectUnits(inputObject) {
        var normalizedProp, prop, normalizedInput = {};
        for (prop in inputObject) hasOwnProp(inputObject, prop) && (normalizedProp = normalizeUnits(prop), 
        normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
        return normalizedInput;
    }
    function makeGetSet(unit, keepTime) {
        return function(value) {
            return null != value ? (get_set__set(this, unit, value), utils_hooks__hooks.updateOffset(this, keepTime), 
            this) : get_set__get(this, unit);
        };
    }
    function get_set__get(mom, unit) {
        return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]();
    }
    function get_set__set(mom, unit, value) {
        return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
    function getSet(units, value) {
        var unit;
        if ("object" == typeof units) for (unit in units) this.set(unit, units[unit]); else if (units = normalizeUnits(units), 
        "function" == typeof this[units]) return this[units](value);
        return this;
    }
    function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
        return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        "string" == typeof callback && (func = function() {
            return this[callback]();
        }), token && (formatTokenFunctions[token] = func), padded && (formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        }), ordinal && (formatTokenFunctions[ordinal] = function() {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        });
    }
    function removeFormattingTokens(input) {
        return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") : input.replace(/\\/g, "");
    }
    function makeFormatFunction(format) {
        var i, length, array = format.match(formattingTokens);
        for (i = 0, length = array.length; length > i; i++) formatTokenFunctions[array[i]] ? array[i] = formatTokenFunctions[array[i]] : array[i] = removeFormattingTokens(array[i]);
        return function(mom) {
            var output = "";
            for (i = 0; length > i; i++) output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            return output;
        };
    }
    function formatMoment(m, format) {
        return m.isValid() ? (format = expandFormat(format, m.localeData()), formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format), 
        formatFunctions[format](m)) : m.localeData().invalidDate();
    }
    function expandFormat(format, locale) {
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }
        var i = 5;
        for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format); ) format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), 
        localFormattingTokens.lastIndex = 0, i -= 1;
        return format;
    }
    function isFunction(sth) {
        return "function" == typeof sth && "[object Function]" === Object.prototype.toString.call(sth);
    }
    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function(isStrict) {
            return isStrict && strictRegex ? strictRegex : regex;
        };
    }
    function getParseRegexForToken(token, config) {
        return hasOwnProp(regexes, token) ? regexes[token](config._strict, config._locale) : new RegExp(unescapeFormat(token));
    }
    function unescapeFormat(s) {
        return s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function addParseToken(token, callback) {
        var i, func = callback;
        for ("string" == typeof token && (token = [ token ]), "number" == typeof callback && (func = function(input, array) {
            array[callback] = toInt(input);
        }), i = 0; i < token.length; i++) tokens[token[i]] = func;
    }
    function addWeekParseToken(token, callback) {
        addParseToken(token, function(input, array, config, token) {
            config._w = config._w || {}, callback(input, config._w, config, token);
        });
    }
    function addTimeToArrayFromToken(token, input, config) {
        null != input && hasOwnProp(tokens, token) && tokens[token](input, config._a, config, token);
    }
    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
    function localeMonths(m) {
        return this._months[m.month()];
    }
    function localeMonthsShort(m) {
        return this._monthsShort[m.month()];
    }
    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
        i = 0; 12 > i; i++) {
            if (mom = create_utc__createUTC([ 2e3, i ]), strict && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i"), 
            this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i")), 
            strict || this._monthsParse[i] || (regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), 
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), strict && "MMMM" === format && this._longMonthsParse[i].test(monthName)) return i;
            if (strict && "MMM" === format && this._shortMonthsParse[i].test(monthName)) return i;
            if (!strict && this._monthsParse[i].test(monthName)) return i;
        }
    }
    function setMonth(mom, value) {
        var dayOfMonth;
        return "string" == typeof value && (value = mom.localeData().monthsParse(value), 
        "number" != typeof value) ? mom : (dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value)), 
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth), mom);
    }
    function getSetMonth(value) {
        return null != value ? (setMonth(this, value), utils_hooks__hooks.updateOffset(this, !0), 
        this) : get_set__get(this, "Month");
    }
    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }
    function checkOverflow(m) {
        var overflow, a = m._a;
        return a && -2 === getParsingFlags(m).overflow && (overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1, 
        getParsingFlags(m)._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE), 
        getParsingFlags(m).overflow = overflow), m;
    }
    function warn(msg) {
        utils_hooks__hooks.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + msg);
    }
    function deprecate(msg, fn) {
        var firstTime = !0;
        return extend(function() {
            return firstTime && (warn(msg + "\n" + new Error().stack), firstTime = !1), fn.apply(this, arguments);
        }, fn);
    }
    function deprecateSimple(name, msg) {
        deprecations[name] || (warn(msg), deprecations[name] = !0);
    }
    function configFromISO(config) {
        var i, l, string = config._i, match = from_string__isoRegex.exec(string);
        if (match) {
            for (getParsingFlags(config).iso = !0, i = 0, l = isoDates.length; l > i; i++) if (isoDates[i][1].exec(string)) {
                config._f = isoDates[i][0];
                break;
            }
            for (i = 0, l = isoTimes.length; l > i; i++) if (isoTimes[i][1].exec(string)) {
                config._f += (match[6] || " ") + isoTimes[i][0];
                break;
            }
            string.match(matchOffset) && (config._f += "Z"), configFromStringAndFormat(config);
        } else config._isValid = !1;
    }
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        return null !== matched ? void (config._d = new Date(+matched[1])) : (configFromISO(config), 
        void (config._isValid === !1 && (delete config._isValid, utils_hooks__hooks.createFromInputFallback(config))));
    }
    function createDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);
        return 1970 > y && date.setFullYear(y), date;
    }
    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        return 1970 > y && date.setUTCFullYear(y), date;
    }
    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    function getIsLeapYear() {
        return isLeapYear(this.year());
    }
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var adjustedMoment, end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
        return daysToDayOfWeek > end && (daysToDayOfWeek -= 7), end - 7 > daysToDayOfWeek && (daysToDayOfWeek += 7), 
        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, "d"), {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }
    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    function localeFirstDayOfWeek() {
        return this._week.dow;
    }
    function localeFirstDayOfYear() {
        return this._week.doy;
    }
    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return null == input ? week : this.add(7 * (input - week), "d");
    }
    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return null == input ? week : this.add(7 * (input - week), "d");
    }
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var dayOfYear, week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay();
        return firstDayOfWeek > d && (d += 7), weekday = null != weekday ? 1 * weekday : firstDayOfWeek, 
        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday, {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }
    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == input ? dayOfYear : this.add(input - dayOfYear, "d");
    }
    function defaults(a, b, c) {
        return null != a ? a : null != b ? b : c;
    }
    function currentDateArray(config) {
        var now = new Date();
        return config._useUTC ? [ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ] : [ now.getFullYear(), now.getMonth(), now.getDate() ];
    }
    function configFromArray(config) {
        var i, date, currentDate, yearToUse, input = [];
        if (!config._d) {
            for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && dayOfYearFromWeekInfo(config), 
            config._dayOfYear && (yearToUse = defaults(config._a[YEAR], currentDate[YEAR]), 
            config._dayOfYear > daysInYear(yearToUse) && (getParsingFlags(config)._overflowDayOfYear = !0), 
            date = createUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), 
            config._a[DATE] = date.getUTCDate()), i = 0; 3 > i && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
            for (;7 > i; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 : 0 : config._a[i];
            24 === config._a[HOUR] && 0 === config._a[MINUTE] && 0 === config._a[SECOND] && 0 === config._a[MILLISECOND] && (config._nextDay = !0, 
            config._a[HOUR] = 0), config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input), 
            null != config._tzm && config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm), 
            config._nextDay && (config._a[HOUR] = 24);
        }
    }
    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;
        w = config._w, null != w.GG || null != w.W || null != w.E ? (dow = 1, doy = 4, weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year), 
        week = defaults(w.W, 1), weekday = defaults(w.E, 1)) : (dow = config._locale._week.dow, 
        doy = config._locale._week.doy, weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year), 
        week = defaults(w.w, 1), null != w.d ? (weekday = w.d, dow > weekday && ++week) : weekday = null != w.e ? w.e + dow : dow), 
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow), config._a[YEAR] = temp.year, 
        config._dayOfYear = temp.dayOfYear;
    }
    function configFromStringAndFormat(config) {
        if (config._f === utils_hooks__hooks.ISO_8601) return void configFromISO(config);
        config._a = [], getParsingFlags(config).empty = !0;
        var i, parsedInput, tokens, token, skipped, string = "" + config._i, stringLength = string.length, totalParsedInputLength = 0;
        for (tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [], 
        i = 0; i < tokens.length; i++) token = tokens[i], parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0], 
        parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), skipped.length > 0 && getParsingFlags(config).unusedInput.push(skipped), 
        string = string.slice(string.indexOf(parsedInput) + parsedInput.length), totalParsedInputLength += parsedInput.length), 
        formatTokenFunctions[token] ? (parsedInput ? getParsingFlags(config).empty = !1 : getParsingFlags(config).unusedTokens.push(token), 
        addTimeToArrayFromToken(token, parsedInput, config)) : config._strict && !parsedInput && getParsingFlags(config).unusedTokens.push(token);
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && getParsingFlags(config).unusedInput.push(string), 
        getParsingFlags(config).bigHour === !0 && config._a[HOUR] <= 12 && config._a[HOUR] > 0 && (getParsingFlags(config).bigHour = void 0), 
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem), 
        configFromArray(config), checkOverflow(config);
    }
    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        return null == meridiem ? hour : null != locale.meridiemHour ? locale.meridiemHour(hour, meridiem) : null != locale.isPM ? (isPm = locale.isPM(meridiem), 
        isPm && 12 > hour && (hour += 12), isPm || 12 !== hour || (hour = 0), hour) : hour;
    }
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (0 === config._f.length) return getParsingFlags(config).invalidFormat = !0, void (config._d = new Date(NaN));
        for (i = 0; i < config._f.length; i++) currentScore = 0, tempConfig = copyConfig({}, config), 
        null != config._useUTC && (tempConfig._useUTC = config._useUTC), tempConfig._f = config._f[i], 
        configFromStringAndFormat(tempConfig), valid__isValid(tempConfig) && (currentScore += getParsingFlags(tempConfig).charsLeftOver, 
        currentScore += 10 * getParsingFlags(tempConfig).unusedTokens.length, getParsingFlags(tempConfig).score = currentScore, 
        (null == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore, 
        bestMoment = tempConfig));
        extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
        if (!config._d) {
            var i = normalizeObjectUnits(config._i);
            config._a = [ i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond ], 
            configFromArray(config);
        }
    }
    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        return res._nextDay && (res.add(1, "d"), res._nextDay = void 0), res;
    }
    function prepareConfig(config) {
        var input = config._i, format = config._f;
        return config._locale = config._locale || locale_locales__getLocale(config._l), 
        null === input || void 0 === format && "" === input ? valid__createInvalid({
            nullInput: !0
        }) : ("string" == typeof input && (config._i = input = config._locale.preparse(input)), 
        isMoment(input) ? new Moment(checkOverflow(input)) : (isArray(format) ? configFromStringAndArray(config) : format ? configFromStringAndFormat(config) : isDate(input) ? config._d = input : configFromInput(config), 
        config));
    }
    function configFromInput(config) {
        var input = config._i;
        void 0 === input ? config._d = new Date() : isDate(input) ? config._d = new Date(+input) : "string" == typeof input ? configFromString(config) : isArray(input) ? (config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10);
        }), configFromArray(config)) : "object" == typeof input ? configFromObject(config) : "number" == typeof input ? config._d = new Date(input) : utils_hooks__hooks.createFromInputFallback(config);
    }
    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};
        return "boolean" == typeof locale && (strict = locale, locale = void 0), c._isAMomentObject = !0, 
        c._useUTC = c._isUTC = isUTC, c._l = locale, c._i = input, c._f = format, c._strict = strict, 
        createFromConfig(c);
    }
    function local__createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !1);
    }
    function pickBy(fn, moments) {
        var res, i;
        if (1 === moments.length && isArray(moments[0]) && (moments = moments[0]), !moments.length) return local__createLocal();
        for (res = moments[0], i = 1; i < moments.length; ++i) (!moments[i].isValid() || moments[i][fn](res)) && (res = moments[i]);
        return res;
    }
    function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
    }
    function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
    }
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours, 
        this._days = +days + 7 * weeks, this._months = +months + 3 * quarters + 12 * years, 
        this._data = {}, this._locale = locale_locales__getLocale(), this._bubble();
    }
    function isDuration(obj) {
        return obj instanceof Duration;
    }
    function offset(token, separator) {
        addFormatToken(token, 0, 0, function() {
            var offset = this.utcOffset(), sign = "+";
            return 0 > offset && (offset = -offset, sign = "-"), sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
    }
    function offsetFromString(string) {
        var matches = (string || "").match(matchOffset) || [], chunk = matches[matches.length - 1] || [], parts = (chunk + "").match(chunkOffset) || [ "-", 0, 0 ], minutes = +(60 * parts[1]) + toInt(parts[2]);
        return "+" === parts[0] ? minutes : -minutes;
    }
    function cloneWithOffset(input, model) {
        var res, diff;
        return model._isUTC ? (res = model.clone(), diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - +res, 
        res._d.setTime(+res._d + diff), utils_hooks__hooks.updateOffset(res, !1), res) : local__createLocal(input).local();
    }
    function getDateOffset(m) {
        return 15 * -Math.round(m._d.getTimezoneOffset() / 15);
    }
    function getSetOffset(input, keepLocalTime) {
        var localAdjust, offset = this._offset || 0;
        return null != input ? ("string" == typeof input && (input = offsetFromString(input)), 
        Math.abs(input) < 16 && (input = 60 * input), !this._isUTC && keepLocalTime && (localAdjust = getDateOffset(this)), 
        this._offset = input, this._isUTC = !0, null != localAdjust && this.add(localAdjust, "m"), 
        offset !== input && (!keepLocalTime || this._changeInProgress ? add_subtract__addSubtract(this, create__createDuration(input - offset, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
        utils_hooks__hooks.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? offset : getDateOffset(this);
    }
    function getSetZone(input, keepLocalTime) {
        return null != input ? ("string" != typeof input && (input = -input), this.utcOffset(input, keepLocalTime), 
        this) : -this.utcOffset();
    }
    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
        return this._isUTC && (this.utcOffset(0, keepLocalTime), this._isUTC = !1, keepLocalTime && this.subtract(getDateOffset(this), "m")), 
        this;
    }
    function setOffsetToParsedOffset() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(offsetFromString(this._i)), 
        this;
    }
    function hasAlignedHourOffset(input) {
        return input = input ? local__createLocal(input).utcOffset() : 0, (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    function isDaylightSavingTimeShifted() {
        if ("undefined" != typeof this._isDSTShifted) return this._isDSTShifted;
        var c = {};
        if (copyConfig(c, this), c = prepareConfig(c), c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else this._isDSTShifted = !1;
        return this._isDSTShifted;
    }
    function isLocal() {
        return !this._isUTC;
    }
    function isUtcOffset() {
        return this._isUTC;
    }
    function isUtc() {
        return this._isUTC && 0 === this._offset;
    }
    function create__createDuration(input, key) {
        var sign, ret, diffRes, duration = input, match = null;
        return isDuration(input) ? duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        } : "number" == typeof input ? (duration = {}, key ? duration[key] = input : duration.milliseconds = input) : (match = aspNetRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, 
        duration = {
            y: 0,
            d: toInt(match[DATE]) * sign,
            h: toInt(match[HOUR]) * sign,
            m: toInt(match[MINUTE]) * sign,
            s: toInt(match[SECOND]) * sign,
            ms: toInt(match[MILLISECOND]) * sign
        }) : (match = create__isoRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, 
        duration = {
            y: parseIso(match[2], sign),
            M: parseIso(match[3], sign),
            d: parseIso(match[4], sign),
            h: parseIso(match[5], sign),
            m: parseIso(match[6], sign),
            s: parseIso(match[7], sign),
            w: parseIso(match[8], sign)
        }) : null == duration ? duration = {} : "object" == typeof duration && ("from" in duration || "to" in duration) && (diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to)), 
        duration = {}, duration.ms = diffRes.milliseconds, duration.M = diffRes.months), 
        ret = new Duration(duration), isDuration(input) && hasOwnProp(input, "_locale") && (ret._locale = input._locale), 
        ret;
    }
    function parseIso(inp, sign) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign;
    }
    function positiveMomentsDifference(base, other) {
        var res = {
            milliseconds: 0,
            months: 0
        };
        return res.months = other.month() - base.month() + 12 * (other.year() - base.year()), 
        base.clone().add(res.months, "M").isAfter(other) && --res.months, res.milliseconds = +other - +base.clone().add(res.months, "M"), 
        res;
    }
    function momentsDifference(base, other) {
        var res;
        return other = cloneWithOffset(other, base), base.isBefore(other) ? res = positiveMomentsDifference(base, other) : (res = positiveMomentsDifference(other, base), 
        res.milliseconds = -res.milliseconds, res.months = -res.months), res;
    }
    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            return null === period || isNaN(+period) || (deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period)."), 
            tmp = val, val = period, period = tmp), val = "string" == typeof val ? +val : val, 
            dur = create__createDuration(val, period), add_subtract__addSubtract(this, dur, direction), 
            this;
        };
    }
    function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
        updateOffset = null == updateOffset ? !0 : updateOffset, milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding), 
        days && get_set__set(mom, "Date", get_set__get(mom, "Date") + days * isAdding), 
        months && setMonth(mom, get_set__get(mom, "Month") + months * isAdding), updateOffset && utils_hooks__hooks.updateOffset(mom, days || months);
    }
    function moment_calendar__calendar(time, formats) {
        var now = time || local__createLocal(), sod = cloneWithOffset(now, this).startOf("day"), diff = this.diff(sod, "days", !0), format = -6 > diff ? "sameElse" : -1 > diff ? "lastWeek" : 0 > diff ? "lastDay" : 1 > diff ? "sameDay" : 2 > diff ? "nextDay" : 7 > diff ? "nextWeek" : "sameElse";
        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
    }
    function clone() {
        return new Moment(this);
    }
    function isAfter(input, units) {
        var inputMs;
        return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), 
        "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), 
        +this > +input) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), 
        inputMs < +this.clone().startOf(units));
    }
    function isBefore(input, units) {
        var inputMs;
        return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), 
        "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), 
        +input > +this) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), 
        +this.clone().endOf(units) < inputMs);
    }
    function isBetween(from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }
    function isSame(input, units) {
        var inputMs;
        return units = normalizeUnits(units || "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), 
        +this === +input) : (inputMs = +local__createLocal(input), +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units));
    }
    function diff(input, units, asFloat) {
        var delta, output, that = cloneWithOffset(input, this), zoneDelta = 6e4 * (that.utcOffset() - this.utcOffset());
        return units = normalizeUnits(units), "year" === units || "month" === units || "quarter" === units ? (output = monthDiff(this, that), 
        "quarter" === units ? output /= 3 : "year" === units && (output /= 12)) : (delta = this - that, 
        output = "second" === units ? delta / 1e3 : "minute" === units ? delta / 6e4 : "hour" === units ? delta / 36e5 : "day" === units ? (delta - zoneDelta) / 864e5 : "week" === units ? (delta - zoneDelta) / 6048e5 : delta), 
        asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b) {
        var anchor2, adjust, wholeMonthDiff = 12 * (b.year() - a.year()) + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months");
        return 0 > b - anchor ? (anchor2 = a.clone().add(wholeMonthDiff - 1, "months"), 
        adjust = (b - anchor) / (anchor - anchor2)) : (anchor2 = a.clone().add(wholeMonthDiff + 1, "months"), 
        adjust = (b - anchor) / (anchor2 - anchor)), -(wholeMonthDiff + adjust);
    }
    function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }
    function moment_format__toISOString() {
        var m = this.clone().utc();
        return 0 < m.year() && m.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }
    function moment_format__format(inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }
    function from(time, withoutSuffix) {
        return this.isValid() ? create__createDuration({
            to: this,
            from: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate();
    }
    function fromNow(withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }
    function to(time, withoutSuffix) {
        return this.isValid() ? create__createDuration({
            from: this,
            to: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate();
    }
    function toNow(withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }
    function locale(key) {
        var newLocaleData;
        return void 0 === key ? this._locale._abbr : (newLocaleData = locale_locales__getLocale(key), 
        null != newLocaleData && (this._locale = newLocaleData), this);
    }
    function localeData() {
        return this._locale;
    }
    function startOf(units) {
        switch (units = normalizeUnits(units)) {
          case "year":
            this.month(0);

          case "quarter":
          case "month":
            this.date(1);

          case "week":
          case "isoWeek":
          case "day":
            this.hours(0);

          case "hour":
            this.minutes(0);

          case "minute":
            this.seconds(0);

          case "second":
            this.milliseconds(0);
        }
        return "week" === units && this.weekday(0), "isoWeek" === units && this.isoWeekday(1), 
        "quarter" === units && this.month(3 * Math.floor(this.month() / 3)), this;
    }
    function endOf(units) {
        return units = normalizeUnits(units), void 0 === units || "millisecond" === units ? this : this.startOf(units).add(1, "isoWeek" === units ? "week" : units).subtract(1, "ms");
    }
    function to_type__valueOf() {
        return +this._d - 6e4 * (this._offset || 0);
    }
    function unix() {
        return Math.floor(+this / 1e3);
    }
    function toDate() {
        return this._offset ? new Date(+this) : this._d;
    }
    function toArray() {
        var m = this;
        return [ m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond() ];
    }
    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }
    function moment_valid__isValid() {
        return valid__isValid(this);
    }
    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }
    function invalidAt() {
        return getParsingFlags(this).overflow;
    }
    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [ token, token.length ], 0, getter);
    }
    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([ year, 11, 31 + dow - doy ]), dow, doy).week;
    }
    function getSetWeekYear(input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == input ? year : this.add(input - year, "y");
    }
    function getSetISOWeekYear(input) {
        var year = weekOfYear(this, 1, 4).year;
        return null == input ? year : this.add(input - year, "y");
    }
    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }
    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getSetQuarter(input) {
        return null == input ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (input - 1) + this.month() % 3);
    }
    function parseWeekday(input, locale) {
        return "string" != typeof input ? input : isNaN(input) ? (input = locale.weekdaysParse(input), 
        "number" == typeof input ? input : null) : parseInt(input, 10);
    }
    function localeWeekdays(m) {
        return this._weekdays[m.day()];
    }
    function localeWeekdaysShort(m) {
        return this._weekdaysShort[m.day()];
    }
    function localeWeekdaysMin(m) {
        return this._weekdaysMin[m.day()];
    }
    function localeWeekdaysParse(weekdayName) {
        var i, mom, regex;
        for (this._weekdaysParse = this._weekdaysParse || [], i = 0; 7 > i; i++) if (this._weekdaysParse[i] || (mom = local__createLocal([ 2e3, 1 ]).day(i), 
        regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), 
        this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), this._weekdaysParse[i].test(weekdayName)) return i;
    }
    function getSetDayOfWeek(input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != input ? (input = parseWeekday(input, this.localeData()), this.add(input - day, "d")) : day;
    }
    function getSetLocaleDayOfWeek(input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == input ? weekday : this.add(input - weekday, "d");
    }
    function getSetISODayOfWeek(input) {
        return null == input ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }
    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }
    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }
    function localeIsPM(input) {
        return "p" === (input + "").toLowerCase().charAt(0);
    }
    function localeMeridiem(hours, minutes, isLower) {
        return hours > 11 ? isLower ? "pm" : "PM" : isLower ? "am" : "AM";
    }
    function parseMs(input, array) {
        array[MILLISECOND] = toInt(1e3 * ("0." + input));
    }
    function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
    }
    function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
    }
    function moment_moment__createUnix(input) {
        return local__createLocal(1e3 * input);
    }
    function moment_moment__createInZone() {
        return local__createLocal.apply(null, arguments).parseZone();
    }
    function locale_calendar__calendar(key, mom, now) {
        var output = this._calendar[key];
        return "function" == typeof output ? output.call(mom, now) : output;
    }
    function longDateFormat(key) {
        var format = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        return format || !formatUpper ? format : (this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
            return val.slice(1);
        }), this._longDateFormat[key]);
    }
    function invalidDate() {
        return this._invalidDate;
    }
    function ordinal(number) {
        return this._ordinal.replace("%d", number);
    }
    function preParsePostFormat(string) {
        return string;
    }
    function relative__relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return "function" == typeof output ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }
    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? "future" : "past"];
        return "function" == typeof format ? format(output) : format.replace(/%s/i, output);
    }
    function locale_set__set(config) {
        var prop, i;
        for (i in config) prop = config[i], "function" == typeof prop ? this[i] = prop : this["_" + i] = prop;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
    }
    function lists__get(format, index, field, setter) {
        var locale = locale_locales__getLocale(), utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }
    function list(format, index, field, count, setter) {
        if ("number" == typeof format && (index = format, format = void 0), format = format || "", 
        null != index) return lists__get(format, index, field, setter);
        var i, out = [];
        for (i = 0; count > i; i++) out[i] = lists__get(format, i, field, setter);
        return out;
    }
    function lists__listMonths(format, index) {
        return list(format, index, "months", 12, "month");
    }
    function lists__listMonthsShort(format, index) {
        return list(format, index, "monthsShort", 12, "month");
    }
    function lists__listWeekdays(format, index) {
        return list(format, index, "weekdays", 7, "day");
    }
    function lists__listWeekdaysShort(format, index) {
        return list(format, index, "weekdaysShort", 7, "day");
    }
    function lists__listWeekdaysMin(format, index) {
        return list(format, index, "weekdaysMin", 7, "day");
    }
    function duration_abs__abs() {
        var data = this._data;
        return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), 
        this._months = mathAbs(this._months), data.milliseconds = mathAbs(data.milliseconds), 
        data.seconds = mathAbs(data.seconds), data.minutes = mathAbs(data.minutes), data.hours = mathAbs(data.hours), 
        data.months = mathAbs(data.months), data.years = mathAbs(data.years), this;
    }
    function duration_add_subtract__addSubtract(duration, input, value, direction) {
        var other = create__createDuration(input, value);
        return duration._milliseconds += direction * other._milliseconds, duration._days += direction * other._days, 
        duration._months += direction * other._months, duration._bubble();
    }
    function duration_add_subtract__add(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }
    function duration_add_subtract__subtract(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }
    function absCeil(number) {
        return 0 > number ? Math.floor(number) : Math.ceil(number);
    }
    function bubble() {
        var seconds, minutes, hours, years, monthsFromDays, milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data;
        return milliseconds >= 0 && days >= 0 && months >= 0 || 0 >= milliseconds && 0 >= days && 0 >= months || (milliseconds += 864e5 * absCeil(monthsToDays(months) + days), 
        days = 0, months = 0), data.milliseconds = milliseconds % 1e3, seconds = absFloor(milliseconds / 1e3), 
        data.seconds = seconds % 60, minutes = absFloor(seconds / 60), data.minutes = minutes % 60, 
        hours = absFloor(minutes / 60), data.hours = hours % 24, days += absFloor(hours / 24), 
        monthsFromDays = absFloor(daysToMonths(days)), months += monthsFromDays, days -= absCeil(monthsToDays(monthsFromDays)), 
        years = absFloor(months / 12), months %= 12, data.days = days, data.months = months, 
        data.years = years, this;
    }
    function daysToMonths(days) {
        return 4800 * days / 146097;
    }
    function monthsToDays(months) {
        return 146097 * months / 4800;
    }
    function as(units) {
        var days, months, milliseconds = this._milliseconds;
        if (units = normalizeUnits(units), "month" === units || "year" === units) return days = this._days + milliseconds / 864e5, 
        months = this._months + daysToMonths(days), "month" === units ? months : months / 12;
        switch (days = this._days + Math.round(monthsToDays(this._months)), units) {
          case "week":
            return days / 7 + milliseconds / 6048e5;

          case "day":
            return days + milliseconds / 864e5;

          case "hour":
            return 24 * days + milliseconds / 36e5;

          case "minute":
            return 1440 * days + milliseconds / 6e4;

          case "second":
            return 86400 * days + milliseconds / 1e3;

          case "millisecond":
            return Math.floor(864e5 * days) + milliseconds;

          default:
            throw new Error("Unknown unit " + units);
        }
    }
    function duration_as__valueOf() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12);
    }
    function makeAs(alias) {
        return function() {
            return this.as(alias);
        };
    }
    function duration_get__get(units) {
        return units = normalizeUnits(units), this[units + "s"]();
    }
    function makeGetter(name) {
        return function() {
            return this._data[name];
        };
    }
    function weeks() {
        return absFloor(this.days() / 7);
    }
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs(), seconds = round(duration.as("s")), minutes = round(duration.as("m")), hours = round(duration.as("h")), days = round(duration.as("d")), months = round(duration.as("M")), years = round(duration.as("y")), a = seconds < thresholds.s && [ "s", seconds ] || 1 === minutes && [ "m" ] || minutes < thresholds.m && [ "mm", minutes ] || 1 === hours && [ "h" ] || hours < thresholds.h && [ "hh", hours ] || 1 === days && [ "d" ] || days < thresholds.d && [ "dd", days ] || 1 === months && [ "M" ] || months < thresholds.M && [ "MM", months ] || 1 === years && [ "y" ] || [ "yy", years ];
        return a[2] = withoutSuffix, a[3] = +posNegDuration > 0, a[4] = locale, substituteTimeAgo.apply(null, a);
    }
    function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
        return void 0 === thresholds[threshold] ? !1 : void 0 === limit ? thresholds[threshold] : (thresholds[threshold] = limit, 
        !0);
    }
    function humanize(withSuffix) {
        var locale = this.localeData(), output = duration_humanize__relativeTime(this, !withSuffix, locale);
        return withSuffix && (output = locale.pastFuture(+this, output)), locale.postformat(output);
    }
    function iso_string__toISOString() {
        var minutes, hours, years, seconds = iso_string__abs(this._milliseconds) / 1e3, days = iso_string__abs(this._days), months = iso_string__abs(this._months);
        minutes = absFloor(seconds / 60), hours = absFloor(minutes / 60), seconds %= 60, 
        minutes %= 60, years = absFloor(months / 12), months %= 12;
        var Y = years, M = months, D = days, h = hours, m = minutes, s = seconds, total = this.asSeconds();
        return total ? (0 > total ? "-" : "") + "P" + (Y ? Y + "Y" : "") + (M ? M + "M" : "") + (D ? D + "D" : "") + (h || m || s ? "T" : "") + (h ? h + "H" : "") + (m ? m + "M" : "") + (s ? s + "S" : "") : "P0D";
    }
    function be__plural(word, num) {
        var forms = word.split("_");
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && 4 >= num % 10 && (10 > num % 100 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function be__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            mm: withoutSuffix ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін",
            hh: withoutSuffix ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін",
            dd: "дзень_дні_дзён",
            MM: "месяц_месяцы_месяцаў",
            yy: "год_гады_гадоў"
        };
        return "m" === key ? withoutSuffix ? "хвіліна" : "хвіліну" : "h" === key ? withoutSuffix ? "гадзіна" : "гадзіну" : number + " " + be__plural(format[key], +number);
    }
    function be__monthsCaseReplace(m, format) {
        var months = {
            nominative: "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_"),
            accusative: "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function be__weekdaysCaseReplace(m, format) {
        var weekdays = {
            nominative: "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),
            accusative: "нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_")
        }, nounCase = /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/.test(format) ? "accusative" : "nominative";
        return weekdays[nounCase][m.day()];
    }
    function relativeTimeWithMutation(number, withoutSuffix, key) {
        var format = {
            mm: "munutenn",
            MM: "miz",
            dd: "devezh"
        };
        return number + " " + mutation(format[key], number);
    }
    function specialMutationForYears(number) {
        switch (lastNumber(number)) {
          case 1:
          case 3:
          case 4:
          case 5:
          case 9:
            return number + " bloaz";

          default:
            return number + " vloaz";
        }
    }
    function lastNumber(number) {
        return number > 9 ? lastNumber(number % 10) : number;
    }
    function mutation(text, number) {
        return 2 === number ? softMutation(text) : text;
    }
    function softMutation(text) {
        var mutationTable = {
            m: "v",
            b: "v",
            d: "z"
        };
        return void 0 === mutationTable[text.charAt(0)] ? text : mutationTable[text.charAt(0)] + text.substring(1);
    }
    function bs__translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
          case "m":
            return withoutSuffix ? "jedna minuta" : "jedne minute";

          case "mm":
            return result += 1 === number ? "minuta" : 2 === number || 3 === number || 4 === number ? "minute" : "minuta";

          case "h":
            return withoutSuffix ? "jedan sat" : "jednog sata";

          case "hh":
            return result += 1 === number ? "sat" : 2 === number || 3 === number || 4 === number ? "sata" : "sati";

          case "dd":
            return result += 1 === number ? "dan" : "dana";

          case "MM":
            return result += 1 === number ? "mjesec" : 2 === number || 3 === number || 4 === number ? "mjeseca" : "mjeseci";

          case "yy":
            return result += 1 === number ? "godina" : 2 === number || 3 === number || 4 === number ? "godine" : "godina";
        }
    }
    function cs__plural(n) {
        return n > 1 && 5 > n && 1 !== ~~(n / 10);
    }
    function cs__translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
          case "s":
            return withoutSuffix || isFuture ? "pár sekund" : "pár sekundami";

          case "m":
            return withoutSuffix ? "minuta" : isFuture ? "minutu" : "minutou";

          case "mm":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "minuty" : "minut") : result + "minutami";

          case "h":
            return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";

          case "hh":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "hodiny" : "hodin") : result + "hodinami";

          case "d":
            return withoutSuffix || isFuture ? "den" : "dnem";

          case "dd":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "dny" : "dní") : result + "dny";

          case "M":
            return withoutSuffix || isFuture ? "měsíc" : "měsícem";

          case "MM":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "měsíce" : "měsíců") : result + "měsíci";

          case "y":
            return withoutSuffix || isFuture ? "rok" : "rokem";

          case "yy":
            return withoutSuffix || isFuture ? result + (cs__plural(number) ? "roky" : "let") : result + "lety";
        }
    }
    function de_at__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            m: [ "eine Minute", "einer Minute" ],
            h: [ "eine Stunde", "einer Stunde" ],
            d: [ "ein Tag", "einem Tag" ],
            dd: [ number + " Tage", number + " Tagen" ],
            M: [ "ein Monat", "einem Monat" ],
            MM: [ number + " Monate", number + " Monaten" ],
            y: [ "ein Jahr", "einem Jahr" ],
            yy: [ number + " Jahre", number + " Jahren" ]
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function de__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            m: [ "eine Minute", "einer Minute" ],
            h: [ "eine Stunde", "einer Stunde" ],
            d: [ "ein Tag", "einem Tag" ],
            dd: [ number + " Tage", number + " Tagen" ],
            M: [ "ein Monat", "einem Monat" ],
            MM: [ number + " Monate", number + " Monaten" ],
            y: [ "ein Jahr", "einem Jahr" ],
            yy: [ number + " Jahre", number + " Jahren" ]
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function et__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            s: [ "mõne sekundi", "mõni sekund", "paar sekundit" ],
            m: [ "ühe minuti", "üks minut" ],
            mm: [ number + " minuti", number + " minutit" ],
            h: [ "ühe tunni", "tund aega", "üks tund" ],
            hh: [ number + " tunni", number + " tundi" ],
            d: [ "ühe päeva", "üks päev" ],
            M: [ "kuu aja", "kuu aega", "üks kuu" ],
            MM: [ number + " kuu", number + " kuud" ],
            y: [ "ühe aasta", "aasta", "üks aasta" ],
            yy: [ number + " aasta", number + " aastat" ]
        };
        return withoutSuffix ? format[key][2] ? format[key][2] : format[key][1] : isFuture ? format[key][0] : format[key][1];
    }
    function fi__translate(number, withoutSuffix, key, isFuture) {
        var result = "";
        switch (key) {
          case "s":
            return isFuture ? "muutaman sekunnin" : "muutama sekunti";

          case "m":
            return isFuture ? "minuutin" : "minuutti";

          case "mm":
            result = isFuture ? "minuutin" : "minuuttia";
            break;

          case "h":
            return isFuture ? "tunnin" : "tunti";

          case "hh":
            result = isFuture ? "tunnin" : "tuntia";
            break;

          case "d":
            return isFuture ? "päivän" : "päivä";

          case "dd":
            result = isFuture ? "päivän" : "päivää";
            break;

          case "M":
            return isFuture ? "kuukauden" : "kuukausi";

          case "MM":
            result = isFuture ? "kuukauden" : "kuukautta";
            break;

          case "y":
            return isFuture ? "vuoden" : "vuosi";

          case "yy":
            result = isFuture ? "vuoden" : "vuotta";
        }
        return result = verbalNumber(number, isFuture) + " " + result;
    }
    function verbalNumber(number, isFuture) {
        return 10 > number ? isFuture ? numbersFuture[number] : numbersPast[number] : number;
    }
    function hr__translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
          case "m":
            return withoutSuffix ? "jedna minuta" : "jedne minute";

          case "mm":
            return result += 1 === number ? "minuta" : 2 === number || 3 === number || 4 === number ? "minute" : "minuta";

          case "h":
            return withoutSuffix ? "jedan sat" : "jednog sata";

          case "hh":
            return result += 1 === number ? "sat" : 2 === number || 3 === number || 4 === number ? "sata" : "sati";

          case "dd":
            return result += 1 === number ? "dan" : "dana";

          case "MM":
            return result += 1 === number ? "mjesec" : 2 === number || 3 === number || 4 === number ? "mjeseca" : "mjeseci";

          case "yy":
            return result += 1 === number ? "godina" : 2 === number || 3 === number || 4 === number ? "godine" : "godina";
        }
    }
    function hu__translate(number, withoutSuffix, key, isFuture) {
        var num = number;
        switch (key) {
          case "s":
            return isFuture || withoutSuffix ? "néhány másodperc" : "néhány másodperce";

          case "m":
            return "egy" + (isFuture || withoutSuffix ? " perc" : " perce");

          case "mm":
            return num + (isFuture || withoutSuffix ? " perc" : " perce");

          case "h":
            return "egy" + (isFuture || withoutSuffix ? " óra" : " órája");

          case "hh":
            return num + (isFuture || withoutSuffix ? " óra" : " órája");

          case "d":
            return "egy" + (isFuture || withoutSuffix ? " nap" : " napja");

          case "dd":
            return num + (isFuture || withoutSuffix ? " nap" : " napja");

          case "M":
            return "egy" + (isFuture || withoutSuffix ? " hónap" : " hónapja");

          case "MM":
            return num + (isFuture || withoutSuffix ? " hónap" : " hónapja");

          case "y":
            return "egy" + (isFuture || withoutSuffix ? " év" : " éve");

          case "yy":
            return num + (isFuture || withoutSuffix ? " év" : " éve");
        }
        return "";
    }
    function week(isFuture) {
        return (isFuture ? "" : "[múlt] ") + "[" + weekEndings[this.day()] + "] LT[-kor]";
    }
    function hy_am__monthsCaseReplace(m, format) {
        var months = {
            nominative: "հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_"),
            accusative: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function hy_am__monthsShortCaseReplace(m, format) {
        var monthsShort = "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_");
        return monthsShort[m.month()];
    }
    function hy_am__weekdaysCaseReplace(m, format) {
        var weekdays = "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_");
        return weekdays[m.day()];
    }
    function is__plural(n) {
        return n % 100 === 11 ? !0 : n % 10 === 1 ? !1 : !0;
    }
    function is__translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
          case "s":
            return withoutSuffix || isFuture ? "nokkrar sekúndur" : "nokkrum sekúndum";

          case "m":
            return withoutSuffix ? "mínúta" : "mínútu";

          case "mm":
            return is__plural(number) ? result + (withoutSuffix || isFuture ? "mínútur" : "mínútum") : withoutSuffix ? result + "mínúta" : result + "mínútu";

          case "hh":
            return is__plural(number) ? result + (withoutSuffix || isFuture ? "klukkustundir" : "klukkustundum") : result + "klukkustund";

          case "d":
            return withoutSuffix ? "dagur" : isFuture ? "dag" : "degi";

          case "dd":
            return is__plural(number) ? withoutSuffix ? result + "dagar" : result + (isFuture ? "daga" : "dögum") : withoutSuffix ? result + "dagur" : result + (isFuture ? "dag" : "degi");

          case "M":
            return withoutSuffix ? "mánuður" : isFuture ? "mánuð" : "mánuði";

          case "MM":
            return is__plural(number) ? withoutSuffix ? result + "mánuðir" : result + (isFuture ? "mánuði" : "mánuðum") : withoutSuffix ? result + "mánuður" : result + (isFuture ? "mánuð" : "mánuði");

          case "y":
            return withoutSuffix || isFuture ? "ár" : "ári";

          case "yy":
            return is__plural(number) ? result + (withoutSuffix || isFuture ? "ár" : "árum") : result + (withoutSuffix || isFuture ? "ár" : "ári");
        }
    }
    function ka__monthsCaseReplace(m, format) {
        var months = {
            nominative: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
            accusative: "იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")
        }, nounCase = /D[oD] *MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function ka__weekdaysCaseReplace(m, format) {
        var weekdays = {
            nominative: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
            accusative: "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_")
        }, nounCase = /(წინა|შემდეგ)/.test(format) ? "accusative" : "nominative";
        return weekdays[nounCase][m.day()];
    }
    function lb__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            m: [ "eng Minutt", "enger Minutt" ],
            h: [ "eng Stonn", "enger Stonn" ],
            d: [ "een Dag", "engem Dag" ],
            M: [ "ee Mount", "engem Mount" ],
            y: [ "ee Joer", "engem Joer" ]
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(" "));
        return eifelerRegelAppliesToNumber(number) ? "a " + string : "an " + string;
    }
    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(" "));
        return eifelerRegelAppliesToNumber(number) ? "viru " + string : "virun " + string;
    }
    function eifelerRegelAppliesToNumber(number) {
        if (number = parseInt(number, 10), isNaN(number)) return !1;
        if (0 > number) return !0;
        if (10 > number) return number >= 4 && 7 >= number ? !0 : !1;
        if (100 > number) {
            var lastDigit = number % 10, firstDigit = number / 10;
            return eifelerRegelAppliesToNumber(0 === lastDigit ? firstDigit : lastDigit);
        }
        if (1e4 > number) {
            for (;number >= 10; ) number /= 10;
            return eifelerRegelAppliesToNumber(number);
        }
        return number /= 1e3, eifelerRegelAppliesToNumber(number);
    }
    function translateSeconds(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? "kelios sekundės" : isFuture ? "kelių sekundžių" : "kelias sekundes";
    }
    function lt__monthsCaseReplace(m, format) {
        var months = {
            nominative: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
            accusative: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
    }
    function special(number) {
        return number % 10 === 0 || number > 10 && 20 > number;
    }
    function forms(key) {
        return lt__units[key].split("_");
    }
    function lt__translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        return 1 === number ? result + translateSingular(number, withoutSuffix, key[0], isFuture) : withoutSuffix ? result + (special(number) ? forms(key)[1] : forms(key)[0]) : isFuture ? result + forms(key)[1] : result + (special(number) ? forms(key)[1] : forms(key)[2]);
    }
    function relativeWeekDay(moment, format) {
        var nominative = -1 === format.indexOf("dddd HH:mm"), weekDay = weekDays[moment.day()];
        return nominative ? weekDay : weekDay.substring(0, weekDay.length - 2) + "į";
    }
    function lv__format(forms, number, withoutSuffix) {
        return withoutSuffix ? number % 10 === 1 && 11 !== number ? forms[2] : forms[3] : number % 10 === 1 && 11 !== number ? forms[0] : forms[1];
    }
    function lv__relativeTimeWithPlural(number, withoutSuffix, key) {
        return number + " " + lv__format(lv__units[key], number, withoutSuffix);
    }
    function relativeTimeWithSingular(number, withoutSuffix, key) {
        return lv__format(lv__units[key], number, withoutSuffix);
    }
    function relativeSeconds(number, withoutSuffix) {
        return withoutSuffix ? "dažas sekundes" : "dažām sekundēm";
    }
    function pl__plural(n) {
        return 5 > n % 10 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
    }
    function pl__translate(number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
          case "m":
            return withoutSuffix ? "minuta" : "minutę";

          case "mm":
            return result + (pl__plural(number) ? "minuty" : "minut");

          case "h":
            return withoutSuffix ? "godzina" : "godzinę";

          case "hh":
            return result + (pl__plural(number) ? "godziny" : "godzin");

          case "MM":
            return result + (pl__plural(number) ? "miesiące" : "miesięcy");

          case "yy":
            return result + (pl__plural(number) ? "lata" : "lat");
        }
    }
    function ro__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            mm: "minute",
            hh: "ore",
            dd: "zile",
            MM: "luni",
            yy: "ani"
        }, separator = " ";
        return (number % 100 >= 20 || number >= 100 && number % 100 === 0) && (separator = " de "), 
        number + separator + format[key];
    }
    function ru__plural(word, num) {
        var forms = word.split("_");
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && 4 >= num % 10 && (10 > num % 100 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function ru__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            mm: withoutSuffix ? "минута_минуты_минут" : "минуту_минуты_минут",
            hh: "час_часа_часов",
            dd: "день_дня_дней",
            MM: "месяц_месяца_месяцев",
            yy: "год_года_лет"
        };
        return "m" === key ? withoutSuffix ? "минута" : "минуту" : number + " " + ru__plural(format[key], +number);
    }
    function ru__monthsCaseReplace(m, format) {
        var months = {
            nominative: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            accusative: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function ru__monthsShortCaseReplace(m, format) {
        var monthsShort = {
            nominative: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
            accusative: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
        }, nounCase = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(format) ? "accusative" : "nominative";
        return monthsShort[nounCase][m.month()];
    }
    function ru__weekdaysCaseReplace(m, format) {
        var weekdays = {
            nominative: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            accusative: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
        }, nounCase = /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/.test(format) ? "accusative" : "nominative";
        return weekdays[nounCase][m.day()];
    }
    function sk__plural(n) {
        return n > 1 && 5 > n;
    }
    function sk__translate(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
          case "s":
            return withoutSuffix || isFuture ? "pár sekúnd" : "pár sekundami";

          case "m":
            return withoutSuffix ? "minúta" : isFuture ? "minútu" : "minútou";

          case "mm":
            return withoutSuffix || isFuture ? result + (sk__plural(number) ? "minúty" : "minút") : result + "minútami";

          case "h":
            return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";

          case "hh":
            return withoutSuffix || isFuture ? result + (sk__plural(number) ? "hodiny" : "hodín") : result + "hodinami";

          case "d":
            return withoutSuffix || isFuture ? "deň" : "dňom";

          case "dd":
            return withoutSuffix || isFuture ? result + (sk__plural(number) ? "dni" : "dní") : result + "dňami";

          case "M":
            return withoutSuffix || isFuture ? "mesiac" : "mesiacom";

          case "MM":
            return withoutSuffix || isFuture ? result + (sk__plural(number) ? "mesiace" : "mesiacov") : result + "mesiacmi";

          case "y":
            return withoutSuffix || isFuture ? "rok" : "rokom";

          case "yy":
            return withoutSuffix || isFuture ? result + (sk__plural(number) ? "roky" : "rokov") : result + "rokmi";
        }
    }
    function sl__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var result = number + " ";
        switch (key) {
          case "s":
            return withoutSuffix || isFuture ? "nekaj sekund" : "nekaj sekundami";

          case "m":
            return withoutSuffix ? "ena minuta" : "eno minuto";

          case "mm":
            return result += 1 === number ? withoutSuffix ? "minuta" : "minuto" : 2 === number ? withoutSuffix || isFuture ? "minuti" : "minutama" : 5 > number ? withoutSuffix || isFuture ? "minute" : "minutami" : withoutSuffix || isFuture ? "minut" : "minutami";

          case "h":
            return withoutSuffix ? "ena ura" : "eno uro";

          case "hh":
            return result += 1 === number ? withoutSuffix ? "ura" : "uro" : 2 === number ? withoutSuffix || isFuture ? "uri" : "urama" : 5 > number ? withoutSuffix || isFuture ? "ure" : "urami" : withoutSuffix || isFuture ? "ur" : "urami";

          case "d":
            return withoutSuffix || isFuture ? "en dan" : "enim dnem";

          case "dd":
            return result += 1 === number ? withoutSuffix || isFuture ? "dan" : "dnem" : 2 === number ? withoutSuffix || isFuture ? "dni" : "dnevoma" : withoutSuffix || isFuture ? "dni" : "dnevi";

          case "M":
            return withoutSuffix || isFuture ? "en mesec" : "enim mesecem";

          case "MM":
            return result += 1 === number ? withoutSuffix || isFuture ? "mesec" : "mesecem" : 2 === number ? withoutSuffix || isFuture ? "meseca" : "mesecema" : 5 > number ? withoutSuffix || isFuture ? "mesece" : "meseci" : withoutSuffix || isFuture ? "mesecev" : "meseci";

          case "y":
            return withoutSuffix || isFuture ? "eno leto" : "enim letom";

          case "yy":
            return result += 1 === number ? withoutSuffix || isFuture ? "leto" : "letom" : 2 === number ? withoutSuffix || isFuture ? "leti" : "letoma" : 5 > number ? withoutSuffix || isFuture ? "leta" : "leti" : withoutSuffix || isFuture ? "let" : "leti";
        }
    }
    function tzl__processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            s: [ "viensas secunds", "'iensas secunds" ],
            m: [ "'n míut", "'iens míut" ],
            mm: [ number + " míuts", " " + number + " míuts" ],
            h: [ "'n þora", "'iensa þora" ],
            hh: [ number + " þoras", " " + number + " þoras" ],
            d: [ "'n ziua", "'iensa ziua" ],
            dd: [ number + " ziuas", " " + number + " ziuas" ],
            M: [ "'n mes", "'iens mes" ],
            MM: [ number + " mesen", " " + number + " mesen" ],
            y: [ "'n ar", "'iens ar" ],
            yy: [ number + " ars", " " + number + " ars" ]
        };
        return isFuture ? format[key][0] : withoutSuffix ? format[key][0] : format[key][1].trim();
    }
    function uk__plural(word, num) {
        var forms = word.split("_");
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && 4 >= num % 10 && (10 > num % 100 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function uk__relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            mm: "хвилина_хвилини_хвилин",
            hh: "година_години_годин",
            dd: "день_дні_днів",
            MM: "місяць_місяці_місяців",
            yy: "рік_роки_років"
        };
        return "m" === key ? withoutSuffix ? "хвилина" : "хвилину" : "h" === key ? withoutSuffix ? "година" : "годину" : number + " " + uk__plural(format[key], +number);
    }
    function uk__monthsCaseReplace(m, format) {
        var months = {
            nominative: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),
            accusative: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")
        }, nounCase = /D[oD]? *MMMM?/.test(format) ? "accusative" : "nominative";
        return months[nounCase][m.month()];
    }
    function uk__weekdaysCaseReplace(m, format) {
        var weekdays = {
            nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
            accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
            genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
        }, nounCase = /(\[[ВвУу]\]) ?dddd/.test(format) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format) ? "genitive" : "nominative";
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function() {
            return str + "о" + (11 === this.hours() ? "б" : "") + "] LT";
        };
    }
    var hookCallback, globalLocale, momentProperties = utils_hooks__hooks.momentProperties = [], updateInProgress = !1, locales = {}, aliases = {}, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {}, match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, regexes = {}, tokens = {}, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6;
    addFormatToken("M", [ "MM", 2 ], "Mo", function() {
        return this.month() + 1;
    }), addFormatToken("MMM", 0, 0, function(format) {
        return this.localeData().monthsShort(this, format);
    }), addFormatToken("MMMM", 0, 0, function(format) {
        return this.localeData().months(this, format);
    }), addUnitAlias("month", "M"), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), 
    addRegexToken("MMM", matchWord), addRegexToken("MMMM", matchWord), addParseToken([ "M", "MM" ], function(input, array) {
        array[MONTH] = toInt(input) - 1;
    }), addParseToken([ "MMM", "MMMM" ], function(input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        null != month ? array[MONTH] = month : getParsingFlags(config).invalidMonth = input;
    });
    var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), deprecations = {};
    utils_hooks__hooks.suppressDeprecationWarnings = !1;
    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, isoDates = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], isoTimes = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
    utils_hooks__hooks.createFromInputFallback = deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
    }), addFormatToken(0, [ "YY", 2 ], 0, function() {
        return this.year() % 100;
    }), addFormatToken(0, [ "YYYY", 4 ], 0, "year"), addFormatToken(0, [ "YYYYY", 5 ], 0, "year"), 
    addFormatToken(0, [ "YYYYYY", 6, !0 ], 0, "year"), addUnitAlias("year", "y"), addRegexToken("Y", matchSigned), 
    addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), 
    addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), 
    addParseToken([ "YYYYY", "YYYYYY" ], YEAR), addParseToken("YYYY", function(input, array) {
        array[YEAR] = 2 === input.length ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    }), addParseToken("YY", function(input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    }), utils_hooks__hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
    };
    var getSetYear = makeGetSet("FullYear", !1);
    addFormatToken("w", [ "ww", 2 ], "wo", "week"), addFormatToken("W", [ "WW", 2 ], "Wo", "isoWeek"), 
    addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addRegexToken("w", match1to2), 
    addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), 
    addWeekParseToken([ "w", "ww", "W", "WW" ], function(input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });
    var defaultLocaleWeek = {
        dow: 0,
        doy: 6
    };
    addFormatToken("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), 
    addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken([ "DDD", "DDDD" ], function(input, array, config) {
        config._dayOfYear = toInt(input);
    }), utils_hooks__hooks.ISO_8601 = function() {};
    var prototypeMin = deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
        var other = local__createLocal.apply(null, arguments);
        return this > other ? this : other;
    }), prototypeMax = deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
        var other = local__createLocal.apply(null, arguments);
        return other > this ? this : other;
    });
    offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchOffset), addRegexToken("ZZ", matchOffset), 
    addParseToken([ "Z", "ZZ" ], function(input, array, config) {
        config._useUTC = !0, config._tzm = offsetFromString(input);
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    utils_hooks__hooks.updateOffset = function() {};
    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    create__createDuration.fn = Duration.prototype;
    var add_subtract__add = createAdder(1, "add"), add_subtract__subtract = createAdder(-1, "subtract");
    utils_hooks__hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
        return void 0 === key ? this.localeData() : this.locale(key);
    });
    addFormatToken(0, [ "gg", 2 ], 0, function() {
        return this.weekYear() % 100;
    }), addFormatToken(0, [ "GG", 2 ], 0, function() {
        return this.isoWeekYear() % 100;
    }), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), 
    addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), 
    addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addRegexToken("G", matchSigned), 
    addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), 
    addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), 
    addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), 
    addWeekParseToken([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    }), addWeekParseToken([ "gg", "GG" ], function(input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    }), addFormatToken("Q", 0, 0, "quarter"), addUnitAlias("quarter", "Q"), addRegexToken("Q", match1), 
    addParseToken("Q", function(input, array) {
        array[MONTH] = 3 * (toInt(input) - 1);
    }), addFormatToken("D", [ "DD", 2 ], "Do", "date"), addUnitAlias("date", "D"), addRegexToken("D", match1to2), 
    addRegexToken("DD", match1to2, match2), addRegexToken("Do", function(isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    }), addParseToken([ "D", "DD" ], DATE), addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });
    var getSetDayOfMonth = makeGetSet("Date", !0);
    addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function(format) {
        return this.localeData().weekdaysMin(this, format);
    }), addFormatToken("ddd", 0, 0, function(format) {
        return this.localeData().weekdaysShort(this, format);
    }), addFormatToken("dddd", 0, 0, function(format) {
        return this.localeData().weekdays(this, format);
    }), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), 
    addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), 
    addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), 
    addRegexToken("dd", matchWord), addRegexToken("ddd", matchWord), addRegexToken("dddd", matchWord), 
    addWeekParseToken([ "dd", "ddd", "dddd" ], function(input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        null != weekday ? week.d = weekday : getParsingFlags(config).invalidWeekday = input;
    }), addWeekParseToken([ "d", "e", "E" ], function(input, week, config, token) {
        week[token] = toInt(input);
    });
    var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    addFormatToken("H", [ "HH", 2 ], 0, "hour"), addFormatToken("h", [ "hh", 2 ], 0, function() {
        return this.hours() % 12 || 12;
    }), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addRegexToken("a", matchMeridiem), 
    addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), 
    addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), 
    addParseToken([ "H", "HH" ], HOUR), addParseToken([ "a", "A" ], function(input, array, config) {
        config._isPm = config._locale.isPM(input), config._meridiem = input;
    }), addParseToken([ "h", "hh" ], function(input, array, config) {
        array[HOUR] = toInt(input), getParsingFlags(config).bigHour = !0;
    });
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", !0);
    addFormatToken("m", [ "mm", 2 ], 0, "minute"), addUnitAlias("minute", "m"), addRegexToken("m", match1to2), 
    addRegexToken("mm", match1to2, match2), addParseToken([ "m", "mm" ], MINUTE);
    var getSetMinute = makeGetSet("Minutes", !1);
    addFormatToken("s", [ "ss", 2 ], 0, "second"), addUnitAlias("second", "s"), addRegexToken("s", match1to2), 
    addRegexToken("ss", match1to2, match2), addParseToken([ "s", "ss" ], SECOND);
    var getSetSecond = makeGetSet("Seconds", !1);
    addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
    }), addFormatToken(0, [ "SS", 2 ], 0, function() {
        return ~~(this.millisecond() / 10);
    }), addFormatToken(0, [ "SSS", 3 ], 0, "millisecond"), addFormatToken(0, [ "SSSS", 4 ], 0, function() {
        return 10 * this.millisecond();
    }), addFormatToken(0, [ "SSSSS", 5 ], 0, function() {
        return 100 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSS", 6 ], 0, function() {
        return 1e3 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSSS", 7 ], 0, function() {
        return 1e4 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSSSS", 8 ], 0, function() {
        return 1e5 * this.millisecond();
    }), addFormatToken(0, [ "SSSSSSSSS", 9 ], 0, function() {
        return 1e6 * this.millisecond();
    }), addUnitAlias("millisecond", "ms"), addRegexToken("S", match1to3, match1), addRegexToken("SS", match1to3, match2), 
    addRegexToken("SSS", match1to3, match3);
    var token;
    for (token = "SSSS"; token.length <= 9; token += "S") addRegexToken(token, matchUnsigned);
    for (token = "S"; token.length <= 9; token += "S") addParseToken(token, parseMs);
    var getSetMillisecond = makeGetSet("Milliseconds", !1);
    addFormatToken("z", 0, 0, "zoneAbbr"), addFormatToken("zz", 0, 0, "zoneName");
    var momentPrototype__proto = Moment.prototype;
    momentPrototype__proto.add = add_subtract__add, momentPrototype__proto.calendar = moment_calendar__calendar, 
    momentPrototype__proto.clone = clone, momentPrototype__proto.diff = diff, momentPrototype__proto.endOf = endOf, 
    momentPrototype__proto.format = moment_format__format, momentPrototype__proto.from = from, 
    momentPrototype__proto.fromNow = fromNow, momentPrototype__proto.to = to, momentPrototype__proto.toNow = toNow, 
    momentPrototype__proto.get = getSet, momentPrototype__proto.invalidAt = invalidAt, 
    momentPrototype__proto.isAfter = isAfter, momentPrototype__proto.isBefore = isBefore, 
    momentPrototype__proto.isBetween = isBetween, momentPrototype__proto.isSame = isSame, 
    momentPrototype__proto.isValid = moment_valid__isValid, momentPrototype__proto.lang = lang, 
    momentPrototype__proto.locale = locale, momentPrototype__proto.localeData = localeData, 
    momentPrototype__proto.max = prototypeMax, momentPrototype__proto.min = prototypeMin, 
    momentPrototype__proto.parsingFlags = parsingFlags, momentPrototype__proto.set = getSet, 
    momentPrototype__proto.startOf = startOf, momentPrototype__proto.subtract = add_subtract__subtract, 
    momentPrototype__proto.toArray = toArray, momentPrototype__proto.toObject = toObject, 
    momentPrototype__proto.toDate = toDate, momentPrototype__proto.toISOString = moment_format__toISOString, 
    momentPrototype__proto.toJSON = moment_format__toISOString, momentPrototype__proto.toString = toString, 
    momentPrototype__proto.unix = unix, momentPrototype__proto.valueOf = to_type__valueOf, 
    momentPrototype__proto.year = getSetYear, momentPrototype__proto.isLeapYear = getIsLeapYear, 
    momentPrototype__proto.weekYear = getSetWeekYear, momentPrototype__proto.isoWeekYear = getSetISOWeekYear, 
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter, 
    momentPrototype__proto.month = getSetMonth, momentPrototype__proto.daysInMonth = getDaysInMonth, 
    momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek, momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek, 
    momentPrototype__proto.weeksInYear = getWeeksInYear, momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear, 
    momentPrototype__proto.date = getSetDayOfMonth, momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek, 
    momentPrototype__proto.weekday = getSetLocaleDayOfWeek, momentPrototype__proto.isoWeekday = getSetISODayOfWeek, 
    momentPrototype__proto.dayOfYear = getSetDayOfYear, momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour, 
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute, momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond, 
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond, 
    momentPrototype__proto.utcOffset = getSetOffset, momentPrototype__proto.utc = setOffsetToUTC, 
    momentPrototype__proto.local = setOffsetToLocal, momentPrototype__proto.parseZone = setOffsetToParsedOffset, 
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset, momentPrototype__proto.isDST = isDaylightSavingTime, 
    momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted, momentPrototype__proto.isLocal = isLocal, 
    momentPrototype__proto.isUtcOffset = isUtcOffset, momentPrototype__proto.isUtc = isUtc, 
    momentPrototype__proto.isUTC = isUtc, momentPrototype__proto.zoneAbbr = getZoneAbbr, 
    momentPrototype__proto.zoneName = getZoneName, momentPrototype__proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth), 
    momentPrototype__proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth), 
    momentPrototype__proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear), 
    momentPrototype__proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", getSetZone);
    var momentPrototype = momentPrototype__proto, defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, defaultInvalidDate = "Invalid date", defaultOrdinal = "%d", defaultOrdinalParse = /\d{1,2}/, defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, prototype__proto = Locale.prototype;
    prototype__proto._calendar = defaultCalendar, prototype__proto.calendar = locale_calendar__calendar, 
    prototype__proto._longDateFormat = defaultLongDateFormat, prototype__proto.longDateFormat = longDateFormat, 
    prototype__proto._invalidDate = defaultInvalidDate, prototype__proto.invalidDate = invalidDate, 
    prototype__proto._ordinal = defaultOrdinal, prototype__proto.ordinal = ordinal, 
    prototype__proto._ordinalParse = defaultOrdinalParse, prototype__proto.preparse = preParsePostFormat, 
    prototype__proto.postformat = preParsePostFormat, prototype__proto._relativeTime = defaultRelativeTime, 
    prototype__proto.relativeTime = relative__relativeTime, prototype__proto.pastFuture = pastFuture, 
    prototype__proto.set = locale_set__set, prototype__proto.months = localeMonths, 
    prototype__proto._months = defaultLocaleMonths, prototype__proto.monthsShort = localeMonthsShort, 
    prototype__proto._monthsShort = defaultLocaleMonthsShort, prototype__proto.monthsParse = localeMonthsParse, 
    prototype__proto.week = localeWeek, prototype__proto._week = defaultLocaleWeek, 
    prototype__proto.firstDayOfYear = localeFirstDayOfYear, prototype__proto.firstDayOfWeek = localeFirstDayOfWeek, 
    prototype__proto.weekdays = localeWeekdays, prototype__proto._weekdays = defaultLocaleWeekdays, 
    prototype__proto.weekdaysMin = localeWeekdaysMin, prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin, 
    prototype__proto.weekdaysShort = localeWeekdaysShort, prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort, 
    prototype__proto.weekdaysParse = localeWeekdaysParse, prototype__proto.isPM = localeIsPM, 
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse, prototype__proto.meridiem = localeMeridiem, 
    locale_locales__getSetGlobalLocale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === toInt(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        }
    }), utils_hooks__hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", locale_locales__getSetGlobalLocale), 
    utils_hooks__hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", locale_locales__getLocale);
    var mathAbs = Math.abs, asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asYears = makeAs("y"), milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), duration_get__months = makeGetter("months"), years = makeGetter("years"), round = Math.round, thresholds = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, iso_string__abs = Math.abs, duration_prototype__proto = Duration.prototype;
    duration_prototype__proto.abs = duration_abs__abs, duration_prototype__proto.add = duration_add_subtract__add, 
    duration_prototype__proto.subtract = duration_add_subtract__subtract, duration_prototype__proto.as = as, 
    duration_prototype__proto.asMilliseconds = asMilliseconds, duration_prototype__proto.asSeconds = asSeconds, 
    duration_prototype__proto.asMinutes = asMinutes, duration_prototype__proto.asHours = asHours, 
    duration_prototype__proto.asDays = asDays, duration_prototype__proto.asWeeks = asWeeks, 
    duration_prototype__proto.asMonths = asMonths, duration_prototype__proto.asYears = asYears, 
    duration_prototype__proto.valueOf = duration_as__valueOf, duration_prototype__proto._bubble = bubble, 
    duration_prototype__proto.get = duration_get__get, duration_prototype__proto.milliseconds = milliseconds, 
    duration_prototype__proto.seconds = seconds, duration_prototype__proto.minutes = minutes, 
    duration_prototype__proto.hours = hours, duration_prototype__proto.days = days, 
    duration_prototype__proto.weeks = weeks, duration_prototype__proto.months = duration_get__months, 
    duration_prototype__proto.years = years, duration_prototype__proto.humanize = humanize, 
    duration_prototype__proto.toISOString = iso_string__toISOString, duration_prototype__proto.toString = iso_string__toISOString, 
    duration_prototype__proto.toJSON = iso_string__toISOString, duration_prototype__proto.locale = locale, 
    duration_prototype__proto.localeData = localeData, duration_prototype__proto.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", iso_string__toISOString), 
    duration_prototype__proto.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), 
    addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function(input, array, config) {
        config._d = new Date(1e3 * parseFloat(input, 10));
    }), addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
    }), utils_hooks__hooks.version = "2.10.6", setHookCallback(local__createLocal), 
    utils_hooks__hooks.fn = momentPrototype, utils_hooks__hooks.min = min, utils_hooks__hooks.max = max, 
    utils_hooks__hooks.utc = create_utc__createUTC, utils_hooks__hooks.unix = moment_moment__createUnix, 
    utils_hooks__hooks.months = lists__listMonths, utils_hooks__hooks.isDate = isDate, 
    utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale, utils_hooks__hooks.invalid = valid__createInvalid, 
    utils_hooks__hooks.duration = create__createDuration, utils_hooks__hooks.isMoment = isMoment, 
    utils_hooks__hooks.weekdays = lists__listWeekdays, utils_hooks__hooks.parseZone = moment_moment__createInZone, 
    utils_hooks__hooks.localeData = locale_locales__getLocale, utils_hooks__hooks.isDuration = isDuration, 
    utils_hooks__hooks.monthsShort = lists__listMonthsShort, utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin, 
    utils_hooks__hooks.defineLocale = defineLocale, utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort, 
    utils_hooks__hooks.normalizeUnits = normalizeUnits, utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    var _moment__default = utils_hooks__hooks, ar_sa__symbolMap = (_moment__default.defineLocale("af", {
        months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
        weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
        weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
        meridiemParse: /vm|nm/i,
        isPM: function(input) {
            return /^nm$/i.test(input);
        },
        meridiem: function(hours, minutes, isLower) {
            return 12 > hours ? isLower ? "vm" : "VM" : isLower ? "nm" : "NM";
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Vandag om] LT",
            nextDay: "[Môre om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[Gister om] LT",
            lastWeek: "[Laas] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "oor %s",
            past: "%s gelede",
            s: "'n paar sekondes",
            m: "'n minuut",
            mm: "%d minute",
            h: "'n uur",
            hh: "%d ure",
            d: "'n dag",
            dd: "%d dae",
            M: "'n maand",
            MM: "%d maande",
            y: "'n jaar",
            yy: "%d jaar"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(number) {
            return number + (1 === number || 8 === number || number >= 20 ? "ste" : "de");
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("ar-ma", {
        months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        weekdays: "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: "[غدا على الساعة] LT",
            nextWeek: "dddd [على الساعة] LT",
            lastDay: "[أمس على الساعة] LT",
            lastWeek: "dddd [على الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "في %s",
            past: "منذ %s",
            s: "ثوان",
            m: "دقيقة",
            mm: "%d دقائق",
            h: "ساعة",
            hh: "%d ساعات",
            d: "يوم",
            dd: "%d أيام",
            M: "شهر",
            MM: "%d أشهر",
            y: "سنة",
            yy: "%d سنوات"
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), {
        "1": "١",
        "2": "٢",
        "3": "٣",
        "4": "٤",
        "5": "٥",
        "6": "٦",
        "7": "٧",
        "8": "٨",
        "9": "٩",
        "0": "٠"
    }), ar_sa__numberMap = {
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        "٠": "0"
    }, ar__symbolMap = (_moment__default.defineLocale("ar-sa", {
        months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ص|م/,
        isPM: function(input) {
            return "م" === input;
        },
        meridiem: function(hour, minute, isLower) {
            return 12 > hour ? "ص" : "م";
        },
        calendar: {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: "[غدا على الساعة] LT",
            nextWeek: "dddd [على الساعة] LT",
            lastDay: "[أمس على الساعة] LT",
            lastWeek: "dddd [على الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "في %s",
            past: "منذ %s",
            s: "ثوان",
            m: "دقيقة",
            mm: "%d دقائق",
            h: "ساعة",
            hh: "%d ساعات",
            d: "يوم",
            dd: "%d أيام",
            M: "شهر",
            MM: "%d أشهر",
            y: "سنة",
            yy: "%d سنوات"
        },
        preparse: function(string) {
            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(match) {
                return ar_sa__numberMap[match];
            }).replace(/،/g, ",");
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return ar_sa__symbolMap[match];
            }).replace(/,/g, "،");
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), _moment__default.defineLocale("ar-tn", {
        months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: "[غدا على الساعة] LT",
            nextWeek: "dddd [على الساعة] LT",
            lastDay: "[أمس على الساعة] LT",
            lastWeek: "dddd [على الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "في %s",
            past: "منذ %s",
            s: "ثوان",
            m: "دقيقة",
            mm: "%d دقائق",
            h: "ساعة",
            hh: "%d ساعات",
            d: "يوم",
            dd: "%d أيام",
            M: "شهر",
            MM: "%d أشهر",
            y: "سنة",
            yy: "%d سنوات"
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        "1": "١",
        "2": "٢",
        "3": "٣",
        "4": "٤",
        "5": "٥",
        "6": "٦",
        "7": "٧",
        "8": "٨",
        "9": "٩",
        "0": "٠"
    }), ar__numberMap = {
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        "٠": "0"
    }, pluralForm = function(n) {
        return 0 === n ? 0 : 1 === n ? 1 : 2 === n ? 2 : n % 100 >= 3 && 10 >= n % 100 ? 3 : n % 100 >= 11 ? 4 : 5;
    }, plurals = {
        s: [ "أقل من ثانية", "ثانية واحدة", [ "ثانيتان", "ثانيتين" ], "%d ثوان", "%d ثانية", "%d ثانية" ],
        m: [ "أقل من دقيقة", "دقيقة واحدة", [ "دقيقتان", "دقيقتين" ], "%d دقائق", "%d دقيقة", "%d دقيقة" ],
        h: [ "أقل من ساعة", "ساعة واحدة", [ "ساعتان", "ساعتين" ], "%d ساعات", "%d ساعة", "%d ساعة" ],
        d: [ "أقل من يوم", "يوم واحد", [ "يومان", "يومين" ], "%d أيام", "%d يومًا", "%d يوم" ],
        M: [ "أقل من شهر", "شهر واحد", [ "شهران", "شهرين" ], "%d أشهر", "%d شهرا", "%d شهر" ],
        y: [ "أقل من عام", "عام واحد", [ "عامان", "عامين" ], "%d أعوام", "%d عامًا", "%d عام" ]
    }, pluralize = function(u) {
        return function(number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number), str = plurals[u][pluralForm(number)];
            return 2 === f && (str = str[withoutSuffix ? 0 : 1]), str.replace(/%d/i, number);
        };
    }, ar__months = [ "كانون الثاني يناير", "شباط فبراير", "آذار مارس", "نيسان أبريل", "أيار مايو", "حزيران يونيو", "تموز يوليو", "آب أغسطس", "أيلول سبتمبر", "تشرين الأول أكتوبر", "تشرين الثاني نوفمبر", "كانون الأول ديسمبر" ], az__suffixes = (_moment__default.defineLocale("ar", {
        months: ar__months,
        monthsShort: ar__months,
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/‏M/‏YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ص|م/,
        isPM: function(input) {
            return "م" === input;
        },
        meridiem: function(hour, minute, isLower) {
            return 12 > hour ? "ص" : "م";
        },
        calendar: {
            sameDay: "[اليوم عند الساعة] LT",
            nextDay: "[غدًا عند الساعة] LT",
            nextWeek: "dddd [عند الساعة] LT",
            lastDay: "[أمس عند الساعة] LT",
            lastWeek: "dddd [عند الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "بعد %s",
            past: "منذ %s",
            s: pluralize("s"),
            m: pluralize("m"),
            mm: pluralize("m"),
            h: pluralize("h"),
            hh: pluralize("h"),
            d: pluralize("d"),
            dd: pluralize("d"),
            M: pluralize("M"),
            MM: pluralize("M"),
            y: pluralize("y"),
            yy: pluralize("y")
        },
        preparse: function(string) {
            return string.replace(/\u200f/g, "").replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(match) {
                return ar__numberMap[match];
            }).replace(/،/g, ",");
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return ar__symbolMap[match];
            }).replace(/,/g, "،");
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), {
        1: "-inci",
        5: "-inci",
        8: "-inci",
        70: "-inci",
        80: "-inci",
        2: "-nci",
        7: "-nci",
        20: "-nci",
        50: "-nci",
        3: "-üncü",
        4: "-üncü",
        100: "-üncü",
        6: "-ncı",
        9: "-uncu",
        10: "-uncu",
        30: "-uncu",
        60: "-ıncı",
        90: "-ıncı"
    }), bn__symbolMap = (_moment__default.defineLocale("az", {
        months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
        monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
        weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
        weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
        weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[bugün saat] LT",
            nextDay: "[sabah saat] LT",
            nextWeek: "[gələn həftə] dddd [saat] LT",
            lastDay: "[dünən] LT",
            lastWeek: "[keçən həftə] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s əvvəl",
            s: "birneçə saniyyə",
            m: "bir dəqiqə",
            mm: "%d dəqiqə",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gün",
            dd: "%d gün",
            M: "bir ay",
            MM: "%d ay",
            y: "bir il",
            yy: "%d il"
        },
        meridiemParse: /gecə|səhər|gündüz|axşam/,
        isPM: function(input) {
            return /^(gündüz|axşam)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "gecə" : 12 > hour ? "səhər" : 17 > hour ? "gündüz" : "axşam";
        },
        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
        ordinal: function(number) {
            if (0 === number) return number + "-ıncı";
            var a = number % 10, b = number % 100 - a, c = number >= 100 ? 100 : null;
            return number + (az__suffixes[a] || az__suffixes[b] || az__suffixes[c]);
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("be", {
        months: be__monthsCaseReplace,
        monthsShort: "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),
        weekdays: be__weekdaysCaseReplace,
        weekdaysShort: "нд_пн_ат_ср_чц_пт_сб".split("_"),
        weekdaysMin: "нд_пн_ат_ср_чц_пт_сб".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY г.",
            LLL: "D MMMM YYYY г., HH:mm",
            LLLL: "dddd, D MMMM YYYY г., HH:mm"
        },
        calendar: {
            sameDay: "[Сёння ў] LT",
            nextDay: "[Заўтра ў] LT",
            lastDay: "[Учора ў] LT",
            nextWeek: function() {
                return "[У] dddd [ў] LT";
            },
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                    return "[У мінулую] dddd [ў] LT";

                  case 1:
                  case 2:
                  case 4:
                    return "[У мінулы] dddd [ў] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "праз %s",
            past: "%s таму",
            s: "некалькі секунд",
            m: be__relativeTimeWithPlural,
            mm: be__relativeTimeWithPlural,
            h: be__relativeTimeWithPlural,
            hh: be__relativeTimeWithPlural,
            d: "дзень",
            dd: be__relativeTimeWithPlural,
            M: "месяц",
            MM: be__relativeTimeWithPlural,
            y: "год",
            yy: be__relativeTimeWithPlural
        },
        meridiemParse: /ночы|раніцы|дня|вечара/,
        isPM: function(input) {
            return /^(дня|вечара)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "ночы" : 12 > hour ? "раніцы" : 17 > hour ? "дня" : "вечара";
        },
        ordinalParse: /\d{1,2}-(і|ы|га)/,
        ordinal: function(number, period) {
            switch (period) {
              case "M":
              case "d":
              case "DDD":
              case "w":
              case "W":
                return number % 10 !== 2 && number % 10 !== 3 || number % 100 === 12 || number % 100 === 13 ? number + "-ы" : number + "-і";

              case "D":
                return number + "-га";

              default:
                return number;
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("bg", {
        months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
        monthsShort: "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
        weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
        weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Днес в] LT",
            nextDay: "[Утре в] LT",
            nextWeek: "dddd [в] LT",
            lastDay: "[Вчера в] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 6:
                    return "[В изминалата] dddd [в] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[В изминалия] dddd [в] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "след %s",
            past: "преди %s",
            s: "няколко секунди",
            m: "минута",
            mm: "%d минути",
            h: "час",
            hh: "%d часа",
            d: "ден",
            dd: "%d дни",
            M: "месец",
            MM: "%d месеца",
            y: "година",
            yy: "%d години"
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function(number) {
            var lastDigit = number % 10, last2Digits = number % 100;
            return 0 === number ? number + "-ев" : 0 === last2Digits ? number + "-ен" : last2Digits > 10 && 20 > last2Digits ? number + "-ти" : 1 === lastDigit ? number + "-ви" : 2 === lastDigit ? number + "-ри" : 7 === lastDigit || 8 === lastDigit ? number + "-ми" : number + "-ти";
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), {
        "1": "১",
        "2": "২",
        "3": "৩",
        "4": "৪",
        "5": "৫",
        "6": "৬",
        "7": "৭",
        "8": "৮",
        "9": "৯",
        "0": "০"
    }), bn__numberMap = {
        "১": "1",
        "২": "2",
        "৩": "3",
        "৪": "4",
        "৫": "5",
        "৬": "6",
        "৭": "7",
        "৮": "8",
        "৯": "9",
        "০": "0"
    }, bo__symbolMap = (_moment__default.defineLocale("bn", {
        months: "জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),
        monthsShort: "জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্".split("_"),
        weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রুবার_শনিবার".split("_"),
        weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্রু_শনি".split("_"),
        weekdaysMin: "রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি".split("_"),
        longDateFormat: {
            LT: "A h:mm সময়",
            LTS: "A h:mm:ss সময়",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm সময়",
            LLLL: "dddd, D MMMM YYYY, A h:mm সময়"
        },
        calendar: {
            sameDay: "[আজ] LT",
            nextDay: "[আগামীকাল] LT",
            nextWeek: "dddd, LT",
            lastDay: "[গতকাল] LT",
            lastWeek: "[গত] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s পরে",
            past: "%s আগে",
            s: "কএক সেকেন্ড",
            m: "এক মিনিট",
            mm: "%d মিনিট",
            h: "এক ঘন্টা",
            hh: "%d ঘন্টা",
            d: "এক দিন",
            dd: "%d দিন",
            M: "এক মাস",
            MM: "%d মাস",
            y: "এক বছর",
            yy: "%d বছর"
        },
        preparse: function(string) {
            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function(match) {
                return bn__numberMap[match];
            });
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return bn__symbolMap[match];
            });
        },
        meridiemParse: /রাত|সকাল|দুপুর|বিকেল|রাত/,
        isPM: function(input) {
            return /^(দুপুর|বিকেল|রাত)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "রাত" : 10 > hour ? "সকাল" : 17 > hour ? "দুপুর" : 20 > hour ? "বিকেল" : "রাত";
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), {
        "1": "༡",
        "2": "༢",
        "3": "༣",
        "4": "༤",
        "5": "༥",
        "6": "༦",
        "7": "༧",
        "8": "༨",
        "9": "༩",
        "0": "༠"
    }), bo__numberMap = {
        "༡": "1",
        "༢": "2",
        "༣": "3",
        "༤": "4",
        "༥": "5",
        "༦": "6",
        "༧": "7",
        "༨": "8",
        "༩": "9",
        "༠": "0"
    }, cs__months = (_moment__default.defineLocale("bo", {
        months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
        monthsShort: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
        weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),
        weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
        weekdaysMin: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
        longDateFormat: {
            LT: "A h:mm",
            LTS: "A h:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm",
            LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        calendar: {
            sameDay: "[དི་རིང] LT",
            nextDay: "[སང་ཉིན] LT",
            nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT",
            lastDay: "[ཁ་སང] LT",
            lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s ལ་",
            past: "%s སྔན་ལ",
            s: "ལམ་སང",
            m: "སྐར་མ་གཅིག",
            mm: "%d སྐར་མ",
            h: "ཆུ་ཚོད་གཅིག",
            hh: "%d ཆུ་ཚོད",
            d: "ཉིན་གཅིག",
            dd: "%d ཉིན་",
            M: "ཟླ་བ་གཅིག",
            MM: "%d ཟླ་བ",
            y: "ལོ་གཅིག",
            yy: "%d ལོ"
        },
        preparse: function(string) {
            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function(match) {
                return bo__numberMap[match];
            });
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return bo__symbolMap[match];
            });
        },
        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
        isPM: function(input) {
            return /^(ཉིན་གུང|དགོང་དག|མཚན་མོ)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "མཚན་མོ" : 10 > hour ? "ཞོགས་ཀས" : 17 > hour ? "ཉིན་གུང" : 20 > hour ? "དགོང་དག" : "མཚན་མོ";
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), _moment__default.defineLocale("br", {
        months: "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
        monthsShort: "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
        weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
        weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
        longDateFormat: {
            LT: "h[e]mm A",
            LTS: "h[e]mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D [a viz] MMMM YYYY",
            LLL: "D [a viz] MMMM YYYY h[e]mm A",
            LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A"
        },
        calendar: {
            sameDay: "[Hiziv da] LT",
            nextDay: "[Warc'hoazh da] LT",
            nextWeek: "dddd [da] LT",
            lastDay: "[Dec'h da] LT",
            lastWeek: "dddd [paset da] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "a-benn %s",
            past: "%s 'zo",
            s: "un nebeud segondennoù",
            m: "ur vunutenn",
            mm: relativeTimeWithMutation,
            h: "un eur",
            hh: "%d eur",
            d: "un devezh",
            dd: relativeTimeWithMutation,
            M: "ur miz",
            MM: relativeTimeWithMutation,
            y: "ur bloaz",
            yy: specialMutationForYears
        },
        ordinalParse: /\d{1,2}(añ|vet)/,
        ordinal: function(number) {
            var output = 1 === number ? "añ" : "vet";
            return number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("bs", {
        months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";

                  case 3:
                    return "[u] [srijedu] [u] LT";

                  case 6:
                    return "[u] [subotu] [u] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
            },
            lastDay: "[jučer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                    return "[prošlu] dddd [u] LT";

                  case 6:
                    return "[prošle] [subote] [u] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prošli] dddd [u] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "par sekundi",
            m: bs__translate,
            mm: bs__translate,
            h: bs__translate,
            hh: bs__translate,
            d: "dan",
            dd: bs__translate,
            M: "mjesec",
            MM: bs__translate,
            y: "godinu",
            yy: bs__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("ca", {
        months: "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
        monthsShort: "gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),
        weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
        weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
        weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "LT:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT";
            },
            nextDay: function() {
                return "[demà a " + (1 !== this.hours() ? "les" : "la") + "] LT";
            },
            nextWeek: function() {
                return "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT";
            },
            lastDay: function() {
                return "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT";
            },
            lastWeek: function() {
                return "[el] dddd [passat a " + (1 !== this.hours() ? "les" : "la") + "] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "fa %s",
            s: "uns segons",
            m: "un minut",
            mm: "%d minuts",
            h: "una hora",
            hh: "%d hores",
            d: "un dia",
            dd: "%d dies",
            M: "un mes",
            MM: "%d mesos",
            y: "un any",
            yy: "%d anys"
        },
        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
        ordinal: function(number, period) {
            var output = 1 === number ? "r" : 2 === number ? "n" : 3 === number ? "r" : 4 === number ? "t" : "è";
            return ("w" === period || "W" === period) && (output = "a"), number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_")), cs__monthsShort = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"), monthsShortDot = (_moment__default.defineLocale("cs", {
        months: cs__months,
        monthsShort: cs__monthsShort,
        monthsParse: function(months, monthsShort) {
            var i, _monthsParse = [];
            for (i = 0; 12 > i; i++) _monthsParse[i] = new RegExp("^" + months[i] + "$|^" + monthsShort[i] + "$", "i");
            return _monthsParse;
        }(cs__months, cs__monthsShort),
        weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
        weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
        weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[dnes v] LT",
            nextDay: "[zítra v] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[v neděli v] LT";

                  case 1:
                  case 2:
                    return "[v] dddd [v] LT";

                  case 3:
                    return "[ve středu v] LT";

                  case 4:
                    return "[ve čtvrtek v] LT";

                  case 5:
                    return "[v pátek v] LT";

                  case 6:
                    return "[v sobotu v] LT";
                }
            },
            lastDay: "[včera v] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[minulou neděli v] LT";

                  case 1:
                  case 2:
                    return "[minulé] dddd [v] LT";

                  case 3:
                    return "[minulou středu v] LT";

                  case 4:
                  case 5:
                    return "[minulý] dddd [v] LT";

                  case 6:
                    return "[minulou sobotu v] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "před %s",
            s: cs__translate,
            m: cs__translate,
            mm: cs__translate,
            h: cs__translate,
            hh: cs__translate,
            d: cs__translate,
            dd: cs__translate,
            M: cs__translate,
            MM: cs__translate,
            y: cs__translate,
            yy: cs__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("cv", {
        months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),
        monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
        weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),
        weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
        weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
            LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
            LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"
        },
        calendar: {
            sameDay: "[Паян] LT [сехетре]",
            nextDay: "[Ыран] LT [сехетре]",
            lastDay: "[Ӗнер] LT [сехетре]",
            nextWeek: "[Ҫитес] dddd LT [сехетре]",
            lastWeek: "[Иртнӗ] dddd LT [сехетре]",
            sameElse: "L"
        },
        relativeTime: {
            future: function(output) {
                var affix = /сехет$/i.exec(output) ? "рен" : /ҫул$/i.exec(output) ? "тан" : "ран";
                return output + affix;
            },
            past: "%s каялла",
            s: "пӗр-ик ҫеккунт",
            m: "пӗр минут",
            mm: "%d минут",
            h: "пӗр сехет",
            hh: "%d сехет",
            d: "пӗр кун",
            dd: "%d кун",
            M: "пӗр уйӑх",
            MM: "%d уйӑх",
            y: "пӗр ҫул",
            yy: "%d ҫул"
        },
        ordinalParse: /\d{1,2}-мӗш/,
        ordinal: "%d-мӗш",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("cy", {
        months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
        weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Heddiw am] LT",
            nextDay: "[Yfory am] LT",
            nextWeek: "dddd [am] LT",
            lastDay: "[Ddoe am] LT",
            lastWeek: "dddd [diwethaf am] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "mewn %s",
            past: "%s yn ôl",
            s: "ychydig eiliadau",
            m: "munud",
            mm: "%d munud",
            h: "awr",
            hh: "%d awr",
            d: "diwrnod",
            dd: "%d diwrnod",
            M: "mis",
            MM: "%d mis",
            y: "blwyddyn",
            yy: "%d flynedd"
        },
        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        ordinal: function(number) {
            var b = number, output = "", lookup = [ "", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed" ];
            return b > 20 ? output = 40 === b || 50 === b || 60 === b || 80 === b || 100 === b ? "fed" : "ain" : b > 0 && (output = lookup[b]), 
            number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("da", {
        months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
        weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd [d.] D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[I dag kl.] LT",
            nextDay: "[I morgen kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[I går kl.] LT",
            lastWeek: "[sidste] dddd [kl] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s siden",
            s: "få sekunder",
            m: "et minut",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dage",
            M: "en måned",
            MM: "%d måneder",
            y: "et år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("de-at", {
        months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[Morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[Gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            m: de_at__processRelativeTime,
            mm: "%d Minuten",
            h: de_at__processRelativeTime,
            hh: "%d Stunden",
            d: de_at__processRelativeTime,
            dd: de_at__processRelativeTime,
            M: de_at__processRelativeTime,
            MM: de_at__processRelativeTime,
            y: de_at__processRelativeTime,
            yy: de_at__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("de", {
        months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[Morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[Gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            m: de__processRelativeTime,
            mm: "%d Minuten",
            h: de__processRelativeTime,
            hh: "%d Stunden",
            d: de__processRelativeTime,
            dd: de__processRelativeTime,
            M: de__processRelativeTime,
            MM: de__processRelativeTime,
            y: de__processRelativeTime,
            yy: de__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("el", {
        monthsNominativeEl: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
        monthsGenitiveEl: "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
        months: function(momentToFormat, format) {
            return /D/.test(format.substring(0, format.indexOf("MMMM"))) ? this._monthsGenitiveEl[momentToFormat.month()] : this._monthsNominativeEl[momentToFormat.month()];
        },
        monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
        weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
        weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
        weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
        meridiem: function(hours, minutes, isLower) {
            return hours > 11 ? isLower ? "μμ" : "ΜΜ" : isLower ? "πμ" : "ΠΜ";
        },
        isPM: function(input) {
            return "μ" === (input + "").toLowerCase()[0];
        },
        meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendarEl: {
            sameDay: "[Σήμερα {}] LT",
            nextDay: "[Αύριο {}] LT",
            nextWeek: "dddd [{}] LT",
            lastDay: "[Χθες {}] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 6:
                    return "[το προηγούμενο] dddd [{}] LT";

                  default:
                    return "[την προηγούμενη] dddd [{}] LT";
                }
            },
            sameElse: "L"
        },
        calendar: function(key, mom) {
            var output = this._calendarEl[key], hours = mom && mom.hours();
            return "function" == typeof output && (output = output.apply(mom)), output.replace("{}", hours % 12 === 1 ? "στη" : "στις");
        },
        relativeTime: {
            future: "σε %s",
            past: "%s πριν",
            s: "λίγα δευτερόλεπτα",
            m: "ένα λεπτό",
            mm: "%d λεπτά",
            h: "μία ώρα",
            hh: "%d ώρες",
            d: "μία μέρα",
            dd: "%d μέρες",
            M: "ένας μήνας",
            MM: "%d μήνες",
            y: "ένας χρόνος",
            yy: "%d χρόνια"
        },
        ordinalParse: /\d{1,2}η/,
        ordinal: "%dη",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("en-au", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("en-ca", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "YYYY-MM-DD",
            LL: "D MMMM, YYYY",
            LLL: "D MMMM, YYYY h:mm A",
            LLLL: "dddd, D MMMM, YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        }
    }), _moment__default.defineLocale("en-gb", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("eo", {
        months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
        weekdays: "Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
        weekdaysShort: "Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D[-an de] MMMM, YYYY",
            LLL: "D[-an de] MMMM, YYYY HH:mm",
            LLLL: "dddd, [la] D[-an de] MMMM, YYYY HH:mm"
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function(input) {
            return "p" === input.charAt(0).toLowerCase();
        },
        meridiem: function(hours, minutes, isLower) {
            return hours > 11 ? isLower ? "p.t.m." : "P.T.M." : isLower ? "a.t.m." : "A.T.M.";
        },
        calendar: {
            sameDay: "[Hodiaŭ je] LT",
            nextDay: "[Morgaŭ je] LT",
            nextWeek: "dddd [je] LT",
            lastDay: "[Hieraŭ je] LT",
            lastWeek: "[pasinta] dddd [je] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "je %s",
            past: "antaŭ %s",
            s: "sekundoj",
            m: "minuto",
            mm: "%d minutoj",
            h: "horo",
            hh: "%d horoj",
            d: "tago",
            dd: "%d tagoj",
            M: "monato",
            MM: "%d monatoj",
            y: "jaro",
            yy: "%d jaroj"
        },
        ordinalParse: /\d{1,2}a/,
        ordinal: "%da",
        week: {
            dow: 1,
            doy: 7
        }
    }), "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_")), es__monthsShort = "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"), fa__symbolMap = (_moment__default.defineLocale("es", {
        months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
        monthsShort: function(m, format) {
            return /-MMM-/.test(format) ? es__monthsShort[m.month()] : monthsShortDot[m.month()];
        },
        weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
        weekdaysShort: "Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            nextDay: function() {
                return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("et", {
        months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
        monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
        weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
        weekdaysShort: "P_E_T_K_N_R_L".split("_"),
        weekdaysMin: "P_E_T_K_N_R_L".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Täna,] LT",
            nextDay: "[Homme,] LT",
            nextWeek: "[Järgmine] dddd LT",
            lastDay: "[Eile,] LT",
            lastWeek: "[Eelmine] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s pärast",
            past: "%s tagasi",
            s: et__processRelativeTime,
            m: et__processRelativeTime,
            mm: et__processRelativeTime,
            h: et__processRelativeTime,
            hh: et__processRelativeTime,
            d: et__processRelativeTime,
            dd: "%d päeva",
            M: et__processRelativeTime,
            MM: et__processRelativeTime,
            y: et__processRelativeTime,
            yy: et__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("eu", {
        months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
        monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
        weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
        weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
        weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY[ko] MMMM[ren] D[a]",
            LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
            LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
            l: "YYYY-M-D",
            ll: "YYYY[ko] MMM D[a]",
            lll: "YYYY[ko] MMM D[a] HH:mm",
            llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
        },
        calendar: {
            sameDay: "[gaur] LT[etan]",
            nextDay: "[bihar] LT[etan]",
            nextWeek: "dddd LT[etan]",
            lastDay: "[atzo] LT[etan]",
            lastWeek: "[aurreko] dddd LT[etan]",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s barru",
            past: "duela %s",
            s: "segundo batzuk",
            m: "minutu bat",
            mm: "%d minutu",
            h: "ordu bat",
            hh: "%d ordu",
            d: "egun bat",
            dd: "%d egun",
            M: "hilabete bat",
            MM: "%d hilabete",
            y: "urte bat",
            yy: "%d urte"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), {
        "1": "۱",
        "2": "۲",
        "3": "۳",
        "4": "۴",
        "5": "۵",
        "6": "۶",
        "7": "۷",
        "8": "۸",
        "9": "۹",
        "0": "۰"
    }), fa__numberMap = {
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        "۰": "0"
    }, numbersPast = (_moment__default.defineLocale("fa", {
        months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
        monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
        weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
        weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
        weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        meridiemParse: /قبل از ظهر|بعد از ظهر/,
        isPM: function(input) {
            return /بعد از ظهر/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 12 > hour ? "قبل از ظهر" : "بعد از ظهر";
        },
        calendar: {
            sameDay: "[امروز ساعت] LT",
            nextDay: "[فردا ساعت] LT",
            nextWeek: "dddd [ساعت] LT",
            lastDay: "[دیروز ساعت] LT",
            lastWeek: "dddd [پیش] [ساعت] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "در %s",
            past: "%s پیش",
            s: "چندین ثانیه",
            m: "یک دقیقه",
            mm: "%d دقیقه",
            h: "یک ساعت",
            hh: "%d ساعت",
            d: "یک روز",
            dd: "%d روز",
            M: "یک ماه",
            MM: "%d ماه",
            y: "یک سال",
            yy: "%d سال"
        },
        preparse: function(string) {
            return string.replace(/[۰-۹]/g, function(match) {
                return fa__numberMap[match];
            }).replace(/،/g, ",");
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return fa__symbolMap[match];
            }).replace(/,/g, "،");
        },
        ordinalParse: /\d{1,2}م/,
        ordinal: "%dم",
        week: {
            dow: 6,
            doy: 12
        }
    }), "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" ")), numbersFuture = [ "nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", numbersPast[7], numbersPast[8], numbersPast[9] ], fy__monthsShortWithDots = (_moment__default.defineLocale("fi", {
        months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
        monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
        weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
        weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
        weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD.MM.YYYY",
            LL: "Do MMMM[ta] YYYY",
            LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
            LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
            l: "D.M.YYYY",
            ll: "Do MMM YYYY",
            lll: "Do MMM YYYY, [klo] HH.mm",
            llll: "ddd, Do MMM YYYY, [klo] HH.mm"
        },
        calendar: {
            sameDay: "[tänään] [klo] LT",
            nextDay: "[huomenna] [klo] LT",
            nextWeek: "dddd [klo] LT",
            lastDay: "[eilen] [klo] LT",
            lastWeek: "[viime] dddd[na] [klo] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s päästä",
            past: "%s sitten",
            s: fi__translate,
            m: fi__translate,
            mm: fi__translate,
            h: fi__translate,
            hh: fi__translate,
            d: fi__translate,
            dd: fi__translate,
            M: fi__translate,
            MM: fi__translate,
            y: fi__translate,
            yy: fi__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("fo", {
        months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
        weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
        weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D. MMMM, YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Í dag kl.] LT",
            nextDay: "[Í morgin kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[Í gjár kl.] LT",
            lastWeek: "[síðstu] dddd [kl] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "um %s",
            past: "%s síðani",
            s: "fá sekund",
            m: "ein minutt",
            mm: "%d minuttir",
            h: "ein tími",
            hh: "%d tímar",
            d: "ein dagur",
            dd: "%d dagar",
            M: "ein mánaði",
            MM: "%d mánaðir",
            y: "eitt ár",
            yy: "%d ár"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("fr-ca", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|e)/,
        ordinal: function(number) {
            return number + (1 === number ? "er" : "e");
        }
    }), _moment__default.defineLocale("fr", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal: function(number) {
            return number + (1 === number ? "er" : "");
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_")), fy__monthsShortWithoutDots = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), hi__symbolMap = (_moment__default.defineLocale("fy", {
        months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
        monthsShort: function(m, format) {
            return /-MMM-/.test(format) ? fy__monthsShortWithoutDots[m.month()] : fy__monthsShortWithDots[m.month()];
        },
        weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
        weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
        weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[hjoed om] LT",
            nextDay: "[moarn om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[juster om] LT",
            lastWeek: "[ôfrûne] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "oer %s",
            past: "%s lyn",
            s: "in pear sekonden",
            m: "ien minút",
            mm: "%d minuten",
            h: "ien oere",
            hh: "%d oeren",
            d: "ien dei",
            dd: "%d dagen",
            M: "ien moanne",
            MM: "%d moannen",
            y: "ien jier",
            yy: "%d jierren"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(number) {
            return number + (1 === number || 8 === number || number >= 20 ? "ste" : "de");
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("gl", {
        months: "Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),
        monthsShort: "Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
        weekdays: "Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),
        weekdaysShort: "Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoxe " + (1 !== this.hours() ? "ás" : "á") + "] LT";
            },
            nextDay: function() {
                return "[mañá " + (1 !== this.hours() ? "ás" : "á") + "] LT";
            },
            nextWeek: function() {
                return "dddd [" + (1 !== this.hours() ? "ás" : "a") + "] LT";
            },
            lastDay: function() {
                return "[onte " + (1 !== this.hours() ? "á" : "a") + "] LT";
            },
            lastWeek: function() {
                return "[o] dddd [pasado " + (1 !== this.hours() ? "ás" : "a") + "] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: function(str) {
                return "uns segundos" === str ? "nuns segundos" : "en " + str;
            },
            past: "hai %s",
            s: "uns segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "unha hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("he", {
        months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
        monthsShort: "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
        weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
        weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
        weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [ב]MMMM YYYY",
            LLL: "D [ב]MMMM YYYY HH:mm",
            LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
            l: "D/M/YYYY",
            ll: "D MMM YYYY",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd, D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[היום ב־]LT",
            nextDay: "[מחר ב־]LT",
            nextWeek: "dddd [בשעה] LT",
            lastDay: "[אתמול ב־]LT",
            lastWeek: "[ביום] dddd [האחרון בשעה] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "בעוד %s",
            past: "לפני %s",
            s: "מספר שניות",
            m: "דקה",
            mm: "%d דקות",
            h: "שעה",
            hh: function(number) {
                return 2 === number ? "שעתיים" : number + " שעות";
            },
            d: "יום",
            dd: function(number) {
                return 2 === number ? "יומיים" : number + " ימים";
            },
            M: "חודש",
            MM: function(number) {
                return 2 === number ? "חודשיים" : number + " חודשים";
            },
            y: "שנה",
            yy: function(number) {
                return 2 === number ? "שנתיים" : number % 10 === 0 && 10 !== number ? number + " שנה" : number + " שנים";
            }
        }
    }), {
        "1": "१",
        "2": "२",
        "3": "३",
        "4": "४",
        "5": "५",
        "6": "६",
        "7": "७",
        "8": "८",
        "9": "९",
        "0": "०"
    }), hi__numberMap = {
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9",
        "०": "0"
    }, weekEndings = (_moment__default.defineLocale("hi", {
        months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
        monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
        weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
        weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
        weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
        longDateFormat: {
            LT: "A h:mm बजे",
            LTS: "A h:mm:ss बजे",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm बजे",
            LLLL: "dddd, D MMMM YYYY, A h:mm बजे"
        },
        calendar: {
            sameDay: "[आज] LT",
            nextDay: "[कल] LT",
            nextWeek: "dddd, LT",
            lastDay: "[कल] LT",
            lastWeek: "[पिछले] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s में",
            past: "%s पहले",
            s: "कुछ ही क्षण",
            m: "एक मिनट",
            mm: "%d मिनट",
            h: "एक घंटा",
            hh: "%d घंटे",
            d: "एक दिन",
            dd: "%d दिन",
            M: "एक महीने",
            MM: "%d महीने",
            y: "एक वर्ष",
            yy: "%d वर्ष"
        },
        preparse: function(string) {
            return string.replace(/[१२३४५६७८९०]/g, function(match) {
                return hi__numberMap[match];
            });
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return hi__symbolMap[match];
            });
        },
        meridiemParse: /रात|सुबह|दोपहर|शाम/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "रात" === meridiem ? 4 > hour ? hour : hour + 12 : "सुबह" === meridiem ? hour : "दोपहर" === meridiem ? hour >= 10 ? hour : hour + 12 : "शाम" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "रात" : 10 > hour ? "सुबह" : 17 > hour ? "दोपहर" : 20 > hour ? "शाम" : "रात";
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), _moment__default.defineLocale("hr", {
        months: "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),
        monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";

                  case 3:
                    return "[u] [srijedu] [u] LT";

                  case 6:
                    return "[u] [subotu] [u] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
            },
            lastDay: "[jučer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                    return "[prošlu] dddd [u] LT";

                  case 6:
                    return "[prošle] [subote] [u] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prošli] dddd [u] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "par sekundi",
            m: hr__translate,
            mm: hr__translate,
            h: hr__translate,
            hh: hr__translate,
            d: "dan",
            dd: hr__translate,
            M: "mjesec",
            MM: hr__translate,
            y: "godinu",
            yy: hr__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ")), lt__units = (_moment__default.defineLocale("hu", {
        months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
        monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
        weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
        weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
        weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "YYYY.MM.DD.",
            LL: "YYYY. MMMM D.",
            LLL: "YYYY. MMMM D. H:mm",
            LLLL: "YYYY. MMMM D., dddd H:mm"
        },
        meridiemParse: /de|du/i,
        isPM: function(input) {
            return "u" === input.charAt(1).toLowerCase();
        },
        meridiem: function(hours, minutes, isLower) {
            return 12 > hours ? isLower === !0 ? "de" : "DE" : isLower === !0 ? "du" : "DU";
        },
        calendar: {
            sameDay: "[ma] LT[-kor]",
            nextDay: "[holnap] LT[-kor]",
            nextWeek: function() {
                return week.call(this, !0);
            },
            lastDay: "[tegnap] LT[-kor]",
            lastWeek: function() {
                return week.call(this, !1);
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "%s múlva",
            past: "%s",
            s: hu__translate,
            m: hu__translate,
            mm: hu__translate,
            h: hu__translate,
            hh: hu__translate,
            d: hu__translate,
            dd: hu__translate,
            M: hu__translate,
            MM: hu__translate,
            y: hu__translate,
            yy: hu__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("hy-am", {
        months: hy_am__monthsCaseReplace,
        monthsShort: hy_am__monthsShortCaseReplace,
        weekdays: hy_am__weekdaysCaseReplace,
        weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY թ.",
            LLL: "D MMMM YYYY թ., HH:mm",
            LLLL: "dddd, D MMMM YYYY թ., HH:mm"
        },
        calendar: {
            sameDay: "[այսօր] LT",
            nextDay: "[վաղը] LT",
            lastDay: "[երեկ] LT",
            nextWeek: function() {
                return "dddd [օրը ժամը] LT";
            },
            lastWeek: function() {
                return "[անցած] dddd [օրը ժամը] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "%s հետո",
            past: "%s առաջ",
            s: "մի քանի վայրկյան",
            m: "րոպե",
            mm: "%d րոպե",
            h: "ժամ",
            hh: "%d ժամ",
            d: "օր",
            dd: "%d օր",
            M: "ամիս",
            MM: "%d ամիս",
            y: "տարի",
            yy: "%d տարի"
        },
        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
        isPM: function(input) {
            return /^(ցերեկվա|երեկոյան)$/.test(input);
        },
        meridiem: function(hour) {
            return 4 > hour ? "գիշերվա" : 12 > hour ? "առավոտվա" : 17 > hour ? "ցերեկվա" : "երեկոյան";
        },
        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
        ordinal: function(number, period) {
            switch (period) {
              case "DDD":
              case "w":
              case "W":
              case "DDDo":
                return 1 === number ? number + "-ին" : number + "-րդ";

              default:
                return number;
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("id", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "pagi" === meridiem ? hour : "siang" === meridiem ? hour >= 11 ? hour : hour + 12 : "sore" === meridiem || "malam" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hours, minutes, isLower) {
            return 11 > hours ? "pagi" : 15 > hours ? "siang" : 19 > hours ? "sore" : "malam";
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Besok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kemarin pukul] LT",
            lastWeek: "dddd [lalu pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lalu",
            s: "beberapa detik",
            m: "semenit",
            mm: "%d menit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("is", {
        months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
        weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
        weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"),
        weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] H:mm",
            LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
        },
        calendar: {
            sameDay: "[í dag kl.] LT",
            nextDay: "[á morgun kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[í gær kl.] LT",
            lastWeek: "[síðasta] dddd [kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "eftir %s",
            past: "fyrir %s síðan",
            s: is__translate,
            m: is__translate,
            mm: is__translate,
            h: "klukkustund",
            hh: is__translate,
            d: is__translate,
            dd: is__translate,
            M: is__translate,
            MM: is__translate,
            y: is__translate,
            yy: is__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("it", {
        months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        weekdays: "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
        weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
        weekdaysMin: "D_L_Ma_Me_G_V_S".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Oggi alle] LT",
            nextDay: "[Domani alle] LT",
            nextWeek: "dddd [alle] LT",
            lastDay: "[Ieri alle] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[la scorsa] dddd [alle] LT";

                  default:
                    return "[lo scorso] dddd [alle] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: function(s) {
                return (/^[0-9].+$/.test(s) ? "tra" : "in") + " " + s;
            },
            past: "%s fa",
            s: "alcuni secondi",
            m: "un minuto",
            mm: "%d minuti",
            h: "un'ora",
            hh: "%d ore",
            d: "un giorno",
            dd: "%d giorni",
            M: "un mese",
            MM: "%d mesi",
            y: "un anno",
            yy: "%d anni"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("ja", {
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
        weekdaysShort: "日_月_火_水_木_金_土".split("_"),
        weekdaysMin: "日_月_火_水_木_金_土".split("_"),
        longDateFormat: {
            LT: "Ah時m分",
            LTS: "Ah時m分s秒",
            L: "YYYY/MM/DD",
            LL: "YYYY年M月D日",
            LLL: "YYYY年M月D日Ah時m分",
            LLLL: "YYYY年M月D日Ah時m分 dddd"
        },
        meridiemParse: /午前|午後/i,
        isPM: function(input) {
            return "午後" === input;
        },
        meridiem: function(hour, minute, isLower) {
            return 12 > hour ? "午前" : "午後";
        },
        calendar: {
            sameDay: "[今日] LT",
            nextDay: "[明日] LT",
            nextWeek: "[来週]dddd LT",
            lastDay: "[昨日] LT",
            lastWeek: "[前週]dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s後",
            past: "%s前",
            s: "数秒",
            m: "1分",
            mm: "%d分",
            h: "1時間",
            hh: "%d時間",
            d: "1日",
            dd: "%d日",
            M: "1ヶ月",
            MM: "%dヶ月",
            y: "1年",
            yy: "%d年"
        }
    }), _moment__default.defineLocale("jv", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
        weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "enjing" === meridiem ? hour : "siyang" === meridiem ? hour >= 11 ? hour : hour + 12 : "sonten" === meridiem || "ndalu" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hours, minutes, isLower) {
            return 11 > hours ? "enjing" : 15 > hours ? "siyang" : 19 > hours ? "sonten" : "ndalu";
        },
        calendar: {
            sameDay: "[Dinten puniko pukul] LT",
            nextDay: "[Mbenjang pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kala wingi pukul] LT",
            lastWeek: "dddd [kepengker pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "wonten ing %s",
            past: "%s ingkang kepengker",
            s: "sawetawis detik",
            m: "setunggal menit",
            mm: "%d menit",
            h: "setunggal jam",
            hh: "%d jam",
            d: "sedinten",
            dd: "%d dinten",
            M: "sewulan",
            MM: "%d wulan",
            y: "setaun",
            yy: "%d taun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("ka", {
        months: ka__monthsCaseReplace,
        monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
        weekdays: ka__weekdaysCaseReplace,
        weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
        weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[დღეს] LT[-ზე]",
            nextDay: "[ხვალ] LT[-ზე]",
            lastDay: "[გუშინ] LT[-ზე]",
            nextWeek: "[შემდეგ] dddd LT[-ზე]",
            lastWeek: "[წინა] dddd LT-ზე",
            sameElse: "L"
        },
        relativeTime: {
            future: function(s) {
                return /(წამი|წუთი|საათი|წელი)/.test(s) ? s.replace(/ი$/, "ში") : s + "ში";
            },
            past: function(s) {
                return /(წამი|წუთი|საათი|დღე|თვე)/.test(s) ? s.replace(/(ი|ე)$/, "ის წინ") : /წელი/.test(s) ? s.replace(/წელი$/, "წლის წინ") : void 0;
            },
            s: "რამდენიმე წამი",
            m: "წუთი",
            mm: "%d წუთი",
            h: "საათი",
            hh: "%d საათი",
            d: "დღე",
            dd: "%d დღე",
            M: "თვე",
            MM: "%d თვე",
            y: "წელი",
            yy: "%d წელი"
        },
        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
        ordinal: function(number) {
            return 0 === number ? number : 1 === number ? number + "-ლი" : 20 > number || 100 >= number && number % 20 === 0 || number % 100 === 0 ? "მე-" + number : number + "-ე";
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("km", {
        months: "មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
        monthsShort: "មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
        weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        weekdaysShort: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        weekdaysMin: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[ថ្ងៃនៈ ម៉ោង] LT",
            nextDay: "[ស្អែក ម៉ោង] LT",
            nextWeek: "dddd [ម៉ោង] LT",
            lastDay: "[ម្សិលមិញ ម៉ោង] LT",
            lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sទៀត",
            past: "%sមុន",
            s: "ប៉ុន្មានវិនាទី",
            m: "មួយនាទី",
            mm: "%d នាទី",
            h: "មួយម៉ោង",
            hh: "%d ម៉ោង",
            d: "មួយថ្ងៃ",
            dd: "%d ថ្ងៃ",
            M: "មួយខែ",
            MM: "%d ខែ",
            y: "មួយឆ្នាំ",
            yy: "%d ឆ្នាំ"
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("ko", {
        months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
        weekdaysShort: "일_월_화_수_목_금_토".split("_"),
        weekdaysMin: "일_월_화_수_목_금_토".split("_"),
        longDateFormat: {
            LT: "A h시 m분",
            LTS: "A h시 m분 s초",
            L: "YYYY.MM.DD",
            LL: "YYYY년 MMMM D일",
            LLL: "YYYY년 MMMM D일 A h시 m분",
            LLLL: "YYYY년 MMMM D일 dddd A h시 m분"
        },
        calendar: {
            sameDay: "오늘 LT",
            nextDay: "내일 LT",
            nextWeek: "dddd LT",
            lastDay: "어제 LT",
            lastWeek: "지난주 dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s 후",
            past: "%s 전",
            s: "몇초",
            ss: "%d초",
            m: "일분",
            mm: "%d분",
            h: "한시간",
            hh: "%d시간",
            d: "하루",
            dd: "%d일",
            M: "한달",
            MM: "%d달",
            y: "일년",
            yy: "%d년"
        },
        ordinalParse: /\d{1,2}일/,
        ordinal: "%d일",
        meridiemParse: /오전|오후/,
        isPM: function(token) {
            return "오후" === token;
        },
        meridiem: function(hour, minute, isUpper) {
            return 12 > hour ? "오전" : "오후";
        }
    }), _moment__default.defineLocale("lb", {
        months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
        weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "H:mm [Auer]",
            LTS: "H:mm:ss [Auer]",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm [Auer]",
            LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
        },
        calendar: {
            sameDay: "[Haut um] LT",
            sameElse: "L",
            nextDay: "[Muer um] LT",
            nextWeek: "dddd [um] LT",
            lastDay: "[Gëschter um] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 2:
                  case 4:
                    return "[Leschten] dddd [um] LT";

                  default:
                    return "[Leschte] dddd [um] LT";
                }
            }
        },
        relativeTime: {
            future: processFutureTime,
            past: processPastTime,
            s: "e puer Sekonnen",
            m: lb__processRelativeTime,
            mm: "%d Minutten",
            h: lb__processRelativeTime,
            hh: "%d Stonnen",
            d: lb__processRelativeTime,
            dd: "%d Deeg",
            M: lb__processRelativeTime,
            MM: "%d Méint",
            y: lb__processRelativeTime,
            yy: "%d Joer"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        m: "minutė_minutės_minutę",
        mm: "minutės_minučių_minutes",
        h: "valanda_valandos_valandą",
        hh: "valandos_valandų_valandas",
        d: "diena_dienos_dieną",
        dd: "dienos_dienų_dienas",
        M: "mėnuo_mėnesio_mėnesį",
        MM: "mėnesiai_mėnesių_mėnesius",
        y: "metai_metų_metus",
        yy: "metai_metų_metus"
    }), weekDays = "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"), lv__units = (_moment__default.defineLocale("lt", {
        months: lt__monthsCaseReplace,
        monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
        weekdays: relativeWeekDay,
        weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
        weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY [m.] MMMM D [d.]",
            LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
            l: "YYYY-MM-DD",
            ll: "YYYY [m.] MMMM D [d.]",
            lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
        },
        calendar: {
            sameDay: "[Šiandien] LT",
            nextDay: "[Rytoj] LT",
            nextWeek: "dddd LT",
            lastDay: "[Vakar] LT",
            lastWeek: "[Praėjusį] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "po %s",
            past: "prieš %s",
            s: translateSeconds,
            m: translateSingular,
            mm: lt__translate,
            h: translateSingular,
            hh: lt__translate,
            d: translateSingular,
            dd: lt__translate,
            M: translateSingular,
            MM: lt__translate,
            y: translateSingular,
            yy: lt__translate
        },
        ordinalParse: /\d{1,2}-oji/,
        ordinal: function(number) {
            return number + "-oji";
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        m: "minūtes_minūtēm_minūte_minūtes".split("_"),
        mm: "minūtes_minūtēm_minūte_minūtes".split("_"),
        h: "stundas_stundām_stunda_stundas".split("_"),
        hh: "stundas_stundām_stunda_stundas".split("_"),
        d: "dienas_dienām_diena_dienas".split("_"),
        dd: "dienas_dienām_diena_dienas".split("_"),
        M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
        MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
        y: "gada_gadiem_gads_gadi".split("_"),
        yy: "gada_gadiem_gads_gadi".split("_")
    }), me__translator = (_moment__default.defineLocale("lv", {
        months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
        weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
        weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
        weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY.",
            LL: "YYYY. [gada] D. MMMM",
            LLL: "YYYY. [gada] D. MMMM, HH:mm",
            LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
        },
        calendar: {
            sameDay: "[Šodien pulksten] LT",
            nextDay: "[Rīt pulksten] LT",
            nextWeek: "dddd [pulksten] LT",
            lastDay: "[Vakar pulksten] LT",
            lastWeek: "[Pagājušā] dddd [pulksten] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "pēc %s",
            past: "pirms %s",
            s: relativeSeconds,
            m: relativeTimeWithSingular,
            mm: lv__relativeTimeWithPlural,
            h: relativeTimeWithSingular,
            hh: lv__relativeTimeWithPlural,
            d: relativeTimeWithSingular,
            dd: lv__relativeTimeWithPlural,
            M: relativeTimeWithSingular,
            MM: lv__relativeTimeWithPlural,
            y: relativeTimeWithSingular,
            yy: lv__relativeTimeWithPlural
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        words: {
            m: [ "jedan minut", "jednog minuta" ],
            mm: [ "minut", "minuta", "minuta" ],
            h: [ "jedan sat", "jednog sata" ],
            hh: [ "sat", "sata", "sati" ],
            dd: [ "dan", "dana", "dana" ],
            MM: [ "mjesec", "mjeseca", "mjeseci" ],
            yy: [ "godina", "godine", "godina" ]
        },
        correctGrammaticalCase: function(number, wordKey) {
            return 1 === number ? wordKey[0] : number >= 2 && 4 >= number ? wordKey[1] : wordKey[2];
        },
        translate: function(number, withoutSuffix, key) {
            var wordKey = me__translator.words[key];
            return 1 === key.length ? withoutSuffix ? wordKey[0] : wordKey[1] : number + " " + me__translator.correctGrammaticalCase(number, wordKey);
        }
    }), mr__symbolMap = (_moment__default.defineLocale("me", {
        months: [ "januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar" ],
        monthsShort: [ "jan.", "feb.", "mar.", "apr.", "maj", "jun", "jul", "avg.", "sep.", "okt.", "nov.", "dec." ],
        weekdays: [ "nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota" ],
        weekdaysShort: [ "ned.", "pon.", "uto.", "sri.", "čet.", "pet.", "sub." ],
        weekdaysMin: [ "ne", "po", "ut", "sr", "če", "pe", "su" ],
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sjutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";

                  case 3:
                    return "[u] [srijedu] [u] LT";

                  case 6:
                    return "[u] [subotu] [u] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
            },
            lastDay: "[juče u] LT",
            lastWeek: function() {
                var lastWeekDays = [ "[prošle] [nedjelje] [u] LT", "[prošlog] [ponedjeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srijede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT" ];
                return lastWeekDays[this.day()];
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "nekoliko sekundi",
            m: me__translator.translate,
            mm: me__translator.translate,
            h: me__translator.translate,
            hh: me__translator.translate,
            d: "dan",
            dd: me__translator.translate,
            M: "mjesec",
            MM: me__translator.translate,
            y: "godinu",
            yy: me__translator.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("mk", {
        months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
        monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
        weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
        weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"),
        weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Денес во] LT",
            nextDay: "[Утре во] LT",
            nextWeek: "dddd [во] LT",
            lastDay: "[Вчера во] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 6:
                    return "[Во изминатата] dddd [во] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[Во изминатиот] dddd [во] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "после %s",
            past: "пред %s",
            s: "неколку секунди",
            m: "минута",
            mm: "%d минути",
            h: "час",
            hh: "%d часа",
            d: "ден",
            dd: "%d дена",
            M: "месец",
            MM: "%d месеци",
            y: "година",
            yy: "%d години"
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function(number) {
            var lastDigit = number % 10, last2Digits = number % 100;
            return 0 === number ? number + "-ев" : 0 === last2Digits ? number + "-ен" : last2Digits > 10 && 20 > last2Digits ? number + "-ти" : 1 === lastDigit ? number + "-ви" : 2 === lastDigit ? number + "-ри" : 7 === lastDigit || 8 === lastDigit ? number + "-ми" : number + "-ти";
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("ml", {
        months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
        monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
        weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
        weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
        weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
        longDateFormat: {
            LT: "A h:mm -നു",
            LTS: "A h:mm:ss -നു",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm -നു",
            LLLL: "dddd, D MMMM YYYY, A h:mm -നു"
        },
        calendar: {
            sameDay: "[ഇന്ന്] LT",
            nextDay: "[നാളെ] LT",
            nextWeek: "dddd, LT",
            lastDay: "[ഇന്നലെ] LT",
            lastWeek: "[കഴിഞ്ഞ] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s കഴിഞ്ഞ്",
            past: "%s മുൻപ്",
            s: "അൽപ നിമിഷങ്ങൾ",
            m: "ഒരു മിനിറ്റ്",
            mm: "%d മിനിറ്റ്",
            h: "ഒരു മണിക്കൂർ",
            hh: "%d മണിക്കൂർ",
            d: "ഒരു ദിവസം",
            dd: "%d ദിവസം",
            M: "ഒരു മാസം",
            MM: "%d മാസം",
            y: "ഒരു വർഷം",
            yy: "%d വർഷം"
        },
        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
        isPM: function(input) {
            return /^(ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "രാത്രി" : 12 > hour ? "രാവിലെ" : 17 > hour ? "ഉച്ച കഴിഞ്ഞ്" : 20 > hour ? "വൈകുന്നേരം" : "രാത്രി";
        }
    }), {
        "1": "१",
        "2": "२",
        "3": "३",
        "4": "४",
        "5": "५",
        "6": "६",
        "7": "७",
        "8": "८",
        "9": "९",
        "0": "०"
    }), mr__numberMap = {
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9",
        "०": "0"
    }, my__symbolMap = (_moment__default.defineLocale("mr", {
        months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
        monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
        weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
        weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
        weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
        longDateFormat: {
            LT: "A h:mm वाजता",
            LTS: "A h:mm:ss वाजता",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm वाजता",
            LLLL: "dddd, D MMMM YYYY, A h:mm वाजता"
        },
        calendar: {
            sameDay: "[आज] LT",
            nextDay: "[उद्या] LT",
            nextWeek: "dddd, LT",
            lastDay: "[काल] LT",
            lastWeek: "[मागील] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s नंतर",
            past: "%s पूर्वी",
            s: "सेकंद",
            m: "एक मिनिट",
            mm: "%d मिनिटे",
            h: "एक तास",
            hh: "%d तास",
            d: "एक दिवस",
            dd: "%d दिवस",
            M: "एक महिना",
            MM: "%d महिने",
            y: "एक वर्ष",
            yy: "%d वर्षे"
        },
        preparse: function(string) {
            return string.replace(/[१२३४५६७८९०]/g, function(match) {
                return mr__numberMap[match];
            });
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return mr__symbolMap[match];
            });
        },
        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "रात्री" === meridiem ? 4 > hour ? hour : hour + 12 : "सकाळी" === meridiem ? hour : "दुपारी" === meridiem ? hour >= 10 ? hour : hour + 12 : "सायंकाळी" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "रात्री" : 10 > hour ? "सकाळी" : 17 > hour ? "दुपारी" : 20 > hour ? "सायंकाळी" : "रात्री";
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), _moment__default.defineLocale("ms-my", {
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "pagi" === meridiem ? hour : "tengahari" === meridiem ? hour >= 11 ? hour : hour + 12 : "petang" === meridiem || "malam" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hours, minutes, isLower) {
            return 11 > hours ? "pagi" : 15 > hours ? "tengahari" : 19 > hours ? "petang" : "malam";
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Esok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kelmarin pukul] LT",
            lastWeek: "dddd [lepas pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lepas",
            s: "beberapa saat",
            m: "seminit",
            mm: "%d minit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("ms", {
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "pagi" === meridiem ? hour : "tengahari" === meridiem ? hour >= 11 ? hour : hour + 12 : "petang" === meridiem || "malam" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hours, minutes, isLower) {
            return 11 > hours ? "pagi" : 15 > hours ? "tengahari" : 19 > hours ? "petang" : "malam";
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Esok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kelmarin pukul] LT",
            lastWeek: "dddd [lepas pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lepas",
            s: "beberapa saat",
            m: "seminit",
            mm: "%d minit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), {
        "1": "၁",
        "2": "၂",
        "3": "၃",
        "4": "၄",
        "5": "၅",
        "6": "၆",
        "7": "၇",
        "8": "၈",
        "9": "၉",
        "0": "၀"
    }), my__numberMap = {
        "၁": "1",
        "၂": "2",
        "၃": "3",
        "၄": "4",
        "၅": "5",
        "၆": "6",
        "၇": "7",
        "၈": "8",
        "၉": "9",
        "၀": "0"
    }, ne__symbolMap = (_moment__default.defineLocale("my", {
        months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),
        monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),
        weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),
        weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
        weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[ယနေ.] LT [မှာ]",
            nextDay: "[မနက်ဖြန်] LT [မှာ]",
            nextWeek: "dddd LT [မှာ]",
            lastDay: "[မနေ.က] LT [မှာ]",
            lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]",
            sameElse: "L"
        },
        relativeTime: {
            future: "လာမည့် %s မှာ",
            past: "လွန်ခဲ့သော %s က",
            s: "စက္ကန်.အနည်းငယ်",
            m: "တစ်မိနစ်",
            mm: "%d မိနစ်",
            h: "တစ်နာရီ",
            hh: "%d နာရီ",
            d: "တစ်ရက်",
            dd: "%d ရက်",
            M: "တစ်လ",
            MM: "%d လ",
            y: "တစ်နှစ်",
            yy: "%d နှစ်"
        },
        preparse: function(string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function(match) {
                return my__numberMap[match];
            });
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return my__symbolMap[match];
            });
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("nb", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "søn_man_tirs_ons_tors_fre_lør".split("_"),
        weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "H.mm",
            LTS: "H.mm.ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] H.mm",
            LLLL: "dddd D. MMMM YYYY [kl.] H.mm"
        },
        calendar: {
            sameDay: "[i dag kl.] LT",
            nextDay: "[i morgen kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[i går kl.] LT",
            lastWeek: "[forrige] dddd [kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "for %s siden",
            s: "noen sekunder",
            m: "ett minutt",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dager",
            M: "en måned",
            MM: "%d måneder",
            y: "ett år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        "1": "१",
        "2": "२",
        "3": "३",
        "4": "४",
        "5": "५",
        "6": "६",
        "7": "७",
        "8": "८",
        "9": "९",
        "0": "०"
    }), ne__numberMap = {
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9",
        "०": "0"
    }, nl__monthsShortWithDots = (_moment__default.defineLocale("ne", {
        months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
        monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
        weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
        weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
        weekdaysMin: "आइ._सो._मङ्_बु._बि._शु._श.".split("_"),
        longDateFormat: {
            LT: "Aको h:mm बजे",
            LTS: "Aको h:mm:ss बजे",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, Aको h:mm बजे",
            LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे"
        },
        preparse: function(string) {
            return string.replace(/[१२३४५६७८९०]/g, function(match) {
                return ne__numberMap[match];
            });
        },
        postformat: function(string) {
            return string.replace(/\d/g, function(match) {
                return ne__symbolMap[match];
            });
        },
        meridiemParse: /राती|बिहान|दिउँसो|बेलुका|साँझ|राती/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "राती" === meridiem ? 3 > hour ? hour : hour + 12 : "बिहान" === meridiem ? hour : "दिउँसो" === meridiem ? hour >= 10 ? hour : hour + 12 : "बेलुका" === meridiem || "साँझ" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hour, minute, isLower) {
            return 3 > hour ? "राती" : 10 > hour ? "बिहान" : 15 > hour ? "दिउँसो" : 18 > hour ? "बेलुका" : 20 > hour ? "साँझ" : "राती";
        },
        calendar: {
            sameDay: "[आज] LT",
            nextDay: "[भोली] LT",
            nextWeek: "[आउँदो] dddd[,] LT",
            lastDay: "[हिजो] LT",
            lastWeek: "[गएको] dddd[,] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sमा",
            past: "%s अगाडी",
            s: "केही समय",
            m: "एक मिनेट",
            mm: "%d मिनेट",
            h: "एक घण्टा",
            hh: "%d घण्टा",
            d: "एक दिन",
            dd: "%d दिन",
            M: "एक महिना",
            MM: "%d महिना",
            y: "एक बर्ष",
            yy: "%d बर्ष"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_")), nl__monthsShortWithoutDots = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), monthsNominative = (_moment__default.defineLocale("nl", {
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: function(m, format) {
            return /-MMM-/.test(format) ? nl__monthsShortWithoutDots[m.month()] : nl__monthsShortWithDots[m.month()];
        },
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            m: "één minuut",
            mm: "%d minuten",
            h: "één uur",
            hh: "%d uur",
            d: "één dag",
            dd: "%d dagen",
            M: "één maand",
            MM: "%d maanden",
            y: "één jaar",
            yy: "%d jaar"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(number) {
            return number + (1 === number || 8 === number || number >= 20 ? "ste" : "de");
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("nn", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
        weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"),
        weekdaysMin: "su_må_ty_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[I dag klokka] LT",
            nextDay: "[I morgon klokka] LT",
            nextWeek: "dddd [klokka] LT",
            lastDay: "[I går klokka] LT",
            lastWeek: "[Føregåande] dddd [klokka] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "for %s sidan",
            s: "nokre sekund",
            m: "eit minutt",
            mm: "%d minutt",
            h: "ein time",
            hh: "%d timar",
            d: "ein dag",
            dd: "%d dagar",
            M: "ein månad",
            MM: "%d månader",
            y: "eit år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_")), monthsSubjective = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"), sk__months = (_moment__default.defineLocale("pl", {
        months: function(momentToFormat, format) {
            return "" === format ? "(" + monthsSubjective[momentToFormat.month()] + "|" + monthsNominative[momentToFormat.month()] + ")" : /D MMMM/.test(format) ? monthsSubjective[momentToFormat.month()] : monthsNominative[momentToFormat.month()];
        },
        monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
        weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
        weekdaysShort: "nie_pon_wt_śr_czw_pt_sb".split("_"),
        weekdaysMin: "N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Dziś o] LT",
            nextDay: "[Jutro o] LT",
            nextWeek: "[W] dddd [o] LT",
            lastDay: "[Wczoraj o] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[W zeszłą niedzielę o] LT";

                  case 3:
                    return "[W zeszłą środę o] LT";

                  case 6:
                    return "[W zeszłą sobotę o] LT";

                  default:
                    return "[W zeszły] dddd [o] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "%s temu",
            s: "kilka sekund",
            m: pl__translate,
            mm: pl__translate,
            h: pl__translate,
            hh: pl__translate,
            d: "1 dzień",
            dd: "%d dni",
            M: "miesiąc",
            MM: pl__translate,
            y: "rok",
            yy: pl__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("pt-br", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
        },
        calendar: {
            sameDay: "[Hoje às] LT",
            nextDay: "[Amanhã às] LT",
            nextWeek: "dddd [às] LT",
            lastDay: "[Ontem às] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "%s atrás",
            s: "poucos segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mês",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº"
    }), _moment__default.defineLocale("pt", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Hoje às] LT",
            nextDay: "[Amanhã às] LT",
            nextWeek: "dddd [às] LT",
            lastDay: "[Ontem às] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "há %s",
            s: "segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mês",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("ro", {
        months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
        monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
        weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
        weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
        weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[azi la] LT",
            nextDay: "[mâine la] LT",
            nextWeek: "dddd [la] LT",
            lastDay: "[ieri la] LT",
            lastWeek: "[fosta] dddd [la] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "peste %s",
            past: "%s în urmă",
            s: "câteva secunde",
            m: "un minut",
            mm: ro__relativeTimeWithPlural,
            h: "o oră",
            hh: ro__relativeTimeWithPlural,
            d: "o zi",
            dd: ro__relativeTimeWithPlural,
            M: "o lună",
            MM: ro__relativeTimeWithPlural,
            y: "un an",
            yy: ro__relativeTimeWithPlural
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("ru", {
        months: ru__monthsCaseReplace,
        monthsShort: ru__monthsShortCaseReplace,
        weekdays: ru__weekdaysCaseReplace,
        weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        monthsParse: [ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ],
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY г.",
            LLL: "D MMMM YYYY г., HH:mm",
            LLLL: "dddd, D MMMM YYYY г., HH:mm"
        },
        calendar: {
            sameDay: "[Сегодня в] LT",
            nextDay: "[Завтра в] LT",
            lastDay: "[Вчера в] LT",
            nextWeek: function() {
                return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
            },
            lastWeek: function(now) {
                if (now.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
                switch (this.day()) {
                  case 0:
                    return "[В прошлое] dddd [в] LT";

                  case 1:
                  case 2:
                  case 4:
                    return "[В прошлый] dddd [в] LT";

                  case 3:
                  case 5:
                  case 6:
                    return "[В прошлую] dddd [в] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "через %s",
            past: "%s назад",
            s: "несколько секунд",
            m: ru__relativeTimeWithPlural,
            mm: ru__relativeTimeWithPlural,
            h: "час",
            hh: ru__relativeTimeWithPlural,
            d: "день",
            dd: ru__relativeTimeWithPlural,
            M: "месяц",
            MM: ru__relativeTimeWithPlural,
            y: "год",
            yy: ru__relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM: function(input) {
            return /^(дня|вечера)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "ночи" : 12 > hour ? "утра" : 17 > hour ? "дня" : "вечера";
        },
        ordinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function(number, period) {
            switch (period) {
              case "M":
              case "d":
              case "DDD":
                return number + "-й";

              case "D":
                return number + "-го";

              case "w":
              case "W":
                return number + "-я";

              default:
                return number;
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("si", {
        months: "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),
        monthsShort: "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),
        weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),
        weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
        weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
        longDateFormat: {
            LT: "a h:mm",
            LTS: "a h:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYY MMMM D",
            LLL: "YYYY MMMM D, a h:mm",
            LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss"
        },
        calendar: {
            sameDay: "[අද] LT[ට]",
            nextDay: "[හෙට] LT[ට]",
            nextWeek: "dddd LT[ට]",
            lastDay: "[ඊයේ] LT[ට]",
            lastWeek: "[පසුගිය] dddd LT[ට]",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sකින්",
            past: "%sකට පෙර",
            s: "තත්පර කිහිපය",
            m: "මිනිත්තුව",
            mm: "මිනිත්තු %d",
            h: "පැය",
            hh: "පැය %d",
            d: "දිනය",
            dd: "දින %d",
            M: "මාසය",
            MM: "මාස %d",
            y: "වසර",
            yy: "වසර %d"
        },
        ordinalParse: /\d{1,2} වැනි/,
        ordinal: function(number) {
            return number + " වැනි";
        },
        meridiem: function(hours, minutes, isLower) {
            return hours > 11 ? isLower ? "ප.ව." : "පස් වරු" : isLower ? "පෙ.ව." : "පෙර වරු";
        }
    }), "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_")), sk__monthsShort = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"), sr_cyrl__translator = (_moment__default.defineLocale("sk", {
        months: sk__months,
        monthsShort: sk__monthsShort,
        monthsParse: function(months, monthsShort) {
            var i, _monthsParse = [];
            for (i = 0; 12 > i; i++) _monthsParse[i] = new RegExp("^" + months[i] + "$|^" + monthsShort[i] + "$", "i");
            return _monthsParse;
        }(sk__months, sk__monthsShort),
        weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
        weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
        weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[dnes o] LT",
            nextDay: "[zajtra o] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[v nedeľu o] LT";

                  case 1:
                  case 2:
                    return "[v] dddd [o] LT";

                  case 3:
                    return "[v stredu o] LT";

                  case 4:
                    return "[vo štvrtok o] LT";

                  case 5:
                    return "[v piatok o] LT";

                  case 6:
                    return "[v sobotu o] LT";
                }
            },
            lastDay: "[včera o] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[minulú nedeľu o] LT";

                  case 1:
                  case 2:
                    return "[minulý] dddd [o] LT";

                  case 3:
                    return "[minulú stredu o] LT";

                  case 4:
                  case 5:
                    return "[minulý] dddd [o] LT";

                  case 6:
                    return "[minulú sobotu o] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "pred %s",
            s: sk__translate,
            m: sk__translate,
            mm: sk__translate,
            h: sk__translate,
            hh: sk__translate,
            d: sk__translate,
            dd: sk__translate,
            M: sk__translate,
            MM: sk__translate,
            y: sk__translate,
            yy: sk__translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("sl", {
        months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
        weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
        weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danes ob] LT",
            nextDay: "[jutri ob] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[v] [nedeljo] [ob] LT";

                  case 3:
                    return "[v] [sredo] [ob] LT";

                  case 6:
                    return "[v] [soboto] [ob] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[v] dddd [ob] LT";
                }
            },
            lastDay: "[včeraj ob] LT",
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[prejšnjo] [nedeljo] [ob] LT";

                  case 3:
                    return "[prejšnjo] [sredo] [ob] LT";

                  case 6:
                    return "[prejšnjo] [soboto] [ob] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prejšnji] dddd [ob] LT";
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "čez %s",
            past: "pred %s",
            s: sl__processRelativeTime,
            m: sl__processRelativeTime,
            mm: sl__processRelativeTime,
            h: sl__processRelativeTime,
            hh: sl__processRelativeTime,
            d: sl__processRelativeTime,
            dd: sl__processRelativeTime,
            M: sl__processRelativeTime,
            MM: sl__processRelativeTime,
            y: sl__processRelativeTime,
            yy: sl__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("sq", {
        months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
        monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
        weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
        weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
        weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
        meridiemParse: /PD|MD/,
        isPM: function(input) {
            return "M" === input.charAt(0);
        },
        meridiem: function(hours, minutes, isLower) {
            return 12 > hours ? "PD" : "MD";
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Sot në] LT",
            nextDay: "[Nesër në] LT",
            nextWeek: "dddd [në] LT",
            lastDay: "[Dje në] LT",
            lastWeek: "dddd [e kaluar në] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "në %s",
            past: "%s më parë",
            s: "disa sekonda",
            m: "një minutë",
            mm: "%d minuta",
            h: "një orë",
            hh: "%d orë",
            d: "një ditë",
            dd: "%d ditë",
            M: "një muaj",
            MM: "%d muaj",
            y: "një vit",
            yy: "%d vite"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        words: {
            m: [ "један минут", "једне минуте" ],
            mm: [ "минут", "минуте", "минута" ],
            h: [ "један сат", "једног сата" ],
            hh: [ "сат", "сата", "сати" ],
            dd: [ "дан", "дана", "дана" ],
            MM: [ "месец", "месеца", "месеци" ],
            yy: [ "година", "године", "година" ]
        },
        correctGrammaticalCase: function(number, wordKey) {
            return 1 === number ? wordKey[0] : number >= 2 && 4 >= number ? wordKey[1] : wordKey[2];
        },
        translate: function(number, withoutSuffix, key) {
            var wordKey = sr_cyrl__translator.words[key];
            return 1 === key.length ? withoutSuffix ? wordKey[0] : wordKey[1] : number + " " + sr_cyrl__translator.correctGrammaticalCase(number, wordKey);
        }
    }), sr__translator = (_moment__default.defineLocale("sr-cyrl", {
        months: [ "јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар" ],
        monthsShort: [ "јан.", "феб.", "мар.", "апр.", "мај", "јун", "јул", "авг.", "сеп.", "окт.", "нов.", "дец." ],
        weekdays: [ "недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота" ],
        weekdaysShort: [ "нед.", "пон.", "уто.", "сре.", "чет.", "пет.", "суб." ],
        weekdaysMin: [ "не", "по", "ут", "ср", "че", "пе", "су" ],
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[данас у] LT",
            nextDay: "[сутра у] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[у] [недељу] [у] LT";

                  case 3:
                    return "[у] [среду] [у] LT";

                  case 6:
                    return "[у] [суботу] [у] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[у] dddd [у] LT";
                }
            },
            lastDay: "[јуче у] LT",
            lastWeek: function() {
                var lastWeekDays = [ "[прошле] [недеље] [у] LT", "[прошлог] [понедељка] [у] LT", "[прошлог] [уторка] [у] LT", "[прошле] [среде] [у] LT", "[прошлог] [четвртка] [у] LT", "[прошлог] [петка] [у] LT", "[прошле] [суботе] [у] LT" ];
                return lastWeekDays[this.day()];
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "за %s",
            past: "пре %s",
            s: "неколико секунди",
            m: sr_cyrl__translator.translate,
            mm: sr_cyrl__translator.translate,
            h: sr_cyrl__translator.translate,
            hh: sr_cyrl__translator.translate,
            d: "дан",
            dd: sr_cyrl__translator.translate,
            M: "месец",
            MM: sr_cyrl__translator.translate,
            y: "годину",
            yy: sr_cyrl__translator.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), {
        words: {
            m: [ "jedan minut", "jedne minute" ],
            mm: [ "minut", "minute", "minuta" ],
            h: [ "jedan sat", "jednog sata" ],
            hh: [ "sat", "sata", "sati" ],
            dd: [ "dan", "dana", "dana" ],
            MM: [ "mesec", "meseca", "meseci" ],
            yy: [ "godina", "godine", "godina" ]
        },
        correctGrammaticalCase: function(number, wordKey) {
            return 1 === number ? wordKey[0] : number >= 2 && 4 >= number ? wordKey[1] : wordKey[2];
        },
        translate: function(number, withoutSuffix, key) {
            var wordKey = sr__translator.words[key];
            return 1 === key.length ? withoutSuffix ? wordKey[0] : wordKey[1] : number + " " + sr__translator.correctGrammaticalCase(number, wordKey);
        }
    }), tr__suffixes = (_moment__default.defineLocale("sr", {
        months: [ "januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar" ],
        monthsShort: [ "jan.", "feb.", "mar.", "apr.", "maj", "jun", "jul", "avg.", "sep.", "okt.", "nov.", "dec." ],
        weekdays: [ "nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota" ],
        weekdaysShort: [ "ned.", "pon.", "uto.", "sre.", "čet.", "pet.", "sub." ],
        weekdaysMin: [ "ne", "po", "ut", "sr", "če", "pe", "su" ],
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedelju] [u] LT";

                  case 3:
                    return "[u] [sredu] [u] LT";

                  case 6:
                    return "[u] [subotu] [u] LT";

                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
            },
            lastDay: "[juče u] LT",
            lastWeek: function() {
                var lastWeekDays = [ "[prošle] [nedelje] [u] LT", "[prošlog] [ponedeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT" ];
                return lastWeekDays[this.day()];
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "pre %s",
            s: "nekoliko sekundi",
            m: sr__translator.translate,
            mm: sr__translator.translate,
            h: sr__translator.translate,
            hh: sr__translator.translate,
            d: "dan",
            dd: sr__translator.translate,
            M: "mesec",
            MM: sr__translator.translate,
            y: "godinu",
            yy: sr__translator.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("sv", {
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
        weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
        weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Idag] LT",
            nextDay: "[Imorgon] LT",
            lastDay: "[Igår] LT",
            nextWeek: "[På] dddd LT",
            lastWeek: "[I] dddd[s] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "för %s sedan",
            s: "några sekunder",
            m: "en minut",
            mm: "%d minuter",
            h: "en timme",
            hh: "%d timmar",
            d: "en dag",
            dd: "%d dagar",
            M: "en månad",
            MM: "%d månader",
            y: "ett år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}(e|a)/,
        ordinal: function(number) {
            var b = number % 10, output = 1 === ~~(number % 100 / 10) ? "e" : 1 === b ? "a" : 2 === b ? "a" : "e";
            return number + output;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("ta", {
        months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
        monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
        weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),
        weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
        weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, HH:mm",
            LLLL: "dddd, D MMMM YYYY, HH:mm"
        },
        calendar: {
            sameDay: "[இன்று] LT",
            nextDay: "[நாளை] LT",
            nextWeek: "dddd, LT",
            lastDay: "[நேற்று] LT",
            lastWeek: "[கடந்த வாரம்] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s இல்",
            past: "%s முன்",
            s: "ஒரு சில விநாடிகள்",
            m: "ஒரு நிமிடம்",
            mm: "%d நிமிடங்கள்",
            h: "ஒரு மணி நேரம்",
            hh: "%d மணி நேரம்",
            d: "ஒரு நாள்",
            dd: "%d நாட்கள்",
            M: "ஒரு மாதம்",
            MM: "%d மாதங்கள்",
            y: "ஒரு வருடம்",
            yy: "%d ஆண்டுகள்"
        },
        ordinalParse: /\d{1,2}வது/,
        ordinal: function(number) {
            return number + "வது";
        },
        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
        meridiem: function(hour, minute, isLower) {
            return 2 > hour ? " யாமம்" : 6 > hour ? " வைகறை" : 10 > hour ? " காலை" : 14 > hour ? " நண்பகல்" : 18 > hour ? " எற்பாடு" : 22 > hour ? " மாலை" : " யாமம்";
        },
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "யாமம்" === meridiem ? 2 > hour ? hour : hour + 12 : "வைகறை" === meridiem || "காலை" === meridiem ? hour : "நண்பகல்" === meridiem && hour >= 10 ? hour : hour + 12;
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), _moment__default.defineLocale("th", {
        months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
        monthsShort: "มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),
        weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
        weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),
        weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
        longDateFormat: {
            LT: "H นาฬิกา m นาที",
            LTS: "H นาฬิกา m นาที s วินาที",
            L: "YYYY/MM/DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY เวลา H นาฬิกา m นาที",
            LLLL: "วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที"
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM: function(input) {
            return "หลังเที่ยง" === input;
        },
        meridiem: function(hour, minute, isLower) {
            return 12 > hour ? "ก่อนเที่ยง" : "หลังเที่ยง";
        },
        calendar: {
            sameDay: "[วันนี้ เวลา] LT",
            nextDay: "[พรุ่งนี้ เวลา] LT",
            nextWeek: "dddd[หน้า เวลา] LT",
            lastDay: "[เมื่อวานนี้ เวลา] LT",
            lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "อีก %s",
            past: "%sที่แล้ว",
            s: "ไม่กี่วินาที",
            m: "1 นาที",
            mm: "%d นาที",
            h: "1 ชั่วโมง",
            hh: "%d ชั่วโมง",
            d: "1 วัน",
            dd: "%d วัน",
            M: "1 เดือน",
            MM: "%d เดือน",
            y: "1 ปี",
            yy: "%d ปี"
        }
    }), _moment__default.defineLocale("tl-ph", {
        months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
        monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
        weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
        weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
        weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "MM/D/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY HH:mm",
            LLLL: "dddd, MMMM DD, YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ngayon sa] LT",
            nextDay: "[Bukas sa] LT",
            nextWeek: "dddd [sa] LT",
            lastDay: "[Kahapon sa] LT",
            lastWeek: "dddd [huling linggo] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "sa loob ng %s",
            past: "%s ang nakalipas",
            s: "ilang segundo",
            m: "isang minuto",
            mm: "%d minuto",
            h: "isang oras",
            hh: "%d oras",
            d: "isang araw",
            dd: "%d araw",
            M: "isang buwan",
            MM: "%d buwan",
            y: "isang taon",
            yy: "%d taon"
        },
        ordinalParse: /\d{1,2}/,
        ordinal: function(number) {
            return number;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), {
        1: "'inci",
        5: "'inci",
        8: "'inci",
        70: "'inci",
        80: "'inci",
        2: "'nci",
        7: "'nci",
        20: "'nci",
        50: "'nci",
        3: "'üncü",
        4: "'üncü",
        100: "'üncü",
        6: "'ncı",
        9: "'uncu",
        10: "'uncu",
        30: "'uncu",
        60: "'ıncı",
        90: "'ıncı"
    }), moment_with_locales = (_moment__default.defineLocale("tr", {
        months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
        monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
        weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
        weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[bugün saat] LT",
            nextDay: "[yarın saat] LT",
            nextWeek: "[haftaya] dddd [saat] LT",
            lastDay: "[dün] LT",
            lastWeek: "[geçen hafta] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s önce",
            s: "birkaç saniye",
            m: "bir dakika",
            mm: "%d dakika",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gün",
            dd: "%d gün",
            M: "bir ay",
            MM: "%d ay",
            y: "bir yıl",
            yy: "%d yıl"
        },
        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
        ordinal: function(number) {
            if (0 === number) return number + "'ıncı";
            var a = number % 10, b = number % 100 - a, c = number >= 100 ? 100 : null;
            return number + (tr__suffixes[a] || tr__suffixes[b] || tr__suffixes[c]);
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("tzl", {
        months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),
        monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
        weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
        weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
        weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "LT.ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM [dallas] YYYY",
            LLL: "D. MMMM [dallas] YYYY LT",
            LLLL: "dddd, [li] D. MMMM [dallas] YYYY LT"
        },
        meridiem: function(hours, minutes, isLower) {
            return hours > 11 ? isLower ? "d'o" : "D'O" : isLower ? "d'a" : "D'A";
        },
        calendar: {
            sameDay: "[oxhi à] LT",
            nextDay: "[demà à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[ieiri à] LT",
            lastWeek: "[sür el] dddd [lasteu à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "osprei %s",
            past: "ja%s",
            s: tzl__processRelativeTime,
            m: tzl__processRelativeTime,
            mm: tzl__processRelativeTime,
            h: tzl__processRelativeTime,
            hh: tzl__processRelativeTime,
            d: tzl__processRelativeTime,
            dd: tzl__processRelativeTime,
            M: tzl__processRelativeTime,
            MM: tzl__processRelativeTime,
            y: tzl__processRelativeTime,
            yy: tzl__processRelativeTime
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("tzm-latn", {
        months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[asdkh g] LT",
            nextDay: "[aska g] LT",
            nextWeek: "dddd [g] LT",
            lastDay: "[assant g] LT",
            lastWeek: "dddd [g] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dadkh s yan %s",
            past: "yan %s",
            s: "imik",
            m: "minuḍ",
            mm: "%d minuḍ",
            h: "saɛa",
            hh: "%d tassaɛin",
            d: "ass",
            dd: "%d ossan",
            M: "ayowr",
            MM: "%d iyyirn",
            y: "asgas",
            yy: "%d isgasn"
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), _moment__default.defineLocale("tzm", {
        months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[ⴰⵙⴷⵅ ⴴ] LT",
            nextDay: "[ⴰⵙⴽⴰ ⴴ] LT",
            nextWeek: "dddd [ⴴ] LT",
            lastDay: "[ⴰⵚⴰⵏⵜ ⴴ] LT",
            lastWeek: "dddd [ⴴ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
            past: "ⵢⴰⵏ %s",
            s: "ⵉⵎⵉⴽ",
            m: "ⵎⵉⵏⵓⴺ",
            mm: "%d ⵎⵉⵏⵓⴺ",
            h: "ⵙⴰⵄⴰ",
            hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
            d: "ⴰⵙⵙ",
            dd: "%d oⵙⵙⴰⵏ",
            M: "ⴰⵢoⵓⵔ",
            MM: "%d ⵉⵢⵢⵉⵔⵏ",
            y: "ⴰⵙⴳⴰⵙ",
            yy: "%d ⵉⵙⴳⴰⵙⵏ"
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), _moment__default.defineLocale("uk", {
        months: uk__monthsCaseReplace,
        monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
        weekdays: uk__weekdaysCaseReplace,
        weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY р.",
            LLL: "D MMMM YYYY р., HH:mm",
            LLLL: "dddd, D MMMM YYYY р., HH:mm"
        },
        calendar: {
            sameDay: processHoursFunction("[Сьогодні "),
            nextDay: processHoursFunction("[Завтра "),
            lastDay: processHoursFunction("[Вчора "),
            nextWeek: processHoursFunction("[У] dddd ["),
            lastWeek: function() {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                    return processHoursFunction("[Минулої] dddd [").call(this);

                  case 1:
                  case 2:
                  case 4:
                    return processHoursFunction("[Минулого] dddd [").call(this);
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "за %s",
            past: "%s тому",
            s: "декілька секунд",
            m: uk__relativeTimeWithPlural,
            mm: uk__relativeTimeWithPlural,
            h: "годину",
            hh: uk__relativeTimeWithPlural,
            d: "день",
            dd: uk__relativeTimeWithPlural,
            M: "місяць",
            MM: uk__relativeTimeWithPlural,
            y: "рік",
            yy: uk__relativeTimeWithPlural
        },
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function(input) {
            return /^(дня|вечора)$/.test(input);
        },
        meridiem: function(hour, minute, isLower) {
            return 4 > hour ? "ночі" : 12 > hour ? "ранку" : 17 > hour ? "дня" : "вечора";
        },
        ordinalParse: /\d{1,2}-(й|го)/,
        ordinal: function(number, period) {
            switch (period) {
              case "M":
              case "d":
              case "DDD":
              case "w":
              case "W":
                return number + "-й";

              case "D":
                return number + "-го";

              default:
                return number;
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("uz", {
        months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
        monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
        weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
        weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
        weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "D MMMM YYYY, dddd HH:mm"
        },
        calendar: {
            sameDay: "[Бугун соат] LT [да]",
            nextDay: "[Эртага] LT [да]",
            nextWeek: "dddd [куни соат] LT [да]",
            lastDay: "[Кеча соат] LT [да]",
            lastWeek: "[Утган] dddd [куни соат] LT [да]",
            sameElse: "L"
        },
        relativeTime: {
            future: "Якин %s ичида",
            past: "Бир неча %s олдин",
            s: "фурсат",
            m: "бир дакика",
            mm: "%d дакика",
            h: "бир соат",
            hh: "%d соат",
            d: "бир кун",
            dd: "%d кун",
            M: "бир ой",
            MM: "%d ой",
            y: "бир йил",
            yy: "%d йил"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), _moment__default.defineLocale("vi", {
        months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
        monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
        weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
        weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM [năm] YYYY",
            LLL: "D MMMM [năm] YYYY HH:mm",
            LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
            l: "DD/M/YYYY",
            ll: "D MMM YYYY",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd, D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Hôm nay lúc] LT",
            nextDay: "[Ngày mai lúc] LT",
            nextWeek: "dddd [tuần tới lúc] LT",
            lastDay: "[Hôm qua lúc] LT",
            lastWeek: "dddd [tuần rồi lúc] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s tới",
            past: "%s trước",
            s: "vài giây",
            m: "một phút",
            mm: "%d phút",
            h: "một giờ",
            hh: "%d giờ",
            d: "một ngày",
            dd: "%d ngày",
            M: "một tháng",
            MM: "%d tháng",
            y: "một năm",
            yy: "%d năm"
        },
        ordinalParse: /\d{1,2}/,
        ordinal: function(number) {
            return number;
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("zh-cn", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "Ah点mm分",
            LTS: "Ah点m分s秒",
            L: "YYYY-MM-DD",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日Ah点mm分",
            LLLL: "YYYY年MMMD日ddddAh点mm分",
            l: "YYYY-MM-DD",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日Ah点mm分",
            llll: "YYYY年MMMD日ddddAh点mm分"
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "凌晨" === meridiem || "早上" === meridiem || "上午" === meridiem ? hour : "下午" === meridiem || "晚上" === meridiem ? hour + 12 : hour >= 11 ? hour : hour + 12;
        },
        meridiem: function(hour, minute, isLower) {
            var hm = 100 * hour + minute;
            return 600 > hm ? "凌晨" : 900 > hm ? "早上" : 1130 > hm ? "上午" : 1230 > hm ? "中午" : 1800 > hm ? "下午" : "晚上";
        },
        calendar: {
            sameDay: function() {
                return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT";
            },
            nextDay: function() {
                return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT";
            },
            lastDay: function() {
                return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT";
            },
            nextWeek: function() {
                var startOfWeek, prefix;
                return startOfWeek = _moment__default().startOf("week"), prefix = this.unix() - startOfWeek.unix() >= 604800 ? "[下]" : "[本]", 
                0 === this.minutes() ? prefix + "dddAh点整" : prefix + "dddAh点mm";
            },
            lastWeek: function() {
                var startOfWeek, prefix;
                return startOfWeek = _moment__default().startOf("week"), prefix = this.unix() < startOfWeek.unix() ? "[上]" : "[本]", 
                0 === this.minutes() ? prefix + "dddAh点整" : prefix + "dddAh点mm";
            },
            sameElse: "LL"
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function(number, period) {
            switch (period) {
              case "d":
              case "D":
              case "DDD":
                return number + "日";

              case "M":
                return number + "月";

              case "w":
              case "W":
                return number + "周";

              default:
                return number;
            }
        },
        relativeTime: {
            future: "%s内",
            past: "%s前",
            s: "几秒",
            m: "1 分钟",
            mm: "%d 分钟",
            h: "1 小时",
            hh: "%d 小时",
            d: "1 天",
            dd: "%d 天",
            M: "1 个月",
            MM: "%d 个月",
            y: "1 年",
            yy: "%d 年"
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), _moment__default.defineLocale("zh-tw", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "Ah點mm分",
            LTS: "Ah點m分s秒",
            L: "YYYY年MMMD日",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日Ah點mm分",
            LLLL: "YYYY年MMMD日ddddAh點mm分",
            l: "YYYY年MMMD日",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日Ah點mm分",
            llll: "YYYY年MMMD日ddddAh點mm分"
        },
        meridiemParse: /早上|上午|中午|下午|晚上/,
        meridiemHour: function(hour, meridiem) {
            return 12 === hour && (hour = 0), "早上" === meridiem || "上午" === meridiem ? hour : "中午" === meridiem ? hour >= 11 ? hour : hour + 12 : "下午" === meridiem || "晚上" === meridiem ? hour + 12 : void 0;
        },
        meridiem: function(hour, minute, isLower) {
            var hm = 100 * hour + minute;
            return 900 > hm ? "早上" : 1130 > hm ? "上午" : 1230 > hm ? "中午" : 1800 > hm ? "下午" : "晚上";
        },
        calendar: {
            sameDay: "[今天]LT",
            nextDay: "[明天]LT",
            nextWeek: "[下]ddddLT",
            lastDay: "[昨天]LT",
            lastWeek: "[上]ddddLT",
            sameElse: "L"
        },
        ordinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function(number, period) {
            switch (period) {
              case "d":
              case "D":
              case "DDD":
                return number + "日";

              case "M":
                return number + "月";

              case "w":
              case "W":
                return number + "週";

              default:
                return number;
            }
        },
        relativeTime: {
            future: "%s內",
            past: "%s前",
            s: "幾秒",
            m: "一分鐘",
            mm: "%d分鐘",
            h: "一小時",
            hh: "%d小時",
            d: "一天",
            dd: "%d天",
            M: "一個月",
            MM: "%d個月",
            y: "一年",
            yy: "%d年"
        }
    }), _moment__default);
    return moment_with_locales.locale("en"), moment_with_locales;
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), MaterialDatepicker = function() {
    function MaterialDatepicker(element, settings) {
        _classCallCheck(this, MaterialDatepicker);
        var defaults = {
            type: "date",
            lang: "en",
            orientation: "landscape",
            primaryColor: "rgba(0, 150, 136, 1)",
            theme: "light",
            buttons: !0,
            openOn: "click",
            closeAfterClick: !0,
            date: new Date(),
            weekBegin: "sunday",
            outputFormat: {
                date: "YYYY/MM/DD",
                month: "MMMM YYYY"
            },
            topHeaderFormat: "YYYY",
            headerFormat: {
                date: "ddd, MMM D",
                month: "MMM"
            },
            sitePickerFormat: {
                date: "MMMM YYYY",
                month: "YYYY"
            },
            onLoad: "",
            onOpen: "",
            onNewDate: "",
            outputElement: ""
        };
        if (this.settings = Object.assign(defaults, settings), moment.locale(this.settings.lang), 
        "object" == typeof this.settings.topHeaderFormat && (this.settings.topHeaderFormat = this.settings.topHeaderFormat[this.settings.type]), 
        "object" == typeof this.settings.headerFormat && (this.settings.headerFormat = this.settings.headerFormat[this.settings.type]), 
        "object" == typeof this.settings.outputFormat && (this.settings.outputFormat = this.settings.outputFormat[this.settings.type]), 
        "object" == typeof this.settings.sitePickerFormat && (this.settings.sitePickerFormat = this.settings.sitePickerFormat[this.settings.type]), 
        this.element = element, "string" == typeof this.element && (this.element = document.querySelector("" + element), 
        null == this.element)) return void console.warn(" Material Datepicker could not initialize because, Object is not defined");
        var elementTag = this.element.tagName, elementType = this.element.getAttribute("type"), elementVal = this.element.value;
        "INPUT" != elementTag || "date" != elementType && "number" != elementType && "text" != elementType || "" == elementVal ? this.date = this.settings.date : this.date = moment(elementVal, this.settings.outputFormat).toDate(), 
        "string" == typeof this.settings.outputElement && "" != this.settings.outputElement && (this.settings.outputElement = document.querySelector("" + this.settings.outputElement)), 
        this._define();
    }
    return _createClass(MaterialDatepicker, [ {
        key: "_define",
        value: function() {
            var _this = this;
            return this._createElement(), "direct" == this.settings.openOn ? void this.open(this.settings.openOn) : void this.element.addEventListener(this.settings.openOn, function() {
                _this.open(_this.settings.openOn);
            });
        }
    }, {
        key: "_createElement",
        value: function(time) {
            var _this2 = this;
            this.position = this.element.getBoundingClientRect(), this.picker = document.createElement("div"), 
            this.picker.setAttribute("class", "mp-" + this.settings.type + "picker mp-picker"), 
            this.picker.setAttribute("data-theme", this.settings.theme), this.picker.setAttribute("data-orientation", this.settings.orientation), 
            this.picker.style.top = this.position.top + this.position.height + 10 + "px", this.picker.style.left = this.position.left + "px";
            var containerInfo = document.createElement("div");
            containerInfo.setAttribute("class", "mp-picker-info"), this.picker.appendChild(containerInfo);
            var containerPicker = document.createElement("div");
            containerPicker.setAttribute("class", "mp-picker-picker"), this.picker.appendChild(containerPicker);
            var containerInfoYear = document.createElement("span");
            containerInfoYear.setAttribute("class", "mp-info-first"), containerInfo.appendChild(containerInfoYear);
            var containerInfoMonth = document.createElement("span");
            containerInfoMonth.setAttribute("class", "mp-info-second"), containerInfo.appendChild(containerInfoMonth);
            var containerPickerYear = document.createElement("div");
            containerPickerYear.setAttribute("class", "mp-picker-site"), containerPicker.appendChild(containerPickerYear);
            var containerPickerYearBefore = document.createElement("a");
            containerPickerYearBefore.setAttribute("class", "mp-picker-site-before mp-picker-site-button"), 
            containerPickerYear.appendChild(containerPickerYearBefore), containerPickerYearBefore.addEventListener("click", function() {
                _this2._siteChange(-1);
            });
            var containerPickerYearThis = document.createElement("span");
            containerPickerYearThis.setAttribute("class", "mp-picker-site-this mp-animate"), 
            containerPickerYear.appendChild(containerPickerYearThis);
            var containerPickerYearNext = document.createElement("a");
            containerPickerYearNext.setAttribute("class", "mp-picker-site-next mp-picker-site-button"), 
            containerPickerYear.appendChild(containerPickerYearNext), containerPickerYearNext.addEventListener("click", function() {
                _this2._siteChange(1);
            });
            var containerPickerChoose = document.createElement("div");
            containerPickerChoose.setAttribute("class", "mp-picker-choose mp-animate"), containerPicker.appendChild(containerPickerChoose);
            var newStyle = '\n      .mp-picker:not([data-theme="dark"]) .mp-picker-info {\n        background-color: ' + this.settings.primaryColor + ';\n      }\n\n      .mp-picker .mp-picker-choose [class*="mp-picker-click"].active,\n      .mp-picker[data-theme="dark"] .mp-picker-choose [class*="mp-picker-click"].active {\n        background-color: ' + this.settings.primaryColor + ';\n      }\n\n      .mp-picker .mp-picker-choose [class*="mp-picker-click"].today:not(.active),\n      .mp-picker[data-theme="dark"] .mp-picker-choose .mp-picker-choose [class*="mp-picker-click"].today:not(.active) {\n        color: ' + this.settings.primaryColor + ";\n      }\n    ", containerStyle = document.createElement("style");
            containerStyle.type = "text/css", containerStyle.appendChild(document.createTextNode(newStyle)), 
            document.querySelector("head").appendChild(containerStyle), this._updatePicker();
        }
    }, {
        key: "_updatePicker",
        value: function() {
            var _this3 = this, containerPickerChoose = this.picker.querySelector(".mp-picker-choose");
            if (containerPickerChoose.innerHTML = "", "date" == this.settings.type) {
                for (var maxMonthLength = 42, week = 7, i = 0; week > i; i++) {
                    var weekDay = i;
                    "monday" == this.settings.weekBegin && (weekDay += 1, weekDay >= week && (weekDay = 0));
                    var containerPickerChooseWeekDay = document.createElement("span");
                    containerPickerChooseWeekDay.setAttribute("class", "mp-picker-header mp-picker-header-day-" + i), 
                    containerPickerChooseWeekDay.innerHTML = moment.weekdaysMin()[weekDay].substr(0, 1), 
                    containerPickerChoose.appendChild(containerPickerChooseWeekDay);
                }
                var thisMonthLenght = this.date.getTime();
                thisMonthLenght = new Date(thisMonthLenght), thisMonthLenght.setDate(1), thisMonthLenght.setMonth(thisMonthLenght.getMonth() + 1), 
                thisMonthLenght.setDate(0);
                var firstWeekDay = thisMonthLenght;
                thisMonthLenght = thisMonthLenght.getDate(), firstWeekDay.setDate(1), firstWeekDay = firstWeekDay.getDay();
                for (var _loop = function(i, _num) {
                    var containerPickerChooseDay = document.createElement("a");
                    containerPickerChooseDay.setAttribute("class", "mp-picker-choose-day");
                    var boolean = i >= firstWeekDay;
                    "monday" == _this3.settings.weekBegin && (boolean = i + 1 >= firstWeekDay), boolean && thisMonthLenght >= _num ? (containerPickerChooseDay.innerHTML = _num, 
                    containerPickerChooseDay.classList.add("mp-picker-click-" + _num), _num++) : (containerPickerChooseDay.innerHTML = " ", 
                    containerPickerChooseDay.classList.add("mp-empty")), containerPickerChoose.appendChild(containerPickerChooseDay), 
                    containerPickerChooseDay.addEventListener("click", function(element) {
                        if (!element.path[0].classList.contains("mp-empty")) {
                            var date = _num - 1, nextDate = _this3.date;
                            nextDate.setDate(date), "direct" == _this3.settings.openOn ? _this3.newDate(nextDate) : _this3.newDate(nextDate, "close");
                        }
                    }), num = _num;
                }, i = 0, num = 1; maxMonthLength > i; i++) _loop(i, num);
            } else if ("month" == this.settings.type) for (var months = 12, _loop2 = function(i) {
                var containerPickerChooseMonth = document.createElement("a");
                containerPickerChooseMonth.setAttribute("class", "mp-picker-click-" + i + " mp-picker-choose-month"), 
                containerPickerChooseMonth.innerHTML = moment.monthsShort("-MMM-")[i], containerPickerChoose.appendChild(containerPickerChooseMonth), 
                containerPickerChooseMonth.addEventListener("click", function() {
                    var month = i, nextDate = _this3.date;
                    nextDate.setMonth(month), _this3.newDate(nextDate, "close");
                });
            }, i = 0; months > i; i++) _loop2(i);
            this.callbackOnLoad();
        }
    }, {
        key: "_siteChange",
        value: function(direction) {
            var _this4 = this, directions = {
                "-1": "left",
                "1": "right"
            }, directionsNot = {
                "-1": "right",
                "1": "left"
            };
            "date" == this.settings.type ? this.date.setMonth(this.date.getMonth() + direction) : "month" == this.settings.type && this.date.setYear(this.date.getYear() + 1900 + direction), 
            this.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-" + directions[direction]), 
            this.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-" + directions[direction]), 
            setTimeout(function() {
                _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-" + directions[direction]), 
                _this4.picker.querySelectorAll(".mp-animate")[0].classList.add("mp-animate-" + directionsNot[direction]), 
                _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-" + directions[direction]), 
                _this4.picker.querySelectorAll(".mp-animate")[1].classList.add("mp-animate-" + directionsNot[direction]), 
                _this4._updatePicker(), setTimeout(function() {
                    _this4.picker.querySelectorAll(".mp-animate")[0].classList.remove("mp-animate-" + directionsNot[direction]), 
                    _this4.picker.querySelectorAll(".mp-animate")[1].classList.remove("mp-animate-" + directionsNot[direction]), 
                    _this4.newDate(_this4.date);
                }, 200);
            }, 200);
        }
    }, {
        key: "open",
        value: function(how) {
            if ("direct" == how && "DIV" == this.element.tagName) return this.element.appendChild(this.picker), 
            this.newDate(null), void this.callbackOnOpen();
            document.body.appendChild(this.picker);
            var top = this.position.top + this.position.height + 5, left = this.position.left, body = document.body.getBoundingClientRect(), picker = this.picker.getBoundingClientRect();
            left + picker.width + 50 > body.width && (left = left - picker.width - 5), top + picker.height + 20 > body.height && (top = top - picker.height - this.position.height - 5), 
            this.picker.style.top = top, this.picker.style.left = left, this.newDate(null), 
            this.callbackOnOpen();
        }
    }, {
        key: "close",
        value: function() {
            this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
        }
    }, {
        key: "newDate",
        value: function(date, value) {
            var dates = date || this.date;
            this.picker.querySelector(".mp-info-first").innerHTML = year, moment.locale(this.settings.lang), 
            this.picker.querySelector(".mp-info-second").innerHTML = moment(dates).format(this.settings.headerFormat), 
            this.picker.querySelector(".mp-picker-site-this").innerHTML = moment(dates).format(this.settings.sitePickerFormat), 
            null != this.picker.querySelector('[class*="mp-picker-click"].active') && this.picker.querySelector('[class*="mp-picker-click"].active').classList.remove("active"), 
            "date" == this.settings.type ? (new Date().getYear() == dates.getYear() && new Date().getMonth() == dates.getMonth() ? this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getDate()).classList.add("today") : null != this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth() + ".today") && this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getDate() + ".today").classList.remove("today"), 
            this.picker.querySelector(".mp-picker-click-" + 1 * dates.getDate()).classList.add("active")) : "month" == this.settings.type && (new Date().getYear() == dates.getYear() ? this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth()).classList.add("today") : null != this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth() + ".today") && this.picker.querySelector(".mp-picker-click-" + 1 * new Date().getMonth() + ".today").classList.remove("today"), 
            this.picker.querySelector(".mp-picker-click-" + 1 * dates.getMonth()).classList.add("active")), 
            dates.setMilliseconds(0), dates.setSeconds(0), dates.setMinutes(0), dates.setHours(0), 
            this.date = dates;
            var output = moment(dates).format(this.settings.outputFormat);
            ("INPUT" == this.element.tagName && "text" == this.element.getAttribute("type") || "DIV" == this.element.tagName) && (this.element.value = output), 
            ("SPAN" == this.settings.outputElement.tagName || "P" == this.settings.outputElement.tagName || "A" == this.settings.outputElement.tagName) && (this.settings.outputElement.innerHTML = output), 
            "close" == value && (this.close(), this.callbackOnNewDate());
        }
    }, {
        key: "callbackOnLoad",
        value: function() {
            "function" == typeof this.settings.onLoad && this.settings.onLoad.call(this, this.date);
        }
    }, {
        key: "callbackOnOpen",
        value: function() {
            "function" == typeof this.settings.onOpen && this.settings.onOpen.call(this, this.date);
        }
    }, {
        key: "callbackOnNewDate",
        value: function() {
            "function" == typeof this.settings.onNewDate && this.settings.onNewDate.call(this, this.date);
        }
    } ]), MaterialDatepicker;
}();