<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fn" uri="jakarta.tags.functions" %>
<!DOCTYPE html>
<html lang="es">
<head>
<%@ include file="_head.jspf" %>
</head>
<body class="apf">
<%@ include file="_header.jspf" %>
<main class="apf-shell apf-shell-wide">
  <h1 class="apf-page-title">Módulo de aprendizaje</h1>
  <p class="muted">Prototipo Fig.&nbsp;6 APF: responde las preguntas y comprueba tu comprensión.</p>

  <c:if test="${not empty quizError}">
    <p class="apf-error"><c:out value="${quizError}"/></p>
  </c:if>

  <c:forEach var="q" items="${questions}" varStatus="st">
    <section class="apf-quiz-card">
      <h2>Pregunta <c:out value="${st.index + 1}"/> de <c:out value="${fn:length(questions)}"/></h2>
      <p class="apf-quiz-prompt"><c:out value="${q.prompt}"/></p>

      <c:if test="${quizQuestionId eq q.id}">
        <c:choose>
          <c:when test="${quizCorrect}">
            <p class="apf-feedback-ok">✓ Correcto. <c:out value="${quizExplanation}"/></p>
          </c:when>
          <c:otherwise>
            <p class="apf-feedback-bad">✗ Incorrecto. <c:out value="${quizExplanation}"/></p>
          </c:otherwise>
        </c:choose>
      </c:if>

      <form method="post" action="${pageContext.request.contextPath}/repaso/verificar" class="apf-form">
        <input type="hidden" name="questionId" value="${q.id}"/>
        <c:forEach var="o" items="${q.options}">
          <label class="apf-option">
            <input type="radio" name="optionId" value="${o.id}" required/>
            <span><c:out value="${o.text}"/></span>
          </label>
        </c:forEach>
        <button type="submit" class="apf-btn apf-btn-primary" style="margin-top:0.75rem;">Comprobar respuesta</button>
      </form>
    </section>
  </c:forEach>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
