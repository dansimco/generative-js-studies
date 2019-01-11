#!/bin/bash
fswatch -o *.js | xargs -n1 echo "change"