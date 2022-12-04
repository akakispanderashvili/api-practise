
let searchBtn = document.getElementById("search");
let searchBtn2 = document.getElementById("search2");
let passedYears = document.getElementById("passedYears");
let actPeople = document.getElementById("actPeople");
let currency = document.getElementById("currency");
let sumLength = document.getElementById("sumLength");




function makeNames(sampleWord) {
    const spaces = sampleWord.split(' ').length - 1;
    let loopNum = (spaces + 1) / 2;
    let newString = "";
    let cuttedName;
    let finalNames;
    for (let i = 0; i < loopNum; i++) {
        cuttedName = sampleWord.slice(0, sampleWord.indexOf(' '));
        finalNames = newString.concat(finalNames, cuttedName + ", ");
        sampleWord = sampleWord.slice(sampleWord.indexOf(',') + 2);
    }
    finalNames = finalNames.slice(9);
    actPeople.innerHTML = finalNames;
}


searchBtn.addEventListener("click", () => {
    let movieName = document.getElementById("movie-inp").value;
    let apiKey = "c9fd1f5d";
    console.log(movieName);
    let moviesURL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;
    fetch(moviesURL)
        .then((response) => response.json())
        .then((data) => {
            let yearPassed = 2022 - data.Year;
            passedYears.innerHTML = `released ${yearPassed} year ago`;
            makeNames(data.Actors);
            let countryName = data.Country;
            console.log(data.Runtime.slice(0, 4));
            // let countryArr = [];
            // if (data.Country.includes(', ')) {
            //     countryArr = data.Country.split(", ");
            // } else {
            //     countryArr.push(data.Country);
            // }
            // countryArr.forEach((element => {
            //     fetch()
            // }));
            let countriesURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
            fetch(countriesURL)
                .then((response) => response.json())
                .then((data) => {
                    let upperText = Object.values(data[0])[2];
                    let lowered = upperText.toLowerCase();
                    // console.log(data[0]);
                    currency.innerHTML = Object.values(data[0].currencies)[0].name;
                    document.getElementById("countryFlag").src = `https://flagcdn.com/${lowered}.svg`;

                })
                .catch(() => {
                    alert("error, maybe two countries");
                });
        })
        .catch(() => {
            alert("error, maybe wrong movie name");
        });
});


searchBtn2.addEventListener("click", () => {
    let movieName1 = document.getElementById("secondInput1").value;
    let movieName2 = document.getElementById("secondInput2").value;
    let movieName3 = document.getElementById("secondInput3").value;
    let apiKey = "c9fd1f5d";
    console.log(movieName1);
    let movies1URL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName1}`;
    let movies2URL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName2}`;
    let movies3URL = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName3}`;
    fetch(movies1URL)
        .then((response) => response.json())
        .then((data) => {
            let country1Name = data.Country;
            let firstMovieLength = data.Runtime.slice(0, 3);
            console.log(firstMovieLength);
            let countries1URL = `https://restcountries.com/v3.1/name/${country1Name}?fullText=true`;
            fetch(countries1URL)
                .then((response) => response.json())
                .then((data) => {
                    let population1 = data[0].population;

                })

            fetch(movies2URL)
                .then((response) => response.json())
                .then((data) => {
                    let country2Name = data.Country;
                    let secondMovieLength = data.Runtime.slice(0, 3);
                    let countries2URL = `https://restcountries.com/v3.1/name/${country2Name}?fullText=true`;
                    fetch(countries2URL)
                        .then((response) => response.json())
                        .then((data) => {
                            let population2 = data[0].population;
                        });
                    fetch(movies3URL)
                        .then((response) => response.json())
                        .then((data) => {
                            let country3Name = data.Country;
                            let thirdMovieLength = data.Runtime.slice(0, 3);
                            let sum = +firstMovieLength + +secondMovieLength + +thirdMovieLength;
                            console.log(sum);
                            sumLength.innerHTML = `${sum} minutes`;
                            let countries3URL = `https://restcountries.com/v3.1/name/${country3Name}?fullText=true`;

                            fetch(countries3URL)
                                .then((response) => response.json())
                                .then((data) => {
                                    let population3 = data[0].population;
                                    // let populationSum = population1 + population2 + population3;
                                    console.log(population1);
                                    console.log(population2);
                                    console.log(population3);
                                });
                        });

                })
                .catch(() => {
                    alert("error, fill all inputs 4");
                });
        })
        .catch(() => {
            alert("error, fill all inputs 5");
        });
});




