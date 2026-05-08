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
  <h1 class="apf-dash-title">Panel de escritorio</h1>
  <p class="apf-dash-sub">Elige un módulo para consultar, aprender o recibir consejos educativos (prototipo Fig.&nbsp;4 APF).</p>

  <div class="apf-dash-grid">
    <a class="apf-dash-card" href="${pageContext.request.contextPath}/consulta">
      <div class="apf-dash-card-icon" aria-hidden="true">🔎</div>
      <h2>Búsqueda y consulta</h2>
      <p>Busca un medicamento y revisa uso, orientación de dosis, precauciones y efectos frecuentes en formato claro.</p>
    </a>
    <a class="apf-dash-card" href="${pageContext.request.contextPath}/repaso">
      <div class="apf-dash-card-icon" aria-hidden="true">📚</div>
      <h2>Aprendizaje</h2>
      <p>Preguntas tipo quiz para reforzar conceptos sobre medicamentos de forma interactiva.</p>
    </a>
    <a class="apf-dash-card" href="${pageContext.request.contextPath}/consejos">
      <div class="apf-dash-card-icon" aria-hidden="true">💡</div>
      <h2>Consejos</h2>
      <p>Describe síntomas o dudas; el sistema muestra una recomendación por niveles (verde, amarillo, rojo).</p>
    </a>
    <a class="apf-dash-card" href="${pageContext.request.contextPath}/medicamentos">
      <div class="apf-dash-card-icon" aria-hidden="true">📋</div>
      <h2>Catálogo completo</h2>
      <p>Listado de todas las fichas disponibles en la base de datos de demostración.</p>
    </a>
  </div>

  <c:if test="${not empty summary}">
    <div class="apf-dash-stats">
      <div class="apf-stat">Fichas: <strong><c:out value="${summary.medicationCount}"/></strong></div>
      <div class="apf-stat">Preguntas: <strong><c:out value="${summary.quizQuestionCount}"/></strong></div>
    </div>
  </c:if>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
