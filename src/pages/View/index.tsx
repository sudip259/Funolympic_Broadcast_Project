import { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Avatar,
  Tooltip,
  Comment,
  Card,
  Form,
  Input,
  Button,
  Divider,
} from "antd";
import moment from "moment";
import Footer from "../footer";
import GameService from "../../services/game";
import { useParams } from "react-router-dom";
const { TextArea } = Input;

const ViewGame = (props: any) => {
  const [data, setData] = useState<any>({});
  const [comments, setComments] = useState<any>([]);
  const [refresh, setRefresh] = useState(Math.random());

  let params = useParams();

  useEffect(() => {
    GameService.getGameById(props.endUrl, props.id).then((res) => {
      setData(res?.data);
    });
  }, []);

  useEffect(() => {
    try {
      GameService.getCommentList(props.getCommentListUrl).then((res: any) => {
        setComments(res?.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [refresh]);

  const postComment = (values: any) => {
    GameService.postComment(
      props.postCommentUrl,
      props.id,
      values.comments
    ).then((res) => {
      setRefresh(Math.random());
    });
  };

  function capitalizeFirstLetter(str: any) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="view">
        <div>
          <div style={{ backgroundColor: "white" }}>
            <ReactPlayer
              width={"100%"}
              height={"50vh"}
              url={data?.broadcast_url ?? data?.highlight_url}
            />
          </div>
          <Divider
            style={{ color: "blue", fontWeight: "bold", fontSize: "20px" }}
          >
            {data?.game_title} {props.game_type}
          </Divider>

          <Card>
            <div
              style={{
                maxHeight: "450px",
                overflowY: "scroll",
                padding: "5px",
                backgroundColor: "white",
              }}
            >
              {comments
                ?.filter((item1: any) => item1.game.id == params.id)
                .map((item: any) => (
                  <>
                    <Comment
                      author={
                        <a>{capitalizeFirstLetter(item?.user?.username)}</a>
                      }
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: "#f56a00",
                            verticalAlign: "middle",
                          }}
                          size="default"
                        >
                          {item?.user?.username.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      content={<p>{item?.content}</p>}
                      datetime={
                        <Tooltip
                          title={moment(item.commented_at)
                            .locale("en")
                            .fromNow()}
                        >
                          <span>
                            {moment(item.commented_at).locale("en").fromNow()}
                          </span>
                        </Tooltip>
                      }
                    />
                  </>
                ))}
            </div>
          </Card>

          <Card>
            <Form name="validate_other" onFinish={postComment}>
              <Form.Item
                name="comments"
                rules={[
                  { required: true, message: "Please input your comments!" },
                ]}
              >
                <TextArea rows={6} placeholder="Comments" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Comment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};
export default ViewGame;
