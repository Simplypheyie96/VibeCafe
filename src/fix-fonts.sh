#!/bin/bash
# This script replaces all Inter font references with Space Grotesk

find . -name "*.tsx" -type f -exec sed -i "s/font-\['Inter',sans-serif\]/font-['Space_Grotesk',sans-serif]/g" {} +

echo "All fonts updated to Space Grotesk!"
