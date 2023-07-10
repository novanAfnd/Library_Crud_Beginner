// Library Array _____________________________________________________________________________________________________________________________________________
let myLibrary = [];

// Book Constructor __________________________________________________________________________________________________________________________________________
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Retrieve Form Data __________________________________________________________________________________________________________________________________
function retrieveData() {
  let formData = {};
  formData.bookTitle = document.getElementById("book-title").value;
  formData.bookAuthor = document.getElementById("book-author").value;
  formData.bookPages = document.getElementById("book-pages").value;
  formData.bookRead = document.getElementsByName("bookread");

  // Read Status radio button
  function radioButton() {
    if (document.getElementById("book-read").checked) {
      return (formData.bookRead = document.getElementById("book-read").value);
    } else if (document.getElementById("book-not-read").checked) {
      return (formData.bookRead = document.getElementById("book-not-read").value);
    }
  }

  radioButton(); // saat retrieveData() dipanggil maka fungsi ini juga akan berjalan

  return formData;
}

// Submit Book Button _____________________________________________________________________________________________________________________________________________
// disini bagaimana button bekerja saat data baru dimasukkan dan saat data lama diedit
let selectedRow = null; // adalah global variable yang menunjukkan keadaan saat form input kosong
const submitBook = document.getElementById("add-book").addEventListener("click", sumbitBook);
function sumbitBook(e) {
  e.preventDefault(); // mencegah otomatis submit yang mengharuskan refresh page
  let formData = retrieveData();
  if (selectedRow === null) {
    addNewBookToLibrary(formData); // saat data baru
  } else {
    updateData(formData); // saat data lama diperbarui
  }
  resertForm();
}

// Add New Book to Library Array _________________________________________________________________________________________________________________________________
function addNewBookToLibrary(data) {
  // Pembuatan object book menggunakan Book Constructor
  const book = new Book(data.bookTitle, data.bookAuthor, data.bookPages, data.bookRead);

  // Add book object to myLibrary array
  myLibrary.push(book);

  // Meneruskan data dari array myLibrary ke function display(data), agar buku baru ditambahkan ke table display
  display(myLibrary);
}

// Insert Book Data to Table ______________________________________________________________________________________________________________________________________
function display(data) {
  const table = document.getElementById("bookList").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow(table.length);

  // add data- attribute
  newRow.dataset.bookIndex = data.length - 1; // -1 karena data pertama pada array adalah bernomor index "0"
  newRow.dataset.bookTitle = data[data.length - 1].title;
  newRow.dataset.bookAuthor = data[data.length - 1].author;
  newRow.dataset.bookPages = data[data.length - 1].pages;
  newRow.dataset.bookRead = data[data.length - 1].read;

  // insert data to table
  const cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.length;
  const cell2 = newRow.insertCell(1);
  cell2.innerHTML = newRow.dataset.bookTitle;
  const cell3 = newRow.insertCell(2);
  cell3.innerHTML = newRow.dataset.bookAuthor;
  const cell4 = newRow.insertCell(3);
  cell4.innerHTML = newRow.dataset.bookPages;
  const cell5 = newRow.insertCell(4);
  cell5.innerHTML = newRow.dataset.bookRead;
  const cell6 = newRow.insertCell(5);
  cell6.innerHTML = "<button onClick='editBook(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>";

  // data.length adalah jumlah keseluruhan data dalam array
  //... kita tahu dalam indeks array selalu dimulai dari nol (0), namun jika kita menggunakan properti .length maka akan menanmpilkan "jumlah keseluruhan" data dalam array
  //... sehingga meskipun data dalam array adalah 0, 1, 2, 3 maka jumlah keseluruhan data tersebut adalah empat bukan tiga
  //... oleh sebab itu digunakan " data.length - 1 " , yaitu  jumlah dari keseluruhan array dikurangi satu
  //... sehingga hasilnya selalu menunjukkan item array yang paling terakhir

  //console.log(newRow);
}

// Edit Data _________________________________________________________________________________________________________________________________________________
function editBook(td) {
  // di bawah ini untuk menampilkan data book yang bersangkutan ke form input
  selectedRow = td.parentElement.parentElement;
  document.getElementById("book-title").value = selectedRow.dataset.bookTitle;
  document.getElementById("book-author").value = selectedRow.dataset.bookAuthor;
  document.getElementById("book-pages").value = selectedRow.dataset.bookPages;
  document.getElementsByName("bookread").value = selectedRow.dataset.bookRead;
  // bookRead ini yang agak sulit karena menggunakan radio button
  function radioButtonEdit() {
    if (document.getElementsByName("bookread").value == "read") {
      document.getElementById("book-read").checked = true;
    } else if (document.getElementsByName("bookread").value == "not read yet") {
      document.getElementById("book-not-read").checked = true;
    }
  }

  radioButtonEdit();

  // Console.log tes
  // console.log("ini adalah old dataset");
  // console.log(selectedRow);

  const index = myLibrary.findIndex((obj) => {
    return obj.title === selectedRow.dataset.bookTitle;
  });

  console.log("index/angka secara array");
  console.log(index);

  console.log("index/angka secara dataset");
  console.log(selectedRow.dataset.bookIndex);

  /* 
  // normalnya myLibrary[0] , myLibrary[1] dan seterusnya, maka dari itu digunakan bookIndex atau variable index di atas
  console.log("isi dari index yang disebutkan secara array");
  console.log(myLibrary[index]); 
  console.log("isi dari index yang disebutkan secara dataset");
  console.log(myLibrary[selectedRow.dataset.bookIndex]);

  console.log("____________________________________________________"); 
  */
}

