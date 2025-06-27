let letters = [];

const seed = document.querySelector('.seed');
const letterModal = document.getElementById('letterModal');
const letterInput = document.getElementById('letterInput');
const submitButton = document.getElementById('submitLetter');
const flowerContainer = document.querySelector('.flower-container');
const viewModal = document.getElementById('viewModal');
const viewContent = document.getElementById('viewContent');
const closeView = document.getElementById('closeView');

// 배경 변경
function changeBackground(imageName) {
  document.body.style.backgroundImage = `url('/images/${imageName}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
}

// 씨앗 클릭 시
seed.addEventListener('click', () => {
  letterModal.classList.remove('hidden');
  letterInput.value = '';
  letterInput.focus();
  changeBackground('bg2.jpg');
});

// 편지 작성 완료
submitButton.addEventListener('click', () => {
  const content = letterInput.value.trim();
  if (!content) return alert('편지를 작성해주세요!');

  const entry = {
    id: Date.now(),
    content
  };

  letters.push(entry);
  localStorage.setItem('letters', JSON.stringify(letters));

  letterModal.classList.add('hidden');
  changeBackground('bg.jpg');
  createFlower(entry);
});

// 꽃 생성
function createFlower(entry) {
  const flower = document.createElement('img');
  flower.src = '/images/flower.1.png';
  flower.className = 'flower';
  flower.dataset.id = entry.id;

  flower.addEventListener('click', () => {
    openReadModal(entry.content);
  });

  flowerContainer.appendChild(flower);
}

// 편지 읽기
function openReadModal(content) {
  viewContent.textContent = content;
  viewModal.classList.remove('hidden');
  changeBackground('bg2.jpg');
}

// 편지 닫기
closeView.addEventListener('click', () => {
  viewModal.classList.add('hidden');
  changeBackground('bg.jpg');
});

// 초기 로딩 시 복원
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('letters');
  if (saved) {
    letters = JSON.parse(saved);
    letters.forEach(createFlower);
  }
  changeBackground('bg.jpg');
});
