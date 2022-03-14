const dex = document.getElementById('dex');
const fetchKwamis = async () => {
    const res = await fetch("https://jak_api.p.rapidapi.com/miraculous", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "jak_api.p.rapidapi.com",
			"x-rapidapi-key": "d3474315fcmshe6f03eb826f16bcp181f82jsn7d262d2601be"
		}
	});
	const data = await res.json();
	console.log(data);
	const kwamis = data.kwamis.map((result, index) => ({
		...result,
		id: index + 1,
		image: `https://jak-api.vercel.app/${result.image}`
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
	const res = await fetch("https://jak_api.p.rapidapi.com/miraculous", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "jak_api.p.rapidapi.com",
			"x-rapidapi-key": "d3474315fcmshe6f03eb826f16bcp181f82jsn7d262d2601be"
		}
	});
	const kwamie = await res.json();
	displayPopup(kwamie, id);
};

const displayPopup = (kwamie, id) => {	
	const image = `https://jak-api.vercel.app/${kwamie.kwamis[id - 1].image}`;
	const owner = Array(kwamie.kwamis[id - 1].owner).map((own) => own.join(", "));
	
	let ownerHTMLString;
	
	if (kwamie.kwamis[id - 1].owner[0] === null) {
		ownerHTMLString = ""
	} else {
		ownerHTMLString = `<small>Owner: </small>${owner}`
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${kwamie.kwamis[id - 1].id + 1}. ${kwamie.kwamis[id - 1].name}
				</h2>
				<p>${ownerHTMLString}</p>
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
