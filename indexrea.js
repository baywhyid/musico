const btn = document.querySelector(".nav-bar-toggle");
btn.addEventListener("click", () => alert("BISA NIH JS NYA"));
const dialog = document.querySelector('dialog');
const closeButton = dialog.querySelector('button:last-of-type');
const openModalButton = document.getElementById('open-modal');

closeButton.addEventListener('click', () => {
  dialog.close();
});

openModalButton.addEventListener('click', () => {
  dialog.showModal();
});


let searchOriginalHTML = null;
let searchMarks = [];
let searchCurrent = -1;
 
function initSearch() {
  // Simpan snapshot HTML body (kecuali elemen fixed/header)
  searchOriginalHTML = document.body.innerHTML;
}
 
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
 
function doSearch() {
  const input = document.getElementById('searchInput');
  const query = input ? input.value.trim() : '';
 
  // Restore dulu ke kondisi semula sebelum search baru
  if (searchOriginalHTML) {
    document.body.innerHTML = searchOriginalHTML;
    // Re-attach event setelah innerHTML direset
    reAttachEvents();
  }
 
  searchMarks = [];
  searchCurrent = -1;
 
  if (!query) return;
 
  const regex = new RegExp('(' + escapeRegex(query) + ')', 'gi');
 
  // Walk semua text node di body, skip elemen input/script/style
  function walkNode(node) {
    if (node.nodeType === 3) { // text node
      const text = node.textContent;
      if (regex.test(text)) {
        regex.lastIndex = 0;
        const wrapper = document.createElement('span');
        wrapper.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
        node.parentNode.replaceChild(wrapper, node);
      }
    } else if (
      node.nodeType === 1 &&
      !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'SELECT', 'MARK'].includes(node.nodeName)
    ) {
      Array.from(node.childNodes).forEach(walkNode);
    }
  }
 
  walkNode(document.body);
 
  searchMarks = Array.from(document.querySelectorAll('mark.search-highlight'));
 
  // Simpan snapshot baru setelah highlight (untuk navigasi)
  searchOriginalHTML = document.body.innerHTML;
 
  if (searchMarks.length === 0) {
    alert('Kata "' + query + '" tidak ditemukan.');
    return;
  }
 
  goToMark(0);
}
 
function goToMark(idx) {
  if (!searchMarks.length) return;
  if (searchCurrent >= 0 && searchMarks[searchCurrent]) {
    searchMarks[searchCurrent].classList.remove('search-highlight-active');
  }
  searchCurrent = (idx + searchMarks.length) % searchMarks.length;
  searchMarks[searchCurrent].classList.add('search-highlight-active');
  searchMarks[searchCurrent].scrollIntoView({ behavior: 'smooth', block: 'center' });
 
  // Update info counter jika ada elemennya
  const info = document.getElementById('searchInfo');
  if (info) info.textContent = searchCurrent + 1 + ' / ' + searchMarks.length;
}
 
function reAttachEvents() {
  // Re-attach search button
  const btn = document.querySelector('.search-btn');
  if (btn) btn.addEventListener('click', doSearch);
 
  const inp = document.getElementById('searchInput');
  if (inp) inp.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') doSearch();
  });
 
  // Re-attach tombol lain yang ada di index.js kamu (modal, dll)
  const openModal = document.getElementById('open-modal');
  const dialog = document.querySelector('.modal-dialog');
  if (openModal && dialog) {
    openModal.addEventListener('click', function() { dialog.showModal(); });
  }
  const closeModal = document.querySelector('.btn-modal-close');
  if (closeModal && dialog) {
    closeModal.addEventListener('click', function() { dialog.close(); });
  }
 
  const navToggle = document.querySelector('.nav-bar-toggle');
  const navBar = document.querySelector('.nav-bar');
  if (navToggle && navBar) {
    navToggle.addEventListener('click', function() {
      navBar.classList.toggle('open');
    });
  }
}
 
// ============================================================
// Jalankan saat DOM siap
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  initSearch();
  reAttachEvents();
});