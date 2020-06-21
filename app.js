// 初期値保存用変数
window.originalColor = "";

//対象特定
const changeButtons = document.getElementsByClassName("changeColor");
const changeByRGBCode = document.getElementById("changeByRGBCode");
const resetButton = document.getElementById("resetColor");

//初期色保存
const checkOriginalColor = () => {
  if (window.originalColor === "") {
    chrome.tabs.executeScript(null, {
      code: `${window.originalColor} = document.body.style.backgroundColor`,
    });
  }
};

// 各指定ボタンで変更
const changeColorByName = (event) => {
  checkOriginalColor();

  const targetColor = event.target.value.toLowerCase();
  chrome.tabs.executeScript(null, {
    code: `document.body.style.backgroundColor = "${targetColor}";`,
  });
};

//RGBで変更
const changeColorByRGB = () => {
  checkOriginalColor();

  const colorCode = document.getElementById("RGBCode").value.toLowerCase();

  //正規表現でコード適正判定
  //全７文字、先頭は#、0-f６桁
  const regext = /^#[0-9a-f]{6}$/i;

  if (!regext.test(colorCode)) {
    return alert("Please input proper RGB color code");
  }
  chrome.tabs.executeScript(null, {
    code: `document.body.style.backgroundColor = "${colorCode}"`,
  });
};

//変更前に戻す
const resetColor = () => {
  chrome.tabs.executeScript(null, {
    code: `document.body.style.backgroundColor = "${window.originalColor}"`,
  });
};

//イベント定義
window.onload = () => {
  for (let button of changeButtons) {
    button.addEventListener("click", changeColorByName);
  }
};

changeByRGBCode.addEventListener("click", changeColorByRGB);
resetButton.addEventListener("click", resetColor);
