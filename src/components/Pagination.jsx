import { useNavigate } from "react-router-dom";
import { Pagination as BootrapPagination } from "react-bootstrap";

// Componenta Pagination o sa primeasca 2 props: activepage(pagina curenta) si baseurl (url complet al paginii pe care trebuie sa o deschida)
export function Pagination(props) {
	// Facem destructuring la props
	const { baseurl } = props;
	let { activepage } = props;
	// Ca sa pastram aceasi functionalitate de la componenta Link (fara refresh la pagina) o sa folosin hook-ul de useNavigate din react
	const navigate = useNavigate();
	// Daca nu se primeste nici o valoare pentru prop-ul activepage, inseamna ca pagina 1 este activa
	if (!activepage) {
		activepage = 1;
	}

	// O sa pastram intr-un array toate paginile pe care o sa le trimitem mai departe la paginarea din bootstrap
	let items = [];
	// O sa folosim un for pentru a construi cele 5 numerotari
	for (let number = 1; number <= 5; number++) {
		// La fiecare iteratie in for vom face push in items cu o componenta de BootstraoPagination.Item
		items.push(
			<BootrapPagination.Item
				key={number}
				// prop-ul active va fi true daca pagina curenta este cea activa
				active={number === Number(activepage)}
				// daca pagina este activa, adaugam un id pentru stilizare
				id={activepage ? "pagination-active" : null}
				onClick={() => {
					// La click pe numarul paginii, navigam catre noua pagina:
					navigate(`${baseurl}?page=${number}`);
					// Si apoi scrola, inapoi in varful paginii
					window.scrollTo({
						top: 0,
						behavoir: "smooth",
					});
				}}
			>
				{number}
			</BootrapPagination.Item>,
		);
	}
	console.log(items);
	// Returnam html-ul
	return (
		<div className="d-flex justify-content-center">
			{/* Pentru a afisa itemii de numeroatare de mai sus, folosom componenta BoostrapPagination */}
			<BootrapPagination className="Pagination">{items}</BootrapPagination>
		</div>
	);
}
