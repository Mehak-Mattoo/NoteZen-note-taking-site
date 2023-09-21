import React, { useEffect } from "react";
import "./MyNotes.css";
import MainScreen from "../../components/MainScreen";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { Badge, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteAction";
import Loading from "../../components/Header/Loading";
import ErrorMessage from "../../components/Header/ErrorMessage";

export default function MyNotes({ search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { error: errorDelete, success: successDelete } = noteDelete;

  const deleteHandler = (id) => {
    dispatch(deleteNoteAction(id));
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <Container>
      <h3
        className="mt-4 text-center "
        style={{ letterSpacing: "10px", fontSize: "0.6rem", color: "#3D0C11" }}
      >
        MY NOTES
      </h3>
      <MainScreen
        title={`Hi ${
          userInfo && userInfo.name ? userInfo.name : "Welcome Back"
        }..`}
      >
        <Link to="/create-note">
          <Button style={{ margin: 10 }}>Create New Note</Button>
        </Link>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes
          ?.reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion key={note.id} defaultActiveKey={["0"]}>
              <Accordion.Item eventkey="0">
                <Card style={{ margin: 5 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: "18%",
                      }}
                    >
                      <Accordion.Button
                        as={Card.Text}
                        style={{ fontWeight: "600", lineHeight: 1.5 }}
                        variant="link"
                      >
                        {note.title}
                      </Accordion.Button>
                    </span>
                    <div className="m-auto">
                      <Button>
                        <Link to={`/note/${note._id}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="danger"
                        className=" button mx-2"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse>
                    <Card.Body>
                      <Badge bg="success" text="light">
                        Category- {note.category}
                      </Badge>
                      <p style={{ lineHeight: "1.4", margin: "1rem 0rem" }}>
                        {note.description}
                      </p>

                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer
                          className="blockquote-footer"
                          style={{ marginTop: "1.3rem", fontSize: "50%" }}
                        >
                          {new Date().toLocaleDateString()}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          ))}
      </MainScreen>
    </Container>
  );
}
