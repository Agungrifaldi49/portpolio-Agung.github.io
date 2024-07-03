const txtElement = ["Mahasiswa dari Politeknik Piksi Ghanesa Bandung"];
let count = 0;
let txtIndex = 0;
let currentTxt = "";
let words = "";

(function ngetik() {
  if (count == txtElement.length) {
    count = 0;
  }
  currentTxt = txtElement[count];
  words = currentTxt.slice(0, ++txtIndex);
  document.querySelector(".efek_ngetik").textContent = words;
  if (words.length == currentTxt.length) {
    count++;
    txtIndex = 0;
  }
  setTimeout(ngetik, 400);
})();
// form contact
const scriptURL = "https://script.google.com/macros/s/AKfycbzIerD8LKN4ym9WY-WL0PUfCSOlsy24Y2igigXt3lz__PvpX65nLtrvdmzKGG-xP9cR/exec";
const form = document.forms["portopolio_contact"];
const btnKirim = document.querySelector(".btn-kirim");
btnKirim.addEventListener("click", function () {
  let timerInterval;
  Swal.fire({
    title: "Looding",
    html: "Tunggu Sampai  proses <b></b> ini Selesai.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    Swal.fire({
      title: "Selamat",
      text: "Pesan Anda Telah Berhasil Dikirim",
      icon: "success",
      confirmButtonText: "OK!",
    });
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   ketika tombol kirim di klik

  // tampilkan tombol looding hilangkan tombol kirim
  btnKirim.classList.toggle("d-none");

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // tampilkan tombol kirim hilangkan tombol looding
      btnKirim.classList.toggle("d-none");
      // Reset
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
