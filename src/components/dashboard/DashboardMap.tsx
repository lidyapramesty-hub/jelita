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

    const kecamatanOptions = Array.from(new Set(usahaList.map((u) => u.kecamatan_nama).filter(Boolean))).map((k) => ({
        value: k,
        label: k,
    }))

    const filtered = usahaList.filter((u) => {
        if (!u.latitude || !u.longitude) return false
        if (filterKecamatan && u.kecamatan_nama !== filterKecamatan) return false
        if (filterKelas && u.kelas_usaha !== filterKelas) return false
        return true
    })

    useEffect(() => {
        let isMounted = true

        const initMap = async () => {
            if (!mapRef.current || mapInstanceRef.current) return

            try {
                const L = (await import('leaflet')).default

                const map = L.map(mapRef.current!, { zoomControl: true }).setView([-8.4418, 115.0294], 12)

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19,
                }).addTo(map)

                mapInstanceRef.current = map
                if (isMounted) setMapReady(true)
            } catch (err) {
                console.error('Map init error:', err)
            }
        }

        initMap()

        return () => {
            isMounted = false
            if (mapInstanceRef.current) {
                (mapInstanceRef.current as L.Map).remove()
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
            const map = mapInstanceRef.current as L.Map

            // Remove existing markers
            markersRef.current.forEach((m) => (m as L.Marker).remove())
            markersRef.current = []

            const kelasColors: Record<string, string> = {
                mikro: '#e65100',
                kecil: '#FFB81C',
                menengah: '#C8102E',
                besar: '#059669',
            }

            filtered.forEach((u) => {
                if (!u.latitude || !u.longitude) return

                const color = kelasColors[u.kelas_usaha] || '#e65100'

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
                <Group gap="xs">
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
                        placeholder="Filter Kelas"
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
                </Group>
            </Group>

            <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <LoadingOverlay visible={!mapReady} />
                <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
            </div>

            <Group mt="xs" gap="md">
                {[
                    { label: 'Mikro', color: '#e65100' },
                    { label: 'Kecil', color: '#FFB81C' },
                    { label: 'Menengah', color: '#C8102E' },
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
