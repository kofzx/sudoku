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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 矩阵和数组相关工具
 */
var matrixToolkit = {
    /* 
     * private 私有方法
     * 生成9个指定数字的数组 (一行数组)
    */
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },

    /*
     * 生成一个9x9的二维数组，全部单元填充指定数字
    */
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return Array.from({ length: 9 }, function () {
            return _this.makeRow(v);
        });
    },

    /**
     * Fisher-Yates Shuffle洗牌算法
     */
    shuffle: function shuffle(array) {
        var endIndex = array.length - 2; // 因为最后一个元素不需要交换
        for (var i = 0; i <= endIndex; i++) {
            var j = i + Math.floor(Math.random() * (array.length - i)); // 随机一个索引
            // 交换数组元素位置
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },

    /**
     * 根据游戏规则检查指定位置是否可以填写数字
     * @param matrix 主体矩阵
     * @param n 填入的数
     * @param rowIndex 行索引
     * @param colIndex 随机列索引
     * @return Boolean
     */
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        var row = matrix[rowIndex]; // 行数组
        var col = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        }); // 列数组

        var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$convertTo.boxIndex; // 第几个宫


        var box = boxToolkit.getBoxCells(matrix, boxIndex); // 宫数组
        for (var i = 0; i < 9; i++) {
            // 判断相应的 行、列、宫 是否已填写过数值
            if (row[i] === n || col[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
};

/**
 * 宫坐标系工具
 */
var boxToolkit = {
    /*
     * 取得宫里的点坐标数组
     * @param matrix 矩阵
     * @param boxIndex 第几个宫
     * @return Array 宫里的点坐标数组
    */
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var i = 0; i < 9; i++) {
            var rowIndex = startRowIndex + Math.floor(i / 3);
            var colIndex = startColIndex + i % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },


    /*
     * 根据 行跟列索引 转换成宫坐标
     * @param rowIndex 行索引
     * @param colIndex 列索引
     * @return Object {
          boxIndex 第几个宫
          cellIndex 宫里的第几个格
       }
    */
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },


    /*
     * 根据 宫坐标 转换成行跟列索引
     * @param boxIndex 第几个宫
     * @param cellIndex 宫里的第几个格
     * @return Object {
          rowIndex 行索引
          colIndex 列索引
       }
    */
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
// 工具集

module.exports = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        /**
         * 矩阵和数组相关的工具
         */
        get: function get() {
            return matrixToolkit;
        }
        /**
         * 宫坐标系相关工具
        */

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(6);

var grid = new Grid($("#container"));
grid.build();
grid.layout();

var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", function (e) {
	if (grid.check()) {
		alert("成功!");
	}
});
$("#reset").on("click", function (e) {
	grid.reset();
});
$("#clear").on("click", function (e) {
	grid.clear();
});
$("#rebuild").on("click", function (e) {
	grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成九宫格
var Toolkit = __webpack_require__(0);
var Sudoku = __webpack_require__(3);
var Checker = __webpack_require__(5);

var Grid = function () {
	function Grid(container) {
		_classCallCheck(this, Grid);

		this._$container = container;
	}

	/*
  * 渲染界面的方式
 */


	_createClass(Grid, [{
		key: "build",
		value: function build() {
			var sudoku = new Sudoku();
			sudoku.make();
			var matrix = sudoku.puzzleMatrix;

			var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
			var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

			// 返回一个由matrix作模板的span节点数组
			var $cells = matrix.map(function (rowValues) {
				return rowValues.map(function (cellValue, colIndex) {
					return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
				});
			});

			// 将每个spanArray添加到一个“一行”的div,返回一个“9行”的完整dom结构数组
			var $divArray = $cells.map(function ($spanArray, rowIndex) {
				return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
			});

			this._$container.append($divArray);
		}

		/*
   * 调整方块的高度
  */

	}, {
		key: "layout",
		value: function layout() {
			var width = $("span:first", this._$container).width();
			$("span", this._$container).height(width).css({
				"line-height": width + "px",
				"font-size": width < 32 ? width / 2 + "px" : ""
			});
		}

		/*
   * 检查用户填写结果，成功则提示，失败则显示错误位置的标记
  */

	}, {
		key: "check",
		value: function check() {
			// 从界面获取需要检查的数据
			var $rows = this._$container.children();
			var data = $rows.map(function (rowIndex, div) {
				return $(div).children().map(function (colIndex, span) {
					return parseInt($(span).text()) || 0;
				});
			}).toArray().map(function ($data) {
				return $data.toArray();
			});

			var checker = new Checker(data);
			if (checker.check()) {
				return true;
			}

			// 检查不成功，进行标记
			var marks = checker._matrixMarks;
			$rows.each(function (rowIndex, div) {
				$(div).children().each(function (colIndex, span) {
					var $span = $(span);
					// 查错操作
					if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
						$span.removeClass("error");
					} else {
						$span.addClass("error");
					}
				});
			});
		}

		/*
   * 重置当前数独的初始状态
  */

	}, {
		key: "reset",
		value: function reset() {
			this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
		}

		/*
   * 清除错误标记
  */

	}, {
		key: "clear",
		value: function clear() {
			this._$container.find("span.error").removeClass("error");
		}

		/*
   * 重建游戏
  */

	}, {
		key: "rebuild",
		value: function rebuild() {
			this._$container.empty();
			this.build();
			this.layout();
		}
	}, {
		key: "bindPopup",
		value: function bindPopup(popupNumbers) {
			this._$container.on("click", "span", function (e) {
				var $cell = $(e.target); // 等价于this对象 (span元素)
				popupNumbers.popup($cell);
			});
		}
	}]);

	return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独游戏

var Generator = __webpack_require__(4);

module.exports = function () {
	function Sudoku() {
		_classCallCheck(this, Sudoku);

		var gen = new Generator();
		gen.generate();
		this.solutionMatrix = gen.matrix;
	}

	/*
 	 * 生成用户操作矩阵
 */


	_createClass(Sudoku, [{
		key: "make",
		value: function make() {
			var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

			// Math.random() * 9 < level	// 被清除的数据
			this.puzzleMatrix = this.solutionMatrix.map(function (row) {
				return row.map(function (cell) {
					return Math.random() * 9 < level ? 0 : cell;
				});
			});
		}
	}]);

	return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独解决方案
var Toolkit = __webpack_require__(0);

module.exports = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",

        /*
         * 生成方法入口
        */
        value: function generate() {
            while (!this.internalGenerate()) {
                console.warn("try again");
            }
        }

        /*
         * @private
         * 私有的生成方法
        */

    }, {
        key: "internalGenerate",
        value: function internalGenerate() {
            // TODO 方法
            this.matrix = Toolkit.matrix.makeMatrix();
            // 随机索引后的数组
            this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });

            for (var i = 1; i <= 9; i++) {
                if (!this.fillNumber(i)) {
                    return false;
                }
            }
            return true;
        }

        /*
         * @private
         * 填写数字
         * @param n 填入的数字
         * @return Boolean
        */

    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }

        /*
         * @private
         * 向每行填写数字
         * @param n 填入的数字
         * @param rowIndex 行索引
         * @return Boolean
        */

    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }

            var row = this.matrix[rowIndex]; // 第几行
            var orders = this.orders[rowIndex]; // 随机的第几行
            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i]; // 随机列索引
                // 如果这个位置已经有值，跳过
                if (row[colIndex]) {
                    continue;
                }

                // 根据游戏规则检查此位置是否可以填
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }

                // 执行填写
                row[colIndex] = n;

                // 进行下一行的填写,如果填失败的话
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }

                return true;
            }
            return false;
        }
    }]);

    return Generator;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 检查数据的解决方案

