import React, { useContext } from "react";
import { PostContext } from "../context/UserPostContext";
import close from "../assets/close.png";
function PostCreatePopup() {
  const {
    setPostDescription,
    postDescription,
    closePostPopup,
    handleAddImagePost,
    handleCreatePost,
    postPopup,
  } = useContext(PostContext);

  return (
    <>
      {postPopup && (
        <div className="md:flex z-50 md:top-20 top-16  bg-white/70 w-[100%] h-[90vh] absolute items-center flex-col justify-center  rounded-md  ">
          <img
            className="absolute right-10 top-10"
            onClick={closePostPopup}
            src={close}
            alt="close"
          />
          <div className="md:w-96 w-[80%] bg-white md:h-[60vh] h-[50vh]  mt-32 mx-10 rounded-md drop-shadow-xl gap-3 flex flex-col md:p-6 px-5 py-4   ">
            <input
              type="file"
              onChange={handleAddImagePost}
              className="md:w-[100%]  md:h-36 h-24 rounded-md"
              placeholder="Add image"
              alt=""
            />
            <div className="flex flex-col items-start gap-2 ">
              <input
                onChange={(e) => setPostDescription(e.target.value)}
                className="font-bold md:text-lg  border"
                value={postDescription}
                placeholder="place name"
              />

              <button
                onClick={handleCreatePost}
                className="px-5 py-3 text-white bg-black rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCreatePopup;
