# Menu Map — SmartOLT-like

Documento de mapeamento da interface do sistema com foco em:
- menus
- telas
- features
- comportamento da UI
- endpoints associados

Importante:
Este arquivo contém apenas elementos que possuem interface visível para o usuário final (UI), mesmo quando determinados endpoints ainda sejam apenas prováveis ou complementares ao fluxo.

---

## 1) Dashboard

## Menu: Dashboard
### Tela: Dashboard de Status da Rede GPON

Tela principal de monitoramento da rede GPON.

Apresenta indicadores operacionais da rede, status das ONUs, falhas de infraestrutura e métricas de crescimento da rede.

Todo o dashboard pode ser filtrado por OLT selecionada.

---

### Feature: Indicadores principais da rede (Cards)

Cards exibindo indicadores operacionais da rede.

---

#### Card: Aguardando autorização

**Descrição:**  
Quantidade de ONUs detectadas na rede que ainda não foram autorizadas no sistema.

**Informações adicionais exibidas:**
- D → ONUs deletadas
- Resync → ONUs em processo de ressincronização
- New → novas ONUs detectadas

**Comportamento:**
Ao clicar no card:
- abre página **ONUs Configuradas**
- filtro aplicado: **ONUs aguardando autorização**

**Endpoint:**
GET /dashboard/get_waiting_auth

---

#### Card: ONUs Online

**Descrição:**  
Total de ONUs atualmente conectadas e operando normalmente na rede.

**Informação adicional exibida:**
- Total autorizado → quantidade total de ONUs provisionadas no sistema

**Comportamento:**
Ao clicar no card:
- abre página **ONUs Configuradas**

Se houver OLT selecionada:
- abre com **filtro da OLT aplicado**

Se estiver selecionado **Todos**:
- abre página sem filtro

**Endpoint:**
GET /dashboard/get_onus_stats

---

#### Card: Totalmente offline

**Descrição:**  
Quantidade de ONUs sem comunicação com a OLT.

**Estados exibidos:**
- PwrFail → falha de energia
- LoS → perda de sinal óptico
- N/A → estado desconhecido

**Comportamento:**
Ao clicar no card abre **ONUs Configuradas** com filtros em:

**Status:**
- ONUs com falha de energia
- ONUs com perda de sinal
- ONUs offline

**Endpoint:**
GET /dashboard/get_onus_stats

---

#### Card: Sinal fraco

**Descrição:**  
Quantidade de ONUs com sinal óptico degradado.

**Informações exibidas:**
- Warning → sinal degradado
- Critical → sinal crítico

**Comportamento:**
Ao clicar no card abre **ONUs Configuradas** com filtros em:

**Signal:**
- warning
- critical

**Endpoint:**
GET /dashboard/get_onus_signals

---

### Feature: Gráfico de estado da rede

Gráfico temporal exibindo o estado operacional da rede GPON.

**Métricas exibidas:**
- Online ONUs
- Power Fail
- Signal Loss
- N/A
- Maximum

Permite visualizar oscilações da rede ao longo do tempo.

**Endpoint:**
GET /graphs_olt/get_daily_onus_statuses/dashboard

---

#### Intervalos disponíveis

O gráfico pode ser exibido em diferentes escalas temporais:

- Hourly network status
- Daily network status
- Weekly network status
- Monthly network status
- Yearly network status

---

#### Input: More Graphs

Popover que permite selecionar o intervalo temporal.

**Opções:**
- Hourly graph
- Daily graph
- Weekly graph
- Monthly graph
- Yearly graph

**Comportamento:**
Ao selecionar uma opção o gráfico é atualizado dinamicamente.

---

### Feature: Lista de OLTs

Painel lateral exibindo todas as OLTs monitoradas.

**Para cada OLT são exibidos:**
- Nome da OLT
- Tempo desde o último evento
- Temperatura da OLT

**Endpoint provável:**
GET /olt/listing

---

#### Popover de seleção de OLT

Permite filtrar o dashboard por OLT específica.

**Input:**
- Procurar (busca por nome da OLT)

**Opções:**
- Todos
- Lista de OLTs cadastradas

Cada OLT exibe:
- Nome
- quantidade de ONUs associadas

**Comportamento:**
Ao selecionar uma OLT todo o dashboard é atualizado automaticamente.

**Impacta:**
- métricas de ONUs
- gráficos de rede
- eventos
- indicadores

---

### Feature: Gráfico de autorizações de ONU

Gráfico de barras exibindo a quantidade de ONUs autorizadas por dia.

Permite acompanhar:
- volume de ativações
- ritmo de provisionamento da rede

**Endpoint:**
GET /dashboard/get_onus_auth_per_day

---

### Feature: Falhas em portas PON

Tabela exibindo eventos de falha detectados em portas PON.

**Informações exibidas:**
- Nome da OLT
- Placa / Porta
- ONUs impactadas
- LOS
- Poder óptico
- Possível causa
- Tempo desde o evento

**Endpoint:**
GET /dashboard/get_outage_pons

---

### Endpoints identificados para o módulo Dashboard

