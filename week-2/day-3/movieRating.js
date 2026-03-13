const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

/* 1. filter() only "Sci-Fi" movies
    2. map() to return:
            "Inception (8.8)"

    3. reduce() to find average movie rating
    4. find() movie "Joker"
    5. findIndex() of "Avengers"*/
let r1=movies.filter(elem=>elem.genre=='Sci-Fi')
console.log("The Sci-Fi movies are:",r1)
let r2=movies.map(movie => `${movie.title} (${movie.rating})`);
console.log("The formattaed output",r2)
let r3=movies.reduce((acc,elem)=>acc+elem.rating,0)
console.log("The average movie rating is:",r3)
let r4=movies.find(elem=>elem.title='Joker')
console.log("The details of the movie Joker is:",r4)
let r5=movies.findIndex(elem=>elem.title=='Avengers')
console.log("The index of the movie Avengers is",r5)