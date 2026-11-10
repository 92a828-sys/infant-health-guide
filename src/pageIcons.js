// 頁面 ID → Lucide 圖示（Navbar、HomePage、Footer 共用）
// 使用時請帶 strokeWidth={2}
import {
  House, Ruler, ChartLine, Thermometer, Syringe, Soup, Ambulance, Pill,
  Hospital, ShieldCheck, FireExtinguisher, Bath, HeartHandshake, Activity,
  Brain,
} from 'lucide-react'

export const pageIcons = {
  'home':                   House,
  'growth':                 Ruler,
  'growth-chart':           ChartLine,
  'symptoms':               Thermometer,
  'vaccination':            Syringe,
  'dietary':                Soup,
  'emergency':              Ambulance,
  'medication':             Pill,
  'diseases':               Hospital,
  'newborn-safety':         ShieldCheck,
  'home-safety':            FireExtinguisher,
  'daily-care':             Bath,
  'parent-support':         HeartHandshake,
  'vitals':                 Activity,
  'early-learning':         Brain,
}