GET /dashboard/get_onus_stats  
GET /dashboard/get_onus_signals  
GET /dashboard/get_outage_pons  
GET /dashboard/get_waiting_auth  
GET /dashboard/get_onus_auth_per_day  
GET /graphs_olt/get_daily_onus_statuses/dashboard

---

### Objetivo do módulo

Fornecer uma visão operacional em tempo real da rede GPON permitindo:
- monitoramento da saúde da rede
- identificação rápida de falhas
- acompanhamento do crescimento da base de ONUs
- análise de eventos de rede
- acompanhamento de provisionamento

---

## 2) ONUs

## Menu: ONUs

Conjunto principal de telas para listagem, monitoramento, autorização e gerenciamento de ONUs.

---

### Tela: ONUs Configuradas (Configurado)

Tela responsável por listar todas as ONUs já provisionadas e autorizadas na rede GPON, permitindo filtros operacionais, visualização de status e acesso ao detalhe da ONU.

---

#### Feature: Listagem de ONUs configuradas

**Descrição:**  
Exibe todas as ONUs provisionadas no sistema com informações operacionais e técnicas.

Cada linha representa uma ONU cadastrada na rede.

**Informações exibidas:**
- Status operacional da ONU
- Botão Visualizar
- Nome do cliente/local
- SN / MAC
- Identificação GPON
  - OLT
  - Board
  - Porta PON
  - ID da ONU
- Zona
- ODB (divisor óptico)
- Sinal óptico
- Modo de operação (Bridge / Router)
- VLAN
- Serviços habilitados (VoIP / CATV)
- Tipo de ONU
- Data de autenticação

**Endpoints:**
GET /onu/configured  
GET /onu/get_configured_list

---

#### Feature: Visualizar detalhes da ONU

**Descrição:**  
Abre a tela de gerenciamento da ONU selecionada.

**Endpoint:**
GET /onu/view/{id}

---

#### Feature: Consulta de status e sinal da ONU

**Descrição:**  
Busca informações atualizadas de estado operacional e potência óptica.

**Endpoint:**
GET /api/onu/get_onu_status_and_signal/{id}

---

#### Feature: Filtros da listagem

A tela permite múltiplos filtros para localizar ONUs específicas.

##### Filtro: Search
Busca textual por:
- SN
- IP
- Nome
- Endereço
- outras informações relacionadas à ONU

##### Filtro: OLT
Filtra ONUs conectadas a uma OLT específica.

**Endpoint provável:**
POST /api/onu/fetch_distinct_options/olt_id

##### Filtro: Board
Filtra ONUs por placa/slot da OLT.

**Endpoints:**
GET /api/onu/fetch_distinct_onu_boards  
POST /api/onu/fetch_distinct_options/board

##### Filtro: Port
Filtra ONUs por porta PON.

**Endpoints:**
GET /api/onu/fetch_distinct_onu_ports  
POST /api/onu/fetch_distinct_options/port

##### Filtro: Zone
Filtra ONUs por zona operacional.

**Endpoints:**
GET /api/onu/fetch_zones  
POST /api/onu/fetch_distinct_options/zone_id

##### Filtro: ODB
Filtra ONUs associadas a divisores ópticos.

**Endpoints:**
GET /api/onu/fetch_odbs_for_location/{id}  
POST /api/onu/fetch_distinct_options/odb_id

##### Filtro: ONU Type
Filtra ONUs por modelo de equipamento.

**Endpoint:**
POST /api/onu/fetch_distinct_options/onu_type_id

##### Filtro: Profile
Filtra ONUs por template de configuração.

**Endpoint:**
POST /api/onu/fetch_distinct_options/custom_template

##### Filtro: PON Type
Filtra ONUs por tecnologia PON.

**Endpoint:**
POST /api/onu/fetch_distinct_options/pon_type

##### Filtro: VLAN
Filtra ONUs por VLAN configurada.

**Endpoints:**
GET /api/onu/fetch_vlans_for_extra/{id}  
GET /api/onu/fetch_vlans_for_extra/{id}/{id}

##### Filtro: Mgmt IP
Filtra ONUs por modo de gerenciamento:
- Inativo
- IP estático
- DHCP

**Endpoint:**
GET /api/onu/fetch_vlans_mgmt/{id}

##### Filtro: TR-069
Filtra ONUs com TR-069 habilitado.

**Endpoint:**
GET /api/onu/fetch_tr069_profiles_for_olt/{id}

##### Filtro: Status operacional
Permite filtrar ONUs por estado:
- Online
- Falha de energia
- Perda de sinal
- Offline
- Administrador desativado

##### Filtro: Signal
Filtra ONUs por qualidade do sinal óptico:
- Bom
- Aviso
- Crítico

##### Filtro: Bridge / Router
- B → Bridge
- R → Router

##### Filtro: Serviços
Filtrar ONUs com:
- VoIP
- CATV

##### Filtro: Velocidade
Filtra ONUs por perfis de:
- Download
- Upload

---

#### Feature: Paginação

A listagem possui paginação.

**Exemplo:**
1–100 ONUs de 10310 exibidas

Cada página contém 100 ONUs.

