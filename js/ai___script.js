$(function () {
  //HTMLが読み込まれてから実行
  const $foodImages = $(".food-image"); //商品画像
  const $currentTotal = $("#cart-area"); //選択した単価を表示する要素
  const $purchaseButton = $("#btn"); //おかいけいボタン
  const $finalTotal = $("#final-total"); //合計金額
  // const $cartInfo = $('#cart-info'); カート情報全体

  let totalPrice = 0; //合計金額を初期化
  const selectedItems = {}; //選択された商品を管理する
  let selectedPrices = []; //選択された価格を格納

  //初期テキストを変数として定義しておくと管理しやすい
  const initialText = "まだえらんでないよ";

  //商品画像がクリックされたときの処理
  $foodImages.on("click", function () {
    const price = parseInt($(this).data("price")); //クリックされた商品の価格を取得
    const itemName = $(this).data("name"); //クリックされた商品の名前を取得
    const $this = $(this); //クリックされた要素をjQueryオブジェクトとしてキャッシュ

    //親要素の .box を取得
    const $box = $this.closest(".box");

    //選択状態の切り替え
    if (selectedItems[$box[0]]) {
      //すでに選択されてる場合
      delete selectedItems[$box[0]]; //選択済みリストから削除
      totalPrice -= price; //合計金額から引く
      $box.removeClass("selected"); //.boxからクラスを削除

      //選択解除された価格を配列から削除
      const index = selectedPrices.indexOf(price);
      if (index > -1) {
        selectedPrices.splice(index, 1);
      }
    } else {
      //まだ選択されていない場合
      selectedItems[$box[0]] = true; //選択済みリストに追加
      totalPrice += price; //合計金額に加える
      $box.addClass("selected"); // 'selected'クラスを追加
      selectedPrices.push(price); //選択された価格を配列に追加
    }

    //選択された単価を横に並べて表示
    if (selectedPrices.length > 0) {
      $currentTotal.text(selectedPrices.join("円 + ") + "円");
    } else {
      $currentTotal.text(initialText); // 選択されていない場合は初期テキストに戻す
    }
  });

  // 「おかいけいする」ボタンがクリックされた時の処理
  $purchaseButton.on("click", function () {
    $finalTotal.text(`合計金額:${totalPrice}円`); //最終的な合計金額を表示
  });
});
