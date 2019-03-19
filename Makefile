DOCKERCOMPOSE = docker-compose
UP = up
DOWN = down
BUILD = build
DETACH = -d
START = start
STOP = stop
VOLUME = -v

all: build run

start:
	$(DOCKERCOMPOSE) $(START)

stop:
	$(DOCKERCOMPOSE) $(STOP)

clean:
	$(DOCKERCOMPOSE) $(DOWN) $(VOLUMN)

build:
	$(DOCKERCOMPOSE) $(BUILD)

run:
	$(DOCKERCOMPOSE) $(UP) $(DETACH)
