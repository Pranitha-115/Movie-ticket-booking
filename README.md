# 🎬 Movie Ticket Booking System

A simple movie ticket booking website, inspired by BookMyShow, built with **HTML, CSS and JavaScript**. Users can choose a movie, select a show time, pick seats and get a ticket with a unique booking ID.

## Features
- Movie list with poster images, language and price
- Show time selection (each show has its own seats)
- Seat map with 40 seats (available, selected and booked)
- Maximum 6 seats per booking
- Live total price (seats × ticket price)
- Ticket with a unique booking ID
- Booked seats are saved with `localStorage`, so they stay booked after a refresh

## Technologies Used
| Technology | Purpose |
|---|---|
| HTML | Page structure (movies, seats and ticket screens) |
| CSS | Layout and design |
| JavaScript | Logic, events and booking |
| localStorage | Saving booked seats in the browser |

## Project Structure
```
movie-booking/
├── index.html
├── style.css
├── script.js
└── images/
```

## How to Run
1. Download or clone this repository.
2. Open `index.html` in any web browser.

No installation is needed.

## How It Works
1. Choose a movie from the list.
2. Select a show time and pick your seats.
3. Click **Book Tickets** to get your ticket.
4. Booked seats turn grey and cannot be selected again.

## Limitations
- Data is stored only in the current browser (`localStorage`).
- No login and no real payment.

## Future Improvements
- Backend and database (Node.js and MySQL)
- User login
- Online payment gateway
- Multiple theatres and cities

## Author
Pranitha
