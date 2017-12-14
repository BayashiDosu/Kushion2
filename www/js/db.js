//mobile backendのAPIキーを設定
var ncmb = new NCMB("c66186eb276892de4c9c18e3ead0499112c64fd728f4fa685b2f4c3d710a91a8","94e334ddcd8e8fdb5a32c1cfb64fde4e23deb16dfb8692b86e9a3e33d5f47e5d");

//本登録
function bookEntry() {
    //bookクラスのインスタンスを作成
    var Book = ncmb.DataStore("book");
    var book = new Book();
    
    //変数にデータをセット
    var title = $('#book-title').text();
    var caption = $("#book-caption").text();
    var image = $("#book-image").attr('src');
    
    //データベースにセット
    book.set("title",title);
    book.set("detail",caption);
    book.set("book_image",image);
    
    //データの保存
    book.save()
        .then(function(object) {
              //成功する時の処理
              console.log("やった");
              $("#message").html("<p>登録しました( ･´ｰ･｀)</p>");
          })
        .catch(function(error) {
              //エラーが発生する時の処理
              $("#message").html("error:" + error.message);
          });
}

//本一覧表示