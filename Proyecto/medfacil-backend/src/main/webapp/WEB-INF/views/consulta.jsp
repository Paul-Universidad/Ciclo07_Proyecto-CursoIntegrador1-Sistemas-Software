<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
<%@ include file="_head.jspf" %>
</head>
<body class="apf">
<%@ include file="_header.jspf" %>
<main class="apf-shell apf-shell-wide">
  <h1 class="apf-page-title">Búsqueda y consulta de medicamentos</h1>
  <p class="muted">Prototipo Fig.&nbsp;5 APF: introduce un nombre o principio activo para ver la ficha resumida.</p>

  <div class="apf-search-panel">
    <form method="get" action="${pageContext.request.contextPath}/consulta" class="apf-form">
      <label for="q">Buscar</label>
      <div class="apf-search-row">
        <input type="text" id="q" name="q" value="<c:out value='${query}'/>" placeholder="Ej. paracetamol, ibuprofeno…"/>
        <button type="submit" class="apf-btn apf-btn-primary">Consultar</button>
      </div>
    </form>
    <p class="muted" style="margin:0.75rem 0 0;font-size:0.9rem;">
      ¿Prefieres ver todo? <a href="${pageContext.request.contextPath}/medicamentos">Abrir catálogo completo</a>
    </p>
  </div>

  <c:choose>
    <c:when test="${!hasQuery}">
      <div class="apf-empty">
        Escribe un término arriba para buscar en las fichas de demostración.
      </div>
    </c:when>
    <c:when test="${empty results}">
      <div class="apf-empty">
        No hay resultados para “<c:out value="${query}"/>”. Prueba con otro término o revisa el <a href="${pageContext.request.contextPath}/medicamentos">catálogo</a>.
      </div>
    </c:when>
    <c:otherwise>
      <c:forEach var="m" items="${results}">
        <article class="apf-result-card">
          <div class="apf-result-head">
            <a href="${pageContext.request.contextPath}/medicamentos/${m.id}"><c:out value="${m.name}"/></a>
            <c:if test="${not empty m.genericName}">
              <span class="muted"> — <c:out value="${m.genericName}"/></span>
            </c:if>
          </div>
          <div class="apf-result-body">
            <div class="apf-info-block">
              <h3>Uso e indicación general</h3>
              <p><c:out value="${m.description}"/> <c:out value="${m.commonUsage}"/></p>
            </div>
            <div class="apf-info-block">
              <h3>Orientación sobre dosis</h3>
              <p><c:out value="${m.doseGuidance}"/></p>
            </div>
            <div class="apf-info-block">
              <h3>Contraindicaciones / precauciones</h3>
              <p><c:out value="${m.precautions}"/></p>
            </div>
            <div class="apf-info-block">
              <h3>Efectos secundarios frecuentes</h3>
              <p><c:out value="${m.sideEffects}"/></p>
            </div>
          </div>
        </article>
      </c:forEach>
    </c:otherwise>
  </c:choose>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
