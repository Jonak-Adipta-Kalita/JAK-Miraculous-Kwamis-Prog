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
			<li class="card" onclick="selectKwami(${kwamie.id})">
				<img class="card-image" src="${kwamie.image}"/>
				<h2 class="card-title">${kwamie.id}. ${kwamie.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = kwamisHTMLString;
};

const selectKwami = async (id) => {
	const url = `\kwamis.json`;
	const res = await fetch(url);
	const kwamie = await res.json();
	displayPopup(kwamie, id);
};

const displayPopup = (kwamie, id) => {
	const image = `./images/${kwamie.kwamis[id - 1].image}`;
	const owner = Array(kwamie.kwamis[id - 1].owner).map((own) => own.join(", "));
	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${kwamie.kwamis[id].id}. ${kwamie.kwamis[id - 1].name}
				</h2>
				<p>
				<small>Owner: </small>${owner}
				</p>
				<p>
					<small>Holder: </small>${kwamie.kwamis[id - 1].holder} | 
					<small>Miraculous: </small>${kwamie.kwamis[id - 1].miraculous}
				</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchKwamis();
