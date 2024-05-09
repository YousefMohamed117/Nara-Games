import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { format, differenceInYears } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const SearchTheme = ({ setUrl }) => {
  const { fetchThemeLength, fetchGamesTheme } = useAuth();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const itemsPerPage = 10; // Number of items to display per page

  const formatDateWithAge = (date) => {
    const currentDate = new Date();
    const yearsAgo = differenceInYears(currentDate, date * 1000);
    const formattedDate = format(date * 1000, "MMM d, yyyy");
    if (yearsAgo < 1) {
      return `${formattedDate}`;
    }
    return `${formattedDate} (${yearsAgo} years ago)`;
  };

  const { theme } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchThemeLength(theme);
        if (data && data.length > 0) {
          setTotalPages(Math.round(data.length / 10));
        }
      } catch (error) {
        Navigate("/error");
        console.error("Error fetching data:", error);
      }
    };
    fetchData(theme);
  }, [theme]);

  useEffect(() => {
    setCurrentPage(1);
  }, [theme]);

  useEffect(() => {
    setUrl(
      "https://res.cloudinary.com/dbuk0rdzn/image/upload/v1715242425/cb_awzrok.jpg"
    );
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGamesTheme(theme, currentPage, itemsPerPage);
        if (data && data.length > 0) {
          const modifiedData = data.map((item) => {
            if (!item.cover.url) {
              return null;
            }
            const modifiedCoverUrl = item.cover.url.replace(
              "/t_thumb/",
              "/t_cover_big/"
            );
            return {
              ...item,
              cover: { ...item.cover, url: modifiedCoverUrl },
            };
          });
          setGame(modifiedData);
        }
        setLoading(false);
      } catch (error) {
        Navigate("/error");
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [theme, currentPage, itemsPerPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="z-0 relative sm:ml-[89px] gap-6 sm:w-[calc(100vw-140px)] mx-auto">
      <>
        {game && !loading && (
          <div className="mt-5 ">
            <p className="text-3xl">
              Searching Games in <span className="underline">{theme}</span>
            </p>
            {game &&
              game.map((e, i) => (
                <div
                  key={i}
                  className="flex backdrop:blur-sm sm:gap-3 my-5 bg-[rgba(0,0,0,0.2)] rounded-2xl sm:flex-row flex-col"
                >
                  <Link to={`/game/${e.id}`} key={i}>
                    <img
                      src={e.cover.url}
                      alt=""
                      className="sm:h-full h-[300px] sm:w-[264px] min-w-[264px]  w-full p-2 
rounded-2xl  object-cover "
                    />
                  </Link>
                  <div className="text-white p-3 sm:p-1">
                    <p className="md:text-5xl text-4xl sm:mt-7 mt-3  ">
                      {e.name}
                    </p>
                    <div className=" sm:mt-7 mt-3 md:leading-8">
                      <p className="md:text-xl text-lg">
                        {e.first_release_date &&
                          formatDateWithAge(new Date(e.first_release_date))}
                      </p>
                      {e.involved_companies && (
                        <div className="flex mt-4 flex-wrap">
                          <p className="mr-2">Publishers:</p>
                          {e.involved_companies.map((v, i) => (
                            <React.Fragment key={i}>
                              <Link to={`/companies/${v.company.name}`}>
                                <span className="underline" key={i}>
                                  {v.company.name}
                                </span>
                              </Link>
                              {i !== e.involved_companies.length - 1 && (
                                <span className="mr-2">,</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                      {e.genres && (
                        <div className="flex flex-wrap md:mt-0 mt-3">
                          <p className="mr-2">genres:</p>
                          {e.genres.map((v, i) => (
                            <React.Fragment key={i}>
                              <Link
                                to={`/genres/${v.name.replace(
                                  "Hack and slash/Beat 'em up",
                                  "Hack and slash Beat 'em up"
                                )}`}
                              >
                                <span className="underline">{v.name}</span>
                              </Link>
                              {i !== e.genres.length - 1 && (
                                <span className="mr-2">,</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                      {e.themes && (
                        <div className="flex flex-wrap md:mt-0 mt-3">
                          <p className="mr-2">Themes:</p>
                          <div>
                            {e.themes.map((v, i) => (
                              <React.Fragment key={i}>
                                <React.Fragment key={i}>
                                  <Link to={`/themes/${v.name}`}>
                                    <span className="underline" key={i}>
                                      {v.name}
                                    </span>
                                    {i !== e.themes.length - 1 && (
                                      <span className="mr-2">,</span>
                                    )}
                                  </Link>
                                </React.Fragment>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                      <p>
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-[color:#ffeb3b] mr-1 font-medium"
                        />
                        {(e.rating / 20).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex justify-center mt-4">
              {/* Previous button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="mx-2 py-2 px-4 rounded-lg text-3xl bg-gray-500 text-gray-200 hover:bg-gray-600 disabled:opacity-50"
              >
                Prev
              </button>
              {/* Next button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="mx-2 py-2 px-4 rounded-lg text-3xl bg-gray-500 text-gray-200 hover:bg-gray-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {loading && <Loading />}
      </>
    </div>
  );
};

export default SearchTheme;
