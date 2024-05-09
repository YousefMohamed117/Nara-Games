import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { format, differenceInYears } from "date-fns";
import Similar from "./Similar";
import Popular from "./Popular";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
const Main = ({ setUrl }) => {
  const { fetchSingle, fetchPopular } = useAuth();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [popular, setPopular] = useState(null);
  const [id, setId] = useState(null);
  const formatDateWithAge = (date) => {
    const currentDate = new Date();
    const yearsAgo = differenceInYears(currentDate, date * 1000);
    const formattedDate = format(date * 1000, "MMM d, yyyy");
    return `${formattedDate} (${yearsAgo} years ago)`;
  };

  function pickRandomId(idList) {
    const randomIndex = Math.floor(Math.random() * idList.length);
    return idList[randomIndex];
  }
  const idList = [
    1942, 19564, 14362, 25076, 112875, 52189, 2003, 114795, 265911, 26192,
  ];

  useEffect(() => {
    if (!id) {
      const randomId = pickRandomId(idList);
      setId(randomId);
    }
  }, [id, idList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchSingle(id);
        if (data && data.length > 0) {
          const modifiedCoverUrl = data[0].cover.url.replace(
            "/t_thumb/",
            "/t_original/"
          );

          // Update state only if the component is still mounted
          setUrl(modifiedCoverUrl);

          const modifiedScreenshots = data[0].screenshots.map((e) => ({
            ...e,
            url: e.url.replace("/t_thumb/", "/t_cover_big/"),
          }));

          const modifiedSimilarGames = data[0].similar_games.map((game) => ({
            ...game,
            cover: {
              ...game.cover,
              url: game.cover.url.replace("/t_thumb/", "/t_cover_big/"),
            },
          }));

          setGame([
            {
              ...data[0],
              cover: { ...data[0].cover, url: modifiedCoverUrl },
              screenshots: modifiedScreenshots,
              similar_games: modifiedSimilarGames,
            },
          ]);
          setLoading(false);
        }
      } catch (error) {
        Navigate("/error");
        setLoading(false);
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController
    const fetchData = async () => {
      try {
        const data = await fetchPopular({ signal: abortController.signal }); // Pass the AbortSignal to the fetch function
        if (data && data.length > 0) {
          const modifiedData = data.map((item) => {
            if (!item.cover.url) {
              return null;
            }
            const modifiedCoverUrl = item.cover.url.replace(
              "/t_thumb/",
              "/t_original/"
            );
            return {
              ...item,
              cover: { ...item.cover, url: modifiedCoverUrl },
            };
          });

          setPopular(modifiedData);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Abort the fetch request when the component unmounts or when the effect is re-run
    };
  }, [id]);

  return (
    <div>
      {game && !loading && (
        <div className="main z-0 relative flex w-full gap-6 mt-[76px] mx-auto sm:-ml-[30px]">
          <div className="lg:basis-3/4  w-full sm:px-[10px] pr-[10px]">
            <div className="flex gap-5 pb-5 pt-[10px] border-b-[1px] pl-[10px]">
              <div className="screen xl:flex hidden flex-col gap-[20px] items-baseline">
                {game[0].screenshots.map(
                  (e, i) =>
                    i < 4 && (
                      <img
                        key={i}
                        src={e.url}
                        alt={e.id}
                        className="h-[110px] rounded-2xl"
                      />
                    )
                )}
              </div>
              <div className="flex-1">
                <Link to={`game/${game[0].id}`}>
                  <div className="flex backdrop:blur-sm sm:gap-3 bg-[rgba(0,0,0,0.2)] rounded-2xl sm:flex-row flex-col">
                    <img
                      src={game[0].cover.url}
                      alt=""
                      className="xl:h-[500px] md:h-[450px] sm:h-[350px] h-[250px] rounded-2xl aspect-square sm:aspect-auto object-cover"
                    />
                    <div className="text-white p-3 sm:p-1">
                      <p className="md:text-5xl text-4xl sm:mt-7 mt-3  ">
                        {game[0].name}
                      </p>
                      <div className=" sm:mt-7 mt-3 md:leading-8">
                        <p className="md:text-xl text-lg">
                          {game[0].first_release_date &&
                            formatDateWithAge(
                              new Date(game[0].first_release_date)
                            )}
                        </p>
                        <div className="mt-4">
                          <span className="font-bold text-[#eee] mr-3">
                            Publishers:
                          </span>
                          {game[0].involved_companies &&
                            game[0].involved_companies.map((v, i) => (
                              <React.Fragment key={i}>
                                <Link to={`/companies/${v.company.name}`}>
                                  <span className="underline" key={i}>
                                    {v.company.name}
                                  </span>
                                </Link>
                                {i !==
                                  game[0].involved_companies.length - 1 && (
                                  <span className="mr-2">,</span>
                                )}
                              </React.Fragment>
                            ))}
                        </div>
                        <div className="mt-4">
                          <span className="font-bold text-[#eee] mr-3">
                            Genres:
                          </span>
                          {game[0].genres.map((e, i) => (
                            <React.Fragment key={i}>
                              <Link
                                to={`/genres/${e.name.replace(
                                  "Hack and slash/Beat 'em up",
                                  "Hack and slash Beat 'em up"
                                )}`}
                              >
                                <span className="underline">{e.name}</span>
                              </Link>
                              {i !== game[0].genres.length - 1 && (
                                <span className="mr-2">,</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <p>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-[color:#ffeb3b] mr-1 font-medium"
                          />
                          {(game[0].aggregated_rating / 20).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <Popular setId={setId} direction="" popular={popular} />
          </div>
          <Similar
            similar_games={game[0].similar_games}
            setId={setId}
            direction="vertical"
          />
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Main;
