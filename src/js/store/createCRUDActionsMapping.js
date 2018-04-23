/**
 * creates simple Create, Read, Update and Delete actions for vuex
 * @param {String} entityName
 * @return {Object}
 */
export default function createCRUDActionsMapping(entityName) {
  const CRUD = {};
  ['create', 'read', 'update', 'delete', 'list'].forEach((actionName) => {
    CRUD[actionName + entityName] = ({ commit }, payload) => {
      commit(actionName + entityName, payload);
    };
  });
  return CRUD;
}
