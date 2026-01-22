export type ButtonAction = 'add' | 'delete' | 'edit'

export type ButtonStat = 'active' | 'default'

export type ButtonSize = 'large' | 'small'

export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    action : ButtonAction,
    stat: ButtonStat,
}

export const MEMO_CRUD_BUTTON_IMAGE_MAP: Record<ButtonAction, Record<ButtonSize, Record<ButtonStat, string>>> = {
  add: {
    small: { active: 'add_small_active.svg', default: 'add_small_default.svg' },
    large: { active: 'add_large_active.svg', default: 'add_large_default.svg' },
  },
  delete: {
    small: { active: 'delete_large_active.svg', default: 'delete_large_active.svg' },
    large: { active: 'delete_large_active.svg', default: 'delete_large_active.svg' },
  },
  edit: {
    small: { active: 'edit_large_active.svg', default: 'edit_large_default.svg' },
    large: { active: 'edit_large_active.svg', default: 'edit_large_default.svg' },
  },
};