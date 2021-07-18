Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

const screen = document.querySelector('.screen');
const seats = document.getElementsByClassName('seat');
const select = document.getElementById('selection')
const seatNum = document.getElementById('seat-num');
const seatPrice = document.getElementById('seat-price');

const movieObj = {
    movies: [
        {
            name: 'Avengers End Game',
            poster: './img/avengers-endgame.jpg',
            price: 10
        },
        {
            name: 'Blackwidow',
            poster: './img/black-widow-poster-social-feature.jpg',
            price: 15
        },
        {
            name: 'Thor Ragnarok',
            poster: './img/thor-ragnarok.jpg',
            price: 20
        }
    ]
}

let selectedSeats = [];

function fetchRandomSeats() {
    for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * (40 - 1) + 1);
        seats[index].style.backgroundColor = 'var(--full)';
        seats[index].disabled = true
    }
}

function resetSeats() {
    for (let i = 0; i < 40; i++) {
        seats[i].style.backgroundColor = 'var(--empty)';
        seats[i].disabled = false
        selectedSeats = [];
    }
}

function computePrice(movie, seatOfNum) {
    movieObj.movies.forEach(m => {
        if (m.name == String(movie)) {
            let price = m.price;
            console.log(seatOfNum * price)
            return seatOfNum * price;
        }
    });
}

for (let i = 0; i < seats.length; i++) {
    const seat = seats[i];
    seat.addEventListener('click', (e) => {
        if (getComputedStyle(seat).backgroundColor === 'rgb(108, 117, 125)') {
            seat.style.backgroundColor = 'var(--selected)'
            selectedSeats.push(seat.innerText)
            const movie = select.value
            const seatOfNum = selectedSeats.length
            movieObj.movies.forEach(m => {
                if (m.name == String(movie)) {
                    let price = m.price;
                    const totalPrice = seatOfNum * price
                    console.log(totalPrice)
                    seatPrice.innerText = totalPrice
                }
            });
            seatNum.innerText = seatOfNum
        } else if (getComputedStyle(seat).backgroundColor === 'rgb(252, 196, 28)') {
            seat.style.backgroundColor = 'var(--empty)'
            selectedSeats.remove(seat.innerText)
            const movie = select.value
            const seatOfNum = selectedSeats.length
            movieObj.movies.forEach(m => {
                if (m.name == String(movie)) {
                    let price = m.price;
                    const totalPrice = seatOfNum * price
                    console.log(totalPrice)
                    seatPrice.innerText = totalPrice
                }
            });
            seatNum.innerText = seatOfNum
        }
    })
}


select.addEventListener('change', (e) => {
    movieObj.movies.forEach(m => {
        if (m.name === e.target.value) {
            resetSeats();
            fetchRandomSeats();
            const poster = m.poster
            const img = document.getElementById('screen-image')
            img.setAttribute('src', poster)
        }
    });
});