<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
<%@ include file="_head.jspf" %>
</head>
<body class="apf">
<%@ include file="_header.jspf" %>
<main class="apf-shell">
  <h1 class="apf-page-title">Consejos según síntomas o dudas</h1>
  <p class="muted">Prototipo Fig.&nbsp;7 APF: describe brevemente tus síntomas o tu consulta. El sistema clasifica la orientación en
    <strong style="color:#16a34a">verde</strong> (leve),
    <strong style="color:#ca8a04">amarillo</strong> (moderado) o
    <strong style="color:#dc2626">rojo</strong> (grave — buscar urgencia).</p>

  <div class="apf-search-panel">
    <form method="post" action="${pageContext.request.contextPath}/consejos" class="apf-form">
      <label for="topic">Síntomas o tema</label>
      <textarea id="topic" name="topic" placeholder="Ej. fiebre, dolor de cabeza, dolor en el pecho, duda sobre paracetamol…"><c:out value="${prefillTopic}"/></textarea>
      <button type="submit" class="apf-btn apf-btn-primary" style="margin-top:0.75rem;">Obtener orientación</button>
    </form>
  </div>

  <c:if test="${not empty error}">
    <p class="apf-error"><c:out value="${error}"/></p>
  </c:if>

  <c:if test="${not empty advice}">
    <c:choose>
      <c:when test="${advice.levelCode == 'rojo'}">
        <div class="apf-triage apf-triage--rojo">
          <div class="apf-triage-label"><c:out value="${advice.levelTitle}"/></div>
          <p><strong>Consulta:</strong> <c:out value="${advice.topic}"/></p>
          <p><c:out value="${advice.message}"/></p>
        </div>
      </c:when>
      <c:when test="${advice.levelCode == 'amarillo'}">
        <div class="apf-triage apf-triage--amarillo">
          <div class="apf-triage-label"><c:out value="${advice.levelTitle}"/></div>
          <p><strong>Consulta:</strong> <c:out value="${advice.topic}"/></p>
          <p><c:out value="${advice.message}"/></p>
        </div>
      </c:when>
      <c:otherwise>
        <div class="apf-triage apf-triage--verde">
          <div class="apf-triage-label"><c:out value="${advice.levelTitle}"/></div>
          <p><strong>Consulta:</strong> <c:out value="${advice.topic}"/></p>
          <p><c:out value="${advice.message}"/></p>
        </div>
      </c:otherwise>
    </c:choose>
  </c:if>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
