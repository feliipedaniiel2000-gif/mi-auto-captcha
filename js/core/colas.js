// MANEJO DE MÚLTIPLES CAPTCHAS (Para uso avanzado)
class GestorColasCaptcha {
    constructor() {
        this.cola = [];
        this.procesando = false;
    }
    
    agregarTarea(tarea) {
        this.cola.push(tarea);
        console.log(`📝 Tarea agregada. Cola: ${this.cola.length}`);
    }
    
    async procesarSiguiente() {
        if (this.cola.length === 0 || this.procesando) {
            return;
        }
        
        this.procesando = true;
        const tarea = this.cola.shift();
        
        try {
            await tarea();
        } catch (error) {
            console.error('Error en cola:', error);
        } finally {
            this.procesando = false;
            this.procesarSiguiente();
        }
    }
}