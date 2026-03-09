# SEÇÃO 1 — LISTA LIMPA DE ENDPOINTS

GET /api/export/list
GET /api/olt/get_capabilities/{id}
GET /api/onu/fetch_custom_templates/{id}
GET /api/onu/fetch_distinct_onu_boards
GET /api/onu/fetch_distinct_onu_ports
GET /api/onu/fetch_odbs_for_location/{id}
GET /api/onu/fetch_tr069_profiles_for_olt/{id}
GET /api/onu/fetch_vlans_for_extra/{id}
GET /api/onu/fetch_vlans_for_extra/{id}/{id}
GET /api/onu/fetch_vlans_mgmt/{id}
GET /api/onu/fetch_zones
GET /api/onu/get_onu_status_and_signal/{id}
GET /api/system/fetch_users_for_reports
GET /api/system/get_local_olts
GET /dashboard/get_onus_auth_per_day
GET /dashboard/get_onus_signals
GET /dashboard/get_onus_stats
GET /dashboard/get_outage_pons
GET /dashboard/get_waiting_auth
GET /diagnostics
GET /diagnostics/get_diagnostics_list
GET /general/listing/billing
GET /graphs
GET /graphs_olt/get_daily_env_temp_for_olt/{id}/small
GET /graphs_olt/get_daily_for_board_cpu/{id}/{id}/small
GET /graphs_olt/get_daily_for_board_mem/{id}/{id}/small
GET /graphs_olt/get_daily_onus_statuses/dashboard
GET /locations/listing
GET /odbs/get_odbs_list
GET /odbs/listing
GET /olt
GET /olt/get_olt_uptime_and_env_temperature_for_dashboard/{id}
GET /olt/get_pon_list/{id}
GET /olt/listing
GET /olt/olt_details/{id}/details
GET /onu
GET /onu/configured
GET /onu/get_configured_list
GET /onu/get_unconfigured
GET /onu/get_unconfigured_for_olt/{id}
GET /onu/unconfigured
GET /onu/view/{id}
GET /onu_authorization/authorize
GET /onu_authorization_presets/get_default_preset
GET /onu_authorization_presets/listing
GET /onu_types/listing
GET /reports/authorizations/list
GET /reports/export
GET /reports/get_authorizations_list
GET /reports/get_tasks_list
GET /reports/tasks
GET /signal/get_signal_graph_series_for_onu/{id}
GET /speed_profiles
GET /traffic/get_daily_for_onu/{id}/small
GET /traffic/get_daily_for_pon_port/{id}/small
GET /traffic/get_traffic_graph_series_for_onu/{id}
GET /uplink/get_daily_for_uplink_errors/{id}/small
GET /uplink/get_daily_for_uplink_oct/{id}/small
POST /api/onu/fetch_distinct_options/board
POST /api/onu/fetch_distinct_options/custom_template
POST /api/onu/fetch_distinct_options/odb_id
POST /api/onu/fetch_distinct_options/olt_id
POST /api/onu/fetch_distinct_options/onu_type_id
POST /api/onu/fetch_distinct_options/pon_type
POST /api/onu/fetch_distinct_options/port
POST /api/onu/fetch_distinct_options/zone_id
POST /api/system/fetch_distinct_options/zone_id


# SEÇÃO 2 — ENDPOINTS AGRUPADOS POR MÓDULO


## API
GET /api/export/list
GET /api/olt/get_capabilities/{id}
GET /api/onu/fetch_custom_templates/{id}
GET /api/onu/fetch_distinct_onu_boards
GET /api/onu/fetch_distinct_onu_ports
GET /api/onu/fetch_odbs_for_location/{id}
GET /api/onu/fetch_tr069_profiles_for_olt/{id}
GET /api/onu/fetch_vlans_for_extra/{id}
GET /api/onu/fetch_vlans_for_extra/{id}/{id}
GET /api/onu/fetch_vlans_mgmt/{id}
GET /api/onu/fetch_zones
GET /api/onu/get_onu_status_and_signal/{id}
GET /api/system/fetch_users_for_reports
GET /api/system/get_local_olts
POST /api/onu/fetch_distinct_options/board
POST /api/onu/fetch_distinct_options/custom_template
POST /api/onu/fetch_distinct_options/odb_id
POST /api/onu/fetch_distinct_options/olt_id
POST /api/onu/fetch_distinct_options/onu_type_id
POST /api/onu/fetch_distinct_options/pon_type
POST /api/onu/fetch_distinct_options/port
POST /api/onu/fetch_distinct_options/zone_id
POST /api/system/fetch_distinct_options/zone_id

## DASHBOARD
GET /dashboard/get_onus_auth_per_day
GET /dashboard/get_onus_signals
GET /dashboard/get_onus_stats
GET /dashboard/get_outage_pons
GET /dashboard/get_waiting_auth

## DIAGNOSTICS
GET /diagnostics
GET /diagnostics/get_diagnostics_list

## GENERAL
GET /general/listing/billing

## GRAPHS
GET /graphs

