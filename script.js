"use strict";

const output = document.querySelector("#output");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const baseURL = "https://rickandmortyapi.com/api";
const pageNo = document.getElementById("pageNo")

let page = 1;

// Generic fetch function

async function getData(url) {
  try {
      const res = await fetch(url);
      console.log("Fetching data.")

    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    // day 3 assignment requirement number 5 -- Handle a rate-limit or error path: If you receive a 429 or a rate-limited 403, show a friendly message:
    if (res.status == 429) {
      throw new Error(
        "Too many requests! Slow your roll and wait before trying again.",
      );
    }
    if (res.status == 403) {
      throw new Error(
        "Forbidden: The server understands the request but refuses to authorize it. :,(",
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function reset() {
    output.textContent = "";
    pageNo.textContent = "";
}

function pageNumDisplay() {
    const pg = document.createElement("span");
    pg.textContent = "Page: " + page;
    pageNo.appendChild(pg);
}

function render(character) {
    const name = document.createElement("p")
    name.textContent = "Name: " + character
    output.appendChild(name)

}


async function main() {

    // Setup Event Listeners
    try {
    //***fetch character data with a variable for page number and assign to a const***
      const data = await getData(baseURL + "/character?page=" + page);
      console.log(data);
      // **** Render On Page load ****
      for (let i = 0; i < 20; i++) {
        console.log(data.results[i].name);
        render(data.results[i].name);
      }
      pageNumDisplay();

      // ******PREVIOUS, change page state variable and render new list******
      prev.addEventListener("click", async () => {
        // get data when the previous button is clicked
        if (page < 2) {
          return;
        }
        page--;
        const data = await getData(baseURL + "/character?page=" + page);

        console.log(data);
        reset();
        pageNumDisplay();
        for (let i = 0; i < 20; i++) {
          console.log(data.results[i].name);
          render(data.results[i].name);
        }
      });

      // ******NEXT******
      next.addEventListener("click", async () => {
        page++;
        if (page >= 41) {
          return;
        }
        const data = await getData(baseURL + "/character?page=" + page);
        console.log(data);
        reset();
        pageNumDisplay();
        for (let i = 0; i < 20; i++) {
          console.log(data.results[i].name);
          render(data.results[i].name);
        }
      });

      for (let i = 0; i < 20; i++) {
        console.log(data.results[i].name);
      }
    } catch (error) {
    console.log(error);
  }
}
main();

