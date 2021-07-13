const dex = document.getElementById('dex');
const fetchKwamis = async () => {
    const url = "/kwamis.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const kwamis = data.kwamis.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayKwamis(kwamis);
};

const displayKwamis = (kwami) => {
    const kwamisHTMLString = kwami
        .map((kwamie) => (`
			<li class="card">
				<img class="card-image" src="${kwamie.image}"/>
				<h2 class="card-title">${kwamie.id}. ${kwamie.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = kwamisHTMLString;
};

fetchKwamis();
