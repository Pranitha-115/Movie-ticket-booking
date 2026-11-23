//  1. DATA 
const movies = [
   { id: 1, title: "Ramayana",  lang: "Hindi", image:"https://upload.wikimedia.org/wikipedia/hi/8/80/Ramayana_%282026_film%29.jpeg?utm_source=hi.wikipedia.org&utm_campaign=index&utm_content=original", price: 250 },
   { id: 2, title: "Scene",  lang: "Telugu",  image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/scene-et00516631-1793771165.jpg", price: 200 },
  { id: 3, title: "OM",         lang: "Tamil",   image: "https://cdn.district.in/movies-assets/images/cinema/OM--aa4a17e0-e03f-11f1-9a38-cbf7efe34ad4.jpg", price: 300 },
  { id: 4, title: "Avengers:Doomsday",  lang: "English",   image: "https://preview.redd.it/what-do-you-want-to-see-most-in-avengers-doomsday-v0-flc2pue4pdqf1.jpeg?width=640&crop=smart&auto=webp&s=7960fc81c2389be25be294c7acb162c1ba385901", price: 220 },
  {id:5, title:"Itlu Arjuna", lang:"Telugu", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUBW2TxuOZE4qOTplelomwLafctdf8zjZRBzErDuFKsk0FxstXmq5l287&s=10",price:250},
 { id: 6, title: "Aakashamlo oka thara",  lang: "Telugu", image:"https://cdn.district.in/movies-assets/images/cinema/alot-31016650-e4a8-11f1-a839-471adcb636b4.jpg", price: 210 },
];


var rows = ["A", "B", "C", "D", "E"];
var totalCols = 8;

// 2. VARIABLES (state) 
var selectedMovie = null;
var selectedSeats = [];

//  3. GET HTML ELEMENTS 
var moviesSection  = document.getElementById("movies-section");
var bookingSection = document.getElementById("booking-section");
var ticketSection  = document.getElementById("ticket-section");
var moviesDiv      = document.getElementById("movies");
var seatsDiv       = document.getElementById("seats");
var showtime       = document.getElementById("showtime");

//  4. SHOW ONLY ONE SCREEN 
function showScreen(screen) {
  moviesSection.classList.add("hidden");
  bookingSection.classList.add("hidden");
  ticketSection.classList.add("hidden");
  screen.classList.remove("hidden");
}

//  5. LOCAL STORAGE (save booked seats) 
function getKey() {
  return "booked_" + selectedMovie.id + "_" + showtime.value;
}

function getBookedSeats() {
  var data = localStorage.getItem(getKey());
  if (data) {
    return JSON.parse(data);   // text -> array
  }
  return [];
}

function saveBookedSeats(list) {
  localStorage.setItem(getKey(), JSON.stringify(list));   // array -> text
}

//  6. SHOW MOVIES 
function showMovies() {
  moviesDiv.innerHTML = "";

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];

    var card = document.createElement("div");
    card.className = "movie";
    card.innerHTML =
      '<div class="poster" style="background-image: url(' + movie.image + ')"></div>' +
      '<div class="info">' +
        '<h3>' + movie.title + '</h3>' +
        '<p>' + movie.lang + ' - Rs.' + movie.price + '</p>' +
      '</div>';

    addMovieClick(card, movie);
    moviesDiv.appendChild(card);
  }
}

// click on a movie card
function addMovieClick(card, movie) {
  card.addEventListener("click", function () {
    openBooking(movie);
  });
}

// 7. OPEN BOOKING SCREEN 
function openBooking(movie) {
  selectedMovie = movie;
  selectedSeats = [];
  document.getElementById("movie-title").textContent = movie.title;
  showSeats();
  updateSummary();
  showScreen(bookingSection);
}

//  8. CREATE SEATS 
function showSeats() {
  seatsDiv.innerHTML = "";
  var bookedSeats = getBookedSeats();

  for (var r = 0; r < rows.length; r++) {
    for (var c = 1; c <= totalCols; c++) {
      var seatId = rows[r] + c;          

      var seat = document.createElement("button");
      seat.className = "seat";
      seat.textContent = seatId;

      if (bookedSeats.indexOf(seatId) !== -1) {
        seat.classList.add("booked");    // already booked
        seat.disabled = true;
      } else {
        addSeatClick(seat, seatId);
      }

      seatsDiv.appendChild(seat);
    }
  }
}

// click on a seat
function addSeatClick(seat, seatId) {
  seat.addEventListener("click", function () {
    var position = selectedSeats.indexOf(seatId);

    if (position !== -1) {
      // already selected -> remove
      selectedSeats.splice(position, 1);
      seat.classList.remove("selected");
    } else {
      // not selected -> add (max 6)
      if (selectedSeats.length >= 6) {
        alert("You can book a maximum of 6 seats.");
        return;
      }
      selectedSeats.push(seatId);
      seat.classList.add("selected");
    }

    updateSummary();
  });
}

//  9. UPDATE SEATS LIST + TOTAL 
function updateSummary() {
  var seatText = "None";
  if (selectedSeats.length > 0) {
    seatText = selectedSeats.join(", ");
  }

  document.getElementById("selected-seats").textContent = seatText;
  document.getElementById("total").textContent = selectedSeats.length * selectedMovie.price;
  document.getElementById("book-btn").disabled = (selectedSeats.length === 0);
}

//  10. CONFIRM BOOKING 
function bookTickets() {
  // save seats so they show as booked next time
  var allBooked = getBookedSeats().concat(selectedSeats);
  saveBookedSeats(allBooked);

  // fill ticket
  document.getElementById("t-movie").textContent = selectedMovie.title;
  document.getElementById("t-time").textContent  = showtime.value;
  document.getElementById("t-seats").textContent = selectedSeats.join(", ");
  document.getElementById("t-total").textContent = selectedSeats.length * selectedMovie.price;
  document.getElementById("t-id").textContent    = "BK" + Date.now().toString().slice(-8);

  showScreen(ticketSection);
}

//  11. BUTTON EVENTS 
document.getElementById("book-btn").addEventListener("click", bookTickets);

document.getElementById("back-btn").addEventListener("click", function () {
  showScreen(moviesSection);
});

document.getElementById("home-btn").addEventListener("click", function () {
  showScreen(moviesSection);
});

// when show time changes, reload seats
showtime.addEventListener("change", function () {
  selectedSeats = [];
  showSeats();
  updateSummary();
});

// 12. START 
showMovies();