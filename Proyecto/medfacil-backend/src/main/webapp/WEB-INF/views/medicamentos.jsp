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
  <h1 class="apf-page-title">Catálogo de medicamentos</h1>
  <p class="muted">Listado completo de fichas en la base de demostración. Puedes dar de alta, editar o eliminar entradas.</p>

  <p style="margin:0 0 1rem;">
    <a class="apf-btn apf-btn-primary" href="${pageContext.request.contextPath}/medicamentos/nuevo">Nuevo medicamento</a>
  </p>

  <c:if test="${not empty success}">
    <p class="apf-feedback-ok"><c:out value="${success}"/></p>
  </c:if>
  <c:if test="${not empty error}">
    <p class="apf-error"><c:out value="${error}"/></p>
  </c:if>

  <ul class="apf-list-plain">
    <c:forEach var="m" items="${medications}">
      <li class="apf-catalog-row">
        <span class="apf-catalog-row-main">
          <a href="${pageContext.request.contextPath}/medicamentos/${m.id}"><c:out value="${m.name}"/></a>
          <c:if test="${not empty m.genericName}">
            <span class="muted"> (<c:out value="${m.genericName}"/>)</span>
          </c:if>
        </span>
        <span class="apf-catalog-row-actions">
          <a class="apf-back" style="margin:0;" href="${pageContext.request.contextPath}/medicamentos/${m.id}/editar">Editar</a>
          <form method="post" action="${pageContext.request.contextPath}/medicamentos/${m.id}/eliminar"
                style="display:inline;" onsubmit="return confirm('¿Eliminar esta ficha del catálogo?');">
            <button type="submit" class="apf-btn apf-btn-secondary" style="padding:0.4rem 0.85rem;font-size:0.9rem;">Eliminar</button>
          </form>
        </span>
      </li>
    </c:forEach>
  </ul>
</main>
<%@ include file="_footer.jspf" %>
</body>
</html>
