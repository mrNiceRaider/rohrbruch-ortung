# Rohrbruch-Ortung 🔊

Akustische Leckortung und Signalanalyse für Wasserleitungen – native Windows 11 Desktop-App.

## Features

- **WAV / MP3 / OGG / M4A laden** – nativer Windows-Dateidialog
- **Butterworth-Bandpass** (Ordnung 2–8, frei konfigurierbar)
- **Presets**: 20–500 Hz · 50–800 Hz · 100–2000 Hz · 200–5000 Hz · 500–10000 Hz
- **DC-Offset-Entfernung** und **Normalisierung** auf −0,5 dBFS
- **FFT-Spektrum** (logarithmische Frequenzachse, dBFS) – Original vs. Gefiltert
- **Spektrogramm** (Zeit × Frequenz) mit 4 Farbpaletten: Inferno, Viridis, Plasma, Turbo
- **Optimierte WAV exportieren** – nativer Speichern-Dialog

## Installation

1. ZIP aus [Releases](../../releases) herunterladen
2. Entpacken
3. `Rohrbruch-Ortung.exe` starten – **kein Installer, kein Python, kein Browser nötig**

> Falls Windows SmartScreen warnt: „Weitere Informationen" → „Trotzdem ausführen" (App ist nicht code-signiert)

## Technologie

- **Electron 31** (Chromium + Node.js, alles embedded)
- **Eigene DSP-Engine** in Vanilla JS:
  - Cooley-Tukey Radix-2 FFT
  - Biquad-kaskadierter Butterworth-Filter
- **Electron IPC** mit Preload-Script (Context Isolation)
- Build: `@electron/packager` → portable Win64

## Feldeinsatz

1. Akustische Aufnahme am Hydranten (z. B. mit dediziertem Rekorder)
2. WAV-Datei in die App laden
3. Bandpass-Preset wählen (z. B. 50–800 Hz für typische Leckgeräusche)
4. Verarbeiten → Spektrum und Spektrogramm analysieren
5. Optimierte WAV exportieren

## Build selbst kompilieren

```bash
npm install
npx @electron/packager . "Rohrbruch-Ortung" --platform=win32 --arch=x64 --icon=src/icon.ico --out=dist --overwrite --asar
```

## Lizenz

MIT

