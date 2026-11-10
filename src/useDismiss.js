import { useEffect } from 'react'

/**
 * 浮動面板共用的關閉行為：點擊 ref 範圍外、或按 Esc 時呼叫 onClose。
 * onEscape（選填）會在 Esc 關閉後呼叫，用來把焦點還給觸發按鈕。
 */
export function useDismiss(ref, open, onClose, onEscape) {
  useEffect(() => {
    if (!open) return
    const onPointer = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    const onKey = e => {
      if (e.key === 'Escape') {
        onClose()
        onEscape?.()
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, open, onClose, onEscape])
}
