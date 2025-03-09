const url = "https://api.github.com/users/rrane16";

function fetchData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

//fetchData();

async function fetchDataasync() {
  const response = await fetch(url);
  console.log("response", response);
  if (!response.ok) {
    throw new Error("error in api");
  }
  const json = await response.json();
  console.log("result is", json);
  console.log("object keys", Object.keys(json).length);
  console.log("object properties", Object.keys(json));
  console.log("object values", Object.values(json));
  console.log("json", JSON.stringify(json));
}
fetchDataasync();
