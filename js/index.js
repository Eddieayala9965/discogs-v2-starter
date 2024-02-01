"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("CONTENT LOADED");
  const greeting = document.createElement("h1");
  const root = document.querySelector("#root");

  greeting.textContent = "Discogs API Lookup";
  root.append(greeting);

  // We're defining a default, but this will change!
  let artistId = "219213";

  const get = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Music/3.0",
          Authorization: "Bearer qOxOzMMAblOXHvbjptoPyKZmHgyOQJzCbtrOtYAQ",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showArtist = (artistName) => {
    const artistHeader = document.createElement("h2");
    artistHeader.textContent = artistName;
    root.appendChild(artistHeader);
  };

  const getReleases = async (url) => {
    try {
      const data = await get(url);
      // Destructure the releases
      const { releases } = data;
      // Create UL
      const list = document.createElement("ul");
      // Append it to the #root
      root.appendChild(list);

      // Loop through the releases array
      releases.forEach((release) => {
        // Create a list item
        const listItem = document.createElement("li");
        //  create button
        const addPlayButton = document.createElement("button");
        addPlayButton.type = "button";
        addPlayButton.textContent = "add to playlist";
        listItem.appendChild(addPlayButton);
        // Add the release title to the list item
        listItem.textContent = `${release.title} - ${release.year}`;
        // Append the list item to the list
        list.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching releases:", error);
    }
  };

  // This is an Immediately Invoked Function Expression (IIFE)
  (async () => {
    try {
      const data = await get(`https://api.discogs.com/artists/${artistId}`);
      // Destructure our data
      const { name, releases_url } = data;
      // Call it back
      showArtist(name);
      await getReleases(releases_url);
    } catch (error) {
      console.error("Error initializing:", error);
    }
  })();
});
