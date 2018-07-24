const RankCount = 5;
var GachaData = [];
var GachaProbability = [];
var GachaItemIcons = [];
var IsMordalView = false;

window.onload = function() {
    LoadGachaData();
}

function Clear() {
    localStorage.clear();
}

function Get() {
    var p = localStorage.getItem(pointDataKey);
    alert(p ? p : 0);
}

function Set() {
    localStorage.setItem(pointDataKey, 1000);
}

function WindowClose() {
    window.close();
    //window.open('about:blank','_self').close();
}

function Choose() {
    
    //お金を減らす
    if(window.opener) {
        if(!window.opener.sub()){
            return false;
        } 
        
    }
    
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
    
    //window.alert(GachaData[rank][item]);
    var s = "src/icons/" + GachaData[rank][item] + ".png";
    document.getElementById("ChooseIcon").src = s;
    
    return true;
}

function LoadGachaData() {
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
    });
}

function LoadCSV(url, onloadedData) {
    var req = new XMLHttpRequest();
    req.open("get", url, true);
    req.send(null);
    req.onload = function(){
        onloadedData(ConvertCSVToArray(req.responseText));
    }
}

function ConvertCSVToArray(data) {
    var result = [];
    var temp = data.split("\n");
    
    for(var i = 0;i < temp.length;++i){
        result[i] = temp[i].split(',');
    }
    return result;
}

$(function(){
    
    // 「.modal-open」をクリック
    $('.modal-open').click(function(){
                
        if(IsMordalView) return;
        IsMordalView = true;
        
        // オーバーレイ用の要素を追加
        $('body').append('<div class="modal-overlay"></div>');
        // オーバーレイをフェードイン
        $('.modal-overlay').fadeIn('fast');

        // モーダルコンテンツのIDを取得
        var modal = '#' + (Choose() ? "modal1" : "modal2");
        // モーダルコンテンツの表示位置を設定
        modalResize();

         // モーダルコンテンツフェードイン
        $(modal).fadeIn('fast');

        // 「.modal-overlay」あるいは「.modal-close」をクリック
        $('.modal-overlay, .modal-close').off().click(function(){
            IsMordalView = false;
            
            // モーダルコンテンツとオーバーレイをフェードアウト
            $(modal).fadeOut('fast');
            $('.modal-overlay').fadeOut('fast',function(){
                // オーバーレイを削除
                $('.modal-overlay').remove();
            });
        });
        
        // リサイズしたら表示位置を再取得
        $(window).on('resize', function(){
            modalResize();
        });

        // モーダルコンテンツの表示位置を設定する関数
        function modalResize(){
            // ウィンドウの横幅、高さを取得
            var w = $(window).width();
            var h = $(window).height();
            
            console.log(w);            
            console.log(h);

            // モーダルコンテンツの表示位置を取得
            var x = (w - $(modal).outerWidth(true)) / 2;
            var y = (h - $(modal).outerHeight(true)) / 2;

            // モーダルコンテンツの表示位置を設定
            $(modal).css({'left': x + 'px','top': y + 'px'});
        }

    });
});