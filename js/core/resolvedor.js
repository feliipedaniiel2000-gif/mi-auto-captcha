// RESOLVEDOR PRINCIPAL DE CAPTCHAS
class ResolvedorCaptcha {
    constructor() {
        this.solver = new TwoCaptcha(ConfiguracionCaptcha.CONFIG.API_KEY);
        this.resolviendo = false;
    }
    
    // Buscar captcha en la página automáticamente
    buscarCaptcha() {
        const selectores = ConfiguracionCaptcha.CONFIG.SELECTORES;
        
        // Buscar imagen de captcha
        for (const selector of selectores.CAPTCHA_IMAGEN) {
            const elemento = document.querySelector(selector);
            if (elemento && elemento.src) {
                return {
                    tipo: 'imagen',
                    elemento: elemento
                };
            }
        }
        
        return null;
    }
    
    // Convertir imagen a texto que 2Captcha entienda
    async convertirImagenABase64(elementoImagen) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = elementoImagen.width;
            canvas.height = elementoImagen.height;
            
            ctx.drawImage(elementoImagen, 0, 0);
            
            try {
                const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
                resolve(base64);
            } catch (error) {
                reject('Error convirtiendo imagen: ' + error.message);
            }
        });
    }
    
    // Resolver captcha de imagen
    async resolverCaptchaImagen(elementoImagen) {
        try {
            mostrarNotificacion('🔄 Procesando imagen...', 'procesando');
            
            const imagenBase64 = await this.convertirImagenABase64(elementoImagen);
            
            mostrarNotificacion('📡 Enviando a 2Captcha...', 'procesando');
            
            const resultado = await this.solver.solve({
                image: imagenBase64
            });
            
            return resultado;
            
        } catch (error) {
            throw new Error('Error resolviendo captcha: ' + error.message);
        }
    }
    
    // Función principal - UN SOLO BOTÓN para todo
    async resolverAutomaticamente() {
        if (this.resolviendo) {
            mostrarNotificacion('⏳ Ya se está resolviendo un captcha...', 'procesando');
            return;
        }
        
        try {
            this.resolviendo = true;
            
            // 1. Buscar captcha automáticamente
            const captchaInfo = this.buscarCaptcha();
            if (!captchaInfo) {
                throw new Error('No se encontró ningún captcha en la página');
            }
            
            // 2. Resolver según el tipo
            let solucion;
            if (captchaInfo.tipo === 'imagen') {
                solucion = await this.resolverCaptchaImagen(captchaInfo.elemento);
            }
            
            // 3. Autocompletar la solución
            this.autocompletarSolucion(solucion);
            
            mostrarNotificacion('✅ Captcha resuelto automáticamente!', 'exito');
            this.actualizarEstadisticas('exito');
            
        } catch (error) {
            console.error('Error:', error);
            mostrarNotificacion('❌ ' + error.message, 'error');
            this.actualizarEstadisticas('error');
        } finally {
            this.resolviendo = false;
        }
    }
    
    // Autocompletar el resultado en el input
    autocompletarSolucion(solucion) {
        const selectores = ConfiguracionCaptcha.CONFIG.SELECTORES.INPUT_CAPTCHA;
        
        for (const selector of selectores) {
            const input = document.querySelector(selector);
            if (input) {
                input.value = solucion;
                input.focus();
                console.log('✅ Solución autocompletada en:', selector);
                break;
            }
        }
    }
    
    // Actualizar panel de estadísticas
    actualizarEstadisticas(resultado) {
        const panel = document.getElementById('contenidoEstadisticas');
        if (panel) {
            const fecha = new Date().toLocaleTimeString();
            panel.innerHTML = `
                <p><strong>Última acción:</strong> ${fecha}</p>
                <p><strong>Resultado:</strong> ${resultado === 'exito' ? '✅ Éxito' : '❌ Error'}</p>
                <p><strong>Estado:</strong> 🟢 Sistema activo</p>
            `;
        }
    }
}