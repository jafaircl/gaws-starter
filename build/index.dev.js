function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Template = (function () {
    function Template(template) {
        this.str = template;
    }
    Template.prototype.parse = function (o) {
        return this._interpolate(this.str)(o);
    };
    Template.prototype._interpolate = function (str) {
        return function interpolate(o) {
            return str.replace(/\{{2}\s*((\w|\.)+)\s*\}{2}/g, function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        };
    };
    return Template;
}());
var selfClosing = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
];
function forEach(arr, tag, attr) {
    if (!tag) {
        tag = 'div';
    }
    var attrStr = '';
    if (attr) {
        for (var i in attr) {
            attrStr += i + "=\"" + attr[i] + "\"";
        }
    }
    if (selfClosing.indexOf(tag) > -1) {
        return arr.reduce(function (sum, i) {
            return sum + ("<" + tag + " " + i + (attrStr !== '' ? ' ' + attrStr : '') + ">");
        }, '');
    }
    else {
        return arr.reduce(function (sum, i) {
            return sum + ("<" + tag + (attrStr !== '' ? ' ' + attrStr : '') + ">" + i + "</" + tag + ">");
        }, '');
    }
}

function every(callback, thisArg) {
    var T, k;
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    var O;
    if ('rows' in thisArg) {
        O = thisArg['rows']();
    }
    else {
        O = thisArg['get']();
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
        T = thisArg;
    }
    k = 0;
    while (O.hasNext()) {
        var kValue = O.next();
        var testResult = callback.call(T, kValue, k, O);
        if (!testResult) {
            return false;
        }
        k++;
    }
    return true;
}

function filter(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    var O, res = new Array(), c = 0, i = 0;
    if ('rows' in thisArg) {
        O = thisArg['rows']();
    }
    else {
        O = thisArg['get']();
    }
    if (thisArg === undefined) {
        while (O.hasNext()) {
            var val = O.next();
            if (callback(val, i, O)) {
                res[c++] = val;
            }
            i++;
        }
    }
    else {
        while (O.hasNext()) {
            var val = O.next();
            if (callback.call(thisArg, val, i, O)) {
                res[c++] = val;
            }
            i++;
        }
    }
    res.length = c;
    return res;
}

function find(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    var o;
    if ('rows' in thisArg) {
        o = thisArg['rows']();
    }
    else {
        o = thisArg['get']();
    }
    var k = 0;
    while (o.hasNext()) {
        var kValue = o.next();
        if (callback.call(thisArg, kValue, k, o)) {
            return kValue;
        }
        k++;
    }
    return undefined;
}

function findIndex(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    var o;
    if ('rows' in thisArg) {
        o = thisArg['rows']();
    }
    else {
        o = thisArg['get']();
    }
    var k = 0;
    while (o.hasNext()) {
        var kValue = o.next();
        if (callback.call(thisArg, kValue, k, o)) {
            return k;
        }
        k++;
    }
    return undefined;
}

