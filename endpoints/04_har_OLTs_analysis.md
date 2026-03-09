# Análise de Endpoints — 03_har_OLTs.har

HAR processado: `03_har_OLTs.har`
Entries brutas: 352
Endpoints únicos extraídos (após limpeza e normalização): 16
Base consolidada anterior (smartolt_endpoints + 03_new_endpoints_analysis): 69

---

## SEÇÃO 1 — Endpoints novos (não estavam no mapeamento anterior)

14 endpoints identificados pela primeira vez:

```
GET /olt/add
GET /olt/backups/{id}
GET /olt/edit/{id}
GET /olt/get_boards/{id}
GET /olt/get_history/{id}
GET /olt/get_mgmt_ips/{id}
GET /olt/get_olt_hardware_software_info/{id}
GET /olt/get_olt_uptime_and_env_temperature/{id}
GET /olt/get_pon_ports/{id}
GET /olt/get_uplink_ports/{id}
GET /olt/get_vlans/{id}
GET /olt/olt_details/{id}/mgmt_ips
GET /olt/scan_olt_sn/{id}
GET /onu_mgmt_ips/add/{id}
```

---

## SEÇÃO 2 — Endpoints repetidos (já existiam no mapeamento)

2 endpoints confirmados:

```
GET /olt
GET /olt/olt_details/{id}/details
```

**Observação:** A sessão foi capturada diretamente dentro do módulo OLTs — navegação pelo detalhe de OLT e suas abas. Isso confirma que `/olt` e `/olt/olt_details/{id}/details` são chamados imediatamente ao entrar na tela, como esperado.

---

## SEÇÃO 3 — Possíveis features novas reveladas pelos endpoints

### `GET /olt/add`

**Interpretação:** Tela de cadastro de nova OLT.

Possíveis funcionalidades:
- Formulário de cadastro de OLT (IP, porta TCP/UDP, modelo, credenciais)
- Validação de conectividade antes de salvar
- Seleção de fabricante / firmware

**Status:** Confirmado no HAR. Feature de criação de OLT não estava documentada.

**CTA provável na UI:** Botão `[+ Adicionar OLT]` na tela de lista de OLTs.

---

### `GET /olt/edit/{id}`

**Interpretação:** Tela de edição de uma OLT existente.

Possíveis funcionalidades:
- Editar nome, IP, porta, credenciais e configurações da OLT
- Alterar modelo/firmware

**Status:** Confirmado. Complementa o fluxo CRUD do módulo OLTs.

**CTA provável na UI:** Botão `[Editar]` na linha da OLT ou na tela de detalhe.

---

### `GET /olt/get_boards/{id}`

**Interpretação:** Retorna os boards (placas/slots) da OLT.

Possíveis funcionalidades:
- Listar boards físicos instalados na OLT
- Base para filtros de board em telas de ONU
- Popula o dropdown de Board nos filtros de ONUs Configuradas

**Status:** Confirmado. Expande o entendimento do módulo de hardware da OLT.

**Relacionado:** `GET /api/onu/fetch_distinct_onu_boards` — ambos tratam de boards, mas em contextos diferentes (OLT vs ONU).

---

### `GET /olt/get_history/{id}`

**Interpretação:** Histórico de eventos ou alterações da OLT.

Possíveis funcionalidades:
- Log de eventos da OLT (conexões, falhas, atualizações)
- Histórico de comandos executados
- Linha do tempo de mudanças de configuração

**Status:** Confirmado. Feature de auditoria/histórico da OLT não estava documentada.

**CTA provável na UI:** Aba `[Histórico]` ou `[Events]` dentro do detalhe da OLT.

---

### `GET /olt/get_mgmt_ips/{id}` e `GET /olt/olt_details/{id}/mgmt_ips`

**Interpretação:** Retorna os IPs de gerenciamento configurados para a OLT.

Dois endpoints para o mesmo recurso — provavelmente:
- `/olt/get_mgmt_ips/{id}` → endpoint de API usado por formulários/dropdowns
- `/olt/olt_details/{id}/mgmt_ips` → rota de aba/tela dentro do detalhe da OLT

Possíveis funcionalidades:
- Listar IPs de gerenciamento (OLT pode ter múltiplos)
- Gerenciar faixas de IP de gerenciamento das ONUs associadas à OLT

**Status:** Confirmado. Módulo novo: `onu_mgmt_ips`.

---

### `GET /onu_mgmt_ips/add/{id}`

