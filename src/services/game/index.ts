import api from "../api";
import TokenService from "../token.service";

// get live games from api
const getLiveGames = async (search: any, page: any) => {
  console.log(search);
  if (search === null) {
    return await api.get(`/game/?page=${page}`);
  } else {
    return await api.get(`/game/?search=${search}&page=${page}`);
  }
};

const getMatchHighlights = async (search: any, page: any) => {
  if (search === null) {
    return await api.get(`/match-highlights/?page=${page}`);
  } else {
    return await api.get(`/match-highlights/?search=${search}&page=${page}`);
  }
};

const getGameById = async (endUrl: any, id: any) => {
  return await api.get(`/${endUrl}/${id}`);
};
const getCommentList = async (commentListUrl: any) => {
  return await api.get(`/${commentListUrl}/`);
};
const postComment = async (commentPostUrl: any, id: any, content: any) => {
  console.log(TokenService.getUser().id);
  return await api.post(`/${commentPostUrl}/`, {
    content: content,
    game: parseInt(id),
    user: TokenService.getUser().id,
  });
};

const GameService = {
  getLiveGames,
  getMatchHighlights,
  getGameById,
  getCommentList,
  postComment,
};
export default GameService;
