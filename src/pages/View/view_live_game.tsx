import { useParams } from "react-router-dom";
import ViewGame from "./index";

const ViewLiveGame = () => {
  let params = useParams();
  return (
    <ViewGame
      game_type={"Live"}
      id={params.id}
      endUrl={"game"}
      getCommentListUrl={"live-game-comments"}
      postCommentUrl={"post-live-game-comments"}
    />
  );
};
export default ViewLiveGame;
