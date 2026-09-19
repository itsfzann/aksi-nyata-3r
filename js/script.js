/* =========================
   PRESENTATION
========================= */

const slides = [
  ...document.querySelectorAll(".slide")
];

const counter =
  document.getElementById("slideCounter");

const progressBar =
  document.getElementById("progressBar");

const dots =
  document.getElementById("dots");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

const menuPanel =
  document.getElementById("menuPanel");

const menuOverlay =
  document.getElementById("menuOverlay");

const menuList =
  document.getElementById("menuList");

const menuBtn =
  document.getElementById("menuBtn");

let currentSlide = 0;


/* =========================
   JUDUL SLIDE
========================= */

const titles = [
  "Cover",
  "Identitas Kelompok",
  "Masalah Lingkungan",
  "Mengapa Harus Peduli?",
  "Pengertian 3R",
  "Reduce",
  "Reuse",
  "Recycle",
  "Urutan Prioritas 3R",
  "Langkah-Langkah 3R",
  "3R di Sekolah",
  "Aksi Nyata Kelompok",
  "Dokumentasi",
  "Hasil Aksi",
  "Tantangan & Solusi",
  "Manfaat 3R",
  "Quiz Interaktif",
  "Kesimpulan",
  "Ajakan Aksi",
  "Terima Kasih"
];


/* =========================
   BUAT DOT DAN MENU
========================= */

slides.forEach((slide, i) => {

  /* DOT */

  const dot =
    document.createElement("button");

  dot.className = "dot";

  dot.setAttribute(
    "aria-label",
    `Slide ${i + 1}`
  );

  dot.addEventListener(
    "click",
    () => showSlide(i)
  );

  dots.appendChild(dot);


  /* MENU */

  const item =
    document.createElement("button");

  item.className = "menu-item";

  item.textContent =
    `${String(i + 1).padStart(2, "0")}  ${titles[i]}`;

  item.addEventListener(
    "click",
    () => {

      showSlide(i);

      closeMenu();

    }
  );

  menuList.appendChild(item);

});


/* =========================
   TAMPILKAN SLIDE
========================= */

