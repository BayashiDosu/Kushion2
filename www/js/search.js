// This is a JavaScript file

// 楽天APIのID
var api_id = "1077887680297750214";

var pageCount;

function bookPage(flg) {
    if(flg == 1 && page >= 2) {
        page--;
        searchBook(search,page);
    } else if(flg == 2 && page < pageCount) {
        page++;
        searchBook(search,page);
    } else {
        searchBook(search,page);
    }
}

function searchBook(search,page){
        // 検索実行するURL
        var url = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=${api_id}&title=${encodeURI(search)}&booksGenreId=001&sort=%2BitemPrice&page=${page}`;
        // Ajax実行
        $.ajax({
          type: 'GET',
          dataType: "jsonp",
          url: url
        }).done((results) => {
      　// 処理が成功した場合
      　$("#books").empty();
      　books = results.Items;
        j = 0;
        
        pageCount = results.pageCount;
        
        for (var i = 0; i < books.length; i++) {
      　  var book = books[i].Item;
      　   books.push(book);
      　    // リストに追加
      　    var title = book.title;
      　    if (title.length > 50) {
                title = book.title.slice(0, 49) + "...";
            }
            $("#books").append(`<ons-list-item modifier="chevron" class="book" tappable>
            <div class="left">
                <img src="${book.mediumImageUrl}" height="120" width="80"/>
            </div>
            <div class="center">
	            <span data-book-id="${j}">${title}</span>
	     　 </div></ons-list-item>
           `);
           j++;
        }
        
        }).fail((err) => {
        	// 処理が失敗した場合
          alert("エラー！");
        });
    }

    // 検索結果の書籍一覧を入れます
    var books = [];
    var j = 0;
    var page = 1;
    var search;

    // 画面が切り替わる度に呼ばれます
    document.addEventListener('init', function(event) {
    var pageId = event.target.id;
  
    // 最初の画面を表示した時の処理
    if (pageId == "list-page") {
    // 検索文字列が変更された時の処理
    $("#search").on("change", (e) => {
        page = 1;
    	// 検索文字がなければ終了
        search = e.target.value;
        
        if (search == "") return;
        else searchBook(search,page);
        
        
        });
    
    // 書籍名をタップした時のイベント
    $(document).on("tap", ".book span", (e) => {
      // 書籍データを特定
      var index = $(e.target).data("book-id");
      var book = books[index].Item;
      
      // 画面を移動
      var nav = document.querySelector('#navigator');
      nav.pushPage('detail.html', {data: {book: book}});
    });
  }
  
  // 詳細画面を表示した時の処理
  if (pageId == "detail-page") {
    // 書籍データを表示
    var book = event.target.data.book;
    $("#book-image").attr("src", book.largeImageUrl);
    $("#book-title").text(book.title);
    $("#book-caption").text(book.itemCaption);
  }
});