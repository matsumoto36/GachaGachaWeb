var kane = 0;
var pointDataKey = "Point";
window.onload = function(){
    Get();
    document.getElementById("kane").textContent = "残高　" + kane + "兆円";
}

function add(){
    Get();
    kane = kane + 1000;
    document.getElementById("kane").textContent = "残高　" + kane + "兆円";
    Set();
}
function sub(){
    if(kane >= 100){
        Get();
        kane = kane - 100;
        document.getElementById("kane").textContent = "残高　" + kane + "兆円";
        Set();
    }
    else{
        alert ("金が足りやがりません");
    }
}
function Get() {
    var data = localStorage.getItem(pointDataKey);
    kane = isNaN(data) ? 0 : Number(data);
    <!--alert(kane);-->
}
function Set() {
    localStorage.setItem(pointDataKey, kane);
}