function showSlide(index) {

  if (!slides.length) {
    return;
  }


  /* Pastikan index valid */

  index = Math.max(
    0,
    Math.min(
      slides.length - 1,
      Number(index) || 0
    )
  );


  currentSlide = index;


  /* =========================
     HAPUS ACTIVE DARI SEMUA
  ========================= */

  slides.forEach(
    (slide, i) => {

      slide.classList.toggle(
        "active",
        i === currentSlide
      );

      slide.setAttribute(
        "aria-hidden",
        i === currentSlide
          ? "false"
          : "true"
      );

    }
  );


  /* =========================
     COUNTER
  ========================= */

  counter.textContent =
    `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;


  /* =========================
     PROGRESS
  ========================= */

  progressBar.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;


  /* =========================
     DOT
  ========================= */

  [...dots.children]
    .forEach(
      (dot, i) => {

        dot.classList.toggle(
          "active",
          i === currentSlide
        );

      }
    );


  /* =========================
     MENU ACTIVE
  ========================= */

  [...menuList.children]
    .forEach(
      (item, i) => {

        item.classList.toggle(
          "active",
          i === currentSlide
        );

      }
    );


  /* =========================
     BUTTON
  ========================= */

  prevBtn.disabled =
    currentSlide === 0;

  nextBtn.disabled =
    currentSlide ===
    slides.length - 1;


  /* =========================
     SCROLL KE ATAS
  ========================= */

  slides[
    currentSlide
  ].scrollTop = 0;

}


/* =========================
   NEXT
========================= */

function nextSlide() {

  if (
    currentSlide <
    slides.length - 1
  ) {

    showSlide(
      currentSlide + 1
    );

  }

}


/* =========================
   PREVIOUS
========================= */

function prevSlide() {

  if (
    currentSlide > 0
  ) {

    showSlide(
      currentSlide - 1
    );

  }

}


/* =========================
   BUTTON NAVIGATION
========================= */

prevBtn.addEventListener(
  "click",
  prevSlide
);

nextBtn.addEventListener(
  "click",
  nextSlide
);


/* =========================
   DATA-GO
========================= */

document
  .querySelectorAll("[data-go]")
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showSlide(
            Number(
              button.dataset.go
            )
          );

        }
      );

    }
  );


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    const tag =
      event.target.tagName;


    /* Jangan ganggu input */

    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    ) {

      return;

    }


    /* KANAN */

    if (
      event.key === "ArrowRight" ||
      event.key === " "
    ) {

      event.preventDefault();

      nextSlide();

    }


    /* KIRI */

    if (
      event.key === "ArrowLeft"
    ) {

      event.preventDefault();

      prevSlide();

    }


    /* ESC */

    if (
      event.key === "Escape"
    ) {

      closeMenu();

      closeModal();

    }

  }
);


/* =========================
   SWIPE
========================= */

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.changedTouches[0]
        .screenX;

    touchStartY =
      event.changedTouches[0]
        .screenY;

  },
  {
    passive: true
  }
);

document.addEventListener(
  "touchend",
  (event) => {

    const touchEndX =
      event.changedTouches[0]
        .screenX;

    const touchEndY =
      event.changedTouches[0]
        .screenY;


    const diffX =
      touchEndX -
      touchStartX;

    const diffY =
      touchEndY -
      touchStartY;


    if (
      Math.abs(diffX) > 60 &&
      Math.abs(diffX) >
        Math.abs(diffY)
    ) {

      if (diffX < 0) {

        nextSlide();

      } else {

        prevSlide();

      }

    }

  },
  {
    passive: true
  }
);


/* =========================
   MENU
========================= */

menuBtn.addEventListener(
  "click",
  () => {

    menuPanel.classList.add(
      "open"
    );

    menuOverlay.classList.add(
      "open"
    );

  }
);


document
  .getElementById("closeMenu")
  .addEventListener(
    "click",
    closeMenu
  );


menuOverlay.addEventListener(
  "click",
  closeMenu
);


function closeMenu() {

  menuPanel.classList.remove(
    "open"
  );

  menuOverlay.classList.remove(
    "open"
  );

}


/* =========================
   MODAL 3R
========================= */

const modal =
  document.getElementById("rModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalText =
  document.getElementById("modalText");

const modalNumber =
  document.getElementById("modalNumber");

const modalExamples =
  document.getElementById("modalExamples");


/* =========================
   DATA 3R
========================= */

const rData = {

  reduce: {

    number: "REDUCE",

    title:
      "Reduce — Mengurangi",

    text:
      "Mengurangi penggunaan barang yang berpotensi menjadi sampah, terutama barang sekali pakai.",

    examples: [
      "Membawa tumbler sendiri",
      "Menggunakan tas belanja",
      "Mengurangi plastik sekali pakai",
      "Membeli barang sesuai kebutuhan",
      "Menghemat penggunaan kertas"
    ]

  },


  reuse: {

    number: "REUSE",

    title:
      "Reuse — Menggunakan Kembali",

    text:
      "Menggunakan kembali barang yang masih layak agar masa pakainya lebih panjang dan tidak cepat menjadi sampah.",

    examples: [
      "Menggunakan kembali botol atau wadah",
      "Memakai kardus untuk penyimpanan",
      "Menggunakan sisi kosong kertas",
      "Memanfaatkan pakaian lama",
      "Menggunakan buku yang masih layak"
    ]

  },


  recycle: {

    number: "RECYCLE",

    title:
      "Recycle — Mendaur Ulang",

    text:
      "Mengolah sampah menjadi bahan atau produk baru yang dapat dimanfaatkan kembali.",

    examples: [
      "Botol plastik menjadi kerajinan",
      "Kertas menjadi kertas daur ulang",
      "Kardus menjadi tempat penyimpanan",
      "Kaleng menjadi pot tanaman"
    ]

  }

};


/* =========================
   BUKA MODAL
========================= */

document
  .querySelectorAll(".learn-btn")
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const data =
            rData[
              button.dataset.r
            ];


          if (!data) {
            return;
          }


          modalNumber.textContent =
            data.number;

          modalTitle.textContent =
            data.title;

          modalText.textContent =
            data.text;


          modalExamples.innerHTML =
            data.examples
              .map(
                (example) =>
                  `<div class="modal-example">✓ ${example}</div>`
              )
              .join("");


          modal.classList.add(
            "open"
          );

        }
      );

    }
  );


/* =========================
   TUTUP MODAL
========================= */

document
  .getElementById("modalClose")
  .addEventListener(
    "click",
    closeModal
  );


modal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === modal
    ) {

      closeModal();

    }

  }
);


function closeModal() {

  modal.classList.remove(
    "open"
  );

}


/* =========================
   QUIZ
========================= */

const questions = [

  {
    q: "Apa kepanjangan dari 3R?",

    a: [
      "Reduce, Reuse, Recycle",
      "Repair, Return, Remove",
      "Reuse, Repair, Reduce",
      "Recycle, Return, Reduce"
    ],

    c: 0
  },

  {
    q: "Apa yang dimaksud dengan Reduce?",

    a: [
      "Mengolah sampah menjadi barang baru",
      "Mengurangi penggunaan barang yang menghasilkan sampah",
      "Membuang sampah pada tempatnya",
      "Membeli barang baru"
    ],

    c: 1
  },

  {
    q: "Manakah contoh Reuse?",

    a: [
      "Membuang botol setelah dipakai",
      "Membakar sampah plastik",
      "Menggunakan kembali botol yang masih layak",
      "Membeli botol baru setiap hari"
    ],

    c: 2
  },

  {
    q: "Apa tujuan utama Recycle?",

    a: [
      "Menambah jumlah sampah",
      "Mengolah sampah menjadi barang atau bahan baru",
      "Menggunakan lebih banyak plastik",
      "Membakar semua sampah"
    ],

    c: 1
  },

  {
    q: "Contoh Reduce di sekolah adalah...",

    a: [
      "Membawa tumbler",
      "Membuang kertas sembarangan",
      "Membeli minuman dengan banyak kemasan",
      "Membuang buku yang masih bagus"
    ],

    c: 0
  },

  {
    q: "Sebelum membuang barang, sebaiknya kita...",

    a: [
      "Langsung membakarnya",
      "Membeli penggantinya",
      "Memeriksa apakah masih bisa digunakan",
      "Mencampurnya dengan semua sampah"
    ],

    c: 2
  },

  {
    q: "Langkah yang tepat setelah memilah sampah yang dapat didaur ulang adalah...",

    a: [
      "Membuangnya ke sungai",
      "Mengolahnya sesuai jenis material",
      "Membakarnya sembarangan",
      "Mencampurnya kembali"
    ],

    c: 1
  },

  {
    q: "Mengapa Reduce menjadi langkah penting?",

    a: [
      "Karena mencegah sampah sejak awal",
      "Karena membuat sampah lebih banyak",
      "Karena semua barang harus dibuang",
      "Karena Recycle tidak berguna"
    ],

    c: 0
  },

  {
    q: "Contoh aksi 3R di sekolah adalah...",

    a: [
      "Membuang sampah sembarangan",
      "Membawa tumbler dan memilah sampah",
      "Membakar plastik di halaman",
      "Menggunakan kertas sebanyak mungkin"
    ],

    c: 1
  },

  {
    q: "Apa manfaat menerapkan 3R?",

    a: [
      "Lingkungan semakin kotor",
      "Sampah semakin banyak",
      "Lingkungan lebih bersih dan kebiasaan baik terbentuk",
      "Penggunaan barang sekali pakai meningkat"
    ],

    c: 2
  }

];


let qIndex = 0;
let score = 0;
let answered = false;


const questionEl =
  document.getElementById(
    "question"
  );

const optionsEl =
  document.getElementById(
    "options"
  );

const feedbackEl =
  document.getElementById(
    "quizFeedback"
  );

const quizProgress =
  document.getElementById(
    "quizProgress"
  );

const quizScore =
  document.getElementById(
    "quizScore"
  );

const nextQuestion =
  document.getElementById(
    "nextQuestion"
  );


/* =========================
   LOAD QUIZ
========================= */

function loadQuiz() {

  const item =
    questions[qIndex];


  questionEl.textContent =
    item.q;


  quizProgress.textContent =
    `Soal ${qIndex + 1} / ${questions.length}`;


  quizScore.textContent =
    `Skor: ${score}`;


  feedbackEl.textContent =
    "";


  feedbackEl.style.color =
    "";


  nextQuestion.style.display =
    "none";


  answered = false;


  optionsEl.innerHTML =
    "";


  item.a.forEach(
    (answer, i) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "option";


      button.textContent =
        answer;


      button.addEventListener(
        "click",
        () => answerQuiz(i)
      );


      optionsEl.appendChild(
        button
      );

    }
  );

}


/* =========================
   JAWAB QUIZ
========================= */

function answerQuiz(selected) {

  if (answered) {
    return;
  }


  answered = true;


  const correct =
    questions[qIndex].c;


  const buttons =
    [...optionsEl.children];


  buttons.forEach(
    (button) => {

      button.disabled = true;

    }
  );


  buttons[correct]
    .classList
    .add("correct");


  if (
    selected === correct
  ) {

    score++;


    feedbackEl.textContent =
      "✓ Benar! Jawaban kamu tepat.";

    feedbackEl.style.color =
      "#238b57";

  }

  else {

    buttons[selected]
      .classList
      .add("wrong");


    feedbackEl.textContent =
      `✕ Belum tepat. Jawaban yang benar: ${questions[qIndex].a[correct]}`;

    feedbackEl.style.color =
      "#a74d43";

  }


  quizScore.textContent =
    `Skor: ${score}`;


  nextQuestion.style.display =
    "inline-block";


  nextQuestion.textContent =
    qIndex === questions.length - 1
      ? "Lihat Hasil →"
      : "Soal Berikutnya →";

}


/* =========================
   NEXT QUESTION
========================= */

nextQuestion.onclick =
  () => {

    if (
      qIndex <
      questions.length - 1
    ) {

      qIndex++;

      loadQuiz();

    }

    else {

      showQuizResult();

    }

  };


/* =========================
   HASIL QUIZ
========================= */

function showQuizResult() {

  const percent =
    (score / questions.length) *
    100;


  let title;


  if (percent >= 80) {

    title = "Hebat! 🌱";

  }

  else if (percent >= 60) {

    title = "Bagus! ♻️";

  }

  else {

    title =
      "Tetap Semangat! 💚";

  }


  questionEl.textContent =
    `${title} Kamu mendapat ${score} dari ${questions.length} jawaban benar.`;


  optionsEl.innerHTML = `

    <div
      style="
        padding:25px;
        background:#dff4e6;
        border-radius:15px;
        text-align:center;
        color:#17653d;
      "
    >

      <strong
        style="
          font-size:28px;
        "
      >
        ${percent}%
      </strong>

      <br>

      <span>
        Terus terapkan 3R
        dalam kehidupan sehari-hari.
      </span>

    </div>

  `;


  feedbackEl.textContent =
    "";


  nextQuestion.textContent =
    "Ulangi Quiz";


  nextQuestion.style.display =
    "inline-block";


  nextQuestion.onclick =
    () => {

      qIndex = 0;

      score = 0;

      loadQuiz();

    };

}


/* =========================
   RESTART PRESENTASI
========================= */

const restartBtn =
  document.getElementById(
    "restartBtn"
  );


if (restartBtn) {

  restartBtn.onclick =
    () => {

      qIndex = 0;

      score = 0;

      loadQuiz();

      showSlide(0);

    };

}


/* =========================
   START
========================= */

showSlide(0);

loadQuiz();