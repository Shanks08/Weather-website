const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
// const p_img = document.querySelector("#p_img");
const input = document.querySelector("input");
const form = document.querySelector("form");

document.querySelector("input").select();
form.addEventListener("submit", (e) => {
	e.preventDefault();
	p1.textContent = "Loading...";
	p2.textContent = "";
	// p_img.innerHTML = "";
	const address = input.value;
	input.value = "";
	// console.log(e.target);
	fetch("/weather?address=" + address).then((resp) => {
		resp.json().then((data) => {
			if (data.error) {
				p1.textContent = data.error;
			} else {
				p1.textContent = data.Location;
				const textPara = document.createElement("p");
				textPara.textContent = data.Weather;
				p2.appendChild(textPara);
				const imgPara = document.createElement("span");
				imgPara.innerHTML = `<img src="${data.Icon}" alt="Weather_icon">`;
				p2.appendChild(imgPara);
			}
			console.log(data);
		});
	});
});
