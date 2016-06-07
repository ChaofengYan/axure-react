/*
 * action 类型
 */
export const CHILD_CREATE = 'CHILD_CREATE';

/*
 * action 创建函数
 */
export function childCreate(text) {
  return { type: CHILD_CREATE, text }
}
