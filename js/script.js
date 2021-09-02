// Get all required element here

const searchInput = document.getElementById("search_input");
const resultsDiv = document.getElementById("results");
const resultsCount = document.getElementById("results_count");
const topResults = document.getElementById("top_results");
const loader = document.getElementById("loader");

// Show how many result found

const showResultCount = (number, searchText) => {
  resultsCount.innerText = `Total ${number} results found for this keyword " ${searchText} "`;
};

// Call the loadResult()  function

document.getElementById("search_input").addEventListener("click", (event) => {
  if (event.click === "Enter") {
    loadResults();
  }
});

// Load results

const loadResults = async () => {
  const searchText = searchInput.value; //get input value

  // Set value empty
  resultsDiv.textContent = "";
  resultsCount.textContent = "";
  searchInput.value = "";

  topResults.style.display = "none";
  loader.style.display = "block";

  // Alert when searchText is empty

  if (searchText == "") {
    loader.style.display = "none";
    alert("Please enter a book name for search!");
  } else {
    try {
      const url = `https://openlibrary.org/search.json?q=${searchText}`;
      const res = await fetch(url);
      const data = await res.json();
      const resultFound = data?.numFound;
      showResultCount(resultFound, searchText); //show numbers of result
      showResults(data?.docs);
    } catch (error) {
      alert("Something happened wrong! Please wait and try again.");
    }
  }
};

// Displaying results
const showResults = (data) => {
  if (data?.length == 0) {
    alert("No search Result found"); 
  }

  topResults.innerText = `Showing top ${data?.length} results`; // show result numbers

  data?.forEach((item) => {
    const bookName = item?.title;
    const authors = item?.author_name?.toString(); 
    const firstPublish = item?.first_publish_year;
    const publisher = item?.publisher?.[0];
    const imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`;

    const div = document.createElement("div");
    div.className = "col";
    div.innerHTML = `
        <div class="card border-0 shadow-lg" style="height:100%;border-radius: 20px;">
            ${
              item?.cover_i
                ? `<img src=${imgUrl} class="h-75 p-2 w-75 mx-auto" alt="...">`
                : ""
            }
            <div class="card-body">
                <h5 class="card-title fw-bolder">${
                  bookName ? bookName : ""
                }</h5>
                <p class="card-text"> ${
                  authors ? `Author : <b> ${authors}</b>` : ""
                } </p>
                <p class="card-text"> ${
                  firstPublish
                    ? `First Published : <b> ${firstPublish} </b>`
                    : ""
                }</p>
                <p class="card-text">${
                  publisher
                    ? `Publisher : <b> ${publisher} </b>`
                    : ""
                }</p>
            </div>
      </div>
        `;
    resultsDiv.appendChild(div); 
  });
  loader.style.display = "none"; 
  topResults.style.display = "block";
};