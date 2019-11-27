VERSION=v1.0.0
BUILD := $(shell git rev-parse --short HEAD)
PROJECTNAME := $(shell basename "$(PWD)")
PROJECT_PACKAGE=node_modules/
NODECMD=node

LDFLAGS=-ldflags "-X=main.Version=$(VERSION) -X=main.Build=$(BUILD)"
STDERR := /tmp/.$(PROJECT_CNAME)-stderr.txt
PID := /tmp/.$(PROJECT_CNAME).pid
MAKEFLAGS += --silent

all: clean install build
clean: 
	@echo " => Cleaning..."
	sudo rm -rf $(PROJECT_PACKAGE)
install:
	@echo " => Checking and Install if there is any missing dependencies..."
	npm install
build: 
	@echo " => Compiling...It's running..." 
	pm2 start npm --name "auth-client" -- start -i 0