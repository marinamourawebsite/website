# GUIA — Como rodar o experimento multi-agente

Este zip já está na estrutura final do repositório. Nada precisa ser movido.

```
CLAUDE.md                    # regras do repo + orquestração
SPEC.md                      # especificação da página
PLAN.md                      # protocolo planner → executor → reviewer
GUIA.md                      # este arquivo (pode deletar depois)
.claude/agents/executor.md   # subagent Opus (implementa)
.claude/agents/reviewer.md   # subagent Opus read-only (audita)
public/admin/config.yml      # Sveltia CMS
design/reference.png         # imagem de referência (a arte da Marina)
docs/phases/                 # aqui nascem briefs, reports e reviews
```

## Passo a passo

### 1. Preparar o repo (na VM Oracle)
```bash
mkdir marina-moura && cd marina-moura
unzip ~/marina-kit-completo.zip -d .
git init && git add -A && git commit -m "chore: multi-agent kit"
```
Confira se `.claude/agents/` veio no unzip (`ls -la .claude/agents/` — é pasta oculta).

### 2. Abrir o Claude Code
```bash
claude
```
- Rode `/model` e escolha o modelo mais forte disponível no seu plano para a sessão principal (o Planner). Os subagents já estão fixados em Opus via frontmatter — não dependem dessa escolha.
- Opcional: rode `/agents` para confirmar que `executor` e `reviewer` aparecem na Library.

### 3. Disparar a orquestração
Primeiro prompt (cole exatamente):

> You are the Planner. Read CLAUDE.md and PLAN.md, then start the orchestration loop from Phase 0. Do not write any application code yourself — briefs, dispatch, and gating only.

### 4. Durante a execução — o que observar (não intervir)
Deixe o loop rodar. Seu papel é observar:
- O brief da fase ficou completo, ou o executor teve que adivinhar?
- O report do executor confessa desvios, ou o reviewer pegou coisas não declaradas?
- O reviewer aprovou algo que viola o CLAUDE.md (string hardcoded, hex cru)?
- O planner respeitou o limite de 2 rodadas de fix, ou entrou em loop?

Só intervenha se: (a) o planner escalar para você, ou (b) travar de verdade.

### 5. Ao final — colher os dados do experimento
```bash
cat docs/phases/LOG.md
ls docs/phases/
```
Leia na ordem brief → report → review de cada fase. Os "vazamentos" do protocolo
(brief vago, review superficial, escopo extrapolado) são o aprendizado que você
leva para projetos maiores (MVPW, AthleteBiz).

### 6. Validar o site
```bash
npm install && npm run dev
```
Compare com `design/reference.png` em 390px e 1280px. Rode Lighthouse mobile.

### 7. Passos manuais (fora do Claude Code)
1. Criar repo no GitHub, push, conectar ao Cloudflare Pages
   (build: `npm run build` · output: `dist/`).
2. Deploy do Worker `sveltia-cms-auth` (github.com/sveltia/sveltia-cms-auth) —
   botão "Deploy to Cloudflare" no README.
3. Registrar OAuth App no GitHub (callback = URL do Worker) e setar no Worker:
   `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_DOMAINS`.
4. Preencher os TODOs em `public/admin/config.yml`: `repo`, `base_url`, `site_url`.
5. Testar login em `https://SEU-DOMINIO/admin` e trocar os assets placeholder
   pelos reais da Marina via CMS.

## TODOs espalhados no kit (buscar por "TODO")
- Número do WhatsApp (`wa.me/55...`) — SPEC §4
- URLs reais das redes sociais
- `repo`, `base_url`, `site_url` no config.yml

## Se algo der errado
- Subagents não aparecem em `/agents` → confira se `.claude/agents/*.md` está na
  raiz do repo e reinicie a sessão.
- Executor ignorando regras → o contexto dele é isolado: a regra precisa estar
  no CLAUDE.md, no SPEC ou no brief. Conversa não conta.
- Loop de fix infinito → o protocolo limita a 2 rodadas; se o planner não
  respeitar, interrompa e anote no LOG.md (isso também é dado do experimento).
