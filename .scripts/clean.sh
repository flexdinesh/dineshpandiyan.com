#!/bin/bash
# Clean Hugo build artifacts

set -e

cd "$(dirname "$0")/.."

rm -rf public/
rm -rf resources/
rm -f .hugo_build.lock

echo "cleaned: public/, resources/, .hugo_build.lock"
