Dashboard de status da rede GPON



Objeto



Rede GPON / ONUs / OLTs (Painel de monitoramento que apresenta indicadores operacionais da rede, status das ONUs e alertas de infraestrutura)



-------------------



Informações exibidas



Indicadores principais (Cards)



Aguardando autorização

Quantidade de ONUs detectadas na rede que ainda não foram autorizadas no sistema. 



Informações adicionais exibidas no card:



D:0 (ONUs deletadas ou removidas)



Resync: 0 (ONUs em processo de ressincronização)



New: 4 (novas ONUs detectadas)



Action: Ao clicar no Card, vai para página de ONUs Configuradas





-----------------------



On-line



Total de ONUs atualmente conectadas e operando normalmente na rede, conforme a OLT selecionada nas Listas de OLTs. 



Informação adicional exibida:



Total autorizado (quantidade total de ONUs já provisionadas no sistema)





Action: Ao clicar no card, vai para página de ONUs configuradas. 



Obs\*\* Se na Lista de OLT estiver alguma OLT selecionada, então o Filtro OLT  da página de ONUs Configuradas = a OLT selecionada na Lista anterior. Portanto, se o User clicar no card com alguma OLT selecionada, a página ONU CONFIGURADA abre com o Fitro selecionado pela mesma OLT.



Se a lista estiver em "Todos", abre a página de ONUs configuradas com o Filtro zerado/sem escolhas no filtro. 





---------



Totalmente offline

Quantidade de ONUs que estão sem comunicação com a OLT.



Informações adicionais exibidas:



PwrFail → Falha de energia na ONU

LoS → Loss of Signal (perda de sinal óptico)

N/A → Estado desconhecido ou não identificado



Action: Ao clicar no Card vai para a Página de ONUs configuradas (Configurado) com os filtros:



\- ONUs com falha de Energia



\- ONUs Perda de sinal



\- ONUs Offline



De: Status (Filtro por estado operacional da ONU) ativados. 



---------------------



Sinal fraco

Quantidade de ONUs com níveis de sinal óptico fora da faixa ideal.



Informações adicionais exibidas:



\- Warning → sinal degradado



\- Critical → sinal crítico





Action: Ao clicar no Card vai para a Página de ONUs configuradas (Configurado) com os filtros:



\- níveis de sinal aviso



\- níveis de sinal crítico



De: Signal (Filtro por qualidade de sinal óptico da ONU) ATIVADOS



-------------------



## Gráfico: Estado da rede



#### Gráfico: Estado da rede (Horário)



Hourly network status

Gráfico temporal que apresenta o estado da rede ao longo das últimas horas, mostrando a variação do número de ONUs em cada condição operacional.



Métricas exibidas:



Online ONUs → quantidade de ONUs conectadas e operando normalmente.



Power fail → ONUs sem energia.



Signal loss → ONUs com perda de sinal óptico.



N/A → ONUs sem estado identificado.



Maximum → capacidade máxima de ONUs registrada no período.



Permite acompanhar oscilações de curto prazo na rede.



#### Gráfico: Estado da rede (Diário)



Daily network status

Gráfico temporal mostrando a evolução do estado das ONUs na rede ao longo do dia.



Métricas exibidas:



Online ONUs



Power fail



Maximum (capacidade máxima monitorada)



Signal loss



N/A



Permite visualizar tendências de disponibilidade e falhas da rede.



#### Gráfico: Estado da rede (Semanal)



Weekly network status

Gráfico que apresenta o comportamento da rede ao longo da semana, mostrando a evolução diária da quantidade de ONUs em cada estado.



Métricas exibidas:



Online ONUs



Power fail



Signal loss



N/A



Maximum



Permite visualizar tendências semanais de disponibilidade e falhas da rede.



#### Gráfico: Estado da rede (Mensal)



Monthly network status

Gráfico que apresenta a evolução da rede ao longo do mês, permitindo acompanhar variações no número de ONUs ativas e eventos de falha.



Métricas exibidas:



Online ONUs



Power fail



Signal loss



N/A



Maximum



Permite analisar crescimento da rede e incidência de falhas no período mensal.



#### Gráfico: Estado da rede (Anual)



Yearly network status

Gráfico que apresenta a evolução histórica da rede ao longo do ano, exibindo o crescimento da base de ONUs e a incidência de eventos operacionais.



Métricas exibidas:



Online ONUs



Power fail



Signal loss



N/A



Maximum

&nbsp;
Popover de seleção de gráficos do estado da rede



Inputs



More graphs (Popover que permite selecionar o intervalo temporal do gráfico exibido no painel Estado da rede)



Opções disponíveis no Popover



Hourly graph → Exibe o gráfico de status da rede em escala horária, mostrando variações ao longo das últimas horas.



Daily graph → Exibe o gráfico de status da rede em escala diária, mostrando a evolução do estado da rede ao longo do dia.



Weekly graph → Exibe o gráfico de status da rede em escala semanal, permitindo visualizar tendências ao longo da semana.



Monthly graph → Exibe o gráfico de status da rede em escala mensal, permitindo acompanhar mudanças no comportamento da rede durante o mês.



Yearly graph → Exibe o gráfico de status da rede em escala anual, mostrando evolução histórica da rede ao longo do ano.



Comportamento



Ao selecionar uma das opções, o sistema altera dinamicamente o gráfico exibido no painel "Estado da rede" para o intervalo temporal selecionado.

------------------------



Lista de OLTs
---



Painel lateral exibindo as OLTs monitoradas pelo sistema.



Para cada OLT são exibidas informações como:



Nome da OLT



Tempo desde o último evento ou atualização



Temperatura da OLT



Possui filtro “Todos” para exibir todas as OLTs cadastradas.

**Popover: Seleção de OLT

Localizado no canto superior direito do Painel de Lista de OLTs** 



Inputs:  Procurar (Campo de busca para localizar uma OLT específica pelo nome)



Opções exibidas



Todos → Exibe no dashboard as informações agregadas de todas as OLTs do sistema.



Lista de OLTs

Exibe todas as OLTs cadastradas na rede.



Cada item da lista apresenta:



Identificação da OLT



Contador numérico indicando a quantidade de ONUs associadas àquela OLT.



Comportamento



Ao selecionar uma OLT no Popover, todo o Dashboard é atualizado automaticamente, passando a exibir apenas informações relacionadas à OLT selecionada, incluindo:



métricas de ONUs



gráficos de estado da rede



eventos e falhas



indicadores operacionais.

---------------


**Gráfico: Autorizações de ONU por dia**
---



Gráfico de barras exibindo quantidade de ONUs autorizadas diariamente.



Permite acompanhar:



volume de ativações



ritmo de provisionamento da rede



Falha na PON


------


###### **Tabela exibindo eventos de falha detectados em portas PON da OLT.**



Colunas exibidas:



Nome OLT

OLT onde a falha foi detectada.



Placa/Porta

Identificação da placa e porta PON afetada.



Onus

Quantidade de ONUs impactadas.



LOS

Quantidade de ONUs com perda de sinal.



Poder

Indicador relacionado ao nível de potência óptica.



Possível causa

Diagnóstico provável da falha (ex.: LOS).



Desde

Tempo desde que o problema foi detectado.


