package shop_api.customConfigs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Disable CSRF protection
            .authorizeRequests()
            .anyRequest().authenticated()  // Ensure all requests require authentication
            .and()
            .httpBasic();  // Enable basic HTTP authentication
        
        return http.build();  // Return the configured SecurityFilterChain
    }
}
