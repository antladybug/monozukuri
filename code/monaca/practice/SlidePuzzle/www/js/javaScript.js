//初期表作成
		window.onload =function() {
			for (let i = 0 ; i < 3 ; i++) {
				let tr = document.createElement('tr');
				for (let j = 0 ; j < 3 ; j++) {
					let td = document.createElement('td');
					tr.appendChild(td);
				}
				document.getElementById('board').appendChild(tr);
			}
			init();
			document.getElementById('reset').setAttribute('onclick','init()');
		}
		//初期設定
		function init() {
			let cells = document.getElementsByTagName('td');
			for (let i = 0 ; i < cells.length ; i++) {
				cells[i].innerHTML = i === (cells.length - 1) ? '' : (i + 1);
				cells[i].setAttribute('onclick','clicked('+i+')');
			}
			for (let r = 0 ; r < 100 ; r++) {
				clicked(Math.floor(Math.random() * cells.length));
			}
		}
		// クリック処理
		function clicked(e) {
			let cells = document.getElementsByTagName('td');
			if (e - 3 >= 0 && cells[e - 3].innerHTML === '') {
				swap(e, e - 3);
			} else if (e + 3 < 9 && cells[e + 3].innerHTML === '') {
				swap(e, e + 3);
			} else if (e % 3 !== 0 && cells[e - 1].innerHTML === '') {
				swap(e, e - 1);
			} else if (e % 3 !== 2 && cells[e + 1].innerHTML === '') {
 				swap(e, e + 1);
			}
		}
		// 置き換え処理
		function swap(a, b) {
			let cells = document.getElementsByTagName('td');
			[cells[a].innerHTML,cells[b].innerHTML]=[cells[b].innerHTML,cells[a].innerHTML];
			check();
		}
		// 完成チェック処理
		function check() {
			let cells = document.getElementsByTagName('td');
			let countok = 0;
			for(let i=0;i<cells.length;i++){
				if(parseInt(cells[i].innerHTML) === i+1){
					cells[i].className = 'bb';
					countok++;
				} else if(cells[i].innerHTML === ''){
					cells[i].className = 'bg';
				} else {
					cells[i].className = 'br';
				}
			}
			if(countok === 8){
				document.getElementById('complete').innerHTML = '完成！';
			} else {
				document.getElementById('complete').innerHTML = 'あと'+(8 - countok)+'個！';
			}
		}