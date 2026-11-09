import { OctagonAlert, TriangleAlert, CircleCheck } from 'lucide-react'

// 警示語意固定：danger=紅、warning=黃、success=綠。
// 每個警示都必須同時有「圖示＋文字標籤」，不能只靠顏色。
export const TONES = {
  danger: {
    Icon: OctagonAlert,
    label: '危險',
    box: 'bg-danger-bg text-danger-fg border-danger-border',
  },
  warning: {
    Icon: TriangleAlert,
    label: '注意',
    box: 'bg-warning-bg text-warning-fg border-warning-border',
  },
  success: {
    Icon: CircleCheck,
    label: '正常',
    box: 'bg-success-bg text-success-fg border-success-border',
  },
}

/** 僅取色（給需要自訂版型的分級卡片用），一律搭配 <ToneIcon> 與文字 */
export function toneClasses(tone) {
  return TONES[tone].box
}
