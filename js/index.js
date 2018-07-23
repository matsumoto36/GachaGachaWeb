var kane = 0;
var GachaWindow;

window.onload = function(){
    Get();
    UpdateMoneyText();
}

function add(){
    Get();
    kane = kane + 1000;
    UpdateMoneyText();
    Set();
}
function sub(){
    if(kane >= gacha1Play){
        Get();
        kane = kane - gacha1Play;
        UpdateMoneyText();
        Set();
    }
    else{
        return false;
    }
    return true;
}

function UpdateMoneyText() {
    document.getElementById(moneyTextName).textContent = "残高　" + kane + "兆円";
}


function Get() {
    var data = localStorage.getItem(pointDataKey);
    kane = isNaN(data) ? 0 : Number(data);
}
function Set() {
    localStorage.setItem(pointDataKey, kane);
}

function OpenGachaWindow() {
    GachaWindow = window.open("GachaChooseWindow.html", "myWindow", "width=360,height=640,scrollbars=no,resizable=no");
    //GachaWindow.document.write("<p>ポップアップ表示だよ</p>");
}