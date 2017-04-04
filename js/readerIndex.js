$(function () {

	// 封装localStorage方法，避免别人误操作
	var Util = (function () {
		var prefix = 'html5_reader_';
		var storageGetter = function (key) {
			return localStorage.getItem(prefix + key);
		}
		var storageSetter = function (key, val) {
			return localStorage.setItem(prefix + key, val);
		}
		return {
			storageGetter: storageGetter,
			storageSetter: storageSetter
		}
	})();

	// 定义一个全局变量
	var myModule = {
		top_nav: $('#top_nav'),
		foot_nav: $('#foot_nav'),
		foot_nav_font: $('#foot_nav_font'),
		nav_pannel: $('#nav_pannel'),
		win: $(window),
		doc: $(document),
		large_font_btn: $('#large_font_btn'),
		small_font_btn: $('#small_font_btn'),
		originalFontSize: Util.storageGetter('font_size'),
		color: Util.storageGetter('current_font_color'),
		bg_color: Util.storageGetter('current_bg_color'),
		active_id: Util.storageGetter('active_id'),
		dayIco: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAYAAACMGIOFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFN0E3M0I0Mjc4NDExRTU5RkYxQjg1Rjk2QkEyNzBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFN0E3M0I1Mjc4NDExRTU5RkYxQjg1Rjk2QkEyNzBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0U3QTczQjIyNzg0MTFFNTlGRjFCODVGOTZCQTI3MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0U3QTczQjMyNzg0MTFFNTlGRjFCODVGOTZCQTI3MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6o6V5PAAADu0lEQVR42uyaTUgVURTHm/cigiS1LEitoHoqbgtcZAStngtDoYxa9rFsYYuWfUBhuSjCneiylkH2oavoEZlC4aYsM9toakWLnpsWyfQfOMJrOvdjZs6bedQc+OF7d9499/y9M/fj3HFc110Xo3WAYfp8BozG0agTs8hFsIM+L4H6f1GkvzEnjkYz6/4DS0WmIlORSlsq+bxcKSI3gkHwBlwSGA3PkrjPNE+GnhXAZYprkOLUjOmYQjT0un/aMHAMdcqNQ3GUWq+ujqknt/i+nwZDcc1vih4cojh0cQbqyQaw4P5tSfQo14OezYNGXV0b5zly5Le+mEX2KQTmTHVtl3U58BQ0lpQtgJ2Gei2gE7SDVrANVIMf4Bt4B56Dh+C9wdc80/4RMGteTNr/J/09+lhzW3WBCTeYTVA91WPwKGgPBrldS9kFBkA/qGOuN4FnbjTz6jczvuuoXa/93UHilnxmjoMVV8ZWyJ9IbFICz4FVV9ZWyW9FiDwGfmmCnQIXQBuoBxvobxuVT2nqen57khbpPYNFRYBzoNtiPnXod3MKP0VqJxGRjmaQGQXVAf1VUz3VYOQkIbJLEdADkA3pM0v1OetKQuQ4E8gHUBXxEfDqzzC+x+MW2aL4b+eFRuu8wn9LGH9hN82dTNlrMCa02xgjf347GmdmoJ0puyu8rbrHlB2MU2QrUzYuLLJg2a6VyA7KbLsMi3Tdb9sVuwRJ+2TZrjF+b+4pTd2rkk/1hky4Z+vBapkz7lzW3Ri/ze3KpTqKTNlmYYG1TNlKmJRJpiSDxpkqq/aVKdsrLHIPU/ZFkwFUxu/dYk8M3c3ZNNjnKzsEXgmKPKxo12/G+MOOri+YslPCPXnSst2yTSEjTNkBkBcSmCd/Nu1aDF/hl15cDmdGYO26SXrtGuUs5AZT1kQrn2xIn1la6TQx1/rDT0TR9pMFxUL6fogeraJ6nBWS2k+uZQZUyauPtOO38dNNv1cltZqTzvH0WOZ49oMaqlND321yPCfSbF2ad5UXufaMFiIKLER9BqOK9Ea4m2CZEk61mrOQyYDiJjUpzFpqb5nad8olkjsfvG6RC7oIRsBsSY62SN9H6Lopd3MtyvmorcCM4gD0dkxnk7eiHARHEWg84RWkUXPinZEQeSXsCa8wOYXQqxIi31aAQN3R/rTEAv1lqCNs3taSTqoEmclmqf2FIFlCm3cGvBeBzoOt4I7vraqgJvW+awPF9B0MgJ9RRZYz+5a+75qKTEWmIstuFfm+q7RJve8ayH4LMACaxEJEaXs23AAAAABJRU5ErkJggg==")',
		nightIco: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU2OUYzRUEwMjc4NzExRTU5RkYxQjg1Rjk2QkEyNzBEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBMzA2RjA2Mjc4QTExRTU5RkYxQjg1Rjk2QkEyNzBEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTY5RjNFOUUyNzg3MTFFNTlGRjFCODVGOTZCQTI3MEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTY5RjNFOUYyNzg3MTFFNTlGRjFCODVGOTZCQTI3MEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4v5YACAAAC/UlEQVR42tSaXYhNURTH97kzRnJ9ZTQzPh7IMEr5yshHEwkRkSeSjweEiMjDePTkhcKLPCApUV54GxTKcDM0JfL9QE0UGdcdEmb7L3edOq5zzz1nn332Pvdfv5e5Z9Zd666711577etIKYUGjQILwRwwDOwDfcKAamP873CwBawDrcABP8ACU87/FWUgIk3gKMjL/7VfwV4sojxcCw6AL9JfD0DGdABhv0KTwAUwO+CZvaBfGFaYAJaDyyAb8Mwt0CksKFPh9W3gWgXnSSeFJTkBZXQrOM3VJUi9oJErUGoysBKcCuE86YYt58sF0MILtiakjTvCojI+i/o876Zh9ThNARysUCr99NpmAN5FTAvxBRgS0QZlK5+GDLQrOC9sOu/NADVm70LU+9RmYJOi8yLigk8sgPUxbEy0HUATH0RUNdV2AG0hd9xyarMdwNyYNhaDOpsBTI5pYwRYYTMAHYtwh80ARmqws1ShBdEWwGAdGyI4HrMYKAegawFSMdhlo5XIK/ZAfvoO5oFukxn4oNHeID5DjzUZwCvNNsn5DjDOVADPErA7BdwF0xP2v4YCyCVknDJwjxe2k8AHT4O0VTSeawD9Mll1glZN48T5IMc+N7p/7JJm1AFWg4ERna4Da8F1j62cdzZKY5RZBtbcEuYzuAlugyfgOSjwyS7LJ8QJYJoojuuX+RycLnqPlPXgLZfBalCB11iveyL7CM6K6tEZURxp/jNWGc2pzFbBp98M3peOVXrA4Sr49I+4zpdmgDSA94UZKXX+ITeNP8sFIDg9XWBoypyni0O6THzqN1bx6iXYCH6nyHnyZXOp8+UCIF0Fe1LiPH1FdoMr/q8G74DbwS9pT/TeO+Nes64JuFpNUl+5fdByT9wMHhl0vhu06L7opobqEPiWoON9oJ0v1bXf1LuMAcdAQbPjJ6g9juqPE+PXKvVcbjeAmQqHFsmb5iVwzu1tVKYSOkpdA1jEU246To4XxZ/gZLlUU5v8CbzhI+x9bqV74r7xHwEGAPDRVwnecW5KAAAAAElFTkSuQmCC")'
	}

	// 调用本地存储的字体信息初始化页面字体大小
	myModule.originalFontSize = parseInt(myModule.originalFontSize);
	if (!myModule.originalFontSize) {
		myModule.originalFontSize = 14;
	}
	$('#fiction_container').css('font-Size', myModule.originalFontSize + 'px');

	// 调用本地存储的信息初始化页面字体颜色和背景颜色
	$('#fiction_container').css({
		'color': myModule.color,
		'background-color': myModule.bg_color
	});

	// 调用本地存储的信息初始化背景选择列表的active
	var active_bg = document.getElementById(myModule.active_id);
	$(active_bg).addClass('bg-color-active')
		.siblings().removeClass('bg-color-active');

	// 调用本地存储的信息初始化夜间按钮的背景颜色和文字
	if (myModule.active_id === 'bg_color_blue') {
		$('.foot-nav-night').html('日间')
			.css('background-image', myModule.dayIco);
	}

	// 整个项目的入口函数
	function main() {
		readerModel = ReaderModel();
		readerUI = ReaderBaseFrame(Dom.ReadContent);
		readerModel.init(function (data) {
			readerUI(data);
		});
		EventHandler();
	}

	// 实现和阅读器相关的数据交互的方法
	function readerModel() {
		var Chapter_id;
		var ChapterTotal;
		var init = function (UIcallback) {
			getFictionInfo(function () {
				getCurChapterContent(Chapter_id, function (data) {
					UIcallback && UIcallback(data)
				})
			})
		};
		var getFictionInfo = function (callback) {
			$.get('data/chapter.json', function (data) {
				/*获得章节信息的回调*/
				Chapter_id = data.chapters[2].chapter_id;
				ChapterTotal = data.chapters.length;
				callback && callback();
			}, "json");
		};

		var getCurChapterContent = function (chapter_id, callback) {
			$.get('data/data' + chapter_id + '.json', function (data) {
				/*获得章节数据的回调*/
				if (data.result == 0) {
					var url = data.jsonp;
					Util.getBSONP(url, function (data) {
						callback && callback(data);
					});
				}
			}, "json")
		};
		var prevChapter = function (UIcallback) {
			Chapter_id = parseInt(Chapter_id, 10);
			if (Chapter_id == 0) {
				return
			}
			Chapter_id -= 1;

			getCurChapterContent(Chapter_id, UIcallback);
		};
		var nextChapter = function (UIcallback) {
			Chapter_id = parseInt(Chapter_id, 10);
			if (Chapter_id == ChapterTotal) {
				return
			}
			Chapter_id += 1;

			getCurChapterContent(Chapter_id, UIcallback);

		};
		return {
			init: init,
			prevChapter: prevChapter,
			nextChapter: nextChapter
		}

	}

	// 渲染基本的UI结构
	function readerBaseFrame() {
		/*初始化基本的UI结构*/
		function parseChapterData(jsonData) {
			var jasonObj = JSON.parse(jsonData);
			var html = '<h4>' + jasonObj.t + '</h4>';
			for (var i = 0; i < jasonObj.p.length; i++) {
				html += '<p>' + jasonObj.p[i] + '</p>';
			}
			return html;
		}
		return function (data) {
			container.html(parseChapterData(data));
		}
	}

	// 交互事件的绑定
	function eventHandler() {

		// 点击页面主体切换上下导航栏显示状态
		$('#article_action_mid').on('click', function () {
			myModule.top_nav.toggle();
			myModule.foot_nav.toggle();
			myModule.nav_pannel.hide();
		});

		// 滚动页面隐藏上下导航栏和字体控制面板
		myModule.win.scroll(function () {
			myModule.top_nav.hide();
			myModule.foot_nav.hide();
			myModule.nav_pannel.hide();
		});

		// 点击导航下方字体按钮切换字体控制面板
		myModule.foot_nav_font.on('click', function () {
			myModule.nav_pannel.toggle();
		});

		// 点击字体-大按钮，放大页面字体
		myModule.large_font_btn.on('click', function () {
			// 最大只能放大到24px
			if (myModule.originalFontSize > 24) {
				return;
			}
			myModule.originalFontSize += 1
			$('#fiction_container').css('fontSize', myModule.originalFontSize + 'px');
			// 将调整好的字体大小存储到本地中去
			Util.storageSetter('font_size', myModule.originalFontSize);
		});

		// 点击字体-小按钮缩小页面字体
		myModule.small_font_btn.on('click', function () {
			// 最小只能缩小到12px
			if (myModule.originalFontSize < 12) {
				return;
			}
			myModule.originalFontSize -= 1
			$('#fiction_container').css('fontSize', myModule.originalFontSize + 'px');
			// 将调整好的字体大小存储到本地中去
			Util.storageSetter('font_size', myModule.originalFontSize);
		});

		// 为选中背景颜色添加active，其的同辈移除active 
		$('.bg-color').on('click', function () {
			$this = $(this);
			$this.addClass('bg-color-active')
				.siblings().removeClass('bg-color-active');

			// 存储被选中按钮的id到本地，用于页面初始化
			Util.storageSetter('active_id', $(this).attr('id'));

			// 如果点击日间主题，同时现在正处于夜间主题，那么就切换夜间按钮的背景图片和文字
			if ($this.attr('id') !== 'bg_color_blue' && $('.foot-nav-night').html() === '日间') {
				$('.foot-nav-night').html('夜间')
					.css('background-image', myModule.nightIco);;
			}
		});


		// 点击夜间按钮切换其背景图片和文字
		$('.foot-nav-night').on('click', function () {

			if ($(this).html() === '夜间') {
				// 与夜间主题联动
				$('#bg_color_blue').click();
				$(this).html('日间').css('background-image', myModule.dayIco);

			} else {
				//在夜间主题下点击夜间按钮，切换会白天棕色主题
				$('#bg_color_brown').click();
				$(this).html('夜间').css('background-image', myModule.nightIco);
			}
		})

		// 背景颜色的切换,使用ul的事件委托实现
		$('#nav_pannel_bg').on('click', 'li', function (event) {
			var $target = event.target;
			var $fiction_container = $('#fiction_container')

			switch ($target.id) {
				case 'bg_color_pink':
					$fiction_container.css({
						'color': '#000',
						'background-color': '#F7EEE5'
					});
					Util.storageSetter('current_bg_color', '#F7EEE5');
					Util.storageSetter('current_font_color', '#000');
					break;

				case 'bg_color_brown':
					$fiction_container.css({
						'color': '#000',
						'background-color': '#E9DFC7'
					});
					Util.storageSetter('current_bg_color', '#E9DFC7');
					Util.storageSetter('current_font_color', '#000');
					break;

				case 'bg_color_tan':
					$fiction_container.css({
						'color': '#000',
						'background-color': '#A4A4A4'
					});
					Util.storageSetter('current_bg_color', '#A4A4A4');
					Util.storageSetter('current_font_color', '#000');
					break;

				case 'bg_color_green':
					$fiction_container.css({
						'color': '#000',
						'background-color': '#CDEFCE'
					});
					Util.storageSetter('current_bg_color', '#CDEFCE');
					Util.storageSetter('current_font_color', '#000');
					break;

				case 'bg_color_blue':
					$fiction_container.css({
						'color': '#4E534F',
						'background-color': '#0F1410'
					});

					// 让夜间背景与夜间按钮联动
					if ($('.foot-nav-night').html() === '夜间') {
						$('.foot-nav-night').html('日间')
							.css('background-image', myModule.dayIco);
					}
					Util.storageSetter('current_bg_color', '#0F1410');
					Util.storageSetter('current_font_color', '#4E534F');
					break;
			}
		});
	}

	main();

});