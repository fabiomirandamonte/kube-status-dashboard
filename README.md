# KubeStatus Lite (Mini Projeto)

Esse pequeno projeto tem como objetivo monitorar os serviços e pods em tempo real estilo DevOps, desenvolvido para simular a observalidade de ambientes Kubernetes/microserviços em uma interface web moderna e interativa.

Objetivo principal deste projeto foi aplicar os conceitos fundamentais do ecossistema moderno de desenvolvimento Frontend com React e estilização rápida com Tailwind CSS.

🛠️ Tecnologias Utilizadas

- React (Componentização, Hooks: useState, useEffect)
- Vite (Build tool e servidor de desenvolvimento)
- Tailwind CSS v4 (Estilização e componentes responsivos)
- Lucide React (Biblioteca de ícones)

✨ Funcionalidades

- Dashboard Dinâmico: Visualização do status dos pods (healting, warning, failing) em tempo real.
- Métricas e Polling: Simulaçã de oscilação de consumo de CPU/RAM via tempo real (setInterval).
- Simulador de Incidentes: Botão para simular erros críticos (failing) e testar a reação da interface.
- Terminal de Logs interativo: Modal estilo CLI (kubectl logs) com registro sequencial de eventos do pod.
- Self-Healing (restaurar): Ação para reiniciar serviços e restaurar a saúde do cluster.

Como rodar o projeto:

1. Clone este repositório
git clone https://github.com/SEU-USUARIO/kube-status-dashboard.git

2. Acesse a pasta do projeto
cd kube-status-dashboard

3. Instale as dependências
npm install

4. Inicie o servidor de desenvolvimento
npm run dev