**Comportamento:**
- filtros permanecem ativos
- navegação entre páginas
- próxima / anterior
- última página

---

#### Feature: Exportar

Permite exportar a listagem de ONUs filtradas.

**Endpoint provável:**
GET /reports/export

(precisa confirmar no HAR)

---

#### Endpoints desta tela (confirmados)

GET /onu/configured  
GET /onu/get_configured_list  
GET /onu/view/{id}  
GET /api/onu/get_onu_status_and_signal/{id}  
GET /api/onu/fetch_zones  
GET /api/onu/fetch_distinct_onu_boards  
GET /api/onu/fetch_distinct_onu_ports  
GET /api/onu/fetch_odbs_for_location/{id}  
POST /api/onu/fetch_distinct_options/board  
POST /api/onu/fetch_distinct_options/port  
POST /api/onu/fetch_distinct_options/olt_id  
POST /api/onu/fetch_distinct_options/onu_type_id  
POST /api/onu/fetch_distinct_options/zone_id  
POST /api/onu/fetch_distinct_options/odb_id  
POST /api/onu/fetch_distinct_options/custom_template  
POST /api/onu/fetch_distinct_options/pon_type

---

### Tela: Detalhe da ONU (View / ONU Details)

Tela responsável por visualizar, monitorar e gerenciar uma ONU específica dentro da rede GPON.

Permite:
- visualizar informações operacionais
- executar comandos na ONU
- visualizar telemetria
- alterar configurações
- reiniciar ou desativar o equipamento

---

#### Feature: Visualizar informações gerais da ONU

**Descrição:**  
Exibe as principais informações técnicas e operacionais da ONU.

**Informações exibidas:**
- OLT
- Board / Quadro
- Porta PON
- ID da ONU
- Canal GPON (GPON / XG-PON / XGS-PON)
- SN (Serial Number)
- Tipo de ONU
- Zona
- Nome do cliente
- Endereço
- Contato
- Data de autorização
- ID externo da ONU

**Endpoint:**
GET /onu/view/{id}

---

#### Feature: Alteração de localização da ONU

Permite mover ou alterar parâmetros físicos da ONU na rede.

**Ações disponíveis:**
- mover ONU para outra OLT
- mover ONU para outro Board
- mover ONU para outra Porta
- alterar ID da ONU
- alterar canal GPON

**Endpoint provável:**
(a confirmar)

---

#### Feature: Substituição de ONU

Permite substituir o equipamento mantendo a configuração existente.

**Ação:**
- substituir SN da ONU

**Endpoint provável:**
(a confirmar)

---

#### Feature: Alterar tipo de ONU

Permite alterar o modelo do equipamento.

**Endpoint provável:**
GET /api/onu/fetch_custom_templates/{id}

(utilizado para carregar templates compatíveis)

---

#### Feature: Atualizar detalhes do cliente

Permite editar dados administrativos da instalação.

**Campos editáveis:**
- zona
- nome
- endereço
- contato

**Endpoint provável:**
(backend interno do sistema)

---

#### Feature: Visualizar status da ONU

Mostra:
- estado operacional
- tempo online
- última atualização

**Endpoint:**
GET /api/onu/get_onu_status_and_signal/{id}

---

#### Feature: Visualizar sinal óptico

Mostra:
- potência RX
- potência TX
- distância estimada

**Endpoint:**
GET /api/onu/get_onu_status_and_signal/{id}

---

#### Feature: Visualizar VLAN configurada

Mostra a VLAN associada à ONU.

**Endpoints:**
GET /api/onu/fetch_vlans_for_extra/{id}  
GET /api/onu/fetch_vlans_for_extra/{id}/{id}  
GET /api/onu/fetch_vlans_mgmt/{id}

---

#### Feature: Visualizar modo de operação da ONU

Mostra:
- Bridge
- Router
- VLAN principal

**Endpoint provável:**
(configuração da ONU carregada via /onu/view/{id})

---

#### Feature: Visualizar status TR-069

Indica se o gerenciamento remoto está ativo.

**Endpoint:**
GET /api/onu/fetch_tr069_profiles_for_olt/{id}

---

#### Feature: Visualizar status de gestão IP

Indica se a ONU possui IP de gerenciamento ativo.

**Endpoint provável:**
(informação retornada via /onu/view/{id})

---

#### Feature: Obter status atualizado

Botão que consulta novamente o estado da ONU na OLT.

**Endpoint:**
GET /api/onu/get_onu_status_and_signal/{id}

---

#### Feature: Exibir configuração em execução

Mostra a configuração atual aplicada na OLT.

**Endpoint provável:**
GET /onu/get_running_config/{id}

**Exemplo de retorno:**
interface gpon 0/4  
ont add 14 sn-auth ...  
service-port ...  
traffic-table ...

---

#### Feature: Visualizar informações de software

Mostra dados de firmware e modelo do equipamento.

**Endpoint provável:**
GET /onu/get_software_info/{id}

---

#### Feature: Monitoramento em tempo real (AO VIVO)

Ativa polling para atualizar dados continuamente.

**Endpoints:**
GET /signal/get_signal_graph_series_for_onu/{id}  
GET /traffic/get_daily_for_onu/{id}

