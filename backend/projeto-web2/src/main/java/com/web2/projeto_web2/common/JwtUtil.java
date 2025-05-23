package com.web2.projeto_web2.common;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {
    private final String jwtSecret = "mysecretkeyandthismustbeaverysecurekeyotherwiseicantuseitwithhs512thatswhythisstringisverylongandwestillneedtoreplaceitbysomethingelseinthefuture";//lets get this from env variables

    public String generateJwtToken(String username) {
        // Token validity period (e.g., 1 day)
        long jwtExpirationMs = 86400000;
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    // Get email from token (sub)
    public String getEmailFromToken(String token) {
        Jws<Claims> jws = Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token);

        return jws.getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // log or handle the exception as needed
        }
        return false;
    }
}
