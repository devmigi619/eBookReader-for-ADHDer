let history = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shouldEdit(editLevel) {
  const editProbability = editLevel * 10;
  return getRandomInt(1, 100) <= editProbability;
}

function applyRandomStyles(word, editLevel) {
  if (!shouldEdit(editLevel)) return word;
  let result = word;
  const styles = ['italic', 'bold', 'spacing', 'asterisks'];
  const chosenStyle = styles[getRandomInt(0, styles.length - 1)];
  switch (chosenStyle) {
    case 'italic':
      result = `<span class="italic">${result}</span>`;
      break;
    case 'bold':
      result = `<span class="bold">${result}</span>`;
      break;
    case 'spacing':
      result = result.split('').join(' ');
      break;
    case 'asterisks':
      result = `*${result}*`;
      break;
  }
  return result;
}

function updateHistory(originalText, modifiedText) {
  if (originalText.trim() !== "" && modifiedText.trim() !== "") {
    history.push({ original: originalText, modified: modifiedText });
    refreshHistoryModal(); // 모달 내용 갱신
  }
}

function refreshHistoryModal() {
  const historyElement = document.getElementById('historyContent');
  historyElement.innerHTML = ''; // 기존 히스토리 내용을 초기화

  // 히스토리 배열을 순회하며 각 항목을 화면에 표시
  history.forEach((item, index) => {
    const entry = document.createElement('div');
    entry.className = 'history-entry';
    entry.innerHTML = `
          <div class="text-container"><strong>Original:</strong> <div>${item.original}</div></div>
          <div class="text-container"><strong>Modified:</strong> <div>${item.modified}</div></div>
      `;
    historyElement.appendChild(entry);
  });
}

function contaminateText() {
  const inputText = document.getElementById('inputText').value;
  const editLevel = parseInt(document.getElementById('editLevel').value, 10) || 7;
  const words = inputText.split(/\s+/);
  const modifiedText = words.map(word => applyRandomStyles(word, editLevel)).join(' ');

  // updateHistory 함수 호출 시 원본 텍스트와 수정된 텍스트를 모두 전달합니다.
  updateHistory(inputText, modifiedText);

  // 결과 출력 영역에 수정된 텍스트만 표시합니다.
  const outputContainer = document.getElementById('outputText');
  outputContainer.innerHTML = modifiedText;
}

// 모달을 띄우고 닫는 기능
var modal = document.getElementById("historyModal");
var btn = document.getElementById("showHistoryBtn");
var span = document.getElementsByClassName("closeBtn")[0];

// 버튼 클릭 시 모달 열기
btn.onclick = function () {
  modal.style.display = "block";
  refreshHistoryModal(); // 모달 내용 갱신
}

// x 버튼 클릭 시 모달 닫기
span.onclick = function () {
  modal.style.display = "none";
}

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
