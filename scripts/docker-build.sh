#!/bin/sh

docker build . -f Dockerfile -t nestjs-dev:latest --target development