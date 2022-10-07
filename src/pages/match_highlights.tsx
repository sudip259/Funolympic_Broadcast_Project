import { Card, Empty, Input, Pagination, Tooltip } from "antd";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import "./Navbar/App.css";
import GameService from "../services/game";
import { SearchOutlined } from "@ant-design/icons";

const MatchHighlights = () => {
  const [data, setData] = useState<any>({});
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    GameService.getMatchHighlights(search, page)
      .then((res) => {
        setData(res?.data);
      })
      .catch(() => {
        setData({});
      });
  }, [page, search]);
  let navigate = useNavigate();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="browseHeader">
        <Tooltip
          title="search by game title and team name"
          color={"cyan"}
          key={"cyan"}
        >
          <Input
            addonAfter={<SearchOutlined />}
            onChange={(e: any) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search Match Highlights"
            allowClear
            size="large"
          />
        </Tooltip>
        {data?.count !== 0 && (
          <>
            {data?.results?.map((item: any) => (
              <Card
                style={{
                  marginBottom: "5px",
                  boxShadow:
                    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                }}
                hoverable
                size="small"
                className="card"
                onClick={() => navigate(`/view-match-highlight/${item?.id}`)}
              >
                <div className="inside-card">
                  <div>
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        border: "1px gray solid",
                        margin: "0px 5px",
                      }}
                      src={item?.team1_logo}
                    />
                    {item?.team1}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {/* <p>
                      {item?.broadcast_time.replace("Z", "").replace("T", "")}
                    </p> */}
                    <div style={{ fontSize: "30px", marginBottom: "15px" }}>
                      {item?.team1_score}-{item?.team2_score}
                    </div>
                    <div>{item?.game_title} </div>
                  </div>
                  <div>
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        border: "1px gray solid",
                        margin: "0px 5px",
                      }}
                      src={item?.team2_logo}
                    />
                    {item?.team2}
                  </div>
                </div>
              </Card>
            ))}
            <Card bordered>
              <Pagination
                current={page}
                onChange={(page) => {
                  setPage(page);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                defaultCurrent={1}
                total={data?.count}
                pageSize={5}
              />
            </Card>
          </>
        )}

        {data?.count === 0 && <Empty />}

        <div style={{ height: "1px", background: "gray" }} />

        <Footer />
      </div>
    </Suspense>
  );
};
export default MatchHighlights;
