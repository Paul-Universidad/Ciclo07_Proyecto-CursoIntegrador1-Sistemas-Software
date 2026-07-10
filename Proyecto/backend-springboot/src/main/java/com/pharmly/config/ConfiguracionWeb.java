package com.pharmly.config;

import java.util.Arrays;
import java.util.Locale;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@Configuration
public class ConfiguracionWeb implements WebMvcConfigurer {

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(Locale.forLanguageTag("es"));
        return slr;
    }

    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("lang");
        return lci;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(localeChangeInterceptor());
    }

    // Registramos el filtro con la PRIORIDAD MÁS ALTA
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowCredentials(true); 
        
        // Usamos OriginPatterns para permitir cualquier subdominio de Vercel por seguridad
        config.setAllowedOriginPatterns(Arrays.asList(
                "https://*.vercel.app",
                "https://ciclo07-proyecto-curso-integrador1.vercel.app", 
                "http://localhost:5173", 
                "http://127.0.0.1:5173"
        ));
        
        // Permitir TODOS los headers evita bloqueos por headers preflight imprevistos
        config.setAllowedHeaders(Arrays.asList("*")); 
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); 
        
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        // Esto asegura que el CORS se evalúe antes que cualquier otra regla de seguridad o ruteo
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE); 
        
        return bean;
    }
}
