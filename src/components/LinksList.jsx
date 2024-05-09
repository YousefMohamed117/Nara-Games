import React from "react";

const domainIcons = {
  "twitch.tv": "https://www.igdb.com/icons/twitch.svg",
  "youtube.com": "https://www.igdb.com/icons/youtube.svg",
  "en.wikipedia.org": "https://www.igdb.com/icons/wikipedia.svg",
  "reddit.com": "https://www.igdb.com/icons/reddit.svg",
  "store.steampowered.com": "https://www.igdb.com/icons/steam.svg",
  "epicgames.com": "https://www.igdb.com/icons/epic.svg",
  "store.epicgames.com": "https://www.igdb.com/icons/epic.svg",
  website: "https://www.igdb.com/icons/official.svg", // Official Website icon
  "fandom.com": "https://www.igdb.com/icons/community-wiki.svg", // Wiki icon
  "facebook.com": "https://www.igdb.com/icons/facebook.svg", // Wiki icon
  "twitter.com": "https://www.igdb.com/icons/twitter.svg", // Wiki icon
  "instagram.com": "https://www.igdb.com/icons/instagram.svg", // Wiki icon
  "gog.com": "https://www.igdb.com/icons/gog.svg", // Wiki icon
  "discordapp.com": "https://www.igdb.com/icons/discord.svg", // Wiki icon
  "discord.com": "https://www.igdb.com/icons/discord.svg", // Wiki icon
  "discord.gg": "https://www.igdb.com/icons/discord.svg", // Wiki icon
  "play.google.com": "https://www.igdb.com/icons/play-store.svg", // Wiki icon
  "itunes.apple.com": "https://www.igdb.com/icons/ios-iphone.svg", // Wiki icon
  // Add more domain-icon mappings as needed
};

const getDomain = (url) => {
  let domain = "";

  if (url.includes("fandom")) {
    domain = "fandom.com"; // Set a consistent domain name for any link containing "fandom"
  } else if (url.includes("youtube.com")) {
    domain = "youtube.com";
  } else {
    const domainRegex =
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim;
    const matches = domainRegex.exec(url);
    domain = matches && matches.length >= 2 ? matches[1] : "";
  }

  return domain;
};

// Component for rendering each link item
const LinkItem = ({ website }) => {
  const domain = getDomain(website.url); // Extract domain from URL
  const iconUrl = domainIcons[domain.toLowerCase()]; // Get icon URL based on domain

  return (
    <div
      className="flex items-center hover:scale-110 group duration-300 "
      style={{ textShadow: "0px 0px 6px black" }}
    >
      {iconUrl ? ( // Check if icon URL exists
        <img src={iconUrl} alt={domain} className="w-6 h-6 mr-2" /> // Display the icon image
      ) : (
        <img
          src="https://www.igdb.com/icons/official-site.svg"
          alt={domain}
          className="w-6 h-6 mr-2"
        />
      )}
      <a
        href={website.url}
        target="_blank"
        className="p-2 rounded-lg flex items-center gap-2 group-hover:underline"
      >
        <span>{domain.split(".")[domain.split(".").length - 2]}</span>{" "}
        {/* Display only the first part of the domain */}
      </a>
    </div>
  );
};

// Component for rendering list of links
const LinksList = ({ websites }) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2  gap-4 mt-4 ">
      {websites &&
        websites.map((website, index) => (
          <LinkItem key={index} website={website} />
        ))}
    </div>
  );
};

export default LinksList;