---

#### Feature: Gráfico de tráfego

Exibe histórico de upload e download da ONU.

**Endpoint:**
GET /traffic/get_daily_for_onu/{id}

**Exemplo de retorno:**
[
  { "time": "...", "upload": 0.01, "download": 0.00 }
]

---

#### Feature: Gráfico de sinal

Exibe histórico de potência óptica.

**Endpoint:**
GET /signal/get_signal_graph_series_for_onu/{id}

---

#### Feature: Configurar perfil de velocidade

Permite alterar o perfil de serviço da ONU.

**Dados exibidos:**
- ID da porta de serviço
- VLAN do usuário
- Download
- Upload

**Endpoint:**
GET /speed_profiles

---

#### Feature: Gerenciamento de portas Ethernet

Tabela com:
- Porta
- Estado administrativo
- Modo VLAN
- DHCP
- Ação
- configurar porta

---

#### Feature: Visualizar suporte CATV

Indica se o modelo de ONU suporta TV via CATV.

---

#### Feature: Ações administrativas na ONU

Comandos executados diretamente na OLT.

**CTAs disponíveis:**
- Reiniciar ONU
- Ressincronizar configuração
- Restaurar padrões
- Desativar ONU

**Endpoints prováveis:**
POST /onu/reboot  
POST /onu/resync  
POST /onu/factory_reset  
POST /onu/disable

(precisa confirmar no HAR)

---

### Tela: ONUs Não Configuradas (Unconfigured / Pending Authorization)

Tela responsável por exibir ONUs detectadas pela OLT na rede GPON que ainda não foram autorizadas ou provisionadas no sistema.

Essas ONUs aparecem automaticamente quando:
- um equipamento é conectado na rede
- a OLT detecta o SN na porta PON
- o equipamento ainda não foi autorizado no sistema

Essa tela é usada para iniciar o processo de provisionamento da ONU.

---

#### Feature: Listagem de ONUs detectadas

**Descrição:**  
Exibe ONUs detectadas pela OLT que ainda não foram autorizadas.

A listagem é agrupada por OLT.

**Exemplo:**
OLT: X  
ONU 1  
ONU 2  
ONU 3  

OLT: Y  
ONU 4  
ONU 5  
ONU 6  

**Informações exibidas na tabela:**
- Tipo PON
- Board / Quadro
- Porta PON
- Descrição da PON
- SN (Serial Number)
- Tipo de ONU (modelo detectado)
- Ação

**Endpoints:**
GET /onu/unconfigured  
GET /onu/get_unconfigured

---

#### Feature: Filtrar ONUs por OLT

Permite exibir apenas ONUs detectadas em uma OLT específica.

**Input:**
- Dropdown com lista de OLTs

**Endpoint:**
GET /onu/get_unconfigured_for_olt/{id}

---

#### Feature: Atualizar listagem de ONUs

**CTA:** Atualizar

Recarrega a lista de ONUs detectadas na OLT.

Usado quando:
- uma nova ONU é conectada
- uma ONU foi removida
- a OLT detectou novos equipamentos

**Endpoint:**
GET /onu/get_unconfigured

---

#### Feature: Autorizar ONU

**CTA:** Autorizar

Inicia o processo de provisionamento da ONU na rede.

Esse botão abre a tela **Autorizar ONU**.

**Fluxo típico:**
1. selecionar perfil
2. selecionar VLAN
3. definir modo (bridge/router)
4. aplicar configuração
5. enviar comando para OLT

**Endpoint provável:**
POST /onu/authorize

(não apareceu no HAR ainda — provavelmente capturado na tela de autorização)

---

#### Feature: Predefinições de autorização

**CTA:** Predefinições de autorização

Permite configurar templates de provisionamento automático.

Esses templates normalmente incluem:
- VLAN padrão
- perfil de velocidade
- tipo de ONU
- modo Bridge / Router
- serviços (VoIP / CATV)

**Endpoint provável:**
GET /onu_authorization_presets

(ou similar)

---

#### Feature: Adicionar ONU para autorização posterior

**CTA:** Adicionar ONU

Permite registrar uma ONU detectada para ser autorizada depois.

Usado quando:
- o técnico ainda não tem dados do cliente
- instalação será finalizada depois

**Endpoint provável:**
POST /onu/add_for_later_authorization

(precisa confirmar no HAR)

---

### Tela: Authorization

#### Subtela: Presets
- listar presets
- obter preset padrão

#### Subtela: Autorização
- fluxo de autorização vinculado à ONU detectada

**Por que existe:**
onu_authorization_presets — 2  
onu_authorization — 1

**Endpoints:**
GET /onu_authorization/authorize  
GET /onu_authorization_presets/listing  
GET /onu_authorization_presets/get_default_preset

---

### Endpoints amplos do módulo ONU

