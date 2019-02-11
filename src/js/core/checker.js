// 检查数据的解决方案

/*
 * 检查一组数是否有违规值
 * @param array 要检查的数组
 * @return 返回一个标记数组，违规值会被标记false
*/
function checkArray(array) {
	const length = array.length;
	const marks = new Array(length);	// 标记数组
	marks.fill(true);

	for (let i = 0; i < length - 1; i++) {
		// 已经检查过的，跳过
		if (!marks[i]) {
			continue;
		}

		const value = array[i];
		// 输入0时的判断
		if (!value) {
			marks[i] = false;
			continue;
		}
		// 比较array[i]后面的所有数
		for (let j = i + 1; j < length; j++) {
			// 出现重复值的话
			if (value === array[j]) {
				marks[i] = marks[j] = false;
			}
		}
	}
	return marks;
}

const Toolkit = require("./toolkit");

module.exports = class Checker {
	constructor(matrix) {
		this._matrix = matrix;
		this._matrixMarks = Toolkit.matrix.makeMatrix(true);	// 初始标记矩阵
	}

	get matrixMarks() {
		return this._matrixMarks;
	}

	get isSuccess() {
		return this._success;
	}

	/*
	 * 检查总方法
	 * @return Boolean 是否所有的标记为成功
	*/
	check() {
		this.checkRows();
		this.checkCols();
		this.checkBoxes();

		// 检查是否成功
		this._success = this._matrixMarks.every(row => row.every(mark => mark));
		return this._success;
	}

	/*
	 * @private
	 * 检查行数据
	*/
	checkRows() {
		for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
			const row = this._matrix[rowIndex];	// 行数组
			const marks = checkArray(row);	// 标记数组

			for (let colIndex = 0; colIndex < marks.length; colIndex++) {
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
	checkCols() {
		for (let colIndex = 0; colIndex < 9; colIndex++) {
			const cols = [];	// 列数组
			for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
				cols[rowIndex] = this._matrix[rowIndex][colIndex];
			}

			const marks = checkArray(cols);	// 标记数组
			for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
				if (!marks[rowIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}

	/*
	 * @private
	 * 检查宫数据
	*/
	checkBoxes() {
		for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
			const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);	// 宫坐标集
			const masks = checkArray(boxes);

			for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
				if (!masks[cellIndex]) {
					const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}
}

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