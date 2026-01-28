import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptors";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";
import { Pagination } from "../components/Pagination";

export default function NewsCategory() {
	// Extragem parametru de cateorie din ruta
	const {categoryId} = useParams();
	// Extragem query serach-ul din URL
	const [queryParams] = useSearchParams();
	let currentPage = queryParams.get('page');
	// Daca nu avem query param-ul page in url, inseamna ca suntem pe prima pagina
	if (!currentPage) {
		currentPage = 1;
	}
	// Generam endpoint-un pentru categoria curenta
	const newsCategoryEndpoint = getNewsCategoriesEndpoint(categoryId, currentPage);
	// Facem call-ul catre server
	const newsData = useFetch(newsCategoryEndpoint);
	// Adaptam datele venite de la server
	const adaptedNewsList = getNewsList(newsData);

	// In functie de parametrul primit in URL o sa afisam titlu diferit pentru categoria curenta
	let pageTitle = "";
	switch (categoryId) {
	case "technology":
		pageTitle = "Tech";
		break;
	case "science": 
		pageTitle = "Science";
		break;
	case "football":
		pageTitle = "Fotbal";
		break;
	default:
		pageTitle = categoryId; 
		break;
	}

	return (
		<Layout>
			<Container className="my-5">
				<h1 className="mb-5 pt-3">{pageTitle}</h1>
				{/* Afisam toate stirile */}
				<NewsCardList newsList={adaptedNewsList} />
				{/* Afisam paginatia */}
				<Pagination activepage={currentPage} baseurl={`/category/${categoryId}`} />
			</Container>
		</Layout>
	);
}