GET /onu  
GET /onu/listing  
GET /onu/configured  
GET /onu/get_configured_list  
GET /onu/unconfigured  
GET /onu/get_unconfigured  
GET /onu/get_unconfigured_for_olt/{id}  
GET /onu/view/{id}  
GET /api/onu/get_onu_status_and_signal/{id}  
GET /api/onu/fetch_zones  
GET /api/onu/fetch_custom_templates/{id}  
GET /api/onu/fetch_tr069_profiles_for_olt/{id}  
GET /api/onu/fetch_vlans_for_extra/{id}  
GET /api/onu/fetch_vlans_for_extra/{id}/{id}  
GET /api/onu/fetch_vlans_mgmt/{id}  
GET /api/onu/fetch_distinct_onu_boards  
GET /api/onu/fetch_distinct_onu_ports  
GET /api/onu/fetch_odbs_for_location/{id}  
POST /api/onu/fetch_distinct_options/board  
POST /api/onu/fetch_distinct_options/port  
POST /api/onu/fetch_distinct_options/olt_id  
POST /api/onu/fetch_distinct_options/onu_type_id  
POST /api/onu/fetch_distinct_options/zone_id  
POST /api/onu/fetch_distinct_options/odb_id  
POST /api/onu/fetch_distinct_options/custom_template  
POST /api/onu/fetch_distinct_options/pon_type

---

## 3) OLTs

## Menu: OLTs

Gerenciamento dos equipamentos OLT da rede.

---

### Tela: Lista de OLTs

Mostra todas as OLTs cadastradas no sistema.

#### Feature: Listar OLTs

**Descrição:**  
Exibe uma tabela contendo todas as OLTs registradas.

**Endpoints:**
GET /olt  
GET /olt/listing  
GET /api/system/get_local_olts

---

#### Feature: Exportar lista de OLTs

**Descrição:**  
Permite gerar uma exportação da lista de OLTs.

**Endpoints:**
GET /reports/export

---

#### Feature: Ordenar lista por coluna

**Descrição:**  
Permite ordenar a tabela de OLTs por diferentes colunas.

**Endpoints:**
Utiliza o mesmo endpoint de listagem.  
GET /olt/listing

---

#### Informações exibidas na tabela

**Campos exibidos:**
- ID da OLT
- Nome da OLT
- Endereço IP
- Porta TCP
- Porta UDP
- Modelo de hardware
- Versão de software

---

### Tela: Detalhes da OLT

Mostra informações detalhadas de uma OLT específica.

#### Feature: Visualizar detalhes da OLT

**Descrição:**  
Abre a página de detalhes da OLT selecionada.

**Endpoints:**
GET /olt/olt_details/{id}/details  
GET /api/olt/get_capabilities/{id}

---

### Aba: Saúde da OLT

Exibe métricas de funcionamento da OLT.

#### Feature: Visualizar temperatura da OLT

**Endpoint:**
GET /graphs_olt/get_daily_env_temp_for_olt/{id}/small

---

#### Feature: Visualizar uso de CPU

**Endpoint:**
GET /graphs_olt/get_daily_for_board_cpu/{id}/{id}/small

---

#### Feature: Visualizar uso de memória

**Endpoint:**
GET /graphs_olt/get_daily_for_board_mem/{id}/{id}/small

---

#### Feature: Visualizar uptime da OLT

**Endpoint:**
GET /olt/get_olt_uptime_and_env_temperature_for_dashboard/{id}

---

### Aba: Portas PON

Lista as portas PON da OLT.

#### Feature: Listar portas PON

**Endpoint:**
GET /olt/get_pon_list/{id}

---

### Estrutura da tela

**Abas:**
- Nenhuma aba visível explicitamente no print original, mas a separação funcional indica:
  - detalhes
  - saúde
  - portas PON

**Botões de ação:**
- Lista de OLTs para exportação
- Visualizar (um por OLT)

**Filtros:**
- Nenhum filtro visível

**Informações exibidas:**
Tabela contendo as seguintes colunas:
- Visualizar (botão)
- EU/IA (ID da OLT)
- Nome
- OLT IP
- TCP
- UDP
- Versão de hardware da OLT
- Versão de software da OLT
- Ação (coluna presente no cabeçalho, mas sem ação visível no print)

---

## 4) Traffic

## Menu: Traffic

### Tela: Tráfego por ONU

Exibe gráfico e histórico de tráfego individual por ONU.

**Endpoints:**
GET /traffic/get_daily_for_onu/{id}/small  
GET /traffic/get_traffic_graph_series_for_onu/{id}

---

### Tela: Tráfego por PON

Exibe tráfego agregado por porta PON.

**Endpoints:**
GET /traffic/get_daily_for_pon_port/{id}/small

---

### Objetivo do módulo

Fornecer visualização temporal do consumo de banda por ONU e por PON.

---

## 5) Signal

## Menu ou Aba dentro de ONU: Signal

### Tela: Gráfico de potência óptica por ONU

Exibe histórico temporal do sinal óptico da ONU.

**Endpoint:**
GET /signal/get_signal_graph_series_for_onu/{id}

---

### Objetivo do módulo

Permitir monitoramento fino da qualidade do sinal óptico da ONU ao longo do tempo.

---

## 6) Uplink

## Menu: Uplink

### Tela: Erros de uplink

Exibe histórico de erros em uplinks da OLT.

