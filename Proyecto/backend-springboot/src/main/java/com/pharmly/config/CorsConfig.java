import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Aplica a todos los endpoints (ej. /api/usuarios/login)
                        .allowedOrigins("https://ciclo07-proyecto-curso-integrador1.vercel.app") // ⚠️ REEMPLAZA CON TU URL REAL DE VERCEL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // OPTIONS es vital para CORS
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