function forEach$1(callback, thisArg) {
    var k, O;
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if ('rows' in thisArg) {
        O = thisArg['rows']();
    }
    else {
        O = thisArg['get']();
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    k = 0;
    while (O.hasNext()) {
        var kValue = O.next();
        callback.call(thisArg, kValue, k, O);
        k++;
    }
}

function length(thisArg) {
    var O, i = 0;
    if ('rows' in thisArg) {
        O = thisArg['rows']();
    }
    else {
        O = thisArg['get']();
        return O.totalNumEntities();
    }
    while (O.hasNext()) {
        var k = O.next();
        i++;
    }
    return i;
}

function map(callback, t) {
    var A, k;
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    var O;
    if ('rows' in t) {
        O = t['rows']();
    }
    else {
        O = t['get']();
    }
    A = new Array();
    k = 0;
    while (O.hasNext()) {
        var kValue = O.next();
        var mappedValue = callback.call(t, kValue, k, O);
        A[k] = mappedValue;
        k++;
    }
    return A;
}

function reduce(callback, initialValue, thisArg) {
    if (this == null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    var t, len, k = 0, value;
    if ('rows' in thisArg) {
        t = thisArg['rows']();
    }
    else {
        t = thisArg['get']();
    }
    if (arguments.length >= 2) {
        value = arguments[1];
    }
    else {
        while (t.hasNext()) {
            k++;
        }
        value = t.next();
    }
    while (t.hasNext()) {
        value = callback(value, t.next(), k, t);
        k++;
    }
    return value;
}

function some(callback, thisArg) {
    if (this == null) {
        throw new TypeError('Array.prototype.some called on null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError();
    }
    var t;
    if ('rows' in thisArg) {
        t = thisArg['rows']();
    }
    else {
        t = thisArg['get']();
    }
    var i = 0;
    while (t.hasNext()) {
        if (callback.call(thisArg, t.next(), i, t)) {
            return true;
        }
        i++;
    }
    return false;
}

function slice(thisArg, begin, end) {
    var i = 0, len = 0, tGetter, t, arr;
    if ('rows' in thisArg) {
        tGetter = 'rows';
    }
    else {
        tGetter = 'get';
    }
    t = thisArg[tGetter]();
    while (t.hasNext()) {
        var n = t.next();
        len++;
    }
    t = thisArg[tGetter]();
    // Handle negative value for "begin"
    var start = begin || 0;
    start = (start >= 0) ? start : Math.max(0, len + start);
    // Handle negative value for "end"
    var upTo = (typeof end == 'number') ? Math.min(end, len) : len;
    if (end < 0) {
        upTo = len + end;
    }
    var size = upTo - start;
    arr = [];
    while (t.hasNext() && i < upTo) {
        var k = t.next();
        if (i >= start) {
            arr.push(k);
        }
        i++;
    }
    return arr;
}

var CoreShared = (function () {
    function CoreShared() {
    }
    Object.defineProperty(CoreShared.prototype, "length", {
        get: function () {
            return length(this.arg);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The every() method tests whether all elements in the iterator pass the test implemented by the provided function.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
     *
     * @param {Function} callback
     * @returns {boolean}
     * @memberof Iterator
     */
    CoreShared.prototype.every = function (callback) {
        return every(callback, this.arg);
    };
    /**
     * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     *
     * @param {Function} callback
     * @returns {Array<AdWordsScripts.AdWordsEntity | AdWordsScripts.AdWordsApp.ReportRow>}
     * @memberof Iterator
     */
    CoreShared.prototype.filter = function (callback) {
        return filter(callback, this.arg);
    };
    /**
     * The find() method returns the value of the first element in the iterator that satisfies the provided testing function. Otherwise undefined is returned.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
     *
     * @param {Function} callback
     * @returns {AdWordsScripts.AdWordsEntity}
     * @memberof Iterator
     */
    CoreShared.prototype.find = function (callback) {
        return find(callback, this.arg);
    };
    /**
     * The findIndex() method returns the index of the first element in the iterator that satisfies the provided testing function. Otherwise -1 is returned.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
     *
     * @param {Function} callback
     * @returns {(Number | undefined)}
     * @memberof Iterator
     */
    CoreShared.prototype.findIndex = function (callback) {
        return findIndex(callback, this.arg);
    };
    /**
     * The forEach() method executes a provided function once for each iterator element.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
     *
     * @param {Function} callback
     * @returns {void}
     * @memberof Iterator
     */
    CoreShared.prototype.forEach = function (callback) {
        return forEach$1(callback, this.arg);
    };
    /**
     * The map() method creates a new array with the results of calling a provided function on every element in the calling iterator.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
     *
     * @param {Function} callback
     * @returns {Array<any>}
     * @memberof Iterator
     */
    CoreShared.prototype.map = function (callback) {
        return map(callback, this.arg);
    };
    /**
     * The reduce() method applies a function against an accumulator and each element in the iterator (from left to right) to reduce it to a single value.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
     *
     * @param {Function} callback
     * @param {*} initialValue
     * @returns {*}
     * @memberof CoreShared
     */
    CoreShared.prototype.reduce = function (callback, initialValue) {
        return reduce(callback, initialValue, this.arg);
    };
    /**
     * The slice() method returns a shallow copy of a portion of an iterator into a new array object selected from begin to end (end not included). The original iterator will not be modified.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
     *
     * @param {number} [start=0]
     * @param {number} [end]
     * @returns {(Array<AdWordsScripts.AdWordsEntity | AdWordsScripts.AdWordsApp.ReportRow>)}
     * @memberof CoreShared
     */
    CoreShared.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        return slice(this.arg, start, end);
    };
    /**
     * The some() method tests whether some element in the iterator passes the test implemented by the provided function.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
     *
     * @param {Function} callback
     * @returns {boolean}
     * @memberof Iterator
     */
    CoreShared.prototype.some = function (callback) {
        return some(callback, this.arg);
    };
    return CoreShared;
}());

// import { AdWordsIteratorInput } from './interfaces/AdWordsIterator'
var Iterator = (function (_super) {
    __extends(Iterator, _super);
    // https://github.com/Microsoft/TypeScript/issues/3895
    function Iterator(input) {
        _super.call(this);
        this.entity = input.entity || AdWordsApp.campaigns();
        this.conditions = input.conditions || [];
        this.dateRange = input.dateRange || 'ALL_TIME';
        this.order = input.order || [];
        this.ids = input.ids || [];
        this.limit = input.limit;
        this.arg = this.select();
    }
    Iterator.prototype.chainMethods = function (method, arr, entity) {
        if (entity === void 0) { entity = this.entity; }
        return arr.reduce(function (_sel, _val) {
            return _sel[method](_val);
        }, entity);
    };
    Iterator.prototype.addConditions = function () {
        return this.chainMethods('withCondition', this.conditions);
    };
    Iterator.prototype.addOrder = function () {
        return this.chainMethods('orderBy', this.order, this.addConditions());
    };
    Iterator.prototype.addIds = function () {
        return this.chainMethods('withIds', this.ids, this.addOrder());
    };
    Iterator.prototype.select = function () {
        return this.addIds()
            .forDateRange(this.dateRange)
            .withLimit(this.limit);
    };
    Iterator.prototype.get = function () {
        return this.select().get();
    };
    return Iterator;
}(CoreShared));

var Report = (function (_super) {
    __extends(Report, _super);
    // https://github.com/Microsoft/TypeScript/issues/3895
    function Report(input) {
        _super.call(this);
        this.select = this.variableType(input.select, ', '); // input.select && isArray(input.select) ? input.select.join(', ') : input.select
        this.from = input.from;
        this.where = this.variableType(input.where, ' AND '); // input.where && isArray(input.where) ? input.where.join(' AND ') : input.where
        this.during = this.variableType(input.during, ','); // input.during && isArray(input.during) ? input.during.join(',') : input.during
        this.options = input.options;
        this.arg = this.awql();
    }
    Report.prototype.variableType = function (val, joiner) {
        if (val instanceof Array) {
            return val.join(joiner);
        }
        else {
            return val;
        }
    };
    Report.prototype.awql = function () {
        var query = "SELECT " + this.select + " FROM " + this.from;
        if (this.where !== undefined) {
            query += " WHERE " + this.where;
        }
        if (this.during !== undefined) {
            query += " DURING " + this.during;
        }
        if (this.options !== undefined) {
            return AdWordsApp.report(query, this.options);
        }
        else {
            return AdWordsApp.report(query);
        }
    };
    Report.prototype.rows = function () {
        return this.awql().rows();
    };
    return Report;
}(CoreShared));

// export * from './src/builder'

var template = "<!doctype html> <html> <head> <style> {{ style }} </style> </head> <body> <main> <table> <thead> <td>Ad Group</td> <td>Conversions</td> <td>Clicks</td> <td>Impressions</td> </thead> <tbody> {{ rows }} </tbody> </table> </main> </body> </html> ";

var styles = ".table-item {\n    color: blue\n}";

function main() {
    var hasConversions = new Iterator({
        entity: AdWordsApp.adGroups(),
        conditions: ['Conversions > 0'],
        dateRange: 'LAST_7_DAYS'
    }).map(function (group) {
        var stats = group.getStatsFor('LAST_7_DAYS');
        return forEach([group.getName(), stats.getConversions(), stats.getClicks(), stats.getImpressions()], 'td');
    });
    var body = new Template(template);
    var html = body.parse({
        style: styles,
        rows: forEach(hasConversions, 'tr', { class: 'table-item' })
    });
    MailApp.sendEmail({
        to: 'jfaircloth@cocg.co',
        subject: 'testing',
        htmlBody: html
    });
}
main();
