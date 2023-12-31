// buat agar data pada array, dataset dan table singkron - sudah
// buat agar nomor pada table dan dataset bisa urut setiap salah satu data dihapus - sudah
// buat agar jika memasukkan buku dengan booktitle dan author yang sama akan peringatan error - sudah
// buat agar jika tidak ada input maka tidak bisa disubmit - sudah
// Masalah:
// buat jika form kosong maka tidak bisa disubmit - sudah tapi belum canggih
// buat tidak bisa menginput buku dengan title dan author yang sama (berlaku juga untuk update) - sudah tapi tambah masalah pada edit
// jika kita klik edit tapi tidak ingin mengubah apapun, sebelumnya hanya bisa tekan submit.
// ... sekarang karena jika tidak mengubah apapun maka terdeteksi memiliki title dan author yang sudah ada
// ... sehingga edit hanya bisa disubmit jika valuenya benar-benar diedit

// Library Array _____________________________________________________________________________________________________________________________________________
let myLibrary = [];

// Book Constructor __________________________________________________________________________________________________________________________________________
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Retrieve Form Data ________________________________________________________________________________________________________________________________________
function retrieveData() {
  let formData = {};
  formData.bookTitle = document.getElementById("book-title").value;
  formData.bookAuthor = document.getElementById("book-author").value;
  formData.bookPages = document.getElementById("book-pages").value;
  formData.bookRead = document.getElementsByName("bookread");

  // Read Status Radio Button
  function radioButton() {
    if (document.getElementById("book-read").checked) {
      return (formData.bookRead = document.getElementById("book-read").value);
    } else if (document.getElementById("book-not-read").checked) {
      return (formData.bookRead = document.getElementById("book-not-read").value);
    }
  }

  radioButton();

  return formData;
}

// Submit Book Button _____________________________________________________________________________________________________________________________________________
// disini bagaimana button bekerja saat data baru dimasukkan dan saat data lama diedit
let selectedRow = null; // global variable yang menunjukkan keadaan saat form input kosong
let submitBook = document.getElementById("add-book").addEventListener("click", (e) => {
  e.preventDefault(); // mencegah otomatis submit yang mengharuskan refresh page
  let formData = retrieveData();
  // fungsi untuk find atau mencari data book title dan author yang sama dengan array ditaruh disini, kemudiannya else if-nya untuk !== atau === -nya
  if (
    myLibrary.find((item) => item.title === formData.bookTitle) &&
    myLibrary.find((item) => item.author === formData.bookAuthor)
  ) {
    alert("Book title or author is already exist"); // mencegah penambahan book title dan author yang sama
  } else if (formData.bookTitle === "") {
    alert("Book Title must be filled out"); // saat book title kosong
  } else if (formData.bookAuthor === "") {
    alert("Book Author must be filled out"); // saat book author kosong
  } else if (formData.bookPages === "") {
    alert("Book Pages must be filled out"); // saat book pages kosong
  } else if (
    document.getElementById("book-read").checked === false &&
    document.getElementById("book-not-read").checked === false
  ) {
    alert("Please select read status"); // saat read status kosong
  } else if (selectedRow === null) {
    addNewBookToLibrary(formData); // saat data baru***
    resertForm();
  } else {
    updateData(formData); // saat data lama diperbarui***
    resertForm();
  }

  console.log("Book Titile: " + formData.bookTitle);
  console.log("Book Author: " + formData.bookAuthor);
  console.log(myLibrary);
});

// Add New Book to Library Array _________________________________________________________________________________________________________________________________
function addNewBookToLibrary(data) {
  // Create object book with Book Constructor
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

  // Add data- attribute
  newRow.dataset.bookIndex = data.length - 1; // -1 karena data pertama pada array adalah bernomor index "0"
  newRow.dataset.bookTitle = data[data.length - 1].title;
  newRow.dataset.bookAuthor = data[data.length - 1].author;
  newRow.dataset.bookPages = data[data.length - 1].pages;
  newRow.dataset.bookRead = data[data.length - 1].read;

  // Insert data to table
  const cell1 = newRow.insertCell(0);
  cell1.innerHTML = table.rows.length; // dynamic table row
  cell1.classList.add("table-numbers");
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
  //... dalam indeks array selalu dimulai dari nol (0), namun jika menggunakan properti .length
  //... maka akan menanmpilkan "jumlah keseluruhan" data dalam array
  //... sehingga meskipun data dalam array adalah 0, 1, 2, 3 maka jumlah keseluruhan data tersebut adalah empat bukan tiga
  //... oleh sebab itu digunakan " data.length - 1 " , yaitu  jumlah dari keseluruhan array dikurangi satu
  //... sehingga hasilnya selalu menunjukkan item array yang paling terakhir
}

// Edit Data _________________________________________________________________________________________________________________________________________________
function editBook(td) {
  alert(
    "Edit Button digunakan jika anda benar-benar ingin mengubah data anda. Jika tidak ingin mengubah data tapi terlanjur klik Edit maka akan muncul peringatan 'Book title or author is alredy exist'"
  );
  alert("Solusinya: edit data anda sedikit kemudian submit, lalu edit lagi nilai data tersebut seperti sebelum diedit");
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

  const index = myLibrary.findIndex((obj) => {
    return obj.title === selectedRow.dataset.bookTitle && obj.author === selectedRow.dataset.bookAuthor;
  });

  console.log("index secara array");
  console.log(index);
  console.log("index secara dataset");
  console.log(selectedRow.dataset.bookIndex);
  console.log("_________________________________________");

  /* 
  // normalnya myLibrary[0] , myLibrary[1] dan seterusnya, maka dari itu digunakan bookIndex atau variable index di atas
  console.log("isi dari index yang disebutkan secara array");
  console.log(myLibrary[index]); 
  console.log("isi dari index yang disebutkan secara dataset");
  console.log(myLibrary[selectedRow.dataset.bookIndex]);
  */
}

