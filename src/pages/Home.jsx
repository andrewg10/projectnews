import Container from "react-bootstrap/esm/Container";
import { getNewsList } from "../api/adaptors";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import {useFetch} from '../utils/hooks/useFetch';
import { Link } from "react-router-dom";
import NewsCardList from "../components/NewsCardList";

export default function Home() {
  // Generam endpoint-urile pentru categoriile de stiri
  const technologyCategoryEndpoint = getNewsCategoriesEndpoint('technology', 1, 6);
  const scienceCategoryEndpoint = getNewsCategoriesEndpoint('science', 1, 6); // ✅ NEW
  const footballCategoryEndpoint = getNewsCategoriesEndpoint('football', 1, 6);

  // Fetch-uim datele de la The Guardian API
  const technologyData = useFetch(technologyCategoryEndpoint);
  const scienceData = useFetch(scienceCategoryEndpoint); // ✅ NEW
  const footballData = useFetch(footballCategoryEndpoint);

  // Adaptam datele
  const adaptedTechnologyData = getNewsList(technologyData);
  const adaptedScienceData = getNewsList(scienceData); // ✅ NEW
  const adaptedFootballData = getNewsList(footballData);

  return (
    <Layout>
      <section className="tech my-5">
        <Container>
          <h1 className="mb-5 pt-3">Tech</h1>
          <NewsCardList newsList={adaptedTechnologyData} />
          <p>
            Vezi toate stirile legate de tehnologie in sectiunea
            <Link to={'/category/technology'} className="text-secondary">
              Tech
            </Link>
          </p>
        </Container>
      </section>

      <section className="my-5 football">
        <Container>
          <h1 className="mb-5 pt-3">Fotbal</h1>
          <NewsCardList newsList={adaptedFootballData} />
          <p>
            Vezi toate stirile legate de fotbal in sectiunea
            <Link to={'/category/football'} className="text-secondary">
              Fotbal
            </Link>
          </p>
        </Container>
      </section>

      {/* Categoria Noua */}
      <section className="my-5 science">
        <Container>
          <h1 className="mb-5 pt-3">Science</h1>
          <NewsCardList newsList={adaptedScienceData} />
          <p>
            Vezi toate stirile legate de science in sectiunea
            <Link to={'/category/science'} className="text-secondary">
              Science
            </Link>
          </p>
        </Container>
      </section>

      <section className="my-5 favourites">
        <Container>
          <h1 className="mb-5 pt-3">Favorite</h1>
          <p>Vrei sa iti salvezi stirile favorite pentru a le revedea mai tarziu?</p>
          <p>In cadrul foecariei stiri gasesti un buton prin care poti adauga stirea la favorite</p>
          <p>
            Vezi sectiunea:
            <Link to={'/favourites'} className="text-secondary">Favorite</Link>
            pentru a vedea stirile adaugate.
          </p>
        </Container>
      </section>
    </Layout>
  );
}
