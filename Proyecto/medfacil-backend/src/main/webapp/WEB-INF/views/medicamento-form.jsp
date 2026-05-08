<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="es">
<head>
<%@ include file="_head.jspf" %>
</head>
<body class="apf">
<%@ include file="_header.jspf" %>
<main class="apf-shell apf-shell-wide">
  <p>
    <a class="apf-back" href="${pageContext.request.contextPath}/medicamentos">← Catálogo</a>
  </p>

  <h1 class="apf-page-title">
    <c:choose>
      <c:when test="${editing}">Editar medicamento</c:when>
      <c:otherwise>Nuevo medicamento</c:otherwise>
    </c:choose>
  </h1>
  <p class="muted">Completa la ficha. El nombre comercial es obligatorio; el resto ayuda al repaso y a la consulta.</p>

  <c:choose>
    <c:when test="${editing}">
      <c:url var="medicamentoFormAction" value="/medicamentos/${medicationForm.id}"/>
    </c:when>
    <c:otherwise>
      <c:url var="medicamentoFormAction" value="/medicamentos"/>
    </c:otherwise>
  </c:choose>

  <div class="apf-result-card" style="margin-top:1rem;padding:1.25rem;">
    <form:form modelAttribute="medicationForm" cssClass="apf-form" method="post" action="${medicamentoFormAction}">
      <form:errors path="name" element="p" cssClass="apf-error"/>

      <form:label path="name">Nombre comercial</form:label>
      <form:input path="name" type="text" autocomplete="off"/>

      <form:label path="genericName">Nombre genérico / principio activo</form:label>
      <form:input path="genericName" type="text" autocomplete="off"/>

      <form:label path="description">Descripción e indicación</form:label>
      <form:textarea path="description" rows="4"/>

      <form:label path="commonUsage">Uso habitual (cuándo / cómo se usa)</form:label>
      <form:textarea path="commonUsage" rows="3"/>

      <form:label path="doseGuidance">Orientación sobre dosis</form:label>
      <form:textarea path="doseGuidance" rows="3"/>

      <form:label path="precautions">Precauciones y contraindicaciones</form:label>
      <form:textarea path="precautions" rows="3"/>

      <form:label path="sideEffects">Efectos secundarios frecuentes</form:label>
      <form:textarea path="sideEffects" rows="3"/>

      <div class="apf-form-actions">
        <button type="submit" class="apf-btn apf-btn-primary">Guardar</button>
        <a class="apf-btn apf-btn-secondary" href="${pageContext.request.contextPath}/medicamentos">Cancelar</a>
      </div>
    </form:form>
  </div>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
