fetch("http://localhost:3000/booking")
.then(response => response.json())
.then(data => {
    if (data.trajets) {
        const timestamp = Date.now();
        for (let i = 0; i < data.trajets.length; i++) {
            const date = new Date(data.trajets[i].date).getTime();
            let dateOp = Math.round((date - timestamp) / (1000 * 60 * 60));
            const hour = String(new Date(data.trajets[i].date).getHours()).padStart(2, "0");
            const minute = String(new Date(data.trajets[i].date).getMinutes()).padStart(2, "0");
            if (dateOp > 0) {
                document.querySelector('.bookContent').innerHTML += `
                    <div id='avenir'>
                        <p class='destination2'>${data.trajets[i].departure} > ${data.trajets[i].arrival}</p>
                        <p class='hour2'>${hour}:${minute}</p>
                        <p class='price2'>${data.trajets[i].price}€</p>
                        <p class='attente'>Departure in ${dateOp} hours</p>
                    </div>
                `;
            } else {
                document.querySelector('.bookContent').innerHTML += `
                    <div id='avenir'>
                        <p class='destination2'>${data.trajets[i].departure} > ${data.trajets[i].arrival}</p>
                        <p class='hour2'>${hour}:${minute}</p>
                        <p class='price2'>${data.trajets[i].price}€</p>
                        <p class='attente'>You are late</p>
                    </div>
                `;
            }
        }
    }
});
