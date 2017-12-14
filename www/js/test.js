
// This is a JavaScript file
//mobile backendのAPIキーを設定
var ncmb = new NCMB("41820af988f689f96842aa32560c53a162987e60502819d39792efcd591915ad","92d7c06a0a94afdfa37e2a61a8481c125bf09c977ab553b0609b0cf6b8c53a9a");


//データをmobile backendに保存するメソッド
function saveData(){
    //クラス名を指定して新規クラスを作成
    var Data = ncmb.DataStore("Data");

    //Dataクラスのインスタンスを作成
    var data = new Data();

    //作成したインスタンスのaisatsuというフィールドに文字データを設定
    data.set("aisatsu", "hello, world!");
    data.set("aiue", "dounano, なんなの");

    //設定したデータをmobile backendに保存
    data.save()
        .then(function(object) {
              //成功する時の処理
              $("#message").html("<p>データ保存に成功!</p>");
          })
        .catch(function(error) {
              //エラーが発生する時の処理
              $("#message").html("error:" + error.message);
          });
}