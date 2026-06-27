// Módulos visibles según el tipo de usuario autenticado.
export const MODULOS_POR_TIPO = {
  USUARIO_GENERAL: ['inicio', 'consulta', 'medicamentos'],
  ESTUDIANTE: ['inicio', 'panel', 'medicamentos', 'consulta', 'aprendizaje'],
  ADMIN: ['inicio', 'panel', 'medicamentos', 'consulta', 'aprendizaje'],
};

export function puedeAcceder(tipoUsuario, modulo) {
  const modulos = MODULOS_POR_TIPO[tipoUsuario] ?? [];
  return modulos.includes(modulo);
}

export function esAdmin(tipoUsuario) {
  return tipoUsuario === 'ADMIN';
}
