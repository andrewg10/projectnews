import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getNewsDetailsEnpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetails } from "../api/adaptors";
import { getFormattedDate } from "../utils/date";
import { Container, Col, Row, Button, Alert } from "react-bootstrap";
import "./NewsDetails.css";
import { addToFavorites } from "../store/actions";
import { useContext, useEffect, useRef, useState } from "react";
import { FavouritesContext } from "../store/context";

export default function NewsDetails() {
  // ✅ luam si state + dispatch ca sa putem verifica "deja in favorite"
  const { favoritesState, favoritesDispatch } = useContext(FavouritesContext);

  // ✅ Cerinta 2: alert success (fix sus, dispare in 2 sec)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const timeoutRef = useRef(null);

  // cleanup timeout cand pleci de pe pagina
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Extragem parametrul cu id-ul stirii din URL
  let { newsId } = useParams();
  // Trebuie sa decodam id-ul extras din url pentru ca vrem sa contina si /-urile
  newsId = decodeURIComponent(newsId);

  // Endpoint pentru stirea singulara
  const newsDetailsEndpoint = getNewsDetailsEnpoint(newsId);
  // Call catre server
  const newsDetails = useFetch(newsDetailsEndpoint);
  // Adaptare date
  const adaptedNewsDetails = getNewsDetails(newsDetails);

  // Destructuring chei
  const { date, title, description, image, content, author, thumbnail } =
    adaptedNewsDetails;

  const formattedDate = getFormattedDate(date);

  // ✅ verificam daca stirea e deja in favorites
  const alreadyInFavorites = favoritesState.news.some(
    (n) => n.id === newsId
  );

  function handleAddToFavorites(news) {
    // daca deja e in favorite, nu mai facem nimic
    if (alreadyInFavorites) return;

    // Apelam actiunea de adaugare la favorite
    const actionResult = addToFavorites(news);
    // Trimitem rezultatul actiunii catre reducer
    favoritesDispatch(actionResult);

    // ✅ Cerinta 2: afisam alert 2 secunde
    setShowSuccessAlert(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 2000);
  }

  return (
    <Layout>
      {/* ✅ CERINTA 2: Alert fix sus */}
      {showSuccessAlert && (
        <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x mt-3 shadow"
          style={{ zIndex: 9999, minWidth: 280 }}
        >
          Added to favourites!
        </Alert>
      )}

      <Container className="my-5 newsDetails">
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>

            {/* Imaginea vine ca HTML */}
            <div
              dangerouslySetInnerHTML={{ __html: image }}
              className="mb-4"
            ></div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>

              <Button
                disabled={alreadyInFavorites}
                onClick={() => {
                  const newsPayload = {
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  };
                  handleAddToFavorites(newsPayload);
                }}
              >
                {alreadyInFavorites ? "Deja in favorite" : "Adauga la favorite"}
              </Button>
            </div>

            {/* Content-ul vine ca HTML */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
