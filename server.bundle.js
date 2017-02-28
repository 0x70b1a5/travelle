/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _assert = __webpack_require__(1);

	var _assert2 = _interopRequireDefault(_assert);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(4);

	var _compression2 = _interopRequireDefault(_compression);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	var _reactRouter = __webpack_require__(7);

	var _routes = __webpack_require__(8);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import favicon from 'serve-favicon'
	var MongoClient = __webpack_require__(25).MongoClient;

	var DB;
	var app = (0, _express2.default)();
	app.use((0, _compression2.default)());

	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { index: false }));
	// app.use(favicon(__dirname + 'public/favicon.ico'))

	app.get('/data/:ride', function (req, res) {
	  DB.collection('rides').find({ "ride": req.params.ride }).toArray(function (err, rows) {
	    _assert2.default.equal(err, null);
	    res.json(rows);
	  });
	});
	app.get('/data/limit/:limit/start/:start', function (req, res) {
	  var limit = Number(req.params.limit);
	  var start = Number(req.params.start);
	  DB.collection('rides').find().toArray(function (err, rows) {
	    res.json(rows.slice(start, limit + start));
	  });
	});
	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      res.sendFile(_path2.default.resolve(__dirname + 'public/index.html'));
	    } else if (req.url == '/data') {
	      DB.collection('rides').find().toArray(function (err, rows) {
	        _assert2.default.equal(err, null);
	        res.json(rows);
	      });
	    } else {
	      // it's a 404
	      res.status(404).send("Not Found");
	    }
	  });
	});

	var PORT = process.env.PORT || 8080;

	MongoClient.connect("mongodb://localhost:27017/rides", function (err, db) {

	  _assert2.default.equal(null, err);
	  DB = db;
	  console.log("connected to mdb");

	  app.listen(PORT, function () {
	    console.log('Production Express server running at localhost:' + PORT);
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	var _App = __webpack_require__(9);

	var _App2 = _interopRequireDefault(_App);

	var _About = __webpack_require__(11);

	var _About2 = _interopRequireDefault(_About);

	var _Rides = __webpack_require__(12);

	var _Rides2 = _interopRequireDefault(_Rides);

	var _Home = __webpack_require__(24);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/rides', component: _Rides2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default })
	);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(10);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        _react2.default.createElement(
	          'div',
	          { className: 'navbar-header' },
	          _react2.default.createElement(
	            'div',
	            { className: 'navbar-brand' },
	            'Travelle'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'navbar-collapse collapse' },
	          _react2.default.createElement(
	            'ul',
	            { className: 'nav navbar-nav' },
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/', onlyActiveOnIndex: true },
	                'Home'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/rides' },
	                'Rides'
	              )
	            ),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement(
	                _NavLink2.default,
	                { to: '/about' },
	                'About'
	              )
	            )
	          )
	        )
	      ),
	      this.props.children,
	      _react2.default.createElement(
	        'div',
	        { className: 'container' },
	        _react2.default.createElement(
	          'div',
	          { className: 'navBtn' },
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/contact' },
	            'Contact'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'navBtn' },
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/support' },
	            'Support'
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'NavLink',
	  render: function render() {
	    return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'activeNav' }));
	  }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'About',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Aboot'
	      )
	    );
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(13);

	var _axios2 = _interopRequireDefault(_axios);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Table = __webpack_require__(14);

	var _Table2 = _interopRequireDefault(_Table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Rides',
	  getInitialState: function getInitialState() {
	    return {
	      headers: ['From', 'To', 'Departure', 'Passengers', 'Driver', 'Join'],
	      rows: [{
	        'from': "",
	        'to': "",
	        'departure': "",
	        'passengers': "",
	        'driver': "",
	        'join': ""
	      }]
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    _axios2.default.get('/data/limit/50/start/0').then(function (res) {
	      _this.setState({
	        rows: res.data
	      });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'rideTable' },
	      _react2.default.createElement(_Table2.default, { headers: this.state.headers, rows: this.state.rows, theme: "" })
	    );
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Row = __webpack_require__(15);

	var _Row2 = _interopRequireDefault(_Row);

	var _HeaderRow = __webpack_require__(23);

	var _HeaderRow2 = _interopRequireDefault(_HeaderRow);

	var _axios = __webpack_require__(13);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Table',
	  getInitialState: function getInitialState() {
	    return {
	      headers: this.props.headers || [],
	      rows: this.props.rows || [],
	      start: 0
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      headers: nextProps.headers,
	      rows: nextProps.rows,
	      start: nextProps.start || this.state.start
	    });
	  },
	  updateRides: function updateRides(start) {
	    var _this = this;

	    var newStart = this.state.start + start;
	    _axios2.default.get('/data/limit/50/start/' + newStart).then(function (res) {
	      var newRows = res.data;
	      if (newRows.length > 0) {
	        _this.setState({
	          start: newStart,
	          rows: newRows
	        });
	      }
	    });
	  },
	  render: function render() {
	    var _this2 = this;

	    var backButton = null;
	    if (this.state.start >= 50) {
	      backButton = _react2.default.createElement(
	        'a',
	        { href: '#hed' },
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              return _this2.updateRides(-50);
	            } },
	          'previous 50 rides'
	        )
	      );
	    }
	    var frwdButton = _react2.default.createElement(
	      'a',
	      { href: '#hed' },
	      _react2.default.createElement(
	        'button',
	        { onClick: function onClick() {
	            return _this2.updateRides(50);
	          } },
	        'next 50 rides'
	      )
	    );
	    var paginators = _react2.default.createElement(
	      'div',
	      { className: "paginators" },
	      frwdButton,
	      backButton
	    );

	    return _react2.default.createElement(
	      'div',
	      { id: 'table' },
	      paginators,
	      _react2.default.createElement(
	        'table',
	        { className: 'table' },
	        _react2.default.createElement(
	          'thead',
	          null,
	          _react2.default.createElement(_HeaderRow2.default, { cells: this.props.headers, theme: this.props.theme + " header" })
	        ),
	        _react2.default.createElement(
	          'tbody',
	          null,
	          this.state.rows.map(function (row, i) {
	            return _react2.default.createElement(_Row2.default, { key: i, cells: row, theme: _this2.props.theme });
	          })
	        )
	      ),
	      paginators
	    );
	  }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Cell = __webpack_require__(16);

	var _Cell2 = _interopRequireDefault(_Cell);

	var _PopupCell = __webpack_require__(17);

	var _PopupCell2 = _interopRequireDefault(_PopupCell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Row',
	  render: function render() {
	    var theme = this.props.theme;
	    var cols = this.props.cells;
	    return _react2.default.createElement(
	      'tr',
	      { className: "row" },
	      _react2.default.createElement(_Cell2.default, { theme: theme + " break-word", data: cols.from }),
	      _react2.default.createElement(_Cell2.default, { theme: theme + " break-word", data: cols.to }),
	      _react2.default.createElement(_Cell2.default, { theme: theme + " break-word", data: cols.departure }),
	      _react2.default.createElement(_Cell2.default, { theme: theme + " break-word", data: cols.passengers }),
	      _react2.default.createElement(_Cell2.default, { theme: theme + " break-word", data: cols.driver }),
	      _react2.default.createElement(_PopupCell2.default, { ride: cols.ride })
	    );
	  }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "Cell",
	  render: function render() {
	    return _react2.default.createElement(
	      "td",
	      { className: "cell " + this.props.theme },
	      this.props.data,
	      this.props.children
	    );
	  }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _DetailView = __webpack_require__(18);

	var _DetailView2 = _interopRequireDefault(_DetailView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'PopupCell',
	  getInitialState: function getInitialState() {
	    return {
	      ride: this.props.ride
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      ride: nextProps.ride
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'td',
	      { className: "cell " + this.props.theme },
	      _react2.default.createElement(_DetailView2.default, { ride: this.state.ride })
	    );
	  }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactSkylight = __webpack_require__(19);

	var _reactSkylight2 = _interopRequireDefault(_reactSkylight);

	var _axios = __webpack_require__(13);

	var _axios2 = _interopRequireDefault(_axios);

	var _styles = __webpack_require__(20);

	var _styles2 = _interopRequireDefault(_styles);

	var _reactOnclickoutside = __webpack_require__(21);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _utils = __webpack_require__(22);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getShortDate = _utils2.default.getShortDate;

	var DetailView = function (_React$Component) {
	  _inherits(DetailView, _React$Component);

	  function DetailView(props) {
	    _classCallCheck(this, DetailView);

	    var _this = _possibleConstructorReturn(this, (DetailView.__proto__ || Object.getPrototypeOf(DetailView)).call(this, props));

	    _this.state = {
	      ride: props.ride,
	      title: "Join Ride",
	      data: {
	        date: 'none',
	        from: 'none',
	        to: 'none',
	        departure: 'none',
	        passengers: 'none',
	        driver: 'none'
	      }
	    };
	    return _this;
	  }

	  _createClass(DetailView, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState({
	        ride: nextProps.ride,
	        data: nextProps.data
	      });
	    }
	  }, {
	    key: 'queryAndShow',
	    value: function queryAndShow() {
	      _axios2.default.get('/data/' + this.state.ride).then(function (res) {
	        var data = res.data[0] || this.state.data;
	        var contents = _react2.default.createElement(
	          'div',
	          { style: { padding: "1em", wordWrap: "break-word" } },
	          _react2.default.createElement(
	            'p',
	            null,
	            'date: data.date'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'from: data.from'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'to: data.to'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'to: data.departure'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'passengers: data.passengers'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'driver: data.driver'
	          ),
	          _react2.default.createElement(
	            'div',
	            null,
	            'Join this ride?',
	            _react2.default.createElement(
	              'button',
	              null,
	              'Join'
	            )
	          )
	        );
	        console.log(contents);
	        this.setState({
	          data: contents
	        });
	      }.bind(this));
	      this.refs.simpleDialog.show();
	    }
	  }, {
	    key: 'handleClickOutside',
	    value: function handleClickOutside(e) {
	      this.refs.simpleDialog.hide();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'section',
	          null,
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.queryAndShow();
	              } },
	            'view sidebar'
	          )
	        ),
	        _react2.default.createElement(
	          _reactSkylight2.default,
	          {
	            closeButtonStyle: _styles2.default.close,
	            ref: 'simpleDialog',
	            showOverlay: false,
	            title: this.state.title },
	          this.state.data
	        )
	      );
	    }
	  }]);

	  return DetailView;
	}(_react2.default.Component);

	exports.default = (0, _reactOnclickoutside2.default)(DetailView);

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("react-skylight");

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var styles = {
	  details: {
	    background: '#010101',
	    borderRadius: "0 0 0 0",
	    position: "fixed",
	    right: "auto",
	    left: "auto",
	    bottom: "auto",
	    top: "auto",
	    margin: "-15% 0 0 10%",
	    height: "auto",
	    padding: 0,
	    borderRight: "1px solid #fff",
	    borderBottom: "1px solid #fff",
	    boxShadow: "none"
	  },

	  title: {
	    padding: "1em",
	    background: "#0a0a0a",
	    margin: 0
	  },

	  close: {
	    fontSize: "2em",
	    fontFamily: "Montserrat, sans-serif"
	  },

	  overlay: {
	    bottom: 0,
	    right: 0,
	    left: 0,
	    top: "auto"
	  }
	};

	exports.default = styles;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("react-onclickoutside");

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var utils = {
	  getShortDate: function getShortDate(date) {
	    if (date == null) {
	      return "never";
	    } else {
	      return String(new Date(date * 1000));
	    }
	    return date;
	  }
	};

	exports.default = utils;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Cell = __webpack_require__(16);

	var _Cell2 = _interopRequireDefault(_Cell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'HeaderRow',
	  render: function render() {
	    var theme = this.props.theme;
	    var cells = this.props.cells.map(function (cell, i) {
	      return _react2.default.createElement(_Cell2.default, { key: i, theme: theme, data: cell });
	    });
	    return _react2.default.createElement(
	      'tr',
	      { className: "row" },
	      cells
	    );
	  }
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "Home",
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(
	        "div",
	        { className: "jumbotron" },
	        _react2.default.createElement(
	          "div",
	          { className: "container" },
	          _react2.default.createElement(
	            "h1",
	            null,
	            "Travelle"
	          ),
	          _react2.default.createElement(
	            "p",
	            null,
	            "Better carpooling for travellers."
	          ),
	          _react2.default.createElement(
	            "a",
	            { className: "btn btn-primary btn-lg" },
	            "Book a ride"
	          ),
	          _react2.default.createElement(
	            "a",
	            { className: "btn btn-lg" },
	            "Why Travelle?"
	          )
	        )
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "container" },
	        _react2.default.createElement(
	          "div",
	          { className: "row" },
	          _react2.default.createElement(
	            "div",
	            { className: "col-md-6" },
	            _react2.default.createElement(
	              "h2",
	              null,
	              "Simple and affordable rides to major cities."
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "col-md-6" },
	            _react2.default.createElement(
	              "p",
	              null,
	              "We connect drivers with extra space to people who know how to find a deal."
	            ),
	            _react2.default.createElement(
	              "a",
	              { className: "btn btn-info btn-lg" },
	              "Get riding"
	            ),
	            _react2.default.createElement(
	              "a",
	              { className: "btn btn-lg" },
	              "Apply to drive"
	            ),
	            _react2.default.createElement(
	              "a",
	              { className: "btn btn-lg" },
	              "Learn more"
	            )
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ }
/******/ ]);