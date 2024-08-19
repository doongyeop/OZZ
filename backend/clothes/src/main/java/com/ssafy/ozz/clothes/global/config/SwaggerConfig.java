package com.ssafy.ozz.clothes.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(info = @Info(
        title = "OZZ CLOTHES API",
        description = "OZZ CLOTHES API 명세서",
        version = "v1.0.0"))
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openApi() {
        String jwt = "JWT";
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("JWT");
        Components components = new Components().addSecuritySchemes(jwt, new SecurityScheme()
                .name(jwt)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
        );

        return new OpenAPI()
                .addServersItem(new Server().url("/"))
                .addSecurityItem(securityRequirement)
                .components(components);
    }

    @Bean
    GroupedOpenApi allApi() {
        return GroupedOpenApi.builder().group("ozz-clothes-all").pathsToMatch("/api/**").build();
    }

    @Bean
    GroupedOpenApi clothesApi() {
        return GroupedOpenApi.builder().group("ozz-clothes").pathsToMatch("/api/clothes/**").build();
    }

    @Bean
    GroupedOpenApi categoryApi() {
        return GroupedOpenApi.builder().group("ozz-categories").pathsToMatch("/api/categories/**").build();
    }
    @Bean
    GroupedOpenApi coordinatesApi() {
        return GroupedOpenApi.builder().group("ozz-coordinates").pathsToMatch("/api/coordinates/**").build();
    }
}