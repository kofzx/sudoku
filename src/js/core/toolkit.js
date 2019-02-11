/**
 * 矩阵和数组相关工具
 */
const matrixToolkit = {
    /* 
     * private 私有方法
     * 生成9个指定数字的数组 (一行数组)
    */
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    /*
     * 生成一个9x9的二维数组，全部单元填充指定数字
    */
    makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v));
    },
    /**
     * Fisher-Yates Shuffle洗牌算法
     */
    shuffle(array) {
        const endIndex = array.length - 2; // 因为最后一个元素不需要交换
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));   // 随机一个索引
            [array[i], array[j]] = [array[j], array[i]];    // 交换数组元素位置
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
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];   // 行数组
        const col = this.makeRow().map((v, i) => matrix[i][colIndex]);  // 列数组
        const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);  // 第几个宫
        const box = boxToolkit.getBoxCells(matrix, boxIndex);   // 宫数组
        for (let i = 0; i < 9; i++) {
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
const boxToolkit = {
    /*
     * 取得宫里的点坐标数组
     * @param matrix 矩阵
     * @param boxIndex 第几个宫
     * @return Array 宫里的点坐标数组
    */
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let i = 0; i < 9; i++) {
            const rowIndex = startRowIndex + Math.floor(i / 3);
            const colIndex = startColIndex + i % 3;
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
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
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
    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
};
// 工具集

module.exports = class Toolkit {
    /**
     * 矩阵和数组相关的工具
     */
    static get matrix() {
        return matrixToolkit;
    }
    /**
     * 宫坐标系相关工具
    */
    static get box() {
        return boxToolkit;
    }
};