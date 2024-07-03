//récupère et met à jour sur booking.html les données du get
fetch(`
https://tickethack-backend-six-sepia.vercel.app/booking`).then(response => response.json())
    .then(data => {
        document.querySelector('#booking').style.display = "none";
        document.querySelector('#validation').innerHTML = ``;
        if (data.trajets) {
            console.log(data.trajets)
            document.querySelector('#validation').innerHTML += `
       <h3>My bookings</h3>
       `;
            for (let i = 0; i < data.trajets.length; i++) {
                let hours = new Date(data.trajets[i].date).getHours();
                hours = String(hours).padStart(2, "0");
                let minutes = new Date(data.trajets[i].date).getMinutes();
                minutes = String(hours).padStart(2, "0");
                let deadline = new Date(data.trajets[i].date).getTime();
                deadline -= Date.now()
                deadline = Math.floor(deadline / 3600000)
                if (deadline > 0) {
                    document.querySelector('#validation').innerHTML += `
            
                <div id = 'avenir'>
                    <p class = 'destination2'>${data.trajets[i].departure}> ${data.trajets[i].arrival}</p>
                    <p class = 'hour2'>${hours}:${minutes}</p>
                    <p class = 'price2'>${data.trajets[i].price}€</p>
                    <p class = 'attente'>Departure in ${deadline} hours</p>
                </div>
            `;
                } else {
                    document.querySelector('#validation').innerHTML += `
            
                <div id = 'avenir'>
                    <p class = 'destination2'>${data.trajets[i].departure}> ${data.trajets[i].arrival}</p>
                    <p class = 'hour2'>${hours}:${minutes}</p>
                    <p class = 'price2'>${data.trajets[i].price}€</p>
                    <p class = 'attente'>you are late</p>
                </div>
                `
                }


            }
            document.querySelector('#validation').innerHTML += `
        <hr class = 'ligne'/>
            <div id = 'enjoy'>
                <span>enjoy your travel with Tickethack!</span>
            </div>
            `;
        } else {
            document.querySelector('#validation').style.display = "none";
            document.querySelector('#booking').style.display = "flex";
        }
    })