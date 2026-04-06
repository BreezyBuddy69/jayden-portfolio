# Jayden Portfolio Chatbot — n8n Setup

## Was du brauchst
- n8n (self-hosted oder n8n.cloud)
- OpenRouter API Key (kostenlos unter openrouter.ai — Qwen3 235B ist free)
- Google Account (für Google Sheets)

---

## Schritt 1: Knowledge Base Sheet

Das Sheet wird automatisch erstellt (oder manuell):
- Erstelle ein neues Google Sheet: "Jayden Portfolio – Knowledge Base"
- Kopiere den Inhalt aus `knowledge-base-data.csv` hinein
- Notiere dir die **Sheet ID** (aus der URL: `docs.google.com/spreadsheets/d/[SHEET_ID]/edit`)

---

## Schritt 2: n8n Credentials einrichten

### OpenRouter (Qwen3 — kostenlos)
1. Gehe zu https://openrouter.ai → Account → API Keys → neuen Key erstellen
2. n8n → Credentials → New → Typ: **"OpenAI API"** (nicht "OpenAI" Chat — wähle die mit "API Key + Base URL")
3. Fülle aus:
   - **API Key**: dein OpenRouter Key (beginnt mit `sk-or-...`)
   - **Base URL**: `https://openrouter.ai/api/v1`
4. Name: "OpenRouter API"

Das Modell ist bereits im Workflow eingestellt: `qwen/qwen3-235b-a22b:free`

### Google Sheets
1. n8n → Credentials → New → "Google Sheets OAuth2"
2. Mit demselben Google Account einloggen wie das Sheet
3. Name: "Google Sheets"

---

## Schritt 3: Sub-Workflow importieren (Knowledge Tool)

1. n8n → Workflows → Import from File
2. Datei: `jayden-knowledge-tool.json`
3. Nach dem Import:
   - Öffne den "Read Knowledge Base" Node
   - Ersetze die Credential mit deiner "Google Sheets" Credential
   - Ersetze die Sheet ID mit deiner echten Sheet ID
4. **Workflow aktivieren** (Toggle oben rechts)
5. Notiere dir die **Workflow ID** (aus der URL)

---

## Schritt 4: Haupt-Workflow importieren

1. n8n → Workflows → Import from File
2. Datei: `jayden-chatbot-main.json`
3. Nach dem Import folgende Nodes bearbeiten:

### "Qwen3 via OpenRouter (Brain)" Node
- Credential: wähle deine "OpenRouter API" Credential (die du in Schritt 2 angelegt hast)

### "Get Jayden Knowledge (Tool)" Node
- Öffnen → "Workflow" Feld → ersetze die ID mit der ID aus Schritt 3

### "Window Memory" Node
- Passt so — keine Änderung nötig

4. **Workflow aktivieren**
5. Kopiere den **Webhook URL** (erscheint beim Aktivieren oder im Webhook Node)
   - Format: `https://deine-n8n-domain.com/webhook/jayden-portfolio-chat`

---

## Schritt 5: Portfolio Website verbinden

In der Datei `portfolio/src/components/chat/ChatBot.tsx`, Zeile 10:

```typescript
// Ersetze das:
const CHATBOT_URL = 'https://n8n.PLACEHOLDER/webhook/jayden-portfolio-chat'

// Mit deiner echten URL:
const CHATBOT_URL = 'https://DEINE-N8N-URL/webhook/jayden-portfolio-chat'
```

Danach: `npm run build` im portfolio-Ordner.

---

## Wie der Agent funktioniert

```
User fragt etwas
       ↓
Webhook empfängt POST Request
       ↓
Prepare Input (extrahiert Nachricht + Session ID)
       ↓
AI Agent (Claude Gehirn + Window Memory)
       ↓
    [Entscheidet ob Tool nötig]
       ↓
  Get_Jayden_Knowledge Tool
  → Liest Google Sheet
  → Gibt relevante Info zurück
       ↓
Claude formuliert Antwort
       ↓
Respond to Webhook → zurück zur Website
```

## Knowledge Base erweitern

Einfach neue Zeilen ins Google Sheet hinzufügen:
- **Category**: Kategorie (z.B. "Projects", "Skills", "FAQ")
- **Topic**: Spezifisches Thema
- **Content**: Die eigentliche Information

Der Agent liest automatisch alle Rows beim nächsten Query.
