import { Client } from '@notionhq/client'

// 支援 VITE_NOTION_API_KEY（使用者設定）與 NOTION_API_KEY（備用）
const API_KEY = process.env.VITE_NOTION_API_KEY || process.env.NOTION_API_KEY
const DATABASE_ID =
  process.env.VITE_NOTION_DATABASE_ID ||
  process.env.NOTION_DATABASE_ID ||
  '2d85578cd933803b9c9a000b56a13618'

const notion = new Client({ auth: API_KEY })

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (!API_KEY) {
    return res.status(500).json({
      error: '尚未設定 VITE_NOTION_API_KEY 環境變數，請至 Vercel 控制台或 .env 檔案填入 Notion Integration Token。',
    })
  }

  try {
    let results = []
    let cursor

    do {
      // @notionhq/client v5 已將 databases.query 改為 dataSources.query
      const response = await notion.dataSources.query({
        data_source_id: DATABASE_ID,
        sorts: [{ property: '藥物分類', direction: 'ascending' }],
        start_cursor: cursor,
        page_size: 100,
      })
      results = results.concat(response.results)
      cursor = response.has_more ? response.next_cursor : undefined
    } while (cursor)

    const drugs = results
      .filter(p => p.object === 'page' && !p.archived)
      .map(p => ({
        id:          p.id,
        name:        getTitle(p.properties['藥品名稱']),
        symptoms:    getMultiSelect(p.properties['主治症狀']),
        storage:     getSelect(p.properties['保存條件']),
        sideEffects: getMultiSelect(p.properties['副作用']),
        notes:       getText(p.properties['注意事項']),
        categories:  getMultiSelect(p.properties['藥物分類']),
        mechanism:   getText(p.properties['藥理作用']),
        images:      getFiles(p.properties['外觀']),
        keywords:    getText(p.properties['關鍵字/外觀']),
        updatedAt:   p.last_edited_time,
      }))

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    return res.status(200).json({ drugs, total: drugs.length })
  } catch (err) {
    console.error('[Notion API Error]', err.message)
    return res.status(500).json({ error: '無法讀取 Notion 資料庫，請確認 API 金鑰與資料庫 ID 是否正確。' })
  }
}

function getTitle(prop) {
  return prop?.title?.[0]?.plain_text ?? ''
}

function getText(prop) {
  if (!prop) return ''
  if (prop.type === 'rich_text') return prop.rich_text?.map(r => r.plain_text).join('') ?? ''
  if (prop.type === 'title')     return prop.title?.map(r => r.plain_text).join('') ?? ''
  return ''
}

function getSelect(prop) {
  return prop?.select?.name ?? ''
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map(o => o.name) ?? []
}

function getFiles(prop) {
  if (!prop || prop.type !== 'files') return []
  return prop.files.map(f => {
    if (f.type === 'file')     return f.file.url
    if (f.type === 'external') return f.external.url
    return null
  }).filter(Boolean)
}
