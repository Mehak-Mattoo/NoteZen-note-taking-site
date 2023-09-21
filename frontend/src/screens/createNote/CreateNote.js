import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/noteAction";
import Loading from "../../components/Header/Loading";
import ErrorMessage from "../../components/Header/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  useEffect(() => {}, []);
  return (
    <>
      <MainScreen title="Create a Note"> </MainScreen>
      <Container>
        <Card className="my-4">
          <Card.Body>
            <Form onSubmit={submitHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  className="my-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  className="my-3"
                  value={content}
                  placeholder="How was your day?"
                  rows={4}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  className="my-3"
                  value={category}
                  placeholder="Enter the Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button type="submit" size="sm" variant="primary">
                Create Note
              </Button>
              <Button
                className="mx-2"
                size="sm"
                onClick={resetHandler}
                variant="danger"
              >
                Reset
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
