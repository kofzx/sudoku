// 生成数独游戏

const Generator = require("./generator");

module.exports = class Sudoku {
	constructor() {
		const gen = new Generator();
		gen.generate();
		this.solutionMatrix = gen.matrix;
	}

	/*
 	 * 生成用户操作矩阵
	*/
	make(level = 5) {
		// Math.random() * 9 < level	// 被清除的数据
		this.puzzleMatrix = this.solutionMatrix.map(row => {
			return row.map(cell => Math.random() * 9 < level ? 0 : cell);
		})
	}
}