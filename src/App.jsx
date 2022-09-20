import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Carousel from "./Carousel";

import styles from "./styles.module.css";

function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [responseSuccess, setResponseSuccess] = useState(false);

  async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const responseJSON = await response.json();

    setPosts(responseJSON);
    setLoadingRequest(false);
  }

  useEffect(() => {
    /* axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data));*/

    getPosts();
  }, []);

  async function newPost() {
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        userId: "1",
        title: "Titulo de teste",
        body: "Descrição de Teste",
      });

      /*await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: {
          userId: "1",
          title: "Titulo de teste",
          body: "Descrição de Teste",
        },
      });*/

      setResponseSuccess(true);
    } catch (error) {
      alert("Erro ao tentar salvar dado. " + error.message);
    }
  }

  function handleClose() {
    setVisibleModal(false);
  }

  function handleOpen() {
    setVisibleModal(true);
  }

  function handleToggleModal() {
    setVisibleModal(!visibleModal);
  }

  if (loadingRequest) {
    return <h1>Carregando dados....</h1>;
  }

  return (
    <div>
      <h1>Hello World</h1>
      {!!responseSuccess && <Alert>Registro cadastrado com sucesso.</Alert>}
      <Carousel />

      <Button onClick={newPost}>Salvar post</Button>

      {posts.map((post) => (
        <Card key={post.id.toString()} style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Button variant="primary" onClick={handleToggleModal}>
              Go somewhere
            </Button>
          </Card.Body>
        </Card>
      ))}

      <Button className={styles.btn_custom}>Primary</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>
              <Button variant="info">Apagar</Button>
              <Button variant="danger">Editar</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal show={visibleModal} onHide={handleToggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleToggleModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
