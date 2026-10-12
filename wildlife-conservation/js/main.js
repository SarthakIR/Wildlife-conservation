const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

const menuButton = $('.menu-toggle');
const navLinks = $('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.textContent = open ? '×' : '☰';
  });
  $$('.nav-links a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
}

const toast = $('.toast');
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3600);
}

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: .12}) : null;
$$('.reveal').forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('visible'));

const statObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const duration = 1400;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3))).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, {threshold: .4}) : null;
$$('[data-count]').forEach(el => {
  if (statObserver) statObserver.observe(el);
  else el.textContent = Number(el.dataset.count).toLocaleString() + (el.dataset.suffix || '');
});

const speciesSearch = $('#species-search');
const speciesFilter = $('#species-filter');
const speciesCards = $$('.species-card[data-species]');
function filterSpecies() {
  if (!speciesCards.length) return;
  const query = (speciesSearch?.value || '').trim().toLowerCase();
  const category = speciesFilter?.value || 'all';
  let visible = 0;
  speciesCards.forEach(card => {
    const matchesText = card.dataset.name.toLowerCase().includes(query) ||
      card.dataset.region.toLowerCase().includes(query) ||
      card.dataset.habitat.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || card.dataset.status === category;
    const show = matchesText && matchesCategory;
    card.hidden = !show;
    if (show) visible++;
  });
  const empty = $('#species-empty');
  if (empty) empty.hidden = visible > 0;
}
speciesSearch?.addEventListener('input', filterSpecies);
speciesFilter?.addEventListener('change', filterSpecies);

const galleryModal = $('#gallery-modal');
$$('.gallery-item').forEach(item => item.addEventListener('click', () => {
  if (!galleryModal) return;
  const image = $('img', item);
  const modalImage = $('img', galleryModal);
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  galleryModal.classList.add('open');
  galleryModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}));
function closeGallery() {
  if (!galleryModal) return;
  galleryModal.classList.remove('open');
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
$('.modal-close')?.addEventListener('click', closeGallery);
galleryModal?.addEventListener('click', event => { if (event.target === galleryModal) closeGallery(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeGallery(); });

const quiz = [
  {q:'Which big cat is native to India and is known for its striped coat?', options:['Cheetah','Bengal tiger','Snow leopard','Lion-tailed macaque'], answer:1, fact:'The Bengal tiger is an iconic apex predator in Indian forests and grasslands.'},
  {q:'What is one of the biggest threats to wildlife worldwide?', options:['Habitat loss','Moonlight','Cloud cover','Natural seasons'], answer:0, fact:'Habitat loss and fragmentation are major drivers of biodiversity decline.'},
  {q:'Which animal is the largest living land mammal?', options:['Giraffe','Hippopotamus','African elephant','White rhinoceros'], answer:2, fact:'African elephants are the largest living land animals.'},
  {q:'What does “endangered” mean in conservation?', options:['An animal is nocturnal','A species faces a very high risk of extinction','A species lives in forests','A species migrates every year'], answer:1, fact:'Endangered is an IUCN Red List category describing a high risk of extinction in the wild.'},
  {q:'Which action helps protect biodiversity?', options:['Buying wildlife products','Leaving litter in nature','Planting native species and protecting habitats','Feeding wild animals processed food'], answer:2, fact:'Protecting habitats and restoring native ecosystems can help biodiversity recover.'}
];
let quizIndex = 0, quizScore = 0, quizAnswered = false;
const quizQuestion = $('#quiz-question');
function renderQuiz() {
  if (!quizQuestion) return;
  const current = quiz[quizIndex];
  $('#quiz-number').textContent = `QUESTION ${quizIndex + 1} OF ${quiz.length}`;
  $('#quiz-progress').style.width = `${quizIndex / quiz.length * 100}%`;
  quizQuestion.textContent = current.q;
  $('#quiz-options').innerHTML = current.options.map((option, index) =>
    `<button type="button" class="quiz-option" data-option="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`
  ).join('');
  $('#quiz-feedback').textContent = '';
  $('#quiz-next').textContent = quizIndex === quiz.length - 1 ? 'See results →' : 'Next question →';
  $('#quiz-next').disabled = true;
  quizAnswered = false;
  $$('.quiz-option').forEach(button => button.addEventListener('click', () => {
    if (quizAnswered) return;
    quizAnswered = true;
    const selected = Number(button.dataset.option);
    const correct = selected === current.answer;
    if (correct) quizScore++;
    $$('.quiz-option').forEach((optionButton, i) => {
      optionButton.disabled = true;
      if (i === current.answer) optionButton.classList.add('selected');
    });
    if (!correct) button.style.borderColor = '#d77f6b';
    $('#quiz-feedback').textContent = `${correct ? 'Correct!' : 'Not quite.'} ${current.fact}`;
    $('#quiz-next').disabled = false;
    $('#quiz-progress').style.width = `${(quizIndex + 1) / quiz.length * 100}%`;
  }));
}
if (quizQuestion) {
  renderQuiz();
  $('#quiz-next').addEventListener('click', () => {
    if (!quizAnswered) return;
    quizIndex++;
    if (quizIndex < quiz.length) renderQuiz();
    else {
      $('#quiz-number').textContent = 'QUIZ COMPLETE';
      quizQuestion.textContent = `You scored ${quizScore} out of ${quiz.length}`;
      $('#quiz-options').innerHTML = `<p>${quizScore === quiz.length ? 'Outstanding! You are a wildlife champion.' : quizScore >= 3 ? 'Great work. Keep learning and sharing what you discover.' : 'Every conservation journey starts with curiosity. Try again and learn something new.'}</p>`;
      $('#quiz-feedback').textContent = 'Small actions and informed choices can make a difference.';
      $('#quiz-progress').style.width = '100%';
      $('#quiz-next').textContent = 'Try again ↻';
      $('#quiz-next').disabled = false;
      quizIndex = -1;
      quizAnswered = true;
    }
    if (quizIndex === -1) {
      $('#quiz-next').onclick = () => {
        quizIndex = 0; quizScore = 0; quizAnswered = false;
        $('#quiz-next').onclick = null;
        renderQuiz();
      };
    }
  });
}

let selectedAmount = 500;
$$('.amount-button').forEach(button => button.addEventListener('click', () => {
  $$('.amount-button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  selectedAmount = Number(button.dataset.amount);
  const custom = $('#donation-custom');
  if (custom) custom.value = '';
}));
$('#donation-custom')?.addEventListener('input', event => {
  if (event.target.value) {
    $$('.amount-button').forEach(item => item.classList.remove('active'));
    selectedAmount = Number(event.target.value);
  }
});
$('#donation-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const amount = Number($('#donation-custom')?.value || selectedAmount);
  const name = $('#donor-name').value.trim();
  showToast(`Thank you, ${name}! Your ₹${amount.toLocaleString('en-IN')} pledge has been recorded in this demo.`);
  form.reset();
  selectedAmount = 500;
  $$('.amount-button').forEach(item => item.classList.toggle('active', Number(item.dataset.amount) === 500));
});

$('#newsletter-form')?.addEventListener('submit', event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  showToast('Thank you for joining our conservation updates (demo).');
  event.currentTarget.reset();
});

$$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
