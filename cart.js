function Carts() {
    fetch(`http://localhost:3000/carts`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.content').innerHTML = ``;
            if (data.carts) {
                let total = 0;

                for (let i = 0; i < data.carts.length; i++) {
                    const hour = String(new Date(data.carts[i].date).getHours()).padStart(2, "0");
                    const minute = String(new Date(data.carts[i].date).getMinutes()).padStart(2, "0");
                    document.querySelector('.content').innerHTML += `
                <div id='travel'>
                    <p class='destination'>${data.carts[i].departure} > ${data.carts[i].arrival}</p>
                    <p class='hour'>${hour}:${minute}</p>
                    <p class='price'><span class="prix">${data.carts[i].price}</span>€</p>
                    <button class='delete' value=${data.carts[i]._id}>X</button>
                </div>
                `

                    total += data.carts[i].price;
                }
                document.querySelector('.total').innerHTML += `
            <div class="bookfooter">
                <p class='sum'>Total : ${total}€</p>
                <button id='purchase'>Purchase</button>
            </div>
            `

                const btnDel = document.querySelectorAll('.delete');
                for (let i = 0; i < btnDel.length; i++) {
                    btnDel[i].addEventListener("click", () => {
                        fetch(`http://localhost:3000/carts/${btnDel[i].value}`, {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" }
                        })
                            .then(response => response.json())
                            .then(() => {
                                document.querySelector('.bookfooter').remove();
                                Carts();
                            })
                    });
                }

                const btnPurchase = document.querySelector('#purchase');
                btnPurchase.addEventListener('click', () => {
                    fetch(`http://localhost:3000/booking`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(response => response.json())
                        .then(data => {
                            fetch('http://localhost:3000/carts', {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" }
                            })
                                .then(response => response.json())
                                .then(() => {
                                    document.location.href = 'booking.html';
                                })
                        })
                });

            } else {
                document.querySelector('#achat').style.display = "none";
                document.querySelector('#panier').style.display = "flex";
            }
        });
}

Carts();