function updateData(formData) {
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

  // Console.log tes, buat ngecek apakah fungsi update sudah berjalan semestinya
  console.log("dataset setelah update");
  console.log(selectedRow.dataset);
  console.log("array setelah update");
  console.log(myLibrary);

  console.log("_________________________________________");

  const index = myLibrary.findIndex((obj) => {
    return obj.title === selectedRow.dataset.bookTitle && obj.author === selectedRow.dataset.bookAuthor;
  });

  console.log("index secara array");
  console.log(index);
  console.log("index secara dataset");
  console.log(selectedRow.dataset.bookIndex);
}

// Update Index _________________________________________________________________________________________________________________________________________________
// Yang diharapkan:
//... buat fungsi loop untuk memberikan keterangan semua index dari array myLibrary
//... juga buat fungsi loop untuk memberikan keterangan semua bookIndex dari dataset
//... sehingga setelah keterangan dari array myLibrary dan dataset sama-sama didapatkan
//... kemudian disinkronkan
//... misal pada keterangan index array terdapat angka (1, 2, 3) kemudian pada dataset terdapat angka (1, 3, 5)
//... maka nanti tinggal buat fungsi untuk menyinkronkan angka-angka tersebut
//... dimana jika array = 1 maka bookIndex harus 1, array 2 maka bookIndex yang 3 harus 2, array 3 maka bookIndex yang 5 harus 3, dan seterusnya

// Solusi Baru:
//... index pada array akan selalu menyesuaikan sendiri, sedangkan bookIndex pada dataset tidak bisa menyesuaikan sendiri
//... lalu, daripada repot2 membuat fungsi untuk memberi keterangan index dari myLibrary
//... lebih baik buat fungsi untuk memberi keterangan index (bookIndex) dari dataset saja lalu buat fungsi untuk mengurutkan index acak-acakan tersebut
//... urutan yang kacau tidak hanya pada bookIndex dari dataset saja, namun pada table nomor juga

// Delete Button _______________________________________________________________________________________________________________________________________________
// harus bisa menghapus data pada table, dataset dan pada array myLibrary
// setelah salah satu data didelete, urutannya pasti tidak akan seperti semula, maka dari itu coba pelajari bagaimana mengurutkan array
// ... yang harus diurutkan yaitu bookIndex dataset dan nomor pada table
// ... misal jika item pada array myLibrary[0,1,2,3] dan yang hilang adalah [2], maka bagaimana agar tidak menjadi [0,1,3]
// ... hal ini dinamakan "Get the index of an Object in an Array in JavaScript"
// ... mungkin bisa digunakan findIndex()

function onDelete(td) {
  if (confirm("Do you want to delete this data?")) {
    // Delete Row + Dataset
    row = td.parentElement.parentElement;
    document.getElementById("bookList").deleteRow(row.rowIndex); // menghapus row + dataset (bisa dicek pada devtools element)

    // Delete Array
    function removeItem(array, bookTitle, bookAuthor) {
      const index = array.findIndex((obj) => {
        return obj.title === bookTitle && obj.author === bookAuthor;
      });
      if (index > -1) {
        array.splice(index, 1); // delete items from "index" => start at "index", remove "1" items
      }

      console.log("index item yang di delete");

      console.log(index);
      console.log(array);
    }

    removeItem(myLibrary, row.dataset.bookTitle, row.dataset.bookAuthor); // memanggil function di atasnya

    // Sort Row Number for each data deleted
    const htmlCollection = document.getElementsByClassName("table-numbers"); // mengambil elemen nomor table class "table-numbers" sebagai htmlcollection
    console.log("_________________________________________");
    console.log(htmlCollection);

    const arrayOfHtmlCollection = Array.prototype.slice.call(htmlCollection); // convert htmlCollection to array

    for (let i = 0; i < arrayOfHtmlCollection.length; i++) {
      console.log(arrayOfHtmlCollection[i]);
      arrayOfHtmlCollection[i].innerHTML = i + 1; // + 1 karena i nilai awalnya 0
    }

    // Sort Dataset bookIndex for each data deleted
    const datasetCollection = document.getElementsByClassName("table-numbers");

    console.log("_________________________________________");
    let i = 0;
    while (i < datasetCollection.length) {
      datasetCollection[i].parentElement.dataset.bookIndex = i; // menggunakan while loop agar dataset awal angka 0
      //console.log(datasetCollection[i].parentElement); // untuk mengecek dataset apakah berawal angka 0 atau bisa gunakan for loop agar lebih mantap
      i++;
    }
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
  selectedRow = null; // kenapa harus ada null?, karena agar selectedRow kembali dalam keadaan "null",
  // ... jika tidak ada null, fungsi submit button untuk menambah data baru akan bertabrakan dengan mengupdate data lama
}
