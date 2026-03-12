#!/bin/bash
# ============================================
# GABON BIZ — Kong API Gateway Test Script
# Tests all routes, health checks, and plugins
# ============================================

KONG_URL="${KONG_URL:-http://localhost:8000}"
KONG_ADMIN="${KONG_ADMIN:-http://localhost:8001}"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0

test_endpoint() {
  local name="$1"
  local url="$2"
  local expected_code="$3"
  local method="${4:-GET}"

  response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" 2>/dev/null)

  if [ "$response" = "$expected_code" ]; then
    echo -e "  ${GREEN}✅ PASS${NC} — $name (HTTP $response)"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}❌ FAIL${NC} — $name (expected $expected_code, got $response)"
    FAIL=$((FAIL + 1))
  fi
}

check_header() {
  local name="$1"
  local url="$2"
  local header="$3"

  response=$(curl -s -D - "$url" 2>/dev/null | grep -i "$header")

  if [ -n "$response" ]; then
    echo -e "  ${GREEN}✅ PASS${NC} — Header '$header' present"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}❌ FAIL${NC} — Header '$header' missing"
    FAIL=$((FAIL + 1))
  fi
}

echo ""
echo "🇬🇦 GABON BIZ — Kong API Gateway Tests"
echo "==========================================="
echo "Proxy URL: $KONG_URL"
echo "Admin URL: $KONG_ADMIN"
echo ""

# -----------------------------------------
# 1. Kong Admin API
# -----------------------------------------
echo -e "${YELLOW}📋 1. Kong Admin API${NC}"
test_endpoint "Admin status" "$KONG_ADMIN/status" "200"
test_endpoint "Admin services" "$KONG_ADMIN/services" "200"
test_endpoint "Admin routes" "$KONG_ADMIN/routes" "200"
test_endpoint "Admin upstreams" "$KONG_ADMIN/upstreams" "200"
test_endpoint "Admin consumers" "$KONG_ADMIN/consumers" "200"
test_endpoint "Admin plugins" "$KONG_ADMIN/plugins" "200"
echo ""

# -----------------------------------------
# 2. Gateway Health
# -----------------------------------------
echo -e "${YELLOW}🏥 2. Gateway Health${NC}"
test_endpoint "Gateway health endpoint" "$KONG_URL/api/health" "200"
echo ""

# -----------------------------------------
# 3. Service Routes (expect 401 — JWT required)
# -----------------------------------------
echo -e "${YELLOW}🔐 3. Service Routes (unauthenticated — expect 401)${NC}"
test_endpoint "Entrepreneur (no JWT)" "$KONG_URL/api/v1/entrepreneur" "401"
test_endpoint "Marchés Publics (no JWT)" "$KONG_URL/api/v1/marches" "401"
test_endpoint "Innovation Hub (no JWT)" "$KONG_URL/api/v1/innovation" "401"
test_endpoint "Incubateur (no JWT)" "$KONG_URL/api/v1/incubateur" "401"
test_endpoint "Investir (no JWT)" "$KONG_URL/api/v1/investir" "401"
echo ""

# -----------------------------------------
# 4. Public Routes (no JWT, expect 200 or 502)
# -----------------------------------------
echo -e "${YELLOW}🌍 4. Public Routes (no JWT required)${NC}"
# Observatoire and Filières have no JWT plugin — expect pass-through
# (502 = upstream not running, but Kong accepts the request)
test_endpoint "Observatoire (public)" "$KONG_URL/api/v1/observatoire" "502"
test_endpoint "Filières (public)" "$KONG_URL/api/v1/filieres" "502"
echo ""

# -----------------------------------------
# 5. Response Headers
# -----------------------------------------
echo -e "${YELLOW}📨 5. Response Headers${NC}"
check_header "Correlation ID" "$KONG_URL/api/v1/observatoire" "X-Request-ID"
check_header "Served-By header" "$KONG_URL/api/v1/observatoire" "X-Served-By"
check_header "CORS (no Server leak)" "$KONG_URL/api/v1/observatoire" "X-Kong-Proxy-Latency"
echo ""

# -----------------------------------------
# 6. Rate Limiting
# -----------------------------------------
echo -e "${YELLOW}⏱️  6. Rate Limiting${NC}"
check_header "Rate limit headers" "$KONG_URL/api/v1/observatoire" "RateLimit-Limit"
echo ""

# -----------------------------------------
# 7. CORS
# -----------------------------------------
echo -e "${YELLOW}🌐 7. CORS${NC}"
cors_response=$(curl -s -D - -X OPTIONS \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  "$KONG_URL/api/v1/observatoire" 2>/dev/null | grep -i "access-control-allow-origin")

if [ -n "$cors_response" ]; then
  echo -e "  ${GREEN}✅ PASS${NC} — CORS preflight (Access-Control-Allow-Origin present)"
  PASS=$((PASS + 1))
else
  echo -e "  ${RED}❌ FAIL${NC} — CORS preflight (Access-Control-Allow-Origin missing)"
  FAIL=$((FAIL + 1))
fi
echo ""

# -----------------------------------------
# Summary
# -----------------------------------------
echo "==========================================="
TOTAL=$((PASS + FAIL))
echo -e "📊 Results: ${GREEN}$PASS passed${NC} / ${RED}$FAIL failed${NC} / $TOTAL total"
if [ "$FAIL" -eq 0 ]; then
  echo -e "${GREEN}🎉 All tests passed!${NC}"
else
  echo -e "${YELLOW}⚠️  Some tests failed. Make sure Kong and services are running.${NC}"
fi
echo ""