**Interpretação:** Tela ou formulário para adicionar um IP de gerenciamento a uma ONU, referenciada pelo contexto da OLT (`{id}` = ID da OLT ou da ONU).

Possíveis funcionalidades:
- Atribuir IP de gerenciamento a uma ONU
- Configurar gerenciamento IP estático ou DHCP

**Status:** Confirmado. Módulo `onu_mgmt_ips` aparece pela primeira vez.

**Precisa confirmar:** Se `{id}` refere-se ao ID da ONU ou da OLT neste contexto.

---

### `GET /olt/get_olt_hardware_software_info/{id}`

**Interpretação:** Retorna informações de hardware e firmware da OLT.

Possíveis funcionalidades:
- Modelo de hardware
- Versão de software/firmware
- Número de série
- Capacidade de slots/boards

**Status:** Confirmado. Expande a aba de detalhes da OLT.

---

### `GET /olt/get_olt_uptime_and_env_temperature/{id}`

**Interpretação:** Versão sem o sufixo `/for_dashboard` do endpoint já conhecido.

Já existia: `GET /olt/get_olt_uptime_and_env_temperature_for_dashboard/{id}`

Este novo endpoint sugere que:
- há uma versão completa (para a tela de detalhe da OLT)
- há uma versão resumida `_for_dashboard` (para o card no Dashboard)

**Status:** Confirmado. Dois endpoints para uptime/temperatura — contextos diferentes.

---

### `GET /olt/get_pon_ports/{id}`

**Interpretação:** Lista as portas PON da OLT com mais detalhes do que o endpoint já mapeado.

Já existia: `GET /olt/get_pon_list/{id}`

Diferença provável:
- `get_pon_list` → listagem resumida (IDs, status)
- `get_pon_ports` → listagem completa com tipo, estado, contagem de ONUs, erros

**Status:** Confirmado. Complementa o módulo de portas PON.

---

### `GET /olt/get_uplink_ports/{id}`

**Interpretação:** Lista as portas de uplink da OLT.

Possíveis funcionalidades:
- Listar interfaces de uplink (GE, 10GE, etc.)
- Exibir status de cada uplink
- Base para os gráficos do módulo Uplink

**Status:** Confirmado. Módulo de uplinks agora tem endpoint de listagem.

**Relacionado:** `GET /uplink/get_daily_for_uplink_errors/{id}/small` e `GET /uplink/get_daily_for_uplink_oct/{id}/small` (já mapeados).

---

### `GET /olt/get_vlans/{id}`

**Interpretação:** Retorna as VLANs configuradas na OLT.

Possíveis funcionalidades:
- Listar VLANs provisionadas na OLT
- Base para dropdowns de VLAN em formulários de autorização e edição de ONU
- Gerenciamento de VLANs por OLT

**Status:** Confirmado. Expande significativamente o entendimento do gerenciamento de VLANs.

**Relacionado:** `GET /api/onu/fetch_vlans_for_extra/{id}` e `GET /api/onu/fetch_vlans_mgmt/{id}` (já mapeados — buscam VLANs para formulários de ONU, não para a OLT diretamente).

---

### `GET /olt/backups/{id}`

**Interpretação:** Gerenciamento de backups de configuração da OLT.

Possíveis funcionalidades:
- Listar backups de configuração disponíveis
- Restaurar configuração de um backup
- Gerar novo backup manual

**Status:** Confirmado. Módulo de backup não estava documentado em nenhum mapeamento anterior.

**CTA provável na UI:** Aba `[Backups]` dentro do detalhe da OLT.

---

### `GET /olt/scan_olt_sn/{id}`

**Interpretação:** Varredura da OLT para detectar Serial Numbers (SN) de ONUs conectadas.

Possíveis funcionalidades:
- Iniciar scan ativo da OLT para descobrir novas ONUs
- Atualizar lista de ONUs não configuradas
- Disparar detecção de equipamentos recém-conectados

**Status:** Confirmado. Feature de descoberta ativa de ONUs.

**CTA provável na UI:** Botão `[Scan]` ou `[Varrer OLT]` dentro do detalhe da OLT ou na tela de ONUs Não Configuradas.

**Importante:** Este endpoint sugere que o processo de descoberta de ONUs pode ser acionado manualmente pelo usuário diretamente da OLT, não apenas automaticamente.

---

## SEÇÃO 4 — Módulos novos e CTAs da UI associados

