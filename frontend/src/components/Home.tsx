import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ButtonPurple from "./ButtonPurple";
import ButtonPurpleLight from "./ButtonPurpleLight";
import ContentCard from "./ContentCard";
import Dialog from "./Dialog";
import Input from "./Input";
import Button from "./Button";
import ButtonColour from "./ButtonColour";

export default function Home() {
  const [content, setContent] = useState([]);
  const [open, setOpen] = useState(false);
  const [signOutConfirm, setSignOutConfirm] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState("all");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState("link");
  const navigate = useNavigate();

  const addContentHandler = async () => {
    if (title && link && type) {
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token") as string,
        },
        body: JSON.stringify({
          link,
          title,
          type,
        }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Successfully added!");
        async function getContent() {
          const response = await fetch("http://localhost:3000/api/v1/content", {
            method: "GET",
            headers: {
              token: localStorage.getItem("token") as string,
            },
          });
          const data = await response.json();
          setContent(data.content);
        }
        await getContent();
        if (selected !== "all") {
          setContent((contentArr) => {
            return contentArr.filter((content) => {
              return content["type"] === selected;
            });
          });
        }
        setOpen(false);
        setLink("");
        setTitle("");
        setType("link");
        setTags("");
      }
    } else {
      alert("Fill the fields");
    }
  };

  async function getContent() {
    const response = await fetch("http://localhost:3000/api/v1/content", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token") as string,
      },
    });
    const data = await response.json();
    setContent(data.content);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("YOU MUST BE SIGNED IN");
      navigate("/signin");
    } else {
      getContent();
    }
  }, [navigate]);

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
          <h2 className="w-48 p-4 text-3xl font-bold text-gray-700">
            All Notes
          </h2>
          <div className="flex w-full justify-end">
            {/* Add Content Dialog */}
            <Dialog
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              borderColour="border-transparent"
            >
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addContentHandler();
                  }
                }}
                className="w-[28rem]"
              >
                <h2 className="text-4xl mb-10 text-gray-800 font-black text-center">
                  Add New Content
                </h2>
                <Input
                  inpType="text"
                  val={title}
                  setVal={setTitle}
                  id="contentTitle"
                  labelText="Title"
                />
                <Input
                  inpType="text"
                  val={link}
                  setVal={setLink}
                  id="contentLink"
                  labelText="Link"
                />
                <div className="my-4">
                  <label
                    htmlFor="contentType"
                    className="font-bold text-gray-700 m-1"
                  >
                    Type
                  </label>
                  <select
                    name="type"
                    id="contentType"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    className="border-2 font-bold border-gray-400 p-3 w-full rounded-md outline-none focus:border-gray-700"
                  >
                    <option value="link">link</option>
                    <option value="document">document</option>
                    <option value="video">video</option>
                    <option value="tweet">tweet</option>
                  </select>
                </div>
                <Input
                  inpType="text"
                  val={tags}
                  setVal={setTags}
                  id="contentTags"
                  labelText="Tags (Optional) (Yet to be implemented)"
                />
                <Button onClick={addContentHandler}>Add</Button>
              </div>
            </Dialog>
            {/* Sign Out Dialog */}
            <Dialog
              open={signOutConfirm}
              onClose={() => {
                setSignOutConfirm(false);
              }}
              borderColour="border-transparent"
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
                      navigate("/signin");
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
            {/* Share Brain Dialog */}
            <Dialog
              open={shareOpen}
              onClose={() => {
                setShareOpen(false);
              }}
              borderColour="border-transparent"
            >
              <div className="w-[24rem] m-4">
                <h2 className="text-3xl mb-10 font-black text-center">
                  Confirm to Generate a Share Link
                </h2>

                <div className="flex gap-8 m-4">
                  <ButtonColour
                    onClick={async () => {
                      const response = await fetch(
                        "http://localhost:3000/api/v1/brain/share",
                        {
                          method: "POST",
                          headers: {
                            token: localStorage.getItem("token") as string,
                          },
                        }
                      );
                      const data = await response.json();
                      if (response.ok) {
                        setShareOpen(false);
                        setLinkOpen(true);
                        setShareLink(
                          `http:localhost:5173/brain/${data.shareId}`
                        );
                      } else {
                        console.log(response);
                        console.log(data);
                        alert("Some error occurred");
                      }
                    }}
                    style="bg-green-500 hover:bg-green-600 shadow-2xs"
                  >
                    Yes
                  </ButtonColour>
                  <ButtonColour
                    onClick={() => {
                      setShareOpen(false);
                    }}
                    style="bg-gray-400 hover:bg-gray-500 shadow-2xs"
                  >
                    No
                  </ButtonColour>
                </div>
              </div>
            </Dialog>
            {/* Link Dialog */}
            <Dialog
              open={linkOpen}
              onClose={() => {
                setLinkOpen(false);
              }}
              borderColour="border-transparent"
            >
              <>
                <h2 className="mt-5 text-2xl border-2 p-4 rounded border-gray-300">
                  {shareLink}
                </h2>
                <div className="w-32 mt-4">
                  <ButtonColour
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(shareLink);
                      } catch (e) {
                        alert("Error in copying, sorry for the trouble");
                        console.log(e);
                      }
                    }}
                    style={`bg-green-400 text-xl flex items-center gap-1 border-2 border-green-400 hover:text-black hover:bg-white onclick-scale-125 `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                    Copy
                  </ButtonColour>
                </div>
              </>
            </Dialog>
            <div className="my-4 mx-2">
              <ButtonPurpleLight
                onClick={() => {
                  setShareOpen(true);
                }}
              >
                Share Brain
              </ButtonPurpleLight>
            </div>
            <div className="my-4 mx-2">
              <ButtonPurple
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add Content +
              </ButtonPurple>
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
                getContent={getContent}
                setContent={setContent}
                selected={selected}
                contentId={con["_id"]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
