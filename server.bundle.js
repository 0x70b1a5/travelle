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

	var _connectEnsureLogin = __webpack_require__(32);

	var _connectEnsureLogin2 = _interopRequireDefault(_connectEnsureLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import favicon from 'serve-favicon'
	var MongoClient = __webpack_require__(33).MongoClient;
	var passport = __webpack_require__(34);
	var Strategy = __webpack_require__(35).Strategy;
	var session = __webpack_require__(36);

	var MongoStore = __webpack_require__(37)(session);

	passport.use(new Strategy(function (username, password, cb) {
	  User.findOne({ email: username }, function (err, user) {
	    if (err) {
	      return cb(err);
	    }
	    if (!user) {
	      return cb(null, false);
	    }
	    if (user.password != password) {
	      return cb(null, false);
	    }
	    return cb(null, user);
	  });
	}));

	passport.serializeUser(function (user, cb) {
	  cb(null, user.email);
	});

	passport.deserializeUser(function (email, cb) {
	  User.findOne({ email: email }, function (err, user) {
	    if (err) {
	      return cb(err);
	    }
	    cb(null, user);
	  });
	});

	var DB, User, Ride;
	var app = (0, _express2.default)();
	app.use((0, _compression2.default)());
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { index: false }));
	app.use(session({
	  secret: 's e c u r i t y',
	  resave: false,
	  saveUninitialized: false,
	  store: new MongoStore({
	    url: 'mongodb://localhost:27017/rides'
	  })
	}));
	app.use(__webpack_require__(38).urlencoded({ extended: true }));
	app.use(passport.initialize());
	app.use(passport.session());
	// app.use(favicon(__dirname + 'public/favicon.ico'))

	passport.serializeUser(function (user, done) {
	  done(null, user.email);
	});

	passport.deserializeUser(function (email, done) {
	  User.findOne({ email: email }, function (err, user) {
	    done(err, user);
	  });
	});
	app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
	  res.redirect('/profile');
	});
	app.get('/logout', function (req, res) {
	  req.logout();
	  res.redirect('/');
	});
	app.get('/profile', _connectEnsureLogin2.default.ensureLoggedIn());
	app.get('/data/:ride', function (req, res) {
	  Ride.find({ "ride": req.params.ride }).toArray(function (err, rows) {
	    _assert2.default.equal(err, null);
	    res.json(rows);
	  });
	});
	app.get('/auth/user', _connectEnsureLogin2.default.ensureLoggedIn(), function (req, res) {
	  res.json(req.user);
	});
	app.get('/data/limit/:limit/start/:start', function (req, res) {
	  var limit = Number(req.params.limit);
	  var start = Number(req.params.start);
	  Ride.find().toArray(function (err, rows) {
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
	      Ride.find().toArray(function (err, rows) {
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
	  User = db.collection('users');
	  Ride = db.collection('rides');
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

	var _About = __webpack_require__(13);

	var _About2 = _interopRequireDefault(_About);

	var _Rides = __webpack_require__(14);

	var _Rides2 = _interopRequireDefault(_Rides);

	var _Drive = __webpack_require__(26);

	var _Drive2 = _interopRequireDefault(_Drive);

	var _Home = __webpack_require__(27);

	var _Home2 = _interopRequireDefault(_Home);

	var _Code = __webpack_require__(28);

	var _Code2 = _interopRequireDefault(_Code);

	var _Support = __webpack_require__(29);

	var _Support2 = _interopRequireDefault(_Support);

	var _SignIn = __webpack_require__(30);

	var _SignIn2 = _interopRequireDefault(_SignIn);

	var _Profile = __webpack_require__(31);

	var _Profile2 = _interopRequireDefault(_Profile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/rides', component: _Rides2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/drive', component: _Drive2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _SignIn2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/code', component: _Code2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/support', component: _Support2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _Profile2.default })
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

	var _NavBar = __webpack_require__(11);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	var _Footer = __webpack_require__(12);

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_NavBar2.default, null),
	      _react2.default.createElement(
	        'p',
	        null,
	        '\xA0'
	      ),
	      this.props.children,
	      _react2.default.createElement(_Footer2.default, null)
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

	var _NavLink = __webpack_require__(10);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'NavBar',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'nav',
	        { id: 'mainNav', className: 'navbar navbar-default navbar-fixed-top' },
	        _react2.default.createElement(
	          'div',
	          { className: 'container-fluid bg-primary' },
	          _react2.default.createElement(
	            'div',
	            { className: 'navbar-header' },
	            _react2.default.createElement(
	              'button',
	              { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1' },
	              _react2.default.createElement(
	                'span',
	                { className: 'sr-only' },
	                'Toggle navigation'
	              ),
	              ' Menu ',
	              _react2.default.createElement('i', { className: 'fa fa-bars' })
	            ),
	            _react2.default.createElement(
	              'a',
	              { className: 'navbar-brand page-scroll', href: '/' },
	              'Travelle'
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
	            _react2.default.createElement(
	              'ul',
	              { className: 'nav navbar-nav navbar-right' },
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/about' },
	                  'About'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/rides' },
	                  'Ride'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/drive' },
	                  'Drive'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/login' },
	                  'Sign in'
	                )
	              ),
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/register' },
	                  'Sign up'
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "Footer",
	  render: function render() {
	    return _react2.default.createElement(
	      "section",
	      { className: "bg-dark footer" },
	      _react2.default.createElement(
	        "div",
	        { className: "container" },
	        _react2.default.createElement(
	          "div",
	          { className: "row" },
	          _react2.default.createElement(
	            "div",
	            { className: "col-md-4" },
	            _react2.default.createElement(
	              "h4",
	              null,
	              "Get in Touch"
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "mailto:hello@travelle.com" },
	                "Contact Us"
	              )
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "/support" },
	                "Support"
	              )
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "mailto:hello@travelle.com" },
	                "Feedback"
	              )
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "col-md-4" },
	            _react2.default.createElement(
	              "h4",
	              null,
	              "More Information"
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "/team" },
	                "Our Team"
	              )
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "/jobs" },
	                "Apply to Work at Travelle"
	              )
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "/tos" },
	                "Legal"
	              )
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "col-md-4" },
	            _react2.default.createElement(
	              "h4",
	              null,
	              "Social"
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "//twitter.com" },
	                "Twitter"
	              )
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "//twitter.com" },
	                "Facebook"
	              )
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: "//twitter.com" },
	                "Instagram"
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(15);

	var _axios2 = _interopRequireDefault(_axios);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Table = __webpack_require__(16);

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
/* 15 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Row = __webpack_require__(17);

	var _Row2 = _interopRequireDefault(_Row);

	var _HeaderRow = __webpack_require__(25);

	var _HeaderRow2 = _interopRequireDefault(_HeaderRow);

	var _axios = __webpack_require__(15);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Cell = __webpack_require__(18);

	var _Cell2 = _interopRequireDefault(_Cell);

	var _PopupCell = __webpack_require__(19);

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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _DetailView = __webpack_require__(20);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactSkylight = __webpack_require__(21);

	var _reactSkylight2 = _interopRequireDefault(_reactSkylight);

	var _axios = __webpack_require__(15);

	var _axios2 = _interopRequireDefault(_axios);

	var _styles = __webpack_require__(22);

	var _styles2 = _interopRequireDefault(_styles);

	var _reactOnclickoutside = __webpack_require__(23);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _utils = __webpack_require__(24);

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
/* 21 */
/***/ function(module, exports) {

	module.exports = require("react-skylight");

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports) {

	module.exports = require("react-onclickoutside");

/***/ },
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Cell = __webpack_require__(18);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "Drive",
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement("br", null),
	      _react2.default.createElement(
	        "div",
	        { className: "col-md-9" },
	        _react2.default.createElement(
	          "h1",
	          null,
	          " Post a Ride "
	        )
	      ),
	      _react2.default.createElement(
	        "section",
	        null,
	        _react2.default.createElement(
	          "div",
	          { className: "container" },
	          _react2.default.createElement(
	            "div",
	            { className: "row" },
	            _react2.default.createElement("div", { className: "col-md-2" }),
	            _react2.default.createElement(
	              "div",
	              { className: "col-md-4" },
	              _react2.default.createElement(
	                "p",
	                { className: "text-center" },
	                _react2.default.createElement(
	                  "i",
	                  { className: "fa fa-5x text-primary sr-icons" },
	                  "\uD83D\uDE97"
	                )
	              ),
	              "Thanks for choosing to drive with Travelle. Please note all drivers are expected to abide by our ",
	              _react2.default.createElement(
	                "a",
	                { href: "/code" },
	                "Code of Conduct"
	              ),
	              " while traveling with riders."
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "col-md-4" },
	              _react2.default.createElement(
	                "form",
	                null,
	                _react2.default.createElement(
	                  "div",
	                  { className: "form-group" },
	                  _react2.default.createElement(
	                    "label",
	                    { htmlFor: "driver-email" },
	                    "Email address"
	                  ),
	                  _react2.default.createElement("input", { type: "email", className: "form-control", id: "driver-email", placeholder: "Email" })
	                ),
	                _react2.default.createElement(
	                  "div",
	                  { className: "form-group" },
	                  _react2.default.createElement(
	                    "label",
	                    { htmlFor: "" },
	                    "Password"
	                  ),
	                  _react2.default.createElement("input", { type: "password", className: "form-control", id: "", placeholder: "Password" })
	                ),
	                "City:",
	                _react2.default.createElement(
	                  "select",
	                  { className: "form-control" },
	                  _react2.default.createElement(
	                    "option",
	                    null,
	                    "Montreal"
	                  ),
	                  _react2.default.createElement(
	                    "option",
	                    null,
	                    "Toronto"
	                  ),
	                  _react2.default.createElement(
	                    "option",
	                    null,
	                    "Quebec City"
	                  ),
	                  _react2.default.createElement(
	                    "option",
	                    null,
	                    "New York City"
	                  ),
	                  _react2.default.createElement(
	                    "option",
	                    null,
	                    "Calgary"
	                  )
	                ),
	                _react2.default.createElement(
	                  "div",
	                  { className: "checkbox" },
	                  _react2.default.createElement(
	                    "label",
	                    null,
	                    _react2.default.createElement("input", { type: "checkbox" }),
	                    " Check me out"
	                  )
	                ),
	                _react2.default.createElement(
	                  "button",
	                  { type: "submit", className: "btn btn-default" },
	                  "Submit"
	                )
	              )
	            ),
	            _react2.default.createElement("div", { className: "col-md-2" })
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 27 */
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
	                "section",
	                { id: "landing", className: "text-center bg-dark" },
	                _react2.default.createElement(
	                    "header",
	                    null,
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "\xA0"
	                    ),
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "\xA0"
	                    ),
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "\xA0"
	                    ),
	                    _react2.default.createElement(
	                        "div",
	                        { className: "header-content" },
	                        _react2.default.createElement(
	                            "div",
	                            { className: "header-content-inner" },
	                            _react2.default.createElement(
	                                "h1",
	                                { id: "homeHeading" },
	                                "Travelle"
	                            ),
	                            _react2.default.createElement("hr", null),
	                            _react2.default.createElement(
	                                "p",
	                                null,
	                                "Better carpooling for travelers."
	                            ),
	                            _react2.default.createElement(
	                                "a",
	                                { href: "#about", className: "btn btn-primary btn-xl page-scroll" },
	                                "Find Out More"
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "\xA0"
	                    ),
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "\xA0"
	                    ),
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        "\xA0"
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                "section",
	                { id: "services" },
	                _react2.default.createElement(
	                    "div",
	                    { className: "container" },
	                    _react2.default.createElement(
	                        "div",
	                        { className: "row" },
	                        _react2.default.createElement(
	                            "div",
	                            { className: "col-lg-12 text-center" },
	                            _react2.default.createElement(
	                                "h2",
	                                { className: "section-heading" },
	                                "Why ride with Travelle?"
	                            ),
	                            _react2.default.createElement("hr", { className: "primary" })
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
	                            { className: "col-md-4 text-center" },
	                            _react2.default.createElement(
	                                "div",
	                                { className: "service-box" },
	                                _react2.default.createElement(
	                                    "i",
	                                    { className: "fa fa-5x text-primary sr-icons" },
	                                    "\uD83D\uDE97"
	                                ),
	                                _react2.default.createElement(
	                                    "h3",
	                                    null,
	                                    "Go anywhere"
	                                ),
	                                _react2.default.createElement(
	                                    "p",
	                                    { className: "text-muted" },
	                                    "Our drivers live all across the country, so you're never searching for long."
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "div",
	                            { className: "col-md-4 text-center" },
	                            _react2.default.createElement(
	                                "div",
	                                { className: "service-box" },
	                                _react2.default.createElement(
	                                    "i",
	                                    { className: "fa fa-5x text-primary sr-icons" },
	                                    "\uD83C\uDFC3"
	                                ),
	                                _react2.default.createElement(
	                                    "h3",
	                                    null,
	                                    "Relax on the road"
	                                ),
	                                _react2.default.createElement(
	                                    "p",
	                                    { className: "text-muted" },
	                                    "We make sure our riders and drivers follow our ",
	                                    _react2.default.createElement(
	                                        "a",
	                                        { href: "/code" },
	                                        "Code of Conduct"
	                                    ),
	                                    "."
	                                )
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "div",
	                            { className: "col-md-4 text-center" },
	                            _react2.default.createElement(
	                                "div",
	                                { className: "service-box" },
	                                _react2.default.createElement(
	                                    "i",
	                                    { className: "fa fa-5x text-primary sr-icons" },
	                                    "\uD83D\uDCB0"
	                                ),
	                                _react2.default.createElement(
	                                    "h3",
	                                    null,
	                                    "Budget-friendly"
	                                ),
	                                _react2.default.createElement(
	                                    "p",
	                                    { className: "text-muted" },
	                                    "We know travellers love to save, and we've built our business to match."
	                                )
	                            )
	                        )
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                "section",
	                { className: "bg-primary", id: "about" },
	                _react2.default.createElement(
	                    "div",
	                    { className: "container" },
	                    _react2.default.createElement(
	                        "div",
	                        { className: "row" },
	                        _react2.default.createElement(
	                            "div",
	                            { className: "col-lg-8 col-lg-offset-2 text-center" },
	                            _react2.default.createElement(
	                                "h2",
	                                { className: "section-heading" },
	                                "Simple and affordable rides from one city to the next."
	                            ),
	                            _react2.default.createElement("hr", { className: "light" }),
	                            _react2.default.createElement(
	                                "p",
	                                { className: "text-faded" },
	                                "Book a ride with us in three clicks. Get riding today."
	                            ),
	                            _react2.default.createElement(
	                                "a",
	                                { href: "#services", className: "page-scroll btn btn-default btn-xl sr-button" },
	                                "Book a ride"
	                            )
	                        )
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                "aside",
	                { className: "bg-dark" },
	                _react2.default.createElement(
	                    "div",
	                    { className: "container text-center" },
	                    _react2.default.createElement(
	                        "div",
	                        { className: "call-to-action" },
	                        _react2.default.createElement(
	                            "h2",
	                            null,
	                            "Rather drive?"
	                        ),
	                        _react2.default.createElement("hr", { className: "light" }),
	                        _react2.default.createElement(
	                            "p",
	                            { className: "text-faded" },
	                            "You're the wheels that make our world spin round. If you've got two or more seats and love feeling the rubber hit the road, we'd love to have you with us."
	                        ),
	                        _react2.default.createElement(
	                            "a",
	                            { href: "/drive", className: "btn btn-primary btn-xl sr-button" },
	                            "Sign up to drive"
	                        )
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                "section",
	                { id: "contact" },
	                _react2.default.createElement(
	                    "div",
	                    { className: "container" },
	                    _react2.default.createElement(
	                        "div",
	                        { className: "row" },
	                        _react2.default.createElement(
	                            "div",
	                            { className: "col-lg-8 col-lg-offset-2 text-center" },
	                            _react2.default.createElement(
	                                "h2",
	                                { className: "section-heading" },
	                                "Let's Get In Touch!"
	                            ),
	                            _react2.default.createElement(
	                                "p",
	                                null,
	                                "Do you have an idea that could help us be even better? We're always happy to talk to users and lovers of travel. Drop us a line:"
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "div",
	                            { className: "col-lg-4 col-lg-offset-2 text-center" },
	                            _react2.default.createElement("i", { className: "fa fa-phone fa-3x sr-contact" }),
	                            _react2.default.createElement(
	                                "p",
	                                null,
	                                "123-456-6789"
	                            )
	                        ),
	                        _react2.default.createElement(
	                            "div",
	                            { className: "col-lg-4 text-center" },
	                            _react2.default.createElement("i", { className: "fa fa-envelope-o fa-3x sr-contact" }),
	                            _react2.default.createElement(
	                                "p",
	                                null,
	                                _react2.default.createElement(
	                                    "a",
	                                    { href: "mailto:contact@travelle.com" },
	                                    "contact@travelle.com"
	                                )
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Code',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'Drivin'
	    );
	  }
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Support',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'Drivin'
	    );
	  }
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "SignIn",
	  render: function render() {
	    return _react2.default.createElement(
	      "section",
	      null,
	      _react2.default.createElement(
	        "div",
	        { className: "container" },
	        _react2.default.createElement(
	          "div",
	          { className: "row" },
	          _react2.default.createElement(
	            "div",
	            { className: "col-md-4" },
	            _react2.default.createElement(
	              "form",
	              { className: "form-signin", action: "/login", method: "post" },
	              _react2.default.createElement(
	                "h2",
	                { className: "form-signin-heading" },
	                "Please sign in"
	              ),
	              _react2.default.createElement(
	                "label",
	                { htmlFor: "inputEmail", className: "sr-only" },
	                "Email address"
	              ),
	              _react2.default.createElement("input", { name: "username", type: "email", id: "inputEmail", className: "form-control", placeholder: "Email address", required: "", autofocus: "", autoComplete: "off" }),
	              _react2.default.createElement(
	                "label",
	                { htmlFor: "inputPassword", className: "sr-only" },
	                "Password"
	              ),
	              _react2.default.createElement("input", { name: "password", type: "password", id: "inputPassword", className: "form-control", placeholder: "Password", required: "", autoComplete: "off" }),
	              _react2.default.createElement(
	                "div",
	                { className: "checkbox" },
	                _react2.default.createElement(
	                  "label",
	                  null,
	                  _react2.default.createElement("input", { type: "checkbox", value: "remember-me" }),
	                  " Remember me"
	                )
	              ),
	              _react2.default.createElement("input", { className: "btn btn-lg btn-primary btn-block", value: "Sign In", type: "submit" })
	            ),
	            "Don't have an account? ",
	            _react2.default.createElement(
	              "a",
	              { href: "/register" },
	              "Register"
	            )
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(15);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Profile',
	  getInitialState: function getInitialState() {
	    return {
	      user: "Nobody"
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    _axios2.default.get('/auth/user').then(function (res) {
	      console.log("res", res);
	      _this.setState({
	        user: res.data
	      });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'section',
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: 'container' },
	        this.state.user.email
	      )
	    );
	  }
	});

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("connect-ensure-login");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("connect-mongo");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ }
/******/ ]);