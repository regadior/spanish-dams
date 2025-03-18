import * as cheerio from 'cheerio'
import * as fs from 'fs'
export async function getDamsData() {
  const url = 'https://www.embalses.net/cuencas.php'
  const damsData: Record<string, WatershedData> = {}
  try {
    const data = await fetchHtml(url)
    const $ = cheerio.load(data)
    const rows = $('table.Tabla tr.ResultadoCampo')

    for (const row of rows) {
      const columns = $(row).find('td')
      const watershed = $(columns[0]).text().trim()
      const cuencaLink = $(columns[0]).find('a').attr('href')

      if (!cuencaLink) continue

      const cuencaData = await fetchHtml(cuencaLink)
      const watershed$ = cheerio.load(cuencaData)
      const cuencaRows = watershed$('table.Tabla tr.ResultadoCampo')

      for (const cuencaRow of cuencaRows) {
        const cuencaColumns = watershed$(cuencaRow).find('td')
        if (cuencaColumns.length < 3) continue

        const dam: string = watershed$(cuencaColumns[0])
          .text()
          .trim()
          .replace('Ã±', 'ñ')
          .replace('[+]', '')
        const damLink = watershed$(cuencaColumns[0]).find('a').attr('href')

        if (!damLink) continue

        const damData = await fetchHtml(damLink)
        const dam$ = cheerio.load(damData)
        const divs = dam$('div.SeccionCentral_Caja')

        if (divs.length < 2) continue

        const secondDiv = divs.eq(1)
        const rowSectionDivs = secondDiv.find('div.FilaSeccion')
        const data: DamData = {}

        rowSectionDivs.each((i, fila) => {
          const results = dam$(fila)
            .find('div.Resultado')
            .map((_, el) => dam$(el).text().trim())
            .get()

          if (results.length) {
            if (i === 0) {
              data.water = results[0].replace('.', '')
              data.waterPercentage = results[1] || null
            } else if (i === 1) {
              data.variationLastWeek = results[0]
              data.variationLastWeekPercentage = results[1] || null
            } else if (i === 2) {
              data.totalCapacity = results[0].replace('.', '')
            } else if (i === 3) {
              data.sameWeekLastYear = results[0]
              data.sameWeekLastYearPercentage = results[1] || null
            } else if (i === 4) {
              data.sameWeekTenYearsAgo = results[0]
              data.sameWeekTenYearsAgoPercentage = results[1] || null
            }
          }
        })
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')

        if (!damsData[watershed]) {
          damsData[watershed] = {
            date,
            dams: [],
          }
        }

        damsData[watershed].dams.push({ name: dam, ...data })
      }
    }

    fs.writeFileSync('damsData.json', JSON.stringify(damsData, null, 2))
    console.log('Data saved to damsData.json')
  } catch (error) {
    console.error('Error scraping data:', error)
  }
}

getDamsData()

function fetchHtml(url: string): Promise<string> {
  return fetch(url).then((result) => result.text())
}

interface DamData {
  name?: string
  water?: string
  waterPercentage?: string | null
  variationLastWeek?: string
  variationLastWeekPercentage?: string | null
  totalCapacity?: string
  sameWeekLastYear?: string
  sameWeekLastYearPercentage?: string | null
  sameWeekTenYearsAgo?: string
  sameWeekTenYearsAgoPercentage?: string | null
}

interface WatershedData {
  date: string
  dams: DamData[]
}
