

// affichage des trips selon les parameteres departure arrival et date
document.querySelector('#searchBtn').addEventListener('click', function () {
    const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const tripsDate = document.querySelector('#tripsDate').value;
    const falseDiv = document.querySelector(".false");
    const empty = document.querySelector(".empty");

    if (departure === "" || tripsDate === "") {
        falseDiv.style.display = "flex";
        empty.style.display = "none";      
    } else {
        falseDiv.style.display = "none";
        empty.style.display = "none";
   

    fetch(`http://localhost:3000/trips?departure=${departure}&arrival=${arrival}&date=${tripsDate}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('.tripsResult').innerHTML = '';
        if (data.trajet) {
            for (let i = 0; i < data.trajet.length; i++) {
                const hour = String(new Date(data.trajet[i].date).getHours()).padStart(2, "0");
                const minute = String(new Date(data.trajet[i].date).getMinutes()).padStart(2, "0")
                document.querySelector('.tripsResult').innerHTML += `
                <div class="trip">
                    <span>${data.trajet[i].departure} > ${data.trajet[i].arrival}</span>
                    <span>${hour}:${minute}</span>
                    <span>${data.trajet[i].price}€</span>
                    <button class="sendCart" value= ${data.trajet[i]._id } >Book</button>
                </div>
                `
              
            }
            // ajout du trip selectionner dans la collection carts et changement de page
            let btnBook = document.querySelectorAll(".sendCart")
            for (let i = 0; i < btnBook.length; i++) {
                btnBook[i].addEventListener("click", () => {
                    fetch(`http://localhost:3000/carts`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({id: btnBook[i].value})
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.result === true) {
                            document.location.href='cart.html';
                        }else {
                            console.log('failed to add item to cart', data.error)
                        }
                    })
                });
                
            }
        } else {
            empty.style.display = "none";
            falseDiv.style.display ="flex"
        }
    })
    
 }
})

