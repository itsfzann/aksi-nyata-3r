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

const quizSlideIndex =
  [...document.querySelectorAll(".slide")].findIndex(
    (slide) => slide.classList.contains("quiz-slide")
  );

let currentSlide = 0;
let quizCompleted = false;


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


  if (
    currentSlide === quizSlideIndex &&
    !quizCompleted &&
    index !== quizSlideIndex
  ) {
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
    currentSlide === 0 ||
    (currentSlide === quizSlideIndex && !quizCompleted);

  nextBtn.disabled =
    currentSlide === slides.length - 1 ||
    (currentSlide === quizSlideIndex && !quizCompleted);


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
    currentSlide === quizSlideIndex &&
    !quizCompleted
  ) {
    return;
  }

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
    currentSlide === quizSlideIndex &&
    !quizCompleted
  ) {
    return;
  }

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

      if (
        currentSlide === quizSlideIndex &&
        !quizCompleted
      ) {
        return;
      }

      event.preventDefault();

      nextSlide();

    }


    /* KIRI */

    if (
      event.key === "ArrowLeft"
    ) {

      if (
        currentSlide === quizSlideIndex &&
        !quizCompleted
      ) {
        return;
      }

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

      if (
        currentSlide === quizSlideIndex &&
        !quizCompleted
      ) {
        return;
      }

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
    q: "Pada saat seorang siswa membawa tumbler sendiri ke sekolah, tindakan tersebut paling tepat termasuk dalam strategi Reduce karena...",

    a: [
      "Membuat sampah plastik berkurang sejak awal penggunaan",
      "Mengolah plastik bekas menjadi produk baru",
      "Memakai kembali botol lama yang masih layak",
      "Menyimpan sampah agar tidak terlihat di kelas"
    ],

    c: 0
  },

  {
    q: "Sebuah tas belanja kain masih sangat bagus, tetapi sudah tidak dipakai lagi oleh pemiliknya. Tindakan paling bijak menurut prinsip 3R adalah...",

    a: [
      "Membuang tas itu agar ruangan lebih rapi",
      "Memberikannya kepada orang lain agar tetap dimanfaatkan",
      "Membakarnya untuk menghindari sampah menumpuk",
      "Mencampurkannya dengan sampah rumah tangga"
    ],

    c: 1
  },

  {
    q: "Perbedaan paling jelas antara Reduce dan Reuse dalam kehidupan sehari-hari adalah...",

    a: [
      "Reduce mencegah sampah sejak awal, sedangkan Reuse memakai kembali barang yang masih layak",
      "Reduce selalu melibatkan proses daur ulang, sedangkan Reuse tidak pernah memakai barang lama",
      "Reduce hanya berlaku untuk plastik, sedangkan Reuse hanya berlaku untuk kertas",
      "Reduce menambah jumlah barang baru, sedangkan Reuse membuang barang lama"
    ],

    c: 0
  },

  {
    q: "Jika sebuah buku pelajaran masih bisa dipakai untuk semester depan, tindakan yang paling tepat sesuai dengan konsep 3R adalah...",

    a: [
      "Membuang buku itu agar tidak menumpuk",
      "Memberikannya kepada adik atau teman yang membutuhkan",
      "Membakar buku agar tidak berdebu",
      "Mencetak ulang seluruh halaman sebagai pengganti buku lama"
    ],

    c: 1
  },

  {
    q: "Manakah pernyataan berikut yang paling tepat mengenai Recycle?",

    a: [
      "Recycle adalah langkah terakhir setelah barang tidak dapat dipakai lagi dan masih bisa diolah menjadi bahan baru",
      "Recycle berarti memakai kembali barang lama tanpa perlu proses pengolahan",
      "Recycle adalah cara membeli barang baru agar lebih modern",
      "Recycle dilakukan sebelum barang tersebut masuk ke tahap Reduce"
    ],

    c: 0
  },

  {
    q: "Sebuah wadah plastik masih sehat dan aman digunakan untuk menampung alat tulis, tetapi tidak lagi dipakai oleh pemilik semula. Pilihan tindakan yang paling sesuai dengan 3R adalah...",

    a: [
      "Menyimpannya di gudang sampai rusak",
      "Menggunakannya kembali untuk kebutuhan lain yang masih bermanfaat",
      "Membuangnya ke sampah umum agar bersih",
      "Mencampurkannya dengan sampah organik agar tidak kelihatan"
    ],

    c: 1
  },

  {
    q: "Yang termasuk tindakan tidak tepat dalam memahami Reduce adalah...",

    a: [
      "Menunda pembelian barang yang tidak perlu",
      "Menggunakan barang sesuai kebutuhan agar tidak cepat jadi sampah",
      "Membeli barang baru meskipun barang lama masih layak pakai",
      "Menggunakan produk yang tahan lama dan lebih efisien"
    ],

    c: 2
  },

  {
    q: "Ketika makanan sisa masih dapat dimanfaatkan dengan cara disimpan dan digunakan kembali, tindakan paling sesuai dengan prinsip 3R adalah...",

    a: [
      "Membeli makanan lebih banyak agar tidak kehabisan",
      "Menyusun kebutuhan dengan lebih bijak agar tidak berlebihan dan tidak terbuang sia-sia",
      "Membuang semua sisa makanan agar tidak mengotori rumah",
      "Membakar sisa makanan agar tidak menumpuk"
    ],

    c: 1
  },

  {
    q: "Di lingkungan sekolah, tindakan yang paling tepat untuk menerapkan 3R secara utuh adalah...",

    a: [
      "Menggunakan botol minum sendiri, membawa tas bekas yang masih bagus, dan memilah sampah sebelum dibuang",
      "Menyimpan semua sampah di satu tempat tanpa memilah agar mudah dibuang",
      "Membeli alat tulis baru setiap bulan walaupun masih bisa dipakai",
      "Membuang kertas yang masih berisi catatan agar lebih bersih"
    ],

    c: 0
  },

  {
    q: "Tujuan utama penerapan 3R dalam kehidupan sehari-hari bukan sekadar mengurangi limbah, tetapi juga...",

    a: [
      "Membuat orang lebih cepat membeli barang baru",
      "Menghemat sumber daya alam dan menjaga lingkungan agar tetap sehat",
      "Menyamakan semua jenis sampah menjadi satu",
      "Mengurangi kewajiban untuk memilah sampah di rumah"
    ],

    c: 1
  }

];


let qIndex = 0;
let score = 0;
let answered = false;
const pointsPerQuestion = 2;


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

  quizCompleted = false;

  const item =
    questions[qIndex];


  questionEl.textContent =
    item.q;


  quizProgress.textContent =
    `Soal ${qIndex + 1} / ${questions.length}`;


  quizScore.textContent =
    `Skor: ${score} / ${questions.length * pointsPerQuestion}`;


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

    score += pointsPerQuestion;


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
    `Skor: ${score} / ${questions.length * pointsPerQuestion}`;


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
    (score / (questions.length * pointsPerQuestion)) *
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
    `${title} Kamu mendapat ${score} dari ${questions.length * pointsPerQuestion} poin.`;


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


  quizCompleted = true;
  showSlide(currentSlide);

  nextQuestion.onclick =
    () => {

      qIndex = 0;

      score = 0;

      loadQuiz();
      showSlide(currentSlide);

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