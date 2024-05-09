import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { format, differenceInYears } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import LinksList from "../components/LinksList";
import Videos from "../components/Videos";
import Rating from "../components/Rating";
import GameDetailSwiper from "../components/GameDetailSwiper";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const GameDetails = ({ setUrl }) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const { fetchSingle } = useAuth();
  const formatDateWithAge = (date) => {
    const currentDate = new Date();
    const yearsAgo = differenceInYears(currentDate, date * 1000);
    const formattedDate = format(date * 1000, "MMM d, yyyy");
    if (yearsAgo < 1) {
      return `${formattedDate}`;
    }

    return `${formattedDate} (${yearsAgo} years ago)`;
  };
  const { id } = useParams();
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
          setUrl(modifiedCoverUrl);

          let modifiedScreenshots = [];
          if (data[0].screenshots) {
            modifiedScreenshots = data[0].screenshots.map((e) => ({
              ...e,
              url: e.url.replace("/t_thumb/", "/t_cover_big/"),
            }));
          }

          let modifiedSimilarGames = [];
          if (data[0].similar_games) {
            modifiedSimilarGames = data[0].similar_games.map((game) => ({
              ...game,
              cover: {
                ...game.cover,
                url: game.cover.url.replace("/t_thumb/", "/t_cover_big/"),
              },
            }));
          }

          let modifiedExpandedGames = [];
          if (data[0].expanded_games) {
            modifiedExpandedGames = data[0].expanded_games.map((game) => ({
              ...game,
              cover: {
                ...game.cover,
                url: game.cover.url.replace("/t_thumb/", "/t_cover_big/"),
              },
            }));
          }
          let modifiedDlcs = [];
          if (data[0].dlcs) {
            modifiedDlcs = data[0].dlcs.map((game) => ({
              ...game,
              cover: {
                ...game.cover,
                url: game.cover.url.replace("/t_thumb/", "/t_cover_big/"),
              },
            }));
          }
          let modifiedArtWorks = [];
          if (data[0].artworks) {
            modifiedArtWorks = data[0].artworks.map((game) => ({
              ...game,
              url: game.url.replace("/t_thumb/", "/t_cover_big/"),
            }));
          }

          setGame([
            {
              ...data[0],
              cover: { ...data[0].cover, url: modifiedCoverUrl },
              screenshots: modifiedScreenshots,
              expanded_games: modifiedExpandedGames,
              similar_games: modifiedSimilarGames,
              dlcs: modifiedDlcs,
              artworks: modifiedArtWorks,
            },
          ]);
          setLoading(false);
        }
      } catch (error) {
        Navigate("/error");
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="sm:ml-[89px]   ">
      {game && !loading && (
        <div className="">
          <Navbar />
          <div className="flex-1 mt-[76px]">
            <div className="flex backdrop:blur-sm sm:gap-3 bg-[rgba(0,0,0,0.2)] rounded-2xl md:flex-row flex-col">
              <img
                src={game[0].cover.url}
                alt=""
                className="lg:h-[500px] md:h-[450px] sm:h-[350px] h-[300px] rounded-2xl aspect-square sm:aspect-auto object-cover"
              />
              <div className="basis-1/2 p-2">
                <p className="lg:text-5xl md:text-4xl text-3xl lg:mt-7 mt-5">
                  {game[0].name}
                </p>
                <div className="lg:mt-7 mt-5 md:leading-8">
                  <p className="md:text-xl text-lg">
                    {game[0].first_release_date &&
                      formatDateWithAge(new Date(game[0].first_release_date))}
                  </p>
                  {game[0].involved_companies.map((e, i) => (
                    <React.Fragment key={i}>
                      <Link to={`/companies/${e.company.name}`}>
                        <span className="underline">{e.company.name}</span>
                        {i !== game[0].involved_companies.length - 1 && (
                          <span className="mr-2">,</span>
                        )}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
                <p className=" lg:mt-7 mt-5">{game[0].summary}</p>
                <div className="mt-4">
                  <span className="font-bold text-[#eee] mr-3">Genres:</span>
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
                <div className="mt-4">
                  <span className="font-bold text-[#eee] mr-3">Platforms:</span>
                  {game[0].platforms.map((e, i) => (
                    <React.Fragment key={i}>
                      <Link to={`/platforms/${e.abbreviation}`}>
                        <span className="underline">{e.name}</span>
                        {i !== game[0].platforms.length - 1 && (
                          <span className="mr-2">,</span>
                        )}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="gap-4 flex mx-auto my-16 justify-center lg:flex-row flex-col p-2">
              <LinksList websites={game[0].websites} />
              <div className="flex justify-center items-baseline">
                <div className="flex flex-col items-center text-xs w-[100px] text-wrap justify-end">
                  {game[0].rating ? (
                    <>
                      <Rating
                        progress={Math.round(game[0].rating)}
                        size={100}
                      />
                      <span className="mt-2">
                        Based on
                        <b> {game[0].rating_count} </b>
                        member ratings
                      </span>
                    </>
                  ) : (
                    <>
                      <Rating progress={0} size={100} />
                      <span>Not yet released</span>
                    </>
                  )}
                </div>
                <div className="flex flex-col items-center text-xs w-[100px] text-wrap justify-end">
                  {game[0].rating ? (
                    <>
                      <Rating
                        progress={Math.round(game[0].aggregated_rating)}
                        size={85}
                      />
                      <span className="mt-2">
                        Based on
                        <b> {game[0].aggregated_rating_count} </b>
                        critic ratings
                      </span>
                    </>
                  ) : (
                    <>
                      <Rating progress={0} size={85} />
                      <span>Critic Score Unavailable</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {game[0].videos && <Videos game={game[0]} />}
            {game[0].artworks.length > 0 && (
              <GameDetailSwiper
                game={game[0]}
                title="ArtWorks"
                path="artworks"
              />
            )}
            <div
              className="flex gap-8  xl:justify-between flex-wrap "
              style={{ textShadow: "0px 0px 6px black" }}
            >
              {game[0].storyline && (
                <div className="my-12 basis-1/2 md:min-w-[600px] min-w-[100%] p-2">
                  <p className="text-3xl mb-5 ">STORYLINE</p>
                  <p>{game[0].storyline}</p>
                </div>
              )}
              {game[0].themes && (
                <div className="my-12 md:flex-[unset] flex-1 p-2">
                  <p className="text-3xl mb-5">THEMES</p>
                  {game[0].themes.map((e, i) => (
                    <React.Fragment key={i}>
                      <Link to={`/themes/${e.name}`}>
                        <span key={i} className="underline">
                          {e.name}
                        </span>
                        {i !== game[0].themes.length - 1 && (
                          <span className="mr-2">,</span>
                        )}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              )}
              {game[0].involved_companies && (
                <div className="my-12 md:flex-[unset] flex-1 p-2">
                  <p className="text-3xl mb-5">DEVELOPERS</p>
                  {game[0].involved_companies.map((e, i) => (
                    <React.Fragment key={i}>
                      <Link to={`/companies/${e.company.name}`}>
                        <span className="underline">{e.company.name}</span>
                        {i !== game[0].involved_companies.length - 1 && (
                          <span className="mr-2">,</span>
                        )}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              )}
              {game[0].game_modes && (
                <div className="my-12 md:flex-[unset] flex-1 p-2">
                  <p className="text-3xl mb-5">GAME PERSPECTIVE</p>
                  {game[0].game_modes.map((e, i) => (
                    <Link to={`/perspectives/${e.name}`} key={i}>
                      <p className="underline" key={i}>
                        {e.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {game[0].expanded_games.length > 0 && (
              <GameDetailSwiper
                game={game[0]}
                title="Expanded Games"
                path="expanded_games"
              />
            )}
            {game[0].expanded_games.length > 0 && (
              <GameDetailSwiper
                game={game[0]}
                title="Similar Games"
                path="similar_games"
              />
            )}
            {game[0].dlcs.length > 0 && (
              <GameDetailSwiper game={game[0]} title="Dlcs" path="dlcs" />
            )}
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default GameDetails;
