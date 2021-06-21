(function() {
var exports = {};
exports.id = "pages/userauth/login";
exports.ids = ["pages/userauth/login"];
exports.modules = {

/***/ "./src/API/UserAuthen.js":
/*!*******************************!*\
  !*** ./src/API/UserAuthen.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-undef */

/* eslint-disable prefer-promise-reject-errors */

axios__WEBPACK_IMPORTED_MODULE_0___default().interceptors.response.use(response => response, err => err.response);

class UserAuthenAPIClass {
  constructor() {
    _defineProperty(this, "uploadProfilePic", (files, user) => new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("username", user);
      formData.append("profile-pic", files);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("http://localhost/uh/addProfilePic", formData).then(res => {
        if (res.data.success) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    }));

    _defineProperty(this, "login", ({
      username,
      password,
      remMe
    }) => new Promise((resolve, reject) => {
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("http://localhost/uh/login", {
        params: {
          username,
          password,
          remMe
        },
        withCredentials: true
      }).then(res => {
        if (res.status !== 200) {
          if (!res.data.massage) {
            reject({
              data: {
                massage: "An unexpected error occured"
              }
            });
          } else {
            reject(res);
          }
        } else {
          resolve(res.data);
        }
      }).catch(() => {
        reject({
          err: {
            massage: "An Unexpected Error Occured"
          }
        });
      });
    }));

    _defineProperty(this, "authen", () => new Promise((resolve, reject) => {
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("http://localhost/uh/authen", {
        withCredentials: true
      }).then(res => {
        if (res.data.done === true || res.data.done === false) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      }).catch(() => {
        reject("Error");
      });
    }));

    _defineProperty(this, "signUp", newUser => new Promise((resolve, reject) => {
      const {
        user,
        pass,
        eml,
        profilePic,
        confPass
      } = newUser;
      const username = user.trim().toLowerCase();
      const password = pass.trim();
      const confirmPassword = confPass.trim();
      const email = eml.trim();

      if (username !== "" || password !== "" || email !== "") {
        if (password.length < 8) {
          reject({
            data: {
              massage: "Password Must Be more Than 8 Characters"
            }
          });
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
          reject({
            data: {
              massage: "Give Valid Email"
            }
          });
        } else if (password !== confirmPassword) {
          reject({
            data: {
              massage: "Password and Confirm Password are not equal"
            }
          });
        } else {
          const sendData = {
            username,
            password,
            email,
            likedPosts: [],
            profilePic: ""
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post("http://localhost/uh/signup", sendData).then(res => {
            if (res.data.exists === false && res.data.done === true) {
              this.uploadProfilePic(profilePic, res.data.id).then(resp => {
                if (!resp) {
                  reject({
                    data: {
                      massage: "Cannot Upload Photo"
                    }
                  });
                } else {
                  resolve(res.data);
                }
              });
            } else {
              reject(res);
            }
          });
        }
      } else {
        reject({
          data: {
            massage: "Everything is Required"
          }
        });
      }
    }));

    _defineProperty(this, "logout", () => new Promise(resolve => {
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("http://localhost/uh/logout", {
        withCredentials: true
      }).then(() => {
        resolve("hi");
      });
    }));

    _defineProperty(this, "verifyMail", newUser => new Promise((resolve, reject) => {
      const {
        user,
        pass,
        eml,
        confPass
      } = newUser;
      const username = user.trim().toLowerCase();
      const password = pass.trim();
      const confirmPassword = confPass.trim();
      const email = eml.trim();

      if (username !== "" || password !== "" || email !== "") {
        if (password.length < 8) {
          reject({
            data: {
              massage: "Password Must Be more Than 8 Characters"
            }
          });
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
          reject({
            data: {
              massage: "Give Valid Email"
            }
          });
        } else if (password !== confirmPassword) {
          reject({
            data: {
              massage: "Password and Confirm Password are not equal"
            }
          });
        } else {
          const sendData = {
            user,
            email
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post("http://localhost/uh/verify", sendData).then(res => {
            if (res.data.success && !res.data.exists) {
              resolve(res.data);
            } else {
              reject(res);
            }
          });
        }
      } else {
        reject({
          data: {
            massage: "Everything is Required"
          }
        });
      }
    }));
  }

}

const UserAuthenAPI = new UserAuthenAPIClass();
/* harmony default export */ __webpack_exports__["default"] = (UserAuthenAPI);

/***/ }),

/***/ "./src/pages/UI-COMPS/Input.jsx":
/*!**************************************!*\
  !*** ./src/pages/UI-COMPS/Input.jsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "D:\\Rafsan's Folder M\\Coding\\Web_Development\\Online Posting App\\Deploy\\src\\pages\\UI-COMPS\\Input.jsx";


function Input(props) {
  const {
    value,
    setValue,
    type,
    name,
    classP
  } = props;

  const handleInput = e => {
    setValue(e.target.value);
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: `${classP}-field ${name.replace(/\s/g, '-').toLowerCase()}`,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
      type: type,
      value: value,
      onChange: handleInput,
      placeholder: name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/pages/userauth/login/index.js":
/*!*******************************************!*\
  !*** ./src/pages/userauth/login/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _API_UserAuthen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../API/UserAuthen */ "./src/API/UserAuthen.js");
/* harmony import */ var _UI_COMPS_Input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../UI-COMPS/Input */ "./src/pages/UI-COMPS/Input.jsx");


var _jsxFileName = "D:\\Rafsan's Folder M\\Coding\\Web_Development\\Online Posting App\\Deploy\\src\\pages\\userauth\\login\\index.js";

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable no-unused-vars */





function Login() {
  const {
    0: User,
    1: setUser
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const {
    0: Pass,
    1: setPass
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const {
    0: status,
    1: setstatus
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('NoStatus');
  const {
    0: remMe,
    1: setRemMe
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const Router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();

  const setLogin = async () => {
    setLoading(true);

    try {
      const x = await _API_UserAuthen__WEBPACK_IMPORTED_MODULE_3__.default.login({
        username: User,
        password: Pass,
        remMe
      });
      Router.push('/');
      setLoading(false);
    } catch (err) {
      setstatus(err.data.massage);
      setLoading(false);
    }
  };

  const remMeCheck = checked => {
    setRemMe(!checked);
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: "login-page-cont",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "login-form-cont",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: `${loading ? 'loading-cont' : 'load-none'}`
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: `login-form${loading ? ' loading' : ''}`,
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: "supp",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              className: "login-brand-cont"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 40,
              columnNumber: 15
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("i", {
              className: "fas fa-sign-in-alt"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 41,
              columnNumber: 15
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              className: "login-head",
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
                children: "Login"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 43,
                columnNumber: 17
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 42,
              columnNumber: 15
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_UI_COMPS_Input__WEBPACK_IMPORTED_MODULE_4__.default, {
                type: "text",
                name: "Username",
                value: User,
                setValue: setUser,
                classP: "login"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 46,
                columnNumber: 17
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_UI_COMPS_Input__WEBPACK_IMPORTED_MODULE_4__.default, {
                type: "password",
                name: "Password",
                value: Pass,
                setValue: setPass,
                classP: "login"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 47,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 45,
              columnNumber: 15
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              className: "login-remme",
              onClick: () => remMeCheck(remMe),
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: remMe ? 'checkbox checked' : 'checkbox'
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 56,
                columnNumber: 17
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                children: "Remember Me"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 58,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 55,
              columnNumber: 15
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              className: "buttons",
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                className: "login",
                type: "button",
                onClick: setLogin,
                children: "Login"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 62,
                columnNumber: 17
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 61,
              columnNumber: 15
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
              className: "login-foot",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                type: "button",
                onClick: () => {
                  Router.push('/userauth/signup');
                },
                children: "Create Account"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 67,
                columnNumber: 17
              }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                style: status === 'NoStatus' ? {
                  opacity: 0
                } : {
                  opacity: 1
                },
                children: status
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 75,
                columnNumber: 17
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 66,
              columnNumber: 15
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 39,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, this)
  }, void 0, false);
}

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./src/pages/userauth/login/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcHAtc2VydmVyLy4vc3JjL0FQSS9Vc2VyQXV0aGVuLmpzIiwid2VicGFjazovL29wcC1zZXJ2ZXIvLi9zcmMvcGFnZXMvVUktQ09NUFMvSW5wdXQuanN4Iiwid2VicGFjazovL29wcC1zZXJ2ZXIvLi9zcmMvcGFnZXMvdXNlcmF1dGgvbG9naW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vb3BwLXNlcnZlci9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vb3BwLXNlcnZlci9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vb3BwLXNlcnZlci9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vb3BwLXNlcnZlci9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIl0sIm5hbWVzIjpbIkF4aW9zIiwicmVzcG9uc2UiLCJlcnIiLCJVc2VyQXV0aGVuQVBJQ2xhc3MiLCJmaWxlcyIsInVzZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJ0aGVuIiwicmVzIiwiZGF0YSIsInN1Y2Nlc3MiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicmVtTWUiLCJwYXJhbXMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJzdGF0dXMiLCJtYXNzYWdlIiwiY2F0Y2giLCJkb25lIiwibmV3VXNlciIsInBhc3MiLCJlbWwiLCJwcm9maWxlUGljIiwiY29uZlBhc3MiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJjb25maXJtUGFzc3dvcmQiLCJlbWFpbCIsImxlbmd0aCIsInRlc3QiLCJzZW5kRGF0YSIsImxpa2VkUG9zdHMiLCJleGlzdHMiLCJ1cGxvYWRQcm9maWxlUGljIiwiaWQiLCJyZXNwIiwiVXNlckF1dGhlbkFQSSIsIklucHV0IiwicHJvcHMiLCJ2YWx1ZSIsInNldFZhbHVlIiwidHlwZSIsIm5hbWUiLCJjbGFzc1AiLCJoYW5kbGVJbnB1dCIsImUiLCJ0YXJnZXQiLCJyZXBsYWNlIiwiTG9naW4iLCJVc2VyIiwic2V0VXNlciIsInVzZVN0YXRlIiwiUGFzcyIsInNldFBhc3MiLCJzZXRzdGF0dXMiLCJzZXRSZW1NZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiUm91dGVyIiwidXNlUm91dGVyIiwic2V0TG9naW4iLCJ4IiwicHVzaCIsInJlbU1lQ2hlY2siLCJjaGVja2VkIiwib3BhY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7QUFDQTtBQUVBQSxzRUFBQSxDQUNHQyxRQUFELElBQWNBLFFBRGhCLEVBRUdDLEdBQUQsSUFBU0EsR0FBRyxDQUFDRCxRQUZmOztBQUlBLE1BQU1FLGtCQUFOLENBQXlCO0FBQUE7QUFBQSw4Q0FDSixDQUFDQyxLQUFELEVBQVFDLElBQVIsS0FDakIsSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUMvQixZQUFNQyxRQUFRLEdBQUcsSUFBSUMsUUFBSixFQUFqQjtBQUNBRCxjQUFRLENBQUNFLE1BQVQsQ0FBZ0IsVUFBaEIsRUFBNEJOLElBQTVCO0FBQ0FJLGNBQVEsQ0FBQ0UsTUFBVCxDQUFnQixhQUFoQixFQUErQlAsS0FBL0I7QUFFQUosdURBQUEsQ0FBVyxtQ0FBWCxFQUFnRFMsUUFBaEQsRUFBMERHLElBQTFELENBQWdFQyxHQUFELElBQVM7QUFDdEUsWUFBSUEsR0FBRyxDQUFDQyxJQUFKLENBQVNDLE9BQWIsRUFBc0I7QUFDcEJSLGlCQUFPLENBQUMsSUFBRCxDQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0xDLGdCQUFNLENBQUMsS0FBRCxDQUFOO0FBQ0Q7QUFDRixPQU5EO0FBT0QsS0FaRCxDQUZxQjs7QUFBQSxtQ0FnQmYsQ0FBQztBQUFFUSxjQUFGO0FBQVlDLGNBQVo7QUFBc0JDO0FBQXRCLEtBQUQsS0FDTixJQUFJWixPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQy9CUixzREFBQSxDQUFVLDJCQUFWLEVBQXVDO0FBQ3JD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dXRoL2xvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLXByb21pc2UtcmVqZWN0LWVycm9ycyAqL1xyXG5pbXBvcnQgQXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5BeGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxyXG4gIChyZXNwb25zZSkgPT4gcmVzcG9uc2UsXHJcbiAgKGVycikgPT4gZXJyLnJlc3BvbnNlLFxyXG4pO1xyXG5jbGFzcyBVc2VyQXV0aGVuQVBJQ2xhc3Mge1xyXG4gIHVwbG9hZFByb2ZpbGVQaWMgPSAoZmlsZXMsIHVzZXIpID0+XHJcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChcInVzZXJuYW1lXCIsIHVzZXIpO1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoXCJwcm9maWxlLXBpY1wiLCBmaWxlcyk7XHJcblxyXG4gICAgICBBeGlvcy5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdC91aC9hZGRQcm9maWxlUGljXCIsIGZvcm1EYXRhKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIGxvZ2luID0gKHsgdXNlcm5hbWUsIHBhc3N3b3JkLCByZW1NZSB9KSA9PlxyXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBBeGlvcy5nZXQoXCJodHRwOi8vbG9jYWxob3N0L3VoL2xvZ2luXCIsIHtcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHVzZXJuYW1lLFxyXG4gICAgICAgICAgcGFzc3dvcmQsXHJcbiAgICAgICAgICByZW1NZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGlmICghcmVzLmRhdGEubWFzc2FnZSkge1xyXG4gICAgICAgICAgICAgIHJlamVjdCh7IGRhdGE6IHsgbWFzc2FnZTogXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VyZWRcIiB9IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICByZWplY3QoeyBlcnI6IHsgbWFzc2FnZTogXCJBbiBVbmV4cGVjdGVkIEVycm9yIE9jY3VyZWRcIiB9IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIGF1dGhlbiA9ICgpID0+XHJcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIEF4aW9zLmdldChcImh0dHA6Ly9sb2NhbGhvc3QvdWgvYXV0aGVuXCIsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pXHJcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmRvbmUgPT09IHRydWUgfHwgcmVzLmRhdGEuZG9uZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QocmVzLmRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgIHJlamVjdChcIkVycm9yXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIHNpZ25VcCA9IChuZXdVc2VyKSA9PlxyXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCB7IHVzZXIsIHBhc3MsIGVtbCwgcHJvZmlsZVBpYywgY29uZlBhc3MgfSA9IG5ld1VzZXI7XHJcbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gdXNlci50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgY29uc3QgcGFzc3dvcmQgPSBwYXNzLnRyaW0oKTtcclxuICAgICAgY29uc3QgY29uZmlybVBhc3N3b3JkID0gY29uZlBhc3MudHJpbSgpO1xyXG4gICAgICBjb25zdCBlbWFpbCA9IGVtbC50cmltKCk7XHJcbiAgICAgIGlmICh1c2VybmFtZSAhPT0gXCJcIiB8fCBwYXNzd29yZCAhPT0gXCJcIiB8fCBlbWFpbCAhPT0gXCJcIikge1xyXG4gICAgICAgIGlmIChwYXNzd29yZC5sZW5ndGggPCA4KSB7XHJcbiAgICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgICBkYXRhOiB7IG1hc3NhZ2U6IFwiUGFzc3dvcmQgTXVzdCBCZSBtb3JlIFRoYW4gOCBDaGFyYWN0ZXJzXCIgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAhL15bYS16QS1aMC05LiEjJCUmJyorLz0/Xl9ge3x9fi1dK0BbYS16QS1aMC05LV0rKD86XFwuW2EtekEtWjAtOS1dKykqJC8udGVzdChcclxuICAgICAgICAgICAgZW1haWwsXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZWplY3QoeyBkYXRhOiB7IG1hc3NhZ2U6IFwiR2l2ZSBWYWxpZCBFbWFpbFwiIH0gfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKSB7XHJcbiAgICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgICBkYXRhOiB7IG1hc3NhZ2U6IFwiUGFzc3dvcmQgYW5kIENvbmZpcm0gUGFzc3dvcmQgYXJlIG5vdCBlcXVhbFwiIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgc2VuZERhdGEgPSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZCxcclxuICAgICAgICAgICAgZW1haWwsXHJcbiAgICAgICAgICAgIGxpa2VkUG9zdHM6IFtdLFxyXG4gICAgICAgICAgICBwcm9maWxlUGljOiBcIlwiLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIEF4aW9zLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0L3VoL3NpZ251cFwiLCBzZW5kRGF0YSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5leGlzdHMgPT09IGZhbHNlICYmIHJlcy5kYXRhLmRvbmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICB0aGlzLnVwbG9hZFByb2ZpbGVQaWMocHJvZmlsZVBpYywgcmVzLmRhdGEuaWQpLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzcCkge1xyXG4gICAgICAgICAgICAgICAgICByZWplY3QoeyBkYXRhOiB7IG1hc3NhZ2U6IFwiQ2Fubm90IFVwbG9hZCBQaG90b1wiIH0gfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZWplY3QocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdCh7IGRhdGE6IHsgbWFzc2FnZTogXCJFdmVyeXRoaW5nIGlzIFJlcXVpcmVkXCIgfSB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIGxvZ291dCA9ICgpID0+XHJcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBBeGlvcy5nZXQoXCJodHRwOi8vbG9jYWxob3N0L3VoL2xvZ291dFwiLCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KS50aGVuKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoXCJoaVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gIHZlcmlmeU1haWwgPSAobmV3VXNlcikgPT5cclxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgeyB1c2VyLCBwYXNzLCBlbWwsIGNvbmZQYXNzIH0gPSBuZXdVc2VyO1xyXG4gICAgICBjb25zdCB1c2VybmFtZSA9IHVzZXIudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gcGFzcy50cmltKCk7XHJcbiAgICAgIGNvbnN0IGNvbmZpcm1QYXNzd29yZCA9IGNvbmZQYXNzLnRyaW0oKTtcclxuICAgICAgY29uc3QgZW1haWwgPSBlbWwudHJpbSgpO1xyXG4gICAgICBpZiAodXNlcm5hbWUgIT09IFwiXCIgfHwgcGFzc3dvcmQgIT09IFwiXCIgfHwgZW1haWwgIT09IFwiXCIpIHtcclxuICAgICAgICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgICAgZGF0YTogeyBtYXNzYWdlOiBcIlBhc3N3b3JkIE11c3QgQmUgbW9yZSBUaGFuIDggQ2hhcmFjdGVyc1wiIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgIS9eW2EtekEtWjAtOS4hIyQlJicqKy89P15fYHt8fX4tXStAW2EtekEtWjAtOS1dKyg/OlxcLlthLXpBLVowLTktXSspKiQvLnRlc3QoXHJcbiAgICAgICAgICAgIGVtYWlsLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVqZWN0KHsgZGF0YTogeyBtYXNzYWdlOiBcIkdpdmUgVmFsaWQgRW1haWxcIiB9IH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFzc3dvcmQgIT09IGNvbmZpcm1QYXNzd29yZCkge1xyXG4gICAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgICAgZGF0YTogeyBtYXNzYWdlOiBcIlBhc3N3b3JkIGFuZCBDb25maXJtIFBhc3N3b3JkIGFyZSBub3QgZXF1YWxcIiB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHNlbmREYXRhID0ge1xyXG4gICAgICAgICAgICB1c2VyLFxyXG4gICAgICAgICAgICBlbWFpbCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBBeGlvcy5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdC91aC92ZXJpZnlcIiwgc2VuZERhdGEpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyAmJiAhcmVzLmRhdGEuZXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoeyBkYXRhOiB7IG1hc3NhZ2U6IFwiRXZlcnl0aGluZyBpcyBSZXF1aXJlZFwiIH0gfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmNvbnN0IFVzZXJBdXRoZW5BUEkgPSBuZXcgVXNlckF1dGhlbkFQSUNsYXNzKCk7XHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJBdXRoZW5BUEk7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5mdW5jdGlvbiBJbnB1dChwcm9wcykge1xyXG4gIGNvbnN0IHsgdmFsdWUsIHNldFZhbHVlLCB0eXBlLCBuYW1lLCBjbGFzc1AgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGhhbmRsZUlucHV0ID0gKGUpID0+IHtcclxuICAgIHNldFZhbHVlKGUudGFyZ2V0LnZhbHVlKTtcclxuICB9O1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7Y2xhc3NQfS1maWVsZCAke25hbWUucmVwbGFjZSgvXFxzL2csICctJykudG9Mb3dlckNhc2UoKX1gfT5cclxuICAgICAgey8qIDxwPntuYW1lfTwvcD4gKi99XHJcbiAgICAgIDxpbnB1dCB0eXBlPXt0eXBlfSB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXtoYW5kbGVJbnB1dH0gcGxhY2Vob2xkZXI9e25hbWV9IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dDtcclxuIiwiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVXNlckF1dGhlbkFQSSBmcm9tICcuLi8uLi8uLi9BUEkvVXNlckF1dGhlbic7XHJcbmltcG9ydCBJbnB1dCBmcm9tICcuLi8uLi9VSS1DT01QUy9JbnB1dCc7XHJcblxyXG5mdW5jdGlvbiBMb2dpbigpIHtcclxuICBjb25zdCBbVXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW1Bhc3MsIHNldFBhc3NdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldHN0YXR1c10gPSB1c2VTdGF0ZSgnTm9TdGF0dXMnKTtcclxuICBjb25zdCBbcmVtTWUsIHNldFJlbU1lXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBSb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBzZXRMb2dpbiA9IGFzeW5jICgpID0+IHtcclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB4ID0gYXdhaXQgVXNlckF1dGhlbkFQSS5sb2dpbih7XHJcbiAgICAgICAgdXNlcm5hbWU6IFVzZXIsXHJcbiAgICAgICAgcGFzc3dvcmQ6IFBhc3MsXHJcbiAgICAgICAgcmVtTWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICBSb3V0ZXIucHVzaCgnLycpO1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzZXRzdGF0dXMoZXJyLmRhdGEubWFzc2FnZSk7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgcmVtTWVDaGVjayA9IChjaGVja2VkKSA9PiB7XHJcbiAgICBzZXRSZW1NZSghY2hlY2tlZCk7XHJcbiAgfTtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dpbi1wYWdlLWNvbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luLWZvcm0tY29udFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake2xvYWRpbmcgPyAnbG9hZGluZy1jb250JyA6ICdsb2FkLW5vbmUnfWB9IC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGxvZ2luLWZvcm0ke2xvYWRpbmcgPyAnIGxvYWRpbmcnIDogJyd9YH0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VwcFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9naW4tYnJhbmQtY29udFwiIC8+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLXNpZ24taW4tYWx0XCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luLWhlYWRcIj5cclxuICAgICAgICAgICAgICAgIDxoMT5Mb2dpbjwvaDE+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJVc2VybmFtZVwiIHZhbHVlPXtVc2VyfSBzZXRWYWx1ZT17c2V0VXNlcn0gY2xhc3NQPVwibG9naW5cIiAvPlxyXG4gICAgICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJQYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtQYXNzfVxyXG4gICAgICAgICAgICAgICAgICBzZXRWYWx1ZT17c2V0UGFzc31cclxuICAgICAgICAgICAgICAgICAgY2xhc3NQPVwibG9naW5cIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luLXJlbW1lXCIgb25DbGljaz17KCkgPT4gcmVtTWVDaGVjayhyZW1NZSl9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3JlbU1lID8gJ2NoZWNrYm94IGNoZWNrZWQnIDogJ2NoZWNrYm94J30gLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8cD5SZW1lbWJlciBNZTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImxvZ2luXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3NldExvZ2lufT5cclxuICAgICAgICAgICAgICAgICAgTG9naW5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9naW4tZm9vdFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFJvdXRlci5wdXNoKCcvdXNlcmF1dGgvc2lnbnVwJyk7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIENyZWF0ZSBBY2NvdW50XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxwIHN0eWxlPXtzdGF0dXMgPT09ICdOb1N0YXR1cycgPyB7IG9wYWNpdHk6IDAgfSA6IHsgb3BhY2l0eTogMSB9fT57c3RhdHVzfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dpbjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiXSwic291cmNlUm9vdCI6IiJ9