**Endpoint:**
GET /uplink/get_daily_for_uplink_errors/{id}/small

---

### Tela: Octets / bytes de uplink

Exibe volume de tráfego em uplinks.

**Endpoint:**
GET /uplink/get_daily_for_uplink_oct/{id}/small

---

### Objetivo do módulo

Permitir análise de saúde e capacidade dos links de uplink da infraestrutura.

---

## 7) Diagnostics

## Menu: Diagnostics

### Tela: Ferramentas de diagnóstico

Permite executar ou visualizar ferramentas de diagnóstico operacional.

**Endpoints:**
GET /diagnostics  
GET /diagnostics/get_diagnostics_list

---

### Tela: Execuções recentes

Pode exibir histórico de diagnósticos realizados.

**Endpoints:**
GET /diagnostics/get_diagnostics_list

---

## 8) Reports

## Menu: Reports

### Tela: Lista de tasks

Exibe a fila e o status de tarefas de relatórios.

**Endpoints:**
GET /reports/tasks  
GET /reports/get_tasks_list

---

### Tela: Relatórios de autorizações

Exibe relatórios específicos de autorizações de ONUs.

**Endpoints:**
GET /reports/authorizations/list  
GET /reports/get_authorizations_list

#### Feature interna do Relatório de Autorização: Exportar autorizações

Descrição:
Permite exportar a lista filtrada de autorizações de ONUs.

Endpoint:
POST /api/onu/export_authorizations

Observação:

Provavelmente recebe filtros no payload:
- período
- OLT
- usuário
- status

---

### Tela: Exportação

Permite exportar arquivos e consultar listas de exportação.

**Endpoints:**
GET /reports/export  
GET /api/export/list

---

### Tela: Importação

Permite iniciar fluxo de importação de dados para o módulo de relatórios ou autorizações.

Endpoint:
GET /reports/import

Status:
- tela confirmada
- endpoint de submit ainda não capturado

---

### Feature complementar: Seleção de usuários para relatórios

Permite carregar usuários utilizados em filtros ou ownership de relatórios.

**Endpoint:**
GET /api/system/fetch_users_for_reports

---

## 9) Settings / Config

## Menu: Settings

### Tela: Gerenciamento de Perfis de Velocidade

Tela responsável por listar e gerenciar os perfis de velocidade utilizados no provisionamento das ONUs.

---

#### Feature: Listar perfis de velocidade

**Descrição:**  
Exibe todos os perfis de velocidade cadastrados no sistema.

**Informações exibidas:**
- Nome
- Para
- Use prefixo e sufixo
- Velocidade
- Tipo
- Padrão
- ONUs
- Ação

**Endpoint provável:**
GET /speed_profiles

---

#### Feature: Adicionar perfil de velocidade

**Descrição:**  
Permite criar um novo perfil de velocidade no sistema.

**Endpoint provável:**
POST /speed_profiles/store

---

#### Feature: Excluir perfil de velocidade

**Descrição:**  
Remove um perfil de velocidade do sistema mediante confirmação.

**Endpoint provável:**
POST /speed_profiles/delete/{id}

---

#### Feature: Editar perfil de velocidade

**Descrição:**  
Permite alterar os dados de um perfil existente.

**Endpoints prováveis:**
GET /speed_profiles/view/{id}  
POST /speed_profiles/update/{id}

---

#### Feature: Definir perfil padrão

**Descrição:**  
Permite marcar um perfil como padrão do sistema.

**Endpoint provável:**
POST /speed_profiles/set_default/{id}

---

### Tela: Gerenciamento de Tipos de ONU

Tela responsável por cadastrar e gerenciar os modelos de ONUs suportados pelo sistema.

Esses tipos de ONU são usados no processo de:
- autorização
- provisionamento
- configuração de portas
- definição de capacidades do equipamento

---

#### Feature: Listar tipos de ONU

**Descrição:**  
Exibe todos os modelos de ONU cadastrados no sistema.

**Informações exibidas:**
- Tipo PON
- Canais
- Tipo ONU
- Portas Ethernet
- Wi-Fi
- Portas VoIP
- CATV
- Permitir perfis personalizados
- Capacidade (Bridge / Router)
- Ação

**Endpoint provável:**
GET /onu_types  
GET /onu_types/listing  
GET /onu_types/get_list

**Endpoint recomendado (padrão full stack):**
GET /onu_types

---

#### Feature: Adicionar tipo de ONU

**Descrição:**  
Permite cadastrar um novo modelo de ONU no sistema.

**Campos prováveis do formulário:**
- Tipo PON
- Canais
- Nome / Modelo da ONU
- Quantidade de portas Ethernet
- Quantidade de interfaces Wi-Fi
- Quantidade de portas VoIP
- Suporte CATV
- Permitir perfis personalizados
- Capacidades suportadas (Bridge / Router)

**Endpoint provável:**
POST /onu_types/store  
POST /onu_types/create  
POST /onu_types/add

**Endpoint recomendado (padrão full stack):**
POST /onu_types

