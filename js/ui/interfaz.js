// ELEMENTOS DE INTERFAZ DE USUARIO
class InterfazUsuario {
    static mostrarCargando() {
        this.ocultarCargando();
        
        const cargando = document.createElement('div');
        cargando.id = 'cargandoCaptcha';
        cargando.innerHTML = `
            <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:10000;">
                <div style="background:white; padding:20px; border-radius:10px; text-align:center;">
                    <div style="font-size:24px; margin-bottom:10px;">⏳</div>
                    <div>Resolviendo CAPTCHA...</div>
                    <div style="font-size:12px; color:#666;">Esto puede tomar 10-30 segundos</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(cargando);
    }
    
    static ocultarCargando() {
        const existente = document.getElementById('cargandoCaptcha');
        if (existente) {
            existente.remove();
        }
    }
}