document.addEventListener('DOMContentLoaded', function () {

  const dialog = document.querySelector('.modal-dialog');
  const openModalButton = document.getElementById('open-modal');
  const closeButton = document.querySelector('.btn-modal-close');

  if (openModalButton && dialog) {
    openModalButton.addEventListener('click', () => dialog.showModal());
  }
  if (closeButton && dialog) {
    closeButton.addEventListener('click', () => dialog.close());
  }

  const navToggle = document.querySelector('.nav-bar-toggle');
  const navBar = document.querySelector('.nav-bar');
  if (navToggle && navBar) {
    navToggle.addEventListener('click', () => navBar.classList.toggle('open'));
  }

  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.getElementById('searchInput');

  if (searchInput) {
    const wrapper = document.createElement('div');
    wrapper.className = 'search-input-wrapper';
    searchInput.parentNode.insertBefore(wrapper, searchInput);
    wrapper.appendChild(searchInput);

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'search-clear-btn';
    clearBtn.textContent = '✕';
    clearBtn.setAttribute('aria-label', 'Hapus teks');
    wrapper.appendChild(clearBtn);

    searchInput.addEventListener('input', () => {
      clearBtn.style.display = searchInput.value ? 'block' : 'none';
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      clearHighlights();
      searchInput.focus();
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doSearch();
    }
  });

  const searchForm = document.querySelector('.search-nav');
  if (searchForm) searchForm.addEventListener('submit', e => e.preventDefault());

  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.textContent = '↑';
  backToTop.setAttribute('aria-label', 'Kembali ke atas');
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === NAVIGASI HIGHLIGHT PAKAI KEYBOARD ===
  document.addEventListener('keydown', function(e) {
    if (!searchMarks.length) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goToMark(searchCurrent + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goToMark(searchCurrent - 1);
    }
  });

});

let originalNodes = [];

function saveOriginal() {
  originalNodes = [];
  walkAndSave(document.body);
}

function walkAndSave(node) {
  if (node.nodeType === 3) {
    originalNodes.push({ node, text: node.textContent });
  } else if (
    node.nodeType === 1 &&
    !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'SELECT'].includes(node.nodeName)
  ) {
    Array.from(node.childNodes).forEach(walkAndSave);
  }
}

window.addEventListener('load', saveOriginal);

let searchMarks = [];
let searchCurrent = -1;

function clearHighlights() {
  document.querySelectorAll('mark.search-highlight').forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
  searchMarks = [];
  searchCurrent = -1;
}

function doSearch() {
  const input = document.getElementById('searchInput');
  const query = input ? input.value.trim() : '';

  clearHighlights();

  if (!query) return;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');

  function walkAndHighlight(node) {
    if (node.nodeType === 3) {
      const text = node.textContent;
      if (regex.test(text)) {
        regex.lastIndex = 0;
        const sentences = text.split(/(?<=[.!?\n])\s*/);
        const fragment = document.createDocumentFragment();
        sentences.forEach((sentence, i) => {
          const isLast = i === sentences.length - 1;
          const spacer = isLast ? '' : ' ';
          if (regex.test(sentence)) {
            regex.lastIndex = 0;
            const mark = document.createElement('mark');
            mark.className = 'search-highlight';
            mark.textContent = sentence;
            fragment.appendChild(mark);
            fragment.appendChild(document.createTextNode(spacer));
          } else {
            fragment.appendChild(document.createTextNode(sentence + spacer));
          }
        });
        node.parentNode.replaceChild(fragment, node);
      }
    } else if (
      node.nodeType === 1 &&
      !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'SELECT', 'MARK'].includes(node.nodeName)
    ) {
      Array.from(node.childNodes).forEach(walkAndHighlight);
    }
  }

  const target = document.getElementById('article-content') || document.body;
  walkAndHighlight(target);

  searchMarks = Array.from(document.querySelectorAll('mark.search-highlight'));

  const info = document.getElementById('searchInfo');

  if (searchMarks.length === 0) {
    if (info) info.textContent = `"${query}" tidak ditemukan`;
    alert(`Kata "${query}" tidak ditemukan.`);
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
  const current = searchMarks[searchCurrent];
  current.classList.add('search-highlight-active');
  current.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const info = document.getElementById('searchInfo');
  if (info) info.textContent = `${searchCurrent + 1} / ${searchMarks.length} hasil`;
}