**Payload sugerido:**
{
  "pon_type": "GPON",
  "channel_type": "GPON",
  "name": "ZTE F6600",
  "ethernet_ports": 4,
  "wifi_interfaces": 2,
  "voip_ports": 2,
  "has_catv": true,
  "allow_custom_profiles": true,
  "supports_bridge": true,
  "supports_router": true
}

---

#### Feature: Visualizar detalhes do tipo de ONU

**Descrição:**  
Permite consultar os dados completos de um modelo específico.

**Uso:**
- abrir modal de detalhes
- carregar dados para edição
- validar compatibilidade antes do provisionamento

**Endpoint provável:**
GET /onu_types/view/{id}  
GET /onu_types/get/{id}

**Endpoint recomendado (padrão full stack):**
GET /onu_types/{id}

---

#### Feature: Editar tipo de ONU

**Descrição:**  
Permite alterar um modelo de ONU já cadastrado.

**Campos editáveis:**
- Tipo PON
- Canais
- Nome / Modelo
- Portas Ethernet
- Wi-Fi
- VoIP
- CATV
- Perfis personalizados
- Capacidades

**Endpoint provável:**
POST /onu_types/update/{id}  
POST /onu_types/edit/{id}

**Endpoint recomendado (padrão full stack):**
PUT /onu_types/{id}  
PATCH /onu_types/{id}

**Payload sugerido:**
{
  "pon_type": "XGS-PON",
  "channel_type": "XGS-PON",
  "name": "ZTE F680",
  "ethernet_ports": 4,
  "wifi_interfaces": 2,
  "voip_ports": 1,
  "has_catv": false,
  "allow_custom_profiles": true,
  "supports_bridge": true,
  "supports_router": true
}

---

#### Feature: Excluir tipo de ONU

**Descrição:**  
Remove um modelo de ONU do cadastro do sistema.

**Regra:**  
A exclusão deve passar por confirmação.

**Validação recomendada:**  
Não permitir exclusão se o tipo estiver sendo usado por ONUs já cadastradas.

**Endpoint provável:**
POST /onu_types/delete/{id}  
POST /onu_types/remove/{id}

**Endpoint recomendado (padrão full stack):**
DELETE /onu_types/{id}

**Resposta esperada em caso de bloqueio:**
{
  "error": "Não é possível excluir este tipo de ONU porque ele está vinculado a ONUs cadastradas."
}

---

#### Feature: Validar uso do tipo de ONU

**Descrição:**  
Permite verificar quantas ONUs utilizam determinado modelo antes de excluir.

**Uso:**
- exibir contador na UI
- bloquear remoção indevida

**Endpoint recomendado:**
GET /onu_types/{id}/usage

**Resposta sugerida:**
{
  "onu_type_id": 12,
  "usage_count": 143
}

---

#### Feature: Buscar opções para formulários de provisionamento

**Descrição:**  
Disponibiliza os tipos de ONU para seleção em fluxos como:
- autorização de ONU
- edição de ONU
- troca de modelo

**Endpoint provável:**
POST /api/onu/fetch_distinct_options/onu_type_id

**Endpoint recomendado:**
GET /onu_types/options

**Resposta sugerida:**
[
  { "id": 1, "label": "ZTE F6600" },
  { "id": 2, "label": "Huawei HG8546M" }
]

---

#### Feature: Filtrar tipos de ONU

**Descrição:**  
Permite filtrar a listagem por características técnicas do equipamento.

**Filtros recomendados:**
- Tipo PON
- suporta CATV
- suporta VoIP
- Bridge / Router
- permite perfis personalizados

**Endpoints recomendados:**
GET /onu_types?pon_type=GPON  
GET /onu_types?has_catv=true  
GET /onu_types?supports_router=true

---

#### Endpoints confirmados ou parcialmente confirmados

Já existe forte evidência do módulo:
- onu_types

Relacionados no sistema:
POST /api/onu/fetch_distinct_options/onu_type_id

---

#### Endpoints recomendados para fechar o módulo full stack

**Listagem:**
GET /onu_types

**Detalhe:**
GET /onu_types/{id}

**Criação:**
POST /onu_types

**Edição:**
PUT /onu_types/{id}  
PATCH /onu_types/{id}

**Exclusão:**
DELETE /onu_types/{id}

**Uso / validação:**
GET /onu_types/{id}/usage

**Opções para selects:**
GET /onu_types/options

---

### Tela: Gerenciamento de Zonas

Tela responsável por cadastrar e gerenciar zonas utilizadas para organização visual das ONUs no sistema.

As zonas servem para agrupar ONUs por critérios como:
- cidade
- bairro
- região
- POP
- área operacional

**Importante:**  
As zonas não alteram a configuração técnica da ONU.  
Elas são utilizadas apenas para organização e filtros operacionais no sistema.

---

#### Feature: Exibir observação informativa

**Descrição:**  
Exibe um texto explicando que as zonas são agrupamentos visuais e não impactam a configuração técnica da ONU.

**Uso:**
- orientar o usuário
- evitar interpretação errada da funcionalidade

**Endpoint:**
- não depende de endpoint
- conteúdo estático da interface

---

#### Feature: Listar zonas

**Descrição:**  
Exibe todas as zonas cadastradas no sistema.

