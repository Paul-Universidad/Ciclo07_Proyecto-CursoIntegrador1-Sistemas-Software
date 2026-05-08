package com.medfacil.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * JSP con charset UTF-8 en la respuesta HTTP (cabecera Content-Type), para que el navegador
 * interprete bien tildes y eñes.
 */
@Configuration
public class JspViewConfig {

    @Bean
    public InternalResourceViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        resolver.setContentType("text/html;charset=UTF-8");
        resolver.setOrder(Ordered.LOWEST_PRECEDENCE);
        return resolver;
    }
}
