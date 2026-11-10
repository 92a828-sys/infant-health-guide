// 網站導覽分組（Navbar、首頁、頁尾共用）
// label：導覽列／選單用的短名稱；title、desc：首頁卡片標題與一句說明（下拉選單也顯示 desc）
// 新增頁面時：在對應分組加一筆，並在 src/pageIcons.js 加圖示、App.jsx 加 case
import { Sprout, Stethoscope, Sun, HeartHandshake } from 'lucide-react'

export const navGroups = [
  {
    id: 'growth',
    label: '成長發展',
    Icon: Sprout,
    items: [
      { id: 'growth',         label: '生長里程碑', title: '生長發育里程碑',     desc: '0–3歲各階段動作、語言、社交情緒發展指標與紅旗警訊' },
      { id: 'growth-chart',   label: '生長曲線',   title: '生長曲線知多少',     desc: 'WHO生長曲線教學＋線上百分位估算器，早產兒矯正年齡換算' },
      { id: 'early-learning', label: '早期學習',   title: '早期學習與親子共讀', desc: '大腦開發三原則、分齡共讀技巧、感官刺激遊戲活動' },
    ],
  },
  {
    id: 'health',
    label: '健康預防',
    Icon: Stethoscope,
    items: [
      { id: 'vaccination', label: '疫苗接種', title: '預防接種',        desc: '公費/自費疫苗時程、反應與禁忌、個人化試算、預防保健與新生兒篩檢' },
      { id: 'symptoms',    label: '常見症狀', title: '常見症狀處理',    desc: '發燒、感冒、腹瀉、咳嗽等居家照護與就醫時機判斷' },
      { id: 'diseases',    label: '常見疾病', title: '認識常見疾病',    desc: '腸病毒、RSV、肺炎、流感等幼兒常見疾病症狀與照護' },
      { id: 'medication',  label: '用藥衛教', title: '用藥衛教',        desc: '用藥原則、退燒藥劑量計算、禁用藥物與幼生藥庫' },
      { id: 'vitals',      label: '生命徵象', title: '0–3 歲生命徵象', desc: '體溫、心跳、呼吸、血氧正常值對照表與測量方式，爸媽也看得懂' },
    ],
  },
  {
    id: 'care',
    label: '日常照護',
    Icon: Sun,
    items: [
      { id: 'dietary',        label: '營養與餵食', title: '營養與餵食',         desc: '母乳、配方奶、副食品添加（含BLW）、1-3歲均衡飲食與斷奶轉銜' },
      { id: 'daily-care',     label: '日常照護',   title: '日常照護與生活習慣', desc: '洗澡與清潔、如廁訓練、睡眠作息與夜醒處理、視力聽力口腔保健' },
      { id: 'newborn-safety', label: '新生兒安全', title: '新生兒安全與警訊',   desc: 'SIDS安全睡眠圖解、大便顏色卡、何時必須就醫的紅旗症狀' },
      { id: 'home-safety',    label: '居家安全',   title: '居家安全與意外預防', desc: '居家安全陷阱檢查、窒息燒燙傷跌倒車禍溺水預防、玩具安全標準' },
    ],
  },
  {
    id: 'parent',
    label: '親職支持',
    Icon: HeartHandshake,
    // 只有一頁的分組：導覽列直接連結，不做下拉
    direct: 'parent-support',
    items: [
      { id: 'parent-support', label: '親職支持', title: '心理與親職支持', desc: '產後情緒與伴侶分工、依附關係與正向教養、特殊家庭資源、求助管道' },
    ],
  },
]

// 緊急狀況不放在導覽列分組，入口在最上方緊急資源列；首頁仍顯示其卡片
export const emergencyPage = {
  id: 'emergency', label: '緊急狀況', title: '緊急狀況判斷', desc: '哪些症狀需立即就醫？熱痙攣、異物哽塞緊急處理步驟',
}

/** 回傳頁面所屬分組的 id（首頁、緊急狀況等不屬於任何分組時回傳 null） */
export function groupOfPage(pageId) {
  return navGroups.find(g => g.items.some(it => it.id === pageId))?.id ?? null
}
