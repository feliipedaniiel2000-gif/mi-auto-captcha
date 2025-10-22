// CONFIGURACIÓN DE 2CAPTCHA - REEMPLAZA CON TU API KEY
class ConfiguracionCaptcha {
    static get CONFIG() {
        return {
            // ⚠️ IMPORTANTE: Pega aquí tu API Key de 2Captcha
            API_KEY: '3a96c048ae27fd9e7b1b72d3b50d518d',
            
            // Configuración de tiempos
            INTERVALO_CONSULTA: 3000,    // 3 segundos
            MAXIMO_REINTENTOS: 3,
            TIEMPO_MAXIMO: 120000,       // 2 minutos
            
            // Donde buscar captchas en la página
            SELECTORES: {
                CAPTCHA_IMAGEN: [
                    'img[src*="captcha"]',
                    '.captcha-image',
                    '#captchaImage',
                    'img[alt*="captcha"]'
                ],
                INPUT_CAPTCHA: [
                    'input[name="captcha"]',
                    '#captcha',
                    '.captcha-input',
                    'input[type="text"][name*="captcha"]'
                ]
            }
        };
    }
    
    static validarConfiguracion() {
        if (!this.CONFIG.API_KEY || this.CONFIG.API_KEY === 'PEGA_AQUI_TU_API_KEY_DE_2CAPTCHA') {
            alert('❌ ERROR: Configura tu API Key de 2Captcha primero');
            return false;
        }
        return true;
    }
}