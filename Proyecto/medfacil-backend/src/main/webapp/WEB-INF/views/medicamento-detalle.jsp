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
  <p>
    <a class="apf-back" href="${pageContext.request.contextPath}/consulta">← Búsqueda</a>
    ·
    <a class="apf-back" href="${pageContext.request.contextPath}/medicamentos">Catálogo</a>
  </p>

  <c:if test="${not empty success}">
    <p class="apf-feedback-ok"><c:out value="${success}"/></p>
  </c:if>
  <c:if test="${not empty error}">
    <p class="apf-error"><c:out value="${error}"/></p>
  </c:if>

  <p class="apf-catalog-row-actions" style="margin-bottom:1rem;">
    <a class="apf-btn apf-btn-secondary" href="${pageContext.request.contextPath}/medicamentos/${medication.id}/editar">Editar ficha</a>
    <form method="post" action="${pageContext.request.contextPath}/medicamentos/${medication.id}/eliminar"
          style="display:inline;" onsubmit="return confirm('¿Eliminar esta ficha del catálogo?');">
      <button type="submit" class="apf-btn apf-btn-secondary">Eliminar</button>
    </form>
  </p>

  <div class="apf-detail-hero">
    <h1><c:out value="${medication.name}"/></h1>
    <p class="muted">Nombre genérico: <c:out value="${medication.genericName}"/></p>
  </div>

  <div class="apf-detail-grid">
    <div class="apf-info-block apf-result-card" style="margin:0;padding:1rem;">
      <h3>Uso e indicación</h3>
      <p><c:out value="${medication.description}"/></p>
      <p><c:out value="${medication.commonUsage}"/></p>
    </div>
    <div class="apf-info-block apf-result-card" style="margin:0;padding:1rem;">
      <h3>Orientación sobre dosis</h3>
      <p><c:out value="${medication.doseGuidance}"/></p>
    </div>
    <div class="apf-info-block apf-result-card" style="margin:0;padding:1rem;">
      <h3>Contraindicaciones y precauciones</h3>
      <p><c:out value="${medication.precautions}"/></p>
    </div>
    <div class="apf-info-block apf-result-card" style="margin:0;padding:1rem;">
      <h3>Efectos secundarios</h3>
      <p><c:out value="${medication.sideEffects}"/></p>
    </div>
  </div>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
