//グローバル変数定義
let count = 0,first ='○',second='×';
//初期表作成
window.onload =function() {
    for (let i = 0 ; i < 5 ; i++) {
        let tr = document.createElement('tr');
        for (let j = 0 ; j < 5 ; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
        }
        document.getElementById('board').appendChild(tr);
    }
    init();
}
//初期設定
function init() {
    document.getElementById('reset').setAttribute('disabled','disabled');
    let cells = document.getElementsByTagName('td');
    for (let i = 0 ; i < cells.length ; i++) {
        cells[i].innerHTML = '';
        cells[i].className='bg';
        cells[i].setAttribute('onclick','clicked('+i+')');
    }
    document.getElementById('messageA').innerHTML = first+'どうぞ';
    document.getElementById('messageB').innerHTML = '';
}
//クリック時
function clicked(n) {
    let cells = document.getElementsByTagName('td');
    if (cells[n].innerHTML === ''){
        cells[n].innerHTML = count % 2 === 0 ? first : second;
        cells[n].className = count % 2 === 0 ? 'br' : 'bb';
        nextturn = count % 2 === 0 ? second : first;
        document.getElementById('messageA').innerHTML = nextturn + 'どうぞ';
        document.getElementById('messageB').innerHTML = '';
        count>= 8? checkmb() : null;
        count++;
    } else {
        document.getElementById('messageB').innerHTML = 'そこはおけませんよー';
    }
}
//5つ並んでいるかチェック
function checkmb() {
    let cells = document.getElementsByTagName('td');
    let lines =[[0,1,2,3,4],[0,5,10,15,20],[0,6,12,18,24],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],[4,8,12,16,20],[4,9,14,19,24],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24]];
    let win = false;
    let m = count % 2 === 0 ? first : second;
    for (let j = 0 ; j < lines.length ; j++) {
        if(cells[lines[j][0]].innerHTML+cells[lines[j][1]].innerHTML+cells[lines[j][2]].innerHTML+cells[lines[j][3]].innerHTML+cells[lines[j][4]].innerHTML === m+m+m+m+m){
            win = true;
        }
    }
    if (win){
        document.getElementById('messageA').innerHTML = m+'の勝ち！';
        gameover();
    } else if (count === 24){
        document.getElementById('messageA').innerHTML = '引き分け！';
        gameover();
    }
}
//ゲーム終了
function gameover() {
    document.getElementById('messageB').innerHTML = 'おつかれさまでした。続ける場合は「リセット」ボタンを選択してください。';
    document.getElementById('reset').removeAttribute('disabled');
    let cells = document.getElementsByTagName('td');
    for (let i = 0 ; i < cells.length ; i++) {
        cells[i].removeAttribute('onclick');
    }
}
//リセットボタン
function reset() {
    count = 0;
    init();
}