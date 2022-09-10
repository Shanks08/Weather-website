const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const input = document.querySelector("input");
const form = document.querySelector("form");

document.querySelector("input").select();
form.addEventListener("submit", (e) => {
	e.preventDefault();
	p1.textContent = "Loading...";
	p2.textContent = "";
	const address = input.value;
	input.value = "";
	// console.log(e.target);
	fetch("http://localhost:3000/weather?address=" + address).then((resp) => {
		resp.json().then((data) => {
			if (data.error) {
				p1.textContent = data.error;
			} else {
				p1.textContent = data.Location;
				p2.textContent = data.Weather;
			}
			console.log(data.Weather);
		});
	});
});
