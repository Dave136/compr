#!/usr/bin/env bash

# Determine if stdout is a terminal...
if test -t 1; then
    # Determine if colors are supported...
    ncolors=$(tput colors)

    if test -n "$ncolors" && test "$ncolors" -ge 8; then
        BOLD="$(tput bold)"
        YELLOW="$(tput setaf 3)"
        GREEN="$(tput setaf 2)"
        NC="$(tput sgr0)"
    fi
fi

# Function that prints the available commands...
display_help() {
  echo "Compr Backend Script"
  echo
  echo "${YELLOW}Usage: ${NC}" >&2
  echo "  compr COMMAND"
  echo "  ${GREEN}compr up${NC}        Start the application"
  echo "  ${GREEN}compr down${NC}      Stop the application"

  exit 1
}

# Proxy the "help" command...
if [ $# -gt 0 ]; then
    if [ "$1" == "help" ] || [ "$1" == "-h" ] || [ "$1" == "-help" ] || [ "$1" == "--help" ]; then
        display_help
    fi
else
    display_help
fi


if [ "$1" == "up" ]; then
  shift 1
  exec docker compose up -d
fi

if [ "$1" == "down" ]; then
  shift 1
  exec docker compose down
fi