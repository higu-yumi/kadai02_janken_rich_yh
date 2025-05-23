// ★JSでHTML要素を取得
const foods = document.querySelectorAll(".food-image"); //フードイラスト
const cartArea = document.getElementById("cart-area"); //選択した単価を表示
const paymentButton = document.getElementById("btn"); //会計ボタン
const totalSum = document.getElementById("final-total"); //合計金額
const resetBtn = document.getElementById("reset-btn"); // リセットボタン

// ★選択された商品の情報を管理する配列を準備
const selectedFoods = []; // これがリスト

// ★フードを選択したら色を変える（クリックイベント）
foods.forEach(function (image) {
  image.addEventListener("click", function () {
    const foodCircle = image.closest(".box"); // closestで親要素（.box）取得、正円の特定
    foodCircle.classList.toggle("selected"); // boxに'selected'クラスを付け外し
    const foodName = image.dataset.name; //クリックされた商品名を取得
    const foodPrice = parseInt(image.dataset.price); //クリックされた単価を取得、parseIntで数値に変換
    //商品が「選択された」のか「選択解除された」のかを判断して、配列を操作する処理
    if (foodCircle.classList.contains("selected")) {
      selectedFoods.push({ name: foodName, price: foodPrice });
    } else {
      const index = selectedFoods.findIndex((item) => item.name === foodName); // 選択解除されたら配列から商品削除
      if (index !== -1) {
        selectedFoods.splice(index, 1); //indexから1つだけ要素削除
      }
    }

    // ★選択したフードの金額をcartAreaへの表示
    if (selectedFoods.length === 0) {
      cartArea.textContent = "まだえらんでないよ"; //カートが０の場合
    } else {
      const displayPrices = selectedFoods.map((item) => `${item.price}円`); // 空でなければ商品単価を文字列に変換
      const displayText = displayPrices.join("+"); // +で繋げる
      cartArea.textContent = displayText;
    }
  }); // クリックイベントの定義が終わる
}); // forEach ループが終わる

// ★選択したフードの金額をcartAreaへの表示
paymentButton.addEventListener("click", function () {
  const total = selectedFoods.reduce((currentTotal, foodItem) => {
    return currentTotal + foodItem.price;
  }, 0); //初期値0からスタート

  // ★totalSumに合計金額を表示
  totalSum.textContent = `ぜんぶで${total}円`;
});

// ★リセットボタン
resetBtn.addEventListener("click", function () {
  // selectedFoods 配列を空にする
  selectedFoods.length = 0;
  // すべてのフードの選択状態を解除
  const allSelectedCircles = document.querySelectorAll(".box.selected");
  allSelectedCircles.forEach(function (circle) {
    circle.classList.remove("selected");
  });
  // cartArea の表示を初期状態に戻す
  cartArea.textContent = "まだえらんでないよ";
  // final-total の表示を--円にする
  totalSum.textContent = "--円";
});
