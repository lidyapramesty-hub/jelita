import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

async function seedUsers() {
  console.log('Seeding admin and pegawai users...')

  // Admin
  await prisma.user.upsert({
    where: { username: 'adminjelita' },
    update: {},
    create: {
      name: 'Admin Jelita',
      username: 'adminjelita',
      password: await hashPassword('admin123'),
      role: 'admin',
    },
  })

  // Pegawai
  const pegawai = [
    { name: 'Ari Noviantari', username: 'ari.noviantari', password: 'Andreana1212#' },
    { name: 'Gde Susila', username: 'gdesusila', password: 'dua2tiga' },
    { name: 'Ria Nurul', username: 'ria.nurul', password: 'zachraria96' },
    { name: 'Nurul Hanifah S', username: 'nurulhanifahs', password: 'nina.nina456' },
    { name: 'M. Taufiq Qurrahman', username: 'm.taufiqqurrahman', password: 'QRMAN8395bps' },
    { name: 'I Nyoman Wahyu', username: 'inyoman.wahyu', password: '151096potter' },
    { name: 'Gde Ari Sudana', username: 'gdeari.sudana', password: 'boo4boy' },
    { name: 'I N. Pande', username: 'in.pande', password: 'Smanegeri1mengwi' },
    { name: 'Desak Pratiwi', username: 'desak.pratiwi', password: 'Astungkara26071995' },
    { name: 'Putu Minarni', username: 'putu.minarni', password: 'Minarni024##' },
    { name: 'Nonik Witana', username: 'nonikwitana', password: 'pen9new' },
    { name: 'Yan Putrawan', username: 'Yanputrawan', password: 'easy0july' },
    { name: 'Sunadi', username: 'sunadi', password: 'Satu3laku' },
    { name: 'I W. Widana', username: 'iw.widana', password: 'job3like' },
    { name: 'I D. P. Adnyana', username: 'idp.adnyana', password: 'susu2job' },
    { name: 'Surati', username: 'surati', password: 'apa2ada' },
    { name: 'Muliana', username: 'muliana', password: 'argade53' },
    { name: 'Bondiana P', username: 'bondianap-pppk', password: 'Naskeleng13' },
    { name: 'Ni Made Wilia', username: 'nimadewilia-pppk', password: 'Wilia22#' },
    { name: 'I Putu Edy', username: 'iputuedy-pppk', password: 'P3KEdy22#' },
    { name: 'I Made Subaga', username: 'imadesubaga-pppk', password: 'Subaga88' },
    { name: 'Zenda Oka', username: 'zenda.oka', password: 'zeen29' },
    { name: 'I Putu Agus', username: 'iputuagus-pppk', password: '@Aguz1812' },
    { name: 'I W. Kayun', username: 'iw.kayun', password: 'he8home' },
    { name: 'Geri Putri', username: 'geriputri', password: '9321Abee' },
    { name: 'Naufal Abdul', username: 'naufal.abdul', password: 'Naufal211810498' },
    { name: 'Gona Asri', username: 'gona.asri', password: 'Supertuna7' },
  ]

  for (const p of pegawai) {
    await prisma.user.upsert({
      where: { username: p.username },
      update: {},
      create: {
        name: p.name,
        username: p.username,
        password: await hashPassword(p.password),
        role: 'pegawai',
      },
    })
  }

  console.log(`Seeded 1 admin + ${pegawai.length} pegawai.`)
}

async function seedMitra() {
  console.log('Fetching mitra data from Google Sheets...')

  const url = 'https://docs.google.com/spreadsheets/d/104RY1T6PdroozO7f71t2t701HHty0sWR/export?format=csv'

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.warn('Failed to fetch mitra data from Google Sheets.')
      return
    }

    const csv = await response.text()
    const rows = csv.split('\n')
    let created = 0

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].trim()
      if (!row) continue

      // Simple CSV parse (handles quoted fields)
      const cols = parseCSVRow(row)
      if (cols.length < 3) continue

      const name = cols[0].trim()
      let phone = cols[1].trim()
      const pass = cols[2].trim()

      if (!name || !phone || !pass) continue

      // Normalize phone: remove leading 0
      phone = phone.replace(/^0+/, '')

      // Skip if phone already exists
      const existing = await prisma.user.findUnique({ where: { phone } })
      if (existing) continue

      await prisma.user.create({
        data: {
          name,
          username: null,
          phone,
          password: await hashPassword(pass),
          role: 'mitra',
        },
      })
      created++
    }

    console.log(`MitraSeeder: ${created} mitra berhasil dibuat.`)
  } catch (error) {
    console.warn('Error fetching mitra data:', error)
  }
}

function parseCSVRow(row: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < row.length; i++) {
    const char = row[i]
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

async function main() {
  try {
    await seedUsers()
    await seedMitra()
    console.log('Seeding complete!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
