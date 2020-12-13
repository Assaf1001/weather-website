const form = document.getElementById("my-form");
const input = form.children[0];
const button = form.children[1];
const weatherContent = document.getElementById("weather-content");

const fetchData = async (adress) => {
  try {
    const data = await fetch(`/weather?adress=${adress}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((resObj) => {
        if (resObj.error) {
          console.log(resObj.error);
          throw resObj.error;
        } else {
          console.log(resObj);
          return resObj;
        }
      });
    return data;
  } catch (err) {
    throw { error: err };
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (weatherContent.children.length > 0) {
    while (weatherContent.children.length > 0) {
      weatherContent.children[0].remove();
    }
  }
  fetchData(input.value)
    .then((res) => {
      const location = document.createElement("p");
      location.innerText = `Location: ${res.location}`;
      weatherContent.appendChild(location);

      const description = document.createElement("p");
      description.innerText = `Description: ${res.description}`;
      weatherContent.appendChild(description);

      const temperature = document.createElement("p");
      temperature.innerText = `Temperature: ${res.temperature}`;
      weatherContent.appendChild(temperature);

      const feelslike = document.createElement("p");
      feelslike.innerText = `Feels likes: ${res.feelslike}`;
      weatherContent.appendChild(feelslike);
    })
    .catch((err) => {
      const error = document.createElement("p");
      error.innerText = `Error: ${err.error}`;
      weatherContent.appendChild(error);
    });
});

//mod
