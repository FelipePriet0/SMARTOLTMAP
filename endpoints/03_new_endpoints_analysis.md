# Análise de Novos Endpoints — 02_new_requests_raw.txt

HAR processado: `02_new_requests_raw.txt`
Entradas brutas no HAR: 205
Endpoints únicos extraídos (após limpeza e normalização): 13
Endpoints anteriores no mapeamento: 67

---

## SEÇÃO 1 — Endpoints novos (não estavam no mapeamento anterior)

2 endpoints identificados pela primeira vez:

```
GET  /reports/import
POST /api/onu/export_authorizations
```

---

## SEÇÃO 2 — Endpoints repetidos (já existiam no mapeamento)

11 endpoints confirmados novamente pelo novo HAR:

```
GET /api/export/list
GET /api/onu/fetch_distinct_onu_boards
GET /api/onu/fetch_distinct_onu_ports
GET /api/onu/fetch_zones
GET /api/system/fetch_users_for_reports
GET /api/system/get_local_olts
GET /onu/configured
GET /onu/get_configured_list
GET /reports/authorizations/list
GET /reports/export
GET /reports/get_authorizations_list
```

**Observação:** A concentração de repetições nos módulos `/reports/` e `/onu/` confirma que o HAR foi capturado em sessão navegando por Reports e ONUs Configuradas — o que é consistente com os títulos de página encontrados no HAR (`reports/authorizations/list`, `onu/configured`, `reports/export`).

---

## SEÇÃO 3 — Possíveis features novas reveladas por esses endpoints

### `GET /reports/import`

**Interpretação:** Tela ou endpoint de importação de dados dentro do módulo Reports.

Possíveis funcionalidades:
- Importar lista de autorizações via arquivo (CSV / Excel)
- Importar relatório externo para o sistema
- Importar histórico de autorizações de outro sistema

**Status:** Endpoint confirmado no HAR. Feature ainda não documentada no `02_menu_map.md`.

**Onde provavelmente aparece na UI:**
- Botão "Importar" ou "Import" na tela de Reports
- Possível CTA ao lado do botão "Exportar"

---

### `POST /api/onu/export_authorizations`

**Interpretação:** Ação de exportação específica do histórico de autorizações de ONUs.

Difere do `GET /reports/export` genérico — este endpoint é voltado exclusivamente para autorizações de ONU e usa método POST, sugerindo que o payload carrega filtros (período, OLT, usuário etc.) para gerar o arquivo.

Possíveis funcionalidades:
- Exportar lista filtrada de autorizações de ONU
- Gerar relatório CSV/Excel das ONUs autorizadas em determinado período
- Exportação com parâmetros selecionados pelo usuário via formulário

**Status:** Endpoint novo. Não estava no HAR anterior.

**Onde provavelmente aparece na UI:**
- Botão "Exportar" dentro da tela `reports/authorizations/list`
- Pode ser acionado por modal com filtros de período/OLT/usuário

---

## SEÇÃO 4 — Possíveis módulos novos ou CTAs da UI associados

### Módulo Reports — funcionalidades adicionais identificadas

Com os 2 novos endpoints, o módulo Reports passa a ter **7 endpoints confirmados** e agora revela uma estrutura mais completa:

| Ação | Endpoint | Status |
|---|---|---|
| Listar tasks | `GET /reports/tasks` | Anterior |
| Listar tasks (API) | `GET /reports/get_tasks_list` | Anterior |
| Listar autorizações | `GET /reports/authorizations/list` | Anterior (confirmado) |
| Listar autorizações (API) | `GET /reports/get_authorizations_list` | Anterior (confirmado) |
| Exportar (genérico) | `GET /reports/export` | Anterior (confirmado) |
| Listar exports | `GET /api/export/list` | Anterior (confirmado) |
| **Importar** | `GET /reports/import` | **NOVO** |
| **Exportar autorizações** | `POST /api/onu/export_authorizations` | **NOVO** |

### CTAs prováveis na UI de Reports

```
[ Importar ]   [ Exportar ]

Tabela de autorizações de ONU
  → Botão "Exportar autorizações" → POST /api/onu/export_authorizations
```

### Hipótese de fluxo de Import

```
1. Usuário acessa Reports
2. Clica em "Importar" → GET /reports/import
3. Tela de upload ou wizard de importação
4. Seleciona arquivo (CSV / Excel)
5. Confirma mapeamento de colunas
6. Sistema processa e registra autorizações importadas
```

**Precisa confirmar:** Não há POST de import no HAR — apenas o GET da tela. O endpoint de submit (`POST /reports/import` ou `POST /reports/import/store`) ainda não foi capturado.

---

## Resumo executivo

| Item | Quantidade |
|---|---|
| Endpoints no novo HAR | 13 |
| **Novos descobertos** | **2** |
| Repetidos / confirmados | 11 |
| Módulos impactados | 1 (Reports) |
| Features novas identificadas | 2 |
| CTAs novos na UI | 2 (Import, Export Authorizations) |

**Próximo passo recomendado:** Capturar HAR específico navegando pela tela `reports/import` e clicando no botão de exportação dentro de `reports/authorizations/list` para confirmar os endpoints de submit.