function updateData(formData) {
  // ini masih bermasalah,
  // form yang ditampilkan pada table sudah tersinkron dengan dataset, namun belum sinkron dengan array myLibrary
  // petunjuk sementara, kita punya data bookIndex, maka gunakan itu untuk menyinkronkan data dengan array
  // bagaimana mengurutkan bookIndex, agar urutan pada array myLibrary sama dengan urutan pada bookIndex dataset
  // ...bagaimana index yang ada pada myLibrary bisa dipakai di updateData() dan delete
  // ...apakah dengan me-loop semua data????

  // urutan: nilai array => dataset => table

  // nilai object dalam array adalah nilai dari form
  myLibrary[selectedRow.dataset.bookIndex].title = formData.bookTitle;
  myLibrary[selectedRow.dataset.bookIndex].author = formData.bookAuthor;
  myLibrary[selectedRow.dataset.bookIndex].pages = formData.bookPages;
  myLibrary[selectedRow.dataset.bookIndex].read = formData.bookRead;

  // nilai dataset adalah nilai dari object array yang diambil dari form
  selectedRow.dataset.bookTitle = myLibrary[selectedRow.dataset.bookIndex].title;
  selectedRow.dataset.bookAuthor = myLibrary[selectedRow.dataset.bookIndex].author;
  selectedRow.dataset.bookPages = myLibrary[selectedRow.dataset.bookIndex].pages;
  selectedRow.dataset.bookRead = myLibrary[selectedRow.dataset.bookIndex].read;

  // nilai data yang ditampilkan pada tabel adalah nilai dataset yang baru
  selectedRow.cells[1].innerHTML = selectedRow.dataset.bookTitle;
  selectedRow.cells[2].innerHTML = selectedRow.dataset.bookAuthor;
  selectedRow.cells[3].innerHTML = selectedRow.dataset.bookPages;
  selectedRow.cells[4].innerHTML = selectedRow.dataset.bookRead;

  // Console.log tes
  //console.log("dataset setelah update");
  //console.log(selectedRow.dataset);
  console.log("array setelah update");
  console.log(myLibrary);

  console.log("_________________________________________");
  console.log("index/angka secara dataset");
  console.log(selectedRow.dataset.bookIndex);
}

// Update Index _________________________________________________________________________________________________________________________________________________
function updateIndex() {
  // function ini sebaiknya dipanggil saat update, delete dan resetForm
  //... sebaiknya juga tidak perlu menggunakan parameter dan argument
  //... biarkan fungsi ini berdiri sendiri dengan mencara data yang ada pada array myLibrary
  //... dan mencari data yang ada pada dataset masing-masing
  //... mungkin bisa jadi dengan loop
  // Yang diharapkan:
  //... kita buat fungsi loop untuk memberikan keterangan semua index dari array myLibrary
  //... kita juga buat fungsi loop untuk memberikan keterangan semua bookIndex dari dataset
  //... sehingga setelah keterangan dari array myLibrary dan dataset sama-sama didapatkan
  //... kemudian kita sinkronkan
  //... misal pada keterangan index array terdapat angka (1, 2, 3) kemudian pada dataset terdapat angka (1, 3, 5)
  //... maka nanti tinggal kita buat fungsi untuk menyinkronkan angka-angka tersebut
  //... dimana jika array = 1 maka bookIndex harus 1, array 2 maka bookIndex yang 3 harus 2, array 3 maka bookIndex yang 35 harus 3, dan seterusnya

  // Pemikiran baru:
  //... kita tahu bahwa index pada array akan selalu menyesuaikan sendiri, sedangkan bookIndex pada dataset tidak bisa menyesuaikan sendiri
  //... lalu, daripada repot2 membuat fungsi untuk memberi keterangan index dari myLibrary
  //... lebih baik buat fungsi untuk memberi keterangan index (bookIndex) dari dataset saja lalu buat fungsi untuk mengurutkan index acak-acakan tersebut
  //... urutan yang kacau tidak hanya pada bookIndex dari dataset saja, namun pada table nomor juga

  const index = myLibrary.findIndex((obj) => {
    return (
      obj.title === titleDataset &&
      obj.author === authorDataset &&
      obj.pages === pagesDataset &&
      obj.read === readDataset
    );
  });

  console.log("array setelah singkron");
  console.log("-");
  console.log("dataset setelah singkron");
  console.log("-");
}

// Delete Button _______________________________________________________________________________________________________________________________________________
// harus bisa menghapus data pada table, dataset dan pada array myLibrary
// setelah salah satu data didelete, urutannya pasti tidak akan seperti semula, maka dari itu coba pelajari bagaimana mengurutkan array
// ... yang harus diurutkan hanyalah bookIndex saja
// ... misal jika item pada array myLibrary[0,1,2,3] dan yang hilang adalah [2], maka bagaimana agar tidak menjadi [0,1,3]
// ... hal ini dinamakan "Get the index of an Object in an Array in JavaScript"
// ... mungkin bisa digunakan findIndex()

function onDelete(td) {
  if (confirm("Do you want to delete this data?")) {
    row = td.parentElement.parentElement;
    document.getElementById("bookList").deleteRow(row.rowIndex); // ini hanya men-delete baris table
    delete row.dataset;

    console.log(row.rowIndex);
    console.log(row);
    console.log(row.dataset);
  }
  resertForm();
}

// Reset Form
function resertForm() {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-pages").value = "";
  document.getElementById("book-read").checked = false;
  document.getElementById("book-not-read").checked = false;
  selectedRow = null; // kenapa harus ada null, karena "" tidak bisa menunjukkan nilai kosong pada radio button
}