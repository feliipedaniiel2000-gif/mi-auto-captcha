// UTILIDADES AUXILIARES
class UtilidadesCaptcha {
    static generarIdUnico() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    static formatearTiempo(ms) {
        return (ms / 1000).toFixed(1) + ' segundos';
    }
    
    static esImagenValida(elementoImg) {
        return elementoImg && elementoImg.complete && elementoImg.naturalWidth > 0;
    }
}