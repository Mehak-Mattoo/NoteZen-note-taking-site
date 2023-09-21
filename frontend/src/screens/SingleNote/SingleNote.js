import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/noteAction";
import ErrorMessage from "../../components/Header/ErrorMessage";
import Loading from "../../components/Header/Loading";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    dispatch(deleteNoteAction(id));
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();

    navigate("/mynotes");
  };

  return (
    <>
      <MainScreen title="EDIT NOTE " />
      <Container>
        <Card>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              {loadingDelete && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  className="my-4"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  className="my-4"
                  placeholder="Enter the content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  className="my-4"
                  placeholder="Enter the Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button size="sm" variant="primary" type="submit">
                Update Note
              </Button>
              <Button
                size="sm"
                className="mx-2"
                variant="danger"
                onClick={() => deleteHandler(id)}
              >
                Delete Note
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Updated on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}

export default SingleNote;
