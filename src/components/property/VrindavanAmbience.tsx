'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

const TRACK_LABELS: Record<string, string> = {
  'flute.mp3': 'Flute',
  'krishna.mp3': 'Krishna',
  'sitar.mp3': 'Sitar',
}

function trackLabel(src: string, index: number) {
  const file = src.split('/').pop()?.toLowerCase() || ''
  return TRACK_LABELS[file] || `Tone ${index + 1}`
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function VrindavanAmbience({ tracks }: { tracks: string[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wantPlayRef = useRef(true)
  const volumeRef = useRef(0.35)
  const mutedRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.35)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  volumeRef.current = volume
  mutedRef.current = muted

  const label = useMemo(() => trackLabel(tracks[index] || '', index), [tracks, index])
  const src = tracks[index] || ''

  const tryPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !wantPlayRef.current) return
    audio.volume = volumeRef.current
    audio.muted = mutedRef.current
    const start = audio.play()
    if (start) {
      void start.then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }, [])

  useLayoutEffect(() => {
    tryPlay()
  }, [src, tryPlay])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
      audio.muted = muted
    }
  }, [volume, muted])

  const goTo = (nextIndex: number) => {
    if (!tracks.length) return
    setCurrentTime(0)
    setIndex((nextIndex + tracks.length) % tracks.length)
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing && !audio.paused) {
      wantPlayRef.current = false
      audio.pause()
      setPlaying(false)
      return
    }
    wantPlayRef.current = true
    tryPlay()
  }

  const onTime = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime || 0)
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
  }

  if (!tracks.length) return null

  return (
    <div className="sticky top-[4.5rem] z-40 mb-5 sm:top-24">
      <div className="rounded-2xl border border-border bg-white/95 p-3 shadow-card backdrop-blur sm:p-4">
        <audio
          ref={audioRef}
          src={src}
          autoPlay
          playsInline
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => {
            if (!wantPlayRef.current) setPlaying(false)
          }}
          onEnded={() => goTo(index + 1)}
          onTimeUpdate={onTime}
          onLoadedMetadata={onTime}
          onCanPlay={tryPlay}
          onLoadedData={tryPlay}
        />

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="min-w-0 flex-1 basis-40">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              Vrindavan ambience
            </p>
            <p className="truncate text-sm font-semibold text-text-primary">
              {label}
              <span className="ml-1.5 font-normal text-text-secondary">
                {index + 1}/{tracks.length}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="rounded-full p-2 text-text-primary hover:bg-brand-light"
              aria-label="Previous track"
            >
              <SkipBack size={18} />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white shadow-sm"
              aria-label={playing ? 'Pause ambience' : 'Play ambience'}
            >
              {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="rounded-full p-2 text-text-primary hover:bg-brand-light"
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>
          </div>

          <div className="flex min-w-0 flex-[1_1_100%] items-center gap-2 sm:flex-1">
            <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-text-muted">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => {
                const audio = audioRef.current
                const next = Number(e.target.value)
                if (audio) audio.currentTime = next
                setCurrentTime(next)
              }}
              className="h-1.5 w-full accent-brand-primary"
              aria-label="Seek"
            />
            <span className="w-8 shrink-0 text-[11px] tabular-nums text-text-muted">
              {formatTime(duration)}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="rounded-full p-2 text-text-primary hover:bg-brand-light"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => {
                const next = Number(e.target.value)
                setVolume(next)
                setMuted(next === 0)
              }}
              className="h-1.5 w-20 accent-brand-primary sm:w-24"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
