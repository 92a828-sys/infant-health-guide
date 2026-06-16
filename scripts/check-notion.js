/**
 * 執行方式：
 *   node scripts/check-notion.js
 *
 * 執行前請先在終端機設定環境變數：
 *   $env:NOTION_API_KEY="secret_xxx"
 *   $env:NOTION_DATABASE_ID="xxx"
 */

import { Client } from '@notionhq/client'

const key = process.env.NOTION_API_KEY
const dbId = process.env.NOTION_DATABASE_ID

if (!key || !dbId) {
  console.error('\n❌ 請先設定環境變數：')
  console.error('   $env:NOTION_API_KEY="secret_xxx"')
  console.error('   $env:NOTION_DATABASE_ID="xxx"\n')
  process.exit(1)
}

const notion = new Client({ auth: key })

async function main() {
  console.log('\n🔍 正在讀取 Notion 資料庫結構...\n')

  const db = await notion.databases.retrieve({ database_id: dbId })

  console.log(`📋 資料庫名稱：${db.title?.[0]?.plain_text ?? '（無標題）'}\n`)
  console.log('📌 欄位清單（請對照 api/drugs.js 的 PROPS 設定）：\n')

  const props = db.properties
  const rows = Object.entries(props).map(([name, prop]) => ({ name, type: prop.type }))

  // 顯示欄位名稱與類型
  rows.forEach(r => {
    const tag = r.type === 'title' ? ' ← Title（必要）' : ''
    console.log(`  欄位名稱: "${r.name}"  |  類型: ${r.type}${tag}`)
  })

  console.log('\n📄 第一筆資料預覽：\n')
  const sample = await notion.databases.query({ database_id: dbId, page_size: 1 })
  if (sample.results.length === 0) {
    console.log('  （資料庫目前沒有任何資料）')
    return
  }

  const page = sample.results[0]
  Object.entries(page.properties).forEach(([name, prop]) => {
    let value = '（空）'
    if (prop.type === 'title')      value = prop.title?.[0]?.plain_text ?? '（空）'
    if (prop.type === 'rich_text')  value = prop.rich_text?.[0]?.plain_text ?? '（空）'
    if (prop.type === 'select')     value = prop.select?.name ?? '（空）'
    if (prop.type === 'multi_select') value = prop.multi_select?.map(s => s.name).join(', ') || '（空）'
    console.log(`  "${name}" → ${value}`)
  })

  console.log('\n✅ 完成！請將上方欄位名稱對應到 api/drugs.js 的 PROPS。\n')
}

main().catch(err => {
  console.error('\n❌ 發生錯誤：', err.message)
  if (err.code === 'unauthorized') console.error('   → API Key 錯誤或過期')
  if (err.code === 'object_not_found') console.error('   → 資料庫 ID 錯誤，或尚未分享給此 Integration')
  process.exit(1)
})
