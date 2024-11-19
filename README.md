# InovaNgxsSelectorExample

Dieses Projekt soll die Fallstricke aufzeigen,
die bei der Verwendung von Selektoren des ngxs Stores in Zusammenhang mit Objektreferenzen auftreten können.

Ziel ist es, anhand eines Beispiel-States (`demo.state.ts`) einfach erkennen zu können, dass die ngxs-Selektoren keine Klone des States zurückgeben,
sondern eine Referenz auf den State selbst (oder einen Slice davon).

Unter http://localhost:4200/ngxs-problem können die Problematiken simuliert werden.
Am besten werden hier die Kommentare im Code (`ngxs-problem.component.ts`) beachtet und mit Breakpoints und der Browser-Konsole gearbeitet.

Ein Lösungsvorschlag kann unter http://localhost:4200/ngxs-solution (`ngxs-solution.component.ts`) gefunden werden.
