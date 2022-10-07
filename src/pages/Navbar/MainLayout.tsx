import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from ".";
import ProtectedRoute from "../../PrivateRoute";
import BrowseLiveGames from "../browse_live_games";

import MatchHighlights from "../match_highlights";
import ViewHighlightsGame from "../View/view_highlights";
import ViewLiveGame from "../View/view_live_game";

function MainLayout() {
  return (
    <>
      <React.Fragment />
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <>
              <ProtectedRoute>
                <BrowseLiveGames />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <ProtectedRoute>
                <BrowseLiveGames />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/browse-live-games"
          element={
            <>
              <ProtectedRoute>
                <BrowseLiveGames />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/view-live-game/:id"
          element={
            <>
              <ProtectedRoute>
                <ViewLiveGame />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/match-highlights"
          element={
            <>
              <ProtectedRoute>
                <MatchHighlights />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/view-match-highlight/:id"
          element={
            <>
              <ProtectedRoute>
                <ViewHighlightsGame />
              </ProtectedRoute>
            </>
          }
        />
      </Routes>
      <React.Fragment />
    </>
  );
}

export default MainLayout;