**Informações exibidas:**
- Nome
- Ação

**Endpoint provável:**
GET /zones  
GET /zones/listing  
GET /zones/get_list

**Endpoint recomendado (padrão full stack):**
GET /zones

**Resposta sugerida:**
[
  { "id": 1, "name": "Centro" },
  { "id": 2, "name": "Serra Negra" },
  { "id": 3, "name": "POP Industrial" }
]

---

#### Feature: Buscar zona por nome

**Descrição:**  
Permite localizar zonas existentes pelo nome.

**Input:**
- Procurar

**Comportamento:**
- busca por nome parcial
- filtra a tabela em tempo real ou após submit

**Endpoint provável:**
GET /zones?search=centro

**Endpoint recomendado:**
GET /zones?search={termo}

**Exemplo:**
GET /zones?search=centro

---

#### Feature: Adicionar zona

**Descrição:**  
Permite criar uma nova zona no sistema.

**CTA:**
- Adicionar Zona

**Campos prováveis do formulário:**
- Nome

**Endpoint provável:**
POST /zones/store  
POST /zones/create  
POST /zones/add

**Endpoint recomendado (padrão full stack):**
POST /zones

**Payload sugerido:**
{
  "name": "Centro"
}

**Resposta sugerida:**
{
  "id": 8,
  "name": "Centro"
}

---

#### Feature: Visualizar detalhes da zona

**Descrição:**  
Permite consultar os dados de uma zona específica.

**Uso:**
- abrir para edição futura
- validar uso antes da exclusão

**Endpoint provável:**
GET /zones/view/{id}  
GET /zones/get/{id}

**Endpoint recomendado:**
GET /zones/{id}

---

#### Feature: Editar zona

**Descrição:**  
Permite alterar o nome de uma zona existente.

Mesmo que a UI atual não mostre explicitamente um botão de editar, é recomendável que o módulo suporte edição.

**Endpoint provável:**
POST /zones/update/{id}  
POST /zones/edit/{id}

**Endpoint recomendado:**
PUT /zones/{id}  
PATCH /zones/{id}

**Payload sugerido:**
{
  "name": "Centro Expandido"
}

---

#### Feature: Excluir zona

**Descrição:**  
Remove a zona do sistema.

**Regra:**  
A ação deve passar por confirmação antes da exclusão.

**Validação recomendada:**  
Não permitir exclusão se houver ONUs vinculadas à zona.

**Endpoint provável:**
POST /zones/delete/{id}  
POST /zones/remove/{id}

**Endpoint recomendado (padrão full stack):**
DELETE /zones/{id}

**Resposta esperada em caso de bloqueio:**
{
  "error": "Não é possível excluir esta zona porque ela está vinculada a ONUs cadastradas."
}

---

#### Feature: Validar uso da zona

**Descrição:**  
Permite verificar quantas ONUs utilizam determinada zona antes da exclusão.

**Uso:**
- exibir contador
- bloquear remoção indevida
- informar impacto ao usuário

**Endpoint recomendado:**
GET /zones/{id}/usage

**Resposta sugerida:**
{
  "zone_id": 4,
  "usage_count": 312
}

---

#### Feature: Carregar zonas para filtros e formulários

**Descrição:**  
Disponibiliza a lista de zonas para uso em:
- filtros da tela de ONUs
- formulário de autorização de ONU
- edição de detalhes da ONU

**Endpoint já sugerido pelo sistema:**
GET /api/onu/fetch_zones  
POST /api/onu/fetch_distinct_options/zone_id

**Endpoint recomendado complementar:**
GET /zones/options

**Resposta sugerida:**
[
  { "id": 1, "label": "Centro" },
  { "id": 2, "label": "Bairro Serra Negra" }
]

---

#### Endpoints confirmados ou parcialmente confirmados

Relacionados no sistema:
GET /api/onu/fetch_zones  
POST /api/onu/fetch_distinct_options/zone_id

Esses endpoints mostram que a entidade "zona" já é usada em filtros e formulários do módulo de ONUs.

---

#### Endpoints recomendados para fechar o módulo full stack

**Listagem:**
GET /zones

**Detalhe:**
GET /zones/{id}

**Criação:**
POST /zones

**Edição:**
PUT /zones/{id}  
PATCH /zones/{id}

**Exclusão:**
DELETE /zones/{id}

**Uso / validação:**
GET /zones/{id}/usage

**Opções para selects:**
GET /zones/options

---

### Endpoints já vistos no bloco Settings

GET /onu_types/listing  
GET /speed_profiles  
GET /locations/listing  
GET /odbs/listing  
GET /odbs/get_odbs_list  
GET /api/onu/fetch_odbs_for_location/{id}  
GET /general/listing/billing

---

## 10) System

## Menu: System

### Tela: Usuários e configurações gerais

Tela administrativa relacionada a:
- usuários utilizados em relatórios
- OLTs locais carregadas por contexto
- opções distintas por zona em alguns fluxos internos

**Endpoints:**
GET /api/system/fetch_users_for_reports  
GET /api/system/get_local_olts  
POST /api/system/fetch_distinct_options/zone_id