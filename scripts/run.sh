#!/bin/bash

tmux new-session -d -s dev
tmux send-keys 'cd client && npm start' 'C-m'
tmux rename-window 'dev'
tmux select-window -t dev:0

tmux split-window -v -t 0
tmux send-keys 'npm start' 'C-m'
tmux -2 attach-session -t dev