## GRAPHS_OLT
GET /graphs_olt/get_daily_env_temp_for_olt/{id}/small
GET /graphs_olt/get_daily_for_board_cpu/{id}/{id}/small
GET /graphs_olt/get_daily_for_board_mem/{id}/{id}/small
GET /graphs_olt/get_daily_onus_statuses/dashboard

## LOCATIONS
GET /locations/listing

## ODBS
GET /odbs/get_odbs_list
GET /odbs/listing

## OLT
GET /olt
GET /olt/get_olt_uptime_and_env_temperature_for_dashboard/{id}
GET /olt/get_pon_list/{id}
GET /olt/listing
GET /olt/olt_details/{id}/details

## ONU
GET /onu
GET /onu/configured
GET /onu/get_configured_list
GET /onu/get_unconfigured
GET /onu/get_unconfigured_for_olt/{id}
GET /onu/unconfigured
GET /onu/view/{id}

## ONU_AUTHORIZATION
GET /onu_authorization/authorize

## ONU_AUTHORIZATION_PRESETS
GET /onu_authorization_presets/get_default_preset
GET /onu_authorization_presets/listing

## ONU_TYPES
GET /onu_types/listing

## REPORTS
GET /reports/authorizations/list
GET /reports/export
GET /reports/get_authorizations_list
GET /reports/get_tasks_list
GET /reports/tasks

## SIGNAL
GET /signal/get_signal_graph_series_for_onu/{id}

## SPEED_PROFILES
GET /speed_profiles

## TRAFFIC
GET /traffic/get_daily_for_onu/{id}/small
GET /traffic/get_daily_for_pon_port/{id}/small
GET /traffic/get_traffic_graph_series_for_onu/{id}

## UPLINK
GET /uplink/get_daily_for_uplink_errors/{id}/small
GET /uplink/get_daily_for_uplink_oct/{id}/small



# SEÇÃO 3 — POSSÍVEIS FEATURES DO SISTEMA

Com base nos endpoints identificados, o sistema SmartOLT possui as seguintes funcionalidades:

## Dashboard
_Monitoramento Geral da Rede_
- Visualização de estatísticas de ONUs (online/offline)
- Monitoramento de sinais ópticos das ONUs
- Listagem de ONUs aguardando autorização
- Identificação de PONs com outage
- Histórico de autorizações de ONU por dia
- Gráfico de status das ONUs ao longo do tempo

## ONU (Optical Network Unit)
_Gerenciamento Completo de ONUs_
- Listagem de ONUs configuradas e não configuradas
- Visualização detalhada de ONU individual
- Listagem de ONUs não configuradas por OLT
- Busca de status e sinal de ONU em tempo real
- Filtragem de ONUs por board, porta, zona, tipo, template e OLT
- Templates customizados por OLT
- Perfis TR-069 por OLT
- Suporte a VLANs (extra e gerência) por OLT

## ONU Authorization
_Processo de Autorização de ONUs_
- Tela de autorização de novas ONUs
- Presets de autorização (configurações padrão reutilizáveis)
- Aplicação de preset padrão na autorização

## OLT (Optical Line Terminal)
_Gerenciamento de OLTs_
- Listagem de OLTs cadastradas
- Visualização de detalhes da OLT
- Listagem de portas PON por OLT
- Uptime e temperatura ambiente da OLT para dashboard
- Capacidades e recursos suportados por OLT
- OLTs locais disponíveis

## ODB (Optical Distribution Box)
_Gerenciamento de Caixas de Distribuição Óptica_
- Listagem de ODBs
- Busca de ODBs por localização

## Locations
_Gestão de Localidades_
- Listagem de localizações cadastradas no sistema

## ONU Types
_Tipos de ONU_
- Listagem de tipos/modelos de ONU suportados

## Speed Profiles
_Perfis de Velocidade_
- Listagem de perfis de velocidade (planos) disponíveis

## Traffic
_Monitoramento de Tráfego_
- Gráfico de tráfego diário por ONU
- Gráfico de tráfego diário por porta PON
- Série histórica de tráfego por ONU

## Signal
_Monitoramento de Sinal Óptico_
- Série histórica de potência de sinal (RX) por ONU

## Uplink
_Monitoramento de Uplinks_
- Gráfico de octetos (bytes) por uplink
- Gráfico de erros por uplink

## Graphs OLT
_Gráficos de Desempenho de OLT_
- CPU por board da OLT (histórico diário)
- Memória por board da OLT (histórico diário)
- Temperatura ambiente por OLT
- Status das ONUs ao longo do tempo (para dashboard)

## Diagnostics
_Ferramentas de Diagnóstico_
- Listagem de diagnósticos disponíveis
- Execução de diagnósticos em equipamentos de rede

## Reports
_Relatórios e Exportações_
- Relatório de autorizações de ONU
- Relatório de tarefas agendadas/executadas
- Exportação de relatórios
- Usuários disponíveis para associar a relatórios

## API Interna
_Endpoints REST da API_
- Exportação de dados via API
- Opções distintas para filtros de listagem de ONUs
- Capacidades por OLT
- Zonas, ODBs e localizações via API
- Usuários do sistema para relatórios
