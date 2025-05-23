import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import ContentCard from "./ContentCard";
import Dialog from "./Dialog";
import ButtonColour from "./ButtonColour";

export default function ShareHome() {
  const { shareId } = useParams();
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState("all");
  const [signOutConfirm, setSignOutConfirm] = useState(false);
  const [signInState, setSignInState] = useState(true);
  const navigate = useNavigate();

  const getContent = useCallback(
    async function () {
      const response = await fetch(
        `http://localhost:3000/api/v1/brain/${shareId}`,
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token") as string,
          },
        }
      );
      const data = await response.json();
      setContent(data.content);
    },
    [shareId]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSignInState(false);
    } else {
      setSignInState(true);
    }
    getContent();
  }, [navigate, shareId, getContent]);
  return (
    <div className="flex">
      <div className="h-screen w-1/6 min-w-80 pr-4">
        <Sidebar
          selected={selected}
          setSelected={setSelected}
          getContent={getContent}
          setContent={setContent}
        />
      </div>
      <div className="w-full h-screen">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-nowrap p-4 text-3xl font-bold text-gray-700">
            You are viewing the notes of{" "}
            <span className="text-red-600">
              {content.length !== 0 && content[0]["userId"]["username"]}
            </span>
          </h2>
          <div className="flex w-full justify-end">
            {/* Sign Out Dialog */}
            <Dialog
              open={signOutConfirm}
              onClose={() => {
                setSignOutConfirm(false);
              }}
              borderColour="border-red-500"
            >
              <div className="w-[24rem] m-4">
                <h2 className="text-3xl font-bold text-center">
                  Are you sure you want to sign out ?
                </h2>

                <div className="flex gap-8 m-4">
                  <ButtonColour
                    onClick={() => {
                      localStorage.removeItem("token");
                      alert("You have been signed out!");
                      setSignOutConfirm(false);
                      setSignInState(false);
                    }}
                    style="bg-red-500 hover:bg-red-600 shadow-2xs"
                  >
                    Yes
                  </ButtonColour>
                  <ButtonColour
                    onClick={() => {
                      setSignOutConfirm(false);
                    }}
                    style="bg-gray-400 hover:bg-gray-500 shadow-2xs"
                  >
                    No
                  </ButtonColour>
                </div>
              </div>
            </Dialog>

            {signInState ? (
              <>
                <div className="my-4 mx-2">
                  <ButtonColour
                    onClick={() => {
                      navigate("/home");
                    }}
                    style="bg-blue-400 font-black border-2 border-blue-400 hover:text-black hover:bg-white"
                  >
                    Home
                  </ButtonColour>
                </div>
                <div className="my-4 mx-2">
                  <ButtonColour
                    onClick={() => {
                      setSignOutConfirm(true);
                    }}
                    style="bg-red-500 font-black border-2 border-red-500 hover:text-black hover:bg-white"
                  >
                    Sign Out
                  </ButtonColour>
                </div>
              </>
            ) : (
              <div className="my-4 mx-2">
                <ButtonColour
                  onClick={() => {
                    navigate("/signin");
                  }}
                  style="bg-red-500 font-black border-2 border-red-500 hover:text-black hover:bg-white"
                >
                  Sign In
                </ButtonColour>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap ">
          {content.map((con, index) => {
            return (
              <ContentCard
                key={index}
                title={con["title"]}
                link={con["link"]}
                tags={con["tags"]}
                type={con["type"]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
