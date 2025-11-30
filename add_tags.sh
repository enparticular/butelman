#!/bin/bash

# Array of music project files (excluding cinema/theater ones)
projects=(
  "midnight-echoes-whispers.md"
  "neon-collective-pulse.md"
  "crimson-tide-blood-moon.md"
  "luna-rose-silver-lining.md"
  "synth-warriors-neon-nights.md"
  "violet-hours-twilight-zone.md"
  "silver-skyline-concrete-dreams.md"
  "amber-waves-golden-hour.md"
  "iron-giants-steel-and-thunder.md"
  "velvet-underground-revival.md"
  "cosmic-drift-nebula.md"
  "paper-tigers-origami-hearts.md"
  "thunder-road-highway-hymns.md"
  "echo-chamber-reverb-dreams.md"
  "wildfire-ashes-to-phoenix.md"
)

# Tags to randomly assign
tags=("composición" "intérprete" "producción" "arreglos")

for project in "${projects[@]}"; do
  file="src/content/projects/$project"
  if [ -f "$file" ]; then
    # Randomly select 1-3 tags
    num_tags=$((RANDOM % 3 + 1))
    selected_tags=()
    
    # Shuffle and select tags
    shuffled=($(shuf -e "${tags[@]}"))
    for ((i=0; i<num_tags; i++)); do
      selected_tags+=("  - \"${shuffled[$i]}\"")
    done
    
    # Join tags with newlines
    tag_list=$(printf '%s\n' "${selected_tags[@]}")
    
    # Add tags after 'order' line
    sed -i '' "/^order:/a\\
tags:\\
$tag_list
" "$file"
  fi
done
