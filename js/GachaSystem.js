var RankCount = 5;
var GachaData = [];
var GachaProbability = [];
var pointDataKey = "Point";
var test = 0;

function Clear(){
    localStorage.clear();
}

function Get() {
    var p = localStorage.getItem(pointDataKey);
    alert(p ? p : 0);
}

function Set() {
    localStorage.setItem(pointDataKey, 1000);
}

function Choose() {
    
    var rank = RankCount - 1;
    var rankRand = Math.random();
    console.log(rankRand);
    for(var i = 0;i < RankCount - 1;++i){
         console.log(GachaProbability[i]);
        if(GachaProbability[i] > rankRand){
            rank = i;
            break;
        }
    }
    
    
    var item = Math.floor(Math.random() * GachaData[rank].length);
    
    window.alert(GachaData[rank][item]);

}

function LoadGachaData(){
    LoadCSV("data/gachaneta.csv", function(data){
        
        //ガチャの確率を設定
        for(i = 0;i < RankCount;++i){
            GachaProbability[i] = data[i + 1][1];
        }
        
        //ガチャのデータを追加
        var i;
        for(i = 0;i < RankCount;++i){
            GachaData[i] = [];
        }
        
        for(i = 10;i < data.length;++i){
            if(data[i][0] == "") continue;
            console.log(data[i][0] + " " + data[i][1]);
            GachaData[data[i][0]].push(data[i][1]);
        }
        
        window.alert("complete");
    });
}

function LoadCSV(url, onloadedData){
    var req = new XMLHttpRequest();
    req.open("get", url, true);
    req.send(null);
    req.onload = function(){
        onloadedData(ConvertCSVToArray(req.responseText));
    }
}

function ConvertCSVToArray(data){
    var result = [];
    var temp = data.split("\n");
    
    for(var i = 0;i < temp.length;++i){
        result[i] = temp[i].split(',');
    }
    return result;
}