/*
 * 检查一组数是否有违规值
 * @param array 要检查的数组
 * @return 返回一个标记数组，违规值会被标记false
*/
function checkArray(array) {
	var length = array.length;
	var marks = new Array(length); // 标记数组
	marks.fill(true);

	for (var i = 0; i < length - 1; i++) {
		// 已经检查过的，跳过
		if (!marks[i]) {
			continue;
		}

		var value = array[i];
		// 输入0时的判断
		if (!value) {
			marks[i] = false;
			continue;
		}
		// 比较array[i]后面的所有数
		for (var j = i + 1; j < length; j++) {
			// 出现重复值的话
			if (value === array[j]) {
				marks[i] = marks[j] = false;
			}
		}
	}
	return marks;
}

var Toolkit = __webpack_require__(0);

module.exports = function () {
	function Checker(matrix) {
		_classCallCheck(this, Checker);

		this._matrix = matrix;
		this._matrixMarks = Toolkit.matrix.makeMatrix(true); // 初始标记矩阵
	}

	_createClass(Checker, [{
		key: "check",


		/*
   * 检查总方法
   * @return Boolean 是否所有的标记为成功
  */
		value: function check() {
			this.checkRows();
			this.checkCols();
			this.checkBoxes();

			// 检查是否成功
			this._success = this._matrixMarks.every(function (row) {
				return row.every(function (mark) {
					return mark;
				});
			});
			return this._success;
		}

		/*
   * @private
   * 检查行数据
  */

	}, {
		key: "checkRows",
		value: function checkRows() {
			for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
				var row = this._matrix[rowIndex]; // 行数组
				var marks = checkArray(row); // 标记数组

				for (var colIndex = 0; colIndex < marks.length; colIndex++) {
					if (!marks[colIndex]) {
						this._matrixMarks[rowIndex][colIndex] = false;
					}
				}
			}
		}

		/*
   * @private
   * 检查列数据
  */

	}, {
		key: "checkCols",
		value: function checkCols() {
			for (var colIndex = 0; colIndex < 9; colIndex++) {
				var cols = []; // 列数组
				for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
					cols[rowIndex] = this._matrix[rowIndex][colIndex];
				}

				var marks = checkArray(cols); // 标记数组
				for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
					if (!marks[_rowIndex]) {
						this._matrixMarks[_rowIndex][colIndex] = false;
					}
				}
			}
		}

		/*
   * @private
   * 检查宫数据
  */

	}, {
		key: "checkBoxes",
		value: function checkBoxes() {
			for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
				var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex); // 宫坐标集
				var masks = checkArray(boxes);

				for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
					if (!masks[cellIndex]) {
						var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
						    rowIndex = _Toolkit$box$convertF.rowIndex,
						    colIndex = _Toolkit$box$convertF.colIndex;

						this._matrixMarks[rowIndex][colIndex] = false;
					}
				}
			}
		}
	}, {
		key: "matrixMarks",
		get: function get() {
			return this._matrixMarks;
		}
	}, {
		key: "isSuccess",
		get: function get() {
			return this._success;
		}
	}]);

	return Checker;
}();

