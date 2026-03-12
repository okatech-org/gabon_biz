FROM kong:3.7
# Copy declarative config
COPY kong.yml /usr/local/kong/declarative/kong.yml

# Kong DB-less mode
ENV KONG_DATABASE=off
ENV KONG_DECLARATIVE_CONFIG=/usr/local/kong/declarative/kong.yml

# Logging
ENV KONG_PROXY_ACCESS_LOG=/dev/stdout
ENV KONG_ADMIN_ACCESS_LOG=/dev/stdout
ENV KONG_PROXY_ERROR_LOG=/dev/stderr
ENV KONG_ADMIN_ERROR_LOG=/dev/stderr

# Plugins
ENV KONG_PLUGINS=bundled

# Ports
# 8000 — Proxy (client requests)
# 8443 — Proxy SSL
# 8001 — Admin API
# 8444 — Admin SSL
EXPOSE 8000 8443 8001 8444
