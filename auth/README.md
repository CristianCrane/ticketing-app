# system diagram
![auth system diagram](../docs/auth-architecture.png)

# on auth with SSR
Since our client is a SSR app (nextjs), we need auth info on the very first page load before any js is loaded.
To achieve this, we'll store the JWT in a cookie.  
![ssr auth](../docs/ssr-auth.png)

# api spec

![api spec](../docs/auth-api-spec.png)