### Módulo OLT — estrutura completa revelada

Com este HAR o módulo OLT passou de **5 endpoints** para **17 endpoints confirmados**:

| Endpoint | Função | Status |
|---|---|---|
| `GET /olt` | Página da lista de OLTs | Anterior |
| `GET /olt/listing` | API de listagem | Anterior |
| `GET /olt/add` | Tela de cadastro | **NOVO** |
| `GET /olt/edit/{id}` | Tela de edição | **NOVO** |
| `GET /olt/olt_details/{id}/details` | Aba: detalhes gerais | Anterior |
| `GET /olt/olt_details/{id}/mgmt_ips` | Aba: IPs de gerenciamento | **NOVO** |
| `GET /olt/get_boards/{id}` | Boards/slots da OLT | **NOVO** |
| `GET /olt/get_pon_list/{id}` | Lista PON resumida | Anterior |
| `GET /olt/get_pon_ports/{id}` | Lista PON completa | **NOVO** |
| `GET /olt/get_uplink_ports/{id}` | Portas de uplink | **NOVO** |
| `GET /olt/get_vlans/{id}` | VLANs da OLT | **NOVO** |
| `GET /olt/get_mgmt_ips/{id}` | IPs de gerenciamento | **NOVO** |
| `GET /olt/get_history/{id}` | Histórico de eventos | **NOVO** |
| `GET /olt/backups/{id}` | Backups de configuração | **NOVO** |
| `GET /olt/scan_olt_sn/{id}` | Scan de SNs na OLT | **NOVO** |
| `GET /olt/get_olt_hardware_software_info/{id}` | Info de HW/SW | **NOVO** |
| `GET /olt/get_olt_uptime_and_env_temperature/{id}` | Uptime/temperatura (detalhe) | **NOVO** |

---

### Módulo novo: `onu_mgmt_ips`

Aparece pela primeira vez:

```
GET /onu_mgmt_ips/add/{id}
```

**Interpretação:** Módulo para gerenciar IPs de gerenciamento associados às ONUs, vinculado ao contexto de configuração da OLT.

**Endpoints prováveis ainda não capturados:**
```
GET  /onu_mgmt_ips/listing         — precisa confirmar
POST /onu_mgmt_ips/store           — precisa confirmar
POST /onu_mgmt_ips/delete/{id}     — precisa confirmar
```

---

### Estrutura de abas revelada para o Detalhe da OLT

Com base nos endpoints capturados, a tela de detalhe da OLT (`/olt/olt_details/{id}`) possui as seguintes abas prováveis:

```
[ Detalhes ]      → /olt/olt_details/{id}/details
                     /olt/get_olt_hardware_software_info/{id}
                     /olt/get_olt_uptime_and_env_temperature/{id}

[ Boards ]        → /olt/get_boards/{id}

[ Portas PON ]    → /olt/get_pon_ports/{id}

[ Uplinks ]       → /olt/get_uplink_ports/{id}

[ VLANs ]         → /olt/get_vlans/{id}

[ IPs de Gerência ] → /olt/olt_details/{id}/mgmt_ips
                      /olt/get_mgmt_ips/{id}

[ Backups ]       → /olt/backups/{id}

[ Histórico ]     → /olt/get_history/{id}
```

---

### CTAs identificados na tela de lista de OLTs

```
[ + Adicionar OLT ]   → GET /olt/add
[ Editar ]            → GET /olt/edit/{id}
[ Visualizar ]        → GET /olt/olt_details/{id}/details
```

### CTAs identificados dentro do detalhe da OLT

```
[ Scan / Varrer OLT ] → GET /olt/scan_olt_sn/{id}
[ Adicionar IP Gerência ] → GET /onu_mgmt_ips/add/{id}
[ Backup ] ou [ Gerar backup ] → GET /olt/backups/{id}
```

---

## Resumo executivo

| Item | Quantidade |
|---|---|
| Endpoints no novo HAR | 16 |
| **Novos descobertos** | **14** |
| Repetidos / confirmados | 2 |
| Módulos impactados | 2 (OLT, onu_mgmt_ips) |
| Abas novas identificadas na tela de detalhe da OLT | ~7 |
| CTAs novos na UI | 6 |

**Próximo passo recomendado:** Capturar HAR navegando pelas ações de edição (`/olt/edit/{id}`), adição de IP de gerência (`/onu_mgmt_ips/add/{id}`) e geração de backup para confirmar os endpoints de submit (POST).
