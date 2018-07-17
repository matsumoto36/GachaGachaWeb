var kane = 5000;
function add(){
    kane = kane + 1000;
    <!--alert(kane);-->
        document.getElementById("kane").textContent = "残高　" + kane + "兆円";
}
function sub(){
    if(kane >= 100){
        kane = kane - 100;
        document.getElementById("kane").textContent = "残高　" + kane + "兆円";
    }
    else{
        alert ("金が足りやがりません");
    }
}