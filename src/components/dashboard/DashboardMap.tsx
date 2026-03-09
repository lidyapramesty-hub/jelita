'use client'

import { useEffect, useRef, useState } from 'react'
import { Paper, Text, Group, Select, Badge, LoadingOverlay } from '@mantine/core'
import { IconMap } from '@tabler/icons-react'
import 'leaflet/dist/leaflet.css'
import { Usaha } from '@/types/usaha'

interface DashboardMapProps {
    usahaList: Usaha[]
}

export default function DashboardMap({ usahaList }: DashboardMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<unknown>(null)
    const markersRef = useRef<unknown[]>([])
    const [mapReady, setMapReady] = useState(false)
    const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null)
    const [filterKelas, setFilterKelas] = useState<string | null>(null)
    const [filterKBLI, setFilterKBLI] = useState<string | null>(null)

    const kbliKategoriOptions = [
        { value: 'A', label: 'A - Pertanian, Kehutanan, dan Perikanan' },
        { value: 'B', label: 'B - Pertambangan dan Penggalian' },
        { value: 'C', label: 'C - Industri' },
        { value: 'D', label: 'D - Penyediaan Listrik, Gas, Uap/Air Panas, dan Udara Dingin' },
        { value: 'E', label: 'E - Penyediaan Air, Pengelolaan Air Limbah, Penanganan Limbah, dan Remediasi' },
        { value: 'F', label: 'F - Konstruksi' },
        { value: 'G', label: 'G - Perdagangan Besar dan Eceran' },
        { value: 'H', label: 'H - Transportasi dan Penyimpanan' },
        { value: 'I', label: 'I - Aktivitas Penyediaan Akomodasi dan Makan Minum' },
        { value: 'J', label: 'J - Aktivitas Penerbitan, Penyiaran, serta Produksi dan Distribusi Konten' },
        { value: 'K', label: 'K - Aktivitas Telekomunikasi, Pemrograman Komputer, Konsultansi, Infrastruktur Komputasi, dan Jasa Informasi Lainnya' },
        { value: 'L', label: 'L - Aktivitas Keuangan dan Asuransi' },
        { value: 'M', label: 'M - Aktivitas Real Estat' },
        { value: 'N', label: 'N - Aktivitas Profesional, Ilmiah, dan Teknis' },
        { value: 'O', label: 'O - Aktivitas Administratif dan Penunjang Usaha' },
        { value: 'P', label: 'P - Administrasi Pemerintahan dan Pertahanan, serta Jaminan Sosial Wajib' },
        { value: 'Q', label: 'Q - Pendidikan' },
        { value: 'R', label: 'R - Aktivitas Kesehatan Manusia dan Aktivitas Sosial' },
        { value: 'S', label: 'S - Kesenian, Olahraga, dan Rekreasi' },
        { value: 'T', label: 'T - Aktivitas Jasa Lainnya' },
        { value: 'U', label: 'U - Aktivitas Rumah Tangga sebagai Pemberi Kerja' },
        { value: 'V', label: 'V - Aktivitas Badan Internasional dan Badan Ekstra Internasional Lainnya' },
    ]

    const kecamatanOptions = Array.from(new Set(usahaList.map((u) => u.kecamatan_nama).filter(Boolean))).map((k) => ({
        value: k,
        label: k,
    }))

    const filtered = usahaList.filter((u) => {
        if (!u.latitude || !u.longitude) return false
        if (filterKecamatan && u.kecamatan_nama !== filterKecamatan) return false
        if (filterKelas && u.kelas_usaha !== filterKelas) return false
        if (filterKBLI && u.kbli_kategori_kode !== filterKBLI) return false
        return true
    })

    useEffect(() => {
        let isMounted = true

        const initMap = async () => {
            if (!mapRef.current) return

            try {
                const L = (await import('leaflet')).default

                // Clean up any leftover Leaflet container state (React Strict Mode fix)
                const container = mapRef.current as HTMLDivElement & { _leaflet_id?: number }
                if (container._leaflet_id) {
                    container.innerHTML = ''
                    delete container._leaflet_id
                }

                // Remove previous map instance if it exists
                if (mapInstanceRef.current) {
                    try { (mapInstanceRef.current as any).remove() } catch (_) { /* ignore */ }
                    mapInstanceRef.current = null
                }

                const map = L.map(container, { zoomControl: true }).setView([-8.4418, 115.0294], 12)

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors',
                    maxZoom: 19,
                }).addTo(map)

                mapInstanceRef.current = map

                // Force proper sizing after initialization
                setTimeout(() => {
                    if (isMounted && map) {
                        map.invalidateSize()
                    }
                }, 200)

                if (isMounted) setMapReady(true)
            } catch (err) {
                console.error('Map init error:', err)
                // Still set mapReady to remove loading overlay even on error
                if (isMounted) setMapReady(true)
            }
        }

        // Small delay to ensure DOM is fully ready
        const timer = setTimeout(initMap, 50)

        return () => {
            isMounted = false
            clearTimeout(timer)
            if (mapInstanceRef.current) {
                try { (mapInstanceRef.current as any).remove() } catch (_) { /* ignore */ }
                mapInstanceRef.current = null
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update markers when filtering changes
    useEffect(() => {
        if (!mapInstanceRef.current || !mapReady) return

        const updateMarkers = async () => {
            const L = (await import('leaflet')).default
            const map = mapInstanceRef.current as any

            // Remove existing markers
            markersRef.current.forEach((m) => {
                try { (m as any).remove() } catch (_) { /* ignore */ }
            })
            markersRef.current = []

            const kelasColors: Record<string, string> = {
                mikro: '#C8102E', // Merah
                kecil: '#FFB81C', // Kuning
                menengah: '#003087', // Biru
                besar: '#059669', // Hijau
            }

            filtered.forEach((u) => {
                if (!u.latitude || !u.longitude) return

                const color = kelasColors[u.kelas_usaha] || '#C8102E'

                const icon = L.divIcon({
                    className: '',
                    html: `<div style="
            width: 14px; height: 14px;
            background: ${color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          "></div>`,
                    iconSize: [14, 14],
                    iconAnchor: [7, 7],
                })

                const marker = L.marker([u.latitude, u.longitude], { icon })
                    .addTo(map)
                    .bindPopup(`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 180px;">
              <p style="font-weight: 700; font-size: 13px; margin: 0 0 4px;">${u.nama_usaha}</p>
              <p style="color: #666; font-size: 11px; margin: 0 0 4px;">${u.nama_pemilik}</p>
              <p style="color: #666; font-size: 11px; margin: 0;">${u.kecamatan_nama || '-'} · ${u.kelas_usaha}</p>
            </div>
          `)

                markersRef.current.push(marker)
            })
        }

        updateMarkers()
    }, [filtered, mapReady])

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md" justify="space-between" wrap="wrap">
                <Group gap="xs">
                    <IconMap size={17} className="text-[#e65100]" />
                    <Text fw={700} size="sm">Peta Lokasi Usaha</Text>
                    <Badge size="sm" variant="light" color="blue">{filtered.length} titik</Badge>
                </Group>
                <Group gap="xs" wrap="wrap">
                    <Select
                        placeholder="Filter Kecamatan"
                        data={kecamatanOptions}
                        value={filterKecamatan}
                        onChange={setFilterKecamatan}
                        clearable
                        size="xs"
                        style={{ width: 160 }}
                    />
                    <Select
                        placeholder="Filter Skala"
                        data={[
                            { value: 'mikro', label: 'Mikro' },
                            { value: 'kecil', label: 'Kecil' },
                            { value: 'menengah', label: 'Menengah' },
                            { value: 'besar', label: 'Besar' },
                        ]}
                        value={filterKelas}
                        onChange={setFilterKelas}
                        clearable
                        size="xs"
                        style={{ width: 130 }}
                    />
                    <Select
                        placeholder="Filter KBLI"
                        data={kbliKategoriOptions}
                        value={filterKBLI}
                        onChange={setFilterKBLI}
                        clearable
                        searchable
                        size="xs"
                        style={{ width: 220 }}
                    />
                </Group>
            </Group>

            <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <LoadingOverlay visible={!mapReady} />
                <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
            </div>

            <Group mt="xs" gap="md">
                {[
                    { label: 'Mikro', color: '#C8102E' },
                    { label: 'Kecil', color: '#FFB81C' },
                    { label: 'Menengah', color: '#003087' },
                    { label: 'Besar', color: '#059669' },
                ].map((item) => (
                    <Group key={item.label} gap={6}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                        <Text size="xs" c="dimmed">{item.label}</Text>
                    </Group>
                ))}
            </Group>
        </Paper>
    )
}
