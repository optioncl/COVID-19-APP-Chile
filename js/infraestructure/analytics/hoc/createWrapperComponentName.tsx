/**
 * Obtiene nombre de componente o nombre por omisión.
 *
 * @param {React.Component} Component
 * @return {string|*|string}
 */
const getNameComponent = Component =>
  Component.displayName || Component.name || 'Component';

/**
 * Crea un nombre a partir de un componente envoltorio y el componente
 * envuelto.
 * Útil para reemplazar nombres de envoltorios con el fin de facilitar la
 * depuración.
 *
 * @param {string} WrapperComponentName
 * @param {React.Component} InnerComponent
 * @return {string}
 */
export default (WrapperComponent, InnerComponent) =>
  `${getNameComponent(WrapperComponent)}(${getNameComponent(InnerComponent)})`;
