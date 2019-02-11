// 生成九宫格
const Toolkit = require("../core/toolkit");
const Sudoku = require("../core/sudoku");
const Checker = require("../core/checker");

class Grid {
	constructor(container) {
		this._$container = container;
	}

	/*
	 * 渲染界面的方式
	*/
	build() {
		const sudoku = new Sudoku();
		sudoku.make();
		const matrix = sudoku.puzzleMatrix;

		const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
		const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

		// 返回一个由matrix作模板的span节点数组
		const $cells = matrix.map(rowValues => rowValues
			.map((cellValue, colIndex) => {
				return $("<span>")
					.addClass(colGroupClasses[colIndex % 3])
					.addClass(cellValue ? "fixed" : "empty")
					.text(cellValue);
			}));

		// 将每个spanArray添加到一个“一行”的div,返回一个“9行”的完整dom结构数组
		const $divArray = $cells.map(($spanArray, rowIndex) => {
			return $("<div>").addClass("row")
							 .addClass(rowGroupClasses[rowIndex % 3])
							 .append($spanArray);
		});

		this._$container.append($divArray);
	}

	/*
	 * 调整方块的高度
	*/
	layout() {
		const width = $("span:first", this._$container).width();
		$("span", this._$container)
			.height(width)
		    .css({
		    	"line-height": `${width}px`,
		    	"font-size": width < 32 ? `${width / 2}px` : ""
		    });
	}

	/*
	 * 检查用户填写结果，成功则提示，失败则显示错误位置的标记
	*/
	check() {
		// 从界面获取需要检查的数据
		const $rows = this._$container.children();
		const data = $rows
			.map((rowIndex, div) => {
				return $(div).children()
					.map((colIndex, span) => parseInt($(span).text()) || 0);
			})
			.toArray()
			.map($data => $data.toArray());

		const checker = new Checker(data);
		if (checker.check()) {
			return true;
		}

		// 检查不成功，进行标记
		const marks = checker._matrixMarks;
		$rows.each((rowIndex, div) => {
			$(div).children()
				.each((colIndex, span) => {
					const $span = $(span);
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
	reset() {
		this._$container.find("span:not(.fixed)")
			.removeClass("error mark1 mark2")
			.addClass("empty")
			.text(0);
	}

	/*
	 * 清除错误标记
	*/
	clear() {
		this._$container.find("span.error")
			.removeClass("error");
	}

	/*
	 * 重建游戏
	*/
	rebuild() {
		this._$container.empty();
		this.build();
		this.layout();
	}

	bindPopup(popupNumbers) {
		this._$container.on("click", "span", e => {
			const $cell = $(e.target);	// 等价于this对象 (span元素)
			popupNumbers.popup($cell);
		});
	}
}

module.exports = Grid;