// 公費疫苗接種時程與兒童預防保健（疫苗接種頁與依月齡探索共用，修改內容請只改這裡）

export const schedule = [
  {
    age: '出生 24 小時內',
    vaccines: [
      { name: 'B 型肝炎疫苗（第 1 劑）', type: 'public', note: '出生後盡快施打' },
    ],
  },
  {
    age: '1 個月',
    vaccines: [
      { name: 'B 型肝炎疫苗（第 2 劑）', type: 'public', note: '' },
    ],
  },
  {
    age: '2 個月',
    vaccines: [
      { name: '五合一疫苗（DTaP-Hib-IPV）第 1 劑', type: 'public', note: '白喉、破傷風、非細胞性百日咳、b型流感嗜血桿菌、不活化小兒麻痺' },
      { name: '13 價肺炎鏈球菌疫苗（第 1 劑）', type: 'public', note: '' },
    ],
  },
  {
    age: '4 個月',
    vaccines: [
      { name: '五合一疫苗（第 2 劑）', type: 'public', note: '' },
      { name: '13 價肺炎鏈球菌疫苗（第 2 劑）', type: 'public', note: '' },
    ],
  },
  {
    age: '5–8 個月',
    vaccines: [
      { name: '卡介苗（BCG）', type: 'public', note: '105年起由「出生24小時內」調整為此區間，建議滿5個月後盡快接種' },
    ],
  },
  {
    age: '6 個月',
    vaccines: [
      { name: '五合一疫苗（第 3 劑）', type: 'public', note: '' },
      { name: 'B 型肝炎疫苗（第 3 劑）', type: 'public', note: '' },
      { name: '流感疫苗（每年 10 月起）', type: 'public', note: '初次接種者間隔 4 週打 2 劑，之後每年 1 劑' },
    ],
  },
  {
    age: '12 個月',
    vaccines: [
      { name: '水痘疫苗（第 1 劑）', type: 'public', note: '' },
      { name: '麻疹腮腺炎德國麻疹混合疫苗（MMR）第 1 劑', type: 'public', note: '' },
    ],
  },
  {
    age: '12–15 個月',
    vaccines: [
      { name: '13 價肺炎鏈球菌疫苗（第 3 劑）', type: 'public', note: '與前一劑至少間隔 8 週' },
    ],
  },
  {
    age: '15 個月',
    vaccines: [
      { name: '日本腦炎活性減毒疫苗（第 1 劑）', type: 'public', note: '106年5月起改採細胞培養活性減毒疫苗' },
    ],
  },
  {
    age: '18 個月',
    vaccines: [
      { name: '五合一疫苗（第 4 劑追加）', type: 'public', note: '' },
      { name: 'A 型肝炎疫苗（第 1 劑）', type: 'public', note: '114年起由「12個月」調整為此年齡' },
    ],
  },
  {
    age: '27 個月',
    vaccines: [
      { name: '日本腦炎活性減毒疫苗（第 2 劑）', type: 'public', note: '與第1劑間隔12個月' },
      { name: 'A 型肝炎疫苗（第 2 劑）', type: 'public', note: '114年起由「18個月」調整為此年齡' },
    ],
  },
  {
    age: '滿 5 歲至入國小前',
    vaccines: [
      { name: '破傷風白喉非細胞性百日咳及不活化小兒麻痺混合疫苗（DTaP-IPV）', type: 'public', note: '追加 1 劑' },
      { name: '麻疹腮腺炎德國麻疹混合疫苗（MMR）第 2 劑', type: 'public', note: '' },
    ],
  },
]

export const checkups = [
  { stage: '出生至2個月', items: '身體診察、先天性代謝異常疾病篩檢、新生兒聽力篩檢（多於出生醫院完成）' },
  { stage: '2～4個月', items: '生長評估、身體檢查、粗動作發展、餵養與居家安全衛教' },
  { stage: '4～10個月', items: '生長評估、副食品添加指導、發展篩檢（含粗動作、精細動作）' },
  { stage: '10個月～1歲半', items: '生長評估、發展篩檢（含語言、社會性）、事故傷害預防衛教' },
  { stage: '1歲半～2歲', items: '生長評估、發展篩檢（含認知、社交情緒，可包含自閉症篩檢工具）' },
  { stage: '2～3歲', items: '生長評估、發展篩檢、視力與口腔檢查、肥胖與飲食衛教' },
  { stage: '3～7歲', items: '生長評估、發展篩檢、視力與口腔檢查、入學前整體評估' },
]
