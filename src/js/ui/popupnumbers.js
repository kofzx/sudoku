// 处理弹出的操作面板

module.exports = class PopupNumbers {
	constructor($panel) {
		this._$panel = $panel.hide().removeClass("hide");	// 控制面板句柄

		// 控制面板操作
		this._$panel.on("click", "span", e => {
			const $cell = this._$targetCell;	// 待填入数字的方格
			const text = parseInt($cell.text());

			const $span = $(e.target);	// 点击的控制面板的方格
			// 点击了粉色
			if ($span.hasClass("mark1")) { 

				if (text) {
					if ($cell.hasClass("mark1")) {
						$cell.removeClass("mark1");
					} else {
						$cell.removeClass("mark2")
							.addClass("mark1");
					}
				}

			} 
			// 点击了绿色
			else if ($span.hasClass("mark2")) {

				if (text) {
					if ($cell.hasClass("mark2")) {
						$cell.removeClass("mark2");
					} else {
						$cell.removeClass("mark1")
							.addClass("mark2");
					}
				}

			} 
			// 点击了白色
			else if ($span.hasClass("empty")) {
				// 取消数字和mark
				$cell
					.removeClass("mark1 mark2")
					.text(0)
					.addClass("empty");
			} 
			// 剩下的就是数字了
			else {
				// 回填数字
				$cell.removeClass("empty")
					.text($span.text());
			}

			this.hide();
		});
	}

	/*
	 * 弹出控制面板方法
	*/
	popup($cell) {
		// if (this._$panel.css("display") === "block") {
		// 	this.hide();
		// 	return;
		// }

		// 点击非已填数字
		if (!$cell.hasClass("fixed")) {
			this._$targetCell = $cell;
			const { left, top } = $cell.position();
			this._$panel
				.css({
					left: `${left}px`,
					top: `${top}px`
				})
				.show();	
		}
	}

	/*
	 * 隐藏控制面板
	*/
	hide() {
		this._$panel.hide();
	}
}