const useAuth = () => {
  const cors_api = "https://back-zus8.onrender.com/";

  // Initialize accessToken and expirationTime from localStorage
  let accessToken = localStorage.getItem("accessToken");
  let expirationTime = localStorage.getItem("expirationTime");

  async function fetchAccessToken() {
    try {
      const response = await fetch(
        cors_api +
          `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch access token. Status: ${response.status}`
        );
      }
      const data = await response.json();
      accessToken = data.access_token;
      expirationTime = Date.now() + data.expires_in * 1000;

      // Store accessToken and expirationTime in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expirationTime", expirationTime);
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }

  async function refreshTokenIfNeeded() {
    if (!accessToken || !expirationTime || Date.now() >= expirationTime) {
      await fetchAccessToken();
    }
  }

  const fetchSingle = async (id) => {
    await refreshTokenIfNeeded();
    try {
      const response = await fetch(
        cors_api +
          `https://api.igdb.com/v4/games/${id}?fields=involved_companies.company.name,game_modes.name,themes.name,artworks.url,dlcs.name,dlcs.cover.url,expanded_games.name,expanded_games.cover.url,websites.url,age_ratings.rating,involved_companies.company.name,rating_count,aggregated_rating,collection,cover.url,first_release_date,genres.name,name,platforms.name,platforms.abbreviation,rating,screenshots.url,storyline,summary,similar_games.cover,aggregated_rating_count,storyline,summary,similar_games.name,similar_games.cover.url,similar_games.aggregated_rating,similar_games.summary,artworks.url,videos.video_id`,
        {
          headers: {
            "Client-ID": process.env.REACT_APP_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const fetchPopular = async () => {
    await refreshTokenIfNeeded();
    function pickRandomId(idList) {
      const randomIndex = Math.floor(Math.random() * idList.length);
      return idList[randomIndex];
    }
    const idList = [36, 2, 4, 5, 7, 8, 9, 10, 11, 12];

    const randomId = pickRandomId(idList);
    try {
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: `
    fields age_ratings.rating,summary, involved_companies.company.name, aggregated_rating, cover.url, first_release_date, name, rating;
    sort rating desc;
    where cover != null;
    where genres = ${randomId};
  `,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchLength = async (search) => {
    await refreshTokenIfNeeded();
    try {
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: `
            search "${search}";
            limit 500; 
          `,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchGenresLength = async (genres, themes) => {
    await refreshTokenIfNeeded();
    try {
      let body = "limit 500;";
      if (genres.length > 0 || themes.length > 0) {
        body += `where `;
        if (genres.length > 0) {
          body += `genres.name = (${genres
            .map((name) => `"${name}"`)
            .join(",")})`;
        }
        if (genres.length > 0 && themes.length > 0) {
          body += " & ";
        }
        if (themes.length > 0) {
          body += `themes.name = (${themes
            .map((name) => `"${name}"`)
            .join(",")})`;
        }
        body += ";";
      }
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchGenreLength = async (genre) => {
    await refreshTokenIfNeeded();
    try {
      let body = `limit 500; where genres.name = "${genre}";`;
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchThemeLength = async (theme) => {
    await refreshTokenIfNeeded();
    try {
      let body = `limit 500; where themes.name = "${theme}";`;
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchPlatformLength = async (platform) => {
    await refreshTokenIfNeeded();
    try {
      let body = `limit 500; where platforms.abbreviation = "${platform}";`;
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchCompanyLength = async (company) => {
    await refreshTokenIfNeeded();
    try {
      let body = `limit 500; where involved_companies.company.name = "${company}";`;
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchPerspectiveLength = async (perspective) => {
    await refreshTokenIfNeeded();
    try {
      let body = `limit 500; where game_modes.name = "${perspective}";`;
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/plain",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchSearch = async (search, currentPage, itemsPerPage) => {
    await refreshTokenIfNeeded();
    try {
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: `
          fields involved_companies.company.name, cover.url, first_release_date, name, rating, genres.name, themes.name;
          where cover != null;
          ${search ? `search "${search}";` : "sort rating desc;"}
          limit ${itemsPerPage}; 
          offset ${(currentPage - 1) * itemsPerPage};  
        `,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchSearchSample = async (search) => {
    await refreshTokenIfNeeded();
    try {
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: `
          fields  first_release_date, name, rating;
          where cover != null;
          search "${search}";
          limit 5; 
        `,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const fetchGenres = async () => {
    await refreshTokenIfNeeded();
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(
        cors_api + "https://api.igdb.com/v4/genres",
        {
          method: "POST",
          headers: {
            "Client-ID": process.env.REACT_APP_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: `
            fields name;
          `,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchThemes = async () => {
    await refreshTokenIfNeeded();
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(
        cors_api + "https://api.igdb.com/v4/themes",
        {
          method: "POST",
          headers: {
            "Client-ID": process.env.REACT_APP_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: `
            fields name;
          `,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const fetchGamesByFilters = async (
    selectedGenres,
    selectedThemes,
    currentPage,
    itemsPerPage
  ) => {
    await refreshTokenIfNeeded();
    let body = `
      limit 500;
      fields involved_companies.company.name, cover.url, first_release_date, name, rating, genres.name, themes.name;
      where cover != null;
      limit ${itemsPerPage}; 
      offset ${(currentPage - 1) * itemsPerPage};  
    `;
    if (selectedGenres.length > 0 || selectedThemes.length > 0) {
      body += "where ";
      if (selectedGenres.length > 0) {
        body += `genres.name = ("${selectedGenres.join('","')}")`;
      }
      if (selectedGenres.length > 0 && selectedThemes.length > 0) {
        body += " & ";
      }
      if (selectedThemes.length > 0) {
        body += `themes.name = ("${selectedThemes.join('","')}")`;
      }
      body += ";";
    } else {
      body += "sort rating desc;";
    }
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchGamesGenre = async (genre, currentPage, itemsPerPage) => {
    genre = genre.replace(
      "Hack and slash Beat 'em up",
      "Hack and slash/Beat 'em up"
    );

    await refreshTokenIfNeeded();
    let body = `
      limit 500;
      fields involved_companies.company.name, cover.url, first_release_date, name, rating, genres.name, themes.name;
      where cover != null &  genres.name = "${genre}";
      limit ${itemsPerPage}; 
      offset ${(currentPage - 1) * itemsPerPage};  
    `;
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchGamesTheme = async (theme, currentPage, itemsPerPage) => {
    await refreshTokenIfNeeded();
    let body = `
      limit 500;
      fields involved_companies.company.name, cover.url, first_release_date, name, rating, genres.name, themes.name;
      where cover != null &  themes.name = "${theme}";
      limit ${itemsPerPage}; 
      offset ${(currentPage - 1) * itemsPerPage};  
    `;
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchGamesPlatform = async (platform, currentPage, itemsPerPage) => {
    await refreshTokenIfNeeded();
    let body = `
      limit 500;
      fields involved_companies.company.name, cover.url, first_release_date, name, rating, genres.name, themes.name;
      where cover != null &  platforms.abbreviation = "${platform}";
      limit ${itemsPerPage}; 
      offset ${(currentPage - 1) * itemsPerPage};  
    `;
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchGamesCompany = async (company, currentPage, itemsPerPage) => {
    await refreshTokenIfNeeded();
    let body = `
      limit 500;
      fields involved_companies.company.name, cover.url, first_release_date, name, rating, genres.name, themes.name;
      where cover != null &  involved_companies.company.name = "${company}";
      limit ${itemsPerPage}; 
      offset ${(currentPage - 1) * itemsPerPage};  
    `;
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };
  const fetchGamePerspective = async (
    perspective,
    currentPage,
    itemsPerPage
  ) => {
    await refreshTokenIfNeeded();
    let body = `
      limit 500;
      fields involved_companies.company.name, cover.url, first_release_date, name, rating, genres.name, themes.name;
      where cover != null &  game_modes.name = "${perspective}";
      limit ${itemsPerPage}; 
      offset ${(currentPage - 1) * itemsPerPage};  
    `;
    try {
      // If search is undefined or empty, fetch popular games
      const response = await fetch(cors_api + "https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.REACT_APP_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  return {
    fetchSingle,
    fetchPopular,
    fetchSearch,
    fetchLength,
    fetchGenreLength,
    fetchCompanyLength,
    fetchPerspectiveLength,
    fetchGenres,
    fetchThemes,
    fetchSearchSample,
    fetchGamesByFilters,
    fetchGenresLength,
    fetchGamesGenre,
    fetchGamesTheme,
    fetchThemeLength,
    fetchPlatformLength,
    fetchGamesPlatform,
    fetchGamesCompany,
    fetchGamePerspective,
  }; // Return the auth function
};

export default useAuth;
