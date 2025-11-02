package com.tspcompany.survey.util;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {
     @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    public String generateToken(String subject) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
        } catch (JwtException e) {
            throw new RuntimeException("Token inválido");
        }
    }
}
