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
  <section class="apf-hero">
    <h1>Sistema de consulta y repaso de medicamentos</h1>
    <p class="apf-lead">
      Información en lenguaje claro para comprender mejor el uso de medicamentos, repasar con preguntas interactivas
      y recibir orientación educativa según lo que indiques.
    </p>
    <div class="apf-hero-actions">
      <a class="apf-btn apf-btn-primary" href="${pageContext.request.contextPath}/panel">Ir al panel principal</a>
      <a class="apf-btn apf-btn-secondary" href="${pageContext.request.contextPath}/consulta">Buscar medicamento</a>
    </div>
    <div class="apf-hero-meta">
      <c:if test="${not empty summary}">
        Contenido de demostración: <strong><c:out value="${summary.medicationCount}"/></strong> fichas de medicamentos
        y <strong><c:out value="${summary.quizQuestionCount}"/></strong> preguntas de aprendizaje.
      </c:if>
    </div>
  </section>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
