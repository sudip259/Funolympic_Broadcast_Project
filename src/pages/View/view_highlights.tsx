import { useParams } from "react-router-dom";
import ViewGame from "./index";

const ViewHighlightsGame = () => {
  let params = useParams();
  return (
    <ViewGame
      game_type={"Match Highlight"}
      id={params.id}
      endUrl={"match-highlights"}
      getCommentListUrl={"match-highlight-comments"}
      postCommentUrl={"post-match-highlight-comments"}
    />
  );
};
export default ViewHighlightsGame;
