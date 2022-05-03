let data;

const getElm = id => document.getElementById(id)

window.addEventListener("load", () => {
	showTimer()
})


function showTimer() {

	successFn = (response) => {
		if (response === "stop") {
			document.getElementById("sorteoActivo").style.display = "none";
			document.getElementById("sinSorteo").style.display = "flex";
			const regex = new RegExp("pontusideasenlinea.com/admin")
			if (regex.test(window.location.href)) {
				getElm("temporizador").innerText = "EL PLAZO DE REGISTRO HA FINALIZADO";
			} else {
				getElm("temporizador").style.display = "none";
			}
			clearInterval(interval)
			return
		} else {
			document.getElementById("sorteoActivo").style.display = "flex";
			document.getElementById("sinSorteo").style.display = "none";
			showRemainingTime(response)
			if (getElm("temporizador")) {
				if (getElm("temporizador").style.display == "none") {
					getElm("temporizador").style.display = "";

				}

			}

		}
	}


	let interval = setInterval(() => {
		try {
			ajaxSucessFunction({ data }, "../timer/", successFn)
		} catch (e) {


			clearInterval(interval)
		}
	}, 1000)

}



function showRemainingTime(seconds) {
	let days = Math.floor(seconds / 86400)
	seconds = seconds % 86400
	let hours = Math.floor(seconds / 3600)
	seconds = seconds % 3600
	let minutes = Math.floor(seconds / 60)
	seconds = seconds % 60
	getElm("timer_minutos").innerText = minutes
	getElm("timer_horas").innerText = hours
	getElm("timer_dias").innerText = days
	getElm("timer_segundos").innerText = seconds


}

function ajaxSucessFunction(data, url, successFn) {


	if (data.dominio_cliente_id !== "") {
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function (response) {
				successFn(response.data)
			}
		});

	}

}