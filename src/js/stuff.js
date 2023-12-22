function renderLinks(items) {
  // Get the container element
  var container = document.getElementById("stuff");

  // Clear previous content
  container.innerHTML = "";

  // Loop through each item and append the HTML
  items.forEach(function (item) {
    var html = `
            <a class="w-64 shadow-xl bg-main p-2" href="${item.link}">
                <h1 class="font-semibold mb-2">${item.title}</h1>
                <p class="text-left">${item.description}</p>
            </a>
        `;

    container.innerHTML += html;
  });
}

// Example usage
var links = [
  {
    title: "Remain Voter",
    description:
      "A website for determining how to tactically vote based on your postcode",
    link: "https://github.com/remainvoter/eu2019model",
  },
  {
    title: "I 💓 Pangodivns",
    description: "A website for raising awareness of pangolins",
    link: "https://n1ckdm.github.io/iheartpangolins/",
  },
  {
    title: "Equal Insight",
    description: "A platform for analysing EDI data",
    link: "https://equal-insight.azurewebsites.net/",
  },
  {
    title: "Enginerds",
    description: "A podcast about engineering stuff",
    link: "https://enginerds.co.uk/",
  },
  {
    title: "OAATS 🥣",
    description: "Work in progress...",
    link: "#",
  },
];

// Call the function
renderLinks(links);
