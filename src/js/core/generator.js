// 生成数独解决方案
const Toolkit = require("../core/toolkit");

module.exports = class Generator {
    /*
     * 生成方法入口
    */
    generate() {
        while (!this.internalGenerate()) {
            console.warn("try again");
        }
    }

    /*
     * @private
     * 私有的生成方法
    */
    internalGenerate() {
        // TODO 方法
        this.matrix = Toolkit.matrix.makeMatrix();
        // 随机索引后的数组
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for (let i = 1; i <= 9; i++) {
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
    fillNumber(n) {
        return this.fillRow(n, 0);
    }

    /*
     * @private
     * 向每行填写数字
     * @param n 填入的数字
     * @param rowIndex 行索引
     * @return Boolean
    */
    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }

        const row = this.matrix[rowIndex];    // 第几行
        const orders = this.orders[rowIndex]; // 随机的第几行
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i]; // 随机列索引
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
}