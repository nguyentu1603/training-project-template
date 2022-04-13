/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/components/_documents.ts":
/*!**********************************************!*\
  !*** ./src/scripts/components/_documents.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const renderDocuments = () => {
  class Documents {
    constructor() {
      this.addItem = newItem => {
        if (localStorage.getItem("Documents") === null) {
          localStorage.setItem("Documents", JSON.stringify([newItem]));
          return;
        }

        documents.items = JSON.parse(localStorage.getItem("Documents"));
        documents.items.push(newItem);
        localStorage.clear();
        localStorage.setItem("Documents", JSON.stringify(documents.items));
        renderDocuments();
        showLoadingScreen();
      };

      this.deleteItem = id => {
        const filtered = documents.items.filter(item => item.id != id); //Set new data to LocalStorage

        localStorage.setItem("Documents", JSON.stringify(filtered));
        renderDocuments();
        showLoadingScreen();
      };

      this.items = this.mockupData();
    }

    mockupData() {
      let dataInStorage = localStorage.getItem('Documents');

      if (dataInStorage) {
        return JSON.parse(dataInStorage);
      } else {
        return [];
      }
    }

  }

  const documents = new Documents();

  const getExtension = fileName => {
    const [file, extension] = fileName.split('.');
    return extension;
  };

  const randomNumberID = () => {
    return Math.floor(Math.random() * (1000002 - 1 + 1)) + 1;
  };

  const iconExtension = extension => {
    if (extension.includes("doc")) {
      return `<i class="file-icon fa fa-file-text-o"></i>`;
    } else if (extension.includes("xlsx")) {
      return `<i class="file-icon fa fa-file-excel-o"></i>`;
    } else {
      return `<i class="file-icon fa fa-folder"></i>`;
    }
  };

  document.querySelector("#btn-save").addEventListener("click", () => addFile());
  document.querySelector("#btn-upload").addEventListener("click", () => uploadFile());
  document.querySelector("#btn-save-folder").addEventListener("click", () => addFolder()); // Loading 

  const showLoadingScreen = () => {
    const element = document.querySelector(".loading-screen");
    if (element != null) element.style.visibility = "visible"; //Then redirect to home page

    setTimeout(() => window.location.replace("index.html"), 2300);
  }; // Render Documents


  const renderDocuments = () => {
    const tbody = document.getElementById('data-file');
    documents.items.forEach(item => {
      const tr = document.createElement("tr");
      const iconItem = document.createElement("td");
      iconItem.innerHTML = iconExtension(item.name);
      const fileName = document.createElement("td");
      fileName.innerText = item.name;
      const modifiedAt = document.createElement("td");
      modifiedAt.innerText = item.modifiedAt;
      const modifiedBy = document.createElement("td");
      modifiedBy.innerText = item.modifiedBy;
      tr.append(iconItem, fileName, modifiedAt, modifiedBy);
      const editButton = document.createElement("a");
      editButton.className = "button btn-edit";
      editButton.innerText = "Edit";
      editButton.setAttribute("href", "#updateFile");
      editButton.addEventListener("click", () => showEditForm(item));
      const deleteButton = document.createElement("a");
      deleteButton.className = "button btn-delete";
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", () => deleteFile(item.id));
      tr.append(editButton, deleteButton);
      tbody.append(tr);
    });
  }; // Handle Documents


  renderDocuments();

  const addFile = () => {
    const fileName = document.getElementById("file_name").value;
    let newFile = {
      id: randomNumberID(),
      name: fileName,
      extension: getExtension(fileName),
      createdAt: new Date().toLocaleString(),
      createdBy: "Nguyễn Tú",
      modifiedAt: new Date().toLocaleString(),
      modifiedBy: "Nguyễn Tú"
    };
    documents.addItem(newFile);
  }; // Delete File


  const deleteFile = id => {
    documents.deleteItem(id);
  }; // Edit File


  const showEditForm = item => {
    const fileDetail = document.getElementById("update-file");
    const renderFile = `
            <section id="name">
              <label>File:</label>
              <input id="file" type="text" value="${item.name}" name="File Name" placeholder="Please Enter File Name" required />
              <label>Created At:</label>
              <input id="createdAt" value="${item.createdAt}" type="text" disabled />
              <label>Modified At:</label>
              <input id="modifiedAt" value="${item.modifiedAt}" type="text" disabled />
              <label>Modified By:</label>
              <input id="modifiedBy" value="${item.modifiedBy}" type="text" disabled />
            </section>
             `;
    fileDetail.innerHTML = renderFile;
    document.querySelector("#btn-update").addEventListener("click", () => showUpdateScreen(item));
  };

  const showUpdateScreen = file => {
    //Update File to LocalStorage
    updateFile(file); //Show loading that File was saved

    showLoadingScreen();
  };

  const updateFile = item => {
    const index = documents.items.findIndex(x => x.id === item.id);
    var form = document.getElementById("update-file");
    documents.items[index].name = form.file.value;
    documents.items[index].modifiedAt = new Date().toLocaleString();
    localStorage.setItem("Documents", JSON.stringify(documents.items));
  }; // Upload Multiple File


  const uploadFile = () => {
    const input = document.getElementById('upload-file');
    const files = input.files;

    for (var item of files) {
      let newFile = {
        id: randomNumberID(),
        name: item.name,
        extension: getExtension(item.name),
        createdAt: new Date().toLocaleString(),
        createdBy: "Nguyễn Tú",
        modifiedAt: new Date().toLocaleString(),
        modifiedBy: "Nguyễn Tú"
      };
      documents.addItem(newFile);
    }
  }; // Add Folder


  const addFolder = () => {
    const folderName = document.getElementById("folder_name").value;
    let newFolder = {
      id: randomNumberID(),
      name: folderName,
      createdAt: new Date().toLocaleString(),
      createdBy: "Nguyễn Tú",
      modifiedAt: new Date().toLocaleString(),
      modifiedBy: "Nguyễn Tú",
      files: [],
      subFolders: []
    };
    documents.addItem(newFolder);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (renderDocuments);

/***/ }),

/***/ "./src/scripts/components/_grid.ts":
/*!*****************************************!*\
  !*** ./src/scripts/components/_grid.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const renderGrid = () => {};

/* harmony default export */ __webpack_exports__["default"] = (renderGrid);

/***/ }),

/***/ "./src/scripts/pages/home-page.ts":
/*!****************************************!*\
  !*** ./src/scripts/pages/home-page.ts ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts");
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/_grid */ "./src/scripts/components/_grid.ts");
/* harmony import */ var _components_documents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/_documents */ "./src/scripts/components/_documents.ts");



Object(_utilities_helper__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
  Object(_components_grid__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_components_documents__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./src/scripts/utilities/_helper.ts":
/*!******************************************!*\
  !*** ./src/scripts/utilities/_helper.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ready = fn => {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ready);

/***/ }),

/***/ "./src/styles/pages/home-page.scss":
/*!*****************************************!*\
  !*** ./src/styles/pages/home-page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************!*\
  !*** multi ./src/scripts/pages/home-page.ts ./src/styles/pages/home-page.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/scripts/pages/home-page.ts */"./src/scripts/pages/home-page.ts");
module.exports = __webpack_require__(/*! ./src/styles/pages/home-page.scss */"./src/styles/pages/home-page.scss");


/***/ })

/******/ });
//# sourceMappingURL=home-page.js.map