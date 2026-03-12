'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Crosshair, Loader } from 'lucide-react'

interface GeotagMapProps {
  latitude: number | null
  longitude: number | null
  onChange: (lat: number, lng: number) => void
}

export default function GeotagMap({ latitude, longitude, onChange }: GeotagMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markerRef = useRef<unknown>(null)
  const [gettingLocation, setGettingLocation] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [error, setError] = useState('')

  // Default center: Tabanan, Bali
  const defaultLat = -8.5378
  const defaultLng = 115.1357

  useEffect(() => {
    let isMounted = true

    const initMap = async () => {
      if (!mapRef.current) return

      try {
        const L = (await import('leaflet')).default
        // @ts-ignore - CSS import for leaflet
        await import('leaflet/dist/leaflet.css')

        if (!isMounted) return

        const container = mapRef.current as HTMLDivElement & { _leaflet_id?: number }

        // Clean up any leftover Leaflet container state (React Strict Mode fix)
        if (container._leaflet_id) {
          container.innerHTML = ''
          delete container._leaflet_id
          container.className = container.className.replace(/\s?leaflet-container.*/, '')
        }

        // Remove previous map instance if it exists
        if (mapInstanceRef.current) {
          try { (mapInstanceRef.current as any).remove() } catch (_) { /* ignore */ }
          mapInstanceRef.current = null
        }

        // Fix default icon
        delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        const initLat = latitude || defaultLat
        const initLng = longitude || defaultLng

        const map = L.map(container, { zoomControl: true }).setView([initLat, initLng], latitude ? 16 : 12)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        // Custom icon
        const customIcon = L.divIcon({
          className: '',
          html: `<div style="
            width: 32px; height: 32px;
            background: #003087;
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 12px rgba(0,48,135,0.4);
          "></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })

        if (latitude && longitude) {
          const marker = L.marker([latitude, longitude], { draggable: true, icon: customIcon }).addTo(map)
          marker.on('dragend', (e: any) => {
            const pos = e.target.getLatLng()
            onChange(pos.lat, pos.lng)
          })
          markerRef.current = marker
        }

        map.on('click', (e: any) => {
          const { lat, lng } = e.latlng

          if (markerRef.current) {
            (markerRef.current as any).setLatLng([lat, lng])
          } else {
            const marker = L.marker([lat, lng], { draggable: true, icon: customIcon }).addTo(map)
            marker.on('dragend', (ev: any) => {
              const pos = ev.target.getLatLng()
              onChange(pos.lat, pos.lng)
            })
            markerRef.current = marker
          }
          onChange(lat, lng)
        })

        mapInstanceRef.current = map

        // Force proper sizing after initialization (important for maps inside Drawers)
        setTimeout(() => {
          if (isMounted && map) {
            map.invalidateSize()
          }
        }, 300)

        if (isMounted) setMapReady(true)
      } catch (err) {
        console.error('Map init error:', err)
        if (isMounted) setError('Gagal memuat peta')
      }
    }

    const timer = setTimeout(initMap, 50)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (mapInstanceRef.current) {
        try { (mapInstanceRef.current as any).remove() } catch (_) { /* ignore */ }
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let isMounted = true

    const updateMarker = async () => {
      if (!mapInstanceRef.current || !latitude || !longitude) return

      try {
        const L = (await import('leaflet')).default
        if (!isMounted) return

        const map = mapInstanceRef.current as any

        if (markerRef.current) {
          (markerRef.current as any).setLatLng([latitude, longitude])
        } else {
          const customIcon = L.divIcon({
            className: '',
            html: `<div style="width:32px;height:32px;background:#003087;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 12px rgba(0,48,135,0.4)"></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })

          const marker = L.marker([latitude, longitude], { draggable: true, icon: customIcon }).addTo(map)
          marker.on('dragend', (e: any) => {
            const pos = e.target.getLatLng()
            onChange(pos.lat, pos.lng)
          })
          markerRef.current = marker
        }

        map.setView([latitude, longitude], 16)
      } catch (err) {
        console.error('Error updating marker:', err)
      }
    }

    updateMarker()
    return () => { isMounted = false }
  }, [latitude, longitude])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Browser tidak mendukung geolocation')
      return
    }
    setGettingLocation(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        onChange(lat, lng)
        setGettingLocation(false)
      },
      () => {
        setError('Tidak dapat mengambil lokasi. Pastikan GPS aktif.')
        setGettingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={gettingLocation}
          className="btn-primary text-sm py-2"
        >
          {gettingLocation ? <Loader size={15} className="animate-spin" /> : <Crosshair size={15} />}
          {gettingLocation ? 'Mendapatkan Lokasi...' : 'Ambil Lokasi Saat Ini'}
        </button>
        {latitude && longitude && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium">
            <MapPin size={12} />
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </span>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}

      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {!mapReady && (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-[#003087]/20 border-t-[#003087] rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Memuat Peta...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} style={{ height: '300px', width: '100%' }} />
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur text-xs text-gray-600 px-2 py-1 rounded-lg shadow border border-gray-200 z-10">
          Klik pada peta atau geser marker untuk mengatur lokasi
        </div>
      </div>
    </div>
  )
}
