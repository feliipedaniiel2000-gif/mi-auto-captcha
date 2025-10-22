// ARCHIVO PRINCIPAL - FÁCIL DE USAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando sistema Auto-Captcha...');
    
    // Verificar configuración
    if (!ConfiguracionCaptcha.validarConfiguracion()) {
        return;
    }
    
    // Crear resolvedor de captchas
    const resolvedor = new ResolvedorCaptcha();
    
    // Configurar botón mágico de auto-captcha
    document.getElementById('botonAutoCaptcha').addEventListener('click', function() {
        mostrarNotificacion('🔍 Buscando y resolviendo captcha...', 'procesando');
        resolvedor.resolverAutomaticamente();
    });
    
    // Botón de refrescar captcha
    document.getElementById('botonRefrescar').addEventListener('click', function() {
        const imagenCaptcha = document.getElementById('imagenCaptcha');
        if (imagenCaptcha) {
            // Simular refresco añadiendo timestamp
            imagenCaptcha.src = imagenCaptcha.src.split('?')[0] + '?refresh=' + Date.now();
            mostrarNotificacion('🔄 Captcha actualizado', 'exito');
        }
    });
    
    // Manejar envío del formulario
    document.getElementById('miFormulario').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputCaptcha = document.getElementById('inputCaptcha');
        
        if (!inputCaptcha.value) {
            mostrarNotificacion('❌ Por favor, resuelve el captcha primero', 'error');
            return;
        }
        
        mostrarNotificacion('✅ Formulario enviado correctamente!', 'exito');
        // Aquí puedes añadir tu lógica de envío real
    });
    
    console.log('✅ Sistema Auto-Captcha listo!');
});

// Función simple para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
    // Remover notificación anterior
    const notifAnterior = document.querySelector('.notificacion');
    if (notifAnterior) {
        notifAnterior.remove();
    }
    
    // Crear nueva notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 4000);
}