// 单元测试
/*const Generator = require("./generator");
const gen = new Generator();
gen.generate();
const matrix = gen.matrix;

const checker = new Checker(matrix);
console.log(checker.check());
console.log(checker._matrixMarks);

matrix[1][1] = 0;
matrix[2][3] = matrix[3][2] = 5;

const checker2 = new Checker(matrix);
console.log(checker2.check());
console.log(checker2._matrixMarks);*/

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 处理弹出的操作面板

module.exports = function () {
	function PopupNumbers($panel) {
		var _this = this;

		_classCallCheck(this, PopupNumbers);

		this._$panel = $panel.hide().removeClass("hide"); // 控制面板句柄

		// 控制面板操作
		this._$panel.on("click", "span", function (e) {
			var $cell = _this._$targetCell; // 待填入数字的方格
			var text = parseInt($cell.text());

			var $span = $(e.target); // 点击的控制面板的方格
			// 点击了粉色
			if ($span.hasClass("mark1")) {

				if (text) {
					if ($cell.hasClass("mark1")) {
						$cell.removeClass("mark1");
					} else {
						$cell.removeClass("mark2").addClass("mark1");
					}
				}
			}
			// 点击了绿色
			else if ($span.hasClass("mark2")) {

					if (text) {
						if ($cell.hasClass("mark2")) {
							$cell.removeClass("mark2");
						} else {
							$cell.removeClass("mark1").addClass("mark2");
						}
					}
				}
				// 点击了白色
				else if ($span.hasClass("empty")) {
						// 取消数字和mark
						$cell.removeClass("mark1 mark2").text(0).addClass("empty");
					}
					// 剩下的就是数字了
					else {
							// 回填数字
							$cell.removeClass("empty").text($span.text());
						}

			_this.hide();
		});
	}

	/*
  * 弹出控制面板方法
 */


	_createClass(PopupNumbers, [{
		key: "popup",
		value: function popup($cell) {
			// if (this._$panel.css("display") === "block") {
			// 	this.hide();
			// 	return;
			// }

			// 点击非已填数字
			if (!$cell.hasClass("fixed")) {
				this._$targetCell = $cell;

				var _$cell$position = $cell.position(),
				    left = _$cell$position.left,
				    top = _$cell$position.top;

				this._$panel.css({
					left: left + "px",
					top: top + "px"
				}).show();
			}
		}

		/*
   * 隐藏控制面板
  */

	}, {
		key: "hide",
		value: function hide() {
			this._$panel.hide();
		}
	}]);

	return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map